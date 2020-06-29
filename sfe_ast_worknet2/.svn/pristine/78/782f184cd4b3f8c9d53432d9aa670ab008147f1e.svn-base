﻿function FingerDataGridColumn(fieldName, width, align, type, header, extProperties) {
	this.id = fieldName;
	this.width = width;
	this.align = align;
	this.type = type;
	this.header = header;
	
	if (extProperties) {
		for (var prop in extProperties) {
			this[prop] = extProperties[prop];
		}
	}
}

function FingerDataGrid(host, id, x, y, width, height) {
	var $ = this;
	$.id = host.id + '__' + id;
	$.ids = ('#' + $.id);
	$.x = x;
	$.y = y;
	$.width = width;
	$.height = height;
	$.settings = null;
	$.columns = null;
	$.columnsPart = null;
	$.changedRows = [];
	$.adjustColumns = [];
	$.rowSpanColNames = [];
	$.validationColumns = {};
	$.dispPanel = null;
	$.excelFilter = null;
	$.autoColumns = false;
	$.autoColumnsFill = false;
	$.isTreeGrid = false;
	$.isExcelDown = false;
	$.isGridFilter = false;
	$.isFirstSetData = false;
	$.isMultiLine = false;
	$.isAutoMultilineHeight = false;
	
	var e = document.createElement('div');
	e.id = $.id;
	e.style.position = 'absolute';
	e.style.float = 'left';
	e.style.width = $.width + 'px';
	e.style.height = $.height + 'px';
	e.style.left = $.x + 'px';
	e.style.top = $.y + 'px';
	e.style.zIndex = 11;
	
	host.appendChild(e);
	
	/**
	 * 컬럼 설정
	 */
	$.setColumns = function(columns) {
		$.columns = columns;
		
		var colMap = {};
		for (var i in $.columns) {
			colMap[$.columns[i].id] = i;
		}
		return colMap;
	};
	
	$.getColumnms = function() {
		return $.columns;
	}
	
	/**
	 * 컬럼 보관 및 보관된 컬럼셋 반환
	 */
	$.rawColumns = null;
	$.saveColumns = function(columns) {
		$.rawColumns = deepCopyObj(columns);
	};
	$.getSaveColumns = function() {
		return deepCopyObj($.rawColumns);
	};
	
	/**
	 * 컬럼 속성 재정의
	 */
	$.customFuncs = {
		custom_checkbox: function(obj, common, value) {
			if (value === true || value === 'Y')
				return "<div class='webix_table_checkbox webix_icon fa-check-square-o' style='cursor:pointer;'></div>";
			else
				return "<div class='webix_table_checkbox webix_icon fa-square-o' style='cursor:pointer;'></div>";
		},
		custom_checkbox_readonly: function(obj, common, value) {
			if (value === true || value === 'Y')
				return "<div class='webix_icon fa-check-square-o' style='cursor:pointer;'></div>";
			else
				return "<div class='webix_icon fa-square-o' style='cursor:pointer;'></div>";
		},
		tree_table: function(obj, common) {
			return common.treetable(obj, common) + obj[this.id] + (obj.$count ? ' (' + obj.$count + ')' : '');
		},
		tree_table_type1: function(obj, common) {
			return common.treetable(obj, common) + obj[this.id];
		},
		wf_tree_table: function(obj, common) {
			// 기안/결재함 트리 전용
			return common.treetable(obj, common) + obj[this.id] + ((obj.$count && obj.$level > 1) ? ' (' + obj.$count + ')' : '');
		},
		verticalMiddle: function (obj, common, value, col) {
			var dispVal = $.getDisplayValue(col, value);
			return "<div style = 'display:table; width:100%; height:100%;'>" + 
						"<div style = 'display: table-cell; vertical-align: middle;'>" + 
							(dispVal ? dispVal : '') +
						"</div>" +
					"</div>";
		}
	};
	
	$.getDisplayValue = function(col, value) {
		if (col.editor == 'richselect' && col.dataset) {
			for (var i in col.dataset) {
				if (col.dataset[i].id == value) {
					return col.dataset[i].value;
				}
			}
		}
		else {
			return value;
		}
	};
	
	$.initColumns = function(grdOption) {
		var columns = $.columns;

		if (!columns || !columns.length) {
			console.log('FingerDataGrid initColumns() : 컬럼셋이 지정되지 않았습니다.');
			return;
		}
		for (var i = 0; i < columns.length; i++) {
			var col = columns[i];
			
			if (grdOption) {
				if (grdOption.autowidth && i == (columns.length - 1)) {
					// 마지막 컬럼인 경우
					col.fillspace = true;
				}
			}
			
			// Column 스타일 설정
			col.css = '';
			if (col.align != null && col.align != 'left') {
				col.css += 'align_' + col.align;
			}
			if (col.isLink) {
				col.css += (col.css.length ? ' cells_link' : 'cells_link');
			}
			if (col.type == 'multi_line_edit' || col.multiLine || col.adjustRowHeight) {
				$.isMultiLine = true;
				col.css += (col.css.length ? ' multi_line' : 'multi_line');
			}
			if (col.verticalMiddle) {
				col.css += (col.css.length ? ' cell_pos_middle' : 'cell_pos_middle');
				col.template = $.customFuncs.verticalMiddle;				
			}
			
			// 소트 설정
			if (col.sort === undefined) {
				col.sort = (col.type != 'int' ? 'string' : 'int');
			}			
			
			// 헤더 설정
			if (Array.isArray(col.header)) {
				for (var hi = 0; hi <= col.header.length; hi++) {
					if (typeof col.header[hi] === 'string') {
						if (col.header[hi] == 'masterCheckbox') {
							col.header[hi] = { content:"masterCheckbox" }; // { content:"masterCheckbox", contentId:"mc1" };
							col.sort = null; // masterCheckbox 의 경우 체크선택시 정렬되는 현상이 있어 정렬 제외
						}
						if (col.header[hi].indexOf('<br>') > -1) {
							col.header[hi] = {text: col.header[hi], autoheight: true, css: 'multi_h_line'};
						} else {
							col.header[hi] = {text: col.header[hi]};
						}						
					}
				}
			}
			else if (typeof col.header === 'string') {
				if (col.header == 'masterCheckbox') {
					col.header = { content:"masterCheckbox" }; // { content:"masterCheckbox", contentId:"mc1" };
					col.sort = null; // masterCheckbox 의 경우 체크선택시 정렬되는 현상이 있어 정렬 제외
				}
				else if (col.header.indexOf('<br>') > -1) {
					col.header = {text: col.header, autoheight: true, css: 'multi_h_line'};
				}
				else {
					col.header = {text: col.header};
				}
			}
			
			// 포맷 설정
			if (col.format) {
				if (col.format == 'ymd') {
					col.format = webix.Date.dateToStr("%Y-%m-%d");
				} else if (col.format == 'ymd_dot') {
					col.format = webix.Date.dateToStr("%Y.%m.%d");
				} else if (col.format == 'hm') {
					col.format = webix.Date.dateToStr("%H:%i");
				} else if (col.format == 'ymdhm') {
					col.format = webix.Date.dateToStr("%Y-%m-%d %H:%i");
				} else if (col.format == 'ym') {
					col.format = webix.Date.dateToStr("%Y-%m");
				} else if (col.format == 'yyyy') {
					col.format = webix.Date.dateToStr("%Y");
				} else if (col.format == 's_ym') {
					col.format = function(val) { val = extFormat(val, 'yyyyMM'); return val; }
				} else if (col.format == 's_ymd') {
					col.format = function(val) { val = extFormat(val, 'yyyyMMdd'); return val; }
				} else if (col.format == 's_ymd_dot') {
					col.format = function(val) { val = extFormat(val, 'yyyyMMdd', '.'); return val; }
				} else if (col.format == 's_hm') {
					col.format = function(val) { val = extFormat(val, 'HHmm'); return val; }
				} else if (col.format == 's_hmm') {
					col.format = function(val) { val = extFormat(val, 'Hmm'); return val; }
				} else if (col.format == 's_ymdhm') {
					col.format = function(val) { val = extFormat(val, 'yyyyMMddHHmm'); return val; }
				} else if (col.format == 'int') {
					col.format = webix.i18n['intFormat'];
				} else if (col.format == 'int_d_zero') {
					col.format = function(val) { val = (val == '' ? 0 : setComma(val)); return val; }
				} else if (col.format == 'number') {
					col.format = webix.i18n['numberFormat'];
				} else if (col.format == 'only_percent') {
					col.format = function(val) { return (val ? val + '%' : val); }
				} else if (col.format.indexOf('no_zero_percent') > -1) {
					var dp = col.format.substr(col.format.length - 1, col.format.length);
					col.format = function(val) { return val ? (val * 100).toFixed(dp) + '%' : ''; }
				} else if (col.format == 'percent') {
					col.format = function(val) { return (val * 100) + '%'; }
				} else if (col.format == 'percent_1') {
					col.format = function(val) { return (val * 100).toFixed(1) + '%'; }
				} else if (col.format == 'percent_2') {
					col.format = function(val) { return (val * 100).toFixed(2) + '%'; }
				} else if (col.format == 'percent_s') {
					col.format = function(val) { return (val * 1).toFixed(2) + '%'; }
				} else if (col.format == 'percent_s_space') {
					col.format = function(val) { return val ? (val * 1).toFixed(2) + '%' : ''; }
				} else if (col.format == 'floor_1') { 
					col.format = function(val) { if (val == '') return val; else return val.toFixed(1); }
				} else if (col.format == 'floor_2') { 
					col.format = function(val) { if (val == '') return val; else return val.toFixed(2); }
				} else if (col.format.indexOf('floor_comma_') > -1) {
					// floor_comma_1, floor_comma_2, floor_comma_3 ...
					// ex) floor_comma_3: 123456.000000 -> 123,456.000
					var dp = col.format.substr(col.format.length - 1, col.format.length);
					col.format = webix.Number.numToStr({groupDelimiter:',', groupSize:3, decimalDelimiter:'.', decimalSize:Number(dp)});
				} else if (col.format == 'file_size') {
					col.format = function(val) { return val ? (String(val) + ' bytes') : '' }
				} else if (col.format == 'social'){
					col.format = function(val) { return val = val.substr(1,6)+'-'+val.substr(7,14) }
				} else if (col.format == 'social_0'){
					col.format = function(val) { return val = val.substr(0, 6) + '-' + val.substr(6, 13) }	
				} else {
					col.format = webix.i18n[col.format];
				}
			}
			
			// 에디터 설정
			if (col.type == 'ro' || col.type == 'string' || col.type == 'int') {
				col.editor = 'text';
			} else if (col.type == 'checkbox_ro') {
				col.readonly = true;
				col.editor = 'checkbox';
			} else {
				col.editor = col.type;
			}
			
			// readonly 적용
			if (col.readonly) {
				if (col.editor == 'text') {
					col.editor = null;
				} else if (col.editor == 'checkbox') {
					col.editor = null;
					col.template = $.customFuncs.custom_checkbox_readonly;
				}
			} else {
				if (col.editor == 'checkbox') {
					col.editor = null;
					col.checkValue = 'Y';
					col.uncheckValue = 'N';
					col.template = $.customFuncs.custom_checkbox;
				}
			}
			
			// 템플릿 설정
			if (col.template) {
				if (col.template == 'tree') {
					col.template = $.customFuncs.tree_table; /*'{common.treetable()} #' + col.id + '#';*/
				} else if (col.template == 'wf_tree') {
					col.template = $.customFuncs.wf_tree_table;
				} else if (col.template == 'tree_type1') {
					col.template = $.customFuncs.tree_table_type1;
				}
			}
			
			if (col.adjustRowHeight) {
				$.adjustColumns.push(col);
			}
			
			if (col.rowSpan) {
				$.rowSpanColNames.push(col.id);
			}
			
			// (180319) Validation 처리를 위한 추가
			if (col.validation) {
				$.validationColumns[col.id] = col.validation;
			}
			
			if (col.fill) {
				col.fillspace = (col.fill || false);
			}
		}
	};
	
	/**
	 * 그리드 초기화 (생성)
	 */
	$.init = function(obj) {
		if (!obj) 
			obj = {};
		
		if (obj.autoColumns) {
			$.autoColumns = true;
			$.autoColumnsFill = (obj.autoColumnsFill === undefined ? false : obj.autoColumnsFill);
			
			if ($.columns) {
				$.columnsPart = $.columns;
				$.columns = null;
			}
		} else if (!$.columns) {
			console.log('FingerDataGrid init() : 컬럼 지정은 필수입니다. (' + $.id + ')');
			return;
		} else {
			// 컬럼 속성 정의
			$.initColumns(obj);
		}

		var settings = {
			id: ($.id + '_grid'),
			container: $.id,
			view: obj.view || 'datatable',
			width: $.width,
			height: $.height,
			columns: $.columns,
			autoConfig: false,
			navigation: true,
			checkboxRefresh: true,
			scroll: obj.scroll || 'y',
			select: obj.select || 'row',
			header: (obj.header === undefined ? true : obj.header),
			autowidth: (obj.autowidth === undefined ? false : obj.autowidth),
			dragColumn: (obj.dragColumn === undefined ? true : obj.dragColumn),
			tooltip: (obj.tooltip === undefined ? true : obj.tooltip),
			editable: (obj.editable === undefined ? false : obj.editable),
			resizeRow: (obj.resizeRow === undefined ? true : obj.resizeRow),
			resizeColumn: (obj.resizeColumn === undefined ? true : obj.resizeColumn),
			rowHeight: (obj.rowHeight === undefined ? 32 : obj.rowHeight),
			rowLineHeight: (obj.rowLineHeight === undefined ? ($.isMultiLine ? 20 : 32) : obj.rowLineHeight),
			headerRowHeight: (obj.headerRowHeight === undefined ? 32 : obj.headerRowHeight),
			fixedRowHeight: (obj.fixedRowHeight === undefined ? false : obj.fixedRowHeight),
			minColumnHeight: (obj.minColumnHeight === undefined ? 26 : obj.minColumnHeight),
			footer: (obj.footer === undefined ? false : obj.footer),
			leftSplit: obj.leftSplit || 0,
			rightSplit: obj.rightSplit || 0,
			on: {}
		};
		
		if (obj.editable) {
			//settings.editaction = "custom";
		}
		
		if (obj.scheme) {
			settings.scheme = obj.scheme;
		} else {
		}
		
		if (obj.view && obj.view == 'treetable') {
			if (!obj.treeKey) {
				console.log('FingerDataGrid init() : TreeTable 일 때, 키 지정은 필수입니다. treeKey: {id:"keyId", parent:"parentKeyId"}');
				return;
			}
			$.isTreeGrid = true;
			$.treeKey = obj.treeKey;
			
			// 트리테이블의 경우 기본 세팅값 재설정
			settings.rowHeight = 28;
			settings.rowLineHeight = 28;

		} else if (obj.view && obj.view == 'grouptable') {
			settings.view = 'treetable';
			$.isTreeGrid = true;
		}
		
		// 그리드를 표시할 패널 상호 연결
		if (obj.panel) {
			$.dispPanel = obj.panel;
			$.dispPanel.setGrid($);
		}
		
		if ($.dispPanel) {
			// 패널 기능 버튼 (엑셀다운로드, 필터링 등) 연동
			if (obj.isFilter !== false) {
				$.dispPanel.addButton('btnFilter', '필터링', true);
				$.dispPanel.setButtonAction('btnFilter', 'filter');
			}

			if (!obj.nonExcel) {
				$.isExcelDown = true;
				$.dispPanel.addButton('btnExcelDown', '엑셀다운로드', true);
				$.dispPanel.setButtonAction('btnExcelDown', 'excel_down');
			}
		}
		
		// 그리드 호출시 전처리 이벤트Callback을 넘겨 등록할 수 있도록 한다.
		if (obj.preEventHandler && obj.preEventHandler.length) {
			for (var i = 0; i < obj.preEventHandler.length; i++) {
				settings.on[obj.preEventHandler[i]['name']] = obj.preEventHandler[i]['handler'];
			}
		}
		
		// 그리드 validation 처리 기능 추가
		if ($.validationColumns && Object.keys($.validationColumns).length) {
			var rules = {};
			for (var validCol in $.validationColumns) {
				rules[validCol] = $.validationColumns[validCol];
			}
			settings.rules = rules;
		}
		
		// 그리드 생성
		$.extObj = webix.ui(settings);
		$.settings = settings;
		
		/**
		 * Cell BeforeEditStart 이벤트
		 */
		$.extObj.attachEvent("onBeforeEditStart", function(data) {
			var col = $.extObj.getColumnConfig(data.column);
			if (col.readonly) {
				if (col.editor != 'multi_line_edit') {
					// multi_line_edit 의 경우 readonly 시 textarea로 변환은 하되 입력불가모드로 별도 처리 (여러줄 표시를 위함, webix_read.js 소스 참조)
					return false;
				}
			}
			// 특정 행의 데이터를 readonly 처리할 경우
			// ex) row data -> {employee_id:'ydkim', emp_name:'김영도', emp_name_readonly:true} 
			return !this.getItem(data.row)[data.column+"_readonly"];
		});
		
		/**
		 * Data AfterLoad 이벤트
		 */
		$.extObj.attachEvent("onAfterLoad", function() {
			if ($.adjustColumns && $.adjustColumns.length) {
				webix.delay(function() {
					if ($.isAutoMultilineHeight && this.autoAdjustRowHeight) {
						var idArr = [];
						for (var i = 0; i < $.adjustColumns.length; i++) {
							idArr.push($.adjustColumns[i].id);
						}
						
						this.autoAdjustRowHeight(idArr, true);
					} else {
						for (var i = 0; i < $.adjustColumns.length; i++) {
							this.adjustRowHeight($.adjustColumns[i].id, true);
						}
					}
					
					this.render();
				}, this);
			}
		});
		
		/**
		 * Cell ColumnResize 이벤트
		 */		
		$.extObj.attachEvent("onColumnResize", function() {
			if ($.adjustColumns && $.adjustColumns.length) {
				if ($.isAutoMultilineHeight && this.autoAdjustRowHeight) {
					var idArr = [];
					for (var i = 0; i < $.adjustColumns.length; i++) {
						idArr.push($.adjustColumns[i].id);
					}
					
					this.autoAdjustRowHeight(idArr, true);
				} else {
					for (var i = 0; i < $.adjustColumns.length; i++) {
						this.adjustRowHeight($.adjustColumns[i].id, true);
					}
				}
				
				this.render();
			}
		});
		
		/**
		 * Cell AfterEditStop 이벤트
		 */
		$.extObj.attachEvent("onAfterEditStop", function() { 			
			if ($.adjustColumns && $.adjustColumns.length) {
				if ($.isAutoMultilineHeight && this.autoAdjustRowHeight) {
					var idArr = [];
					for (var i = 0; i < $.adjustColumns.length; i++) {
						idArr.push($.adjustColumns[i].id);
					}
					
					this.autoAdjustRowHeight(idArr, true);
				} else {
					for (var i = 0; i < $.adjustColumns.length; i++) {
						this.adjustRowHeight($.adjustColumns[i].id, true);
					}
				}
				
				this.render();
			}
		});
		
		$.extObj.attachEvent("onDataUpdate", function(rId, data) { 	
			if ($.adjustColumns && $.adjustColumns.length) {
				if ($.isAutoMultilineHeight && this.autoAdjustRowHeight) {
					var idArr = [];
					for (var i = 0; i < $.adjustColumns.length; i++) {
						idArr.push($.adjustColumns[i].id);
					}
					
					this.autoAdjustRowHeight(idArr, true, rId);
					this.render();
				}
			}
		});
		
		/**
		 * Scroll Up/Down 이벤트
		 * 17.04.24 추가 (* 스크롤시 헤더 잘림 현상 해결)
		 */
		$.extObj.attachEvent("onScrollY", function() {
			if ($.adjustColumns && $.adjustColumns.length) {
				if ($.isAutoMultilineHeight && this.autoAdjustRowHeight) {
					var idArr = [];
					for (var i = 0; i < $.adjustColumns.length; i++) {
						idArr.push($.adjustColumns[i].id);
					}
					
					this.autoAdjustRowHeight(idArr, true);
				} else {
					for (var i = 0; i < $.adjustColumns.length; i++) {
						this.adjustRowHeight($.adjustColumns[i].id, true);
					}
				}
				
				this.render();
			}
		});
		
		/**
		 * Row/Cell Select After 이벤트
		 */
		$.onKeyPressCode = null;
		$.extObj.attachEvent("onAfterSelect", function (data, preserve) {
			if ($.onKeyPressCode) {
				if ($.onKeyPressCode == '38' || $.onKeyPressCode == '40') {
					// keycode -> 38(↑), 40(↓) 일 때 Row/Cell Click 이벤트 호출
					$.onItemClick(data);					
				}
				$.onKeyPressCode = null;
			}
		});
		$.extObj.attachEvent("onKeyPress", function(code, e) {
			$.onKeyPressCode = code;
		});
		
		/**
		 * isLink=true, pathLinkCols 이 있는 컬럼의 경우
		 * 해당 path 컬럼을 통해 경로를 가져와 파일 다운로드 실행
		 */
		$.onCallPathUrl = function(rowId, pathCols) {
			var data = $.getValue(rowId);
			var path = '';
			
			for (var i = 0; i < pathCols.length; i++) {
				if (data[pathCols[i]]) {
					if (i == (pathCols.length - 1) && path.indexOf(data[pathCols[i]]) != -1) {
						// 간혹 파일경로가 파일명을 포함하고 있어 마지막인자(파일명으로판단)값이
						// 경로에 포함되어 있는지 체크하여 있다면 제외
						continue;
					}
					path += ('/' + data[pathCols[i]]);
				}
			}
			g_fileBrowser.download(path);
		};
		
		/**
		 * Filter After 이벤트
		 */
		$.onAfterFilter = function() {
			// RowCount 재표시
			$.setDisplayPanelRowCount();
		};
		$.extObj.attachEvent("onAfterFilter", $.onAfterFilter);
		
		/**
		 * Dropdown 컬럼에 대한 sort 함수 (* Keycode로 정렬이 되는 현상을 KeyName정렬로 처리)
		 */
		$.targetDropDown = {};
		$.sortDropDownColumn = function(data1, data2) {
			var cmbData = $.targetDropDown.data;
			var colId = $.targetDropDown.colId;
			
			if (!data2[colId]) { 
				return 1;
			}
			else if (!data1[colId]) {
				return -1;
			}
			else {
				var keyName1 = getKName(data1[colId]);
				var keyName2 = getKName(data2[colId]);
				return keyName1 > keyName2 ? 1 : -1;
			}
			
			function getKName(code) {
				for (var i = 0; i < cmbData.length; i++) {
					if (cmbData[i].id == code) {
						return cmbData[i].value;
					}
				}
				return '';
			}
		};
		
		/**
		 * Sort Before 이벤트
		 */
		$.onBeforeSort = function(colId, dir, as) {
			var col = $.extObj.getColumnConfig(colId);
			if (col && col.editor == 'richselect' && col.collection) {
				// 컬럼에 setColumnDropDownList 가 적용된 경우
				$.targetDropDown.colId = colId;
				$.targetDropDown.data = col.collection.s.data;
				
				$.extObj.sort($.sortDropDownColumn, dir);
				return false;
			}
			else {
				return true;
			}
		};
		$.extObj.attachEvent("onBeforeSort", $.onBeforeSort);		
		
		/**
		 * Row/Cell Click 이벤트
		 */		
		$.onItemClick = function(data, e, node) {
			var rowId = data.row;
			var colId = data.column;
			//console.log('onItemClick 2) rowId : ' + rowId + ', colId : ' + colId);
			
			if (rowId) {
				if (g_container != null && host.id == 'fpView') {
					if (g_container.fingerdatagrid_selectionchange != undefined) {
						g_container.fingerdatagrid_selectionchange(getRealId($.id), rowId);
					}
				}
				else if (g_popupStack && g_popupStack.has() && g_popupStack.get().obj) {
					g_popupStack.get().obj.fingerdatagrid_selectionchange(getRealId($.id), rowId);
				}
				else {
					if (g_currentModule != null) {
						if (g_currentModule.fingerdatagrid_selectionchange != undefined) {
							g_currentModule.fingerdatagrid_selectionchange(getRealId($.id), rowId);
						}					
					}
				}
			}
			if (colId) {
				// 컬럼 아이디가 있는 경우 fingerdatagrid_itemclick 호출
				// selectRow를 통한 코드 호출의 경우 colId 는 없음 (실제로 열을 "click" 한 것이 아니므로)
				var col = $.extObj.getColumnConfig(colId);
				if (col.isLink && col.pathLinkCols) {
					// link 경로가 있는 경우 호출
					$.onCallPathUrl(rowId, col.pathLinkCols); 
				}
				if (g_container != null && host.id == 'fpView') {
					if (g_container.fingerdatagrid_itemclick != undefined) {
						g_container.fingerdatagrid_itemclick(getRealId($.id), rowId, colId);
					}
				}
				else if (g_popupStack && g_popupStack.has() && g_popupStack.get().obj) {
					g_popupStack.get().obj.fingerdatagrid_itemclick(getRealId($.id), rowId, colId);
				}
				else {
					if (g_currentModule != null) {
						if (g_currentModule.fingerdatagrid_itemclick != undefined) {
							g_currentModule.fingerdatagrid_itemclick(getRealId($.id), rowId, colId);
						}
					}
				}
			}
		};
		$.extObj.attachEvent("onItemClick", $.onItemClick);
		
		/**
		 * Row/Cell DoubleClick 이벤트
		 */
		$.extObj.attachEvent("onItemDblClick", function(data, e, node) {
			var rowId = data.row;
			var colId = data.column;
			
			if ($.isTreeGrid) {
				// (17.04.25) 트리 그리드에서 더블클릭시 노드 오픈
				$.extObj.isBranchOpen(rowId) ? $.extObj.close(rowId) : $.extObj.open(rowId);
			}
			
			if (g_container != null && host.id == 'fpView') {
				if (g_container.fingerdatagrid_rowdblclicked != undefined) {
					g_container.fingerdatagrid_rowdblclicked(getRealId($.id), rowId);
				}
				if (g_container.fingerdatagrid_popupcelldblclicked != undefined) {
					g_container.fingerdatagrid_popupcelldblclicked(getRealId($.id), rowId, colId);
				}
			}
			else if (g_popupStack && g_popupStack.has() && g_popupStack.get().obj) {
				var popup = g_popupStack.get().obj;
				popup.fingerdatagrid_rowdblclicked(getRealId($.id), rowId);
				popup.fingerdatagrid_popupcelldblclicked(getRealId($.id), rowId, colId);
			}
			else {
				if (g_currentModule != null) {
					if (g_currentModule.fingerdatagrid_rowdblclicked != undefined) {
						g_currentModule.fingerdatagrid_rowdblclicked(getRealId($.id), rowId);
					}
					if (g_currentModule.fingerdatagrid_popupcelldblclicked != undefined) {
						g_currentModule.fingerdatagrid_popupcelldblclicked(getRealId($.id), rowId, colId);
					}
				}
			}
		});
		
		/**
		 * 그리드 내에 체크박스 사용시
		 * Cell Value Changed 이벤트를 동일하게 발생
		 */
		$.extObj.attachEvent("onCheck", function(row, column, state) {
			var rowId = row;
			var colId = column;
			var nValue = state;
			var oValue = '';
			var row = $.getItem(rowId);
			row.rowType = (row.rowType || 'U');

			if (g_container != null && host.id == 'fpView') {
				if (g_container.fingerdatagrid_cellvaluechange != undefined) {
					g_container.fingerdatagrid_cellvaluechange(getRealId($.id), rowId, colId, nValue, oValue);
				}
			}
			else if (g_popupStack && g_popupStack.has() && g_popupStack.get().obj) {
				g_popupStack.get().obj.fingerdatagrid_cellvaluechange(getRealId($.id), rowId, colId, nValue, oValue);
			}
			else {
				if (g_currentModule != null) {
					if (g_currentModule.fingerdatagrid_cellvaluechange != undefined) {
						g_currentModule.fingerdatagrid_cellvaluechange(getRealId($.id), rowId, colId, nValue, oValue);
					}
				}
			}
		});		

		/**
		 * Cell Value Changed 이벤트
		 */
		$.extObj.attachEvent("onAfterEditStop", function(state, editor, ignoreUpdate) {
			if (state.value == state.old)
				return;
			
			var rowId = editor.row;
			var colId = editor.column;
			var nValue = state.value;
			var oValue = state.old || '';
			var row = $.getItem(rowId);
			row.rowType = (row.rowType || 'U');

			if (g_container != null && host.id == 'fpView') {
				if (g_container.fingerdatagrid_cellvaluechange != undefined) {
					g_container.fingerdatagrid_cellvaluechange(getRealId($.id), rowId, colId, nValue, oValue);
				}
			}
			else if (g_popupStack && g_popupStack.has() && g_popupStack.get().obj) {
				g_popupStack.get().obj.fingerdatagrid_cellvaluechange(getRealId($.id), rowId, colId, nValue, oValue);
			}
			else {
				if (g_currentModule != null) {
					if (g_currentModule.fingerdatagrid_cellvaluechange != undefined) {
						g_currentModule.fingerdatagrid_cellvaluechange(getRealId($.id), rowId, colId, nValue, oValue);
					}
				}
			}
		});
	};
	
	/**
	 * 엑셀다운로드
	 */
	/*$.excelDown = function() {
		var excelCols = [];
		
		for (var i in $.columns) {
			log($.columns[i].header.length);
			if ($.columns[i].header.length > 1) {
				if ($.columns[i].header[0] != null) {
					log($.columns[i].header[0]);
				}
				else {
					$.columns[i].header[0] = {"text":"","colspan":99};
				}
				if ($.columns[i].header[1] != null) {
					log($.columns[i].header[1]);
				}
				else {
					$.columns[i].header[1] = {"text":"","rowspan":99};
				}	
			}
			excelCols.push({
				  'headertext':($.columns[i].header.length > 0 ? $.columns[i].header[0].text : '')
				, 'headRowCount': $.columns[i].header.length
				, 'headertext2':($.columns[i].header.length > 1 ? $.columns[i].header[1].text : '')
				, 'colspan': $.columns[i].header[0].colspan
				, 'rowspan': ($.columns[i].header[0].rowspan ? $.columns[i].header[0].rowspan : '') 
				, 'datatype':$.columns[i].type
				, 'datafield':$.columns[i].id
				, 'width':($.columns[i].width + 'px')
				, 'ishidden':($.columns[i].excelHidden === false ? false : ($.columns[i].hidden ? true : false))});
		}
		excelDown($.getExcelRows(), excelCols);
	};*/
	/**
     * 엑셀다운로드
     * 2017.03.17 기존에 사용중인 excelDown 주석
     */
	$.excelDown = function(fileNames) {
		var fileName = fileNames != '' ? fileNames : '다운로드';
		var withHidden = true;
		var exceptCol = '';
		var rowCount = -1;
		var excelCols = {};
		
		if ($.excelFilter && $.excelFilter.length) {
			// 엑셀 필터 존재시 적용
			for (var i = 0; i < $.excelFilter.length; i++) {
				$.extObj.filter(('#' + $.excelFilter[i].id + '#'), $.excelFilter[i].value);
			}
		}
		
		for (var key in $.columns) {
			var col = $.extObj.getColumnConfig($.columns[key].id);
  
			if (!withHidden || withHidden === false) {
				if ($.extObj.getColumnIndex(col.id) == -1) continue;
			}
			if (col.excelHidden) {
				continue;
			}
			
			var colText = '';
			
			for (var i = 0; i < col.header.length; i++) {
				colText += col.header[i] != null ? col.header[i].text : '';
			}
			excelCols[key] = {
				id: col.id,
				header: colText,
				editor: col.editor
			};
			
			//excelCols[key]['template'] = webix.template("#id#.#name#");
			excelCols[key]['template'] = function(item, editor, val, col, colIdx) {
				var exCol = null;
				for (var exIdx in excelCols) {
					if (excelCols[exIdx].id == col.id) {
						exCol = excelCols[exIdx];
						break;
					}
				}
				if (exCol.editor == 'richselect') {
					var comboCol = null;
					for (var rawColIdx in $.columns) {
						if ($.columns[rawColIdx].id == col.id) {
							comboCol = $.columns[rawColIdx];
							break;
						}
					}
					var comboData = comboCol.collection.s.data;
					
					for (var i in comboData) {
						if (val == comboData[i].id) {
							return comboData[i].value;
						}
					}
				}
				else { 
					return val; // item[col.id];
				}
			}
		} // for end
   
		if (exceptCol && Array.isArray(exceptCol) && exceptCol.length >0) {
			for(var i in exceptCol) {
				delete excelCols[exceptCol[i]];
			}
		}
   
		var deferred = webix.toExcel($.extObj, {
			filename : fileName,
			name : 'Sheet1',
			columns : excelCols,
			spans : true,
			filterHTML:true /* strip html tag */
		});
		deferred.promise.then(function() {
			if ($.excelFilter && $.excelFilter.length) {
				// 엑셀 필터 존재시 필터 클리어
				for (var i = 0; i < $.excelFilter.length; i++) {
					$.extObj.filter(('#' + $.excelFilter[i].id + '#'), '');
				}
			}
		});
	};
	
	$.excelDownCustom = function(fileName, isBorder, isCSV, header, data) {
		var xlsCols = [];
		var cols = $.columns;

		if (!header) {
			for (var i in cols) {
				//console.log(cols[i].excelHidden);
				
				xlsCols.push({
					'header': cols[i].header,
					'datatype':cols[i].type,
					'datafield':cols[i].id,
					'width':(cols[i].width + 'px'),
					'ishidden':(cols[i].excelHidden === true ? true : (cols[i].hidden ? true : false)),
					'docNum':(cols[i].docNum ? true : false),
					'instId':(cols[i].instId ? true : false),
					'tableBorder':(cols[i].borderCss ? true : false),
					'rowSpan': (cols[i].rowSpan || cols[i].hiddenRowSpan ? true : false),
					'multiSpan': (cols[i].multiSpan ? true : false),
					'noText': (cols[i].noText ? true : false)
				});
			}
		} else {
			xlsCols = header;			
		}
		
		var xlsDataSet = (data ? data : $.getExcelRows());
		
		excelexportjs({
			containerid: "dvjson"
			, datatype: isCSV ? 'csv' : 'jsoncss'
			, dataset: xlsDataSet
			, columns: xlsCols
			, tableBorder: (isBorder ? true : false)
			, worksheetName: 'Sheet1'
			, xlsFileName: (fileName || '다운로드')
		});
	};
	
	/**
	 * 엑셀 필터 적용
	 */
	$.setExcelFilter = function(filterApplyCols) {
		// [ {id:'check', value:'Y'}, {id:'dept_code', value:'Y220'} ];
		$.excelFilter = filterApplyCols;
	};
	
	/**
	 * Enable 모드
	 */
	$.setEnable = function(enable) {
		if (enable) {
			$.extObj.enable();
		} else {
			$.extObj.disable();
		}
	};

	/**
	 * Editor 모드
	 */
	$.setEditable = function(isEdit) {
		var editable = isEdit || false;
		
		$.extObj.define("editable", editable);
	};
	
	/**
	 * 데이터 클리어
	 */
	$.clear = function() {
		$.extObj.clearAll();
		$.setDisplayPanelRowCount(0);
	};
	
	/**
	 * 데이터 바인딩 전처리
	 */	
	$.dataPreprocess = function(list) {
		try {
			if (!list || list.length == 0)
				return;
			
			for (var i = 0; i < list.length; i++) {
				var item = list[i];
				var keys = Object.keys(item);
				
				for (var j in keys) {
					var k = keys[j];
					if (typeof item[k] === 'string') {
						// '<>' 형태의 값들은 html tag로 인식하기에 '()'형태로 변환
						//item[k] = item[k].replace(/</g, '(').replace(/>/g, ')');
					}
				}
			}
		} catch (err) {
			console.log('FingerDataGrid dataPreprocess() : ' + err.message);
		}
	};
	
	/**
	 * 데이터 바인딩
	 */
	$.setData = function(list) {
		try {
			if ($.changedRows) {
				$.changedRows.length = 0;
			}
			$.clear();
			
			if (!list || list.length == 0) {
				$.setDisplayPanelRowCount(0);
				return;
			}
			
			// 데이터 바인딩 전처리
			$.dataPreprocess(list);
			
			if ($.autoColumns) {
				// DataSet을 통한 컬럼 생성
				$.setDataSetToColumns(list);
			}
			
			if ($.isMultiLine) {
				// multiLine 그리드로 설정된 경우 LF(\N) 값을 <br> 태그로 변경 
				$.setNewLineToBrTag(list);
			}
			
			if ($.isTreeGrid && $.treeKey) {
				var keyId = $.treeKey.id;
				var parentId = $.treeKey.parent;
				var treeData = [];
				var listLen = list.length;
				
				for (var i = 0; i < listLen; i++) {
					if (!list[i][parentId] || list[i][parentId] == 'ROOT') {
						treeData.push(list[i]);
						continue;
					}
					for (var j = 0; j < listLen; j++) {
						if (list[i][parentId] == list[j][keyId]) {
							var parent = list[j];
							if (!parent.data) {
								parent.data = [];
							}
							parent.data.push(list[i]);
							break;
						}
						if (j == (listLen - 1)) {
							// 부모가 없는 경우
							treeData.push(list[i]);
							break;
						}
					}
				}
				
				$.extObj.define({'data':treeData});
				
			} else {
				$.extObj.define({'data':list});
			}
			
			if ($.dispPanel) {
				$.setDisplayPanelRowCount();
			}
			
			if (!$.isFirstSetData) {
				$.isFirstSetData = true;
			}
			
			if ($.isGridFilter) {
				// 필터 재 적용
				$.extObj.filterByAll();
			}
			// sork 표시 부분 클리어
			$.extObj.markSorting();
			
			// RowSpan 적용
			if ($.rowSpanColNames && $.rowSpanColNames.length) {
				$.setRowSpan($.rowSpanColNames);
			}
			
		} catch (err) {
			console.log('FingerDataGrid setData() : ' + err.message);
		}
	};
	
	/**
	 * autoColumns 적용시, 데이터바인딩 시점에 컬럼셋 생성
	 */
	$.setDataSetToColumns = function(ds) {
		try {
			// 필터모드는 false (* 새롭게 그리드가 생성되므로)
			$.isGridFilter = false;
			// 패널의 필터 버튼에 스위치 on 으로 들어있다면 해지
			if ($.dispPanel) {
				$.dispPanel.setButtonOnClear('filter');
			}
			
			var entry = Object.keys(ds[0]);
			var entryValues = ds[0];
			var columns = [];
			
			for (var i = 0; i < entry.length; i++) {
				if (entry[i] == 'id') {
					continue;
				}
				var col = null;
				
				// 부분 정의된 컬럼 정보가 있는 경우 적용
				if ($.columnsPart && $.columnsPart.length) {
					for (var j = 0; j < $.columnsPart.length; j++) {
						if (entry[i] == $.columnsPart[j].id) {
							col = $.columnsPart[j];
						}
					}
				}
				if (!col) {
					col = newColumn(entry[i]);
				}
				columns.push(col);
			}

			$.columns = columns;
			$.initColumns();
			$.extObj.config.columns = columns;
			$.extObj.refreshColumns();
			//log($.columns);
			
			function newColumn(entryKey) {
				var unmaskValue = String(entryValues[entryKey]).replace(/[,.]/g, "");
				var isNotNumber = isNaN(unmaskValue);
				var col_type = isNotNumber ? 'string' : 'int';
				var col_align = isNotNumber ? 'left' : 'right';

				return {
					id: entryKey,
					align: col_align,
					type: col_type,
					header: entryKey,
					fillspace: $.autoColumnsFill
				};
			};
			 
		} catch (err) {
			console.log('FingerDataGrid setDataSetToColumns() : ' + err.message);
		}
	};
	
	$.setNewLineToBrTag = function(ds) {
		try {
			var adCols = '';
			var vmCols = '';
			for (var i = 0; i < $.columns.length; i++) {
				var col = $.columns[i];
				
				// LF(\n) -> <br> 치환 대상 컬럼
				if (col.css && col.css.indexOf('multi_line') != -1) {
					adCols += (col.id + '|');
				}
			}
			
			for (var i = 0; i < ds.length; i++) {
				var m = ds[i];
				var keys = Object.keys(m);
				for (var j = 0; j < keys.length; j++) {
					if (adCols.indexOf(keys[j]) != -1) {
						m[keys[j]] = String(m[keys[j]]).replace(/\n/g, "<br>");
					}
				}
			}
		} catch (err) {
			console.log('FingerDataGrid setNewLineToBrTag() : ' + err.message);
		}
	};
	
	/**
	 * 패널에 조회 Row수 표시
	 */
	$.setDisplayPanelRowCount = function(dispCount) {
		var rowCount = $.getRowCount();
		
		if ($.dispPanel) {
			var title = $.dispPanel.getText();
			var addText;
			if (dispCount === undefined || dispCount === null) {
				addText = (rowCount ? ('[' + setComma(rowCount) + ']건') : '');
			}
			else {
				addText = '[' + setComma(dispCount) + ']건';
			}
			$.dispPanel.setText((title + ' ' + addText), true);
		}
	};
	
	/**
	 * 필터링 기능 활성화
	 */
	$.setFilterView = function() {
		try {
			if ($.isGridFilter) {
				for (var i = 0; i < $.columns.length; i++) {
					// 필터링 값 초기화
					$.extObj.filter(('#' + $.columns[i].id + '#'), '');
					// onAfterFilter 이벤트 처리
					$.onAfterFilter();
					
					var col = $.extObj.getColumnConfig($.columns[i].id);
				
					if (col.header.length > 0) {
						col.header.pop();
					}
				}
				$.isGridFilter = false;
				
			} else {
				for (var i = 0; i < $.columns.length; i++) {
					var colName = $.columns[i].id;
					var col = $.extObj.getColumnConfig(colName);
					
					if (col.header.length > 0) {
						if (col.ex_filter) {
							col.header.push({content: col.ex_filter});
						} else {
							// 기본 필터 모드 (* multiSelectFilter)
							var sepr = ' ||';
							var options = $.extObj.collectValues(colName);
							
							// 컬럼에 setColumnDropDownList 가 적용된 경우
							// 현재 그리드에 존재하는 데이터만 필터 목록에 표시하도록 처리
							if (col.editor == 'richselect') {
								var dataList = $.getAllRows();
								var existOptions = [];
								for (var ai = 0; ai < options.length; ai++) {
									for (var aj = 0; aj < dataList.length; aj++) {
										if (options[ai].id === dataList[aj][colName]) {
											existOptions.push(options[ai]);
											break;
										}
									}
								}
								options = existOptions;
							}
							// end.
							
							// collectValues()를 통해 distinct 된 값들로 option을 생성한다.
							// webix 에서 id에 빈문자열('') 또는 0 으로 id가 지정될 경우 rowid로 치환하는 버그가 있기 때문에
							// 빈문자열('') 은 "FILTER_OPTION_EMPTY_VALUE" 으로 삽입하며
							// 0은 "FILTER_OPTION_ZERO_VALUE" 으로 치환한다.
							options.unshift({"id":"FILTER_OPTION_EMPTY_VALUE","value":"(빈 값)"});
							for (var opi = 0; opi < options.length; opi++) {
								if (options[opi].id === 0) {
									options[opi].id = "FILTER_OPTION_ZERO_VALUE";
									break;
								}
							}
							var filtOn = {
								content:"multiSelectFilter",
								separator: sepr,
								options: options,
								inputConfig: { 
									inputWidth: (col.width ? (col.width * 2.5) : 250)
								},
								compare: function(val, obj, data) {
									//console.log(obj);
									return !obj || obj[val] || (val === '' && obj['FILTER_OPTION_EMPTY_VALUE']) || (val === 0 && obj['FILTER_OPTION_ZERO_VALUE']);
								},
								suggest: {
									body: {yCount: 12}
								}
							}
							col.header.push(filtOn);
						}
					}
				}
				$.isGridFilter = true;
			}
			$.extObj.refreshColumns();

		} catch (err) {
			console.log('FingerDataGrid setFilterView() : ' + err.message);
		}
	};
	
	/**
	 * 그리드 선택 방식 변경
	 */
	$.setSelectionmode = function(mode) {
		$.extObj.define({
			select : true,
			multiselect: 'touch'
		});
	};
	
	/**
	 * 컬럼 확장 포맷 
	 */
	$.extFormat = function(value, format, delimiter, timeDelimiter) {
		var dd = delimiter || '-';
		var td = timeDelimiter || ':';
		var out = String(value);
		
		if (out) {
			switch (format) {
				case 'yyyy':
					out = out.substr(0, 4);
					break;
				case 'yyyyMM':
					out = out.substr(0, 4) + dd + out.substr(4, 2);
					break;
				case 'yyyyMMdd':
					out = out.substr(0, 4) + dd + out.substr(4, 2) + dd + out.substr(6, 2);
					break;
				case 'yyyyMMddHHmm':
					out = out.substr(0, 4) + dd + out.substr(4, 2) + dd + out.substr(6, 2) + ' ' + out.substr(8, 2) + td + out.substr(10, 2);
					break;
				case 'yyyyMMddHHmmss':
					out = out.substr(0, 4) + dd + out.substr(4, 2) + dd + out.substr(6, 2) + ' ' + out.substr(8, 2) + td + out.substr(10, 2) + td + out.substr(12, 2);
					break;
				case 'HHmm':
					out = out.substr(0, 2) + td + out.substr(2, 2);
					break;
				case 'Hmm':
					var H = (Number(out.substr(0, 2)) > 9 ? out.substr(0, 2) : out.substr(1, 1));
					out = H + td + out.substr(2, 2);
					break;
				case 'HHmmss':
					out = out.substr(0, 2) + td + out.substr(2, 2) + td + out.substr(4, 2);
					break;
				case '#,###':
					out = setComma(out);
					break;
				case 'calendar':
					out = out.substr(0, 4) + dd + out.substr(4, 2) + dd + out.substr(6, 2) + ' ' + '00:00:00.000'
					break;
				default :
					break;
			}
		}
		return out;
	};

	/**
	 * 값 가져오기
	 * 1) rowId 인자만 있는 경우 RowData 반환
	 * 2) colName 인자까지 있는 경우 Value 반환
	 */
	$.getValue = function(rowId, colName) {
		try {
			var result = $.getItem(rowId);
			if (!result) {
				return null;
			}
			for (var k in result) {
				if (result[k] == 'EMPTY_RICHSELECT_VALUE') {
					result[k] = '';
				}
			}
			
			if (colName) {
				var col = $.extObj.getColumnConfig(colName);
				var data = result[colName];
				
				if (typeof data === 'object' && data && data.getMonth) {
					data = col.format(data);
				}
				return data;
			} else {
				return result;
			}
		} catch (err) {
			console.log('FingerDataGrid getValue() : ' + err.message);
		}
	};

	/**
	 * rowData 가져오기
	 */
	$.getItem = function(rowId) {
		try {
			var item = null;
			
			if ($.isTreeGrid) {
				var ds = $.extObj.data.pull;
				
				if (String(rowId).length == 13) {
					item = ds[rowId];
				} else {
					item = ds[$.getIdByIndex(rowId)];
				}
			} else {
				if (String(rowId).length == 13) {
					item = $.extObj.getItem(rowId);
				} else {
					item = $.extObj.getItem($.getIdByIndex(rowId));
				}
			}
			return item;
			
		} catch (err) {
			console.log('FingerDataGrid getItem() : ' + err.message);
		}
	};
	
	/**
	 * 인덱스를 통해 rowid 취득
	 */
	$.getIdByIndex = function(idx) {
		try {
			if ($.isTreeGrid) {
				var ds = $.extObj.data.pull;
				var i = 0;
				for (var k in ds) {
					if (i == idx) {
						return k;
					}
					i++;
				}
			} else {
				return $.extObj.getIdByIndex(idx);
			}
		} catch (err) {
			console.log('FingerDataGrid getIdByIndex() : ' + err.message);
		}
	};
	
	/**
	 * 전체 데이터 반환
	 */
	$.getAllRows = function() {
		try {
			var res = null;
			
			if ($.isTreeGrid) {
				var ds = $.extObj.data.pull;
				res = [];
				for (i in ds) {
					res.push(ds[i]);
				}
			} else {
				res = $.extObj.serialize();
			}
			
			// 반환 전 처리
			for (var i = 0; i < res.length; i++) {
				var item = res[i];
				var keys = Object.keys(item);
				
				for (var j in keys) {
					var k = keys[j];
					if (item[k] === 'EMPTY_RICHSELECT_VALUE') {
						item[k] = '';
					}
				}
			}
			return res;
			
		} catch (err) {
			console.log('FingerDataGrid getAllRows() : ' + err.message);
		}
	};	

	/**
	 * 그리드 총 Row 수 (숨겨진 행 포함)
	 */
	$.getRowCount = function() {
		try {
			if ($.isTreeGrid) {
				var ds = $.extObj.data.pull;
				return Object.keys(ds).length;
			} else {
				return $.extObj.count();
			}
		} catch (err) {
			console.log('FingerDataGrid getRowCount() : ' + err.message);
		}
	};

	/**
	 * Unique Row ID 반환
	 */
	$.getRowId = function(index) {
		return $.getIdByIndex(index);
	};
	
	/**
	 * 행 선택 위치 이동
	 */
	$.moveSelection = function(position) {
		// up, down, left, right
		$.extObj.moveSelection(position);
		
		var rowId = $.getSelectedRowIdx();
		$.selectRow(rowId);
	};

	/**
	 * 행 선택 및 해당 위치로 이동
	 */
	$.selectRow = function(rowId, isCallEvent, col) {
		try {
			if (String(rowId).length != 13) {
				rowId = $.getIdByIndex(rowId);
			}
			if (rowId) {
				if ($.isTreeGrid) {
					$.extObj.open($.extObj.getParentId(rowId), true);
				}
				var bo = (col === undefined ? false : col);
				$.extObj.select(rowId, bo);
				$.extObj.showItem(rowId);
				
				isCallEvent = (isCallEvent === undefined ? true : isCallEvent);
				
				// 행 클릭 이벤트 발생
				if (isCallEvent) {
					$.onItemClick({'row':rowId});
				}
			}
		} catch (err) {
			console.log('FingerDataGrid selectRow() : ' + err.message);
		}
	};
	
	/**
	 * 그리드의 선택된 Row가 있을시 선택 해제
	 */
	$.clearSelect = function() {
		var rId = $.getSelectedRowIdx();
		
		if (rId)
			$.extObj.unselect(rId);
	};
	
	/**
	 * 트리 오픈 (TreeGrid 전용)
	 */
	$.openNode = function(value, isKeyVal) {
		try {
			if (value === undefined || value == null) {
				console.log('FingerDataGrid openNode() : 첫번째 파라메터로 노드 레벨(또는 트리Key값)이 입력되어야 합니다.');
				return;
			}

			if ($.isTreeGrid) {
				var data = $.getAllRows();

				if (value == 'all') {
					$.extObj.openAll();
				}
				else if (isKeyVal === true) {
					var keyId = $.treeKey.id;
					if (keyId) {
						// KeyID 값으로 선택시
						for (var i = 0; i < data.length; i++) {
							if (data[i][keyId] == value) {
								$.extObj.open(data[i].id, true);
							}
						}
					}
				}
				else {
					// 노드 레벨일 때
					for (var i = 0; i < data.length; i++) {
						if (data[i].$level == value) {
							$.extObj.open($.extObj.getParentId(data[i].id), true);
						}
					}
				}
			} else {
				console.log('FingerDataGrid openNode() : 이 함수는 TreeGrid일때만 사용 가능 합니다.');
				return;
			}
		} catch (err) {
			console.log('FingerDataGrid openNode() : ' + err.message);
		}
	};
	
	/**
	 * 행 내용 입력
	 */
	$.setValue = function(rowId, column, value) {
		try {
			if (String(rowId).length != 13) {
				rowId = $.getIdByIndex(rowId);
			}
			var row = $.getItem(rowId);
			if (row[column] != value) {
				row.rowType = (row.rowType || 'U');
			}
			row[column] = value;
			
			$.extObj.updateItem(rowId, row);
		} catch (err) {
			console.log('FingerDataGrid setValue() : ' + err.message);
		}
	};
	
	/**
	 * 컬럼 숨기기
	 */
	$.setColumnHidden = function(columns, type) {
		if (typeof columns === 'string') {
			if (type === true) {
				$.extObj.hideColumn(columns);
			} else {
				$.extObj.showColumn(columns);
			}
		} else if (typeof columns === 'object') {
			for (var i = 0; i < columns.length; i++) {
				if (type === true) {
					$.extObj.hideColumn(columns[i]);
				} else {
					$.extObj.showColumn(columns[i]);
				}
			}
		}
		
		$.extObj.refreshColumns();
	};

	/**
	 * 값이 일치하는 행 반환
	 */
	$.getGridRowIndex = function(colName, value, startIndex) {
		var row = -1;
		var i = startIndex || 0;
		
		var length = $.getRowCount();
		
		for (; i < length; i++) {
			if ($.getItem($.getIdByIndex(i))[colName] == value) {
				row = i;
				break;
			}
		}
		return row;
	};
	
	/**
	 * 그리드 행 위치변경 (Up)
	 */
	$.moveUp = function(rowId, step) {
		$.extObj.moveUp(rowId, (step || 1));
	};
	
	/**
	 * 그리드 행 위치변경 (Down)
	 */
	$.moveDown = function(rowId, step) {
		$.extObj.moveDown(rowId, (step || 1));
	};
	
	/**
	 * 여러 행 추가
	 */
	$.addRows = function(values, index, type) {
		try {
			for (var i = 0; i < values.length; i++) {
				$.addRow(values[i], index, type ? true : false);
			}
		} catch (err) {
			console.log('FingerDataGrid addRows() : ' + err.message);
		}
	};

	/**
	 * 행 추가
	 */
	$.addRow = function(values, index, type) {
		try {
			var data = values || {};
			data.rowType = 'N';

			if (index !== undefined && index != null) {
				var rId = $.extObj.add(data, index);
			} else {
				if ($.getSelectedRowIdx()) {
					var rId = $.extObj.add(data, $.extObj.getIndexById($.getSelectedRowIdx()) + 1);
				} else {
					var rId = $.extObj.add(data);
				}
			}			
			if (!type)	$.selectRow(rId);
			return rId;
			
		} catch (err) {
			console.log('FingerDataGrid addRow() : ' + err.message);
		}
	};
	
	/**
	 * 그리드 편집 중지
	 */
	$.editStop = function() {
		$.extObj.editStop();
	};
	
	/**
	 * editStop 은 편집 중인 데이터를 반영 후 편집중지
	 * editCancel 은 편집 중인 데이터를 반영하지 않음
	 */
	$.editCancel = function() {
		$.extObj.editCancel();
	};
	
	/**
	 * Row 삭제
	 */
	$.deleteRow = function(rowId) {
		try {
			// 셀 수정중인 경우 취소
			$.editCancel();
			// 커서 행을 한칸 위로
			$.moveSelection('up');
			// 해당 행 제거
			$.extObj.remove(rowId);
		} catch (err) {
			console.log('FingerDataGrid deleteRow() : ' + err.message);
		}
	};
	
	/**
	 * 현재 선택된 Row 삭제
	 */
	$.deleteCurrentRow = function() {
		try {
			var rowId = $.getSelectedRowIdx();
			if (!rowId) return;

			$.deleteRow(rowId);
		} catch (err) {
			console.log('FingerDataGrid deleteCurrentRow() : ' + err.message);
		}
	};
	
	/**
	 * 등록('N'), 수정('U')된 Row 반환
	 */
	$.getChangedRows = function(type) {
		var rows = $.extObj.serialize();
		var updRows = [];
		for (var i = 0; i < rows.length; i++) {
			if (rows[i].rowType) {
				updRows.push(rows[i]);
			}
		}
		return updRows;
	};
	
	/**
	 * 그리드 엑셀 Rows 데이터 조회
	 * 2016.08.25 이준혁 생성
	 */
	$.getExcelRows = function() {
		try {
			var rows = $.extObj.serialize();
			for (var i = 0; i < rows.length; i++) {
				var keyLen = Object.keys(rows[i]).length;	
				for (var j = 0; j < keyLen; j++) {
					var key = Object.keys(rows[i])[j];
					if (!rows[i][key]) continue; 
					//rows[i][key] = String(rows[i][key]).replace(/<br>|<br\/>/gi, "\r\n");
					rows[i][key] = String(rows[i][key]).replace(/<br>|<br\/>/gi, "<br style='mso-data-placement: same-cell'>");
				}
			}
			return rows;
		} catch (err) {
			console.log('FingerDataGrid getExcelRows() : ' + err.message);
		}
	};
	
	$.getSelectedRowIdx = function() {
		try {
			return $.extObj.getSelectedId();
		} catch (err) {
			console.log('FingerDataGrid getSelectedRowIdx() : ' + err.message);
		}
	};
	
	$.getSelectedItem = function() {
		try {
			return $.extObj.getSelectedItem();
		} catch (err) {
			console.log('FingerDataGrid getSelectedItem() : ' + err.message);
		}
	};
	
	$.resetColumns = function(columns) {
		try {
			if (!columns || columns.length == 0) {
				log('FingerDataGrid resetColumns() : 새로 지정할 컬럼셋을 입력해야 합니다. 단순히 컬럼을 비우려는 경우 removeColumns()로 실행해 주세요.');
				return;
			}
			// 컬럼셋 교체
			$.setColumns(columns);
			// 컬럼 기본설정 변경
			$.initColumns();
			
			$.extObj.config.columns = $.columns;
			$.extObj.refreshColumns();
			
		} catch (err) {
			console.log('FingerDataGrid resetColumns() : ' + err.message);
		}
	};
	
	$.removeColumns = function(startIdx) {
		try {
			if (startIdx === undefined) { startIdx = 0; }
			
			var columns = webix.toArray($.extObj.config.columns);
			var endLoop = (columns.length - startIdx);

			for (var i = 0; i < endLoop; i++) {
				columns.removeAt(startIdx);
			}
			
			$.extObj.refreshColumns();
			
		} catch (err) {
			log('FingerDataGrid removeColumn() : ' + err.message);
		}		
	};
	
	/**
	 * 선택된 row의 type 조회
	 * 2016.08.25 이준혁 생성
	 */
	$.getRowStatus = function(rId) {
		try {
			var row = $.getItem(rId);
			return row.rowType || 'U';
		} catch (err) {
			console.log('FingerDataGrid getRowStatus() : ' + err.message);
		}
	};
	
	/**
	 * 컬럼 콤보박스 바인딩
	 */
	$.setColumnDropDownList = function(col, ds, prop, emptyrow) {
		var list = [];
		
		if (!prop) {
			prop = {key:'sub_code', name:'code_name'};
		}
		
		if (emptyrow) {
			list.push({ id:'EMPTY_RICHSELECT_VALUE', value:'' });
		}
		if (!ds) {
			return;
		}
		for (var i = 0; i < ds.length; i++) {
			list.push({ id:ds[i][prop.key], value:ds[i][prop.name] });
		}
		
		var column = $.extObj.getColumnConfig(col);
		column.editor = "richselect";
		column.dataset = list;
		if (column.collection) {
			column.collection.clearAll();
			column.collection.parse(list);
		}
		else {
			column.collection = list;
		}
		/*
		column.suggest = {
			template:'#value#',
			body: {
				on: {
					'onItemClick': function(id) {
						console.log('onItemClick : ' + id);
					},
					'onBeforeRender': function(data) {
						console.log(data);
					}
				}
			}
		};
		*/
		$.extObj.refreshColumns();
	};
	
	$.setColumnDropDownListFilter = function(col, ds, prop, filterValueArr, filterColumn) {
		var list = [];
		
		if (!prop) {
			prop = {key:'sub_code', name:'code_name', extra : filterColumn };
		}
		for (var i = 0; i < ds.length; i++) {
			for (var j = 0; j < filterValueArr.length; j++) {
				if(ds[i][prop.extra] == filterValueArr[j]) list.push({ id:ds[i][prop.key], value:ds[i][prop.name] });
			}
		}
		var column = $.extObj.getColumnConfig(col);
		column.editor = "combo";
		column.collection = list;
		
		$.extObj.refreshColumns();
	};

	$.setColumnText = function(id, text, headerLine) {
		try {
			var col = $.extObj.getColumnConfig(id);
			var line = (headerLine ? headerLine - 1 : 0);
			
			col.header[line].text = text;	
			$.extObj.refreshColumns();
		} catch (err) {
			console.log('FingerDataGrid setColumnText() : ' + err.message);
		}
	};
	
	$.getColumnText = function(id, headerLine) {
		try {
			var col = $.extObj.getColumnConfig(id);
			var line = (headerLine ? headerLine - 1 : 0);
			
			var text = col.header[line].text;
			
			return text;
		} catch (err) {
			console.log('FingerDataGrid getColumnText() : ' + err.message);
		}
	};
	
	$.setColumnHeaderColor = function(id, cssClassName, headerLine) {
		try {
			var col = $.extObj.getColumnConfig(id);
			var line = (headerLine ? headerLine - 1 : 0);
			
			col.header[line].css = cssClassName;	
			$.extObj.refreshColumns();
		} catch (err) {
			console.log('FingerDataGrid setColumnHeaderColor() : ' + err.message);
		}
	};
	
	/**
	 * checkbox 컬럼이 true 또는 false인 값만 가져오기
	 */
	$.getCheckedRows = function(colId, bo) {
		bo = bo || true;
		var rows = $.getAllRows();
		var chkRows = [];
		var val = bo == true ? 'Y' : 'N';
		
		for (var i = 0; i < rows.length; i++) {
			if (rows[i][colId] == val || rows[i][colId] == bo) {
				rows[i].CHECKYN = val;
				chkRows.push(rows[i]);
			}
		}
		return chkRows;
	};
	
	/**
	 * 다음 행의 데이터를 반환
	 */
	$.nextRowData = function(rId) {
		try {
			var rows = $.getAllRows();
			for (var i = 0; i < rows.length; i++) {
				if (rows[i].id == rId) {
					return rows[(i + 1)];
				}
			}
		} catch (err) {
			console.log('FingerDataGrid nextRowData() : ' + err.message);
		}
	};
	
	/**
	 * 이전 행의 데이터를 반환
	 */
	$.beforeRowData = function(rId) {
		try {
			var rows = $.getAllRows();
			for (var i = 0; i < rows.length; i++) {
				if (rows[i].id == rId) {
					return rows[(i - 1)];
				}
			}
		} catch (err) {
			console.log('FingerDataGrid beforeRowData() : ' + err.message);
		}
	};
	
	/**
	 * TreeGrid 전용 API
	 */	
	
	// 자식 노드를 가지고 있는지 여부
	$.isBranch = function(rId) {
		return $.extObj.isBranch(rId);
	};
	
	// 부모 노드 Id를 반환
	$.getParentId = function(rId) {
		return $.extObj.getParentId(rId);
	};
	
	/**
	 * TreeGrid 전용 End.
	 */
	
	/**
	 * Cell RowSpan
	 */
	$.setRowSpan = function(cols, css) {
		if (!$.extObj.config.spans) {
			$.extObj.define('spans', true);
		}
		
		var colName = null;
		if (typeof cols === 'string') {
			colName = cols;
			addRowSpan(colName, css);
		}
		else if (Array.isArray(cols)) {
			for (var i in cols) {
				colName = cols[i];
				addRowSpan(colName, css);
			}
		}
		// refresh
		$.extObj.refresh();
		
		function addRowSpan(colName, css) {
			var rowSpanCnt = 1;
			var rId = '';
			for (var i = 0; i < $.getRowCount(); i++) {
				if (rId === '') {
					rId = $.getValue(i).id;
				}
				
				//if ((i + 1) == $.getRowCount()) { break; }
				
				if ($.getValue(i + 1)) {
					if ($.getValue(i)[colName] === $.getValue(i + 1)[colName]) {
						rowSpanCnt++;
					}
					else {
						if (rowSpanCnt > 1) {
							$.addSpan(rId, colName, 1, rowSpanCnt, null, css ? css : null);
							rowSpanCnt = 1;
						}
						rId = '';
					}
				}
			}
			
			if (rowSpanCnt > 1) {
				$.addSpan(rId, colName, 1, rowSpanCnt, null, css ? css : null);
			}
		}
	};
	
	/**
	 * Cell RowSpan Custom
	 * 조회 쿼리 작성시 RowSpan을 적용하려는 각 컬럼에 데이터들의 ROW_NUMBER()와 COUNT(*)를 구한 후 (* MS-SQL 기준)
	 * 아래와 같이 컬럼을 추가해서 조회한다.
	 * 1. ROW_NUMBER()는 컬럼 + '_rowspan'
	 * 2. COUNT(*)는 컬럼 + '_num'
	 * ex) 
	 * RowSpan을 적용하려는 컬럼이 strategy 라고 한다면 조회 쿼리 작성시
	 * strategy, strategy_rowspan, strategy_num
	 * 이런식으로 각 컬럼마다 컬럼, 컬럼_rowspan, 컬럼_num을 붙여서 조회한다 
	 */
	$.setRowSpanCustom = function(cols, css) {
		if (!$.extObj.config.spans) {
			$.extObj.define('spans', true);
		}
		
		var colName = null;
		if (typeof cols === 'string') {
			colName = cols;
			addRowSpan(colName, css);
		}
		else if (Array.isArray(cols)) {
			for (var i in cols) {
				colName = cols[i];
				addRowSpan(colName, css);
			}
		}
		// refresh
		$.extObj.refresh();
		
		function addRowSpan(colName, css) {
			var rowSpanCnt = 1;
			var rId = '';
			var rowData = [];
			
			for (var i = 0; i < $.getRowCount(); i++) {
				rowData = $.getValue(i);
				rId = rowData.id;
				
				if (rowData[colName + '_num'] && rowData[colName + '_num'] == 1) {
					var rowSpanCnt = 1;
					
					if (rowData[colName + '_rowspan']) {
						rowSpanCnt = rowData[colName + '_rowspan'];
					}
					
					$.addSpan(rId, colName, 1, rowSpanCnt, null, css ? css : null);
				}
			}
		}
	};
	
	$.setRowSpanCustomModify = function(cols, css, dt) {
		if (!$.extObj.config.spans) {
			$.extObj.define('spans', true);
		}
		
		var colName = null;
		if (typeof cols === 'string') {
			colName = cols;
			addRowSpan(colName, css);
		}
		else if (Array.isArray(cols)) {
			for (var i in cols) {
				colName = cols[i];
				addRowSpan(colName, css);
			}
		}
		// refresh
		$.extObj.refresh();
		
		function addRowSpan(colName, css) {
			var rowSpanCnt = 1;
			var rId = '';
			var rowData = [];
						
			for (var i = 0; i < dt.length; i++) {
				rowData = $.getValue(i);
				rId = rowData.id;
				data = dt[i];
				
				if (data[colName + '_num'] && data[colName + '_num'] == 1) {
					var rowSpanCnt = 1;
					
					if (data[colName + '_rowspan']) {
						rowSpanCnt = data[colName + '_rowspan'];
					}
					
					$.addSpan(rId, colName, 1, rowSpanCnt, null, css ? css : null);
				}
			}
		}
	};
	
	/**
	 * Cell ColSpan
	 */	
	$.addSpan = function(rId, colName, colSpancnt, rowSpanCnt, value, css) {
		if (!$.extObj.config.spans) {
			$.extObj.define('spans', true);
		}
		$.extObj.addSpan(rId, colName, colSpancnt, rowSpanCnt, value, css);
	};
	
	/**
	 * Cell 개별 스타일 적용
	 * setCellStyle(1432426752765, 'contact_name', {'color':'red'});
	 */
	$.setCellStyle = function(rId, colName, obj){
		if(!$.getValue(rId)['$cellCss']){
			$.getValue(rId)['$cellCss'] = {};
		}
		
		if(!$.getValue(rId)['$cellCss'][colName]){
			$.getValue(rId)['$cellCss'][colName] = {};
		}
		
		for(var key in obj){
			$.getValue(rId)['$cellCss'][colName][key] = obj[key];
		}
	};
	
	$.getGridIndexById = function(rId)	{
		var rowId = (rId ? rId : $.getSelectedRowIdx());
		return $.extObj.getIndexById(rowId) + 1;
	};
	
	$.getGridRealId = function() {
		return $.id;
	};
	
	$.setGridMultiLineAutoHeight = function() {
		$.isAutoMultilineHeight = true;
	};
	
	// 그리드 초기 설정시 체크박스를 추가할 컬럼 이름을  {content: 'masterCheckbox', contentId: 'checkAll'} contentId를 추가로 설정
	$.setCheckbox = function(contentId, bo) {
		var control = $.extObj.getHeaderContent(contentId);
		if (bo) {
			control.check();
		} else {
			control.uncheck();
		}
	};
	
	$.getAllCheckbox = function(contentId) {
		var state = $.extObj.getHeaderContent(contentId).isChecked();
		return state;
	};
}

