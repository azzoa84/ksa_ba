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

import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import fingersales.common.model.UserModel;
import fingersales.common.service.MailService;
import fingersales.common.service.MailVO;
import fingersales.common.util.FingerParamMap;
import fingersales.common.util.Utility;

/**  
* @Class Name : MailController.java
* @Description : 메일 발송 컨트롤러
* @Modification Information  
* @
* @  수정일      수정자              수정내용
* @ ---------   ---------   -------------------------------
* 
* @author 김영도
* @since 2016.09.07
* @version 1.0
* @see
* 
*  Copyright (C) by MOPAS All right reserved.
*/
@Controller
@SessionAttributes(types = UserModel.class)
public class MailController extends SWNBaseControler {
	
	/** CommonProperties */
	@Resource(name = "propComm")
	private Properties propComm;
	
    @Resource(name = "MailService")
    private MailService mailService;	

	@RequestMapping(value = "/sendMail.do")
	public ResponseEntity<String> sendMail(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		FingerParamMap map = Utility.getSimpleRequestMap(request);
		
		String fromAddr, fromAddrPs;
		if (map.get("fromAddr") == null || map.get("fromAddr").equals("")) {
			fromAddr = propComm.getProperty("mail.host.addr");
			fromAddrPs = propComm.getProperty("mail.host.addrps");
		} else {
			fromAddr = map.get("fromAddr").toString();
			fromAddrPs = map.get("fromAddrPs") != null ? map.get("fromAddrPs").toString() : "";
		}
		
		MailVO mailVO = new MailVO(fromAddr, fromAddrPs, map.get("toAddr").toString(), map.get("toAddrPs").toString());
		
		if (map.get("ccAddr") != null && !map.get("ccAddr").equals("")) {
			mailVO.setCcAddr(map.get("ccAddr").toString());
			mailVO.setCcAddrPs(map.get("ccAddrPs") != null ? map.get("ccAddrPs").toString() : "");
		}
		if (map.get("bccAddr") != null && !map.get("bccAddr").equals("")) {
			mailVO.setCcAddr(map.get("bccAddr").toString());
			mailVO.setCcAddrPs(map.get("bccAddrPs") != null ? map.get("bccAddrPs").toString() : "");
		}
		mailVO.setSubject(map.get("subject").toString());
		mailVO.setContentAsHtml(map.get("contents").toString());
		
		// 메일 발송
		int result = mailService.sendMail(mailVO);
		
		FingerParamMap resultMap = new FingerParamMap();
		resultMap.put("result", (result > 0 ? true : false));
		
		return Utility.getJSONResponse(resultMap);
	}
	
}
