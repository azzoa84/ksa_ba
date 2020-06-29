package fingersales.defined.service;

import java.io.FileInputStream;
import java.io.IOException;
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
 
public class FileZipDownloadCpFiles extends AbstractView {
	protected Logger log = LoggerFactory.getLogger(this.getClass());
	
	private CommonDAO dao = null;
	private String dirRoot = null;
	
	public FileZipDownloadCpFiles() {
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
		
		dirRoot = SharedProperties.PROP_COMM.UPLOAD_FILE_PATH;
		
		response.setContentType(getContentType());
		response.setHeader("Content-Disposition", "attachment; filename=\""+ URLEncoder.encode("첨부파일일괄다운로드", "utf-8") +".zip"+"\";");		
		
		// ByteArrayOutputStream byteOut = new ByteArrayOutputStream();
		// ZipOutputStream zipOut = new ZipOutputStream(byteOut); //new ZipOutputStream(new FileOutputStream(strUploadDir + File.separator + strNow + ".zip"));
		try ( ZipOutputStream zipStream = new ZipOutputStream(response.getOutputStream()) ) {
			rs.forEach(map -> addToZipFile(map, zipStream));
		}
		catch(Exception ex) {
			ex.printStackTrace();
			log.info("파일 압축 작업 진행 시 에러 발생");
		}
		log.info("CP 첨부파일 일괄 다운로드(zip) 완료.");
	}
	
	private void addToZipFile(FingerParamMap m, ZipOutputStream zipStream) {
		String realFilePath = m.get("server_path").toString();
		String zipFilePath = m.get("local_path").toString();
		
		if (realFilePath == null || realFilePath.equals("")) {
			return;
		}
		
		int exceptionNum = 1;
		String inputFileName = (dirRoot + realFilePath);
		
		try (FileInputStream inputStream = new FileInputStream(inputFileName)) {
			try {
				ZipEntry entry = new ZipEntry(zipFilePath);
				zipStream.putNextEntry(entry);
			}
			catch(ZipException e)
			{
				ZipEntry entry = new ZipEntry(zipFilePath.substring(0, zipFilePath.lastIndexOf(".")) + "_" + String.valueOf(exceptionNum) + zipFilePath.substring(zipFilePath.lastIndexOf("."), zipFilePath.length()));
				zipStream.putNextEntry(entry);
				exceptionNum++;
			}
			
			byte[] readBuffer = new byte[4096];
			int amountRead;
			//int written = 0;
			
			while ((amountRead = inputStream.read(readBuffer)) > 0) {
				zipStream.write(readBuffer, 0, amountRead);
				//written += amountRead;
			}
			//log.info("addToZipFile() Stored " + written + " bytes to " + inputFileName);
		}
		catch(IOException ex) {
			// 파일 미 존재 또는 권한 등의 이유로 접근 불가시 건너 뜀
			log.info("addToZipFile() 파일 없음 or 파일 접근불가 :: " + inputFileName);
		}
	}
	
	@SuppressWarnings("unchecked")
	private List<List<FingerParamMap>> getFileDownloadList(FingerParamMap params) {
		List<List<FingerParamMap>> result;
		params.put(CommConst.DIRECT_SP_NAME, DirectSP.P_crmCPMaster_Q);
		params.put(CommConst.DIRECT_SP_PARAM,
				new String[] {
					"FILE", 
					params.get("cp_date_fr").toString(),
					params.get("cp_date_to").toString(),
					"",
					params.get("category").toString(),
					"90",
					"",
					"",
					"",
					"",
					"",
					""
					}
		);
		
		result = (List<List<FingerParamMap>>) dao.list(ServiceMap.getQueryId(ServiceMap.AJAX_DIRECT_SP), params);
		return result;
	}
}
