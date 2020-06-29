function FingerImage(host, id, x, y, width, height) {
    var $ = this;
    $.id = host.id + '__' + id;
    $.ids = ('#' + $.id);
    $.x = x;
    $.y = y;
    $.width = width;
    $.height = height;
    $.mode = 'R';
    $.category = null;
    $.fileInfo = null;
    $.downSizing = 0;
    $.isChange = false;
    $.isZooming = false;
    $.isZoomFit = false;
    $.isTurnBtn = false;
    $.isDataUrL = false;
    $.overflow_x = null;
    $.overflow_y = null;
    
    var box = document.createElement('div');
    box.id = $.id;
    box.style.position = 'absolute';
    box.style.width = $.width + 'px';
    box.style.height = $.height + 'px';
    box.style.left = $.x + 'px';
    box.style.top = $.y + 'px';
    box.className = 'FingerImage';
    //box.className = 'FingerImage img-center-align';

    var btnAdd = document.createElement('div');
    btnAdd.style.position = 'absolute';
    btnAdd.style.top = String(Number($.height / 2).toFixed(2) - 20) + 'px';
    btnAdd.style.left = String(Number($.width / 2).toFixed(2) - 20) + 'px';
    btnAdd.style.width = '35px';
    btnAdd.style.height = '35px';
    btnAdd.className = 'func_icon add_btn_icon';
    box.appendChild(btnAdd);
    
    var btnDel = document.createElement('div');
    btnDel.style.position = 'absolute';
    btnDel.style.top = '5px';
    btnDel.style.right = '6px';
    btnDel.style.width = '26px';
    btnDel.style.height = '26px';
    btnDel.className = 'func_icon del_btn_icon';
    box.appendChild(btnDel);
    
    var btnLtrn = document.createElement('div');
    btnLtrn.style.position = 'absolute';
    btnLtrn.style.top = '5px';
    btnLtrn.style.left = '6px';
    btnLtrn.style.width = '26px';
    btnLtrn.style.height = '26px';
    btnLtrn.className = 'func_icon lturn_btn_icon';
    box.appendChild(btnLtrn);
    
    var btnRtrn = document.createElement('div');
    btnRtrn.style.position = 'absolute';
    btnRtrn.style.top = '5px';
    btnRtrn.style.left = '36px';
    btnRtrn.style.width = '26px';
    btnRtrn.style.height = '26px';
    btnRtrn.className = 'func_icon rturn_btn_icon';
    box.appendChild(btnRtrn);
    
    var e = document.createElement('img');
    e.className = 'img-fixed-size';
        
    box.appendChild(e);
    host.appendChild(box);
    
    //var sel = jQuery($.ids);
    //sel.find('img').css('cursor', 'pointer');
    
    // 이미지 카테고리 지정
    $.setCategory = function(category) {
    	$.category = category;
    };
	
	// 모드 변경 (R:보기전용, N:이미지신규등록, U:변경또는삭제)
	$.setMode = function(mode) {
		$.mode = mode;
		var sel = jQuery($.ids);
		sel.find('.func_icon').removeClass('on');
		
		if (mode == 'R') {
			if ($.isTurnBtn) {
				// angle 값 초기화
				$.rotate('I');
				sel.find('.lturn_btn_icon').addClass('on');
				sel.find('.rturn_btn_icon').addClass('on');
			}			
		} else if (mode == 'N') {
			sel.find('.add_btn_icon').addClass('on');
		} else if (mode == 'U') {
			if ($.isTurnBtn) {
				// angle 값 초기화
				$.rotate('I');
				sel.find('.lturn_btn_icon').addClass('on');
				sel.find('.rturn_btn_icon').addClass('on');
			}
			sel.find('.del_btn_icon').addClass('on');
		}
	};
	
	$.eventChange = function() {
		var value = $.getValue();
		
		if (g_container != null && host.id == 'fpView') {
			if (g_container.fingerimage_change != undefined) {
				g_container.fingerimage_change(getRealId($.id), value);
			}
		}
		else if (g_popupStack && g_popupStack.has()) {
			if (g_popupStack.get().obj && g_popupStack.get().obj.fingerimage_change != undefined) {
				g_popupStack.get().obj.fingerimage_change(getRealId($.id), value);
			}
		} else {
			if (g_currentModule != null) {
				if (g_currentModule.fingerimage_change != undefined) {
					g_currentModule.fingerimage_change(getRealId($.id), value);
				}
			}
		}
	}
	
	// 파일 브라우저를 통한 이미지 변경
	$.fileChange = function(event, files) {
		try {
			var file = files[0];
			var file_ext = getFileExtension(file.name);
			$.fileInfo = file;
			
			// 썸네일 이미지 표시
			var reader = new FileReader();
			reader.onload = function (e) {
				if (file_ext == 'tif') {
					var tiff = new Tiff({buffer: e.target.result});
					var tiff_canvas = tiff.toCanvas();
					if (tiff_canvas) {
						// 이미지가 일정 픽셀 이상 큰 경우, 축소하여 삽입 (퀄리티 0.8)
						$.setValue($.initSize(tiff_canvas).toDataURL('image/jpeg', 0.8));
						
						// 수정 모드로 변경
						$.setMode('U');
						
					    // change event
					    $.eventChange();						
					}
				}
				else {
					var img = new Image();
					img.onload = function() {
						// 이미지가 일정 픽셀 이상 큰 경우, 축소하여 삽입 (퀄리티 0.8)
						$.setValue($.initSize(img).toDataURL('image/jpeg', 0.8));
						
						// 수정 모드로 변경
						$.setMode('U');
						
					    // change event
					    $.eventChange();
					};
					
					img.onerror = function(event) {
						MessageBoxShow('이미지 파일을 로드하는 과정에서 오류가 발생하였습니다.<br/><br/>해당 이미지를 관리자에게 전달해 주시기 바랍니다.');
						return;
					};
					img.src = e.target.result;					
				}
			};
			
			if (file_ext == 'tif') {
				reader.readAsArrayBuffer(file);
			} else {
				reader.readAsDataURL(file);
			}

		} catch (ex) {
			MessageBoxShow(('파일을 불러오는중 오류가 발생하였습니다.<br/><br/>' + ex.message + '<br/><br/>' + ex.stack), 500);
		}
	};
	
	$.fileRemove = function() {
		// 이미지 제거
		$.setValue('');
		
		// 추가 모드로 변경
		$.setMode('N');
		
		// 변경 여부
		$.isChange = true;
		
		// 파일 정보 제거
		$.fileInfo = null;
	};
	
	$.getUploadParam = function() {
		var src = $.getValue();
		
		if (!src) return {};
		
		var obj = {};
		if ($.category) {
			obj['category'] = $.category;
		}
		obj['image_base64'] = (src ? src.split(',')[1] : '');
		obj['image_name'] = ($.fileInfo ? $.fileInfo.name.replace(/\.[^/.]+$/, ".jpg") : ('image_' + $.id + '.jpg'));
		
		delete src;
		return obj;
	};

    // 이미지 클릭
	$.click = function() {
		var param = {'img_src': $.getValue()};
		if ($.mode == 'N' || !param['img_src']) {
			return;
		}
		
		if ($.isZooming) {
			var size = $.getRealSize();
			
			// zoom 사이즈 적용
			var wind_w = jQuery(window).width();
			var wind_h = jQuery(window).height();
			var zoom_w = (wind_w * 0.65);
			var zoom_h = (wind_h * 0.8);
			
			// zoom 사이즈 적용 End.
			
			if ($.isZoomFit) {
				if (size[0] > zoom_w || size[1] > zoom_h) {
					if (size[0] > size[1]) {
						size[1] = (size[1] / size[0]) * zoom_w;
						size[0] = zoom_w;
					} else {
						size[1] = (size[1] / size[0]) * zoom_h;
						size[0] = zoom_h;
					}
				}		
			}
			
			if ($.isZoomTurn) {
				param['turn_btn'] = true;
			}
			var popW = (size[0] + 3);
			var popH = (size[1] + 40);
			param['img_size'] = size;
			
			g_main.openPopup('popImageView.html', 'popImageView', '이미지보기', popW, popH, '', '', param, '', '');
		}
		if (g_container != null && host.id == 'fpView') {
			if (g_container.fingerimage_click != undefined) {
				g_container.fingerimage_click(getRealId($.id));
			}
		}
		else if (g_popupStack && g_popupStack.has()) {
			if (g_popupStack.get().obj && g_popupStack.get().obj.fingerimage_click != undefined) {
				g_popupStack.get().obj.fingerimage_click(getRealId($.id));
			}
		} else {
			if (g_currentModule != null) {
				if (g_currentModule.fingerimage_click != undefined) {
					g_currentModule.fingerimage_click(getRealId($.id));
				}
			}
		}
	};
	
	$.bindEvents = function() {
		// 이미지 클릭
		if (e.addEventListener) {
			e.addEventListener("click", $.click, false);
		} else if (e.attachEvent) {
			e.attachEvent("onclick", $.click);
		}
		
		var sel = jQuery($.ids);
		sel.find('.add_btn_icon').on('click', $.clickAddBtn);
		sel.find('.del_btn_icon').on('click', $.fileRemove);
		sel.find('.lturn_btn_icon').on('click', function () {
			$.rotate('L');
		});
		sel.find('.rturn_btn_icon').on('click', function () {
			$.rotate('R');
		});
	};
	
	$.clickAddBtn = function() {
		g_fileBrowser.browse({filter: 'Image', obj: $});
	};

	// 이미지 회전
	$.rotate = function(t) {
		var angle = this.getRotationDegrees();

		if (isNaN(t)) {
			switch(t) {
				case 'I':
					// 초기화
					angle = 0;
					break;
				case 'L':
					angle += 270;
					break;
				case 'R':
					angle += 90;
					break;

				default: angle += 0; break;
			}
		} else { // angle값 인자인 경우
			angle += t;
		}

		var obj = jQuery($.ids).find('img');
		var transform = 'rotate(' + angle + 'deg)';
		obj.css('-webkit-transform', transform).css('-moz-transform', transform).css('-ms-transform', transform).css('-o-transform', transform).css('transform', transform);
		
		// 회전 후 처리
		$.rotateAfter(angle);
	};
	
	// 이미지 회전 후 처리
	$.rotateAfter = function(value) {
		if (g_container != null && host.id == 'fpView') {
			if (g_container.fingerimage_rotate != undefined) {
				g_container.fingerimage_rotate(getRealId($.id), value);
			}
		}
		else if (g_popupStack && g_popupStack.has()) {
			if (g_popupStack.get().obj && g_popupStack.get().obj.fingerimage_rotate != undefined) {
				g_popupStack.get().obj.fingerimage_rotate(getRealId($.id), value);
			}
		} else {
			if (g_currentModule != null) {
				if (g_currentModule.fingerimage_rotate != undefined) {
					g_currentModule.fingerimage_rotate(getRealId($.id), value);
				}
			}
		}
	};
	
	// 이미지 회전 후 위치값 재지정
	$.rotateTranslate = function(angle) {
		var obj = jQuery($.ids).find('img');
		var imgW = obj.width();
		var imgH = obj.height();
		var pos = Number((imgW - imgH) / 2).toFixed(2);
		
		if (angle == 90 || angle == 270 || angle == 450) {
			var wt = -pos;
			var ht = pos;
			
			var transform = 'translate(' + wt + 'px' + ',' + ht + 'px)';
			transform = transform + (' rotate(' + angle + 'deg)');
			//console.log('transform : ' + transform);
			
			obj.css('-webkit-transform', transform).css('-moz-transform', transform).css('-ms-transform', transform).css('-o-transform', transform).css('transform', transform);			
		}
	};
	
	// 이미지 회전값(각도) 구하기
	$.getRotationDegrees = function() {
		var obj = jQuery($.ids).find('img');
		var matrix = obj.css("-webkit-transform") ||
		obj.css("-moz-transform") ||
		obj.css("-ms-transform") ||
		obj.css("-o-transform")	||
		obj.css("transform");
		var angle = 0;
		if (matrix && matrix !== 'none') {
			var values = matrix.split('(')[1].split(')')[0].split(',');
			var a = values[0];
			var b = values[1];
			angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
		} else { angle = 0; }

		if (angle < 0) angle += 360;
		return angle;
	};
	
	// 이벤트 바인딩
	$.bindEvents();	
	
    e = null;
}

