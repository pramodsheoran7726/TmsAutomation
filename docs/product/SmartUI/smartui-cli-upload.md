# Upload your Screenshots via CLI

> **Source**: [https://www.testmuai.com/support/docs/smartui-cli-upload](https://www.testmuai.com/support/docs/smartui-cli-upload)

**Product**: SmartUI

**Last Crawled**: 2026-01-27T21:03:10.777060

---

On this page

* * *

With SmartUI CLI, you can seamlessly perform visual regression testing on the TestMu AI platform using your command line, identifying Visual UI Regression bugs effortlessly. This guide will walk you through the process of uploading and comparing images using the SmartUI CLI.

## Prerequisites for running SmartUI CLI[â](https://www.testmuai.com/support/docs/smartui-cli-upload#prerequisites-for-running-smartui-cli "Direct link to Prerequisites for running SmartUI CLI")

  * Basic understanding of Command Line Interface is required.
  * Login to [TestMu AI SmartUI](https://smartui.lambdatest.com/) with your credentials.

The following steps will guide you in running your first Visual Regression test on TestMu AI platform using SmartUI CLI.

## Create a SmartUI Web-Project[â](https://www.testmuai.com/support/docs/smartui-cli-upload#create-a-smartui-web-project "Direct link to Create a SmartUI Web-Project")

The first step is to create a project with the application in which we will combine all your builds run on the project. To create a SmartUI Project, follow these steps:

  1. Go to [Projects page](https://smartui.lambdatest.com/)
  2. Click on the `new project` button
  3. Select the platform as **CLI** for executing your `CLI` tests.
  4. Add name of the project, approvers for the changes found, tags for any filter or easy navigation.
  5. Click on the **Submit**.

## Step 1: Install the Dependencies[â](https://www.testmuai.com/support/docs/smartui-cli-upload#step-1-install-the-dependencies "Direct link to Step 1: Install the Dependencies")

Install required NPM modules for `TestMu AI SmartUI CLI` globally or in your project:

**Global Installation (Recommended):**
    
    
    npm install -g @lambdatest/smartui-cli  
    

**Local Installation:**
    
    
    npm install @lambdatest/smartui-cli  
    

note

If you face any problems executing tests with SmartUI-CLI `versions >= v4.x.x`, upgrade your Node.js version to `v20.3` or above.

## Step 2: Configure your Project Token[â](https://www.testmuai.com/support/docs/smartui-cli-upload#step-2-configure-your-project-token "Direct link to Step 2: Configure your Project Token")

Setup your project token shown in the **SmartUI** app after creating your project.

  * MacOS/Linux
  * Windows - CMD
  * PowerShell

    
    
    export PROJECT_TOKEN="123456#1234abcd-****-****-****-************"  
    
    
    
    set PROJECT_TOKEN="123456#1234abcd-****-****-****-************"  
    
    
    
    $env:PROJECT_TOKEN="123456#1234abcd-****-****-****-************"  
    

![cmd](https://www.testmuai.com/support/assets/images/project-token-primer-4998c6ef92e962af15f568191e5a59bd.webp)

## Step 3: Upload the required directory of images[â](https://www.testmuai.com/support/docs/smartui-cli-upload#step-3-upload-the-required-directory-of-images "Direct link to Step 3: Upload the required directory of images")
    
    
    npx smartui upload <directoryName>  
    

The screenshots in the directory name will be uploaded to SmartUI.

### For ignoring the resolutions of the images[â](https://www.testmuai.com/support/docs/smartui-cli-upload#for-ignoring-the-resolutions-of-the-images "Direct link to For ignoring the resolutions of the images")

By default, SmartUI captures and considers image resolutions. If you prefer to ignore resolutions and compare images solely based on their names, use the following flag:
    
    
    npx smartui upload <directoryName> --ignoreResolutions  
    

### SmartUI CLI Upload Options[â](https://www.testmuai.com/support/docs/smartui-cli-upload#smartui-cli-upload-options "Direct link to SmartUI CLI Upload Options")

Please read the following table for more information about the options available to upload a directory of static images to SmartUI.

Config Key Shortcut| Configuration Key Â Â Â | Description| Usage Â Â Â   
---|---|---|---  
-R| \--ignoreResolutions| Ignores resolutions to compare only based on screenshot names| `npx smartui upload <directoryName> -R`  
-F| \--files `extensions`| Comma-separated list of allowed file extensions| `npx smartui upload <directoryName> -F jpg,png`  
-E| \--removeExtensions| Strips file extensions from snapshot names| `npx smartui upload <directoryName> -E`  
-i| \--ignoreDir `patterns`| Comma-separated list of directories to ignore| `npx smartui upload <directoryName> -i dir1/dir2,dir3`  
| \--fetch-results [filename]| Live fetched comparison results in a json file| `npx smartui upload <directoryName> --fetch-results [custom-results.json]`  
| \--buildName <string>| Specify a custom build name| `npx smartui upload <directoryName> --buildName "Build Name"`  
| \--userName <string>| Override TestMu AI username| `npx smartui upload <directoryName> --userName "user"`  
| \--accessKey <string>| Override TestMu AI access key| `npx smartui upload <directoryName> --accessKey "key"`  
| \--config <filepath>| Configuration file path| `npx smartui upload <directoryName> --config .smartui.json`  
  
note

You may use the `smartui upload --help` command in case you are facing issues during the execution of SmartUI Upload options in the CLI.

## Setup with Continuous Integration (CI)[â](https://www.testmuai.com/support/docs/smartui-cli-upload#setup-with-continuous-integration-ci "Direct link to Setup with Continuous Integration \(CI\)")

If you are using the Continuous Integration (CI) pipeline for your application and want to integrate `SmartUI CLI` execution then the following are the steps needs to be added to your `.yaml` file:
    
    
    steps:  
      - name: Running SmartUI CLI Tests  
        - run: |  
           npm install @lambdatest/smartui-cli  
           npx playwright install-deps  
           npx smartui upload <Directory Name> --removeExtensions  
    

## SmartUI CLI Options and Keys[â](https://www.testmuai.com/support/docs/smartui-cli-upload#smartui-cli-options-and-keys "Direct link to SmartUI CLI Options and Keys")

The following are supported `CLI (Command Line Interface)` options for Visual Regression Testing with SmartUI:

CLI Flag Key| Description| Usage  
---|---|---  
\--config| This is the reference configuration file containing the SmartUI Cloud Configuration| Optional  
\--help| This will print all help information for the SmartUI CLI options| Optional  
  
## View SmartUI Results[â](https://www.testmuai.com/support/docs/smartui-cli-upload#view-smartui-results "Direct link to View SmartUI Results")

You can see the SmartUI dashboard to view the results. This will help you identify the Mismatches from the existing `Baseline` build and do the required visual testing.

## Fetch results[â](https://www.testmuai.com/support/docs/smartui-cli-upload#fetch-results "Direct link to Fetch results")

You can fetch build results by adding the `--fetch-results` flag to your test execution command. Here are different ways to use this feature:

### Default Usage[â](https://www.testmuai.com/support/docs/smartui-cli-upload#default-usage "Direct link to Default Usage")

If no filename is specified, results will be stored in `results.json`:
    
    
    npx smartui upload <directoryName> --fetch-results  
    

### Custom Filename[â](https://www.testmuai.com/support/docs/smartui-cli-upload#custom-filename "Direct link to Custom Filename")

Specify a custom filename for your results:
    
    
    npx smartui upload <directoryName> --fetch-results custom-results.json  
    

## Adding a custom build name[â](https://www.testmuai.com/support/docs/smartui-cli-upload#adding-a-custom-build-name "Direct link to Adding a custom build name")

You can add a custom build name by adding the `--buildName` flag to your test execution command. Here is how you can utilise this feature:

Specify a custom build name to group your screenshots in the following way:
    
    
    npx smartui upload <directoryName>  --buildName "Sample Build Name"  
    

> Note:
> 
>   * If no build name is provided, a random name will be automatically assigned to the build.
>   * Specifying the name of an existing build within the project will append the screenshots to that build.
>   * Existing screenshots with the same name and configuration in the build will be overwritten during a re-run.
> 

![cmd](https://www.testmuai.com/support/assets/images/smartui-sdk-results-primer-eb737d32d53cdf404c62d2f63abd3a1b.webp)

## Additional Resources[â](https://www.testmuai.com/support/docs/smartui-cli-upload#additional-resources "Direct link to Additional Resources")

  * [Comprehensive Troubleshooting Guide](https://www.testmuai.com/support/docs/smartui-troubleshooting-guide)
  * [CLI Documentation](https://www.testmuai.com/support/docs/smartui-cli)
  * [CLI Exec Commands](https://www.testmuai.com/support/docs/smartui-cli-exec)
  * [Environment Variables](https://www.testmuai.com/support/docs/smartui-cli-env-variables)
  * [Baseline Management](https://www.testmuai.com/support/docs/smartui-baseline-management)
  * [Running Your First Project](https://www.testmuai.com/support/docs/smartui-running-your-first-project)
  * [SmartUI API Documentation](https://www.lambdatest.com/support/api-doc/)

---

*Auto-generated from TestMu AI documentation.*