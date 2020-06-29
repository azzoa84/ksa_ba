package fingersales.common.util;

import org.apache.commons.collections.map.ListOrderedMap;

public class FingerParamMap extends ListOrderedMap implements Cloneable {
	private static final long serialVersionUID = 3848851032730232522L;
	
    @Override
    public Object put(Object key, Object value) {
    	return super.put(((String) key), value);
    }

	@Override
	public Object get(Object key) {
		if (super.containsKey(key)) {
			return super.get(key) == null ? "" : super.get(key);
		} else {
			return "";
		}
	}
}
