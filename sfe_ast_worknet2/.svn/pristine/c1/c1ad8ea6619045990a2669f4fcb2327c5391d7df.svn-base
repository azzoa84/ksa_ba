package fingersales.common.service;
import java.io.InputStream;
import java.io.StringReader;
import java.io.StringWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import org.apache.commons.io.IOUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import javax.servlet.http.HttpServletRequest;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

public class GeoCodingService {
	private static boolean logPrint = false;
	protected Log log = LogFactory.getLog(this.getClass());

	public final String domain, apiKey, address;
	public static final String SVC_URL = "//apis.daum.net/local/geo/addr2coord?output=xml&apikey=%s&q=%s";
	// 카카오 API
	public static final String ADDR2COORD_URL = "://dapi.kakao.com/v2/local/search/address.xml?query=%s";
	public static String scheme = null;
	
	public GeoCodingService(String domain, String apiKey, String address){
		String addrTmp;
		
		this.domain = domain;
		this.apiKey = apiKey;
		try{
			addrTmp = URLEncoder.encode(address, "UTF-8");
		}catch(Exception ex){
			addrTmp = address;
		}
		this.address = addrTmp;
	}
	
	public GeoCodingService(HttpServletRequest request) {
		String addrTmp;
		String address = request.getParameter("address");

		try {
			addrTmp = URLEncoder.encode(address, "UTF-8");
		} catch (Exception ex) {
			addrTmp = address;
		}
		this.address = addrTmp;
		this.apiKey = request.getSession().getAttribute("MapKey").toString();
		this.domain = request.getServerName();
		scheme = request.getScheme();
	}
	
	public String getGeoCode(){
		NodeList lats, lngs;
		
		try{
			URL url = new URL(String.format(SVC_URL, apiKey, address));
			HttpURLConnection conn = (HttpURLConnection)url.openConnection();
			
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-type", "application/xml;");
			conn.connect();
			
			DocumentBuilderFactory fact = DocumentBuilderFactory.newInstance();
			fact.setNamespaceAware(true);
			DocumentBuilder builder = fact.newDocumentBuilder();
			Document doc = builder.parse(conn.getInputStream());
			
			if(logPrint) log.info(getStringFromDocument(doc));
			
			lats = doc.getElementsByTagName("lat");
			lngs = doc.getElementsByTagName("lng");
			
			if(lats.getLength() * lngs.getLength() > 0){
				return String.format("[%s,%s]", lats.item(0).getFirstChild().getNodeValue(), lngs.item(0).getFirstChild().getNodeValue());
			}else{
				return "[0, 0]";
			}
		}catch(Exception ex){
			return ex.toString();
		}
	}
	
	public String getGeoCodeKakao() {
		NodeList lats, lngs;

		try {

			String urlInfo = String.format(scheme + ADDR2COORD_URL, address);
			URL url = new URL(urlInfo);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-type", "application/xml;");
			conn.setRequestProperty ("Authorization", "KakaoAK " + apiKey);
			conn.connect();

			InputStream inputStream = conn.getInputStream();
			StringWriter sw = new StringWriter();
			IOUtils.copy(inputStream, sw, "UTF-8");
			String returnStr = sw.toString();

			log.info(returnStr);

			DocumentBuilderFactory fact = DocumentBuilderFactory.newInstance();
			fact.setNamespaceAware(true);
			DocumentBuilder builder = fact.newDocumentBuilder();
			InputSource is = new InputSource(new StringReader(returnStr));
			Document doc = builder.parse(is);
			if (logPrint)
				log.info(getStringFromDocument(doc));

			lats = doc.getElementsByTagName("y");
			lngs = doc.getElementsByTagName("x");

			if (lats.getLength() * lngs.getLength() > 0) {
				return String.format("[%s,%s]", lats.item(0).getFirstChild().getNodeValue(),
						lngs.item(0).getFirstChild().getNodeValue());
			} else {
				return "[0, 0]";
			}
		} catch (Exception ex) {
			ex.printStackTrace();
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
