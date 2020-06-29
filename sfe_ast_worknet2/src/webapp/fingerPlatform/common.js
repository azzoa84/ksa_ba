function log(output, isForce) {
	if (g_debug || isForce) {
		if (typeof output === 'object' && g_isFcs) {
			console.log(JSON.stringify(output));
		} else {
			console.log(output);
		}
	}
}

function setHeaderContents(contents) {
	var header = document.getElementById('headerTopArea');
	header.innerHTML = contents;
	
	//header.insertAdjacentHTML('afterbegin', contents);
	
	header = null;
}

function relocateChildIndexInPanel(panels) {
	var tabIndex = 100;
	
	if (panels && panels.length) {
		for (var i = 0; i < panels.length; i++) {
			panels[i].relocateChildIndex(tabIndex);
			tabIndex = (tabIndex + 100);
		}
	}
}

function validateControls(controls) {
	for (var i in controls) {
		if (controls[i] != null) {
			if(controls[i].getAllowBlank() == false && (controls[i].getValue() == '' || controls[i].getValue() == null))
			{
				//drawToast(controls[i].getFieldName() + ' 항목을 입력해 주십시오.');
				MessageBoxShow(controls[i].getFieldName() + ' 은(는) 필수입력 항목 입니다.');
				controls[i].setFocus();
			 	return false;
			}
		}
	}

	return true;
}

function printHtml(html, attr, callback) {
	g_openPrintHtml = html;
	g_openPrintHtmlCallback = callback;
	
	window.open(g_ContextPath + "/print.do");
	
	// 18.03.12 이전 Print 소스
	/*
	var attr = attr || '';
	var popup = window.open('', 'popupView', attr);
	
	var afterPrint = function() {
		// 출력(Print) 실행 후 창이 닫히면서 이벤트 호출 (* 크롬에서는 '취소'시에도 작동 함)
		if (callback !== undefined && callback) {
			callback();
		}
	};
	popup.onafterprint = afterPrint;

	var printHandler = function(mql) {
		if (mql.matches) {
			//beforePrint();
		} else {
			$(popup.document).one('mouseover', afterPrint);
		}
	};
	if (popup.matchMedia) {
		var mql = popup.matchMedia('print');
		mql.addListener(printHandler);
	}
	popup.document.write(html);
	popup.document.close();
	popup.focus();
	popup.print();
	popup.close();
	*/
}

function getUrlStatus(url) {
	var http = new XMLHttpRequest();
	http.open('HEAD', url, false);
	http.send();
	
	return http.status;
}

function setCookie(cName, cValue, cDay) {
	var expire = new Date();
	expire.setDate(expire.getDate() + cDay);
	cookies = cName + '=' + escape(cValue) + '; path=/ ';
	if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
		document.cookie = cookies;
}		
    		
function getCookie(cName) {
	cName = cName + '=';
	var cookieData = document.cookie;
	var start = cookieData.indexOf(cName);
	var cValue = '';
	if(start != -1){
		start += cName.length;
		var end = cookieData.indexOf(';', start);

		if(end == -1)end = cookieData.length;
			cValue = cookieData.substring(start, end);
	}

	return unescape(cValue);
}

function setStorage (key, val, dbType) {
	var dbType = (dbType || 'LS');
	
	switch (dbType) {
		case 'LS':
			localStorage.setItem(key, val);
			break;
		case 'SS':
			sessionStorage.setItem(key, val);
			break;
		case 'COOKIE':
			setCookie(key, val, 180);
			break;
	}
}

function getStorage (key, dbType) {
	var dbType = (dbType || 'LS');
	
	switch (dbType) {
		case 'LS':
			return localStorage.getItem(key);
			break;
		case 'SS':
			return sessionStorage.getItem(key);
			break;
		case 'COOKIE':
			getCookie(key);
			break;
	}
}

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (elt /*, from*/) {
		var len = this.length;

		var from = Number(arguments[1]) || 0;
		from = (from < 0)
		 ? Math.ceil(from)
		 : Math.floor(from);
		if (from < 0)
			from += len;

		for (; from < len; from++) {
			if (from in this &&
		  this[from] === elt)
				return from;
		}
		return -1;
	};
}

function loadResources() {	

}

