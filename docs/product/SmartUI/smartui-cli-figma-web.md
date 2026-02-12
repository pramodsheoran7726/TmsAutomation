# Getting started with TestMu AI's SmartUI Figma-Web CLI

> **Source**: [https://www.testmuai.com/support/docs/smartui-cli-figma-web](https://www.testmuai.com/support/docs/smartui-cli-figma-web)

**Product**: SmartUI

**Last Crawled**: 2026-01-27T21:04:09.112298

---

On this page

* * *

Welcome to the TestMu AI SmartUI Figma Web CLI documentation!

With SmartUI Figma-Web CLI, you can seamlessly perform visual regression testing of your Figma designs on SmartUI using your command line, identifying discrepancies between your designs and live websites. This guide will walk you through the process of running successful Figma-Web Visual tests using SmartUI CLI.

## Prerequisites for running SmartUI Figma CLI[â](https://www.testmuai.com/support/docs/smartui-cli-figma-web#prerequisites-for-running-smartui-figma-cli "Direct link to Prerequisites for running SmartUI Figma CLI")

  * Basic understanding of Command Line Interface is required.
  * Basic understanding of Figma file structuring is required.
  * Login to [TestMu AI SmartUI](https://smartui.lambdatest.com/) with your credentials.
  * Ensure you are using `@lambdatest/smartui-cli` version 4.1.43 or higher

note

If you face any problems executing tests with SmartUI-CLI `versions >= v4.x.x`, upgrade your Node.js version to `v20.3` or above.

The following steps will guide you in running your visual tests for Figma files on TestMu AI platform using SmartUI CLI.

## Understanding Figma Tokens[â](https://www.testmuai.com/support/docs/smartui-cli-figma-web#understanding-figma-tokens "Direct link to Understanding Figma Tokens")

Token| Where Itâs Used| Description  
---|---|---  
`FIGMA_TOKEN`| Env Variable| Your Figma **Personal Access Token** to authenticate with the Figma API  
`figma_file_token`| `designs.json`| Figma **file ID** , extracted from the Figma file URL  
`figma_ids`| `designs.json`| List of **frame or node IDs** you want to compare visually  
  
> Example Figma URL: `https://www.figma.com/file/abc12345/file-name?node-id=2417-58969`
> 
>   * `figma_file_token`: `abc12345`
>   * `figma_ids`: `2417-58969`
> 

* * *

## Create a SmartUI CLI Project[â](https://www.testmuai.com/support/docs/smartui-cli-figma-web#create-a-smartui-cli-project "Direct link to Create a SmartUI CLI Project")

The first step is to create a project with the application in which we will combine all your builds run on the project. To create a SmartUI Project, follow these steps:

  1. Go to [Projects page](https://smartui.lambdatest.com/)
  2. Click on the `new project` button
  3. Select the platform as **CLI** for executing your `CLI` tests.
  4. Add name of the project, approvers for the changes found, tags for any filter or easy navigation.
  5. Click on the **Submit**.

## Steps to run your first test[â](https://www.testmuai.com/support/docs/smartui-cli-figma-web#steps-to-run-your-first-test "Direct link to Steps to run your first test")

### **Step 1** : Install the Dependencies[â](https://www.testmuai.com/support/docs/smartui-cli-figma-web#step-1-install-the-dependencies "Direct link to step-1-install-the-dependencies")

Install required NPM modules for `TestMu AI SmartUI CLI` globally or in your project:

**Global Installation (Recommended):**
    
    
    npm install -g @lambdatest/smartui-cli  
    

**Local Installation:**
    
    
    npm install @lambdatest/smartui-cli  
    

### **Step 2:** Create the design configuration file[â](https://www.testmuai.com/support/docs/smartui-cli-figma-web#step-2-create-the-design-configuration-file "Direct link to step-2-create-the-design-configuration-file")
    
    
    smartui config:create-figma-web designs.json  
    

Once, the `designs` file will be created, you will be seeing the sample pre-filled configuration in the `designs.json` file:

/smartui-cli-figma-project/designs.json
    
    
    {  
      "web": {  
        "browsers": [  
          "chrome",  
          "firefox",  
          "safari",  
          "edge"  
        ]  
      },  
      "figma": {  
        "depth": 2, //Figma Tree depth - (Optional), change the value according to the your file structure  
        "configs": [  
          {  
            "figma_file_token": "<token>",  
            "figma_ids": [  
              "id-1",  
              "id-2"  
            ],  
            "screenshot_names": [  
              "homepage",  
              "about"  
            ]  
          },  
          {  
            "figma_file_token": "<token>",  
            "figma_ids": [  
              "id-3",  
              "id-4"  
            ],  
            "screenshot_names": [  
              "xyz",  
              "abc"  
            ]  
          }  
        ]  
      }  
    }  
    

> Note: Unlike vanilla Figma CLI, designs.json includes browser parameters and auto-fetches viewports of Figma frames for efficient comparison.

### **Step 3:** Configure your Project Token and Figma Token[â](https://www.testmuai.com/support/docs/smartui-cli-figma-web#step-3-configure-your-project-token-and-figma-token "Direct link to step-3-configure-your-project-token-and-figma-token")

  1. Setup your project token shown in the **SmartUI** app after creating your project.

  * MacOS/Linux
  * Windows - CMD
  * PowerShell

    
    
    export PROJECT_TOKEN="123456#1234abcd-****-****-****-************"  
    
    
    
    set PROJECT_TOKEN="123456#1234abcd-****-****-****-************"  
    
    
    
    $env:PROJECT_TOKEN="123456#1234abcd-****-****-****-************"  
    

  2. Setup your [personal access token for Figma](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens) to authenticate Figma with SmartUI.

  * MacOS/Linux
  * Windows - CMD
  * PowerShell

    
    
    export FIGMA_TOKEN="123456#1234abcd-****-****-****-************"  
    
    
    
    set FIGMA_TOKEN="123456#1234abcd-****-****-****-************"  
    
    
    
    $env:FIGMA_TOKEN="123456#1234abcd-****-****-****-************"  
    

### **Step 4:** Configure your TestMu AI Credentials[â](https://www.testmuai.com/support/docs/smartui-cli-figma-web#step-4-configure-your--credentials "Direct link to step-4-configure-your--credentials")

  * MacOS/Linux
  * Windows - CMD
  * PowerShell

    
    
    export LT_USERNAME="YOUR_USERNAME"  
    
    
    
    set LT_USERNAME="YOUR_USERNAME"  
    
    
    
    $env:LT_USERNAME="YOUR_USERNAME"  
    

![cmd](https://www.testmuai.com/support/assets/images/project-token-primer-4998c6ef92e962af15f568191e5a59bd.webp)

#### SmartUI CLI Design Config Options[â](https://www.testmuai.com/support/docs/smartui-cli-figma-web#smartui-cli-design-config-options "Direct link to SmartUI CLI Design Config Options")

Please read the following table for more information about the configuration file:

Config Key| Description| Usage  
---|---|---  
figma_file_token| File token for your required Figma file. You can use multiple figma files in the same configuration.| Mandatory  
figma_ids| Comma separated list of nodes that you care about in the document. If specified, only a subset of the document will be returned corresponding to the nodes listed, their children, and everything between the root node and the listed nodes.| Optional  
depth (int)| Positive integer (>1) representing how deep into the document tree to traverse. For example, setting it to 2 returns Pages and all top level objects on each page. Not setting this parameter returns all nodes| Optional  
  
### **Step 5:** Uploading the Figma files on SmartUI Cloud using CLI[â](https://www.testmuai.com/support/docs/smartui-cli-figma-web#step-5-uploading-the-figma-files-on-smartui-cloud-using-cli "Direct link to step-5-uploading-the-figma-files-on-smartui-cloud-using-cli")

You can now execute tests for `Visual Testing for Figma objects` using the following options:.
    
    
    npx smartui upload-figma-web designs.json  
    

### Working example with actual web comparisons[â](https://www.testmuai.com/support/docs/smartui-cli-figma-web#working-example-with-actual-web-comparisons "Direct link to Working example with actual web comparisons")

  1. Please clone the following sample GitHub repo (`https://github.com/LambdaTest/smartui-figma-web-cli-sample`).

    
    
    git clone https://github.com/LambdaTest/smartui-figma-web-cli-sample  
    

  2. Install the node modules using the command:

    
    
    npm i  
    

  3. Configure your project token and Figma token

  * Setup your project token shown in the **SmartUI** app after creating your project.

  * MacOS/Linux
  * Windows - CMD
  * PowerShell

    
    
    export PROJECT_TOKEN="123456#1234abcd-****-****-****-************"  
    
    
    
    set PROJECT_TOKEN="123456#1234abcd-****-****-****-************"  
    
    
    
    $env:PROJECT_TOKEN="123456#1234abcd-****-****-****-************"  
    

  * Setup your [personal access token for Figma](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens) to authenticate Figma with SmartUI.

  * MacOS/Linux
  * Windows - CMD
  * PowerShell

    
    
    export FIGMA_TOKEN="123456#1234abcd-****-****-****-************"  
    
    
    
    set FIGMA_TOKEN="123456#1234abcd-****-****-****-************"  
    
    
    
    $env:FIGMA_TOKEN="123456#1234abcd-****-****-****-************"  
    

  4. Create your figma baseline

    
    
    npx smartui upload-figma-web designs.json --buildName=FigmaBaseline2  
    

  5. Execute your functional test script (Selenium Nodejs in this sample)

    
    
    npx smartui --config web-config.json exec --buildName=web-build -- node figma-web-local.js  
    

> **Points to Consider**
> 
>   * The browsers listed in the Figma configuration are used solely to enable comparisons between your designs and their corresponding live webpages.
>   * Websites may exhibit browser-specific behaviors. To account for these variations, it is recommended to create distinct designs tailored for each browser, if necessary.
> 

## Best Practices[â](https://www.testmuai.com/support/docs/smartui-cli-figma-web#best-practices "Direct link to Best Practices")

  * Build Names
  * Screenshot Names
  * Branch Names

**Build Names**
    
    
       npx smartui upload-figma-web designs.json --buildName "v1.0.0"  
    

**Screenshot Names**

  * Good: `homepage-hero`, `login-form`, `dashboard-sidebar`
    * Avoid: `test1`, `screenshot`, `design-1`
    * Ensure `screenshot_names` in your config match the order of `figma_ids`

**Branch Names**

**Screenshot Naming for SDK Comparisons**

**Critical** : When comparing Figma designs with live implementations captured via SDKs, add `.png` extension to your SDK screenshot names.

Figma-uploaded screenshots automatically have `.png` appended (e.g., `homepage.png`), so your SDK screenshots must match:

**In your SDK code:**
    
    
     // â Wrong - will not match Figma screenshot  
    smartuiSnapshot(driver, "homepage");  
      
    // â Correct - matches Figma screenshot name  
    smartuiSnapshot(driver, "homepage.png");  
    

**Example for different frameworks:**

  * Selenium
  * Playwright
  * Cypress

    
    
    // Java  
    SmartUISnapshot.smartuiSnapshot(driver, "homepage.png");  
    
    
    
    // JavaScript  
    await smartuiSnapshot(page, "homepage.png");  
    
    
    
    // JavaScript  
    cy.smartuiSnapshot("homepage.png");  
    

**Configuration Example:**
    
    
    {  
      "figma": {  
        "configs": [  
          {  
            "figma_file_token": "abc12345",  
            "figma_ids": ["id-1", "id-2"],  
            "screenshot_names": ["homepage.png", "about.png"]  // Include .png extension  
          }  
        ]  
      }  
    }  
    

This ensures that Figma screenshots (e.g., `homepage.png`) match SDK screenshots (e.g., `homepage.png`) in the dashboard.

### Branch Names[â](https://www.testmuai.com/support/docs/smartui-cli-figma-web#branch-names "Direct link to Branch Names")

### Screenshot Naming for SDK Comparisons[â](https://www.testmuai.com/support/docs/smartui-cli-figma-web#screenshot-naming-for-sdk-comparisons "Direct link to Screenshot Naming for SDK Comparisons")

**Critical** : When comparing Figma designs with live implementations captured via SDKs, add `.png` extension to your SDK screenshot names.

Figma-uploaded screenshots automatically have `.png` appended (e.g., `homepage.png`), so your SDK screenshots must match:

**In your SDK code:**
    
    
     // â Wrong - will not match Figma screenshot  
    smartuiSnapshot(driver, "homepage");  
      
    // â Correct - matches Figma screenshot name  
    smartuiSnapshot(driver, "homepage.png");  
    

**Example for different frameworks:**

  * Selenium
  * Playwright
  * Cypress

    
    
    // Java  
    SmartUISnapshot.smartuiSnapshot(driver, "homepage.png");  
    
    
    
    // JavaScript  
    await smartuiSnapshot(page, "homepage.png");  
    
    
    
    // JavaScript  
    cy.smartuiSnapshot("homepage.png");  
    

**Configuration Example:**
    
    
    {  
      "figma": {  
        "configs": [  
          {  
            "figma_file_token": "abc12345",  
            "figma_ids": ["id-1", "id-2"],  
            "screenshot_names": ["homepage.png", "about.png"]  // Include .png extension  
          }  
        ]  
      }  
    }  
    

This ensures that Figma screenshots (e.g., `homepage.png`) match SDK screenshots (e.g., `homepage.png`) in the same build.

## Troubleshooting[â](https://www.testmuai.com/support/docs/smartui-cli-figma-web#troubleshooting "Direct link to Troubleshooting")

  * Verify Figma Token
  * Check File Token
  * Validate Node IDs
  * Check Screenshot Names
  * Verify Frame Sizes
  * Check Build Names
  * Browser-Specific Issues
  * Verify Project Token
  * Check Project Type

Verify Figma Token
    
    
       echo $FIGMA_TOKEN  
    

Ensure the token is valid and has not expired. Generate a new token from [Figma Settings](https://www.figma.com/settings).

Check File Token

  * Verify the `figma_file_token` in your `designs.json` matches the file ID from the Figma URL
    * Ensure you have access to the Figma file

Validate Node IDs

  * Confirm `figma_ids` in your configuration are valid
    * Check that the nodes exist in the Figma file **Symptoms** :
  * Figma screenshots don't match web screenshots
  * Comparison shows mismatches even when designs are identical **Solutions** :

Check Screenshot Names

  * Ensure SDK screenshots include `.png` extension (e.g., `homepage.png`)
    * Verify screenshot names match exactly between Figma config and SDK code
    * Ensure `screenshot_names` array matches the order of `figma_ids`

Verify Frame Sizes

  * Ensure frame dimensions are consistent across uploads
    * Check that viewport sizes match between Figma frames and browser captures
    * Use the same browser viewport sizes in both Figma config and SDK config

Check Build Names

  * Ensure both Figma and SDK uploads use the same `--buildName`
    * Verify builds are in the same project

Browser-Specific Issues

  * Different browsers may render differently
    * Consider creating browser-specific Figma designs if needed
    * Ensure browser list in Figma config matches browsers used in SDK tests **Symptoms** :
  * "Invalid project token" error
  * Uploads fail with authentication errors **Solutions** :

Verify Project Token
    
    
       echo $PROJECT_TOKEN  
    

Ensure the token is set correctly and matches your SmartUI project.

Check Project Type

  * Ensure project is created as **CLI** type
    * Verify project exists in SmartUI dashboard If you encounter issues not covered here:
  * Review the [Comprehensive Troubleshooting Guide](https://www.testmuai.com/support/docs/smartui-troubleshooting-guide) for detailed solutions
  * Check [Figma CLI Documentation](https://www.testmuai.com/support/docs/smartui-cli-figma) for basic Figma workflows
  * Visit [TestMu AI Support](https://www.lambdatest.com/support) for additional resources
  * Contact support at [[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection#8ffcfaffffe0fdfbcffbeafcfbe2faa1eee6) or use [24/7 Chat Support](https://www.lambdatest.com/support)

## Additional Resources[â](https://www.testmuai.com/support/docs/smartui-cli-figma-web#additional-resources "Direct link to Additional Resources")

  * [Comprehensive Troubleshooting Guide](https://www.testmuai.com/support/docs/smartui-troubleshooting-guide)
  * [Figma CLI Documentation](https://www.testmuai.com/support/docs/smartui-cli-figma)
  * [Figma-App CLI Documentation](https://www.testmuai.com/support/docs/smartui-cli-figma-app)
  * [Baseline Management](https://www.testmuai.com/support/docs/smartui-baseline-management)
  * [Running Your First Project](https://www.testmuai.com/support/docs/smartui-running-your-first-project)
  * [SmartUI API Documentation](https://www.lambdatest.com/support/api-doc/)

### View SmartUI Results[â](https://www.testmuai.com/support/docs/smartui-cli-figma-web#view-smartui-results "Direct link to View SmartUI Results")

You can see the SmartUI dashboard to view the results. This will help you identify the Mismatches from the existing `Baseline` build and do the required visual testing.

![cmd](https://www.testmuai.com/support/assets/images/smartui-sdk-results-primer-eb737d32d53cdf404c62d2f63abd3a1b.webp)

---

*Auto-generated from TestMu AI documentation.*