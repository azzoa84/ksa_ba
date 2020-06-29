package fingersales.sap.controller;

import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import fingersales.common.constants.CommConst;
import fingersales.common.util.FingerParamMap;
import fingersales.common.util.Utility;
import fingersales.sap.service.SBOBaseServiceSoapProxy;
import fingersales.sap.service.SBOFinanceServiceSoapProxy;
import fingersales.sap.service.SBOSampleServiceSoapProxy;

@Controller
@RequestMapping("/sbo")
public class SBOController implements ApplicationContextAware {
	private Log log = LogFactory.getLog(this.getClass());

	@Resource(name = "SBOBaseService")
	private SBOBaseServiceSoapProxy sboBaseService;
	
	@Resource(name = "SBOSampleService")
	private SBOSampleServiceSoapProxy sboSampleService;
	
	@Resource(name = "SBOFinanceService")
	private SBOFinanceServiceSoapProxy sboFinanceService;	
	
	private static String SBO_SVC_BASE;
	private static String SBO_SVC_SAMPLE;
	private static String SBO_SVC_FINANCE;
	private static String SBO_SOAP_URL;
	private static String SBO_SOAP_DBSERVER;
	private static String SBO_SOAP_DBNAME;
	private static String SBO_SOAP_DBTYPE;
	private static String SBO_SOAP_DBUSERNAME;
	private static String SBO_SOAP_DBPASSWORD;
	private static String SBO_SOAP_COMPUSERNAME;
	private static String SBO_SOAP_COMPPASSWORD;
	private static String SBO_SOAP_LANGUAGE;
	private static String SBO_SOAP_LICENSESERVER;
	private static String SBO_SOAP_PORT;
	
	private String minLen(String str, int len) {
		if (str != null && str.length() > len) {
			str = str.substring(0, len);
		}
		return str;
	}
	
	private String[] minLen(String[] arr, int len) {
		for (int i = 0; i < arr.length; i++) {
			System.out.println(arr[i]);
			arr[i] = minLen(arr[i], len);
		}
		return arr;
	}
	
	/**
	 * SBO Configuration
	 */
	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		Properties PropComm = (Properties) applicationContext.getBean("propComm");
		
		SBO_SVC_BASE = PropComm.getProperty("sbo.svc.base");
		SBO_SVC_SAMPLE = PropComm.getProperty("sbo.svc.sample");
		SBO_SVC_FINANCE = PropComm.getProperty("sbo.svc.finance");
		SBO_SOAP_URL = PropComm.getProperty("sbo.soap.url");
		SBO_SOAP_DBSERVER = PropComm.getProperty("sbo.soap.dbserver");
		SBO_SOAP_DBNAME = PropComm.getProperty("sbo.soap.dbname");
		SBO_SOAP_DBTYPE = PropComm.getProperty("sbo.soap.dbtype");
		SBO_SOAP_DBUSERNAME = PropComm.getProperty("sbo.soap.dbusername");
		SBO_SOAP_DBPASSWORD = PropComm.getProperty("sbo.soap.dbpassword");
		SBO_SOAP_COMPUSERNAME = PropComm.getProperty("sbo.soap.compusername");
		SBO_SOAP_COMPPASSWORD = PropComm.getProperty("sbo.soap.comppassword");
		SBO_SOAP_LANGUAGE = PropComm.getProperty("sbo.soap.language");
		SBO_SOAP_LICENSESERVER = PropComm.getProperty("sbo.soap.licenseserver");
		SBO_SOAP_PORT = PropComm.getProperty("sbo.soap.port");
		
