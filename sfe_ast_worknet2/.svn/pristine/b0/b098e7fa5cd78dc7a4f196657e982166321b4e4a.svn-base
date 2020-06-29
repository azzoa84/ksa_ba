<!DOCTYPE html>
<html lang="ko">
<%@ page import="java.io.*"%>
<%@ page import="java.util.*"%>
<%@ page import="net.sf.json.JSONSerializer"%>
<%@ page import="fingersales.common.util.Utility"%>
<%@ page import="fingersales.common.service.ServiceMap"%>
<%@ page import="fingersales.common.util.FingerParamMap"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ncid"><%= "201904051450" %></c:set>
<head>
	<meta charset="UTF-8">
	<meta http-equiv="Expires" content="0">
	<meta http-equiv="Last-Modified" content="0">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate">
	<meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta http-equiv="content-language" content="ko">
    <meta http-equiv="content-type" content="text/html; charset=euc-kr">
    <meta name="robots" content="noarchive">
	<meta name="viewport" content="width=1280">
	<title>Astellas Worknet4.0</title>
	<link href="${pageContext.request.contextPath}/img/favicons.png" rel="shortcut icon" type="image/ico"/>
	<link rel="stylesheet" type="text/css" href="./css/webfont/notosanskr.css" />
	<link rel="stylesheet" href="http://fonts.googleapis.com/earlyaccess/nanumgothic.css">
	<link rel="stylesheet" type="text/css" href='${pageContext.request.contextPath}/dhtmlx/dhtmlx.css' />
	<link rel="stylesheet" type="text/css" href="./fingerPlatform/css/fontawesome-all.min.css?v=${ncid}" />
	<link rel="stylesheet" type="text/css" href="./fingerPlatform/css/style.css?v=${ncid}" />
	<link rel="stylesheet" type="text/css" href="./fingerPlatform/css/menu.css?v=${ncid}" />
	<link rel="stylesheet" type="text/css" href="./fingerPlatform/css/pagination.css" />
	<link rel="stylesheet" type="text/css" href="./fingerPlatform/css/jstree.css" />

	<!-- Webix Widget (CSS) -->
	<link rel="stylesheet" type="text/css" href="./fingerPlatform/library/webix/codebase/webix_custom.css" />
	<link rel="stylesheet" type="text/css" href="./fingerPlatform/css/webix.init.css?v=${ncid}" />
    
	<!-- Full Calendar (CSS) -->
	<link rel="stylesheet" type="text/css" href="./fingerPlatform/library/fullcalendar-2.9.1/fullcalendar.css" />
	<link rel="stylesheet" type="text/css" href="./fingerPlatform/library/fullcalendar-2.9.1/fullcalendar.print.css" media="print" />
	
	<!-- (190419, 김영도추가) MultipleSelect (CSS) -->
	<link rel="stylesheet" type="text/css" href="./fingerPlatform/library/multipleselect/multiple-select.css" />		
	
	<!-- Stimul Report (CSS) -->
	<link rel="stylesheet" type="text/css" href="./fingerPlatform/library/stimulreport/stimulsoft.viewer.office2013.whiteblue.css" />	
	
	<!-- Custom Layout (CSS) -->
	<link rel="stylesheet" type="text/css" href="./fingerPlatform/css/customWfDocument.css?v=${ncid}" />
	
	<script>
		var favCheckList = [];
		var g_ncid = "${ncid}";
		var g_ContextPath = "${pageContext.request.contextPath}";
		var g_mapkey = '<%=request.getSession().getAttribute("mapkey")%>';
		var g_kakaoMapKey = '<%=request.getSession().getAttribute("MapKey")%>';
		var g_XLPath  = "${pageContext.request.contextPath}/sso/SWNAjaxXL.do";
	</script>
	<script src='./dhtmlx/dhtmlx.js'></script>
	
	<script src="./fingerPlatform/library/jquery.techbytarun.excelexportjs.js?v=${ncid}"></script>
	<script src="./fingerPlatform/library/jquery-1.10.2.min.js"></script>
	<script src="./fingerPlatform/library/aes.js"></script>   
	<script src="./fingerPlatform/library/mode-cfb.js"></script>   
	<script src="./fingerPlatform/library/fastclick.js"></script>   
	<script src="./fingerPlatform/library/pad-ansix923.js"></script>   
	<script src="./fingerPlatform/library/autoNumeric-1.8.0.js"></script>    
	<script src="./fingerPlatform/library/jsr_class.js"></script>
	<script src="./fingerPlatform/library/swiper.js"></script>
	<script src="./fingerPlatform/library/multipleselect/multiple-select.js"></script>
	<script src="./fingerPlatform/library/papaparse.js"></script>
	<script src="./fingerPlatform/common.js?v=${ncid}"></script>
	<script src="./fingerPlatform/commonQuery.js?v=${ncid}"></script>
	<script src="./fingerPlatform/dashboard.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerMultiSelect.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerMultipleSelect.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerHost.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerButton.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerButtonEdit.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerDataGrid.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerLabel.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerDateEdit.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerEdit.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerImage.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerImageGroup.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerAjax.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerAjaxComm.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerUtil.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerPanel.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerComboBox.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerCheckBox.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerTab.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerContainerTab.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerTree.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerWindow.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerPopupInit.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerPopup.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerPopup2.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerPopupStack.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerLayout.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerMemoEdit.js?v=${ncid}"></script>
	<script src="./fingerPlatform/FingerSpinEdit.js?v=${ncid}"></script>
	<script src="./fingerPlatform/FingerLine.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerNumberEdit.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerWebEditor.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerScheduler.init.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerScheduler.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerMultiScheduler.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerPieChart.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerBarChart.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerLineChart.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerReportView.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerHTMLView.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerFileBrowser.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerFilePanel.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerRadioBox.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerAutoComplete.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerIFrame.js?v=${ncid}"></script>
	<script src="./fingerPlatform/globalEvents.js?v=${ncid}"></script>
	<script src="./fingerPlatform/md5.js?v=${ncid}"></script>
	<script src="./fingerPlatform/pagination.js?v=${ncid}"></script>
	<script src="./fingerPlatform/menu.js?v=${ncid}"></script>
	<script src="./fingerPlatform/custom/customApprLine.js?v=${ncid}"></script>
	<script src="./fingerPlatform/custom/customStepLine.js?v=${ncid}"></script>
	<script src="./fingerPlatform/custom/customWfDocument.js?v=${ncid}"></script>
	<script src="./fingerPlatform/custom/customHome.js?v=${ncid}"></script>
	
	<!-- DSM Dashboard -->
	<script src="./fingerPlatform/custom/dsm/customDSMDashboard.js?v=${ncid}"></script>
	<script src="./fingerPlatform/custom/dsm/customDSMPlanProfit.js?v=${ncid}"></script>
	<script src="./fingerPlatform/custom/dsm/customDSMCallResult.js?v=${ncid}"></script>
	<script src="./fingerPlatform/custom/dsm/customDSMCallCoverage.js?v=${ncid}"></script>
	<script src="./fingerPlatform/custom/dsm/customDSMCallKSA.js?v=${ncid}"></script>
	<script src="./fingerPlatform/custom/dsm/customDSMCompanyCompare.js?v=${ncid}"></script>
	<script src="./fingerPlatform/custom/dsm/customDSMBudget.js?v=${ncid}"></script>
	<script src="./fingerPlatform/custom/dsm/customDSMDDD.js?v=${ncid}"></script>
	
	<!-- Image Handling Library -->
	<script src="./fingerPlatform/library/tiff.js"></script>
	
	<!-- JS Tree library -->
	<script src="./fingerPlatform/library/jstree.min.js"></script>
	
	<!-- Full Calendar library -->
	<script src="./fingerPlatform/library/fullcalendar-2.9.1/moment.min.js"></script>
	<script src="./fingerPlatform/library/fullcalendar-2.9.1/fullcalendar.min.js"></script>
	<script src='./fingerPlatform/library/fullcalendar-2.9.1/lang/ko.js'></script>
	
	<!-- highcharts library -->
	<script src="./fingerPlatform/library/highcharts/highcharts.js"></script>
	<script src="./fingerPlatform/library/highcharts/highcharts-3d.js"></script>
	<script src="./fingerPlatform/library/highcharts/modules/exporting.js"></script>
	<script src="./fingerPlatform/library/highcharts/common.js?v=${ncid}"></script>
	
	<!-- Webix Widget (Core) -->
	<script type="text/javascript" src="./fingerPlatform/library/webix/codebase/webix.js"></script>
	<script type="text/javascript" src="./fingerPlatform/library/webix/codebase/skin.js"></script>
	<script type="text/javascript" src="./fingerPlatform/library/webix/codebase/ko-kr.js"></script>
	<script src="./fingerPlatform/library/webix_ready.js?v=${ncid}"></script>
	
	<!-- Stimul Report -->
	<script type="text/javascript" src="./fingerPlatform/library/stimulreport/stimulsoft.reports.pack.js"></script>
	<script type="text/javascript" src="./fingerPlatform/library/stimulreport/stimulsoft.viewer.pack.js"></script>	
	
	<!-- naver smart editor -->
	<script type="text/javascript" src="./fingerPlatform/library/navereditor/js/HuskyEZCreator.js" charset="utf-8"></script>
	<link href="./fingerPlatform/library/navereditor/css/smart_editor2.css" rel="stylesheet" type="text/css"/>
	
	<!-- Kakao Map -->
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=<%= request.getSession().getAttribute("MapKey") %>&libraries=services,clusterer,drawing"></script>
	
	<script type="text/javascript" language="javascript">
		$(document).ready(function() {
			// Stimul Report License Key 등록
			Stimulsoft.Base.StiLicense.loadFromFile("./fingerPlatform/library/stimulreport/license.key");
			
			$.ajaxSetup({ cache: false });
			
			// 도움말보기(help)
			$('.float_help_icon').on('click', function(event) {
				if (g_currentModule.help_yn == 'Y') {
					var helpFilePath = commSearchHelpFile(g_currentModule.help_doc_id);
					if (helpFilePath) {
						g_fileBrowser.download(helpFilePath);
					} else {
						g_main.openPopup('popHelpView.html', 'popHelpView', '도움말보기', 1000, 682, '', '', {menu_id: g_currentModule.menu_id}, '', '');
					}
				}
			});
		});
	    var pageout = false;
		var tabCount = 1;
		
	    // global scope    
	    var g_encryption = 'N';    
	    var key = CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f');
	    var iv = CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f');
		
	    var g_AjaxPath  = "${pageContext.request.contextPath}/SWNAjaxL.do";
	    var g_webRoot = '${pageContext.request.contextPath}/';
	    var g_scriptPath = './fingerPlatform';
	    var g_dhtmlxRoot = '${pageContext.request.contextPath}/dhtmlx';
	    
	    var g_container = null;
	    var g_currentModule = null;
	    var g_popupStack = null;
	    var g_main = null;
	    var g_debug = false;
	    var g_isFcs = false;
	    var g_fileBrowser = null;
	    var g_printBrowser = null;
	    var g_currentGrid = null;
	    var g_currentWindow = null;
	    var g_openFileUploaderCallback = null;
	    var g_openDocUploaderCallback = null;
	    var g_openPrintHtml = null;
	    var g_openPrintHtmlCallback = null;
	</script>
