package fingersales.common.view;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.springframework.web.servlet.view.AbstractView;

import fingersales.common.constants.CommConst;
import fingersales.common.util.FingerParamMap;
import fingersales.common.util.QueryResult;

public class ExcelDownloadViewSXSSF extends AbstractView {
	protected Log log = LogFactory.getLog(this.getClass());
	
	@Override
	@SuppressWarnings("unchecked")
	protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest req, HttpServletResponse res) throws Exception {
		String filename = model.get("filename").toString();
		String excelName = URLDecoder.decode(filename, "utf-8");
		log.info(excelName + " with SXSSF");
		
		ArrayList<QueryResult> result = (ArrayList<QueryResult>)model.get("XL");
		
		SXSSFWorkbook wb = new SXSSFWorkbook(500);
		wb.setCompressTempFiles(true);
		
		for(int iSheet = 0; iSheet < result.size(); iSheet++) {
			ArrayList<ArrayList<FingerParamMap>> list = (ArrayList<ArrayList<FingerParamMap>>)result.get(iSheet).get(CommConst.RESULT_LIST);
			if(list.size() == 2){
				Sheet ds = wb.createSheet();
				createColHeader(ds, (ArrayList<FingerParamMap>)list.get(0));
				fillXLData(ds, (ArrayList<FingerParamMap>)list.get(1), (ArrayList<FingerParamMap>)list.get(0));		
			}
		}
			
		res.setContentType("application/vnd.ms-excel; charset=UTF-8");
		res.setHeader("Content-Disposition", "attachment; filename=\"" + URLEncoder.encode(excelName, "utf-8") + "\";");
		
		ServletOutputStream out = res.getOutputStream();
		wb.write(out);
		out.close();

		wb.dispose();
	}
	
	@SuppressWarnings("unchecked")
	private void createColHeader(Sheet sheet, ArrayList<FingerParamMap> data){
		Row headRow = sheet.createRow(0);
		List<String> keys = data.get(0).keyList();
		
		for(int i = 0; i < keys.size(); i++) {
			Cell hCell = headRow.createCell(i); 
			hCell.setCellValue(data.get(0).get(keys.get(i)).toString());
		}
	}
	
	@SuppressWarnings("unchecked")
	private void fillXLData(Sheet sheet, ArrayList<FingerParamMap> data, ArrayList<FingerParamMap> header){
		if(data.size() == 0) return;

		List<String> keys = data.get(0).keyList();			
		
		for(int i = 0; i < data.size(); i++){
			Row dRow = sheet.createRow(i + 1);
			for(int j = 0; j < keys.size(); j++){
				Cell dCell = dRow.createCell(j);
				CellStyle style = dCell.getCellStyle();

				if (data.get(i).get(keys.get(j)).toString().length() > 0)
				{
					if(header.get(1).get(keys.get(j)).toString().equals("numeric"))
					{						
						style.setDataFormat(HSSFDataFormat.getBuiltinFormat("0.00"));
						style.setAlignment(CellStyle.ALIGN_RIGHT);
						dCell.setCellStyle(style);
						dCell.setCellValue(Double.parseDouble(data.get(i).get(keys.get(j)).toString()));	
					}
					else
					{
						style.setAlignment(CellStyle.ALIGN_LEFT);
						dCell.setCellStyle(style);			
						dCell.setCellValue(data.get(i).get(keys.get(j)).toString());	
					}				
				}
			}
		}
	}
}
