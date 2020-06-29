function FingerLabel(host, id, x, y, width, height) {
    var $ = this;
    $.id = host.id + '__' + id;
    $.x = x;
    $.y = y;
    $.width = width;
    $.height = height;
    $.text = null;
    $.showImage = false;
    $.align = 'right';
        
    var a = document.createElement('div');
    a.id = $.id;
    a.style.position = 'absolute';
    a.style.float = 'left';
    a.style.width = $.width + 'px';
    a.style.height = $.height + 'px';
    a.style.lineHeight = $.height + 'px';
    a.style.left = $.x + 'px';
    a.style.top = $.y + 'px';
    //a.style.lineHeight = $.height + 'px';
    a.className = 'tag';
    //a.innerHTML = '<span><img src="' + g_scriptPath + '/images/fingerLabel_dot.gif" align="middle" />&nbsp;&nbsp;' + 'label' + '</span>';
    //a.innerHTML = '<div style="float:left; margin-top:3px; font-size:12px; line-height:' + $.height + 'px; width:' + $.width + 'px' + '; text-align:right">&nbsp;&nbsp;' + 'label' + '&nbsp;</div>' + '<div style="margin-top:3px; float:left; width:2px; height:12px;"><img src="../fingerPlatform/images/fingerLabel_line.png" align="middle" /></div>';
    a.innerHTML = '<span>' + 'label' + '</span>';
    host.appendChild(a);
    a = null;
}

FingerLabel.prototype.getTitle = function() {
    if (this.showImage == true) {
        return '<div style="float:left; margin-top:0px; font-size:12px; line-height:' + this.height + 'px; width:' + (this.width - 2) + 'px' + '; text-align:' + this.align + '">&nbsp;&nbsp;' + this.text + '&nbsp;</div>' + '<div style="margin-top:3px; float:left; width:2px; height:12px;"><img src="./fingerPlatform/images/fingerLabel_line.png" align="middle" /></div>';
    }
    else {
        return '<div style="float:left; margin-top:1px; font-size:12px; line-height:' + this.height + 'px; width:' + this.width + 'px' + '; text-align:' + this.align + '">&nbsp;&nbsp;' + this.text + '&nbsp;</div>';
    }
}

FingerLabel.prototype.setProperty = function(x, y, width, height) {
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

FingerLabel.prototype.setText = function(text) {
    this.text = text;
    var e = document.getElementById(this.id);
    e.innerHTML = this.getTitle();    
    delete e;
}

FingerLabel.prototype.getValue = function() {    
    var result = this.text;

    try {
        return result;
    } finally {
        result = null;
    }
}

FingerLabel.prototype.getType = function() {
    return 'Label';
}

FingerLabel.prototype.showIcon = function(show) {
    this.showImage = show;    
    var e = document.getElementById(this.id);
    e.innerHTML = this.getTitle();

    delete e;
}

FingerLabel.prototype.setBackgroundImage = function(value) {
    var e = document.getElementById(this.id);

    e.className = '';
    e.innerHTML = '';
    this.text = '';
    e.style.backgroundImage = 'url("' + g_scriptPath + '/images/' + value + '")';

    delete e;
}

FingerLabel.prototype.setAlign = function(align) {
    this.align = align;
    var e = document.getElementById(this.id);
    e.innerHTML = this.getTitle();
    delete e;
}

FingerLabel.prototype.setVisible = function(visible) {
    var e = document.getElementById(this.id);

    if (visible == true)
        e.style.visibility = 'visible';
    else
        e.style.visibility = 'hidden';

    delete e;
}

FingerLabel.prototype.setStyle = function(styleAttr, value) {
    var e = document.getElementById(this.id);

    e.style[styleAttr] = value;
    delete e;
}

FingerLabel.prototype.setFontColor = function(color) {
    var e = document.getElementById(this.id);
    
    e.childNodes[0].style.color = color;
    delete e;
}

FingerLabel.prototype.setBackgroundColor = function(color) {
    var e = document.getElementById(this.id);

    e.style.backgroundColor = color;
    delete e;
}

FingerLabel.prototype.setBorderColor = function(color) {
    var e = document.getElementById(this.id);

    e.style.border = color;
    delete e;
}