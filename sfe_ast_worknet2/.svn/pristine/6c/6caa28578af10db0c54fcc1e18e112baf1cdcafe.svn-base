package fingersales.common.view;

import java.io.FileInputStream;
import java.io.OutputStream;
import java.io.PrintStream;
import java.net.URLEncoder;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.view.AbstractView;

public class SafeDownload extends AbstractView {
	protected Log log = LogFactory.getLog(this.getClass());

	public static final String SAMPLE_EXCEL_DATA = "D:/temp/pvsafe/";
	
	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest req, HttpServletResponse res) throws Exception {
		String fileName = req.getParameter("fileName");
		
		fileDownload(fileName, req, res);		
	}
	
	private void fileNotExists(HttpServletResponse res) 
	{
		try 
		{
			res.setContentType("text/html; Charset=UTF-8");
			PrintStream out = new PrintStream(res.getOutputStream());
			out.println("<script>alert('요청된 파일을 찾을 수 없습니다.');window.close();</script>");
			out.close();
		}
		catch(Exception ex) 
		{
			log.info(ex.toString());
			log.info(ex.getMessage());
		}
	}
	
	private void fileDownload(String fileName, HttpServletRequest req, HttpServletResponse res) 
	{
		String strPhysicalPath = SAMPLE_EXCEL_DATA;
		
		OutputStream out 	 = null;
		FileInputStream read = null;
		String filePath 	 = strPhysicalPath+fileName;

		try 
		{
			read = new FileInputStream(filePath);
		}
		catch(Exception ex) 
		{
			fileNotExists(res);
			return;
		}
		
		try {
			int iRead = 0;
			byte[] buff = new byte[4096];
			res.setContentType("application/octet-stream; charset=UTF-8");
			res.setHeader("Content-Disposition", "attachment; filename=\"" + URLEncoder.encode(fileName, "utf-8") + "\";");
			out = res.getOutputStream();
			while(read != null && (iRead = read.read(buff)) > 0) {
				out.write(buff, 0, iRead);
			}
			read.close();
			out.flush();
			out.close();
		} catch(Exception ex) {
			ex.printStackTrace();
		}
	}
}
