package fingersales.common.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import fingersales.common.model.UserModel;
 /**  
 * @Class Name : AjaxControler.java
 * @Description : Ajax 컨트롤러
 * @Modification Information  
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * 
 * @author 김영도
 * @since 2014.04.08
 * @version 1.0
 * @see
 * 
 *  Copyright (C) by MOPAS All right reserved.
 */
@Controller
@SessionAttributes(types = UserModel.class)
public class AjaxControler extends SWNBaseControler{
    
	@RequestMapping(value = {"/business/SWNAjaxL.do", "/dev/SWNAjaxL.do", "/SWNAjaxL.do", "/business/{dSrc}/SWNAjaxL.do"})
    public ResponseEntity<String> callAjaxList(HttpServletRequest request, ModelMap model) throws Exception {
		return super.requestAjax("", request);
    }

	@RequestMapping(value = {"/business/SWNAjaxL.do", "/dev/SWNAjaxL.do", "/SWNAjaxL.do", "/business/{dSrc}/SWNAjaxL.do"}, params={"dsrc"})
    public ResponseEntity<String> callAjaxListCustom(HttpServletRequest request, ModelMap model) throws Exception {
		return super.requestAjax(request.getParameter("dsrc"), request);
    }
	
    @RequestMapping(value = {"/business/SWNAjaxN.do", "/dev/SWNAjaxN.do", "/SWNAjaxN.do"})
    public ResponseEntity<String> callAjaxNonQuery(HttpServletRequest request, ModelMap model) throws Exception {
    	return super.requestAjaxN(request);
    }
    
    @RequestMapping(value="/loginProc.do")
    public String damoLoginProcess(HttpServletRequest req, Model model){
    	return "/directLogin";
    }
}