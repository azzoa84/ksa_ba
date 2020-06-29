function CustomDSMCallResult(host, dispView, bindEvents) {
	var $ = this;
	$.dispId = dispView ? dispView.id : null;
	$.dispView = dispView;
	$.extObj = jQuery(('#' + $.dispId));
	$.bindEvents = bindEvents;
	
	$.load = function() {
		$.extObj.load('./fingerPlatform/custom/dsm/customDSMCallResult.html', function() { 
			$.onEvent(); 
		});
	};
	
	$.onEvent = function() {
		if ($.bindEvents) {
			//if ($.bindEvents.onProfitAchieveClick)
				$.extObj.find('.call-result').on('click', $.bindEvents.onCallLinkClick);
			//if ($.bindEvents.onProfitGrowthClick)
				$.extObj.find('.product-call').on('click', $.bindEvents.onCallLinkClick);
			//if ($.bindEvents.onCallClick)
				$.extObj.find('.med-call-share').on('click', $.bindEvents.onCallLinkClick);
			//if ($.bindEvents.onCoverageClick)
				$.extObj.find('.med-call-result').on('click', $.bindEvents.onCallLinkClick);
			//if ($.bindEvents.onCoverageClick)
				$.extObj.find('.call-level').on('click', $.bindEvents.onCallLinkClick);
		}
	};
	
	$.table = {
		getId : function(type) {
			var id = '';
			switch(type) {
				case '10':
					id = 'weeklyCallResultTable';
					break;
				case '20':
					id = 'monthlyCallResultTable';
					break;
				case '30':
					id = 'halfCallResultTable';
					break;
				case '90':
					id = 'contactCallShareTable';
					break;
				default:
					break;
			}
			
			return id;
		},
		createTdTag : function(value, styleValue) {
			var tag = "";
			tag += (styleValue ? "<td style='" + styleValue + "'>" : "<td>");
			tag += value;
			tag += "</td>";
			return tag;
		},
		callResultTable : function(data, type, teamCode) {
			var styleValue = "color: blue;";
			var title = (teamCode ? '영업소' : '영업부');
			var tarSum = 0;
			var excSum = 0;
			var tag = "";
						
			tag += "<p class='table-title'><span>" + title + " 합계</span></p>";
			tag += "<table>";
			tag += "<tr><th>목표 Call</th><th>실행 Call</th><th>실행률</th></tr>";
			tag += "<tr>";	
			
			if (data.length) {
				for (var i = 0; i < data.length; i++) {
					var rowData = data[i];
					
					if (rowData.code == 'Z9999') {
						continue;
					}
					
					if (teamCode && teamCode == rowData.code) {
						continue;
					}
					
					tarSum += Number(rowData.fx_call);
					excSum += Number(rowData.exc_call);
				}
			}
			tag += this.createTdTag($.getNumberComma(tarSum));
			tag += this.createTdTag($.getNumberComma(excSum));
			var rate = ((excSum / tarSum) * 100) || 0;
			tag += this.createTdTag(rate.toFixed(1) + '%', styleValue);
			tag += "</tr>";
			tag += "</table>";
			
			var id = this.getId(type);
			jQuery('#' + id).html(tag);
		},
		callResultForRateTable : function(data, type, height) {
			var styleValue = "text-align: right; color: blue";
			var tag = "";
			tag += "<table>";
			
			for (var i = 0; i < data.length; i++) {
				var rowData = data[i];
				var h = height;
				
				if (i < 3) {
					h = h + 1;
				}
				
				tag += "<tr style='height: " + h + "px'>";
				tag += this.createTdTag(rowData.call_rate + '%', styleValue);
				tag += "</tr>";
			}
			
			tag += "</table>";
			var id = this.getId(type);
			jQuery('#' + id + 'Sub').html(tag);
		},
		callResultForTatget : function(data, type, height, left) {
			var styleValue = "left: " + left + 'px';
			var tag = "";
			tag += "<table>";
			
			for (var i = 0; i < data.length; i++) {
				var rowData = data[i];
				var h = height;
				
				if (i < 3) {
					h = h + 1;
				}
				
				tag += "<tr style='height: " + h + "px'>";
				tag += this.createTdTag(rowData.fx_call + 'call', styleValue);
				tag += "</tr>";
			}
			
			tag += "</table>";
			var id = this.getId(type);
			jQuery('#' + id + 'Target').html(tag);
		},
		contactCallShareTable : function(data, type, height) {
			var styleValue = "border: 1px solid #cacece;";
			var tag = "";
			
			for (var i = 0; i < data.length; i++) {
				var rowData = data[i];
				
				tag += "<tr style='height: " + height + "px'>";
				tag += this.createTdTag($.getNumberComma(rowData.fx_call || 0), styleValue);
				tag += this.createTdTag($.getNumberComma(rowData.exe_call || 0), styleValue);
				tag += this.createTdTag((rowData.call_rate || 0).toFixed(1) + '%', styleValue);
				tag += this.createTdTag($.getNumberComma(rowData.day_call || 0), styleValue);
				tag += "</tr>";
			}
			
			var id = this.getId(type);
			jQuery('#' + id).html(tag);
		}
	};
	
	$.setWeeklyTxt = function(data) {
		var id = jQuery('#weeklyTxt');
		var txt = '(';
		txt += data.day1.substr(2, 2) + '.' + data.day1.substr(4, 2) + '.' + data.day1.substr(6, 2);
		txt += '~'
		txt += data.day5.substr(2, 2) + '.' + data.day5.substr(4, 2) + '.' + data.day5.substr(6, 2);
		txt += ')';
		id.html(txt);
	};
		
	$.chart = {
		fullYear: 12,
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
					id = 'weeklyCallResultChart';
					break;
				case '20':
					id = 'monthlyCallResultChart';
					break;
				case '30':
					id = 'halfCallResultChart';
					break;
				case '40':
					id = 'targetProductCallShareChart';
					break;
				case '50':
					id = 'exeProductCallShareChart';
					break;
				case '60':
					id = 'medFxCallShareChart';
					break;
				case '70':
					id = 'medExcCallShareChart';
					break;
				case '80':
					id = 'medCallResultChart';
					break;
				case '90':
					id = 'contactCallShareChart';
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
				case '30':
					colorArr = ['#5495D5', '#FF7887'];
					break;
				case '40':
				case '50':
					colorArr = ['#B5A1DB', '#57B0EC', '#FFB884', '#D67A7F', '#94706D', '#96B357', '#E5CD32', '#8A97B0'];
					break;
				case '60':
					colorArr = ['#C7A1E3'];
					break;
				case '70':
					colorArr = ['#8FAADC'];
					break;
				case '80':
					colorArr = ['#519BE2', '#E35D66'];
					break;
				case '90':
					colorArr = ['#B5A1DB', '#57B0EC', '#FFB884', '#D67A7F', '#94706D'];
					break;
				default:
					break;
			}
			
			return colorArr;
		},
		// Call 실행 현황
		callResultChart: function(data, type) {
			var id = this.getChartId(type);
			this.destroy(id);
			
			if (!data.length) {
				return;
			}
			
			var cateArr = [];
			var fxCalldataArr = [];
			var excCalldataArr = [];
			var colorType = 0;
			var maxCall = 0;
			
			for (var i = 0; i < data.length ;i++) {
				var rowData = data[i];
				cateArr.push(rowData.name);
				fxCalldataArr.push({y: rowData.fx_call * 0.8, title: '목표', callCnt: rowData.fx_call});
				excCalldataArr.push({y: rowData.exc_call * 0.8, title: '실행', callCnt: rowData.exc_call});
				
				maxCall = Math.max(rowData.fx_call, maxCall);
				maxCall = Math.max(rowData.exc_call, maxCall);
			}
					
			var arrSeries = [];
			arrSeries.push({name: '목표', data: fxCalldataArr, stack: 1, color: this.getColors(type)[0], dataLabels: { enabled: true, x: 80, format: '{point.callCnt:,.0f}' + 'call', style: { 'fontWeight': 'bold', 'fontSize': '10px' } }});
			arrSeries.push({name: '실행', data: excCalldataArr, stack: 2, zIndex: 1, pointPadding: 0.3, color: this.getColors(type)[1], dataLabels: { enabled: true, format: '{point.callCnt:,.0f}' + 'call', style: { 'fontWeight': 'bold', 'color': 'white' } }});

			var options = {
				chart: {
					type: 'bar',
					width: 285,
					height: 375,
					events: {
		            	load: function () {
		            		var height = this.plotHeight;
		            		$.table.callResultForRateTable(data, type, height / cateArr.length);
		            	}
					}
				},
				xAxis : { categories : cateArr },
				yAxis: 
				{
					min: 0,
					max: maxCall + (maxCall * 0.2),
					title: { text: null },
					labels: { enabled: false }
				},
				tooltip: {
					shared: true,
					formatter: function() {
						var p = this.points;
						var str = '';
						
						for (var i = 0; i < p.length; i++) {
							var rowData = p[i];
							str += rowData.point.title + ': ' + $.getNumberComma(rowData.point.callCnt) + 'call';
							str += '<br>';
						}
						
						return str;
					}
				},
				plotOptions: {
					series : 
					{
						stacking: 'normal',
						grouping: false,
						shadow: false,
						borderWidth: 0
					}
				},
				legend : {
					enabled: true
				},
				series : arrSeries
			};
			
			this.create(id, options);
		},
		productBoxSettings: function(deptCode) {
			var boxId = jQuery('#productShareBox');
			var tag = '';
							
			if (deptCode != 'S030') {
				tag += '<div id="targetProductShareBox" class="inner-box" style="width: 300px;">';
				tag += '<p class="chart-title mb10">권장 Call Share</p>';
				tag += '<div id="targetProductCallShareChart" class="chart-area" style="height: 390px;"></div>';
				tag += '</div>';
			}
			
			tag += '<div id="excProductShareBox" class="inner-box" style="width: ' + (deptCode == 'S030' ? 1200 : 900) + 'px; flex: inherit;">';
			tag += '<p class="chart-title mb10">실행 Call Share</p>';
			tag += '<div id="exeProductCallShareChart" class="chart-area" style="height: 390px;"></div>';
			tag += '</div>';
			
			boxId.html(tag);
		},
		// 품목별 Call Share
		productChart: function(data, type, deptCode) {
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
			var w = 0;
			var h = 0;
			
			if (type == '40') 
			{				
				if (deptCode == 'S030') {
					return;
				}
				
				cateArr.push('권장 Call Share');
				data.push(data[data.length - 1]);
				
				for (var i = 0; i < data.length; i++)
				{
					var rowData = data[i];
					
					if (beforeRow.product_code != rowData.product_code || i == data.length - 1)
					{
						arrSeries.push({
							type: 'column', 
							name: beforeRow.product_name,
							color: this.getColors(type)[iCount],
							data: dataArr
						});
						
						iCount++;
						dataArr = [];
						beforeRow = rowData;
					}
					
					dataArr.push({y: rowData.fx_call || 0, productName: rowData.product_name});
				}
				
				w = 230;
				h = 383;
			} 
			else
			{
				var compProductCode = data[0].product_code;
				for (var i = 0; i < data.length; i++)
				{
					var rowData = data[i];
					
					if (rowData.product_code == compProductCode) {
						cateArr.push(rowData.name);
					}
					
					if (i == data.length - 1) {
						dataArr.push({y: rowData.exc_call || 0, productName: rowData.product_name});
					}				
					
					if (beforeRow.product_code != rowData.product_code || i == data.length - 1)
					{
						arrSeries.push({
							type: 'column',
							name: beforeRow.product_name,
							color: this.getColors(type)[iCount],
							data: dataArr
						});
						
						iCount++;
						dataArr = [];
						beforeRow = rowData;
					}
					
					dataArr.push({y: rowData.exc_call || 0, productName: rowData.product_name});
				}
				
				w = (deptCode == 'S030' ? 1160 : 885);
				h = 383;
			}
			// 차트 추가 옵션
			var options = {
				chart: {
					width: w,
					height: h
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
							str += rowData.productName + ' : ' + $.getNumberComma(rowData.y) + (type == '40' ? '%' : 'call');
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
		},
		// 진료과 별 Call 집중도
		medCallSharePieChart: function(data, totalIndspCnt, type) {
			var id = this.getChartId(type);
			this.destroy(id);
			
			if (!data.length) {
				return;
			}
			
			var dataArr = [];
			var arrSeries = [];
			var colorType = 0;
			var sumCallCnt = 0;
			
			for (var i = 0; i < data.length ;i++) {
				var rowData = data[i];
				
				if (totalIndspCnt < 6 && i == data.length - 1) {
					continue;
				}
				
				sumCallCnt += rowData.call_cnt;
				dataArr.push([rowData.ind_sp, rowData.call_cnt]);
			}
			
			arrSeries.push({name: '', data: dataArr});
			
			var titleTag = '';
			titleTag += '<span style="text-align: center;">';
			titleTag += '<span style="text-decoration:underline;">' + $.getNumberComma(sumCallCnt) + ' Call</span>';
			titleTag += '<br>';
			titleTag += '<span>' + totalIndspCnt + '개 과</span>';
			titleTag += '<span>';
			
			var options = {
				chart: {
					type: 'pie',
					width: 566,
					height: 340,
					margin: [20, 90, 20, 10],
			        spacingTop: 10,
			        spacingBottom: 10,
			        spacingLeft: 10,
			        spacingRight: 10,
					events: {
						load: function () {
							if (this.title) {
				                this.title.destroy();
				            }

				            var r = this.renderer,
				                x = this.series[0].center[0] + this.plotLeft,
				                y = this.series[0].center[1] + this.plotTop;
				            this.title = r.text(titleTag, 0, 0).css({
				                color: '#4572A7',
				                fontSize: '16px',
				                textAlign: 'center',
				                fontWeight: 'bold'
				            }).hide()
				              .add();

				            var bbox = this.title.getBBox();
				            this.title.attr({
				                x: x - (bbox.width / 2),
				                y: y
				            }).show();
				        },
						redraw: function () {
							if (this.title) {
				                this.title.destroy();
				            }

				            var r = this.renderer,
				                x = this.series[0].center[0] + this.plotLeft,
				                y = this.series[0].center[1] + this.plotTop;
				            this.title = r.text(titleTag, 0, 0).css({
				                color: '#4572A7',
				                fontSize: '16px',
				                textAlign: 'center',
				                fontWeight: 'bold'
				            }).hide()
				              .add();

				            var bbox = this.title.getBBox();
				            this.title.attr({
				                x: x - (bbox.width / 2),
				                y: y
				            }).show();
				        }
					}
				},
				tooltip: {
					formatter: function() {
						var str = '';
						str += this.key + ' : ' + this.y + 'call';
						
						return str;
					}
				},
				plotOptions: {
			        pie: {
			        	size: '80%',
			            innerSize: 150,
			            depth: 45,
			            dataLabels: {
			                enabled: true,
			                format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
			                distance: 15,
			                filter: {
			                    property: 'percentage',
			                    operator: '>',
			                    value: 4
			                }
			            },
			            showInLegend: true
			        }
			    },
				legend : {
					align: 'right',
					layout: 'vertical',
					verticalAlign: 'top'
				},
				series : arrSeries
			};
			
			this.create(id, options);
		},
		medCallResultBarChart: function(data, type) {
			var id = this.getChartId(type);
			this.destroy(id);
			jQuery('#medCallResultPieDiv').html('');
			
			if (!data.length) {
				return;
			}
			
			var cateArr = [];
			var fxCallArr = [], excCallArr = [];
			var arrSeries = [];
			
			for (var i = 0; i < data.length ;i++) {
				var rowData = data[i];
				
				cateArr.push(rowData.ind_sp);
				
				fxCallArr.push({y: rowData.fx_call || 0, fxCall: rowData.fx_call || 0});
				excCallArr.push({y: rowData.call_cnt || 0, excCall: rowData.call_cnt || 0});
			}
			
			var nameArr = ['목표 Call', '실행 Call'];
			
			arrSeries.push({type: 'column', name: nameArr[0], data: fxCallArr, color: this.getColors(type)[0]});
			arrSeries.push({type: 'column', name: nameArr[1], data: excCallArr, color: this.getColors(type)[1]});
			
			var options = {
				chart: {
					width: 1145,
					height: 280,
					events: {
		            	load: function () {
		            		var width = this.plotWidth;
		            		var tag = '';
		            		var id = 'medCallResultPieChart';
		            		var suffix = '';
		            		
		            		for (var i = 0; i < cateArr.length; i++) {
		            			suffix = id + (i + 1);
		            			tag += '<div id="' + suffix + '" style="flex: 1;"></div>';
		            		}
		            		
		            		jQuery('#medCallResultPieDiv').css('width', this.plotWidth + 'px');
		            		jQuery('#medCallResultPieDiv').html(tag);
		            		
		            		var pieChartWidth = width / cateArr.length;
		            		for (var i = 0; i < cateArr.length; i++) {
		            			$.chart.medCallResultPieChart(data[i], id + (i + 1), pieChartWidth, type);
		            		}
		            	}
					}
				},
				xAxis : { categories : cateArr },
				yAxis: 
				{
					min: 0,
					
					title: { text: null },
					labels : { formatter : function() { return Highcharts.numberFormat(this.value, 0); } }
				},
				tooltip: {
					shared: true,
					formatter: function() {
						var points = this.points;
						var str = '<span>';
						
						for (var i = 0; i < points.length; i++) {
							var rowData = points[i].point;
							str += nameArr[i] + ' : ' + $.getNumberComma(rowData.y) + 'call';
							str += '<br>';
						}
						str += '</span>';
						return str;
					}
				},
				plotOptions: {
					series: {
						dataLabels: {
							format: '{point.y:,.0f}',
							enabled: true,
							style: { "fontWeight": 'bold' }
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
		},
		medCallResultPieChart: function(data, id, width, type) {
			var dataArr = [];
			var arrSeries = [];
			var colorType = 0;
			
			dataArr.push(['실행 Call', data.call_cnt || 0]);
			dataArr.push(['목표 Call', data.fx_call || 0]);
						
			arrSeries.push({name: '', data: dataArr});
			
			var titleTag = (!data.fx_call ? 0 : Math.round((data.call_cnt / data.fx_call) * 100, 1)) + '%';
			var options = {
				chart: {
					type: 'pie',
					width: width,
					height: 140
				},
				title: {
					text: titleTag,
					css: {
						fontSize: '15px'
					},
					align: 'center',
					verticalAlign: 'middle',
					y: 5
				},
				tooltip: {
					shared: true,
					formatter: function() {
						var str = '';
						str += this.key + ' : ' + $.getNumberComma(this.y) + 'call';
						
						return str;
					}
				},
				plotOptions: {
					pie: {
			            innerSize: 70,
			            depth: 45,
			            allowPointSelect: true,
				        cursor: 'pointer',
				        colors: this.getColors(type).reverse(),
			            dataLabels: {
			                enabled: false,
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
		contactCallShareChart: function(data, type) {
			var id = this.getChartId(type);
			this.destroy(id);
			
			if (!data.length) {
				return;
			}
			
			var cateArr = [];
			var colorType = 0;
			var lDataArr = [], uDataArr = [], tDataArr= [], aDataArr = [], nDataArr = [];
					
			for (var i = data.length - 1; i >= 0 ;i--) {
				var rowData = data[i];
				
				cateArr.push(rowData.name);
				lDataArr.push({y: -Math.round((rowData.kcm_l / rowData.kcm_sum) * 100, 1), cnt: rowData.kcm_l, color: this.getColors(type)[0]});
				uDataArr.push({y: -Math.round((rowData.kcm_u / rowData.kcm_sum) * 100, 1), cnt: rowData.kcm_u, color: this.getColors(type)[1]});
				tDataArr.push({y: Math.round((rowData.kcm_t / rowData.kcm_sum) * 100, 1), cnt: rowData.kcm_t, color: this.getColors(type)[2]});
				aDataArr.push({y: Math.round((rowData.kcm_a / rowData.kcm_sum) * 100, 1), cnt: rowData.kcm_a, color: this.getColors(type)[3]});
				nDataArr.push({y: Math.round((rowData.kcm_n / rowData.kcm_sum) * 100, 1), cnt: rowData.kcm_n, color: this.getColors(type)[4]});
				/*lDataArr.push({y: -rowData.kcm_l, cnt: rowData.kcm_l});
				uDataArr.push({y: -rowData.kcm_u, cnt: rowData.kcm_u});
				tDataArr.push({y: rowData.kcm_t, cnt: rowData.kcm_t});
				aDataArr.push({y: rowData.kcm_a, cnt: rowData.kcm_a});
				nDataArr.push({y: rowData.kcm_n, cnt: rowData.kcm_n});*/
			}
			
			var arrSeries = [];
			arrSeries.push({name: 'L', data: lDataArr, color: this.getColors(type)[0], index: 0, legendIndex: 0});
			arrSeries.push({name: 'U', data: uDataArr, color: this.getColors(type)[1], index: 1, legendIndex: 1});
			arrSeries.push({name: 'T', data: tDataArr, color: this.getColors(type)[2], index: 4, legendIndex: 2});
			arrSeries.push({name: 'A', data: aDataArr, color: this.getColors(type)[3], index: 3, legendIndex: 3});
			arrSeries.push({name: 'N', data: nDataArr, color: this.getColors(type)[4], index: 2, legendIndex: 4});
				
			var options = {
				chart: {
					type: 'bar',
					width: 732,
					height: 380,
					events: {
		            	load: function () {
		            		var height = this.plotHeight;
		            		$.table.contactCallShareTable(data, type, height / cateArr.length);
		            	}
					}
				},
				xAxis : 
				[{ 
					categories : cateArr,
					reversed: false,
			        labels: {
			            step: 1
			        }
				},
				{ 
					categories : cateArr,
					opposite: true,
					reversed: false,
			        labels: {
			            step: 1
			        }
				}],
				yAxis: 
				{
					max: 100,
					title: { text: null },
					labels: {
			            formatter: function () {
			                return Math.abs(this.value) + '%';
			            }
			        }
				},
				plotOptions: {
			        series: {
			            stacking: 'normal',
			            dataLabels: {
			            	formatter: function () {
				                return Math.abs(this.y) + '%';
				            },
							//format: '{point.y}%',
							enabled: true,
							style: { "fontWeight": 'bold', "color": "white" }
						}
			        }
			    },
				legend : {
					verticalAlign: 'top',
					enabled: true
				},
				tooltip: {
					shared: true,
					formatter: function() {
						var p = this.points;
						var titleArr = ['L', 'U', 'T', 'A', 'N'];
						var str = '';
											
						str += '[' + this.x + ']';
						str += '<br>';
						
						//for (var i = 0; i < p.length; i++) {
						//	var rowData = p[i];
							str += titleArr[0] + ' : ' + $.getNumberComma(Math.abs(p[0].point.cnt)) + 'call';
							str += '<br>';
							str += titleArr[1] + ' : ' + $.getNumberComma(Math.abs(p[1].point.cnt)) + 'call';
							str += '<br>';
							str += titleArr[2] + ' : ' + $.getNumberComma(Math.abs(p[4].point.cnt)) + 'call';
							str += '<br>';
							str += titleArr[3] + ' : ' + $.getNumberComma(Math.abs(p[3].point.cnt)) + 'call';
							str += '<br>';
							str += titleArr[4] + ' : ' + $.getNumberComma(Math.abs(p[2].point.cnt)) + 'call';
							str += '<br>';
						//}
						
						return str;
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