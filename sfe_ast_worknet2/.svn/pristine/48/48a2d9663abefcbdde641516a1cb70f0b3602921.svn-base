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
package fingersales.common.model;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

/**  
 * @Class Name : UserModel.java
 * @Description : UserModel Class
 * @Modification Information  
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2014.02.10           최초생성
 * 
 * @author francisco
 * @since 2014.02.10
 * @version 1.0
 * @see
 * 
 *  Copyright (C) by MOPAS All right reserved.
 */
public class UserModel extends User {
	private static final long serialVersionUID = 1L;

	public UserModel(String userName, String password, Collection<? extends GrantedAuthority> authorities) {
		super(userName, password, true, true, true, true, authorities);
		this.userId = userName;
	}

	private String userId;
    private String autoLoginKey;

	public String getUserId()
	{
		return userId;
	}

	public void setUserId(String userId)
	{
		this.userId = userId;
	}

	public String getAutoLoginKey()
	{
		return autoLoginKey;
	}

	public void setAutoLoginKey(String autoLoginKey)
	{
		this.autoLoginKey = autoLoginKey;
	}
}
