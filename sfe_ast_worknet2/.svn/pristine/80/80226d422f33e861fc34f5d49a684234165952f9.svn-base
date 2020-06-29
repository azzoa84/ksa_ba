<!DOCTYPE html>
<html lang="ko">
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="net.sf.json.JSONSerializer"%>
<%@ page import="fingersales.common.util.Utility"%>
<head>
	<meta charset="UTF-8">
	<meta http-equiv="Expires" content="0">
	<meta http-equiv="Last-Modified" content="0">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate">
	<meta http-equiv="Pragma" content="no-cache">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="content-language" content="ko">
    <meta http-equiv="content-type" content="text/html; charset=euc-kr">
	<title></title>
	<link rel="stylesheet" type="text/css" href="./css/webfont/notosanskr.css" />
	<link rel="stylesheet" type="text/css" href="./dhtmlx/dhtmlx.css" />
	<link rel="stylesheet" type="text/css" href="./fingerPlatform/css/fontawesome-all.min.css" /> 
	<link rel="stylesheet" type="text/css" href="./fingerPlatform/css/style.css" /> 
	<link rel="stylesheet" type="text/css" href="./fingerPlatform/css/pagination.css" /> 
	<link rel="stylesheet" type="text/css" href="./fingerPlatform/css/jstree.css" />

	<!-- Webix Widget (CSS) -->
	<link rel="stylesheet" type="text/css" href="./fingerPlatform/library/webix/codebase/webix_custom.css" />
	<link rel="stylesheet" type="text/css" href="./fingerPlatform/css/webix.init.css" />
	
	<!-- Full Calendar (CSS) -->
	<link rel="stylesheet" type="text/css" href="./fingerPlatform/library/fullcalendar-2.9.1/fullcalendar.css" />
	
	<!-- (190419, 김영도추가) MultipleSelect (CSS) -->
	<link rel="stylesheet" type="text/css" href="./fingerPlatform/library/multipleselect/multiple-select.css" />	
	
	<!-- Custom Layout (CSS) -->
	<link rel="stylesheet" type="text/css" href="./fingerPlatform/css/customWfDocument.css" />

	<style type="text/css">
		.tblFileList
		{
			width:95%;
			height:180px;			
			border-top:1px solid #bbbbbb;
			padding:0px;
			overflow:auto;
		}
		
		.tblFileList tr td {
			font-family: "굴림";
			font-size: 12px;
			color: #666666;
			text-align: left;
			border-bottom:1px solid #bbbbbb;
			padding:5px;
		}
		
		table.t_ex2 {background:#ffffff; width:100%; margin:0 auto; text-align:right}
		.t_ex2 td, .t_ex2 th {border:1px solid #D0D0D0;padding:5px}
		.t_ex2 th {background:#C0C0C0; color:black; text-align:center}
		table.t_ex2 .c1 {text-align:center}
		table.t_ex2 .c2 {text-align:left} 
		
		a:link {text-decoration: none; color: #333333; cursor:pointer }
		a:visited {text-decoration: none; color: #333333; cursor:pointer }
		a:active {text-decoration: none; color: #333333; cursor:pointer }
		a:hover {text-decoration: underline; color: red; cursor:pointer }
	</style>
	<script>
		var g_ContextPath = "${pageContext.request.contextPath}";
		var g_mapkey = "8095ce48c876af0d2504aa1cd6382044";
		var g_kakaoMapKey = '<%=request.getSession().getAttribute("MapKey")%>';
		var g_tmapKey = "97346ada-4263-3b93-99f7-191124eabee8";
		
		var g_XLPath  = "${pageContext.request.contextPath}/sso/SWNAjaxXL.do";
		
		var pageout = false;
		var tabCount = 1;
		
		function pout() {		
			if (!pageout && tabCount > 1) {
							  
				return ' ';
			}
		}
		window.onbeforeunload = pout;   
	</script>
	
	<script src="./dhtmlx/dhtmlx.js"></script>
	<script src="./fingerPlatform/library/jquery.techbytarun.excelexportjs.js"></script>
	<script src="./fingerPlatform/library/jquery-1.10.2.min.js"></script>	
	<script src="./fingerPlatform/library/aes.js"></script>   
	<script src="./fingerPlatform/library/mode-cfb.js"></script>   
	<script src="./fingerPlatform/library/fastclick.js"></script>   
	<script src="./fingerPlatform/library/pad-ansix923.js"></script>   
	<script src="./fingerPlatform/library/autoNumeric-1.8.0.js"></script>	
	<script src="./fingerPlatform/library/jsr_class.js"></script>   
	<script src="./fingerPlatform/library/jquery.kinetic.js"></script>
	<script src="./fingerPlatform/library/swiper.js"></script>
	<script src="./fingerPlatform/library/multipleselect/multiple-select.js"></script>
	<script src="./fingerPlatform/common.js"></script>
	<script src="./fingerPlatform/commonQuery.js"></script>
	<script src="./fingerPlatform/dashboard.js"></script>
	<script src="./fingerPlatform/fingerMultiSelect.js"></script>
	<script src="./fingerPlatform/fingerMultipleSelect.js"></script>
	<script src="./fingerPlatform/fingerHost.js"></script>
	<script src="./fingerPlatform/fingerButton.js"></script>
	<script src="./fingerPlatform/fingerButtonEdit.js"></script>
	<script src="./fingerPlatform/fingerDataGrid.js"></script>
	<script src="./fingerPlatform/fingerLabel.js"></script>
	<script src="./fingerPlatform/fingerDateEdit.js"></script>
	<script src="./fingerPlatform/fingerEdit.js"></script>
	<script src="./fingerPlatform/fingerImage.js"></script>
	<script src="./fingerPlatform/fingerImageGroup.js"></script>
	<script src="./fingerPlatform/fingerAjax.js"></script>
	<script src="./fingerPlatform/fingerAjaxComm.js"></script>
	<script src="./fingerPlatform/fingerUtil.js"></script>
	<script src="./fingerPlatform/fingerPanel.js"></script>
	<script src="./fingerPlatform/fingerComboBox.js"></script>
	<script src="./fingerPlatform/fingerCheckBox.js"></script>
	<script src="./fingerPlatform/fingerTab.js"></script>
	<script src="./fingerPlatform/fingerContainerTab.js"></script>
	<script src="./fingerPlatform/fingerTree.js"></script>
	<script src="./fingerPlatform/fingerWindow.js"></script>
	<script src="./fingerPlatform/fingerPopupInit.js"></script>
	<script src="./fingerPlatform/fingerPopup.js"></script>
	<script src="./fingerPlatform/fingerPopup2.js"></script>
	<script src="./fingerPlatform/fingerPopupStack.js"></script>
	<script src="./fingerPlatform/fingerLayout.js"></script>
	<script src="./fingerPlatform/fingerMemoEdit.js"></script>
	<script src="./fingerPlatform/FingerSpinEdit.js"></script>
	<script src="./fingerPlatform/FingerLine.js"></script>
	<script src="./fingerPlatform/fingerNumberEdit.js"></script>
	<script src="./fingerPlatform/fingerWebEditor.js"></script>
	<script src="./fingerPlatform/fingerScheduler.init.js"></script>
	<script src="./fingerPlatform/fingerScheduler.js"></script>
	<script src="./fingerPlatform/fingerMultiScheduler.js"></script>
	<script src="./fingerPlatform/fingerPieChart.js"></script>
	<script src="./fingerPlatform/fingerBarChart.js"></script>
	<script src="./fingerPlatform/fingerLineChart.js"></script>
	<script src="./fingerPlatform/fingerReportView.js"></script>
	<script src="./fingerPlatform/fingerHTMLView.js"></script>	
	<script src="./fingerPlatform/fingerFileBrowser.js"></script>
	<script src="./fingerPlatform/fingerFilePanel.js"></script>
	<script src="./fingerPlatform/fingerScatterChart.js"></script>
	<script src="./fingerPlatform/fingerRadioBox.js"></script>
	<script src="./fingerPlatform/fingerIFrame.js"></script>
	<script src="./fingerPlatform/globalEvents.js"></script>
	<script src="./fingerPlatform/md5.js"></script>
	<script src="./fingerPlatform/pagination.js"></script>
	<script src="./fingerPlatform/papaparse.js"></script>
	<script src="./fingerPlatform/custom/customApprLine.js"></script>
	<script src="./fingerPlatform/custom/customStepLine.js"></script>
	<script src="./fingerPlatform/custom/customWfDocument.js"></script>
	<script src="./fingerPlatform/custom/customHome.js"></script>
	
	<!-- DSM Dashboard -->
	<script src="./fingerPlatform/custom/dsm/customDSMDashboard.js"></script>
	<script src="./fingerPlatform/custom/dsm/customDSMPlanProfit.js"></script>
	<script src="./fingerPlatform/custom/dsm/customDSMCallResult.js"></script>
	<script src="./fingerPlatform/custom/dsm/customDSMCallCoverage.js"></script>
	<script src="./fingerPlatform/custom/dsm/customDSMCallKSA.js"></script>
	<script src="./fingerPlatform/custom/dsm/customDSMCompanyCompare.js?"></script>
	<script src="./fingerPlatform/custom/dsm/customDSMBudget.js?"></script>
	<script src="./fingerPlatform/custom/dsm/customDSMDDD.js?"></script>
	
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
	<script src="./fingerPlatform/library/highcharts/common.js"></script>

	<!-- Webix Widget (Core) -->
	<script type="text/javascript" src="./fingerPlatform/library/webix/codebase/webix.js"></script>
	<script type="text/javascript" src="./fingerPlatform/library/webix/codebase/skin.js"></script>
	<script type="text/javascript" src="./fingerPlatform/library/webix/codebase/ko-kr.js"></script>
	<script src="./fingerPlatform/library/webix_ready.js"></script>

	<!-- naver smart editor -->
	<script type="text/javascript" src="./fingerPlatform/library/navereditor/js/HuskyEZCreator.js" charset="utf-8"></script>
	<link href="./fingerPlatform/library/navereditor/css/smart_editor2.css" rel="stylesheet" type="text/css"/>
	
	<!-- Kakao Map -->
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=<%= request.getSession().getAttribute("MapKey") %>&libraries=services,clusterer,drawing"></script>
	
	<script>
		var g_currentGrid = null;
		var g_main = null;
		var g_debug = true;
		var g_isFcs = true; 
		var g_fileBrowser = null;
		var g_printBrowser = null;
		var g_container = null;
		var g_currentModule = null;
		var g_popupStack = null;
		var g_encryption = 'N';
		var key = CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f');
		var iv = CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f');
		
		var g_AjaxPath  = "${pageContext.request.contextPath}/dev/SWNAjaxL.do";
		var g_webRoot = '${pageContext.request.contextPath}/';
		var g_scriptPath = './fingerPlatform';
		var g_dhtmlxRoot = '${pageContext.request.contextPath}/dhtmlx';
		
		function completePdfLoad() {
			g_currentModule.completePdfLoad();
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
		
		function Main() {
			var $ = this;
			$.childPages = new Object();
			$.panel = null;
			$.tab = null;
			$.logo = null;
			$.btnMenu1 = null;
			$.btnMenu2 = null;
			$.btnMenu3 = null;
			$.btnMenu4 = null;
			$.btnMenu5 = null;
			$.menuGrid = null;
			$.menuTree = null;
			$.menuData = null;

			$.currentTabID = null;
			$.currentTabName = null;
			$.currentTabMenuID = null;
			$.currentTabPage = null;

			$.session = new Session();
			$.session.userid = '<%=session.getAttribute("EmpCode")%>';
			$.session.username = '<%=session.getAttribute("EmpName")%>';

			<%
			Enumeration sessionAttrs = session.getAttributeNames();
			while (sessionAttrs.hasMoreElements()) {
				String sName = (String)sessionAttrs.nextElement();
				if (session.getAttribute(sName) instanceof String) {
					String sValue = (String)session.getAttribute(sName);
					out.println("$.session.setValue(" + "'" + sName + "', '" + sValue + "');");					
				}
			};
			%>

			$.debug = '';
			$.msgShare = null;
			$.argShare = null;

			// myMenu map 생성
			$.myMenuData = new Object();
			// 모든 메뉴의 폼 아이디, 마이메뉴 여부를 map으로 등록한다.
			$.menuMap = new Object();

			$.init = function() {
				//g_container = this;
			};

			$.start = function() {

			};
			
			$.callback = function(type, ds, text) {
				if (type == 'myMenu') {
					ds = JSON.parse(text);
				
					var mainMenu = document.getElementById('myMenu');
					while (mainMenu.hasChildNodes()) {
						mainMenu.removeChild(mainMenu.lastChild);
					}				 
					
					var menuInfo = null;
					for (var i in ds.T[0].R) {
						menuInfo = $.menuMap[ds.T[0].R[i].I[0]];
						
						if (menuInfo != null &&
							menuInfo != undefined) {
						
							var div = document.createElement('div');
							div.className = 'container_link_div';
						
							var e = document.createElement('a');
							e.setAttribute('menu_id', menuInfo.menuID);
							e.setAttribute('form_id', menuInfo.formID);
							e.setAttribute('file_id', menuInfo.assemblyFile);
							
							var viewModel = {
								handleEvent: function() {
									onClickMyMenuModel(this.menuid, this.formid, this.fileid, this.menuname);
								},
								
								menuid: menuInfo.menuID,
								formid: menuInfo.formID,
								fileid: menuInfo.assemblyFile,
								menuname: menuInfo.menuName
							};
							
							e.addEventListener("click", viewModel, false);																		
							e.style.paddingRight= '20px';
							e.className = 'container_link';
							e.innerHTML = menuInfo.menuName;
							e.style.cursor = 'pointer';
							e.style.float = 'left';
							
							div.appendChild(e);
							
							mainMenu.appendChild(div);						  
							//jQuery(e).click(function() { alert('test') });
						}									 
					}
					menuInfo = null;								
					mainMenu = null;							   
				}							   
			};
			
			$.openPopupQ = function(id, param) {
			};
			
			$.openPopup = function(file, id, title, width, height, controlText, header, argument, procedureName, paramInfo) {
				var popOpt = (fingerPopupOptions[id] ? fingerPopupOptions[id] : {'title':title, 'width':width, 'height':height});
				
				// fingerPopup 생성
				var fpView = document.getElementById('fpView');
				var popup = new FingerPopup(fpView, id, 0, 0, popOpt.width, popOpt.height, controlText, header, argument, procedureName, paramInfo);
				popup.setText(popOpt.title);
				g_popupStack.push(id, popup);
				
				document.getElementById('popupFrame').src = './model/' + file;			   
			};
			
			$.loadPopup = function() {
				var viewModel = null;

				try {
					if (document.getElementById('popupFrame').contentWindow.Main != null) {
						viewModel = eval('new ' + document.getElementById('popupFrame').contentWindow.Main.toString() + '();');
						var popup = g_popupStack.get();
						popup.openModel(viewModel);						
					}
				}				   
				catch (err) {
					alert(err);
				}
				finally {
					viewModel = null;
				}				
			};
			
			// Home 화면 로드
			$.loadHome = function() {			
				var viewModel = null;

				try {				
					if (document.getElementById('homeFrame').contentWindow.Main == null)
						return;
				
					viewModel = eval('new ' + document.getElementById('homeFrame').contentWindow.Main.toString() + '();');				   
				  
					var tabpage = $.tab.addTab('home', 'HOME');

					$.currentTabPage = document.getElementById(tabpage.id);

					viewModel.init($.currentTabPage);
					viewModel.start();	   

					if (viewModel.update != undefined) 
						viewModel.update();			 
					
					g_currentModule = viewModel;
					g_currentModule.tabid = tabpage.tabid;
					
					$.tab.extObj.setTabActive(tabpage.tabid);						
				}
				catch (err) {
					alert(err);
				}
				finally {
					viewModel = null;
				}		   
			};
			
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
			
	        // 비지니스에서 webid를 지정해 오픈
	        $.openModelWithBusiness = function(webid, args) {
	            // webdev.jsp 에서는 사용할 수 없음
	            console.log('openModelWithBusiness() 는 다른 화면으로 이동하는 함수이므로 FCS 툴에서는 사용할 수 없습니다.');
	            console.log('웹브라우저에서 확인해 주세요.');
	        };
		}
		
	</script>
</head>
<body>
	<input type="hidden" name="compid" value="worknet40">
	<input type="hidden" name="file_upload_sub_category" id="file_upload_sub_category" value="">
	
	<div id="fpView" style="float:left; width:870px; height:710px; background-color:White;">				
	</div>	
	<span id="ruler" style="visibility: hidden; white-space: nowrap;"></span>
	<iframe id="homeFrame" width="0" height="0" style="background-color:Blue; display:none" onload="if (g_main != undefined) g_main.loadHome();"></iframe>		
	<iframe id="popupFrame" width="0" height="0" style="background-color:Blue; display:none" onload="if (g_main != undefined) g_main.loadPopup();"></iframe>
</body>
</html>
<script>
	window.viewModel = null;

	// 파일 다운로드
	function FileDownload(id) {

		if(id != null && id != undefined)
		{
			var link = 'fileDownload.aspx?file_id=' + id;
			window.location = link; 
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
	
	function setConsole(cs) {
		window.console = cs;
	};
	
	function createObject(script) {
		console.log('해당 기능은 FCS 툴에서 기능이 제한되므로 웹브라우저에서 확인하여 주시기 바랍니다. [ 리포트출력 ]');
		console.log('------------------------------------------------------------------------------------------------');
		
		var fpView = document.getElementById('fpView');
		viewModel = eval(script);
		g_currentModule = viewModel;
		
		viewModel.init(fpView);
		viewModel.start();
	}

	function executeScript(script) {
		viewModel.executeScript(script);
	}

	function getRectangle(script) {
		var c = eval('viewModel.' + script + ';');

		if (c != null && c != undefined) {
			return c.x + ',' + c.y + ',' + c.width + ',' + c.height;
		}
		else {
			return null;
		}
	}

	function getParentObjectName(script) {
		var c = eval('viewModel.' + script + ';');

		if (c != null && c != undefined) {
			var e = document.getElementById(c.id);
			if (e != null) {
				if (e.parentNode != null &&
				e.parentNode != undefined) {
					alert(e.parentNode.id);
					return e.parentNode.id;
				}
			}
		}

		return null;
	}

	function getType(script) {
		var c = eval('viewModel.' + script + ';');

		if (c != null &&
			c != undefined &&
			c.getType != undefined) {
			return c.getType();
		}
		else {
			return null;
		}
	}

	function getPattern(script) {
		var c = eval('viewModel.' + script + ';');

		if (c != null &&
			c != undefined) {
			return c.type;
		}
		else {
			return null;
		}
	}

	function getObjectId(id) {
		var o = eval('viewModel.' + id);
		return o.id;
	}

	function test() {
		alert("ok");
	}

	go();
</script>
