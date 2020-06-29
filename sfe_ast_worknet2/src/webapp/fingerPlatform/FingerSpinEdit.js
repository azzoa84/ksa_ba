function FingerSpinEdit(host, id, x, y, width, height) {
	var $ = this;
	$.id = host.id + '__' + id;
	$.x = x;
	$.y = y;
	$.width = width;
	$.height = height;
	$.minValue = Number.MIN_VALUE;
	$.maxValue = Number.MAX_VALUE;
	$.allowBlank = true;
	$.fieldName = '';
	$.defaultValue = null;
	$.setBackColor = '#ffffff';
	
	var e = document.createElement('input');
	e.id = $.id;
	e.type = 'text';
	e.style.position = 'absolute';
	e.style.float = 'left';
	e.style.width = ($.width + 1) + 'px';
	e.style.height = $.height + 'px';
	e.style.left = $.x + 'px';
	e.style.top = $.y + 'px';
	e.style.lineHeight = $.height + 'px';
	e.style.paddingLeft = '2px';
	e.style.paddingRight = '2px';
	e.style.zIndex = 11;	
	e.className = 'FingerSpinEdit';

	e.onchange = function() {
		var value = $.getValue();
		
		if (g_container != null && host.id == 'fpView') {
			if (g_container.fingeredit_change != undefined) {
				g_container.fingeredit_change(getRealId($.id), value);
			}
		}
		else if (g_popupStack && g_popupStack.has()) {
			g_popupStack.get().obj.fingeredit_change(getRealId($.id), value);
		}
		else {
			if (g_currentModule != null) {
				if (g_currentModule.fingeredit_change != undefined) {
					g_currentModule.fingeredit_change(getRealId($.id), value);
				}
			}
		}
	};

	e.onkeypress = function() {
		var value = event.keyCode;

		if (g_container != null && host.id == 'fpView') {
			if (g_container.fingeredit_keypress != undefined) {
				g_container.fingeredit_keypress(getRealId($.id), value);
			}
		}
		else if (g_popupStack && g_popupStack.has()) {
			g_popupStack.get().obj.fingeredit_keypress(getRealId($.id), value);
		}
		else {
			if (g_currentModule != null) {
				if (g_currentModule.fingeredit_keypress != undefined) {
					g_currentModule.fingeredit_keypress(getRealId($.id), value);
				}
			}
		}
	};

	e.onblur = function() {
		var value = $.getValue(); 
	
		if (g_container != null && host.id == 'fpView') {
			if (g_container.fingeredit_lostfocus != undefined) {
				g_container.fingeredit_lostfocus(getRealId($.id), value);
			}
		}
		else if (g_popupStack && g_popupStack.has()) {
			g_popupStack.get().obj.fingeredit_lostfocus(getRealId($.id), value);
		}
		else {
			if (g_currentModule != null) {
				if (g_currentModule.fingeredit_lostfocus != undefined) {
					g_currentModule.fingeredit_lostfocus(getRealId($.id), value);
				}
			}
		}
	};
	
	host.appendChild(e);

	var t = jQuery(e);
	
	t.autoNumeric('init', {
		aPad: false
	,   vMax: Number.MAX_VALUE
	,   vMin: '-999999999999.99'
	});

	e = null;
}

FingerSpinEdit.prototype.getType = function() {
	return 'SpinEdit';
}

