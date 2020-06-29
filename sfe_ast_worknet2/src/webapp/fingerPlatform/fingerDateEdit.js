function FingerDateEdit(host, id, x, y, width, height) {
	var $ = this;
	$.id = host.id + '__' + id;
	$.ids = ('#' + $.id);
	$.x = x;
	$.y = y;
	$.width = width;
	$.height = height;
	$.settings = null;
	$.fieldName = null;
	$.dateFormat = 'yyyymmdd';
	$.defaultValue = null;
	$.setBackColor = '#ffffff';
	
	var e = document.createElement('div');
	e.id = $.id;
	e.style.position = 'absolute';
	e.style.float = 'left';
	e.style.width = $.width + 'px';
	e.style.height = $.height + 'px';
	e.style.left = $.x + 'px';
	e.style.top = $.y + 'px';
	
	host.appendChild(e);
	
	var settings = 	{
		view: 'datepicker',
		id: ($.id + '_datepicker'),
		container: $.id,
		format: '%Y-%m-%d',
		editable: true,
		height: 26,
		type: 'date'
	};
	$.settings = settings; 
	$.extObj = webix.ui(settings);
	
	$.bindEvents = function() {
		$.extObj.attachEvent("onItemClick", function(id, e) {
			if (g_container != null && host.id == 'fpView') {
				if (g_container.fingerdateedit_click != undefined) {
					g_container.fingerdateedit_click(getRealId($.id));
				}
			}
			else if (g_popupStack && g_popupStack.has()) {
				g_popupStack.get().obj.fingerdateedit_click(getRealId($.id));

			} else {
				if (g_currentModule != null) {
					if (g_currentModule.fingerdateedit_click != undefined) {
						g_currentModule.fingerdateedit_click(getRealId($.id));
					}
				}
			}
		});
		
		$.extObj.attachEvent("onChange", function (newVal, oldVal) {
			var value = $.getValue();
			console.log('newVal ::: ' + newVal);
			console.log('oldVal ::: ' + oldVal);
			
			if (g_container != null && host.id == 'fpView') {
				if (g_container.fingerdateedit_change != undefined) {
					g_container.fingerdateedit_change(getRealId($.id), value);
				}
			}
			else if (g_popupStack && g_popupStack.has()) {
				g_popupStack.get().obj.fingerdateedit_change(getRealId($.id), value);
			}
			else {
				if (g_currentModule != null) {
					if (g_currentModule.fingerdateedit_change != undefined) {
						g_currentModule.fingerdateedit_change(getRealId($.id), value);
					}
				}
			}
		});
	};
	
	// 이벤트 바인딩
	$.bindEvents();
	
	/**
	 * DateFormat 변경
	 */
	$.setDateFormat = function(value) {
		try {
			var type, format;
			
			this.dateFormat = value;
			
			switch (value) {
				case 'yyyy':
					type = 'year';
					format = '%Y';
					break;
				case 'yyyymm':
					type = 'month';
					format = '%Y-%m';
					break;
				case 'mm':
					type = 'month';
					format = '%m';
					break;
				case 'yyyymmdd':
					type = 'date';
					format = '%Y-%m-%d';
					break;
			}
			
			$.settings['type'] = type;
			$.settings['format'] = format;
			
			// type(캘린더뷰)은 define 을 통해 변경할 수 없음
			// 불가피하게 삭제 후 재생성
			$.extObj.destructor();
			$.extObj = webix.ui($.settings);
			$.bindEvents();
			
		} catch (err) {
			console.log('setDateFormat() : ' + err.message);
		}
	};
};

FingerDateEdit.prototype.getType = function() {
	return 'DateEdit';
};

FingerDateEdit.prototype.setProperty = function(x, y, width, height) {
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
};

FingerDateEdit.prototype.setText = function(value) {
	this.setValue(value);
	return;
};

FingerDateEdit.prototype.setValue = function(value) {
	try {
		if (!value || value.length == 0) {
			this.extObj.setValue(null);
			return;
		}
		
		value = unmask(value);
		
		if (value.length == 4) {
			this.extObj.setValue(new Date(value.substr(0, 4), 1, 1));
		} else if (value.length == 6) {
			this.extObj.setValue(new Date(value.substr(0, 4), Number(value.substr(4, 2)) - 1, 1));
		} else if (value.length == 8) {
			this.extObj.setValue(new Date(value.substr(0, 4), Number(value.substr(4, 2)) - 1, Number(value.substr(6, 2))));
		}

	} catch (err) {
		console.log('FingerDateEdit setValue() : ' + err.message);
	}
};

