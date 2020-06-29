package fingersales.common.controller;

import java.io.File;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import fingersales.common.model.UserModel;
import fingersales.common.service.MailService;
import fingersales.common.service.MailVO;
import fingersales.common.service.PDFCprService;
import fingersales.common.util.FingerParamMap;
import fingersales.common.util.Utility;

/**  
 * @Class Name : PDFController.java
 * @Description : 
 * @Modification Information  
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * 
 * @author UBCare
 * @since 2018.03.13
 * @version 1.0
 * @see
 * 
 * Copyright (C) by UBCARE All right reserved.
 */
@Controller
@SessionAttributes(types = UserModel.class)
public class PDFController
{	
	protected Logger log = LoggerFactory.getLogger(this.getClass());
	
	/** CommonProperties */
	@Resource(name = "propComm")
	private Properties propComm;
	
    @Resource(name = "MailService")
    private MailService mailService;	
		
	/**
	 * PDF 미리보기 한다
	 */
	@RequestMapping("/pdf/openPdf.do")
	public void openPdf(HttpServletRequest request, HttpServletResponse response) throws Exception{
		FingerParamMap map = Utility.getSimpleRequestMap(request);
		PDFCprService cprService = new PDFCprService(request);
		cprService.openPdf(request, response, map);
	}
	
	/**
	 * PDF 파일 생성 후 암호화 작업 후  메일을 보낸다
	 * 
	 */
	@RequestMapping("/pdf/mailPdf.do")
	public ResponseEntity<String> sendMailPdf(HttpServletRequest request, HttpServletResponse response) throws Exception{
		FingerParamMap map = Utility.getSimpleRequestMap(request);
		FingerParamMap resultMap = new FingerParamMap();
		int result = 0;
		
		String fromAddr, fromAddrPs;
		
		if (map.get("fromAddr") == null || map.get("fromAddr").equals("")) {
			fromAddr = propComm.getProperty("mail.host.cprAddr");
			fromAddrPs = propComm.getProperty("mail.host.cprAddrps");
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
		
		String directYn = map.get("directYn").toString();
		
		if ("N".equals(directYn)) {
			String docYn = map.get("docYn").toString();
			
			// 해당 고객의 지출보고 내역이 있는 경우
			if ("Y".equals(docYn)) {
				String password = Utility.randomStringPw(8);
				String fileName = map.get("fileName").toString();
				
				map.put("fDir", propComm.getProperty("pdf.upload.path"));
				map.put("fileName", fileName + ".pdf");
				map.put("password", password);
						
				PDFCprService cprService = new PDFCprService(request);
				File file = cprService.createPdfFile(request, response, map);
				
				if (file != null && !"".equals(file)) {
					mailVO.setSubject(map.get("subjectPw").toString());
					
					String contents = map.get("contentsPw").toString();
					contents = contents.replace("#password#", password);
					mailVO.setContentAsHtml(contents);
					result = mailService.sendMail(mailVO);
					
					if (result > 0) {
						File[] f = {file};
						
						mailVO.setSubject(map.get("subject").toString());
						mailVO.setContentAsHtml(map.get("contents").toString());
						mailVO.setAttachedFiles(f);
						// 메일 발송
						result = mailService.sendMail(mailVO);
					}
					
					file.delete();
				}
			} else {
				mailVO.setSubject(map.get("subject").toString());
				mailVO.setContentAsHtml(map.get("contents").toString());
				// 메일 발송
				result = mailService.sendMail(mailVO);
			}
		} else {
			mailVO.setSubject(map.get("subject").toString());
			mailVO.setContentAsHtml(map.get("contents").toString());
			// 메일 발송
			result = mailService.sendMail(mailVO);
		}
		
		resultMap.put("resultType", (result > 0 ? true : false));
		return Utility.getJSONResponse(resultMap);
	}
}