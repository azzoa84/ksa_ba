function CustomDSMPlanProfit(host, dispView) {
	var $ = this;
	$.dispId = dispView ? dispView.id : null;
	$.dispView = dispView;
	$.extObj = jQuery(('#' + $.dispId));
		
	$.load = function() {
		$.extObj.load('./fingerPlatform/custom/dsm/customDSMPlanProfit.html', function() {});
	};
	
	$.setIntroRemark = function(gubun) {
		if (gubun == 'QTY') {
			jQuery('.dsmViewText').html('(수량 단위: Box)');
		} else {
			jQuery('.dsmViewText').html('(단위: 천 원)');
		}
	};
	
	$.table = {
		init : function() {
			var tag = "<tr><th></th><th>영업소 평균</th><th>영업부 평균</th></tr>";
			tag =	"<tr> \
	                    <td>GAP<br>(100%달성)</td><td></td><td></td> \
                    </tr> \
                    <tr> \
	                    <td>전년 동기 대비<br>증감 실적</td><td></td><td></td> \
					</tr>";
			return tag;
		},
		getId : function(type) {
			var id = '';
			switch(type) {
				case '10':
					id = 'profitNowTable';
					break;
				case '20':
					id = 'profitAccureTable';
					break;
				case '30':
					id = 'profitHalfTable';
					break;
				default:
					break;
			}
			
			return id;
		},
		render : function(type, title, data, gubun) {
			var tag = this.init();
			
			if (title.length) {
				tag = "<tr>";
				
				for (var i = 0; i < title.length; i++) {
					tag += "<th>";
					tag += title[i];
					tag += "</th>";
				}
				
				tag += "</tr>";
			}
			
			if (data.length) {
				for (var i = 0; i < data.length; i++) {
					var rowData = data[i];
					var objData = Object.keys(rowData);
					tag += "<tr>";
					for (var j = 0; j < objData.length; j++) {
						var rowObjData = objData[j];
						
						if (rowObjData != 'title' && rowData[rowObjData] < 0) {
							tag += "<td style='color: blue;'>";
						} else {
							tag += "<td>";
						}
						
						tag += $.getNumberComma(rowData[rowObjData] || 0);
						tag += "</td>";
					}
					tag += "</tr>";
				}
			}
			
			if (gubun == 'QTY') {
				jQuery('#profitViewText').html('(단위: 개)');
			} else {
				jQuery('#profitViewText').html('(단위: 천 원)');
			}
			
			var id = this.getId(type);
			jQuery('#' + id).html(tag);
		},
		infoTable : function(data, type, width, cnt) {
			var id = jQuery('#' + this.getId(type) + 'Info');
			id.css('width', width);
			var tag = '';
			
			for (var i = 0; i < data.length; i++) {
				var rowData = data[i];
				tag += '<div style="flex:1;display:flex;">';
				tag += '<div style="flex:1;">';
				tag += '<table class="left-tbl"><tr><td>';
				tag += '달성률<br>' + rowData.ar_rate + '%';
				tag += '</td></tr></table>';
				tag += '</div>'
				tag += '<div style="flex:1;">';
				tag += '<table class="right-tbl"><tr><td>';
				tag += '성장률<br>' + rowData.gr_rate + '%';
				tag += '</td></tr></table>';
				tag += '</div>';
				tag += '</div>';
			}						
			
			id.html(tag);
		}
	}
		
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
					id = 'profitNowChart';
					break;
				case '20':
					id = 'profitAccureChart';
					break;
				case '30':
					id = 'profitHalfChart';
					break;
				case '40':
					id = 'profitBfYearProgress';
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
					colorArr = ['#5495D5', '#FF7887', '#60D5A8'];
					break;
				case '30':
				case '40':
					colorArr = ['#5495D5', '#FF7887', '#60D5A8'];
					break;
				case '60':
					colorArr = ['#C7A1E3'];
					break;
				case '70':
					colorArr = ['#8FAADC'];
					break;
				default:
					break;
			}
			
			return colorArr;
		},
		getMaxValue: function() {
			var maxValue = 0;
			
			if (!arguments) {
				return maxValue;
			}
			
			var objArg = Object.keys(arguments);
			var value = 0;
			
			for (var i = 0; i < objArg.length; i++) {
				value = Math.round(Number(arguments[objArg[i]]), 0);
				maxValue = Math.max(maxValue, value);
			}
			
			return maxValue;
		},
		profitNowChart: function(data, type, searchType) {
			var id = this.getChartId(type);
			this.destroy(id);
			
			if (!data.length) {
				return;
			}
			
			var dividingValue = 1;
			
			if (searchType != 'QTY') {
				dividingValue = 1000;
			}
			
			var cateArr = [];
			var resArr = [], tarArr = [], bfResArr = [];
			var arrSeries = [];
			var maxValue = 0;
			
			for (var i = 0; i < data.length ;i++) {
				var rowData = data[i];
				
				cateArr.push(rowData.name);
				
				tarArr.push({y: Math.round(rowData.tar / dividingValue, 0), arRate: rowData.ar_rate, grRate: rowData.gr_rate});
				resArr.push({y: Math.round(rowData.res / dividingValue, 0), arRate: rowData.ar_rate, grRate: rowData.gr_rate});
				bfResArr.push({y: Math.round(rowData.bf_res / dividingValue, 0), arRate: rowData.ar_rate, grRate: rowData.gr_rate}); 
				
				maxValue = this.getMaxValue(rowData.tar, rowData.res, rowData.bf_res, maxValue);
			}
			
			var nameArr = ['목표', '실적', '전년동기 실적'];
			
			arrSeries.push({type: 'column', name: nameArr[0], data: tarArr, color: this.getColors(type)[0]});
			arrSeries.push({type: 'column', name: nameArr[1], data: resArr, color: this.getColors(type)[1]});
			arrSeries.push({type: 'column', name: nameArr[2], data: bfResArr, color: this.getColors(type)[2]});
			
			maxValue = Math.round(maxValue / dividingValue, 0);
			
			var options = {
				chart: {
					/*renderTo: 'container',
		            events: {
		            	load: function () {
		            		var addWidth = 1076 / this.userOptions.xAxis.categories.length;
		            		for (var i = 0; i < this.userOptions.xAxis.categories.length; i++) {
		            			var labelTxt = "성장률 : " + this.userOptions.series[2].data[i].arRate + '%';
		            			labelTxt += "<br>";
		            			labelTxt += "달성률 : " + this.userOptions.series[2].data[i].grRate + '%';
		            			var label = this.renderer.label(labelTxt, 90 + i * addWidth, 0)
		                        .attr({
		                            fill: Highcharts.getOptions().colors[0],
		                            padding: 10,
		                            r: 0,
		                            zIndex: 8
		                        })
		                        .css({
		                            color: '#FFFFFF'
		                        })
		                        .add();
		            		}
		                }
		            },*/
					width: 1150,
					height: 360,
					events: {
		            	load: function () {
		            		var width = this.plotWidth;
		            		$.table.infoTable(data, type, width, cateArr.length);
		            	}
					}
				},
				xAxis : { categories : cateArr },
				yAxis: 
				{
					min: 0,
					max: (maxValue + (maxValue / 7)),
					title: { text: null },
					labels : { formatter : function() { return Highcharts.numberFormat(this.value, 0); } }
				},
				tooltip: {
					shared: true,
					useHTML: true,
					formatter: function() {
						var points = this.points;
						var str = '<span>';
						
						for (var i = 0; i < points.length; i++) {
							var rowData = points[i].point;
							str += nameArr[i] + ' : ' + $.getNumberComma(rowData.y);
							str += '<br>';
							
							if (i == points.length - 1) {
								str += '<label style="color: blue;">달성률' + ' : ' + (rowData.arRate ? rowData.arRate.toFixed(1) : 0) + '%</label>';
								str += '<br>';
								str += '<label style="color: red;">성장률' + ' : ' + (rowData.grRate ? rowData.grRate.toFixed(1) : 0) + '%</label>';
							}
						}
						str += '</span>';
						return str;
					},
					positioner: function (w, h, p) {
		            	return { x: p.plotX, y: p.plotY + 50 };
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
					y: -15,
					enabled: true
				},
				series : arrSeries
			};
			
			this.create(id, options);
		},
		bfProgressChart : function(columns, data, type, searchType) {
			var id = this.getChartId(type);
			this.destroy(id);
			
			var dividingValue = 1;
			var cateArr = [];
			var arrSeries = [];
			
			if (searchType != 'QTY') {
				dividingValue = 1000;
			}
					
			for (var i = 0; i < columns.length; i++) {
				cateArr.push(columns[i].yyyymm);
			}
						
			
			for(var i = 0; i < data.length; i++) {
    			var rowData = data[i];    			
    			var arsData = [];
    			
    			for(var intRowNum = 1; intRowNum <= this.fullYear; intRowNum++) {
    				var resValue = rowData['res_ym' + intRowNum] || 0;
    				var tarValue = rowData['tar_ym' + intRowNum] || 0;
    				arsData.push({
    					y: Math.round(resValue / dividingValue, 0),
    					tar: Math.round(tarValue / dividingValue, 0),
    					name: rowData.name
    				});
    			}
    			 
    			// 부서 평균
    			if (rowData.code == 'ALL') {
    				arrSeries.push(
	    			{
	    				type: 'spline',
	    				yAxis: 0,
	    				name: rowData.name,
	    				data: arsData,
	    				lineWidth: 7,
	    				color: '#00b4ed',
	    				dashStyle: 'shortdot'
	    			});
    			} 
    			// 영업소 평균
    			else if (rowData.code == 'TEAM') {
    				arrSeries.push(
	    			{
	    				type: 'spline',
	    				yAxis: 0,
	    				name: rowData.name,
	    				data: arsData,
	    				lineWidth: 4,
	    				color: '#FF9090',
	    				dashStyle: 'ShortDashDotDot'
	    			});
    			}
    			// MR or 팀     			
    			else {
    				arrSeries.push(
	    			{
	    				type: 'spline',
	    				yAxis: 0,
	    				lineWidth: 1,
	    				name: rowData.name,
	    				data: arsData
	    			});
    			}
    		}
			
			var options =
   			{
				chart: {
					width: 1155,
					height: 475
				},
				title : null,
				legend : {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle',
					enabled: true
				},
				plotOptions: {
					series: {
						lineWidth: 2,
						dataLabels: {
							format: '{point.y:,.0f}',
							enabled: true,
							style: { "fontWeight": 'bold' }
						}
					}
				},
				tooltip: {
					shared: true,
					formatter: function() {
						var points = this.points;
						var str = '';
						
						for (var i = 0; i < points.length; i++) {
							var rowData = points[i];
							str += rowData.key + ' : ';
							str += '<span style="color: blue;">';
							str += '[목표] ' + $.getNumberComma(rowData.point.tar);
							str += '</span>';
							str += '  ';
							str += '<span style="color: green;">';
							str += '[실적] ' + $.getNumberComma(rowData.point.y);
							str += '</span>';
							str += '  ';
							str += '<span style="color: red;">';
							str += '[달성률] ' + Math.round((rowData.point.y / rowData.point.tar) * 100, 1) || 0;
							str += '%';
							str += '</span>';
							str += '<br>';
						}
						
						return str;
					}
				},
    			xAxis: { categories : cateArr },
				yAxis:
				[{
					title : { text : null },
					labels : { formatter : function() { return Highcharts.numberFormat(this.value, 0); } }
			 	}],
				credits: { enabled: false },
				series: arrSeries
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