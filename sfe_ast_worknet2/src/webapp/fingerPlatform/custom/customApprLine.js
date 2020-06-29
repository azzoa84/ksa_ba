function CustomApprLine(host, dispView) {
	var $ = this;
	$.dispId = null;
	$.dispView = dispView;
	$.extObj = null;
	$.wfType = null;
	$.wfDocId = null;
	$.businessId = null;
	$.businessTitle = null;
	$.apprList = null;
	
	var box = 
	'<table class="tbl-approval"> \
		<caption>결재</caption> \
		<tr> \
			<th scope="col" style="width:77px">결재</th> \
			<td colspan="3"> \
				<div class="approval_line"> \
					<ul class="swiper-wrapper appr_line"> \
					</ul> \
					<div class="scrollbar"></div> \
				</div> \
			</td> \
		</tr> \
		<tr> \
			<th scope="col" style="width:77px">협의</th> \
			<td> \
				<div class="approval_line" style="width:320px;"> \
					<ul class="swiper-wrapper conf_line"> \
					</ul> \
					<div class="scrollbar"></div> \
				</div> \
			</td> \
			<th scope="col" style="width:77px">참조</th> \
			<td> \
				<div class="approval_line" style="width:480px;"> \
					<ul class="swiper-wrapper refs_line"> \
					</ul> \
					<div class="scrollbar"></div> \
				</div> \
			</td> \
		</tr> \
	</table>';
	
	if (dispView) {
		dispView.setHTML(box);
		$.dispId = dispView.id;
		$.extObj = jQuery(('#' + dispView.id + ' .tbl-approval'));
	}

	/**
	 * 결재라인생성
	 */
	$.load = function(wfDocId, formId, isNewLine) {
		if (!formId) {
			return;
		}
		var ds = commWFDocumentQ('Q3', '', '', formId);
		if (ds.resultList && ds.resultList.length) {
			var m = ds.resultList[0][0];
			$.wfType = m['wf_type'];
			$.businessId = m['business_id'];
			$.businessTitle = m['business_title'];			
		}
		
		if (wfDocId) {			
			$.wfDocId = wfDocId;
			
			if (isNewLine === true) {
				// 결재라인 새로 생성 (* 기존 문서에 새로운 결재라인)
				commWFDocumentQ('D_LINE', $.wfDocId);
			}
			
			var ds3 = commWFDocumentQ('Q1', $.wfDocId);
			
			if (ds3.resultList && ds3.resultList.length) {
				$.apprList = ds3.resultList;
				$.render(true);
			}
		} else {
			var ds2 = commWFDocumentS('N', '', $.businessTitle, '', '', g_main.session.getValue('UserID'), '', $.businessId);
			if (ds2.errorMsg)
				return;
			
			$.wfDocId = ds2.returnStr;
			var ds3 = commWFDocumentQ('Q1', $.wfDocId);
			
			if (ds3.resultList && ds3.resultList.length) {
				$.apprList = ds3.resultList;
				$.render(true);
			}
		}
	}
	
	/**
	 * 결재라인 화면 표시
	 */
	$.render = function(initRender) {
		try {
			var appr = $.apprList[0];
			var conf = $.apprList[1];
			var refs = $.apprList[2];
			var model =
			'<li class="swiper-slide"> \
				<div> \
					<span class="name">{0}</span> \
					<span class="team">{1}</span> \
				</div> \
			</li>';
			
			$.extObj.find('.appr_line').empty();
			$.extObj.find('.conf_line').empty();
			$.extObj.find('.refs_line').empty();
			if (appr && appr.length) {
				for (var i = 0; i < appr.length; i++) {
					$.extObj.find('.appr_line').append(model.replace('{0}', appr[i]['emp_name']).replace('{1}', appr[i]['dept_name']));
				}
			}
			if (conf && conf.length) {
				for (var i = 0; i < conf.length; i++) {
					$.extObj.find('.conf_line').append(model.replace('{0}', conf[i]['emp_name']).replace('{1}', conf[i]['dept_name']));
				}
			}
			if (refs && refs.length) {
				for (var i = 0; i < refs.length; i++) {
					$.extObj.find('.refs_line').append(model.replace('{0}', refs[i]['emp_name']).replace('{1}', refs[i]['dept_name']));
				}
			}
			
			if (initRender) {
				// swiper 실행
				$.swiper();	
			}
		} catch (err) {
			console.log(err.message);
		}
	}
	
	/**
	 * 결재라인 일부만 변경하여 표시
	 */
	$.modify = function(type, list) {
		try {
			var selector = ('.' + type + '_line');
			var listIdx = (type == 'appr' ? 0 : (type == 'conf' ? 1 : 2));
			
			if (!$.apprList || !$.apprList.length)
				return;
			
			// 변경된 부분 apprList에 삽입
			$.apprList[listIdx] = list;
			var model =
			'<li class="swiper-slide"> \
				<div> \
					<span class="name">{0}</span> \
					<span class="team">{1}</span> \
				</div> \
			</li>';
			
			$.extObj.find(selector).empty();
			
			if (list && list.length) {
				for (var i = 0; i < list.length; i++) {
					$.extObj.find(selector).append(model.replace('{0}', list[i]['emp_name']).replace('{1}', list[i]['dept_name']));
				}
			}
			
			$.swiper();
		} catch (err) {
			console.log(err.message);
		}
	};
	
	/**
	 * wfDocId 반환
	 */
	$.getWfDocId = function() {
		return $.wfDocId;
	}
	
	/**
	 * 결재라인변경 (결재라인추가 팝업을 통해 변경된)
	 */
	$.setApprList = function(apprList) {
		try {
			$.apprList = apprList.slice(0);
			$.render();
		} catch (err) {
			console.log(err.message);
		}
	}
	
	/**
	 * 결재라인반환 (배열)
	 */
	$.getApprList = function() {
		try {
			if (!$.apprList || $.apprList.length == 0)
				return null;
			else
				return $.apprList.slice(0);
		} catch (err) {
			console.log(err.message);
		}
	}

	/**
	 * 결재라인반환 (상신 파라메터용 '|' 구분)
	 */
	$.getApprParams = function() {
		if ($.apprList && $.apprList.length > 2) {
			var appr = $.apprList[0];
			var conf = $.apprList[1];
			var refs = $.apprList[2];
			var rm = {'appr':'', 'conf':'', 'refs':'', 'appr_yn':'', 'conf_yn':'', 'refs_yn':''};

			if (appr && appr.length) {
				for (var i = 0; i < appr.length; i++) {
					rm.appr += (appr[i]['employee_id'] + '|');
					rm.appr_yn += (appr[i]['line_yn'] + '|');
				}
				rm.appr = rm.appr.substr(0, rm.appr.length - 1);
				rm.appr_yn = rm.appr_yn.substr(0, rm.appr_yn.length - 1);
			}
			if (conf && conf.length) {
				for (var i = 0; i < conf.length; i++) {
					rm.conf += (conf[i]['employee_id'] + '|');
					rm.conf_yn += (conf[i]['line_yn'] + '|');
				}
				rm.conf = rm.conf.substr(0, rm.conf.length - 1);
				rm.conf_yn = rm.conf_yn.substr(0, rm.conf_yn.length - 1);
			}
			if (refs && refs.length) {
				for (var i = 0; i < refs.length; i++) {
					rm.refs += (refs[i]['employee_id'] + '|');
					rm.refs_yn += (refs[i]['line_yn'] + '|');
				}
				rm.refs = rm.refs.substr(0, rm.refs.length - 1);
				rm.refs_yn = rm.refs_yn.substr(0, rm.refs_yn.length - 1);
			}
			return rm;
			
		} else {
			return {'appr':'', 'conf':'', 'refs':'', 'appr_yn':'', 'conf_yn':'', 'refs_yn':''};
		}
	}
	
	$.swiper = function() {
		var selector = ('#' + $.dispId + ' .tbl-approval .approval_line');
		var approval_line = new Swiper(selector, {
			scrollbar: (selector + ' .scrollbar'),
			scrollbarHide: false,
			slidesPerView: 'auto'
		});
	}
}