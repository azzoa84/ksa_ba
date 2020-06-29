package fingersales.common.service;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.multipart.MultipartFile;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.MetadataException;
import com.drew.metadata.exif.ExifIFD0Directory;

import fingersales.common.constants.CommConst;
import fingersales.common.util.FingerParamMap;
import fingersales.common.util.ImageUtil;
import fingersales.common.util.ImageUtil.Rotation;

public class ImageChangeService extends AbstractFileUploadService {
	protected Log log = LogFactory.getLog(this.getClass());
	
	protected final static int IMAGE_WIDTH = 827;
	protected final static int IMAGE_HEIGHT = 1170;
	protected final static String FILE_TYPE = "IMG";
		
	@Override
	protected int getNewFileId(MultipartFile file, PathInfo savePath) {
		fileType = FILE_TYPE;
		int intResult = 0;
		
		File orgFile = new File(savePath.getSavePath());
		File outputFile = new File(savePath.getSavePath());
		
		try {
			int angle = 0;
			angle = getDegreeForOrientation(getOrientation(orgFile));
			
			String orgFileName = savePath.getSaveName();
			String orgFileExt = FilenameUtils.getExtension(orgFileName);	
									
			BufferedImage img = ImageIO.read(orgFile);
			
			if (angle == 90) {
				img = ImageUtil.rotate(img, Rotation.CW_90);
			} else if (Integer.valueOf(angle) == 180) {
				img = ImageUtil.rotate(img, Rotation.CW_180);
			} else if (Integer.valueOf(angle) == 270) {
				img = ImageUtil.rotate(img, Rotation.CW_270);
			}
			
			/*if (img.getWidth() > IMAGE_WIDTH || img.getHeight() > IMAGE_HEIGHT) {
				img = ImageUtil.resize(img, IMAGE_WIDTH, IMAGE_HEIGHT);
			}*/
			if (img.getWidth() > IMAGE_WIDTH || img.getHeight() > IMAGE_HEIGHT) {
				if (img.getWidth() > img.getHeight()) {
					img = ImageUtil.resize(img, IMAGE_HEIGHT, IMAGE_WIDTH);
				} else {
					img = ImageUtil.resize(img, IMAGE_WIDTH, IMAGE_HEIGHT);
				}
			}			
			
			orgFile.delete();
			
			ImageIO.write(img, orgFileExt, outputFile);
		} catch (Exception e) {
			log.info(e.toString());
		}
		
		List<FingerParamMap> saveResult;	
		FingerParamMap param = new FingerParamMap();
		param.put(CommConst.DIRECT_SP_NAME, DirectSP.P_sysAttachFiles_S);
		param.put(CommConst.DIRECT_SP_PARAM,
				new String[] {
					"N", 
					"0", 
					outputFile.getName(), 
					savePath.getSaveURL(), 
					FilenameUtils.getExtension(outputFile.getName()),
					String.valueOf(outputFile.length()), 
					request.getSession().getAttribute("UserID").toString()} 
		);
		
		saveResult = (List<FingerParamMap>) commonDAO.selectByPk(ServiceMap.getQueryId(ServiceMap.AJAX_DIRECT_SP), param);
		
		if(saveResult.size() > 0) {
			intResult = Integer.valueOf((saveResult.get(0).get("new_id").toString()));
		}
		
		return intResult;
	}
	
	public int getOrientation(File convFile) throws IOException {
		int orientation = 1;
		
		Metadata metadata;
		Directory directory;
		
		try {
			metadata = ImageMetadataReader.readMetadata(convFile);
			
			directory = metadata.getDirectory(ExifIFD0Directory.class);
		
			if(directory != null){
				if (directory.containsTag(ExifIFD0Directory.TAG_ORIENTATION)) {
					orientation = directory.getInt(ExifIFD0Directory.TAG_ORIENTATION);
				}
				else {
					orientation = 1;
				}				
			}
		} catch (ImageProcessingException e) {
			log.info("[ImgUtil] could not process image");
			e.printStackTrace();
		} catch (MetadataException e) {
			log.info("[ImgUtil] could not get orientation from image");
			e.printStackTrace();

		}

		return orientation;
	}
	
	public static int getDegreeForOrientation(int orientation){
		int degree = 0;

		switch(orientation){
		case 6:
			degree = 90; break;
		case 1:
			degree = 0; break;
		case 3:
			degree = 180; break;
		case 8:
			degree = 270; break;
		default:
			degree = 0; break;
		}
		
		return degree;
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