FingerImage.prototype.initSize = function(original) {
	var element = Object.getPrototypeOf(original);
	if (element.toString() == "[object HTMLCanvasElement]") {
	} else {
	}
	
	var canvas = document.createElement("canvas");

	// 축소 스케일 계산
	if (this.downSizing > 0) {
		var cri = Number(this.downSizing);
		var scale = (original.width > cri) ? Number(cri / original.width).toFixed(2) : 1;
	} else {
		// 다운사이징 적용을 하지 않을 때에도
		// 가로크기 1800px 넘어가는 이미지는 축소한다.
		var scale = (original.width > 1800) ? Number(1800 / original.width).toFixed(2) : 1;	
	}
	canvas.width = original.width * scale;
	canvas.height = original.height * scale;

	canvas.getContext("2d").drawImage(original, 0, 0, canvas.width, canvas.height);
	//console.log(canvas.width + ', ' + canvas.height);

	return canvas;
}

FingerImage.prototype.initImageRate = function() {
	var sel = jQuery(this.ids);
	sel.removeClass("img-center-align");
	sel.find('img').removeClass("img-fixed-size");
}

FingerImage.prototype.setProperty = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    var e = document.getElementById(this.id);
    e.style.left = x + 'px';
    e.style.top = y + 'px';
    e.style.width = width + 'px';
    e.style.height = height + 'px';
    delete e;
}

