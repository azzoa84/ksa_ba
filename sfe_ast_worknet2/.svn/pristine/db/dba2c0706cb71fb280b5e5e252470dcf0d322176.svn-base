function FingerButton(host, id, x, y, width, height) {
	var $ = this;
	$.id = host.id + '__' + id;
	$.ids = ('#' + $.id);
	$.x = x;
	$.y = y;
	$.width = width;
	$.height = height;
	$.enabled = true;
	$._btn = null;
	
	$.setArrow = function(bln){
		var bNod = $._btn.childNodes[0];
		console.log(bNod);
		if(bln == true){
			bNod.className = "FingerButtonLeft";
		}else{
			bNod.className = "FingerButtonLeftFlat";
		}
	};
	
	$.click = function() {
		if(!$.enabled) return;
		
		if (g_container != null && host.id == 'fpView') {
			if (g_container.fingerbutton_click != undefined) {
				g_container.fingerbutton_click(getRealId($.id));
			}
		}
		else if (g_popupStack && g_popupStack.has()) {
			g_popupStack.get().obj.fingerbutton_click(getRealId($.id));
			
		} else {
			if (g_currentModule != null) {
				if (g_currentModule.fingerbutton_click != undefined) {
					g_currentModule.fingerbutton_click(getRealId($.id));
				}
			}
		}
	};
	
	var btn = document.createElement('div');
 	$._btn = btn;
 
	btn.id = $.id;
	btn.style.position = 'absolute';
	btn.style.float = 'left';
	btn.style.width = ($.width - 20) + 'px';
	btn.style.height = $.height + 'px';
	btn.style.left = $.x + 'px';
	btn.style.top = $.y + 'px';
	btn.style.lineHeight = $.height + 'px';
	btn.className = 'FingerButton';
	btn.style.zIndex = 11;
	
	
	if (btn.addEventListener) {
		btn.addEventListener("click", $.click, false);
	} else if (btn.attachEvent) {
		btn.attachEvent("onclick", $.click);
	}

	var a = document.createElement('div');
	a.className = 'FingerButtonLeft';
	btn.appendChild(a);
   
	var b = document.createElement('div');
	b.style.width = ($.width - 20) + 'px';
	var bHeight = ($.height < 26 ? 26 : $.height);
	b.style.height = bHeight + 'px';
	b.style.lineHeight = (bHeight - 3) + 'px';
	b.className = 'FingerButtonCenter';
	btn.appendChild(b);
	
	var c = document.createElement('div');
	
	c.style.position = 'relative';
	c.style.float = 'left';
	c.style.height = '100%';
	c.className = 'FingerButtonRight';
	
	btn.appendChild(c);
	
	host.appendChild(btn);   
	
	delete a;
	delete b;
	delete c;
	delete btn;

}

FingerButton.prototype.setProperty = function(x, y, width, height) {
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

FingerButton.prototype.getType = function() {
	return 'Button';
};

FingerButton.prototype.setText = function(text) {
	var e = document.getElementById(this.id);
	e.childNodes[1].innerHTML = text;
	delete e;
};

FingerButton.prototype.getText = function() {
	var e = document.getElementById(this.id);
	var result = e.childNodes[1].innerHTML;

	delete e;

	try {
		return result;
	} finally {
		result = null;
	}
};

FingerButton.prototype.setBackgroundImage = function(value) {
	var e = document.getElementById(this.id);
	e.className = 'FingerButton_';
	e.values = '';
	e.style.backgroundColor = 'transparent';
	e.style.border = 'none';
	e.style.backgroundImage = 'url("' + g_scriptPath + '/images/' + value + '")';
	e.style.cursor = 'pointer';

	delete e;
};

FingerButton.prototype.setEnable = function(value) {
	var e = document.getElementById(this.id);
	if (value) {
		e.style.pointerEvents = 'all';
		e.style.opacity = '1';
	} else {
		e.style.pointerEvents = 'none';
		e.style.opacity = '0.4';
	}
	e.disabled = value;
	$.enabled = value;
	delete e;
};

FingerButton.prototype.setVisible = function(visible) {
	var e = document.getElementById(this.id);

	if (visible == true)
		e.style.visibility = 'visible';
	else
		e.style.visibility = 'hidden';

	delete e;
};

FingerButton.prototype.setStyle = function(styleAttr, value, childIndex) {
	var e = document.getElementById(this.id);

	if (childIndex)
	{
		e.childNodes[childIndex].style[styleAttr] = value;
	}
	else
	{
		e.style[styleAttr] = value;
	}

	delete e;
};

FingerButton.prototype.setClass = function(value) {
	var sel = jQuery(this.ids);

	if (value) {
		sel.find('.FingerButtonCenter').addClass(value);
	}
};

FingerButton.prototype.isHidden = function() {
    var e = document.getElementById(this.id);
    return (e.style.visibility == 'hidden' ? true : false);
}

FingerButton.prototype.isPopup = function(value) {
	var e = document.getElementById(this.id);

	if (value) {
		e.className = 'PopupButton';
	}
	else {
		e.className = 'FingerButton';
	}

	delete e;
};

FingerButton.prototype.setLineHeight = function(row) {
	var sel = jQuery(this.ids);
	
	if (row) {
		var lineheight = sel.height() / row;
		sel.find('.FingerButtonCenter').css('lineHeight', lineheight + 'px');
	}
};