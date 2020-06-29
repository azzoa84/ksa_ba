package fingersales.common.service;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.ImageWriter;
import javax.imageio.plugins.jpeg.JPEGImageWriteParam;
import javax.imageio.stream.ImageInputStream;
import javax.imageio.stream.ImageOutputStream;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.tools.imageio.ImageIOUtil;
import org.springframework.web.multipart.MultipartFile;

import fingersales.common.constants.CommConst;
import fingersales.common.util.FingerParamMap;

public class PdfToImageService extends AbstractFileUploadService {
	protected Log log = LogFactory.getLog(this.getClass());
	protected final static String FILE_TYPE = "PDF";
	
	@Override
	protected int getNewFileId(MultipartFile file, PathInfo savePath) {
		fileType = FILE_TYPE;
		
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
		
		try {
			if(saveResult.size() > 0) {
				this.imgNameUrlList = new ArrayList<>();
		        this.imgNameList = new ArrayList<>();
		        
		        saveConvertImage(file, savePath);
		        
				return Integer.valueOf((saveResult.get(0).get("new_id").toString()));
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return 0;
	}
	
	public void saveConvertImage(MultipartFile file, PathInfo savePath) throws IOException {
		String strImgFormat  	= "jpg";
		String strSubFileName	= "img";
		String fileFullPath = savePath.getSavePath().substring(0, savePath.getSavePath().length() - 4);
		String fileSavePath = savePath.getSaveURL().substring(0, savePath.getSaveURL().length() - 4);
		String fileName = savePath.getSaveName().substring(0, savePath.getSaveName().length() - 4);
		
		int intStartPage 	= 1;
        int intEndPage 		= 0; 
        int dpi 			= 100;
        float flCompQuality	= 0.8f;
        	        
		PDDocument document = null;
        File pdfFile 		= null;
        
		try {
			pdfFile = new File(savePath.getSavePath());
	        
	        if(pdfFile.exists())
			{
				document = PDDocument.load(pdfFile);
				intEndPage = document.getNumberOfPages();
				
				ImageType imageType = ImageType.RGB;
				
	            // Convert to Image Rendering....
	            intEndPage = Math.min(intEndPage, document.getNumberOfPages());
	            PDFRenderer renderer = new PDFRenderer(document);
	            
	            for(int idx = intStartPage - 1; idx < intEndPage; idx++)
	            {
	                BufferedImage buffImage = renderer.renderImageWithDPI(idx, dpi, imageType);
	                String strSaveFileName 	= fileFullPath + "_" + strSubFileName + (idx + 1) + "_origin." + strImgFormat;
	                if(createImageFile(buffImage, strSaveFileName, dpi))
	            	{
	                	String strSaveFileNameCompressor = fileFullPath + "_" + strSubFileName + (idx + 1) + "." + strImgFormat;
	            		imageCompressor(strSaveFileName, strSaveFileNameCompressor, flCompQuality);
	            		
	            		File convertFile = new File(strSaveFileName);
	        			if(convertFile.exists()) 
	        			{
	        				convertFile.delete();
	        			}
	            	}
	                buffImage.flush();
	                

	                String strUrlName = fileSavePath + "_" + strSubFileName + (idx + 1) + "." + strImgFormat;	     
	                imgNameUrlList.add(strUrlName);
	                String strName = fileName + "_" + strSubFileName + (idx + 1) + "." + strImgFormat;
	                imgNameList.add(strName);
	            }
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
            if(document != null) {
            	file = null;
                document.close();
            }
        }
	}
	
	/**
	 * PDF 이미지 원본 생성
	 * @param bfImg 이미지
	 * @param strFileName 파일명
	 * @param intDPI 화질
	 * @return 결과
	 */
	public boolean createImageFile(BufferedImage bfImg, String strFileName, int intDPI)
	{
		boolean boolResult = false;
		try
		{
			boolResult = ImageIOUtil.writeImage(bfImg, strFileName, intDPI);
		}
		catch(Exception ex)
		{
			log.info("AbstractBrochureUploadService::createImageFile", ex);
		}
		return boolResult;
	}
	
	/**
	 * JPG Compressor(이미지 압축)
	 * @since 2018. 02. 26
	 * @author Spark
	 * @param strFileName 원본 파일명
	 * @param strDestFileName 압축 파일명
	 * @param flQuality 압축 품질
	 */
	public void imageCompressor(String strFileName, String strDestFileName, float flQuality)
	{
		try
		{
			File inputJpegFile = new File(strFileName);
			File outputFile = new File(strDestFileName);
			if(inputJpegFile.exists())
			{
				ImageInputStream imgInStrm = ImageIO.createImageInputStream(inputJpegFile);
				ImageOutputStream imgOutStrm = ImageIO.createImageOutputStream(outputFile);

				// set up reader/writer to wrap around files
				ImageReader imgRdr = ImageIO.getImageReadersByFormatName("jpg").next();
				ImageWriter imgWrtr = ImageIO.getImageWritersByFormatName("jpg").next();
				imgRdr.setInput(imgInStrm);
				imgWrtr.setOutput(imgOutStrm);

				// read in JPEG into IIOImage container 
				IIOImage iioImg = new IIOImage(imgRdr.read(0), null, imgRdr.getImageMetadata(0));
				  
				// set compression level 
				JPEGImageWriteParam writerParam = new JPEGImageWriteParam(null);
				writerParam.setOptimizeHuffmanTables(true);
				writerParam.setCompressionMode(JPEGImageWriteParam.MODE_EXPLICIT);
				writerParam.setCompressionQuality(flQuality);
				
				// write out JPEG
				imgWrtr.write(null, iioImg, writerParam);
				
				// clean up 
				imgWrtr.dispose();
				imgRdr.dispose();
				
				imgInStrm.close();
				imgOutStrm.close();
			}			
			inputJpegFile = null;
			outputFile = null;
		}
		catch(Exception ex)
		{
			log.info("AbstractBrochureUploadService::imageCompressor", ex);
		}
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
