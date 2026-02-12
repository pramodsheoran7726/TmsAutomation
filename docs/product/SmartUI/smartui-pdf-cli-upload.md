# Upload PDFs via CLI

> **Source**: [https://www.testmuai.com/support/docs/smartui-pdf-cli-upload](https://www.testmuai.com/support/docs/smartui-pdf-cli-upload)

**Product**: SmartUI

**Last Crawled**: 2026-01-27T21:03:23.223052

---

On this page

## Prerequisites for Using SmartUI[â](https://www.testmuai.com/support/docs/smartui-pdf-cli-upload#prerequisites-for-using-smartui "Direct link to Prerequisites for Using SmartUI")

  * Familiarity with command-line tools is essential.
  * Visit the [`TestMu AI SmartUI`](https://smartui.lambdatest.com/) page and log in with your credentials.
  * Obtain your `LT_USERNAME` and `LT_ACCESS_KEY` by clicking on the `Access Key` button, located at the top right corner of your dashboard.

## Step 1: Establishing a SmartUI Project[â](https://www.testmuai.com/support/docs/smartui-pdf-cli-upload#step-1-establishing-a-smartui-project "Direct link to Step 1: Establishing a SmartUI Project")

To initiate a SmartUI PDF Comparison Project, adhere to the following instructions:

  1. Navigate to the [SmartUI Projects Page](https://smartui.lambdatest.com/).
  2. Tap on the `new project` button.
  3. Specify your platform type as `PDF`.
  4. Provide your `project` name, designate `approvers`, and add `tags` (optional).
  5. Confirm your entry by clicking on **Submit**.

Once your project is active, retrieve your `Project Token` from the application. Here's an example of a project token:
    
    
    projectToken = "123456#1234abcd-****-****-****-************"  
    

## Step 1: Install the SmartUI CLI[â](https://www.testmuai.com/support/docs/smartui-pdf-cli-upload#step-1-install-the-smartui-cli "Direct link to Step 1: Install the SmartUI CLI")

Install the CLI globally using npm:
    
    
    npm install -g @lambdatest/smartui-cli  
    

## Step 2: Setup your credentials[â](https://www.testmuai.com/support/docs/smartui-pdf-cli-upload#step-2-setup-your-credentials "Direct link to Step 2: Setup your credentials")

  * MacOS/Linux
  * Windows - CMD
  * PowerShell

    
    
    export LT_USERNAME="${YOUR_LAMBDATEST_USERNAME}"  
    export LT_ACCESS_KEY="${YOUR_LAMBDATEST_ACCESS_KEY}"  
    export PROJECT_TOKEN="123456#1234abcd-****-****-****-************"  
    
    
    
    set LT_USERNAME="${YOUR_LAMBDATEST_USERNAME}"  
    set LT_ACCESS_KEY="${YOUR_LAMBDATEST_ACCESS_KEY}"  
    set PROJECT_TOKEN="123456#1234abcd-****-****-****-************"  
    
    
    
    $env:LT_USERNAME="${YOUR_LAMBDATEST_USERNAME}"  
    $env:LT_ACCESS_KEY="${YOUR_LAMBDATEST_ACCESS_KEY}"  
    $env:PROJECT_TOKEN="123456#1234abcd-****-****-****-************"  
    

![cmd](https://www.testmuai.com/support/assets/images/project-token-primer-4998c6ef92e962af15f568191e5a59bd.webp)

## Step 3: Upload PDFs Using CLI[â](https://www.testmuai.com/support/docs/smartui-pdf-cli-upload#step-3-upload-pdfs-using-cli "Direct link to Step 3: Upload PDFs Using CLI")

Use the `upload-pdf` command to upload one or multiple PDF files from a directory:
    
    
    smartui upload-pdf <directory_or_filename> [options]  
    

### Arguments:[â](https://www.testmuai.com/support/docs/smartui-pdf-cli-upload#arguments "Direct link to Arguments:")

  * `directory_or_filename`: Path to a single PDF file or a directory containing multiple PDFs.

### Options:[â](https://www.testmuai.com/support/docs/smartui-pdf-cli-upload#options "Direct link to Options:")

  * `--fetch-results [filename]`: Fetch test results after upload. Optionally specify an output file (e.g., `results.json`).
  * `--buildName <string>`: Assign a custom name to the build.
  * `--projectToken <token>`: Specify the project token (if not set as environment variable).

### Example Usage:[â](https://www.testmuai.com/support/docs/smartui-pdf-cli-upload#example-usage "Direct link to Example Usage:")

Upload all PDFs from a folder and name the build:
    
    
    smartui upload-pdf ./pdfs/ --buildName "Release-v2.1"  
    

Upload a single PDF file:
    
    
    smartui upload-pdf ./document.pdf --buildName "Single-PDF-Test"  
    

Fetch results and save to a file:
    
    
    smartui upload-pdf ./spec.pdf --fetch-results results.json  
    

Upload with custom project token:
    
    
    smartui upload-pdf ./pdfs/ --projectToken "123456#1234abcd-****-****-****-************" --buildName "Custom-Build"  
    

## Advanced CLI Options[â](https://www.testmuai.com/support/docs/smartui-pdf-cli-upload#advanced-cli-options "Direct link to Advanced CLI Options")

### Batch Processing[â](https://www.testmuai.com/support/docs/smartui-pdf-cli-upload#batch-processing "Direct link to Batch Processing")

Process multiple directories:
    
    
    smartui upload-pdf ./documents/ --buildName "Batch-1"  
    smartui upload-pdf ./reports/ --buildName "Batch-2"  
    

### CI/CD Integration[â](https://www.testmuai.com/support/docs/smartui-pdf-cli-upload#cicd-integration "Direct link to CI/CD Integration")

Example for GitHub Actions:
    
    
    - name: Upload PDFs to SmartUI  
      run: |  
        smartui upload-pdf ./generated-pdfs/ --buildName "${{ github.sha }}" --fetch-results test-results.json  
    

## Use Cases[â](https://www.testmuai.com/support/docs/smartui-pdf-cli-upload#use-cases "Direct link to Use Cases")

  * **CI/CD Pipelines** : Integrate PDF testing into automated deployment workflows
  * **Batch Processing** : Upload multiple PDFs efficiently from command line
  * **Automated Testing** : Schedule PDF uploads as part of automated test suites
  * **Developer Workflows** : Quick PDF testing during development and debugging

## Best Practices[â](https://www.testmuai.com/support/docs/smartui-pdf-cli-upload#best-practices "Direct link to Best Practices")

  * PDF File Management
  * Project Token Management
  * Build Naming
  * Error Handling
  * Batch Processing

**PDF File Management**

  * Use consistent naming conventions for PDF files
  * Organize PDFs in logical directory structures
  * Verify PDF files are valid and not corrupted before upload
  * Keep PDF files in version control when appropriate

**Project Token Management**

  * Store project token as environment variable
  * Never commit tokens to version control
  * Use different tokens for different environments
  * Rotate tokens regularly

**Build Naming**

  * Use meaningful build names that include version info
  * Include date or version in build names
  * Use consistent naming conventions

**Example:**
    
    
     smartui upload-pdf ./pdfs/ --buildName Release-v1.0-$(date +%Y%m%d)"  
    

**Error Handling**

  * Always check CLI exit codes
  * Handle network failures gracefully
  * Implement retry logic for transient failures
  * Log errors for debugging

**Batch Processing**

  * Process PDFs in batches for efficiency
  * Monitor upload progress
  * Handle partial failures in batch operations
  * Use appropriate batch sizes

## Troubleshooting[â](https://www.testmuai.com/support/docs/smartui-pdf-cli-upload#troubleshooting "Direct link to Troubleshooting")

  * PDF Upload Fails
  * Project Not Found Error
  * CLI Command Not Found
  * Upload Returns Error
  * PDFs Not Appearing in Dashboard

**Issue: PDF Upload Fails**

**Symptoms** : CLI command fails or returns error

**Possible Causes** :

  * Invalid PDF file
  * File path incorrect
  * File size too large
  * Network connectivity issues
  * Project token incorrect
  * CLI not installed

**Solutions** :

  1. Verify PDF file is valid and not corrupted:
         
         file document.pdf  
         

  2. Check file path is correct:
         
         ls -la ./pdfs/  
         

  3. Verify file size is within limits

  4. Check network connectivity to TestMu AI servers

  5. Verify PROJECT_TOKEN is set correctly:
         
         echo $PROJECT_TOKEN  
         

  6. Verify SmartUI CLI is installed:
         
         smartui --version  
         

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

**Issue: CLI Command Not Found**

**Symptoms** : `smartui` command not recognized

**Possible Causes** :

  * CLI not installed
  * npm not available
  * PATH issues

**Solutions** :

  1. Install SmartUI CLI:
         
         npm install -g @lambdatest/smartui-cli  
         

  2. Verify npm is available:
         
         npm --version  
         

  3. Check PATH includes npm global bin directory

**Issue: Upload Returns Error**

**Symptoms** : CLI returns error status or failure message

**Possible Causes** :

  * Invalid command syntax
  * Missing required parameters
  * Authentication issues
  * Server-side processing error

**Solutions** :

  1. Verify command syntax matches documentation
  2. Check all required parameters are included
  3. Verify authentication credentials
  4. Review error message for specific details
  5. Retry upload if transient error

**Issue: PDFs Not Appearing in Dashboard**

**Symptoms** : Uploads complete but PDFs don't appear in SmartUI dashboard

**Possible Causes** :

  * Incorrect project token
  * Project name mismatch
  * Upload not completed
  * Dashboard refresh needed

**Solutions** :

  1. Verify PROJECT_TOKEN is correct
  2. Check project name matches exactly (case-sensitive)
  3. Wait a few moments and refresh dashboard
  4. Check CLI output for errors
  5. Use `--fetch-results` to verify upload status

**Getting Help**

If you encounter issues not covered here:

  * Review the [Comprehensive Troubleshooting Guide](https://www.testmuai.com/support/docs/smartui-troubleshooting-guide) for detailed solutions
  * Check [PDF Comparison Overview](https://www.testmuai.com/support/docs/smartui-pdf-comparison) for PDF-specific information
  * See [PDF API Upload](https://www.testmuai.com/support/docs/smartui-pdf-api-upload) for alternative upload methods
  * Visit [TestMu AI Support](https://www.lambdatest.com/support) for additional resources
  * Contact support at [[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection#463533363629343206322335322b3368272f) or use [24/7 Chat Support](https://www.lambdatest.com/support)

## Additional Resources[â](https://www.testmuai.com/support/docs/smartui-pdf-cli-upload#additional-resources "Direct link to Additional Resources")

  * [Comprehensive Troubleshooting Guide](https://www.testmuai.com/support/docs/smartui-troubleshooting-guide)
  * [PDF Comparison Overview](https://www.testmuai.com/support/docs/smartui-pdf-comparison)
  * [PDF API Upload](https://www.testmuai.com/support/docs/smartui-pdf-api-upload)
  * [PDF Java SDK Upload](https://www.testmuai.com/support/docs/smartui-pdf-java-sdk)
  * [Baseline Management](https://www.testmuai.com/support/docs/smartui-baseline-management)
  * [Running Your First Project](https://www.testmuai.com/support/docs/smartui-running-your-first-project)
  * [SmartUI API Documentation](https://www.lambdatest.com/support/api-doc/)

---

*Auto-generated from TestMu AI documentation.*