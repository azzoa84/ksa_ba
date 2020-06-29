package fingersales.defined.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import fingersales.common.dao.CommonDAO;
import fingersales.common.model.UserModel;
import fingersales.defined.service.FileZipDownloadCpExpenseFiles;
import fingersales.defined.service.FileZipDownloadCpFiles;

@RequestMapping("/zipfile")
@Controller
@SessionAttributes(types = UserModel.class)
public class FileZipDownloadController
{
	protected Logger log = LoggerFactory.getLogger(this.getClass());
	
	/** CommonDAO */
    @Resource(name="commonDAO")
    protected CommonDAO commonDAO;	
	
    /**
     * 지출보고서 증빙자료에 대한 일괄 다운로드
     * @param request 조회할 정보가 담긴 HttpServletRequest
     * @param model
     * @return json
     * @exception Exception
     */
    @RequestMapping(value = "/downloadCpExpenseFiles.do")
    public FileZipDownloadCpExpenseFiles downloadCpExpenseFiles(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
    	model.put("DAO", commonDAO);
    	
		return new FileZipDownloadCpExpenseFiles();
    }
	
	@RequestMapping(value = "/downloadCpFiles.do")
    public FileZipDownloadCpFiles downloadCpFiles(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
    	model.put("DAO", commonDAO);
    	
		return new FileZipDownloadCpFiles();
    }
	
}
