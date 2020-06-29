function FingerButtonEdit(host, id, x, y, width, height) {
    var $ = this;
    $.id = host.id + '__' + id;
    $.x = x;
    $.y = y;
    $.width = width;
    $.height = height;
    $.enabled = true;
    $.allowBlank = true;
    $.fieldName = '';
    $.defaultValue = null;
    $.codeValue = '';
    $.setBackColor = '#ffffff';
    $.directSearchKey = null;
    $.directSearchCallBack = null;

    $.click = function() {
    	if (!$.enabled) return;
    	
        if (g_container != null && host.id == 'fpView') {
            if (g_container.fingerbuttonedit_click != undefined) {
                g_container.fingerbuttonedit_click(getRealId($.id));
            }
        }
        else if (g_popupStack && g_popupStack.has()) {
        	g_popupStack.get().obj.fingerbuttonedit_click(getRealId($.id));
        	
        } else {
            if (g_currentModule != null) {
                if (g_currentModule.fingerbuttonedit_click != undefined) {
                    g_currentModule.fingerbuttonedit_click(getRealId($.id));
                }
            }
        }
    }  

    var c = document.createElement('div');
    c.id = $.id;
    c.style.position = 'absolute';
    c.style.width = ($.width + 4) + 'px';
    c.style.height = $.height + 'px';
    c.style.left = $.x + 'px';
    c.style.top = $.y + 'px';
    c.style.zIndex = 11;
    c.style.lineHeight = $.height + 'px';
    
    var e = document.createElement('input');    
    e.style.float = 'left';
    e.style.width = $.width - 23 + 'px';
    e.style.height = '20px';
    e.style.paddingLeft = '2px';
    e.style.paddingRight = '2px';
    e.style.borderRight = 'none';
    e.className = 'FingerButtonEdit';
    e.onchange = function() {
        var value = $.getValue();        

        if (g_container != null && host.id == 'fpView') {
            if (g_container.fingerbuttonedit_change != undefined) {
                g_container.fingerbuttonedit_change(getRealId($.id), value);
            }
        }
        else if (g_popupStack && g_popupStack.has()) {
        	if (g_popupStack.get() && g_popupStack.get().obj) {
        		g_popupStack.get().obj.fingerbuttonedit_change(getRealId($.id), value);
        	}
        }
        else {
            if (g_currentModule != null) {
                if (g_currentModule.fingerbuttonedit_change != undefined) {
                    g_currentModule.fingerbuttonedit_change(getRealId($.id), value);
                }
            }
        }
    };
    
    e.onkeydown = function() {
    	var value = event.keyCode;
    	switch (value) {
		case 9 : /* Tab */
			var inputTxt = $.getText();
			if ($.directSearchKey && inputTxt) 
			{
				var ds = commCodeData2(null, 'Q_DIRECT', $.directSearchKey, inputTxt);
				
				if ($.directSearchCallBack) {
					// callback 함수가 존재하는 경우
					$.directSearchCallBack(ds);
				} else {
					if (ds && ds.resultList && ds.resultList[0]) {
						var list = ds.resultList[0];
						if (list.length == 1) {
							$.setValue(list[0]['value']);
							$.setText(list[0]['text']);
						} else {
							$.setText(inputTxt);
							$.click();
						}
					}
				}
			} else {
				$.click();
			}
			break;

		default:
			break;
		}
    };

    e.onkeyup = function() {
        var value = event.keyCode;

        if (g_container != null && host.id == 'fpView') {
            if (g_container.fingerbuttonedit_keypress != undefined) {
                g_container.fingerbuttonedit_keypress(getRealId($.id), value);
            }
        }
        else if (g_popupStack && g_popupStack.has()) {
        	if (g_popupStack.get() && g_popupStack.get().obj) {
        		g_popupStack.get().obj.fingerbuttonedit_keypress(getRealId($.id), value);
        	}
        }
        else {
            if (g_currentModule != null) {
                if (g_currentModule.fingerbuttonedit_keypress != undefined) {
                    g_currentModule.fingerbuttonedit_keypress(getRealId($.id), value);
                }
            }
        }
    };

    e.onblur = function() {
        var value = $.getValue();

        if (g_container != null && host.id == 'fpView') {
            if (g_container.fingerbuttonedit_lostfocus != undefined) {
                g_container.fingerbuttonedit_lostfocus(getRealId($.id), value);
            }
        }
        else if (g_popupStack && g_popupStack.has()) {
        	if (g_popupStack.get() && g_popupStack.get().obj) {
        		g_popupStack.get().obj.fingerbuttonedit_lostfocus(getRealId($.id), value);
        	}
        }
        else {
            if (g_currentModule != null) {
                if (g_currentModule.fingerbuttonedit_lostfocus != undefined) {
                    g_currentModule.fingerbuttonedit_lostfocus(getRealId($.id), value);
                }
            }
        }
    }
    
    var b = document.createElement('div');
    b.className = 'FingerButtonEdit';

    if (b.addEventListener) {
        b.addEventListener("click", $.click, false);
    } else if (b.attachEvent) {
        b.attachEvent("onclick", $.click);
    }

    c.appendChild(e);
    c.appendChild(b);    

    host.appendChild(c);

    c = null;
    e = null;
    b = null;
}

