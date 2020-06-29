package fingersales.common.constants;

import java.util.Properties;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class SharedProperties implements ApplicationContextAware {
	public static class PROP_COMM {
		public String AD_LDAP_DOMAIN;
		public String AD_LDAP_HOST;
		public String AD_LDAP_DN;
		
		public String UPLOAD_FILE_PATH;
	}
	
	public static PROP_COMM PROP_COMM;
	
	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		Properties PropComm = (Properties) applicationContext.getBean("propComm");
		
		PROP_COMM = new PROP_COMM();
		PROP_COMM.AD_LDAP_DOMAIN = PropComm.getProperty("ad.ldap.domain");
		PROP_COMM.AD_LDAP_HOST = PropComm.getProperty("ad.ldap.host");
		PROP_COMM.AD_LDAP_DN = PropComm.getProperty("ad.ldap.dn");
		PROP_COMM.UPLOAD_FILE_PATH = PropComm.getProperty("iis.ws.path");
	}
}