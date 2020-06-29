package fingersales.common.service;

import java.util.List;

import org.apache.commons.io.FilenameUtils;
import org.springframework.web.multipart.MultipartFile;

import fingersales.common.constants.CommConst;
import fingersales.common.util.FingerParamMap;

@SuppressWarnings("unchecked")
public class FileUploadService extends AbstractFileUploadService {
	
	@Override
	protected int getNewFileId(MultipartFile file, PathInfo savePath) {
		List<FingerParamMap> saveResult;
		FingerParamMap param = new FingerParamMap();
		param.put(CommConst.DIRECT_SP_NAME, DirectSP.P_sysAttachFiles_S);
		param.put(CommConst.DIRECT_SP_PARAM,
				new String[] {
					"N", 
					"0", 
					file.getOriginalFilename(), 
					savePath.getSaveURL(), 
					FilenameUtils.getExtension(file.getOriginalFilename()),
					String.valueOf(file.getSize()), 
					request.getSession().getAttribute("UserID").toString()} 
		);
		
		saveResult = (List<FingerParamMap>) commonDAO.selectByPk(ServiceMap.getQueryId(ServiceMap.AJAX_DIRECT_SP), param);
		
		if(saveResult.size() > 0) return Integer.valueOf((saveResult.get(0).get("new_id").toString()));
		else return 0;
	}

	@Override
	public String getResultScript() {
		StringBuffer buff = new StringBuffer();
		
		try{
			buff.append("<script>\n");
			buff.append(String.format("	var result = %s;\n",  new String(result.getJsonString().getBytes("UTF-8"), "ISO-8859-1")));
			buff.append("	parent.closeCurrentWindow(result);\n");
			buff.append("</script>");
			return buff.toString();
		}catch(Exception ex){
			return "<script> var result = {};</script>";
		}
	}
}
