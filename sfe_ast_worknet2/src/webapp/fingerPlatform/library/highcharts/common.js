/**
 * 차트 유형별 색상 가져오기
 */
function getChartColor(type) {
	switch (type) {
	case 'fixed_3':
		return ['#cbec47', '#44d3c3', '#fb3279', '#fe8738', '#8d62df'];
		break;
	case 'fixed_4':
		return ['#cbec47', '#44d3c3', '#398C10', '#5FC354', '#5FB7F7'];
		break;
	/*case 'fixed_5':
		return ["#86C9E8","#C6FFCC","#E8B1A3","#F6CD61","#ACBBE8","#E8DF7B","#71E7E8","#C889FF","#E0FF7C",
                "#E0B2FF","#E8B7A2","#B0FFA8","#CBE0E8","#EE7469","#CCA63D","#E67399","#E2BEF4","#0FBF84","#AAC1AF",
                "#E884C3","#FFB4A8","#DAF0FF","#F5CD3C","#DACDB6","#CCEBC0","#72CCCA","#FFDE49","#BBB7A4",
                "#48AD01","#F4D6A0","#AA99BA","#B7FF5E","#FFD074","#D0E5D5","#F1C40F","#3498DB","#EEFF6B"];
		break;	*/
	case 'fixed_5':
		return ["#7CB5EC","#90ED7D","#F7A35C","#999EFF","#F15C80","#E4D354","#2B908F","#F45B5B","#E0FF7C",
                "#E0B2FF","#E8B7A2","#B0FFA8","#CBE0E8","#EE7469","#CCA63D","#E67399","#E2BEF4","#0FBF84","#AAC1AF",
                "#E884C3","#FFB4A8","#DAF0FF","#F5CD3C","#DACDB6","#CCEBC0","#72CCCA","#FFDE49","#BBB7A4",
                "#48AD01","#F4D6A0","#AA99BA","#B7FF5E","#FFD074","#D0E5D5","#F1C40F","#3498DB","#EEFF6B"];
		break;	
	case 'fixed_6':
		return ["#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000",
                "#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000",
                "#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000",
                "#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"];
		break;
	default:
		break;
	}
}

// highcharts 공통 속성
Highcharts.theme = {
	credits: { enabled: false },
	exporting: { enabled: false },
	
	navigation: {
		buttonOptions: {
			enabled: false
		}
	},

	colors: ['#7cb5ec', '#f7a35c', '#90ee7e', '#DF5353', '#aaeeee',
	         '#D4DBC8', '#DBD880', '#F9AE74', '#CD6B97', '#557780', '#6797A1',
	         '#eeaaee', '#47B39D', '#FFC153', '#EB6B56', '#B05F6D', '#462446',
	         '#55BF3B', '#7798BF', '#EDD834', '#FF9655', '#64E572', '#6AF9C4',
	 		 '#058DC7', '#DDDF00', '#ED561B', '#50B432', '#24CBE5', '#FFF263'],	
	
	chart: {
		style: {
			fontFamily: "Dosis, sans-serif"
		},
		
		/*
		backgroundColor: {
			linearGradient: [0, 0, 500, 500],
			stops: [
				[0, 'rgb(255, 255, 255)'],
				[1, 'rgb(240, 240, 255)']
			]
		},
		*/
	},
	
	title: {
		style: {
			'color': '#282828',
			'font-size':'1.6em',
			'font-weight': '800',
			'font-family': "'Nanum Gothic', sans-serif"
		}
	},
	
	subtitle: {
		style: {
			'color': '#666666',
			'font-size':'13px',
			'font-weight': '800',
			'font-family': "'Nanum Gothic', sans-serif"
		}
	},

	legend: {
		itemStyle: {
			'font': '13px Trebuchet MS, Verdana, sans-serif',
			'color': 'black'
		},
		itemHoverStyle:{
			'color': 'gray'
		}
	},
	
	xAxis: {
		/* gridLineWidth: 1 */
	},
	
	yAxis: {
		/*
		minorTickInterval: 'auto',
		
		title: {
			style: {
				textTransform: 'uppercase'
			}
		},
		labels: {
			style: {
				fontSize: '12px'
			}
		}
		*/
	},
	
	plotOptions: {
		candlestick: {
			lineColor: '#404048'
		}
	},
	
	background2: '#F0F0EA'
};

Highcharts.setOptions(Highcharts.theme);

function createHighChartProperties(prop) {
	//var commProp = getHighChartCommonProperties();
	//jQuery.extend(true, prop, commProp);
	return prop;
};