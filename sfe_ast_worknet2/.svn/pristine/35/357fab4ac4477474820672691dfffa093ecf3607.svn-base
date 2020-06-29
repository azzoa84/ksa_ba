package fingersales.common.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.filter.GenericFilterBean;

public class ResourceSelectFilter extends GenericFilterBean {
	
	private List<String> m_filterUriList;
	
	public ResourceSelectFilter(){
		m_filterUriList = new ArrayList<String>();
	}
	
	@Override
	public void doFilter(ServletRequest arg0, ServletResponse arg1, FilterChain arg2) throws IOException, ServletException {
		String uri, redirect;
		HttpServletRequest request = (HttpServletRequest)arg0;
		HttpServletResponse response = (HttpServletResponse)arg1;
		
		uri = request.getRequestURI().substring(request.getContextPath().length());
		for(String path : m_filterUriList){
			if(uri.startsWith(path) && !"off".equals(request.getParameter("redirect"))){
				redirect = String.format("%s%s%s/%s?redirect=off", 
						request.getContextPath(),
						path,
						request.getContextPath().substring(1),
						uri.substring(path.length()));
				response.sendRedirect(redirect);
				return;
			}			
		}
		arg2.doFilter(arg0, arg1);
	}
	
	public void setResourcePath(String path){
		String[] arr = path.split("\n");
		for(String str : arr){
			String tmp = str
					.replace("\t", "")
					.replace("\r", "")
					.trim();
			if(!m_filterUriList.contains(path)) m_filterUriList.add(tmp);	
		}
	}
	
}
