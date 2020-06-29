/**
 * [jQuery Full Calendar 사용색상]
 */
var fingerSchedulerColors = {
	// Call 관련
	'PLAN':'#5CB85C', 
	'COMPLETE': '#5BC0DE',
	'INCOMPLETE': '#D9534F',
	'INSTANT': '#f0ad4e',
	'EVENT10': '#ae518d', 
	'EVENT20': '#797979',
	
	// 연간일정 관련
	'CM10': '#daaf9b', // 연간일정
	'CM20': '#f7907e', // 전사휴가/공휴일
	'CM30': '#7abfaf', // 비뇨기
	'CM40': '#8fbac9', // 내과
	'CM50': '#88b3e2', // 개업의
	'CM60': '#aba1cf', // 면역영업
		
	// 근태달력 관련
	'FULL': '#FFFFFF', // FULL
	'WEEKEND': '#f4f4f4',  // 주말
	
	// 월간업무계획서
	//'WORK': '#77b2e5',				// 근무
	'WORK': '#7ABFAF',
	'VAC': '#F7907E',				// 휴가
	//'ACCESS': '#ABA1CF',			// 출입기록
	//'MONTH_NIGHT': '#A8AAAD',		// (월간)연장/휴일근무
	//'WEEK_EXTEND' : '#cbc3b8',		// (주간)연장
	//'WEEK_NIGHT' : '#927f6f',		// (주간)야간
	'FFDAY' : '#a46bd0',			// Family Day
	'TOTAL': '#FFFFCC'				// 근무 총합
};

/**
 * [jQuery Full Calendar 초기세팅]
 */
function getCalendarConfig() {
	return {
		lang: 'ko',
		
		customButtons: {
			reg: {
				text: '일정등록'
			},
			mod: {
				text: '수정'
			},
			rem: {
				text: '삭제'
			}
		},
		
		header : {
			left : 'prevYear,nextYear reg mod,rem',
			center : 'prev,title,next',
			right : 'today month,basicWeek'
			/* basicWeek, basicDay' */
		},
		
		views: {
			month: {
				displayEventEnd: true,
				timeFormat: 'a hh:mm',
				titleFormat: 'YYYY년 MM월',
				columnFormat: 'ddd'
			},
			
			week: {
				slotLabelFormat: 'a h시(:mm)',
				timeFormat: 'a hh:mm',
				titleFormat: 'YYYY년 M월 DD일',
				columnFormat: 'M/D ddd '
			},
			
			day: {
				columnFormat: 'M월d일 dddd '
			}
		},

		buttonText : {
			today : '오늘',
			month : '월간',
			week: '주간',
			day: '일간'
		},
		
		minTime: '08:00:00',
		maxTime: '20:00:00',
		scrollTime: '08:00:00',
		slotDuration: '00:30:00',
		allDayText : '전체',
		firstDay : 0, /* 일요일부터 */
		editable : false
	};
};