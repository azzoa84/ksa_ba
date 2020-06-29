package fingersales.common.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import fingersales.common.service.ExportSafeNoticeService;
import fingersales.common.util.FingerParamMap;
import fingersales.common.view.SafeDownload;

 /**  
 * @Class Name : ExcelUploadController.java
 * @Description : 엑셀 업로드 컨트롤러
 * @Modification Information  
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * 
 * @author 김영도
 * @since 2016.09.09
 * @version 1.0
 * @see
 * 
 *  Copyright (C) by MOPAS All right reserved.
 */
@Controller
public class ExcelUploadController extends SWNBaseControler {
	
	/**
     * PV부작용 수집보고 엑셀 파일로 생성
     * @param request 조회할 정보가 담긴 HttpServletRequest
     * @param model
     * @return json
     * @exception Exception
     */
    @RequestMapping(value = "/excel/exportSafe.do", method = RequestMethod.POST)
    public ExportSafeNoticeService exportSafe(HttpServletRequest request, HttpServletResponse response, ModelMap model, 
    												@ModelAttribute("jsonData") String jsonStr) throws Exception 
    {
		return new ExportSafeNoticeService(jsonStr);
    }
    
    /**
     * PV부작용 수집보고 엑셀 파일로 다운로드
     * @param request 조회할 정보가 담긴 HttpServletRequest
     * @param model
     * @return json
     * @exception Exception
     */
    
    @RequestMapping(value = {"/excel/exportSafeDownload.do", "/exportSafeDownload.do"})
    public SafeDownload exportSafeDownload(HttpServletRequest request, ModelMap model) throws Exception {
    	return new SafeDownload();
    }
}