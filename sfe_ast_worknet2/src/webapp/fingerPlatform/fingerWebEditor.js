function FingerWebEditor(host, id, x, y, width, height) {
	var $ = this;
	$.id = host.id + '__' + id;
	$.ids = ('#' + $.id);
	$.txId = ($.id + '_textarea');
	$.x = x;
	$.y = y;
	$.width = width;
	$.height = height;
	$.defaultValue = null;
	$.allowBlank = true;
	$.binding = {};
	$.selEditor = null;
	$.isOnload = false;
	$.fieldName = '';
	$.setBackColor = '#ffffff';
	
	var e = document.createElement('div');
	e.id = $.id;
	e.style.position = 'absolute';
	e.style.float = 'left';
	e.style.width = $.width + 'px';
	e.style.height = $.height + 'px';
	e.style.left = $.x + 'px';
	e.style.top = $.y + 'px';
	e.className = 'FingerWebEditor';
	
	host.appendChild(e);
	
	var tx = document.createElement('textarea');
	tx.id = $.txId;
	tx.name = $.txId;
	tx.rows = 10;
	tx.cols = 100;
	tx.style.width = '100%';
	tx.style.height = $.height + 'px';
	tx.style.whiteSpace = 'pre';
	tx.style.overflow = 'auto';
	tx.style.padding = '2px';
	
	e.appendChild(tx);
	
	$.oEditors = [];
    nhn.husky.EZCreator.createInIFrame({
		oAppRef: $.oEditors,
		elPlaceHolder: $.txId,
		sSkinURI: "./fingerPlatform/library/navereditor/SmartEditor2Skin.html?v=201805161540",
		htParams : {
			bUseToolbar : true,					// 툴바 사용 여부 (true:사용/ false:사용하지 않음)
			bUseVerticalResizer : false,		// 입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음)
			bUseModeChanger : false				// 모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음)
			//aAdditionalFontList : aAdditionalFontSet,		// 추가 글꼴 목록
		}, //boolean
		fCreator: "createSEditor2",
		fOnAppLoad: function() {
			// 네이버 에디터는 내부에 이중 Iframe (iframe 속에 iframe 이 하나 더 들어있는)
			// 구조를 사용하는데.. 외부에서 지정한 height 값 보다 크게 생성되는 문제가 발생
			// 에디터 로드 후 강제적으로 height를 재설정 함
			// @author 김영도
			var sel = jQuery($.ids);
			var selIFrame = sel.find('iframe').eq(0).contents();
			selIFrame.find('iframe').eq(0).css('height', ($.height - 30) + 'px');
			
			// Enable, ReadOnly 설정 등을 하기 위해
			// 에디터 접근 지정자 저장
			$.selEditor = selIFrame.find('iframe').eq(0).contents().find('.se2_inputarea').eq(0);
			
			// 로딩 완료
			$.isOnload = true;
			
			// 로딩 전에 속성값이 설정된 경우 binding 객체에 임시 저장 하였다가
			// 로딩 완료시 반영
			for (var attr in $.binding) {
				switch (attr) {
					case 'enable':
						$.setEnable($.binding[attr]);
						break;
					case 'readonly':
						$.setReadOnly($.binding[attr]);
						break;
					case 'allowblank':
						$.setAllowBlank($.binding[attr], $.binding['fieldName']);
						break;
					case 'value':
						$.setValue($.binding[attr]);
						break;
					case 'clear':
						$.setClear();
						break;
						
					default:
						break;
				}
			}
		}
	});
    
    $.getText = function() { 
    	var sHTML = $.oEditors.getById[$.txId].getIR();
    	var text = sHTML.replace(/[<][^>]*[>]/gi, "").replace(/&nbsp;/gi, '');
    	return text;
    }
    
    $.getValue = function() {
    	return $.getHTML();
    }
    
    $.getHTML = function() {
    	var sHTML = $.oEditors.getById[$.txId].getIR();
    	return sHTML;
    }
    
    $.setValue = function(value) {
    	if ($.isOnload) {
    		$.oEditors.getById[$.txId].exec("SET_CONTENTS", [value]);
    	} else {
    		$.binding.value = value;
    	}
    }
    
    $.setClear = function() {
    	if ($.isOnload) {
    		$.oEditors.getById[$.txId].exec("SET_CONTENTS", ['']);
    	} else {
    		$.binding.clear = true;
    	}
    }
    
    $.addValue = function(value) {
    	$.oEditors.getById[$.txId].exec("PASTE_HTML", [value]); 
    }
    
    $.setTestValue = function(value) {
    	console.log('value : ' + value);
    	$.setValue(value);
    }
}

FingerWebEditor.prototype.getType = function() {
	return 'WebEditor';
}

FingerWebEditor.prototype.setProperty = function(x, y, width, height) {
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

FingerWebEditor.prototype.setMaxLength = function(length) {
	var e = document.getElementById(this.id);
	e.maxLength = length;
	delete e;
}

FingerWebEditor.prototype.setReadOnly = function(value) {
	if (this.isOnload) {
	    if (value) {
	    	this.selEditor.attr('contenteditable', false);
	    } else {
	    	this.selEditor.attr('contenteditable', true);
	    }
	} else {
		this.binding.readonly = value;
	}
}

FingerWebEditor.prototype.setEnable = function(value) {
	if (this.isOnload) {
	    if (!value) {
	    	this.selEditor.css('background-color', '#DFDFDF');
	    	this.selEditor.attr('contenteditable', false);
	    } else {
	    	this.selEditor.css('background-color', this.setBackColor);
	    	this.selEditor.attr('contenteditable', true);
	    }
	} else {
		this.binding.enable = value;
	}
}

FingerWebEditor.prototype.getAllowBlank = function() {
    return this.allowBlank;
}

FingerWebEditor.prototype.setAllowBlank = function(blank, fieldName) {
	if (this.isOnload) {
	    this.allowBlank = blank;
	    // 웹 에디터는 필수입력 지정시에도 바탕 흰색으로 설정
	    this.setBackColor = blank ? '#ffffff' : '#ffffff';
	    this.selEditor.css('background-color', this.setBackColor);
	    
	    if (fieldName) {
	    	this.fieldName = fieldName;
	    }
	} else {
		this.binding.allowblank = blank;
		this.binding.fieldName = fieldName;
	}
}

FingerWebEditor.prototype.setFieldName = function(fieldName) {
    this.fieldName = fieldName;
}

FingerWebEditor.prototype.getFieldName = function() {
    return this.fieldName;
}

FingerWebEditor.prototype.setDefaultValue = function(defaultValue) {
    this.defaultValue = defaultValue;
}

FingerWebEditor.prototype.setVisible = function(visible) {
	var e = document.getElementById(this.id);

	if (visible == true)
		e.style.visibility = 'visible';
	else
		e.style.visibility = 'hidden';

	delete e;
}

FingerWebEditor.prototype.setFocus = function() {
	var e = document.getElementById(this.id);
	e.focus();

	delete e;
}

FingerWebEditor.prototype.setTabIndex = function(tabIndex) {
	var sel = jQuery(this.txId);
	sel.attr('tabindex', tabIndex);
	delete sel;
}

FingerWebEditor.prototype.setBorder = function(value) {
	var e = document.getElementById(this.id);
	
	if (value) {
		e.style.border = '1px solid #e5e5e5';
	} else {
		e.style.border = 'none';
	}
	delete e;
}