﻿//var IIS_SERVICE_URL = 'http://localhost:80/SmartWorknetIS/';
//var FILE_SERVER_URL = 'http://localhost/WORKNET30';
var IIS_SERVICE_URL = 'http://172.20.21.13/SmartWorknetIS/';
var FILE_SERVER_URL = 'http://172.20.21.13/WORKNET30';

/**
 * (IIS 서비스) RTF -> HTML 변환 호출
 */
function convertRtfToHtmlService(params) {
	var result = jQuery.ajax({
		accepts: { json: 'application/json; charset=UTF-8' },
		type: "POST",
		async: false,
		url: IIS_SERVICE_URL + "convertRtfToHtmlDevExpress.aspx",
		data: params
	}).responseText;
	
	return JSON.parse(result);
}

/**
 * 스마트 로그인 키 획득
 */
function getMySmartLoginKey() {
	var result = jQuery.ajax({
		accepts: { json: 'application/json; charset=UTF-8' },
		type: "POST",
		async: false,
		url: g_ContextPath + "/getMySmartLoginKey.do"
	}).responseText;
	
	return JSON.parse(result);
}

/**
 * 메뉴 접속 로그
 */
function sysMenuAccessLog(params) {
	jQuery.ajax({
		accepts: { json: 'application/json; charset=UTF-8' },
		type: "POST",
		url: g_ContextPath + "/sysMenuAccessLog.do",
		data: params
	});
}

/**
 * 메일 발송
 */
function sendMail(params) {
	var result = jQuery.ajax({
		accepts: {
			json: 'application/json; charset=UTF-8'
		},
		type: "POST",
		async: false,
		url: g_ContextPath + "/sendMail.do",
		data: params
	}).responseText;
	
	return JSON.parse(result);
}

/**
 * 이미지 Base64 업로드
 */
function imageUploadBase64(params) {
	var result = jQuery.ajax({	
		accepts: {
			json: 'application/json; charset=UTF-8'
		},		
		type: "POST",
		async: false,
		url: g_ContextPath + "/imageUploadBase64.do",
		data: params
	}).responseText;
	
	return JSON.parse(result);
}

/**
 * 서버파일 경로 반환
 */
function getServerFileUrl(subUrl) {
	var isMidUrl = (subUrl.indexOf('ServerFiles/') != -1);
	if (isMidUrl) {
		return (FILE_SERVER_URL + subUrl);
	} else {
		return (FILE_SERVER_URL + '/ServerFiles/' + subUrl);
	}
}

/**
 * 서버파일 삭제
 */
function removeSysAttachFile(params) {
	var result = jQuery.ajax({
		accepts: {
			json: 'application/json; charset=UTF-8'
		},		
		type: "POST",
		async: false,
		url: g_ContextPath + "/fileDelete.do",
		data: params
	}).responseText;
	
	return JSON.parse(result);
}

/**
 * GeoCoding (주소를 통한 좌표계 취득) 호출
 */
function getGeoCode(address) {
	var regAddr = function(addr) {
		String.prototype.regexIndexOf = function(regex, startpos) {
			var indexOf = this.substring(startpos || 0).search(regex);
			return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
		};
		
		var rev = function(src){ return src.split("").reverse().join(""); };
		var t = new RegExp("[^0^1^2^3^4^5^6^7^8^9^-^ ]");

		addr = rev(addr.substring(0, (addr + "(").indexOf('(')).trim());
		
		while(addr.indexOf(" ") > 0 && addr.regexIndexOf(t, 1) < addr.indexOf(" ") && addr.regexIndexOf(t, 1) >= 0){
			addr = addr.substring(addr.indexOf(" "));
		}
		
		return rev(addr);
	};
	
	var result = jQuery.ajax({
		accepts: {
			json: 'application/json; charset=UTF-8'
		},		
		type: "POST",
		async: false,
		url: g_ContextPath + "/GeoCodingTmap.do",
		data: 'apiKey=' + g_mapkey + '&address=' + regAddr(address)
	}).responseText;

	try {
		return JSON.parse(result);
	} catch(ex) {
		return [0,0];
	}
}

/**
 * 연간일정 .ics(아웃룩 지원) 내보내기
 */
function exportSchedule(params) {
	window.onbeforeunload = null; 
	doPostRequest((g_ContextPath + "/export/exportSchedule.do"), params);
	setTimeout(function(){ window.onbeforeunload = onPageUnload; }, 1000);
}

/**
 * SBO 호출
 */
function callSBO(dataArray, type, target, isSync) {
	var packet = createPacket(dataArray);
	var spes = packet.indexOf('&');
	var rpcName = packet.substr(3, (spes - 3));
	var async = (isSync === true ? false : true);

	drawToast('#SAVING#');
	console.log('SAP 호출 : ' + rpcName);
	
	var ds = null;
	
	jQuery.ajax({
		accepts: { json: 'application/json; charset=UTF-8' },			
		type : 'POST',
		url: g_ContextPath + "/sbo/" + rpcName + ".do",
		data : packet,
		dataType : "json",
		'async': async,

		success: function(data) {
			try {
				ds = data;
			} finally {
				hideToast();
			}
			
			if (isSync !== true) {
				target.callback(type, ds);
			}
		},
		
		error: function(xhr, exception) {
			hideToast();
			MessageBoxShow('SAP 처리 중 오류가 발생하였습니다. (' + xhr.statusText + ')');
			console.log('status :' + xhr.status);
			console.log('statusText :' + xhr.statusText);
		}
	});
	
	if (isSync) {
		return ds;
	}
}

/**
 * 전산 매체 파일 생성
 */
function createProcessMediaFile(params) {
	var result = jQuery.ajax({
		accepts: { json: 'application/json; charset=UTF-8' },
		type: "POST",
		async: false,
		url: g_ContextPath + "/export/createProcessMediaFile.do",
		data: params
	}).responseText;;
	
	window.open(encodeURI(getServerFileUrl('') + params.file_name));
	return true;
	
}

/**
 * 파일 압축 다운로드
 */
function fileZipDownload(params) {
	try {
		var p = (g_ContextPath + "/zipfile/downloadCpExpenseFiles.do");
		if (params) {
			p += '?';
			var first = true;
			for ( var x in params) {
				if (!first) {
					p += '&';
				} else {
					first = false;
				}
				p += (x + '=' + params[x]);
			}
		}
		window.open(p);
	} catch (err) {
		console.log('fileZipownload() : ' + err.message);
	}
}

function fileZipDownload2(params) {
	try {
		var p = (g_ContextPath + "/zipfile/downloadCpFiles.do");
		if (params) {
			p += '?';
			var first = true;
			for ( var x in params) {
				if (!first) {
					p += '&';
				} else {
					first = false;
				}
				p += (x + '=' + params[x]);
			}
		}
		window.open(p);
	} catch (err) {
		console.log('fileZipownload2() : ' + err.message);
	}
}