# Appium with Java

> **Source**: [https://www.testmuai.com/support/docs/appium-java](https://www.testmuai.com/support/docs/appium-java)

**Product**: App Automation

**Last Crawled**: 2026-01-27T20:48:17.294068

---

On this page

Real Device Virtual Device

In this documentation, you will learn how to trigger a automation script of **Java** for application testing with **Appium** on TestMu AI, set the [**desired capabilities**](https://www.testmuai.com/support/docs/desired-capabilities-in-appium/) for appium testing, and other advanced features of TestMu AI.

## Prerequisites[â](https://www.testmuai.com/support/docs/appium-java#prerequisites "Direct link to Prerequisites")

  * Your TestMu AI [Username and Access key](https://accounts.lambdatest.com/security).
  * You should have [Java client library](https://github.com/appium/java-client) installed for Selenium and Appium.
  * Download and install **Maven** from [the official website](https://maven.apache.org/). For **Linux/macOS** you can use [Homebrew](https://brew.sh/) package manager.

## Try our Sample Repository[â](https://www.testmuai.com/support/docs/appium-java#try-our-sample-repository "Direct link to Try our Sample Repository")

### Step 1: Get a Sample Project[â](https://www.testmuai.com/support/docs/appium-java#step-1-get-a-sample-project "Direct link to Step 1: Get a Sample Project")

You can use your own project to configure and test it. For demo purposes, we are using the sample repository.

Sample repo

All the code samples in this documentation can be found on **TestMu AI 's Github Repository**. You can either download or clone the repository to quickly run your tests. [![Image](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAECkAABApAfV44g8AAAAHdElNRQfmBBMLCwK6SluIAAAEDUlEQVRYw62YS2xUVRjHf3NmGGbolFbtQ1Gkj0BQGZsyWBaSphtJ2VRCkwkRUzEGWBHALtSFMSZNWLhw0xgXmCgucNGFbalhUbXhkVAzKJSGaptgSiahnco0UDozdh7XRafTe8+5d3rnjt9Zzf985/zueX3nO+PCnlVQz0vU8xx+IMkj5okyz7Kdxq4NPerZRzshGnkWPx5cgEaGJHH+5hZXiTBv81NNTNDKeSZIoRUpKSY4TyvCCWIP/cwV7V5f5uhnT2mAKnqZtQ1YK7P0UmUXEWSIbMkIDY0sQwTtIDqZcgRYK1N0boQI87AshIbGQ8LFEN3EykZoaMQ4YoVo58H/gtDQeEC7GaKBiM5pmUmiJSx/mlnuktApERpkhJcLhkaXqGUX7/MTSxsCnjDIOzRRx4BBv4BXXvCEweGDvO7nIEOskGORaW4wwgADjHCDaRbJscIwb7E5733K0EfCuAHqGDdUL/GmrjbAMY4TYhsBvLhx4yXANkIc5xiVhlV9auhnnLr1ytPkDJULpYaIwjH+x9BPjtMAAqilR4rGbjY5gmzCbfjtooeaVUgHLZJzJU2OII0EJKWFDhC46VK+2+MQ0oRHGdvbuKGZGWVT3mSHI8gObip9zdAMYZKS/JQuRwiALpal3pKEBfvxSY7XGXUMGeWapPjYL0zi/xUSjiEJrihaUNAoSUnuOEYATJCUlEZBjSQts1AWJKakSTWCLZKUJV0WJE1WUrYIZWe75dhZonmlUw8eoXB9bC0LslXZrRlBSh4c28uCbFcWICV4JElCiWSl2etKLhkXRBW3A2VMWCUHFC0qmFTEVtocQ9poVbRJQUTZshWcVBbPnm3mhBLs00QgSFSJnClOOoKcUoKtRpQg+Bk2Tc/eLfExIHiPBZOehvGv8s0TnS+UuGZtzXxpmjzl1uakoXBt3eEEn3G74PInn/MGVUXeYy6qaaOPaYucbHo9xevLS7N0Ai/yNZmCW5xxvuVjkyP6Mp/wHb+xWCTx61t331kYS5wPgQA/SM6XqVYgz3B5g9xyhp36BmcLee8SR4DXDBOQ5JDpZB2S8k5jyXLW6F7FiC6NqAUO6h5Df1BvCnmBv4pARtTHXYj7+coMPflJ/Ihv+Ipe9losfQXXLBH3CZk1OcrjvMN1nre1cX38bIF4zFHzJoJzhRM7wKu2IKOmiCTn9EdZfy/m6MfPp/iAbvYxyl3m+JcAKX4kY2tsAEn66Cdn7eDhjGHfZ0mj8ctqaLA1kjhnlCtdMReHlUe2fcgUh238XwPAbr43xNNflSvVDJLgIrttTyrgo5sxVvLNr1pC1nbXCmN0O7mFqgkzSAyNSxaPIjcX0YgxSNgk7OhWoLj52UsLY9yzqH+FDib4XUlNDfYf4zU3unVPZ4cAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDQtMTlUMTE6MTA6MjUrMDA6MDAAc6jkAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA0LTE5VDExOjEwOjI1KzAwOjAwcS4QWAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=) View on GitHub](https://github.com/LambdaTest/LT-appium-java)

### Step 2: Setup the Environment Variables[â](https://www.testmuai.com/support/docs/appium-java#step-2-setup-the-environment-variables "Direct link to Step 2: Setup the Environment Variables")

You need to export your environment variables _LT_USERNAME_ and _LT_ACCESS_KEY_ that are available in your [TestMu AI Profile page](https://accounts.lambdatest.com/security). Run the below mentioned commands in your terminal to setup the environment variables.

  * Linux / MacOS
  * Windows

    
    
    export LT_USERNAME="undefined"  
    export LT_ACCESS_KEY="undefined"  
    
    
    
    set LT_USERNAME="undefined"  
    set LT_ACCESS_KEY="undefined"  
    

### Step 3: Upload your Application[â](https://www.testmuai.com/support/docs/appium-java#step-3-upload-your-application "Direct link to Step 3: Upload your Application")

Upload your **_iOS_** application (.ipa file) or **_android_** application (.apk or .aab file) to the TestMu AI servers using our **REST API**. You need to provide your **Username** and **AccessKey** in the format `Username:AccessKey` in the **cURL** command for authentication.

Make sure to add the path of the **appFile** in the cURL request. Below is an example cURL request to upload your app using our REST API:

  * App File
  * App URL

    
    
    curl -u "undefined:undefined" -X POST "https://manual-api.lambdatest.com/app/upload/realDevice" -F "appFile=@"/Users/macuser/Downloads/proverbial_android.apk"" -F "name="proverbial_app""  
    
    
    
    curl -u "undefined:undefined" -X POST "https://manual-api.lambdatest.com/app/upload/realDevice" -F "url=:https://prod-mobile-artefacts.lambdatest.com/assets/docs/proverbial_android.apk" -F "name=Proverbial_App"  
    

tip

  * If you do not have any **.apk** or **.ipa** file, you can run your sample tests on TestMu AI by using our sample apps, ð [Android app](https://prod-mobile-artefacts.lambdatest.com/assets/docs/proverbial_android.apk) or ð [iOS app](https://prod-mobile-artefacts.lambdatest.com/assets/docs/proverbial_ios.ipa).

  * Response of above cURL will be a **JSON** object containing the `APP_URL` of the format - `lt://APP123456789123456789` and will be used in the next step

### Step 4: Update your Automation Script[â](https://www.testmuai.com/support/docs/appium-java#step-4-update-your-automation-script "Direct link to Step 4: Update your Automation Script")

An automation script for the sample application given above has been provided here. Ensure to update the `APP_URL`, `username` and `accessKey` in the code scripts before running the tests.

  * Android
  * iOS

vanilla_android.java
    
    
      
    import io.appium.java_client.AppiumDriver;  
    import io.appium.java_client.MobileBy;  
    import io.appium.java_client.MobileElement;  
    import org.openqa.selenium.JavascriptExecutor;  
    import org.openqa.selenium.remote.DesiredCapabilities;  
    import org.openqa.selenium.remote.RemoteWebDriver;  
    import java.net.MalformedURLException;  
    import java.net.URL;  
      
    public class vanilla_android {  
        public static String userName = System.getenv("LT_USERNAME") == null ? "LT_USERNAME"  //Add LambdaTest username here  
                : System.getenv("LT_USERNAME");  
        public static String accessKey = System.getenv("LT_ACCESS_KEY") == null ? "LT_ACCESS_KEY" //Add LambdaTest accessKey here  
                : System.getenv("LT_ACCESS_KEY");  
      
        private static AppiumDriver driver;  
      
        public static void main(String args[]) throws MalformedURLException, InterruptedException {  
      
            try {  
                DesiredCapabilities capabilities = new DesiredCapabilities();  
                capabilities.setCapability("deviceName", "Galaxy S20");  
                capabilities.setCapability("platformVersion", "11");  
                capabilities.setCapability("platformName", "Android");  
                capabilities.setCapability("isRealMobile", true);  
                capabilities.setCapability("app", "APP_URL");     //Enter your app url  
                capabilities.setCapability("deviceOrientation", "PORTRAIT");  
                capabilities.setCapability("build", "Java Vanilla - Android");  
                capabilities.setCapability("name", "Sample Test Java");  
                capabilities.setCapability("console", true);  
                capabilities.setCapability("network", false);  
                capabilities.setCapability("visual", true);  
                capabilities.setCapability("devicelog", true);  
      
                driver = new AppiumDriver(new URL("https://" +userName + ":" + accessKey + "@mobile-hub.lambdatest.com/wd/hub"), capabilities);  
      
                MobileElement color = (MobileElement) driver.findElement(MobileBy.id("com.lambdatest.proverbial:id/color"));  
                color.click();  
      
                MobileElement text = (MobileElement) driver.findElement(MobileBy.id("com.lambdatest.proverbial:id/Text"));  
                //Changes the text to proverbial  
                text.click();  
      
                //toast is visible  
                MobileElement toast = (MobileElement) driver.findElement(MobileBy.id("com.lambdatest.proverbial:id/toast"));  
                toast.click();  
      
                //notification is visible  
                MobileElement notification = (MobileElement) driver.findElement(MobileBy.id("com.lambdatest.proverbial:id/notification"));  
                notification.click();  
      
                //Open the geolocation page  
                MobileElement geo = (MobileElement) driver.findElement(MobileBy.id("com.lambdatest.proverbial:id/geoLocation"));  
                geo.click();  
                Thread.sleep(5000);  
      
                //takes back to home page  
                MobileElement el3 = (MobileElement) driver.findElementByAccessibilityId("Home");  
      
                driver.navigate().back();  
                Thread.sleep(2000);  
      
                //Takes to speed test page  
                MobileElement speedtest = (MobileElement) driver.findElement(MobileBy.id("com.lambdatest.proverbial:id/speedTest"));  
                speedtest.click();  
                Thread.sleep(5000);  
      
                driver.navigate().back();  
      
                //Opens the browser  
                MobileElement browser = (MobileElement) driver.findElement(MobileBy.AccessibilityId("Browser"));  
                browser.click();  
      
                MobileElement url = (MobileElement) driver.findElement(MobileBy.id("com.lambdatest.proverbial:id/url"));  
                url.sendKeys("https://www.lambdatest.com");  
                MobileElement find = (MobileElement) driver.findElement(MobileBy.id("com.lambdatest.proverbial:id/find"));  
                find.click();  
      
            } catch (AssertionError a) {  
                ((JavascriptExecutor) driver).executeScript("lambda-status=failed");  
                a.printStackTrace();  
            }  
    // The driver.quit statement is required, otherwise the test continues to execute, leading to a timeout.  
            driver.quit();  
        }  
        }  
    

vanilla_ios.java
    
    
    import io.appium.java_client.AppiumDriver;  
    import io.appium.java_client.MobileBy;  
    import io.appium.java_client.MobileElement;  
    import io.appium.java_client.ios.IOSDriver;  
      
    import org.openqa.selenium.remote.DesiredCapabilities;  
    import org.openqa.selenium.support.ui.ExpectedConditions;  
    import org.openqa.selenium.support.ui.WebDriverWait;  
      
    import java.net.URL;  
      
    public class vanilla_ios {  
        public static String userName = System.getenv("LT_USERNAME") == null ? "LT_USERNAME"  //Add LambdaTest username here  
                : System.getenv("LT_USERNAME");  
        public static String accessKey = System.getenv("LT_ACCESS_KEY") == null ? "LT_ACCESS_KEY" //Add LambdaTest accessKey here  
                : System.getenv("LT_ACCESS_KEY");  
      
        public static final String URL = "https://" + userName + ":" + accessKey + "@mobile-hub.lambdatest.com/wd/hub";  
        public static IOSDriver driver = null;  
      
        public static void main(String[] args) throws Exception {  
      
           try {  
                DesiredCapabilities caps = new DesiredCapabilities();  
                caps.setCapability("platformVersion", "15");  
                caps.setCapability("deviceName", "iPhone 12");  
                caps.setCapability("isRealMobile", true);  
                caps.setCapability("app", "APP_URL"); //Enter your app url  
                caps.setCapability("platformName", "iOS");  
                caps.setCapability("build", "Java Vanilla - iOS");  
                caps.setCapability("name", "Sample Test Java");  
                caps.setCapability("devicelog", true);  
                caps.setCapability("network", false);  
      
      
            driver = new IOSDriver(new URL("https://" + userName + ":" + accessKey + "@beta-hub.lambdatest.com/wd/hub"), caps);  
      
      
                Thread.sleep(2000);  
      
                //Changes color  
      
                driver.findElement(MobileBy.id("color")).click();  
                Thread.sleep(1000);  
      
                //Back to black color  
                driver.navigate().back();  
      
                Thread.sleep(1000);  
      
                //Changes the text to proverbial  
                driver.findElement(MobileBy.id("Text")).click();  
                Thread.sleep(1000);  
      
                //toast is visible  
                driver.findElement(MobileBy.id("toast")).click();  
                Thread.sleep(1000);  
      
                //notification is visible  
                driver.findElement(MobileBy.id("notification")).click();  
                Thread.sleep(2000);  
      
                //Open the geolocation page  
                driver.findElement(MobileBy.id("geoLocation")).click();  
                Thread.sleep(4000);  
                driver.navigate().back();  
                Thread.sleep(1000);  
      
                //Takes to speed test page  
                driver.findElement(MobileBy.id("speedTest")).click();  
                Thread.sleep(5000);  
                driver.navigate().back();  
                Thread.sleep(1000);  
      
                //Opens the browser  
                MobileElement browser = (MobileElement) driver.findElementByAccessibilityId("Browser");  
                browser.click();  
                Thread.sleep(3000);  
      
               WebDriverWait el7 =  new WebDriverWait(driver, 30);  
               el7.until(ExpectedConditions.elementToBeClickable(MobileBy.id("url")));  
               driver.findElementById("url").sendKeys("https://www.lambdatest.com/");  
      
                //Clicks on the text box  
                WebDriverWait el = new WebDriverWait(driver,90);  
                MobileElement el4 = (MobileElement) driver.findElementByAccessibilityId("find");  
                el.until(ExpectedConditions.elementToBeClickable(el4));  
                el4.click();  
                el4.sendKeys("Lambdatest");  
      
                //((JavascriptExecutor) driver).executeScript("lambda-status=passed");  
                driver.quit();  
      
            } catch (Exception t) {  
               System.out.println(t);  
               driver.quit();  
      
           }  
        }  
    }  
    

tip

  * You must set **isRealMobile** capability to `False` in the config file to run on **Virtual Devices**

### Step 5: Configure the Test Capabilities[â](https://www.testmuai.com/support/docs/appium-java#step-5-configure-the-test-capabilities "Direct link to Step 5: Configure the Test Capabilities")

You can update your custom capabilities in test scripts. In this sample project, we are passing platform name, platform version, device name and app url _(generated earlier)_ along with other capabilities like build name and test name via capabilities object.

The capabilities object in the sample code are defined as:

  * Android
  * iOS

    
    
    DesiredCapabilities capabilities = new DesiredCapabilities();  
                capabilities.setCapability("deviceName", "Galaxy S20");  
                capabilities.setCapability("platformVersion", "11");  
                capabilities.setCapability("platformName", "Android");  
                capabilities.setCapability("isRealMobile", true);  
                capabilities.setCapability("app", "YOUR_APP_URL"); //Enter your app url  
                capabilities.setCapability("deviceOrientation", "PORTRAIT");  
                capabilities.setCapability("build", "Java Vanilla - Android");  
                capabilities.setCapability("name", "Sample Test Java");  
                capabilities.setCapability("console", true);  
                capabilities.setCapability("network", false);  
                capabilities.setCapability("visual", true);  
                capabilities.setCapability("devicelog", true);  
    

tip

  * You must set **isRealMobile** capability to `False` in the config file to run on **Virtual Devices**

    
    
    DesiredCapabilities caps = new DesiredCapabilities();  
                caps.setCapability("platformVersion", "15");  
                caps.setCapability("deviceName", "iPhone 12");  
                caps.setCapability("isRealMobile", true);  
                caps.setCapability("app", "YOUR_APP_URL"); //Enter your app url  
                caps.setCapability("platformName", "iOS");  
                caps.setCapability("build", "Java Vanilla - iOS");  
                caps.setCapability("name", "Sample Test Java");  
                caps.setCapability("devicelog", true);  
                caps.setCapability("network", false);  
    

note

  * You must add the generated **APP_URL** to the `app` capability in the config file.
  * You must set **isRealMobile** capability to `false` in the config file to run on **Virtual Devices**
  * You can generate capabilities for your test requirements with the help of our inbuilt [**Capabilities Generator tool**](https://www.lambdatest.com/capabilities-generator/).For more details, please refer to our guide on [**Desired Capabilities in Appium**](https://www.testmuai.com/support/docs/desired-capabilities-in-appium/).

### Step 6: Execute and Monitor your Tests[â](https://www.testmuai.com/support/docs/appium-java#step-6-execute-and-monitor-your-tests "Direct link to Step 6: Execute and Monitor your Tests")

  * Run the following commands to install the required dependencies:
        
        mvn clean install  
        

  * The tests can be executed in the terminal using the following command:

    * Android
    * iOS
    
    mvn test -P android  
    
    
    mvn test -P ios  
    

> Your test results would be displayed on the test console (or CLI if you are using terminal/cmd) and on the [TestMu AI App Automation Dashboard](https://appautomation.lambdatest.com/build).

## Reference Guides[â](https://www.testmuai.com/support/docs/appium-java#reference-guides "Direct link to Reference Guides")

  * [Advanced Configuration for Capabilities](https://www.testmuai.com/support/docs/desired-capabilities-in-appium/)
  * [How to test locally hosted apps](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/)
  * [How to integrate TestMu AI with CI/CD](https://www.testmuai.com/support/docs/integrations-with-ci-cd-tools/)

---

*Auto-generated from TestMu AI documentation.*