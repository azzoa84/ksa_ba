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
package fingersales.common.filter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class AuthenticationProcessingFilter extends UsernamePasswordAuthenticationFilter {
	@Override 
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
		/**
		 *
		 * 클래스 현재 사용안함
		 * 
		 */
		Authentication authentication = null;
		try {
            authentication = super.attemptAuthentication(request, response);
            if (authentication.isAuthenticated()) {
            	String key = "";
            	for (int i = 0; i < 32; i++) {
            		key += String.valueOf(((int)(Math.random() * 10)));
            	}
                Cookie cookie = new Cookie("autokey", key);      
                response.addCookie(cookie);            
            } 
    	} catch (Exception e) {
    		e.printStackTrace();
    	}

        return authentication;
    } 
}