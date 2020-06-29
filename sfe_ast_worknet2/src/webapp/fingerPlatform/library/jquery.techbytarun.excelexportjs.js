/*
 * jQuery Client Side Excel Export Plugin Library
 * http://techbytarun.com/
 *
 * Copyright (c) 2013 Batta Tech Private Limited
 * https://github.com/tarunbatta/ExcelExportJs/blob/master/LICENSE.txt
 */

(function ($) {
    var $defaults = {
        containerid: null
        , datatype: 'table'
        , dataset: null
        , columns: null
        , returnUri: false
        , tableBorder: false
        , worksheetName: "Sheet1"
        , encoding: "utf-8"
    };

    var $settings = $defaults;

    this.excelexportjs = function (options) {
        $settings = jQuery.extend({}, $defaults, options);

        var gridData = [];
        var excelData;

        return Initialize();

        function Initialize() {
            var type = $settings.datatype.toLowerCase();
            var tp = true;

            BuildDataStructure(type);

            switch (type) {
                case 'table':
                    excelData = Export(ConvertFromTable());
                    break;
                case 'json':
                    excelData = Export(ConvertDataStructureToTable());
                    break;
                case 'xml':
                    excelData = Export(ConvertDataStructureToTable());
                    break;
                case 'jqgrid':
                    excelData = Export(ConvertDataStructureToTable());
                    break;
                case 'jsoncss':
                    excelData = Export(ConvertDataStructureToTableCustom());
                    tp = false;
                    break;
                case 'tablecss':
                	excelData = Export(ConvertFromStringTag());
                	tp = false;
                    break;
                case 'csv':
                	excelData = ConvertFromCSV();
                	break;
            }
            
            if ($settings.returnUri) {
                return excelData;
            }
            else {
            	// window.open(excelData);
            	// 위 구문대신 아래 구문으로 변경
            	
            	/*if (document.getElementById('techbytarun_excel_export') == null) {
            		var d_html = "<a id='techbytarun_excel_export' style='display:none;' /> ";
            		document.body.insertAdjacentHTML('beforeEnd', d_html);
            	}
            	var dlnk = document.getElementById('techbytarun_excel_export');
            	dlnk.href = excelData;
            	dlnk.download = options.xlsFileName + ".xls";
            	
            	dlnk.click();*/
            	
            	// 데이터가 많을때 엑셀이 다운되지 않는 문제 처리    	
            	if (document.getElementById('techbytarun_excel_export') == null)
            	{
            		var d_html = "<a id='techbytarun_excel_export' style='display:none;' /> ";
            		document.body.insertAdjacentHTML('beforeEnd', d_html);
            	}
                        	
        		var agent = navigator.userAgent.toLowerCase();
        		var isIE = /*@cc_on!@*/false || !!document.documentMode;
        		var blob = '';
        		var dlnk = document.getElementById('techbytarun_excel_export');
        		
        		if (type != 'csv') {
        			blob = new Blob([excelData], {type : "application/vnd.ms-excel;"});
        			dlnk.download = options.xlsFileName + ".xls";
        			dlnk.href = URL.createObjectURL(blob);
        		} else {
        			var BOM = '%EF%BB%BF';	// excel 에서 한글이 안깨지도록 해준다.
        			dlnk.download = options.xlsFileName + ".csv";
        			dlnk.href = 'data:application/csv;charset=utf-8,' + BOM + '' + encodeURIComponent(excelData);
        		}  	
        		
        		
            	dlnk.click();
            }
        }

        function BuildDataStructure(type) {
            switch (type) {
                case 'table':
                case 'tablecss':
                    break;
                case 'json':
                case 'jsoncss':
                case 'csv':
                    gridData = $settings.dataset;
                    break;
                case 'xml':
                    jQuery($settings.dataset).find("row").each(function (key, value) {
                        var item = {};

                        if (this.attributes != null && this.attributes.length > 0) {
                            jQuery(this.attributes).each(function () {
                                item[this.name] = this.value;
                            });

                            gridData.push(item);
                        }
                    });
                    break;
                case 'jqgrid':
                    jQuery($settings.dataset).find("rows > row").each(function (key, value) {
                        var item = {};

                        if (this.children != null && this.children.length > 0) {
                            jQuery(this.children).each(function () {
                                item[this.tagName] = jQuery(this).text();
                            });

                            gridData.push(item);
                        }
                    });
                    break;
            }
        }

        function ConvertFromTable() {
            var result = jQuery('<div>').append(jQuery('#' + $settings.containerid).clone()).html();
            return result;
        }
        
        function ConvertFromStringTag() {
            var result = jQuery('<div>').append($settings.dataset).html();
            return result;
        }

        function ConvertFromCSV() {
        	var headerArr = [];
        	var csv = '';
        	
        	jQuery($settings.columns).each(function (key, value) {
        		if (this.ishidden != true && this.headerHidden != true) {
        			headerArr.push(this.datafield);
				}
			});
        	
        	csv = headerArr.join(',');
        	csv += '\n';
        	
        	jQuery(gridData).each(function (key, value) {
        		var dataArr = [];
        		
                jQuery($settings.columns).each(function (k, v) {
                    if (value.hasOwnProperty(this.datafield)) {
                        if (this.ishidden != true) {
                        	dataArr.push(value[this.datafield]);
                        }
                    }
                });
                
                csv += dataArr.join(',');
                csv += '\n';
            });
        	
        	return csv;
        }
        
        function ConvertDataStructureToTable() {
            var result = "<table>";

            result += "<thead><tr>";
            jQuery($settings.columns).each(function (key, value) {
                if (this.ishidden != true && this.headerHidden != true) {
                	if (this.colspan && this.colspan != 99 && !this.rowspan) {
                		result += "<th colspan = '" + this.colspan + "' ";
                    }
                	else if (this.colspan == 0) 
                		result += "<th";
                	else if (this.rowspan != 0 && this.rowspan != 99) 
                		result += "<th rowspan = '" + this.rowspan + "' ";
                	else if (this.rowspan == 0 && this.rowspan)
                		result += "<th";
                	else if (this.colspan == 99)
                		return true;
                	
                    if (this.width != null) {
                        result += " style='width: " + this.width + "'";
                    }
                    result += ">";
                    result += this.headertext;
                    result += "</th>";
                }
            });
            result += "</tr>";
            
            if ($settings.columns[0].headRowCount > 1) {
	            result += "<tr>";
	            jQuery($settings.columns).each(function (key, value) {
	                if (this.ishidden != true) {
	                	if (this.rowspan != 0 && this.rowspan != 99) 
	                		return true;
	                	else
	                		result += "<th";
	                	
	                	if (this.width != null) {
	                        result += " style='width: " + this.width + "'";
	                    }
	                    result += ">";
	                    result += this.headertext2;
	                    result += "</th>";
	                }
	            });
	            result += "</tr></thead>";
            }
            else {
            	result += "</thead>";
            }
            
            result += "<tbody>";
            jQuery(gridData).each(function (key, value) {
                result += "<tr>";
                jQuery($settings.columns).each(function (k, v) {
                    if (value.hasOwnProperty(this.datafield)) {
                        if (this.ishidden != true) {
                            result += "<td";
                            
                            if (this.datatype) {
                            	if (this.datatype == 'int') {
                            		result += " class='mso_number_format' ";
                            	}
                            	
                            	if (this.datatype == 'string') {
                            		result += " class='mso_string_format' ";
                            	}
                            }
                            
                            if (this.width != null) {
                                result += " style='width: " + this.width + "'";
                            }
                            result += ">";
                            result += value[this.datafield];
                            result += "</td>";
                        }
                    }
                });
                result += "</tr>";
            });
            result += "</tbody>";

            result += "</table>";
            return result;
        }
        
        function ConvertDataStructureToTableCustom() {
            var result = "<table>";
            result += "<thead>";
            
            var colRows = [];
            jQuery($settings.columns).each(function (key, value) {
            	//console.log(this);
                if (this.ishidden != true && this.headerHidden != true) {
                	if (this.header && Array.isArray(this.header)) {
                		for (var i in this.header) {
                			if (!colRows[i]) {
                				colRows[i] = [];
                			}
                			if (i == 0 && this.header[i]) {
                				this.header[i].width = this.width;
                			}
                			if (this.header[i] && this.noText) {
                				this.header[i].noText = this.noText;
                			}
                			colRows[i].push(this.header[i]);
                		}
                	}
                }
            });
            
            for (var i in colRows) {
            	//console.log('colRows i :' + i);
            	result += "<tr>";
            	
            	for (var j in colRows[i]) {
            		var header = colRows[i][j];
            		//console.log(header);
            		if (header == null)
        				continue;
        		    
            		if (header.noText && !header.rowspan) {
        				continue;
        			}
            		
        			var colspan = header.colspan;
        			var rowspan = header.rowspan;
        			
        			result += "<th";
        			
                	if (colspan > 0) {
                		result += " colspan = '" + colspan + "' ";
                	}
                	
                	if (rowspan > 0) {
                		result += " rowspan = '" + rowspan + "' ";
                	}
                    if (i == 0 && header.width) {
                    	if (colspan > 0) {
                    		header.width = (Number(unmask(header.width)) * colspan) + 'px';
                    	}
                    	
                        //result += " style='width: " + header.width + "'";
                    }
                                                            
                    result += ">";
                                      
                    if (header.text) {
                    	var txt = checkTag(header.text);
                		txt = String(txt).replace(/<br>|<br\/>/gi, "<br style='mso-data-placement: same-cell'>");
                    	result += txt;
                    }
                    result += "</th>";
            	}
            	result += "</tr>";
            }

            result += "</thead><tbody>";
            jQuery(gridData).each(function (key, value) {
                result += "<tr>";
                jQuery($settings.columns).each(function (k, v) {
                	if (this.ishidden != true) {
                        if (value.hasOwnProperty(this.datafield)) {
                        	var rowSpanValue = 1;
                        	
                        	if (this.rowSpan) {
                        		if (this.multiSpan) {
                        			if (value[this.datafield + '_num'] != 1)	return;
                        			else										rowSpanValue = value[this.datafield + '_rowspan'];
                        		} else {
                        			if (value['row_num'] != 1)	return; 
                        			else						rowSpanValue = value['rowspan'];
                        		}
                        	}
                        	
                        	var isStyle = false;
                        	if (this.width != null) {
                        		isStyle = true;
                        	}
                        	result += "<td rowspan=" + rowSpanValue;
                        	
                            if (this.datatype != null) {
                            	if (this.datatype == 'int') {
                            		result += " class='mso_number_format' ";
                            	}
                            	
                            	if (this.datatype == 'string') {
                            		result += " class='mso_string_format' ";
                            	}
                            	
                            	if (this.docNum) {
                            		result += " class='mso_number_string' ";
                            	}
                            	
                            	if (this.instId) {
                            		result += " class='mso_zero_string' ";
                            	}
                            }
                            if (isStyle) {
                            	result += " style=\"";
                            }
                            if (this.width != null) {
                                //result += " width: " + this.width + ";";
                                result += " width: auto;";
                            }
                            if (isStyle) {
                            	result += "\"";
                            }
                            result += ">";
                            result += value[this.datafield];
                            result += "</td>";
                        }
                	}
                });
                result += "</tr>";
            });
            result += "</tbody>";

            result += "</table>";
            return result;
        }
        
        function checkTag(value) {
        	if (value.substr(0, 4) == '<br>') {
        		return value.substr(4);
        	}
        	
        	return value;
        }

        function Export(htmltable) {
            var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
            excelFile += "<head>";
            excelFile += '<meta http-equiv="Content-type" content="text/html;charset=' + $defaults.encoding + '" />';
            excelFile += "<!--[if gte mso 9]>";
            excelFile += "<xml>";
            excelFile += "<x:ExcelWorkbook>";
            excelFile += "<x:ExcelWorksheets>";
            excelFile += "<x:ExcelWorksheet>";
            excelFile += "<x:Name>";
            excelFile += "{worksheet}";
            excelFile += "</x:Name>";
            excelFile += "<x:WorksheetOptions>";
            excelFile += "<x:DisplayGridlines/>";
            excelFile += "</x:WorksheetOptions>";
            excelFile += "</x:ExcelWorksheet>";
            excelFile += "</x:ExcelWorksheets>";
            excelFile += "</x:ExcelWorkbook>";
            excelFile += "</xml>";
            excelFile += "<![endif]-->";
            excelFile += "<style type='text/css'>";
            if ($settings.tableBorder) {
            	excelFile += "table { border-collapse: collapse; border-spacing: 0; empty-cells:show; margin: 0, padding: 0; }";
            	excelFile += "th { border: .5pt solid #000; }";
            	excelFile += "td { border: .5pt solid #000; }";
            }
            excelFile += ".mso_number_format { mso-number-format: \#\\,\#\#0; } ";
            excelFile += ".mso_number_string { mso-number-format: \\#; } ";
            excelFile += ".mso_string_format { mso-number-format: \\@; } ";
            excelFile += ".mso_zero_string { mso-number-format: 0000000000; } ";
            excelFile += "</style>";
            excelFile += "</head>";
            excelFile += "<body>";
            excelFile += htmltable.replace(/"/g, '\'');
            excelFile += "</body>";
            excelFile += "</html>";
            
            //var uri = "data:application/vnd.ms-excel;base64,";
            // (170614) 구글 확장프로그램(오피스 웹오픈) 연결 안되도록 처리
            var uri = "data:application/octet-stream;base64,";
            var ctx = { worksheet: $settings.worksheetName, table: htmltable };
            
            // return (uri + base64(format(excelFile, ctx)));
            return (uri + format(excelFile, ctx));
        }

        function base64(s) {
            return window.btoa(unescape(encodeURIComponent(s)));
        }

        function format(s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; });
        }
    };
})(window.jQuery);