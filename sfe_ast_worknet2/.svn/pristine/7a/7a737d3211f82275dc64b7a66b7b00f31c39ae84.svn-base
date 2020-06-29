package fingersales.common.util;

import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;
import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;
import javax.naming.ldap.InitialLdapContext;
import javax.naming.ldap.LdapContext;

/**
 * LDAP 프로토콜을 이용한 AD인증
 *
 * @author 김영도
 *
 */
public class ADAuthenticator
{
	private String domain;
	private String ldapHost;
	private String searchBase;
	
	public ADAuthenticator()
	{
		this.domain = "<your domain>";
		this.ldapHost = "ldap://<your AD controller>";
		this.searchBase = "your AD root e.g. dc=abbl,dc=org";
	}
	
	public ADAuthenticator(String domain, String host, String dn)
	{
		this.domain = domain;
		this.ldapHost = host;
		this.searchBase = dn;
	}
	
	public Map<String, Object> authenticate(String user, String pass)
	{
		String returnedAtts[] ={ "sn", "givenName", "mail" };
		String searchFilter = "(&(objectClass=user)(sAMAccountName=" + user + "))";
		
		SearchControls searchCtls = new SearchControls();
		searchCtls.setReturningAttributes(returnedAtts);
		searchCtls.setSearchScope(SearchControls.SUBTREE_SCOPE);
		
		Hashtable<String, String> env = new Hashtable<String, String>();
		env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
		env.put(Context.PROVIDER_URL, ldapHost);
		env.put(Context.SECURITY_AUTHENTICATION, "simple");
		env.put(Context.SECURITY_PRINCIPAL, user + "@" + domain);
		env.put(Context.SECURITY_CREDENTIALS, pass);
		
		LdapContext ctxGC = null;
		try
		{
			ctxGC = new InitialLdapContext(env, null);
			NamingEnumeration<SearchResult> answer = ctxGC.search(searchBase, searchFilter, searchCtls);
			while (answer.hasMoreElements())
			{
			SearchResult sr = (SearchResult) answer.next();
			Attributes attrs = sr.getAttributes();
			Map<String, Object> amap = null;
			if (attrs != null)
			{
				amap = new HashMap<String, Object>();
				NamingEnumeration<? extends Attribute> ne = attrs.getAll();
				while (ne.hasMore())
				{
					Attribute attr = (Attribute) ne.next();
					amap.put(attr.getID(), attr.get());
				}
				ne.close();
			}
			return amap;
			}
		}
		catch (NamingException ex)
		{
			ex.printStackTrace();
			return null;
		}
		
		return null;
	}
}