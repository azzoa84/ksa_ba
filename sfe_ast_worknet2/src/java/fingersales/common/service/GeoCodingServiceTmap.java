package fingersales.common.service;
import java.io.StringWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

public class GeoCodingServiceTmap {
	private static boolean logPrint = false;
	protected Log log = LogFactory.getLog(this.getClass());

	public final String domain, apiKey, address;
	
	public static final String SVC_URL = "https://apis.skplanetx.com/tmap/pois?version=1&searchKeyword=%s";
	
	public GeoCodingServiceTmap(String domain, String apiKey, String address) {
		this.domain = domain;
		this.apiKey = apiKey;
		this.address = address;
	}
	
	public String getGeoCode() {
		NodeList lats, lngs;
		
		try{
			log.info("GeoCodingServiceTmap.class getGeoCode() -> apiKey : " + apiKey);
			log.info("GeoCodingServiceTmap.class getGeoCode() -> address : " + address);
			
			URL url = new URL(String.format(SVC_URL, URLEncoder.encode(address, "UTF-8")));
			HttpURLConnection conn = (HttpURLConnection)url.openConnection();

			conn.setRequestMethod("GET");
			conn.setRequestProperty("Accept", "application/xml");
			conn.setRequestProperty("appKey", apiKey);
			conn.setRequestProperty("Content-type", "application/xml;");
			conn.connect();
			
			DocumentBuilderFactory fact = DocumentBuilderFactory.newInstance();
			fact.setNamespaceAware(true);
			DocumentBuilder builder = fact.newDocumentBuilder();
			Document doc = builder.parse(conn.getInputStream());
			
			if(logPrint) log.info(getStringFromDocument(doc));
			
			lats = doc.getElementsByTagName("noorLat");
			lngs = doc.getElementsByTagName("noorLon");
			
			if(lats.getLength() * lngs.getLength() > 0) {
				String resultXy = String.format("[%s,%s]", lats.item(0).getFirstChild().getNodeValue(), lngs.item(0).getFirstChild().getNodeValue());
				log.info("GeoCodingServiceTmap.class getGeoCode() -> resultXy : " + resultXy);
				return resultXy;
			} else {
				return "[0, 0]";
			}
		}catch(Exception ex){
			log.error("getGeoCode() throw exception : " + ex.toString());
			return ex.toString();
		}
	}
	
	private String getStringFromDocument(Document doc)
	{
	    try
	    {
	       DOMSource domSource = new DOMSource(doc);
	       StringWriter writer = new StringWriter();
	       StreamResult result = new StreamResult(writer);
	       TransformerFactory tf = TransformerFactory.newInstance();
	       Transformer transformer = tf.newTransformer();
	       transformer.transform(domSource, result);
	       return writer.toString();
	    }
	    catch(TransformerException ex)
	    {
	       ex.printStackTrace();
	       return "";
	    }
	} 
	
}
