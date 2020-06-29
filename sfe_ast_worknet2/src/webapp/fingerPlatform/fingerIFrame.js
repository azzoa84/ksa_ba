function FingerIFrame(host, id, x, y, width, height) {
	var $ = this;
	$.id = host.id + '__' + id;
	$.ids = ('#' + $.id);
	$.x = x;
	$.y = y;
	$.width = width;
	$.height = height;

	var e = document.createElement('iframe');
	e.id = $.id;
	e.name = $.id;
	e.style.position = 'absolute';
	e.style.float = 'left';
	e.style.width = $.width + 'px';
	e.style.height = $.height + 'px';
	e.style.left = $.x + 'px';
	e.style.top = $.y + 'px';
	e.style.border = 'none';
	e.className = 'FingerIFrame';

	host.appendChild(e);
	e = null;
	
	$.extObj = jQuery($.ids);
	
	$.load = function(obj) {
		try {
			if (obj.src) {
				//log(obj.src);
				$.extObj.attr('src', obj.src);
			}
			
		} catch (err) {
			console.log('FingerIFrame load() : ' + err.message);
		}
	};

	/**
	 * 즉시 프린트 실행
	 */
	$.callPrint = function(params) {
		try {
			if (!params)
				return;
			
			params.viewer = false;
			$.open(params);
			$.print();
			
		} catch (err) {
			console.log('FingerIFrame callPrint() : ' + err.message);
		}
	};
}

FingerIFrame.prototype.setProperty = function(x, y, width, height) {
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

FingerIFrame.prototype.getType = function() {
	return 'ReportView';
}

FingerIFrame.prototype.getText = function() {
	var e = document.getElementById(this.id);
	var result = e.value;

	delete e;

	try {
		return result;
	} finally {
		result = null;
	}
}

FingerIFrame.prototype.getValue = function() {
	var e = document.getElementById(this.id);
	var result = e.value;

	delete e;

	try {
		return result;
	} finally {
		result = null;
	}
}

FingerIFrame.prototype.setText = function(value) {
	var e = document.getElementById(this.id);
	e.value = value;
	delete e;
}

FingerIFrame.prototype.setValue = function(value) {	
	var e = document.getElementById(this.id);
	e.value = value;
	delete e;
}