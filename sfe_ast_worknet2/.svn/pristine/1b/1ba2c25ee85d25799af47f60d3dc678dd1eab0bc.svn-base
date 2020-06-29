package fingersales.common.handler;

import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;


/**  
 * @Class Name : CommonLogHandler.java
 * @Description : CommonLogHandler Class
 * @Modification Information  
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2014.03.27           최초생성
 * 
 * @author 김영도
 * @since 2014. 03.27
 * @version 1.0
 * @see
 * 
 *  Copyright (C) by MOPAS All right reserved.
 */
public class CommonLogHandler extends HandlerInterceptorAdapter {
    protected Log log = LogFactory.getLog(this.getClass());

    @Override
    public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object handler) throws Exception {
    	String requestUri = req.getRequestURI();
    	log.info("Req) " + requestUri);
    	
		Enumeration<?> parameterNames = req.getParameterNames();
		StringBuilder paramStr = new StringBuilder();
		boolean isSP = false;	// 추가
		while (parameterNames.hasMoreElements()) {
			String parameterName = (String)parameterNames.nextElement();
			String[] parameterValues = req.getParameterValues(parameterName);
			
			if(parameterValues.length == 1)
			{
				if(parameterName.equals("sp"))
				{
					paramStr.append("EXEC " + parameterValues[0] + " ");
					isSP = true;
				}
				else
				{
					if(isSP)
					{
						paramStr.append("'"+parameterValues[0]+"', ");
					}
					else
					{
						paramStr.append(parameterName);
						paramStr.append(":");
						paramStr.append(parameterValues[0] +" ");
					}
				}
			}
			else
			{
				paramStr.append(parameterName);
				paramStr.append(":");
				paramStr.append(parameterValues + " ");
			}
			
			/*if (parameterValues.length == 1) {
				paramStr.append(parameterName);
				paramStr.append(":");
				paramStr.append(parameterValues[0]);
			}
			else {
				System.out.println();
				paramStr.append(parameterName);
				paramStr.append(":");
				paramStr.append(parameterValues);
			}
			paramStr.append(", ");*/
		}
		
		if (requestUri.indexOf("imageUploadBase64") > -1) {
			return true;
		}
		log.info("Param) " + paramStr);
		
    	return true;
    }    
}
