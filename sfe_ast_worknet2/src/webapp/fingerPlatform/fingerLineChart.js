function FingerLineChart(host, id, x, y, width, height) {
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
    //a.className = 'FingerBarChart';

    host.appendChild(a);

    $.extObj = null;
    /*
    $.extObj = new dhtmlXChart({
        view: "line",
        container: $.id,
        value: "#value#",
        item: {
            borderColor: "#1293f8",
            color: "#ffffff"
        },
        line: {
            color: "#1293f8",
            width: 3
        },
        xAxis: {
            template: "'#month#"
        },
        offset: 0,
        yAxis: {
            start: 0,
            end: 100,
            step: 1,
            template: function(obj) {
                return (obj % 20 ? "": obj);
            }
        }
    });   
    */
    a = null;
}

FingerLineChart.prototype.setData = function(data, type) {
    this.extObj.parse(data, type);
}

FingerLineChart.prototype.setProperty = function(x, y, width, height) {
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

FingerLineChart.prototype.getType = function() {
    return 'LineChart';
}

FingerLineChart.prototype.setEnable = function(value) {
    var e = document.getElementById(this.id);
    e.disabled = !value;
    delete e;
}

FingerLineChart.prototype.setVisible = function(visible) {
    var e = document.getElementById(this.id);

    if (visible == true)
        e.style.visibility = 'visible';
    else
        e.style.visibility = 'hidden';

    delete e;
}