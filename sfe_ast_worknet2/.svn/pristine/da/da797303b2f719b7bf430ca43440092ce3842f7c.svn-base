function FingerPopupStack() {
	var $ = this;
	$.stack = [];
	$.shareData = null;
	
	$.push = function(id, popObj) {
		try {
			$.shareData = null;
			$.stack.push({'id':id, 'popup':popObj});
			return;
			
		} catch (err) {
			console.log('FingerPopupStack push() : ' + err.message);
		}
	};
	
	$.has = function() {
		try {
			return ($.stack.length > 0 ? true : false);
		} catch (err) {
			console.log('FingerPopupStack has() : ' + err.message);
		}
	};
	
	$.get = function() {
		try {
			if ($.stack.length == 0) {
				return null;
			}
			return $.stack[$.stack.length - 1]['popup'];
		} catch (err) {
			console.log('FingerPopupStack get() : ' + err.message);
		}
	};
	
	$.pop = function() {
		try {
			//console.log('pop before length : ' + $.stack.length);
			var closedPop = $.stack.pop();
			$.shareData = closedPop.data;
			return closedPop;
		} catch (err) {
			console.log('FingerPopupStack pop() : ' + err.message);
		}
	};
	
	$.setData = function(data) {
		try {
			var pop = $.stack[$.stack.length - 1];
			pop['data'] = data;
			return;
			
		} catch (err) {
			console.log('FingerPopupStack setData() : ' + err.message);
		}
	};
	
	$.close = function() {
		try {
			var tailPop = $.get();
			
			if (tailPop) {
				tailPop.extObj.close();
			}
		} catch (err) {
			console.log('FingerPopupStack close() : ' + err.message);
		}
	};
}