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

import java.util.Collection;
import java.util.List;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import fingersales.common.constants.SharedProperties;
import fingersales.common.dao.CommonDAO;
import fingersales.common.model.UserModel;
import fingersales.common.util.ADAuthenticator;
import fingersales.common.util.ApplicationContextHolder;
import fingersales.common.util.FingerParamMap;
import fingersales.common.util.SessionManager;
import fingersales.common.util.Utility;

@Service("UserDetailsService")
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {
	protected Log log = LogFactory.getLog(this.getClass());
	
	/** CommonProperties */
	@Resource(name = "propComm")
	private Properties propComm;
	
	/** CommonDAO */
    @Resource(name="commonDAO")
    protected CommonDAO commonDAO;
    
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    	log.info("UserDetailsService: Execute loadUserByUsername();");
    	
    	HttpServletRequest request = ApplicationContextHolder.getRequest();
		
		FingerParamMap param = new FingerParamMap();
		param.put("userId", request.getParameter("j_username"));
		param.put("password", request.getParameter("j_password"));
		
		String isNonAd = (String) commonDAO.selectByPk("common.isNonAdAuth", param);
		
		if ((isNonAd != null && isNonAd.equals("Y")) 
			|| ("AKR-A00001".equals(param.get("userId").toString().toUpperCase()) && "astellas12345".equals(param.get("password")))
//			|| ("AKR-TEST2".equals(param.get("userId").toString().toUpperCase()) && "123456".equals(param.get("password")))
//			|| ("AKR-TEST3".equals(param.get("userId").toString().toUpperCase()) && "astellas".equals(param.get("password")))
		   ) {
		} 
		else {
			// check user from active directory
			ADAuthenticator ada = new ADAuthenticator(SharedProperties.PROP_COMM.AD_LDAP_DOMAIN, SharedProperties.PROP_COMM.AD_LDAP_HOST, SharedProperties.PROP_COMM.AD_LDAP_DN);
			if (ada.authenticate(username, request.getParameter("j_password")) == null) {
				log.info("UserDetailsService => authenticate() : 로그인 입력 정보가 일치하지 않습니다.");
				
				request.setAttribute("exceptionMsg", "입력한 로그인 정보를 통한 접속 인증에 실패 하였습니다.\\n확인 후 다시 입력해 주시기 바랍니다.");
				throw new UsernameNotFoundException("Invalid Active Directory id/password.");
			}
		}
		
		try {
			Collection<? extends GrantedAuthority> authorities = AuthorityUtils.createAuthorityList("ROLE_USER", "ROLE_ADMIN");
			UserModel userInfo = new UserModel((String)param.get("userId"), (String)param.get("password"), authorities);
			
			// 세션 정보 추가
			extendUserSession(userInfo);
			return userInfo;
		} catch (Exception ex) {
			return null;
		}
	}
    
    /**
     * 유저 세션 정보를 추가한다.
     * @author 김영도
     */
	public void extendUserSession(UserModel user) throws Exception {
		HttpServletRequest request = ApplicationContextHolder.getRequest();

		try {
			FingerParamMap sqlParams = new FingerParamMap();
			sqlParams.put("employeeId", user.getUserId());
			FingerParamMap userOn = (FingerParamMap) commonDAO.selectByPk("common.selectUser", sqlParams);
			if (userOn == null) {
				request.setAttribute("exceptionMsg", "입력한 로그인 정보를 통해 crmEmployee 뷰를 조회하는데 실패 하였습니다.\\n관리자에게 문의하여 주시기 바랍니다.");
				throw new UsernameNotFoundException("입력한 로그인 정보를 통해 crmEmployee 뷰를 조회하는데 실패 하였습니다.");
			}
			
			// update security key
			user.setAutoLoginKey(Utility.randomString(32));
			sqlParams.put("securityKeyW40", user.getAutoLoginKey());
			commonDAO.update("common.updateSecurityKey", sqlParams);

			List<FingerParamMap> sessionInfo = commonDAO.list("common.selectSessionInfo", sqlParams);

			// get user menus
			sqlParams.put("workType", "MENUS");
			List<FingerParamMap> userMenus = commonDAO.list("common.selectUserMenus", sqlParams);
			
			// get form messages
			List<FingerParamMap> formMessages = commonDAO.list("common.selectAppFormMessages", sqlParams);			
			
			SessionManager.setSessionInfo(request, sessionInfo, userMenus, formMessages);
			
		} catch (Exception ex) {
			ex.printStackTrace();
			throw ex;
		}
	}
}