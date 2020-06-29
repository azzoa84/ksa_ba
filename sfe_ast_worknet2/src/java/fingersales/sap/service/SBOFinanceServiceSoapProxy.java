package fingersales.sap.service;

import org.springframework.stereotype.Service;

@Service("SBOFinanceService")
public class SBOFinanceServiceSoapProxy implements fingersales.sap.service.SBOFinanceServiceSoap {
  private String _endpoint = null;
  private fingersales.sap.service.SBOFinanceServiceSoap sBOFinanceServiceSoap = null;
  
  public SBOFinanceServiceSoapProxy() {
    _initSBOFinanceServiceSoapProxy();
  }
  
  public SBOFinanceServiceSoapProxy(String endpoint) {
    _endpoint = endpoint;
    _initSBOFinanceServiceSoapProxy();
  }
  
  private void _initSBOFinanceServiceSoapProxy() {
    try {
      sBOFinanceServiceSoap = (new fingersales.sap.service.SBOFinanceServiceLocator(_endpoint)).getSBOFinanceServiceSoap();
      if (sBOFinanceServiceSoap != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)sBOFinanceServiceSoap)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)sBOFinanceServiceSoap)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (sBOFinanceServiceSoap != null)
      ((javax.xml.rpc.Stub)sBOFinanceServiceSoap)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public fingersales.sap.service.SBOFinanceServiceSoap getSBOFinanceServiceSoap() {
    if (sBOFinanceServiceSoap == null)
      _initSBOFinanceServiceSoapProxy();
    return sBOFinanceServiceSoap;
  }
  
  public java.lang.String login(java.lang.String databaseServer, java.lang.String databaseName, java.lang.String databaseType, java.lang.String databaseUsername, java.lang.String databasePassword, java.lang.String companyUsername, java.lang.String companyPassword, java.lang.String language, java.lang.String licenseServer, java.lang.String sPort) throws java.rmi.RemoteException{
    if (sBOFinanceServiceSoap == null)
      _initSBOFinanceServiceSoapProxy();
    return sBOFinanceServiceSoap.login(databaseServer, databaseName, databaseType, databaseUsername, databasePassword, companyUsername, companyPassword, language, licenseServer, sPort);
  }
  
  public void logout(java.lang.String sessionID) throws java.rmi.RemoteException{
    if (sBOFinanceServiceSoap == null)
      _initSBOFinanceServiceSoapProxy();
    sBOFinanceServiceSoap.logout(sessionID);
  }
  
  public java.lang.String oJournalVouchers_S(java.lang.String sessionID, java.lang.String emp_no, java.lang.String batchNum, java.lang.String referenceDate, java.lang.String memo, java.lang.String taxDate, java.lang.String vatDate, java.lang.String dueDate, java.lang.String autoVAT, java.lang.String u_USERID, java.lang.String u_USERNAME, java.lang.String u_DEPTCODE, java.lang.String u_DEPTNAME, java.lang.String u_Drftnum, java.lang.String[] sarLine_ID, java.lang.String[] sarAccountCode, java.lang.String[] sarDebit, java.lang.String[] sarCredit, java.lang.String[] sarShortName, java.lang.String[] sarLineMemo, java.lang.String[] sarReferenceDate1, java.lang.String[] sarReference2, java.lang.String[] sarTaxDate, java.lang.String[] sarU_TAXDT, java.lang.String[] sarBaseSum, java.lang.String[] sarTaxGroup, java.lang.String[] sarVatAmount, java.lang.String[] sarCostingCode, java.lang.String[] sarU_CardNo, java.lang.String[] sarU_ApprNo, java.lang.String[] sarU_VatRegN, java.lang.String[] sarU_VatBP, java.lang.String[] sarU_VatBpNM, java.lang.String[] sarU_UserName, java.lang.String[] sarU_VatBPNM1, java.lang.String[] sarU_ItemGroup, java.lang.String[] sarU_PayMe, java.lang.String[] sarU_BankCode, java.lang.String[] sarU_Account, java.lang.String[] sarU_AcctName, java.lang.String[] sarU_CARDCD, java.lang.String[] sarU_CARDNM, java.lang.String[] sarU_SAUPNO, java.lang.String[] sarU_SUPAMT, java.lang.String[] sarU_VAT) throws java.rmi.RemoteException{
    if (sBOFinanceServiceSoap == null)
      _initSBOFinanceServiceSoapProxy();
    return sBOFinanceServiceSoap.oJournalVouchers_S(sessionID, emp_no, batchNum, referenceDate, memo, taxDate, vatDate, dueDate, autoVAT, u_USERID, u_USERNAME, u_DEPTCODE, u_DEPTNAME, u_Drftnum, sarLine_ID, sarAccountCode, sarDebit, sarCredit, sarShortName, sarLineMemo, sarReferenceDate1, sarReference2, sarTaxDate, sarU_TAXDT, sarBaseSum, sarTaxGroup, sarVatAmount, sarCostingCode, sarU_CardNo, sarU_ApprNo, sarU_VatRegN, sarU_VatBP, sarU_VatBpNM, sarU_UserName, sarU_VatBPNM1, sarU_ItemGroup, sarU_PayMe, sarU_BankCode, sarU_Account, sarU_AcctName, sarU_CARDCD, sarU_CARDNM, sarU_SAUPNO, sarU_SUPAMT, sarU_VAT);
  }
  
  
}