function fillRectR(g, x, y, w, h, r) { if (typeof r === "undefined") { r = 5; } g.beginPath(); g.moveTo(x + r, y); g.lineTo(x + w - r, y); g.quadraticCurveTo(x + w, y, x + w, y + r); g.lineTo(x + w, y + h - r); g.quadraticCurveTo(x + w, y + h, x + w - r, y + h); g.lineTo(x + r, y + h); g.quadraticCurveTo(x, y + h, x, y + h - r); g.lineTo(x, y + r); g.quadraticCurveTo(x, y, x + r, y); g.closePath(); g.fill(); };
function strokeRectR(g, x, y, w, h, r) { if (typeof r === "undefined") { r = 5; } g.beginPath(); g.moveTo(x + r, y); g.lineTo(x + w - r, y); g.quadraticCurveTo(x + w, y, x + w, y + r); g.lineTo(x + w, y + h - r); g.quadraticCurveTo(x + w, y + h, x + w - r, y + h); g.lineTo(x + r, y + h); g.quadraticCurveTo(x, y + h, x, y + h - r); g.lineTo(x, y + r); g.quadraticCurveTo(x, y, x + r, y); g.closePath(); g.stroke(); };

function getControl(id) {
	return document.getElementById(id);
}

function postback(event) {
	document.getElementById("Event").value = event;
	document.getElementById("form").submit();
}

function getRealId(id) {
	var result = id.split('__');
	try {
		return result[result.length - 1];
	}
	finally {
		result = null;
	}
}

function getSize(text) {
	var ruler = document.getElementById('ruler');
	ruler.innerHTML = text;
	return ruler.offsetWidth;
}

function addEventHandler(oNode, evt, oFunc, bCaptures) {
	if (document.addEventListener) {
		// Safari, Chrome, Fx, etc
		oNode.addEventListener(evt, oFunc, bCaptures);
	} else if (document.attachEvent) {
		// IE
		oNode.attachEvent('on' + evt, oFunc);
	} else {
		// If all else fails
		oNode['on' + evt] = oFunc;
	}
}

function getElementsByClassName(classname, node) {
	if (!node) node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName("*");
	for (var i = 0, j = els.length; i < j; i++)
		if (re.test(els[i].className)) a.push(els[i]);
	return a;
}

function findIndexInData(data, property, value) {
    var result = -1;
    data.some(function (item, i) {
        if (item[property] === value) {
            result = i;
            return true;
        }
    });
    return result;
}
/*
jQuery.fn.ForceNumericOnly =
function() {
	return this.each(function() {
		jQuery(this).keydown(function(e) {
			var key = e.charCode || e.keyCode || 0;
			// allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
			return (
				key == 8 ||
				key == 9 ||
				key == 46 ||
				(key >= 37 && key <= 40) ||
				(key >= 46 && key <= 57) ||
				(key >= 96 && key <= 105));
		});

		jQuery(this).focusout(function() {
			jQuery(this).val(	  jQuery(this).val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
		});

		jQuery(this).focusin(function() {
			jQuery(this).val((jQuery(this).val().replace(/\,/g, '') * 1.0).toFixed(2));
		});
	})
};
*/

function Session() {
	this.obj = new Object();

	this.userid = '';
	this.username = '';

	this.setValue = function(key, value) {
		this.obj[key] = value;
	}

	this.getValue = function(key) {
		return this.obj[key];
	}
}

function setUnderLine(e) {
	e.style.color = 'black';
	e.style.textDecoration = 'underline';
}

function setNoneTextDecoration(e) {
	e.style.textDecoration = 'none';
}

function getTimeStamp(d) {	
	var s =
	leadingZeros(d.getFullYear(), 4) + '' +
	leadingZeros(d.getMonth() + 1, 2) + '' +
	leadingZeros(d.getDate(), 2) + '' +

	leadingZeros(d.getHours(), 2) + '' +
	leadingZeros(d.getMinutes(), 2) + '' +
	leadingZeros(d.getSeconds(), 2);

	return s;
}

function leadingZeros(n, digits) {
	var zero = '';
	n = n.toString();

	if (n.length < digits) {
		for (i = 0; i < digits - n.length; i++)
			zero += '0';
	}
	return zero + n;
}

function removeScript(value) {
	var result = value.replace(/script/gi, '');
	alert(result);
	return result;
}

