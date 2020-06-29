
/**
 * 사용자 메뉴 관리
 */
function UserMenus() {
	this.list = null;
	
	this.setMenuList = function(obj) {
		this.list = obj;
	};
	
	this.getMenuInfo = function(form_id) {
		if (!this.list || this.list.length == 0 || !form_id) return;
		
		var menus = this.list;
		for (var i = 0; i < menus.length; i++) {
			if (menus[i]['form_id'] == form_id) {
				return menus[i];
			}
		}
		return null;
	};
	
	this.preProcess = function() {
		var addList = [];
		var deptCode = g_main.session.obj.DeptCode.substr(0, 2);
		
		if (g_main.session.obj.UserID == 'ka110192' || g_main.session.obj.UserID == 'ka070040' || g_main.session.obj.UserID == 'ka120213' || deptCode == 'F2' || deptCode == 'F3') {
			// 시스템팀 임시 확인 메뉴 추가
			addList.push({menu_id:'TG00001',  menu_name:'테스트', 					p_menu_id:'', 		 menu_lv:1, sort_seq:1000, category:'GROUP', form_id:'', web_file:'', release_status:'R', help_yn:'N', help_doc_id: ''});
			addList.push({menu_id:'TS00008',  menu_name:'예산', 					p_menu_id:'TG00001', menu_lv:2, sort_seq:1031, category:'GROUP', form_id:'', web_file:'', release_status:'R', help_yn:'N', help_doc_id: ''});
			addList.push({menu_id:'T000021',  menu_name:'예산수립버전',   			p_menu_id:'TS00008', menu_lv:3, sort_seq:10, category:'FORM', form_id:'bgtVersionManage', web_file:'', release_status:'R', help_yn:'N', help_doc_id: ''});
			addList.push({menu_id:'T000022',  menu_name:'(비용)예산매핑테이블',			p_menu_id:'TS00008', menu_lv:3, sort_seq:10, category:'FORM', form_id:'bgtMappingTable', web_file:'', release_status:'R', help_yn:'N', help_doc_id: ''});
			addList.push({menu_id:'T000023',  menu_name:'리포트템플릿관리',			p_menu_id:'TS00008', menu_lv:3, sort_seq:10, category:'FORM', form_id:'bgtRptTemplateManage', web_file:'', release_status:'R', help_yn:'N', help_doc_id: ''});
			
			addList.push({menu_id:'T000024',  menu_name:'납품/소화단가',				p_menu_id:'TS00008', menu_lv:3, sort_seq:10, category:'FORM', form_id:'bgtUnitPriceManage', web_file:'', release_status:'R', help_yn:'N', help_doc_id: ''});
			addList.push({menu_id:'T000025',  menu_name:'원가',					p_menu_id:'TS00008', menu_lv:3, sort_seq:10, category:'FORM', form_id:'bgtCostManager', web_file:'', release_status:'R', help_yn:'N', help_doc_id: ''});
			addList.push({menu_id:'T000026',  menu_name:'위탁수수료',					p_menu_id:'TS00008', menu_lv:3, sort_seq:10, category:'FORM', form_id:'bgtCommissionManager', web_file:'', release_status:'R', help_yn:'N', help_doc_id: ''});
			
			addList.push({menu_id:'T000027',  menu_name:'매상예산수립(조회)',					p_menu_id:'TS00008', menu_lv:3, sort_seq:10, category:'FORM', form_id:'bgtSalesManagerSearch', web_file:'', release_status:'R', help_yn:'N', help_doc_id: ''});
			addList.push({menu_id:'T000028',  menu_name:'매상예산수립(입력)',					p_menu_id:'TS00008', menu_lv:3, sort_seq:10, category:'FORM', form_id:'bgtSalesManager', web_file:'', release_status:'R', help_yn:'N', help_doc_id: ''});
			addList.push({menu_id:'T000029',  menu_name:'매상예산수립(승인)',					p_menu_id:'TS00008', menu_lv:3, sort_seq:10, category:'FORM', form_id:'bgtSalesManagerApproval', web_file:'', release_status:'R', help_yn:'N', help_doc_id: ''});
			
			addList.push({menu_id:'T000030',  menu_name:'비용예산수립(조회)',					p_menu_id:'TS00008', menu_lv:3, sort_seq:10, category:'FORM', form_id:'bgtExpenseManagerSearch', web_file:'', release_status:'R', help_yn:'N', help_doc_id: ''});
			addList.push({menu_id:'T000031',  menu_name:'비용예산수립(입력)',					p_menu_id:'TS00008', menu_lv:3, sort_seq:10, category:'FORM', form_id:'bgtExpenseManager', web_file:'', release_status:'R', help_yn:'N', help_doc_id: ''});
			addList.push({menu_id:'T000032',  menu_name:'비용예산수립(승인)',					p_menu_id:'TS00008', menu_lv:3, sort_seq:10, category:'FORM', form_id:'bgtExpenseManagerApproval', web_file:'', release_status:'R', help_yn:'N', help_doc_id: ''});
			
			/*
			addList.push({menu_id:'TS00008',  menu_name:'DSM', 					p_menu_id:'TG00001', menu_lv:2, sort_seq:1031, category:'GROUP', form_id:'', web_file:'', release_status:'R', help_yn:'N', help_doc_id: ''});
			addList.push({menu_id:'T000021',  menu_name:'DSM Dashboard',   		p_menu_id:'TS00008', menu_lv:3, sort_seq:10, category:'FORM', form_id:'crmDSMDashboard', web_file:'', release_status:'R', help_yn:'N', help_doc_id: ''});
			addList.push({menu_id:'T000022',  menu_name:'목표 실적',   				p_menu_id:'TS00008', menu_lv:3, sort_seq:10, category:'FORM', form_id:'crmPlanPorfit', web_file:'', release_status:'R', help_yn:'N', help_doc_id: ''});
			addList.push({menu_id:'T000023',  menu_name:'MR-거래처(지역) 배치 지원',	p_menu_id:'TS00008', menu_lv:3, sort_seq:10, category:'FORM', form_id:'crmTargetAllocation', web_file:'', release_status:'R', help_yn:'N', help_doc_id: ''});
			addList.push({menu_id:'T000024',  menu_name:'Call 고객(Call 결과)',		p_menu_id:'TS00008', menu_lv:3, sort_seq:10, category:'FORM', form_id:'crmDSMCallResult', web_file:'', release_status:'R', help_yn:'N', help_doc_id: ''});
			addList.push({menu_id:'T000025',  menu_name:'Call 고객(Call Coverage)',	p_menu_id:'TS00008', menu_lv:3, sort_seq:10, category:'FORM', form_id:'crmDSMCallCoverage', web_file:'', release_status:'R', help_yn:'N', help_doc_id: ''});
			addList.push({menu_id:'T000026',  menu_name:'Call 고객(KSA)',			p_menu_id:'TS00008', menu_lv:3, sort_seq:10, category:'FORM', form_id:'crmDSMCallKSA', web_file:'', release_status:'R', help_yn:'N', help_doc_id: ''});
			addList.push({menu_id:'T000027',  menu_name:'거래처 비교',				p_menu_id:'TS00008', menu_lv:3, sort_seq:10, category:'FORM', form_id:'crmDSMCompanyCompare', web_file:'', release_status:'R', help_yn:'N', help_doc_id: ''});
			addList.push({menu_id:'T000028',  menu_name:'예산(영업소, 부서)',			p_menu_id:'TS00008', menu_lv:3, sort_seq:10, category:'FORM', form_id:'crmDSMBudget', web_file:'', release_status:'R', help_yn:'N', help_doc_id: ''});
			addList.push({menu_id:'T000029',  menu_name:'DDD',					p_menu_id:'TS00008', menu_lv:3, sort_seq:10, category:'FORM', form_id:'crmDSMDDD', web_file:'', release_status:'R', help_yn:'N', help_doc_id: ''});
			*/
		}
		
		if (addList && addList.length) {
			this.list = this.list.concat(addList);
		}
	};

	this.htmlRender = function() {
		try {
			this.preProcess();
			
			if (!this.list || this.list.length == 0) return;
			
			var mCon = $('<ul class="menuContainer"></ul>');
			
			var grpObj = {};
			var grpModel = '<li class="top-cate"><a href="#" menu_id="@menu_id@" menu_name="@menu_name@"><span data-hover="@menu_name@">@menu_name@</span></a><ul></ul></li>';
			var subModel = '<li class="sub-cate"><a href="#" menu_id="@menu_id@" menu_name="@menu_name@" p_menu_id="@p_menu_id@" sub_group="Y">@menu_name@</a><ul></ul></li>';
			var mnuModel = '<li><a href="#" onclick="onClickModel(this);" menu_id="@menu_id@" menu_name="@menu_name@" p_menu_id="@p_menu_id@" form_id="@form_id@" category="@category@" help_yn="@help_yn@" help_doc_id="@help_doc_id@" web_file="@web_file@" class="@menu_css@">@menu_name@</a></li>';
			
			var menus = this.list;
			
			for (var i = 0; i < menus.length; i++) {
				var mn = menus[i];

				if (mn.p_menu_id == '') {
					// 대메뉴
					var grpEl = grpModel.replace(/@menu_name@/gi, mn.menu_name).replace('@menu_id@', mn.menu_id);
					grpObj[mn.menu_id] = $(grpEl);
				}
				else if (mn.p_menu_id != '' && mn.category == 'GROUP') {
					// 중메뉴
					var subEl = subModel.replace(/@menu_name@/gi, mn.menu_name).replace('@menu_id@', mn.menu_id).replace('@p_menu_id@', mn.p_menu_id);
					grpObj[mn.menu_id] = $(subEl);
				}
				else {
					// 소메뉴
					var mnuEl = mnuModel.replace(/@menu_name@/gi, mn.menu_name)
										.replace('@menu_id@', mn.menu_id)
										.replace('@p_menu_id@', mn.p_menu_id)
										.replace('@form_id@', mn.form_id)
										.replace('@category@', mn.category)
										.replace('@help_yn@', mn.help_yn)
										.replace('@help_doc_id@', mn.help_doc_id)
										.replace('@web_file@', mn.web_file)
										.replace('@menu_css@', (mn.menu_class || ''));
					
					grpObj[(mn.p_menu_id + '_' + mn.menu_id)] = $(mnuEl);
				}
			}; // end

			// 메뉴 컨테이너에 메뉴 추가
			for (var id in grpObj) {
				var pid = grpObj[id].find('a').attr('p_menu_id');
				//console.log('pid ' + pid + ', ' + grpObj[id].find('a').attr('menu_name'));
				
				if (!pid) {
					mCon.append(grpObj[id]);
				} else {
					if (grpObj[pid]) {
						grpObj[pid].find('ul').eq(0).append(grpObj[id]);
					} else {
						console.log('menu.js htmlRender() : 해당 메뉴의 상위 그룹 메뉴권한이 없어 생성할 수 없습니다. (' + id + ')');
					}
				}
			};
			
			// (170929) 김영도
			// 중메뉴 하위에 소메뉴가 1개도 없는 경우, 화면에서 숨김
			for (var id in grpObj) {
				var sub_group = grpObj[id].find('a').attr('sub_group');
				
				if (sub_group && sub_group == 'Y') {
					var menuCnt = grpObj[id].find('ul').find('li').length;
					if (menuCnt == 0) {
						// 하위메뉴가 없는 경우 중메뉴 숨김
						grpObj[id].css('display', 'none');
					}
				}
			};

			// 렌더링
			$('nav.mainmenu').append(mCon);
			//console.log($('nav.mainmenu').html());
			
			// 이벤트 바인딩
			UserMenusBindEvents();
			
		} catch (err) {
			console.log('menu.js htmlRender() : ' + err.message);
		}
	};
}

