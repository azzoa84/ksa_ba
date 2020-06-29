function FingerPieChart(host, id, x, y, width, height) {
    var $ = this;
    $.id = host.id + '__' + id;
    $.x = x;
    $.y = y;
    $.width = width;
    $.height = height;

    var a = document.createElement('div');
    a.id = $.id;    
    a.style.position = 'absolute';
    a.style.float = 'left';
    a.style.width = $.width + 'px';
    a.style.height = $.height + 'px';
    a.style.left = $.x + 'px';
    a.style.top = $.y + 'px';
    a.className = 'FingerPieChart';

    host.appendChild(a);
    
    $.extObj = new dhtmlXChart({
        view: "pie",
        container: $.id,
        value: "#sales#",
        color: "#color#",
        label: "#month#",
        pieInnerText: "#sales#",
        shadow: 0
    });

    a = null;
}

FingerPieChart.prototype.setData = function(data, type) {
    this.extObj.parse(data, type);
}

FingerPieChart.prototype.setProperty = function(x, y, width, height) {
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

FingerPieChart.prototype.getType = function() {
    return 'PieChart';
}

FingerPieChart.prototype.setEnable = function(value) {
    var e = document.getElementById(this.id);
    e.disabled = !value;
    delete e;
}

FingerPieChart.prototype.setVisible = function(visible) {
    var e = document.getElementById(this.id);

    if (visible == true)
        e.style.visibility = 'visible';
    else
        e.style.visibility = 'hidden';

    delete e;
}