<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="Expires" content="0">
	<meta http-equiv="Last-Modified" content="0">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate">
	<meta http-equiv="Pragma" content="no-cache">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
	<title>Astellas Worknet4.0</title>
	<style>
		@import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);
		body{margin:0; padding:0; font-family:'Noto Sans KR'; font-weight:400; font-size:14px; color:#666;}
		legend{display:none;}
		a{text-decoration:none; color:#666;}
		.header-bg{height:50px; margin:0 0 110px; background:#da1e48 url(img/login/bg_wrap.jpg) no-repeat center 0;}
		.login-contents{width:1040px; margin:0 auto;}
		.login-contents .txt{margin:0 0 10px -15px; color:#555;}
		.login-contents .txt img{margin:0 12px 0 0;}
		.form-area{margin:0 0 40px; padding:60px 0 75px; text-align:center; border-top:2px solid #666; border-bottom:1px solid #e5e5e5; background:#f7f7f7;}
		.form-area form{margin:0; padding:0;}
		.form-area fieldset{width:440px; margin:0 auto; padding:0; border:0;}
		.form-area .field{float:left; text-align:left;}
		.form-area .field > div:first-child{margin:0 0 8px;}
		.form-area label{display:inline-block; width:70px; padding:0 0 0 10px; background:url(img/login/blt_square.gif) no-repeat 0 center;}
		.form-area input{width:240px; height:38px; box-sizing:border-box; padding:0 10px; line-height:36px; border:1px solid #d2d2d2; background:#fff;}
		.form-area button{float:right; width:110px; height:84px; font-size:15px; color:#fff; border:0; background:#da1e48;}
		.quick-area{width:1040px; overflow:hidden; margin:0 auto 100px;}
		.quick-area a{float:left; width:260px; box-sizing:border-box; border-left:1px solid #e5e5e5;}
		.quick-area a:first-child{border:0;}
		.quick-area *{margin:0; padding:0;}
		.quick-area dl{text-align:center;}
		.quick-area dt{padding:0 0 80px; font-weight:500;}
		.quick-area dd{font-size:13px; font-weight:300; color:#999; line-height:1.4;}
		.quick-area .commu{background:url(img/login/icon01.png) no-repeat center 35px;}
		.quick-area .manage{background:url(img/login/icon02.png) no-repeat center 35px;}
		.quick-area .status{background:url(img/login/icon03.png) no-repeat center 35px;}
		.quick-area .hr{background:url(img/login/icon04.png) no-repeat center 35px;}
		.login-footer{clear:both; padding:15px 0 20px; border-top:3px solid #54545e;}
		.login-footer .inner{width:1170px; overflow:hidden; margin:0 auto;}
		.login-footer p{float:left; margin:0; padding:0; font-weight:300; color:#939598;}
		.login-footer span{padding:0 16px;}
		.login-footer .copyright{float:right;}
	</style>
	
	<script src="fingerPlatform/common.js"></script>
	<script type="text/javascript">
	<%
	String exceptionMsg = (String) request.getAttribute("exceptionMsg");
	if (exceptionMsg != null && !exceptionMsg.equals("")) {
		out.println("alert('" + exceptionMsg + "');");
	}
	%>
	var ieVersionNa = null;

	function pageLoaded() {
		// IE 브라우저 여부
		ieVersionNa = getIEVersion();

		// 쿠키 체크
		var saveUserId = getCookie('ast_worknet_saveid');
		var userId = document.getElementById('j_username');
		var userPassword = document.getElementById('j_password_scr');

		if (saveUserId) {
				userId.value = saveUserId;
				userPassword.focus();
		} else {
				userId.focus();
		}
	}

	function login() {
		var pwd_src = document.getElementById('j_password_scr');
		var pwd = document.getElementById('j_password');

		if (document.getElementById('j_username').value == '') {
				alert('아이디를 입력하십시오.');
				return;
		}

		if (pwd_src.value == '') {
				alert('비밀번호를 입력하십시오.');
				return;
		}
		
		// 본사 직원들은 크롬 브라우저를 통해서 접속하도록 설정
		var userId = document.getElementById('j_username').value;
		if (
			userId.indexOf('ka069045') != 0 &&
			userId.indexOf('ka110192') != 0 &&
			userId.indexOf('ka120213') != 0 &&
			userId.indexOf('ka130292') != 0 &&
			userId.indexOf('ka070040') != 0
		) {
			if (ieVersionNa !== 'N/A' && (userId.indexOf('ka') == 0 || userId.indexOf('ypc') == 0)) {
				alert('해당 사이트는 크롬(Chrome) 웹브라우저에 최적화되어 있습니다.\n크롬 브라우저를 통해 접속해 주시기 바랍니다.');
				return;
			}			
		}
		// 아이디 저장
		saveUserId();

		pwd.value = pwd_src.value;
		pwd_src.value = "";
		document.f.submit();
	}

	function saveUserId() {
		var userId = document.getElementById('j_username');

		setCookie('ast_worknet_saveid', userId.value, 365);
	}

	function moveFocus(e) {
		if (e.keyCode != '13')
				return;

		if (e.currentTarget.id == 'j_username') {
				document.getElementById("j_password_scr").focus();
		} else if (e.currentTarget.id == 'j_password_scr') {
				login();
		}
	}
	</script>
</head>
<body onload="pageLoaded();">
<div class="login-wrap">
	<div class="header-bg"></div>
	<div class="login-contents">
		<p class="txt"><img src="img/login/logo.png" alt="astellas"></p>
		<div class="form-area">
			<h1><img src="img/login/worknet.png" alt="WORKNET 4.0"></h1>
			<form name='f' action='j_spring_security_check' method='POST'>
				<input type=hidden name="sid" value="FINGERSALES"/>
				<input type=hidden name="j_password" id="j_password" value=""/>
				
				<fieldset>
					<legend>로그인</legend>
					<div class="field">
						<div>
							<label for="">아이디</label>
							<input type="text" id="j_username" name="j_username" placeholder="ID" autocomplete="nope" onkeydown="moveFocus(event);">
						</div>
						<div>
							<label for="">비밀번호</label>
							<input type='password' id='j_password_scr' name='j_password_scr' placeholder="Password" autocomplete="new-password" onkeydown="moveFocus(event);">
						</div>
					</div>
					<button type="button" onclick="login();" style="cursor:pointer;">로그인</button>					
				</fieldset>
			</form>
		</div>

		<div class="quick-area">
			<a href="#">
				<dl class="commu">
					<dt>커뮤니티</dt>
					<dd>다양한 커뮤니티 메뉴를<br>활용하여 전사 커뮤니케이션<br>발전에 도움이 됩니다.</dd>
				</dl>
			</a>
			<a href="#">
				<dl class="manage">
					<dt>기안/CP/예산관리</dt>
					<dd>Worknet 4.0 내에서 기안상신,<br>결재, CP처리, 예산관리의 모든<br>프로그램을 이용하실 수 있습니다</dd>
				</dl>
			</a>
			<a href="#">
				<dl class="status">
					<dt>영업현황</dt>
					<dd>실시간 그래프를 통해<br>현재 진행되고 있는 영업현황을<br>한 눈에 확인하실 수 있습니다.</dd>
				</dl>
			</a>
			<a href="#">
				<dl class="hr">
					<dt>HR</dt>
					<dd>인사평가, 급상여조회, 증명서<br>발급 등의 모든 HR 프로그램을<br>이용하실 수 있습니다.</dd>
				</dl>
			</a>
		</div>
	</div>

	<div class="login-footer">
		<div class="inner">
			<p>Astellas.co.kr<span>|</span>Astellas SmartWorknet</p>
			<p class="copyright">© Copyright 2017, Astellas Pharma Korea. Inc. all rights reserved</p>
		</div>
	</div>
</div>
</body>
</html>