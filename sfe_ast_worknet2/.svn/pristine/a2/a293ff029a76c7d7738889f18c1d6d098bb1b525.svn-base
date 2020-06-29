function FingerBarChart(host, id, x, y, width, height) {
	var $ = this;
	$.id = host.id + '__' + id;
	$.ids = ('#' + $.id);
	$.x = x;
	$.y = y;
	$.width = width;
	$.height = height;
	$.extObj = null;
	$.settings = null;
	
	var e = document.createElement('div');
	e.id = $.id;
	e.style.position = 'absolute';
	e.style.float = 'left';
	e.style.width = $.width + 'px';
	e.style.height = $.height + 'px';
	e.style.left = $.x + 'px';
	e.style.top = $.y + 'px';
	
	host.appendChild(e);

	/**
	 * 차트 초기화 (생성)
	 */	
	$.init = function(obj) {
		try {
			var chart = jQuery($.ids).highcharts();
			if (chart) {
				chart.destroy();
			}
			
			jQuery($.ids).highcharts(obj);
			$.extObj = jQuery($.ids).highcharts();
			
		} catch (err) {
			console.log('FingerBarChart init() : ' + err.message);
		}
	};
	
	$.getChart = function() {
		try {
			if ($.extObj) {
				return $.extObj;
			} else {
				console.log('FingerBarChart getChart() : 차트가 생성되지 않았습니다. init(obj) 를 통하여 차트를 생성해 주시기 바랍니다.');
				return null;
			}
		} catch (err) {
			console.log('FingerBarChart getChart() : ' + err.message);
		}		
	};
	
	$.clear = function() {
		if ($.extObj && $.extObj.series && $.extObj.series.length) {
			var len = $.extObj.series.length;
			for (var i = 0; i < len; i++) {
				$.extObj.series[0].remove();
			}
		}
	};
};

FingerBarChart.prototype.getType = function() {
	return 'BarChart';
};

FingerBarChart.prototype.setProperty = function(x, y, width, height) {
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

FingerBarChart.prototype.setVisible = function(visible) {
	var e = document.getElementById(this.id);

	if (visible == true)
		e.style.visibility = 'visible';
	else
		e.style.visibility = 'hidden';
		
	delete e;
};