// 모바일 브라우저 체크
function isMobile() {
	var check = false;
	(function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
	return check;
}

// 브라우저 체크
function getBrowserName() {
	var agt = navigator.userAgent.toLowerCase();

	if (agt.indexOf("chrome") != -1) return 'Chrome';
	if (agt.indexOf("msie") != -1) return 'Internet Explorer';
	if (agt.indexOf("opera") != -1) return 'Opera';
	if (agt.indexOf("safari") != -1) return 'Safari';
	if (agt.indexOf("firefox") != -1) return 'Firefox'; 
	if (agt.indexOf("netscape") != -1) return 'Netscape'; 
	if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
}

// IE 버전 체크 (return => version number)
function getIEVersion() {
	var word;
	var version = "N/A";

	var agent = navigator.userAgent.toLowerCase(); 
	var name = navigator.appName; 

	// IE old version ( IE 10 or Lower )
	if (name == "Microsoft Internet Explorer") word = "msie ";
	else { 
		// IE 11 
		if ( agent.search("trident") > -1 ) word = "trident/.*rv:"; 
		// Microsoft Edge  
		else if ( agent.search("edge/") > -1 ) word = "edge/";
	} 

	var reg = new RegExp(word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})"); 

	if (reg.exec(agent) != null  ) version = RegExp.$1 + RegExp.$2; 

	//return "N/A";
	return version;
}

// Get Today
function getToday(sep, format) {   
	var dt = new Date();
	sep = sep || '';
	format = format || 'yyyyMMdd';
	
	return getFormatDate(dt, format, sep, null);
}

//Get TodateTime
function getTodateTime(sep, format) {   
	var dt = new Date();
	sep = sep || '';
	format = format || 'yyyyMMddHHmmss';
	
	return getFormatDate(dt, format, sep, null);
}


function setComma(n) {
	var reg = /(^[+-]?\d+)(\d{3})/;
	n += ''; // 숫자인 경우 문자열로 변환

	while (reg.test(n))
		n = n.replace(reg, '$1' + ',' + '$2');

	return n;
};

function unmask(s) {
	return String(s).replace(/[^\d]+/g, "");
};

function trim(s) {
	return String(s).replace(/(^\s*)|(\s*$)/gi, "");
};

function toJsonUrlParam(obj) {
	return "JSON=" + encodeURIComponent(JSON.stringify(obj));
};

function addZero(i) {
	var rtn = i + 100;

	return rtn.toString().substring(1, 3);
}

// 확인창
function MessageBoxShow(msg, exeFunc) 
{
	if (exeFunc) {
		webix.alert({'ok':"확인", 'text':msg, 'callback': exeFunc});
	} else {
		webix.alert({'ok':"확인", 'text':msg});
	}
}

//확인창 2 
function MessageBoxShow2(msg, exeFunc, height, weight)
{
	var fpView = document.getElementById('fpView');
	
	height = height || 150;
	weight = weight || 260;
	
	var msgBox = new FingerWindow(fpView, 'window', 0, 0, weight, height, '확인', msg, 'ok', exeFunc);
	msgBox.show();
}

// 컨펌창(yesNo)
function confirmBoxShow(msg, exeFunc, height, weight)
{
	//webix.confirm({'ok':"예", 'cancel':"아니오", 'text':msg, 'callback': exeFunc});
	var fpView = document.getElementById('fpView');
	
	height = height || 150;
	weight = weight || 260;
	var msgBox = new FingerWindow(fpView, 'window', 0, 0, weight, height, '확인', msg, 'yesNo', exeFunc);
	msgBox.show();
}

var intervalCounter = 0;

function hideToast() {
/*	var alert = document.getElementById("toast");
	alert.style.opacity = 0;
	alert.style.visibility = 'hidden';
	clearInterval(intervalCounter);
*/
	var alert = document.getElementById("toast");
	if (alert != null) {
		alert.parentNode.removeChild(alert);
		clearInterval(intervalCounter);
		$('.blockui').hide();
	}
}

function drawToast(message) {
	var alertT = document.getElementById("toast");
	var toastHTML = '';
	
	if (message == '#LOADING#')
		var dispMsg = '조회 중 입니다.';
	else if (message == '#SAVING#')
		var dispMsg = '처리 중 입니다.';
	
	if (message == '#SAVING#') {
		$('.blockui').show();
	}
	
	if (message == '#LOADING#' || message == '#SAVING#')
	{
		var pos = getCenterOnScreen(150, 20);
		toastHTML = '<div id="toast"' + 'style="z-index:2147483647; width:150px; height:20px; display:table; left:' + pos[0] + 'px; top:' + pos[1] + 'px">' +"<img src='./fingerPlatform/images/ajax-loader.gif' style='padding-left:10px; width:32px; vertical-align: middle; display: table-cell;'/>" + "<span style='vertical-align: middle; display: table-cell;'>" + dispMsg + "<span>" + '</div>';
	}
	else
	{
		var pos = getCenterOnScreen(300, 20);
		toastHTML = '<div id="toast"' + 'style="z-index:2147483647; width:300px; height:20px; left:' + pos[0] + 'px; top:' + pos[1] + 'px">' + message + '</div>';
	}
	
	if (alertT != null) {
		hideToast();
	}
	document.body.insertAdjacentHTML('beforeEnd', toastHTML);
	
	if (message != '#LOADING#' && message != '#SAVING#')
		intervalCounter = setInterval("hideToast()", 2000);
}