		// SBO EndPoint 설정 (필수)
		sboBaseService.setEndpoint(SBO_SOAP_URL + SBO_SVC_BASE);
		sboSampleService.setEndpoint(SBO_SOAP_URL + SBO_SVC_SAMPLE);
		sboFinanceService.setEndpoint(SBO_SOAP_URL + SBO_SVC_FINANCE);
	}
	
	/**
	 * SBO 서비스 로그인
	 */
	private String login() throws Exception {
		String sboSessionId = null;
		try {
			sboSessionId = sboBaseService.login(
					SBO_SOAP_DBSERVER, 
					SBO_SOAP_DBNAME, 
					SBO_SOAP_DBTYPE, 
					SBO_SOAP_DBUSERNAME, 
					SBO_SOAP_DBPASSWORD, 
					SBO_SOAP_COMPUSERNAME, 
					SBO_SOAP_COMPPASSWORD, 
					SBO_SOAP_LANGUAGE, 
					SBO_SOAP_LICENSESERVER,
					SBO_SOAP_PORT);
			
			return sboSessionId;
			
		} catch (Exception ex) {
			log.error("Exception From SBOController login()");
			ex.printStackTrace();
			return null;
		}
	}
	private void logout(String sessionId) throws Exception {
		try {
			sboBaseService.logout(sessionId);
		} catch (Exception ex) {
			log.error("Exception From SBOController logout()");
			ex.printStackTrace();
		}
	}
	
	/**
	 * 파라미터 호출 테스트
	 */
	@RequestMapping(value = "/oParam_Test.do")
	public ResponseEntity<String> oParam_Test(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		FingerParamMap resultMap = new FingerParamMap();
		String sessionID = login();
		
		try {
			if (sessionID == null || sessionID.equals("")) {
				resultMap.put("result", "ERROR_LOGIN");
				return Utility.getJSONResponse(resultMap);
			}
			
			FingerParamMap m = Utility.getSimpleRequestMap(request);
			String empNo = (String) m.get("p1");
			String docEntry = (String) m.get("p2");
			String[] sarLineNum = (String[]) ((String) m.get("p3")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarItemCode = (String[]) ((String) m.get("p4")).split(CommConst.BASE_DELIMITER, -1);
			System.out.println(empNo.toString());
			System.out.println(docEntry.toString());
			System.out.println(sarLineNum.toString());
			System.out.println(sarItemCode.toString());
			
			resultMap.put("result", "SUCCESS");
			return Utility.getJSONResponse(resultMap);
			
		} catch (Exception ex) {
			log.error("Exception From SBOController oParam_Test()");
			ex.printStackTrace();
			resultMap.put("result", "ERROR_EXEC");
			return Utility.getJSONResponse(resultMap);
			
		} finally {
			logout(sessionID);
		}
	}
	
	/**
	 * 재고이전 (* "샘플신청승인" 에서 호출)
	 */
	@RequestMapping(value = "/oStockTransfer_S.do")
	public ResponseEntity<String> oStockTransfer_S(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		FingerParamMap resultMap = new FingerParamMap();
		String sessionID = login();
		
		try {
			if (sessionID == null || sessionID.equals("")) {
				resultMap.put("result", "ERROR_LOGIN");
				return Utility.getJSONResponse(resultMap);
			}
			
			FingerParamMap m = Utility.getSimpleRequestMap(request);
			String empNo = (String) m.get("p1");
			String docEntry = (String) m.get("p2");
			String docDate = (String) m.get("p3");
			String reference2 = (String) m.get("p4");
			String fromWarehouse = (String) m.get("p5");
			String[] sarLineNum = (String[]) ((String) m.get("p6")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarItemCode = (String[]) ((String) m.get("p7")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarQuantity = (String[]) ((String) m.get("p8")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarWarehouseCode = (String[]) ((String) m.get("p9")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarBatchNumber = (String[]) ((String) m.get("p10")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarQuantity2 = (String[]) ((String) m.get("p11")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarBaseLineNumber = (String[]) ((String) m.get("p12")).split(CommConst.BASE_DELIMITER, -1);
			
			String result = sboSampleService.oStockTransfer_S(sessionID, empNo, docEntry, docDate, reference2, fromWarehouse, sarLineNum, sarItemCode, sarQuantity, sarWarehouseCode, sarBatchNumber, sarQuantity2, sarBaseLineNumber);
			
			resultMap.put("result", result);
			return Utility.getJSONResponse(resultMap);
			
		} catch (Exception ex) {
			log.error("Exception From SBOController oStockTransfer_S()");
			ex.printStackTrace();
			resultMap.put("result", "ERROR_EXEC");
			return Utility.getJSONResponse(resultMap);
			
		} finally {
			logout(sessionID);
		}
	}
	
	/**
	 * (* "샘플회계처리" 에서 호출)
	 */
	@RequestMapping(value = "/oInventoryGenExit_S.do")
	public ResponseEntity<String> oInventoryGenExit_S(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		FingerParamMap resultMap = new FingerParamMap();
		String sessionID = login();
		
		try {
			if (sessionID == null || sessionID.equals("")) {
				resultMap.put("result", "ERROR_LOGIN");
				return Utility.getJSONResponse(resultMap);
			}

			FingerParamMap m = Utility.getSimpleRequestMap(request);
			String empNo = (String) m.get("p1");
			String docDate = (String) m.get("p2");
			String docDueDate = (String) m.get("p3");
			String comments = (String) m.get("p4");
			String[] sarLineNum = (String[]) ((String) m.get("p5")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarItemCode = (String[]) ((String) m.get("p6")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarQuantity = (String[]) ((String) m.get("p7")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarWarehouseCode = (String[]) ((String) m.get("p8")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarAccountCode = (String[]) ((String) m.get("p9")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarBatchNumber = (String[]) ((String) m.get("p10")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarQuantity2 = (String[]) ((String) m.get("p11")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarBaseLineNumber2 = (String[]) ((String) m.get("p12")).split(CommConst.BASE_DELIMITER, -1);
			
			String result = sboSampleService.oInventoryGenExit_S(sessionID, empNo, docDate, docDueDate, comments, sarLineNum, sarItemCode, sarQuantity, sarWarehouseCode, sarAccountCode, sarBatchNumber, sarQuantity2, sarBaseLineNumber2);
			
			resultMap.put("result", result);
			return Utility.getJSONResponse(resultMap);
			
		} catch (Exception ex) {
			log.error("Exception From SBOController oInventoryGenExit_S()");
			ex.printStackTrace();
			resultMap.put("result", "ERROR_EXEC");
			return Utility.getJSONResponse(resultMap);
			
		} finally {
			logout(sessionID);
		}
	}
	
	/**
	 * 분개장 생성 (* "일괄증빙출력", "결재함/기안함" 에서 호출)
	 */
	@RequestMapping(value = "/oJournalVouchers_S.do")
	public ResponseEntity<String> oJournalVouchers_S(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		FingerParamMap resultMap = new FingerParamMap();
		String sessionID = login();
		
		try {
			if (sessionID == null || sessionID.equals("")) {
				resultMap.put("result", "ERROR_LOGIN");
				return Utility.getJSONResponse(resultMap);
			}

			FingerParamMap m = Utility.getSimpleRequestMap(request);
			String empNo = (String) m.get("p1");
			String batchNum = (String) m.get("p2");
			String referenceDate = (String) m.get("p3");
			String memo = (String) m.get("p4");
			memo = minLen(memo, 30);
			String taxDate = (String) m.get("p5");
			String vatDate = (String) m.get("p6");
			String dueDate = (String) m.get("p7");
			String autoVAT = (String) m.get("p8");
			String u_USERID = (String) m.get("p9");
			String u_USERNAME = (String) m.get("p10");
			String u_DEPTCODE = (String) m.get("p11");
			String u_DEPTNAME = (String) m.get("p12");
			String u_Drftnum = (String) m.get("p13");

			String[] sarLine_ID = (String[]) ((String) m.get("p14")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarAccountCode = (String[]) ((String) m.get("p15")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarDebit = (String[]) ((String) m.get("p16")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarCredit = (String[]) ((String) m.get("p17")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarShortName = (String[]) ((String) m.get("p18")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarLineMemo = (String[]) ((String) m.get("p19")).split(CommConst.BASE_DELIMITER, -1);
			sarLineMemo = minLen(sarLineMemo, 30);
			String[] sarReferenceDate1 = (String[]) ((String) m.get("p20")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarReference2 = (String[]) ((String) m.get("p21")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarTaxDate = (String[]) ((String) m.get("p22")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarU_TAXDT = (String[]) ((String) m.get("p23")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarBaseSum = (String[]) ((String) m.get("p24")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarTaxGroup = (String[]) ((String) m.get("p25")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarVatAmount = (String[]) ((String) m.get("p26")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarCostingCode = (String[]) ((String) m.get("p27")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarU_CardNo = (String[]) ((String) m.get("p28")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarU_ApprNo = (String[]) ((String) m.get("p29")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarU_VatRegN = (String[]) ((String) m.get("p30")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarU_VatBP = (String[]) ((String) m.get("p31")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarU_VatBpNM = (String[]) ((String) m.get("p32")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarU_UserName = (String[]) ((String) m.get("p33")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarU_VatBPNM1 = (String[]) ((String) m.get("p34")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarU_ItemGroup = (String[]) ((String) m.get("p35")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarU_PayMe = (String[]) ((String) m.get("p36")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarU_BankCode = (String[]) ((String) m.get("p37")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarU_Account = (String[]) ((String) m.get("p38")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarU_AcctName = (String[]) ((String) m.get("p39")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarU_CARDCD = (String[]) ((String) m.get("p40")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarU_CARDNM = (String[]) ((String) m.get("p41")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarU_SAUPNO = (String[]) ((String) m.get("p42")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarU_SUPAMT = (String[]) ((String) m.get("p43")).split(CommConst.BASE_DELIMITER, -1);
			String[] sarU_VAT = (String[]) ((String) m.get("p44")).split(CommConst.BASE_DELIMITER, -1);

			String result = sboFinanceService.oJournalVouchers_S(sessionID, empNo, batchNum, referenceDate, memo, taxDate, vatDate, dueDate, autoVAT, u_USERID, u_USERNAME, u_DEPTCODE, u_DEPTNAME, u_Drftnum, 
					sarLine_ID, sarAccountCode, sarDebit, sarCredit, sarShortName, sarLineMemo, sarReferenceDate1, sarReference2, sarTaxDate, sarU_TAXDT, sarBaseSum, sarTaxGroup, sarVatAmount, sarCostingCode, 
					sarU_CardNo, sarU_ApprNo, sarU_VatRegN, sarU_VatBP, sarU_VatBpNM, sarU_UserName, sarU_VatBPNM1, sarU_ItemGroup, sarU_PayMe, sarU_BankCode, sarU_Account, sarU_AcctName, sarU_CARDCD, sarU_CARDNM, 
					sarU_SAUPNO, sarU_SUPAMT, sarU_VAT);
			
			resultMap.put("result", result);
			return Utility.getJSONResponse(resultMap);
			
		} catch (Exception ex) {
			log.error("Exception From SBOController oJournalVouchers_S()");
			ex.printStackTrace();
			resultMap.put("result", "ERROR_EXEC");
			return Utility.getJSONResponse(resultMap);
			
		} finally {
			logout(sessionID);
		}
	}	
}