</head>
<body>
<div class="wrapper">
	<header class="header">
		<div class="inner clearfix">
			<h1 id="logo"><a href="#" onclick="g_main.setHomeTab();"><img src="./fingerPlatform/images/logo.png" alt="astellas"></a></h1>
			<div class="util">
				<div class="total-search">
					<input id="sys_global_menu_search" type="text" class="input-search" autocomplete="off" placeholder="메뉴검색" />
					<button type="button" class="btn-search" onclick="openDevModel();"><img src="./fingerPlatform/images/btn_search.png" alt="검색"></button>
				</div>
				
				<c:if test="${sessionScope.SystemDeveloper eq 'Y'}">
					<button id="sys_btn_fcs_open" type="button" class="btn-fmopen">LOAD FCS</button>
				</c:if>
				<button type="button" class="btn-member">${sessionScope.DeptName} ${sessionScope.EmpName}</button>
				<button type="button" class="btn-sign" onclick="location.href = '${pageContext.request.contextPath}/admin/logout.do'">로그아웃</button>
			</div>
		</div>
		
		<nav class="mainmenu">
		</nav>
	</header><!-- //header -->

	<div class="blockui" style="display:none;"></div>
	
	<div id="fpViewHost" class="container">
		<!-- 업무영역 -->
		<div id="fpView">
		</div>
		<div class="float_help_icon"></div>    
	</div>
	
	<div class="footer">
		<div class="inner">
			<p>Astellas.co.kr <span>ㅣ</span> Astellas SmartWorknet <span>ㅣ</span> <span onclick="window.open(getServerFileUrl('CPFiles/PrivacyPolicy.pdf'));" style="cursor:pointer;">임직원 개인정보처리방침</span></p>
			<p class="copyright">© Copyright 2017, Astellas Pharma Korea. Inc. all rights reserved</p>
		</div>
	</div>

    <div id="decoder" style="visibility:hidden" />
    <span id="ruler" style="visibility: hidden; white-space: nowrap;"></span>  

	<input type="hidden" name="compid" value="worknet40">
	<input type="hidden" name="file_upload_sub_category" id="file_upload_sub_category" value="">
    
    <iframe id="modelFrame" width="0" height="0" style="display:none" onload="if (g_main != undefined) g_main.loadModel();"></iframe>    
    <iframe id="homeFrame" width="0" height="0" style="display:none" onload="if (g_main != undefined) g_main.loadHome();"></iframe>        
    <iframe id="popupFrame" width="0" height="0" style="display:none" onload="if (g_main != undefined && g_main.loadPopup) g_main.loadPopup();"></iframe>
    
