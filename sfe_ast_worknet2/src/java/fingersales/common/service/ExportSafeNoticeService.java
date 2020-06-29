package fingersales.common.service;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.web.servlet.view.AbstractView;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class ExportSafeNoticeService extends AbstractView 
{
	public static final String SAMPLE_EXCEL_DATA = "D:/temp/pvsafe/";
 	public static final String SAMPLE_EXCEL_URL = "/upload/KIDS_REPORT.xls";
	public static final int INT_EXCEL_SHEET_CNT = 6;
	String strJson = "";
	
	public ExportSafeNoticeService(String strJson) 
	{
		this.strJson = strJson;
	}
	
	@Override
	@SuppressWarnings("unchecked")
	protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest req, HttpServletResponse res) throws Exception 
	{
		String fileName = req.getParameter("fileName");
		
		Gson gson 				= new Gson();
		JsonParser parser 		= new JsonParser();
		JsonElement rootElement = parser.parse(strJson);		
		JsonObject rootObj 		= rootElement.getAsJsonObject();
		
		List sheet0 = gson.fromJson(rootObj.get("sheet0"), List.class);
		List sheet1 = gson.fromJson(rootObj.get("sheet1"), List.class);
		List sheet2 = gson.fromJson(rootObj.get("sheet2"), List.class);
		List sheet3 = gson.fromJson(rootObj.get("sheet3"), List.class);
		List sheet4 = gson.fromJson(rootObj.get("sheet4"), List.class);
		List sheet5 = gson.fromJson(rootObj.get("sheet5"), List.class);
		
		try
		{
			FileInputStream fis 	= new FileInputStream(req.getRealPath("")+SAMPLE_EXCEL_URL);
            HSSFWorkbook workbook 	= new HSSFWorkbook(fis);
           
        	HSSFSheet HSSFsheet0	= workbook.getSheetAt(0);        	
        	if(HSSFsheet0 != null)
        	{
                HSSFRow row = HSSFsheet0.getRow(0);
                if(row != null)
                {
                	int cells = row.getPhysicalNumberOfCells();                	
                	for(int rowIdx=1 ; rowIdx <= sheet0.size(); rowIdx++)
                	{       
                		int dataIdx = rowIdx-1;
                		
                		Map<String, Object> map = (Map)sheet0.get(dataIdx);
                		
                		HSSFRow createRow = HSSFsheet0.createRow(rowIdx);
                    	for(int colIdx=0 ; colIdx < cells ; colIdx++)
                    	{
                    		HSSFCell createCell = createRow.createCell(colIdx);
                    		createCell.setCellValue(map.get("pv"+colIdx).toString());
                    	}	
                	}
                }
        	}
        	
        	HSSFSheet HSSFsheet1	= workbook.getSheetAt(1);        	
        	if(HSSFsheet1 != null)
        	{
                HSSFRow row = HSSFsheet1.getRow(0);
                if(row != null)
                {
                	int cells = row.getPhysicalNumberOfCells();                	
                	for(int rowIdx=1 ; rowIdx <= sheet1.size(); rowIdx++)
                	{       
                		int dataIdx = rowIdx-1;
                		Map<String, Object> map = (Map)sheet1.get(dataIdx);
                		
                		HSSFRow createRow = HSSFsheet1.createRow(rowIdx);                		
                    	for(int colIdx=0 ; colIdx < cells ; colIdx++)
                    	{
                    		HSSFCell createCell = createRow.createCell(colIdx);
                    		createCell.setCellValue(map.get("pv"+colIdx).toString());
                    	}	
                	}
                }
        	}
        	
        	HSSFSheet HSSFsheet2	= workbook.getSheetAt(2);        	
        	if(HSSFsheet2 != null)
        	{
                HSSFRow row = HSSFsheet2.getRow(0);
                if(row != null)
                {
                	int cells = row.getPhysicalNumberOfCells();                	
                	for(int rowIdx=1 ; rowIdx <= sheet2.size(); rowIdx++)
                	{       
                		int dataIdx = rowIdx-1;
                		Map<String, Object> map = (Map)sheet2.get(dataIdx);
                		
                		HSSFRow createRow = HSSFsheet2.createRow(rowIdx);                		
                    	for(int colIdx=0 ; colIdx < cells ; colIdx++)
                    	{
                    		HSSFCell createCell = createRow.createCell(colIdx);
                    		createCell.setCellValue(map.get("pv"+colIdx).toString());
                    	}	
                	}
                }
        	}
        	
        	HSSFSheet HSSFsheet3	= workbook.getSheetAt(3);        	
        	if(HSSFsheet3 != null)
        	{
                HSSFRow row = HSSFsheet3.getRow(0);
                if(row != null)
                {
                	int cells = row.getPhysicalNumberOfCells();                	
                	for(int rowIdx=1 ; rowIdx <= sheet3.size(); rowIdx++)
                	{       
                		int dataIdx = rowIdx-1;
                		Map<String, Object> map = (Map)sheet3.get(dataIdx);
                		
                		HSSFRow createRow = HSSFsheet3.createRow(rowIdx);                		
                    	for(int colIdx=0 ; colIdx < cells ; colIdx++)
                    	{
                    		HSSFCell createCell = createRow.createCell(colIdx);
                    		createCell.setCellValue(map.get("pv"+colIdx).toString());
                    	}	
                	}
                }
        	}
        	
        	HSSFSheet HSSFsheet4	= workbook.getSheetAt(4);        	
        	if(HSSFsheet4 != null)
        	{
                HSSFRow row = HSSFsheet4.getRow(0);
                if(row != null)
                {
                	int cells = row.getPhysicalNumberOfCells();                	
                	for(int rowIdx=1 ; rowIdx <= sheet4.size(); rowIdx++)
                	{       
                		int dataIdx = rowIdx-1;
                		Map<String, Object> map = (Map)sheet4.get(dataIdx);
                		
                		HSSFRow createRow = HSSFsheet4.createRow(rowIdx);                		
                    	for(int colIdx=0 ; colIdx < cells ; colIdx++)
                    	{
                    		HSSFCell createCell = createRow.createCell(colIdx);
                    		createCell.setCellValue(map.get("pv"+colIdx).toString());
                    	}	
                	}
                }
        	}
        	
        	HSSFSheet HSSFsheet5	= workbook.getSheetAt(5);        	
        	if(HSSFsheet5 != null)
        	{
                HSSFRow row = HSSFsheet5.getRow(0);
                if(row != null)
                {
                	int cells = row.getPhysicalNumberOfCells();                	
                	for(int rowIdx=1 ; rowIdx <= sheet5.size(); rowIdx++)
                	{      
                		int dataIdx = rowIdx-1;
                		Map<String, Object> map = (Map)sheet5.get(dataIdx);
                		
                		HSSFRow createRow = HSSFsheet5.createRow(rowIdx);                		
                    	for(int colIdx=0 ; colIdx < cells ; colIdx++)
                    	{
                    		HSSFCell createCell = createRow.createCell(colIdx);
                    		createCell.setCellValue(map.get("pv"+colIdx).toString());
                    	}	
                	}
                }
        	}
        	
        	String strPhysicalPath = SAMPLE_EXCEL_DATA;
        	
            FileOutputStream fileoutputstream = new FileOutputStream(strPhysicalPath+fileName);
            workbook.write(fileoutputstream);
            fileoutputstream.close();
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
		
		}
	}
}
