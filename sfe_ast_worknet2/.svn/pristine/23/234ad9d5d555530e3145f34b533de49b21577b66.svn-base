/**
 * 네이버 Husky 에디터에서 사진 업로드
 * @author 김영도
 */
$(document).ready(function() {
	var $ = this;
	$.fileInfo = null;
	// huskyEditorImage 디렉터리에 생성
	$.category = 'HUSKY_EDITOR_IMAGE';
	$.selContainer = null;
	$.imageUploadFunc = null;
	$.imageServerPathFunc = null;
	
	$.init = function() {
		var sel = jQuery('.se2_multy').find('.husky_seditor_ui_photo_attach').find('button');
		if (sel && sel.length) {
			jQuery(sel).on('click', $.clickUpload);
		}
		
		$.selContainer = jQuery('.husky_seditor_editing_area_container');
		
		if ($.imageUploadFunc == null) {
			// 내부에서 별도로 이미지업로드(Ajax) 함수를 생성하지 않은 경우
			// 부모 개체의 함수를 이용
			$.imageUploadFunc = jQuery(parent)[0].imageUploadBase64;
		}
		if ($.imageServerPathFunc == null) {
			// 내부에서 별도로 파일 서버 경로 반환 함수를 생성하지 않은 경우
			// 부모 개체의 함수를 이용
			$.imageServerPathFunc = jQuery(parent)[0].getServerFileUrl;	
		}
	};
	
	// 사진업로드 클릭
	$.clickUpload = function() {
		try {
			// iframe 에서 부모컨테이너의 global 개체인 g_fileBrowser에 접근
			var g_fileBrowser = jQuery(parent)[0].g_fileBrowser;
			g_fileBrowser.browse({filter: 'Image', obj: $});
			
		} catch (err) {
			console.log('FingerPhotoUploader clickUpload() : ' + err.message);
		}
	};
	
	// 파일 브라우저를 통한 이미지 변경 후
	$.fileChange = function(event, files) {
		try {
			var file = files[0];
			$.fileInfo = file;
			
			// 썸네일 이미지 표시
			var reader = new FileReader();
			reader.onload = function (e) {
				var img = new Image();
				img.onload = function() {
					var params = $.getUploadParam( $.initSize(img).toDataURL('image/jpeg', 0.7) );
					
					// 서버 업로드 실행
					var rs = $.uploadBase64(params);
					$.updateAfter(rs);
				};
				
				img.src = e.target.result;
			};

			reader.readAsDataURL(file);

		} catch (err) {
			console.log('FingerPhotoUploader fileChange() : ' + err.message);
		}
	};
	
	// 업로드 후
	$.updateAfter = function(result) {
		try {
			if (!result || (result.errorCode && result.errorCode.indexOf('ERR') > -1)) {
				console.log('FingerPhotoUploader updateAfter() : 서버 업로드 도중 오류가 발생하였습니다.');
				return;
			}
			
			var rInfo = result.resultList[0];
			for (var i = 0; i < rInfo.length; i++) {
				console.log(rInfo[i]);
				
				// huskyEditorImage 디렉터리는 중간 경로
				var imageUrl = $.imageServerPathFunc('huskyEditorImage' + rInfo[i].server_path);
				
				// 에디터에 <img> 태그 생성하여 삽입
				var editor = $.selContainer.find('iframe').eq(0).contents().find('.se2_inputarea').eq(0);
				var old_html = editor.html();
				var add_html = '<p>' + '<img src=' + '"' + imageUrl + '"' + '/>' + '</p>';
				editor.html(old_html + add_html);
			}
		} catch (err) {
			console.log('FingerPhotoUploader updateAfter() : ' + err.message);
		}
	};
 
	$.initSize = function(original) {
		var canvas = document.createElement("canvas");

		// 가로크기 700px 넘어가는 이미지는 축소한다.
		var scale = (original.width > 700) ? Number(700 / original.width).toFixed(2) : 1;	
		canvas.width = original.width * scale;
		canvas.height = original.height * scale;

		canvas.getContext("2d").drawImage(original, 0, 0, canvas.width, canvas.height);
		//console.log(canvas.width + ', ' + canvas.height);

		return canvas;
	};
	
	$.getUploadParam = function(src) {
		//var src = $.getValue();
		
		if (!src) return {};
		
		var obj = {};
		if ($.category) {
			obj['category0'] = $.category;
		}
		obj['image0'] = (src ? src.split(',')[1] : '');
		obj['image_name0'] = ($.fileInfo ? $.fileInfo.name.replace(/\.[^/.]+$/, ".jpg") : ($.generateUUID() + '.jpg'));
		
		delete src;
		return obj;
	};
	
	$.uploadBase64 = function(params) {
		try {
			if (!params) {
				params = $.getUploadParam();
			}
			
			if (params) {
				var rs = $.imageUploadFunc(params);
				return rs;
			} else {
				return null;
			}
		} catch (err) {
			console.log('FingerPhotoUploader uploadBase64() : ' + err.message);
		}
	};	
	
	$.generateUUID = function() {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (d + Math.random()*16)%16 | 0;
			d = Math.floor(d/16);
			return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		});
		return uuid;
	};
	
	// 초기화
	$.init();
});