function FingerMultipleSelect(host, id, x, y, width, height)
{
	var $ = this;
	$.id = host.id + '__' + id;
	$.ids = ('#' + $.id);
	$.x = x;
	$.y = y;
	$.width = width;
	$.height = height;
	
	// multiselect library option
	$.selectAll = true;
	$.selectAllText = '전체';
	$.placeholder = "";
	$.multiple = false;
	
	$.items = [];
	$.keyColumn = 'sub_code';
	$.displayColumn = 'code_name';
	$.defaultValue = null;
	$.setBackColor = '#ffffff';
	$.dataSource = null;

	$.change = function() {
		var value = $.getValue();

		if (g_container != null && host.id == 'fpView') {
			if (g_container.fingermultipleselect_change != undefined) {
				g_container.fingermultipleselect_change(getRealId($.id), value);
			}
		}
		else if (g_popupStack && g_popupStack.has()) {
			g_popupStack.get().obj.fingermultipleselect_change(getRealId($.id), value);
			
		} else {
			if (g_currentModule != null) {
				if (g_currentModule.fingermultipleselect_change != undefined) {
					g_currentModule.fingermultipleselect_change(getRealId($.id), value);
				}
			}
		}
	}

	var e = document.createElement('div');
	e.id = $.id;
	e.style.position = 'absolute';
	e.style['float'] = 'left';
	e.style.width = $.width + 'px';
	e.style.height = $.height+ 'px';
	e.style.left = $.x + 'px';
	e.style.top = $.y + 'px';
	e.style.lineHeight = $.height + 'px';
	//e.style.zIndex = 11;
	e.className = 'FingerMultipleSelect';

	var select = document.createElement('select');
	select.id = ($.id + '_select');
	select.style.width = $.width  + 'px';
	select.style.height = $.height + 'px';
	e.appendChild(select);
	
	host.appendChild(e);
	
	$.extObj = jQuery(select);
	
	$.extObj.multipleSelect({
	    selectAllText: $.selectAllText,
	    onOpen: function() {
	        //console.log('Select opened!');
	    },
	    onClose: function() {
	        //console.log('Select closed!');
	    },
	    onCheckAll: function() {
	        //console.log('Check all clicked!');
	        
	        if (g_container != null && host.id == 'fpView') {
	            if (g_container.fingermultipleselect_checkAll != undefined) {
	                g_container.fingermultipleselect_checkAll(getRealId($.id), true);
	            }
	        }
	        else if (g_popupStack && g_popupStack.has()) {
	            g_popupStack.get().obj.fingermultipleselect_checkAll(getRealId($.id), true);
	            
	        } else {
	            if (g_currentModule != null) {
	                if (g_currentModule.fingermultipleselect_checkAll != undefined) {
	                    g_currentModule.fingermultipleselect_checkAll(getRealId($.id), true);
	                }
	            }
	        }
	    },
	    onUncheckAll: function() {
	        //console.log('Uncheck all clicked!');
	        
	        if (g_container != null && host.id == 'fpView') {
	            if (g_container.fingermultipleselect_checkAll != undefined) {
	                g_container.fingermultipleselect_checkAll(getRealId($.id), false);
	            }
	        }
	        else if (g_popupStack && g_popupStack.has()) {
	            g_popupStack.get().obj.fingermultipleselect_checkAll(getRealId($.id), false);
	            
	        } else {
	            if (g_currentModule != null) {
	                if (g_currentModule.fingermultipleselect_checkAll != undefined) {
	                    g_currentModule.fingermultipleselect_checkAll(getRealId($.id), false);
	                }
	            }
	        }
	    },
	    onFocus: function() {
	        //console.log('focus!');
	    },
	    onBlur: function() {
	        //console.log('blur!');
	    },
	    onClick: function(view) {
	        //console.log(view.label + '(' + view.value + ') ' + (view.checked ? 'checked' : 'unchecked'));
	        if (g_container != null && host.id == 'fpView') {
	            if (g_container.fingermultipleselect_click != undefined) {
	                g_container.fingermultipleselect_click(getRealId($.id), view.label, view.value, view.checked);
	            }
	        }
	        else if (g_popupStack && g_popupStack.has()) {
	            g_popupStack.get().obj.fingermultipleselect_click(getRealId($.id), view.label, view.value, view.checked);
	            
	        } else {
	            if (g_currentModule != null) {
	                if (g_currentModule.fingermultipleselect_click != undefined) {
	                    g_currentModule.fingermultipleselect_click(getRealId($.id), view.label, view.value, view.checked);
	                }
	            }
	        }
	    }
	});
	
	e = null;
}

FingerMultipleSelect.prototype.addItem = function(value, text) {
	this.extObj.append('<option value="' + value + '">' + text + '</option>').val('whatever');
}

FingerMultipleSelect.prototype.setData = function(data, keyCol, dispCol) {
	this.dataSource = data;
	
	this.clear();
	
	if(keyCol != undefined){
		this.keyColumn = keyCol;
	}
	
	if(dispCol != undefined){
		this.displayColumn = dispCol;
	}
	
	for (var i = 0; i < data.length; i++) {
		this.addItem(data[i][this.keyColumn], data[i][this.displayColumn]);
	}
	
	this.refresh();
}

FingerMultipleSelect.prototype.refresh = function() {
	this.extObj.multipleSelect("refresh");
}

FingerMultipleSelect.prototype.clear = function(){
	this.extObj.find('option').remove();
}

FingerMultipleSelect.prototype.setEnable = function(arr){
	if(!!enable){
		this.extObj.multipleSelect("enable");
	}else{
		this.extObj.multipleSelect("disable");
	}
}

FingerMultipleSelect.prototype.setSelect = function(arr){
	this.extObj.multipleSelect("setSelects", arr);
}

FingerMultipleSelect.prototype.getSelect = function(){
	return this.extObj.multipleSelect("getSelects");
}

FingerMultipleSelect.prototype.getSelectStr = function(delimiter){
	return this.getSelect().join(delimiter || '|');
}

FingerMultipleSelect.prototype.setColumn = function(column1, column2) {
	this.keyColumn = column1;
	this.displayColumn = column2;
}

