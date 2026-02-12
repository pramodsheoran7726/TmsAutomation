# Appium With Mocha

> **Source**: [https://www.testmuai.com/support/docs/appium-nodejs-mocha](https://www.testmuai.com/support/docs/appium-nodejs-mocha)

**Product**: App Automation

**Last Crawled**: 2026-01-27T20:47:51.169138

---

On this page

Real Device Virtual Device

In this documentation, you will learn how to configure and run your **Mocha** automation testing scripts with **Appium** on TestMu AI, set the desired capabilities for appium testing, and other advanced features of TestMu AI.

## Prerequisites[â](https://www.testmuai.com/support/docs/appium-nodejs-mocha#prerequisites "Direct link to Prerequisites")

  * Your TestMu AI [Username and Access key](https://accounts.lambdatest.com/security).
  * Install **npm** from the official [npm website](https://www.npmjs.com/).
  * Download and install **NodeJS** from official [NodeJS website](https://nodejs.org/en/). You should be having **NodeJS v6** or newer.
  * Make sure you are using the latest version of **JavaScript**.

## Try our Sample Repository[â](https://www.testmuai.com/support/docs/appium-nodejs-mocha#try-our-sample-repository "Direct link to Try our Sample Repository")

### Step 1: Get a Sample Project[â](https://www.testmuai.com/support/docs/appium-nodejs-mocha#step-1-get-a-sample-project "Direct link to Step 1: Get a Sample Project")

You can use your own project to configure and test it. For demo purposes, we are using the sample repository.

Sample repo

All the code samples in this documentation can be found on **TestMu AI 's Github Repository**. You can either download or clone the repository to quickly run your tests. [![Image](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAECkAABApAfV44g8AAAAHdElNRQfmBBMLCwK6SluIAAAEDUlEQVRYw62YS2xUVRjHf3NmGGbolFbtQ1Gkj0BQGZsyWBaSphtJ2VRCkwkRUzEGWBHALtSFMSZNWLhw0xgXmCgucNGFbalhUbXhkVAzKJSGaptgSiahnco0UDozdh7XRafTe8+5d3rnjt9Zzf985/zueX3nO+PCnlVQz0vU8xx+IMkj5okyz7Kdxq4NPerZRzshGnkWPx5cgEaGJHH+5hZXiTBv81NNTNDKeSZIoRUpKSY4TyvCCWIP/cwV7V5f5uhnT2mAKnqZtQ1YK7P0UmUXEWSIbMkIDY0sQwTtIDqZcgRYK1N0boQI87AshIbGQ8LFEN3EykZoaMQ4YoVo58H/gtDQeEC7GaKBiM5pmUmiJSx/mlnuktApERpkhJcLhkaXqGUX7/MTSxsCnjDIOzRRx4BBv4BXXvCEweGDvO7nIEOskGORaW4wwgADjHCDaRbJscIwb7E5733K0EfCuAHqGDdUL/GmrjbAMY4TYhsBvLhx4yXANkIc5xiVhlV9auhnnLr1ytPkDJULpYaIwjH+x9BPjtMAAqilR4rGbjY5gmzCbfjtooeaVUgHLZJzJU2OII0EJKWFDhC46VK+2+MQ0oRHGdvbuKGZGWVT3mSHI8gObip9zdAMYZKS/JQuRwiALpal3pKEBfvxSY7XGXUMGeWapPjYL0zi/xUSjiEJrihaUNAoSUnuOEYATJCUlEZBjSQts1AWJKakSTWCLZKUJV0WJE1WUrYIZWe75dhZonmlUw8eoXB9bC0LslXZrRlBSh4c28uCbFcWICV4JElCiWSl2etKLhkXRBW3A2VMWCUHFC0qmFTEVtocQ9poVbRJQUTZshWcVBbPnm3mhBLs00QgSFSJnClOOoKcUoKtRpQg+Bk2Tc/eLfExIHiPBZOehvGv8s0TnS+UuGZtzXxpmjzl1uakoXBt3eEEn3G74PInn/MGVUXeYy6qaaOPaYucbHo9xevLS7N0Ai/yNZmCW5xxvuVjkyP6Mp/wHb+xWCTx61t331kYS5wPgQA/SM6XqVYgz3B5g9xyhp36BmcLee8SR4DXDBOQ5JDpZB2S8k5jyXLW6F7FiC6NqAUO6h5Df1BvCnmBv4pARtTHXYj7+coMPflJ/Ihv+Ipe9losfQXXLBH3CZk1OcrjvMN1nre1cX38bIF4zFHzJoJzhRM7wKu2IKOmiCTn9EdZfy/m6MfPp/iAbvYxyl3m+JcAKX4kY2tsAEn66Cdn7eDhjGHfZ0mj8ctqaLA1kjhnlCtdMReHlUe2fcgUh238XwPAbr43xNNflSvVDJLgIrttTyrgo5sxVvLNr1pC1nbXCmN0O7mFqgkzSAyNSxaPIjcX0YgxSNgk7OhWoLj52UsLY9yzqH+FDib4XUlNDfYf4zU3unVPZ4cAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDQtMTlUMTE6MTA6MjUrMDA6MDAAc6jkAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA0LTE5VDExOjEwOjI1KzAwOjAwcS4QWAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=) View on GitHub](https://github.com/lambdatest/LT-appium-nodejs-mocha)

### Step 2: Setup the Environment Variables[â](https://www.testmuai.com/support/docs/appium-nodejs-mocha#step-2-setup-the-environment-variables "Direct link to Step 2: Setup the Environment Variables")

You need to export your environment variables _LT_USERNAME_ and _LT_ACCESS_KEY_ that are available in your [TestMu AI Profile page](https://accounts.lambdatest.com/security). Run the below mentioned commands in your terminal to setup the environment variables.

  * Linux / MacOS
  * Windows

    
    
    export LT_USERNAME="undefined"  
    export LT_ACCESS_KEY="undefined"  
    
    
    
    set LT_USERNAME="undefined"  
    set LT_ACCESS_KEY="undefined"  
    

### Step 3: Upload your Application[â](https://www.testmuai.com/support/docs/appium-nodejs-mocha#step-3-upload-your-application "Direct link to Step 3: Upload your Application")

Upload your **_iOS_** application (.ipa file) or **_android_** application (.apk or .aab file) to the TestMu AI servers using our **REST API**. You need to provide your **Username** and **AccessKey** in the format `Username:AccessKey` in the **cURL** command for authentication.

Make sure to add the path of the **appFile** in the cURL request. Below is an example cURL request to upload your app using our REST API:

  * App File
  * App URL

    
    
    curl -u "undefined:undefined" -X POST "https://manual-api.lambdatest.com/app/upload/realDevice" -F "appFile=@"/Users/macuser/Downloads/proverbial_android.apk"" -F "name="proverbial_app""  
    
    
    
    curl -u "undefined:undefined" -X POST "https://manual-api.lambdatest.com/app/upload/realDevice" -F "url=:https://prod-mobile-artefacts.lambdatest.com/assets/docs/proverbial_android.apk" -F "name=Proverbial_App"  
    

tip

  * If you do not have any **.apk** or **.ipa** file, you can run your sample tests on TestMu AI by using our sample apps, ð [Android app](https://prod-mobile-artefacts.lambdatest.com/assets/docs/proverbial_android.apk) or ð [iOS app](https://prod-mobile-artefacts.lambdatest.com/assets/docs/proverbial_ios.ipa).

  * Response of above cURL will be a **JSON** object containing the `APP_URL` of the format - `lt://APP123456789123456789` and will be used in the next step.

### Step 4: Update your Automation Script[â](https://www.testmuai.com/support/docs/appium-nodejs-mocha#step-4-update-your-automation-script "Direct link to Step 4: Update your Automation Script")

An automation script for the sample application available above has been provided here.

  * iOS
  * Android

ios_test.js
    
    
    const driver= require("appium-base-driver")  
      
    //const { default: driver } = require("appium-android-driver/build/lib/driver");  
    const { By } = require("selenium-webdriver");  
    const { element } = require("wd/lib/element-commands");  
      
    require("appium-base-driver")  
    var assert= require("assert"),  
      webdriver = require("selenium-webdriver"),  
       conf_file= process.argv[3] || "conf/ios.conf.js";  
       
      
    var caps = require("../" + conf_file).capabilities;  
      
    var buildDriver = function(caps) {  
      return new webdriver.Builder()  
        .usingServer(  
          "http://" +  
          LT_USERNAME +  
          ":" +  
          LT_ACCESS_KEY +  
          "@mobile-hub.lambdatest.com/wd/hub"  
        )  
        .withCapabilities(caps)  
        .build();  
    };  
      
    describe("Mocha Appium iOS Test " + caps.browserName, function() {  
      var driver;  
      this.timeout(0);  
        it ('Application is launched', function name(done) {   
            driver=buildDriver(caps);  
            driver.findElement(By.xpath('//XCUIElementTypeButton[@name="color"]')).click().then(function(){  
              console.log("Successfully clicked Color");  
              
            });  
            driver.findElement(By.xpath('//XCUIElementTypeStaticText[@name="Notification"]')).click().then(function(){  
              console.log("Successfully clicked Notification");  
            });  
            driver.findElement(By.xpath('//XCUIElementTypeStaticText[@name="Toast"]')).click().then(function(){  
                console.log("Successfully clicked Toast");  
        });  
             driver.findElement(By.xpath('//XCUIElementTypeButton[@name="Text"]')).click().then(function(){  
                 console.log("Successfully clicked Text");  
                 driver.quit()  
        });    
    });  
    });  
      
    

android_test.js
    
    
    const { default: driver } = require("appium-android-driver/build/lib/driver");  
    const { By } = require("selenium-webdriver");  
    const { capabilities } = require("../conf/android.conf");  
      
    require("appium-android-driver")  
    var assert= require("assert"),  
      webdriver = require("selenium-webdriver"),  
       conf_file= process.argv[3] || "conf/Appp.conf.js";  
       
      
    var caps = require("../" + conf_file).capabilities;  
      
    var buildDriver = function(caps) {  
      return new webdriver.Builder()  
        .usingServer(  
          "http://" +  
          LT_USERNAME +  
          ":" +  
          LT_ACCESS_KEY +  
          "@mobile-hub.lambdatest.com/wd/hub"  
        )  
        .withCapabilities(caps)  
        .build();  
    };  
      
      
    describe("Mocha Appium Test " + caps.browserName, function() {  
      var driver;  
      this.timeout(0);  
      
      
        it ('Application is launched', function name(done) {   
            driver=buildDriver(caps);  
            
            driver.findElement(By.id('com.lambdatest.proverbial:id/color')).click().then(function(){  
            console.log("Successfully clicked Color");  
        });  
         driver.findElement(By.id('com.lambdatest.proverbial:id/Text')).click().then(function(){  
            console.log("Successfully clicked Text");  
        });  
        driver.findElement(By.id('com.lambdatest.proverbial:id/notification')).click().then(function(){  
            console.log("Successfully clicked Notification");  
        })  
        driver.findElement(By.id('com.lambdatest.proverbial:id/toast')).click().then(function(){  
            console.log("Successfully clicked Toast");  
            driver.quit()  
        })  
    });  
      
      
    });  
    

tip

  * You must set **isRealMobile** capability to `False` in the config file to run on **Virtual Devices**

### Step 5: Configure the Test Capabilities[â](https://www.testmuai.com/support/docs/appium-nodejs-mocha#step-5-configure-the-test-capabilities "Direct link to Step 5: Configure the Test Capabilities")

You can update your custom capabilities in test scripts. In this sample project, we are passing platform name, platform version, device name and app url _(generated earlier)_ along with other capabilities like build name and test name via capabilities object.

Ensure to update the `APP_URL`, `username` and `accessKey` in the code scripts before running the tests. The capabilities object in the sample code are defined as:

  * Android
  * iOS

android.conf.js
    
    
    LT_USERNAME = process.env.LT_USERNAME || "<your username>";      //Enter your LambdaTest username here  
    LT_ACCESS_KEY = process.env.LT_ACCESS_KEY || "<your accessKey>";  //Enter your LambdaTest accessKey here  
      
    exports.capabilities = {  
      'build': 'Mocha-Appium-Sample', //Build name  
      'name': 'Mocha-Android', // Test name  
      'platformName':'android', // OS name  
      'deviceName': 'Galaxy S10', // Device name  
      'platformVersion': '11', // OS version  
      'app' : 'lt://proverbial-android',     // Add app (.apk) url here  
      'isRealMobile' : true,  
      'visual': false,  // To take step by step screenshot  
      'network':false,  // To capture network Logs  
      'console':false, // To capture console logs.  
      'tunnel': false // If you want to run the localhost than change it to true  
      };  
    

tip

  * You must set **isRealMobile** capability to `False` in the config file to run on **Virtual Devices**

ios.conf.js
    
    
    LT_USERNAME = process.env.LT_USERNAME || "<your username>";        //Enter your LambdaTest username here  
    LT_ACCESS_KEY = process.env.LT_ACCESS_KEY || "<your accessKey>";    //Enter your LambdaTest accessKey here  
      
    exports.capabilities = {  
      'build': 'Mocha-iOS-Sample', //Build name  
      'name': 'Mocha-iOS', // Test name  
      'platformName':'ios', // OS name  
      'deviceName': 'iPhone 12 Pro', // Device name  
      'platformVersion': '15', // OS version  
      'app' : 'lt://proverbial-ios',     // Add app (.ipa) url here  
      'isRealMobile' : true,  
      'visual': false,  // To take step by step screenshot  
      'network':false,  // To capture network Logs  
      'console':false, // To capture console logs.  
      'tunnel': false // If you want to run the localhost than change it to true  
      };  
    

note

  * You must add the generated **APP_URL** to the `app` capability in the config file.
  * You must set **isRealMobile** capability to `False` in the config file to run on **Virtual Devices**
  * You can generate capabilities for your test requirements with the help of our inbuilt [**Capabilities Generator tool**](https://www.lambdatest.com/capabilities-generator/).For more details, please refer to our guide on [**Desired Capabilities in Appium**](https://www.testmuai.com/support/docs/desired-capabilities-in-appium/).

### Step 6: Execute and Monitor your Tests[â](https://www.testmuai.com/support/docs/appium-nodejs-mocha#step-6-execute-and-monitor-your-tests "Direct link to Step 6: Execute and Monitor your Tests")

  * Execute the following commands to install the required dependencies:

    
    
    npm i  
    npm install  
    npm install selenium-webdriver  
    npm i appium-android-driver  
    npm i appium-base-driver  
    npm install --save  
    

  * The tests can be executed in the terminal using the following command:

  * Android
  * iOS

    
    
    npm run android    //to run single test  
    npm run parallel_android    //to run parallel tests  
    
    
    
    npm run ios    //to run single test  
    npm run parallel_ios    //to run parallel tests  
    

> Your test results would be displayed on the test console (or CLI if you are using terminal/cmd) and on the [TestMu AI App Automation Dashboard](https://appautomation.lambdatest.com/build).

## Reference Guides[â](https://www.testmuai.com/support/docs/appium-nodejs-mocha#reference-guides "Direct link to Reference Guides")

  * [Advanced Configuration for Capabilities](https://www.testmuai.com/support/docs/desired-capabilities-in-appium/)
  * [How to test locally hosted apps](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/)
  * [How to integrate TestMu AI with CI/CD](https://www.testmuai.com/support/docs/integrations-with-ci-cd-tools/)

---

*Auto-generated from TestMu AI documentation.*