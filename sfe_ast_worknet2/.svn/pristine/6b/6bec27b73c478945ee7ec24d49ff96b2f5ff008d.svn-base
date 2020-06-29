function FingerEdit(host, id, x, y, width, height) {
    var $ = this;
    $.id = host.id + '__' + id;
    $.ids = ('#' + $.id);
    $.x = x;
    $.y = y;
    $.width = width;
    $.height = height;
    $.fieldName = '';
    $.allowBlank = true;
    $.defaultValue = null;
    $.setBackColor = '#ffffff';

    var e = document.createElement('input');
    e.id = $.id;
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
    e.className = 'FingerEdit';

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
    }
    
    host.appendChild(e);

    e = null;
}

FingerEdit.prototype.setProperty = function(x, y, width, height) {
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

FingerEdit.prototype.getType = function() {
    return 'TextEdit';
}

FingerEdit.prototype.getText = function() {
    var e = document.getElementById(this.id);
    var result = e.value;

    delete e;

    try {
        return result;
    } finally {
        result = null;
    }
}

FingerEdit.prototype.getValue = function() {
    var e = document.getElementById(this.id);
    var result = e.value;

    delete e;

    try {
        return result;
    } finally {
        result = null;
    }
}

FingerEdit.prototype.setText = function(value) {
    var e = document.getElementById(this.id);
    e.value = value;
    delete e;
}

FingerEdit.prototype.setTabIndex = function(tabIndex) {
    var e = document.getElementById(this.id);
    e.tabIndex = tabIndex;
    delete e;
}


FingerEdit.prototype.setValue = function(value) {    
    var e = document.getElementById(this.id);
    e.value = value;
    delete e;
}

FingerEdit.prototype.setMaxLength = function(length) {
    var e = document.getElementById(this.id);
    e.maxLength = length;
    delete e;
}

FingerEdit.prototype.setReadOnly = function(value) {
    var e = document.getElementById(this.id);
    e.readOnly = value;
    
    if (value) {
    	e.style.backgroundColor = '#DFDFDF';
    } else {
    	e.style.backgroundColor = this.setBackColor;
    }
    delete e;
}

FingerEdit.prototype.getReadOnly = function() {
    var e = document.getElementById(this.id);
    
    try {
		return e.readOnly;
	} finally {
		e = null;
	}
}

FingerEdit.prototype.setEnable = function(value) {
    var e = document.getElementById(this.id);
    
    if (!value) {
    	e.style.backgroundColor = '#DFDFDF';
    } else {
    	e.style.backgroundColor = this.setBackColor;
    }
    
    e.disabled = !value;
    delete e;
}

FingerEdit.prototype.setVisible = function(visible) {
    var e = document.getElementById(this.id);

    if (visible == true)
        e.style.visibility = 'visible';
    else
        e.style.visibility = 'hidden';
        
    delete e;
}

FingerEdit.prototype.setPassword = function(value) {
    var e = document.getElementById(this.id);
    var sel = jQuery(this.ids);

    if (value == true) {
    	e.setAttribute('autocomplete', 'new-password');
    	e.setAttribute('type', 'password');
    }
    else {
        e.setAttribute('type', 'text');
    }

    delete e;
}

FingerEdit.prototype.setFocus = function() {
    var e = document.getElementById(this.id);

    e.focus();

    delete e;
}

FingerEdit.prototype.setBackgroundColor = function(color) {
    var e = document.getElementById(this.id);

    e.style.backgroundColor = color;

    delete e;
}

FingerEdit.prototype.setFontColor = function(color) {
    var e = document.getElementById(this.id);

    e.style.color = color;

    delete e;
}

FingerEdit.prototype.setBorderColor = function(color) {
    var e = document.getElementById(this.id);

    e.style.border = color;

    delete e;
}

FingerEdit.prototype.setStyle = function(styleAttr, value) {
	var e = document.getElementById(this.id);
	
	e.style[styleAttr] = value;

    delete e;
};

FingerEdit.prototype.setPlaceholder = function(value) {
    var e = document.getElementById(this.id);
    
    e.placeholder = value;

    delete e;
}

FingerEdit.prototype.getAllowBlank = function() {
    return this.allowBlank;
}

FingerEdit.prototype.setAllowBlank = function(blank, fieldName) {
    this.allowBlank = blank;
    this.setBackColor = blank ? '#ffffff' : '#ddf1f6';

    var e = document.getElementById(this.id);
    e.style.backgroundColor = this.setBackColor;
    delete e;
    
    if (fieldName) {
    	this.fieldName = fieldName;
    }
}

FingerEdit.prototype.setDefaultValue = function(defaultValue) {
    this.defaultValue = defaultValue;
}

FingerEdit.prototype.setFieldName = function(fieldName) {
    this.fieldName = fieldName;
}

FingerEdit.prototype.getFieldName = function() {
    return this.fieldName;
}
FingerEdit.prototype.setSocialNo = function(type) {
	var e = document.getElementById(this.id);
	
	e.maxLength = 14;
   
	if (type) {
		e.onkeydown = function(event) { 
	    	event = event || window.event;
			var keyID = (event.which) ? event.which : event.keyCode;
			
			if ( (keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39  || keyID == 9)
				return;
			else 
				return false;
		};
		
		e.onkeyup = function(event) {
			event = event || window.event;
			var keyID = (event.which) ? event.which : event.keyCode;
			var cursor = e.selectionStart;
			
			if (keyID == 46 || keyID == 37 || keyID == 39 || keyID == 9) 
				return;
			else {
				event.target.value = event.target.value.replace(/[^0-9]/g, "");
				
				if (event.target.value.length > 6)
					event.target.value = event.target.value.substring(0, 6) + '-' + event.target.value.substring(6);
				
				if (keyID == 8)
					e.setSelectionRange(cursor, cursor);
			}
		};
	} else {
		e.onkeydown = null;
		e.onkeyup = null;
	}
	
	delete e;
}