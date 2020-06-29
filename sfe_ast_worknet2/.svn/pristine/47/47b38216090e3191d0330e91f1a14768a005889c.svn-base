function Menu(p1, p2, p3, p4, p5) {
	this.menuID = p1;
	this.menuName = p2;
	this.parentMenuID = p3;
	this.webID = p4;
	this.webFile = p5;
}

function go() {
	g_main = new Main();
	g_context = g_main;
	g_main.init();
	g_main.start();
	
	// 공용 파일 브라우저
	g_fileBrowser = new FingerFileBrowser({global: true});
	
	// 팝업 관리 스택 
	g_popupStack = new FingerPopupStack();
	
	// 아래 기능들은 웹브라우저에서만 활성화 (FCS 툴에서는 비활성)
	if (g_isFcs === false) {
		// 사용자 메뉴 생성 (메뉴 렌더링)
		g_main.userMenus.htmlRender();

		// 프린트 브라우저
		g_printBrowser = new FingerReportView();
		g_printBrowser.init();
	}
	
	// .fcs 불러오기 (시스템팀만 사용)
	var sys_btn_fcs_open = $('#sys_btn_fcs_open');
	if (sys_btn_fcs_open.length) {
		sys_fileBrowser = new FingerFileBrowser({useReader: true, target: {
			fcsName: 'empty',
			
			fileChange: function(e, files) {
				var f = files[0];
				this.fcsName = f.name.replace(/\.[^/.]+$/, "");
			},
			
			fileReaderOnload: function(e, result) {
				// fcs 로드
				var id = this.fcsName;
				g_main.setCurrentTabInfo(id, id, id);
				
				var code = result.replace(/<script>|<\/script>/gi, "");
				
				// 마지막 ; 을 제거하기위해 substr 사용
				g_main.loadModel(code.substr(0, code.length - 1));
			}
		}});
		
		sys_btn_fcs_open.click(function() {
			sys_fileBrowser.browse();
		});
	}
	
	// 메뉴 검색 기능
	if (jQuery('#sys_global_menu_search').length) {
		if (g_main.userMenus && g_main.userMenus.list) {
			var menuList = g_main.userMenus.list.filter(function(obj) {
				return (obj['form_id'] && obj['p_menu_id'] != 'MyMenu');
			});
			var m_search = new FingerAutoComplete('sys_global_menu_search');
			m_search.setColumn('menu_name');
			m_search.setCallFunc(function callBack(data) {
				onSearchModel(data);
			});
			m_search.create(menuList);
		}		
	}
}