</div><!-- //wrapper -->
</body>

</html>
<script>       
	function Main() {    
		var $ = this;
        $.childPages = new Object();
        $.panel = null;
        $.tab = null;
        $.logo = null;
        
        $.panel1 = null;
        $.label1 = null;
        $.panel2 = null;
        $.line1 = null;
        $.grid1 = null;
        
        $.panel3 = null;
        $.label2 = null;
        $.line2 = null;
        $.grid2 = null;
        
        $.panel4 = null;
        $.label3 = null;
        $.line3 = null;
        $.grid3 = null;        
        
        $.btnMenu1 = null;
        $.btnMenu2 = null;
        $.btnMenu3 = null;
        $.btnMenu4 = null;
        $.btnMenu5 = null;
        $.menuGrid = null;
        $.menuTree = null;
        $.menuData = null;
        
        $.homeTabID = null;
        $.currentTabID = null;
        $.currentTabName = null;
        $.currentTabMenuID = null;
        $.currentTabPage = null;
        $.session = new Session();
		
        $.session.userid = '<%=session.getAttribute("EmpCode")%>';
        $.session.username = '<%=session.getAttribute("EmpName")%>';
        
        $.userMenus = new UserMenus();
        
        $.paramOpenMenus = [];

		<%
		Enumeration sessionAttrs = session.getAttributeNames();
		while (sessionAttrs.hasMoreElements()) {
			String sName = (String)sessionAttrs.nextElement();
			if (session.getAttribute(sName) instanceof String) {
				String sValue = (String)session.getAttribute(sName);
				out.println("$.session.setValue(" + "'" + sName + "', '" + sValue + "');");			    	
			}
		};
		
		Map reqParams = request.getParameterMap();
		for (Iterator iter = reqParams.keySet().iterator(); iter.hasNext();) {
			String paramKey = (String) iter.next();
			if (paramKey.indexOf("menuId") > -1) {
				out.println("$.paramOpenMenus.push(" + "'" + request.getParameter(paramKey) + "');");
			}
		}
		out.print("$.userMenus.setMenuList(JSON.parse('");
		out.print(Utility.getJSONString(((List<List<FingerParamMap>>) session.getAttribute("userMenus")).get(0)));
		out.print("'));");
		/*
		out.println("");
		out.print("$.formMessages = JSON.parse('");
		out.print(Utility.getJSONString(((List<List<FingerParamMap>>) session.getAttribute("formMessages"))));
		out.print("');");
		*/		
		%>
        $.debug = '';
        $.msgShare = null;     
        $.argShare = null;   
        
        // myMenu map 생성
        $.myMenuData = new Object();
        // 모든 메뉴의 폼 아이디, 마이메뉴 여부를 map으로 등록한다.
        $.menuMap = new Object();        
		
        if (window.mnuObj) {
            for (var ii = 0; ii < mnuObj.length; ii++) {
            	var m = mnuObj[ii];
            	$.menuMap[m.menuId] = new Menu(
            				m.menuId,
            				m.menuName,
            				m.parentId,
            				m.webId,
            				m.webFile
            			);
            	
            }        	
        }
        
        // 탭 중복 체크
        $.existKey = function(pageKey) {
            for (key in $.childPages) {
                if (key == pageKey) {                
                    g_currentModule = $.childPages[key];                                       
					
                    // 탭 선택
                    $.tab.extObj.setTabActive(g_currentModule.tabid);                        
                    return true;
                }
            }            
            return false;
        }

        $.addChildPage = function(pageKey, page) {		
            if ($.existKey(pageKey) == false) {
                $.childPages[pageKey] = page;				
                return true;
            }			
            return false;
        }
		
        $.init = function() {
            g_container = this;
            var fpView = document.getElementById('fpView');
            var today = document.getElementById('today');

            $.tab = new FingerContainerTab(fpView, 'container_tab1', 1, 1, /*1065*/1280, 770);
            
            fpView = null;
        };
		
        $.start = function() {
            $.tab.setEnableTabCloseButton(true);

            //console.log('openHome!!');
            $.openHome('home');
            
            // 파라메터로 넘어온 메뉴 아이디가 있는 경우 메뉴 오픈 실행
            if ($.paramOpenMenus && $.paramOpenMenus.length) {
                for (var i = 0; i < $.paramOpenMenus.length; i++) {
                	$.openModelWithBusiness($.paramOpenMenus[i], null, true, false);
                }
            }
            
            // 영업부의 경우, Main Dashboard(영업Portal) 오픈
            /*
            if (true) {
            	$.openModelWithBusiness('mainDashboard', null, true, false);
            }
            */
        };

        $.callback = function(type, ds, text) {
        	if (type == 'addTab') {
                var obj = null;

                try {
                    obj = eval(text);

                    if ($.addChildPage($.currentTabID, obj)) {
                        var tabpage = $.tab.addTab($.currentTabID, $.currentTabName);

                        $.currentTabPage = document.getElementById(tabpage.id);

                        // 비지니스에 메뉴 정보 전달
                        if (obj.menu_formid == null)                        
                            obj.menu_formid = $.currentTabID;
                        if (obj.menu_name == null)
                            obj.menu_name = $.currentTabName;
                        if (obj.menu_id == null)
                            obj.menu_id = $.currentTabMenuID;
                        
                        obj.init($.currentTabPage);
                        obj.start(); 
                        
                        if (obj.update != undefined)
                            obj.update();                       

                        g_currentModule = obj;
                        g_currentModule.tabid = tabpage.tabid;

                        $.tab.extObj.setTabActive(tabpage.tabid);                        

                        
                        $.currentTabID = null;
                        $.currentTabName = null;
                        $.currentTabMenuID = null;
												
                    }
                    else {
                    }
                }
                catch (err) {
                    console.log('[1] 프로그램을 찾을 수 없습니다.');
                }
                finally {
                    obj = null;
                }
            }
            else if (type == 'addTab2') {
                var obj = null;
                
                try {
                    obj = eval(text);

                    if ($.addChildPage($.currentTabID, obj)) {                    
                        var tabpage = $.tab.addTab($.currentTabID, $.currentTabName);

                        $.currentTabPage = document.getElementById(tabpage.id);

                        // 비지니스에 메뉴 정보 전달
                        if (obj.menu_formid == null)                        
                            obj.menu_formid = $.currentTabID;
                        if (obj.menu_name == null)
                            obj.menu_name = $.currentTabName;
                        if (obj.menu_id == null)
                            obj.menu_id = $.currentTabMenuID;

                        obj.init($.currentTabPage, $.argShare);
                        obj.start();    
                        
                        if (obj.update != undefined)
                            obj.update($.argShare);                       

                        g_currentModule = obj;
                        g_currentModule.tabid = tabpage.tabid;

                        $.tab.extObj.setTabActive(tabpage.tabid);                        

                        $.currentTabID = null;
                        $.currentTabName = null;
                        $.currentTabMenuID = null;
                        $.argShare = null;
                    }
                    else {                        
                        if (g_currentModule.update != undefined)
                           g_currentModule.update($.argShare);
                            
                        $.currentTabID = null;
                        $.currentTabName = null;
                        $.currentTabMenuID = null;
                        $.argShare = null;
                    }
                }
                catch (err) {
                    console.log('[2] 프로그램을 찾을 수 없습니다.');
                }
                finally {
                    obj = null;
                }                        
            }            
            else if (type == 'sendmail') {
                console.log(text);
            }
        }

        $.fingerbutton_click = function(id) {            
        }

        $.fingertab_selectionchange = function(id, tabid) {
            var tabpage = $.tab.getFingerTabPage(tabid);
            if (tabpage) {
            	g_currentModule = $.childPages[tabpage.pageKey];
            	var tabElement = document.getElementById(tabpage.id);
            	var menuHelpYn = tabElement.getAttribute('help_yn') || 'N';
				// 도움말보기(help) 메뉴 표시
				menuHelpYn == 'Y' ? jQuery('.float_help_icon').addClass('on') : jQuery('.float_help_icon').removeClass('on');
            }
        }

        $.fingertab_ontabclose = function(id, tabid) {
            var tabpage = $.tab.getFingerTabPage(tabid);
            
            var obj = $.childPages[tabpage.pageKey];
                       
            if (obj != null && obj.dispose != undefined)                       
                obj.dispose();            
            
            delete obj;
            delete $.childPages[tabpage.pageKey];

            tabpage = null;
            obj = null;
			tabCount = $.tab.getTabCount() - 1;	
		
            return true;
        }

        // 개발자 모드 비지니스 오픈 다이얼로그 출력
        var wnd =  null;
        $.showOpenModel = function() {
            var fpView = document.getElementById('fpView');

            var dhxWins = new dhtmlXWindows();
            wnd = dhxWins.createWindow('window', 400, 200, 250, 100);
            wnd.center();

            //wnd.setModal(true);
            wnd.button('minmax1').hide();
            wnd.button('minmax2').hide();
            wnd.button('park').hide();
            wnd.denyResize();
            
            wnd.setText('Open Model');

            var e = document.createElement('div');
            e.id = 'openModel';
            e.style.position = 'absolute';
            e.style.padding = '20px';
            e.style.backgroundColor = 'transparent';

            var i = document.createElement('input');
            i.id = 'modelName';
            i.setAttribute('type', 'text');
            i.value = $.debug;
            i.addEventListener('keydown', $.onKeyDown);

            e.appendChild(i);

            var b = document.createElement('input');
            b.id = 'btnOk';
            b.setAttribute('type', 'button');
            b.value = '확인';
            b.addEventListener('click', $.openModelDirect);

            e.appendChild(b);

            wnd.attachObject(e);
            
            i.focus();

            b = null;
            i = null;
            e = null;
            dhxWins = null;
            fpView = null;
        }
        
        // 비지니스 오픈 다이얼로그에서 엔터키 입력시 
        $.onKeyDown = function(e) {
            if (event.keyCode===13) {                
                $.openModelDirect();
            }            
        };

        // 개발자 모드 비지니스 오픈
        $.openModelDirect = function() {        
            var temp = document.getElementById('modelName');            
            $.debug = temp.value;
            $.currentTabID = temp.value;           
            
            document.getElementById('modelFrame').src = './model/' + temp.value + '.html';            
            wnd.close();            
            
            json = null;
            temp = null;
        };
        
        $.setCurrentTabInfo = function(menuid, webid, menuname, helpyn, helpDocId) {
        	$.currentTabMenuID = menuid;
        	$.currentTabID = webid;
            $.currentTabName = menuname;
            $.currentTabHelpYn = helpyn || 'N';
            $.currentTabHelpDocId = helpDocId || '';
        };
        
        // 비지니스에서 webid를 지정해 오픈
        $.openModelWithBusiness = function(webid, args, isMenu, isChange) {
            $.argShare = args;
            
            // 메뉴목록에서 해당 webid 를 가진 메뉴를 검색할지 여부 (기본값: false)
            isMenu = (isMenu === undefined ? false : isMenu);
            
            // 탭을 새로 띄울지, 기존 탭에서 변경할지 여부
            isChange = (isChange === undefined ? true : isChange);
            
            if (!isMenu) {
            	if (isChange) {
            		$.closeCurrentScreen();
            	}
                
            	if (webid == 'crmWFGeneralProc') {
                	$.setCurrentTabInfo('M2010020915222670303', 'crmWFGeneralProc', '결재함/기안함');
                	document.getElementById('modelFrame').contentWindow.location.replace('./model/' + 'crmWFGeneralProc.html' + '?v=' + getTimeStamp(new Date()));
                }
            	else if (webid == 'crmPassword') {
                	$.setCurrentTabInfo('20100520093528170121', 'crmPassword', '결재비밀번호설정');
                	document.getElementById('modelFrame').contentWindow.location.replace('./model/' + 'crmPassword.html' + '?v=' + getTimeStamp(new Date()));
                }
            } else {
            	if (isChange) {
            		$.closeCurrentScreen();
            	}
            	
            	//$.setCurrentTabInfo(webid, webid, webid);
            	//document.getElementById('modelFrame').contentWindow.location.replace('./model/' + (webid + '.html' + '?v=' + g_ncid));
            	
            	var menu = g_main.userMenus.getMenuInfo(webid);
            	if (menu) {
            		var menuid = menu.menu_id;
            		var webid = menu.form_id;
            		var menuname = menu.menu_name;
            		
                	$.setCurrentTabInfo(menuid, webid, menuname);
                	document.getElementById('modelFrame').contentWindow.location.replace('./model/' + (webid + '.html' + '?v=' + getTimeStamp(new Date())));
            	} else {
            		MessageBoxShow('해당 메뉴에 대한 접근 권한이 없습니다.');
            		return;
            	}
            }
        };

        // 현재 화면 클로즈
        $.closeCurrentScreen = function() {
            var tabId = $.tab.extObj.getActiveTab();

            $.tab.closeTabEventHandler(tabId);
            $.tab.extObj.removeTab(tabId);
            //setTimeout(function(){ $.tab.extObj.removeTab(tabId); }, 300);
        };
        
        // 컨테이너 메뉴에서 비지니스 오픈
        $.openModel = function(modelName, menuId) {
        	// 2019.03.27 김동환 임시
        	if (modelName == '0') {
        		MessageBoxShow('빠른 시일 내에 제공 예정입니다. 조금만 기다려 주세요.');
        		return;
        	}
        	
        	if (tabCount > 9) {
        		MessageBoxShow('탭은 최대 10개까지 오픈하실 수 있습니다.');
        		return;
        	}
			document.getElementById('modelFrame').contentWindow.location.replace('./model/' + modelName.split(".")[0] + '.html' + '?v=' + getTimeStamp(new Date()));
			
			if (window.sysMenuAccessLog && menuId) {
				// 메뉴 접속 로그
				sysMenuAccessLog({'menuId':menuId});
			}
        };
        
        // Home 화면 오픈
        $.openHome = function(modelName) {
            document.getElementById('homeFrame').src = './model/' + modelName + '.html' + '?v=' + g_ncid;
        };
        
        $.updateMyMenu = function(menu) {  
            var menuInfo = $.menuMap[menu.id.replace('chk_', '')];
            var param = {
					sp: "fpMyMenuSave",
					p1: "S",
					p2: "<%=session.getAttribute("UserID")%>",
					p3: menuInfo.menuID,
					p4: menuInfo.menuName,
					//p6: menuInfo.parentMenuID,
					p5: "MyMenu",
					p6: "FORM",
					p7: 0
			};
            
            if (menu.checked) {
                // 마이메뉴 등록
                param.p1 = "S";
                var json = JSON.stringify(param);
                callPost2(g_AjaxPath, ['req', json], 'addMyMenu', $);
            }
            else {
                // 마이메뉴 삭제
                param.p1 = "D";
                var json = JSON.stringify(param);
                callPost2(g_AjaxPath, ['req', json], 'delMyMenu', $);
            }
        }
        
		$.openPopupQ = function(id, param) {
		};
        
		$.openPopup = function(file, id, title, width, height, controlText, header, argument, procedureName, paramInfo) {
			var popOpt = (fingerPopupOptions[id] ? fingerPopupOptions[id] : {'title':title, 'width':width, 'height':height});

			// fingerPopup 생성
			var fpView = document.getElementById('fpView');
			var popup = new FingerPopup(fpView, id, 0, 0, popOpt.width, popOpt.height, controlText, header, argument, procedureName, paramInfo);
			popup.setText(popOpt.title);
			g_popupStack.push(id, popup);
			
			$.loadPopup = function() {
				var obj = null;
				try {
					if (document.getElementById('popupFrame').contentWindow.Main != null) {
						obj = eval('new ' + document.getElementById('popupFrame').contentWindow.Main.toString() + '();');
						obj.popup_id = id;
						var popup = g_popupStack.get();
						popup.openModel(obj, popup);
					}
				}                   
				catch (err) {
					console.log("[Script Error]" + err);
				}
				finally {
					obj = null;
				}                
			}
			document.getElementById('popupFrame').src = ('./model/' + file + '?v=' + getTimeStamp(new Date()));
		}

        $.fingerpopup_close = function(id) {
			if (g_popupStack && g_popupStack.has()) {
				g_popupStack.get().obj.fingerpopup_close(id);
				
			} else if (g_currentModule != null) {
				if (g_currentModule.fingerpopup_close != undefined) {
					g_currentModule.fingerpopup_close(id);
				}
			}
            var nod = document.getElementById("fpView__" + id);
            if (nod != null && nod.parentNode != null) nod.parentNode.removeChild(nod);
        };
        
        $.needLogin = function(){
        	MessageBoxShow("로그인 세션이 만료되었습니다. 다시 로그인 해 주세요");
        };
        
        $.logout = function() {
            var fpView = document.getElementById('fpView');
            var msgBox = new FingerWindow(fpView, 'window', 0, 0, 260, 150, '확인', '로그아웃 하시겠습니까?', 'yesNo', function() {
                if (g_main.msgShare == true) {    
                                
                    var form = document.getElementById('form');
                    var formvalue1 = document.getElementById('formvalue1');
                    formvalue1.value = 'logout';
					
					pageout = true;
                    form.submit();
                }
            });
            msgBox.show();
        }
        
        $.empChange = function() {
        	
        	$.openPopup('popEmpChange.html', 'popEmpChange', '사원 조회', 705, 435, '', '', null, '', '');
        }
        

    	$.sso = function(id) {
    		window.location = "./loginProc.do?empId=" + id;
    	};
        
        
        $.today = function() {
            var e = document.getElementById('today');
            
            if (e.style.visibility == 'visible') {
                e.style.visibility = 'hidden';
            }
            else {
                e.style.visibility = 'visible';
                
                var fpViewHost = document.getElementById('fpViewHost');                
                e.style.height = (fpViewHost.style.height.replace('px', '') * 1) + 2 + 'px';
            }
        }
        
        $.openMap = function(x, y, text) {            
            // 팝업 윈도우 띄우기
            var fpView = document.getElementById('fpView');

            var dhxWins = new dhtmlXWindows();
            wnd = dhxWins.createWindow('window', 0, 0, 820, 650);
            var pos = getCenterOnScreen(820, 650);
            wnd.setPosition(pos[0], pos[1]);
            wnd.setModal(true);
			
            wnd.setModal(true);
            wnd.button('minmax1').hide();
            wnd.button('minmax2').hide();
            wnd.button('park').hide();
            wnd.denyResize();
            wnd.denyMove();
            
            wnd.setText('지도');
            
            var e = document.createElement('div');
            e.style.width = '810px';
            e.style.height = '610px';
            e.style.padding = '10px';
            
            var frame = jQuery(e).append('<iframe name="map" width="820px" height="610px" scrolling="no" frameBorder="0" style="overflow:hidden; z-Index:99999; position:absolute; left:0px; top:0px;" src="companyMap.html"></iframe>');            
            wnd.attachObject(e);
            
            var mapElement = document.getElementsByName('map')[0];
            
            mapElement.onload = function() {
                var mapContext = mapElement.contentWindow || mapElement.contentDocument;
				mapContext.SetCenter(x, y);
                mapContext.AddMarker(x, y,text);
            }                       
        }       
		
        $.openGMap = function(x, y, text) {
            // 팝업 윈도우 띄우기
            var fpView = document.getElementById('fpView');

			var dhxWins = new dhtmlXWindows();
            wnd = dhxWins.createWindow('window', 0, 0, 820, 650);
            var pos = getCenterOnScreen(820, 650);
            wnd.setPosition(pos[0], pos[1]);
            wnd.setModal(true);
			
            wnd.setModal(true);
            wnd.button('minmax1').hide();
            wnd.button('minmax2').hide();
            wnd.button('park').hide();
            wnd.denyResize();
            wnd.denyMove();
            
            wnd.setText('지도');
			
            var e = document.createElement('div');
            e.style.width = '810px';
            e.style.height = '610px';
            e.style.padding = '10px';
			wnd.attachObject(e);
			
			var mapOptions = {
				center: new google.maps.LatLng(y, x),
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map(e, mapOptions);

			var m1 = new google.maps.Marker({
			    position: mapOptions.center,
			    title:text
			});
			m1.setMap(map);
		}
   
        // Popup 화면 로드
        $.loadPopup = function() {}
        
        // Home 화면으로
        $.setHomeTab = function() {
        	$.tab.extObj.setTabActive($.homeTabID);
        }
        
        // Home 화면 로드
        $.loadHome = function() {            
            var obj = null;

            try {
            	if(!document.getElementById('homeFrame').contentWindow.Main) return;
                obj = eval('new ' + document.getElementById('homeFrame').contentWindow.Main.toString() + '();');                   
				$.childPages["home"] = obj;				
                var tabpage = $.tab.addTab('home', 'HOME');

                $.currentTabPage = document.getElementById(tabpage.id);

                obj.init($.currentTabPage);
                obj.start();       

                if (obj.update != undefined) 
                    obj.update();             
                
                g_currentModule = obj;
                g_currentModule.tabid = tabpage.tabid;
                
                $.homeTabID = tabpage.tabid;
                $.tab.extObj.setTabActive(tabpage.tabid);                        
            }
            catch (err) {
            	console.log("[Script Error]" + err);
            }
            finally {
                obj = null;
            }           
        }
        
        // 모델 로드
        $.loadModel = function(modelSrc) {                                       
            var obj = null;

            try {
            	if (modelSrc) {
            		obj = eval('new ' + modelSrc + '();');
            	} else {
                	if (document.getElementById('modelFrame').contentWindow.session_logout_div) {
                		alert("세션이 만료되었습니다.\n 다시 로그인 해주시기 바랍니다.");
            			var link = '${pageContext.request.contextPath}/login.jsp';
            			window.open(link, '_self');
                	}
                    if (document.getElementById('modelFrame').contentWindow.Main == null) {
                    	return;
                    }
                    
                    obj = eval('new ' + document.getElementById('modelFrame').contentWindow.Main.toString() + '();');            		
            	}
                
                if ($.addChildPage($.currentTabID, obj)) {

                    var tabpage = $.tab.addTab($.currentTabID, $.currentTabName);

                    // g_currentModule 에 모델 바인딩 소스코드 위치 변경 (2016.11.22 김영도)
                    g_currentModule = obj;
                    g_currentModule.tabid = tabpage.tabid;
                    $.currentTabPage = document.getElementById(tabpage.id);
                    $.currentTabPage.setAttribute('help_yn', $.currentTabHelpYn);
                    $.currentTabPage.setAttribute('help_doc_id', $.currentTabHelpDocId);

                    // 비지니스에 메뉴 정보 전달
                    if (obj.menu_formid == null)                        
                        obj.menu_formid = $.currentTabID;
                    if (obj.menu_name == null)
                        obj.menu_name = $.currentTabName;
                    if (obj.menu_id == null)
                        obj.menu_id = $.currentTabMenuID;
                   	if (obj.help_yn == null)
                   		obj.help_yn = $.currentTabHelpYn;
                   	if (obj.help_doc_id == null)
                   		obj.help_doc_id = $.currentTabHelpDocId;
                                        
                    obj.init($.currentTabPage, $.argShare);
                   	obj.start();

                    var fingerPanelIndex = 0;
                    if ($.currentTabPage.childNodes[0].tagName.toLowerCase() != 'iframe') {
                        $.currentTabPage.childNodes[fingerPanelIndex].style.position = 'relative';
                        $.currentTabPage.childNodes[fingerPanelIndex].style.cssFloat = 'left';
                    }
                    else {
                        fingerPanelIndex = 1
                        $.currentTabPage.childNodes[fingerPanelIndex].style.position = 'relative';
                        $.currentTabPage.childNodes[fingerPanelIndex].style.cssFloat = 'left';
                    }
                    if (obj.update != undefined)
                        obj.update($.argShare);
                    
                    //g_currentModule = obj;
                    //g_currentModule.tabid = tabpage.tabid;                    
                    $.tab.extObj.setTabActive(tabpage.tabid);                        

					tabCount = $.tab.getTabCount();
                }
                else {
                	// 메뉴가 탭에 이미 추가 되어 있을 때
					if (g_currentModule.update != undefined) {
						g_currentModule.args = $.argShare;
                        g_currentModule.update($.argShare);
                    }
                }
            }
            catch (err) {
                console.log(err.message);
                MessageBoxShow('메뉴 로드 중 오류가 발생 하였습니다.<br/><br/> [' + err.message + ']');
            }
            finally {
                /* (190116, 김영도) 외부 사이트 링크를 로그에 포함시키기 위해 로그 기록 위치를 변경
                if (window.sysMenuAccessLog && $.currentTabMenuID) {
                	// 메뉴 접속 로그
                	sysMenuAccessLog({'menuId':$.currentTabMenuID});
                }
            	*/
                // 개체 참조 제거
                obj = null;
                $.currentTabID = null;
                $.currentTabName = null;
                $.currentTabMenuID = null;     
                $.currentTabHelpYn = null;
                $.currentTabHelpDocId = null;
				$.argShare = null;
            }
        };
    }
    
	// 파일 다운로드
	function FileDownload(id) {

		if(id != null && id != undefined)
		{
			pageout = true;
			var link = '${pageContext.request.contextPath}/fileDownload.do?file_id=' + id;
			window.open(link, '_blank');		
			pageout = false;
		}
	}
	
	// 파일 업로더 열기
	function OpenFileUploader(subPath, callback) {
		if (jQuery('#iframe_file_uploader').length) {
			return;
		}
		g_openFileUploaderCallback = callback;
	
		var dhxWins = new dhtmlXWindows();
		g_currentWindow = dhxWins.createWindow('fileUploader', 400, 200, 290, 260);
		
		dhxWins.attachEvent("onClose", function(win){
			// code here
			return true;
		});

		if (subPath) {
			document.getElementById('file_upload_sub_category').value = subPath;
		} else {
			document.getElementById('file_upload_sub_category').value = 'WORKNET40';
		}
		
		var pos = getCenterOnScreen(290, 260);
		g_currentWindow.setPosition(pos[0], pos[1]);
		g_currentWindow.setModal(true);

		//wnd.setModal(true);
		g_currentWindow.button('minmax1').hide();
		g_currentWindow.button('minmax2').hide();
		g_currentWindow.button('park').hide();
		g_currentWindow.denyResize();
		g_currentWindow.denyMove();
		
		g_currentWindow.setText('파일업로드');
		
		var e = document.createElement('div');
		e.style.width = '290px';
		e.style.height = '220px';
		e.style.padding = '10px';			
		var frame = jQuery(e).append('<iframe id="iframe_file_uploader" name="report" width="290px" height="220px" scrolling="auto" frameBorder="0" style="overflow:hidden; z-Index:99999; position:absolute; left:0px; top:0px;" src="./common/fileUploader.jsp"></iframe>');
		g_currentWindow.attachObject(e);
	}
	
	// 엑셀 업로더 열기
	function OpenExcelUploader(callback) {
		if (jQuery('#iframe_file_uploader').length) {
			return;
		}
		g_openFileUploaderCallback = callback;
	
		var dhxWins = new dhtmlXWindows();
		g_currentWindow = dhxWins.createWindow('excelDataUploader', 400, 200, 290, 260);
		
		dhxWins.attachEvent("onClose", function(win){
			// code here
			return true;
		});

		/* if (subPath) {
			document.getElementById('file_upload_sub_category').value = subPath;
		} else {
			document.getElementById('file_upload_sub_category').value = 'WORKNET40';
		} */
		
		var pos = getCenterOnScreen(290, 260);
		g_currentWindow.setPosition(pos[0], pos[1]);
		g_currentWindow.setModal(true);

		//wnd.setModal(true);
		g_currentWindow.button('minmax1').hide();
		g_currentWindow.button('minmax2').hide();
		g_currentWindow.button('park').hide();
		g_currentWindow.denyResize();
		g_currentWindow.denyMove();
		
		g_currentWindow.setText('엑셀업로드');
		
		var e = document.createElement('div');
		e.style.width = '290px';
		e.style.height = '220px';
		e.style.padding = '10px';			
		var frame = jQuery(e).append('<iframe id="iframe_file_uploader" name="report" width="290px" height="220px" scrolling="auto" frameBorder="0" style="overflow:hidden; z-Index:99999; position:absolute; left:0px; top:0px;" src="./common/excelDataUploader.jsp"></iframe>');
		g_currentWindow.attachObject(e);
	}
	
	// PDF 업로더 열기
	function OpenPdfFileUploader(subPath, callback) {
		if (jQuery('#iframe_file_uploader').length) {
			return;
		}
		g_openFileUploaderCallback = callback;
	
		var dhxWins = new dhtmlXWindows();
		g_currentWindow = dhxWins.createWindow('pdfFileUploader', 400, 200, 290, 260);
		
		dhxWins.attachEvent("onClose", function(win){
			// code here
			return true;
		});

		if (subPath) {
			document.getElementById('file_upload_sub_category').value = subPath;
		} else {
			document.getElementById('file_upload_sub_category').value = 'WORKNET40';
		}
		
		var pos = getCenterOnScreen(290, 260);
		g_currentWindow.setPosition(pos[0], pos[1]);
		g_currentWindow.setModal(true);

		//wnd.setModal(true);
		g_currentWindow.button('minmax1').hide();
		g_currentWindow.button('minmax2').hide();
		g_currentWindow.button('park').hide();
		g_currentWindow.denyResize();
		g_currentWindow.denyMove();
		
		g_currentWindow.setText('파일업로드');
		
		var e = document.createElement('div');
		e.style.width = '290px';
		e.style.height = '220px';
		e.style.padding = '10px';			
		var frame = jQuery(e).append('<iframe id="iframe_file_uploader" name="report" width="290px" height="220px" scrolling="auto" frameBorder="0" style="overflow:hidden; z-Index:99999; position:absolute; left:0px; top:0px;" src="./common/pdfFileUploader.jsp"></iframe>');
		g_currentWindow.attachObject(e);
	}
    
    function closeCurrentWindow(result) {
        try
        {                        
            if (result.contentList != undefined)
                setTimeout(function() { g_currentWindow.close(); if (g_openDocUploaderCallback != null && g_openDocUploaderCallback != undefined) { g_openDocUploaderCallback(result); } }, 550); 
            else
                setTimeout(function() { g_currentWindow.close(); if (g_openFileUploaderCallback != null && g_openFileUploaderCallback != undefined) { g_openFileUploaderCallback(result); } }, 550);                      
        }
        catch (err)
        {
            alert(err.description);
        }
    }

    function onLogout() {
        g_main.logout();
    }

    function onEmpChange() {
        g_main.empChange();
    }
    
    function onToday() {
        g_main.today();
    }

    function onOpenModelDirect() {
        g_main.openModelDirect();
    }

    function openDevModel(modelValue, modelName) {
    	var devModel = document.getElementById('devModelName');
    	
    	if ((!devModel || !devModel.value) && !modelValue)
    		return;

    	if (modelValue) {
            g_main.setCurrentTabInfo(0, modelValue, modelName);     
            g_main.openModel(modelValue);
    	} else {
            g_main.setCurrentTabInfo(0, devModel.value, devModel.value);     
            g_main.openModel(devModel.value);
    	}
    }
    
    function onSearchModel(menu) {
    	if (menu && menu.form_id) {
            g_main.setCurrentTabInfo(menu.menu_id, menu.form_id, menu.menu_name, menu.help_yn, menu.help_doc_id);                
            g_main.openModel(menu.form_id, menu.menu_id);
    	} else {
    		console.log('onSearchModel : 해당 메뉴를 찾을 수 없습니다.');
    	}
    }
     
    function onClickModel(menu) {
    	var menu_id = menu.getAttribute('menu_id');
        var form_id = menu.getAttribute('form_id');
        var menu_name = menu.getAttribute('menu_name');
        var help_yn = menu.getAttribute('help_yn');
        var help_doc_id = menu.getAttribute('help_doc_id');
        var category = menu.getAttribute('category');
        if (category == 'WEB') {
        	var web_url = menu.getAttribute('web_file');
    		if (form_id == 'printer') {
    			// 네트워크프린터설치 페이지 (* 크롬에서 연결 불가로 인해 대체 메시지 출력)
    			alert('http://gw3misc/PG/selectlocation.aspx 해당 주소를 복사하여 Internet Explorer를 통해 접속해 주시기 바랍니다. (* Chrome 이용 불가)');
    		}
    		else if (web_url) {
        		if (form_id == 'SmartWorknet') {
            		if (web_url.indexOf('@smt_key@')) {
            			web_url = web_url.replace('@smt_key@', g_main.session.obj.SmartLoginKey);
            		}        			
        		}
        		// (190116, 김영도) 외부 링크 메뉴에 대해서도 접속 로그를 남김
        		if (window.sysMenuAccessLog && menu_id) {
        			// 메뉴 접속 로그
        			sysMenuAccessLog({'menuId':menu_id});
        		}
        		window.open(web_url);
        	};
        }
        else {
            g_main.setCurrentTabInfo(menu_id, form_id, menu_name, help_yn, help_doc_id);                
            g_main.openModel(form_id, menu_id);
        }
    }
    
    // 마이메뉴에서 모델 클릭
    function onClickMyMenuModel(menuid, webid, fileid, menuName) {
        
        g_main.setCurrentTabInfo(menuid, webid, menuName);               
        g_main.openModel(fileid);
    }

    // 마이 메뉴 설정 모드
    function onSetMyMenu() {
        // 설정 메뉴 숨기기
        var aSetMyMenu = document.getElementById('aSetMyMenu');
        aSetMyMenu.style.visibility = 'hidden';
        aSetMyMenu = null;
        
        var aCloseMyMenu = document.getElementById('aCloseMyMenu');
        aCloseMyMenu.style.visibility = 'visible';
        aCloseMyMenu = null;
    
        // mymenu 로 조회한 엘리먼트 리스트 검색
        var mymenuList = jQuery(".container_link_span");   
        
        for (var i = 0; i < mymenuList.length; ++i)
        {
            var menuid = mymenuList[i].getAttribute('menu_id');
            if (menuid != null) {
                document.getElementById(menuid + '_check').checked = true;
            }
        }            
        mymenuList = null;            
            
        // class 로 태그 찾기                           
        var elementList = jQuery(".container_checkMyMenu");        
        for (var i = 0; i < elementList.length; ++i) {
            elementList[i].setAttribute('type', 'checkbox');
        }

        elementList = null;
    }

    // 마이메뉴 닫기 클릭
    function onCloseMyMenu() {                     
        g_main.loadMyMenu();        
    }
    
    function onClickModelCheck(menu) {
        g_main.updateMyMenu(menu);        
    }
    
	function onPageUnload() {		
		if (!pageout && tabCount > 1) {
			return '사이트 이동을 하시겠습니까?';
		}
	}
	window.onbeforeunload = onPageUnload; 

    go();
</script>