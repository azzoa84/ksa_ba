package fingersales.common.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.codec.Base64;
import org.springframework.stereotype.Service;

import fingersales.common.constants.CommConst;
import fingersales.common.constants.SharedProperties;
import fingersales.common.dao.CommonDAO;
import fingersales.common.model.UploadResult;
import fingersales.common.util.FingerParamMap;
import fingersales.common.util.ImageUtil;
import fingersales.common.util.ImageUtil.Rotation;

/**
 * 이미지 업로드
 * 사이즈 조정, 앵글 조정 추가
 * 
 * @author philipp
 */
@Service("ImageUploadService")
public class ImageUploadService {
	protected final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	private final static HashMap<String, String> FILE_SUB_CATEGORY = new HashMap<String, String>();
	static
    {
		FILE_SUB_CATEGORY.put("NONE", "");
		FILE_SUB_CATEGORY.put("CPImages", "/CPImages");
		FILE_SUB_CATEGORY.put("SIGN_IMAGE", "/signature");
		FILE_SUB_CATEGORY.put("HUSKY_EDITOR_IMAGE", "/huskyEditorImage");
    }
	
	private String getUploadPath(String fileCategory) throws Exception {
		File fDir;
		Calendar today = Calendar.getInstance();
		//ServletContext ctx = request.getServletContext();
		
		String subDir = FILE_SUB_CATEGORY.get((fileCategory == null ? "NONE" : fileCategory));
		
		final String uploadRoot = "/ServerFiles" + subDir;
		String logicalPath, physicalPath;
		
		logicalPath = String.format("%s/%d/%02d/"
				, uploadRoot
				, today.get(Calendar.YEAR)
				, today.get(Calendar.MONTH) + 1);
		
		physicalPath = SharedProperties.PROP_COMM.UPLOAD_FILE_PATH + logicalPath;

		fDir = new File(physicalPath);
		if(!fDir.exists()) fDir.mkdirs();
		
		return physicalPath;
	}
	
	/**
	 * Base64 코드 파라메터로 넘어온 이미지를 업로드
	 * @param request
	 * @return 파일 업로드 결과
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public UploadResult uploadBase64(HttpServletRequest request, CommonDAO commonDAO) {
		UploadResult result = new UploadResult();
		int fileId;
		
		ArrayList<FingerParamMap> resultList = new ArrayList<FingerParamMap>();
		FingerParamMap param = new FingerParamMap();
		FingerParamMap rsMap = null;
		
		Calendar today = Calendar.getInstance();
		
		try {
			int i = 0;
			
			while (true) 
			{
				String fileCategory = request.getParameter(("category" + i));
				String base64Code = request.getParameter(("image" + i));
				
				String imageName = request.getParameter(("image_name" + i));
				String angle = request.getParameter(("image_angle" + i));
				if (angle == null) {
					angle = "0";
				}
				String sizeW = request.getParameter(("image_size_w" + i));
				String sizeH = request.getParameter(("image_size_h" + i));
				String imageDate = request.getParameter(("image_date" + i));
				i++;
				
				if (base64Code == null || imageName == null) {
					break;
				}
				if (imageDate == null) {
					imageDate = String.format("%d%02d%02d", today.get(Calendar.YEAR), today.get(Calendar.MONTH) + 1, today.get(Calendar.DATE));
				}
				String orgFileName = imageName;
				String orgFileExt = FilenameUtils.getExtension(orgFileName);				
				
				byte[] imgBytes = Base64.decode(base64Code.getBytes());
				InputStream inStream = new ByteArrayInputStream(imgBytes);
				
				// 이미지 처리
				BufferedImage img = ImageIO.read(inStream);
				
				// 사이즈 변경 적용
				if (sizeW != null || sizeH != null) {
					img = ImageUtil.resize(img, (sizeW != null ? Integer.valueOf(sizeW) : img.getWidth()), (sizeH != null ? Integer.valueOf(sizeH) : img.getHeight()));
				}
				
				if (Integer.valueOf(angle) > 0) {
					// 앵글 값 적용
					if (Integer.valueOf(angle) == 90) {
						img = ImageUtil.rotate(img, Rotation.CW_90);
					} else if (Integer.valueOf(angle) == 180) {
						img = ImageUtil.rotate(img, Rotation.CW_180);
					} else if (Integer.valueOf(angle) == 270) {
						img = ImageUtil.rotate(img, Rotation.CW_270);
					}					
				}
				// 이미지 처리 End.
				
				String savePath = String.format("%d/%02d", today.get(Calendar.YEAR), today.get(Calendar.MONTH) + 1);
				String saveFullPath = getUploadPath(fileCategory);
				
				String genId = UUID.randomUUID().toString().substring(0, 8);
				String saveFileName = (imageDate == null ? genId : (imageDate + "_" + genId));
				String saveFileUrl = String.format("/%s/%s.%s", saveFullPath, saveFileName, orgFileExt);
				ImageIO.write(img, orgFileExt, new File(saveFileUrl));
				
				param.put(CommConst.DIRECT_SP_NAME, DirectSP.P_sysAttachFiles_S);
				param.put(CommConst.DIRECT_SP_PARAM,
						new String[] {
							"N", 
							"0", 
							orgFileName,
							String.format("/%s/%s.%s", savePath, saveFileName, orgFileExt),
							orgFileExt,
							String.valueOf(imgBytes.length), 
							request.getSession().getAttribute("UserID").toString()
						}
				);
				
				List<FingerParamMap> saveResult = (List<FingerParamMap>) commonDAO.selectByPk(ServiceMap.getQueryId(ServiceMap.AJAX_DIRECT_SP), param);
				if (saveResult.size() > 0) {
					if ((fileId = Integer.valueOf((saveResult.get(0).get("new_id").toString()))) > 0) {
						rsMap = new FingerParamMap();
						rsMap.put("file_id", String.valueOf(fileId));
						rsMap.put("file_url", String.format("%s/%s.%s", savePath, saveFileName, orgFileExt));
						rsMap.put("file_size", String.valueOf(imgBytes.length));
						rsMap.put("server_path", String.format("/%s/%s.%s", savePath, saveFileName, orgFileExt));
						rsMap.put("server_fname", String.format("%s.%s", saveFileName, orgFileExt));
						rsMap.put("local_fname", orgFileName);
						
						resultList.add(rsMap);
					}
				}
				inStream.close();
			}
			
			if (resultList.size() > 0) {
				result.setResultJson(resultList, "MSG0000", "정상적으로 처리되었습니다.", "");
			} else {
				result.setResultJson(resultList, "ERR0000", "처리하는 도중 오류가 발생하였습니다.", "");	
			}
			
		} catch (Exception ex) {
			ex.printStackTrace();
			logger.error(this.getClass().getName() + "=> uploadBase64() : Base64 파일업로드 중 오류가 발생 하였습니다.");
			
			result.setResultJson(resultList, "ERR0000", "처리하는 도중 오류가 발생하였습니다.", "");
		}
		
		return result;
	}	
}