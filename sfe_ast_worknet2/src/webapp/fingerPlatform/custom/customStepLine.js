function CustomStepLine(host, dispView, lineType) {
	var $ = this;
	$.dispId = null;
	$.dispView = dispView;
	$.lineType = lineType;
	$.lineCondition = null;
	$.extObj = null;
	
	/**
	 * 초기화
	 */
	$.init = function() {
		var box = 
		'<ol class="custom_step_line"> \
		</ol>';
		
		if ($.dispView) {
			$.dispView.setHTML(box);
			$.dispId = dispView.id;
			$.extObj = jQuery(('#' + dispView.id + ' .custom_step_line'));
		}
	};

	/**
	 * 라인 생성
	 */
	$.render = function(condition) {
		$.extObj.empty();
		
		if ($.lineType == 'wfRequest') {
			// 업무협조 단계 생성
			$.extObj.append('<li><span>협조요청</span></li>');
			$.extObj.append('<li><span>협조확인</span></li>');
			$.extObj.append('<li><span>업무진행</span></li>');
			$.extObj.append('<li><span>전달/검수</span></li>');
			
			$.lineCondition = condition;
			if (condition == 'SYSTEM') {
				// 협자가 시스템팀인 경우
				$.extObj.append('<li><span>이관요청</span></li>');
				$.extObj.append('<li><span>이관완료</span></li>');
			} else {
				// 그 외의 경우
				$.extObj.append('<li><span style="padding-right:10px;">완료</span></li>');
			}
		}
	};
	
	/**
	 * 단계 변경
	 */
	$.update = function(condition1, condition2) {
		try {
			if ($.lineType == 'wfRequest') {
				if (condition1 == '10') {
					$.extObj.find('li').eq(0).addClass(condition2 == 'ING' ? 'appr_ing' : (condition2 == 'BAN' ? 'appr_ban' : 'appr_end'));
				} 
				else if (condition1 == '15') {
					$.extObj.find('li:lt(1)').addClass('complete');
					$.extObj.find('li').eq(1).addClass('appr_ban');			
				}
				else if (condition1 == '20') {
					$.extObj.find('li:lt(1)').addClass('complete');
					$.extObj.find('li').eq(1).addClass(condition2 == 'ING' ? 'appr_ing' : (condition2 == 'BAN' ? 'appr_ban' : 'appr_end'));
				}
				else if (condition1 == '30') {
					$.extObj.find('li:lt(2)').addClass('complete');
					$.extObj.find('li').eq(2).addClass('appr_end');
				}
				else if (condition1 == '40') {
					$.extObj.find('li:lt(3)').addClass('complete');
					$.extObj.find('li').eq(3).addClass('appr_end');
				}
				else if (condition1 == '50') {
					$.extObj.find('li:lt(4)').addClass('complete');
					$.extObj.find('li').eq(4).addClass('appr_end');
				}
				else if (condition1 == '70') {
					$.extObj.find('li:lt(3)').addClass('complete');
					$.extObj.find('li').eq(3).addClass('appr_end');
				}
				else if (condition1 == '80') {
					$.extObj.find('li:lt(4)').addClass('complete');
					$.extObj.find('li').eq(4).addClass(condition2 == 'ING' ? 'appr_ing' : (condition2 == 'BAN' ? 'appr_ban' : 'appr_end'));
				}
				else if (condition1 == '85') {
					$.extObj.find('li:lt(4)').addClass('complete');
					$.extObj.find('li').eq(4).addClass('appr_end');
				}				
				else if (condition1 == '90') {
					$.extObj.find('li:lt(5)').addClass('complete');
					$.extObj.find('li').eq(5).addClass('appr_end');
				}
			}
		} catch (err) {
			console.log('CustomStepLine update() : ' + err.message);
		}
	};
}