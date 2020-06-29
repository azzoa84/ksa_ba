package fingersales.common.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import fingersales.common.model.FileUploadForm;
import fingersales.common.model.UploadResult;
import fingersales.common.model.UserModel;
import fingersales.common.service.AbstractFileUploadService;
import fingersales.common.service.ExcelDataUploadService;
import fingersales.common.service.FileDeleteService;
import fingersales.common.service.FileUploadService;
import fingersales.common.service.ImageChangeService;
import fingersales.common.service.ImageUploadService;
import fingersales.common.service.PdfToImageService;
import fingersales.common.util.FingerParamMap;
import fingersales.common.util.Utility;
import fingersales.common.view.FileDownload;

import java.net.URLEncoder;

 /**  
 * @Class Name : FileController.java
 * @Description : 파일 컨트롤러
 * @Modification Information  
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * 
 * @author 김성현
 * @since 2014.08.19
 * @version 1.0
 * @see
 * 
 *  Copyright (C) by MOPAS All right reserved.
 */
@Controller
@SessionAttributes(types = UserModel.class)
public class FileController extends SWNBaseControler{
	
	@RequestMapping(value = {"/business/fileDownload.do", "/fileDownload.do"})
    public FileDownload fileDownload(HttpServletRequest request, ModelMap model) throws Exception {
    	return new FileDownload();
    }
	
	@RequestMapping(value={"/common/fileDelete.do", "/fileDelete.do"})
	@ResponseBody
	public String fileDelete(HttpServletRequest request){
		FileDeleteService svc = new FileDeleteService();
		svc.setFilePath(request.getParameter("file_path"));
		svc.setCommonDAO(commonDAO);
		return String.valueOf(svc.deleteFile(request));
	}
	
	@RequestMapping(value={"/common/fileUpload.do", "/fileUpload.do"})
	@ResponseBody
	public void fileUpload(@ModelAttribute("uploadForm")FileUploadForm uploadForm, HttpServletResponse res, HttpServletRequest req, Model model){
		try{
			uploadFileProc(uploadForm, res, req, new FileUploadService(), "UPLOAD");
		}catch(Exception ex){
			log.info(ex);
		}
	}
	
	@RequestMapping(value = {"/common/excelUpload.do", "/excelUpload.do"})
	@ResponseBody
    public void excelDataUpload(@ModelAttribute("uploadForm")FileUploadForm uploadForm, HttpServletResponse res, HttpServletRequest req, Model model) {
    	try{
    		uploadFileProc(uploadForm, res, req, new ExcelDataUploadService(), "UPLOAD");
		}catch(Exception ex){
			log.info(ex);
		}
    }
	
	@RequestMapping(value = {"/common/pdfUpload.do", "/pdfUpload.do"})
	@ResponseBody
    public void pdfToImage(@ModelAttribute("uploadForm")FileUploadForm uploadForm, HttpServletResponse res, HttpServletRequest req, Model model) {
    	try{
    		String fileType = req.getParameter("fileType").toString();
    		
    		if ("PDF".equals(fileType)) {
    			uploadFileProc(uploadForm, res, req, new PdfToImageService(), "CONVERT");
    		} else {
    			uploadFileProc(uploadForm, res, req, new ImageChangeService(), "CONVERT");
    		}
		}catch(Exception ex){
			log.info(ex);
		}
    }

	@RequestMapping(value="/imageUploadBase64.do")
	public ResponseEntity<String> imageUploadBase64(HttpServletRequest req, HttpServletResponse res, Model model) {
		UploadResult result = new ImageUploadService().uploadBase64(req, commonDAO);
		return result.getJSONResponse();
	}

	private void uploadFileProc(FileUploadForm uploadForm,
			HttpServletResponse res, HttpServletRequest req,
			AbstractFileUploadService svc, String type) throws IOException,
			UnsupportedEncodingException {
		ServletOutputStream stm;
		svc.setFileUploadForm(uploadForm);
		svc.setFiles(uploadForm.getFiles());
		svc.setCommonDAO(commonDAO);
		svc.setRequest(req);
		
		if (!"CONVERT".equals(type))	svc.saveFiles();
		else							svc.setResult();
		
		res.setHeader("Content-Type", "text/html; charset=utf-8");
		
		stm = res.getOutputStream();
		stm.println(svc.getResultScript());
		stm.close();
	}
	
	@RequestMapping(value="/encodingURL.do")
	public ResponseEntity<String> getEncodingURL(HttpServletRequest req, HttpServletResponse res, Model model) {
		FingerParamMap map = Utility.getSimpleRequestMap(req);
		FingerParamMap resultMap = new FingerParamMap();
		
		int returnResult = 1000;
		String encodingType = map.get("encodingType").toString();
		String contents = "";
		contents = map.get("contents").toString();
				
		try {
			contents = URLEncoder.encode(contents, encodingType);
			contents = contents.replaceAll("\\+", "%20");
		} catch (UnsupportedEncodingException e) {
			returnResult = 9999;
			log.error("ERROR", e);
		} finally {
			resultMap.put("errorCode", returnResult);
			resultMap.put("contents", contents);
		}		
		
		return Utility.getJSONResponse(resultMap);
	}
}