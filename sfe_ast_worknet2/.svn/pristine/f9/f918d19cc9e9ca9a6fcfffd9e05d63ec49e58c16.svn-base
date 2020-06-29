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

import fingersales.common.constants.SharedProperties;

public class FileDownload extends AbstractView {
	protected Log log = LogFactory.getLog(this.getClass());
	
	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest req, HttpServletResponse res) throws Exception {
		String filePath = req.getParameter("file_path");
		String fileName = req.getParameter("file_name");
		if (fileName == null || fileName.equals("")) {
			//fileName = "download";
			fileName = filePath.substring(filePath.lastIndexOf("/") + 1, filePath.length());
		}
		if (filePath == null || filePath.equals("")) { 
			fileNotExists(res);
		} else { 
			fileDownload(filePath, fileName, req, res);
		}
	}
	
	private void fileNotExists(HttpServletResponse res) {
		try {
			res.setContentType("text/html; Charset=UTF-8");
			PrintStream out = new PrintStream(res.getOutputStream());
			out.println("<script>alert('요청된 파일을 찾을 수 없습니다.');window.close();</script>");
			out.close();
		} catch(Exception ex) {
			log.info(ex.toString());
			log.info(ex.getMessage());
		}
	}
	
	private void fileDownload(String fileSubPath, String fileName, HttpServletRequest req, HttpServletResponse res) {
		OutputStream out = null;
		FileInputStream read = null;
		String filePath = (SharedProperties.PROP_COMM.UPLOAD_FILE_PATH + fileSubPath);
		//System.out.println("filePath : " + filePath);
		//String filePath = req.getServletContext().getRealPath(map.get(0).get("filePath").toString());

		try {
			read = new FileInputStream(filePath);
		} catch(Exception ex) {
			fileNotExists(res);
			return;
		}
		
		try {
			int iRead = 0;
			byte[] buff = new byte[4096];
			//res.setContentType("image/jpeg");
			//res.setHeader("Content-Disposition", "inline");
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
