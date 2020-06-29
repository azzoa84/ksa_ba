function FingerMultiSelect(host, id, x, y, width, height) {
    var $ = this;
	$.id = host.id + '__' + id;
	$.ids = ('#' + $.id);
	$.chkItemSelector = $.ids + ".mult_combo>.overflow_list>ul>li>input";
	$.chkTotItemSelector = $.ids + ".mult_combo>.tot_checkbox>input";
    $.x = x;
    $.y = y;
    $.width = width;
    $.height = height < 100 ? 100 : height;
    $.enabled = true;
    $.title = "";
		
	$.chkAll = null;
	$.nodTitle = null;
	$.checkContainer = document.createElement("ul");
	$.items = [];
	
	$.checkChanged = function(index){
    	if(!$.enabled) return;
        if (g_container != null && host.id == 'fpView') {
            if (g_container.fingermultiselect_checkchange != undefined) {
                g_container.fingermultiselect_checkchange(getRealId($.id));
            }
        }
        else if (g_popupStack && g_popupStack.has()) {
        	g_popupStack.get().obj.fingermultiselect_checkchange(getRealId($.id), index);
        
        } else {
            if (g_currentModule != null) {
                if (g_currentModule.fingermultiselect_checkchange != undefined) {
                    g_currentModule.fingermultiselect_checkchange(getRealId($.id), index);
                }
            }
        }
	};
	
	$.itemChanged = function(){
        if (g_container != null && host.id == 'fpView') {
            if (g_container.fingermultiselect_itemchange != undefined) {
                g_container.fingermultiselect_itemchange(getRealId($.id));
            }
        }
        else if (g_popupStack && g_popupStack.has()) {
        	g_popupStack.get().obj.fingermultiselect_itemchange(getRealId($.id));
        
        } else {
            if (g_currentModule != null) {
                if (g_currentModule.fingermultiselect_itemchange != undefined) {
                    g_currentModule.fingermultiselect_itemchange(getRealId($.id));
                }
            }
        }
	};

	var testMode = false;

	var box = document.createElement("div");
	box.id = $.id;
	box.style.position = 'absolute';
	box.style.float = 'left';
	box.style.width = $.width + 'px';
	box.style.height = $.height + 'px';
	box.style.left = $.x + 'px';
	box.style.top = $.y + 'px';
	box.className = 'mult_combo';
	
	var topBox = box.appendChild(document.createElement("div"));
	topBox.className = "head tot_checkbox";
	
	($.chkAll = topBox.appendChild(document.createElement("input"))).type = "checkbox";
	$.chkAll.onchange = function(){
		$.setAllCheck($.chkAll.checked); 
	};

	($.nodTitle = topBox.appendChild(document.createElement("span"))).style.className = "title";
	$.nodTitle.innerText = $.title;
	
	var listArea = box.appendChild(document.createElement("div"));
	listArea.className = "overflow_list";
	listArea.style.height = ($.height - 25) + "px";
	listArea.appendChild($.checkContainer);
	
	if(testMode){
		this.setTitle("Product NAme");
		this.addItem("A", "alvvvvvvvvv");
		this.addItem("B", "blvvvvvvvvvvv");
		this.addItem("C", "clvvvvvvvvvv");
	}
	
    host.appendChild(box);
    delete box;
	delete topBox;
	delete listArea;
}

FingerMultiSelect.prototype.addItem = function(code, value){
	if(!(code instanceof Array) && !(value instanceof Array)){
		this.items.push({"stat": false, "code": code, "value": value});
	}else if((code instanceof Array) && (value instanceof Array) && code.length == value.length){
		for(var ii = 0; ii < code.length; ii++){
			this.items.push({"stat": false, "code": code[ii], "value": value[ii]});
		}
	}else{
		return;
	}
	
	this.renderItems();
	this.itemChanged();
};

FingerMultiSelect.prototype.clear = function(code, value){
	this.items = [];
	this.renderItems();
	this.itemChanged();
};

FingerMultiSelect.prototype.getSelectedCodeList = function(){
	var result = [];
	for(var ii = 0; ii < this.items.length; ii++){
		if(this.items[ii].stat) result.push(this.items[ii].code);
	}
	return result.join("|");
};

FingerMultiSelect.prototype.getSelectedCodeArray = function(){
	var result = [];
	for(var ii = 0; ii < this.items.length; ii++){
		if(this.items[ii].stat) result.push(this.items[ii].code);
	}
	return result;
};

FingerMultiSelect.prototype.getItemCount = function(){
	return this.items.length;
};

FingerMultiSelect.prototype.isAllSelected = function(){
	return (this.getItemCount() == this.getSelectedCount()) && this.items.length > 0;
};

FingerMultiSelect.prototype.getSelectedCount = function(){
	var cnt = 0;
	for(var ii = 0; ii < this.items.length; ii++){
		if(this.items[ii].stat) cnt++;
	}
	return cnt;
};



FingerMultiSelect.prototype.setTitle = function(title){
	this.nodTitle.innerText = title;
};

FingerMultiSelect.prototype.setText = function(title){
	this.nodTitle.innerText = title;
};