function drawLoading() {
	var loading = document.getElementById("loading");
	

	if (loading == null) {
		
	var toastHTML = '<div id="loading"' + 'style="z-index:2147483647; display:table; left:' + pos[0] + 'px; top:' + pos[1] + 'px">' +"<img src='./fingerPlatform/images/ajax-loader.gif' style='padding-left:10px; width:32px; vertical-align: middle; display: table-cell;'/>"+ "<span style='vertical-align: middle; display: table-cell;'>조회 중 입니다.<span>" + '</div>';
	   // alert(toastHTML);
	document.body.insertAdjacentHTML('beforeEnd', toastHTML);
	}
	else {
		loading.style.visibility = 'visible';
		loading.innerHTML = '조회 중 입니다.';
		loading.style.opacity = .9;
	}	
}

function hideLoading() {
	
	var loading = document.getElementById("loading");
	if(loading != null)
	loading.parentNode.removeChild(loading);
}


function doDecoder(value) {
	if (value != undefined && value != '') {
		return value.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
	}
	else
		return value;
}

function dtConverter(dt, sep) {
	if (!dt) return;
	return dt.getFullYear() + sep + addZero(dt.getMonth() + 1) + sep + addZero(dt.getDate());		
};

function stringToDate(str) {
	var dt = new Date(str.substr(0, 4), Number(str.substr(4, 2)) - 1, str.substr(6, 2));
	return dt;
};

function getLastDate(yyyymmdd) {
	if (!yyyymmdd || yyyymmdd.length < 6)
		return;
	
	var lastDay = ( new Date(yyyymmdd.substring(0,4) , yyyymmdd.substring(4,6), 0) ).getDate();
	
	return yyyymmdd.substring(0,4) + yyyymmdd.substring(4,6) + lastDay;
}

function getCompareDate(yyyymmdd, yyyymmdd2) {
	if (!yyyymmdd || !yyyymmdd2 || yyyymmdd.length != 8 || yyyymmdd2.length != 8)
		return;
	
	var dateObj = new Date(yyyymmdd2.substring(0,4), Number(yyyymmdd2.substring(4,6))-1, yyyymmdd2.toString().substring(6,8));  
	var dateObj2 = new Date(yyyymmdd.substring(0,4), Number(yyyymmdd.substring(4,6))-1, yyyymmdd.toString().substring(6,8));  
	var betweenDay = (dateObj.getTime() - dateObj2.getTime())/1000/60/60/24;  
	
	return betweenDay;
}

function getCalcDate(yyyymmdd, calcDay) {
	if (!yyyymmdd || yyyymmdd.length != 8)
		return;

	var dt = new Date(yyyymmdd.substr(0, 4), Number(yyyymmdd.substr(4, 2)) - 1, yyyymmdd.substr(6, 2));

	dt.setDate(dt.getDate() + calcDay);

	return dt.getFullYear() + addZero(eval(dt.getMonth() + 1)) + addZero(dt.getDate());
}

function getCalcMonth(yyyymmdd, calcMon) {
	if (!yyyymmdd || yyyymmdd.length != 8)
		return;

	var dt = new Date(yyyymmdd.substr(0, 4), Number(yyyymmdd.substr(4, 2)) - 1, yyyymmdd.substr(6, 2));
	var year = dt.getFullYear();
	var month = dt.getMonth();

	month = month + calcMon;

	if (month <= 0)
	{
		year = year - 1;		
		month = month + 12;
	}

	dt.setYear(year);
	dt.setMonth(month);

	return dt.getFullYear() + addZero(eval(dt.getMonth() + 1)) + addZero(dt.getDate());
}

