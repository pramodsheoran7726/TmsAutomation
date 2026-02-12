# Integrate SmartUI SDK with Selenium-JavaScript

> **Source**: [https://www.testmuai.com/support/docs/smartui-selenium-js-sdk](https://www.testmuai.com/support/docs/smartui-selenium-js-sdk)

**Product**: Web Automation

**Last Crawled**: 2026-01-27T20:47:23.843100

---

On this page

* * *

Welcome to the world of simplified visual testing with the SmartUI SDK.

Integrating seamlessly into your existing Selenium testing suite, SmartUI SDK revolutionizes the way you approach visual regression testing. Our robust solution empowers you to effortlessly capture, compare, and analyze screenshots across a multitude of browsers and resolutions, ensuring comprehensive coverage and accuracy in your visual testing endeavors.

## Prerequisites[â](https://www.testmuai.com/support/docs/smartui-selenium-js-sdk#prerequisites "Direct link to Prerequisites")

  * Basic understanding of Command Line Interface and Selenium is required.
  * Login to [TestMu AI SmartUI](https://smartui.lambdatest.com/) with your credentials.

The following steps will guide you in running your first Visual Regression test on TestMu AI platform using SmartUI Selenium SDK integration.

## Create a SmartUI Project[â](https://www.testmuai.com/support/docs/smartui-selenium-js-sdk#create-a-smartui-project "Direct link to Create a SmartUI Project")

The first step is to create a project with the application in which we will combine all your builds run on the project. To create a SmartUI Project, follow these steps:

  1. Go to [Projects page](https://smartui.lambdatest.com/)
  2. Click on the `new project` button
  3. Select the platform as **CLI** for executing your `SDK` tests.
  4. Add name of the project, approvers for the changes found, tags for any filter or easy navigation.
  5. Click on the **Submit**.

## Steps to run your first test[â](https://www.testmuai.com/support/docs/smartui-selenium-js-sdk#steps-to-run-your-first-test "Direct link to Steps to run your first test")

Once you have created a SmartUI Project, you can generate screenshots by running automation scripts. Follow the below steps to successfully generate screenshots

### **Step 1:** Create/Update your test[â](https://www.testmuai.com/support/docs/smartui-selenium-js-sdk#step-1-createupdate-your-test "Direct link to step-1-createupdate-your-test")

You can clone the sample repository to run `LambdaTest` automation tests with `SmartUI` and use the `sdk.js` file present in the `sdk` folder.
    
    
    git clone https://github.com/LambdaTest/smartui-node-sample  
    cd smartui-node-sample/sdk  
    

### **Step 2** : Install the Dependencies[â](https://www.testmuai.com/support/docs/smartui-selenium-js-sdk#step-2-install-the-dependencies "Direct link to step-2-install-the-dependencies")

Install required NPM modules for `TestMu AI SmartUI Selenium SDK` in your **Frontend** project.
    
    
    npm install @lambdatest/smartui-cli @lambdatest/selenium-driver selenium-webdriver  
    

note

If you face any problems executing tests with SmartUI-CLI `versions >= v4.x.x`, upgrade your Node.js version to `v20.3` or above.

### **Step 3:** Configure your Project Token[â](https://www.testmuai.com/support/docs/smartui-selenium-js-sdk#step-3-configure-your-project-token "Direct link to step-3-configure-your-project-token")

Setup your project token shown in the **SmartUI** app after creating your project.

  * MacOS/Linux
  * Windows - CMD
  * PowerShell

    
    
    export PROJECT_TOKEN=123456#1234abcd-****-****-****-************"  
    
    
    
    set PROJECT_TOKEN=123456#1234abcd-****-****-****-************"  
    
    
    
    $env:PROJECT_TOKEN=123456#1234abcd-****-****-****-************"  
    

![cmd](https://www.testmuai.com/support/assets/images/project-token-primer-4998c6ef92e962af15f568191e5a59bd.webp)

### **Step 4:** Create and Configure SmartUI Config[â](https://www.testmuai.com/support/docs/smartui-selenium-js-sdk#step-4-create-and-configure-smartui-config "Direct link to step-4-create-and-configure-smartui-config")

You can now configure your project configurations on using various available options to run your tests with the SmartUI integration. To generate the configuration file, please execute the following command:
    
    
    npx smartui config:create .smartui.json  
    

Once, the configuration file will be created, you will be seeing the default configuration pre-filled in the configuration file:

/smartui-sdk-project/.smartui.json
    
    
    {  
      "web": {  
        "browsers": [  
          "chrome",  
          "firefox",  
          "safari",  
          "edge"  
        ],  
        "viewports": [  
          [  
            1920  
          ],  
          [  
            1366  
          ],  
          [  
            1028  
          ]  
        ] // Full Page screenshots are captured by default for web viewports  
      },  
      "mobile": {  
        "devices": [  
          "iPhone 14",  //iPhone 14 viewport  
          "Galaxy S24"  //Galaxy S24 viewport  
        ],  
        "fullPage": true, //Full Page is true by default for mobile viewports  
        "orientation": "portrait" //Change to "landscape" for landscape snapshot  
      },  
      "waitForTimeout": 1000, //Optional (Should only be used in case lazy-loading/async components are present)  
      "waitForPageRender": 50000, //Optional (Should only be used in case of websites which take more than 30s to load)  
      "enableJavaScript": false, //Enable javascript for all the screenshots of the project  
      "allowedHostnames": [] //Additional hostnames to capture assets from  
    }  
    

Advanced options in SmartUI configuration

  * For capturing fullpage or viewport screenshots, please refer to this [documentation](https://www.testmuai.com/support/docs/smartui-sdk-config-options/#12-viewports)
  * For the list of available mobile viewports, please refer to this [documentation](https://www.testmuai.com/support/docs/smartui-sdk-config-options/#list-of-supported-device-viewports)
  * For more information about SmartUI config global options, please refer to this [documentation](https://www.testmuai.com/support/docs/smartui-sdk-config-options/#3-global-options-optional).

### **Step 5:** Adding SmartUI function to take screenshot[â](https://www.testmuai.com/support/docs/smartui-selenium-js-sdk#step-5-adding-smartui-function-to-take-screenshot "Direct link to step-5-adding-smartui-function-to-take-screenshot")

  * You can incorporate SmartUI into your custom `Selenium` automation test (any platform) script by adding the `smartuiSnapshot` function in the required segment of selenium script of which we would like to take the screenshot, as shown below:

    
    
    const { Builder, By, Key, until } = require('selenium-webdriver');  
    const { smartuiSnapshot } = require('@lambdatest/selenium-driver');  
      
    (async function example() {  
      let driver = await new Builder().forBrowser("chrome").build();  
      
      try {  
        await driver.get("https://www.lambdatest.com");  
        await smartuiSnapshot(driver, "LambdaTest");  
        await driver.get("https://www.pinterest.com/pin/112801165652823604/");  
        await smartuiSnapshot(driver, "NYC");  
      } finally {  
        await driver.quit();  
      }  
    })();  
    

### **Step 6:** Execute the Tests on SmartUI Cloud[â](https://www.testmuai.com/support/docs/smartui-selenium-js-sdk#step-6-execute-the-tests-on-smartui-cloud "Direct link to step-6-execute-the-tests-on-smartui-cloud")

Execute `visual regression tests` on SmartUI using the following commands
    
    
    npx smartui exec node sdkCloud.js --config .smartui.json  
    

note

You may use the `npx smartui --help` command in case you are facing issues during the execution of SmartUI commands in the CLI.

## View SmartUI Results[â](https://www.testmuai.com/support/docs/smartui-selenium-js-sdk#view-smartui-results "Direct link to View SmartUI Results")

You have successfully integrated SmartUI SDK with your Selenium tests. Visit your SmartUI project to view builds and compare snapshots between different test runs.

You can see the SmartUI dashboard to view the results. This will help you identify the Mismatches from the existing `Baseline` build and do the required visual testing.

![cmd](https://www.testmuai.com/support/assets/images/smartui-sdk-results-primer-eb737d32d53cdf404c62d2f63abd3a1b.webp)

## Arguments supported in the `smartUISnapshot` function[â](https://www.testmuai.com/support/docs/smartui-selenium-js-sdk#arguments-supported-in-the-smartuisnapshot-function "Direct link to arguments-supported-in-the-smartuisnapshot-function")

The following are the different options which are currently supported:

Key| Description  
---|---  
`driver` (instance)| The instance of the web driver used in your tests.  
`"Screenshot Name"` (string)| Specify a name for the screenshot in your tests to match the same screenshot with the name from your baseline.  
`options` (object)| Specify one or a combination of selectors in the `ignoreDOM` or `selectDOM` objects. These selectors can be based on `HTML DOM IDs, CSS classes, CSS selectors, or XPaths` used by your webpage. They define elements that should be excluded from or included in the visual comparison.  
  
## Handling Dynamic Data in SmartUI SDK **New**[â](https://www.testmuai.com/support/docs/smartui-selenium-js-sdk#handling-dynamic-data-in-smartui-sdk-- "Direct link to handling-dynamic-data-in-smartui-sdk--")

When conducting visual tests, you may encounter scenarios where certain elements within your application change between test runs. These changes might introduce inconsistencies in your test results.You can ignore / select specific element(s) to be removed from the comparison by parsing the options in the `smartuiSnapshot` function in the following way

  * Ignore ID
  * Ignore Class
  * Ignore XPath
  * Ignore CSS Selector

This is a sample for your configuration for JavaScript to ignore by
    
    
    let options = {  
                ignoreDOM: {  
                    id: ["ID-1", "ID-2"],  
                }  
            }  
            await driver.get('Required URL');  
            await smartuiSnapshot(driver, 'Screenshot Name', options);  
    

This is a sample for your configuration for JavaScript to ignore by
    
    
    let options = {  
                ignoreDOM: {  
                    class: ["Class-1", "Class-2"],  
                }  
            }  
            await driver.get('Required URL');  
            await smartuiSnapshot(driver, 'Screenshot Name', options);  
    

This is a sample for your configuration for JavaScript to ignore by
    
    
    let options = {  
                ignoreDOM: {  
                    xpath: ["Xpath-1", "Xpath-2"],  
                }  
            }  
            await driver.get('Required URL');  
            await smartuiSnapshot(driver, 'Screenshot Name', options);  
    

This is a sample for your configuration for JavaScript to ignore by CSS
    
    
    let options = {  
                ignoreDOM: {  
                    cssSelector: ["CSS-Selector-1", "CSS-Selector-2"],  
                }  
            }  
            await driver.get('Required URL');  
            await smartuiSnapshot(driver, 'Screenshot Name', options);  
    

  * Select ID
  * Select Class
  * Select XPath
  * Select CSS Selector

This is a sample for your configuration for JavaScript to select by
    
    
    let options = {  
                selectDOM: {  
                    id: ["ID-1", "ID-2"],  
                }  
            }  
            await driver.get('Required URL');  
            await smartuiSnapshot(driver, 'Screenshot Name', options);  
    

This is a sample for your configuration for JavaScript to select by
    
    
    let options = {  
                selectDOM: {  
                    class: ["Class-1", "Class-2"],  
                }  
            }  
            await driver.get('Required URL');  
            await smartuiSnapshot(driver, 'Screenshot Name', options);  
    

This is a sample for your configuration for JavaScript to select by
    
    
    let options = {  
                selectDOM: {  
                    xpath: ["Xpath-1", "Xpath-2"],  
                }  
            }  
            await driver.get('Required URL');  
            await smartuiSnapshot(driver, 'Screenshot Name', options);  
    

This is a sample for your webhook configuration for JavaScript to select by CSS
    
    
    let options = {  
                selectDOM: {  
                    cssSelector: ["CSS-Selector-1", "CSS-Selector-2"],  
                }  
            }  
            await driver.get('Required URL');  
            await smartuiSnapshot(driver, 'Screenshot Name', options);  
    

## For capturing the screenshot of a specific element[â](https://www.testmuai.com/support/docs/smartui-selenium-js-sdk#for-capturing-the-screenshot-of-a-specific-element "Direct link to For capturing the screenshot of a specific element")

You can capture screenshots of targeted elements by leveraging various locator mechanisms such as XPath, CSS ID, class, and selectors. This precision-driven approach ensures accurate and specific visual regression testing for your web application's components.

  * Capture Element by ID
  * Capture Element by Class
  * Capture Element by XPath
  * Capture Element by Selector

This is a sample for your configuration for JavaScript to capture an element by
    
    
    let options = {  
          element: {  
              id: 'Required ID',  
          }  
      };  
            await driver.get('Required URL');  
            await smartuiSnapshot(driver, 'Screenshot Name', options);  
    

This is a sample for your configuration for JavaScript to capture an element by
    
    
    let options = {  
          element: {  
              class: 'Required Class',  
          }  
      };  
            await driver.get('Required URL');  
            await smartuiSnapshot(driver, 'Screenshot Name', options);  
    

This is a sample for your configuration for JavaScript to capture an element by
    
    
    let options = {  
          element: {  
              xpath: 'Required Xpath',  
          }  
      };  
            await driver.get('Required URL');  
            await smartuiSnapshot(driver, 'Screenshot Name', options);  
    

This is a sample for your webhook configuration for JavaScript to capture an element by CSS
    
    
    let options = {  
          element: {  
              cssSelector: 'Required CSS Selector',  
          }  
      };  
            await driver.get('Required URL');  
            await smartuiSnapshot(driver, 'Screenshot Name', options);  
    

## For capturing interactive lazy loading elements[â](https://www.testmuai.com/support/docs/smartui-selenium-js-sdk#for-capturing-interactive-lazy-loading-elements "Direct link to For capturing interactive lazy loading elements")

If you encounter difficulties loading interactive elements that appear on scroll in full-page screenshots, consider functionally incorporating a full-page scroll into your script before capturing the screenshot. This approach ensures the elements load first, facilitating the screenshot processing.
    
    
    const { Builder, By, Key, until } = require('selenium-webdriver');  
    const { smartuiSnapshot } = require('@lambdatest/selenium-driver');  
      
    (async function example() {  
      let driver = await new Builder().forBrowser("chrome").build();  
      
      try {  
        await driver.get("Required URL");  
        async function quickScrollToBottom(lastPageWait) {  
          try {  
              let height = await driver.executeScript("return document.body.scrollHeight");  
              let heightOfPage = parseInt(height, 10);  
              let size = 200;  
              let noOfLoop = Math.floor(heightOfPage / size);  
      
              for (let i = 1; i <= noOfLoop; i++) {  
                  await driver.executeScript(`window.scrollTo(${(i - 1) * size}, ${i * size})`);  
                  await new Promise(resolve => setTimeout(resolve, 1000));  
                  if (i === noOfLoop) {  
      
                      await driver.executeScript(`window.scrollTo(${i * size}, ${heightOfPage})`);  
                      await new Promise(resolve => setTimeout(resolve, lastPageWait));  
                  }  
              }  
      
              // Now scroll to the top  
              await driver.executeScript("window.scrollTo(0,0)");  
              await new Promise(resolve => setTimeout(resolve, 10000));  
              console.log("Scroll Completed");  
          } catch (e) {  
              console.log("Got some errors" + e.toString());  
          }  
      }  
        await quickScrollToBottom(100); //use wait time accordingly  
        await smartuiSnapshot(driver, "Screenshot Name");  
      } finally {  
        await driver.quit();  
      }  
    })();  
      
    

## Best Practices[â](https://www.testmuai.com/support/docs/smartui-selenium-js-sdk#best-practices "Direct link to Best Practices")

  * Screenshot Naming
  * Wait for Page Load
  * Handle Dynamic Content
  * Configuration Management
  * Test Organization

**Screenshot Naming**

  * Use descriptive, consistent names for screenshots
  * Include page/component name in screenshot names
  * Avoid special characters that might cause issues
  * Use consistent naming conventions across your test suite

**Example:**
    
    
     await smartuiSnapshot(driver, HomePage-Header");  
    await smartuiSnapshot(driver, "ProductPage-MainContent");  
    

**Wait for Page Load**

  * Always wait for pages to fully load before taking screenshots
  * Use Selenium's WebDriverWait for dynamic content
  * Consider using `waitForTimeout` in configuration for lazy-loaded content

**Example:**
    
    
     const { until, By } = require('selenium-webdriver');  
    await driver.get('https://example.com');  
    await driver.wait(until.elementLocated(By.id('main-content')), 10000);  
    await smartuiSnapshot(driver, Page Loaded");  
    

**Handle Dynamic Content**

  * Use `ignoreDOM` for elements that change between runs
  * Use `selectDOM` when you only need to compare specific areas
  * Document why elements are ignored for future reference

**Configuration Management**

  * Keep `.smartui.json` in version control
  * Use environment variables for sensitive data
  * Document custom configuration choices

**Test Organization**

  * Group related screenshots in the same build
  * Use meaningful build names
  * Run tests in consistent environments

## Troubleshooting[â](https://www.testmuai.com/support/docs/smartui-selenium-js-sdk#troubleshooting "Direct link to Troubleshooting")

  * Screenshots Not Appearing in Dashboard
  * Project Not Found Error
  * Screenshots Show Blank or Incorrect Content
  * Build Execution Fails
  * npm Dependencies Not Resolving
  * Screenshot Names Not Matching Baseline

**Issue: Screenshots Not Appearing in Dashboard**

**Symptoms** : Tests run successfully but no screenshots appear in SmartUI dashboard

**Possible Causes** :

  * Project token not set or incorrect
  * Project name mismatch
  * Network connectivity issues
  * CLI not installed or outdated

**Solutions** :

  1. Verify `PROJECT_TOKEN` is set correctly:
         
         echo $PROJECT_TOKEN  
         

  2. Check project name matches exactly (case-sensitive)

  3. Verify SmartUI CLI is installed:
         
         npx smartui --version  
         

  4. Check network connectivity to TestMu AI servers

  5. Review test execution logs for error messages

**Issue: Project Not Found" Error**

**Symptoms** : Error message indicating project cannot be found

**Possible Causes** :

  * Incorrect project token
  * Project deleted or renamed
  * Token from wrong project

**Solutions** :

  1. Verify project exists in SmartUI dashboard
  2. Copy project token directly from Project Settings
  3. Ensure token includes the project ID prefix (e.g., `123456#...`)
  4. Check for extra spaces or quotes in token

**Issue: Screenshots Show Blank or Incorrect Content**

**Symptoms** : Screenshots captured but show blank pages or incorrect content

**Possible Causes** :

  * Page not fully loaded
  * JavaScript not executed
  * Viewport size issues
  * Timing issues

**Solutions** :

  1. Add explicit waits before screenshots:
         
         const { until, By } = require('selenium-webdriver');  
         await driver.wait(until.elementLocated(By.id('content')), 10000);  
         await driver.wait(until.elementIsVisible(By.css('.main-content')), 10000);  
         

  2. Enable JavaScript in configuration:
         
         {  
           enableJavaScript": true  
         }  
         

  3. Increase `waitForTimeout` in configuration

  4. Verify viewport size matches expected dimensions

**Issue: Build Execution Fails**

**Symptoms** : `npx smartui exec` command fails

**Possible Causes** :

  * Missing or incorrect configuration file
  * Invalid JSON in configuration
  * Port conflicts
  * Permission issues

**Solutions** :

  1. Verify `.smartui.json` exists and is valid JSON
  2. Check configuration file syntax
  3. Try different port if default is in use:
         
         npx smartui exec -P 5000 -- <command">  
         

  4. Check file permissions for configuration and project files

**Issue: npm Dependencies Not Resolving**

**Symptoms** : npm cannot find `@lambdatest/selenium-driver` or `@lambdatest/smartui-cli`

**Possible Causes** :

  * Incorrect package version
  * npm registry access issues
  * Network connectivity problems

**Solutions** :

  1. Check latest versions on npm:
         
         npm view @lambdatest/selenium-driver version  
         npm view @lambdatest/smartui-cli version  
         

  2. Clear npm cache:
         
         npm cache clean --force  
         

  3. Verify internet connectivity for npm registry access

  4. Check package.json for version conflicts

**Issue: Screenshot Names Not Matching Baseline**

**Symptoms** : Screenshots appear as New" instead of comparing with baseline

**Possible Causes** :

  * Screenshot name changed
  * Baseline doesn't exist
  * Name contains special characters

**Solutions** :

  1. Ensure screenshot names are consistent across test runs
  2. Verify baseline exists in project
  3. Avoid special characters in screenshot names
  4. Check for case sensitivity issues

**Getting Help**

If you encounter issues not covered here:

  * Review the [Comprehensive Troubleshooting Guide](https://www.testmuai.com/support/docs/smartui-troubleshooting-guide) for detailed solutions
  * Check [SmartUI Configuration Options](https://www.testmuai.com/support/docs/smartui-sdk-config-options) documentation
  * See [Handling Dynamic Data](https://www.testmuai.com/support/docs/smartui-handle-dynamic-data) for dynamic content issues
  * Visit [TestMu AI Support](https://www.lambdatest.com/support) for additional resources
  * Contact support at [[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection#bac9cfcacad5c8cefacedfc9ced7cf94dbd3) or use [24/7 Chat Support](https://www.lambdatest.com/support)

## Additional Resources[â](https://www.testmuai.com/support/docs/smartui-selenium-js-sdk#additional-resources "Direct link to Additional Resources")

  * [Comprehensive Troubleshooting Guide](https://www.testmuai.com/support/docs/smartui-troubleshooting-guide)
  * [SmartUI Configuration Options](https://www.testmuai.com/support/docs/smartui-sdk-config-options)
  * [Handling Dynamic Data](https://www.testmuai.com/support/docs/smartui-handle-dynamic-data)
  * [Handling Lazy Loading](https://www.testmuai.com/support/docs/smartui-handle-lazy-loading)
  * [Baseline Management](https://www.testmuai.com/support/docs/smartui-baseline-management)
  * [Running Your First Project](https://www.testmuai.com/support/docs/smartui-running-your-first-project)
  * [SmartUI API Documentation](https://www.lambdatest.com/support/api-doc/)

---

*Auto-generated from TestMu AI documentation.*