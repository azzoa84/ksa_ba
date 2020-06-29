/**
 * GetByKeyResponse.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package fingersales.sap.service;

public class GetByKeyResponse  implements java.io.Serializable {
    private java.lang.String getByKeyResult;

    public GetByKeyResponse() {
    }

    public GetByKeyResponse(
           java.lang.String getByKeyResult) {
           this.getByKeyResult = getByKeyResult;
    }


    /**
     * Gets the getByKeyResult value for this GetByKeyResponse.
     * 
     * @return getByKeyResult
     */
    public java.lang.String getGetByKeyResult() {
        return getByKeyResult;
    }


    /**
     * Sets the getByKeyResult value for this GetByKeyResponse.
     * 
     * @param getByKeyResult
     */
    public void setGetByKeyResult(java.lang.String getByKeyResult) {
        this.getByKeyResult = getByKeyResult;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof GetByKeyResponse)) return false;
        GetByKeyResponse other = (GetByKeyResponse) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.getByKeyResult==null && other.getGetByKeyResult()==null) || 
             (this.getByKeyResult!=null &&
              this.getByKeyResult.equals(other.getGetByKeyResult())));
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
        if (getGetByKeyResult() != null) {
            _hashCode += getGetByKeyResult().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(GetByKeyResponse.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://tempuri.org/", ">GetByKeyResponse"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("getByKeyResult");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "GetByKeyResult"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
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
