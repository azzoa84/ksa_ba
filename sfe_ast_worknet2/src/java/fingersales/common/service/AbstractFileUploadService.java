package fingersales.common.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.multipart.MultipartFile;

import fingersales.common.constants.SharedProperties;
import fingersales.common.dao.CommonDAO;
import fingersales.common.model.FileUploadForm;
import fingersales.common.model.UploadResult;
import fingersales.common.util.FingerParamMap;

public abstract class AbstractFileUploadService{
	protected UploadResult result;
	protected Log log = LogFactory.getLog(this.getClass());
	
	private final static HashMap<String, String> FILE_SUB_CATEGORY = new HashMap<String, String>();
	static
    {
		// 기안문서
		FILE_SUB_CATEGORY.put("WFFileAttatch", "/WFFileAttatch");
		
		// 윤리강령
		FILE_SUB_CATEGORY.put("MOR", "/MOR");
		
		// 시스템프로젝트 파일
		FILE_SUB_CATEGORY.put("SystemProjectFiles", "/SystemProjectFiles");
		
		// 기타
		FILE_SUB_CATEGORY.put("CT", "/CT");
		FILE_SUB_CATEGORY.put("QA", "/QA");
		FILE_SUB_CATEGORY.put("CPFiles", "/CPFiles");
		FILE_SUB_CATEGORY.put("CPImages", "/CPImages");
		FILE_SUB_CATEGORY.put("CPReviewFiles", "/CPReviewFiles");
		FILE_SUB_CATEGORY.put("ConfFiles", "/ConfFiles");
		FILE_SUB_CATEGORY.put("CPCommunicationFiles", "/CPCommunicationFiles");
		FILE_SUB_CATEGORY.put("HRFiles", "/HRFiles");
		FILE_SUB_CATEGORY.put("SelfIntroFiles", "/SelfIntroFiles");
		FILE_SUB_CATEGORY.put("DeptFiles", "/DeptFiles");
		FILE_SUB_CATEGORY.put("RequestFiles", "/RequestFiles");
		FILE_SUB_CATEGORY.put("SlipFileAttatch", "/SlipFileAttatch");
		FILE_SUB_CATEGORY.put("PostFiles", "/PostFiles");
		FILE_SUB_CATEGORY.put("SohwaCommunicationFiles", "/SohwaCommunicationFiles");
		FILE_SUB_CATEGORY.put("MedicalFiles", "/MedicalFiles");
    }

	protected class PathInfo{
		final String originName, logicalPath, physicalPath, saveName;
		String params;
		
		PathInfo(String logical, String physical, String originName, String saveName) {
			this.logicalPath = logical;
			this.physicalPath = physical;
			this.originName = originName;
			this.saveName = saveName;
		}
		
		String getSaveURL() {
			return String.format("%s%s", logicalPath, saveName);
		}
		
		String getSavePath() {
			return String.format("%s/%s", physicalPath, saveName);
		}
		
		String getOriginalName() {
			return this.originName;
		}
		
		String getSaveName() {
			return this.saveName;
		}
	}

	CommonDAO commonDAO;
	FileUploadForm fileUploadForm;
	List<MultipartFile> files;
	HttpServletRequest request;
	
