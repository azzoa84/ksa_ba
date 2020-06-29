function CustomDSMCallCoverage(host, dispView, bindEvents) {
	var $ = this;
	$.dispId = dispView ? dispView.id : null;
	$.dispView = dispView;
	$.extObj = jQuery(('#' + $.dispId));
	$.bindEvents = bindEvents;
	
	$.load = function() {
		$.extObj.load('./fingerPlatform/custom/dsm/customDSMCallCoverage.html', function() { 
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
	
	$.setTitle = function(teamCode, empName) {
		if (teamCode) {
			jQuery('.coverage-dept').html('영업소');
			if (!empName) {
				jQuery('.coverage-dept-tot').html('영업소');
			} else {
				jQuery('.coverage-dept-tot').html(empName);
			}
			jQuery('.coverage-emp').html('담당자별');
		} else {
			jQuery('.coverage-dept').html('영업부');
			jQuery('.coverage-dept-tot').html('영업부');
			jQuery('.coverage-emp').html('영업소별');
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
					id = 'teamTotalCoverage';
					break;
				case '20':
					id = 'teamAvgCoverage';
					break;
				case '30':
					id = 'deptAvgCoverage';
					break;
				case '40':
					id = 'mrAvgCoverage';
					break;
				default: 
					break;
			}
			
			return id;
		},
		// MR or 영업소 별 차트
		mrCallCoverageChart: function(kcmArr, excArr, type) {
			var id = this.getChartId(type);
			this.destroy(id);
			
			if (!kcmArr.length) {
				return;
			}
			
			var cateArr = [];
			var arrSeries = [];
						
			var kcmEmpData = [];
			var targetEmpData = [];
			var nonTargetEmpData = [];
			var excEmpData = [];
			var zeroEmpData = [];
			
			for (var i = 0; i < kcmArr.length; i++) {
				var kcmData = kcmArr[i];
				var excData = excArr[i];
				
				cateArr.push(kcmData.emp_name);
				
				kcmEmpData.push({y: kcmData.tot_cnt, color: '#4F9BE2', type: 'KCM'});
				targetEmpData.push({y: kcmData.cnt, type: 'TARGET', color: '#2EC8CA'});
				nonTargetEmpData.push({y: kcmData.non_cnt, foc: true, type: 'TARGET', fColor: '#002060', color: '#BFBFBF'});
				excEmpData.push({y: excData.cnt, type: 'RES', color: '#FFB880'});
				zeroEmpData.push({y: excData.non_cnt, foc: true, type: 'RES', fColor: '#FF0000', color: '#D9D9D9'});
			}
			
			arrSeries.push({type: 'column', name: 'KCM Customer', data: kcmEmpData, stack: 'KCM', color: '#4F9BE2'});
			arrSeries.push({type: 'column', name: 'Non-Target Customer', data: nonTargetEmpData, stack: 'TARGET', color: '#BFBFBF'});
			arrSeries.push({type: 'column', name: 'Target Customer', data: targetEmpData, stack: 'TARGET', color: '#2EC8CA'});
			arrSeries.push({type: 'column', name: 'Zero Call Customer', data: zeroEmpData, stack: 'EXC', color: '#D9D9D9'});
			arrSeries.push({type: 'column', name: '실행 Call Customer', data: excEmpData, stack: 'EXC', color: '#FFB880'});
						
			var titleArr = ['KCM 고객 : ', 'Target 고객 : ', 'Non-target 고객 : ', '실행call 고객 : ', 'Zero call 고객 : '];
			var options = {
				chart: {
					width: 1160,
					height: 375
				},
				xAxis : { 
					categories : cateArr,
				},
				yAxis :
				{
					min: 0,
					title: { text: null }
				},
				tooltip : { 
					shared : true,
					formatter: function() {
						var points = this.points;
						
						var str = '<span>';
						str += titleArr[0] + $.getNumberComma(points[0].point.y) + '<br>';
						str += titleArr[1] + $.getNumberComma(points[2].point.y) + '<br>';
						str += titleArr[2] + $.getNumberComma(points[1].point.y) + '<br>';
						str += titleArr[3] + $.getNumberComma(points[4].point.y) + '<br>';
						str += titleArr[4] + $.getNumberComma(points[3].point.y) + '<br>';
						str += '</span>';
						return str;
					}
				},
				plotOptions: { 
					column: { 
						stacking: 'normal',
						dataLabels: { 
							enabled: true, 
							style: { fontWeight: 'bold', color: 'white' }, 
							formatter: function() {
								if (this.point.foc) {
									var div = "<table>";
									div += "<tr>";
									div += "<td style='font-weight: 600; text-align: center; color: " + this.point.fColor + ";'>";
									div += (this.percentage ? this.percentage.toFixed(1) : 0) + '%';
									div += "</td>";
									div += "</tr>";
									div += "</table>";
										
									return div;								
								} else {
									return '<span style="font-size: 13px; color:#000;">' + (this.y ? this.y : '') + '</span>';
								}
							},
							useHTML: true
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
		// 부서 or 영업소 Coverage 차트
		callCoverageChart: function(kcmData, excData, type, teamCode) {
			var id = this.getChartId(type);
			this.destroy(id);
			
			if (teamCode) {
				jQuery('#teamCoverageBox').css('display', '');
			} else {
				jQuery('#teamCoverageBox').css('display', 'none');
			}
			
			var chartWidth = (teamCode ? 368 : 566); 
			var arrSeries = [];
			var nonTitle = 'Non-target customer';
			var zeroTitle = 'Zero call<br>customer';
			var targetTitleArr = ['Target 고객', 'Non-target 고객'];
			var callCustomerTitleArr = ['실행call 고객', 'Zero call 고객'];
			
			arrSeries.push({type: 'column', name: '', data: [{y: kcmData.tot_cnt, color: '#4F9BE2', type: 'KCM'}]});
			arrSeries.push({type: 'column', name: '', data: ['', {y: kcmData.non_cnt, foc: true, title: nonTitle, type: 'TARGET', fColor: '#002060', color: '#BFBFBF'}, {y: excData.non_cnt, foc: true, title: zeroTitle, type: 'RES', fColor: '#FF0000', color: '#D9D9D9'}]});
			arrSeries.push({type: 'column', name: '', data: ['', {y: kcmData.cnt, type: 'TARGET', color: '#2EC8CA'}, {y: excData.cnt, type: 'RES', color: '#FFB880'}]});
						
			var options = {
				chart: {
					width: chartWidth,
					height: 375
				},
				xAxis : { 
					categories : this.cateFullNmeArr,
				},
				yAxis :
				{
					min: 0,
					title: { text: null }
				},
				tooltip : { 
					shared : true,
					formatter: function() {
						var points = this.points;
						
						var str = '<span>';
						
						for (var i = 0; i < points.length; i++) {
							var rowData = points[i].point;
							var reverseIndex = points.length - i - 1;
							
							if (rowData.type == 'KCM' && i == 0) {
								str += 'KCM 고객 : ' +  $.getNumberComma(rowData.y);
							}
							
							if (rowData.type == 'TARGET') {
								str += targetTitleArr[i] + ' : ' + $.getNumberComma(points[reverseIndex].point.y);
							}
							
							if (rowData.type == 'RES') {
								str += callCustomerTitleArr[i] + ' : ' + $.getNumberComma(points[reverseIndex].point.y);
							}
														
							str += '<br>';
						}
						str += '</span>';
						return str;
					}
				},
				plotOptions: { 
					column: { 
						stacking: 'normal',
						dataLabels: { 
							enabled: true, 
							style: { fontWeight: 'bold', color: 'white' }, 
							formatter: function() {
								if (this.point.foc) {
									var div = "<table>";
									if (type == '10') {
										div += "<tr>";
										div += "<td style='font-size: 13px; font-weight: 600; text-align: center; color: " + this.point.fColor + "'>";
										div += this.point.title;
										div += "</td>";
									}
									div += "<tr>";
									div += "<td style='font-size: 13px; font-weight: 600; text-align: center; color: " + this.point.fColor + ";'>";
									div += (this.percentage ? this.percentage.toFixed(1) : 0) + '%';
									div += "</td>";
									div += "</tr>";
									div += "</table>";
										
									return div;								
								} else {
									return '<span style="font-size: 15px; color:#000;">' + (this.y ? this.y : '') + '</span>';
								}
							},
							useHTML: true
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