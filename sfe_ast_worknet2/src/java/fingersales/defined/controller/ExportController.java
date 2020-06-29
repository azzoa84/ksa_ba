package fingersales.defined.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import fingersales.common.model.UserModel;
import fingersales.defined.service.CreateProcessMediaFile;
import fingersales.defined.service.ExportScheduleForOutlookService;

@RequestMapping("/export")
@Controller
@SessionAttributes(types = UserModel.class)
public class ExportController
{
    /**
     * 스케줄 .ics 파일로 내보내기
     * @param request 조회할 정보가 담긴 HttpServletRequest
     * @param model
     * @return json
     * @exception Exception
     */
    @RequestMapping(value = "/exportSchedule.do")
    public ExportScheduleForOutlookService exportSchedule(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		return new ExportScheduleForOutlookService();
    }
    
    /**
     * 전산매체 파일 생성 
     * @param request 조회할 정보가 담긴 HttpServletRequest
     * @param model
     * @return bool
     * @exception Exception
     */
    @RequestMapping(value = "/createProcessMediaFile.do")
    public CreateProcessMediaFile createFile(HttpServletRequest request, ModelMap model) throws Exception {
    	return new CreateProcessMediaFile();
    }
}
