/**
 * SBOBaseServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package fingersales.sap.service;

public class SBOBaseServiceLocator extends org.apache.axis.client.Service implements fingersales.sap.service.SBOBaseService {

    public SBOBaseServiceLocator(String endpoint) {
    	SBOBaseServiceSoap_address = endpoint;
    }


    public SBOBaseServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public SBOBaseServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for SBOBaseServiceSoap
    private java.lang.String SBOBaseServiceSoap_address = null;

    public java.lang.String getSBOBaseServiceSoapAddress() {
        return SBOBaseServiceSoap_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String SBOBaseServiceSoapWSDDServiceName = "SBOBaseServiceSoap";

    public java.lang.String getSBOBaseServiceSoapWSDDServiceName() {
        return SBOBaseServiceSoapWSDDServiceName;
    }

    public void setSBOBaseServiceSoapWSDDServiceName(java.lang.String name) {
        SBOBaseServiceSoapWSDDServiceName = name;
    }

    public fingersales.sap.service.SBOBaseServiceSoap getSBOBaseServiceSoap() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(SBOBaseServiceSoap_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getSBOBaseServiceSoap(endpoint);
    }

    public fingersales.sap.service.SBOBaseServiceSoap getSBOBaseServiceSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            fingersales.sap.service.SBOBaseServiceSoapStub _stub = new fingersales.sap.service.SBOBaseServiceSoapStub(portAddress, this);
            _stub.setPortName(getSBOBaseServiceSoapWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setSBOBaseServiceSoapEndpointAddress(java.lang.String address) {
        SBOBaseServiceSoap_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (fingersales.sap.service.SBOBaseServiceSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                fingersales.sap.service.SBOBaseServiceSoapStub _stub = new fingersales.sap.service.SBOBaseServiceSoapStub(new java.net.URL(SBOBaseServiceSoap_address), this);
                _stub.setPortName(getSBOBaseServiceSoapWSDDServiceName());
                return _stub;
            }
        }
        catch (java.lang.Throwable t) {
            throw new javax.xml.rpc.ServiceException(t);
        }
        throw new javax.xml.rpc.ServiceException("There is no stub implementation for the interface:  " + (serviceEndpointInterface == null ? "null" : serviceEndpointInterface.getName()));
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(javax.xml.namespace.QName portName, Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        if (portName == null) {
            return getPort(serviceEndpointInterface);
        }
        java.lang.String inputPortName = portName.getLocalPart();
        if ("SBOBaseServiceSoap".equals(inputPortName)) {
            return getSBOBaseServiceSoap();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://tempuri.org/", "SBOBaseService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://tempuri.org/", "SBOBaseServiceSoap"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("SBOBaseServiceSoap".equals(portName)) {
            setSBOBaseServiceSoapEndpointAddress(address);
        }
        else 
{ // Unknown Port Name
            throw new javax.xml.rpc.ServiceException(" Cannot set Endpoint Address for Unknown Port" + portName);
        }
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(javax.xml.namespace.QName portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        setEndpointAddress(portName.getLocalPart(), address);
    }

}