function extFormat(value, format, delimiter, timeDelimiter) {
	var dd = delimiter || '-';
	var td = timeDelimiter || ':';
	var out = String(value);
	
	if (out) {
		switch (format) {
			case 'yyyy':
				out = out.substr(0, 4);
				break;
			case 'yyyyMM':
				out = out.substr(0, 4) + dd + out.substr(4, 2);
				break;
			case 'yyyyMMdd':
				out = out.substr(0, 4) + dd + out.substr(4, 2) + dd + out.substr(6, 2);
				break;
			case 'yyyyMMddHHmm':
				out = out.substr(0, 4) + dd + out.substr(4, 2) + dd + out.substr(6, 2) + ' ' + out.substr(8, 2) + td + out.substr(10, 2);
				break;
			case 'yyyyMMddHHmmss':
				out = out.substr(0, 4) + dd + out.substr(4, 2) + dd + out.substr(6, 2) + ' ' + out.substr(8, 2) + td + out.substr(10, 2) + td + out.substr(12, 2);
				break;
			case 'HHmm':
				out = out.substr(0, 2) + td + out.substr(2, 2);
				break
			case 'Hmm':
				var H = (Number(out.substr(0, 2)) > 9 ? out.substr(0, 2) : out.substr(1, 1));
				out = H + td + out.substr(2, 2);
				break;
			case 'HHmmss':
				out = out.substr(0, 2) + td + out.substr(2, 2) + td + out.substr(4, 2);
				break;
				
			default :
				break;
		}
	}
	return out;
}

/**
 * 
 * @param jsonData (그리드 jsonData)
 * @param column (그리드 헤더 컬럼)
 * 엑셀 다운로드
 * 2016.08.20 이준혁
 * @returns
 */
function excelDown(jsonData, column, xlsFileName) {
	if (jsonData && jsonData.length) {
		excelexportjs({
			containerid: "dvjson"
			, datatype: 'json'
			, dataset: jsonData
			, columns: column
			, worksheetName: 'Sheet1'
			, xlsFileName: (xlsFileName || '다운로드')
		});
		
		// webix.toExcel(); 를 이용하도록 변경 (* 엑셀다운로드 방식 통일을 위해)
		// (17.06.13) 김영도
		/*
		var dt = new webix.DataCollection({});
		//dt.parse($.extObj.serialize());
		dt.parse(jsonData);
		webix.toExcel(dt, {
			filterHTML: true
		});
		*/
	} else {
		MessageBoxShow('출력할 데이터가 없습니다.');
	}
}

function getCenterOnScreen(width, height) {	

	var w_width = jQuery(window).width();
	var w_heigth = jQuery(window).height();


	var left = (w_width - width) / 2 + jQuery(window).scrollLeft();
	var top = (w_heigth - height) / 2 + jQuery(window).scrollTop();

	var result = [];
	result.push(left);
	result.push(top);

	return result;
}

/**
 * Object Deep Copy
 */
function deepCopyObj (org) {
	if (!org) return null;
	return JSON.parse(JSON.stringify(org));
}

function dayNumberToString(day) {
	if (day == 0) { return '일요일'; } 
	else if (day == 1) { return '월요일'; }
	else if (day == 2) { return '화요일'; }
	else if (day == 3) { return '수요일'; }
	else if (day == 4) { return '목요일'; }
	else if (day == 5) { return '금요일'; }
	else if (day == 6) { return '토요일'; }
}

/**
 * Java Date 등의 포맷으로 넘어오는 경우
 * 함수를 통해 치환
 * @param list
 */
function convertJavaDateToJs(list, format) {
	format = format || 'default';
	
	try {
		for (var i in list) {
			for (var j in list[i]) {
				for (var k in list[i][j]) {
					if (typeof list[i][j][k] === 'object' && list[i][j][k]['date']) {
						
						var def = '20' + String(list[i][j][k]['year']).substr(1, 3)
						+ ((list[i][j][k]['month'] + 1) < 10 ? '0' + String((list[i][j][k]['month'] + 1)) : String((list[i][j][k]['month'] + 1)))
						+ (list[i][j][k]['date'] < 10 ? '0' + String(list[i][j][k]['date']) : String(list[i][j][k]['date']))
						+ (list[i][j][k]['hours'] < 10 ? '0' + String(list[i][j][k]['hours']) : String(list[i][j][k]['hours']))
						+ (list[i][j][k]['minutes'] < 10 ? '0' + String(list[i][j][k]['minutes']) : String(list[i][j][k]['minutes']))
						+ (list[i][j][k]['seconds'] < 10 ? '0' + String(list[i][j][k]['seconds']) : String(list[i][j][k]['seconds']));
						
						if (format == 'default') {
							list[i][j][k] = def;
						} else if (format == 'default_day') {
							list[i][j][k] = def + String(list[i][j][k]['day']);
						} else if (format == 'yyyymmddhhmmss') {
							list[i][j][k] = def.substr(0, 4) + '-' + def.substr(4, 2) + '-' + def.substr(6, 2) + ' ' + def.substr(8, 2) + ':' + def.substr(10, 2) + ':' + def.substr(12, 2);
						}
					}
				}
			}
		}		
	} catch (err) {
		console.log('common convertJavaDateToJs() : ' + err.message);
	}
}