// 컬럼 Link 클릭시 호출
function fingerDataGridSetCellLinkEvent(el) {
	g_currentModule.fingerdatagrid_celllink_click(el, jQuery(el).attr('gridId'), jQuery(el).attr('rowId'), jQuery(el).attr('col'), jQuery(el).attr('value'));
};

FingerDataGrid.prototype.getType = function() {
	return 'DataGrid';
}

FingerDataGrid.prototype.setProperty = function(x, y, width, height) {
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

FingerDataGrid.prototype.setSize = function(width, height) {
	var e = document.getElementById(this.id);
	if (width) {
		this.width = width;
		e.style.width = width + 'px';
		this.extObj.define("width", width);
	}
	if (height) {
		this.height = height;
		e.style.height = height + 'px';
		this.extObj.define("height", height);
	}
	this.extObj.resize();
}

FingerDataGrid.prototype.setBorder = function(value) {
	var selector = jQuery(this.ids);
	selector.find('.webix_view.webix_dtable').css('border-width', '0px');	
	
	if (value) {
		selector.find('.webix_view.webix_dtable').css('border-width', '1px');
	}
	else {
		selector.find('.webix_view.webix_dtable').css('border-width', '0px');
	}
}

FingerDataGrid.prototype.setVisible = function(visible) {
    var e = document.getElementById(this.id);

    if (visible == true)
        e.style.visibility = 'visible';
    else
        e.style.visibility = 'hidden';
        
    delete e;
}

FingerDataGrid.prototype.setStyle = function(styleAttr, value)
{
	var selector = jQuery(this.ids);
	selector.find('.webix_view.webix_dtable').css(styleAttr, value);
}

FingerDataGrid.prototype.setEvenRowStyle = function(styleAttr, value) {
	var selector = jQuery(this.ids);
	selector.find('.webix_column > div:nth-child(even)').css(styleAttr, value);
}

FingerDataGrid.prototype.setSelectRowStyle = function(styleAttr, value) {
	var selector = jQuery(this.ids);
	selector.find('.webix_column > div.webix_cell_select').css(styleAttr, value);
}