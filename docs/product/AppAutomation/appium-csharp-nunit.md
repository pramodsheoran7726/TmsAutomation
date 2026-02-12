# Appium with NUnit

> **Source**: [https://www.testmuai.com/support/docs/appium-csharp-nunit](https://www.testmuai.com/support/docs/appium-csharp-nunit)

**Product**: App Automation

**Last Crawled**: 2026-01-27T20:47:58.947396

---

On this page

Real Device Virtual Device

In this documentation, you will learn how to trigger a automation script of **NUnit** for application testing with **Appium** on TestMu AI, set the [**desired capabilities**](https://www.testmuai.com/support/docs/desired-capabilities-in-appium/) for appium testing, and other advanced features of TestMu AI.

## Prerequisites[â](https://www.testmuai.com/support/docs/appium-csharp-nunit#prerequisites "Direct link to Prerequisites")

  * Your TestMu AI [Username and Access key](https://accounts.lambdatest.com/security).
  * Install the MS Visual Studio 2013 or later version for C#. We recommend using the latest version.
  * Install the framework [NUnit3.0](https://nunit.org/), and [NuGet](https://www.nuget.org/downloads) plugin for Visual Studio and add the NuGet CLI executable installed in your path.
  * Access to an Android app (.apk or .aab file) or an iOS app (.ipa file).

## Install and Setup the Dependencies[â](https://www.testmuai.com/support/docs/appium-csharp-nunit#install-and-setup-the-dependencies "Direct link to Install and Setup the Dependencies")

  * Install the NuGet packages for the project:

    
    
    nuget.exe install ..\NUnitSelenium\packages.config  
    

  * Clean and rebuild the project

    
    
    nmake clean build  
    

## Try our Sample Repository[â](https://www.testmuai.com/support/docs/appium-csharp-nunit#try-our-sample-repository "Direct link to Try our Sample Repository")

### Step 1: Get a Sample Project[â](https://www.testmuai.com/support/docs/appium-csharp-nunit#step-1-get-a-sample-project "Direct link to Step 1: Get a Sample Project")

You can use your own project to configure and test it. For demo purposes, we are using the sample repository.

Sample repo

All the code samples in this documentation can be found on **TestMu AI 's Github Repository**. You can either download or clone the repository to quickly run your tests. [![Image](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAECkAABApAfV44g8AAAAHdElNRQfmBBMLCwK6SluIAAAEDUlEQVRYw62YS2xUVRjHf3NmGGbolFbtQ1Gkj0BQGZsyWBaSphtJ2VRCkwkRUzEGWBHALtSFMSZNWLhw0xgXmCgucNGFbalhUbXhkVAzKJSGaptgSiahnco0UDozdh7XRafTe8+5d3rnjt9Zzf985/zueX3nO+PCnlVQz0vU8xx+IMkj5okyz7Kdxq4NPerZRzshGnkWPx5cgEaGJHH+5hZXiTBv81NNTNDKeSZIoRUpKSY4TyvCCWIP/cwV7V5f5uhnT2mAKnqZtQ1YK7P0UmUXEWSIbMkIDY0sQwTtIDqZcgRYK1N0boQI87AshIbGQ8LFEN3EykZoaMQ4YoVo58H/gtDQeEC7GaKBiM5pmUmiJSx/mlnuktApERpkhJcLhkaXqGUX7/MTSxsCnjDIOzRRx4BBv4BXXvCEweGDvO7nIEOskGORaW4wwgADjHCDaRbJscIwb7E5733K0EfCuAHqGDdUL/GmrjbAMY4TYhsBvLhx4yXANkIc5xiVhlV9auhnnLr1ytPkDJULpYaIwjH+x9BPjtMAAqilR4rGbjY5gmzCbfjtooeaVUgHLZJzJU2OII0EJKWFDhC46VK+2+MQ0oRHGdvbuKGZGWVT3mSHI8gObip9zdAMYZKS/JQuRwiALpal3pKEBfvxSY7XGXUMGeWapPjYL0zi/xUSjiEJrihaUNAoSUnuOEYATJCUlEZBjSQts1AWJKakSTWCLZKUJV0WJE1WUrYIZWe75dhZonmlUw8eoXB9bC0LslXZrRlBSh4c28uCbFcWICV4JElCiWSl2etKLhkXRBW3A2VMWCUHFC0qmFTEVtocQ9poVbRJQUTZshWcVBbPnm3mhBLs00QgSFSJnClOOoKcUoKtRpQg+Bk2Tc/eLfExIHiPBZOehvGv8s0TnS+UuGZtzXxpmjzl1uakoXBt3eEEn3G74PInn/MGVUXeYy6qaaOPaYucbHo9xevLS7N0Ai/yNZmCW5xxvuVjkyP6Mp/wHb+xWCTx61t331kYS5wPgQA/SM6XqVYgz3B5g9xyhp36BmcLee8SR4DXDBOQ5JDpZB2S8k5jyXLW6F7FiC6NqAUO6h5Df1BvCnmBv4pARtTHXYj7+coMPflJ/Ihv+Ipe9losfQXXLBH3CZk1OcrjvMN1nre1cX38bIF4zFHzJoJzhRM7wKu2IKOmiCTn9EdZfy/m6MfPp/iAbvYxyl3m+JcAKX4kY2tsAEn66Cdn7eDhjGHfZ0mj8ctqaLA1kjhnlCtdMReHlUe2fcgUh238XwPAbr43xNNflSvVDJLgIrttTyrgo5sxVvLNr1pC1nbXCmN0O7mFqgkzSAyNSxaPIjcX0YgxSNgk7OhWoLj52UsLY9yzqH+FDib4XUlNDfYf4zU3unVPZ4cAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDQtMTlUMTE6MTA6MjUrMDA6MDAAc6jkAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA0LTE5VDExOjEwOjI1KzAwOjAwcS4QWAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=) View on GitHub](https://github.com/LambdaTest/LT-appium-csharp-nunit)

> Open the Android/iOS project using the file with a .sln extension.

### Step 2: Setup the Environment Variables[â](https://www.testmuai.com/support/docs/appium-csharp-nunit#step-2-setup-the-environment-variables "Direct link to Step 2: Setup the Environment Variables")

You need to export your environment variables _LT_USERNAME_ and _LT_ACCESS_KEY_ that are available in your [TestMu AI Profile page](https://accounts.lambdatest.com/security). Run the below mentioned commands in your terminal to setup the environment variables.

  * Linux / MacOS
  * Windows

    
    
    export LT_USERNAME="undefined"  
    export LT_ACCESS_KEY="undefined"  
    
    
    
    set LT_USERNAME="undefined"  
    set LT_ACCESS_KEY="undefined"  
    

### Step 3: Upload your Application[â](https://www.testmuai.com/support/docs/appium-csharp-nunit#step-3-upload-your-application "Direct link to Step 3: Upload your Application")

Upload your **_iOS_** application (.ipa file) or **_android_** application (.apk or .aab file) to the TestMu AI servers using our **REST API**. You need to provide your **Username** and **AccessKey** in the format `Username:AccessKey` in the **cURL** command for authentication.

Make sure to add the path of the **appFile** in the cURL request. Below is an example cURL request to upload your app using our REST API:

  * App File
  * App URL

    
    
    curl -u "undefined:undefined" -X POST "https://manual-api.lambdatest.com/app/upload/realDevice" -F "appFile=@"/Users/macuser/Downloads/proverbial_android.apk"" -F "name="proverbial_app""  
    
    
    
    curl -u "undefined:undefined" -X POST "https://manual-api.lambdatest.com/app/upload/realDevice" -F "url=:https://prod-mobile-artefacts.lambdatest.com/assets/docs/proverbial_android.apk" -F "name=Proverbial_App"  
    

tip

  * If you do not have any **.apk** or **.ipa** file, you can run your sample tests on TestMu AI by using our sample apps, ð [Android app](https://prod-mobile-artefacts.lambdatest.com/assets/docs/proverbial_android.apk) or ð [iOS app](https://prod-mobile-artefacts.lambdatest.com/assets/docs/proverbial_ios.ipa).

  * Response of above cURL will be a **JSON** object containing the `APP_URL` of the format - `lt://APP123456789123456789` and will be used in the next step

### Step 4: Update your Automation Script[â](https://www.testmuai.com/support/docs/appium-csharp-nunit#step-4-update-your-automation-script "Direct link to Step 4: Update your Automation Script")

An automation script for the sample application given above has been provided here. Ensure to update the `APP_URL`, `username` and `accessKey` in the code scripts before running the tests.

NUnitAppiumTests.cs
    
    
    using System;  
    using OpenQA.Selenium;  
    using OpenQA.Selenium.Remote;  
      
    using NUnit.Framework;  
    using System.Threading;  
    using System.Collections.Generic;  
    using OpenQA.Selenium.Appium;  
    using OpenQA.Selenium.Appium.Android;  
    using OpenQA.Selenium.Appium.iOS;  
    using OpenQA.Selenium.Support.UI;  
      
    namespace NUnitSelenium  
    {  
        //-------------------Running two parallel test cases----------------------------  
        [TestFixture("OnePlus 6", "8", "Android", "APP_URL")]    // Android Testing   
        [TestFixture("iPhone 11", "14", "iOS", "APP_URL")]      // iOS testing  
        [Parallelizable(ParallelScope.Fixtures)]  
        public class NUnitSeleniumSample  
        {  
            //--------------------We can initialize username and access Key with hub url to authenticate our test script-------------------------------------  
            public static string LT_USERNAME = Environment.GetEnvironmentVariable("LT_USERNAME") ==null ? "your username" : Environment.GetEnvironmentVariable("LT_USERNAME");  
            public static string LT_ACCESS_KEY = Environment.GetEnvironmentVariable("LT_ACCESS_KEY") == null ? "your accessKey" : Environment.GetEnvironmentVariable("LT_ACCESS_KEY");  
            public static bool tunnel = Boolean.Parse(Environment.GetEnvironmentVariable("LT_TUNNEL")== null ? "false" : Environment.GetEnvironmentVariable("LT_TUNNEL"));         
            public static string build = Environment.GetEnvironmentVariable("LT_BUILD") == null ? "your build name" : Environment.GetEnvironmentVariable("LT_BUILD");  
            public static string seleniumUri = "https://mobile-hub.lambdatest.com:443/wd/hub";  
      
            //-------------------------Initialization of Driver--------------------------  
            AndroidDriver<AndroidElement> driver;  
      
            // Initialization some parameter   
            private String deviceName;  
            private String platformVersion;  
            private String platformName;  
            private String app;  
      
            public NUnitSeleniumSample(String deviceName, String platformVersion, String platformName, String app)  
            {  
                this.deviceName = deviceName;  
                this.platformVersion = platformVersion;  
                this.platformName = platformName;  
                this.app = app;  
            }  
      
            [SetUp]  
            public void Init()  
            {  
                //-----------------------------------Create instance for passing capabilities-----------------------------------------------------------------  
                AppiumOptions capabilities = new AppiumOptions();  
                capabilities.AddAdditionalCapability("user", "LT_USERNAME");   //Add LambdaTest username here  
                capabilities.AddAdditionalCapability("accessKey", "LT_ACCESS_KEY");   //Add LambdaTest accessKey here  
                capabilities.AddAdditionalCapability("app",app);  
                capabilities.AddAdditionalCapability("deviceName", deviceName);  
                capabilities.AddAdditionalCapability("platformVersion", platformVersion);  
                capabilities.AddAdditionalCapability("platformName", platformName);  
                capabilities.AddAdditionalCapability("build", "Csharp NUnit");  
                capabilities.AddAdditionalCapability("name", "NUnit Test");  
                capabilities.AddAdditionalCapability("isRealMobile", true);  
      
                driver = new AndroidDriver<AndroidElement> (new Uri(seleniumUri), capabilities, TimeSpan.FromSeconds(600));  
                  
               // Console.Out.WriteLine(driver);  
                Console.Out.WriteLine("On Which Device/Platform test is running:"+deviceName+" "+platformVersion+" "+platformName);  
                  
            }  
      
            [Test]  
            public void Todotest()  
            {  
                {  
                    //----------------------Text Color Changes---------------------------------  
                    Console.WriteLine("1.Text Color Changes");  
                    AndroidElement searchElement = (AndroidElement)new WebDriverWait(  
                     driver, TimeSpan.FromSeconds(20)).Until(  
                     SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(  
                        MobileBy.Id("color"))  
                 );  
                    System.Threading.Thread.Sleep(1000);  
                    searchElement.Click();  
                    System.Threading.Thread.Sleep(1000);  
                    searchElement.Click();  
      
                    System.Threading.Thread.Sleep(1000);  
      
                    //----------------------Text Changes by clicking a button---------------------------------  
                    Console.WriteLine("2.Text Changes by clicking a button");  
      
                    AndroidElement changeelement = (AndroidElement)new WebDriverWait(  
                     driver, TimeSpan.FromSeconds(10)).Until(  
                     SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(  
                        MobileBy.Id("Text"))  
                 );  
                    changeelement.Click();  
      
                    System.Threading.Thread.Sleep(1000);  
      
                    //----------------------Toast---------------------------------  
                    Console.WriteLine("3.Toast");  
      
                    AndroidElement toast = (AndroidElement)new WebDriverWait(  
                     driver, TimeSpan.FromSeconds(10)).Until(  
                     SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(  
                        MobileBy.Id("toast"))  
                 );  
                    toast.Click();  
      
                    System.Threading.Thread.Sleep(1000);  
      
                    //----------------------Notification By clicking a button---------------------------------  
                    Console.WriteLine("4.Notification Button clicked");  
      
                    AndroidElement Notification = (AndroidElement)new WebDriverWait(  
                     driver, TimeSpan.FromSeconds(10)).Until(  
                     SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(  
                        MobileBy.Id("notification"))  
                 );  
                    Notification.Click();  
                    System.Threading.Thread.Sleep(2000);  
      
                    //----------------------Geolocation button---------------------------------  
                    Console.WriteLine("5.Geolocation");  
      
                    AndroidElement geolocation = (AndroidElement)new WebDriverWait(  
                     driver, TimeSpan.FromSeconds(10)).Until(  
                     SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(  
                        MobileBy.Id("geoLocation"))  
                 );  
                    geolocation.Click();  
                    System.Threading.Thread.Sleep(4000);  
                    driver.PressKeyCode(AndroidKeyCode.Back);  
                    System.Threading.Thread.Sleep(1000);  
      
                    //----------------------Speed Test Button---------------------------------  
                    Console.WriteLine("6.Speed Test Button Clicked");  
      
                    AndroidElement speed = (AndroidElement)new WebDriverWait(  
                     driver, TimeSpan.FromSeconds(10)).Until(  
                     SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(  
                        MobileBy.Id("speedTest"))  
                 );  
                    speed.Click();  
                    System.Threading.Thread.Sleep(5000);  
                    driver.PressKeyCode(AndroidKeyCode.Back);  
                    System.Threading.Thread.Sleep(1000);  
      
      
                    //----------------------Browser Button---------------------------------  
                    //   Console.WriteLine("Browser Button Clicked");  
      
                    AndroidElement BROWSER = (AndroidElement)new WebDriverWait(  
                      driver, TimeSpan.FromSeconds(30)).Until(  
                      SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(  
                         MobileBy.XPath("//android.widget.FrameLayout[@content-desc=\"Browser\"]/android.widget.FrameLayout/android.widget.ImageView"))  
                        
                  );  
                    BROWSER.Click();  
      
      
                    AndroidElement url = (AndroidElement)new WebDriverWait(  
                    driver, TimeSpan.FromSeconds(10)).Until(  
                    SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(  
                       MobileBy.Id("url"))  
                );  
      
                    url.Click();  
      
                    url.SendKeys("www.lambdatest.com");  
      
                    System.Threading.Thread.Sleep(1000);  
      
                    driver.PressKeyCode(AndroidKeyCode.Back);  
      
                    System.Threading.Thread.Sleep(3000);  
                }  
            }  
      
            [TearDown]  
            public void Cleanup()  
      
            {  
                  
                bool passed = TestContext.CurrentContext.Result.Outcome.Status == NUnit.Framework.Interfaces.TestStatus.Passed;  
                try  
                {  
                    //-----------------Marking Test status passed or failed -----------------------------------------  
                    ((IJavaScriptExecutor)driver).ExecuteScript("lambda-status=" + (passed ? "passed" : "failed"));  
                     
                }  
                finally  
                {  
                    //---------------------Quit the session-----------------------  
                      
                    driver.Quit();  
                }  
            }  
        }  
    }  
      
    

tip

  * You must set **isRealMobile** capability to `False` in the config file to run on **Virtual Devices**

### Step 5: Configure the Test Capabilities[â](https://www.testmuai.com/support/docs/appium-csharp-nunit#step-5-configure-the-test-capabilities "Direct link to Step 5: Configure the Test Capabilities")

You can update your custom capabilities in test scripts. In this sample project, we are passing platform name, platform version, device name and app url _(generated earlier)_ along with other capabilities like build name and test name via capabilities object.

The capabilities object in the sample code are defined as:
    
    
    AppiumOptions capabilities = new AppiumOptions();  
    capabilities.AddAdditionalCapability("user", "LT_USERNAME");   //Add LambdaTest username here  
    capabilities.AddAdditionalCapability("accessKey", "LT_ACCESS_KEY");   //Add LambdaTest accessKey here  
    capabilities.AddAdditionalCapability("app",app);  
    capabilities.AddAdditionalCapability("deviceName", deviceName);  
    capabilities.AddAdditionalCapability("platformVersion", platformVersion);  
    capabilities.AddAdditionalCapability("platformName", platformName);  
    capabilities.AddAdditionalCapability("build", "Csharp NUnit");  
    capabilities.AddAdditionalCapability("name", "NUnit Test");  
    capabilities.AddAdditionalCapability("isRealMobile", true);  
    

tip

  * You must set **isRealMobile** capability to `False` in the config file to run on **Virtual Devices**

info

  * You must add the generated **APP_URL** to the `app` capability in the config file.
  * You must set **isRealMobile** capability to `False` in the config file to run on **Virtual Devices**
  * You can generate capabilities for your test requirements with the help of our inbuilt [**Capabilities Generator tool**](https://www.lambdatest.com/capabilities-generator/).For more details, please refer to our guide on [**Desired Capabilities in Appium**](https://www.testmuai.com/support/docs/desired-capabilities-in-appium/).

### Step 6: Execute and Monitor your Tests[â](https://www.testmuai.com/support/docs/appium-csharp-nunit#step-6-execute-and-monitor-your-tests "Direct link to Step 6: Execute and Monitor your Tests")

Run the following command in your project directory to execute your build and run the tests parallelly.
    
    
    nmake all  
    

OR

Go to **Build menu** in Visual Studio Code menu bar and click on **Build Solution**. After the solution is built navigate built navigate to **Test menu** and click on **Test All** to execute the tests.

> Your test results would be displayed on the test console (or CLI if you are using terminal/cmd) and on the [TestMu AI App Automation Dashboard](https://appautomation.lambdatest.com/build).

## Reference Guides[â](https://www.testmuai.com/support/docs/appium-csharp-nunit#reference-guides "Direct link to Reference Guides")

  * [Advanced Configuration for Capabilities](https://www.testmuai.com/support/docs/desired-capabilities-in-appium/)
  * [How to test locally hosted apps](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/)
  * [How to integrate TestMu AI with CI/CD](https://www.testmuai.com/support/docs/integrations-with-ci-cd-tools/)

---

*Auto-generated from TestMu AI documentation.*