/**
 * 이벤트 바인딩
 */
function UserMenusBindEvents() {
	$(window).on({
		click: function(event) {
			if ($(event.target).parent().hasClass('sub-cate')) {
				// continue
			} else {
				$('.menuContainer > li').removeClass('active');
			}
		},
		
		// (180620, 김영도) 2차 메뉴(sub-cate)만 열려 있을 때엔 mouseleave시 메뉴가 닫히도록 수정
		// trigger를 통해서만 호출되는 커스텀이벤트
		dispatchMouseLeave: function() {
			//console.log($('.sub-cate').length);
		}
	});
	/*
	$('.menuContainer > li').on({
		mouseleave: function() {
			$(this).removeClass('active');
		}
	});
	*/
	function mobileClick() {
		var isTopMenu = false;
		if ($(event.target).parent().hasClass('top-cate') || $(event.target).parent().parent().hasClass('top-cate')) {
			isTopMenu = true;
		}
		
		if (isTopMenu) {
			// (17.06.29) click 이벤트 window 발생 금지를 위해 전파해제
			event.stopPropagation();			
		}
		// PC와 동일 로직 수행
		openTopMenu();
	};
	
	function openTopMenu() {
		var target = event.currentTarget;
		
		$('.menuContainer > li').removeClass('active');
		
		$(target).addClass('active');
		
		// 우측 메뉴들은 메뉴목록이 좌측으로 나오도록
		var num = $('.menuContainer > li').length;
		var index = $(target).index();
		if (num-3 <= index) {
			$(target).find('.sub-cate ul').addClass('left');
		}
	};
	if (isMobile()) {
		$('.menuContainer > li').on('click', mobileClick);
	} else {
		$('.menuContainer > li').on('mouseenter', openTopMenu);
	}
	
	$('.sub-cate').on({
		mouseenter: function() {
			$(this).addClass('active');
		},
		mouseleave: function() {
			$(this).removeClass('active');
		}
	});
	
	// (180620, 김영도) 2차 메뉴(sub-cate)만 열려 있을 때엔 mouseleave시 메뉴가 닫히도록 수정
	$('.top-cate > ul').on({
		mouseleave: function() {
			$(this).trigger('dispatchMouseLeave');
		}
	});	
	
	// 결제 테이블
	var approval_line = new Swiper('.approval_line', {
        scrollbar: '.scrollbar',
        scrollbarHide: false,
        slidesPerView: 'auto'
    });	
}