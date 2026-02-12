# Appium with C#

> **Source**: [https://www.testmuai.com/support/docs/appium-csharp](https://www.testmuai.com/support/docs/appium-csharp)

**Product**: App Automation

**Last Crawled**: 2026-01-27T20:47:41.057501

---

On this page

Real Device Virtual Device

In this documentation, you will learn how to trigger a automation script of **CSharp** for application testing with **Appium** on TestMu AI, set the [**desired capabilities**](https://www.testmuai.com/support/docs/desired-capabilities-in-appium/) for appium testing, and other advanced features of TestMu AI.

## Prerequisites[â](https://www.testmuai.com/support/docs/appium-csharp#prerequisites "Direct link to Prerequisites")

  * Your TestMu AI [Username and Access key](https://accounts.lambdatest.com/security).
  * Install the MS Visual Studio 2013 or later version for C#. We recommend using the latest version.

## Try our Sample Repository[â](https://www.testmuai.com/support/docs/appium-csharp#try-our-sample-repository "Direct link to Try our Sample Repository")

### Step 1: Get a Sample Project[â](https://www.testmuai.com/support/docs/appium-csharp#step-1-get-a-sample-project "Direct link to Step 1: Get a Sample Project")

You can use your own project to configure and test it. For demo purposes, we are using the sample repository.

Sample repo

All the code samples in this documentation can be found on **TestMu AI 's Github Repository**. You can either download or clone the repository to quickly run your tests. [![Image](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAECkAABApAfV44g8AAAAHdElNRQfmBBMLCwK6SluIAAAEDUlEQVRYw62YS2xUVRjHf3NmGGbolFbtQ1Gkj0BQGZsyWBaSphtJ2VRCkwkRUzEGWBHALtSFMSZNWLhw0xgXmCgucNGFbalhUbXhkVAzKJSGaptgSiahnco0UDozdh7XRafTe8+5d3rnjt9Zzf985/zueX3nO+PCnlVQz0vU8xx+IMkj5okyz7Kdxq4NPerZRzshGnkWPx5cgEaGJHH+5hZXiTBv81NNTNDKeSZIoRUpKSY4TyvCCWIP/cwV7V5f5uhnT2mAKnqZtQ1YK7P0UmUXEWSIbMkIDY0sQwTtIDqZcgRYK1N0boQI87AshIbGQ8LFEN3EykZoaMQ4YoVo58H/gtDQeEC7GaKBiM5pmUmiJSx/mlnuktApERpkhJcLhkaXqGUX7/MTSxsCnjDIOzRRx4BBv4BXXvCEweGDvO7nIEOskGORaW4wwgADjHCDaRbJscIwb7E5733K0EfCuAHqGDdUL/GmrjbAMY4TYhsBvLhx4yXANkIc5xiVhlV9auhnnLr1ytPkDJULpYaIwjH+x9BPjtMAAqilR4rGbjY5gmzCbfjtooeaVUgHLZJzJU2OII0EJKWFDhC46VK+2+MQ0oRHGdvbuKGZGWVT3mSHI8gObip9zdAMYZKS/JQuRwiALpal3pKEBfvxSY7XGXUMGeWapPjYL0zi/xUSjiEJrihaUNAoSUnuOEYATJCUlEZBjSQts1AWJKakSTWCLZKUJV0WJE1WUrYIZWe75dhZonmlUw8eoXB9bC0LslXZrRlBSh4c28uCbFcWICV4JElCiWSl2etKLhkXRBW3A2VMWCUHFC0qmFTEVtocQ9poVbRJQUTZshWcVBbPnm3mhBLs00QgSFSJnClOOoKcUoKtRpQg+Bk2Tc/eLfExIHiPBZOehvGv8s0TnS+UuGZtzXxpmjzl1uakoXBt3eEEn3G74PInn/MGVUXeYy6qaaOPaYucbHo9xevLS7N0Ai/yNZmCW5xxvuVjkyP6Mp/wHb+xWCTx61t331kYS5wPgQA/SM6XqVYgz3B5g9xyhp36BmcLee8SR4DXDBOQ5JDpZB2S8k5jyXLW6F7FiC6NqAUO6h5Df1BvCnmBv4pARtTHXYj7+coMPflJ/Ihv+Ipe9losfQXXLBH3CZk1OcrjvMN1nre1cX38bIF4zFHzJoJzhRM7wKu2IKOmiCTn9EdZfy/m6MfPp/iAbvYxyl3m+JcAKX4kY2tsAEn66Cdn7eDhjGHfZ0mj8ctqaLA1kjhnlCtdMReHlUe2fcgUh238XwPAbr43xNNflSvVDJLgIrttTyrgo5sxVvLNr1pC1nbXCmN0O7mFqgkzSAyNSxaPIjcX0YgxSNgk7OhWoLj52UsLY9yzqH+FDib4XUlNDfYf4zU3unVPZ4cAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDQtMTlUMTE6MTA6MjUrMDA6MDAAc6jkAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA0LTE5VDExOjEwOjI1KzAwOjAwcS4QWAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=) View on GitHub](https://github.com/LambdaTest/LT-appium-csharp)

> Open the Android/iOS project using the file with a .sln extension.

### Step 2: Setup the Environment Variables[â](https://www.testmuai.com/support/docs/appium-csharp#step-2-setup-the-environment-variables "Direct link to Step 2: Setup the Environment Variables")

You need to export your environment variables _LT_USERNAME_ and _LT_ACCESS_KEY_ that are available in your [TestMu AI Profile page](https://accounts.lambdatest.com/security). Run the below mentioned commands in your terminal to setup the environment variables.

  * Linux / MacOS
  * Windows

    
    
    export LT_USERNAME="undefined"  
    export LT_ACCESS_KEY="undefined"  
    
    
    
    set LT_USERNAME="undefined"  
    set LT_ACCESS_KEY="undefined"  
    

### Step 3: Upload your Application[â](https://www.testmuai.com/support/docs/appium-csharp#step-3-upload-your-application "Direct link to Step 3: Upload your Application")

Upload your **_iOS_** application (.ipa file) or **_android_** application (.apk or .aab file) to the TestMu AI servers using our **REST API**. You need to provide your **Username** and **AccessKey** in the format `Username:AccessKey` in the **cURL** command for authentication.

Make sure to add the path of the **appFile** in the cURL request. Below is an example cURL request to upload your app using our REST API:

  * App File
  * App URL

    
    
    curl -u "undefined:undefined" -X POST "https://manual-api.lambdatest.com/app/upload/realDevice" -F "appFile=@"/Users/macuser/Downloads/proverbial_android.apk"" -F "name="proverbial_app""  
    
    
    
    curl -u "undefined:undefined" -X POST "https://manual-api.lambdatest.com/app/upload/realDevice" -F "url=:https://prod-mobile-artefacts.lambdatest.com/assets/docs/proverbial_android.apk" -F "name=Proverbial_App"  
    

tip

  * If you do not have any **.apk** or **.ipa** file, you can run your sample tests on TestMu AI by using our sample apps, ð [Android app](https://prod-mobile-artefacts.lambdatest.com/assets/docs/proverbial_android.apk) or ð [iOS app](https://prod-mobile-artefacts.lambdatest.com/assets/docs/proverbial_ios.ipa).

  * Response of above cURL will be a **JSON** object containing the `APP_URL` of the format - `lt://APP123456789123456789` and will be used in the next step

### Step 4: Update your Automation Script[â](https://www.testmuai.com/support/docs/appium-csharp#step-4-update-your-automation-script "Direct link to Step 4: Update your Automation Script")

An automation script for the sample application given above has been provided here. Ensure to update the `APP_URL`, `username` and `accessKey` in the code scripts before running the tests.

  * iOS
  * Android

csharp-appium-first.sln
    
    
    using System;  
    using OpenQA.Selenium.Appium;  
    using OpenQA.Selenium.Support.UI;  
    using OpenQA.Selenium.Appium.iOS;  
    using System.Threading;  
      
    namespace csharp_appium_first  
      
    {  
        class Program  
        {  
            static void Main(string[] args)  
            {  
                AppiumOptions caps = new AppiumOptions();  
      
      
                // Set your LambdaTest access credentials  
                caps.AddAdditionalCapability("LT_USERNAME", "username"); //Enter the Username here  
                caps.AddAdditionalCapability("LT_ACCESSKEY", "accessKey");  //Enter the Access key here  
      
                // Set URL of the application under test  
                caps.AddAdditionalCapability("app", "APP_URL"); //Enter the App URL here.  
      
                // Specify device and os_version  
                caps.AddAdditionalCapability("deviceName", "iPhone 12"); //Change the device name here  
                caps.AddAdditionalCapability("platformVersion", "15");  
                caps.AddAdditionalCapability("platformName", "iOS");  
                caps.AddAdditionalCapability("isRealMobile", true);  
                caps.AddAdditionalCapability("network", false);  
      
                // Specify the platformName  
                //caps.PlatformName = "iOS";  
      
                // Set other LambdaTest capabilities  
                caps.AddAdditionalCapability("project", "First CSharp project");  
                caps.AddAdditionalCapability("build", "CSharp iOS");  
                caps.AddAdditionalCapability("name", "first_test");  
      
                // Initialize the remote Webdriver using LambdaTest remote URL  
                // and desired capabilities defined above  
                IOSDriver<IOSElement> driver = new IOSDriver<IOSElement>(  
                    new Uri("https://mobile-hub.lambdatest.com/wd/hub"), caps);  
      
                // Test case for the sample iOS app.  
                // If you have uploaded your app, update the test case here.  
                IOSElement color = (IOSElement)new WebDriverWait(driver, TimeSpan.FromSeconds(30)).Until(  
                    SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(MobileBy.Id("color"))  
                );  
                color.Click();  
                color.Click();  
      
                IOSElement text = (IOSElement)new WebDriverWait(driver, TimeSpan.FromSeconds(30)).Until(  
                    SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(MobileBy.Id("Text"))  
                );  
                text.Click();  
      
                IOSElement toast = (IOSElement)new WebDriverWait(driver, TimeSpan.FromSeconds(30)).Until(  
                    SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(MobileBy.Id("toast"))  
                );  
                toast.Click();  
      
                IOSElement nf = (IOSElement)new WebDriverWait(driver, TimeSpan.FromSeconds(30)).Until(  
                    SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(MobileBy.Id("notification"))  
                );  
                nf.Click();  
      
                IOSElement gl = (IOSElement)new WebDriverWait(driver, TimeSpan.FromSeconds(30)).Until(  
                    SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(MobileBy.Id("geoLocation"))  
                );  
                gl.Click();  
      
                Thread.Sleep(5000);  
      
                driver.Navigate().Back();  
      
                IOSElement st = (IOSElement)new WebDriverWait(driver, TimeSpan.FromSeconds(30)).Until(  
                    SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(MobileBy.Id("speedTest"))  
                );  
                st.Click();  
      
                Thread.Sleep(5000);  
      
                driver.Navigate().Back();  
      
                IOSElement browser = (IOSElement)new WebDriverWait(driver, TimeSpan.FromSeconds(30)).Until(  
                    SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(MobileBy.AccessibilityId("Browser"))  
                );  
                browser.Click();  
      
                IOSElement inputBox = (IOSElement)new WebDriverWait(driver, TimeSpan.FromSeconds(30)).Until(  
                    SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(MobileBy.Id("url"))  
                );  
                inputBox.Click();  
      
      
                driver.Quit();  
      
            }  
        }  
    }  
    

tip

  * You must set **isRealMobile** capability to `False` in the config file to run on **Virtual Devices**

csharp-appium-first.sln
    
    
    using System;  
    using OpenQA.Selenium.Appium;  
    using OpenQA.Selenium.Support.UI;  
    using OpenQA.Selenium.Appium.Android;  
    using System.Threading;  
      
    namespace csharp_appium {  
      class Program {  
        static void Main(string[] args) {  
            AppiumOptions caps = new AppiumOptions();  
      
            caps.AddAdditionalCapability("user", "########"); //Add the LT Username  
            caps.AddAdditionalCapability("accessKey", "########"); //Add the LT Access key  
      
            // Set URL of the application under test  
            caps.AddAdditionalCapability("app", "###########"); //Add the App ID  
      
            // Specify device and os_version  
            caps.AddAdditionalCapability("deviceName", "Galaxy S21 Ultra 5G"); //Add the Device Details  
            caps.AddAdditionalCapability("platformVersion", "11");  
            caps.AddAdditionalCapability("platformName", "Android");  
            caps.AddAdditionalCapability("isRealMobile", true);  
            caps.AddAdditionalCapability("network", false);  
            caps.AddAdditionalCapability("w3c", true);  
            caps.AddAdditionalCapability("visual", true);  
            caps.AddAdditionalCapability("video", true);  
            caps.AddAdditionalCapability("project", "CSharp Sample Android");  
            caps.AddAdditionalCapability("build", "CSharp Sample Android");  
            caps.AddAdditionalCapability("name", "CSharp Sample Android");  
      
            // Initialize the remote Webdriver using LambdaTest remote URL  
            // and desired capabilities defined above  
            AndroidDriver < AndroidElement > driver = new AndroidDriver < AndroidElement > (  
              new Uri("https://mobile-hub.lambdatest.com/wd/hub"), caps);  
      
            // Test case for the sample Android app.  
            // If you have uploaded your app, update the test case here.  
            AndroidElement color = (AndroidElement) new WebDriverWait(driver, TimeSpan.FromSeconds(30)).Until(  
              SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(MobileBy.Id("color"))  
            );  
            color.Click();  
            color.Click();  
      
            AndroidElement text = (AndroidElement) new WebDriverWait(driver, TimeSpan.FromSeconds(30)).Until(  
              SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(MobileBy.Id("Text"))  
            );  
            text.Click();  
      
            AndroidElement toast = (AndroidElement) new WebDriverWait(driver, TimeSpan.FromSeconds(30)).Until(  
              SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(MobileBy.Id("toast"))  
            );  
            toast.Click();  
      
            AndroidElement nf = (AndroidElement) new WebDriverWait(driver, TimeSpan.FromSeconds(30)).Until(  
              SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(MobileBy.Id("notification"))  
            );  
            nf.Click();  
      
            AndroidElement gl = (AndroidElement) new WebDriverWait(driver, TimeSpan.FromSeconds(30)).Until(  
              SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(MobileBy.Id("geoLocation"))  
            );  
            gl.Click();  
      
            Thread.Sleep(5000);  
      
            driver.Navigate().Back();  
      
            AndroidElement st = (AndroidElement) new WebDriverWait(driver, TimeSpan.FromSeconds(30)).Until(  
              SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(MobileBy.Id("speedTest"))  
            );  
            st.Click();  
      
            Thread.Sleep(5000);  
      
            driver.Navigate().Back();  
    

### Step 5: Configure the Test Capabilities[â](https://www.testmuai.com/support/docs/appium-csharp#step-5-configure-the-test-capabilities "Direct link to Step 5: Configure the Test Capabilities")

You can update your custom capabilities in test scripts. In this sample project, we are passing platform name, platform version, device name and app url _(generated earlier)_ along with other capabilities like build name and test name via capabilities object.

The capabilities object in the sample code are defined as:

  * iOS
  * Android

iOS(.ipa)
    
    
      AppiumOptions caps = new AppiumOptions();   
      caps.AddAdditionalCapability("LT_USERNAME", "username");   
      caps.AddAdditionalCapability("LT_ACCESSKEY", "accessKey");  
    	caps.setCapability("platformName", "iOS");  
    	caps.setCapability("deviceName", "iPhone 13 Pro");  
    	caps.setCapability("isRealMobile", true);  
    	caps.setCapability("platformVersion","15.0");  
    	caps.setCapability("Visual", true);  
    	caps.setCapability("Console", true);  
    	caps.setCapability("Network", false);  
      
    

Android(.apk)
    
    
      AppiumOptions caps = new AppiumOptions();   
      caps.AddAdditionalCapability("LT_USERNAME", "username");   
      caps.AddAdditionalCapability("LT_ACCESSKEY", "accessKey");  
    	caps.setCapability("platformName", "Android");  
    	caps.setCapability("deviceName", "Galaxy S20");  
    	caps.setCapability("isRealMobile", true);  
    	caps.setCapability("platformVersion","11");  
    	caps.setCapability("Visual", true);  
    	caps.setCapability("Console", true);  
    	caps.setCapability("Network", false);  
      
    

tip

  * You must set **isRealMobile** capability to `False` in the config file to run on **Virtual Devices**

info

  * You must add the generated **APP_URL** to the `app` capability in the config file.
  * You must set **isRealMobile** capability to `False` in the config file to run on **Virtual Devices**
  * You can generate capabilities for your test requirements with the help of our inbuilt [**Capabilities Generator tool**](https://www.lambdatest.com/capabilities-generator/).For more details, please refer to our guide on [**Desired Capabilities in Appium**](https://www.testmuai.com/support/docs/desired-capabilities-in-appium/).

### Step 6: Execute and Monitor your Tests[â](https://www.testmuai.com/support/docs/appium-csharp#step-6-execute-and-monitor-your-tests "Direct link to Step 6: Execute and Monitor your Tests")

  * Click the **Play** icon to run the test.

> Your test results would be displayed on the test console (or CLI if you are using terminal/cmd) and on the [TestMu AI App Automation Dashboard](https://appautomation.lambdatest.com/build).

## Reference Guides[â](https://www.testmuai.com/support/docs/appium-csharp#reference-guides "Direct link to Reference Guides")

  * [Advanced Configuration for Capabilities](https://www.testmuai.com/support/docs/desired-capabilities-in-appium/)
  * [How to test locally hosted apps](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/)
  * [How to integrate TestMu AI with CI/CD](https://www.testmuai.com/support/docs/integrations-with-ci-cd-tools/)

---

*Auto-generated from TestMu AI documentation.*