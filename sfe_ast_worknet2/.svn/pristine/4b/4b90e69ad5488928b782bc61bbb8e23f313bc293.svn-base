package fingersales.defined.service;

import java.io.OutputStream;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.view.AbstractView;

import fingersales.common.constants.CommConst;
import fingersales.common.util.FingerParamMap;
import fingersales.common.util.Utility;
import net.fortuna.ical4j.data.CalendarOutputter;
import net.fortuna.ical4j.model.Date;
import net.fortuna.ical4j.model.component.VEvent;
import net.fortuna.ical4j.model.property.CalScale;
import net.fortuna.ical4j.model.property.ProdId;
import net.fortuna.ical4j.model.property.Version;
import net.fortuna.ical4j.util.UidGenerator;
 
public class ExportScheduleForOutlookService extends AbstractView {
 
	public ExportScheduleForOutlookService() {
		setContentType("application/octet-stream; charset=UTF-8");
	}
	
	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		response.setContentType(getContentType());
		
		FingerParamMap m = Utility.getSimpleRequestMap(request);
		String[] schSeq = (String[]) ((String) m.get("p1")).split(CommConst.BASE_DELIMITER, -1);
		String[] schStart = (String[]) ((String) m.get("p2")).split(CommConst.BASE_DELIMITER, -1);
		String[] schEnd = (String[]) ((String) m.get("p3")).split(CommConst.BASE_DELIMITER, -1);
		String[] schTitle = (String[]) ((String) m.get("p4")).split(CommConst.BASE_DELIMITER, -1);

		net.fortuna.ical4j.model.Calendar calendar = new net.fortuna.ical4j.model.Calendar();
		calendar.getProperties().add(new ProdId("-//Ben Fortuna//iCal4j 1.0//EN"));
		calendar.getProperties().add(Version.VERSION_2_0);
		calendar.getProperties().add(CalScale.GREGORIAN);
		//calendar.getProperties().add(new Description("TEST"));
		
		java.util.Calendar startDt = java.util.Calendar.getInstance();
		java.util.Calendar endDt = java.util.Calendar.getInstance();		
		
		if (schSeq.length > 0) {
			for (int i = 0; i < schSeq.length; i++)
			{
				if (schStart[i].equals(schEnd[i])) {
					startDt.set(java.util.Calendar.YEAR, Integer.valueOf(schStart[i].substring(0, 4)));
					int month = Integer.valueOf(schStart[i].substring(5, 7));
					startDt.set(java.util.Calendar.MONTH, (month - 1));
					startDt.set(java.util.Calendar.DAY_OF_MONTH, Integer.valueOf(schStart[i].substring(8, 10)));
					
					VEvent event = new VEvent(new Date(startDt.getTime()), schTitle[i]);
					event.getProperties().add(new UidGenerator(String.valueOf(i + 1)).generateUid());
					calendar.getComponents().add(event);
				} else {
					startDt.set(java.util.Calendar.YEAR, Integer.valueOf(schStart[i].substring(0, 4)));
					int month = Integer.valueOf(schStart[i].substring(5, 7));
					startDt.set(java.util.Calendar.MONTH, (month - 1));
					startDt.set(java.util.Calendar.DAY_OF_MONTH, Integer.valueOf(schStart[i].substring(8, 10)));
					endDt.set(java.util.Calendar.YEAR, Integer.valueOf(schEnd[i].substring(0, 4)));
					month = Integer.valueOf(schEnd[i].substring(5, 7));
					endDt.set(java.util.Calendar.MONTH, (month - 1));
					endDt.set(java.util.Calendar.DAY_OF_MONTH, Integer.valueOf(schEnd[i].substring(8, 10)));		
					
					VEvent event = new VEvent(new Date(startDt.getTime()), new Date(endDt.getTime()), schTitle[i]);
					event.getProperties().add(new UidGenerator(String.valueOf(i + 1)).generateUid());
					calendar.getComponents().add(event);
				}
			}
		}

		response.setHeader("Content-Disposition", "attachment; filename=\"" + "AKR_Schedule_MS_Outlook.ics" + "\"");
		response.setHeader("Content-Transfer-Encoding", "binary");
		
		try {
			OutputStream out = response.getOutputStream();
			CalendarOutputter outputter = new CalendarOutputter(false);
			outputter.output(calendar, out);
			//out.flush();
			
		} catch (Exception e) {
			e.printStackTrace();
		
		} finally {

		}
	}
}
