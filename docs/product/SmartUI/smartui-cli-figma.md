# Getting started with TestMu AI's SmartUI Figma CLI

> **Source**: [https://www.testmuai.com/support/docs/smartui-cli-figma](https://www.testmuai.com/support/docs/smartui-cli-figma)

**Product**: SmartUI

**Last Crawled**: 2026-01-27T21:03:25.696190

---

On this page

* * *

Welcome to the TestMu AI SmartUI Figma CLI documentation!

With SmartUI Figma CLI, you can seamlessly perform visual regression testing of your Figma designs on SmartUI using your command line, identifying Visual UI Regression bugs effortlessly. This guide will walk you through the process of running successful Figma Visual tests using SmartUI CLI.

## Prerequisites for running SmartUI Figma CLI[â](https://www.testmuai.com/support/docs/smartui-cli-figma#prerequisites-for-running-smartui-figma-cli "Direct link to Prerequisites for running SmartUI Figma CLI")

  * Basic understanding of Command Line Interface is required.
  * Basic understanding of Figma file structuring is required.
  * Login to [TestMu AI SmartUI](https://smartui.lambdatest.com/) with your credentials.

The following steps will guide you in running your visual tests for Figma files on TestMu AI platform using SmartUI CLI.

## Understanding Figma Tokens[â](https://www.testmuai.com/support/docs/smartui-cli-figma#understanding-figma-tokens "Direct link to Understanding Figma Tokens")

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

## Create a SmartUI CLI Project[â](https://www.testmuai.com/support/docs/smartui-cli-figma#create-a-smartui-cli-project "Direct link to Create a SmartUI CLI Project")

The first step is to create a project with the application in which we will combine all your builds run on the project. To create a SmartUI Project, follow these steps:

  1. Go to [Projects page](https://smartui.lambdatest.com/)
  2. Click on the `new project` button
  3. Select the platform as **CLI** for executing your `CLI` tests.
  4. Add name of the project, approvers for the changes found, tags for any filter or easy navigation.
  5. Click on the **Submit**.

## Steps to run your first test[â](https://www.testmuai.com/support/docs/smartui-cli-figma#steps-to-run-your-first-test "Direct link to Steps to run your first test")

### **Step 1** : Install the Dependencies[â](https://www.testmuai.com/support/docs/smartui-cli-figma#step-1-install-the-dependencies "Direct link to step-1-install-the-dependencies")

Install required NPM modules for `TestMu AI SmartUI CLI` globally or in your project:

**Global Installation (Recommended):**
    
    
    npm install -g @lambdatest/smartui-cli  
    

**Local Installation:**
    
    
    npm install @lambdatest/smartui-cli  
    

note

If you face any problems executing tests with SmartUI-CLI `versions >= v4.x.x`, upgrade your Node.js version to `v20.3` or above.

### **Step 2:** Create the design info file[â](https://www.testmuai.com/support/docs/smartui-cli-figma#step-2-create-the-design-info-file "Direct link to step-2-create-the-design-info-file")
    
    
    smartui config:create-figma designs.json  
    

Once, the `designs` file will be created, you will be seeing the sample pre-filled configuration in the `designs.json` file:

/smartui-cli-figma-project/designs.json
    
    
    {  
        "depth":2, //Figma Tree depth - (Optional), change the value according to the your file structure  
        "figma_config": [  
          {  
            "figma_file_token": "<Required Figma File token>",  
            "figma_ids":[  
              "Id-1", "Id-2"  
            ]  
          },  
           {  
            "figma_file_token": "<Required Figma File token>",  
            "figma_ids":[  
              "Id-3", "Id-4"  
            ]  
          }  
        ]  
      }  
    

### **Step 3:** Configure your Project Token and Figma Token[â](https://www.testmuai.com/support/docs/smartui-cli-figma#step-3-configure-your-project-token-and-figma-token "Direct link to step-3-configure-your-project-token-and-figma-token")

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
    

### **Step 4:** Configure your TestMu AI Credentials[â](https://www.testmuai.com/support/docs/smartui-cli-figma#step-4-configure-your--credentials "Direct link to step-4-configure-your--credentials")

  * MacOS/Linux
  * Windows - CMD
  * PowerShell

    
    
    export LT_USERNAME="YOUR_USERNAME"  
    
    
    
    set LT_USERNAME="YOUR_USERNAME"  
    
    
    
    $env:LT_USERNAME="YOUR_USERNAME"  
    

![cmd](https://www.testmuai.com/support/assets/images/project-token-primer-4998c6ef92e962af15f568191e5a59bd.webp)

#### SmartUI CLI Design Config Options[â](https://www.testmuai.com/support/docs/smartui-cli-figma#smartui-cli-design-config-options "Direct link to SmartUI CLI Design Config Options")

Please read the following table for more information about the configuration file:

Config Key| Description| Usage  
---|---|---  
figma_file_token| File token for your required Figma file. You can use multiple figma files in the same configuration.| Mandatory  
figma_ids| Comma separated list of nodes that you care about in the document. If specified, only a subset of the document will be returned corresponding to the nodes listed, their children, and everything between the root node and the listed nodes.| Optional  
depth (int)| Positive integer (>1) representing how deep into the document tree to traverse. For example, setting it to 2 returns Pages and all top level objects on each page. Not setting this parameter returns all nodes| Optional  
  
### **Step 5:** Uploading the Figma files on SmartUI Cloud using CLI[â](https://www.testmuai.com/support/docs/smartui-cli-figma#step-5-uploading-the-figma-files-on-smartui-cloud-using-cli "Direct link to step-5-uploading-the-figma-files-on-smartui-cloud-using-cli")

You can now execute tests for `Visual Testing for Figma objects` using the following options:.
    
    
    npx smartui upload-figma designs.json  
    

### Advanced options for baseline management[â](https://www.testmuai.com/support/docs/smartui-cli-figma#advanced-options-for-baseline-management "Direct link to Advanced options for baseline management")

  1. `markBaseline` \- You can mark a specific build as a baseline through the runner command

    
    
    npx smartui upload-figma designs.json --markBaseline  
    

  2. `buildName` \- You can add your custom build name to a build by running the following command

    
    
    npx smartui upload-figma designs.json --buildName "<Build_Name>"  
    

**You can use these options in a nested way as well, as shown below**
    
    
    npx smartui upload-figma designs.json --buildName "<Build_Name>" --markBaseline  
    

note

If `buildName` is not specified, a random build name is generated for every run.

You can add more screenshots in a build by specifying the particular build name in the runner command

## Best Practices[â](https://www.testmuai.com/support/docs/smartui-cli-figma#best-practices "Direct link to Best Practices")

  * Build Names
  * Screenshot Names

**Build Names**
    
    
       npx smartui upload-figma designs.json --buildName "v1.0.0"  
    

**Screenshot Names**

  * Good: `homepage-hero`, `login-form`, `dashboard-sidebar`
    * Avoid: `test1`, `screenshot`, `design-1`

  * Branch Names

**Branch Names**

**Screenshot Naming for SDK Comparisons**

**Important** : When comparing Figma designs with live implementations captured via SDKs, add `.png` extension to your SDK screenshot names.

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
    

This ensures that Figma screenshots (e.g., `homepage.png`) match SDK screenshots (e.g., `homepage.png`) in the same build.

### Setup with Continuous Integration (CI)[â](https://www.testmuai.com/support/docs/smartui-cli-figma#setup-with-continuous-integration-ci "Direct link to Setup with Continuous Integration \(CI\)")

If you are using the Continuous Integration (CI) pipeline for your application and want to integrate `SmartUI Figma CLI` execution then the following are the steps needs to be added to your `.yaml` file:
    
    
    steps:  
      - name: Running SmartUI Figma CLI Tests  
        - run: |  
           npm install @lambdatest/smartui-cli  
           npx playwright install-deps  
           npx smartui upload-figma designs.json  
    

### View SmartUI Results[â](https://www.testmuai.com/support/docs/smartui-cli-figma#view-smartui-results "Direct link to View SmartUI Results")

You can see the SmartUI dashboard to view the results. This will help you identify the Mismatches from the existing `Baseline` build and do the required visual testing.

![cmd](https://www.testmuai.com/support/assets/images/smartui-sdk-results-primer-eb737d32d53cdf404c62d2f63abd3a1b.webp)

  * Branch Names

**Branch Names**

**Screenshot Naming for SDK Comparisons**

**Important** : When comparing Figma designs with live implementations captured via SDKs, add `.png` extension to your SDK screenshot names.

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
    

This ensures that Figma screenshots (e.g., `homepage.png`) match SDK screenshots (e.g., `homepage.png`) in the same build.

### Setup with Continuous Integration (CI)[â](https://www.testmuai.com/support/docs/smartui-cli-figma#setup-with-continuous-integration-ci-1 "Direct link to Setup with Continuous Integration \(CI\)")

If you are using the Continuous Integration (CI) pipeline for your application and want to integrate `SmartUI Figma CLI` execution then the following are the steps needs to be added to your `.yaml` file:
    
    
    steps:  
      - name: Running SmartUI Figma CLI Tests  
        - run: |  
           npm install @lambdatest/smartui-cli  
           npx playwright install-deps  
           npx smartui upload-figma designs.json  
    

### View SmartUI Results[â](https://www.testmuai.com/support/docs/smartui-cli-figma#view-smartui-results-1 "Direct link to View SmartUI Results")

You can see the SmartUI dashboard to view the results. This will help you identify the Mismatches from the existing `Baseline` build and do the required visual testing.

![cmd](https://www.testmuai.com/support/assets/images/smartui-sdk-results-primer-eb737d32d53cdf404c62d2f63abd3a1b.webp)

## Troubleshooting[â](https://www.testmuai.com/support/docs/smartui-cli-figma#troubleshooting "Direct link to Troubleshooting")

  * Verify Figma Token
  * Check File Token
  * Validate Node IDs
  * Check Screenshot Names
  * Verify Frame Sizes
  * Check Build Names
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
  * Figma screenshots don't match SDK screenshots
  * Comparison shows mismatches even when designs are identical **Solutions** :

Check Screenshot Names

  * Ensure SDK screenshots include `.png` extension (e.g., `homepage.png`)
    * Verify screenshot names match exactly between Figma and SDK

Verify Frame Sizes

  * Ensure frame dimensions are consistent across uploads
    * Check that viewport sizes match between Figma frames and SDK captures

Check Build Names

  * Ensure both Figma and SDK uploads use the same `--buildName`
    * Verify builds are in the same project **Symptoms** :
  * "Invalid project token" error
  * Uploads fail with authentication errors **Solutions** :

Verify Project Token
    
    
       echo $PROJECT_TOKEN  
    

Ensure the token is set correctly and matches your SmartUI project.

Check Project Type

  * Ensure project is created as **CLI** type
    * Verify project exists in SmartUI dashboard If you encounter issues not covered here:
  * Review the [Comprehensive Troubleshooting Guide](https://www.testmuai.com/support/docs/smartui-troubleshooting-guide) for detailed solutions
  * Check [Figma-Web CLI Documentation](https://www.testmuai.com/support/docs/smartui-cli-figma-web) for web comparison workflows
  * Visit [TestMu AI Support](https://www.lambdatest.com/support) for additional resources
  * Contact support at [[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection#b5c6c0c5c5dac7c1f5c1d0c6c1d8c09bd4dc) or use [24/7 Chat Support](https://www.lambdatest.com/support)

## Additional Resources[â](https://www.testmuai.com/support/docs/smartui-cli-figma#additional-resources "Direct link to Additional Resources")

  * [Comprehensive Troubleshooting Guide](https://www.testmuai.com/support/docs/smartui-troubleshooting-guide)
  * [Figma-Web CLI Documentation](https://www.testmuai.com/support/docs/smartui-cli-figma-web)
  * [Figma-App CLI Documentation](https://www.testmuai.com/support/docs/smartui-cli-figma-app)
  * [Baseline Management](https://www.testmuai.com/support/docs/smartui-baseline-management)
  * [Running Your First Project](https://www.testmuai.com/support/docs/smartui-running-your-first-project)
  * [SmartUI API Documentation](https://www.lambdatest.com/support/api-doc/)

---

*Auto-generated from TestMu AI documentation.*