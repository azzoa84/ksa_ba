/**
	@file	ExcelDataUploadService.java
	@date	2017-09-25
	@author	UBCare CRM R&D TF
	@brief	엑셀 데이터 업로드
*/
package fingersales.common.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import com.ibatis.sqlmap.client.SqlMapClient;

import fingersales.common.util.FingerParamMap;

/**  
 * @Class Name : ExcelDataUploadService.java
 * @Description : 
 * @Modification Information  
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 *   2017.09.25	 JaeHwan	 신규 생성
 * @author UBCare CRM R&D TF
 * @since 2017.09.25
 * @version 1.0
 * @see
 * 
 * Copyright (C) by UBCARE All right reserved.
 */
public class ExcelDataUploadService extends AbstractXLFileUploadService 
{
	private String[] payResultParam = {"site_code", "pay_yyyymm", "pay_calculate_type", "pay_type", "emp_code", "tax_site_code", "pay_group_code", "dept_code", "dept_name",
									   "position_code", "duty_code", "tax_calculate_type", "tax_rate", "bonus_calculate_type", "bonus_apply_yyyymm_fr", "bonus_apply_yyyymm_to", "bonus_rate", "bonus_amt",
									   "pay_amt", "pay_total_amt", "tax_free_amt", "pay_deduction_amt", "pay_net_amt", "update_userid", "update_time", "update_pc"};
	private String[] payResultDetailParam = {"site_code", "pay_yyyymm", "pay_calculate_type", "pay_type", "emp_code", "pay_item_code", "pay_amt", "tax_free_amt"};
	private String[] payCalculationParam = {"site_code", "pay_yyyymm", "pay_calculate_type", "pay_type", "pay_date", "tax_calculate_type", "tax_rate", "bonus_calculate_type", "bonus_rate",
											"bonus_apply_yyyymm_fr", "bonus_apply_yyyymm_to", "fi_org_code", "entry_date", "entry_num", "pay_close_yn", "pay_close_memo", "insert_userid",
											"insert_time", "insert_pc", "update_userid", "update_time", "update_pc"};
	
	@Override
	protected int getNewFileId(MultipartFile file, PathInfo savePath)
	{		
		int sheetCnt = 0;
		//Sheet sheet = getSheet(file, savePath, 0);
		
		Sheet sheet = null;
		Workbook book = null;
		
		FileInputStream fis = null;
		File fileObj = new File(savePath.getSavePath());
		
		try
		{
			fis = new FileInputStream(fileObj);
			
			log.info("create book start");
			if(savePath.originName.toLowerCase().endsWith(".xls"))
			{
				book = new HSSFWorkbook(fis);
			}
			else if(savePath.originName.toLowerCase().endsWith(".xlsx"))
			{
				book = new XSSFWorkbook(fis);
			}
			
			fis.close();
		}
		catch(IOException ex)
		{
			log.info(String.format("Excel upload failed - %s", ex.toString()));
		}
		catch(Exception ex)
		{
			log.info(String.format("Excel upload failed - %s", ex.toString()));
		}
		finally
		{
			fileObj.delete();
		}
		sheetCnt = book.getNumberOfSheets();
		return saveSheetData(book, sheetCnt);
	}
	