FingerMultiSelect.prototype.setAllCheck = function(val){
	for(var ii = 0; ii < this.items.length; ii++){
		this.items[ii].stat = val;
	}
	jQuery(this.chkItemSelector).prop("checked", val);
	jQuery(this.chkTotItemSelector).prop("checked", val);
	
	this.checkChanged(-1);
};

FingerMultiSelect.prototype.setData = function(table, codeCol, txtCol) {
	var ccn = -1;
	var tcn = -1;
	var findColNum = function(name){
		for(var ii = 0; ii < table.columns.length; ii++){
			if(table.columns[ii] == name)return ii;
		}
		return -1;
	};
	
	if(txtCol == undefined){
		tcn = 1;
	}else if(typeof(txtCol) == "number"){
		tcn = txtCol;
	}else if(typeof(txtCol) == "string"){
		tcn = findColNum(txtCol);
	}
	
	if(codeCol == undefined){
		ccn = 0;
	}else if(typeof(codeCol) == "number"){
		ccn = codeCol;
	}else if(typeof(codeCol) == "string"){
		ccn = findColNum(codeCol);
	}
	
	if(ccn < 0 || tcn < 0) return;
	var codes = [];
	var texts = [];
	for(var rr = 0; rr < table.R.length; rr++){
		codes.push(table.R[rr].I[ccn]);
		texts.push(table.R[rr].I[tcn]);
	}
	this.items = [];
	this.addItem(codes, texts);
};

FingerMultiSelect.prototype.setData1 = function(table, valCol, txtCol)
{
	var text;
	var value;

	if(txtCol == undefined)
	{
		text = 'code_name';
	}
	else
	{
		text = txtCol;
	}

	if(valCol == undefined)
	{
		value = 'sub_code';
	}
	else
	{
		value = valCol;
	}

	var codes = [];
	var texts = [];
	for(var i = 0; i < table.length; i++)
	{
		codes.push(table[i][text]);
		texts.push(table[i][value]);
	}
	this.items = [];
	this.addItem(texts, codes);
};

FingerMultiSelect.prototype.getCheckByCode = function(code) {
	for(var ii = 0; ii < this.items.length; ii++){
		if(this.items[ii].code == code) return this.items[ii].stat;
	}
	return false;
};

FingerMultiSelect.prototype.setCheckByCode = function(code, check) {
	for(var ii = 0; ii < this.items.length; ii++){
		if(this.items[ii].code == code){
			this.items[ii].stat = check;
			jQuery(this.chkItemSelector)[ii].checked = check;
			return true;
		}
	}
	return false;
};

FingerMultiSelect.prototype.renderItems = function(){
	var master_id = this.id;
	var _root = this;
	var createItem = function(stat, idx, caption){
		var ret = document.createElement("li");
		var itemId = master_id + "_subchk_" + idx;
		ret.className = "on";
		
		var chk = ret.appendChild(document.createElement("input"));
		
		chk.type = "checkbox";
		chk.checked = stat;
		chk.idx = idx;
		chk.id = itemId;
		chk.onchange = function(ev){
			_root.items[chk.idx].stat = chk.checked;
			_root.checkChanged(chk.idx);
			var allChk = true;
			var allUncheck = true;
			var list = jQuery(_root.chkItemSelector);
			for(var ii = 0; ii < list.length; ii++){
				allChk &= list[ii].checked;
				allUncheck &= !list[ii].checked;
			}
			if(allChk) _root.chkAll.checked = true;
			if(allUncheck) _root.chkAll.checked = false;
		};
		var lbl = ret.appendChild(document.createElement("label"));
		lbl.innerText = caption;
		lbl.htmlFor = itemId;
		delete chk;
		return ret;
	};

	var nodTmp = document.createElement("div");
	for(var ii = 0; ii < this.items.length; ii++){
		nodTmp.appendChild(createItem(this.items[ii].stat, ii, this.items[ii].value));
	}
	this.checkContainer.innerHTML = "";
	while(nodTmp.hasChildNodes()){
		var mn = nodTmp.firstChild;
		nodTmp.removeChild(mn);
		this.checkContainer.appendChild(mn);
	}
	delete nodTmp;
};

FingerMultiSelect.prototype.setProperty = function(x, y, width, height) {
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

FingerMultiSelect.prototype.getType = function() {
    return 'MultiSelect';
};

FingerMultiSelect.prototype.setEnable = function(value) {
    var e = document.getElementById(this.id);
    e.disabled = !value;
    $.enabled = value;
    delete e;
};

FingerMultiSelect.prototype.setReadOnly = function(value) {
	jQuery(this.ids).find('.overflow_list').find('input').prop('disabled', value);
	jQuery(this.ids).find('.tot_checkbox').find('input').prop('disabled', value);
		
    $.enabled = !value;
};

FingerMultiSelect.prototype.setVisible = function(visible) {
    var e = document.getElementById(this.id);

    if (visible == true)
        e.style.visibility = 'visible';
    else
        e.style.visibility = 'hidden';

    delete e;
};



FingerMultiSelect.prototype.setStyle = function(styleAttr, value, childIndex) {
    var e = document.getElementById(this.id);
    if (childIndex)
    {
        e.childNodes[childIndex].style[styleAttr] = value;
    }
    else
    {
        e.style[styleAttr] = value;
    }
    delete e;
};

