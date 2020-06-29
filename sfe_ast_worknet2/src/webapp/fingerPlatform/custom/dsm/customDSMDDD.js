function CustomDSMDDD(host, dispView) {
	var $ = this;
	$.dispId = dispView ? dispView.id : null;
	$.dispView = dispView;
	$.extObj = jQuery(('#' + $.dispId));
		
	$.load = function() {
		$.extObj.load('./fingerPlatform/custom/dsm/customDSMDDD.html', function() {});
	};
	
	$.setDateStr = function(value) {
		var str = value.substr(2, 2) + '년 ' + value.substr(4, 2) + '월';
		$.extObj.find('.ddd-date').html('(' + str + ')');
	}
	
	$.setText = function(deptCode, teamCode, yyyymm) {		
		if (deptCode == 'S030') {
			$.extObj.find('.mr-ddd').html('MR');
		} else {
			if (teamCode) {
				$.extObj.find('.mr-ddd').html('MR');
			} else {
				$.extObj.find('.mr-ddd').html('영업소');
			}
		}
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
					id = 'deptDDDShareChart';
					break;
				case '20':
					id = 'teamDDDShareChart';
					break;
				case '30':
					id = 'mrDDDShareChart';
					break;
				case '40':
					id = 'mrDDDFYChart';
					break;
				default: 
					break;
			}
			
			return id;
		},
		getColors: function() {
			return ['#B5A1DB', '#57B0EC', '#FFB884', '#D67A7F', '#94706D', '#98FB98', '#FFB6C1', '#DAA520', '#C0C0C0', '#9ACD32', '#CD5C5C', '#FFFF00', '#FFEFD5'];
		},
		setVisibleBox: function(teamCode) {
			if (teamCode) {
				if (teamCode == 'S030') {
					$.extObj.find('#deptDDDBox').css('width', '1200px');
					$.extObj.find('#teamDDDBox').css('display', 'none');
				} else {
					$.extObj.find('#deptDDDBox').css('width', '600px');
					$.extObj.find('#teamDDDBox').css('display', '');
				}
			} else {
				$.extObj.find('#deptDDDBox').css('width', '1200px');
				$.extObj.find('#teamDDDBox').css('display', 'none');
			}
		},
		pieChart: function(data, type, teamCode) {
			var id = this.getChartId(type);
			this.destroy(id);
			
			if (!data.length) {
				return;
			}
			
			var dataArr = [];
			var arrSeries = [];
			
			for (var i = 0; i < data.length ;i++) {
				var rowData = data[i];
				
				dataArr.push({
					name: rowData.comp_product,
					y: rowData.ddd_amt
					//color: this.getColors(gubun)[i]
				});
			}
			
			arrSeries.push({name: '', data: dataArr});
						
			var isSizeUp = true;
			
			if (teamCode) {
				if (teamCode == 'S030') {
					isSizeUp = true;
				} else {
					isSizeUp = false;
				}
			} else {
				isSizeUp = true;
			}
			
			var options = {
				chart: {
					type: 'pie',
					width: (!isSizeUp ? 565 : 1160),
					height: 380
				},
				tooltip: {
					formatter: function() {
						var str = '';
						str += this.point.name + ' : ' + $.getNumberComma(this.y);
						
						return str;
					}
				},
				plotOptions: {
			        pie: {
			        	allowPointSelect: true,
			        	innerSize: (!isSizeUp ? 100 : 150),
			        	cursor: 'pointer',
			            borderWidth: 1,
			            dataLabels: {
			                enabled: true,
			                format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
			                /*filter: {
			                    property: 'percentage',
			                    operator: '>',
			                    value: 10
			                },*/
			                style: {
			                	fontSize: '10px'
			                }
			            },
			            connectorWidth: 0,
			            connectorPadding: 0,
			            colors: this.getColors(),
			            showInLegend: true
			        }
			    },
				legend : {
					align: 'center',
					verticalAlign: 'bottom'
				},
				series : arrSeries
			};
			
			this.create(id, options);
		},
		barChart: function(data, type) {
			var id = this.getChartId(type);
			this.destroy(id);
			
			if (!data.length) {
				return;
			}
			
			var cateArr = [];
			var arrSeries = [];
			var dataArr = [];
			var beforeRow = data[0];
			var firstCompProduct = beforeRow.comp_product;
			var iCount = 0;
			data.push(data[data.length - 1]);
			
			for (var i = 0; i < data.length; i++) {
				var rowData = data[i];
				
				if (rowData.comp_product == firstCompProduct) {
					cateArr.push(rowData.name);
				}
				
				if (beforeRow.comp_product != rowData.comp_product || i == data.length - 1)
				{
					arrSeries.push({
						type: 'column',
						name: beforeRow.comp_product,
						color: this.getColors()[iCount],
						data: dataArr
					});
					
					iCount++;
					dataArr = [];
					beforeRow = rowData;
				}
				
				dataArr.push({y: rowData.ddd_amt || 0, productName: rowData.comp_product});
			}
			
			var options = {
				chart: {
					width: 1145,
					height: 480
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
							if (i == 0) {
								str += '[' + rowData.category + ']<br>';
							}
							
							str += rowData.productName + ' : ' + $.getNumberComma(rowData.y);
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
							style: { fontWeight: 'bold', color: 'black' }, 
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
		lineChart: function(cateList, data, type) {
			var id = this.getChartId(type);
			this.destroy(id);
			
			if (!data.length) {
				return;
			}
			
			var cateArr = [];
			var dataArr = [];
			var arrSeries = [];
			var beforeRow = data[0];
			var iCount = 0;
			var empCount = 0;
			data.push(data[data.length - 1]);
			
			for (var i = 0; i < cateList.length; i++) {
				cateArr.push(cateList[i].yyyymm);
			}
					
			for(var i = 0; i < data.length; i++) {
    			var rowData = data[i];    
    			
    			if (beforeRow.code != rowData.code || i == data.length - 1)
				{
    				// 부서 평균
        			if (beforeRow.gubun == 'DEPT') {
        				arrSeries.push(
    	    			{
    	    				type: 'spline',
    	    				yAxis: 0,
    	    				name: beforeRow.name,
    	    				data: dataArr,
    	    				lineWidth: 7,
    	    				color: '#519BE2',
    	    				dashStyle: 'shortdot'
    	    			});
        			} 
        			// 영업소 평균
        			else if (beforeRow.gubun == 'TEAM') {
        				arrSeries.push(
    	    			{
    	    				type: 'spline',
    	    				yAxis: 0,
    	    				name: beforeRow.name,
    	    				data: dataArr,
    	    				lineWidth: 4,
    	    				color: '#E35E66',
    	    				dashStyle: 'ShortDashDotDot'
    	    			});
        			}
        			// MR or 팀     			
        			else {
        				arrSeries.push(
    	    			{
    	    				type: 'spline',
    	    				yAxis: 0,
    	    				name: beforeRow.name,
    	    				data: dataArr,
    	    				lineWidth: 1,
    	    				color: this.getColors()[empCount]
    	    			});
        				
        				empCount++;
        			}
					
					iCount++;
					dataArr = [];
					beforeRow = rowData;
				}
				
				dataArr.push({y: rowData.ddd_rate || 0, dddAmt: rowData.ddd_amt || 0, compProduct: rowData.comp_product, empName: rowData.name});
    		}
			
			var options =
   			{
				chart: {
					width: 1155,
					height: 475
				},
				title : null,
				legend : {
					/*layout: 'vertical',
					align: 'right',*/
					verticalAlign: 'bottom',
					enabled: true
				},
				plotOptions: {
					series: {
						lineWidth: 2,
						dataLabels: {
							format: '{point.y:,.0f}%',
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
							str += '[' + rowData.point.empName + '] : ';
							str += $.getNumberComma(rowData.point.dddAmt);
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