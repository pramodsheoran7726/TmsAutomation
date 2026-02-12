# Appium with Behave

> **Source**: [https://www.testmuai.com/support/docs/appium-python-behave](https://www.testmuai.com/support/docs/appium-python-behave)

**Product**: App Automation

**Last Crawled**: 2026-01-27T20:48:04.105329

---

On this page

Real Device Virtual Device

In this documentation, you will learn how to trigger a automation script of **Behave** for application testing with **Appium** on TestMu AI, set the [**desired capabilities**](https://www.testmuai.com/support/docs/desired-capabilities-in-appium/) for appium testing, and other advanced features of TestMu AI.

## Prerequisites[â](https://www.testmuai.com/support/docs/appium-python-behave#prerequisites "Direct link to Prerequisites")

  * Your TestMu AI [Username and Access key](https://accounts.lambdatest.com/security).
  * You should have [Python](https://www.python.org/downloads/) installed.
  * Download and install [**pip**](https://pip.pypa.io/en/stable/installation/).

## Try our Sample Repository[â](https://www.testmuai.com/support/docs/appium-python-behave#try-our-sample-repository "Direct link to Try our Sample Repository")

### Step 1: Get a Sample Project[â](https://www.testmuai.com/support/docs/appium-python-behave#step-1-get-a-sample-project "Direct link to Step 1: Get a Sample Project")

You can use your own project to configure and test it. For demo purposes, we are using the sample repository.

Sample repo

All the code samples in this documentation can be found on **TestMu AI 's Github Repository**. You can either download or clone the repository to quickly run your tests. [![Image](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAECkAABApAfV44g8AAAAHdElNRQfmBBMLCwK6SluIAAAEDUlEQVRYw62YS2xUVRjHf3NmGGbolFbtQ1Gkj0BQGZsyWBaSphtJ2VRCkwkRUzEGWBHALtSFMSZNWLhw0xgXmCgucNGFbalhUbXhkVAzKJSGaptgSiahnco0UDozdh7XRafTe8+5d3rnjt9Zzf985/zueX3nO+PCnlVQz0vU8xx+IMkj5okyz7Kdxq4NPerZRzshGnkWPx5cgEaGJHH+5hZXiTBv81NNTNDKeSZIoRUpKSY4TyvCCWIP/cwV7V5f5uhnT2mAKnqZtQ1YK7P0UmUXEWSIbMkIDY0sQwTtIDqZcgRYK1N0boQI87AshIbGQ8LFEN3EykZoaMQ4YoVo58H/gtDQeEC7GaKBiM5pmUmiJSx/mlnuktApERpkhJcLhkaXqGUX7/MTSxsCnjDIOzRRx4BBv4BXXvCEweGDvO7nIEOskGORaW4wwgADjHCDaRbJscIwb7E5733K0EfCuAHqGDdUL/GmrjbAMY4TYhsBvLhx4yXANkIc5xiVhlV9auhnnLr1ytPkDJULpYaIwjH+x9BPjtMAAqilR4rGbjY5gmzCbfjtooeaVUgHLZJzJU2OII0EJKWFDhC46VK+2+MQ0oRHGdvbuKGZGWVT3mSHI8gObip9zdAMYZKS/JQuRwiALpal3pKEBfvxSY7XGXUMGeWapPjYL0zi/xUSjiEJrihaUNAoSUnuOEYATJCUlEZBjSQts1AWJKakSTWCLZKUJV0WJE1WUrYIZWe75dhZonmlUw8eoXB9bC0LslXZrRlBSh4c28uCbFcWICV4JElCiWSl2etKLhkXRBW3A2VMWCUHFC0qmFTEVtocQ9poVbRJQUTZshWcVBbPnm3mhBLs00QgSFSJnClOOoKcUoKtRpQg+Bk2Tc/eLfExIHiPBZOehvGv8s0TnS+UuGZtzXxpmjzl1uakoXBt3eEEn3G74PInn/MGVUXeYy6qaaOPaYucbHo9xevLS7N0Ai/yNZmCW5xxvuVjkyP6Mp/wHb+xWCTx61t331kYS5wPgQA/SM6XqVYgz3B5g9xyhp36BmcLee8SR4DXDBOQ5JDpZB2S8k5jyXLW6F7FiC6NqAUO6h5Df1BvCnmBv4pARtTHXYj7+coMPflJ/Ihv+Ipe9losfQXXLBH3CZk1OcrjvMN1nre1cX38bIF4zFHzJoJzhRM7wKu2IKOmiCTn9EdZfy/m6MfPp/iAbvYxyl3m+JcAKX4kY2tsAEn66Cdn7eDhjGHfZ0mj8ctqaLA1kjhnlCtdMReHlUe2fcgUh238XwPAbr43xNNflSvVDJLgIrttTyrgo5sxVvLNr1pC1nbXCmN0O7mFqgkzSAyNSxaPIjcX0YgxSNgk7OhWoLj52UsLY9yzqH+FDib4XUlNDfYf4zU3unVPZ4cAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDQtMTlUMTE6MTA6MjUrMDA6MDAAc6jkAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA0LTE5VDExOjEwOjI1KzAwOjAwcS4QWAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=) View on GitHub](https://github.com/LambdaTest/LT-appium-python-behave)

### Step 2: Setup the Environment Variables[â](https://www.testmuai.com/support/docs/appium-python-behave#step-2-setup-the-environment-variables "Direct link to Step 2: Setup the Environment Variables")

You need to export your environment variables _LT_USERNAME_ and _LT_ACCESS_KEY_ that are available in your [TestMu AI Profile page](https://accounts.lambdatest.com/security). Run the below mentioned commands in your terminal to setup the environment variables.

  * Linux / MacOS
  * Windows

    
    
    export LT_USERNAME="undefined"  
    export LT_ACCESS_KEY="undefined"  
    
    
    
    set LT_USERNAME="undefined"  
    set LT_ACCESS_KEY="undefined"  
    

### Step 3: Upload your Application[â](https://www.testmuai.com/support/docs/appium-python-behave#step-3-upload-your-application "Direct link to Step 3: Upload your Application")

Upload your **_iOS_** application (.ipa file) or **_android_** application (.apk or .aab file) to the TestMu AI servers using our **REST API**. You need to provide your **Username** and **AccessKey** in the format `Username:AccessKey` in the **cURL** command for authentication.

Make sure to add the path of the **appFile** in the cURL request. Below is an example cURL request to upload your app using our REST API:

  * App File
  * App URL

    
    
    curl -u "undefined:undefined" -X POST "https://manual-api.lambdatest.com/app/upload/realDevice" -F "appFile=@"/Users/macuser/Downloads/proverbial_android.apk"" -F "name="proverbial_app""  
    
    
    
    curl -u "undefined:undefined" -X POST "https://manual-api.lambdatest.com/app/upload/realDevice" -F "url=:https://prod-mobile-artefacts.lambdatest.com/assets/docs/proverbial_android.apk" -F "name=Proverbial_App"  
    

tip

  * If you do not have any **.apk** or **.ipa** file, you can run your sample tests on TestMu AI by using our sample apps, ð [Android app](https://prod-mobile-artefacts.lambdatest.com/assets/docs/proverbial_android.apk) or ð [iOS app](https://prod-mobile-artefacts.lambdatest.com/assets/docs/proverbial_ios.ipa).

  * Response of above cURL will be a **JSON** object containing the `APP_URL` of the format - `lt://APP123456789123456789` and will be used in the next step

### Step 4: Update your Automation Script[â](https://www.testmuai.com/support/docs/appium-python-behave#step-4-update-your-automation-script "Direct link to Step 4: Update your Automation Script")

An automation script for the sample application given above has been provided here. You can write or add your own Appium automation scripts in `*StepDef.py` directory to run different tests on your app.

  * Android
  * iOS

AndroidStepDef.py
    
    
    import sys  
    import os  
    path = os.getcwd()  
    sys.path.append(os.path.abspath(os.path.join(path, os.pardir)))  
    from time import time  
    from behave import given  
    from appium import webdriver  
    import appConfig as appConf  
    from appium.webdriver.common.mobileby import MobileBy  
    from selenium.webdriver.support.ui import WebDriverWait  
    from selenium.webdriver.support import expected_conditions as EC  
      
    @given("Start the android app automation test")  
    def startAndroidAppAutomationTest(self):  
        if os.environ.get("LT_USERNAME") is None:  
            username = "username" #Enter username here  
        else:  
            username = os.environ.get("LT_USERNAME")  
        if os.environ.get("LT_ACCESS_KEY") is None:  
            accesskey = "accesskey" #Enter accessKey here  
        else:  
            accesskey = os.environ.get("LT_ACCESS_KEY")  
      
        driver = webdriver.Remote(  
            command_executor="https://"+username+":"+accesskey+"@mobile-hub.lambdatest.com/wd/hub",  
            desired_capabilities=appConf.app_android_desired_caps  
            )  
        try:  
            colorElement = WebDriverWait(driver,20).until(EC.element_to_be_clickable((MobileBy.ID,"com.lambdatest.proverbial:id/color")))  
            colorElement.click()  
      
            textElement = WebDriverWait(driver,20).until(EC.element_to_be_clickable((MobileBy.ID,"com.lambdatest.proverbial:id/Text")))  
            textElement.click()  
      
            toastElement = WebDriverWait(driver,20).until(EC.element_to_be_clickable((MobileBy.ID,"com.lambdatest.proverbial:id/toast")))  
            toastElement.click()  
      
            notification = WebDriverWait(driver,20).until(EC.element_to_be_clickable((MobileBy.ID,"com.lambdatest.proverbial:id/notification")))  
            notification.click()  
      
            geolocation = WebDriverWait(driver,20).until(EC.element_to_be_clickable((MobileBy.ID,"com.lambdatest.proverbial:id/geoLocation")))  
            geolocation.click()  
      
            home = WebDriverWait(driver,20).until(EC.element_to_be_clickable((MobileBy.ID,"com.lambdatest.proverbial:id/Home")))  
            home.click()  
      
            speedTest = WebDriverWait(driver,20).until(EC.element_to_be_clickable((MobileBy.ID,"com.lambdatest.proverbial:id/speedTest")))  
            speedTest.click()  
      
            home = WebDriverWait(driver,20).until(EC.element_to_be_clickable((MobileBy.ID,"com.lambdatest.proverbial:id/Home")))  
            home.click()  
      
            browser = WebDriverWait(driver,20).until(EC.element_to_be_clickable((MobileBy.ID,"com.lambdatest.proverbial:id/Browser")))  
            browser.click()  
      
            url = WebDriverWait(driver,20).until(EC.element_to_be_clickable((MobileBy.ID,"com.lambdatest.proverbial:id/url")))  
            url.send_keys("https://www.lambdatest.com")  
      
            find = WebDriverWait(driver,20).until(EC.element_to_be_clickable((MobileBy.ID,"com.lambdatest.proverbial:id/find")))  
            find.click()  
      
            driver.quit()  
        except:  
            driver.quit()  
    

iOSStepDef.py
    
    
    import sys  
    import os  
    path = os.getcwd()  
    sys.path.append(os.path.abspath(os.path.join(path, os.pardir)))  
    import appConfig as appConf  
    from behave import given  
    from appium import webdriver  
    import time  
    from appium.webdriver.common.mobileby import MobileBy  
    from selenium.webdriver.support.ui import WebDriverWait  
    from selenium.webdriver.support import expected_conditions as EC  
      
    @given("Start the ios app automation test")  
    def startIOSAppAutomationTest(self):  
        if os.environ.get("LT_USERNAME") is None:  
            username = "username" #Enter username here  
        else:  
            username = os.environ.get("LT_USERNAME")  
        if os.environ.get("LT_ACCESS_KEY") is None:  
            accesskey = "accesskey" #Enter accesskey herE  
        else:  
            accesskey = os.environ.get("LT_ACCESS_KEY")  
      
        driver = webdriver.Remote(  
            command_executor="https://"+username+":"+accesskey+"@mobile-hub.lambdatest.com/wd/hub",  
            desired_capabilities=appConf.app_ios_desired_caps  
        )  
        try:  
            colorElement = WebDriverWait(driver,20).until(EC.element_to_be_clickable((MobileBy.ACCESSIBILITY_ID,"color")))  
            colorElement.click()  
      
            textElement = WebDriverWait(driver,20).until(EC.element_to_be_clickable((MobileBy.ACCESSIBILITY_ID,"Text")))  
            textElement.click()  
      
            toastElement = WebDriverWait(driver,20).until(EC.element_to_be_clickable((MobileBy.ACCESSIBILITY_ID,"toast")))  
            toastElement.click()  
      
            notification = WebDriverWait(driver,20).until(EC.element_to_be_clickable((MobileBy.ACCESSIBILITY_ID,"notification")))  
            notification.click()  
            time.sleep(3)  
      
            geolocation = WebDriverWait(driver,20).until(EC.element_to_be_clickable((MobileBy.ACCESSIBILITY_ID,"geoLocation")))  
            geolocation.click()  
            time.sleep(3)  
      
            home = WebDriverWait(driver,20).until(EC.element_to_be_clickable((MobileBy.ACCESSIBILITY_ID,"Back")))  
            home.click()  
      
            speedTest = WebDriverWait(driver,20).until(EC.element_to_be_clickable((MobileBy.ACCESSIBILITY_ID,"speedTest")))  
            speedTest.click()  
            time.sleep(3)  
      
            home = WebDriverWait(driver,20).until(EC.element_to_be_clickable((MobileBy.ACCESSIBILITY_ID,"Back")))  
            home.click()  
      
            browser = WebDriverWait(driver,20).until(EC.element_to_be_clickable((MobileBy.ACCESSIBILITY_ID,"Browser")))  
            browser.click()  
      
            url = WebDriverWait(driver,20).until(EC.element_to_be_clickable((MobileBy.ACCESSIBILITY_ID,"url")))  
            url.send_keys("https://www.lambdatest.com")  
      
            find = WebDriverWait(driver,20).until(EC.element_to_be_clickable((MobileBy.ACCESSIBILITY_ID,"find")))  
            find.click()  
      
            driver.quit()  
        except:  
            driver.quit()  
      
    

### Step 5: Configure the Test Capabilities[â](https://www.testmuai.com/support/docs/appium-python-behave#step-5-configure-the-test-capabilities "Direct link to Step 5: Configure the Test Capabilities")

You need to update your capabilities in `appConfig.py` files. In this sample project, we are passing platform name, platform version, device name and app url (generated earlier) along with other capabilities like build name and test name via capabilities object. The capabilities object in the sample code for a single test are defined as:

The capabilities for running tests on both **Android** and **iOS** apps are:

  * iOS
  * Android

appConfig.py
    
    
    app_ios_desired_caps = {  
      "lt:options": {  
        "deviceName":"iPhone 12",  
        "platformName":"ios",  
        "platformVersion":"14",  
        "build":"Python Behave - iOS",  
        "name":"Sample Test iOS",  
        "app":"APP_URL" ,#Enter app (.ipa) url here  
        "isRealMobile":True,  
        "network":False,  
        "visual":True,  
        "video":True,  
        "w3c":True  
      }  
    }  
    

tip

  * You must set **isRealMobile** capability to `False` in the config file to run on **Virtual Devices**

appConfig.py
    
    
    app_android_desired_caps = {  
     	"lt:options": {  
    		"platformName": "android",  
    		"deviceName": "OnePlus 6",  
    		"platformVersion": "8",  
        "build": "Python Behave - Android",  
    		"name": "Sample Test Android",  
    		"app": "APP_URL", #Enter app (.apk) url here  
    		"visual": True,  
    		"video": True,  
        "w3c": True,  
    		"isRealMobile": True  
    	}  
    }  
    

tip

  * You must set **isRealMobile** capability to `False` in the config file to run on **Virtual Devices**

info

  * You must add the generated **APP_URL** to the `app` capability in the config file.
  * You must set **isRealMobile** capability to `False` in the config file to run on **Virtual Devices**
  * You can generate capabilities for your test requirements with the help of our inbuilt [**Capabilities Generator tool**](https://www.lambdatest.com/capabilities-generator/).For more details, please refer to our guide on [**Desired Capabilities in Appium**](https://www.testmuai.com/support/docs/desired-capabilities-in-appium/).

### Step 6: Execute and Monitor your Tests[â](https://www.testmuai.com/support/docs/appium-python-behave#step-6-execute-and-monitor-your-tests "Direct link to Step 6: Execute and Monitor your Tests")

  * Install the required packages from the cloned project directory:

    
    
    pip install -r requirements.txt  
    

  * Execute the following command to run your test on TestMu AI platform:

  * iOS
  * Android

    
    
    behave --tags @iosApp  
    
    
    
    behave --tags @androidApp  
    

> Your test results would be displayed on the test console (or CLI if you are using terminal/cmd) and on the [TestMu AI App Automation Dashboard](https://appautomation.lambdatest.com/build).

## Reference Guides[â](https://www.testmuai.com/support/docs/appium-python-behave#reference-guides "Direct link to Reference Guides")

  * [Advanced Configuration for Capabilities](https://www.testmuai.com/support/docs/desired-capabilities-in-appium/)
  * [How to test locally hosted apps](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/)
  * [How to integrate TestMu AI with CI/CD](https://www.testmuai.com/support/docs/integrations-with-ci-cd-tools/)

---

*Auto-generated from TestMu AI documentation.*