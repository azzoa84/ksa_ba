package fingersales.defined.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import fingersales.common.constants.SharedProperties;
import fingersales.common.util.FingerParamMap;
import fingersales.common.util.Utility;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.util.Map;

import org.springframework.web.servlet.view.AbstractView;

public class CreateProcessMediaFile extends AbstractView {
	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest req, HttpServletResponse res) throws Exception {
		createFile(req, res);
	}
	
	private void createFile(HttpServletRequest req, HttpServletResponse res) {
		FingerParamMap map = Utility.getSimpleRequestMap(req);
		
		try {
			File file = new File(SharedProperties.PROP_COMM.UPLOAD_FILE_PATH + "\\ServerFiles\\" + map.get("file_name").toString());
			
			if (file.exists()) {
				file.delete();
			}
			
			OutputStream os = new FileOutputStream(file);
			OutputStreamWriter osw = new OutputStreamWriter(os);
			
			osw.write(map.get("contents").toString());
			
			os.flush();
			osw.flush();
			os.close();
			osw.close();
		} catch(Exception ex) {
			ex.printStackTrace();
		}
		
		/*
		OutputStream out = null;
		FileInputStream read = null;
		String filePath = (SharedProperties.PROP_COMM.UPLOAD_FILE_PATH + "\\" + map.get("file_name").toString());
		
		try {
			read = new FileInputStream(filePath);
		} catch(Exception ex) {
			System.out.println("Error");
			return;
		}
		
		try {
			int iRead = 0;
			byte[] stringByte = map.get("contents").toString().getBytes();
			
			res.setContentType("application/octet-stream; charset=UTF-8");
			res.setHeader("Content-Disposition", "attachment; filename=\"" + URLEncoder.encode(map.get("file_name").toString(), "utf-8") + "\";");
			
			out = res.getOutputStream();
			
			while(read != null && (iRead = read.read()) > 0) {
				out.write(stringByte, 0, iRead);
			}
			
			read.close();
			out.flush();
			out.close();
		} catch (Exception e) {
			ex.printStackTrace();
		}
		*/
	}
}
