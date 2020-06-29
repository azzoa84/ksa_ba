function get_http_object() {
	if (window.ActiveXObject)
		return new ActiveXObject("Microsoft.XMLHTTP");
	else if (window.XMLHttpRequest)
		return new XMLHttpRequest();
	else
		return null;
}

function call_ajax(url, type, target) {
	var http = get_http_object();
	if (http != null) {
		if (url.indexOf("?") > -1)
			url += "&dummy=" + create_dummy();
		else
			url += "?dummy=" + create_dummy();
		http.open("POST", url, true);
		http.send(null);
		http.onreadystatechange = function() {
			if (http.readyState == 4) {
				responseText = http.responseText;
				target.callback(type, responseText);
			}
		};
	}
}

function call_sync_ajax(callUrl, param, method) {
    var _method = method || 'POST';

    var retData = null;

    $.ajaxSetup({ async: false });
    $.ajax({
        type : _method,
        url : callUrl,
        data : param,

        success: function(data) {
        	retData = data;
        },

        error: function(xhr, exception) {
        	console.log('status :' + xhr.status);
        	console.log('statusText :' + xhr.statusText);
        }
    });
    $.ajaxSetup({ async: true });

    return retData;
};

function urlencode(str) {
	return escape(str).replace(/\+/g, '%2B').replace(/%20/g, '+').replace(/\*/g, '%2A').replace(/\//g, '%2F').replace(/@/g, '%40');
}

function createPacket(dataArray, delimiter) {
	var packet = '';
	var sep = delimiter || '||';
	
	if (dataArray[0] == "req") {
		var JObject = {};
		try {
			eval("JObject = " + dataArray[1]);
		} catch(ex) {
			console.log('createPacket() : ' + ex.message);
		}
		
		if (JObject.hasOwnProperty("T")) {
			packet += "sp=" + encodeURIComponent(JObject.T[0].name) + "&";
			for (var rc = 0; rc < JObject.T[0].R.length; rc++) {
				for (var ic = 0; ic < JObject.T[0].R[rc].I.length; ic++) {
					if (Array.isArray(JObject.T[0].R[rc].I[ic])) {
						var prm = JObject.T[0].R[rc].I[ic].join(sep);
					} else {
						var prm = JObject.T[0].R[rc].I[ic];
					}
					packet += ("p" + ((ic + 1)) + "=" + encodeURIComponent(prm) + "&");
				}
			}
		} else {
			for (var key in JObject) {
				if (JObject.hasOwnProperty(key)) {
					packet += (key + "=");
					packet += eval("JObject." + key);
					packet += "&";
				}
			}
		}
	}
	else {
		for (var i = 0; i < dataArray.length; ++i) {
			if (i != 0) packet += '&';
			
			if (dataArray[i] == "req") {
				
			} else {
				packet += dataArray[i++] + '=';
				packet += encodeURIComponent(dataArray[i]);
			}	
		}
	}
	return packet;
}

function convertJSON(objSrc) {
	var obj = {"T":[]};
	
	try{
		if((typeof objSrc) == "string") objSrc = JSON.parse(objSrc);
		else if(Array.isArray(objSrc))objSrc = objSrc[0];
	}catch(ex){
		return obj;
	}
	
	var convertTable = function(src){
		var tbl = {	name: null,
					result: [objSrc.errorCode, src.length + "", "", "", objSrc.returnStr, "", ""],
					columns: [],
					R:[]
				};
		if (Array.isArray(src) && src.length > 0) {
			var row = src[0];
			
			for (var item in row) {
				if(row.hasOwnProperty(item)) tbl.columns.push(item);
			}
			
			for(var i = 0; i < src.length; i++){
				var rowItem = {I:[]};
				for(var j = 0; j < tbl.columns.length; j++){
					eval("rowItem.I.push(src[i]." + tbl.columns[j] + ")");
				}
				tbl.R.push(rowItem);
			}
			
			for (var i = 0; i < tbl.columns.length; i++) {
				tbl.columns[i] = tbl.columns[i];
			}
		}
		return tbl;
	};
	
	try{
		if(objSrc.resultList.length != undefined && objSrc.resultList[0].length != undefined){
			for(var i = 0; i < objSrc.resultList.length; i++){
				obj.T.push(convertTable(objSrc.resultList[i]));
			}
		}else{
			obj.T.push(convertTable(objSrc.resultList));
		}

		obj.get = function(tableIndex, rowIndex, columnName) {
			try {
				switch (arguments.length) {
				case 1:
					return this.T[tableIndex];
					break;

				case 2:
					var table = this.T[tableIndex];
					return table.R[rowIndex]
					break;

				case 3:
					var table = this.T[tableIndex];
					if (typeof (columnName) == 'string') {
						var columnIndex = table.columns.indexOf(columnName);
						return table.R[rowIndex].I[columnIndex];
					}
					else if (typeof (columnName) == 'number') {
						return table.R[rowIndex].I[columnName];
					}
				};
			} catch (err) {
				console.log('fingerAjax ds.get() : ' + err.message);
			}
		};
	}catch(ex){
		
	}
	return obj;
	//"R":[]}]
}

function callPost2(url, dataArray, type, target) {
	var packet = createPacket(dataArray);
	
	jQuery.post(url, packet, function(response) {
		var ds = null;
		try {
			if (type != 'addTab' &&
				type != 'addTab2' &&
				type != 'Home' &&
				type != 'openPopup' &&
				type != 'openPopup2' &&
				type != 'sendmail' &&
				type != 'myMenu') { 
				ds = toDataSet(convertJSON(response));
			}
		} finally {
			target.callback(type, ds, convertJSON(response));
		}
	});
}

function deCamelString(src){
	var arr = [];
	
	for(var i = 0; i < src.length; i++){
		if(65 <= src.charCodeAt(i) && src.charCodeAt(i) <= 90){
			arr.push("_", src[i]);
		}else{
			arr.push(src[i]);
		}
	}

	return arr.join("").toLowerCase();
}

function callQuery(dataArray, type, target, isConvert) {   
	var packet = createPacket(dataArray);
	drawToast('#LOADING#');
	
	var _method = 'POST';

	jQuery.ajax({
		accepts: {
			json: 'application/json; charset=UTF-8'
		},			
		type : _method,
		url : g_AjaxPath,
		data : packet,
		dataType : "json",

		success: function(data) {
			var ds = null;
			try {
				if (isConvert) {
					ds = toDataSet(convertJSON(data));
				} else {
					ds = toDataSet2(data);
				}
				
			} finally {
				target.callback(type, ds, data);
				hideToast();
			}
		},
		
		error: function(xhr, exception) {
			hideToast();
			console.log('status :' + xhr.status);
			console.log('statusText :' + xhr.statusText);
			
			if (xhr.status == 401) {
				alert("세션이 만료되었습니다.\n 다시 로그인 해주시기 바랍니다.");
				var link = '${pageContext.request.contextPath}/login.jsp';
				window.open(link, '_self');
			}
		}
	});
}

function callQueryLoading(dataArray, type, target, isConvert) {   
	var packet = createPacket(dataArray);
	
	var _method = 'POST';

	jQuery.ajax({
		accepts: {
			json: 'application/json; charset=UTF-8'
		},			
		type : _method,
		url : g_AjaxPath,
		data : packet,
		dataType : "json",

		success: function(data) {
			var ds = null;
			try {
				if (isConvert) {
					ds = toDataSet(convertJSON(data));
				} else {
					ds = toDataSet2(data);
				}
				
			} finally {
				target.callback(type, ds, data);
			}
		},
		
		error: function(xhr, exception) {
			console.log('status :' + xhr.status);
			console.log('statusText :' + xhr.statusText);
			
			if (xhr.status == 401) {
				alert("세션이 만료되었습니다.\n 다시 로그인 해주시기 바랍니다.");
				var link = '${pageContext.request.contextPath}/login.jsp';
				window.open(link, '_self');
			}
		}
	});
}

function callQueryObject(param, type, target, isConvert, ajaxPath) {   
	drawToast('#LOADING#');
	
	var _method = 'POST';
	jQuery.ajax({
		accepts: {
			json: 'application/json; charset=UTF-8'
		},			
		type : _method,
		url : (ajaxPath == undefined ? g_AjaxPath : ajaxPath),
		data : param,
		dataType : "json",

		success: function(data) {
			var ds = null;
			try {
				if (isConvert) {
					ds = toDataSet(convertJSON(data));
				} else {
					ds = toDataSet2(data);
				}			
				
			} finally {
				target.callback(type, ds, data);
				hideToast();
			}
		},
		
		error: function(xhr, exception) {
			console.log('status :' + xhr.status);
			console.log('statusText :' + xhr.statusText);
			
			if (xhr.status == 401) {
				alert("세션이 만료되었습니다.\n 다시 로그인 해주시기 바랍니다.");
				var link = '${pageContext.request.contextPath}/login.jsp';
				window.open(link, '_self');
			}
		}
	});
}

function callReport(dataArray, fileName, reportView) {   
	var packet = createPacket(dataArray);

	reportView.setReport(fileName, packet);
}

function callQuerySync(dataArray, type, isConvert) {
	var packet = createPacket(dataArray);
	
	var _method = 'POST';
	var result = null;

	jQuery.ajaxSetup({ async: false });
	jQuery.ajax({
		accepts: {
			json: 'application/json; charset=UTF-8'
		},			
		type : _method,
		url : g_AjaxPath,
		data : packet,
		dataType : "json",

		success: function(data) {
			if (isConvert) {
				result = toDataSet(convertJSON(data));
			} else {
				result = toDataSet2(data);
			}
		},
		
		error: function(xhr, exception) {
			console.log('status :' + xhr.status);
			console.log('statusText :' + xhr.statusText);
			
			if (xhr.status == 401) {
				alert("세션이 만료되었습니다.\n 다시 로그인 해주시기 바랍니다.");
				var link = '${pageContext.request.contextPath}/login.jsp';
				window.open(link, '_self');
			}
		}
	});
	jQuery.ajaxSetup({ async: true });
	
	var ds = null;
	try {
		ds = result;
	} finally {

	}
	
	return ds;
}

function callExecute(dataArray, type, target, showToast, isConvert) {
	var packet = createPacket(dataArray);
	var _method = 'POST';
	
	drawToast('#SAVING#');
	
	jQuery.ajax({
		accepts: {
			json: 'application/json; charset=UTF-8'
		},			
		type : _method,
		url : g_AjaxPath,
		data : packet,
		dataType : "json",

		success: function(data) {
			var ds = null;
			try {
				if (isConvert) {
					ds = toDataSet(convertJSON(data));
				} else {
					ds = toDataSet2(data);
				}
			} finally {
				hideToast();
			}

			if (showToast == undefined || showToast == true) {
				if (ds && ds.errorMsg) {
					drawToast(ds.errorMsg);
				}
			}

			target.callback(type, ds, data);
		},
		
		error: function(xhr, exception) {
			hideToast();
			console.log('status :' + xhr.status);
			console.log('statusText :' + xhr.statusText);
			
			if (xhr.status == 401) {
				alert("세션이 만료되었습니다.\n 다시 로그인 해주시기 바랍니다.");
				var link = '${pageContext.request.contextPath}/login.jsp';
				window.open(link, '_self');
			}
		}
	});
}

function callExecuteSync(dataArray, type, showToast, isConvert) {
	var packet = createPacket(dataArray);
	var _method = 'POST';
	var result = null;

	jQuery.ajaxSetup({ async: false });
	jQuery.ajax({
		accepts: {
			json: 'application/json; charset=UTF-8'
		},			
		type : _method,
		url : g_AjaxPath,
		data : packet,
		dataType : "json",
		
		success: function(data) {
			try {
				if (isConvert) {
					result = toDataSet(convertJSON(data));
				} else {
					result = toDataSet2(data);
				}				
			} finally {
			}
		},
		
		error: function(xhr, exception) {
			hideToast();
			console.log('status :' + xhr.status);
			console.log('statusText :' + xhr.statusText);
			
			if (xhr.status == 401) {
				alert("세션이 만료되었습니다.\n 다시 로그인 해주시기 바랍니다.");
				var link = '${pageContext.request.contextPath}/login.jsp';
				window.open(link, '_self');
			}
		}
	});
	jQuery.ajaxSetup({ async: true });
	
	var ds = null;
	try {
		ds = result;
	} finally {

	}

	if (showToast == undefined || showToast == true) {
		if (ds && ds.errorMsg) {
			drawToast(ds.errorMsg);
		}
	}
	
	return ds;
}

function callInterface(dataArray, type, target, showToast) {
	var packet = createPacket(dataArray);
	
	drawToast('#LOADING#');
	jQuery.post(g_AjaxPath, packet, function(response) {
		var ds = null;
		try {
			ds = toDataSet(convertJSON(response));
		} finally {
			hideToast();
		}

		if (showToast == undefined || showToast == true) {
			if (ds && ds.errorMsg) {
				drawToast(ds.errorMsg);
			}
		}

		target.callback(type, ds, response);
	});
}

function callInterfaceSync(dataArray, type, showToast) {
	var packet = createPacket(dataArray);

	jQuery.ajaxSetup({ async: false });
	var posting = jQuery.post(g_AjaxPath, packet);
	var result = null;
	posting.done(
		function(response) {
			result = response;
		}
	);

	jQuery.ajaxSetup({ async: true });

	var ds = null;
	try {
		ds = toDataSet(result);
	} finally {

	}

	if (showToast == undefined || showToast == true) {
		if (ds && ds.errorMsg) {
			drawToast(ds.errorMsg);
		}
	}

	return ds;
}

function callPost(url, data, type, target) {
	jQuery.get(url, data, function(response) {
		var ds = JSON.parse(response);
		target.callback(type, ds, response);
	});

}

function create_dummy() {
	var dummy = Math.random();
	dummy = dummy.toString().substr(2);
	return dummy;
}

function createXMLDocument(text) {
	var xmlDoc = null;
	if (window.DOMParser) {
		parser = new DOMParser();
		xmlDoc = parser.parseFromString(text.split("<!DOCTYPE")[0], "text/xml");
	}
	else // Internet Explorer
	{
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = "false";
		xmlDoc.loadXML(text);
	}

	return xmlDoc;
}

// json 정의
function IndentSheet() {
	this.indentList = [];
}

function Indent() {
	this.cmd = '';
	this.details = [];
}

function IndentDetail() {
	this.v = [];
}

function createIndent(indent, values) {
	var id = new IndentDetail();
	id.v = values;
	indent.details.push(id);
	return indent;
}

function appendIndent(indentSheet, indent) {
	indentSheet.indentList.push(indent);
	return indentSheet;
}

// json (DataSet 정의)
function DataSet() {
	this.T = [];
	this.table = function(tableName) {
		// columns 에서 인덱스 구하기
		for (var i in this.T) {
			if (this.T.name == tableName) {
				return this.T[i];
			}
		}
	}
}

function DataTable() {
	this.name = '';
	this.result = [];
	this.columns = [];
	this.R = [];
}

function DataRow() {
	this.I = [];
}

function toDataSet(response) {
	var ds = null;
	if(response.T) ds = response;
	else ds = JSON.parse(response);
	
	ds.get = function(tableIndex, rowIndex, columnName) {
		switch (arguments.length) {
			case 1:
				return this.T[tableIndex];
				break;

			case 2:
				var table = this.T[tableIndex];
				return (table && table.R) ? table.R[rowIndex] : null;
				break;

			case 3:
				var table = this.T[tableIndex];
				if (typeof (columnName) == 'string') {
					var columnIndex = table.columns.indexOf(columnName);
					return (table && table.R && table.R.length && table.R[rowIndex]) ? table.R[rowIndex].I[columnIndex] : '';
				}
				else if (typeof (columnName) == 'number') {
					return (table && table.R && table.R.length && table.R[rowIndex]) ? table.R[rowIndex].I[columnName] : '';
				}
		}
	}
	return ds;
}

function toDataSet2(ds) {
	if (ds && Array.isArray(ds) && ds.length) {
		var lastDs = ds[(ds.length - 1)];
		var arrayDs = {};
		arrayDs.errorCode = lastDs.errorCode;
		arrayDs.returnStr = lastDs.returnStr;
		arrayDs.errorMsg = lastDs.errorMsg;
		arrayDs.resultList = ds;
		return arrayDs;
	}
	
	if (!ds || !ds.resultList || !ds.resultList.length) {
		return ds;
	}
	ds.get = function(tableIndex, rowIndex, columnName) {
		switch (arguments.length) {
			case 1:
				return this.resultList[tableIndex];
				break;

			case 2:
				var table = this.resultList[tableIndex];
				return (table && table.length) ? table[rowIndex] : null;
				break;

			case 3:
				var table = this.resultList[tableIndex];
				return (table && table.length && table[rowIndex]) ? table[rowIndex][columnName] : '';
				break;
		}
	}
	return ds;
}

function createExecuteParamInfo(procedureName, args) {
	var ds = new DataSet();
	var table1 = new DataTable();
	table1.name = procedureName;

	if (Array.isArray(args[0]))
	{
		for (var i = 0; i < args.length; i++)
		{
			var row1 = new DataRow();
			row1.I = args[i];

			table1.R.push(row1);
		}
	}
	else
	{
		var row1 = new DataRow();
		row1.I = args;

		table1.R.push(row1);
	}

	ds.T.push(table1);

	return JSON.stringify(ds);
}

function createExecuteParamInfo2(procedureName, args) {
	var ds = new DataSet();

	for(var i=0; i<args.length; i++) {
		var table1 = new DataTable();
		table1.name = procedureName;

		for (var j = 0; j < args[i].length; j++) {
			var row1 = new DataRow();
			row1.I = args[i][j];

			table1.R.push(row1);
		}

		ds.T.push(table1);
	}

	return JSON.stringify(ds);
}

function setStoreData(store, ds) {		   
	var data = new Array();
	var item = new Array();

	if (ds.T.length > 0) {
		for (var i in ds.T[0].R) {
			item = ds.T[0].R[i].I;
			data.push(item);
		}
		store.loadData(data);
	}
}

function setDataGrid(grid, ds, isResultList) {
	try {
		if (!ds)
			return false;
		
		if (isResultList != true)
		{
			if (ds.errorCode.indexOf('E') > -1 ||
				ds.errorCode.indexOf('P') > -1) {
				return false;
			}
			
			if (!ds || !ds.resultList || !ds.resultList.length) {
				return false;
			}
			
			for (var i = 0; i < ds.resultList.length; i++) {
				if (grid[i] != null) {
					grid[i].setData(ds.resultList[i]);
				}
			}
		}
		else
		{
			for (var i = 0; i < grid.length; i++) {
				grid[i].setData(ds);
			}
		}
	} catch (err) {
		console.log('fingerAjax setDataGrid() : ' + err.message);
	}
}

function setDataControl(controls, ds) {
	if (ds.T.length > 0) {
		for (var i in controls) {
			if (controls[i] != null) {
				controls[i].setValue(ds.T[0].R[0].I[i]);
			}
		}
	}
}

function setDataControlFromGrid(controls, grid, rowIndex) {
	if (controls.length > 0) {
		for (var i = 0; i < controls.length; i++) {
			if(controls[i] != null)
				controls[i].setValue(grid.getValue(rowIndex, i));
		}
	}
}

function setComboBind(combos, ds, isResultList) {
	if (isResultList === false) {
		for (var i = 0; i < combos.length; i++) {
			combos[i].setData(ds);
		}
	} else {
		if (ds.resultList && ds.resultList.length) {
			for (var i = 0; i < combos.length; i++) {
				if (combos[i] != null) {
					if (Array.isArray(combos[i])) {
						for (var j = 0; j < combos[i].length; j++) {
							combos[i][j].setData(ds.resultList[i]);
						}
					} else {
						combos[i].setData(ds.resultList[i]);
					}
				}
			}
		}		
	}
}

function setGridComboBind(combos, ds) {
	if (ds.T.length > 0) {
		for (var i = 0; i < combos.length; i++) {
			if (combos[i] != null) {

				for (var j = 0; j < ds.T[i].R.length; j++) {
					combos[i].put(ds.T[i].R[j].I[0], ds.T[i].R[j].I[1]);
				}
			}
		}
	}
}

function initControls(control) {
	for (var i in control.e.childNode) {
		alert(control.e.childNode[i].className);
	}
}

function chkResult(ds, isMsg) {	
	if (ds.T[0].result[0][0] == 'E' ||
		ds.T[0].result[0][0] == 'P') {
		if (isMsg == true) {
			alert(ds.T[0].result[4]);
		}
		return false;
	}

	return true;
}

function showIndicator() {	
  //  if (isShowing == false) {
  //	  loading.show();
  //	  isShowing = true;
	//  }
}

function hideIndicator() {
	//loading.hide();
	//isShowing = false;
}

function ServiceMessage() {
	this.obj = new Object();

	this.setMessage = function(ds) {
		if (ds.T.length > 0) {
			for (var i = 0; i < ds.T[0].R.length; i++) {
				this.obj[ds.T[0].R[i].I[0]] = ds.T[0].R[i].I[1];
			}
		}		
	};

	this.getMessage = function(key) {

		if (this.obj[key] == null)
			return '정의된 메시지가 아닙니다.';
			
		return this.obj[key];
	};
}

function createRequestXML(obj) {
	var ret = document.createElement("request");
	if(!Array.isArray(obj)) obj = [obj];
	for(var ii = 0; ii < obj.length; ii++){
		var prm = document.createElement("params");
		for(var att in obj[ii]){
			if(obj[ii].hasOwnProperty(att)){
				prm.setAttribute(att, obj[ii][att]);
			}
		}
		ret.appendChild(prm);
	}
	return ret.outerHTML;
}

function exportSafeNotice(params, fileName)
{
	jQuery.ajax({
		accepts	: 'application/json; charset=UTF-8',			
		type 	: 'POST',
		url		: g_ContextPath + "/excel/exportSafe.do",
		data 	: { 'jsonData': JSON.stringify(params), 'fileName' : fileName },

		success: function(data)
		{	
			window.open(g_ContextPath + "/excel/exportSafeDownload.do?fileName="+fileName, '_blank');
		},
		
		error: function(xhr, exception) 
		{
			console.log('status :' + xhr.status);
			console.log('statusText :' + xhr.statusText);
		}
	});
}

function windowOpen(url, params, target)
{
	var temp = document.createElement("form");
	temp.action = g_ContextPath + url;
	temp.method = "POST";
	temp.target = target || "TheWindow";
	temp.style.display = "none";

	for(var x in params)
	{
		var opt = document.createElement("textarea");
		opt.name = x;
		opt.value = params[x];
		temp.appendChild(opt);
	}
	document.body.appendChild(temp);
	window.open('', target || "TheWindow");
	temp.submit();
	return temp;
}

function getGeoCodeKakao(address) {
	var regAddr = function(addr) {
		String.prototype.regexIndexOf = function(regex, startpos) {
			var indexOf = this.substring(startpos || 0).search(regex);
			return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
		};
		
		var rev = function(src){ return src.split("").reverse().join(""); };
		var t = new RegExp("[^0^1^2^3^4^5^6^7^8^9^-^ ]");

		addr = rev(addr.substring(0, (addr + "(").indexOf('(')).trim());
		
		while(addr.indexOf(" ") > 0 && addr.regexIndexOf(t, 1) < addr.indexOf(" ") && addr.regexIndexOf(t, 1) >= 0){
			addr = addr.substring(addr.indexOf(" "));
		}
		
		return rev(addr);
	};
	
	var result = jQuery.ajax({
		type: "POST",
		async: false,
		url: g_ContextPath + "/GeoCodingKakao.do",
		data: 'apiKey=' + g_kakaoMapKey + '&address=' + address//regAddr(address)
	}).responseText;

	try {
		return JSON.parse(result);
	} catch(ex) {
		console.log(ex);
		console.log('address text:' + address);//regAddr(address));
		return [0,0];
	}
}

function excelDownload(dataArray, fileName)
{
	var packet = createPacket(dataArray);
	var xlURL = g_XLPath + '?' + packet + 'file_name=' + encodeURIComponent(fileName);
	if(pageout != null && pageout != undefined) pageout = true;

	window.open(xlURL.replace("/sso/", "/"), "Download");

	if(pageout != null && pageout != undefined) pageout = false;
}