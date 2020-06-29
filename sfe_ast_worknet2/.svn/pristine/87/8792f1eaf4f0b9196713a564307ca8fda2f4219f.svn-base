package fingersales.common.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.StringReader;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jsoup.Jsoup;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorker;
import com.itextpdf.tool.xml.XMLWorkerFontProvider;
import com.itextpdf.tool.xml.XMLWorkerHelper;
import com.itextpdf.tool.xml.css.CssFile;
import com.itextpdf.tool.xml.css.StyleAttrCSSResolver;
import com.itextpdf.tool.xml.html.CssAppliers;
import com.itextpdf.tool.xml.html.CssAppliersImpl;
import com.itextpdf.tool.xml.html.Tags;
import com.itextpdf.tool.xml.parser.XMLParser;
import com.itextpdf.tool.xml.pipeline.css.CSSResolver;
import com.itextpdf.tool.xml.pipeline.css.CssResolverPipeline;
import com.itextpdf.tool.xml.pipeline.end.PdfWriterPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipelineContext;

import fingersales.common.util.FingerParamMap;

/**
 * @Class Name : AbstractPdfExportService.java
 * @Description :
 * @Modification Information
 * @ @ 수정일 수정자 수정내용 @ --------- --------- -------------------------------
 * 
 * @author UBCare
 * @since 2018.03.13
 * @version 1.0
 * @see
 * 
 * 		Copyright (C) by UBCARE All right reserved.
 */
public abstract class AbstractPdfExportService extends PdfPageEventHelper{
	protected Logger log = LoggerFactory.getLogger(this.getClass());
	
	public void openPdf(HttpServletRequest request, HttpServletResponse response, FingerParamMap param) {
		try {
			Document document = new Document(PageSize.A4, 20, 20, 40, 40);
			
			PdfWriter writer = PdfWriter.getInstance(document, response.getOutputStream());
			writer.setEncryption(null , null , PdfWriter.HideWindowUI , PdfWriter.STRENGTH40BITS);  
			writer.setViewerPreferences (PdfWriter.HideToolbar) ;
			writer.setInitialLeading(12.5f);
			writer.setTagged();
			writer.setPageEvent(this);
			
			document.open();
			makePdf(document, writer, request, param);
			
			document.close();
			writer.close();
		} catch (DocumentException de) {
			log.info(de.toString());
		} catch (Exception e) {
			log.info(e.toString());
		}
	}
	
	public File createPdfFile(HttpServletRequest request, HttpServletResponse response, FingerParamMap param) {
		try {
			Document document = new Document(PageSize.A4, 20, 20, 40, 40);
						
			File fDir = new File(param.get("fDir").toString());
			if(!fDir.exists()) fDir.mkdirs();
			
			File file = new File(param.get("fDir").toString() + param.get("fileName").toString());
			
			FileOutputStream out = new FileOutputStream(file);
			PdfWriter writer = PdfWriter.getInstance(document, out);
			
			String password = param.get("password").toString();
			
			if (password != null && !"".equals(password))
				writer.setEncryption(password.getBytes(), password.toString().getBytes(), PdfWriter.ALLOW_COPY, PdfWriter.STANDARD_ENCRYPTION_40);
			
			writer.setInitialLeading(12.5f);
			writer.setTagged();
			writer.setPageEvent(this);
			
			document.open();
			makePdf(document, writer, request, param);
			document.close();
			writer.close();
			
			return file;
		} catch (DocumentException de) {
			log.info(de.toString());
			return null;
		} catch (Exception e) {
			log.info(e.toString());
			return null;
		}
	}
	
	public void convertHtmlToPdf(HttpServletRequest request, HttpServletResponse response, FingerParamMap param) {
		try {
			// css
			String cssPath = request.getSession().getServletContext().getRealPath("/fingerPlatform/css/pdf_style.css");
			
			// font
			String normalFont = request.getSession().getServletContext().getRealPath("/fonts/NanumGothic.TTF");
			String gothicBoldFont = request.getSession().getServletContext().getRealPath("/fonts/NanumGothicBold.TTF");
			String extraBoldFont = request.getSession().getServletContext().getRealPath("/fonts/NanumExtraBold.ttf");
			
			Document document = new Document(PageSize.A4, 20, 20, 20, 20); // 용지
																			// 및
																			// 여백
																			// 설정

			// PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream("d:/test.pdf")); // 바로 다운로드.
			PdfWriter writer = PdfWriter.getInstance(document, response.getOutputStream());
			writer.setInitialLeading(12.5f);

			// 파일 다운로드 설정
			/*
			 * response.setContentType("application/pdf"); String fileName = URLEncoder.encode("pdffile", "UTF-8"); // 파일명이 한글일 땐 인코딩 필요
			 * response.setHeader("Content-Transper-Encoding", "binary");
			 * response.setHeader("Content-Disposition", "inline; filename=" + fileName + ".pdf");
			 */
			
			// Document 오픈
			document.open();
			XMLWorkerHelper helper = XMLWorkerHelper.getInstance();

			// CSS
			CSSResolver cssResolver = new StyleAttrCSSResolver(); //
			CssFile cssFile = helper.getCSS(new FileInputStream(cssPath));
			cssResolver.addCss(cssFile);

			// HTML, 폰트 설정
			XMLWorkerFontProvider fontProvider = new XMLWorkerFontProvider(XMLWorkerFontProvider.DONTLOOKFORFONTS);
			fontProvider.register(normalFont, "normalFont");
			fontProvider.register(gothicBoldFont, "gothicBoldFont");
			fontProvider.register(extraBoldFont, "extraBoldFont");

			CssAppliers cssAppliers = new CssAppliersImpl(fontProvider);

			HtmlPipelineContext htmlContext = new HtmlPipelineContext(cssAppliers);
			htmlContext.setTagFactory(Tags.getHtmlTagProcessorFactory());

			// Pipelines
			PdfWriterPipeline pdf = new PdfWriterPipeline(document, writer);
			HtmlPipeline html = new HtmlPipeline(htmlContext, pdf);
			CssResolverPipeline css = new CssResolverPipeline(cssResolver, html);

			XMLWorker worker = new XMLWorker(css, true);
			XMLParser xmlParser = new XMLParser(worker, Charset.forName("UTF-8"));

			org.jsoup.nodes.Document doc = Jsoup.parseBodyFragment(param.get("pHtml").toString());
			doc.outputSettings().syntax(org.jsoup.nodes.Document.OutputSettings.Syntax.xml);
			doc.outputSettings().charset("UTF-8");

			String xHtml = doc.html();
			xHtml = xHtml.replace("<thead>", "<thead style='font-family: extraBoldFont;'>");
			xHtml = xHtml.replace("<tbody>", "<tbody style='font-family: normalFont;'>");

			StringReader strReader = new StringReader(xHtml);
			xmlParser.parse(strReader);

			document.close();
			writer.close();
		} catch (Exception ex) {
			log.info(ex.toString());
			log.info(ex.getMessage());
		}
	}
 
    public abstract Document makePdf(Document document, PdfWriter writer, HttpServletRequest request, FingerParamMap param);
}