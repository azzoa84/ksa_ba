package fingersales.defined.service;

import java.io.FileInputStream;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipException;
import java.util.zip.ZipOutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.view.AbstractView;

import fingersales.common.constants.CommConst;
import fingersales.common.constants.SharedProperties;
import fingersales.common.dao.CommonDAO;
import fingersales.common.service.DirectSP;
import fingersales.common.service.ServiceMap;
import fingersales.common.util.FingerParamMap;
import fingersales.common.util.Utility;
 
public class FileZipDownloadCpExpenseFilesBak extends AbstractView {
	protected Logger log = LoggerFactory.getLogger(this.getClass());
	
	private CommonDAO dao = null;
	
	public FileZipDownloadCpExpenseFilesBak() {
		setContentType("application/zip");
	}
	
	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		FingerParamMap m = Utility.getSimpleRequestMap(request);
		dao = (CommonDAO)model.get("DAO");
		
		m.put("DeptCode", request.getSession().getAttribute("DeptCode").toString());
		m.put("UserID", request.getSession().getAttribute("UserID").toString());
		
		// 다운로드 목록 조회
		List<FingerParamMap> rs = getFileDownloadList(m).get(0);
		
		String strUploadDir = SharedProperties.PROP_COMM.UPLOAD_FILE_PATH;
		
		response.setContentType(getContentType());
		response.setHeader("Content-Disposition", "attachment; filename=\""+ URLEncoder.encode("근거자료일괄다운로드", "utf-8") +".zip"+"\";");
		
		byte[] buf = new byte[4096];
		ZipOutputStream zipOut = new ZipOutputStream(response.getOutputStream()); //new ZipOutputStream(new FileOutputStream(strUploadDir + File.separator + strNow + ".zip"));
		
		int exceptionNum = 1;
		try
		{
			if (rs != null && rs.size() != 0) 
			{
				for (int i = 0; i < rs.size(); i++)
				{
					FingerParamMap o = rs.get(i);
					ZipEntry entry = null;
					FileInputStream fileIn = null;
					
					String filePath = strUploadDir + o.get("server_path").toString();
					
					try { fileIn = new FileInputStream(filePath); }
					catch(Exception e) { continue; }
					
					try
					{
						entry = new ZipEntry(o.get("local_path").toString());
						zipOut.putNextEntry(entry);
					}
					catch(ZipException e)
					{
						entry = new ZipEntry(o.get("local_path").toString().substring(0, o.get("local_path").toString().lastIndexOf(".")) + "_" + String.valueOf(exceptionNum) + o.get("local_path").toString().substring(o.get("local_path").toString().lastIndexOf("."), o.get("local_path").toString().length()));
						zipOut.putNextEntry(entry);
						exceptionNum++;
					} 
					finally
					{
						int intLen;
						while((intLen = fileIn.read(buf)) > 0)
						{
							zipOut.write(buf, 0, intLen);
						}
						zipOut.closeEntry();
						fileIn.close();
					}
				}
			}
			zipOut.finish();
			zipOut.flush();
			zipOut.close();
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
			log.info(ex.toString());
			log.info(ex.getMessage());
		}
	}
	
	@SuppressWarnings("unchecked")
	private List<List<FingerParamMap>> getFileDownloadList(FingerParamMap params) {
		List<List<FingerParamMap>> result;
		params.put(CommConst.DIRECT_SP_NAME, DirectSP.P_crmCPExpenseReportSubmit_Q);
		params.put(CommConst.DIRECT_SP_PARAM,
				new String[] {
					"Q_DOWNLOAD", 
					params.get("DeptCode").toString(),
					params.get("UserID").toString(),
					params.get("category").toString(),
					params.get("cp_date_fr").toString(),
					params.get("cp_date_to").toString(),
					params.get("contact_name").toString(),
					params.get("company_name").toString(),
					params.get("file_category").toString()
					}
		);
		
		result = (List<List<FingerParamMap>>) dao.list(ServiceMap.getQueryId(ServiceMap.AJAX_DIRECT_SP), params);
		return result;
	}
	
}
