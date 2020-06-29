package fingersales.common.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPCellEvent;
import com.itextpdf.text.pdf.PdfPTable;

/**
 * @Class Name : AbstractPdfBorder.java
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
public abstract class AbstractPdfBorderService implements PdfPCellEvent{
	protected Logger log = LoggerFactory.getLogger(this.getClass());
		
	private int border = 0;
	private BaseColor baseColor;
	
    public AbstractPdfBorderService(int border, BaseColor baseColor) {
        this.border = border;
        this.baseColor = baseColor;
    }

    @Override
    public void cellLayout(PdfPCell cell, Rectangle position, PdfContentByte[] canvases) {
    	// TODO Auto-generated method stub
    	PdfContentByte canvas = canvases[PdfPTable.LINECANVAS];
        canvas.saveState();
        
        setLineDash(canvas);
        if ((border & PdfPCell.TOP) == PdfPCell.TOP) {
            canvas.moveTo(position.getRight(), position.getTop());
            canvas.lineTo(position.getLeft(), position.getTop());
        }
        if ((border & PdfPCell.BOTTOM) == PdfPCell.BOTTOM) {
            canvas.moveTo(position.getRight(), position.getBottom());
            canvas.lineTo(position.getLeft(), position.getBottom());
        }
        if ((border & PdfPCell.RIGHT) == PdfPCell.RIGHT) {
            canvas.moveTo(position.getRight(), position.getTop());
            canvas.lineTo(position.getRight(), position.getBottom());
        }
        if ((border & PdfPCell.LEFT) == PdfPCell.LEFT) {
            canvas.moveTo(position.getLeft(), position.getTop());
            canvas.lineTo(position.getLeft(), position.getBottom());
        }
        
        canvas.setColorStroke(baseColor);
        canvas.stroke();
        canvas.restoreState();
    }
 
    public abstract void setLineDash(PdfContentByte canvas);
}