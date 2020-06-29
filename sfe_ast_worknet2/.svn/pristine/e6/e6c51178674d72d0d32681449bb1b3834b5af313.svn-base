function FingerComboBox(host, id, x, y, width, height) {
	var $ = this;
	$.id = host.id + '__' + id;
	$.ids = ('#' + $.id);
	$.x = x;
	$.y = y;
	$.width = width;
	$.height = height;
	$.emptyRow = false;
	$.emptyRowText = '전 체';
	$.items = [];
	$.keyColumn = 'sub_code';
	$.displayColumn = 'code_name';
	$.defaultValue = null;
	$.setBackColor = '#ffffff';

	$.change = function() {
		var value = $.getValue();

		if (g_container != null && host.id == 'fpView') {
			if (g_container.fingercombobox_change != undefined) {
				g_container.fingercombobox_change(getRealId($.id), value);
			}
		}
		else if (g_popupStack && g_popupStack.has()) {
			g_popupStack.get().obj.fingercombobox_change(getRealId($.id), value);
			
		} else {
			if (g_currentModule != null) {
				if (g_currentModule.fingercombobox_change != undefined) {
					g_currentModule.fingercombobox_change(getRealId($.id), value);
				}
			}
		}
	}

	var e = document.createElement('div');
	e.id = $.id;
	e.style.position = 'absolute';
	e.style.float = 'left';
	e.style.width = $.width + 'px';
	e.style.height = $.height+ 'px';
	e.style.left = $.x + 'px';
	e.style.top = $.y + 'px';
	e.style.lineHeight = $.height + 'px';
	e.style.zIndex = 11;
	e.className = 'FingerComboBox';

	/*
	if (e.addEventListener) {
		e.addEventListener("change", $.change, false);
	} else if (e.attachEvent) {
		e.attachEvent("onchange", $.change);
	}
	*/

	var select = document.createElement('select');
	select.id = ($.id + '_select');
	select.style.width = $.width  + 'px';
	select.style.height = $.height + 'px';
	e.appendChild(select);
	
	host.appendChild(e);
	
	// select2 plugin
	$.extObj = jQuery($.ids).find('select').select2({
		placeholder: "",
		allowClear: true,
		language: {
			noResults: function() {
				return "(결과없음)";
			}
		}
	/* 아래 unselecting, open 2개의 함수는 "x"클릭을 통한 클리어시 콤보박스가 한번 열리는 현상을 막기 위함 */
	}).on("select2:unselecting", function(e) {
		jQuery(this).data('state', 'unselected');
	}).on("select2:open", function(e) {
		if (jQuery(this).data('state') === 'unselected') {
			jQuery(this).removeData('state');
			jQuery(this).select2('close');
			/*
			 * 일부 브라우저에서 즉시 반응 안하는 경우
			var self = jQuery(this);
			setTimeout(function() {
				self.select2('close');
			});
			*/
		}
	});
	
	$.extObj.on("change", $.change);
	
	e = null;
	
	$.addItem = function(value, text) {
		var o = document.createElement('option');
		o.setAttribute('value', value);
		//o.setAttribute('text', text);
		o.innerHTML = text;

		var e = document.getElementById($.id).childNodes[0];
		e.appendChild(o);

		var item = new Array();
		item.push(value);
		item.push(text);
		$.items.push(item);

		o = null;
		e = null;
	}

	$.setValue = function(value, column) {
		try {
			$.extObj.val(value).trigger('change');
			/*
			var e = document.getElementById($.id).childNodes[0];
			
			if (!column) {
				e.value = value;
			} else {
				for (var i in $.dataSource) {
					if (value == $.dataSource[i][column]) {
						e.value = $.dataSource[i][$.keyColumn];
						break;
					}
				}				
			}
			*/
		} finally {
			/*
			e = null;
			$.change();
			*/
		}
	}

	$.getValue = function(column) {
		try {
			return $.extObj.val() || '';
			/*
			var e = document.getElementById($.id).childNodes[0];
			
			if (!column) {
				return e.value;
			} else {
				for (var i in $.dataSource) {
					if ($.dataSource[i][$.keyColumn] == e.value) {
						return $.dataSource[i][column];
					}
				}				
			}
			*/
		} finally {
			//e = null;
		}
	}

	$.getText = function() {
		var e = document.getElementById($.id).childNodes[0];

		try {
			return e.options[e.selectedIndex].text;
		} finally {
			e = null;
		}
	}

	$.clear = function() {
		var e = document.getElementById($.id).childNodes[0];
		while (e.hasChildNodes()) {
			e.removeChild(e.lastChild);
		}
		e = null;
	}

	$.setEmptyRow = function(isEmpty, emptyRowText) {
		$.emptyRow = isEmpty;
		$.emptyRowText = (emptyRowText == undefined ? '' : emptyRowText);
	}

	$.getEmptyRow = function() {
		return $.emptyRow;
	}

	$.setFilter = function(filter) {
		// 아이템 모두 제거
		$.clear();

		// Items 에서 조건에 맞는 아이템을 추가한다.
		if ($.emptyRow)
			$.addItem('', $.emptyRowText);		
		
		for (var i in $.items) {
			var item = $.items[i];
			if (item[0].indexOf(filter) == 0) {
				// 아이템 추가
				var o = document.createElement('option');
				o.setAttribute('value', item[0]);
				o.innerHTML = item[1];

				var e = document.getElementById($.id).childNodes[0];
				e.appendChild(o);
			}
		}
	}

	$.setFilterByColumn = function(column, filter) {
		// 아이템 모두 제거
		$.clear();

		if ($.emptyRow)
			$.addItem('', $.emptyRowText);
		
		for (var i in $.dataSource) {
			var item = $.dataSource[i];
			if (!item[column]) {
				console.log('FingerComboBox setFilterByColumn() : 해당 컬럼이 데이터 소스상에 없습니다.');
				return;
			}
			if (item[column].indexOf(filter) == 0) {
				// 아이템 추가
				var o = document.createElement('option');
				o.setAttribute('value', item[$.keyColumn]);
				o.innerHTML = item[$.displayColumn];

				var e = document.getElementById($.id).childNodes[0];
				e.appendChild(o);
			}
		}
	}
	
	$.setColumn = function(column1, column2) {
		$.keyColumn = column1;
		$.displayColumn = column2;
	}

	$.setData = function(data) {
		$.dataSource = data;
		
		if ($.emptyRow)
			$.addItem('', $.emptyRowText);
		
		for (var i = 0; i < data.length; i++) {
			$.addItem(data[i][$.keyColumn], data[i][$.displayColumn]);
		}
	}	
}

