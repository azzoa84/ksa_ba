function FingerMemoEdit(host, id, x, y, width, height) {
	var $ = this;
	$.id = host.id + '__' + id;
	$.x = x;
	$.y = y;
	$.width = width;
	$.height = height;
	$.defaultValue = null;
	$.setBackColor = '#ffffff';

	var e = document.createElement('textarea');
	e.id = $.id;
	//e.rows = 10;
	//e.cols = 10;
	//e.wrap = 'hard';
	e.style.position = 'absolute';
	e.style.float = 'left';
	e.style.width = $.width + 'px';
	e.style.height = $.height + 'px';
	e.style.left = $.x + 'px';
	e.style.top = $.y + 'px';	
	//e.style.lineHeight = $.height + 'px';
	e.setAttribute('wrap', 'virtual');
	e.style.whiteSpace = 'pre';
	e.style.overflow = 'auto';
	e.style.padding = '2px';
	e.style.resize = 'none';
	e.style['word-wrap'] = 'break-word';
	e.style['white-space'] = 'pre-wrap';
	e.style['overflow-x'] = 'hidden';
	e.style['overflow-y'] = 'scroll';
	e.className = 'FingerMemoEdit';
	
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
	
	host.appendChild(e);
	e = null;
}

FingerMemoEdit.prototype.getType = function() {
	return 'MemoEdit';
}

FingerMemoEdit.prototype.setProperty = function(x, y, width, height) {
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

FingerMemoEdit.prototype.getText = function() {
	var e = document.getElementById(this.id);
	var result = e.value;

	delete e;

	try {
		return result;
	} finally {
		result = null;
	}
}

FingerMemoEdit.prototype.getValue = function() {
	var e = document.getElementById(this.id);
	var result = e.value;

	delete e;

	try {
		return result;
	} finally {
		result = null;
	}
}

FingerMemoEdit.prototype.setText = function(value) {
	var e = document.getElementById(this.id);
	e.value = value;
	delete e;
}

FingerMemoEdit.prototype.setValue = function(value) {
	var e = document.getElementById(this.id);
	//value = value.replace(/[<]br[>]/gi,"\n");
	
	if (value==null) return; 
	if(value.search("<br")>-1)
		{
		value = value.replace("<br/>","\n");
		value = value.replace(/[<]br[/][>]/gi,"\n");
		}
	
	e.value = value;
	delete e;
	
}

FingerMemoEdit.prototype.setMaxLength = function(length) {
	var e = document.getElementById(this.id);
	e.maxLength = length;
	delete e;
}

FingerMemoEdit.prototype.setReadOnly = function(value) {
	var e = document.getElementById(this.id);
	e.readOnly = value;
	if (value) {
		e.style.backgroundColor = '#DFDFDF';
	} else {
		e.style.backgroundColor = this.setBackColor;
	}
	delete e;
}

FingerMemoEdit.prototype.setEnable = function(value) {
	var e = document.getElementById(this.id);
	
    if (!value) {
    	e.style.backgroundColor = '#DFDFDF';
    } else {
    	e.style.backgroundColor = this.setBackColor;
    }
    
	e.disabled = !value;
	delete e;
}

FingerMemoEdit.prototype.setVisible = function(visible) {
	var e = document.getElementById(this.id);

	if (visible == true)
		e.style.visibility = 'visible';
	else
		e.style.visibility = 'hidden';

	delete e;
}

FingerMemoEdit.prototype.setFocus = function() {
	var e = document.getElementById(this.id);

	e.focus();

	delete e;
}

FingerMemoEdit.prototype.setTabIndex = function(tabIndex) {
	var e = document.getElementById(this.id);
	e.tabIndex = tabIndex;
	delete e;
}

FingerMemoEdit.prototype.getAllowBlank = function() {
	return this.allowBlank;
}

FingerMemoEdit.prototype.setAllowBlank = function(blank, fieldName) {
	this.allowBlank = blank;
	this.setBackColor = blank ? '#ffffff' : '#ddf1f6';

	var e = document.getElementById(this.id);
    e.style.backgroundColor = this.setBackColor;
    delete e;
    
    if (fieldName) {
    	this.fieldName = fieldName;
    }
}

FingerMemoEdit.prototype.setFieldName = function(fieldName) {
	this.fieldName = fieldName;
}

FingerMemoEdit.prototype.getFieldName = function() {
	return this.fieldName;
}

FingerMemoEdit.prototype.setPlaceHolder = function(value) {
	var e = document.getElementById(this.id);
	e.placeholder = value;

	delete e;
}

FingerMemoEdit.prototype.setDefaultValue = function(defaultValue) {
	this.defaultValue = defaultValue;
}