/**
 * 
 * @param value (date value)
 * @param format (format할 구분값)
 * value 값의 타입이 string이 아니고 date 일 때 포맷 변경
 * 2016.09.09 이준혁
 * 
 * getFormatDate 함수 수정
 * @returns
 */
function getMonthName(dt) {
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	return monthNames[dt.getMonth()];
};

function getFormatDate(dt, format, delimiter, timeDelimiter) {
	var dd = delimiter || '';
	var td = timeDelimiter || ':';
	
	if (!dt) return;
	if (typeof dt === 'string') return unmask(dt);
	
	var out = "";
	switch (format) {
		case 'yyyy':
			out = dt.getFullYear();
			break;
		case 'yyyyMM':
			out = dt.getFullYear() + dd + addZero(dt.getMonth() + 1);
			break;
		case 'yyyyMMdd':
			out = dt.getFullYear() + dd + addZero(dt.getMonth() + 1) + dd + addZero(dt.getDate());
			break;
		case 'yyyyMMddHHmm':
			out = dt.getFullYear() + dd + addZero(dt.getMonth() + 1) + dd + addZero(dt.getDate()) + ' ' + addZero(dt.getHours()) + td + addZero(dt.getMinutes());
			break;
		case 'yyyyMMddHHmmss':
			out = dt.getFullYear() + dd + addZero(dt.getMonth() + 1) + dd + addZero(dt.getDate()) + ' ' + addZero(dt.getHours()) + td + addZero(dt.getMinutes()) + td + addZero(dt.getSeconds());
			break;
		case 'MM':
			out = addZero(dt.getMonth() + 1);
			break;	
		case 'HHmm':
			out = addZero(dt.getHours()) + td + addZero(dt.getMinutes());
			break;
		case 'HHmmss':
			out = addZero(dt.getHours()) + td + addZero(dt.getMinutes()) + td + addZero(dt.getSeconds());
			break;
		case 'reportYm':
			// 리포트 헤더 표시 전용
			out = getMonthName(dt) + ', ' + dt.getFullYear();
			break;
	}
	
	function addZero(i) {
		var rtn = i + 100;
		return rtn.toString().substring(1, 3);
	}
	
	return out;
};

/**
 * 
 * @param cId (Column ID) Object
 * @param data (배열 DATA) Array
 * 엑셀 업로드시 배열 데이터를 객체로 변환
 * 2016.09.20 이준혁
 * @returns
 */
function convertArrayToObject(cId, data) {
	var json = [];
	for (var i = 0; i < data.length; i++) {
		var obj = {};
		obj['rowType'] = 'N';
		for (var j = 0; j < cId.length; j++) {
			obj[cId[j]] = data[i][j] || '';
		}
		json.push(obj);
	}
	return json;
}

/**
 * 
 * @param code (sub_code) string
 * @param value (code_name) string
 * 콤보 박스 데이터 Key값 변경
 * 2016.10.31 이준혁
 * @returns
 */
function objectKeyChange(ds, code, value) {
	var obj = [];
	for (var i = 0; i < ds.length; i++) {
		obj.push({sub_code: ds[i][code], code_name: ds[i][value]});
	}
	
	return obj;
}

/**
 * HTML 태그 제거하여 반환
 */
function convertHtmlToPlain(obj) {
	if (typeof obj === 'string') {
		obj = obj.replace(/(<([^>]+)>)/gi, "").replace(/&nbsp;/gi, "").trim();
	} else {
		for (var i in obj) {
			if (typeof obj[i] === 'string') {
				obj[i] = obj[i].replace(/(<([^>]+)>)/gi, "").replace(/&nbsp;/gi, "").trim();
			}
		}
	}
	return obj;
}

/**
 * RTF 포맷형태의 String 또는 해당 String을 포함한 Object의 RTF를 HTML로 치환하여 반환
 */
