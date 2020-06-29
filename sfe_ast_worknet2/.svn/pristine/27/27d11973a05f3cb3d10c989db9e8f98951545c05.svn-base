<%@page import="fingersales.common.util.Utility"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript">
	function userLogout() {
		if (confirm("로그아웃 하시겠습니까?")) {
			location.href = '${pageContext.request.contextPath}/business/logout.do';	
		}
	}
</script>

<!-- <div class="wrap"> -->
<header class="header">
	<div class="headerwrap">
		<div class="gnb_info white">
			<ul>
				<li><a href='${pageContext.request.contextPath}/business/logout.do'><img src="${pageContext.request.contextPath}/img/logout_icon.png" alt="" /></a></li>
				<li>
					<p><img src="${pageContext.request.contextPath}/img/man_icon.png" alt="" /><%=session.getAttribute("deptname") %></p>
					<p><%=session.getAttribute("username") %></p>
				</li>
			</ul>
		</div>
		<div class="gnbbutton"><a onclick="showMobileMenu(true);" alt="오픈버튼">openButton</a></div>
		<div class="gnbmenu" style="display:none;">
			<div class="gnbbutton2"><a onclick="showMobileMenu(false);" alt="닫기버튼">closeButton</a></div>
			<div class="gnb">
				<ul>
					<li class="gnb_info2">
						<ol>
							<li><a href='${pageContext.request.contextPath}/business/logout.do'><img src="${pageContext.request.contextPath}/img/logout_icon.png" alt="" /></a></li>
							<li>
								<p><img src="${pageContext.request.contextPath}/img/man_icon.png" alt="" /><%=session.getAttribute("deptname") %></p>
								<p><%=session.getAttribute("username") %></p>
							</li>
						</ol>
					</li>
				</ul>
				<ul id="leftMobileMenu">
					<script>leftMobileMenu.innerHTML = document.menuNode.innerHTML;</script>	
				</ul>		
			</div>
		</div>
		<div id="header_tit" class="header_tit"><span>한국아스텔라스제약 Worknet4.0</span>
			<div class="hd_logo">
				<h1><a href="#" alt="로고">logo</a></h1>
			</div>
		</div>
	</div>
</header>