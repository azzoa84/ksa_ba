package fingersales.common.service;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.ExceptionConverter;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPCellEvent;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfTemplate;
import com.itextpdf.text.pdf.PdfWriter;

import fingersales.common.util.FingerParamMap;

/**
 * @Class Name : PDFCprService.java
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
public class PDFCprService extends AbstractPdfExportService {
	protected Logger log = LoggerFactory.getLogger(this.getClass());
	
	public Font fontNormal, fontHeaderNormal, fontMidium, fontBold;
	public BaseColor hNameColor, cNameColor, borderColor, topBorderColor;		
	public String sign, logo;
	List<PdfTemplate> totalList1, totalList2, totalList3;
	public float spacing; 
	
	public PDFCprService(HttpServletRequest request) {
		String normalBold = request.getSession().getServletContext().getRealPath("/fonts/NanumGothic.ttf");
		String midiumBold = request.getSession().getServletContext().getRealPath("/fonts/NanumGothicBold.ttf");
		String extraBold = request.getSession().getServletContext().getRealPath("/fonts/NanumExtraBold.ttf");
		
		String sign = request.getSession().getServletContext().getRealPath("/img/ast/use_sign.jpg");
		String logo = request.getSession().getServletContext().getRealPath("/img/ast/Astellas Logo.jpg");
		
		BaseFont baseFont;
				
		try {
			baseFont = BaseFont.createFont(normalBold, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
			this.fontNormal = new Font(baseFont);
			this.fontHeaderNormal = new Font(baseFont);
			
			baseFont = BaseFont.createFont(midiumBold, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
			this.fontMidium = new Font(baseFont);
						
			baseFont = BaseFont.createFont(extraBold, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
			this.fontBold = new Font(baseFont);
			
			this.hNameColor = new BaseColor(251, 232, 237);
			this.borderColor = new BaseColor(141, 139, 139);
			this.topBorderColor = new BaseColor(218, 30, 72);
			
			this.sign = sign;
			this.logo = logo;
			
			this.spacing = 9f;
		} catch (Exception e) {
			this.fontNormal = null;
			this.fontMidium = null;
			this.fontBold = null;
		}
	}
	
	class DottedBorder extends AbstractPdfBorderService {
	    public DottedBorder(int border, BaseColor baseColor) { super(border, baseColor); }
	    public void setLineDash(PdfContentByte canvas) {
	        canvas.setLineCap(PdfContentByte.LINE_CAP_ROUND);
	        canvas.setLineDash(0, 2, 2);
	    }
	}

	class SolidBorder extends AbstractPdfBorderService {
	    public SolidBorder(int border, BaseColor baseColor) { super(border, baseColor); }
	    public void setLineDash(PdfContentByte canvas) {}
	}
		
	@Override
	public void onOpenDocument(PdfWriter writer, Document document) {
		totalList1 = new ArrayList<PdfTemplate>();
		totalList2 = new ArrayList<PdfTemplate>();
		totalList3 = new ArrayList<PdfTemplate>();
	}
	
	@Override
	public void onStartPage(PdfWriter writer, Document document) {
		PdfTemplate total1 = writer.getDirectContent().createTemplate(250, 100);
		totalList1.add(total1);
		PdfTemplate total2 = writer.getDirectContent().createTemplate(80, 100);
		totalList2.add(total2);
		PdfTemplate total3 = writer.getDirectContent().createTemplate(200, 100);
		totalList3.add(total3);
		
		int pageNum = writer.getCurrentPageNumber();
		
		try {
			PdfContentByte cb = writer.getDirectContent();
			fontHeaderNormal.setSize(11);
			
			if (pageNum == 1) {
				fontHeaderNormal.setSize(11);
				fontHeaderNormal.setColor(255, 18, 18);
				
				Phrase topLeft = new Phrase("[표지]", fontHeaderNormal);
				
				ColumnText.showTextAligned(cb, Element.ALIGN_LEFT,
										   topLeft,
						                   (document.right() - document.left()) / 2 - 240, document.top() - 10, 0);
			} else {
				PdfPTable bottomTable = new PdfPTable(1);
		        PdfPCell cell;
		        
				cell = new PdfPCell(new Phrase("", fontHeaderNormal));
				cell.setFixedHeight(20);
				cell.setBorder(PdfPCell.NO_BORDER);
				cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
				bottomTable.addCell(cell);
				
				document.add(bottomTable);
			}
			fontHeaderNormal.setColor(189, 189, 189);
			Phrase topRight = new Phrase("CONFIDENTIAL", fontHeaderNormal);
			
	        ColumnText.showTextAligned(cb, Element.ALIGN_LEFT,
				        			   topRight,
					                   (document.right() - document.left()) / 2 + 200, document.top() - 10, 0);    	
	    } catch (Exception e) {
			log.info(e.toString());
		}
	}
	
	@Override
	public void onEndPage(PdfWriter writer, Document document) {
		PdfPTable bottomTable = new PdfPTable(new float[] {5, 3, 4});
		PdfPCell cell;
        try {	        
        	cell = new PdfPCell(Image.getInstance(totalList1.get(writer.getPageNumber() - 1)));
            cell.setBorder(PdfPCell.NO_BORDER);
            cell.setFixedHeight(110);
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            bottomTable.addCell(cell);
            
            cell = new PdfPCell(Image.getInstance(totalList2.get(writer.getPageNumber() - 1)));
            cell.setBorder(PdfPCell.NO_BORDER);
            cell.setFixedHeight(110);
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            bottomTable.addCell(cell);
            
            cell = new PdfPCell(Image.getInstance(totalList3.get(writer.getPageNumber() - 1)));
            cell.setBorder(PdfPCell.NO_BORDER);
            cell.setFixedHeight(110);
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            bottomTable.addCell(cell);
            
            bottomTable.setTotalWidth(document.getPageSize().getWidth()
                    - document.leftMargin() - document.rightMargin());
            bottomTable.writeSelectedRows(0, -1, document.leftMargin(),
                    document.bottomMargin() + 15, writer.getDirectContent());
        }
        catch(DocumentException de) {
        	log.info(de.toString());
            throw new ExceptionConverter(de);
        }
    }
	
	@Override
	public void onCloseDocument(PdfWriter writer, Document document) {
		try {
			fontMidium.setSize(11);
			fontMidium.setColor(0, 0, 0);
	        Phrase footer = new Phrase("한국아스텔라스제약㈜ 서울시 강남구 학동로 401 ", fontMidium);
	        
	        Image signImage = Image.getInstance(sign);
	        signImage.setRotationDegrees(180);
	        
	        Phrase pSign = new Phrase();
	        pSign.add(new Chunk(signImage, 55, 55, true));
	        
	        Image logoImage = Image.getInstance(logo);
	        logoImage.setRotationDegrees(180);
	        
	        Phrase pLogo = new Phrase();
	        pLogo.add(new Chunk(logoImage, 162, 36, true));
	        
	        ColumnText.showTextAligned(totalList1.get(writer.getPageNumber() - 1), Element.ALIGN_LEFT,
	                footer,
	                2, 75, 0);
	        
	        ColumnText.showTextAligned(totalList2.get(writer.getPageNumber() - 1), Element.ALIGN_LEFT,
	        		pSign,
	                0, 52, 0);
	        
	        ColumnText.showTextAligned(totalList3.get(writer.getPageNumber() - 1), Element.ALIGN_LEFT,
	        		pLogo,
	                5, 63, 0);
	    } catch (Exception e) {
	    	log.info(e.toString());
		}
	};
					
	@Override
	@SuppressWarnings("rawtypes")
	public Document makePdf(Document document, PdfWriter writer, HttpServletRequest request, FingerParamMap param) {
		// PAGE 1
		createMainPage(document, param);
		document.newPage();
		/*
		PdfContentByte canvas = writer.getDirectContent();
        Rectangle rect = new Rectangle(18, 36, 576, 806);
        rect.setBorder(Rectangle.BOX);
        rect.setBorderWidth(2);
        canvas.rectangle(rect);*/
        
		try {
			// PAGE 2
			String jsonData = param.get("param").toString();
			
			if (jsonData != null) {
				Gson gson = new Gson();
	    		JsonParser parser = new JsonParser();
	    		JsonElement rootElement = parser.parse(jsonData);		
	    		JsonObject rootObj = rootElement.getAsJsonObject();
	            float beforeSapcing = 0;
	    		
	    		List table1 = gson.fromJson(rootObj.get("p1"), List.class);
    			if (table1 != null) {
	            	document.add(createSubTitle("견본품 제공", 12, beforeSapcing, 9f, new BaseColor(75, 61, 61)));
	            	document.add(createFirstTable(table1));
	            	beforeSapcing = spacing;
	            }
	            
	            List table2 = gson.fromJson(rootObj.get("p2"), List.class);
	            if (table2 != null) {
	            	document.add(createSubTitle("학술대회지원", 12, beforeSapcing, 9f, new BaseColor(75, 61, 61)));
	            	document.add(createSecondTable(table2));
	            	beforeSapcing = spacing;
	            }
	            	           
	            List table3 = gson.fromJson(rootObj.get("p3"), List.class);            
	            if (table3 != null) {
	            	document.add(createSubTitle("임상시험정보", 12, beforeSapcing, 9f, new BaseColor(75, 61, 61)));
	            	document.add(createThirdTable(table3));
	            	beforeSapcing = spacing;
	            }
	            	
	            List table4 = gson.fromJson(rootObj.get("p4"), List.class);     
	            if (table4 != null) {
	            	document.add(createSubTitle("제품설명회", 12, beforeSapcing, null, new BaseColor(75, 61, 61)));
	            	document.add(createSubTitle("[복수 요양기관 대상 제품설명회]", 9, 0.1f, 8f, new BaseColor(166, 50, 93)));
	            	document.add(createFourthTable(table4));
	            	beforeSapcing = spacing;
	            }
	            
	            List table5 = gson.fromJson(rootObj.get("p5"), List.class);   
	            if (table5 != null) {
	            	if (table4 == null) {
	            		document.add(createSubTitle("제품설명회", 12, beforeSapcing, null, new BaseColor(75, 61, 61)));
	            		document.add(createSubTitle("[개별 요양기관 방문 제품설명회]", 9, 0.1f, 8f, new BaseColor(166, 50, 93)));
	            	} else {
	            		document.add(createSubTitle("[개별 요양기관 방문 제품설명회]", 9, 9f, 8f, new BaseColor(166, 50, 93)));
	            	}
	            	document.add(createFifthTable(table5));
	            	beforeSapcing = spacing;
	            }
	            
	            List table6 = gson.fromJson(rootObj.get("p6"), List.class); 
	            if (table6 != null) {
	            	document.add(createSubTitle("시판 후 조사", 12, beforeSapcing, 9f, new BaseColor(75, 61, 61)));
	            	document.add(createSixthTable(table6));
				}
            }
			
			return document;
		} catch (Exception e) {
			log.info(e.toString());
			return document;
		}
	}
	
	/**
	 *	[메인 페이지 생성] 
	 */
	public void createMainPage(Document document, FingerParamMap param) {
		String nowDay = param.get("nowDay").toString();
		String companyName = param.get("companyName").toString();
		String hcpName = param.get("hcpName").toString();
		String date = param.get("date").toString();
		
		try {
			PdfPTable table;
			PdfPCell cell;
			Chunk ch; 
			Paragraph paragraph;
						
			fontMidium.setColor(0, 0, 0);
			
			// 공간
			table = new PdfPTable(1);
			cell = new PdfPCell(new Phrase("", fontMidium));
			cell.setBorder(PdfPCell.NO_BORDER);
			table.addCell(cell);
			table.setSpacingAfter(160);
			document.add(table);
			
			// ROW 1			
			fontBold.setSize(27);
			ch = new Chunk("경제적 이익 제공에 따른 지출보고서", fontBold);
			
			paragraph = new Paragraph();
			paragraph.add(ch);
			paragraph.setAlignment(1);
			paragraph.setSpacingAfter(100);
			document.add(paragraph);
			
			// ROW 2
			//fontMidium.setSize(19);
			fontNormal.setSize(17);
			fontNormal.setColor(0, 0, 0);
			ch = new Chunk(nowDay, fontNormal);
			paragraph = new Paragraph();
			paragraph.add(ch);
			paragraph.setAlignment(1);
			paragraph.setSpacingAfter(120);
			document.add(paragraph);
			
			// ROW 3
			table = new PdfPTable(1);
			table.setWidthPercentage(85);
			
			fontMidium.setSize(13);
			cell = new PdfPCell(new Phrase(" 소 속 : " + companyName, fontMidium));
			cell.setFixedHeight(30);
			cell.setHorizontalAlignment(Element.ALIGN_LEFT);
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
			table.addCell(cell);
			
			cell = new PdfPCell(new Phrase(" 성 함 : " + hcpName, fontMidium));
			cell.setFixedHeight(30);
			cell.setHorizontalAlignment(Element.ALIGN_LEFT);
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
			table.addCell(cell);
			
			cell = new PdfPCell(new Phrase(" 기 간 : " + date, fontMidium));
			cell.setFixedHeight(30);
			cell.setHorizontalAlignment(Element.ALIGN_LEFT);
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
			table.addCell(cell);
			table.setSpacingAfter(110);
			document.add(table);
			
			// ROW 4
			table = new PdfPTable(1);
			table.setWidthPercentage(85);
			cell = new PdfPCell(new Phrase("한국아스텔라스제약㈜은 귀하로부터 본 지출보고서 내역 제공에 대한 사전 동의를\n득하였음을 확인합니다.", fontMidium));
			cell.setFixedHeight(60);
			cell.setBorder(PdfPCell.NO_BORDER);
			cell.setHorizontalAlignment(Element.ALIGN_LEFT);
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
			cell.setExtraParagraphSpace(10f);
			table.addCell(cell);
			document.add(table);
		} catch (Exception e) {
			log.info(e.toString());
		}
	}
	
	public Paragraph createSubTitle(String title, int size, Float beforeSpacing, Float afterSpacing, BaseColor color) {
		fontMidium.setSize(size);
		fontMidium.setColor(color);
		
		Chunk ch = new Chunk(title, fontMidium);
		Paragraph paragraph = new Paragraph();
		paragraph.setSpacingBefore(beforeSpacing);
		
		if (afterSpacing != null)
			paragraph.setSpacingAfter(afterSpacing);
		
		paragraph.add(ch);
				
		return paragraph;
	}

	/**
	 *  [견본품 제공]
	 */
	@SuppressWarnings("rawtypes")
	public PdfPTable createFirstTable(List list) {
		PdfPTable table = new PdfPTable(new float[] {1, 1.5f, 1, 1.5f, 1, 1, 1, 1, 1});
		table.setWidthPercentage(100);
		table.setSpacingAfter(10f);
		
		PdfPCell cell;
		
		// 1 ROW
		cell = createHeader("①연번", 55f, 1, 2, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("요양기관정보", 23f, 2, 1, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), new DottedBorder(PdfPCell.RIGHT, borderColor), new DottedBorder(PdfPCell.BOTTOM, borderColor), null);
		table.addCell(cell);
		
		cell = createHeader("의약품 정보", 23f, 5, 1, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), new DottedBorder(PdfPCell.RIGHT, borderColor), new DottedBorder(PdfPCell.BOTTOM, borderColor), null);
		table.addCell(cell);
		
		cell = createHeader("⑨\n제공일자", 55f, 1, 2, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), null, null, null);
		table.addCell(cell);
		
		// 2 ROW
		cell = createHeader("②기관명칭", 32f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("③요양기관기호", 32f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("④제품명\n(표준코드명칭)", 32f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("⑤표준코드\n(제품코드)", 32f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("⑥포장 내\n총수량(규격)", 32f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("⑦제공수량", 32f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("⑧계\n(⑥×⑦)", 32f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
    
		createDetail(table, cell, list, 1);
		return table;
	}
	
	/**
	 *  [학술대회지원]
	 */
	@SuppressWarnings("rawtypes")
	public PdfPTable createSecondTable(List list) {
		PdfPTable table = new PdfPTable(new float[] {1, 1.5f, 2, 1.5f, 1.5f, 1});
		table.setWidthPercentage(100);
		table.setSpacingAfter(10f);
		PdfPCell cell;
		
		// 테이블 헤더
		cell = createHeader("①연번", 55f, 1, 2, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("학술대회 정보", 23f, 4, 1, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), new DottedBorder(PdfPCell.RIGHT, borderColor), new DottedBorder(PdfPCell.BOTTOM, borderColor), null);
		table.addCell(cell);
			    
		cell = createHeader("⑥\n지원금액", 55f, 1, 2, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), null, null, null);
		table.addCell(cell);
	   		
		cell = createHeader("②주최기간", 32f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("③대회명칭", 32f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("④대회장소", 32f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("⑤대회일시", 32f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
    
		createDetail(table, cell, list, 2);
		return table;
	}
	
	/**
	 *  [임상시험정보]
	 */
	@SuppressWarnings("rawtypes")
	public PdfPTable createThirdTable(List list) {
		//PdfPTable table = new PdfPTable(13);
		PdfPTable table = new PdfPTable(new float[] {0.8f, 2f, 0.7f, 1, 1, 1, 1.3f, 1, 1.5f, 1, 1.5f, 0.7f, 1});
		table.setWidthPercentage(100);
		//table.setWidthPercentage(100);
		table.setWidthPercentage(100);
		table.setSpacingAfter(10f);
		PdfPCell cell;
		
		// 1 ROW
		cell = createHeader("①연번", 71f, 1, 3, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("임상시험정보", 23f, 4, 1, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), new DottedBorder(PdfPCell.RIGHT, borderColor), new DottedBorder(PdfPCell.BOTTOM, borderColor), null);
		table.addCell(cell);
		
		cell = createHeader("임상시험책임자", 23f, 2, 1, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), new DottedBorder(PdfPCell.RIGHT, borderColor), new DottedBorder(PdfPCell.BOTTOM, borderColor), null);
		table.addCell(cell);
		
		cell = createHeader("공동연구자", 23f, 2, 1, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), new DottedBorder(PdfPCell.RIGHT, borderColor), new DottedBorder(PdfPCell.BOTTOM, borderColor), null);
		table.addCell(cell);
		
		cell = createHeader("지원내역", 23f, 3, 1, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), new DottedBorder(PdfPCell.RIGHT, borderColor), new DottedBorder(PdfPCell.BOTTOM, borderColor), null);
		table.addCell(cell);
		
		cell = createHeader("⑬\n계약일", 71f, 1, 3, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), null, null, null);
		table.addCell(cell);
		
		// 2 ROW
		cell = createHeader("②명칭", 48f, 1, 2, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("③\n구분", 48f, 1, 2, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("④\n승인번호", 48f, 1, 2, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("⑤\n승인일자", 48f, 1, 2, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("⑥성명", 48f, 1, 2, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("⑦소속", 48f, 1, 2, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("⑧성명", 48f, 1, 2, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("⑨소속", 48f, 1, 2, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("⑩\n연구비", 48f, 1, 2, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("의약품", 23f, 2, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), new DottedBorder(PdfPCell.BOTTOM, borderColor), null);
		table.addCell(cell);
		
		// 3 ROW
		cell = createHeader("⑪\n제품명", 25f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("⑫\n수량", 25f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
    
		createDetailThird(table, cell, list, 3);
		return table;
	}
	
	/**
	 *  [제품설명회(복수)]
	 */
	@SuppressWarnings("rawtypes")
	public PdfPTable createFourthTable(List list) {
		PdfPTable table = new PdfPTable(new float[] {1, 1.5f, 1, 1.5f, 1, 1, 1, 1, 1.7f, 1.8f});
		table.setWidthPercentage(100);
		table.setSpacingAfter(10f);
		PdfPCell cell;
		
		// 1 ROW
		cell = createHeader("①연번", 55f, 1, 2, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("②제품명\n(표준코드명칭)", 55f, 1, 2, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("의료인 정보", 23f, 2, 1, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), new DottedBorder(PdfPCell.RIGHT, borderColor), new DottedBorder(PdfPCell.BOTTOM, borderColor), null);
		table.addCell(cell);
		
		cell = createHeader("의약품 정보", 23f, 4, 1, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), new DottedBorder(PdfPCell.RIGHT, borderColor), new DottedBorder(PdfPCell.BOTTOM, borderColor), null);
		table.addCell(cell);
		
		cell = createHeader("⑨장소", 55f, 1, 2, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("⑩일시", 55f, 1, 2, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), null, null, null);
		table.addCell(cell);
		
		// 2 ROW
		cell = createHeader("③성명", 32f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("④소속", 32f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("⑤교통비", 32f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("⑥기념품비", 32f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("⑦숙박비", 32f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("⑧식음료비", 32f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
    
		createDetail(table, cell, list, 4);
		return table;
	}
	
	/**
	 *  [제품설명회(개별)]
	 */
	@SuppressWarnings("rawtypes")
	public PdfPTable createFifthTable(List list) {
		PdfPTable table = new PdfPTable(new float[] {1, 1, 1.5f, 1, 1, 1, 1.5f, 1});
		table.setWidthPercentage(100);
		table.setSpacingAfter(10f);
		PdfPCell cell;
		
		// 1 ROW
		cell = createHeader("①연번", 55f, 1, 2, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("②제품명\n(표준코드명칭)", 55f, 1, 2, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("요양기관 정보", 23f, 2, 1, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), new DottedBorder(PdfPCell.RIGHT, borderColor), new DottedBorder(PdfPCell.BOTTOM, borderColor), null);
		table.addCell(cell);
		
		cell = createHeader("의료인 정보", 23f, 1, 1, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), new DottedBorder(PdfPCell.RIGHT, borderColor), new DottedBorder(PdfPCell.BOTTOM, borderColor), null);
		table.addCell(cell);
		
		cell = createHeader("⑥지원금액\n(식음료)", 55f, 1, 2, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("⑦장소", 55f, 1, 2, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("⑧일시", 55f, 1, 2, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), null, null, null);
		table.addCell(cell);
		
		// 2 ROW
		cell = createHeader("③기관명칭", 32f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("④요양기관번호", 32f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("⑤성명", 32f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
    
		createDetail(table, cell, list, 5);
		return table;
	}

	/**
	 *  [시판 후 조사]
	 */
	@SuppressWarnings("rawtypes")
	public PdfPTable createSixthTable(List list) {
		PdfPTable table = new PdfPTable(new float[] {1, 1.5f, 1.5f, 1.5f, 1.5f, 1.5f, 1.5f});
		table.setWidthPercentage(100);
		PdfPCell cell;
		
		// 1 ROW
		cell = createHeader("①연번", 55f, 1, 2, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("의약품 정보", 23f, 1, 1, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), new DottedBorder(PdfPCell.RIGHT, borderColor), new DottedBorder(PdfPCell.BOTTOM, borderColor), null);
		table.addCell(cell);
		
		cell = createHeader("의료인 정보", 23f, 3, 1, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), new DottedBorder(PdfPCell.RIGHT, borderColor), new DottedBorder(PdfPCell.BOTTOM, borderColor), null);
		table.addCell(cell);
		
		cell = createHeader("지원내역", 23f, 2, 1, hNameColor);
		createBorder(cell, new SolidBorder(PdfPCell.TOP, topBorderColor), null, new DottedBorder(PdfPCell.BOTTOM, borderColor), null);
		table.addCell(cell);
				
		// 2 ROW
		cell = createHeader("②제품명\n(표준코드명칭)", 23f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("③재심사 대상여부", 32f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("④성명", 32f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("⑤소속", 32f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("⑥단가/건", 32f, 1, 1, hNameColor);
		createBorder(cell, null, new DottedBorder(PdfPCell.RIGHT, borderColor), null, null);
		table.addCell(cell);
		
		cell = createHeader("⑦건수", 32f, 1, 1, hNameColor);
		createBorder(cell, null, null, null, null);
		table.addCell(cell);
    
		createDetail(table, cell, list, 6);
		return table;
	}
	
	/**
	 *  [그리드 데이터 셀 생성(임상시험정보 제외)]
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void createDetail(PdfPTable table, PdfPCell cell, List list, int tableNum) {
		String value = "";
		for(int i = 0; i < list.size(); i++){
			Map<String, Object> map = (Map<String, Object>)list.get(i);
			int index = 1;
			
            for(String key : map.keySet()){
                value = map.get(key).toString();
                if (!"".equals(value) && value != null) {
                	value = value.replaceAll("<br>", "\n");
                	
                	if (isStringDouble(value)) {
                		double num =  Double.parseDouble(value);
                		value = String.format(setFormatType(key, tableNum), (int)num);
	            	}
                }
                
                cell = createCell(value);
            	cell.setMinimumHeight(24f);
            	            	            	
            	if (index != map.size()) {
        			cell.setCellEvent(new DottedBorder(PdfPCell.RIGHT, borderColor));
        		}
            	
            	if (i == list.size() - 1) {
        			cell.setCellEvent(new SolidBorder(PdfPCell.BOTTOM, new BaseColor(148, 148, 148)));
        		} else {
        			cell.setCellEvent(new DottedBorder(PdfPCell.BOTTOM, borderColor));
        		}
            	
            	table.addCell(cell);
        		index++;
            }
		}
	}
	
	/**
	 *  [그리드 데이터 셀 생성(임상시험정보만)]
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void createDetailThird(PdfPTable table, PdfPCell cell, List list, int tableNum) {
		String value = "";
		for(int i = 0; i < list.size(); i++){
			Map<String, Object> map = (Map<String, Object>)list.get(i);
			int index = 1, rowCnt = 1, totCnt = 1;
            
            for(String key : map.keySet()){
            	cell = null;
            	
            	double dRowCnt = Double.parseDouble(map.get("row_cnt").toString());
            	double dTotCnt = Double.parseDouble(map.get("tot_cnt").toString());
            	
            	rowCnt = (int)dRowCnt;
            	totCnt = (int)dTotCnt;
            	
            	if (index <= map.size() - 2) {
            		value = map.get(key).toString();
	                if (!"".equals(value) && value != null) {
	                	value = value.replaceAll("<br>", "\n");
	                	
	                	if (isStringDouble(value)) {
	                		double num =  Double.parseDouble(value);
	                		value = String.format(setFormatType(key, tableNum), (int)num);
		            	}
	                }
	                
	                boolean isLastLine = false;
	                if (!"contact_name".equals(key) && !"company_name".equals(key)) {
	                	 if (rowCnt == 1) {
	                		 cell = createCell(value);
	                		 cell.setRowspan(totCnt);
	                		 cell.setMinimumHeight(24f * totCnt);
	                		 if (i == list.size() - 1) isLastLine = true;
	                	 }
	                } else {
	                	cell = createCell(value);
	                	cell.setRowspan(1);
	                	cell.setMinimumHeight(24f);
	                }
	                
	                if (cell != null) {
		            	if (index != map.size() - 2) {
		        			cell.setCellEvent(new DottedBorder(PdfPCell.RIGHT, borderColor));
		        		}
		            	
		            	if (i == list.size() - 1) {
		        			cell.setCellEvent(new SolidBorder(PdfPCell.BOTTOM, new BaseColor(148, 148, 148)));
		        		} else {
		        			if (isLastLine) {
		        				cell.setCellEvent(new SolidBorder(PdfPCell.BOTTOM, new BaseColor(148, 148, 148)));
		        			} else {
		        				cell.setCellEvent(new DottedBorder(PdfPCell.BOTTOM, borderColor));
		        			}
		        		}
		            	
		            	table.addCell(cell);
		        		index++;
	                }
            	}
            }
		}
	}
	
	/**
	 *	[그리드 헤더 생성]
	 */
	public PdfPCell createHeader(String content, Float height, int colspan, int rowspan, BaseColor color) {
		fontBold.setSize(8);
		fontBold.setColor(new BaseColor(173, 62, 93));
		
		PdfPCell cell = new PdfPCell(new Phrase(content, fontBold));
		cell.setFixedHeight(height);
		cell.setExtraParagraphSpace(2f);
		cell.setBackgroundColor(color);
		cell.setBorder(PdfPCell.NO_BORDER);
		cell.setColspan(colspan);
		cell.setRowspan(rowspan);
			
		cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
		return cell;
	}
		
	/**
	 *	[그리드 디테일 생성]
	 */
	public PdfPCell createCell(String content) {
		fontNormal.setSize(8);
		fontNormal.setColor(new BaseColor(75, 61, 61));
		PdfPCell cell = new PdfPCell(new Phrase(content, fontNormal));
		cell.setExtraParagraphSpace(2f);
		cell.setBorder(PdfPCell.NO_BORDER);
		cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
		return cell;
	}
		
	public void createBorder(PdfPCell cell, PdfPCellEvent top, PdfPCellEvent right, PdfPCellEvent bottom, PdfPCellEvent left) {
		if (top != null) {
			cell.setCellEvent(top);
		}
		
		if (right != null) {
			cell.setCellEvent(right);
		}
		
		if (bottom != null) {
			cell.setCellEvent(bottom);
		}
		
		if (left != null) {
			cell.setCellEvent(left);
		}
	}
	
	private String setFormatType(String key, int tableNum) {
		String formatType = "%d";
		
		if (tableNum == 1) {
			if ("product_unit".equals(key) || "product_qty".equals(key) || "total_qty".equals(key))	formatType = "%,d";
		} else if (tableNum == 2) {
			if ("symposium_amt".equals(key))	formatType = "%,d";
		} else if (tableNum == 3) {
			if ("study_total_amt".equals(key) || "product_qty".equals(key))	formatType = "%,d";
		} else if (tableNum == 4) {
			if ("trans_amt".equals(key) || "gift_amt".equals(key) || "stay_amt".equals(key) ||  "meal_amt".equals(key))	formatType = "%,d";
		} else if (tableNum == 5) {
			if ("meal_amt".equals(key))	formatType = "%,d";
		}
		
		return formatType;
	}
	
	private boolean isStringDouble(String s) {
		try {
			Double.parseDouble(s);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
}