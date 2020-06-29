package fingersales.common.service;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

public class MailVO {
	private String fromAddr;
	private String fromAddrPs;
	
	private String toAddr; // @delimiter('|')
	private String ccAddr; // @delimiter('|')
	private String bccAddr; // @delimiter('|')
	
	private String toAddrPs; // @delimiter('|') => "김영도|강영규"
	private String ccAddrPs; // @delimiter('|')
	private String bccAddrPs; // @delimiter('|')
	
	private String subject;
	private String contentAsHtml; // HTML Contents
	
	// 참조파일 등록시
	private String refKey;
	private String refServiceRoot;
	private String refCompId; // setter에서 대문자로 변환
	private String refFileName; // @delimiter('|')
	private String refFileId; // @delimiter('|')
	private String refStartDate;
	private String refEndDate;
	
	// 첨부파일 등록시
	private File[] attachedFiles;
	
	// 메일 히스토리 여부 (기본값: false)
	private boolean isHistoryInsert = false;
	private String compId;
	private String employeeId;
	// 메일 히스토리 관련 파라메터 end.
	
	public MailVO (String fromAddr, String toAddr) {
		this.fromAddr = fromAddr;
		this.toAddr = toAddr;
	}
	
	public MailVO (String fromAddr, String fromAddrPs, String toAddr, String toAddrPs) {
		this.fromAddr = fromAddr;
		this.fromAddrPs = fromAddrPs;
		this.toAddr = toAddr;
		this.toAddrPs = toAddrPs;
	}

	public String getFromAddr() {
		return fromAddr;
	}

	public void setFromAddr(String fromAddr) {
		this.fromAddr = fromAddr;
	}

	public String getToAddr() {
		return toAddr;
	}

	public void setToAddr(String toAddr) {
		this.toAddr = toAddr;
	}

	public String getCcAddr() {
		return ccAddr;
	}

	public void setCcAddr(String ccAddr) {
		this.ccAddr = ccAddr;
	}

	public String getBccAddr() {
		return bccAddr;
	}

	public void setBccAddr(String bccAddr) {
		this.bccAddr = bccAddr;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getContentAsHtml() {
		return contentAsHtml;
	}

	public void setContentAsHtml(String contentAsHtml) {
		this.contentAsHtml = contentAsHtml;
	}

	public String getRefKey() {
		return refKey;
	}

	public void setRefKey(String refKey) {
		this.refKey = refKey;
	}

	public String getRefServiceRoot() {
		return refServiceRoot;
	}

	public void setRefServiceRoot(String refServiceRoot) {
		this.refServiceRoot = refServiceRoot;
	}

	public String getRefCompId() {
		return refCompId;
	}

	public void setRefCompId(String refCompId) {
		this.refCompId = refCompId;
	}

	public String getRefFileName() {
		return refFileName;
	}

	public void setRefFileName(String refFileName) {
		this.refFileName = refFileName;
	}

	public String getRefFileId() {
		return refFileId;
	}

	public void setRefFileId(String refFileId) {
		this.refFileId = refFileId;
	}

	public String getRefStartDate() {
		return refStartDate;
	}

	public void setRefStartDate(String refStartDate) {
		if (refStartDate != null && refStartDate.length() == 8) {
			this.refStartDate = (refStartDate.substring(0, 4) + "-" + refStartDate.substring(4, 6) + "-" + refStartDate.substring(6, 8));
		} else {
			this.refStartDate = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
		}
	}

	public String getRefEndDate() {
		return refEndDate;
	}

	public void setRefEndDate(String refEndDate) {
		if (refEndDate != null && refEndDate.length() == 8) {
			this.refEndDate = (refEndDate.substring(0, 4) + "-" + refEndDate.substring(4, 6) + "-" + refEndDate.substring(6, 8));
		} else {
			this.refEndDate = "기간제한없음";
		}
	}

	public File[] getAttachedFiles() {
		return attachedFiles;
	}

	public void setAttachedFiles(File[] attachedFiles) {
		this.attachedFiles = attachedFiles;
	}

	public String getToAddrPs() {
		return toAddrPs;
	}

	public void setToAddrPs(String toAddrPs) {
		this.toAddrPs = toAddrPs;
	}

	public String getCcAddrPs() {
		return ccAddrPs;
	}

	public void setCcAddrPs(String ccAddrPs) {
		this.ccAddrPs = ccAddrPs;
	}

	public String getBccAddrPs() {
		return bccAddrPs;
	}

	public void setBccAddrPs(String bccAddrPs) {
		this.bccAddrPs = bccAddrPs;
	}

	public String getFromAddrPs() {
		return fromAddrPs;
	}

	public void setFromAddrPs(String fromAddrPs) {
		this.fromAddrPs = fromAddrPs;
	}

	public boolean isHistoryInsert() {
		return isHistoryInsert;
	}

	public void setHistoryInsert(boolean isHistoryInsert) {
		this.isHistoryInsert = isHistoryInsert;
	}	

	public String getCompId() {
		return compId;
	}

	public void setCompId(String compId) {
		this.compId = compId;
	}

	public String getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}	
	
}

