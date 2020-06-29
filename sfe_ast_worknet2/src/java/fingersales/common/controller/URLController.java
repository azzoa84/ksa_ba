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

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;

import fingersales.common.constants.CommConst;
import fingersales.common.model.UserModel;
import fingersales.common.service.GeoCodingService;
import fingersales.common.util.FingerParamMap;
import fingersales.common.util.QueryResult;
import fingersales.common.util.Utility;
import fingersales.common.view.ExcelDownloadViewSXSSF;


/**  
* @Class Name : URLController.java
* @Description : 논 시큐리티(미인증) URL 처리를 위한 컨트롤러 
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
public class URLController extends SWNBaseControler {
	
    /**
     * 프린트(출력) 공용 페이지를 호출한다.
     */
    @RequestMapping(value="/print.do")
    public String movePage(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
    	return "/print";
    }
	
	@RequestMapping(value = "/sysMenuAccessLog.do")
	public ResponseEntity<String> getMySmartLoginKey(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		FingerParamMap params = Utility.getSimpleRequestMap(request);
		params.put("userId", Utility.getSessionAttribute(session, CommConst.SESS_USER_ID));
		commonDAO.insert("common.sysMenuAccessLog", params);
		
		FingerParamMap resultMap = new FingerParamMap();
		resultMap.put("result", true);
		return Utility.getJSONResponse(resultMap);
	}

	@RequestMapping(value = "/GeoCoding.do")
	public ResponseEntity<String> getGeoCode(HttpServletRequest request, HttpServletResponse response, HttpSession session){
		log.info(request.getSession().getAttribute("localkey"));
		GeoCodingService svc = new GeoCodingService(request.getServerName(), request.getSession().getAttribute("localkey").toString(), request.getParameter("address"));
		return new ResponseEntity<String>(svc.getGeoCode(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/GeoCodingKakao.do")
	public ResponseEntity<String> getGeoCodeKakao(HttpServletRequest request, HttpServletResponse response, HttpSession session){
		log.info("GeoCodingKakaoService start : addr2coord");
		GeoCodingService svc = new GeoCodingService(request);
		return new ResponseEntity<String>(svc.getGeoCodeKakao(), HttpStatus.OK);
	}
	
	@RequestMapping(value={"/SWNAjaxXL.do", "/sso/SWNAjaxXL.do"},  method = RequestMethod.GET)
	public ExcelDownloadViewSXSSF downloadXL(HttpServletRequest request, ModelMap model) throws Exception 
	{		
		ArrayList<QueryResult> result = super.requestProcCall("", request);
		model.addAttribute("XL", result);
		model.addAttribute("filename", request.getParameter("file_name"));
		
		return new ExcelDownloadViewSXSSF();
	}
	
	/*
	@RequestMapping(value = "/business/convertRtfToHtml.do")
	public ResponseEntity<String> convertRtfToHtml(HttpServletRequest request, HttpServletResponse response) throws Exception {
		FingerParamMap map = Utility.getSimpleRequestMap(request);

		URL url = null;
		HttpURLConnection conn = null;

		BufferedReader in = null;
		//OutputStream out = null;
		StringBuffer sb = null;
		
		try {
			String wfDocId = (String) map.get("wf_doc_id");
			url = new URL("http://localhost:80/SmartWorknetIS/convertRtfToHtmlDevExpress.aspx?" + wfDocId);

			conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

			String headerType = conn.getContentType();
			if (headerType != null && headerType.toUpperCase().indexOf("UTF-8") != -1) {
				in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
			} else {
				in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "EUC-KR"));
			}

			sb = new StringBuffer();
			String read = null;
			while ((read = in.readLine()) != null) {
				sb.append(read);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (conn != null) { conn.disconnect(); }
			if (in != null) { in.close(); }
		}
		return Utility.getPureJSONResponse(sb.toString());
	}	
	*/
}
