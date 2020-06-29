package fingersales.common.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import fingersales.common.constants.CommConst;
import fingersales.common.dao.CommonDAO;
import fingersales.common.util.FingerParamMap;

public class FileDeleteService {
    protected Log log = LogFactory.getLog(this.getClass());
	
	int fileId;
	String filePath;
	CommonDAO commonDAO;
	
	public CommonDAO getCommonDAO() { return commonDAO; }
	
	public void setCommonDAO(CommonDAO commonDAO) { this.commonDAO = commonDAO; }
	
	public int getFileId() { return this.fileId; }
	public String getFilePath() { return this.filePath; }
	
	public void setFileId(int fileId) { this.fileId = fileId; }
	public void setFilePath(String filePath) { this.filePath = filePath; }
	
	@SuppressWarnings("unchecked")
	public boolean deleteFile(HttpServletRequest request) {
		try{
			List<FingerParamMap> list;
			FingerParamMap param = new FingerParamMap();
			
			param.put(CommConst.DIRECT_SP_NAME, DirectSP.P_sysAttachFiles_S);
			param.put(CommConst.DIRECT_SP_PARAM,
					new String[] {
						"D", 
						"", 
						"", 
						filePath, 
						"",
						"",
						request.getSession().getAttribute("UserID").toString()}  
			);
			
			list = commonDAO.list(ServiceMap.getQueryId(ServiceMap.AJAX_DIRECT_SP), param);
			if (1 == ((List<FingerParamMap>)list.get(0)).size()) return true;
			
		} catch(Exception ex) {
			ex.printStackTrace();
			return false;
		}
		return false;
	}
}
