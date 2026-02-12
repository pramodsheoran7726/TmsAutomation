# Running Your First Project on SmartUI

> **Source**: [https://www.testmuai.com/support/docs/smartui-running-your-first-project](https://www.testmuai.com/support/docs/smartui-running-your-first-project)

**Product**: SmartUI

**Last Crawled**: 2026-01-27T21:03:08.356992

---

On this page

This guide will walk you through the process of running your first visual regression test using SmartUI, a powerful feature of TestMu AI that ensures your web applications look flawless across all browsers and devices.

## Prerequisites[â](https://www.testmuai.com/support/docs/smartui-running-your-first-project#prerequisites "Direct link to Prerequisites")

  * Basic understanding of Command Line Interface and Selenium is required.
  * Login to [TestMu AI SmartUI](https://smartui.lambdatest.com/) with your credentials.

The following steps will guide you in running your first Visual Regression test on TestMu AI platform using SmartUI Selenium SDK integration.

## Step 1: Create a SmartUI Project[â](https://www.testmuai.com/support/docs/smartui-running-your-first-project#step-1-create-a-smartui-project "Direct link to Step 1: Create a SmartUI Project")

The first step is to create a project with the application in which we will combine all your builds run on the project. To create a SmartUI Project, follow these steps:

  * Go to [Projects page](https://smartui.lambdatest.com/) and click on the **New Project** button.
  * Select the platform as **CLI** for executing your **SDK** tests.
  * Add name of the project, approver's name, and tags for any filter or easy navigation.
  * Click on the **Continue** button.

Now select your desired framework and click on the **Configure** button. For the demo purpose we will select the Java framework.

## Step 2: Configure your Test Suite dependencies[â](https://www.testmuai.com/support/docs/smartui-running-your-first-project#step-2-configure-your-test-suite-dependencies "Direct link to Step 2: Configure your Test Suite dependencies")

You can use your own project to configure and test it. For demo purposes, we are using the sample repository.

Sample repo

Download or Clone the code sample code repository from the TestMu AI GitHub repository to run the project on the SmartUI.

[![Image](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAECkAABApAfV44g8AAAAHdElNRQfmBBMLCwK6SluIAAAEDUlEQVRYw62YS2xUVRjHf3NmGGbolFbtQ1Gkj0BQGZsyWBaSphtJ2VRCkwkRUzEGWBHALtSFMSZNWLhw0xgXmCgucNGFbalhUbXhkVAzKJSGaptgSiahnco0UDozdh7XRafTe8+5d3rnjt9Zzf985/zueX3nO+PCnlVQz0vU8xx+IMkj5okyz7Kdxq4NPerZRzshGnkWPx5cgEaGJHH+5hZXiTBv81NNTNDKeSZIoRUpKSY4TyvCCWIP/cwV7V5f5uhnT2mAKnqZtQ1YK7P0UmUXEWSIbMkIDY0sQwTtIDqZcgRYK1N0boQI87AshIbGQ8LFEN3EykZoaMQ4YoVo58H/gtDQeEC7GaKBiM5pmUmiJSx/mlnuktApERpkhJcLhkaXqGUX7/MTSxsCnjDIOzRRx4BBv4BXXvCEweGDvO7nIEOskGORaW4wwgADjHCDaRbJscIwb7E5733K0EfCuAHqGDdUL/GmrjbAMY4TYhsBvLhx4yXANkIc5xiVhlV9auhnnLr1ytPkDJULpYaIwjH+x9BPjtMAAqilR4rGbjY5gmzCbfjtooeaVUgHLZJzJU2OII0EJKWFDhC46VK+2+MQ0oRHGdvbuKGZGWVT3mSHI8gObip9zdAMYZKS/JQuRwiALpal3pKEBfvxSY7XGXUMGeWapPjYL0zi/xUSjiEJrihaUNAoSUnuOEYATJCUlEZBjSQts1AWJKakSTWCLZKUJV0WJE1WUrYIZWe75dhZonmlUw8eoXB9bC0LslXZrRlBSh4c28uCbFcWICV4JElCiWSl2etKLhkXRBW3A2VMWCUHFC0qmFTEVtocQ9poVbRJQUTZshWcVBbPnm3mhBLs00QgSFSJnClOOoKcUoKtRpQg+Bk2Tc/eLfExIHiPBZOehvGv8s0TnS+UuGZtzXxpmjzl1uakoXBt3eEEn3G74PInn/MGVUXeYy6qaaOPaYucbHo9xevLS7N0Ai/yNZmCW5xxvuVjkyP6Mp/wHb+xWCTx61t331kYS5wPgQA/SM6XqVYgz3B5g9xyhp36BmcLee8SR4DXDBOQ5JDpZB2S8k5jyXLW6F7FiC6NqAUO6h5Df1BvCnmBv4pARtTHXYj7+coMPflJ/Ihv+Ipe9losfQXXLBH3CZk1OcrjvMN1nre1cX38bIF4zFHzJoJzhRM7wKu2IKOmiCTn9EdZfy/m6MfPp/iAbvYxyl3m+JcAKX4kY2tsAEn66Cdn7eDhjGHfZ0mj8ctqaLA1kjhnlCtdMReHlUe2fcgUh238XwPAbr43xNNflSvVDJLgIrttTyrgo5sxVvLNr1pC1nbXCmN0O7mFqgkzSAyNSxaPIjcX0YgxSNgk7OhWoLj52UsLY9yzqH+FDib4XUlNDfYf4zU3unVPZ4cAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDQtMTlUMTE6MTA6MjUrMDA6MDAAc6jkAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA0LTE5VDExOjEwOjI1KzAwOjAwcS4QWAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=) View on GitHub](https://github.com/LambdaTest/smartui-java-testng-sample)

  * Add the following dependency in your `pom.xml` file

pom.xml
    
    
    <dependency>  
        <groupId>io.github.lambdatest</groupId>  
        <artifactId>lambdatest-java-sdk</artifactId>  
        <version>1.0.2</version>  
    </dependency>  
    

note

You can check the latest version of [lambdatest-java-sdk](https://mvnrepository.com/artifact/io.github.lambdatest/lambdatest-java-sdk) and update the latest version accordingly.

  * Install your CLI and required modules for running SmartUI SDK and compile your defined dependencies in the `pom.xml` file:

    
    
    npm install -g @lambdatest/smartui-cli  
    mvn clean compile  
    

note

If you face any problems executing tests with SmartUI-CLI `versions >= v4.x.x`, upgrade your Node.js version to `v20.3` or above.

## Step 3: Setup your Project Token and Environment Variables[â](https://www.testmuai.com/support/docs/smartui-running-your-first-project#step-3-setup-your-project-token-and-environment-variables "Direct link to Step 3: Setup your Project Token and Environment Variables")

Setup your project token and credentials shown in the **SmartUI** app after creating your project.

### Setting Project Token[â](https://www.testmuai.com/support/docs/smartui-running-your-first-project#setting-project-token "Direct link to Setting Project Token")

  * MacOS/Linux
  * Windows - CMD
  * PowerShell

    
    
    export PROJECT_TOKEN="123456#1234abcd-****-****-****-************"  
    
    
    
    set PROJECT_TOKEN="123456#1234abcd-****-****-****-************"  
    
    
    
    $env:PROJECT_TOKEN="123456#1234abcd-****-****-****-************"  
    

### Setting TestMu AI Credentials (for Hooks)[â](https://www.testmuai.com/support/docs/smartui-running-your-first-project#setting--credentials-for-hooks "Direct link to setting--credentials-for-hooks")

  * MacOS/Linux
  * Windows - CMD
  * PowerShell

    
    
    export LT_USERNAME="${YOUR_LAMBDATEST_USERNAME}"  
    export LT_ACCESS_KEY="${YOUR_LAMBDATEST_ACCESS_KEY}"  
    
    
    
    set LT_USERNAME="${YOUR_LAMBDATEST_USERNAME}"  
    set LT_ACCESS_KEY="${YOUR_LAMBDATEST_ACCESS_KEY}"  
    
    
    
    $env:LT_USERNAME="${YOUR_LAMBDATEST_USERNAME}"  
    $env:LT_ACCESS_KEY="${YOUR_LAMBDATEST_ACCESS_KEY}"  
    

info

  * For CLI projects, use `PROJECT_TOKEN` (no username/access key needed)
  * For Hooks (Selenium, Playwright, etc.), use `LT_USERNAME` and `LT_ACCESS_KEY`

![cmd](https://www.testmuai.com/support/assets/images/1-64d1e724fde565fed1279807fc9097c3.png)

## Step 4: Create and Configure SmartUI Config[â](https://www.testmuai.com/support/docs/smartui-running-your-first-project#step-4-create-and-configure-smartui-config "Direct link to Step 4: Create and Configure SmartUI Config")

You can now configure your project configurations on using various available options to run your project with the SmartUI integration. To generate the configuration file, please execute the following command:
    
    
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

## Step 5: Adding SmartUI function to take screenshot[â](https://www.testmuai.com/support/docs/smartui-running-your-first-project#step-5-adding-smartui-function-to-take-screenshot "Direct link to Step 5: Adding SmartUI function to take screenshot")

You can incorporate SmartUI into your custom `Selenium` automation test (any platform) script by adding the `smartuiSnapshot` function in the required segment of selenium script of which we would like to take the screenshot, as shown below:
    
    
     //Importing the lambdatest-java SDK  
    //Rest of your code here  
      
    @Test  
        public void basicTest() throws Exception {  
            String spanText;  
            System.out.println("Loading URL");  
      
            driver.get("<Required URL>");  
            // ... test code snippet  
            SmartUISnapshot.smartuiSnapshot(driver, "<Screenshot Name>");  
        }  
    

## Step 6: Execute the Tests on SmartUI Cloud[â](https://www.testmuai.com/support/docs/smartui-running-your-first-project#step-6-execute-the-tests-on-smartui-cloud "Direct link to Step 6: Execute the Tests on SmartUI Cloud")

Execute `visual regression tests` on SmartUI using the following commands
    
    
    npx smartui --config .smartui.json exec -- mvn test -D suite="sdk-cloud.xml"  
    

note

You may use the `npx smartui --help` command in case you are facing issues during the execution of SmartUI commands in the CLI.

You can see the SmartUI dashboard to view the results. This will help you identify the Mismatches from the existing `Baseline` build and do the required visual testing.

![cmd](https://www.testmuai.com/support/assets/images/smartui-sdk-results-primer-eb737d32d53cdf404c62d2f63abd3a1b.webp)

## Next Steps[â](https://www.testmuai.com/support/docs/smartui-running-your-first-project#next-steps "Direct link to Next Steps")

Now that you've run your first project, explore these resources to enhance your visual testing:

  * **Configure Your Project** : Learn about [Project Settings](https://www.testmuai.com/support/docs/smartui-project-settings) to customize comparison parameters
  * **Handle Dynamic Content** : See [Handling Dynamic Data](https://www.testmuai.com/support/docs/smartui-handle-dynamic-data) for pages with changing content
  * **Manage Baselines** : Understand [Baseline Management](https://www.testmuai.com/support/docs/smartui-baseline-management) for effective test comparisons
  * **Troubleshooting** : If you encounter issues, check the [Comprehensive Troubleshooting Guide](https://www.testmuai.com/support/docs/smartui-troubleshooting-guide)

## Additional Resources[â](https://www.testmuai.com/support/docs/smartui-running-your-first-project#additional-resources "Direct link to Additional Resources")

  * [Comprehensive Troubleshooting Guide](https://www.testmuai.com/support/docs/smartui-troubleshooting-guide) \- Solutions for common issues
  * [Project Settings](https://www.testmuai.com/support/docs/smartui-project-settings) \- Configure your project settings
  * [Configuration Options](https://www.testmuai.com/support/docs/smartui-sdk-config-options) \- Learn about all available configuration options
  * [Handling Dynamic Data](https://www.testmuai.com/support/docs/smartui-handle-dynamic-data) \- Handle pages with dynamic content
  * [Baseline Management](https://www.testmuai.com/support/docs/smartui-baseline-management) \- Manage your test baselines
  * [SDK Documentation](https://www.testmuai.com/support/docs/smartui-selenium-java-sdk) \- Framework-specific integration guides

---

*Auto-generated from TestMu AI documentation.*