FingerComboBox.prototype.setProperty = function(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	var e = document.getElementById(this.id); //.childNodes[0];
	e.style.left = x + 'px';
	e.style.top = y + 'px';
	e.style.width = width + 'px';
	e.style.height = height + 'px';
	delete e;
}

FingerComboBox.prototype.setTabIndex = function(tabIndex) {
	var e = document.getElementById(this.id);
	e.childNodes[0].tabIndex = tabIndex;
	delete e;
}

FingerComboBox.prototype.getType = function() {
	return 'ComboBox';
}

FingerComboBox.prototype.setReadOnly = function(value) {
	this.setEnable(!value);
}

FingerComboBox.prototype.setEnable = function(value) {
	var e = document.getElementById(this.id).childNodes[0];
	e.disabled = !value;
	jQuery(this.ids).find('select').prop("disabled", !value);
	
	if (!value) {
		jQuery(this.ids).find('.select2-selection--single').css('backgroundColor', '#dfdfdf');
	} else {
		jQuery(this.ids).find('.select2-selection--single').css('backgroundColor', this.setBackColor);
	}
	
	delete e;
}

FingerComboBox.prototype.setVisible = function(visible) {
	var e = document.getElementById(this.id);//.childNodes[0];

	if (visible == true)
		e.style.visibility = 'visible';
	else
		e.style.visibility = 'hidden';

	delete e;
}

FingerComboBox.prototype.setBackgroundColor = function(color) {
	var e = document.getElementById(this.id).childNodes[0];

	e.style.backgroundColor = color;

	delete e;
}

FingerComboBox.prototype.setFontColor = function(color) {
	var e = document.getElementById(this.id).childNodes[0];

	e.style.color = color;

	delete e;
}

FingerComboBox.prototype.getAllowBlank = function() {
	return this.allowBlank;
}

FingerComboBox.prototype.setAllowBlank = function(blank, fieldName) {
	this.allowBlank = blank;
	this.setBackColor = blank ? '#ffffff' : '#ddf1f6';
	
    if (!blank) {
    	jQuery(this.ids).find('.select2-selection--single').css('backgroundColor', this.setBackColor);
    }
    if (fieldName) {
    	this.fieldName = fieldName;
    }
}

FingerComboBox.prototype.setFieldName = function(fieldName) {
	this.fieldName = fieldName;
}

FingerComboBox.prototype.getFieldName = function() {
	return this.fieldName;
}

FingerComboBox.prototype.setFocus = function() {
	var e = document.getElementById(this.id).childNodes[0];

	e.focus();

	delete e;
}

FingerComboBox.prototype.setDefaultValue = function(defaultValue) {
	this.defaultValue = defaultValue;
}