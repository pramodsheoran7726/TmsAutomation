# Upload PDFs via Java SDK

> **Source**: [https://www.testmuai.com/support/docs/smartui-pdf-java-sdk](https://www.testmuai.com/support/docs/smartui-pdf-java-sdk)

**Product**: SmartUI

**Last Crawled**: 2026-01-27T21:03:18.404440

---

On this page

## Prerequisites for Using SmartUI[â](https://www.testmuai.com/support/docs/smartui-pdf-java-sdk#prerequisites-for-using-smartui "Direct link to Prerequisites for Using SmartUI")

  * Java 8 or higher installed on your system
  * Maven or Gradle build tool
  * Familiarity with Java development
  * Visit the [`TestMu AI SmartUI`](https://smartui.lambdatest.com/) page and log in with your credentials.
  * Obtain your `LT_USERNAME` and `LT_ACCESS_KEY` by clicking on the `Access Key` button, located at the top right corner of your dashboard.

## Step 1: Establishing a SmartUI Project[â](https://www.testmuai.com/support/docs/smartui-pdf-java-sdk#step-1-establishing-a-smartui-project "Direct link to Step 1: Establishing a SmartUI Project")

To initiate a SmartUI PDF Comparison Project, adhere to the following instructions:

  1. Navigate to the [SmartUI Projects Page](https://smartui.lambdatest.com/).
  2. Tap on the `new project` button.
  3. Specify your platform type as `PDF`.
  4. Provide your `project` name, designate `approvers`, and add `tags` (optional).
  5. Confirm your entry by clicking on **Submit**.

Once your project is active, retrieve your `Project Token` from the application. Here's an example of a project token:
    
    
    projectToken = "123456#1234abcd-****-****-****-************"  
    

## Step 1: Clone the Sample Project[â](https://www.testmuai.com/support/docs/smartui-pdf-java-sdk#step-1-clone-the-sample-project "Direct link to Step 1: Clone the Sample Project")

First, clone the sample project to get started:
    
    
    git clone https://github.com/LambdaTest/junit-selenium-sample.git  
    cd junit-selenium-sample  
    

## Step 2: Install the SmartUI Java SDK[â](https://www.testmuai.com/support/docs/smartui-pdf-java-sdk#step-2-install-the-smartui-java-sdk "Direct link to Step 2: Install the SmartUI Java SDK")

Add the SmartUI Java SDK to your `pom.xml`:
    
    
    <dependency>  
        <groupId>io.github.lambdatest</groupId>  
        <artifactId>lambdatest-java-sdk</artifactId>  
        <version>1.0.18</version>  
    </dependency>  
    

Then compile your project:
    
    
    mvn clean compile  
    

## Step 3: Set up your credentials[â](https://www.testmuai.com/support/docs/smartui-pdf-java-sdk#step-3-set-up-your-credentials "Direct link to Step 3: Set up your credentials")

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
    

## Step 4: Upload PDFs using Java SDK[â](https://www.testmuai.com/support/docs/smartui-pdf-java-sdk#step-4-upload-pdfs-using-java-sdk "Direct link to Step 4: Upload PDFs using Java SDK")

You can upload PDFs in two modes:

  * Local Mode
  * Cloud Mode

Upload pre-existing PDFs from your local machine:

"> ð **Sample File** : [`SmartuiPdfLocalTest.java`](https://github.com/LambdaTest/junit-selenium-sample/blob/master/src/test/java/com/smartuiPdf/SmartuiPdfLocalTest.java)
    
    
      
    public class SmartuiPdfLocalTest {  
        public void uploadLocalPdf() throws Exception {  
            String projectToken = System.getenv(PROJECT_TOKEN");  
      
            SmartUIConfig config = new SmartUIConfig()  
                .withProjectToken(projectToken)  
                .withFetchResult(true);  
      
            SmartUIPdf pdfUploader = new SmartUIPdf(config);  
      
            // Upload PDF file  
            String pdfPath = "path/to/your/document.pdf";  
            FormattedResults result = pdfUploader.uploadPDF(pdfPath);  
      
            System.out.println("Upload result: " + result);  
        }  
    }  
    

Upload PDFs downloaded during TestMu AI cloud test execution:

"> ð **Sample File** : [`SmartuiPdfCloudTest.java`](https://github.com/LambdaTest/junit-selenium-sample/blob/master/src/test/java/com/smartuiPdf/SmartuiPdfCloudTest.java)
    
    
      
    public class SmartuiPdfCloudTest {  
        public void uploadCloudPdf(WebDriver driver) throws Exception {  
            String projectToken = System.getenv(PROJECT_TOKEN");  
      
            // Download PDF from cloud session  
            String base64Content = (String) ((JavaScriptExecutor) driver)  
                .executeAsyncScript("lambda-file-content=LambdaTest.pdf");  
      
            // Convert base64 to PDF file  
            byte[] pdfBytes = Base64.getDecoder().decode(base64Content);  
            File pdfFile = new File("downloaded.pdf");  
            try (FileOutputStream fos = new FileOutputStream(pdfFile)) {  
                fos.write(pdfBytes);  
            }  
      
            // Upload to SmartUI  
            SmartUIConfig config = new SmartUIConfig()  
                .withProjectToken(projectToken)  
                .withFetchResult(true);  
      
            SmartUIPdf pdfUploader = new SmartUIPdf(config);  
            FormattedResults result = pdfUploader.uploadPDF(pdfFile.getAbsolutePath());  
      
            System.out.println("Upload result: " + result);  
        }  
    }  
    

## Step 5: Configuration Options[â](https://www.testmuai.com/support/docs/smartui-pdf-java-sdk#step-5-configuration-options "Direct link to Step 5: Configuration Options")

Method| Description  
---|---  
`.withProjectToken(token)`| Required. Your SmartUI project token.  
`.withFetchResult(true)`| Optional. Returns structured test results.  
`.withBuildName("v2.1")`| Optional. Assign a custom build name.  
  
## Step 6: Run your tests[â](https://www.testmuai.com/support/docs/smartui-pdf-java-sdk#step-6-run-your-tests "Direct link to Step 6: Run your tests")
    
    
    mvn test  
    

## Advanced Java SDK Usage[â](https://www.testmuai.com/support/docs/smartui-pdf-java-sdk#advanced-java-sdk-usage "Direct link to Advanced Java SDK Usage")

### Batch Upload Example[â](https://www.testmuai.com/support/docs/smartui-pdf-java-sdk#batch-upload-example "Direct link to Batch Upload Example")
    
    
    public class SmartuiPdfBatchTest {  
        public void uploadMultiplePdfs() throws Exception {  
            String projectToken = System.getenv("PROJECT_TOKEN");  
      
            SmartUIConfig config = new SmartUIConfig()  
                .withProjectToken(projectToken)  
                .withFetchResult(true)  
                .withBuildName("Batch-Upload-v1.0");  
      
            SmartUIPdf pdfUploader = new SmartUIPdf(config);  
      
            String[] pdfPaths = {  
                "documents/report1.pdf",  
                "documents/report2.pdf",  
                "documents/specification.pdf"  
            };  
      
            for (String pdfPath : pdfPaths) {  
                FormattedResults result = pdfUploader.uploadPDF(pdfPath);  
                System.out.println("Uploaded " + pdfPath + ": " + result);  
            }  
        }  
    }  
    

### Error Handling[â](https://www.testmuai.com/support/docs/smartui-pdf-java-sdk#error-handling "Direct link to Error Handling")
    
    
    public class SmartuiPdfErrorHandling {  
        public void uploadWithErrorHandling() {  
            try {  
                String projectToken = System.getenv("PROJECT_TOKEN");  
      
                SmartUIConfig config = new SmartUIConfig()  
                    .withProjectToken(projectToken)  
                    .withFetchResult(true);  
      
                SmartUIPdf pdfUploader = new SmartUIPdf(config);  
                FormattedResults result = pdfUploader.uploadPDF("document.pdf");  
      
                System.out.println("Upload successful: " + result);  
      
            } catch (Exception e) {  
                System.err.println("Upload failed: " + e.getMessage());  
                e.printStackTrace();  
            }  
        }  
    }  
    

## Use Cases[â](https://www.testmuai.com/support/docs/smartui-pdf-java-sdk#use-cases "Direct link to Use Cases")

  * **Enterprise Applications** : Integrate PDF testing into large-scale Java applications
  * **Test Automation Frameworks** : Build comprehensive test suites with PDF validation
  * **CI/CD Integration** : Automate PDF testing in Java-based deployment pipelines
  * **Custom Tools** : Develop specialized tools for PDF comparison and validation

## Best Practices[â](https://www.testmuai.com/support/docs/smartui-pdf-java-sdk#best-practices "Direct link to Best Practices")

  * PDF File Management
  * Project Token Management
  * Build Naming
  * Error Handling
  * Batch Processing
  * Batch Processing

**PDF File Management**

  * Use consistent naming conventions for PDF files
  * Organize PDFs in logical directory structures
  * Keep PDF files in version control when appropriate
  * Document PDF sources and purposes

**Example:**
    
    
     String[] pdfPaths = {  
        documents/reports/report-v1.0.pdf",  
        "documents/specs/spec-v2.1.pdf"  
    };  
    

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
    
    
     config.withBuildName(PDF-Comparison-v1.0-" + LocalDate.now());  
    

**Error Handling**

  * Always wrap upload calls in try-catch blocks
  * Log errors for debugging
  * Handle network failures gracefully
  * Implement retry logic for transient failures

**Batch Processing**

  * Process PDFs in batches for efficiency
  * Monitor upload progress
  * Handle partial failures in batch operations
  * Use appropriate batch sizes

**Batch Processing**

  * Process PDFs in batches for efficiency
  * Monitor upload progress
  * Handle partial failures in batch operations
  * Use appropriate batch sizes

## Troubleshooting[â](https://www.testmuai.com/support/docs/smartui-pdf-java-sdk#troubleshooting "Direct link to Troubleshooting")

  * PDF Upload Fails
  * Project Not Found Error
  * Upload Returns Null or Empty Result
  * Maven Dependencies Not Resolving
  * Batch Upload Partially Fails
  * PDFs Not Appearing in Dashboard

**Issue: PDF Upload Fails**

**Symptoms** : PDF upload returns error or fails silently

**Possible Causes** :

  * Invalid PDF file
  * File path incorrect
  * File size too large
  * Network connectivity issues
  * Project token incorrect

**Solutions** :

  1. Verify PDF file is valid and not corrupted:
         
         file document.pdf  
         

  2. Check file path is correct:
         
         File pdfFile = new File(path/to/document.pdf");  
         if (!pdfFile.exists()) {  
             throw new FileNotFoundException("PDF file not found");  
         }  
         

  3. Verify file size is within limits

  4. Check network connectivity to TestMu AI servers

  5. Verify PROJECT_TOKEN is set correctly:
         
         echo $PROJECT_TOKEN  
         

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

**Issue: Upload Returns Null or Empty Result**

**Symptoms** : Upload completes but result is null or empty

**Possible Causes** :

  * `withFetchResult(false)` or not set
  * Network timeout
  * Server-side processing error

**Solutions** :

  1. Enable result fetching:
         
         config.withFetchResult(true);  
         

  2. Check upload response:
         
         FormattedResults result = pdfUploader.uploadPDF(pdfPath);  
         if (result == null) {  
             // Handle null result  
         }  
         

  3. Review error logs for server-side issues

  4. Retry upload if transient error

**Issue: Maven Dependencies Not Resolving**

**Symptoms** : Maven cannot find `lambdatest-java-sdk` or dependencies fail

**Possible Causes** :

  * Incorrect dependency version
  * Maven repository access issues
  * Network connectivity problems

**Solutions** :

  1. Check latest version on [Maven Central](https://mvnrepository.com/artifact/io.github.lambdatest/lambdatest-java-sdk)
  2. Clear Maven cache:
         
         mvn clean  
         

  3. Verify internet connectivity for Maven repository access
  4. Check pom.xml for version conflicts

**Issue: Batch Upload Partially Fails**

**Symptoms** : Some PDFs upload successfully, others fail

**Possible Causes** :

  * Individual file issues
  * Network interruptions
  * Timeout issues
  * File size limits

**Solutions** :

  1. Implement individual error handling:
         
         for (String pdfPath : pdfPaths) {  
             try {  
                 FormattedResults result = pdfUploader.uploadPDF(pdfPath);  
                 System.out.println(Uploaded: " + pdfPath);  
             } catch (Exception e) {  
                 System.err.println("Failed: " + pdfPath + " - " + e.getMessage());  
             }  
         }  
         

  2. Verify each file individually

  3. Check file sizes and formats

  4. Implement retry logic for failed uploads

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
  4. Check upload response for errors
  5. Review test execution logs

**Getting Help**

If you encounter issues not covered here:

  * Review the [Comprehensive Troubleshooting Guide](https://www.testmuai.com/support/docs/smartui-troubleshooting-guide) for detailed solutions
  * Check [PDF Comparison Overview](https://www.testmuai.com/support/docs/smartui-pdf-comparison) for PDF-specific information
  * See [PDF API Upload](https://www.testmuai.com/support/docs/smartui-pdf-api-upload) for alternative upload methods
  * Visit [TestMu AI Support](https://www.lambdatest.com/support) for additional resources
  * Contact support at [[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection#31424441415e434571455442455c441f5058) or use [24/7 Chat Support](https://www.lambdatest.com/support)

## Additional Resources[â](https://www.testmuai.com/support/docs/smartui-pdf-java-sdk#additional-resources "Direct link to Additional Resources")

  * [Comprehensive Troubleshooting Guide](https://www.testmuai.com/support/docs/smartui-troubleshooting-guide)
  * [PDF Comparison Overview](https://www.testmuai.com/support/docs/smartui-pdf-comparison)
  * [PDF API Upload](https://www.testmuai.com/support/docs/smartui-pdf-api-upload)
  * [PDF CLI Upload](https://www.testmuai.com/support/docs/smartui-pdf-cli-upload)
  * [Baseline Management](https://www.testmuai.com/support/docs/smartui-baseline-management)
  * [Running Your First Project](https://www.testmuai.com/support/docs/smartui-running-your-first-project)
  * [SmartUI API Documentation](https://www.lambdatest.com/support/api-doc/)

---

*Auto-generated from TestMu AI documentation.*