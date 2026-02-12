# Getting Started with TestMu AI's SmartUI Figma-App CLI

> **Source**: [https://www.testmuai.com/support/docs/smartui-cli-figma-app](https://www.testmuai.com/support/docs/smartui-cli-figma-app)

**Product**: SmartUI

**Last Crawled**: 2026-01-27T21:04:11.655226

---

On this page

* * *

SmartUI Figma-App CLI lets you compare **mobile app screenshots captured on real devices** with your **Figma design frames** to detect visual mismatches and ensure accurate implementation of mobile UI.

* * *

## Prerequisites[â](https://www.testmuai.com/support/docs/smartui-cli-figma-app#prerequisites "Direct link to Prerequisites")

  * Node.js and npm installed
  * TestMu AI SmartUI account with App Automation plan
  * Real device screenshots captured via Appium, SDK, or SmartUI platform
  * Figma Personal Access Token ([how to get one](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens))

* * *

## Understanding Figma Tokens[â](https://www.testmuai.com/support/docs/smartui-cli-figma-app#understanding-figma-tokens "Direct link to Understanding Figma Tokens")

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

## Step-by-Step Guide[â](https://www.testmuai.com/support/docs/smartui-cli-figma-app#step-by-step-guide "Direct link to Step-by-Step Guide")

### 1\. Create a SmartUI Project[â](https://www.testmuai.com/support/docs/smartui-cli-figma-app#1-create-a-smartui-project "Direct link to 1. Create a SmartUI Project")

  1. Visit [smartui.lambdatest.com](https://smartui.lambdatest.com)
  2. Click **New Project**
  3. Select **Real Devices** as the platform
  4. Enter:
     * Project Name
     * Approvers (optional)
     * Tags (optional)
  5. Click **Submit**

* * *

### 2\. Install SmartUI CLI[â](https://www.testmuai.com/support/docs/smartui-cli-figma-app#2-install-smartui-cli "Direct link to 2. Install SmartUI CLI")
    
    
    npm install @lambdatest/smartui-cli  
    

* * *

### 3\. Generate and Edit Configuration[â](https://www.testmuai.com/support/docs/smartui-cli-figma-app#3-generate-and-edit-configuration "Direct link to 3. Generate and Edit Configuration")

Run the following to create your initial design file:
    
    
    npx smartui config:create-figma-app designs.json  
    

#### Sample `designs.json`[â](https://www.testmuai.com/support/docs/smartui-cli-figma-app#sample-designsjson "Direct link to sample-designsjson")

designs.json
    
    
    {  
      "mobile": [  
        {  
          "name": "Pixel 8",  
          "platform": ["Android 14"],  
          "orientation": "portrait"  
        }  
      ],  
      "figma": {  
        "depth": 2,  
        "configs": [  
          {  
            "figma_file_token": "abc12345",  
            "figma_ids": ["2417-58969"],  
            "screenshot_names": ["homepage"]  
          }  
        ]  
      }  
    }  
    

* * *

### 4\. Set Environment Variables[â](https://www.testmuai.com/support/docs/smartui-cli-figma-app#4-set-environment-variables "Direct link to 4. Set Environment Variables")
    
    
    export PROJECT_TOKEN="your_smartui_project_token"  
    export FIGMA_TOKEN="your_figma_personal_token"  
    

* * *

### 5\. Run the Comparison[â](https://www.testmuai.com/support/docs/smartui-cli-figma-app#5-run-the-comparison "Direct link to 5. Run the Comparison")
    
    
    npx smartui upload-figma-app designs.json  
    

#### Optional Flags[â](https://www.testmuai.com/support/docs/smartui-cli-figma-app#optional-flags "Direct link to Optional Flags")

Flag| Description  
---|---  
`--markBaseline`| Mark this build as a new baseline for future runs  
`--buildName`| Assign a custom name to this comparison build  
  
#### Example[â](https://www.testmuai.com/support/docs/smartui-cli-figma-app#example "Direct link to Example")
    
    
    npx smartui upload-figma-app designs.json --buildName "v1.0.0" --markBaseline  
    

* * *

### View SmartUI Results[â](https://www.testmuai.com/support/docs/smartui-cli-figma-app#view-smartui-results "Direct link to View SmartUI Results")

You can see the SmartUI dashboard to view the results. This will help you identify the Mismatches from the existing `Baseline` build and do the required visual testing.

![cmd](https://www.testmuai.com/support/assets/images/smartui-sdk-results-primer-eb737d32d53cdf404c62d2f63abd3a1b.webp)

## Best Practices[â](https://www.testmuai.com/support/docs/smartui-cli-figma-app#best-practices "Direct link to Best Practices")

  * Build Names
  * Screenshot Names
  * Device Names
  * Device Names

**Build Names**
    
    
       npx smartui upload-figma-app designs.json --buildName "v1.0.0"  
    

**Screenshot Names**

  * Good: `homepage-screen`, `login-form`, `dashboard-tab`
    * Avoid: `test1`, `screenshot`, `design-1`
    * Ensure `screenshot_names` in your config match the order of `figma_ids`

**Device Names**

**Screenshot Naming for SDK Comparisons**

**Critical** : When comparing Figma designs with app screenshots captured via SDKs, add `.png` extension to your SDK screenshot names.

Figma-uploaded screenshots automatically have `.png` appended (e.g., `homepage.png`), so your SDK screenshots must match:

**In your Appium/SDK code:**
    
    
     // â Wrong - will not match Figma screenshot  
    driver.execute("smartui.takeScreenshot", {name: "homepage"});  
      
    // â Correct - matches Figma screenshot name  
    driver.execute("smartui.takeScreenshot", {name: "homepage.png"});  
    

**Example for different frameworks:**

  * Appium
  * Appium Java

    
    
    // JavaScript  
    await driver.execute("smartui.takeScreenshot", {name: "homepage.png"});  
    
    
    
    // Java  
    driver.execute("smartui.takeScreenshot", Map.of("name", "homepage.png"));  
    

This ensures that Figma screenshots (e.g., `homepage.png`) match app screenshots (e.g., `homepage.png`) in the same build.

**Device Names**

**Screenshot Naming for SDK Comparisons**

**Critical** : When comparing Figma designs with app screenshots captured via SDKs, add `.png` extension to your SDK screenshot names.

Figma-uploaded screenshots automatically have `.png` appended (e.g., `homepage.png`), so your SDK screenshots must match:

**In your Appium/SDK code:**
    
    
     // â Wrong - will not match Figma screenshot  
    driver.execute("smartui.takeScreenshot", {name: "homepage"});  
      
    // â Correct - matches Figma screenshot name  
    driver.execute("smartui.takeScreenshot", {name: "homepage.png"});  
    

**Example for different frameworks:**

  * Appium
  * Appium Java

    
    
    // JavaScript  
    await driver.execute("smartui.takeScreenshot", {name: "homepage.png"});  
    
    
    
    // Java  
    driver.execute("smartui.takeScreenshot", Map.of("name", "homepage.png"));  
    

This ensures that Figma screenshots (e.g., `homepage.png`) match app screenshots (e.g., `homepage.png`) in the same build.

## Troubleshooting[â](https://www.testmuai.com/support/docs/smartui-cli-figma-app#troubleshooting "Direct link to Troubleshooting")

  * Verify Figma Token
  * Check File Token
  * Validate Node IDs
  * Check Screenshot Names
  * Verify Device Sizes
  * Check Build Names
  * Project Type
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
  * Figma screenshots don't match app screenshots
  * Comparison shows mismatches even when designs are identical **Solutions** :

Check Screenshot Names

  * Ensure SDK screenshots include `.png` extension (e.g., `homepage.png`)
    * Verify screenshot names match exactly between Figma config and SDK code
    * Ensure `screenshot_names` array matches the order of `figma_ids`

Verify Device Sizes

  * Ensure device dimensions match Figma frame sizes
    * Check that device names in config match actual device capabilities
    * Verify orientation (portrait/landscape) matches between Figma and device

Check Build Names

  * Ensure both Figma and SDK uploads use the same `--buildName`
    * Verify builds are in the same project

Project Type

  * Ensure project is created as **Real Devices** type (not CLI)
    * Verify project exists in SmartUI dashboard **Symptoms** :
  * "Invalid project token" error
  * Uploads fail with authentication errors **Solutions** :

Verify Project Token
    
    
       echo $PROJECT_TOKEN  
    

Ensure the token is set correctly and matches your SmartUI project.

Check Project Type

  * Ensure project is created as **Real Devices** type
    * Verify project exists in SmartUI dashboard If you encounter issues not covered here:
  * Review the [Comprehensive Troubleshooting Guide](https://www.testmuai.com/support/docs/smartui-troubleshooting-guide) for detailed solutions
  * Check [Figma CLI Documentation](https://www.testmuai.com/support/docs/smartui-cli-figma) for basic Figma workflows
  * Check [Figma-Web CLI Documentation](https://www.testmuai.com/support/docs/smartui-cli-figma-web) for web comparison workflows
  * Visit [TestMu AI Support](https://www.lambdatest.com/support) for additional resources
  * Contact support at [[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection#a4d7d1d4d4cbd6d0e4d0c1d7d0c9d18ac5cd) or use [24/7 Chat Support](https://www.lambdatest.com/support)

## Additional Resources[â](https://www.testmuai.com/support/docs/smartui-cli-figma-app#additional-resources "Direct link to Additional Resources")

  * [Comprehensive Troubleshooting Guide](https://www.testmuai.com/support/docs/smartui-troubleshooting-guide)
  * [Figma CLI Documentation](https://www.testmuai.com/support/docs/smartui-cli-figma)
  * [Figma-Web CLI Documentation](https://www.testmuai.com/support/docs/smartui-cli-figma-web)
  * [Appium Hooks Documentation](https://www.testmuai.com/support/docs/smartui-appium-hooks)
  * [Baseline Management](https://www.testmuai.com/support/docs/smartui-baseline-management)
  * [Running Your First Project](https://www.testmuai.com/support/docs/smartui-running-your-first-project)
  * [SmartUI API Documentation](https://www.lambdatest.com/support/api-doc/)
  * [How to generate a Figma token](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens)
  * [SmartUI CLI Docs](https://www.testmuai.com/support/docs/smartui-cli/)
  * [Appium + SmartUI Node Sample](https://github.com/LambdaTest/smartui-appium-nodejs)

* * *

**Run seamless visual comparisons between real device screenshots and Figma designs with SmartUI CLI. Start validating your mobile UI today!**

---

*Auto-generated from TestMu AI documentation.*