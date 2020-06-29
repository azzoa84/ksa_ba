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
package fingersales.common.service;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.AuthenticationUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import fingersales.common.dao.CommonDAO;
import fingersales.common.model.UserModel;
import fingersales.common.util.FingerParamMap;
import fingersales.common.util.SessionManager;

public class PreAuthenticatedUserDetailsService implements AuthenticationUserDetailsService {
	Log log = LogFactory.getLog(this.getClass());
	
	/** CommonDAO */
    @Resource(name="commonDAO")
    private CommonDAO commonDAO;
	
	@Override
	public UserDetails loadUserDetails(Authentication token) throws UsernameNotFoundException {
		log.info("PreAuthenticatedUserDetailsService: loadUserDetails");
		
		// set request
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();

		// get auto login key
		String autologinkey40 = "";
		if (request.getCookies() != null) {
			for (int i = 0; i < request.getCookies().length; i++) {
				if (request.getCookies()[i].getName().equals("autologinkey40")) {
					autologinkey40 = request.getCookies()[i].getValue();
				}
			}
		}

		// auto login key
		if (autologinkey40.length() != 32) {
			throw new UsernameNotFoundException("Invalid autologinkey40. (Ignored FCS Tool)");
	    }

		// check user from database
		FingerParamMap param = new FingerParamMap();
		param.put("securityKeyW40", autologinkey40);
		FingerParamMap userOn = (FingerParamMap) commonDAO.selectByPk("common.selectUser", param);
		if (userOn == null) {
			throw new UsernameNotFoundException("입력한 로그인 정보를 통해 crmEmployee 뷰를 조회하는데 실패 하였습니다.");
		}
		param.put("employeeId", userOn.get("employee_id"));
		
		// make authority
		UserModel userInfo = new UserModel((String)param.get("employeeId"), "", AuthorityUtils.createAuthorityList("ROLE_USER", "ROLE_ADMIN"));
		userInfo.setAutoLoginKey(autologinkey40);
		
		List<FingerParamMap> sessionInfo = commonDAO.list("common.selectSessionInfo", param);

		// get user menus
		param.put("workType", "MENUS");
		List<FingerParamMap> userMenus = commonDAO.list("common.selectUserMenus", param);
		
		// get form messages
		List<FingerParamMap> formMessages = commonDAO.list("common.selectAppFormMessages", param);			
		
		SessionManager.setSessionInfo(request, sessionInfo, userMenus, formMessages);
		
		return userInfo;
	}
}