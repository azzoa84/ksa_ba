function FingerHTMLView(host, id, x, y, width, height) {
    var $ = this;
    $.id = host.id + '__' + id;
    $.x = x;
    $.y = y;
    $.width = width;
    $.height = height;

    $.click = function() {
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
    }
        
    var a = document.createElement('div');
    a.id = $.id;
    a.style.position = 'absolute';
    a.style.float = 'left';
    a.style.width = $.width + 'px';
    a.style.height = $.height + 'px';
    a.style.left = $.x + 'px';
    a.style.top = $.y + 'px';
    a.style['overflow-x'] = 'hidden';
    a.style['overflow-y'] = 'auto';
    host.appendChild(a);
    a = null;
}

FingerHTMLView.prototype.setProperty = function(x, y, width, height) {
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

FingerHTMLView.prototype.setHTML = function(text) {
    this.text = text;

    var e = document.getElementById(this.id);
    jQuery(e).empty().html(text);
    
    //e.innerHTML = text;
    delete e;
}

FingerHTMLView.prototype.getHTML = function() {
    var e = document.getElementById(this.id);
    var result = e.innerHTML;

    try {
        return result;
    } finally {
        result = null;
    }
}

FingerHTMLView.prototype.setValue = function(text) {
	this.setHTML(text);
}

FingerHTMLView.prototype.getValue = function() {
	return this.getHTML();
}

FingerHTMLView.prototype.getType = function() {
    return 'HTMLView';
}

FingerHTMLView.prototype.setBorder = function(value) {
    var e = document.getElementById(this.id);

    if (value == true) {
        this.border = true;
        e.style.border = '1px solid #D8D8D8';
    }
    else {
        this.border = false;
        e.style.border = 'none';
    }

    delete e;
}

FingerHTMLView.prototype.setHorizontalScroll = function(value) {
    var e = document.getElementById(this.id);

    if (value == true) {
        e.style['overflow-x'] = 'scroll';
    }
    else {
        e.style['overflow-x'] = 'hidden';
    }

    delete e;
}

FingerHTMLView.prototype.setVerticalScroll = function(value) {
    var e = document.getElementById(this.id);

    if (value == true) {
        e.style['overflow-y'] = 'auto';
    }
    else {
        e.style['overflow-y'] = 'hidden';
    }

    delete e;
}


FingerHTMLView.prototype.setVisible = function(visible) {
    var e = document.getElementById(this.id);

    if (visible == true)
	{
        e.style.visibility = 'visible';
		e.style.zIndex = "2147483647";
	}
    else
	{
        e.style.visibility = 'hidden';
		e.style.zIndex = "";
	}
    delete e;
}

FingerHTMLView.prototype.getRealId = function() {
    return this.id;
}

FingerHTMLView.prototype.setStyle = function(styleAttr, value) {
    var e = document.getElementById(this.id);

    e.style[styleAttr] = value;
    delete e;
}

FingerHTMLView.prototype.setStyleArray = function(styleArray) {
    var e = document.getElementById(this.id);

    if (styleArray && styleArray.length) {
    	for (var i = 0; i < styleArray.length; i++) {
    		e.style[styleArray[i].styleAttr] = styleArray[i].value;
    	}
    }
    
    delete e;
}

FingerHTMLView.prototype.setStyleClass = function(className) {
    var e = document.getElementById(this.id);
    
    var orgClass = e.className || '';
    
    e.className = (orgClass + ' ' + className);
    delete e;
}

FingerHTMLView.prototype.removeStyle = function(css) {
    var e = document.getElementById(this.id);
    
    e.style.removeProperty(css);
    delete e;
}

FingerHTMLView.prototype.setBackgroundImage = function(value) {
    var e = document.getElementById(this.id);

    e.style.backgroundColor = 'transparent';
    e.style.border = 'none';
    e.style.backgroundImage = 'url("' + g_scriptPath + '/images/' + value + '")';
    e.style['background-repeat'] = 'no-repeat';

    delete e;
}

FingerHTMLView.prototype.setButtonMode = function(value) {
    var e = document.getElementById(this.id);

    if (value)
    {
        e.style.cursor = 'pointer';

        if (e.addEventListener) {
            e.addEventListener("click", this.click, false);
        } else if (e.attachEvent) {
            e.attachEvent("onclick", this.click);
        }
    }
    else
    {
        if (e.removeEventListener) {
            e.removeEventListener("click", this.click);
        } else if (e.detachEvent) {
            e.detachEvent("onclick", this.click);
        }
    }
}

