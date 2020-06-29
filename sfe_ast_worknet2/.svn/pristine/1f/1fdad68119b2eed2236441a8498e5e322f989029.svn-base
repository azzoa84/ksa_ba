/**
 * SBOSampleServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package fingersales.sap.service;

public class SBOSampleServiceLocator extends org.apache.axis.client.Service implements fingersales.sap.service.SBOSampleService {

    public SBOSampleServiceLocator(String endpoint) {
    	SBOSampleServiceSoap_address = endpoint;
    }


    public SBOSampleServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public SBOSampleServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for SBOSampleServiceSoap
    private java.lang.String SBOSampleServiceSoap_address = null;

    public java.lang.String getSBOSampleServiceSoapAddress() {
        return SBOSampleServiceSoap_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String SBOSampleServiceSoapWSDDServiceName = "SBOSampleServiceSoap";

    public java.lang.String getSBOSampleServiceSoapWSDDServiceName() {
        return SBOSampleServiceSoapWSDDServiceName;
    }

    public void setSBOSampleServiceSoapWSDDServiceName(java.lang.String name) {
        SBOSampleServiceSoapWSDDServiceName = name;
    }

    public fingersales.sap.service.SBOSampleServiceSoap getSBOSampleServiceSoap() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(SBOSampleServiceSoap_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getSBOSampleServiceSoap(endpoint);
    }

    public fingersales.sap.service.SBOSampleServiceSoap getSBOSampleServiceSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            fingersales.sap.service.SBOSampleServiceSoapStub _stub = new fingersales.sap.service.SBOSampleServiceSoapStub(portAddress, this);
            _stub.setPortName(getSBOSampleServiceSoapWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setSBOSampleServiceSoapEndpointAddress(java.lang.String address) {
        SBOSampleServiceSoap_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (fingersales.sap.service.SBOSampleServiceSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                fingersales.sap.service.SBOSampleServiceSoapStub _stub = new fingersales.sap.service.SBOSampleServiceSoapStub(new java.net.URL(SBOSampleServiceSoap_address), this);
                _stub.setPortName(getSBOSampleServiceSoapWSDDServiceName());
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
        if ("SBOSampleServiceSoap".equals(inputPortName)) {
            return getSBOSampleServiceSoap();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://tempuri.org/", "SBOSampleService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://tempuri.org/", "SBOSampleServiceSoap"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("SBOSampleServiceSoap".equals(portName)) {
            setSBOSampleServiceSoapEndpointAddress(address);
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