FingerDateEdit.prototype.getDate = function(value) {
	try {
		return this.extObj.getValue();
		
	} catch (err) {
		console.log('FingerDateEdit getDate() : ' + err.message);
	}
};

FingerDateEdit.prototype.getValue = function(value) {
	try {
		value = value || this.extObj.getValue();
		var result = null;
		
		if (this.dateFormat == 'yyyy') {
			result = getFormatDate(value, 'yyyy');
		} else if (this.dateFormat == 'yyyymm') {
			result = getFormatDate(value, 'yyyyMM');
		} else if (this.dateFormat == 'yyyymmdd') {
			result = getFormatDate(value, 'yyyyMMdd');
		} else if (this.dateFormat == 'mm') {
			result = getFormatDate(value, 'MM');
		}
		
		return result;
		
	} catch (err) {
		console.log('FingerDateEdit getValue() : ' + err.message);
	}
};

FingerDateEdit.prototype.getText = function() {
	try {
		return this.getValue();
		
	} catch (err) {
		console.log('FingerDateEdit getText() : ' + err.message);
	}
};

FingerDateEdit.prototype.setVisible = function(visible) {
	if (visible) {
		this.extObj.show();
	} else {
		this.extObj.hide();
	}
};

FingerDateEdit.prototype.setFocus = function() {
	this.extObj.focus();
};

FingerDateEdit.prototype.setTabIndex = function(tabIndex) {
	var selector = jQuery(this.ids);
	selector.find('.webix_inp_static').css('tabindex', tabIndex);
};

FingerDateEdit.prototype.setTextAlign = function(value) {
	var selector = jQuery(this.ids);
	selector.find('.webix_inp_static').css('text-align', value);
};

FingerDateEdit.prototype.setReadOnly = function(value) {
	this.extObj.define('readonly', value);

	var selector = jQuery(this.ids);
	if (value) {
		selector.find('.webix_el_box').css('background-color', '#dfdfdf');
		selector.find('.webix_el_box > input').css('background-color', '#dfdfdf');
		selector.find('.webix_inp_static').css('background-color', '#dfdfdf');
	} else {
		selector.find('.webix_el_box').css('background-color', this.setBackColor);
		selector.find('.webix_el_box > input').css('background-color', this.setBackColor);
		selector.find('.webix_inp_static').css('background-color', this.setBackColor);		
	}
};


FingerDateEdit.prototype.setEnable = function(value) {
	if (value) {
		this.extObj.enable();
	} else {
		this.extObj.disable();
	}

	var selector = jQuery(this.ids);
	if (!value) {
		selector.find('.webix_el_box').css('background-color', '#dfdfdf');
		selector.find('.webix_el_box > input').css('background-color', '#dfdfdf');
		selector.find('.webix_inp_static').css('background-color', '#dfdfdf');
	} else {
		selector.find('.webix_el_box').css('background-color', this.setBackColor);
		selector.find('.webix_el_box > input').css('background-color', this.setBackColor);
		selector.find('.webix_inp_static').css('background-color', this.setBackColor);
	}
};

FingerDateEdit.prototype.setVisible = function(value) {
	if (value) {
		this.extObj.show();
	} else {
		this.extObj.hide();
	}
};

FingerDateEdit.prototype.getAllowBlank = function() {
	return this.allowBlank;
};

FingerDateEdit.prototype.setAllowBlank = function(blank, fieldName) {
	this.allowBlank = blank;
	this.setBackColor = blank ? '#ffffff' : '#ddf1f6';

	var selector = jQuery(this.ids);
	selector.find('.webix_el_box').css('background-color', this.setBackColor);
	selector.find('.webix_el_box > input').css('background-color', this.setBackColor);
	selector.find('.webix_inp_static').css('background-color', this.setBackColor);	
	
	if (fieldName) {
		this.fieldName = fieldName;
	}
};

FingerDateEdit.prototype.setFieldName = function(fieldName) {
	this.fieldName = fieldName;
};

FingerDateEdit.prototype.getFieldName = function() {
	return this.fieldName;
};

FingerDateEdit.prototype.setDefaultValue = function(defaultValue) {
	this.defaultValue = defaultValue;
};

FingerDateEdit.prototype.setMinDate = function(value) {
	this.extObj.getPopup().getBody().define("minDate", extFormat(value, 'yyyyMMdd'));
};

FingerDateEdit.prototype.setStyle = function(styleAttr, value) {
	var e = document.getElementById(this.id);
	
	e.style[styleAttr] = value;

    delete e;
};