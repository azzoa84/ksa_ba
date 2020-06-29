package fingersales.common.handler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import fingersales.common.model.UserModel;
import fingersales.common.util.Utility;


/**  
 * @Class Name : CommonInjectHandler.java
 * @Description : CommonInjectHandler Class
 * @Modification Information  
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2014.04.12              최초생성
 * 
 * @author 김영도
 * @since 2014. 04. 12
 * @version 1.0
 * @see
 * 
 *  Copyright (C) by MOPAS All right reserved.
 */
public class CommonInjectHandler extends HandlerInterceptorAdapter {
    protected Log log = LogFactory.getLog(this.getClass());
    
    @Override
    public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object handler) throws Exception {
    	//log.info("CommonInjectHandler preHandle: inject userSession Model.");
    	try {
    		if (SecurityContextHolder.getContext().getAuthentication() != null) {
    			UserModel userSession = Utility.getPrincipal();
    			req.setAttribute("userSession", userSession);
    		}
    	} catch (Exception e) {
    		e.printStackTrace();
    	}

    	return true;
    }
}
