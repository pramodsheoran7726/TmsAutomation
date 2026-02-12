# Test Case Insights

> **Source**: [https://www.testmuai.com/support/docs/analytics-test-case-insights](https://www.testmuai.com/support/docs/analytics-test-case-insights)

**Product**: Insights

**Last Crawled**: 2026-01-27T20:47:25.292819

---

On this page

Analyzing the test case level insights of your test automation execution on TestMu AI is now easier than ever with the `Test Case Insights` module. The user can easily find information about the count, and type of the test cases through the highly customizable widgets.

## Prerequisites For Insights:[â](https://www.testmuai.com/support/docs/analytics-test-case-insights#prerequisites-for-insights "Direct link to Prerequisites For Insights:")

  1. You should have an active TestMu AI account.
  2. You should han active subscription plan with HyperExecute or App Automation.
  3. You should have executed at least one test on the TestMu AI HyperExecute / App Automation platform.

## How To Access Test Case Insights?[â](https://www.testmuai.com/support/docs/analytics-test-case-insights#how-to-access-test-case-insights "Direct link to How To Access Test Case Insights?")

  1. Go to the `Insights` tab on the left navigation bar and click on the `Create New`.
  2. Select the `Custom Dashboard` option from the menu.
  3. Now, search for `Test Case` widgets in the `Web Automation, App Automation & HyperExecute` products.
  4. Add the widgets to the dashboard by clicking on the `Add Widget` button.

## Capture Test Case Insights for Web Automation[â](https://www.testmuai.com/support/docs/analytics-test-case-insights#capture-test-case-insights-for-web-automation "Direct link to Capture Test Case Insights for Web Automation")

### Capture by WebHook[â](https://www.testmuai.com/support/docs/analytics-test-case-insights#capture-by-webhook "Direct link to Capture by WebHook")

You can use LambdaHooks to start and end a test case within a single Selenium session.

#### Test Case Start[â](https://www.testmuai.com/support/docs/analytics-test-case-insights#test-case-start "Direct link to Test Case Start")

To start a test case, use the `lambda-testCase-start` hook:
    
    
    // To start a test case  
    ((JavascriptExecutor) driver).executeScript("lambda-testCase-start={Your Test Case Name}");  
    

#### Test Case End[â](https://www.testmuai.com/support/docs/analytics-test-case-insights#test-case-end "Direct link to Test Case End")

To end a test case, use the `lambda-testCase-end` hook:
    
    
    // To end a test case  
    ((JavascriptExecutor) driver).executeScript("lambda-testCase-end={Your Test Case Name}");  
    

## Capture Test Case Insights for App Automation[â](https://www.testmuai.com/support/docs/analytics-test-case-insights#capture-test-case-insights-for-app-automation "Direct link to Capture Test Case Insights for App Automation")

### Capture by WebHook[â](https://www.testmuai.com/support/docs/analytics-test-case-insights#capture-by-webhook-1 "Direct link to Capture by WebHook")

You can use LambdaHooks to start and end a test case within a single Appium session.

#### Test Case Start[â](https://www.testmuai.com/support/docs/analytics-test-case-insights#test-case-start-1 "Direct link to Test Case Start")

To start a test case, use the `lambda-testCase-start` hook:
    
    
    // To start a test case  
    ((JavascriptExecutor) driver).executeScript("lambda-testCase-start={Your Test Case Name}");  
    

#### Test Case End[â](https://www.testmuai.com/support/docs/analytics-test-case-insights#test-case-end-1 "Direct link to Test Case End")

To end a test case, use the `lambda-testCase-end` hook:
    
    
    // To end a test case  
    ((JavascriptExecutor) driver).executeScript("lambda-testCase-end={Your Test Case Name}");  
      
    

To know more about the hooks and how to use them, you can refer to the [LambdaHooks for Appium](https://www.testmuai.com/support/docs/appium-testmu-hooks/#differentiating-test-cases-in-single-session) documentation.

## Capture Test Case Insights for HyperExecute[â](https://www.testmuai.com/support/docs/analytics-test-case-insights#capture-test-case-insights-for-hyperexecute "Direct link to Capture Test Case Insights for HyperExecute")

### Capture by WebHook[â](https://www.testmuai.com/support/docs/analytics-test-case-insights#capture-by-webhook-2 "Direct link to Capture by WebHook")

You can capture the test case insights by using the WebHook. You need to add the following `WebHook` in your test script.
    
    
    // For Stage of test case `START`  
    driver.executeScript(`lambda-testCase-start=${Name of the test case}`)  
      
    // For Stage of test case `END`  
    driver.executeScript(`lambda-testCase-end=${Name of test case}`)  
      
    

### Capture by Playwright reporter[â](https://www.testmuai.com/support/docs/analytics-test-case-insights#capture-by-playwright-reporter "Direct link to Capture by Playwright reporter")

#### Step 1 - Configure your reporter in YAML[â](https://www.testmuai.com/support/docs/analytics-test-case-insights#step-1---configure-your-reporter-in-yaml "Direct link to Step 1 - Configure your reporter in YAML")

You can capture the test case insights by using the `reporter` configuration in your `YAML` file for capturing and seeing the test cases in our test case widgets on dashboard.

Here is a link to documentation for setting up the reporter for `PlaywrightJS`: [Click here](https://www.testmuai.com/support/docs/playwright-html-report/#step-1-update-your-playwright-configuration)

#### Step 2 - Add the code to lambdatest-setup file[â](https://www.testmuai.com/support/docs/analytics-test-case-insights#step-2---add-the-code-to-lambdatest-setup-file "Direct link to Step 2 - Add the code to lambdatest-setup file")

Once, you have setup the `reporter` then the following code snippet should be added to your `lambdatest-setup.js` config.
    
    
    try {  
            const response = JSON.parse(await ltPage.evaluate(  
              (_, data) => {  
                return window.eval(data)  
              },  
              `lambdatest_action: ${JSON.stringify({ action: 'getTestDetails' })}`  
            ))  
      
            if (response?.data?.test_id) {  
              testInfo.annotations.push({  
                type: 'lt_test_id',  
                description: response.data.test_id,  
              })  
              console.log('LambdaTest Test ID:', response.data.test_id)  
            }  
          } catch (err) {  
            console.warn('Could not fetch LambdaTest test details:', err.message)  
          }  
    

#### Step 3 - Execute the tests using HyperExecute[â](https://www.testmuai.com/support/docs/analytics-test-case-insights#step-3---execute-the-tests-using-hyperexecute "Direct link to Step 3 - Execute the tests using HyperExecute")

You can now, execute the tests on our `HyperExecute` platform and you can see the results captured in the `Test Case Widgets` on the dashboards.

## Capture by NPM Package for WebdriverIO[â](https://www.testmuai.com/support/docs/analytics-test-case-insights#capture-by-npm-package-for-webdriverio "Direct link to Capture by NPM Package for WebdriverIO")

You can capture the test case insights by using the NPM Package. You need to add the following `NPM Package` in your test script. Here is the link to the NPM package: [wdio-lambdatest-test-case-analytics-service](https://www.npmjs.com/package/wdio-lambdatest-test-case-analytics-service)
    
    
    npm i wdio-lambdatest-test-case-analytics-service  
    

Now, once the package has been installed, you need to add the following code in your `wdio.conf.js` file.
    
    
    exports.config = {  
      // ...  
      services: [  
        ["lambdatest-test-case-analytics", {}], // Add the service  
        // ... other services  
      ],  
      // ...  
    };  
    

Once, you have completed the configuration and start executing your tests on the `HyperExecute` platform, you will be able to see the test case insights on the `Test Case Insights` module.

## Test Case Insights Widgets[â](https://www.testmuai.com/support/docs/analytics-test-case-insights#test-case-insights-widgets "Direct link to Test Case Insights Widgets")

### Test Case Health Snapshot[â](https://www.testmuai.com/support/docs/analytics-test-case-insights#test-case-health-snapshot "Direct link to Test Case Health Snapshot")

You can analyze the health of your test cases by using the `Test Case Health Snapshot` widget. The widget will display the total number of test cases success, failed. The widget will be displayed in card view and you can also view the details of the test cases by clicking on the `View Details` button.

![cmd](data:image/webp;base64,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)

### Test Case Group View[â](https://www.testmuai.com/support/docs/analytics-test-case-insights#test-case-group-view "Direct link to Test Case Group View")

You can analyze the test cases by their group by using the `Test Case Group View` widget. The widget will display the total number of test cases in each group. The widget will be displayed in card view and you can also view the details of the test cases by clicking on the `View Details` button.

![cmd](https://www.testmuai.com/support/assets/images/test-cases-view-0db9f6e0b8a5b3618b5b5c3e34a4e9cd.webp)

## Test Case Use Cases[â](https://www.testmuai.com/support/docs/analytics-test-case-insights#test-case-use-cases "Direct link to Test Case Use Cases")

The user can use the `Test Case Insights` module to analyze the test case level insights of their test automation execution on TestMu AI. The user can use the module to analyze the following use cases:

  * Analyze the test case level insights of your test automation execution on TestMu AI.
  * Check the health of your test cases.
  * Detect the test cases that are failing frequently.
  * Drill down to the test cases for faster debugging.

---

*Auto-generated from TestMu AI documentation.*