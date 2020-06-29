<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" >
<%@ page import="java.io.*"%>
<%@ page import="java.util.*"%>
<%@ page import="net.sf.json.JSONSerializer"%>
<%@ page import="fingersales.common.util.Utility"%>
<%@ page import="fingersales.common.service.ServiceMap"%>
<%@ page import="fingersales.common.util.FingerParamMap"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ncid"><%= 201706202 %></c:set>
<head>
	<meta charset="UTF-8">
	<meta http-equiv="Expires" content="0">
	<meta http-equiv="Last-Modified" content="0">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate">
	<meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<meta name="viewport" content="width=1280">
	<title>Astellas Worknet4.0</title>
	<link href="${pageContext.request.contextPath}/img/favicon.ico" rel="shortcut icon" type="image/ico">
	<link rel="stylesheet" type="text/css" href="./css/webfont/nanumgothic.css" />
	<link rel="stylesheet" type="text/css" href='${pageContext.request.contextPath}/dhtmlx/dhtmlx.css' />
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
	
	<!-- Stimul Report (CSS) -->
	<link rel="stylesheet" type="text/css" href="./fingerPlatform/library/stimulreport/stimulsoft.viewer.office2013.whiteblue.css" />	
	
	<!-- Custom Layout (CSS) -->
	<link rel="stylesheet" type="text/css" href="./fingerPlatform/css/customWfDocument.css?v=${ncid}" />
	
	<script>
		var favCheckList = [];
		var g_ContextPath = "${pageContext.request.contextPath}";
		var g_mapkey = '<%=request.getSession().getAttribute("mapkey")%>';
		var g_XLPath  = "${pageContext.request.contextPath}/sso/SWNAjaxXL.do";
	</script>
	<script src='./dhtmlx/dhtmlx.js'></script>
	
	<script src="./fingerPlatform/library/jquery.techbytarun.excelexportjs.js"></script>
	<script src="./fingerPlatform/library/jquery-1.10.2.min.js"></script>
	<script src="./fingerPlatform/library/aes.js"></script>   
	<script src="./fingerPlatform/library/mode-cfb.js"></script>   
	<script src="./fingerPlatform/library/fastclick.js"></script>   
	<script src="./fingerPlatform/library/pad-ansix923.js"></script>   
	<script src="./fingerPlatform/library/autoNumeric-1.8.0.js"></script>    
	<script src="./fingerPlatform/library/jsr_class.js"></script>
	<script src="./fingerPlatform/library/swiper.js"></script>
	<script src="./fingerPlatform/library/papaparse.js"></script>
	<script src="./fingerPlatform/common.js?v=${ncid}"></script>
	<script src="./fingerPlatform/commonQuery.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerMultiSelect.js?v=${ncid}"></script>
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
	<script src="./fingerPlatform/fingerHomePanel.js?v=${ncid}"></script>
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
	<script src="./fingerPlatform/fingerPieChart.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerBarChart.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerLineChart.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerReportView.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerHTMLView.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerFileBrowser.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerFilePanel.js?v=${ncid}"></script>
	<script src="./fingerPlatform/fingerRadioBox.js?v=${ncid}"></script>
	<script src="./fingerPlatform/md5.js?v=${ncid}"></script>
	<script src="./fingerPlatform/pagination.js?v=${ncid}"></script>
	<script src="./fingerPlatform/menu.js?v=${ncid}"></script>
	<script src="./fingerPlatform/custom/customApprLine.js?v=${ncid}"></script>
	<script src="./fingerPlatform/custom/customStepLine.js?v=${ncid}"></script>
	<script src="./fingerPlatform/custom/customWfDocument.js?v=${ncid}"></script>
	
	<!-- JS Tree library -->
	<script src="./fingerPlatform/library/jstree.min.js"></script>
	
	<!-- Full Calendar library -->
	<script src="./fingerPlatform/library/fullcalendar-2.9.1/moment.min.js"></script>
	<script src="./fingerPlatform/library/fullcalendar-2.9.1/fullcalendar.min.js"></script>
	<script src='./fingerPlatform/library/fullcalendar-2.9.1/lang/ko.js'></script>
	
	<!-- highcharts library -->
	<script src="./fingerPlatform/library/highcharts/highcharts.js"></script>
	<script src="./fingerPlatform/library/highcharts/modules/exporting.js"></script>
	<script src="./fingerPlatform/library/highcharts/common.js"></script>
	
	<!-- Webix Widget (Core) -->
	<script type="text/javascript" src="./fingerPlatform/library/webix/codebase/webix.js"></script>
	<script type="text/javascript" src="./fingerPlatform/library/webix/codebase/skin.js"></script>
	<script type="text/javascript" src="./fingerPlatform/library/webix/codebase/ko-kr.js"></script>
	<script src="./fingerPlatform/library/webix_ready.js"></script>
	
	<!-- Stimul Report -->
	<script type="text/javascript" src="./fingerPlatform/library/stimulreport/stimulsoft.reports.pack.js"></script>
	<script type="text/javascript" src="./fingerPlatform/library/stimulreport/stimulsoft.viewer.pack.js"></script>	
	
	<!-- naver smart editor -->
	<script type="text/javascript" src="./fingerPlatform/library/navereditor/js/HuskyEZCreator.js" charset="utf-8"></script>
	<link href="./fingerPlatform/library/navereditor/css/smart_editor2.css" rel="stylesheet" type="text/css"/>
	
	<!-- Select2 Plugin -->
	<script type="text/javascript" src="./fingerPlatform/library/select2/select2.full.min.js"></script>
	<link rel="stylesheet" type="text/css" href="./fingerPlatform/library/select2/select2.min.css" />
	 
	<script type="text/javascript" language="javascript">
		$(document).ready(function() {
			$.ajaxSetup({ cache: false });
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
	</script>	
</head>
<body>
<div class="wrapper">
	<header class="header">
		<div class="inner clearfix">
			<h1 id="logo"><a href="#" onclick="g_main.setHomeTab();"><img src="./fingerPlatform/images/logo.png" alt="astellas"></a></h1>
			<div class="util">		
				<div class="total-search">
					<input id="devModelName" type="text" onkeypress="if (event.keyCode == '13') openDevModel();" class="input-search" placeholder="메뉴검색" />
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
			<ul id="menuContainer" class="menuContainer">
				<li><a href="#"><span data-hover="커뮤니티">커뮤니티</span></a>
					<ul>
						<li><a href="#" onclick="openDevModel('crmDeptEmpView', '부서소개');">부서소개</a></li>
						<li><a href="#" onclick="openDevModel('crmEmployeeManage', '사원정보');">사원정보</a></li>
						<li><a href="#" onclick="openDevModel('crmComCalendar', '연간일정');">연간일정</a></li>
						<li><a href="#" onclick="openDevModel('crmExecutiveMeeting', '간부회의록');">간부회의록</a></li>
						<li><a href="#" onclick="openDevModel('crmConfReport', '회의보고관리');">회의보고관리</a></li>
						<li><a href="#" onclick="openDevModel('crmResourceReserve', '회의실예약/관리');">회의실예약/관리</a></li>
					</ul>
				</li>
				<li><a href="#"><span data-hover="기안">기안</span></a>
					<ul>
						<li class="sub-cate"><a href="#">일반</a>
							<ul>
								<li><a href="#" onclick="openDevModel('crmWFInvoice', 'Invoice 발행');">Invoice 발행</a></li>
								<li><a href="#" onclick="openDevModel('crmInvoiceReport', 'Invoice 발행내역 조회');">Invoice 발행내역 조회</a></li>
								<li><a href="#" onclick="openDevModel('crmWFSickLeave', '병가신청서');">병가신청서</a></li>
								<li><a href="#" onclick="openDevModel('crmWFVacationReq', '휴가신청서');">휴가신청서</a></li>
								<li><a href="#" onclick="openDevModel('crmWFRecruitReq', '채용공고신청서');">채용공고신청서</a></li>
								<li><a href="#" onclick="openDevModel('crmWFGoAboard', '해외출장/연수신청서');">해외출장/연수신청서</a></li>
								<li><a href="#" onclick="openDevModel('crmWFCardRental', '법인카드 관리신청서');">법인카드 관리신청서</a></li>
								<li><a href="#" onclick="openDevModel('hriCertiApplication', '재직증명_원천징수영수증 신청서');">재직증명_원천징수영수증 신청서</a></li>
								<li><a href="#" onclick="openDevModel('crmWFEduReq', '교육(연수) 신청서');">교육(연수) 신청서</a></li>
								<li><a href="#" onclick="openDevModel('crmWFEduExpense', '자기개발 연수비 신청서');">자기개발 연수비 신청서</a></li>
								<li><a href="#" onclick="openDevModel('crmWFExternalActReq', '국내출장 및 워크샵 신청서');">국내출장 및 워크샵 신청서</a></li>
								<li><a href="#" onclick="openDevModel('crmWFGeneralNew', '자유기안');">자유기안</a></li>
								<li><a href="#" onclick="openDevModel('crmWFLeaveOfAbsence', '휴직신청서');">휴직신청서</a></li>
								<li><a href="#" onclick="openDevModel('crmWFCutWorkTimeReq', '육아기단축근로신청서');">육아기단축근로신청서</a></li>
								<li><a href="#" onclick="openDevModel('crmWFShortenWorkReq', '임신 초기_후기 단축근무신청서');">임신 초기_후기 단축근무신청서</a></li>
								<li><a href="#" onclick="openDevModel('crmWFVaryTimeWorkReq', '시차출근제');">시차출근제</a></li>
								<li><a href="#" onclick="openDevModel('crmWFVacationEvent', '대체휴가');">대체휴가</a></li>
								<li><a href="#" onclick="openDevModel('crmWFFinanceRequest', '재무회계부협조요청신청서');">재무회계부협조요청신청서</a></li>
								<li><a href="#" onclick="openDevModel('crmWFBgtCPcorrect', '예산.CP 오류기안 정정신청서');">예산.CP 오류기안 정정신청서</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">일반2</a>
							<ul>
								<li><a href="#" onclick="openDevModel('crmCarryPcVerify', '업무용PC소지여부확인서');">업무용PC소지여부확인서</a></li>
								<li><a href="#" onclick="openDevModel('crmWFChangeMargin', '도매마진 변경 기안');">도매마진 변경 기안</a></li>
								<li><a href="#" onclick="openDevModel('crmWFSystemCheck', '시스템점검확인서');">시스템점검확인서</a></li>
								<li><a href="#" onclick="openDevModel('crmPrintAllSlip', '일괄증빙출력');">일괄증빙출력</a></li>
								<li><a href="#" onclick="openDevModel('crmPrintSlipReport', '일괄증빙출력_리포트');">일괄증빙출력_리포트</a></li>
								<li><a href="#" onclick="openDevModel('crmWFAtEventOrder', '행사참석계획_및_승인서');">행사참석계획_및_승인서</a></li>
								<li><a href="#" onclick="openDevModel('crmWFCarryOutPcReq', 'PC외부반출승인요청서');">PC외부반출승인요청서</a></li>
								<li><a href="#" onclick="openDevModel('crmWFOverTimeOrder', '초과(휴일) 근무계획 및 승인서');">초과(휴일) 근무계획 및 승인서</a></li>
								<li><a href="#" onclick="openDevModel('crmWFGiftCard', '상품권구매 사전승인서');">상품권구매 사전승인서</a></li>
								<li><a href="#" onclick="openDevModel('crmWFPaidHolidayPlan', '연차휴가 사용계획서');">연차휴가 사용계획서</a></li>
								<li><a href="#" onclick="openDevModel('crmWFSystemRequest', '시스템업무협조');">시스템업무협조</a></li>
								<li><a href="#" onclick="openDevModel('crmWFVehicleLog', '차량운행기록표');">차량운행기록표</a></li>
								<li><a href="#" onclick="openDevModel('crmWFALBudgetUseReq', 'ActionLearning 비용신청서');">ActionLearning 비용신청서</a></li>
								<li><a href="#" onclick="openDevModel('crmWFPromoItemReq', '구매신청서');">구매신청서</a></li>
								<li><a href="#" onclick="openDevModel('crmPromoItemManage', '판촉물관리');">판촉물관리</a></li>
								<li><a href="#" onclick="openDevModel('crmPromoItemInOut', '판촉물입출고');">판촉물입출고</a></li>
								<li><a href="#" onclick="openDevModel('crmPromoItemMaster', '판촉/인쇄물 관리 ');">판촉/인쇄물 관리</a></li>
								<li><a href="#" onclick="openDevModel('crmWFCPModifyReq', 'CP입력오류 수정신청서');">CP입력오류 수정신청서</a></li>
								<li><a href="#" onclick="openDevModel('crmArbitrary', '대결자지정');">대결자지정</a></li>
								<li><a href="#" onclick="openDevModel('crmPassWord', '결재비밀번호설정');">결재비밀번호설정</a></li>
							</ul>
						</li>		
						<li class="sub-cate"><a href="#">샘플</a>
							<ul>
								<li><a href="#" onclick="openDevModel('crmWFSampleOut', '샘플신청');">샘플신청</a></li>
								<li><a href="#" onclick="openDevModel('crmRegStudy', '임상 연구 관리');">임상 연구 관리</a></li>
								<li><a href="#" onclick="openDevModel('crmYoyang', '요양기관기호변경');">요양기관기호변경</a></li>
								<li><a href="#" onclick="openDevModel('crmSampleOutFI', '샘플회계처리');">샘플회계처리</a></li>
								<li><a href="#" onclick="openDevModel('crmDeliveryForm', '샘플인수증');">샘플인수증</a></li>
								<li><a href="#" onclick="openDevModel('crmSampleOutApp', '샘플신청승인');">샘플신청승인</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">판촉</a>
							<ul>
								<li><a href="#" onclick="openDevModel('crmWFPromoItem', '판촉용품신청');">판촉용품신청</a></li>
							</ul>
						</li>
						<li><a href="#" onclick="openDevModel('crmWFRequest', '엽무협조');">업무협조</a></li>				
						<li><a href="#" onclick="openDevModel('crmWFGeneralProc', '결재함/기안함');">결재함/기안함</a></li>
						<li><a href="#" onclick="openDevModel('crmWFDocSearch', '기결문서조회');">기결문서조회</a></li>
					</ul>
				</li>
				<li><a href="#"><span data-hover="CP">CP</span></a>
					<ul>
						<li><a href="#" onclick="openDevModel('crmCPMaster', 'CP관리');">CP관리</a></li>
						<li><a href="#" onclick="openDevModel('crmCommunicationProc', 'Communication Process');">Communication Process</a></li>
						<li><a href="#" onclick="openDevModel('crmCPContactManage', 'CP기타고객등록/승인');">CP기타고객등록/승인</a></li>
						<li class="sub-cate"><a href="#">제품디테일링</a>
							<ul>
								<li><a href="#" onclick="openDevModel('crmCPDetailAfter', '제품디테일링(사후)');">제품디테일링(사후)</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">자사제품설명회</a>
							<ul>
								<li><a href="#" onclick="openDevModel('crmCPSeminaBefore', '자사제품설명회(사전)');">자사제품설명회(사전)</a></li>
								<li><a href="#" onclick="openDevModel('crmCPSeminarAfter', '자사제품설명회(사후)');">자사제품설명회(사후)</a></li>
								<li><a href="#" onclick="openDevModel('crmCPSeminarStayBf', '자사제품설명회 숙박(사전)');">자사제품설명회 숙박(사전)</a></li>
								<li><a href="#" onclick="openDevModel('crmCPSeminarStayAf', '자사제품설명회 숙박(사후)');">자사제품설명회 숙박(사후)</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">대외활동</a>
							<ul>
								<li><a href="#" onclick="openDevModel('crmCPExternalAct', '대외활동(CP)');">대외활동(CP)</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">전시광고</a>
							<ul>
								<li><a href="#" onclick="openDevModel('crmCPDPADAfter', '전시/광고(사후)');">전시/광고(사후)</a></li>
								<li><a href="#" onclick="openDevModel('crmCPDPADRep', '전시/광고 신고서');">전시/광고 신고서</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">강연ㆍ자문</a>
							<ul>
								<li><a href="#" onclick="openDevModel('crmCPLectureBefore', '강연(사전)');">강연(사전)</a></li>
								<li><a href="#" onclick="openDevModel('crmCPLecture', '강연(사후)');">강연(사후)</a></li>
								<li><a href="#" onclick="openDevModel('crmCPAdviceBefore', '자문(사전)');">자문(사전)</a></li>
								<li><a href="#" onclick="openDevModel('crmCPAdvice', '자문(사후)');">자문(사후)</a></li>
								<li><a href="#" onclick="openDevModel('crmCPAbroadSpeaker', '국내연자 해외초청');">국내연자 해외초청</a></li>
								<li><a href="#" onclick="openDevModel('crmCPForeignerSpeaker', '해외연자 국내초청');">해외연자 국내초청</a></li>
								<li><a href="#" onclick="openDevModel('crmCPClinicalTrial', '임상 강연/자문');">임상 강연/자문</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">시장조사</a>
							<ul>
								<li><a href="#" onclick="openDevModel('crmCPResearchBefore', '시장조사(사전)');">시장조사(사전)</a></li>
								<li><a href="#" onclick="openDevModel('crmCPResearchAfter', '시장조사(사후)');">시장조사(사후)</a></li>
								<li><a href="#" onclick="openDevModel('crmCPResearchRep', '시장조사 신고서');">시장조사 신고서</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">기부</a>
							<ul>
								<li><a href="#" onclick="openDevModel('crmCPDonationBefore', '기부대상선정(사전)');">기부대상선정(사전)</a></li>
								<li><a href="#" onclick="openDevModel('crmCPDonationAfter', '기부집행내역(사후)');">기부집행내역(사후)</a></li>
								<li><a href="#" onclick="openDevModel('crmCPSupportApp', '자선목적 의약품지원(사전)');">자선목적 의약품지원(사전)</a></li>
								<li><a href="#" onclick="openDevModel('crmCPSupportAppAfter', '자선목적 의약품지원(사후)');">자선목적 의약품지원(사후)</a></li>							
							</ul>
						</li>
						<li class="sub-cate"><a href="#">기업홍보</a>
							<ul>
								<li><a href="#" onclick="openDevModel('crmCPPromoteBefore', '기업홍보(사전)');">기업홍보(사전)</a></li>
								<li><a href="#" onclick="openDevModel('crmCPPromoteAfter', '기업홍보(사후)');">기업홍보(사후)</a></li>							
							</ul>
						</li>
						<li class="sub-cate"><a href="#">학술대회</a>
							<ul>
								<li><a href="#" onclick="openDevModel('crmCPSymposiumBefore', '학술대회개최,운영지원(사전)');">학술대회개최,운영지원(사전)</a></li>
								<li><a href="#" onclick="openDevModel('crmCPSymposiumAfter', '학술대회개최,운영지원(사후)');">학술대회개최,운영지원(사후)</a></li>
								<li><a href="#" onclick="openDevModel('crmCPInterSympBefore', '국제학술대회개최,운영지원(사전)');">국제학술대회개최,운영지원(사전)</a></li>
								<li><a href="#" onclick="openDevModel('crmCPInterSympAfter', '국제학술대회개최,운영지원(사후)');">국제학술대회개최,운영지원(사후)</a></li>
								<li><a href="#" onclick="openDevModel('crmCPSympAttendBef', '국내외학술대회 참가지원(사전)');">학술대회 참가지원(사전)</a></li>
								<li><a href="#" onclick="openDevModel('crmCPSympAttendAft', '국내외학술대회 참가지원(사후)');">학술대회 참가지원(사후)</a></li>
								
							</ul>
						</li>
						<li class="sub-cate"><a href="#">3rd Party Management</a>
							<ul>
								<li><a href="#" onclick="openDevModel('crmCPCoPromo', 'Co-promotion/CSO');">Co-promotion/CSO</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">Compliance</a>
							<ul>
								<li><a href="#" onclick="openDevModel('MOR1000', '윤리강령 관리');">윤리강령 관리</a></li>
								<li><a href="#" onclick="openDevModel('MOR2000', '윤리강령 권한그룹관리');">윤리강령 권한그룹관리</a></li>
								<li><a href="#" onclick="openDevModel('MOR3000', '윤리강령 개인권한관리');">윤리강령 개인권한관리</a></li>
							</ul>
						</li>
						<li><a href="#" onclick="openDevModel('crmCPAuditDetail', 'Audit-CP디테일링사후');">Audit-CP디테일링사후</a></li>
						<li><a href="#" onclick="openDevModel('crmCPReport', 'CP레포트');">CP레포트</a></li>
					</ul>
				</li>
				<li><a href="#"><span data-hover="예산">예산</span></a>
					<ul>
						<li class="sub-cate"><a href="#">예산배정</a>
							<ul>
								<li><a href="#" onclick="openDevModel('crmWFBgtAssignNew', '예산배정등록');">예산배정등록</a></li>
								<li><a href="#" onclick="openDevModel('crmBgtAssignClose', '전사배정승인');">전사배정승인</a></li>
								<li><a href="#" onclick="openDevModel('crmWFBgtAssignChg_20', '배정변경(전용)');">배정변경(전용)</a></li>
								<li><a href="#" onclick="openDevModel('crmWFBgtAssignChg_30', '배정변경(공유)');">배정변경(공유)</a></li>
								<li><a href="#" onclick="openDevModel('crmWFBgtAssignChg_40', '배정변경(추가)');">배정변경(추가)</a></li>
								<li><a href="#" onclick="openDevModel('crmWFBgtAssignChg_50', '배정변경(변경)');">배정변경(변경)</a></li>
								<li><a href="#" onclick="openDevModel('crmBgtAssign30Cancel', '공유해지');">공유해지</a></li>
								<li><a href="#" onclick="openDevModel('crmBudgetForecast', '예산중간예측');">예산중간예측</a></li>
								<li><a href="#" onclick="openDevModel('crmBgtForecastReport', '예산중간예측 조회');">예산중간예측 조회</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">예산계획</a>
							<ul>
								<li><a href="#" onclick="openDevModel('crmWFBgtPlanCom', '사전계획[일반]');">사전계획[일반]</a></li>
								<li><a href="#" onclick="openDevModel('crmWFBgtPlanHalf', '사전계획[반기]');">사전계획[반기]</a></li>
								<li><a href="#" onclick="openDevModel('crmWFBgtPlanPre', '가불신청');">가불신청</a></li>
								<li><a href="#" onclick="openDevModel('crmWFBgtDeptHalfPlan', '반기예산기안');">반기예산기안</a></li>
								<li><a href="#" onclick="openDevModel('crmWFBgtPlanCancel', '계획취소/변경');">계획취소/변경</a></li>
								<li><a href="#" onclick="openDevModel('crmBudgetTransfer', '예산인수인계');">예산인수인계</a></li>
							</ul>
						</li>		
						<li class="sub-cate"><a href="#">예산사용</a>
							<ul>
							 	<li><a href="#" onclick="openDevModel('crmWFBgtUseCom', '사전(일반)정리');">사전(일반)정리</a></li>
								<li><a href="#" onclick="openDevModel('crmWFBgtUseHalf', '사전(반기)정리');">사전(반기)정리</a></li>
								<li><a href="#" onclick="openDevModel('crmWFBgtUsePre', '가불정리');">가불정리</a></li>
								<li><a href="#" onclick="openDevModel('crmWFBgtAft', '사후정리');">사후정리</a></li>
								<li><a href="#" onclick="openDevModel('crmWFBgtUseIn', '시내출장비');">시내출장비</a></li>
								<li><a href="#" onclick="openDevModel('crmWFBgtUseOut', '시외출장비');">시외출장비</a></li>
								<li><a href="#" onclick="openDevModel('crmWFBgtUseFor', '해외출장비');">해외출장비</a></li>
								<li><a href="#" onclick="openDevModel('crmBCARDMAS_pan', '개인정산처리');">개인정산처리</a></li>
								<li><a href="#" onclick="openDevModel('crmBCARDMAS', '영수증전달');">영수증전달</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">예산조회</a>
							<ul>
								<li><a href="#" onclick="openDevModel('crmBudgetPlanReport', '예산계획조회');">예산계획조회</a></li>
								<li><a href="#" onclick="openDevModel('crmBudgetAdvance', '가불조회');">가불조회</a></li>
								<li><a href="#" onclick="openDevModel('crmBudgetUseReport', '예산사용조회');">예산사용조회</a></li>
								<li><a href="#" onclick="openDevModel('crmBudgetMonitoring', 'MD예산 사용현황(영업소별)');">MD예산 사용현황(영업소별)</a></li>
								<li><a href="#" onclick="openDevModel('crmBudgetMonitoring2', 'MD예산 사용현황(영업부별)');">MD예산 사용현황(영업부별)</a></li>
								<li><a href="#" onclick="openDevModel('crmBudgetSalesReport', '예산사용조회(영업본부)');">예산사용조회(영업본부)</a></li>
								<li><a href="#" onclick="openDevModel('crmBudgetMAReport', '예산사용조회(MA)');">예산사용조회(MA)</a></li>
								<li><a href="#" onclick="openDevModel('crmBudgetMonthReport', '월별 예산사용실적');">월별 예산사용실적</a></li>
								<li><a href="#" onclick="openDevModel('crmBgtAssignHistory', '예산전용조회');">예산전용조회</a></li>
								<li><a href="#" onclick="openDevModel('crmCardMaster', '법인카드관리');">법인카드관리</a></li>
								<li><a href="#" onclick="openDevModel('crmBCARDMASmain', '법인카드사용조회');">법인카드사용조회</a></li>
								<li><a href="#" onclick="openDevModel('crmCardPaymentReport', '법인카드지급내역 조회');">법인카드지급내역 조회</a></li>
								<li><a href="#" onclick="openDevModel('crmBankStatementRedo', '법인계좌 입출금내역 조회');">법인계좌 입출금내역 조회</a></li>
								<li><a href="#" onclick="openDevModel('crmCardAcquire', '환차손익조회');">환차손익조회</a></li>
								<li><a href="#" onclick="openDevModel('crmEISCash', 'EIS 예상 Cash 잔액');">EIS 예상 Cash 잔액</a></li>
								<li><a href="#" onclick="openDevModel('crmUCOAReport', 'U-CoA 예산사용조회');">U-CoA 예산사용조회</a></li>
							</ul>
						</li>					
					</ul>
				</li>
				<li><a href="#"><span data-hover="영업현황">영업현황</span></a>
					<ul>
						<li class="sub-cate"><a href="#">고객분류</a>
							<ul>
 								<li><a href="#" onclick="openDevModel('crmContactLevelCube', '고객분류기준');">고객분류기준</a></li>
 								<li><a href="#" onclick="openDevModel('crmContactLevelMake', '고객분류작업');">고객분류작업</a></li>
 								<li><a href="#" onclick="openDevModel('crmContactLevelFx', '고객분류조정및승인');">고객분류조정및승인</a></li>
 							</ul>
 						</li>
						<li class="sub-cate"><a href="#">소화실적</a>
							<ul>
								<li><a href="#" onclick="openDevModel('crmResultMain2', '소화실적(기본)');">소화실적(기본)</a></li>
 								<li><a href="#" onclick="openDevModel('crmResultDetail2', '소화실적(상세)');">소화실적(상세)</a></li>
 								<li><a href="#" onclick="openDevModel('crmNewClinicCompany', '신규거래처/하루날+베시케어 조회');">신규거래처/하루날+베시케어 조회</a></li>
 								<li><a href="#" onclick="openDevModel('crmShoukaMonth07', '소화자료(기타)');">소화자료(기타)</a></li>
 								<li><a href="#" onclick="openDevModel('crmGoalSalesResult1', '목표실적조회');">목표실적조회</a></li>
 								<li><a href="#" onclick="openDevModel('crmGoalSales_edit', '소화목표수정');">소화목표수정</a></li>
 							</ul>
 						</li>
 						<li class="sub-cate"><a href="#">영업회의SSAT</a>
							<ul>
								<li><a href="#" onclick="openDevModel('crmSSAT_03', 'MR성장/달성');">MR성장/달성</a></li>
								<li><a href="#" onclick="openDevModel('crmSSAT_YearProgress', '최근1년실적추이');">최근1년실적추이</a></li>
								<li><a href="#" onclick="openDevModel('crmSSAT_PeriodGrowth', '전년 동기대비 성장률');">전년 동기대비 성장률</a></li>
							</ul>
 						</li>
 						<li class="sub-cate"><a href="#">영업현황SSAT</a>
							<ul>
								<li><a href="#" onclick="openDevModel('crmDDDMain', 'DDD점유율');">DDD점유율</a></li>
								<li><a href="#" onclick="openDevModel('crmDDDshare', 'DDD점유율(전체)');">DDD점유율(전체)</a></li>
 								<li><a href="#" onclick="openDevModel('crmSSAT_05', '개업의점유율');">개업의점유율</a></li>
 							</ul>
 						</li>
 						<li class="sub-cate"><a href="#">Call관리</a>
							<ul>
								<li><a href="#" onclick="openDevModel('crmCallReport', '콜리포트조회');">콜리포트조회</a></li>
 								<li><a href="#" onclick="openDevModel('crmSSAT_01', '고객별Call조회');">고객별Call조회</a></li>
 								<li><a href="#" onclick="openDevModel('crmCallsummary', 'Call상세조회');">Call상세조회</a></li>
 							</ul>
 						</li>
 						<li class="sub-cate"><a href="#">일소화</a>
							<ul>
								<li><a href="#" onclick="openDevModel('crmSDSALE_GRAPH1', '일별 매출추이/진행율');">일별 매출추이/진행율</a></li>
								<li><a href="#" onclick="openDevModel('crmSaleDayProgress', '일소화 현황');">일소화 현황</a></li>
 							</ul>
 						</li>
 						<li class="sub-cate"><a href="#">Area Management</a>
							<ul>
 								<li><a href="#" onclick="openDevModel('crmAM_budget_adjust', 'AM 예산조정');">AM 예산조정</a></li>
 								<li><a href="#" onclick="openDevModel('crmAMResult2', 'AM 결과확인(MR/DR 등급)');">AM 결과확인(MR/DR 등급)</a></li>
 								<li><a href="#" onclick="openDevModel('crmAMpatient', 'MR질환환자수 입력 / 소장 질환환자수 조정');">MR질환환자수 입력 / 소장 질환환자수 조정</a></li>
 								<li><a href="#" onclick="openDevModel('crmAMTargetAdjust', '영업부 목표조정');">영업부 목표조정</a></li>
 								<li><a href="#" onclick="openDevModel('crmAMTargetFirstReport', '목표조정결과Report');">목표조정결과Report</a></li>
 							</ul>
 						</li>
						<li class="sub-cate"><a href="#">기초자료 등록 및 조회</a>
							<ul>
								<li><a href="#" onclick="openDevModel('crmCompanyList', '거래처 조회');">거래처 조회</a></li>
								<li><a href="#" onclick="openDevModel('crmContactList', '고객 조회');">고객 조회</a></li>
 								<li><a href="#" onclick="openDevModel('crmCompanyNew', '거래처/고객 요청');">거래처/고객 요청</a></li>
 								<li><a href="#" onclick="openDevModel('crmWFCompanyReg', '거래처/고객 등록');">거래처/고객 등록</a></li>
 								<li><a href="#" onclick="openDevModel('crmPharmarcyList', '약국조회');">약국조회</a></li>
 								<li><a href="#" onclick="openDevModel('crmWFPharmarcy', '약국 신규/변경/폐업');">약국 신규/변경/폐업</a></li>
 								<li><a href="#" onclick="openDevModel('crmWFPharmarcyRel', '품목관계 추가/삭제');">품목관계 추가/삭제</a></li>
 								<li><a href="#" onclick="openDevModel('crmShoukaMonth10', '기타실적요청');">기타실적요청</a></li>
 							</ul>
 						</li>
 						<li class="sub-cate"><a href="#">Coding Program</a>
							<ul>
 								<li><a href="#" onclick="openDevModel('crmCodingProgram', 'Coding 관리');">Coding 관리</a></li>
 							</ul>
 						</li>
 					</ul>
 				</li>
				<li><a href="#"><span data-hover="관리업무">관리업무</span></a>
					<ul>
						<li class="sub-cate"><a href="#">소화실적처리</a>
							<ul>
 								<li><a href="#" onclick="openDevModel('crmShyoukaMonth01', '월소화01_사전처리');">월소화01_사전처리</a></li>
 								<li><a href="#"  onclick="openDevModel('crmShoukaMonth02', '월소화02_마감처리');">월소화02_마감처리</a></li>
 								<li><a href="#" onclick="openDevModel('crmShoukaMonth04', '월소화04_원본조회');">월소화04_원본조회</a></li>
								<li><a href="#" onclick="openDevModel('crmShoukaMonth05', '월소화03_처리현황');">월소화03_처리현황</a></li>
								<li><a href="#" onclick="openDevModel('crmShoukaMonth08', '월소화05_소화비교+');">월소화05_소화비교+</a></li>
								<li><a href="#" onclick="openDevModel('crmShoukaMonth09', '월소화05_소화비교-');">월소화05_소화비교-</a></li>
								<li><a href="#" onclick="openDevModel('crmPharmarcyMove', '폐업기타약국처리');">폐업기타약국처리</a></li>
								<li><a href="#" onclick="openDevModel('crmSaleNodada', '무자료실적조회');">무자료실적조회</a></li>
								<li><a href="#" onclick="openDevModel('crmWholeSaler', '도매상관리');">도매상관리</a></li>
								<li><a href="#" onclick="openDevModel('crmCompanyEdit', '거래처정보변경');">거래처정보변경</a></li>
								<li><a href="#" onclick="openDevModel('crmPharmacyEdit', '약국정보변경');">약국정보변경</a></li>
								<li><a href="#" onclick="openDevModel('crmSyoukaPriceManage', '소화단가관리');">소화단가관리</a></li>
								<li><a href="#" onclick="openDevModel('crmSaleMake', '소화실적Report');">소화실적Report</a></li>
								<!-- li><a href="#">소화실적원본 업로드</a></li>-->
								<li><a href="#" onclick="openDevModel('crmShoukaMonth11', '기타실적처리');">기타실적처리</a></li>
								<li><a href="#" onclick="openDevModel('crmWholeSaleTrend', 'SAP/소화Trend');">SAP/소화Trend</a></li>
								<!--<li><a href="#">ERP목표수정</a></li>
								<li><a href="#">월소화처리_미리보기</a></li>
								<li><a href="#">소화실적결과</a></li> -->
							</ul>
						</li>

						<li class="sub-cate"><a href="#">일소화실적</a>
							<ul>
								<li><a href="#" onclick="openDevModel('crmSDSALE_Detail3', '일소화 마감실적');">일소화 마감실적</a></li>
								<li><a href="#" onclick="openDevModel('crmShyoukaWhole', '일소화사전작업');">일소화사전작업</a></li>
								<li><a href="#" onclick="openDevModel('crmSyoukaDaily', '일소화마감처리');">일소화마감처리</a></li>
								<li><a href="#" onclick="openDevModel('crmSDSALE_Detail1', '일소화_마감실적원본');">일소화_마감실적원본</a></li>
								<li><a href="#" onclick="openDevModel('crmProductManage_new', '일소화단가변경');">일소화단가변경</a></li>
							</ul>
						</li>
							
						<li class="sub-cate"><a href="#">ISR관리</a>
							<ul>
								<li><a href="#" onclick="openDevModel('CT1000', 'ISR관리');">ISR관리</a></li>
								<li><a href="#" onclick="openDevModel('CT2000', '연구비지급관리');">연구비지급관리</a></li>
								<li><a href="#" onclick="openDevModel('CT3000', '연구비지급현황');">연구비지급현황</a></li>
								<li><a href="#" onclick="openDevModel('CT4000', '연구변경내역');">연구변경내역</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">PMS/PV</a>
							<ul>
								<li><a href="#" onclick="openDevModel('HRI2200', 'PV교육사항관리');">PV교육사항관리</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">QA</a>
							<ul>
								<li><a href="#" onclick="openDevModel('QA1000', '품목입고관리');">품목입고관리</a></li>
								<li><a href="#" onclick="openDevModel('QA2000', '검수요청');">검수요청</a></li>
								<li><a href="#" onclick="openDevModel('QA3000', '검체채취의뢰');">검체채취의뢰</a></li>
								<li><a href="#" onclick="openDevModel('QA4000', '시험의뢰');">시험의뢰</a></li>
								<li><a href="#" onclick="openDevModel('QA6000', 'QA진행현황');">QA진행현황</a></li>
								<li><a href="#" onclick="openDevModel('QA5000', 'QA메일수신자설정');">QA메일수신자설정</a></li>
							</ul>
						</li>
						<li><a href="#" onclick="openDevModel('sapAdvancePayments', '선급금관리');">선급금관리</a></li>
						<li><a href="#" onclick="openDevModel('crmXTDRSA', 'XTD 환급내역관리');">XTD 환급내역관리</a></li>
						<li><a href="#" onclick="openDevModel('crmMedical', 'Medical Code 관리');">Medical Code 관리</a></li>
						<li class="sub-cate"><a href="#">시스템</a>
							<ul>
								<li><a href="#" onclick="openDevModel('SYS3200', '관리번호채번정보');">관리번호채번정보</a></li>
								<li><a href="#" onclick="openDevModel('SYS2100', '그룹별 권한관리(신규)');">그룹별 권한관리(신규)</a></li>
								<li><a href="#" onclick="openDevModel('FingerSessionInfo', 'Session정보 설정');">Session정보 설정</a></li>
								<li><a href="#" onclick="openDevModel('crmWFDocumentLock', '결재라인 조정(선결/전결)');">결재라인 조정(선결/전결)</a></li>
								<li><a href="#" onclick="openDevModel('crmEISRight', 'EIS 권한관리');">EIS 권한관리</a></li>
								<li><a href="#" onclick="openDevModel('crmSystemRole', '시스템권한관리');">시스템권한관리</a></li>
								<li><a href="#" onclick="openDevModel('COM1000', '공통코드 정보');">공통코드 정보</a></li>
								<li><a href="#" onclick="openDevModel('COM1100', '주소(우편번호)정보');">주소(우편번호)정보</a></li>
								<li><a href="#" onclick="openDevModel('crmProductManage', '품목정보');">품목정보</a></li>
								<li><a href="#" onclick="openDevModel('crmManageTheme', '테마관리');">테마관리</a></li>
								<li><a href="#" onclick="openDevModel('crmPromoCodeManage', '판촉항목관리');">판촉항목관리</a></li>
								<li><a href="#" onclick="openDevModel('crmBudgetItemManage', '예산항목관리');">예산항목관리</a></li>
								<li><a href="#" onclick="openDevModel('crmSystemProject', '시스템 프로젝트');">시스템 프로젝트</a></li>
								<li><a href="#" onclick="openDevModel('BookMarkManage', '즐겨찾기 관리');">즐겨찾기 관리</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">Maypole</a>
							<ul>
								<li><a href="#" onclick="openDevModel('', '월보/소화 요약');">월보/소화 요약</a></li>
								<li><a href="#" onclick="openDevModel('crmMaypoleReportSumm', 'Maypole Summary');">Maypole Summary</a></li>
								<li><a href="#" onclick="openDevModel('crmMaypoleReportExpe', 'Maypole Expense');">Maypole Expense</a></li>
								
							</ul>
						</li>
					</ul>
				</li>
				<li><a href="#"><span data-hover="HR">HR</span></a>
					<ul>
						<li class="sub-cate"><a href="#">HRM</a>
							<ul>
								<li><a href="#" onclick="openDevModel('HRI1700', '증명서발급');">증명서발급</a></li>
								<li><a href="#" onclick="openDevModel('HRI3000', '경력개발계획서');">경력개발계획서</a></li>
								<li><a href="#" onclick="openDevModel('crmVacationReport', '연차사용현황');">연차사용현황</a></li>
								<li><a href="#" onclick="openDevModel('HRP2430', '개인급여내역 조회');">개인급여내역 조회</a></li>
								<li><a href="#" onclick="openDevModel('HRP3500', '연봉계약서 확인');">연봉계약서 확인</a></li>
								<li><a href="#" onclick="openDevModel('HRA1600', '원천징수영수증 조회/출력');">원천징수영수증 조회/출력</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">평가</a>
							<ul>
								<li><a href="#" onclick="openDevModel('HRE4120', '상시면담등록');">상시면담등록</a></li>
								<li><a href="#" onclick="openDevModel('HRE4130', '상시면담승인');">상시면담승인</a></li>
								<li><a href="#" onclick="openDevModel('HRE4240', '자기평가');">자기평가</a></li>
								<li><a href="#" onclick="openDevModel('HRE4250', '1차평가');">1차평가</a></li>
								<li><a href="#" onclick="openDevModel('HRE4260', '2차평가');">2차평가</a></li>
								<li><a href="#" onclick="openDevModel('HRE5220', '3년간 평가결과 확인');">3년간 평가결과 확인</a></li>
								<li><a href="#" onclick="openDevModel('HRE5230', '팀원평가결과 확인');">팀원평가결과 확인</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">연말정산</a>
							<ul>
								<li><a href="#" onclick="openDevModel('HRA1500', '연말정산 계산');">연말정산 계산</a></li>
							</ul>
						</li>
					</ul>
				</li>
				<li><a href="#"><span data-hover="사이트연결">사이트연결</span></a></li>
				<!-- <li><a href="#">즐겨찾기</a></li> -->
				<li><a href="#"><span data-hover="테스트">테스트</span></a>
					<ul>
						<li class="sub-cate"><a href="#">SYSTEM</a>
							<ul>
								<li><a href="#" onclick="openDevModel('FormHelp', '도움말');">도움말</a></li>
								<li><a href="#" onclick="openDevModel('FormMessageManage', '폼메시지 관리');">폼메시지 관리</a></li>
								<li><a href="#" onclick="openDevModel('MenuManage', '메뉴 편집');">메뉴 편집</a></li>
								<li><a href="#" onclick="openDevModel('BizComponent', '비지니스 컴포넌트 관리');">비지니스 컴포넌트 관리</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">기준정보</a>
							<ul>
								<li><a href="#" onclick="openDevModel('HRB1200', '근무유형별기준');">근무유형별기준</a></li>
								<li><a href="#" onclick="openDevModel('HRB5100', '급여체계등록');">급여체계등록</a></li>
								<li><a href="#" onclick="openDevModel('HRB5200', '급여항목등록');">급여항목등록</a></li>
								<li><a href="#" onclick="openDevModel('HRB5300', '급여체계별 급여항목');">급여체계별 급여항목</a></li>
								<li><a href="#" onclick="openDevModel('HRB6100', '비과세코드정보');">비과세코드정보</a></li>
								<li><a href="#" onclick="openDevModel('HRB6200', '간이세율표 정보');">간이세율표 정보</a></li>
								<li><a href="#" onclick="openDevModel('HRB6300', '종합소득세율 정보');">종합소득세율 정보</a></li>
								<li><a href="#" onclick="openDevModel('HRB1300', '근태달력');">근태달력</a></li>
								<li><a href="#" onclick="openDevModel('HRB1400', '결재문서별 라인관리');">결재문서별 라인관리</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">기타소득</a>
							<ul>
								<li><a href="#" onclick="openDevModel('HRA3200', '기타소득 등록');">기타소득 등록</a></li>
								<li><a href="#" onclick="openDevModel('HRA3300', '기타소득 조회');">기타소득 조회</a></li>
								<li><a href="#" onclick="openDevModel('HRA9100', '기타소득 전산매체 생성');">기타소득 전산매체 생성</a></li>
								<li><a href="#" onclick="openDevModel('HRA3400', '기타소득 지급 명세서');">기타소득 지급 명세서</a></li>
								<li><a href="#" onclick="openDevModel('HRA3410', '기타소득 레터지 출력');">기타소득 레터지 출력</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">사업소득</a>
							<ul>
								<li><a href="#" onclick="openDevModel('HRA2300', '사업소득 조회');">사업소득 조회</a></li>
								<li><a href="#" onclick="openDevModel('HRA9400', '사업소득 전산매체 생성');">사업소득 전산매체 생성</a></li>
								<li><a href="#" onclick="openDevModel('HRA2400', '사업소득 지급 명세서');">사업소득 지급 명세서</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">일용직소득</a>
							<ul>
								<li><a href="#" onclick="openDevModel('HRA4300', '일용직소득조회');">일용직소득조회</a></li>
								<li><a href="#" onclick="openDevModel('HRA9200', '일용직소득 전산매체 생성');">일용직소득 전산매체 생성</a></li>
								<li><a href="#" onclick="openDevModel('HRA4500', '일용극로소득 지급명세서');">일용극로소득 지급명세서</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">평가결과</a>
							<ul>
								<li><a href="#" onclick="openDevModel('HRE5310', '평가진행현황');">평가진행현황</a></li>
								<li><a href="#" onclick="openDevModel('HRE5320', '평가 진행상태 관리');">평가 진행상태 관리</a></li>
								<li><a href="#" onclick="openDevModel('HRE5240', '부서원 종합평가 이력(4년)');">부서원 종합평가 이력(4년)</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">액션러닝</a>
							<ul>
								<li><a href="#" onclick="openDevModel('crmPostViewAction', '액션러닝');">액션러닝</a></li>
								<li><a href="#" onclick="openDevModel('crmPostManageAction', '액션러닝관리');">액션러닝관리</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">E-러닝</a>
							<ul>
								<li><a href="#" onclick="openDevModel('HRE1200', '상대평가 그룹 설정');">상대평가 그룹 설정</a></li>
								<li><a href="#" onclick="openDevModel('HRE1100', '평가일정관리');">평가일정관리</a></li>
								<li><a href="#" onclick="openDevModel('HRE2300', '평가 가중치 관리');">평가 가중치 관리</a></li>
								<li><a href="#" onclick="openDevModel('HRE2400', '평가자 설정');">평가자 설정</a></li>
								<li><a href="#" onclick="openDevModel('HRE2500', '평가 대상자 설정');">평가 대상자 설정</a></li>
								<li><a href="#" onclick="openDevModel('HRE3200', '업적 일괄 업로드');">업적 일괄 업로드</a></li>
								<li><a href="#" onclick="openDevModel('HRE3500', '역량 일괄 업로드');">역량 일괄 업로드</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">인사정보</a>
							<ul>
								<li><a href="#" onclick="openDevModel('HRI1000', '인사정보 등록');">인사정보 등록</a></li>
							</ul>
						</li>
											
						<!-- 
						<li class="sub-cate"><a href="#">조직관리</a>
							<ul>
								<li><a href="#" onclick="openDevModel('ORG2000', '부서정보');">부서정보</a></li>
								<li><a href="#" onclick="openDevModel('ORG2100', '조직변경등록');">조직변경등록</a></li>
								<li><a href="#" onclick="openDevModel('ORG2200', '조직변경이력조회');">조직변경이력조회</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">인사정보</a>
							<ul>
								<li><a href="#" onclick="openDevModel('HRI1100', '인사정보조회(인사담당자용)');">인사정보조회(인사담당자용)</a></li>
								<li><a href="#" onclick="openDevModel('HRI1200', '인사정보');">인사정보</a></li>
								<li><a href="#" onclick="openDevModel('HRI1910', '인사정보조회(총무팀)');">인사정보조회(총무팀)</a></li>
								<li><a href="#" onclick="openDevModel('HRI1920', '인사정보조회(연수담당자용)');">인사정보조회(연수담당자용)</a></li>
								<li><a href="#" onclick="openDevModel('HRI1400', '인사발령 관리');">인사발령 관리</a></li>
								<li><a href="#" onclick="openDevModel('HRI1600', '교육사항 관리');">교육사항 관리</a></li>
								<li><a href="#" onclick="openDevModel('HRI1800', '증명서 발급(인사담당자용)');">증명서 발급(인사담당자용)</a></li>
								<li><a href="#" onclick="openDevModel('crmEIS004', '부서별 연간 인원계획');">부서별 연간 인원계획</a></li>
								<li><a href="#" onclick="openDevModel('HRI3100', '경력개발계획서조회');">경력개발계획서조회</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">근태관리</a>
							<ul>
								<li><a href="#" onclick="openDevModel('HRT1000', '근태집계유형정보');">근태집계유형정보</a></li>
								<li><a href="#" onclick="openDevModel('HRT1100', '근태유형 정보');">근태유형 정보</a></li>
								<li><a href="#" onclick="openDevModel('HRT1200', '근태/휴가등록');">근태/휴가등록</a></li>
								<li><a href="#" onclick="openDevModel('HRT1400', '월별근태조정');">월별근태조정</a></li>
								<li><a href="#" onclick="openDevModel('HRT1500', '월근태조회');">월근태조회</a></li>
								<li><a href="#" onclick="openDevModel('HRT1600', '초과근무시간 조회');">초과근무시간 조회</a></li>
								<li><a href="#" onclick="openDevModel('HRT2400', '휴가실적조회');">휴가실적조회</a></li>
								<li><a href="#" onclick="openDevModel('HRT2500', '휴직현황조회');">휴직현황조회</a></li>
								<li><a href="#" onclick="openDevModel('HRT2300', '연차 잔여일수 조회');">연차 잔여일수 조회</a></li>
								<li><a href="#" onclick="openDevModel('crmVacationManager', '연차사용촉진관리');">연차사용촉진관리</a></li>
								<li><a href="#" onclick="openDevModel('HRT2000', '연차생성기준');">연차생성기준</a></li>
								<li><a href="#" onclick="openDevModel('HRT2100', '연차생성');">연차생성</a></li>
								<li><a href="#" onclick="openDevModel('HRT2200', '연차조정');">연차조정</a></li>
								<li><a href="#" onclick="openDevModel('HRT1300', '월근태집계');">월근태집계</a></li>
							</ul>
						</li>
						<li class="sub-cate"><a href="#">급상여관리</a>
							<ul>
								<li><a href="#" onclick="openDevModel('HRP1000', '급여기본정보');">급여기본정보</a></li>
								<li><a href="#" onclick="openDevModel('HRP1100', '급상여 정보 일괄 업로드');">급상여 정보 일괄 업로드</a></li>
								<li><a href="#" onclick="openDevModel('HRP1200', '급상여 고정급 조회');">급상여 고정급 조회</a></li>
								<li><a href="#" onclick="openDevModel('HRP2100', '급여 고정항목 등록');">급여 고정항목 등록</a></li>
								<li><a href="#" onclick="openDevModel('HRP2200', '급여 변동항목 등록');">급여 변동항목 등록</a></li>
								<li><a href="#" onclick="openDevModel('HRP2300', '급상여 계산');">급상여 계산</a></li>
								<li><a href="#" onclick="openDevModel('HRP2310', '급상여조정');">급상여조정</a></li>
								<li><a href="#" onclick="openDevModel('HRP2320', '전월 급여 비교');">전월 급여 비교</a></li>
								<li><a href="#" onclick="openDevModel('HRP2420', '급여대장');">급여대장</a></li>
								<li><a href="#" onclick="openDevModel('HRP2490', '은행이체내역 조회');">은행이체내역 조회</a></li>
								<li><a href="#" onclick="openDevModel('HRP3100', '급여회계처리 자료');">급여회계처리 자료</a></li>
								<li><a href="#" onclick="openDevModel('HRP3200', '연봉계약서 일괄출력');">연봉계약서 일괄출력</a></li>
								<li><a href="#" onclick="openDevModel('HRP3300', '연봉계약내역');">연봉계약내역 조회</a></li>
								<li><a href="#" onclick="openDevModel('HRP3400', '월별 인건비 실적');">월별 인건비 실적</a></li>
								<li><a href="#" onclick="openDevModel('HRP3600', 'radris 인건비기준');">radris 인건비기준</a></li>
								<li><a href="#" onclick="openDevModel('HRP3610', 'radris manhour 업로드');">radris manhour 업로드</a></li>
								<li><a href="#" onclick="openDevModel('HRP3620', 'radris 조회');">radris 조회</a></li>
							</ul>
						</li>
						-->
						<li class="sub-cate"><a href="#">연말정산</a>
							<ul>
								<!-- 
								<li><a href="#" onclick="openDevModel('HRA1100', '연말정산기준등록');">연말정산기준등록</a></li>
								<li><a href="#" onclick="openDevModel('HRA1200', '연간소득내역집계');">연간소득내역집계</a></li>
								 -->
								<li><a href="#" onclick="openDevModel('HRA1400', '개인별 정산자료 등록');">개인별 정산자료 등록</a></li>
								<li><a href="#" onclick="openDevModel('HRA1400_2010', '개인별 정산자료 등록');">개인별 정산자료 등록(2010)</a></li>
								<!-- 
								<li><a href="#" onclick="openDevModel('HRA1600_2012', '원천징수영수증 조회/출력_2012');">원천징수영수증 조회/출력_2012</a></li>
								 -->
							</ul>
						</li>
						<!-- 
						<li class="sub-cate"><a href="#">일용직소득</a>
							<ul>
								<li><a href="#" onclick="openDevModel('HRA4300', '일용직소득조회');">일용직소득조회</a></li>
							</ul>
						</li>	
						-->	
						<li class="sub-cate"><a href="#">퇴직관리</a>
							<ul>
								<li><a href="#" onclick="openDevModel('HRA5500', '퇴직금 추계액 계산');">퇴직금 추계액 계산</a></li>
								<li><a href="#" onclick="openDevModel('HRA5200', '퇴직소득 원천 영수증');">퇴직소득 원천 영수증</a></li>
								<li><a href="#" onclick="openDevModel('HRA5300', '퇴직금 정산내역');">퇴직금 정산내역</a></li>
								<li><a href="#" onclick="openDevModel('HRA5400', '퇴직금 지급현황');">퇴직금 지급현황</a></li>
							</ul>
						</li>
						<!-- 
						<li class="sub-cate"><a href="#">임시</a>
							<ul>
								<li><a href="#" onclick="openDevModel('crmSystemProject', '시스템 프로젝트');">시스템 프로젝트</a></li>
							</ul>
						</li>
						 -->
					</ul>
				</li>
			</ul>
		</nav>
	</header><!-- //header -->

	<div class="blockui" style="display:none;"></div>
	
	<div id="fpViewHost" class="container">
		<!-- 업무영역 -->
		<div id="fpView">
		</div>    
	</div>
	
	<div class="footer">
		<div class="inner">
			<p>Astellas.co.kr <span>ㅣ</span> Astellas SmartWorknet</p>
			<p class="copyright">© Copyright 2016, Astellas Pharma Korea. Inc. all rights reserved</p>
		</div>
	</div>

    <div id="decoder" style="visibility:hidden" />
    <span id="ruler" style="visibility: hidden; white-space: nowrap;"></span>  

	<input id="hdn_file_browse" type="file" style="width:0px; height:0px; opacity:0; display:none;">
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

            $.tab = new FingerContainerTab(fpView, 'container_tab1', 1, 1, /*1065*/1280, 697);
            
            fpView = null;
        };
		
        $.start = function() {
            $.tab.setEnableTabCloseButton(true);

            $.openHome('home');
            
            // 파라메터로 넘어온 메뉴 아이디가 있는 경우 메뉴 오픈 실행
            if ($.paramOpenMenus && $.paramOpenMenus.length) {
                for (var i = 0; i < $.paramOpenMenus.length; i++) {
                	$.openModelWithBusiness($.paramOpenMenus[i], null, true, false);
                }
            }
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
            g_currentModule = $.childPages[tabpage.pageKey]; 
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
        
        $.setCurrentTabInfo = function(menuid, webid, menuname) {
            $.currentTabID = webid;
            $.currentTabName = menuname;
            $.currentTabMenuID = menuid;
        }
        
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
                	$.setCurrentTabInfo('crmWFGeneralProc', 'crmWFGeneralProc', '결재함/기안함');
                	document.getElementById('modelFrame').contentWindow.location.replace('./model/' + 'crmWFGeneralProc.html');
                }
            	else if (webid == 'crmPassword') {
                	$.setCurrentTabInfo('crmPassword', 'crmPassword', '결재비밀번호설정');
                	document.getElementById('modelFrame').contentWindow.location.replace('./model/' + 'crmPassword.html');
                }
            	else if (webid == 'popReportView') {
            		$.setCurrentTabInfo('popReportView', 'popReportView', '리포트출력');
            		document.getElementById('modelFrame').contentWindow.location.replace('./model/' + 'popReportView.html');
            	}
            } else {
            	// @TODO: 메뉴에서 검색하도록 차후 수정될 예정
            	if (isChange) {
            		$.closeCurrentScreen();
            	}            	
            	$.setCurrentTabInfo(webid, webid, webid);
            	document.getElementById('modelFrame').contentWindow.location.replace('./model/' + (webid + '.html'));            	
            }
        }

        // 현재 화면 클로즈
        $.closeCurrentScreen = function() {
            var tabId = $.tab.extObj.getActiveTab();

            $.tab.closeTabEventHandler(tabId);
            $.tab.extObj.removeTab(tabId);
            //setTimeout(function(){ $.tab.extObj.removeTab(tabId); }, 300);
        }
        
        // 컨테이너 메뉴에서 비지니스 오픈
        $.openModel = function(modelName) {
        	if (tabCount > 9) {
        		MessageBoxShow('탭은 최대 10개까지 오픈하실 수 있습니다.');
        		return;
        	}
			document.getElementById('modelFrame').contentWindow.location.replace('./model/' + modelName.split(".")[0] + '.html' + '?nocache=' + getTimeStamp(new Date()));  
        }
        
        // Home 화면 오픈
        $.openHome = function(modelName) {
            document.getElementById('homeFrame').src = './model/' + modelName + '.html' + '?nocache=20161231';
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
			document.getElementById('popupFrame').src = './model/' + file;
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

                    // 비지니스에 메뉴 정보 전달
                    if (obj.menu_formid == null)                        
                        obj.menu_formid = $.currentTabID;
                    if (obj.menu_name == null)
                        obj.menu_name = $.currentTabName;
                    if (obj.menu_id == null)
                        obj.menu_id = $.currentTabMenuID;
                                        
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

                    $.currentTabID = null;
                    $.currentTabName = null;
                    $.currentTabMenuID = null;     
					$.argShare = null;                
					
					tabCount = $.tab.getTabCount();
					
                }
                else {
					if (g_currentModule.update != undefined) {
						g_currentModule.args = $.argShare;
                        g_currentModule.update($.argShare);
                    }

                    $.currentTabID = null;
                    $.currentTabName = null;
                    $.currentTabMenuID = null;
                    $.argShare = null;
                }
            }
            catch (err) {
                console.log(err.message);
                MessageBoxShow('메뉴 로드 중 오류가 발생 하였습니다.<br/><br/> [' + err.message + ']');
            }
            finally {
                obj = null;
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
     
    function onClickModel(menu) {
        var menuid = menu.getAttribute('menu_id');
        var webid = menu.getAttribute('web_id'); 
        var fileid = menu.getAttribute('file_id');
        
        g_main.setCurrentTabInfo(menuid, webid, menu.innerHTML);                
        g_main.openModel(fileid);
        
        menuid = null;
        webid = null;
        fileid = null;
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