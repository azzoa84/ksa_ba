/**
 * GetBusinessObjectXmlSchemaResponse.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package fingersales.sap.service;

public class GetBusinessObjectXmlSchemaResponse  implements java.io.Serializable {
    private fingersales.sap.service.GetBusinessObjectXmlSchemaResponseGetBusinessObjectXmlSchemaResult getBusinessObjectXmlSchemaResult;

    public GetBusinessObjectXmlSchemaResponse() {
    }

    public GetBusinessObjectXmlSchemaResponse(
           fingersales.sap.service.GetBusinessObjectXmlSchemaResponseGetBusinessObjectXmlSchemaResult getBusinessObjectXmlSchemaResult) {
           this.getBusinessObjectXmlSchemaResult = getBusinessObjectXmlSchemaResult;
    }


    /**
     * Gets the getBusinessObjectXmlSchemaResult value for this GetBusinessObjectXmlSchemaResponse.
     * 
     * @return getBusinessObjectXmlSchemaResult
     */
    public fingersales.sap.service.GetBusinessObjectXmlSchemaResponseGetBusinessObjectXmlSchemaResult getGetBusinessObjectXmlSchemaResult() {
        return getBusinessObjectXmlSchemaResult;
    }


    /**
     * Sets the getBusinessObjectXmlSchemaResult value for this GetBusinessObjectXmlSchemaResponse.
     * 
     * @param getBusinessObjectXmlSchemaResult
     */
    public void setGetBusinessObjectXmlSchemaResult(fingersales.sap.service.GetBusinessObjectXmlSchemaResponseGetBusinessObjectXmlSchemaResult getBusinessObjectXmlSchemaResult) {
        this.getBusinessObjectXmlSchemaResult = getBusinessObjectXmlSchemaResult;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof GetBusinessObjectXmlSchemaResponse)) return false;
        GetBusinessObjectXmlSchemaResponse other = (GetBusinessObjectXmlSchemaResponse) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.getBusinessObjectXmlSchemaResult==null && other.getGetBusinessObjectXmlSchemaResult()==null) || 
             (this.getBusinessObjectXmlSchemaResult!=null &&
              this.getBusinessObjectXmlSchemaResult.equals(other.getGetBusinessObjectXmlSchemaResult())));
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;
    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = 1;
        if (getGetBusinessObjectXmlSchemaResult() != null) {
            _hashCode += getGetBusinessObjectXmlSchemaResult().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(GetBusinessObjectXmlSchemaResponse.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://tempuri.org/", ">GetBusinessObjectXmlSchemaResponse"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("getBusinessObjectXmlSchemaResult");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "GetBusinessObjectXmlSchemaResult"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://tempuri.org/", ">>GetBusinessObjectXmlSchemaResponse>GetBusinessObjectXmlSchemaResult"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
    }

    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

    /**
     * Get Custom Serializer
     */
    public static org.apache.axis.encoding.Serializer getSerializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanSerializer(
            _javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    public static org.apache.axis.encoding.Deserializer getDeserializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanDeserializer(
            _javaType, _xmlType, typeDesc);
    }

}
