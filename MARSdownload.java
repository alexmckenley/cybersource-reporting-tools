import java.io.*;
import java.net.*;
/*
 * The following line is only needed to use the included encode() function.
 * This import is based on use of an Apache Foundation jar called
 * commons-codec-1.3.jar. It defines the Base64 function used for the encode()
 * function. encode() is used to generate the basic authorization http header.
 * This import is not needed if the Authenticator is used instead of encode().
 */
//import org.apache.commons.codec.binary.Base64;

public class MARSdownload {

  public static void main(String[] args) {
    String urlStr = "https://ebc.cybersource.com/ebc/DownloadReport";
    String username = "MYUSERNAME";
    String Password = "MYPASSWORD";
    // the path to and filename of the output file. eg: <path to file>/<file name>
    String filePath = "c:/path/to/file/filename";

    // postGen creates the post data sent to the CyberSource system
    String data = postGen();

    try{
      // a modified version of the sample in the MA reports guide
      downloadReport(urlStr,username,Password,data,filePath);
    }catch(Exception e){
      System.err.println(e.getMessage() + "\n" + e.getStackTrace());
    }
  }

  /*
   * downloadReport() is the modified sample code from the MA reports guide.
   * It opens a connection with the server and sends a report query in the form
   * of post data. It saves the reply to the file defined in the filePath variable.
   */
  public static void downloadReport(String urlStr, final String username,final String
      Password,String data,String filePath) throws Exception{

    // dynamic registration of JSSE provider
    java.security.Security.addProvider(new com.sun.net.ssl.internal.ssl.Provider());

    // needs to be set
    System.setProperty("java.protocol.handler.pkgs","com.sun.net.ssl.internal.www.protocol");

    /*
     * This is the preferred method for authentication on the server.
     * It gives the username and password to the server when the server
     * attempts to authenticate the client via basic authentication.
     */
    Authenticator.setDefault(new Authenticator() {
      protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication (username, Password.toCharArray());
      }
    });

    // Send data
    URL url = new URL(urlStr);
    URLConnection conn = url.openConnection();
    conn.setDoOutput(true);
    /*
     * Un-comment the following line to use the included 'encode' function.
     * Going this route requires the use of an Apache foundation jar called
     * commons-codec-1.3.jar. It defines the Base64 function used for the
     * basic authorization http header. This would replace the Authenticator above.
     */
    //conn.setRequestProperty("Authorization", "Basic " + encode(username + ":" + Password));
    OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream());
    wr.write(data);
    wr.flush();

    // Get the response
    DataInputStream rd = new DataInputStream(conn.getInputStream());
    FileOutputStream fos = new FileOutputStream(filePath);
    int bytesRead = -1;
    byte[] b = new byte[32];
    while ((bytesRead = rd.read(b)) != -1) {
      fos.write(b, 0, bytesRead);
    }
    wr.close();
    rd.close();
    fos.close();

    System.out.println("Report written to " + filePath + " successfully");
  }

  /*
   * encode() takes a username and password in the format username:password and
   * converts the string into Base 64. The encoded string is returned to the
   * calling function. If the Authenticator is used, this function can be
   * commented out or removed.
   */

  /* public static String encode(String credentials){
   *    byte[] encBytes = Base64.encodeBase64(credentials.getBytes());
   *    String b64Credentials = new String(encBytes);
   *    return b64Credentials;
   *  }
   */

  /*
   * postGen() generates sample post data for downloading a report
   *
   * Possible reportId values:
   * 74 - Payment Activity Summary Report
   * 75 - Purchase & Refund Detail Report
   * 76 - Chargeback & Representment Detail Report
   * 77 - Transfer Log Report
   * 78 - Summary of Fees Report
   * 79 - Retrieval Request Detail Report
   * 80 - Chargeback Analysis Report
   * 82 - Authorization Analysis Report
   * 83 - Interchange Qualification Analysis Report
   *
   */
  public static String postGen(){
    String reportId = "75";
    String organizationId = "MYORGANIZATIONID"; //either the merchant id or merchant id_acct
    String merchantID = "MYMERCHANTID";
    String nodeValue = "MYHIERARCHYLEVEL"; //the hierarchy level. eg: 1010001101001101
    String format = "xml";
    String currency = "usd";
    String startDate = "07/14/2009"; // MM/dd/yyyy
    String endDate = "07/15/2009"; // MM/dd/yyyy

    String postData =
      "nodeValue=" + nodeValue +
      "&startDate=" + startDate +
      "&endDate=" + endDate +
      "&organizationId=" + organizationId +
      "&reportId=" + reportId +
      "&format=" + format +
      "&currency=" + currency +
      "&merchantID=" + merchantID
      ;

    return postData;
  }

}