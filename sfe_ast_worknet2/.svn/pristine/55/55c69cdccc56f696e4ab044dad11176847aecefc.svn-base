function FingerRadioGroup(host, id, x, y, width, height) {
    var $ = this;
    $.id = host.id + '__' + id;
    $.index = 0;
    $.x = x;
    $.y = y;
    $.width = width;
    $.height = height;
    
    var e = document.createElement('div');
    e.style.position = 'absolute';
    e.style.float = 'left';
    e.style.width = $.width + 2 + 'px';
    e.style.height = $.height + 2 + 'px';
    e.style.left = $.x + 'px';
    e.style.top = $.y + 'px';

    e.className = 'radioHolder';

    host.appendChild(e);
}

FingerRadioGroup.prototype.setProperty = function(x, y, width, height) {
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

FingerRadioGroup.prototype.addRadioButton = function(value, text) {
    var e = document.getElementById(this.id);

    var i = document.createElement('input');
    i.setAttribute('type', 'radio');
    i.setAttribute('name', this.id);
    i.setAttribute('value', value);
    i.className = 'radioButton';
    e.appendChild(i);

    var s = document.createElement('span');
    s.className = 'text';
    s.innerHTML = text;
    e.appendChild(s);
}