function FingerLine(host, id, x, y, width, height) {
    var $ = this;
    $.id = host.id + '__' + id;
    $.x = x;
    $.y = y;
    $.width = width;
    $.height = height;    

    var a = document.createElement('div');
    a.id = $.id;
    a.style.position = 'absolute';
    a.style.left = $.x + 'px';
    a.style.top = $.y + 'px';
    a.style.width = $.width + 'px';
    a.style.height = $.height + 'px';
    a.style.backgroundColor = 'gray';

    //a.width = $.width;
    //a.setAttribute('width', '100');
    //a.noshade = true;
    //a.setAttribute('noshade', true);
    ///a.size = '1';
    
    host.appendChild(a);

    a = null;

    $.element = function() {
        return document.getElementById($.id);
    }

    $.setColor = function(color) {
        $.element().style.backgroundColor = color;
    }
}

FingerLine.prototype.getType = function() {
	return 'Line';
}

FingerLine.prototype.setProperty = function(x, y, width, height) {
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