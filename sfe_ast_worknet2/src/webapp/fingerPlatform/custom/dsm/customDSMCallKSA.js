function CustomDSMCallKSA(host, dispView, bindEvents) {
	var $ = this;
	$.dispId = dispView ? dispView.id : null;
	$.dispView = dispView;
	$.extObj = jQuery(('#' + $.dispId));
	$.bindEvents = bindEvents;
	
	$.load = function() {
		$.extObj.load('./fingerPlatform/custom/dsm/customDSMCallKSA.html', function() { 
			$.onEvent(); 
		});
	};
	
	$.onEvent = function() {
		if ($.bindEvents) {
			if ($.bindEvents.onCallLinkClick) {
				$.extObj.find('.call-result').on('click', $.bindEvents.onCallLinkClick);
			}
		}
	};
	
	$.setVisible = function(id, val) {
		$.extObj.find('#' + id).css('display', val);
	};
	
	$.getHeight = function() {
		return $.extObj.find('.ksa-call-cov').height();
	};
				
	$.chart = {
		cateFullNmeArr: ['KCM customer', 'Target customer', '실행call customer'],
		cateNmeArr: ['KCM', 'Target', '실행<br>call'],
		columnOptions: createHighChartProperties({
			title : {
				text: null
			},			
			xAxis : { categories : [], label: { enabled: true } },
			credits: { enabled: false },
			series: [],
			tooltip : {
				style: {
					fontWeight: 'bold',
					fontSize: '14px'
				}
			},
			legend : {
				enabled: true
			}
		}),
		create: function(id, options) {
			var opt = this.columnOptions;

			if (opt) {
				jQuery('#' + id).highcharts(Highcharts.merge(opt, options));
			}
		},
		destroy: function(id) {
			if (jQuery('#' + id).highcharts()) {
				jQuery('#' + id).highcharts().destroy();
			}
		},
		getChartId: function(type) {
			var id = '';
			switch(type) {
				case '10':
					id = 'ksaTeamAllCallActivity';
					break;
				case '20':
					id = 'ksaTeamDetailCallActivity';
					break;
				case '30':
					id = 'ksaTeamJasaProductCallActivity';
					break;
				case '40':
					id = 'ksaTeamSympCallActivity';
					break;
				case '50':
					id = 'ksaDeptAllCallActivity';
					break;
				case '60':
					id = 'ksaDeptDetailCallActivity';
					break;
				case '70':
					id = 'ksaDeptJasaProductCallActivity';
					break;
				case '80':
					id = 'ksaDeptSympCallActivity';
					break;
				case '90':
					id = 'ksaRecent1year';
					break;
				default: 
					break;
			}
			
			return id;
		},
		getColors: function(type) {
			var colorArr = [];
			switch(type) {
				case 'ALL':
					colorArr = ['#B5A1DB', '#57B0EC', '#FFB884', '#D67A7F', '#94706D'];
					break;
				case 'DETAIL':
					colorArr = ['#c3d6e8', '#9dbfe0', '#73a3d2', '#2962FF'];
					break;
				case 'JASA':
					colorArr = ['#FFC107', '#FF9800', '#FF5722'];
					break;
				case 'SYMP':
					colorArr = ['#9E9E9E', '#795548'];
					break;
				default:
					break;
			}
			
			return colorArr;
		},
		ksaPieChart: function(data, type, gubun, chartId) {
			var id = (chartId ? chartId : this.getChartId(type));
			this.destroy(id);
			
			if (!data.length) {
				return;
			}
			
			var dataArr = [];
			var arrSeries = [];
			var sympSum = 0;
			var callName = '';
			
			for (var i = 0; i < data.length ;i++) {
				var rowData = data[i];
				
				if (rowData.call_kind == '40' || rowData.call_kind == '50') {
					sympSum += rowData.call_cnt;
					
					if (rowData.call_kind == '50') {
						dataArr.push({
							name: '심포지엄',
							fullName: '심포지엄',
							y: sympSum,
							color: this.getColors('ALL')[4]
						});
					}
				} else {
					callName = '';
					
					/*if (rowData.call_kind == '10') {
						callName = '자사제품<br>설명회';
					} else if (rowData.call_kind == '30') {
						callName = '정보수집<br>전달';
					} else {
						callName = rowData.call_kind_name;
					}	*/				
					callName = rowData.call_kind_name;
					dataArr.push({
						name: callName,
						fullName: rowData.call_kind_name,
						y: rowData.call_cnt,
						color: this.getColors(gubun)[i]
					});
				}
			}
			
			arrSeries.push({name: '', data: dataArr});
			var options = {
				chart: {
					type: 'pie',
					width: (type == '100' ? 282 : 380),
					height: (type == '100' ? 282 : 380)
				},
				tooltip: {
					formatter: function() {
						var str = '';
						str += this.point.fullName + ' : ' + this.y + 'call';
						
						return str;
					}
				},
				plotOptions: {
			        pie: {
			        	size: '95%',
			        	allowPointSelect: true,
			            cursor: 'pointer',
			            borderWidth: 3,
			            dataLabels: {
			                enabled: true,
			                format: '<b>{point.percentage:.1f} %</b>',
			                distance: -25,
			                filter: {
			                    property: 'percentage',
			                    operator: '>',
			                    value: 5
			                },
			                style: {
			                	fontSize: '12px',
			                	color: 'white'
			                }
			            },
			            showInLegend: true
			        }
			    },
				legend : {
					align: 'center',
					verticalAlign: 'bottom',
					//width: 375,
					itemStyle: {
						fontSize: '8px'
					}
				},
				series : arrSeries
			};
			
			this.create(id, options);
		},
		ksaBarChart: function(data, type, gubun) {
			var id = this.getChartId(type);
			this.destroy(id);
			
			if (!data.length) {
				return;
			}
			
			var cateArr = [];
			var arrSeries = [], dataArr = [];
			var beforeRow = data[0];
			var iCount = 0;
			data.push(data[data.length - 1]);
			
			for (var i = 0; i < data.length; i++) {
				var rowData = data[i];
				
				if (beforeRow.call_kind != rowData.call_kind || i == data.length - 1)
				{
					arrSeries.push({
						type: 'column', 
						name: beforeRow.call_kind_name,
						color: this.getColors(gubun)[iCount],
						data: dataArr
					});
					
					iCount++;
					dataArr = [];
					beforeRow = rowData;
				}
				
				dataArr.push({y: rowData.call_cnt || 0, callName: rowData.call_kind_name});
			}
			
			var options = {
				chart: {
					width: 230,
					height: 380
				},
				xAxis : { categories : cateArr },
				yAxis: 
				{
					min: 0,
					max: 100,
					title: { text: null },
					labels: { format: '{value:.,0f}%' },
					stackLabels: {
						enabled: true,
			            style: {
			                fontWeight: 'bold',
			                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
			            }
					}
				},
				tooltip: {
					shared: true,
					formatter: function() {
						var points = this.points;
						var str = '<span>';
						
						for (var i = 0; i < points.length; i++) {
							var rowData = points[i].point;
							str += rowData.callName + ' : ' + $.getNumberComma(rowData.y) + 'call';
							str += '<br>';
						}
						str += '</span>';
						return str;
					}
				},
				plotOptions: { 
					column: { 
						stacking: 'percent', 
						dataLabels: { 
							enabled: true, 
							style: { fontWeight: 'bold', color: 'white' }, 
							formatter: function() { 
								if (this.percentage != 0) return this.percentage.toFixed(1) + '%'; 
							} 
						} 
					}
				},
				legend : {
					verticalAlign: 'bottom',
					enabled: true
				},
				series : arrSeries
			};
			
			this.create(id, options);
		},
		keyStackChart: function(data, type, gubun, chartId) {
			var id = chartId;
			this.destroy(id);
			
			if (!data.length) {
				return;
			}
			
			var cateArr = [''];
			var maxCall = 0;
			var arrSeries = [];
			
			for (var i = 0; i < data.length; i++) {
				var rowData = data[i];
				
				arrSeries.push({
					name: rowData.call_kind_name, 
					data: [{y: rowData.call_cnt, callName: rowData.call_kind_name}],
					color: this.getColors(gubun)[i]
				});				
			}
		
			var options = {
				chart: {
					type: 'bar',
					width: 270,
					height: (gubun == 'DETAIL' ? 167 : 147)
				},
				xAxis : { categories : [] },
				yAxis: 
				{
					min: 0,
					title: { text: null },
					labels: { enabled: false }
				},
				tooltip: {
					shared: true,
					formatter: function() {
						var points = this.points;
						var str = '<span>';
						
						for (var i = 0; i < points.length; i++) {
							var rowData = points[i].point;
							str += rowData.callName + ' : ' + $.getNumberComma(rowData.y) + 'call';
							str += '<br>';
						}
						str += '</span>';
						return str;
					}
				},
				plotOptions: {
					series : 
					{
						stacking: 'percent', 
						dataLabels: { 
							enabled: true, 
							style: { fontWeight: 'bold', color: 'white' }, 
							formatter: function() { 
								if (this.percentage != 0) return this.percentage.toFixed(1) + '%'; 
							} 
						} 
					}
				},
				legend : {
					/*layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle',*/
					verticalAlign: 'bottom',
					itemStyle: {fontSize: '8px'}
				},
				series : arrSeries
			};
			
			this.create(id, options);
		},
		mrCallActivityBox: function(callKindGroupArr) {
			var id = jQuery('#mrCallActivityBox');
			var tag = '';
			
			if (callKindGroupArr.length) {
				var beforeRow = callKindGroupArr[0];
				var totGroupArr = [];
				var empGroupArr = [];
				var iCount = 0;
				var tag = '';
				tag += "<div class='d-box'>";
				callKindGroupArr.push(callKindGroupArr[callKindGroupArr.length - 1]);
						
				for (var i = 0; i < callKindGroupArr.length; i++) {
					var rowData = callKindGroupArr[i];
					
					if (beforeRow.code != rowData.code || i == callKindGroupArr.length - 1) {
						totGroupArr.push(empGroupArr);
						
						if (iCount % 4 == 0 && iCount > 0) {
							tag += "</div>";
							tag += "<div class='d-box mt10'>";
						}
						
						tag += this.getBoxTag(empGroupArr, iCount + 1);
						
						beforeRow = rowData;
						empGroupArr = [];
						iCount++;
					}
					
					empGroupArr.push(rowData);
				}
				
				var addCnt = 4 - (iCount % 4);
				
				if (addCnt < 4) {
					for (var i = 0; i < addCnt; i++) {
						tag += "<div class='inner-box' style='margin: 0; height: 954px;'></div>";
					}
				}
				
				tag += "</div>";
			} else {
				tag += "<div class='d-box'>";
				tag += "<div class='inner-box' style='height: 954px;'></div>";
				tag += "</div>";
			}
			
			$.extObj.find('#mrCallActivityBox').html(tag);
		},
		getBoxTag: function(data, index) {
			var tag = '';
			tag += '<div class="inner-box" style="margin: 0; border-right: 1px solid #dfe5ec;"> \
						<p class="chart-title mb10">' + data[0].name + '</p> \
						<div id="mrCallActivityPieChart' + index + '" class="chart-area" style="height: 290px;"></div> \
						<div class="mt20 chart-area" style="height: 200px;"> \
							<i class="fas fa-angle-right"></i><label class="detail-txt">Detail</label> \
		        			<div id="mrCallActivityDetailBarChart' + index + '" class="mt5 chart-area" style="width: 280px; height: 170px;"></div> \
						</div> \
						<div class="mt20 chart-area" style="height: 180px;"> \
		        			<i class="fas fa-angle-right"></i><label class="detail-txt">자사제품</label> \
							<div id="mrCallActivityJasaBarChart' + index + '" class="mt5 chart-area" style="width: 280px; height: 150px;"></div> \
						</div> \
						<div class="mt20 chart-area" style="height: 180px;"> \
							<i class="fas fa-angle-right"></i><label class="detail-txt">심포지엄</label> \
							<div id="mrCallActivitySympBarChart' + index + '" class="mt5 chart-area" style="width: 280px; height: 150px;"></div> \
						</div> \
					</div>'
			;
			
			return tag;
		},
		mrCallActivityPieChart: function(callKindGroupArr, type, gubun) {
			if (!callKindGroupArr.length) {
				return;
			}
			
			var beforeRow = callKindGroupArr[0];
			var empGroupArr = [];
			var iCount = 0;
			var tag = '';
			var chartId = '';
			
			callKindGroupArr.push(callKindGroupArr[callKindGroupArr.length - 1]);
					
			for (var i = 0; i < callKindGroupArr.length; i++) {
				var rowData = callKindGroupArr[i];
				
				if (rowData.call_kind == '10') {
					rowData.call_kind_name = '정보수집';
				} else if (rowData.call_kind == '30') {
					rowData.call_kind_name = '자사제품';
				}
				
				if (beforeRow.code != rowData.code || i == callKindGroupArr.length - 1) {
					chartId = "mrCallActivityPieChart" + (iCount + 1);
					this.ksaPieChart(empGroupArr, type, gubun, chartId);
					
					beforeRow = rowData;
					empGroupArr = [];
					iCount++;
				}
				
				empGroupArr.push(rowData);
			}
		},
		mrCallActivityBatChart: function(callKindDetailArr, type) {
			if (!callKindDetailArr.length) {
				return;
			}
			
			var beforeRow = callKindDetailArr[0];
			var detailData = [];
			var jasaData = [];
			var sympData = [];
			var iCount = 0;
			var tag = '';
			var chartId = '';
			
			callKindDetailArr.push(callKindDetailArr[callKindDetailArr.length - 1]);
					
			for (var i = 0; i < callKindDetailArr.length; i++) {
				var rowData = callKindDetailArr[i];
				
				if (beforeRow.code != rowData.code || i == callKindDetailArr.length - 1) {
					chartId = "mrCallActivityPieChart" + (iCount + 1);
					
					this.keyStackChart(detailData, '20', 'DETAIL', 'mrCallActivityDetailBarChart' + (iCount + 1));
					this.keyStackChart(jasaData, '30', 'JASA', 'mrCallActivityJasaBarChart' + (iCount + 1));
					this.keyStackChart(sympData, '40', 'SYMP', 'mrCallActivitySympBarChart' + (iCount + 1));
					
					detailData = [];
					jasaData = [];
					sympData = [];
					
					iCount++;
					beforeRow = rowData;
				}
				
				if (rowData.call_kind.indexOf('20') > -1) {
					detailData.push(rowData);
				} else if (rowData.call_kind.indexOf('30') > -1) {
					jasaData.push(rowData);
				} else {
					var callKindName = '';
					callKindName = (rowData.call_kind == '40' ? '초청' : 'F/U');
					rowData.call_kind_name = callKindName;
					sympData.push(rowData);
				}
			}			
		},
		// Key Sales Activity 최근 1년
		ksaRecentChart: function(data, type, gubun) {
			var id = this.getChartId(type);
			this.destroy(id);
						
			if (!data.length) {
				return;
			}
			
			// 카테고리
			var cateArr = [];
			var arrSeries = [], dataArr = [];
			var beforeRow = data[0];
			var iCount = 0;
			var yyyymm = data[0].yyyymm;
			
			data.push(data[data.length - 1]);
			
			for (var i = 0; i < data.length; i++)
			{
				var rowData = data[i];
				
				if (i < 12) {
					cateArr.push($.setFormatYm(rowData.yyyymm));
				}
				
				if (beforeRow.call_kind != rowData.call_kind || i == data.length - 1)
				{
					arrSeries.push({
						type: 'column',
						name: beforeRow.call_kind_name,
						color: this.getColors(gubun)[iCount],
						data: dataArr
					});
					
					iCount++;
					dataArr = [];
					beforeRow = rowData;
				}
				
				dataArr.push({y: rowData.call_cnt || 0, callName: rowData.call_kind_name});
			}
			
			// 차트 추가 옵션
			var options = {
				chart: {
					width: 1150,
					height: 490
				},
				xAxis : { 
					categories : cateArr,
				},
				yAxis :
				{
					min: 0,
					max: 100,
					title: { text: null },
					labels: { format: '{value:.,0f}%' },
					stackLabels: {
						enabled: true,
			            style: {
			                fontWeight: 'bold',
			                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
			            }
					}
				},
				tooltip : { 
					shared : true,
					formatter: function() {
						var points = this.points;
						var str = '<span>';
						
						for (var i = 0; i < points.length; i++) {
							var rowData = points[i].point;
							str += rowData.callName + ' : ' + $.getNumberComma(rowData.y) + 'call';
							str += '<br>';
						}
						str += '</span>';
						return str;
					}
				},
				plotOptions: { 
					column: { 
						stacking: 'percent', 
						dataLabels: { 
							enabled: true, 
							style: { fontWeight: 'bold', color: 'white' }, 
							formatter: function() { 
								if (this.percentage != 0) return this.percentage.toFixed(1) + '%'; 
							} 
						} 
					}
				},
				legend : {
					verticalAlign: 'top',
					enabled: true
				},
				series : arrSeries
			};
			
			this.create(id, options);
		}
	};
	
	$.setTitleLabel = function(deptType) {
		if (deptType) {
			$.extObj.find('.dept-title').text('MR별 Call Activity');
		} else {
			$.extObj.find('.dept-title').text('영업소별 Call Activity');
		}
	};
	
	$.setFormatYm = function(value) {
		return value.substr(2, 2) + '\'' + value.substr(4, 2);
	}
		
	$.getNumberComma = function(item) {
		var str = String(item);
		var split = str.split(".");
		if (split.length > 1) {
			return split[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + split[1]
		} else {
			return split[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		}
	};
	
	$.getHtml = function() {
		if ($.extObj) {
			return $.extObj.parent().html();
		}
	};
}