FingerButtonEdit.prototype.setProperty = function(x, y, width, height) {
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

FingerButtonEdit.prototype.getType = function() {
    return 'ButtonEdit';
}

FingerButtonEdit.prototype.getText = function() {
    var e = document.getElementById(this.id);
    var result = e.childNodes[0].value;

    delete e;

    try {
        return result;
    } finally {
        result = null;
    }
}

FingerButtonEdit.prototype.setTabIndex = function(tabIndex) {
    var e = document.getElementById(this.id);
    e.childNodes[0].tabIndex = tabIndex;
    delete e;
}


FingerButtonEdit.prototype.getValue = function() {
	if (!this.getText()) {
		this.codeValue = '';
		return this.codeValue;
	}
	return this.codeValue ? this.codeValue : this.getText();
}

FingerButtonEdit.prototype.setText = function(value) {
	var e = document.getElementById(this.id);
    e.childNodes[0].value = value;
    delete e;
}

FingerButtonEdit.prototype.setValue = function(value) {
	this.codeValue = value;
}

FingerButtonEdit.prototype.setMaxLength = function(length) {
    var e = document.getElementById(this.id);
    e.maxLength = length;
    delete e;
}

FingerButtonEdit.prototype.setReadOnly = function(value) {
    var e = document.getElementById(this.id);
    e.childNodes[0].readOnly = value;
	if (value == true) {
		e.childNodes[0].style.backgroundColor = '#DFDFDF';
	} else {
		e.childNodes[0].style.backgroundColor = '#FFFFFF';
	}
	delete e;
}

FingerButtonEdit.prototype.setEnable = function(value) {
	this.enabled = value;
	
    var e = document.getElementById(this.id);
    e.childNodes[0].disabled = !value;
    e.childNodes[1].disabled = !value;
    e.disabled = !value;
    
    if (value == true) {
    	e.childNodes[0].style.backgroundColor = '#FFFFFF';
	} else {
		e.childNodes[0].style.backgroundColor = '#DFDFDF';
	}
    delete e;
}

FingerButtonEdit.prototype.setVisible = function(visible) {
    var e = document.getElementById(this.id);

    if (visible == true)
        e.style.visibility = 'visible';
    else
        e.style.visibility = 'hidden';

    delete e;
}

FingerButtonEdit.prototype.setPassword = function(value) {
    var e = document.getElementById(this.id);

    if (value == true) {
        e.setAttribute('type', 'password');
    }
    else {
        e.setAttribute('type', 'text');
    }

    delete e;
}

FingerButtonEdit.prototype.setFocus = function() {
    var e = document.getElementById(this.id);

    e.focus();

    delete e;
}

FingerButtonEdit.prototype.setBackgroundColor = function(color) {
    var e = document.getElementById(this.id);

    e.style.backgroundColor = color;

    delete e;
}

FingerButtonEdit.prototype.setFontColor = function(color) {
    var e = document.getElementById(this.id);

    e.style.color = color;

    delete e;
}

FingerButtonEdit.prototype.getAllowBlank = function() {
    return this.allowBlank;
}

FingerButtonEdit.prototype.setAllowBlank = function(blank, fieldName) {
    this.allowBlank = blank;
    this.setBackColor = blank ? '#ffffff' : '#ddf1f6';
    
	var e = document.getElementById(this.id).childNodes[0];
    e.style.backgroundColor = this.setBackColor;
    delete e;
    
    if (fieldName) {
    	this.fieldName = fieldName;
    }
}

FingerButtonEdit.prototype.setFieldName = function(fieldName) {
    this.fieldName = fieldName;
}

FingerButtonEdit.prototype.getFieldName = function() {
    return this.fieldName;
}

FingerButtonEdit.prototype.setDefaultValue = function(defaultValue) {
	this.defaultValue = defaultValue;
}

FingerButtonEdit.prototype.setDirectSearch = function(searchKey, callBackFunc) {
	this.directSearchKey = searchKey;
	if (callBackFunc) {
		this.directSearchCallBack = callBackFunc;
	}
}