	ArrayList<String> imgNameList;
	ArrayList<String> imgNameUrlList;
	String fileType;
	
	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}

	public void setCommonDAO(CommonDAO commonDAO) {
		this.commonDAO = commonDAO;
	}
	
	public void setFileUploadForm(FileUploadForm fileUploadForm){
		this.fileUploadForm = fileUploadForm;
	}

	public void setFiles(List<MultipartFile> files){
		this.files = files;
	}
	
	public List<MultipartFile> getFiles() {
		return files;
	}
	
	public AbstractFileUploadService(){
		
	}
	
	
	public UploadResult saveFiles(){
		int fileId;
		PathInfo uploadInfo;
		this.result = new UploadResult();
		
		ArrayList<FingerParamMap> resultList = new ArrayList<FingerParamMap>();
		FingerParamMap rsMap = null;
		
		for (int i = 0; i < files.size(); i++) {
			MultipartFile file = files.get(i);
			if (!file.isEmpty()) {
				uploadInfo = getUploadPath(file.getOriginalFilename());
				
				if ((fileId = saveFile(file, uploadInfo)) > 0) {
					rsMap = new FingerParamMap();
					rsMap.put("file_id", String.valueOf(fileId));
					rsMap.put("file_url", uploadInfo.getSaveURL());
					rsMap.put("file_size", String.valueOf(file.getSize()));
					rsMap.put("server_path", uploadInfo.logicalPath);
					rsMap.put("server_fname", uploadInfo.saveName);
					rsMap.put("local_fname", uploadInfo.originName);
					
					resultList.add(rsMap);
				}
			}
		}
		
		if (resultList.size() > 0) {
			this.result.setResultJson(resultList, "MSG0000", "정상적으로 처리되었습니다.", "");
		} else {
			this.result.setResultJson(resultList, "ERR0000", "처리하는 도중 오류가 발생하였습니다.", "");	
		}
		
		return this.result;
	}
	
	public UploadResult setResult(){
		int fileId;
		PathInfo uploadInfo;
		this.result = new UploadResult();
		
		ArrayList<FingerParamMap> resultList = new ArrayList<FingerParamMap>();
		FingerParamMap rsMap = null;
		
		for (int i = 0; i < files.size(); i++) {
			MultipartFile file = files.get(i);
			if (!file.isEmpty()) {
				uploadInfo = getUploadPath(file.getOriginalFilename());
				
				if ((fileId = saveFile(file, uploadInfo)) > 0) {
					rsMap = new FingerParamMap();
					rsMap.put("file_id", String.valueOf(fileId));
					rsMap.put("file_url", uploadInfo.getSaveURL());
					rsMap.put("server_path", uploadInfo.logicalPath);
					rsMap.put("server_fname", uploadInfo.saveName);
					rsMap.put("local_fname", uploadInfo.originName);
					/*rsMap.put("img_url_list", ((PdfToImageService)this).imgNameUrlList);
					rsMap.put("img_name_list", ((PdfToImageService)this).imgNameList);
					rsMap.put("file_type", ((PdfToImageService)this).fileType);*/
					rsMap.put("img_url_list", imgNameUrlList);
					rsMap.put("img_name_list", imgNameList);
					rsMap.put("file_type", fileType);

					resultList.add(rsMap);
				}
			}
		}
		
		if (resultList.size() > 0) {
			this.result.setResultJson(resultList, "MSG0000", "정상적으로 처리되었습니다.", "");
		} else {
			this.result.setResultJson(resultList, "ERR0000", "처리하는 도중 오류가 발생하였습니다.", "");	
		}
		
		return this.result;
	}
	
	/*public UploadResult excelFiles(){
		int fileId;
		PathInfo uploadInfo;
		this.result = new UploadResult();
		
		ArrayList<FingerParamMap> resultList = new ArrayList<FingerParamMap>();
		FingerParamMap rsMap = null;
		
		for (int i = 0; i < files.size(); i++) {
			MultipartFile file = files.get(i);
			if (!file.isEmpty()) {
				uploadInfo = getUploadPath(file.getOriginalFilename());
				
				if ((fileId = saveFile(file, uploadInfo)) > 0) {
					rsMap = new FingerParamMap();
					rsMap.put("file_id", String.valueOf(fileId));
					rsMap.put("file_url", uploadInfo.getSaveURL());
					rsMap.put("file_size", String.valueOf(file.getSize()));
					rsMap.put("server_path", uploadInfo.logicalPath);
					rsMap.put("server_fname", uploadInfo.saveName);
					rsMap.put("local_fname", uploadInfo.originName);
					
					resultList.add(rsMap);
				}
			}
		}
		
		if (resultList.size() > 0) {
			this.result.setResultJson(resultList, "MSG0000", "정상적으로 처리되었습니다.", "");
		} else {
			this.result.setResultJson(resultList, "ERR0000", "처리하는 도중 오류가 발생하였습니다.", "");	
		}
		
		return this.result;
	}*/
	
	private PathInfo getUploadPath(String originName){
		File fDir; 
		Calendar today = Calendar.getInstance();
		//ServletContext ctx = request.getServletContext();
		
		String subDir = FILE_SUB_CATEGORY.get(fileUploadForm.getFileCategory()) == null ? "" : FILE_SUB_CATEGORY.get(fileUploadForm.getFileCategory());
		
		final String uploadRoot = "/ServerFiles" + subDir;
		String logicalPath, physicalPath;
		
		logicalPath = String.format("%s/%d/%02d/"
				, uploadRoot
				, today.get(Calendar.YEAR)
				, today.get(Calendar.MONTH) + 1);
		
		physicalPath = SharedProperties.PROP_COMM.UPLOAD_FILE_PATH + logicalPath;
		//System.out.println("Upload Path : " + physicalPath);
		
		fDir = new File(physicalPath);
		if(!fDir.exists()) fDir.mkdirs();
		
		String saveName = getServerFileName(physicalPath, originName);
		// 파일명으로 사용되서는 안되는 특수기호 제거
		saveName = saveName.replaceAll("[\\\\/:#*?+\"<>|]", "");
		return new PathInfo(logicalPath, physicalPath, originName, saveName);
	}
	
	private String getServerFileName(String physicalPath, String originName) {
		if (!new File(physicalPath + originName).exists()) {
			return originName;
		}
		
		int counter = 1;
		String fileName = FilenameUtils.getBaseName(originName);
		String fileExt = FilenameUtils.getExtension(originName);
		String convFileName = fileName + "." + fileExt;
		
		while (new File(physicalPath + convFileName).exists()) {
			convFileName = (fileName + "_" + String.valueOf(counter)) + "." + fileExt;
			counter++;
		}
		return convFileName;
	}
	
	private int saveFile(MultipartFile file, PathInfo savePath){
		try{
			int iRead;
			byte[] buff = new byte[4096];
			InputStream in = file.getInputStream();
			File saveFile = new File(savePath.getSavePath());
			FileOutputStream out = new FileOutputStream(saveFile);
			while((iRead = in.read(buff)) > 0) out.write(buff, 0, iRead);
			out.close();
			in.close();
			return getNewFileId(file, savePath);
		}catch(Exception ex){
			log.info(ex.toString());
			log.info(ex.getMessage());
			ex.printStackTrace();
		}
		return 0;
	}
	
	protected abstract int getNewFileId(MultipartFile file, PathInfo savePath);

	public abstract String getResultScript();
	
}
