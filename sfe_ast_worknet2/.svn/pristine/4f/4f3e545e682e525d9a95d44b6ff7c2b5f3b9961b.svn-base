package fingersales.common.controller;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.w3c.dom.Document;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import fingersales.common.model.UserModel;
import fingersales.common.service.ServiceMap;
import fingersales.common.util.Utility;
//import fingersales.common.view.LoginRequestView;
 /**
  * open api들이 cross domain을 허용하지 않는 경우가 많기 때문에 java 컨트롤러에서 api를 호출함
  * @author 이호윤
  * @since 2016-05-04
  */
@Controller
@SessionAttributes(types = UserModel.class)
public class OpenApiControler extends SWNBaseControler{
    
	protected Log log = LogFactory.getLog(this.getClass());
	
	@RequestMapping(value = {"/OpenApi.do"})
    public ResponseEntity<String> callAjaxList(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		return callApi(request, response);
    }
	
	private ResponseEntity<String> callApi(HttpServletRequest request, HttpServletResponse response){
		
		System.setProperty("jsse.enableSNIExtension", "false") ;
		
		String type = request.getParameter("type");
		String apiKey = request.getParameter("apiKey");
		
		if(type == null || type == ""){
			return new ResponseEntity<String>("type is empty!", HttpStatus.OK);
		}
		try{
			if(type.equals("Juso")){
				
				System.setProperty("file.encoding", "UTF-8");
				
				String currentPage = request.getParameter("currentPage");
				String countPerPage = request.getParameter("countPerPage");
				String confmKey = request.getParameter("confmKey");
				String keyword = request.getParameter("keyword");
				String protocol = request.getScheme();
				
				String apiUrl = "http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage="+currentPage+"&countPerPage="+countPerPage+"&keyword="+URLEncoder.encode(keyword,"UTF-8")+"&confmKey="+confmKey;
				log.info("apiUrl:"+apiUrl);
				URL url = new URL(apiUrl);
				HttpURLConnection urlConnection = (HttpURLConnection)url.openConnection();
				InputStream ins = urlConnection.getInputStream();
				InputStreamReader isr = new InputStreamReader(ins, "UTF-8");
				BufferedReader in = new BufferedReader(isr);
				
		    	StringBuffer sb = new StringBuffer();
		    	
		    	String tempStr = null;
		    	while(true){
		    		tempStr = in.readLine();
		    		if(tempStr == null) break;
		    		//resultStr = resultStr+tempStr;
		    		sb.append(tempStr);	
		    	}
		    	in.close();
		    	String resultStr = sb.toString();
		    	
				log.info("Juso Result:" + resultStr);
				response.setCharacterEncoding("utf-8");
				response.setContentType("text/xml");
				response.getWriter().write(sb.toString());
				
	            //return new ResponseEntity<String>(resultStr, HttpStatus.OK);
			}
		}catch(Exception ex){
			log.error(ex.getMessage());
			ex.printStackTrace();
		}
		
		return null;
	}
	
	private String getStringFromInputStream(InputStream is) throws Exception
	{
		StringBuffer sb = new StringBuffer();
		byte[] b = new byte[4096];
		for (int n; (n = is.read(b)) != -1;) {
			sb.append(new String(b, 0, n));
		}
		return sb.toString();
	} 
    
    
}