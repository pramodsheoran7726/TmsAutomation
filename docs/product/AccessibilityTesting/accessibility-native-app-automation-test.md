# Native App Accessibility Automation

> **Source**: [https://www.testmuai.com/support/docs/accessibility-native-app-automation-test](https://www.testmuai.com/support/docs/accessibility-native-app-automation-test)

**Product**: Accessibility Testing

**Last Crawled**: 2026-01-27T20:47:20.740565

---

On this page

TestMu AI now enables native Accessibility Automation Testing for Android and iOS apps using Appium. This feature helps developers and QA teams to validate the accessibility of their mobile apps programmatically by leveraging TestMu AI's device cloud.

With built-in support for `lambda-accessibility-scan`, this integration ensures that your apps are tested for compliance with accessibility standards and best practices like WCAG (Web Content Accessibility Guidelines).

## Prerequisites[â](https://www.testmuai.com/support/docs/accessibility-native-app-automation-test#prerequisites "Direct link to Prerequisites")

Before getting started, ensure the following:

  * You have a TestMu AI account.
  * TestMu AI credentials (username & access key).
  * App uploaded to TestMu AI App Storage (lt://APP_ID).
  * Access to a valid Android or iOS device on TestMu AI.

> Native app accessibility automation supports both Android and iOS applications.

## Step 1: Setup the Environment Variables[â](https://www.testmuai.com/support/docs/accessibility-native-app-automation-test#step-1-setup-the-environment-variables "Direct link to Step 1: Setup the Environment Variables")

You need to export your environment variables _LT_USERNAME_ and _LT_ACCESS_KEY_ that are available in your [TestMu AI Profile page](https://accounts.lambdatest.com/security). Run the below mentioned commands in your terminal to setup the environment variables.

  * Linux / MacOS
  * Windows

    
    
    export LT_USERNAME="undefined"  
    export LT_ACCESS_KEY="undefined"  
    
    
    
    set LT_USERNAME="undefined"  
    set LT_ACCESS_KEY="undefined"  
    

## Step 2: Upload your Application[â](https://www.testmuai.com/support/docs/accessibility-native-app-automation-test#step-2-upload-your-application "Direct link to Step 2: Upload your Application")

Upload your **_iOS_** application (.ipa file) or **_android_** application (.apk or .aab file) to the TestMu AI servers using our **REST API**. You need to provide your **Username** and **AccessKey** in the format `Username:AccessKey` in the **cURL** command for authentication.

Make sure to add the path of the **appFile** in the cURL request. Below is an example cURL request to upload your app using our REST API:

  * App File
  * App URL

    
    
    curl -u "undefined:undefined" -X POST "https://manual-api.lambdatest.com/app/upload/realDevice" -F "appFile=@"/Users/macuser/Downloads/proverbial_android.apk"" -F "name="proverbial_app""  
    
    
    
    curl -u "undefined:undefined" -X POST "https://manual-api.lambdatest.com/app/upload/realDevice" -F "url=:https://prod-mobile-artefacts.lambdatest.com/assets/docs/proverbial_android.apk" -F "name=Proverbial_App"  
    

tip

  * If you do not have any **.apk** or **.ipa** file, you can run your sample tests on TestMu AI by using our sample apps, ð [Android app](https://prod-mobile-artefacts.lambdatest.com/assets/docs/proverbial_android.apk) or ð [iOS app](https://prod-mobile-artefacts.lambdatest.com/assets/docs/proverbial_ios.ipa).

  * Response of above cURL will be a **JSON** object containing the `APP_URL` of the format - `lt://APP123456789123456789` and will be used in the next step

## Step 3: Configure required Capabilities[â](https://www.testmuai.com/support/docs/accessibility-native-app-automation-test#step-3-configure-required-capabilities "Direct link to Step 3: Configure required Capabilities")

To enable accessibility testing, the following two configurations are mandatory:

  * Enable accessibility in capabilities:

    
    
    "accessibility": True  
    

  * Invoke scan via script:

    
    
    driver.execute_script("lambda-accessibility-scan")  
    

You may call `lambda-accessibility-scan` multiple times to scan different app screens or flows.

info

  * You must add the generated **APP_URL** to the `app` capability in the config file.
  * You can generate capabilities for your test requirements with the help of our inbuilt [**Capabilities Generator tool**](https://www.lambdatest.com/capabilities-generator/).For more details, please refer to our guide on [**Desired Capabilities in Appium**](https://www.testmuai.com/support/docs/desired-capabilities-in-appium/).

### Sample Script[â](https://www.testmuai.com/support/docs/accessibility-native-app-automation-test#sample-script "Direct link to Sample Script")
    
    
    from curses import flash  
    import time  
    # import requests  
    from appium import webdriver  
    from selenium.webdriver.support.ui import WebDriverWait  
    from selenium.webdriver.support import expected_conditions as EC  
    import unittest  
    import os  
    from appium import webdriver  
    from appium.options.android import UiAutomator2Options  
    import sys  
    from selenium.webdriver.common.by import By  
    from appium.webdriver.client_config import AppiumClientConfig  
      
      
    options = UiAutomator2Options()  
    options.load_capabilities({  
        "platform": "android",  
        "platformVersion": "14",  
        "deviceName": "Galaxy S23 Ultra",  
        "isRealMobile": True,  
        "app" : "lt://YOUR_APP_ID",  
        "accessibility": True,  
        "buildName": "Accessibility-lambda",  
        "idleTimeout": 1800,  
        "build": "Accessibility Native App",  
        "name": "Android App Accessibility",  
        "devicelog": True,  
        "visual": True,  
    })  
    url = "https://YOUR_LT_USERNAME:[[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection)/wd/hub"   
      
    client_config = AppiumClientConfig(  
        remote_server_addr=url,  
        ignore_certificates=True,  
        direct_connection=True  
    )  
      
    driver = webdriver.Remote(client_config.remote_server_addr, options = options, client_config=client_config)  
    driver.implicitly_wait(2)  
      
    time.sleep(10)  
    driver.execute_script("lambda-accessibility-scan")  
    time.sleep(10)  
    driver.find_element(By.CSS_SELECTOR, '#username').send_keys("Pbtest1") # Example CSS selector  
    driver.execute_script("lambda-accessibility-scan")  
      
    driver.quit()  
    

> App Accessibility automation is available for iOS 16.5 and later versions.

## Step 4: Execute and Monitor your Tests[â](https://www.testmuai.com/support/docs/accessibility-native-app-automation-test#step-4-execute-and-monitor-your-tests "Direct link to Step 4: Execute and Monitor your Tests")

Run the following command in the directory where your project has been saved to execute your build.
    
    
    python3 test.py  
    

## Accessibility Dashboard and Reporting[â](https://www.testmuai.com/support/docs/accessibility-native-app-automation-test#accessibility-dashboard-and-reporting "Direct link to Accessibility Dashboard and Reporting")

You can check the complete detailed report on the [Accessibility Dashboard](https://accessibility.lambdatest.com/automation)

![automation-dashboard](https://www.testmuai.com/support/assets/images/6-52878914f433aaecf87dd4b1a207643c.png)

---

*Auto-generated from TestMu AI documentation.*