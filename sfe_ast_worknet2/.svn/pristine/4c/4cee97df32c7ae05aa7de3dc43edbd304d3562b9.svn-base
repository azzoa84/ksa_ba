function FingerFileBrowser(option) {
	var $ = this;
	$.global = false;
	$.target = null;
	$.reader, $.readerType;
	
	if (option) {
		if (option.global) {
			$.global = true;
		}
		var ranstr = Math.random().toString(36).replace(/[^a-z]+/g, '');
		$.id = ('hdn_file_browse_' + ranstr);
		$.ids = ('#' + $.id);
		
		// global 이 아닌 경우에만 TargetElement 및 FileReader를 생성하며
		// global 일 경우, FileBrowse 이벤트 시점에서 관리
		if (!option.global) {
			if (option.target) {
				$.target = option.target;
			}
			
			// ex) useReader: true, readerType: 'image'
			if (option.useReader) {
				$.reader = new FileReader();
				$.reader.onload = function (e) {
					if ($.target && $.target.fileReaderOnload) {
						$.target.fileReaderOnload(e, e.target.result);
					}
				}
				
				if (option.readerType) {
					$.readerType = option.readerType;
				} else {
					$.readerType = 'text';
				}
			}
		}
	} else {
		console.log('FingerFileBrowser() : 파일 브라우저 생성 옵션을 지정해 주시기 바랍니다.');
		return;
	}
	
    var fb = document.createElement('input');
    fb.id = $.id;
    fb.type = 'file';
    fb.style.width = '0px';
    fb.style.height = '0px';
    fb.style.opacity = 0;
    fb.style.display = 'none';
    
    document.body.appendChild(fb);
	
	$.browse = function(option) {
		try {
			var el = document.getElementById($.id);
			el.setAttribute('accept', '*');
			
			if (option) {
				if (option.filter && option.filter == 'Image') {
					el.setAttribute('accept', 'image/*');
				}
				
				if (option.obj) {
					$.target = option.obj;
				} else {
					$.target = null;
				}
			}

			var evt = document.createEvent("MouseEvents");
			evt.initEvent("click", true, false);
			el.dispatchEvent(evt);
			
		} catch (err) {
			console.log('FingerFileBrowser browse() : ' + err.message);
		}
	};
	
	$.change = function(event) {
		try {
			var files = jQuery(event.currentTarget).prop('files');
			if (!files || !files.length) {
				console.log('FingerFileBrowser change() : is empty files');
				return;
			}
			
			if ($.target && $.target.fileChange) {
				$.target.fileChange(event, files);
			}
			
			if (!$.global && $.reader) {
				// 파일 리더 기능 사용시, 멀티파일선택은 지원 안함
				if ($.readerType == 'text') {
					$.reader.readAsText(files[0]);
				} 
				else if ($.readerType == 'image') {
					$.reader.readAsDataURL(files[0]);
				}
			}
			
			// 동일한 파일로 변경하는 경우에도 change 이벤트가 발생하도록 값 비움 처리
			jQuery($.ids).val("");
			
		} catch (err) {
			console.log('FingerFileBrowser change() : ' + err.message);
		}
	};
	
	$.bindEvents = function() {
		var el = document.getElementById($.id);
		
		jQuery(el).on('change', $.change);
	};
	
	$.download = function (fileUrl, fileLink, fileOrgName) {
		try {
			// 파일 링크 연동 여부
			var isFileLink = (fileLink === undefined ? true : fileLink);
			
			if (isFileLink) {
				if (fileUrl.search(/http:/) == -1) {
					fileUrl = getServerFileUrl(fileUrl);
				}
				//console.log('fileUrl : ' + encodeURI(fileUrl).replace(/\+/g, encodeURIComponent('+')));
				window.open(encodeURI(fileUrl));
			}
			else {
				var params = {};
				params['file_path'] = fileUrl;
				params['file_name'] = fileOrgName || '';
				
				var p = (g_ContextPath + "/fileDownload.do");
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
				//window.location = p;
				window.open(p);				
			}

		} catch (err) {
			console.log('FingerFileBrowser download() : ' + err.message);
		}
	};

	// 이벤트 바인딩
	$.bindEvents();	
}