function convertRtfToHtml(obj) {
	if (typeof obj === 'string') {
		if (obj && obj.indexOf('rtf1') != -1) {
			obj = convertRtfToHtmlService({'rtfText': obj}).convertHtml;
		}
	} else {
		for (var i in obj) {
			if (obj[i] && String(obj[i]).indexOf('rtf1') != -1) {
				obj[i] = convertRtfToHtmlService({'rtfText': obj[i]}).convertHtml;
			}
		}		
	}
	return obj;
}

/**
 * [Array<String> => String(구분문자)]
 * @param  {[Array]} 
 */
function arrToStr(arr, sChar) {
	if (!arr || arr.length == 0)
		return "";
	
	var result = "";
	sChar = sChar || "|"; // 기본 구분 파이프라인('|')
	for (var i=0, len=arr.length; i < len; i++) {
		if (i == 0)
			result += (arr[i] || "");
		else
			result += (sChar + (arr[i] || ""));
	}
	
	return result;
};

/**
 * [Array<Object> => String(구분문자)]
 * @param  {[Array]} 
 */
function arrToStr2(arr, key, sChar) {
	if (!arr || arr.length == 0)
		return "";
	
	var result = "";
	sChar = sChar || "|"; // 기본 구분 파이프라인('|')
	for (var i=0, len=arr.length; i < len; i++) {
		if (i == 0)
			result += (arr[i][key] || "");
		else
			result += (sChar + (arr[i][key] || ""));
	}
	
	return result;
};

/**
 * [Array<Object> => Object<String(구분문자)>]
 * @param  {[Array]}
 */
function arrToObj(arr, sChar) {
	if (!arr || arr.length == 0)
		return null;
	
	var result = {};
	for (var key in arr[0]) {
		result[key] = "";
	}
	
	sChar = sChar || "|"; // 기본 구분 파이프라인('|') 
	for (var i=0, len=arr.length; i < len; i++) {
		for (var k in arr[i]) {
			if (k in result) {
				if (i == 0)
					result[k] += (arr[i][k] || "");
				else
					result[k] += (sChar + (arr[i][k] || ""));
			}
		}
	}
	
	return result;
};

/**
 * Object 복사
 */
function copyObj (org) {
	var clone = {};
	for (var i in org) {
		clone[i] = (typeof org[i] == 'object') ? arguments.callee(org[i]) : org[i];
	}
	return clone;
};

/**
 * Array 복사
 */
function copyArray (org) {
	var clone = [];
	for (var i = 0; i < org.length; i++) {
		clone.push(cloneObj(org[i]));
	}
	return clone;
	
	function cloneObj(org) {
		var clone = {};
		for (var i in org) {
			clone[i] = (typeof org[i] == 'object') ? arguments.callee(org[i]) : org[i];
		}
		return clone;
	}
};

/**
 * List에서 byte[]를 꺼내 base64로 변경
 */
function convertByteArrayListToImageSource(list) {
	try {
		if (!list) return;
		
		if (Array.isArray(list)) {
			for (var i = 0; i < list.length; i++) {
				if (typeof list[i] === 'object') {
					for (var k in list[i]) {
						if (list[i][k] && Array.isArray(list[i][k])) {
							list[i][k] = convertByteArrayToImageSource(list[i][k]);
						}
					}
				}
			}
		} else if (typeof list === 'object') {
			for (var k in list) {
				if (list[k] && Array.isArray(list[k])) {
					list[k] = convertByteArrayToImageSource(list[k]);
				}
			}
		}
	} catch (err) {
		console.log('common convertJavaDateToJs() : ' + err.message);
	}
}

/**
 * 파일 확장자 반환
 */
function getFileExtension(filename) {
	return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : '';
}

/**
 * byte[] 를 Base64 코드로 변경하여 
 * Image.src 에 바로 넣을 수 있도록 반환 
 * @returns
 */
function convertByteArrayToImageSource(buffer) {
	if (!buffer) return null;
	
	var mime;
	var a = new Uint8Array(buffer);
	var nb = a.length;
	if (nb < 4)
		return null;

	var b0 = a[0];
	var b1 = a[1];
	var b2 = a[2];
	var b3 = a[3];
	
	if (b0 == 0x89 && b1 == 0x50 && b2 == 0x4E && b3 == 0x47)
		mime = 'image/png';
	else if (b0 == 0xff && b1 == 0xd8)
		mime = 'image/jpeg';
	else if (b0 == 0x47 && b1 == 0x49 && b2 == 0x46)
		mime = 'image/gif';
	else if (b0 == 0x42 && b1 == 0x4d)
		mime = 'image/bmp';
	else
		return null;
	
	var binary = "";
	for (var i = 0; i < nb; i++)
		binary += String.fromCharCode(a[i]);
	var base64 = window.btoa(binary);
	//console.log(mime);
	//console.log(base64);
	return 'data:' + mime + ';base64,' + base64;
}