FingerImage.prototype.setSize = function(width, height) {
	var sel = jQuery(this.ids);
	var img = sel.find('img');
	
	img.css('width', width);
	img.css('height', height);
}

FingerImage.prototype.getRealSize = function() {
	var sel = jQuery(this.ids);
	var image = new Image(); 
	image.src = this.getValue();
	//console.log('image size : ' + image.width + ', ' + image.height);
	
	return [image.width, image.height];
}

FingerImage.prototype.setBorder = function(value) {  
	var e = document.getElementById(this.id);
	
    if (value) {
        e.style.border = '1px solid #cacece';
    }
    else {
        e.style.border = 'none';
    }
    delete e;
}

FingerImage.prototype.setScroll = function(x, y) {
    var e = document.getElementById(this.id);
    e.style['overflow-x'] = (x === undefined ? 'hidden' : x);
    e.style['overflow-y'] = (y === undefined ? 'hidden' : y);
    
    this.overflow_x = x;
    this.overflow_y = y;
    delete e;
}

FingerImage.prototype.setDownSizing = function(value) {
	this.downSizing = value;
}

FingerImage.prototype.setZooming = function(value, isFit, isTurn) {  
	var sel = jQuery(this.ids);
	this.isZooming = value;
	this.isZoomFit = isFit || false;
	this.isZoomTurn = (isTurn === undefined ? true : isTurn);
	
    if (value) {
    	this.setPointer(true);
    }
}

