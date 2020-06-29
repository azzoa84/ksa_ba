function CustomDSMCompanyCompare(host, dispView) {
	var $ = this;
	$.dispId = dispView ? dispView.id : null;
	$.dispView = dispView;
	$.extObj = jQuery(('#' + $.dispId));
	$.isFirst = true;
	$.mStrExecuteUrl = null;		
	$.setExecuteUrl = function(strUrl) { $.mStrExecuteUrl = strUrl; };
	
	$.load = function() {
		$.extObj.load('./fingerPlatform/custom/dsm/customDSMCompanyCompare.html', function() {});
	};
	
	$.setIntroRemark = function(gubun) {
		if (gubun == 'QTY') {
			jQuery('.dsmViewText').html('(수량 단위: Box)');
		} else {
			jQuery('.dsmViewText').html('(단위: 천 원)');
		}
	};
	
	// 콤보박스 관련
	$.combo = {
		employeeId: ['', '', ''],
		empName: ['', '', ''],
		deptName: ['', '', ''],
		companyId: ['', '', ''],
		companyName: ['', '', ''],
		getId: function(tabSeq) {
			var id = jQuery('#companyComboTab' + tabSeq);
			return id;
		},
		render: function(data, tabSeq) {
			var tag = '';
			tag += '<option value="">거래처 선택</option>';
			
			for (var i = 0; i < data.length; i++) {
				var rowData = data[i];
				tag += '<option value="' + rowData.company_id + '" ';
				tag += 'data-employee-id="' + rowData.employee_id + '" ';
				tag += 'data-emp-name="' + rowData.emp_name + '" ';
				tag += 'data-dept-name="' + rowData.dept_name + '"';
				tag += '>' + rowData.company_name + '</option>';
			}
			
			this.addChangeEvent(tag, '1');
			this.addChangeEvent(tag, '2');
			this.addChangeEvent(tag, '3');
			
			$.isFirst = false;
		},
		addChangeEvent: function(tag, tabSeq) {
			var id = this.getId(tabSeq);
			id.html(tag);
			if ($.isFirst) {
				id.on('change', function() {$.combo.companyCallback(this, tabSeq)});
			}
		},
		companyCallback: function(e, tabSeq) {
			if (!e.value) {
				MessageBoxShow('거래처를 선택하세요.');
				return;
			}
			
			var index = tabSeq - 1;
			$.combo.employeeId[index] = jQuery(e).find('option:selected').attr('data-employee-id');
			$.combo.empName[index] = jQuery(e).find('option:selected').attr('data-emp-name');
			$.combo.deptName[index] = jQuery(e).find('option:selected').attr('data-dept-name');
			$.combo.companyId[index] = e.value;
			$.combo.companyName[index] = jQuery(e).find('option:selected').text();
							
			jQuery('#companyEmpInfoTab' + tabSeq).html($.combo.deptName[index] + ' ' + $.combo.empName[index]);
			jQuery('#companyDetailTab' + tabSeq).css('display', '');
			$.mStrExecuteUrl(tabSeq, $.combo.employeeId[index], $.combo.companyId[index]);
		}
	}
	
	// 거래처 기본정보 && 영업소 내 Share
	$.setCompanyInfoPanel = function(data, tabSeq) {
		var basicInfoData = data[0][0];
		var shareData = data[1][0];
		
		$.setHtml('infoNumBedTab' + tabSeq, $.getNumberComma(basicInfoData ? basicInfoData.num_beds : 0));
		$.setHtml('infoIndSpCntTab' + tabSeq, $.getNumberComma(basicInfoData ? basicInfoData.ind_sp_cnt : 0));
		$.setHtml('infoDoctorCntTab' + tabSeq, $.getNumberComma(basicInfoData ? basicInfoData.dr_cnt : 0));
		$.setHtml('companyCntTab' + tabSeq, $.getNumberComma(shareData ? shareData.company_cnt : 0));
		$.setHtml('companyTarShareTab' + tabSeq, shareData.tar_share + '<span>%</span>');
		$.setHtml('companyResShareTab' + tabSeq, shareData.res_share + '<span>%</span>');
	};
	
	// 목표실적 현황
	$.setProfitInfoPanel = function(data, tabSeq) {
		var topDeptShareData = data[0][0];
		var profitInfoData = data[1][0];
		var profitChartData = data[2];
		var profitDateData = data[3][0];
		
		$.setHtml('topTarTab' + tabSeq, '부서 내 상위 ' + (topDeptShareData ? topDeptShareData.top_of_tar : '') + '%');
		$.setHtml('topResTab' + tabSeq, '부서 내 상위 ' + (topDeptShareData ? topDeptShareData.top_of_res : '') + '%');
		
		$.setHtml('profitHalfTarTab' + tabSeq, $.getNumberComma(profitInfoData ? profitInfoData.half_tar : 0));
		$.setHtml('profitHalfResTab' + tabSeq, $.getNumberComma(profitInfoData ? profitInfoData.half_res : 0));
		$.setHtml('profitGapTab' + tabSeq, $.getNumberComma(profitInfoData ? profitInfoData.gap : 0));
		$.setHtml('profitBeforeResTab' + tabSeq, $.getNumberComma(profitInfoData ? profitInfoData.bf_res : 0));
		$.setHtml('profitTarValTab' + tabSeq, (profitInfoData ? profitInfoData.ar_rate : 0) + '%');
		$.setHtml('profitResValTab' + tabSeq, (profitInfoData ? profitInfoData.gr_rate : 0) + '%');
		
		$.setHtml('profitFromToTab' + tabSeq, '(소화실적 기준 기간: ' + $.setDateText(profitDateData.from_date) + '~' + $.setDateText(profitDateData.to_date) + ')');
		
		$.images.render('profitTarChartTab' + tabSeq, (profitInfoData ? profitInfoData.ar_rate : 0), '달성률', '_blue');
		$.images.render('profitResChartTab' + tabSeq, (profitInfoData ? profitInfoData.gr_rate : 0), '성장률', '');
		
		$.chart.profitTrendChart(profitChartData, tabSeq);
	};
	
	// Call
	$.setCallInfoPanel = function(data, tabSeq) {
		var callResultData = data[0][0];
		var callGradeData = data[1];
		var callActivityData = data[2];
		
		$.setHtml('callResultUseRateTab' + tabSeq, '실행률 : ' + (callResultData ? callResultData.call_rate : 0) + '%');
		$.chart.callResultChart(callResultData, tabSeq);
		$.chart.callActivityChart(callActivityData, tabSeq);
		$.table.render('callGradeTableTab' + tabSeq, callGradeData);
	};
	
	// 예산
	$.setBudgetInfoPanel = function(data, tabSeq) {
		var amPlanAmt = data[0][0].am_plan_amt || 0;
		var amUseAmt = data[1][0].am_use_amt || 0;
		var amCompanyUseAmt = data[2][0].am_company_use_amt || 0;
		var jasaUseAmt = data[3][0].jasa_use_amt || 0;
		var mdUseAmt = data[4][0].md_use_amt || 0;
		var amDetailCnt = data[5][0].am_detail_cnt || 0;
		var mdDetailCnt = data[6][0].md_detail_cnt || 0;
		var jasaDetailCnt = data[7][0].jasa_detail_cnt || 0;
		var maxValue = $.getMaxValue(amCompanyUseAmt, jasaUseAmt, mdUseAmt);
		
		var amCompanyUseAmtArr = [];
		var etcUseAmtArr = [];
		
		amCompanyUseAmtArr.push(amCompanyUseAmt);
		etcUseAmtArr.push(jasaUseAmt);
		etcUseAmtArr.push(mdUseAmt);
		
		var rate = Math.round(((amUseAmt / amPlanAmt) * 100), 0) || 0;
		$.setHtml('budgetAmRateTab' + tabSeq, '사용률 : ' + rate + '%');
		
		$.chart.budgetAmResultChart(amPlanAmt, amUseAmt, tabSeq);
		$.chart.budgetUseChart('budgetAmCompanyChartTab', amCompanyUseAmtArr, tabSeq, 100, maxValue, 'COMPANY');
		$.chart.budgetUseChart('budgetEtcChartTab', etcUseAmtArr, tabSeq, 150, maxValue, '');
		
		$.setHtml('budgetAmDetailTab' + tabSeq, amDetailCnt);
		$.setHtml('budgetMdDetailTab' + tabSeq, mdDetailCnt);
		$.setHtml('budgetJasaDetailTab' + tabSeq, jasaDetailCnt);
	}
	
	// Coding
	$.setCodingInfoPanel = function(data, tabSeq) {
		var codingData = data[0];				
		var id = jQuery('#codingTableTab' + tabSeq);
		var tag = '';

		for (var i = 0; i < codingData.length; i++) {
			var rowData = codingData[i];
			if (i % 2 == 0) {
				if (i != 0) {
					tag += '<div class="flex" style="margin-top:5px;">';
				} else {
					tag += '<div class="flex">';
				}
			}
			
			tag += '<div class="coding-box">';
            tag += '<p class="coding-title">' + rowData.product_name + '</p>';
            tag += '<div class="flex">';
            tag += '<div class="icon">';
            tag += (rowData.comp_type.indexOf('001') > -1 ? '<img src="./fingerPlatform/images/dsm/v1.png">' : '<img src="">');
            tag += '<p>원내</p>';
            tag += '</div>';
            tag += '<div class="icon">';
            tag += (rowData.comp_type.indexOf('002') > -1 ? '<img src="./fingerPlatform/images/dsm/v2.png">' : '<img src="">');
            tag += '<p>원외</p>';
            tag += '</div>';
            tag += '</div>';
            tag += '</div>';
            
            if (i % 2 == 1 || i == codingData.length - 1) {
            	tag += '</div>';
            }
		}
		
		id.html(tag);
	}
	
	$.setDateText = function(value) {
		return value.substr(2, 2) + '.' + value.substr(4, 2);
	};
	
	$.setHtml = function(id, value) {
		jQuery('#' + id).html(value);
	};
	
	$.getMaxValue = function() {
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
	
	$.table = {
		render: function(id, data) {
			var tabId = jQuery('#' + id);
			var tag = '';
			
			for (var i = 0; i < data.length; i++) {
				var rowData = data[i];
				tag += '<tr>';
				tag += '<td class="left"><i class="fas fa-angle-right"></i>' + rowData.grade_name + '</td>';
                tag += '<td>' + rowData.L + '</td>';
                tag += '<td>' + rowData.U + '</td>';
                tag += '<td>' + rowData.T + '</td>';
                tag += '<td>' + rowData.A + '</td>';
                tag += '<td>' + rowData.N + '</td>';
                tag += '<td class="blue">' + rowData.TOT + '</td>';
                tag += '</tr>';
			}
			
			tabId.html(tag);
		}
	};
	
	$.images = {
		render: function(id, data, title, suffix) {
			var id = jQuery('#' + id);
			var value = Number(data) || 0;
			suffix = (!value ? '' : suffix);
			var imgNum = (value / 10 > 10 ? 10 : value / 10);
			var imgUrl = './fingerPlatform/images/progress_' + Math.round(imgNum) + suffix + '.png';	;
			var tag = "<img class='circle-img' src='" + imgUrl + "' />";
			id.html(tag);
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
		profitTrendChart: function(data, tabSeq) {
			var id = 'profitTrendChartTab' + tabSeq;
			this.destroy(id);
						
			var cateArr = [];
			var dataArr = [];
			var arrSeries = [];
					
			for (var i = 0; i < data.length; i++) {
				var rowData = data[i];
				cateArr.push($.setDateText(rowData.yyyymm));
				dataArr.push(rowData.res);
			}
			
			arrSeries.push({
				type: 'spline',
				yAxis: 0,
				lineWidth: 1,
				data: dataArr,
				color: '#D97D85'
			});
					
									
			var options =
   			{
				chart: {
					width: 301,
					height:240
				},
				title : null,
				legend : {
					enabled: false
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
						var str = '';
						var spData = this.x.split('.');
						var yyyy = spData[0];
						var mm = Number(spData[1]);
						str += yyyy + '년 ' + mm + '월 실적: ' + $.getNumberComma(this.y);
						
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
		},
		callResultChart: function(data, tabSeq) {
			var id = 'callResultChartTab' + tabSeq;
			this.destroy(id);
			
			var cateArr = [''];
			var fxCalldataArr = [];
			var excCalldataArr = [];
			var maxCall = 0;
			
			fxCalldataArr.push({y: data.fx_call * 0.8, title: '목표', callCnt: data.fx_call});
			excCalldataArr.push({y: data.exc_call * 0.8, title: '실행', callCnt: data.exc_call});
					
			var arrSeries = [];
			arrSeries.push({name: '목표', data: fxCalldataArr, stack: 1, color: '#E35D66', dataLabels: { enabled: true, x: 80, format: '{point.callCnt:,.0f}' + 'call', style: { 'fontWeight': 'bold', 'fontSize': '10px' } }});
			arrSeries.push({name: '실행', data: excCalldataArr, stack: 2, zIndex: 1, pointPadding: 0.3, color: '#FFC59D', dataLabels: { enabled: true, format: '{point.callCnt:,.0f}' + 'call', style: { 'fontWeight': 'bold', 'color': 'white' } }});

			var options = {
				chart: {
					type: 'bar',
					width: 301,
					height: 80
				},
				xAxis : { categories : cateArr },
				yAxis: 
				{
					min: 0,
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
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle',
					enabled: true
				},
				series : arrSeries
			};
			
			this.create(id, options);
		},
		callActivityChart: function(data, tabSeq) {
			var id = 'callActivityChartTab' + tabSeq;
			this.destroy(id);
			
			var cateArr = [''];
			var arrSeries = [];
			var colors = ['#2BC8CB', '#B6A2DF', '#4E9BE3', '#FDB881', '#DF5E63'];
			
			for (var i = 0; i < data.length; i++) {
				var rowData = data[i];
				arrSeries.push({name: rowData.call_kind_name, data: [{y: rowData.call_cnt || 0, callName: rowData.call_kind_name}], color: colors[i]});
			}
			
			var options =
   			{
				chart: {
					type: 'bar',
					width: 301,
					height: 180
				},
				title : null,
				legend : {
					itemStyle: {fontSize: '8px'}
				},
				plotOptions: {
					series: {
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
		},
		budgetAmResultChart: function(amPlanAmt, amUseAmt, tabSeq) {
			var id = 'budgetAmResultChartTab' + tabSeq;
			this.destroy(id);
			
			var cateArr = [''];
			var amPlanDataArr = [];
			var amUseDataArr = [];
			var maxCall = 0;
			var planTitle = 'AM계획금액';
			var useTitle = 'AM사용금액';
			
			amPlanDataArr.push({y: amPlanAmt * 0.8, title: planTitle, amAmt: amPlanAmt});
			amUseDataArr.push({y: amUseAmt * 0.8, title: useTitle, amAmt: amUseAmt});
					
			var arrSeries = [];
			arrSeries.push({name: planTitle, data: amPlanDataArr, stack: 1, color: '#DCF28D', dataLabels: { enabled: true, x: 80, format: '{point.amAmt:,.0f}', style: { 'fontWeight': 'bold', 'fontSize': '10px' } }});
			arrSeries.push({name: useTitle, data: amUseDataArr, stack: 2, zIndex: 1, pointPadding: 0.2, color: '#2EC8CA', dataLabels: { enabled: true, format: '{point.amAmt:,.0f}', style: { 'fontWeight': 'bold', 'color': '#fff' } }});

			var options = {
				chart: {
					type: 'bar',
					width: 301,
					height: 100
				},
				xAxis : { categories : cateArr },
				yAxis: 
				{
					min: 0,
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
							str += rowData.point.title + ': ' + $.getNumberComma(rowData.point.amAmt);
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
					itemStyle: {fontSize: '8px'}
				},
				series : arrSeries
			};
			
			this.create(id, options);
		},
		budgetUseChart: function(chartId, data, tabSeq, height, maxValue, type) {
			var id = chartId + tabSeq;
			this.destroy(id);
			
			var cateArr = [''];
			var dataArr = [];
			var arrSeries = [];
			var nameArr = [];
			var colors = [];
			
			if (type == 'COMPANY') {
				nameArr = ['AM 거래처 사용'];
				colors = ['#C55A11'];
			} else {
				nameArr = ['자사제품설명회 사용금액', '정책지원 사용금액'];
				colors = ['#519BE2', '#E35D66'];
			}
			
			for (var i = 0; i < data.length; i++) {
				var rowData = data[i];
				arrSeries.push({name: nameArr[i], data: [{y: rowData * 0.7, oriValue: rowData, title: nameArr[i]}], color: colors[i], dataLabels: { enabled: true, format: '{point.oriValue:,.0f}', style: { 'fontWeight': 'bold', 'color': '#000' } }});
			}
			
			var options = {
				chart: {
					type: 'bar',
					width: 301,
					height: height
				},
				xAxis : { categories : cateArr },
				yAxis: 
				{
					min: 0,
					max: maxValue,
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
							str += rowData.point.title + ': ' + $.getNumberComma(rowData.point.oriValue);
							str += '<br>';
						}
						
						return str;
					}
				},
				legend : {
					itemStyle: {fontSize: '8px'}
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