function getSizeBase64Img(base64) {
	$("body").append("<img id='tmp_image_size_check' src='"+base64+"' />");
	var width = $('#tmp_image_size_check').width();
	var height = $('#tmp_image_size_check').height();
	$('#tmp_image_size_check').remove();
	return [width, height];
}

function resizeBase64Img(base64, width, height) {
	var canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	var context = canvas.getContext("2d");
	var deferred = $.Deferred();
	$("<img/>").attr("src", base64).load(function() {
		context.scale(width/this.width,  height/this.height);
		context.drawImage(this, 0, 0); 
		//deferred.resolve($("<img/>").attr("src", canvas.toDataURL()));
		deferred.resolve(canvas.toDataURL());
	});
	return deferred.promise();
}

function randomString(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
    return result;
}

/**
 * '<' 또는 '>' 값을 '(' 또는 ')' 로 치환
 */
function overrideBracket(data) {
	if (!data) return;
	
	if (typeof data === 'object') {
		if (data.length > 0) {
			for (var i in data) {
				for (var j in data[i]) {
					if (data[i][j] && typeof data[i][j] === 'string') {
						data[i][j] = data[i][j].replace(/</g, '(').replace(/>/g, ')').replace(/&/g, "n").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
					}
				}
			}
		} else {
			var keys = Object.keys(data); 
			
			for (var i in keys) {
				if (data[keys[i]] && typeof data[keys[i]] === 'string') {
					data[keys[i]] = data[keys[i]].replace(/</g, '(').replace(/>/g, ')').replace(/&/g, "n").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
				}
			}
		}
	} else if (typeof data === 'string') {
		data = data.replace(/</g, '(').replace(/>/g, ')').replace(/&/g, "n").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
	}
	
	return data;
}

/**
 * GET 호출 URL 생성
 */
function getQueryUrl(url, params) {
	var p = url;
	if (params) {
		p += '?';
		var first = true;
		for(var x in params) {
			if (!first) {
				p += '&';
			} else {
				first = false;	
			}
			p += (x + '=' + params[x]);
		}
	}
	return encodeURI(p);
};

/**
 * POST 요청
 */
function doPostRequest(url, params) {
    var temp = document.createElement("form");
    temp.action = url;
    temp.method = "POST";
    //temp.enctype = "multipart/form-data";
    temp.style.display="none";
    for(var x in params) {
        var opt = document.createElement("textarea");
        opt.name = x;
        opt.value = params[x];
        temp.appendChild(opt);
    }
    document.body.appendChild(temp);
    temp.submit();
    document.body.removeChild(temp);
    return temp;
};

function isNull(str){
	var boolean = false;
	
	if(str == '' || str == null || str == 'null' || str == undefined || str == 'undefined') boolean = true;
	
	return boolean;
}

function excelDataFileDown(fileName)
{
	location.href = g_webRoot + 'doc' + fileName;
}

function switchIndicator(isOn)
{
	if(isOn)
	{
		var loading = '<div id="ajax_indicator" style="display:none; z-index:99999;">' + '<p><img src="'+g_webRoot+'img/ajax-loader.gif" /></p>' + '</div>';
		var isFullWidth = (document.body.clientWidth > 767 ? true : false);
		if(jQuery('body').find('#ajax_indicator').length == 0)
		{
			jQuery(loading).appendTo('body');

			var $loading = jQuery('#ajax_indicator');
			jQuery("#ajax_indicator").css(
			{
				position : "fixed",
				left : ((jQuery(window).width() - $loading.outerWidth()) / 2),
				top : ((jQuery(window).height() - $loading.outerHeight()) / 2)
			});
		}

		var $loading = jQuery('#ajax_indicator');
		jQuery("#ajax_indicator").css(
		{
			left : ((jQuery(window).width() - $loading.outerWidth()) / 2),
			top : ((jQuery(window).height() - $loading.outerHeight()) / 2)
		});
		jQuery('#ajax_indicator').show().fadeIn('fast');
	}
	else
	{
		jQuery('#ajax_indicator').fadeOut();
	}
}