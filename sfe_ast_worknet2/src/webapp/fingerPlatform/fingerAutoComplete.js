function FingerAutoComplete(id) {
	var $ = this;
	$.id = id;
	$.ids = ('#' + id);
	$.atcIds = ('#' + $.id + '_atc_');
	$.loadData = null;
	$.callFunc = null;
	$.dispColumn = 'code_name';
	$.extraColumn = 'extra_field1';
	
	$.inputJ = jQuery($.ids);
	
	if (!$.inputJ.length) {
		console.log('FingerAutoComplete 생성시 textInput id 지정이 필수입니다.');
		return;
	}

    var e = document.createElement('div');
    e.id = ($.id + '_atc_');
    e.style.display = 'none';
    e.style.position = 'absolute';
    e.style.zIndex = 99999999;
    e.className = 'auto_complete_div';
    
    document.body.appendChild(e);
    
    $.inputJ.keyup(function(e) {
    	if (!$.isControlKey(e.keyCode)) {
    		$.setFilter(e.keyCode);
    		$.show();
    	}
    });
    
    $.inputJ.keydown(function(e) {
    	if ($.isControlKey(e.keyCode)) {
    		$.keySelect(e.keyCode);
    	}
    });
    
	$.create = function(data) {
		$.loadData = data;
		
		// container create
		var inputEl = document.getElementById($.id);
	    $.atcJ = jQuery($.atcIds);
	    
		var pos = $.getXyToAbs(inputEl);
		pos.y = (pos.y + $.inputJ.height() + 3);
		$.atcJ.css("left", pos.x).css("top", pos.y);
		$.atcJ.css("height", "90px");		
	};
    
	$.setColumn = function(column1, column2) {
		$.dispColumn = column1;
		$.extraColumn = column2;
	};

	$.render = function(data) {
		try {
			if (!data || data.length == 0) {
				$.atcJ.find('li').remove();
				var li = jQuery('<li></li>').width($.inputJ.width()).text('(검색결과없음)').appendTo($.atcJ);
				return;
			}
			
			$.atcJ.find('li').remove();
			for (var i = 0; i < data.length; i++) {
				var li = jQuery('<li></li>')
				.width($.inputJ.width())
				.text(data[i][$.dispColumn])
				.on('click', $.select)
				.data('extdata', data[i])
				.appendTo($.atcJ);
				
				if (data[i][$.extraColumn]) {
					jQuery('<i></i>')
					.text(' (' + data[i][$.extraColumn] + ')')
					.appendTo(li);
				}
			}
			/*
			if (loadData.length > 3) { 
				$.atcJ.css("height", "90px");
			} else {
				$.atcJ.css("height", "auto");
			}
			*/
		} catch (err) {
			console.log('FingerAutoComplete render() : ' + err.message);
		}
	};
    
	$.isControlKey = function(code) {
		return (code && (code == 13 || code == 38 || code == 40)) ? true : false;
	};
	
	$.keySelect = function(keyCode) {
		switch (keyCode) {
		case 13:
			$.select();
			break;
			
		case 38:
			$.tmpSelect('PREV');
			break;
			
		case 40:
			$.tmpSelect('NEXT');
			break;

		default:
			break;
		}
	};
	
	$.tmpSelect = function(tp) {
		if ($.atcJ.find('li.on').length) {
			if (tp == 'PREV') {
				$.atcJ.find('li.on').removeClass("on").prev().addClass("on");
			} else if (tp == 'NEXT') {
				$.atcJ.find('li.on').removeClass("on").next().addClass("on");
			}
		} else {
			$.atcJ.find('li').eq(0).addClass("on");
		}
		//$.atcJ.find('li').eq(idx).addClass("on").siblings().removeClass("on");
		
		var idx = $.atcJ.find('li.on').index();
		if (idx > 2) {
			var addStep = (idx - 2);
			$.atcJ.scrollTop((addStep * 30));
		} else {
			$.atcJ.scrollTop(0);
		}
	};
	
	$.select = function(event) {
		var data = null;
		if (event) {
			data = jQuery(event.currentTarget).data('extdata');
		} else {
			data = $.atcJ.find('.on').data('extdata');
		}
		if ($.callFunc) {
			$.callFunc(data);
		}
		
		$.hide();
		$.inputJ.val('');
	};
	
	$.setFilter = function() {
		var val = $.inputJ.val();
		//if (val.length < 2)
		//	return;
		var result = $.loadData.filter(function(el, idx) {
			return (el[$.dispColumn].search(new RegExp(val, 'gi')) !== -1);
		});
		
		$.render(result);
	};

	$.show = function() {
		if ($.atcJ.css("display") == "none") {
			if ($.atcJ.find('li').length) {
				$.atcJ.css("display", "block");
			} else {
				$.atcJ.css("display", "none");
			}
		}
	};
	
	$.hide = function() {
		if ($.atcJ.css("display") == "block") {
			$.atcJ.css("display", "none");
		}
	};
	
	$.setCallFunc = function(callFunc) {
		$.callFunc = callFunc;
	};
	
	$.getXyToAbs = function(el) {
		var el2 = el;
		var curtop = 0;
		var curleft = 0;
		if (document.getElementById || document.all) {
			do {
				curleft += el.offsetLeft-el.scrollLeft;
				curtop += el.offsetTop-el.scrollTop;
				el = el.offsetParent;
				el2 = el2.parentNode;
				while (el2 != el) {
					curleft -= el2.scrollLeft;
					curtop -= el2.scrollTop;
					el2 = el2.parentNode;
				}
			} while (el.offsetParent);

		} else if (document.layers) {
			curtop += el.y;
			curleft += el.x;
		}
		return {'x':curleft, 'y':curtop};
	};
}