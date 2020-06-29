<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>direct login</title>
	<script>
		function directLogin(){
			document.forms["f"].submit();
		}
	</script>
</head>
<body onload='directLogin();'>
	<form name='f' action='j_spring_security_check' method='POST'>
		<input type=hidden name="sso" value="1"/>
		<input type=hidden name="j_username" id="j_username" value="${param.empId}"/>
		<input type=hidden name="j_password" id="j_password" value=""/>
		<input type=hidden name="primitive" value="${param.primitive}"/>
		<input type=hidden name="lang" value="${param.lang}"/>
		<input type=hidden name="encPwd" value="${param.encPwd}"/>
		<input type=hidden name="osName" value="${param.osName}"/>
		<input type=hidden name="osVersion" value="${param.osVersion}"/>
		<input type=hidden name="groupCd" value="${param.groupCd}"/>
		<input type=hidden name="deviceModel" value="${param.deviceModel}"/>
		<input type=hidden name="mdn" value="${param.mdn}"/>
		<input type=hidden name="authKey" value="${param.authKey}"/>
		<input type=hidden name="companyCd" value="${param.companyCd}"/>
		<input type=hidden name="appId" value="${param.appId}"/>
		<input type=hidden name="appVer" value="${param.appVer}"/>
		<input type=hidden name="backurl" value="${param.backurl}"/>
	</form>
</body>
</html>