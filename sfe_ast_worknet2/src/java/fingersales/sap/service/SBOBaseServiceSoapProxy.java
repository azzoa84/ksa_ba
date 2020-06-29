package fingersales.sap.service;

import org.springframework.stereotype.Service;

@Service("SBOBaseService")
public class SBOBaseServiceSoapProxy implements fingersales.sap.service.SBOBaseServiceSoap {
  private String _endpoint = null;
  private fingersales.sap.service.SBOBaseServiceSoap sBOBaseServiceSoap = null;
  
  public SBOBaseServiceSoapProxy() {
    _initSBOBaseServiceSoapProxy();
  }
  
  public SBOBaseServiceSoapProxy(String endpoint) {
    _endpoint = endpoint;
    _initSBOBaseServiceSoapProxy();
  }
  
  private void _initSBOBaseServiceSoapProxy() {
    try {
      sBOBaseServiceSoap = (new fingersales.sap.service.SBOBaseServiceLocator(_endpoint)).getSBOBaseServiceSoap();
      if (sBOBaseServiceSoap != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)sBOBaseServiceSoap)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)sBOBaseServiceSoap)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (sBOBaseServiceSoap != null)
      ((javax.xml.rpc.Stub)sBOBaseServiceSoap)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public fingersales.sap.service.SBOBaseServiceSoap getSBOBaseServiceSoap() {
    if (sBOBaseServiceSoap == null)
      _initSBOBaseServiceSoapProxy();
    return sBOBaseServiceSoap;
  }
  
  public java.lang.String login(java.lang.String databaseServer, java.lang.String databaseName, java.lang.String databaseType, java.lang.String databaseUsername, java.lang.String databasePassword, java.lang.String companyUsername, java.lang.String companyPassword, java.lang.String language, java.lang.String licenseServer, java.lang.String sPort) throws java.rmi.RemoteException{
    if (sBOBaseServiceSoap == null)
      _initSBOBaseServiceSoapProxy();
    return sBOBaseServiceSoap.login(databaseServer, databaseName, databaseType, databaseUsername, databasePassword, companyUsername, companyPassword, language, licenseServer, sPort);
  }
  
  public java.lang.String logout(java.lang.String sessionID) throws java.rmi.RemoteException{
    if (sBOBaseServiceSoap == null)
      _initSBOBaseServiceSoapProxy();
    return sBOBaseServiceSoap.logout(sessionID);
  }
  
  public fingersales.sap.service.GetBusinessObjectTemplateResponseGetBusinessObjectTemplateResult getBusinessObjectTemplate(java.lang.String sessionID, java.lang.String objectID) throws java.rmi.RemoteException{
    if (sBOBaseServiceSoap == null)
      _initSBOBaseServiceSoapProxy();
    return sBOBaseServiceSoap.getBusinessObjectTemplate(sessionID, objectID);
  }
  
  public fingersales.sap.service.GetBusinessObjectXmlSchemaResponseGetBusinessObjectXmlSchemaResult getBusinessObjectXmlSchema(java.lang.String sessionID, java.lang.String objectID) throws java.rmi.RemoteException{
    if (sBOBaseServiceSoap == null)
      _initSBOBaseServiceSoapProxy();
    return sBOBaseServiceSoap.getBusinessObjectXmlSchema(sessionID, objectID);
  }
  
  public java.lang.String excuteXML(java.lang.String XMLDoc) throws java.rmi.RemoteException{
    if (sBOBaseServiceSoap == null)
      _initSBOBaseServiceSoapProxy();
    return sBOBaseServiceSoap.excuteXML(XMLDoc);
  }
  
  public java.lang.String executeSQL(java.lang.String sessionID, java.lang.String sCmd) throws java.rmi.RemoteException{
    if (sBOBaseServiceSoap == null)
      _initSBOBaseServiceSoapProxy();
    return sBOBaseServiceSoap.executeSQL(sessionID, sCmd);
  }
  
  public java.lang.String getByKey(java.lang.String sessionID, java.lang.String objectID, java.lang.String objectParams) throws java.rmi.RemoteException{
    if (sBOBaseServiceSoap == null)
      _initSBOBaseServiceSoapProxy();
    return sBOBaseServiceSoap.getByKey(sessionID, objectID, objectParams);
  }
  
  
}