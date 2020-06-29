package fingersales.common.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

public class AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {
	Log log = LogFactory.getLog(this.getClass());


	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException ex) throws IOException, ServletException {
		request.setAttribute("loginException", "Y");
		request.setAttribute("backurl", request.getParameter("backurl"));
		System.out.println(request.getParameter("backurl"));
		super.onAuthenticationFailure(request, response, ex);
		log.info("AuthenticationFailureHandler: login Fail.");
		
		ex.printStackTrace();
	}
}