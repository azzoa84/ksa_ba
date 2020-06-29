package fingersales.common.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.StringWriter;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.dom4j.dom.DOMDocument;
import org.springframework.web.multipart.MultipartFile;

public abstract class AbstractXLFileUploadService extends AbstractFileUploadService {
	
	@Override
	protected int getNewFileId(MultipartFile file, PathInfo savePath) {
		Workbook book;
		
		FileInputStream fis = null;
		File fileObj = new File(savePath.getSavePath());
		String strXML;
		
		try{
			fis = new FileInputStream(fileObj);
			
			log.info("create book start");
			if(savePath.originName.toLowerCase().endsWith(".xls")){
				book = new HSSFWorkbook(fis);
			}else if(savePath.originName.toLowerCase().endsWith(".xlsx")){
				book = new XSSFWorkbook(fis);
			}else{
				fis.close();
				return -1;
			}
			log.info("create book end");
			
			strXML = getSheetXML(book.getSheetAt(0));
			log.info("get sheet end");
			saveData(strXML);
			log.info("data save complete");
			fis.close();
			fileObj.delete();			
		}catch(IOException ex){
			log.info(String.format("Excel upload failed - %s", ex.toString()));
			return -1;
		}catch(Exception ex){
			log.info(String.format("Excel upload failed - %s", ex.toString()));
			return -1;
		}
		return 0;
	}
	
	protected String convertDOM2XML(DOMDocument doc){
		StringWriter sw = new StringWriter();
		try{
			doc.write(sw);
			return sw.getBuffer().toString().replaceAll("\n|\r", "");
		}catch(Exception ex){
			return "";
		}
		
	}	

	abstract protected String getSheetXML(Sheet sheet);
	
	abstract protected boolean saveData(String strXML);
	
}
