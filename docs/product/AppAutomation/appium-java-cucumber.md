# Appium With Cucumber

> **Source**: [https://www.testmuai.com/support/docs/appium-java-cucumber](https://www.testmuai.com/support/docs/appium-java-cucumber)

**Product**: App Automation

**Last Crawled**: 2026-01-27T20:47:56.450796

---

On this page

Real Device Virtual Device

In this documentation, you will learn how to trigger a automation script of **Cucumber** for application testing with **Appium** on TestMu AI, set the [**desired capabilities**](https://www.testmuai.com/support/docs/desired-capabilities-in-appium/) for appium testing, and other advanced features of TestMu AI.

## Prerequisites[â](https://www.testmuai.com/support/docs/appium-java-cucumber#prerequisites "Direct link to Prerequisites")

  * Your TestMu AI [Username and Access key](https://accounts.lambdatest.com/security).
  * You should have [Java client library](https://github.com/appium/java-client) installed for Selenium and Appium.
  * Install the latest Java development environment i.e. JDK 8 or higher. We recommend using the < JDK 11 version.
  * Download and install **Maven** from [the official website](https://maven.apache.org/). For **Linux/macOS** you can use [Homebrew](https://brew.sh/) package manager.

## Try our Sample Repository[â](https://www.testmuai.com/support/docs/appium-java-cucumber#try-our-sample-repository "Direct link to Try our Sample Repository")

### Step 1: Get a Sample Project[â](https://www.testmuai.com/support/docs/appium-java-cucumber#step-1-get-a-sample-project "Direct link to Step 1: Get a Sample Project")

You can use your own project to configure and test it. For demo purposes, we are using the sample repository.

Sample repo

All the code samples in this documentation can be found on **TestMu AI 's Github Repository**. You can either download or clone the repository to quickly run your tests. [![Image](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAECkAABApAfV44g8AAAAHdElNRQfmBBMLCwK6SluIAAAEDUlEQVRYw62YS2xUVRjHf3NmGGbolFbtQ1Gkj0BQGZsyWBaSphtJ2VRCkwkRUzEGWBHALtSFMSZNWLhw0xgXmCgucNGFbalhUbXhkVAzKJSGaptgSiahnco0UDozdh7XRafTe8+5d3rnjt9Zzf985/zueX3nO+PCnlVQz0vU8xx+IMkj5okyz7Kdxq4NPerZRzshGnkWPx5cgEaGJHH+5hZXiTBv81NNTNDKeSZIoRUpKSY4TyvCCWIP/cwV7V5f5uhnT2mAKnqZtQ1YK7P0UmUXEWSIbMkIDY0sQwTtIDqZcgRYK1N0boQI87AshIbGQ8LFEN3EykZoaMQ4YoVo58H/gtDQeEC7GaKBiM5pmUmiJSx/mlnuktApERpkhJcLhkaXqGUX7/MTSxsCnjDIOzRRx4BBv4BXXvCEweGDvO7nIEOskGORaW4wwgADjHCDaRbJscIwb7E5733K0EfCuAHqGDdUL/GmrjbAMY4TYhsBvLhx4yXANkIc5xiVhlV9auhnnLr1ytPkDJULpYaIwjH+x9BPjtMAAqilR4rGbjY5gmzCbfjtooeaVUgHLZJzJU2OII0EJKWFDhC46VK+2+MQ0oRHGdvbuKGZGWVT3mSHI8gObip9zdAMYZKS/JQuRwiALpal3pKEBfvxSY7XGXUMGeWapPjYL0zi/xUSjiEJrihaUNAoSUnuOEYATJCUlEZBjSQts1AWJKakSTWCLZKUJV0WJE1WUrYIZWe75dhZonmlUw8eoXB9bC0LslXZrRlBSh4c28uCbFcWICV4JElCiWSl2etKLhkXRBW3A2VMWCUHFC0qmFTEVtocQ9poVbRJQUTZshWcVBbPnm3mhBLs00QgSFSJnClOOoKcUoKtRpQg+Bk2Tc/eLfExIHiPBZOehvGv8s0TnS+UuGZtzXxpmjzl1uakoXBt3eEEn3G74PInn/MGVUXeYy6qaaOPaYucbHo9xevLS7N0Ai/yNZmCW5xxvuVjkyP6Mp/wHb+xWCTx61t331kYS5wPgQA/SM6XqVYgz3B5g9xyhp36BmcLee8SR4DXDBOQ5JDpZB2S8k5jyXLW6F7FiC6NqAUO6h5Df1BvCnmBv4pARtTHXYj7+coMPflJ/Ihv+Ipe9losfQXXLBH3CZk1OcrjvMN1nre1cX38bIF4zFHzJoJzhRM7wKu2IKOmiCTn9EdZfy/m6MfPp/iAbvYxyl3m+JcAKX4kY2tsAEn66Cdn7eDhjGHfZ0mj8ctqaLA1kjhnlCtdMReHlUe2fcgUh238XwPAbr43xNNflSvVDJLgIrttTyrgo5sxVvLNr1pC1nbXCmN0O7mFqgkzSAyNSxaPIjcX0YgxSNgk7OhWoLj52UsLY9yzqH+FDib4XUlNDfYf4zU3unVPZ4cAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDQtMTlUMTE6MTA6MjUrMDA6MDAAc6jkAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA0LTE5VDExOjEwOjI1KzAwOjAwcS4QWAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=) View on GitHub](https://github.com/LambdaTest/LT-appium-java-cucumber)

### Step 2: Setup the Environment Variables[â](https://www.testmuai.com/support/docs/appium-java-cucumber#step-2-setup-the-environment-variables "Direct link to Step 2: Setup the Environment Variables")

You need to export your environment variables _LT_USERNAME_ and _LT_ACCESS_KEY_ that are available in your [TestMu AI Profile page](https://accounts.lambdatest.com/security). Run the below mentioned commands in your terminal to setup the environment variables.

  * Linux / MacOS
  * Windows

    
    
    export LT_USERNAME="undefined"  
    export LT_ACCESS_KEY="undefined"  
    
    
    
    set LT_USERNAME="undefined"  
    set LT_ACCESS_KEY="undefined"  
    

### Step 3: Upload your Application[â](https://www.testmuai.com/support/docs/appium-java-cucumber#step-3-upload-your-application "Direct link to Step 3: Upload your Application")

Upload your **_iOS_** application (.ipa file) or **_android_** application (.apk or .aab file) to the TestMu AI servers using our **REST API**. You need to provide your **Username** and **AccessKey** in the format `Username:AccessKey` in the **cURL** command for authentication.

Make sure to add the path of the **appFile** in the cURL request. Below is an example cURL request to upload your app using our REST API:

  * App File
  * App URL

    
    
    curl -u "undefined:undefined" -X POST "https://manual-api.lambdatest.com/app/upload/realDevice" -F "appFile=@"/Users/macuser/Downloads/proverbial_android.apk"" -F "name="proverbial_app""  
    
    
    
    curl -u "undefined:undefined" -X POST "https://manual-api.lambdatest.com/app/upload/realDevice" -F "url=:https://prod-mobile-artefacts.lambdatest.com/assets/docs/proverbial_android.apk" -F "name=Proverbial_App"  
    

tip

  * If you do not have any **.apk** or **.ipa** file, you can run your sample tests on TestMu AI by using our sample apps, ð [Android app](https://prod-mobile-artefacts.lambdatest.com/assets/docs/proverbial_android.apk) or ð [iOS app](https://prod-mobile-artefacts.lambdatest.com/assets/docs/proverbial_ios.ipa).

  * Response of above cURL will be a **JSON** object containing the `APP_URL` of the format - `lt://APP123456789123456789` and will be used in the next step

### Step 4: Update your Automation Script[â](https://www.testmuai.com/support/docs/appium-java-cucumber#step-4-update-your-automation-script "Direct link to Step 4: Update your Automation Script")

An automation script for the sample application given above has been provided here. Ensure to update the `APP_URL`, `username` and `accessKey` in the code scripts before running the tests.
    
    
    import java.net.URL;  
      
    import io.cucumber.testng.AbstractTestNGCucumberTests;  
    import io.cucumber.testng.CucumberOptions;  
    import io.cucumber.testng.TestNGCucumberRunner;  
    import org.openqa.selenium.remote.CapabilityType;  
    import org.openqa.selenium.remote.DesiredCapabilities;  
    import org.openqa.selenium.remote.AppiumDriver;  
    import org.testng.annotations.AfterClass;  
    import org.testng.annotations.BeforeClass;  
    import org.testng.annotations.BeforeMethod;  
    import org.testng.annotations.DataProvider;  
    import org.testng.annotations.Parameters;  
      
    import org.openqa.selenium.JavascriptExecutor;  
    import java.net.MalformedURLException;  
      
      
    @CucumberOptions(  
            features = "src/main/java/Features/todo.feature",  
            glue = {"stepDefinitions"},  
            plugin = "json:target/cucumber-reports/CucumberTestReport.json")  
      
    public class TestRunner extends AbstractTestNGCucumberTests {  
          
        private TestNGCucumberRunner testNGCucumberRunner;  
        
        public static RemoteWebDriver connection;  
          
        @BeforeClass(alwaysRun = true)  
        public void setUpCucumber() {  
             testNGCucumberRunner = new TestNGCucumberRunner(this.getClass());  
        }  
          
        @BeforeMethod(alwaysRun = true)  
        @Parameters({ "deviceName", "platformVersion", "platformName" })  
        public void setUpClass(String deviceName, String platformVersion, String platformName) throws Exception {  
      
                String username = System.getenv("LT_USERNAME") == null ? "YOUR_LT_USERNAME" : System.getenv("LT_USERNAME");      //Enter your LambdaTest username at the place of YOUR_LT_USERNAME   
                String accesskey = System.getenv("LT_ACCESS_KEY") == null ? "YOUR_LT_ACCESSKEY" : System.getenv("LT_ACCESS_KEY");     //Enter your LambdaTest accessKey at the place of YOUR_LT_ACCESSKEY  
      
                DesiredCapabilities capability = new DesiredCapabilities();           
      
      
                capability.setCapability("platformName", platformName);  
                capability.setCapability("deviceName", deviceName);  
                capability.setCapability("platformVersion",platformVersion);  
                              
                capability.setCapability("build", "Native App automate Demo");  
                capability.setCapability("test", "Test Parallel");            
                capability.setCapability("isRealMobile", true);  
                capability.setCapability("app","lt://proverbial-android");     //Enter the app url here  
                capability.setCapability("network", false);  
                capability.setCapability("video", true);  
                capability.setCapability("console", true);  
                capability.setCapability("visual", true);  
      
                String gridURL = "https://" + username + ":" + accesskey + "@mobile-hub.lambdatest.com/wd/hub";  
                System.out.println(gridURL);  
                connection = new RemoteWebDriver(new URL(gridURL), capability);  
                System.out.println(capability);  
                System.out.println(connection.getSessionId());  
    }  
      
      
        @DataProvider  
        public Object[][] features() {  
            return testNGCucumberRunner.provideScenarios();  
        }  
       
        @AfterClass(alwaysRun = true)  
        public void tearDownClass() {  
            testNGCucumberRunner.finish();  
        }  
    }  
    

tip

  * You must set **isRealMobile** capability to `False` in the config file to run on **Virtual Devices**

### Step 5: Configure the Test Capabilities[â](https://www.testmuai.com/support/docs/appium-java-cucumber#step-5-configure-the-test-capabilities "Direct link to Step 5: Configure the Test Capabilities")

You can update your custom capabilities in test scripts. In this sample project, we are passing platform name, platform version, device name and app url _(generated earlier)_ along with other capabilities like build name and test name via capabilities object.

The capabilities object in the sample code are defined as:

  * Single
  * Parallel

    
    
    <?xml version="1.0" encoding="UTF-8"?>  
    <!DOCTYPE suite SYSTEM "http://testng.org/testng-1.0.dtd">  
    <suite name="BDD Test Suite" verbose="1" parallel="tests"  
    	thread-count="3" >  
        <test name="ANDROIDTEST" annotations="JDK"  
    		preserve-order="true">  
            <parameter name="deviceName" value=".*"/>  
            <parameter name="platformVersion" value="12"/>  
            <parameter name="platformName" value="Android"/>  
            <classes>  
                <class name="MyRunner.TestRunner" />  
            </classes>  
        </test> <!-- Test -->  
    </suite>  
    
    
    
    <?xml version="1.0" encoding="UTF-8"?>  
    <!DOCTYPE suite SYSTEM "http://testng.org/testng-1.0.dtd">  
    <suite name="BDD Test Suite" verbose="1" parallel="tests"  
           thread-count="2">  
        <test name="Galaxy" annotations="JDK"  
              preserve-order="true">  
            <parameter name="deviceName" value="Galaxy.*"/>  
            <parameter name="platformVersion" value="11"/>  
            <parameter name="platformName" value="Android"/>  
            <classes>  
                <class name="MyRunner.TestRunner"/>  
            </classes>  
        </test> <!-- Test -->  
        <test name="OnePlus" annotations="JDK"  
              preserve-order="true">  
            <parameter name="deviceName" value="Pixel.*"/>  
            <parameter name="platformVersion" value="12"/>  
            <parameter name="platformName" value="Android"/>  
            <classes>  
                <class name="MyRunner.TestRunner"/>  
            </classes>  
        </test> <!-- Test -->  
      
    </suite>  
    

tip

  * You must set **isRealMobile** capability to `False` in the config file to run on **Virtual Devices**

info

  * You must add the generated **APP_URL** to the `app` capability in the config file.
  * You can generate capabilities for your test requirements with the help of our inbuilt [**Capabilities Generator tool**](https://www.lambdatest.com/capabilities-generator/).For more details, please refer to our guide on [**Desired Capabilities in Appium**](https://www.testmuai.com/support/docs/desired-capabilities-in-appium/).

### Step 6: Execute and Monitor your Tests[â](https://www.testmuai.com/support/docs/appium-java-cucumber#step-6-execute-and-monitor-your-tests "Direct link to Step 6: Execute and Monitor your Tests")

  * Run the following commands to install the required dependencies:
        
        mvn clean install  
        

  * The tests can be executed in the terminal using the following command:

    * Single
    * Parallel
    
    mvn test -D suite=single.xml  
    
    
    mvn test -D suite=parallel.xml  
    

> Your test results would be displayed on the test console (or CLI if you are using terminal/cmd) and on the [TestMu AI App Automation Dashboard](https://appautomation.lambdatest.com/build).

## Reference Guides[â](https://www.testmuai.com/support/docs/appium-java-cucumber#reference-guides "Direct link to Reference Guides")

  * [Advanced Configuration for Capabilities](https://www.testmuai.com/support/docs/desired-capabilities-in-appium/)
  * [How to test locally hosted apps](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/)
  * [How to integrate TestMu AI with CI/CD](https://www.testmuai.com/support/docs/integrations-with-ci-cd-tools/)

---

*Auto-generated from TestMu AI documentation.*