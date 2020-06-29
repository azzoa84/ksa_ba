function FingerRadioBox(host, id, x, y, width, height) {
	var $ = this;
	$.id = host.id + '__' + id;
	$.ids = ('#' + $.id);
	$.x = x;
	$.y = y;
	$.width = width;
	$.height = height;
	$.allowBlank = true;
	$.fieldName = '';
	$.keyColumn = 'sub_code';
	$.displayColumn = 'code_name';	
	
	var e = document.createElement('div');
	e.style.position = 'absolute';
	e.style.float = 'left';
	e.style.width = $.width + 'px';
	e.style.height = $.height + 'px';
	e.style.left = $.x + 'px';
	e.style.top = $.y + 'px';
	e.style.lineHeight = '28px';
	e.style.zIndex = 11;
	e.className = 'FingerRadioBox';
	e.id = $.id;

	host.appendChild(e);
	
	e = null;
	
	$.addButtons = function(buttons) {
		if (!buttons)
			return;
		
		var e = document.getElementById($.id);
		
		for (var i = 0; i < buttons.length; i++) {
			var radio = document.createElement('input');
			radio.setAttribute("name", $.id);
			radio.setAttribute("type", "radio");
			radio.setAttribute("value", buttons[i][$.keyColumn]);
			radio.style.verticalAlign = 'middle';
			
			var label = document.createElement('label');
			label.style.cursor = 'pointer';
			label.style['margin-right'] = buttons[i]['margin'] ? (buttons[i]['margin'] + 'px') : '12px';
			label.appendChild(radio);
			
			var labelText = document.createElement('span');
			labelText.innerHTML = buttons[i][$.displayColumn];
			labelText.style['margin-left'] = '5px';
			label.appendChild(labelText);
			
			e.appendChild(label);
		}
		
		jQuery(('input[name=' + $.id + ']')).on('change', function(e) {
			var value = e.currentTarget.value;

			if (g_container != null && host.id == 'fpView') {
				if (g_container.fingerradiobox_change != undefined) {
					g_container.fingerradiobox_change(getRealId($.id), value);
				}
			}
			else if (g_popupStack && g_popupStack.has()) {
				g_popupStack.get().obj.fingerradiobox_change(getRealId($.id), value);
			}
			else {
				if (g_currentModule != null) {
					if (g_currentModule.fingerradiobox_change != undefined) {
						g_currentModule.fingerradiobox_change(getRealId($.id), value);
					}
				}
			}
		});
	};
}

FingerRadioBox.prototype.setProperty = function(x, y, width, height) {
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

FingerRadioBox.prototype.setTabIndex = function(tabIndex) {
	try {
		var e = document.getElementById(this.id);
		e.childNodes[0].tabIndex = tabIndex;
		delete e;		
	} catch (err) {
		console.log(err.message);
	}
}

FingerRadioBox.prototype.getType = function() {
	return 'RadioBox';
}

FingerRadioBox.prototype.setText = function(text) {
	var e = document.getElementById(this.id);
	//e.childNodes[1].innerHTML = '&nbsp;' + text;
	delete e;
}

FingerRadioBox.prototype.getValue = function() {
	try {	
		var e = document.getElementById(this.id);
	
		var radios = document.getElementsByName(this.id);
		var result = null;
		for (var i = 0; i < radios.length; i++){
			if (radios[i].checked) {
				result = radios[i].value;
			}
		}
		return result || '';
		
	} catch (err) {
		console.log(err.message);
	}
}

FingerRadioBox.prototype.setValue = function(value) {
	try {	
		var e = document.getElementById(this.id);
		
		var radios = document.getElementsByName(this.id);
		var result;
		for (var i = 0; i < radios.length; i++){
			if (radios[i].value == value) {
				radios[i].checked = true;
			} else {
				radios[i].checked = false;
			}
		}
		delete e;

	} catch (err) {
		console.log(err.message);
	}
}

FingerRadioBox.prototype.setEnable = function(value) {
	var e = document.getElementById(this.id);
	e.disabled = !value;
	
	var sel = jQuery(this.ids);
	sel.find(':radio').attr('disabled', !value);

	delete e;
}

FingerRadioBox.prototype.setVisible = function(visible) {
	var e = document.getElementById(this.id);

	if (visible == true)
		e.style.visibility = 'visible';
	else
		e.style.visibility = 'hidden';

	delete e;
}

FingerRadioBox.prototype.setBackgroundColor = function(color) {
	var e = document.getElementById(this.id);
	e.style.backgroundColor = color;

	delete e;
}

FingerRadioBox.prototype.setFocus = function() {
	var e = document.getElementById(this.id);
	e.focus();

	delete e;
}

FingerRadioBox.prototype.getAllowBlank = function() {
    return this.allowBlank;
}

FingerRadioBox.prototype.setAllowBlank = function(blank, fieldName) {
    this.allowBlank = blank;

    if (fieldName) {
    	this.fieldName = fieldName;
    }
}

FingerRadioBox.prototype.setFieldName = function(fieldName) {
    this.fieldName = fieldName;
}

FingerRadioBox.prototype.getFieldName = function() {
    return this.fieldName;
}
