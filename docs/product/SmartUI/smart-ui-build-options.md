# Build Configuration and Options for Smart UI

> **Source**: [https://www.testmuai.com/support/docs/smart-ui-build-options](https://www.testmuai.com/support/docs/smart-ui-build-options)

**Product**: SmartUI

**Last Crawled**: 2026-01-27T21:02:51.043973

---

On this page

* * *

Using the TestMu AI platform, perform regression testing in just one click and explore various possible solutions for grouping your screenshots into different builds and map as per your testing suite needs.

## Enabling build mapping for multiple screenshots[â](https://www.testmuai.com/support/docs/smart-ui-build-options#enabling-build-mapping-for-multiple-screenshots "Direct link to Enabling build mapping for multiple screenshots")

If you have multiple screenshots running the same test suite and want to run the comparison for the same test suite. We have to enable the mapping with the `smartUI.build` to be added your capabilities.

  * Selenium
  * Cypress
  * Playwright
  * Puppeteer
  * K6

Please add the following to your capabilities configuration
    
    
    let capabilities = {  
        "smartUI.build": <Your_Build_Name> // Please add your build name of choice here  
    }  
    

Please make the changes in lambdatest-config.json
    
    
    "smart_ui": {  
          "build": <Your_Build_Name> // Please add your build name of choice here  
    }  
    

Please add the following in <LT:Options> in your capabilities configuration 
    
    
      
    const capabilities = {  
    'LT:Options': {  
          "smartUIBuildName": <Your_Build_Name> // Please add your build name of choice here  
          
    }}  
    

Please add the following in <LT:Options> in your capabilities configuration 
    
    
      
    const capabilities = {  
    'LT:Options': {  
          "smartUIBuildName": <Your_Build_Name> // Please add your build name of choice here  
          
    }}  
    

Please add the following in <LT:Options> in your capabilities configuration 
    
    
      
    const capabilities = {  
    'LT:Options': {  
          "smartUIBuildName": <Your_Build_Name> // Please add your build name of choice here  
          
    }}  
    

* * *

## Enabling build as a baseline[â](https://www.testmuai.com/support/docs/smart-ui-build-options#enabling-build-as-a-baseline "Direct link to Enabling build as a baseline")

If you want to mark your build as a baseline from your test suite while executing tests then you have to enable the below mentioned capability configuration needs to be enabled.

  * Selenium
  * Cypress
  * Playwright
  * Puppeteer
  * K6

Please add the following to your capabilities configuration
    
    
    let capabilities = {  
      "smartUI.baseline": true / false, // Enable if you want to update to a new baseline build  
    };  
    

Please make the changes in lambdatest-config.json
    
    
    "smart_ui": {  
          "baseline": true/false // Enable if you want to update to a new baseline build  
    }  
    

Please add the following in <LT:Options> in your capabilities configuration 
    
    
      
    const capabilities = {  
    'LT:Options': {  
          "smartUIBaseline": true // Please add if you want to make this build as baseline  
          
    }}  
    

Please add the following in <LT:Options> in your capabilities configuration 
    
    
      
    const capabilities = {  
    'LT:Options': {  
          "smartUIBaseline": true // Please add if you want to make this build as baseline  
          
    }}  
    

Please add the following in <LT:Options> in your capabilities configuration 
    
    
      
    const capabilities = {  
    'LT:Options': {  
          "smartUIBaseline": true // Please add if you want to make this build as baseline  
          
    }}  
    

* * *

## Build Features[â](https://www.testmuai.com/support/docs/smart-ui-build-options#build-features "Direct link to Build Features")

The following are the list of features that are available for the build process in SmartUI:

  * All the screenshots are grouped together as a one build.
  * The screenshots are mapped from the **baseline** to the **Comparison screenshot** in the same sequential pattern as per the baseline build.
  * Add additional screenshots if needed for the existing build by using the same build name in the capabilities. This will add new screenshots to the build.
  * You can also update any build of choice as a new **Baseline** build.

info

We currently only support one baseline for one project in our current version. We recommend you to create a new project for multiple baseline builds

* * *

## Build Status Information[â](https://www.testmuai.com/support/docs/smart-ui-build-options#build-status-information "Direct link to Build Status Information")

We are provide multiple build status options for the project owners to check the status of builds and take required actions to the screenshots by the approver(s).

![cmd](https://www.testmuai.com/support/assets/images/build-status-dotlapse-5fc280b2c982069a1ea4b585c38932de.webp)

---

*Auto-generated from TestMu AI documentation.*