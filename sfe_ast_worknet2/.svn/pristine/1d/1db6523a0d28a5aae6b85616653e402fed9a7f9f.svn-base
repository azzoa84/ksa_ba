<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
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
	
	<script src="./fingerPlatform/library/jquery-1.10.2.min.js"></script>
	<script type="text/javascript">
		$(function() {
			if (window.opener && window.opener.g_openPrintHtml) {
				$(window.opener.g_openPrintHtml).appendTo('body');
				
				var afterPrint = function() {
					// 출력(Print) 실행 후 창이 닫히면서 이벤트 호출 (* 크롬에서는 '취소'시에도 작동 함)
					if (window.opener.g_openPrintHtmlCallback !== undefined && window.opener.g_openPrintHtmlCallback) {
						window.opener.g_openPrintHtmlCallback();
					}
					
					// 프린트 페이지 종료
					//window.close();
					setTimeout(function(){ window.close(); }, 300);
				};
				window.onafterprint = afterPrint;
				
				// 출력 실행
				window.print();
			}
		});
	</script>
</head>
<body>
</body>
</html>