	/**
	 * Sheet내에 Data를 저장한다.
	 * @param sheet
	 * @return
	 */
	protected int saveSheetData(Workbook book, int sheetCnt) {
		int intInsertCount = 0;
		int intDeleteCount = 0;
		
		int intReturnCode = 1000;	
		Map<String, Object> mpRow = new HashMap<String, Object>();
		Map<String, String[]> sheetHeader = new HashMap<String, String[]>();
		sheetHeader.put("sheet1", payResultParam);
		sheetHeader.put("sheet2", payResultDetailParam);
		sheetHeader.put("sheet3", payCalculationParam);

		String[] spName = {"hrpPayResult", "hrpPayResultDetail", "hrpPayCalculation"};
		String[] spdeleteName = {"deleteHrpPayResult", "deleteHrpPayResultDetail", "deleteHrpPayCalculation"};
		
		HttpSession session = request.getSession(true);
		String userId = session.getAttribute("UserID").toString();
				
		String NetworkHostName = "";
		try {
			NetworkHostName = java.net.InetAddress.getLocalHost().getCanonicalHostName();
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
		
		SqlMapClient smc = commonDAO.getSqlMapClient();
		
		try {
			smc.startTransaction();
			smc.startBatch();
			
			for (int i = 0; i < sheetCnt; i++) {
				log.info((i + 1) + "번째 Sheet 이름 : " + book.getSheetName(i));
				
				Sheet sheet = book.getSheetAt(i);
				int rows = sheet.getPhysicalNumberOfRows();
						
				for (int r = 1; r < rows; r++) {
					mpRow = rowToMap(sheet.getRow(r), sheetHeader.get("sheet" + (i + 1)));
					
					if (mpRow == null) break;
					
					mpRow.put("user_id", userId);
					mpRow.put("host_info", NetworkHostName);
					
					if (r == 1) {
						String yyyymm = mpRow.get("pay_yyyymm").toString();
						String payCalculateType = mpRow.get("pay_calculate_type").toString();
						
						Map<String, String> deleteParam = new HashMap<String, String>();
						deleteParam.put("pay_yyyymm", yyyymm);
						deleteParam.put("pay_calculate_type", payCalculateType);
												
						if (!"".equals(yyyymm) && yyyymm != null) {
							intDeleteCount += commonDAO.delete("pay_excel." + spdeleteName[i], deleteParam);
						}
					}
					
					intInsertCount += commonDAO.update("pay_excel." + spName[i], mpRow);
				}
				
				log.info(spName[i] + " insert Count : " + intInsertCount);
			}
			intReturnCode = 1001;
			
			try
			{
				smc.endTransaction();
			}
			catch(Exception e) {}
		} catch(Exception ex) {
			intReturnCode = 9999;
			log.info(ex.toString());
			
			try
			{
				smc.endTransaction();
			}
			catch(Exception e) {}
		}
		
		return intReturnCode;
	}
	
	protected Map<String, Object> rowToMap(Row row, String[] columns) {
		Map<String, Object> resultMap = null;
		Cell cell;
		int cellCnt;
		Object value;
		int blankNum = 0;
		if(row != null)
		{
			resultMap = new HashMap<String, Object>();

			cellCnt = columns.length;
			
			for(int i = 0; i < cellCnt; i++)
			{
				cell = row.getCell(i);
				
				if(cell != null)
				{
					switch (cell.getCellType())
					{
					case Cell.CELL_TYPE_STRING:
						value = (cell.getStringCellValue().replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")).trim();
						break;
					case Cell.CELL_TYPE_NUMERIC:
						value = (String.format("%1.0f", cell.getNumericCellValue())).trim();
						break;
					case Cell.CELL_TYPE_BOOLEAN:
						value = cell.getBooleanCellValue() ? "1" : "0";
						break;
					case Cell.CELL_TYPE_BLANK:
						value = null;
						blankNum++;
						break;
					case Cell.CELL_TYPE_ERROR:
						value = (cell.getErrorCellValue() + "").trim();
						blankNum++;
						break;
					default:
						value = "";
						break;
					}
					resultMap.put(columns[i], value);
				}
				else
				{
					blankNum++;
					resultMap.put(columns[i], "");
				}
			}
			
			if (blankNum == cellCnt) {
				resultMap = null;
			}
		}
		
		return resultMap;
	}
	
	@Override
	protected String getSheetXML(Sheet sheet) { return null; }

	@Override
	protected boolean saveData(String strXML) { return false; }
	
	@Override
	public String getResultScript() {
		// TODO Auto-generated method stub
		StringBuffer buff = new StringBuffer();
		
		try
		{
			buff.append("<script>\n");
			buff.append(String.format("	var result = %s;\n",  new String(result.getJsonString().getBytes("UTF-8"), "ISO-8859-1")));
			buff.append("	parent.closeCurrentWindow(result);\n");
			buff.append("</script>");
			return buff.toString();
		}
		catch(Exception ex)
		{
			return "<script> var result = {};</script>";
		}
	}
}