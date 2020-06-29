/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package fingersales.common.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import fingersales.common.constants.CommConst;
import fingersales.common.dao.CommonDAO;
import fingersales.common.model.UserModel;
import fingersales.common.service.ServiceMap;
import fingersales.common.service.UserDetailsService;
import fingersales.common.util.FingerParamMap;
import fingersales.common.util.Utility;

/**  
* @Class Name : LoginController.java
* @Description : 로그인 처리를 위한 독립 컨트롤러 
* @Modification Information  
* @
* @  수정일      수정자              수정내용
* @ ---------   ---------   -------------------------------
* 
* @author 김영도
* @since 2016.08.10
* @version 1.0
* @see
* 
*  Copyright (C) by MOPAS All right reserved.
*/
@Controller
@SessionAttributes(types = UserModel.class)
public class LoginController extends SWNBaseControler {
	
	@Resource(name = "UserDetailsService")
	private UserDetailsService userDetailsService;
	
    @Resource(name="commonDAO")
    protected CommonDAO commonDAO;	
	
	@RequestMapping(value = "/login.do")
    public void expiredSession(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		request.setAttribute("expiredSession", true);
		request.setAttribute("p1", "session_logout_div");
		
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		request.getRequestDispatcher("/login.jsp").forward(request, response);
    }
	
	@RequestMapping(value = "/admin/logout.do")
	public String logout(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		// 세션 만료 처리
		session.invalidate();
		return "redirect:/login.jsp";
	}
	
	@RequestMapping(value = "/getMySmartLoginKey.do")
	public ResponseEntity<String> getMySmartLoginKey(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		FingerParamMap params = new FingerParamMap();
		params.put("userId", Utility.getSessionAttribute(session, CommConst.SESS_USER_ID));
		String smartLoginKey = (String) commonDAO.selectByPk("common.getMySmartLoginKey", params);
		
		FingerParamMap resultMap = new FingerParamMap();
		resultMap.put("result", smartLoginKey);
		resultMap.put("userId", params.get("userId"));
		resultMap.put("userName", Utility.getSessionAttribute(session, "UserName"));
		return Utility.getJSONResponse(resultMap);
	}
	
	/**
	 * FCS 툴 로그인
	 * @author 김영도
	 */
	@RequestMapping(value = "/activator.aspx")
	public String devPage(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		try {
			UserModel userInfo = new UserModel(request.getParameter("p1"), "", AuthorityUtils.createAuthorityList("ROLE_USER", "ROLE_ADMIN"));
			
			Authentication authentication = new UsernamePasswordAuthenticationToken(userInfo, null, userInfo.getAuthorities());
			SecurityContextHolder.getContext().setAuthentication(authentication);
			
			//UserDetailsService userDetailsService = (UserDetailsService) appCtx.getBean("userDetailsService");
			
			// 세션 정보 추가
			userDetailsService.extendUserSession(userInfo);
			
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		
		response.setContentType("text/html;charset=UTF-8");
		return "/webdev";
	}
	
	/**
	 * 외부 시스템에서 접속 (링크)
	 * @author 김영도
	 */
	@RequestMapping(value = "/link.do")
	public void link(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		try {
			// 로그인 세션이 존재하지 않는 경우 자동로그인 처리
			HttpSession session = request.getSession(true);
			
			if (session == null || session.getAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY) == null) {
				FingerParamMap sqlParams = new FingerParamMap();
				
				String smartLoginKey = request.getParameter("smartLoginKey");
				if (smartLoginKey == null || smartLoginKey.equals("")) {
					throw new Exception("자동 로그인키가 없습니다. (* 비정상적인 접근)");
				}
				sqlParams.put("smartLoginKey", smartLoginKey);
				FingerParamMap user = (FingerParamMap) commonDAO.selectByPk(ServiceMap.getQueryId(ServiceMap.KEY_LOGIN), sqlParams);
				
				if (user == null || user.get("emp_code") == null) {
					throw new Exception("로그인 키를 통해 매칭된 사용자 정보가 없습니다.");
				}
				String employeeId = (String) user.get("emp_code");
				
				UserModel userInfo = new UserModel(employeeId, "", AuthorityUtils.createAuthorityList("ROLE_USER", "ROLE_ADMIN"));
				
				Authentication authentication = new UsernamePasswordAuthenticationToken(userInfo, null, userInfo.getAuthorities());
				SecurityContextHolder.getContext().setAuthentication(authentication);
				
				// 세션 정보 추가
				userDetailsService.extendUserSession(userInfo);
			}
			
			String queryString = request.getQueryString();
			
			// 쿼리스트링에서 smartLoginKey 제거
			if (queryString != null && queryString.indexOf("&smartLoginKey") > -1) {
				String smartKey = queryString.substring(queryString.indexOf("&smartLoginKey"), queryString.indexOf("-SMTKEY") + 7);
				queryString = queryString.replace(smartKey, "");
			}
			if (queryString != null && queryString.indexOf("smartLoginKey") > -1) {
				String smartKey = queryString.substring(queryString.indexOf("smartLoginKey"), queryString.indexOf("-SMTKEY") + 7);
				queryString = queryString.replace(smartKey, "");
			}
			// 쿼리스트링에서 smartLoginKey 제거 end.
			
			String linkUrl = null;
			if (queryString != null && !queryString.equals("")) {
				if (queryString.indexOf("&") == 0) { queryString = queryString.replaceFirst("&", ""); } 
				
				linkUrl = ("/" + "index.jsp" + "?" + queryString);
			} else {
				linkUrl = ("/" + "index.jsp");
			}
			
			response.setContentType("text/html;charset=UTF-8");
			response.sendRedirect(request.getContextPath() + linkUrl);

		} catch (Exception ex) {
			ex.printStackTrace();
			response.sendRedirect(request.getContextPath() + "/login.jsp");
		}
	}
}
