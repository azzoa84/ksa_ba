function FingerScatterChart(host, id, x, y, width, height, xAxis, yAxis) {
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

    // @create chart
    var xAxisObj = xAxis || {};
    var yAxisObj = yAxis || {};
    var toolTips = "<span style='color:#293CD6; font-size:9pt; background-color:white; padding:2px 2px 2px 2px; border:1px solid #A4BED4;'>#c#</span>";

    $.extObj = new dhtmlXChart({
        view: "scatter",
        container: $.id,
        value: "#a#",
    	label:"#c#",
        xValue: "#b#",
        item: {
            radius: 5,
            borderColor: "#f38f00",
            borderWidth: 1,
            color: "#ff9600",
            type: "d",
            shadow: true
        },
        tooltip: {
            template: toolTips
        },
        xAxis: xAxisObj,
        yAxis: yAxisObj
    });

    a = null;
}


FingerScatterChart.prototype.setData = function(data, xCol, yCol, lCol) {
    var bindData = [];

    if (data.R.length > 0)
    {
        var xColIdx = data.columns.indexOf(xCol);
        var yColIdx = data.columns.indexOf(yCol);
        var lColIdx = data.columns.indexOf(lCol);

        for (var i in data.R)
        {
            var item = {};

            item['a'] = data.R[i].I[yColIdx];
            item['b'] = data.R[i].I[xColIdx];
            item['c'] = data.R[i].I[lColIdx];
            
            bindData.push(item);
        }
    }

    this.extObj.parse(bindData, 'json');
}


FingerScatterChart.prototype.setProperty = function(x, y, width, height) {
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

FingerScatterChart.prototype.getType = function() {
    return 'LineChart';
}

FingerScatterChart.prototype.setEnable = function(value) {
    var e = document.getElementById(this.id);
    e.disabled = !value;
    delete e;
}

FingerScatterChart.prototype.setVisible = function(visible) {
    var e = document.getElementById(this.id);

    if (visible == true)
        e.style.visibility = 'visible';
    else
        e.style.visibility = 'hidden';

    delete e;
}