package fingersales.common.service;

import java.io.File;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.annotation.Resource;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeUtility;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;

/**
 * 메일 발송 서비스
 *
 * @author 김영도
 *
 */
@Service("MailService")
public class MailService implements InitializingBean {
	Log log = LogFactory.getLog(this.getClass());
	
	/** CommonProperties */
	@Resource(name = "propComm")
	private Properties propComm;
	
	private static Properties config;
	
	@Override
	public void afterPropertiesSet() throws Exception {
    	MailService.config = new Properties();

    	MailService.config.put("mail.smtp.host", propComm.getProperty("mail.smtp.host"));
    	MailService.config.put("mail.smtp.port", propComm.getProperty("mail.smtp.port"));
    	MailService.config.put("mail.smtp.debug", propComm.getProperty("mail.smtp.debug"));
	}
	
	public int sendMail(MailVO mailVO) {
		try {
			Session session = null;
			String strMailId   = propComm.getProperty("mail.smtp.auth_user");
			String strMailPw   = propComm.getProperty("mail.smtp.auth_pass");
			if (strMailId == null || "EMPTY".equals(strMailId)) {
				session = Session.getDefaultInstance(MailService.config);
			}
			else {
				System.out.println("mail.smtp.auth_user :: " + strMailId);
				System.out.println("mail.smtp.auth_pass :: " + strMailPw);
				
				MailService.config.put("mail.smtp.auth","true");
				MailService.config.put("mail.smtp.starttls.enable", "true");
				session = Session.getDefaultInstance(MailService.config, new javax.mail.Authenticator() {
					protected javax.mail.PasswordAuthentication getPasswordAuthentication() { return new javax.mail.PasswordAuthentication(strMailId, strMailPw); }
				});
			}
			// 로깅 출력 유무: 실 업로드시 false
			session.setDebug(false);
			
			MimeMessage msg = new MimeMessage(session);
			
			String fromAddrPs = mailVO.getFromAddrPs();
			if (fromAddrPs != null && !fromAddrPs.equals("")) {
				msg.setFrom(new InternetAddress(mailVO.getFromAddr().trim(), fromAddrPs.trim(), "UTF-8"));
			} else {
				fromAddrPs = "";
				msg.setFrom(new InternetAddress(mailVO.getFromAddr().trim()));
			}
			
			String[] toList = null;
			String[] toPsList = null;
			if (mailVO.getToAddr() != null && !mailVO.getToAddr().equals("")) {
				toList = mailVO.getToAddr().split("\\|");
				toPsList = mailVO.getToAddrPs() != null ? mailVO.getToAddrPs().split("\\|") : null;
				InternetAddress[] toAddr = new InternetAddress[toList.length];
				for (int i = 0; i < toList.length; i++) {
					String to = toList[i].trim();
					if (to.length() > 0) {
						if (toPsList != null && toPsList.length > i) {
							toAddr[i] = new InternetAddress(to, toPsList[i].trim(), "UTF-8");
						} else {
							toAddr[i] = new InternetAddress(to);
						}
					}
				}
				msg.setRecipients(Message.RecipientType.TO, toAddr);				
			} else {
				throw new Exception("받는 사람이 지정되지 않음.");
			}

			String[] ccList = null;
			String[] ccPsList = null;
			if (mailVO.getCcAddr() != null && !mailVO.getCcAddr().equals("")) {
				ccList = mailVO.getCcAddr().split("\\|");
				ccPsList = mailVO.getCcAddrPs() != null ? mailVO.getCcAddrPs().split("\\|") : null;
				InternetAddress[] ccAddr = new InternetAddress[ccList.length];
				for (int i = 0; i < ccList.length; i++) {
					String cc = ccList[i].trim();
					if (cc.length() > 0) {
						if (ccPsList != null && ccPsList.length > i) {
							ccAddr[i] = new InternetAddress(cc, ccPsList[i].trim(), "UTF-8");
						} else {
							ccAddr[i] = new InternetAddress(cc);
						}
					}
				}
				msg.setRecipients(Message.RecipientType.CC, ccAddr);				
			}
			
			String[] bccList = null;
			String[] bccPsList = null;
			if (mailVO.getBccAddr() != null && !mailVO.getBccAddr().equals("")) {
				bccList = mailVO.getBccAddr().split("\\|");
				bccPsList = mailVO.getBccAddrPs() != null ? mailVO.getBccAddrPs().split("\\|") : null;
				InternetAddress[] bccAddr = new InternetAddress[bccList.length];
				for (int i = 0; i < bccList.length; i++) {
					String bcc = bccList[i].trim();
					if (bcc.length() > 0) {
						if (bccPsList != null && bccPsList.length > i) {
							bccAddr[i] = new InternetAddress(bcc, bccPsList[i].trim(), "UTF-8");
						} else {
							bccAddr[i] = new InternetAddress(bcc);
						}
					}
				}
				msg.setRecipients(Message.RecipientType.BCC, bccAddr);				
			}

			if (msg.getAllRecipients() == null || msg.getAllRecipients().length == 0) {
				throw new Exception("수신자가 한 명도 지정되지 않음.");
			}
			
			msg.setSubject(mailVO.getSubject(), "UTF-8");
			
			String refDownFormAsHtml = null;
			
			if (mailVO.getRefServiceRoot() != null && mailVO.getRefCompId() != null && mailVO.getRefKey() != null && mailVO.getRefFileName() != null) {
				String[] refKeys = mailVO.getRefKey().split("\\|");
				refDownFormAsHtml = refFileDownloadForm(mailVO.getRefServiceRoot(), mailVO.getRefCompId(), refKeys, mailVO.getRefFileName().split("\\|"), mailVO.getRefStartDate(), mailVO.getRefEndDate());				
			}

			StringBuffer mailContents = new StringBuffer();
			if (refDownFormAsHtml != null) {
				mailContents.append(refDownFormAsHtml);
				mailContents.append("<p></p>");
			}
			mailContents.append(mailVO.getContentAsHtml());		
			
			File[] attachedFiles = mailVO.getAttachedFiles();
			if (attachedFiles == null || attachedFiles.length == 0) {
				// @add normal message
				msg.setContent(mailContents.toString(), "text/html;charset=UTF-8");
			
			} else {
				MimeMultipart mp = new MimeMultipart();
				
				MimeBodyPart part = new MimeBodyPart();
				part.setContent(mailContents.toString(), "text/html;charset=UTF-8");
				mp.addBodyPart(part);
				
				for (int i = 0; i < attachedFiles.length; i++) {
					part = new MimeBodyPart();
					FileDataSource fds = new FileDataSource(attachedFiles[i]);
					part.setDataHandler(new DataHandler(fds));
					part.setFileName(MimeUtility.encodeText(fds.getName(), "UTF-8", "B"));
					mp.addBodyPart(part);
				}
				// @add multi-part message
				msg.setContent(mp);
			}
			
			msg.setSentDate(new java.util.Date());
			Transport.send(msg);
			return 1;
			
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			e.printStackTrace();
			return 0;
		}
	}
	
