# Appium with Nodejs

> **Source**: [https://www.testmuai.com/support/docs/appium-nodejs](https://www.testmuai.com/support/docs/appium-nodejs)

**Product**: App Automation

**Last Crawled**: 2026-01-27T20:48:31.107629

---

On this page

Real Device Virtual Device

In this documentation, you will learn how to configure and run your **NodeJS** automation testing scripts with **Appium** on TestMu AI, set the desired capabilities for appium testing, and other advanced features of TestMu AI.

## Prerequisites[â](https://www.testmuai.com/support/docs/appium-nodejs#prerequisites "Direct link to Prerequisites")

  * Your TestMu AI [Username and Access key](https://accounts.lambdatest.com/security).
  * Install **npm** from the official [npm website](https://www.npmjs.com/).
  * Download and install **NodeJS** from official [NodeJS website](https://nodejs.org/en/). You should be having **NodeJS v6** or newer.
  * Make sure you are using the latest version of **JavaScript**.

## Try our Sample Repository[â](https://www.testmuai.com/support/docs/appium-nodejs#try-our-sample-repository "Direct link to Try our Sample Repository")

### Step 1: Get a Sample Project[â](https://www.testmuai.com/support/docs/appium-nodejs#step-1-get-a-sample-project "Direct link to Step 1: Get a Sample Project")

You can use your own project to configure and test it. For demo purposes, we are using the sample repository.

Sample repo

All the code samples in this documentation can be found on **TestMu AI 's Github Repository**. You can either download or clone the repository to quickly run your tests. [![Image](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAECkAABApAfV44g8AAAAHdElNRQfmBBMLCwK6SluIAAAEDUlEQVRYw62YS2xUVRjHf3NmGGbolFbtQ1Gkj0BQGZsyWBaSphtJ2VRCkwkRUzEGWBHALtSFMSZNWLhw0xgXmCgucNGFbalhUbXhkVAzKJSGaptgSiahnco0UDozdh7XRafTe8+5d3rnjt9Zzf985/zueX3nO+PCnlVQz0vU8xx+IMkj5okyz7Kdxq4NPerZRzshGnkWPx5cgEaGJHH+5hZXiTBv81NNTNDKeSZIoRUpKSY4TyvCCWIP/cwV7V5f5uhnT2mAKnqZtQ1YK7P0UmUXEWSIbMkIDY0sQwTtIDqZcgRYK1N0boQI87AshIbGQ8LFEN3EykZoaMQ4YoVo58H/gtDQeEC7GaKBiM5pmUmiJSx/mlnuktApERpkhJcLhkaXqGUX7/MTSxsCnjDIOzRRx4BBv4BXXvCEweGDvO7nIEOskGORaW4wwgADjHCDaRbJscIwb7E5733K0EfCuAHqGDdUL/GmrjbAMY4TYhsBvLhx4yXANkIc5xiVhlV9auhnnLr1ytPkDJULpYaIwjH+x9BPjtMAAqilR4rGbjY5gmzCbfjtooeaVUgHLZJzJU2OII0EJKWFDhC46VK+2+MQ0oRHGdvbuKGZGWVT3mSHI8gObip9zdAMYZKS/JQuRwiALpal3pKEBfvxSY7XGXUMGeWapPjYL0zi/xUSjiEJrihaUNAoSUnuOEYATJCUlEZBjSQts1AWJKakSTWCLZKUJV0WJE1WUrYIZWe75dhZonmlUw8eoXB9bC0LslXZrRlBSh4c28uCbFcWICV4JElCiWSl2etKLhkXRBW3A2VMWCUHFC0qmFTEVtocQ9poVbRJQUTZshWcVBbPnm3mhBLs00QgSFSJnClOOoKcUoKtRpQg+Bk2Tc/eLfExIHiPBZOehvGv8s0TnS+UuGZtzXxpmjzl1uakoXBt3eEEn3G74PInn/MGVUXeYy6qaaOPaYucbHo9xevLS7N0Ai/yNZmCW5xxvuVjkyP6Mp/wHb+xWCTx61t331kYS5wPgQA/SM6XqVYgz3B5g9xyhp36BmcLee8SR4DXDBOQ5JDpZB2S8k5jyXLW6F7FiC6NqAUO6h5Df1BvCnmBv4pARtTHXYj7+coMPflJ/Ihv+Ipe9losfQXXLBH3CZk1OcrjvMN1nre1cX38bIF4zFHzJoJzhRM7wKu2IKOmiCTn9EdZfy/m6MfPp/iAbvYxyl3m+JcAKX4kY2tsAEn66Cdn7eDhjGHfZ0mj8ctqaLA1kjhnlCtdMReHlUe2fcgUh238XwPAbr43xNNflSvVDJLgIrttTyrgo5sxVvLNr1pC1nbXCmN0O7mFqgkzSAyNSxaPIjcX0YgxSNgk7OhWoLj52UsLY9yzqH+FDib4XUlNDfYf4zU3unVPZ4cAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDQtMTlUMTE6MTA6MjUrMDA6MDAAc6jkAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA0LTE5VDExOjEwOjI1KzAwOjAwcS4QWAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=) View on GitHub](https://github.com/LambdaTest/LT-appium-nodejs)

### Step 2: Setup the Environment Variables[â](https://www.testmuai.com/support/docs/appium-nodejs#step-2-setup-the-environment-variables "Direct link to Step 2: Setup the Environment Variables")

You need to export your environment variables _LT_USERNAME_ and _LT_ACCESS_KEY_ that are available in your [TestMu AI Profile page](https://accounts.lambdatest.com/security). Run the below mentioned commands in your terminal to setup the environment variables.

  * Linux / MacOS
  * Windows

    
    
    export LT_USERNAME="undefined"  
    export LT_ACCESS_KEY="undefined"  
    
    
    
    set LT_USERNAME="undefined"  
    set LT_ACCESS_KEY="undefined"  
    

### Step 3: Upload your Application[â](https://www.testmuai.com/support/docs/appium-nodejs#step-3-upload-your-application "Direct link to Step 3: Upload your Application")

Upload your **_iOS_** application (.ipa file) or **_android_** application (.apk or .aab file) to the TestMu AI servers using our **REST API**. You need to provide your **Username** and **AccessKey** in the format `Username:AccessKey` in the **cURL** command for authentication.

Make sure to add the path of the **appFile** in the cURL request. Below is an example cURL request to upload your app using our REST API:

  * App File
  * App URL

    
    
    curl -u "undefined:undefined" -X POST "https://manual-api.lambdatest.com/app/upload/realDevice" -F "appFile=@"/Users/macuser/Downloads/proverbial_android.apk"" -F "name="proverbial_app""  
    
    
    
    curl -u "undefined:undefined" -X POST "https://manual-api.lambdatest.com/app/upload/realDevice" -F "url=:https://prod-mobile-artefacts.lambdatest.com/assets/docs/proverbial_android.apk" -F "name=Proverbial_App"  
    

tip

  * You must set **isRealMobile** capability to `False` in the config file to run on **Virtual Devices**
  * You can generate capabilities for your test requirements with the help of our inbuilt [**Capabilities Generator tool**](https://www.lambdatest.com/capabilities-generator/).For more details, please refer to our guide on [**Desired Capabilities in Appium**](https://www.testmuai.com/support/docs/desired-capabilities-in-appium/).

  * If you do not have any **.apk** or **.ipa** file, you can run your sample tests on TestMu AI by using our sample apps, ð [Android app](https://prod-mobile-artefacts.lambdatest.com/assets/docs/proverbial_android.apk) or ð [iOS app](https://prod-mobile-artefacts.lambdatest.com/assets/docs/proverbial_ios.ipa).

  * Response of above cURL will be a **JSON** object containing the `APP_URL` of the format - `lt://APP123456789123456789` and will be used in the next step. :::

### Step 4: Update your Automation Script[â](https://www.testmuai.com/support/docs/appium-nodejs#step-4-update-your-automation-script "Direct link to Step 4: Update your Automation Script")

An automation script for the sample application available above has been provided here. Ensure to update the `APP_URL`, `username` and `accesKey` in the code scripts before running the tests.

  * iOS
  * Android

iOS.js
    
    
    var wd = require("wd");  
    var assert = require("assert");  
    var asserter = wd.asserters;  
    username =  
      process.env.LT_USERNAME == undefined  
        ? "username" //Enter the username here  
        : process.env.LT_USERNAME;  
    accesskey =  
      process.env.LT_ACCESS_KEY == undefined  
        ? "access_key" //Enter the access_key here  
        : process.env.LT_ACCESS_KEY;  
      
    desired_capabilities = {  
      deviceName: "iPhone 12",  
      platformVersion: "14",  
      platformName: "iOS",  
      isRealMobile: true,  
      app: "APP_URL", //Enter the app (.ipa) url  
      visual: true,  
      video: true,  
      build: "NodeJS Vanilla - iOS",  
      name: "Sample Test - NodeJS",  
    };  
      
    driver = wd.promiseRemote(  
      `https://${username}:${accesskey}@mobile-hub.lambdatest.com/wd/hub`  
    );  
      
    async function iOStest() {  
      try {  
        driver  
          .init(desired_capabilities)  
          .then(function () {  
            return driver.waitForElementById("color", 10000);  
          })  
          .then(function (color) {  
            return color.click();  
          })  
          .then(function () {  
            return driver.waitForElementById("Text", 10000);  
          })  
          .then(function (text) {  
            text.click();  
            return driver.waitForElementById("toast", 10000);  
          })  
          .then(function (toast) {  
            toast.click();  
            return driver.waitForElementById("notification", 10000);  
          })  
          .then(function (notification) {  
            notification.click();  
            return driver.waitForElementById("geoLocation", 10000);  
          })  
          .then(function (geoLocation) {  
            return geoLocation.click();  
          })  
          .then(async function () {  
            return driver.waitForElementById("Back", 10000);  
          })  
          .then(function (Back) {  
            Back.click();  
            return driver.waitForElementById("speedTest", 10000);  
          })  
          .then(async function (speedTest) {  
            speedTest.click();  
            return driver.waitForElementById("Back", 10000);  
          })  
          .then(function (back) {  
            back.click();  
            return driver.waitForElementById("Browser", 10000);  
          })  
          .then(function (Browser) {  
            Browser.click();  
            return driver.waitForElementById("url", 10000);  
          })  
          .then(function (url) {  
            url.type("https://www.lambdatest.com");  
            return driver.waitForElementById("find", 10000);  
          })  
          .then(function (find) {  
            find.click();  
            driver.quit();  
          });  
      } catch (e) {  
        driver.quit();  
      }  
    }  
      
    iOStest();  
    

Android.js
    
    
    const wd = require("wd");  
    const username = process.env.LT_USERNAME || "username"; //Add username here  
      
    const accessKey = process.env.LT_ACCESS_KEY || "accessKey"; //Add accessKey here  
      
    const desiredCapabilities = {  
      app: "APP_URL", // Enter the app (.apk) url  
      build: "NodeJS - Android",  
      name: "Sample Test NodeJS",  
      deviceName: "Galaxy S20",  
      isRealMobile: true,  
      platformName: "android",  
      platformVersion: "11",  
      video: true,  
      visual: true,  
    };  
      
    const driver = wd.promiseRemote(  
      `https://${username}:${accessKey}@mobile-hub.lambdatest.com/wd/hub`  
    );  
      
    const DEFAULT_TIMEOUT = 10000;  
      
    async function runAndroidTest() {  
      try {  
        driver  
          .init(desiredCapabilities)  
          .then(function () {  
            return driver.waitForElementById("color", DEFAULT_TIMEOUT);  
          })  
          .then(function (colorButton) {  
            return colorButton.click();  
          })  
          .then(function () {  
            return driver.waitForElementById("Text", DEFAULT_TIMEOUT);  
          })  
          .then(function (text) {  
            text.click();  
            return driver.waitForElementById("toast", DEFAULT_TIMEOUT);  
          })  
          .then(function (toast) {  
            toast.click();  
            return driver.waitForElementById("notification", DEFAULT_TIMEOUT);  
          })  
          .then(function (notification) {  
            notification.click();  
            return driver.waitForElementById("geoLocation", DEFAULT_TIMEOUT);  
          })  
          .then(function (geoLocation) {  
            geoLocation.click();  
            return driver.waitForElementById("buttonPage", DEFAULT_TIMEOUT);  
          })  
          .then(function (Home) {  
            Home.click();  
            return driver.waitForElementById("speedTest", DEFAULT_TIMEOUT);  
          })  
          .then(function (speedTest) {  
            speedTest.click();  
            return driver.waitForElementById("webview", DEFAULT_TIMEOUT);  
          })  
          .then(function (Browser) {  
            Browser.click();  
            return driver.waitForElementById("url", DEFAULT_TIMEOUT);  
          })  
          .then(function (url) {  
            url.type("https://www.lambdatest.com");  
            return driver.waitForElementById("find", DEFAULT_TIMEOUT);  
          })  
          .then(function (find) {  
            find.click();  
            driver.quit();  
          });  
      } catch (e) {  
        driver.quit();  
      }  
    }  
      
    runAndroidTest();  
    

tip

  * You must set **isRealMobile** capability to `False` in the config file to run on **Virtual Devices**

### Step 5: Configure the Test Capabilities[â](https://www.testmuai.com/support/docs/appium-nodejs#step-5-configure-the-test-capabilities "Direct link to Step 5: Configure the Test Capabilities")

You can update your custom capabilities in test scripts. In this sample project, we are passing platform name, platform version, device name and app url _(generated earlier)_ along with other capabilities like build name and test name via capabilities object.

The capabilities object in the sample code are defined as:

  * iOS.js
  * Android.js

    
    
    desired_capabilities = {  
      deviceName: "iPhone 12",  
      platformVersion: "14",  
      platformName: "iOS",  
      isRealMobile: true,  
      app: "APP_URL", //Enter the app (.ipa) url  
      visual: true,  
      video: true,  
      build: "NodeJS Vanilla - iOS",  
      name: "Sample Test - NodeJS",  
    };  
    
    
    
    desired_capabilities = {  
      deviceName: "Galaxy S20",  
      platformVersion: "11",  
      platformName: "android",  
      isRealMobile: true,  
      app: "APP_URL", //Enter the app (.apk) url  
      visual: true,  
      video: true,  
      build: "NodeJS Vanilla - Android",  
      name: "Sample Test - NodeJS",  
    };  
    

tip

  * You must set **isRealMobile** capability to `False` in the config file to run on **Virtual Devices**

info

  * You must add the generated **APP_URL** to the `app` capability in the config file.
  * You can generate capabilities for your test requirements with the help of our inbuilt [**Capabilities Generator tool**](https://www.lambdatest.com/capabilities-generator/).For more details, please refer to our guide on [**Desired Capabilities in Appium**](https://www.testmuai.com/support/docs/desired-capabilities-in-appium/).

### Step 6: Execute and Monitor your Tests[â](https://www.testmuai.com/support/docs/appium-nodejs#step-6-execute-and-monitor-your-tests "Direct link to Step 6: Execute and Monitor your Tests")

  * Run the following commands to install the required dependencies:
        
        npm i wd  
        

  * The tests can be executed in the terminal using the following command:

    * iOS
    * Android
    
    node IOS.js  
    
    
    node Android.js  
    

> Your test results would be displayed on the test console (or CLI if you are using terminal/cmd) and on the [TestMu AI App Automation Dashboard](https://appautomation.lambdatest.com/build).

## Reference Guides[â](https://www.testmuai.com/support/docs/appium-nodejs#reference-guides "Direct link to Reference Guides")

  * [Advanced Configuration for Capabilities](https://www.testmuai.com/support/docs/desired-capabilities-in-appium/)
  * [How to test locally hosted apps](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/)
  * [How to integrate TestMu AI with CI/CD](https://www.testmuai.com/support/docs/integrations-with-ci-cd-tools/)

---

*Auto-generated from TestMu AI documentation.*