FingerSpinEdit.prototype.setProperty = function(x, y, width, height) {
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

FingerSpinEdit.prototype.getText = function() {
	//var e = this.extObj.getInput('input');
	var e = document.getElementById(this.id);

	try {
		return e.value;
	} finally {
		e = null;
	}
}

FingerSpinEdit.prototype.setPlaceholder = function(value) {
    var e = document.getElementById(this.id);
    
    e.placeholder = value;

    delete e;
}

FingerSpinEdit.prototype.getValue = function() {
	//return this.extObj.getItemValue('input');
	var e = document.getElementById(this.id);
	//return e.value.replace(/\,/g, '')
	return jQuery(e).autoNumeric('get');
}

FingerSpinEdit.prototype.setText = function(value) {
	//var e = this.extObj.getInput('input');	
	var e = document.getElementById(this.id);
	e.value = value;
	delete e;
}

FingerSpinEdit.prototype.setValue = function(value) {
	if (value != null && value != undefined) {
		//this.extObj.setItemValue('input', value.toString());
		var e = document.getElementById(this.id);
		//e.value = value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		jQuery(e).autoNumeric('set', value);
		delete e;
	}
}

FingerSpinEdit.prototype.setMaxLength = function(length) {
//var e = this.extObj.getInput('input');
	var e = document.getElementById(this.id);
	e.maxLength = length;
	delete e;
}

FingerSpinEdit.prototype.setTabIndex = function(tabIndex) {
	var e = document.getElementById(this.id);
	e.tabIndex = tabIndex;
	delete e;
}

FingerSpinEdit.prototype.setReadOnly = function(value) {
	var e = document.getElementById(this.id);
	var t = jQuery(e);
	
	/*
	t.autoNumeric('destroy');

	t.autoNumeric('init', {
		aPad: false
	,   vMax: Number.MAX_VALUE
	,   vMin: '-999999999999.99'
	});
	*/

	//e.setAttribute('readonly', value.toString());
	
	e.readOnly = value;
	if (value == true) {
		e.style.backgroundColor = '#DFDFDF';
		e.onkeydown= function(){return false;};
	} else {
		e.style.backgroundColor = this.setBackColor;
		e.onkeydown= function(){return true;};
	}
	
	delete e;
}

FingerSpinEdit.prototype.setEnable = function(value) {
	//var e = this.extObj.getInput('input');
	var e = document.getElementById(this.id);
	e.disabled = !value;
	
	if (value) {
		e.style.backgroundColor = this.setBackColor;
	} else {
		e.style.backgroundColor = '#DFDFDF';
	}
	delete e;
}

FingerSpinEdit.prototype.setVisible = function(visible) {
	var e = document.getElementById(this.id);

	if (visible == true)
		e.style.visibility = 'visible';
	else
		e.style.visibility = 'hidden';

	delete e;
}

FingerSpinEdit.prototype.setFocus = function() {
	//var e = this.extObj.getInput('input');
	var e = document.getElementById(this.id);
	e.focus();
	delete e;
}

FingerSpinEdit.prototype.setBackgroundColor = function(color) {
	//var e = this.extObj.getInput('input');
	var e = document.getElementById(this.id);
	e.style.backgroundColor = color;
	delete e;
}

FingerSpinEdit.prototype.setFontColor = function(color) {
	//var e = this.extObj.getInput('input');
	var e = document.getElementById(this.id);
	e.style.color = color;
	delete e;
}

FingerSpinEdit.prototype.setBorderColor = function(color) {
	var e = document.getElementById(this.id);
	e.style.border = color;
	delete e;
}

FingerSpinEdit.prototype.setStyle = function(styleAttr, value) {
	var e = document.getElementById(this.id);
	
	e.style[styleAttr] = value;

    delete e;
}

FingerSpinEdit.prototype.setMinValue = function(value) {
	this.minValue = value;
}

FingerSpinEdit.prototype.setMaxValue = function(value) {
	this.maxValue = value;
}

FingerSpinEdit.prototype.setFormat = function(value) {
	//this.extObj.setNumberFormat('input', value, "'", ",");
}

FingerSpinEdit.prototype.getAllowBlank = function() {
	return this.allowBlank;
}

FingerSpinEdit.prototype.setAllowBlank = function(blank, fieldName) {
    this.allowBlank = blank;
    this.setBackColor = blank ? '#ffffff' : '#ddf1f6';

    var e = document.getElementById(this.id);
    e.style.backgroundColor = this.setBackColor;
    delete e;
    
    if (fieldName) {
    	this.fieldName = fieldName;
    }
}

FingerSpinEdit.prototype.setFieldName = function(fieldName) {
	this.fieldName = fieldName;
}

FingerSpinEdit.prototype.getFieldName = function() {
	return this.fieldName;
}

FingerSpinEdit.prototype.setDefaultValue = function(defaultValue) {
	this.defaultValue = defaultValue;
}