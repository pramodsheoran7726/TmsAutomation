# XCUI Testing on TestMu AI

> **Source**: [https://www.testmuai.com/support/docs/getting-started-with-xcuitest](https://www.testmuai.com/support/docs/getting-started-with-xcuitest)

**Product**: App Automation

**Last Crawled**: 2026-01-27T20:47:31.300699

---

On this page

Real Device Virtual Device

Developed by Apple, XCUITest is a framework for user-interface (UI) testing for iOS applications. It is built on top of XCTest, an integrated test framework in Apple's Xcode IDE. TestMu AI lets you perform automated app testing of your iOS apps using XCUITest across 10000+ real devices and OS combinations.

## Prerequisites[â](https://www.testmuai.com/support/docs/getting-started-with-xcuitest#prerequisites "Direct link to Prerequisites")

  * Your TestMu AI [Username and Access key](https://accounts.lambdatest.com/security).
  * Access to an **iOS** app (.ipa) and an **XCUI Test** app (.ipa file).

tip

If you do not have any **iOS** app (.ipa) and an **XCUI Test** app (.ipa) file, you can run your sample tests on TestMu AI by using our sample ð [iOS app](https://prod-mobile-artefacts.lambdatest.com/assets/docs/proverbial_ios.ipa) and a sample ð [XCUI Test](https://prod-mobile-artefacts.lambdatest.com/assets/docs/proverbial_ios_xcuitest.ipa).

## Running Your First Test: A Step-by-Step Guide[â](https://www.testmuai.com/support/docs/getting-started-with-xcuitest#running-your-first-test-a-step-by-step-guide "Direct link to Running Your First Test: A Step-by-Step Guide")

### Step 1: Upload Your Application[â](https://www.testmuai.com/support/docs/getting-started-with-xcuitest#step-1-upload-your-application "Direct link to Step 1: Upload Your Application")

To begin testing, upload your iOS application (.ipa file) to TestMu AI's servers. You'll use our **REST API** for this process.

  * **Authentication :** You'll need your TestMu AI Username and AccessKey. Combine them in the format `Username:AccessKey`.
  * **Uploading the App :** Use **cURL command** to send a request to our API. The request should include the path to your application file (**appFile**).

  * Linux / MacOS
  * Windows

    
    
    curl -u "undefined:undefined" --location --request POST 'https://manual-api.lambdatest.com/app/uploadFramework' --form 'appFile=@"<PATH_OF_YOUR_iOS_APP>"' --form 'type="xcuit-ios"'  
    
    
    
    curl -u "undefined:undefined" -X POST "https://manual-api.lambdatest.com/app/uploadFramework" -F "appFile=@"<PATH_OF_YOUR_iOS_APP>"" -F "type="xcuit-ios""  
    

info

  * Provide the path of your android application in the above URL in place of `<PATH_OF_YOUR_iOS_APP>`
  * Response of above cURL will be a **JSON** object containing the `App URL` of the format - `lt://APP123456789123456789` and will be used in the last step.

### Step 2: Upload Your Test Suite[â](https://www.testmuai.com/support/docs/getting-started-with-xcuitest#step-2-upload-your-test-suite "Direct link to Step 2: Upload Your Test Suite")

Upload your iOS test suite (.ipa) file to TestMu AI servers using our REST API.

The following sample cURL command shows how to upload a test suite:

  * Linux / MacOS
  * Windows

    
    
    curl -u "undefined:undefined" --location --request POST 'https://manual-api.lambdatest.com/app/uploadFramework' --form 'appFile=@"<PATH_OF_YOUR_TEST_SUITE_APP>"' --form 'type="xcuit-ios"'  
    
    
    
    curl -u "undefined:undefined" --location --request POST "https://manual-api.lambdatest.com/app/uploadFramework" --form "appFile=@"<PATH_OF_YOUR_TEST_SUITE_APP>"" --form "type="xcuit-ios""  
    

info

  * Provide the path of your android application in the above URL in place of `<PATH_OF_YOUR_TEST_SUITE_APP>`
  * Response of above cURL will be a **JSON** object containing the `App URL` of the format - `lt://APP123456789123456789` and will be used in the last step.

### Step 3: Executing The Test[â](https://www.testmuai.com/support/docs/getting-started-with-xcuitest#step-3-executing-the-test "Direct link to Step 3: Executing The Test")

  * You will need **base64 encoded authentication** in order to execute your Espresso automation test suite. Enter your `username:accesskey`Â in **[Basic Authentication Header Generator](https://mixedanalytics.com/knowledge-base/api-connector-encode-credentials-to-base-64/)** to generate your auth token.

Take note of theÂ base64Â encoded authentication which needs to be added in the next step.
    
    
    undefined:undefined  
    

  * Once you have uploaded your app and test suite, you can execute your test by running the following command:

> Enter your **BASIC_AUTH_TOKEN** , **APP_ID** (generated in the first step) and **TEST_SUITE_ID** (generated in the second step) in the below command.

  * Linux / MacOS
  * Windows

    
    
    curl --location --request POST 'https://mobile-api.lambdatest.com/framework/v1/xcui/build' \  
    --header 'Authorization: Basic BASIC_AUTH_TOKEN' \  
    --header 'Content-Type: application/json' \  
    --data-raw '{  
      "app" : "APP_ID",  
      "testSuite": "TEST_SUITE_ID",  
      "device" :  ["iPhone 11-14"],  
      "video" : true,  
      "queueTimeout": 10800,  
      "idleTimeout": 150,  
      "devicelog": true,  
      "network": false,  
      "build" : "Proverbial-XCUITest"  
    }'  
    

`
    
    
    curl --location --request POST "https://mobile-api.lambdatest.com/framework/v1/xcui/build" \  
    --header "Authorization: Basic BASIC_AUTH_TOKEN" \  
    --header "Content-Type: application/json" \  
    --data-raw "{  
      "app" : "APP_ID",  
      "testSuite": "TEST_SUITE_ID",  
      "device" :  ["iPhone 11-14"],  
      "video" : true,  
      "queueTimeout": 10800,  
      "idleTimeout": 150,  
      "devicelog": true,  
      "network": false,  
      "build" : "Proverbial-XCUITest"  
    }"  
    

`

### Step 4: View Test Execution[â](https://www.testmuai.com/support/docs/getting-started-with-xcuitest#step-4-view-test-execution "Direct link to Step 4: View Test Execution")

Once you have run your tests, you can view the test execution along with logs. You will be able to see the test cases passing or failing. You can view the same at [TestMu AI Automation](https://accounts.lambdatest.com/login).

![Image](https://www.testmuai.com/support/assets/images/xcui-test-21656845e973fbdbd5d2532714db12e3.jpeg)

## Running Tests in Parallel[â](https://www.testmuai.com/support/docs/getting-started-with-xcuitest#running-tests-in-parallel "Direct link to Running Tests in Parallel")

You can run tests in parallel on multiple devices by passing the device name in comma separated format in the execute command as show below:
    
    
    curl --location --request POST 'https://mobile-api.lambdatest.com/framework/v1/xcui/build' \  
    --header 'Authorization: Basic BASIC_AUTH_TOKEN' \  
    --header 'Content-Type: application/json' \  
    --data-raw '{  
      "app" : "APP_ID",  
      "testSuite": "TEST_SUITE_ID",  
      "device" :  ["iPhone 11-14","iPhone 12 Pro-15","iPhone X-13"],  
      "queueTimeout": 10800,  
      "IdleTimeout": 150,  
      "deviceLog": true,  
      "build" : "Proverbial-XCUITest"  
    }'  
    

info

  * For Virtual Devices, both the App file and Test-suite should be in the `Zip format`.
  * We need to pass the following capability `isvirtualdevice:true` as well when we are running test for Virtual Devices.

---

*Auto-generated from TestMu AI documentation.*