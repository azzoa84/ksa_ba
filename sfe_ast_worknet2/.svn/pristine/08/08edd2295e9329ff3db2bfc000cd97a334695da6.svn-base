function CustomDSMDashboard(host, dispView, bindEvents) {
	var $ = this;
	$.dispId = dispView ? dispView.id : null;
	$.dispView = dispView;
	$.extObj = jQuery(('#' + $.dispId));
	$.bindEvents = bindEvents;
	
	$.load = function() {
		$.extObj.load('./fingerPlatform/custom/dsm/customDSMDashboard.html', function() {
			// 이벤트등록
			$.onEvent();
		});
	};
	
	$.onEvent = function() {
		if ($.bindEvents) {
			if ($.bindEvents.onProfitAchieveClick)
				$.extObj.find('.achievement').on('click', $.bindEvents.onProfitAchieveClick);
			if ($.bindEvents.onProfitGrowthClick)
				$.extObj.find('.growth').on('click', $.bindEvents.onProfitGrowthClick);
			if ($.bindEvents.onCallClick)
				$.extObj.find('.call-result').on('click', $.bindEvents.onCallClick);
			if ($.bindEvents.onCoverageClick)
				$.extObj.find('.call-coverage').on('click', $.bindEvents.onCoverageClick);
			if ($.bindEvents.onKSAClick)
				$.extObj.find('.key-sales-activity').on('click', $.bindEvents.onKSAClick);
			if ($.bindEvents.onBudgetClick)
				$.extObj.find('.budget-use').on('click', $.bindEvents.onBudgetClick);
		}
	};
	
	$.setIntroRemark = function(gubun) {
		if (gubun == 'QTY') {
			jQuery('.dsmViewText').html('(수량 단위: Box)');
		} else {
			jQuery('.dsmViewText').html('(단위: 천 원)');
		}
	};
	
	$.table = {
		initInfo : function() {
			var tag =	"<p class='table-title'> \
							<span>현재 배정기준</span> \
							<span>(단위: 천 원)</span> \
						</p> \
						<table> \
							<tr> \
                				<th>배정</th><th>사용</th><th>가용</th><th>사용률</th> \
							</tr> \
            				<tr> \
        						<td>#half_amt#</td><td>#use_amt#</td><td>#aval_amt#</td><td>#use_rate#%</td> \
    						</tr> \
    					</table>";
			
			return tag;
		},
		getId : function(type) {
			var id = '';
			switch(type) {
				case '60':
					id = 'amBudgetProgressTable';
					break;
				case '70':
					id = 'mdBudgetShareTable';
					break;
				case '80':
					id = 'jasaBudgetTable';
					break;
				case '90':
					id = 'jasaBudgetShareTableBody';
					break;
				default:
					break;
			}
			
			return id;
		},
		render : function(type, tag) {
			var id = this.getId(type);
			jQuery('#' + id).html(tag);
		},
		clear : function(type) {
			var id = this.getId(type);
			jQuery('#' + id).html("");
		},
		createInfoTable : function(data, type, gubun) {
			var tag = this.initInfo();
			
			if (data.length) {
				tag = tag.replace('#half_amt#', $.getNumberComma(data[0].half_amt))
						 .replace('#use_amt#', $.getNumberComma(data[0].use_amt))
						 .replace('#aval_amt#', $.getNumberComma(data[0].aval_amt))
						 .replace('#use_rate#', $.getNumberComma(data[0].use_rate))
			}			
			
			this.render(type, tag);
		},
		createJasaTable : function(data, type) {
			this.clear(type);
			
			if (data.length) {
				var tag = "";
				for (var i = 0; i < data.length; i++) {
					var rowData = data[i];
					var name = rowData.name.replace("영업소", "");
					
					tag += "<tr>";
					tag += "<th>" + name + "</th>";
					tag += "<td>" + $.getNumberComma(Math.round(rowData.half_use_amt / 1000, 0)) + "</td>";
					tag += "<td>" + rowData.half_use_cnt + "</td>";
					tag += "<td>";
					tag += "<div class='bar-group'>";
					tag += "<div class='backs'></div>";
					var width = rowData.half_use_share * 3 < 100 ? rowData.half_use_share * 3 : 100;
					tag += "<div class='bar' style='width:" + width + "%;'>" + (rowData.half_use_share || 0) + "%</div>"
					tag += "</div>";
					tag += "</td>";
					tag += "</tr>";
				}
				
				this.render(type, tag);
			}
		}
	};
	
	$.chart = {
		smallChartWidth: 570,
		smallChartHeight: 320,
		largeChartWidth: 1170,
		largeChartHeight: 320,
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
					id = 'achieveMentNowChart';
					break;
				case '20':
					id = 'achieveMentHalfChart';
					break;
				case '30':
					id = 'growthNowChart';
					break;
				case '40':
					id = 'growthHalfChart';
					break;
				case '50':
					id = 'keySalesActivityChart';
					break;
				case '60':
					id = 'amBudgetProgressChart';
					break;
				case '70':
					id = 'mdBudgetShareChart';
					break;
				default:
					break;
			}
			
			return id;
		},
		getColors: function(type) {
			var colorArr = [];
			switch(type) {
				case '10':
				case '20':
					colorArr = ['#5495D5', '#90E57E', '#60D5A8'];
					break;
				case '30':
				case '40':
					colorArr = ['#FF7887', '#FFC63B', '#FF965D'];
					break;
				case '50':
					colorArr = ['#B5A1DB', '#57B0EC', '#FFB884', '#D67A7F', '#94706D'];
					break;
				case '60':
					colorArr = ['#27C5C6'];
					break;
				case '70':
					colorArr = ['#B5A1DC'];
					break;
				default:
					break;
			}
			
			return colorArr;
		},
		achieveMentChart: function(data, type, searchType) {
			var id = this.getChartId(type);
			this.destroy(id);
			
			if (!data.length) {
				return;
			}
			
			var cateArr = [];
			var dataArr = [];
			var maxVal = 1;
			for (var i = 0; i < data.length ;i++) {
				var rowData = data[i];
				var colorType = rowData.sort_seq == '1' ? 0 : (rowData.sort_seq == '10' ? 1 : 2);
				maxVal = Math.max(maxVal, rowData.val);
				
				cateArr.push(rowData.name);
				dataArr.push({
					y: rowData.val,
					res: rowData.res,
					tar: rowData.tar,
					color: this.getColors(type)[colorType]
				});
			}
					
			var arrSeries = [];
			var seriesName = (type == '10' ? '당월' : '반기');
			arrSeries.push({type: 'column', name: seriesName, data: dataArr});
			
			var dividingValue = 1;
			
			if (searchType != 'QTY') {
				dividingValue = 1000;
			}
			
			var options = {
				chart: {
					width: 564,
					height: 260
				},
				xAxis : { categories : cateArr },
				yAxis: 
				{
					min: 0,
					max: maxVal + 20,
					tickInterval: 30,
					title: { text: null },
					labels: { format: '{value:.,0f}' + '%' }
				},
				tooltip: {
					formatter: function() {
						
						var str = '';
						str += '<span>';
						str += '목표: ' + $.getNumberComma(Math.round(this.point.tar / dividingValue, 0));
						str += '<br>';
						str += '실적: ' + $.getNumberComma(Math.round(this.point.res / dividingValue, 0));
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
		growthChart: function(data, type, searchType) {
			var id = this.getChartId(type);
			this.destroy(id);
			
			if (!data.length) {
				return;
			}
			
			var cateArr = [];
			var dataArr = [];
			var maxVal = 1;
			for (var i = 0; i < data.length ;i++) {
				var rowData = data[i];
				var colorType = rowData.sort_seq == '1' ? 0 : (rowData.sort_seq == '10' ? 1 : 2);
				maxVal = Math.max(maxVal, rowData.val);
				cateArr.push(rowData.name);
				dataArr.push({
					y: rowData.val,
					res: rowData.res,
					tar: rowData.tar,
					color: this.getColors(type)[colorType]
				});
			}
					
			var arrSeries = [];
			var seriesName = (type == '10' ? '당월' : '반기누적');
			arrSeries.push({type: 'column', name: seriesName, data: dataArr});
				
			var dividingValue = 1;
			
			if (searchType != 'QTY') {
				dividingValue = 1000;
			}
			
			var options = {
				chart: {
					width: 564,
					height: 260
				},
				xAxis : { categories : cateArr },
				yAxis: 
				{
					min: 0,
					max: maxVal + 20,
					tickInterval: 30,
					title: { text: null },
					labels: { format: '{value:.,0f}' + '%' }
				},
				tooltip: {
					formatter: function() {
						
						var str = '';
						str += '<span>';
						str += '전년동기: ' + $.getNumberComma(Math.round(this.point.res / dividingValue, 0));
						str += '<br>';
						str += '현재: ' + $.getNumberComma(Math.round(this.point.tar / dividingValue, 0));
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
		
		keySalesActivityChart: function(data, type) {
			var id = this.getChartId(type);
			this.destroy(id);
			$.ksaData = [];
			
			if (!data.length) {
				return;
			}
			
			// 카테고리
			var cateArr = [];
			var arrSeries = [], dataArr = [];
			var beforeRow = data[0];
			var iCount = 0;
			for (var i = 0; i < data.length; i++)
			{
				var rowData = data[i];
				
				if (rowData.call_kind == '10') {
					cateArr.push(rowData.name);
				}
				
				if (i == data.length - 1) {
					dataArr.push({y: rowData.per_activity || 0, activity: rowData.activity, callName: rowData.call_kind_name});
				}				
				
				if (beforeRow.call_kind != rowData.call_kind || i == data.length - 1)
				{
					arrSeries.push({
						type: 'column', 
						name: beforeRow.call_kind_name,
						color: this.getColors(type)[iCount],
						data: dataArr
					});
					
					iCount++;
					dataArr = [];
					beforeRow = rowData;
				}
				
				dataArr.push({y: rowData.per_activity || 0, activity: rowData.activity, callName: rowData.call_kind_name});
			}
			$.ksaData = deepCopyObj(arrSeries);		
			// 차트 추가 옵션
			var options = {
				chart: {
					width: this.largeChartWidth,
					height: 363
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
							str += rowData.callName + ' : ' + Math.round(rowData.percentage, 1) + '% (' + $.getNumberComma(rowData.activity) + ')';
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
								if (this.percentage != 0) return this.percentage.toFixed(1); 
							} 
						} 
					}
				},
				legend : {
					enabled: true
				},
				series : arrSeries
			};
			
			this.create(id, options);
		},
		budgetChart: function(data, type) {
			var id = this.getChartId(type);
			this.destroy(id);
			
			if (!data.length) {
				return;
			}
			
			var cateArr = [];
			var dataArr = [];
			var colorType = 0;
			for (var i = 0; i < data.length ;i++) {
				var rowData = data[i];
				
				cateArr.push(rowData.name);
				dataArr.push({
					y: rowData.half_use_share,
					planAmt: rowData.half_plan_amt || 0,
					useAmt: rowData.half_use_amt || 0,
					avalAmt: rowData.half_aval_amt || 0,
					gubun: type,
					color: this.getColors(type)[colorType]
				});
			}
					
			var arrSeries = [];
			arrSeries.push({type: 'column', name: '', data: dataArr});
						
			var options = {
				chart: {
					type: 'bar',
					width: 340,
					height: 305
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
						var p = this.point;
						var str = '';
						str += '<span>';
						
						if (p.gubun == '60') {
							str += '배정금액 : ' + $.getNumberComma(Math.round(p.planAmt / 1000, 0));
							str += '<br>';
							str += '사용금액 : ' + $.getNumberComma(Math.round(p.useAmt / 1000, 0));
							str += '<br>';
							str += '가용금액 : ' + $.getNumberComma(Math.round(p.avalAmt / 1000, 0));
						} else {
							str += '사용금액: ' + $.getNumberComma(Math.round(p.useAmt / 1000, 0));
						}
						
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