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
	$.columns = null;
	$.comboData = null;
	$.isVisible = true;
	$.filtMatchPattern = 'CONTAIN';

	$.change = function() {
		var value = $.getValue();
		//console.log('changeVal : ' + value);

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
	e.style.top = ($.y - 3) + 'px';
	e.style.lineHeight = $.height + 'px';
	e.style.zIndex = 11;
	e.className = 'FingerComboBox';

	host.appendChild(e);	
	e = null;
	
	var settings = {
		id: ($.id + '_select'),
		container: $.id,
		view: 'combo',
		options: {
			view: 'gridsuggest',
			body: {
				scroll: true,
				autoheight: false,
				autofocus: true,
				yCount: 12,
				resizeColumn: true
			},
			filter: function(item, value) {
				var text = this.config.template(item);
				
				if (!$.filtMatchPattern && (text.toString().toLowerCase().indexOf(value.toLowerCase()) !== -1)) {
					// 기본은 '포함'
					return true;
				}
				else if ($.filtMatchPattern === 'CONTAIN' && (text.toString().toLowerCase().indexOf(value.toLowerCase()) !== -1)) {
					// '포함'구분 일 때
					return true;
				}
				else if ($.filtMatchPattern === 'FRONT' && (text.toString().toLowerCase().indexOf(value.toLowerCase()) === 0)) {
					// '전방일치'구분 일 때
					return true;
				}
				return false;
			},
			$init: function() {
				var obj = this;
				if (!obj.body.columns) {
					obj.body.autoConfig = true;
				}
				obj.template = function(item, common) {
					return item[$.displayColumn];
				}
				/*
				this.attachEvent('onValueSuggest', function(){
					webix.delay(function(){
						webix.callEvent("onEditEnd",[]);
					});
				});
				*/
			}
		}
	}
	$.extObj = webix.ui(settings);
	$.extObj.attachEvent("onChange", $.change);
	
	$.addItem = function(value, text) {
		try {
			var grd = $.extObj.getList();
			var item = {};
			item[$.keyColumn] = value;
			item[$.displayColumn] = text;
			
			grd.add(item);
			
		} catch (err) {
			console.log('FingerComboBox addItem() : ' + err.message);
		}
	}

	$.setValue = function(value, column) {
		try {
			var grd = $.extObj.getList();
			var list = grd.serialize();
			
			if (!list || !list.length) {
				$.extObj.setValue(null);
				return;
			}
			
			if (!column) {
				column = $.keyColumn;
			}
			var isSetValue = false;
			for (var i = 0; i < list.length; i++) {
				if (list[i][column] == value) {
					$.extObj.setValue(list[i]['id']);
					isSetValue = true;
					break;
				}
			}
			if (!isSetValue) {
				$.extObj.setValue('');
			}
		} catch (err) {
			console.log('FingerComboBox setValue() : ' + err.message);
		}
	}
	
	$.setFirstValue = function() {
		try {
			var grd = $.extObj.getList();
			var list = grd.serialize();
			
			if (!list || !list.length) 
				return;
			
			$.extObj.setValue(list[0]['id']);
			
		} catch (err) {
			console.log('FingerComboBox setFirstValue() : ' + err.message);
		}	
	}

	$.getValue = function(column) {
		try {
			var id = $.extObj.getValue();
			var grd = $.extObj.getList();
			
			if (!id) {
				return '';
			}
			if (!column) {
				column = $.keyColumn;
			}
			return grd.getText(id, column) || '';
			
		} catch (err) {
			console.log('FingerComboBox getValue() ' + $.id + ' : ' + err.message);
		}
	}

	$.getText = function() {
		try {
			var id = $.extObj.getValue();
			var grd = $.extObj.getList();
			
			return grd.getText(id, $.displayColumn);
			
		} catch (err) {
			console.log('FingerComboBox getText() : ' + err.message);
		}
	}

	$.clear = function() {
		try {
			$.setValue('');
			
			var grd = $.extObj.getList();
			grd.clearAll();
			
		} catch (err) {
			console.log('FingerComboBox clear() : ' + err.message);
		}
	}

	$.setEmptyRow = function(isEmpty, emptyRowText) {
		$.emptyRow = isEmpty;
		$.emptyRowText = (emptyRowText == undefined ? '' : emptyRowText);
	}

	$.getEmptyRow = function() {
		return $.emptyRow;
	}

	$.setFilter = function(value, column) {
		try {
			var grd = $.extObj.getList();
			var list = grd.serialize();
			if (!column) {
				column = $.keyColumn;
			}
			grd.clearAll();

			var result = list.filter(function(obj) {
				return obj[column].toString().indexOf(value) != -1;
			});
			grd.parse(result);

		} catch (err) {
			console.log('FingerComboBox setFilter() : ' + err.message);
		}
	}
	
	$.setFilterByArray = function(array, column) {
		try {
			var grd = $.extObj.getList();
			var list = grd.serialize();
			if (!column) {
				column = $.keyColumn;
			}
			grd.clearAll();

			var result = list.filter(function(obj) {
				var eqVal = obj[column].toString();
				return (array.indexOf(eqVal) != -1);
			});
			grd.parse(result);

		} catch (err) {
			console.log('FingerComboBox setFilterByArray() : ' + err.message);
		}
	}
	
	$.setConfigFilterOption = function(type) {
		$.filtMatchPattern = type;
	};
	
	$.setColumn = function(column1, column2) {
		$.keyColumn = column1;
		$.displayColumn = column2;
	};

	/**
	 * [
	 *   { id:"sub_code", width:0 },
	 *   { id:"code_name", width:400 }
	 * ]
	 */
	$.setColumnConfig = function(columns) {
		if (typeof columns === 'string') {
			switch (columns) {
			case 'DEPT':
				columns = [{id:'dept_code'}, {id:'dept_name', width:300}];
				break;
			case 'EMP':
				columns = [{id:'employee_id'}, {id:'emp_name', width:150}];
				break;
				
			default:
				console.log('FingerComboBox setColumnConfig() : 유효하지 않은 컬럼 지정입니다.');
				columns = null;
				break;
			}
		}
		if (columns) {
			$.columns = columns;
		}
	};

	$.setData = function(data) {
		if (!data || data.length == 0)
			return;
		
		var list = [];
		for (var i = 0; i < data.length; i++) {
			var obj = data[i];
			obj[$.displayColumn] = String(obj[$.displayColumn]);
			list.push(obj);
		}
		
		var keys = Object.keys(list[0]);
		if ($.emptyRow) {
			var empty = {};
			for (var i = 0; i < keys.length; i++) {
				empty[keys[i]] = '';
				if (keys[i] == $.displayColumn) {
					empty[keys[i]] = $.emptyRowText;
				}
			}
			list.unshift(empty);
		}
		
		$.comboData = list;
		var grd = $.extObj.getList();
		grd.config.textValue = $.displayColumn;
		
		if ($.columns) {
			grd.config.columns = $.columns;
		} else {
			var columns = [];
			for (var i = 0; i < keys.length; i++) {
				var col = { id: keys[i] };
				if (col.id == $.displayColumn) {
					col.width = ($.width + 100);
				}
				columns.push(col);
			}
			grd.config.columns = columns;
		}
		$.clear();
		grd.parse(list);
		
		$.setFirstValue();
	};
	
	$.getSelectedRowId = function() {
		return $.extObj.getValue();
	};
	
	$.setSelectedItemAddCss = function(idList, cssName) {
		for (var i = 0; i < $.comboData.length; i++) {
			for (var j = 0; j < idList.length; j++) {
				if ($.comboData[i].id == idList[j]) {
					$.comboData[i].$css = cssName || '';
				}
			}
		}
				
		var grd = $.extObj.getList();
		grd.clearAll();
		grd.parse($.comboData);
	}
	
	$.setValueByColumn = function(id, column, value) {
		for (var i = 0; i < $.comboData.length; i++) {
			if ($.comboData[i].id == id) {
				$.comboData[i][column] = value;
			}
		}
				
		var grd = $.extObj.getList();
		grd.clearAll();
		grd.parse($.comboData);
	}
	
	$.getComboList = function() {
		return $.extObj.getList();
	}
}

