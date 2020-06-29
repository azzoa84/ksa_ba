function CustomHome(host, dispView, bindEvents) {
	var $ = this;
	$.dispId = dispView ? dispView.id : null;
	$.dispView = dispView;
	$.extObj = jQuery(('#' + $.dispId));
	$.bindEvents = bindEvents;
	
	$.load = function() {
		$.extObj.load('./fingerPlatform/custom/customHome.html', function() {
			// 이벤트등록
			$.onEvent();
		});
	};
	
	$.onEvent = function() {
		if ($.bindEvents) {
			if ($.bindEvents.onApprClick)
				$.extObj.find('.approval').find('dl.first').on('click', $.bindEvents.onApprClick);
			if ($.bindEvents.onDraftClick)
				$.extObj.find('.approval').find('dl.last').on('click', $.bindEvents.onDraftClick);
			if ($.bindEvents.onCardClick)
				$.extObj.find('.receipt').find('div.first').find('dl.card').on('click', $.bindEvents.onCardClick);
			if ($.bindEvents.onDCardClick)
				$.extObj.find('.receipt').find('div.first').find('dl.dcard').on('click', $.bindEvents.onDCardClick);
			if ($.bindEvents.onEseroClick)
				$.extObj.find('.receipt').find('div.last').find('dl.esero').on('click', $.bindEvents.onEseroClick);
			if ($.bindEvents.onDEseroClick)
				$.extObj.find('.receipt').find('div.last').find('dl.desero').on('click', $.bindEvents.onDEseroClick);
		}
	};
	
	/**
	 * 결재함/기안함 건수
	 */
	$.bindWfCount = function(appr_cnt, draft_cnt) {
		$.extObj.find('.approval').find('dl.first').find('dd').html(appr_cnt);
		$.extObj.find('.approval').find('dl.last').find('dd').html(draft_cnt);
	};
	
	/**
	 * 미정산영수증 건수
	 */
	$.bindPayCount = function(card_cnt, esero_cnt, dcard_cnt, desero_cnt) {
		$.extObj.find('.receipt').find('div.first').find('dl.card').find('dd').html(card_cnt);
		$.extObj.find('.receipt').find('div.first').find('dl.dcard').find('dd').html(dcard_cnt);
		$.extObj.find('.receipt').find('div.last').find('dl.esero').find('dd').html(esero_cnt);
		$.extObj.find('.receipt').find('div.last').find('dl.desero').find('dd').html(desero_cnt);
	};
	
	/**
	 * 게시판 최신글
	 */
	$.bindBoard = function(data) {
		var model =
		'<tr> \
			<td class="gubun ellipsis">{0}</td> \
			<td class="title" menu_id="{p1}" board_group="{p2}" post_id="{p3}"><i class="{p4}"></i><span class="ellipsis {p5}">{1}</span></td> \
			<td class="creator ellipsis">{2}</td> \
			<td class="w_date ellipsis">{3}</td> \
		</tr>';
		
		var board = $.extObj.find('.bbs-latest').find('.list-area').find('table.tbl-latest').find('tbody');
		board.empty();
		
		for (var i = 0; i < data.length; i++) {
			var gubun = data[i]['dept3'];
			
			var tmp = jQuery(model.replace('{0}', gubun)
			.replace('{1}', data[i]['post_title'])
			.replace('{p1}', data[i]['menu_id'])
			.replace('{p2}', data[i]['board_group'])
			.replace('{p3}', data[i]['post_id'])
			.replace('{p4}', (data[i]['is_new'] == 'Y' ? 'new' : 'old'))
			.replace('{p5}', (data[i]['is_new'] == 'Y' ? 'new' : 'old'))
			.replace('{2}', data[i]['emp_name'])
			.replace('{3}', extFormat(data[i]['create_date'], 'yyyyMMdd')));
			
			tmp.find('.title').on('click', function() {
				var jqObj = jQuery(this);
				if ($.bindEvents.onBoardTitleClick) {
					$.bindEvents.onBoardTitleClick(jqObj);
				}
			});
			board.append(tmp);
		}
	};
	
	$.getHtml = function() {
		if ($.extObj) {
			return $.extObj.parent().html();
		}
	};
	
	$.getPrintHtml = function() {
		if ($.extObj) {
			var styleSheet = call_sync_ajax('./fingerPlatform/css/CustomHome.css');
			styleSheet = '<style>' + styleSheet + '</style>';
			
			var html = $.extObj.parent().html();
			html = '<html><head>' + styleSheet + '</head><body>' + html + '</body></html>';
			return html;
		}
	};
}