FingerImage.prototype.setTurnBtn = function(value) {  
	var sel = jQuery(this.ids);
	this.isTurnBtn = value;
	
	if (value) {
		// 좌,우 회전 버튼 적용시 overflow 값이 없으면
		// 회전시 이미지가 박스 바깥으로 밀리는 현상 발생 
		sel.css('overflow', 'hidden');
	}
}

FingerImage.prototype.setPointer = function(value) {  
	var sel = jQuery(this.ids);

    if (value) {
    	sel.find('img').css('cursor', 'pointer');
    }
    else {
    	sel.find('img').css('cursor', 'default');
    }
}

FingerImage.prototype.setButton = function(value) {  
	var sel = jQuery(this.ids);

    if (value) {
    	sel.find('img').css('border', 'none');
    	sel.find('img').css('cursor', 'pointer');
    }
    else {
    	sel.find('img').css('cursor', 'default');
    }
}

FingerImage.prototype.getType = function() {
    return 'ImageEdit';
}

FingerImage.prototype.getValue = function() {
	var sel = jQuery(this.ids);
	return sel.find('img').attr('src');
}

FingerImage.prototype.setValue = function(url, isButton) {
	try {
	    var sel = jQuery(this.ids);
	    
	    if (url === undefined || url === null) {
	    	return;
	    }
	    if (url == '#empty') {
	    	sel.find('img').attr('src', 'fingerPlatform/images/empty_img.png');
	    } else if (typeof url === 'object' && url.length) {
	    	sel.find('img').attr('src', convertByteArrayToImageSource(url));
	    } else {
	    	sel.find('img').attr('src', url);
	    }
	    
	    var imgSrc = sel.find('img').attr('src');
	    if (imgSrc && imgSrc.indexOf('data:image') != -1) {
	    	this.isDataUrL = true;
	    } else {
	    	this.isDataUrL = false;
	    }
	    
	    if (isButton) {
	    	this.setButton(true);
	    }
	    if (sel.find('img').attr('src') && this.mode == 'N') {
	    	this.setMode('U');
	    } else {
	    	this.setMode('R');
	    }
	} catch (err) {
		console.log('FingerImage setValue() : ' + err.message);
	}
}

FingerImage.prototype.setDisplay = function(visible) {
    var e = document.getElementById(this.id);

    if (visible == true)
        e.style.display = 'inline-block';
    else
        e.style.display = 'none';

    delete e;
}

FingerImage.prototype.setVisible = function(visible) {
    var e = document.getElementById(this.id);

    if (visible == true)
        e.style.visibility = 'visible';
    else
        e.style.visibility = 'hidden';

    delete e;
}