FingerComboBox.prototype.setProperty = function(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	var e = document.getElementById(this.id); //.childNodes[0];
	e.style.left = x + 'px';
	e.style.top = (y - 3) + 'px';
	e.style.width = width + 'px';
	e.style.height = height + 'px';
	delete e;
}

FingerComboBox.prototype.setTabIndex = function(tabIndex) {
	var e = document.getElementById(this.id);
	e.childNodes.tabIndex = tabIndex;	
	delete e;
}

FingerComboBox.prototype.getType = function() {
	return 'ComboBox';
}

FingerComboBox.prototype.setReadOnly = function(value) {
	this.setEnable(!value);
}

FingerComboBox.prototype.setEnable = function(value) {
	if (value) {
		this.extObj.enable();
	} else {
		this.extObj.disable();
	}
}

FingerComboBox.prototype.setVisible = function(visible) {
	this.isVisible = visible;
	var e = document.getElementById(this.id);
	
	if (visible) {
		this.extObj.show();
		e.style.visibility = 'visible';
	} else {
		this.extObj.hide();
		e.style.visibility = 'hidden';
	}
	
	delete e;
}

FingerComboBox.prototype.getVisible = function() {
	return this.isVisible;
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
    	jQuery(this.ids).find('input').css('backgroundColor', this.setBackColor);
    } else {
    	jQuery(this.ids).find('input').css('backgroundColor', '#fff');
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
	this.extObj.focus();
}

FingerComboBox.prototype.setDefaultValue = function(defaultValue) {
	this.defaultValue = defaultValue;
}