	private String refFileDownloadForm(String refServiceRoot, String refCompId, String[] refKeys, String[] refFileNames, String startDate, String endDate) {
		if (refKeys == null || refKeys.length == 0) {
			return null;
		}
		
		StringBuffer sb = new StringBuffer();
		sb.append("<div style=\"width:600px;\">");
		sb.append("  <div style=\"clear:both; overflow:hidden; border-top:1px solid #dedede; background-color:#f5f8f9;\">");
		sb.append("    <div style=\"float:left; padding:10px; font-size:12px; font-family:'돋움',Dotum; color:#333;\">");
		sb.append("      <img src=\"http://fingersales.com/mail_image/attached_file/img_ico01.png\" style=\"margin-top:-3px; vertical-align:middle;\">");
		sb.append("      첨부파일 <b style=\"color:#27aae1;\">" + refKeys.length + "개</b>");
		sb.append("    </div>");
		sb.append("    <div style=\"float:right; padding:10px; font-size:12px; font-family:'돋움',Dotum; color:#888;\">");
		sb.append("    다운로드 기간 : " + startDate + " ~ " + endDate);
		sb.append("    </div>");
		sb.append("  </div>");
		
		sb.append("  <ul style=\" margin:0; padding:0; list-style:none;\">");
		
		for (int i = 0; i < refKeys.length; i++) {
			sb.append("<li style=\"border-bottom:1px dashed #e7e7e7;\">");
			sb.append("  <a href=\"" + (refServiceRoot + "?compId=" + refCompId + "&refKey=" + refKeys[i]) + "\"" + "target=\"_blank\" style=\"display:block; padding:8px 10px; font-size:12px; font-family:'돋움',Dotum; color:#666; text-decoration:none;\">");
			sb.append("    <img src=\"http://fingersales.com/mail_image/attached_file/img_ico02.png\" style=\"margin-top:-3px; vertical-align:middle;\">");
			sb.append("    <span>" + refFileNames[i] + "</span>");
			sb.append("    <img src=\"http://fingersales.com/mail_image/attached_file/img_ico03.png\" style=\"margin:-3px 0 0 5px; vertical-align:middle;\">");
			sb.append("  </a>");
			sb.append("</li>");
		}
		
		sb.append("  </ul>");
		sb.append("  <div style=\"padding:8px 10px 6px; text-align:right; border-bottom:1px solid #dedede;\">");
		sb.append("    <a href=\"http://fingersales.com\" target=\"_blank\">");
		sb.append("      <img src=\"http://fingersales.com/mail_image/attached_file/img_logo.png\" alt=\"Powered by FingerPost\" style=\"border:0;\">");
		sb.append("    </a>");
		sb.append("  </div>");
		sb.append("</div>");
		
		return sb.toString();
	}
}