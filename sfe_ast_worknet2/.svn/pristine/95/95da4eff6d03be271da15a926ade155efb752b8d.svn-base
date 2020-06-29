function FingerReportView(host, id, x, y, width, height) {
	var $ = this;
	$.report = null;
	$.viewer = null;	
	
	if (host) {
		$.id = host.id + '__' + id;
		$.x = x;
		$.y = y;
		$.width = width;
		$.height = height;

		var e = document.createElement('div');
		e.id = $.id;
		e.style.position = 'absolute';
		e.style.float = 'left';
		e.style.width = $.width + 'px';
		e.style.height = $.height + 'px';
		e.style.left = $.x + 'px';
		e.style.top = $.y + 'px';
		e.className = 'FingerReportView';

		host.appendChild(e);
		e = null;		
	} else {		
		// 뷰어를 생성하지 않음
	}
	
	$.init = function(obj) {
		try {
			/*
			var options = new Stimulsoft.Viewer.StiViewerOptions();
			//options.toolbar.fontColor = 'red';
			options.toolbar.showSendEmailButton
			options.exports.showExportToPdf = false;
			options.exports.showExportToExcel = true;
			*/
			var options = null;
			$.viewer = new Stimulsoft.Viewer.StiViewer(options, "StiViewer", false);
			$.viewer.onPrintReport = function (event) {
				console.log("onPrintReport");
				console.log(event);
			};
			$.viewer.onBeginProcessData = function (event) {
				console.log("onBeginProcessData");
				console.log(event);
			};
			$.viewer.onEndProcessData = function (event) {
				console.log("onEndProcessData");
				console.log(event);
			};
			
			if (obj) {
				
			}			
			/*
			var settings = new Stimulsoft.Report.Export.StiHtmlExportSettings();
			var service = new Stimulsoft.Report.Export.StiHtmlExportService();
			service.useUnicode = true;
			service.embeddedFonts = true;
			service.standardPdfFonts = true;
			
			console.log(settings);
			console.log(service);
			*/
		} catch (err) {
			console.log('FingerReportView init() : ' + err.message);
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
			console.log('FingerReportView callPrint() : ' + err.message);
		}
	};
	
	$.open = function(params) {
		try {
			if (!params || !params.report) {
				console.log('FingerReportView open() : 파라메터 전달이 잘못 되었습니다.');
				return;
			}
			log(g_ncid);
			var r_path = ('./reports/' + params.report + '.mrt?v=' + g_ncid);
			var is_viewer = (params.viewer === undefined ? true : params.viewer);
				
			//console.log(r_path);
			$.report = new Stimulsoft.Report.StiReport();
			$.report.loadFile(r_path);
			
			if (params.data) {
				var dataSet = new Stimulsoft.System.Data.DataSet("DataBase");
				
				dataSet.readJson(params.data);
				$.report.regData(dataSet.dataSetName, "", dataSet);
			}
			
			$.report.render();
			
			var jsonString = $.report.saveToJsonString();
			//console.log(jsonString);
			//console.log("=====================================");
			var jsonDoc = $.report.saveDocumentToJsonString();
			//console.log(jsonDoc);
			
			if (is_viewer) {
				$.viewer.report = $.report;
				$.viewer.renderHtml($.id);				
			}
			
		} catch (err) {
			console.log('FingerReportView open() : ' + err.message);
		}
	};
	
	$.print = function() {
		try {
			$.report.print();
		} catch (err) {
			console.log('FingerReportView print() : ' + err.message);
		}
	};
}

FingerReportView.prototype.setProperty = function(x, y, width, height) {
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

FingerReportView.prototype.getType = function() {
	return 'ReportView';
}

FingerReportView.prototype.getText = function() {
	var e = document.getElementById(this.id);
	var result = e.value;

	delete e;

	try {
		return result;
	} finally {
		result = null;
	}
}

FingerReportView.prototype.getValue = function() {
	var e = document.getElementById(this.id);
	var result = e.value;

	delete e;

	try {
		return result;
	} finally {
		result = null;
	}
}

FingerReportView.prototype.setText = function(value) {
	var e = document.getElementById(this.id);
	e.value = value;
	delete e;
}

FingerReportView.prototype.setValue = function(value) {	
	var e = document.getElementById(this.id);
	e.value = value;
	delete e;
}