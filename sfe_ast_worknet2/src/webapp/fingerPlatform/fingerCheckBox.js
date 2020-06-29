function FingerCheckBox(host, id, x, y, width, height) {
	var $ = this;
	$.id = host.id + '__' + id;
	$.x = x;
	$.y = y;
	$.width = width;
	$.height = height;
	$.defaultValue = null;
	
	var e = document.createElement('div');
	e.style.position = 'absolute';
	e.style.float = 'left';
	e.style.width = $.width + 'px';
	e.style.height = $.height + 'px';
	e.style.left = $.x + 'px';
	e.style.top = $.y + 'px';
	e.style.lineHeight = $.height + 'px';
	e.style.zIndex = 11;
	e.className = 'FingerCheckBox';
	e.id = $.id;
	
	var ce = document.createElement('input');
	ce.id = ($.id + '_checkbox');
	ce.setAttribute("type", "checkbox");
	ce.style.verticalAlign = 'middle';
	ce.onchange = function() {
		var value = $.getValue();

		if (g_container != null && host.id == 'fpView') {
			if (g_container.fingercheckbox_change != undefined) {
				g_container.fingercheckbox_change(getRealId($.id), value);
			}
		}
		else if (g_popupStack && g_popupStack.has()) {
			g_popupStack.get().obj.fingercheckbox_change(getRealId($.id), value);
		}		
		else {
			if (g_currentModule != null) {
				if (g_currentModule.fingercheckbox_change != undefined) {
					g_currentModule.fingercheckbox_change(getRealId($.id), value);
				}
			}
		}
	};
	
	var label = document.createElement('label');
	label.htmlFor = ce.id;
	//label.appendChild(document.createTextNode('&nbsp;' + $.id));
	label.innerHTML = '&nbsp;' + $.id;
	label.style.cursor = 'pointer';

	e.appendChild(ce);
	e.appendChild(label);
	
	host.appendChild(e);

	e = null;
}

FingerCheckBox.prototype.setProperty = function(x, y, width, height) {
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

FingerCheckBox.prototype.setTabIndex = function(tabIndex) {
	var e = document.getElementById(this.id);
	e.childNodes[0].tabIndex = tabIndex;
	delete e;
}

FingerCheckBox.prototype.getType = function() {
	return 'CheckBox';
}

FingerCheckBox.prototype.setText = function(text) {
	var e = document.getElementById(this.id);
	e.childNodes[1].innerHTML = '&nbsp;' + text;
	delete e;
}

FingerCheckBox.prototype.getValue = function() {
	var e = document.getElementById(this.id);
	var result = 'N';

	if (e.childNodes[0].checked)
		result = 'Y';

	delete e;

	try {
		return result;
	} finally {
		result = null;
	}
}

FingerCheckBox.prototype.setStyle = function(styleAttr, value) {
	var e = document.getElementById(this.id);
	
	e.style[styleAttr] = value;

    delete e;
};

FingerCheckBox.prototype.setValue = function(value) {
	var e = document.getElementById(this.id);
	if(value == 'Y')
		e.childNodes[0].checked = true;
	else
		e.childNodes[0].checked = false;
	delete e;
}

FingerCheckBox.prototype.setReadOnly = function(value) {
	var e = document.getElementById(this.id);
	e.childNodes[0] = value;
	delete e;
}

FingerCheckBox.prototype.setEnable = function(value) {
	var e = document.getElementById(this.id);
	e.childNodes[0].disabled = !value;
	delete e;
}

FingerCheckBox.prototype.setVisible = function(visible) {
	var e = document.getElementById(this.id);

	if (visible == true)
		e.style.visibility = 'visible';
	else
		e.style.visibility = 'hidden';

	delete e;
}

FingerCheckBox.prototype.setBackgroundColor = function(color) {
	var e = document.getElementById(this.id);

	e.style.backgroundColor = color;

	delete e;
}

FingerCheckBox.prototype.setFontColor = function(color) {
	var e = document.getElementById(this.id);

	e.childNodes[1].style.color = color;

	delete e;
}

FingerCheckBox.prototype.setFocus = function() {
	var e = document.getElementById(this.id);

	e.focus();

	delete e;
}

FingerCheckBox.prototype.setDefaultValue = function(defaultValue) {
	this.defaultValue = defaultValue;
}
