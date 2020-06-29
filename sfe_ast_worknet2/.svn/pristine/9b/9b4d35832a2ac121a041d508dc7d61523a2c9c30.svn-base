function FingerNumberEdit(host, id, x, y, width, height) {
    var $ = this;
    $.id = host.id + '__' + id;
    $.x = x;
    $.y = y;
    $.width = width;
    $.height = height;
    $.defaultValue = null;

    var e = document.createElement('input');
    e.id = $.id;
    e.style.position = 'absolute';
    e.style.float = 'left';
    e.style.width = $.width + 'px';
    e.style.height = $.height + 'px';
    e.style.left = $.x + 'px';
    e.style.top = $.y + 'px';
    e.style.lineHeight = $.height + 'px';
    e.style.paddingLeft = '2px';
    e.style.paddingRight = '2px';
    e.style.textAlign = 'right';
    e.className = 'FingerNumberEdit';

    host.appendChild(e);

    e = null;

    try
    {
        jQuery('.FingerNumberEdit').ForceNumericOnly();
    }
    catch (err)
    {
    
    }
}

FingerNumberEdit.prototype.getType = function() {
	return 'NumberEdit';
}

FingerNumberEdit.prototype.setProperty = function(x, y, width, height) {
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

FingerNumberEdit.prototype.setDefaultValue = function(defaultValue) {
	this.defaultValue = defaultValue;
}