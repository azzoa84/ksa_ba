function CustomDSMBudget(host, dispView, viewType, bindEvents) {
	var $ = this;
	$.dispId = dispView ? dispView.id : null;
	$.dispView = dispView;
	$.viewType = viewType;
	$.extObj = jQuery(('#' + $.dispId));
	$.suffixStr = null;
	$.bindEvents = bindEvents;
	
	$.load = function() {
		$.extObj.load('./fingerPlatform/custom/dsm/customDSMBudget.html', function() {
			if ($.viewType == 'Team') {
				$.extObj.find('#budgetTeam').css('display', '');
				$.extObj.find('#budgetDept').css('display', 'none');
			} else {
				$.extObj.find('#budgetTeam').css('display', 'none');
				$.extObj.find('#budgetDept').css('display', '');
			}
			
			$.onEvent(); 
		});
	};
	
	$.onEvent = function() {
		if ($.bindEvents) {
			if ($.bindEvents.onBudgetPortalLinkClick) {
				$.extObj.find('.budget-portal').on('click', $.bindEvents.onBudgetPortalLinkClick);
			}
			
			if ($.bindEvents.onBudgetListLinkClick) {
				$.extObj.find('.budget-list').on('click', $.bindEvents.onBudgetListLinkClick);
			}
		}
	};
	
	$.setTitle = function(gubun) {
		var str = '';
		
		if (gubun == 'NOW') {
			str = '당월';
		} else {
			str = '반기 누적';
		}
		
		$.extObj.find('.main-txt-' + $.viewType).html(str);
	}
	
	$.getHeight = function() {
		return $.extObj.find('#budget' + $.viewType).height();
	}
	
	$.table = {
		width: null,
		columnCnt: null,
		getId : function(type) {
			var id = '';
			switch(type) {
				case '10':
					id = 'amBudgetBasicInfo';
					break;
				case '20':
					id = 'amBudgetTotInfo';
					break;
				case '30':
					id = 'mdBudgetBasicInfo';
					break;
				case '40':
					id = 'mdBudgetTotInfo';
					break;
				case '50':
					id = 'jasaBudgetBasicInfo';
					break;
				case '60':
					id = 'jasaBudgetTotInfo';
					break;
				case '70':
					id = 'amBudgetProductHeader';
					break;
				case '80':
					id = 'amBudgetProductBody';
					break;
				default: 
					break;
			}
			
			return id + $.viewType;
		},
		infoTable : function(data, type, perArr, gubun, emptyArr) {
			var id = this.getId(type);
			var tag = '';
			
			if (data.length) {
				var objData = Object.keys(data[0]);
				tag += '<tr>';
				
				for (var i = 0; i < objData.length; i++) {
					var rowObj = objData[i];
					
					tag += '<td>';
					
					if (gubun == 'CHK' && $.viewType == 'Dept' && emptyArr.indexOf(i) > -1) {
						tag += '<i class="fas fa-times"></i>';
					} else {
						tag += $.getNumberComma(data[0][rowObj] || 0);
						
						if (perArr.indexOf(i) > -1) {
							tag += '%';
						}
					}
					
					tag += '</td>';
				}
				
				tag += '</tr>';
			}
			
			$.extObj.find('#' + id).html(tag);
		},
		productTable : function(data, type) {
			var id = this.getId(type);
			var tag = '';
			
			if (data.length) {
				tag += '<tr>';
				
				for (var i = 0; i < data.length; i++) {
					var rowData = data[i];
					var chartId = rowData.code + rowData.product_code; 
					if (rowData.row_num == 1) {
						tag += (i != 0 ? '</tr>' : '');
						tag += (i != 0 ? '<tr>' : '');
						tag += '<td style="min-height: ' + this.width + 'px; width: 100px;">' + rowData.product_name + '</td>';
					}
					
					tag += '<td id="' + chartId + '" style="min-height: ' + this.width + 'px">';
					tag += '</td>';
				}
				
				tag += '</tr>';
			}
			
			$.extObj.find('#' + id).html(tag);
			
			for (var i = 0; i < data.length; i++) {
				var rowData = data[i];
				var chartId = rowData.code + rowData.product_code; 
				
				if (!rowData.half_plan_amt && !rowData.half_use_amt) {
					continue;
				}
				
				$.chart.pieChart(rowData, chartId, this.width, this.columnCnt, rowData.group_num);
			}
		},
		setHeader : function(data, type) {
			var id = this.getId(type);
			$.extObj.find('#' + id).html('');
			var tag = '';
			tag += '<tr>';
			tag += '<th style="width:100px;">품목</th>';
			
			for (var i = 0; i < data.length; i++) {
				var rowData = data[i];
				tag += '<th>';
				tag += rowData.name;
				tag += '</th>';
			}
			
			tag += '</tr>';
			$.extObj.find('#' + id).html(tag);
			this.width = 1008 / data.length;
			//this.width = $.extObj.find('#' + id).find('tr th:nth-child(2)').width();
			this.columnCnt = data.length;
		}
	}
				
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
				$.extObj.find('#' + id).highcharts(Highcharts.merge(opt, options));
			}
		},
		destroy: function(id) {
			if ($.extObj.find('#' + id).highcharts()) {
				$.extObj.find('#' + id).highcharts().destroy();
			}
		},
		getChartId: function(type) {
			var id = '';
			switch(type) {
				case '10':
					id = 'amBudgetResultChart';
					break;
				case '20':
					id = '';
					break;
				case '30':
					id = 'mdBudgetResultChart';
					break;
				case '40':
					id = 'mdBudgetProductChart';
					break;
				case '50':
					id = 'jasaBudgetResultChart';
					break;
				case '60':
					id = 'jasaBudgetProductChart';
					break;
				default: 
					break;
			}
			
			return id + $.viewType;
		},
		getColors: function(type) {
			var colorArr = [];
			switch(type) {
				case '10':
					colorArr = ["#27C5C6", "#f2f2f2"]
					break;
				case '30':
					colorArr = ["#BAA1DC"]
					break;
				case '50':
					colorArr = ["#58b0ec"];
					break;
				case '40':
				case '60':
					colorArr = ["#5495D5","#FF7887","#90E57E","#FFC63B","#60D5A8","#FF965D","#E0FF7C"];
					break;
				default:
					break;
			}
			
			return colorArr;
		},
		barChart : function(data, type) {
			var id = this.getChartId(type);
			this.destroy(id);
			
			if (!data.length) {
				return;
			}
			
			var cateArr = [];
			var dataArr = [];
			var arrSeries = [];
						
			for (var i = 0; i < data.length ;i++) {
				var rowData = data[i];
				var cateName = rowData.name;
				if (cateName.length > 5) {
					cateName = cateName.replace('영업소', '');
				}
				cateArr.push(cateName);
				dataArr.push({
					y: rowData.half_use_rate || 0,
					useAmt: rowData.half_use_amt || 0,
					useCnt: rowData.half_use_cnt || 0,
					color: this.getColors(type)[0]
				});
			}	
			
			arrSeries.push({type: 'column', name: '', data: dataArr});
			
			var options = {
				chart: {
					width: 433,
					height: 295
				},
				xAxis : { categories : cateArr },
				yAxis: 
				{
					min: 0,
					title: { text: null },
					labels: { format: '{value:.,0f}' + '%' }
				},
				tooltip: {
					formatter: function() {
						var str = '';
						str += '<span>';
						str += '사용 금액: ' + $.getNumberComma(Math.round(this.point.useAmt || 0, 0));
						str += '<br>';
						str += '사용 횟수: ' + $.getNumberComma(Math.round(this.point.useCnt || 0, 0));
						str += '</span>';
						return str;
					}
				},
				plotOptions: {
					series: {
						dataLabels: {
							format: '{y}%',
							enabled: true,
							style: { "fontWeight": 'bold' }
						}
					}
				},
				legend : {
					enabled: false
				},
				series : arrSeries
			};
			
			this.create(id, options);
		},
		stackShareChart: function(data, type) {
			var id = this.getChartId(type);
			this.destroy(id);
						
			if (!data.length) {
				return;
			}
			
			// 카테고리
			var iCount = 0;
			var cateArr = [];
			var arrSeries = [], dataArr = [];
			var beforeRow = data[0];
			var firstData = data[0].product_code;
			data.push(data[data.length - 1]);
			
			for (var i = 0; i < data.length; i++) {
				var rowData = data[i];
				
				if (firstData == rowData.product_code) {
					var cateName = rowData.name;
					if (cateName.length > 5) {
						cateName = cateName.replace('영업소', '');
					}
					cateArr.push(cateName);
				}
				
				if (beforeRow.product_code != rowData.product_code || i == data.length - 1)
				{
					arrSeries.push({
						type: 'column', 
						name: beforeRow.product_name,
						//color: this.getColors(gubun)[iCount],
						data: dataArr,
						color: this.getColors(type)[iCount]
					});
					
					iCount++;
					dataArr = [];
					beforeRow = rowData;
				}
				
				dataArr.push({y: rowData.half_use_amt || 0, productName: rowData.product_name, useAmt: rowData.half_use_amt || 0, useCnt: rowData.half_use_cnt || 0, productCode: rowData.product_code});
			}
			
			// 차트 추가 옵션
			var options = {
				chart: {
					width: 665,
					height: 295
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
							str += rowData.productName + ' : ' + $.getNumberComma(rowData.useAmt) + ' (' + $.getNumberComma(rowData.useCnt) + ')';
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
							//style: { fontWeight: 'bold', color: 'black' }, 
							formatter: function() { 
								if (this.percentage != 0) {
									var fColor = '';
									if (firstData == this.point.productCode) {
										fColor = '#000';
									} else {
										fColor = '#000';
									}
									
									return '<span style="font-weight:bold; color: ' + fColor + ';">' + this.percentage.toFixed(1) + '</span>'; 
								}
							},
							useHTML: true
						} 
					}
				},
				legend : {
					//verticalAlign: 'top',
					align: 'right',
					layout: 'vertical',
					verticalAlign: 'middle',
					enabled: true
				},
				series : arrSeries
			};
			
			this.create(id, options);
		},
		stackARChart: function(data, type) {
			var id = this.getChartId(type);
			this.destroy(id);
						
			if (!data.length) {
				return;
			}
			
			// 카테고리
			var iCount = 0;
			var cateArr = [];
			var arrSeries = []; 
			var planAmtArr = [];
			var useAmtArr = [];
			
			for (var i = 0; i < data.length; i++) {
				var rowData = data[i];
				
				var cateName = rowData.name;
				if (cateName.length > 5) {
					cateName = cateName.replace('영업소', '');
				}
				cateArr.push(cateName);
				
				planAmtArr.push({y: rowData.half_plan_amt - rowData.half_use_amt || 0, gubun: 'PLAN', color: this.getColors(type)[1]});
				useAmtArr.push({y: rowData.half_use_amt || 0, gubun: 'USE', planAmt: rowData.half_plan_amt || 0, useAmt: rowData.half_use_amt || 0, avalAmt: rowData.half_aval_amt || 0, useCnt: rowData.half_use_cnt || 0, color: this.getColors(type)[0]});
			}
			
			arrSeries.push({type: 'column',	name: '', data: planAmtArr});
			arrSeries.push({type: 'column',	name: '', data: useAmtArr});
			
			// 차트 추가 옵션
			var options = {
				chart: {
					width: 1130,
					height: 295
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
						var points = this.points[1].point;
						var str = '<span>';
						str += '배정 : ' + $.getNumberComma(points.planAmt) + '<br>';
						str += '사용 : ' + $.getNumberComma(points.useAmt) + '<br>';
						str += '가용 : ' + $.getNumberComma(points.avalAmt) + '<br>';
						str += '사용횟수 : ' + $.getNumberComma(points.useCnt);
						str += '</span>';
						return str;
					}
				},
				plotOptions: { 
					column: { 
						stacking: 'percent', 
						dataLabels: { 
							enabled: true, 
							style: { fontWeight: 'bold', color: 'black' }, 
							formatter: function() { 
								if (this.percentage != 0 && this.point.gubun == 'USE') {
									return this.percentage.toFixed(1) + '%'; 
								}
							} 
						} 
					}
				},
				legend : {
					enabled: false
				},
				series : arrSeries
			};
			
			this.create(id, options);
		},
		pieChart : function(data, chartId, w, cnt, groupNum) {
			var id = chartId;
			var dataArr = [];
			var arrSeries = [];
			var colorArr = [];
			colorArr.push(this.getColors('40')[groupNum - 1]);
			colorArr.push(this.getColors('10')[1]);
			
			dataArr.push(['', data.half_use_amt || 0]);
			dataArr.push(['', data.half_plan_amt - data.half_use_amt || 0]);
						
			arrSeries.push({name: '', data: dataArr});
			
			var titleTag = (data.half_use_rate || 0) + '%';
			
			var options = {
				chart: {
					type: 'pie',
					width: w,
					height: w
				},
				title: {
					text: '<span style="font-size: 13px; color: #000">' + titleTag + '</span>',
					align: 'center',
					verticalAlign: 'middle',
					y: 5
				},
				tooltip: {
					formatter: function() {
						var str = '';
						str += '배정 : ' + $.getNumberComma(data.half_plan_amt || 0) + '<br>';
						str += '사용 : ' + $.getNumberComma(data.half_use_amt || 0) + '<br>';
						str += '가용 : ' + $.getNumberComma(data.half_aval_amt || 0) + '<br>';
						str += '사용률 : ' + $.getNumberComma(data.half_use_rate || 0) + '%<br>';
						str += '사용횟수 : ' + $.getNumberComma(data.half_use_cnt || 0);
						return str;
					}
				},
				plotOptions: {
			        pie: {
			        	size: '90%',
			            innerSize: (cnt < 5 ? 100 : 60),
			            depth: 45,
			            allowPointSelect: true,
				        cursor: 'pointer',
			            colors: colorArr,
			            dataLabels: {
			                enabled: false
			            },
			            showInLegend: false
			        }
			    },
				series : arrSeries
			};
			
			this.create(id, options);
		}
	};
		
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