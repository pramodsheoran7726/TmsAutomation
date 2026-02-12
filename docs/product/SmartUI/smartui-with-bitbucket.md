# Bitbucket Pipeline Integration with SmartUI

> **Source**: [https://www.testmuai.com/support/docs/smartui-with-bitbucket](https://www.testmuai.com/support/docs/smartui-with-bitbucket)

**Product**: SmartUI

**Last Crawled**: 2026-01-27T21:03:38.849202

---

On this page

Bitbucket is a web-based version control repository hosting service owned by Atlassian. It is primarily designed for development teams to manage their code, collaborate on projects, and streamline their workflows.

This document will show you how to integrate Bitbucket Pipeline with SmartUI to shorten your test cycles.

## Steps to Integrate Bitbucket Pipeline with SmartUI[â](https://www.testmuai.com/support/docs/smartui-with-bitbucket#steps-to-integrate-bitbucket-pipeline-with-smartui "Direct link to Steps to Integrate Bitbucket Pipeline with SmartUI")

To integrate Bitbucket Pipeline with SmartUI, follow the below steps. You can use your own project to configure and test it. For demo purposes, we are using the sample repository.

Sample repo

Download or Clone the code sample from the TestMu AI GitHub repository to run the tests on the SmartUI.

[![Image](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAECkAABApAfV44g8AAAAHdElNRQfmBBMLCwK6SluIAAAEDUlEQVRYw62YS2xUVRjHf3NmGGbolFbtQ1Gkj0BQGZsyWBaSphtJ2VRCkwkRUzEGWBHALtSFMSZNWLhw0xgXmCgucNGFbalhUbXhkVAzKJSGaptgSiahnco0UDozdh7XRafTe8+5d3rnjt9Zzf985/zueX3nO+PCnlVQz0vU8xx+IMkj5okyz7Kdxq4NPerZRzshGnkWPx5cgEaGJHH+5hZXiTBv81NNTNDKeSZIoRUpKSY4TyvCCWIP/cwV7V5f5uhnT2mAKnqZtQ1YK7P0UmUXEWSIbMkIDY0sQwTtIDqZcgRYK1N0boQI87AshIbGQ8LFEN3EykZoaMQ4YoVo58H/gtDQeEC7GaKBiM5pmUmiJSx/mlnuktApERpkhJcLhkaXqGUX7/MTSxsCnjDIOzRRx4BBv4BXXvCEweGDvO7nIEOskGORaW4wwgADjHCDaRbJscIwb7E5733K0EfCuAHqGDdUL/GmrjbAMY4TYhsBvLhx4yXANkIc5xiVhlV9auhnnLr1ytPkDJULpYaIwjH+x9BPjtMAAqilR4rGbjY5gmzCbfjtooeaVUgHLZJzJU2OII0EJKWFDhC46VK+2+MQ0oRHGdvbuKGZGWVT3mSHI8gObip9zdAMYZKS/JQuRwiALpal3pKEBfvxSY7XGXUMGeWapPjYL0zi/xUSjiEJrihaUNAoSUnuOEYATJCUlEZBjSQts1AWJKakSTWCLZKUJV0WJE1WUrYIZWe75dhZonmlUw8eoXB9bC0LslXZrRlBSh4c28uCbFcWICV4JElCiWSl2etKLhkXRBW3A2VMWCUHFC0qmFTEVtocQ9poVbRJQUTZshWcVBbPnm3mhBLs00QgSFSJnClOOoKcUoKtRpQg+Bk2Tc/eLfExIHiPBZOehvGv8s0TnS+UuGZtzXxpmjzl1uakoXBt3eEEn3G74PInn/MGVUXeYy6qaaOPaYucbHo9xevLS7N0Ai/yNZmCW5xxvuVjkyP6Mp/wHb+xWCTx61t331kYS5wPgQA/SM6XqVYgz3B5g9xyhp36BmcLee8SR4DXDBOQ5JDpZB2S8k5jyXLW6F7FiC6NqAUO6h5Df1BvCnmBv4pARtTHXYj7+coMPflJ/Ihv+Ipe9losfQXXLBH3CZk1OcrjvMN1nre1cX38bIF4zFHzJoJzhRM7wKu2IKOmiCTn9EdZfy/m6MfPp/iAbvYxyl3m+JcAKX4kY2tsAEn66Cdn7eDhjGHfZ0mj8ctqaLA1kjhnlCtdMReHlUe2fcgUh238XwPAbr43xNNflSvVDJLgIrttTyrgo5sxVvLNr1pC1nbXCmN0O7mFqgkzSAyNSxaPIjcX0YgxSNgk7OhWoLj52UsLY9yzqH+FDib4XUlNDfYf4zU3unVPZ4cAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDQtMTlUMTE6MTA6MjUrMDA6MDAAc6jkAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA0LTE5VDExOjEwOjI1KzAwOjAwcS4QWAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=) View on GitHub](https://github.com/amanchopra1905/smartui-ci-cd-integrations/tree/bitbucket)

### Step 1: Setup your Projects and Repository in Bitbucket[â](https://www.testmuai.com/support/docs/smartui-with-bitbucket#step-1-setup-your-projects-and-repository-in-bitbucket "Direct link to Step 1: Setup your Projects and Repository in Bitbucket")

  * Click on the **Create** >> **Project**.
  * Enter your Project details and click on **Create Project**.

![Create New Project](https://www.testmuai.com/support/assets/images/1-e56e5ac68dabdddb4c7d044986d9504f.png)

  * Now click on the **Create Repository** button. You can either create a new repository or import your existing repository.

![Create New Project](https://www.testmuai.com/support/assets/images/2-56e34620a3e6051d916257d271a051db.png)

### Step 2: Create a New Workflow[â](https://www.testmuai.com/support/docs/smartui-with-bitbucket#step-2-create-a-new-workflow "Direct link to Step 2: Create a New Workflow")

  * Navigate to the **Deployment** section. Select your required template for CI/CD workflow file. For the demo we are using the Test template.
  * Now, write your workflow YAML file. Here is the sample file for your reference.
  * Commit this yaml file in your repository and make the required changes in your code to automatically trigger the pipeline.

bitbucket-pipelines.yml
    
    
    loading...  
    

[View on GitHub](https://github.com/amanchopra1905/smartui-ci-cd-integrations/blob/bitbucket/bitbucket-pipelines.yml)

tip

You can also store your _LT_USERNAME_ , _LT_ACCESS_KEY_ and _PROJECT_TOKEN_ as secrets in your Bitbucket project repository.

### Step 3: Check the output[â](https://www.testmuai.com/support/docs/smartui-with-bitbucket#step-3-check-the-output "Direct link to Step 3: Check the output")

  * After triggering the workflow, check your results in the [SmartUI Dashboard](https://smartui.lambdatest.com/projects)

![Create New Project](https://www.testmuai.com/support/assets/images/3-e332f944a97f2050a0b1c7eab850f452.png)

## Best Practices[â](https://www.testmuai.com/support/docs/smartui-with-bitbucket#best-practices "Direct link to Best Practices")

  * Secret Management
  * Pipeline Optimization
  * Build Naming
  * Error Handling
  * Resource Management
  * Resource Management

**Secret Management**

  * Never commit credentials to repository
  * Use Bitbucket Pipelines Variables for all sensitive data
  * Rotate secrets regularly
  * Use different secrets for different environments

**Pipeline Optimization**

  * Use parallel steps for faster execution
  * Cache dependencies to speed up pipelines
  * Only run visual tests on relevant branches
  * Set up pipeline conditions to avoid unnecessary runs

**Example:**
    
    
     branches:  
      main:  
        - step:  
            name: Run Visual Tests  
    

**Build Naming**

  * Use meaningful build names that include branch/commit info
  * Include commit SHA for traceability
  * Use consistent naming conventions

**Example:**
    
    
     variables:  
      BUILD_NAME: $BITBUCKET_BRANCH-$BITBUCKET_COMMIT"  
    

**Error Handling**

  * Set up proper error handling in pipelines
  * Use pipeline status checks
  * Configure notifications for failures
  * Add retry logic for flaky tests

**Resource Management**

  * Limit concurrent pipeline runs
  * Clean up old builds regularly
  * Monitor pipeline execution time
  * Optimize test execution order

**Resource Management**

  * Limit concurrent pipeline runs
  * Clean up old builds regularly
  * Monitor pipeline execution time
  * Optimize test execution order

## Troubleshooting[â](https://www.testmuai.com/support/docs/smartui-with-bitbucket#troubleshooting "Direct link to Troubleshooting")

  * Pipeline Fails with Variable Not Found
  * PROJECT_TOKEN Not Available
  * Tests Run But No Results in Dashboard
  * Pipeline Times Out
  * Dependencies Installation Fails
  * SmartUI CLI Not Found

**Issue: Pipeline Fails with "Variable Not Found"**

**Symptoms** : Pipeline fails with error about missing variables

**Possible Causes** :

  * Variables not created in Bitbucket repository
  * Variable names don't match
  * Variables not accessible to pipeline

**Solutions** :

  1. Verify variables exist in repository settings:

     * Go to Repository Settings â Pipelines â Repository variables
     * Check `LT_USERNAME`, `LT_ACCESS_KEY`, and `PROJECT_TOKEN` exist
  2. Ensure variable names match exactly (case-sensitive)

  3. Check variable scope (repository, workspace, or deployment level)

  4. Verify variables are secured if needed

**Issue: PROJECT_TOKEN Not Available**

**Symptoms** : Pipeline prompts for PROJECT_TOKEN or token not found

**Possible Causes** :

  * PROJECT_TOKEN not set as repository variable
  * Variable not passed to step
  * Variable secured incorrectly

**Solutions** :

  1. Add PROJECT_TOKEN as Bitbucket Repository Variable

  2. Pass variable to step:
         
         variables:  
           PROJECT_TOKEN: $PROJECT_TOKEN  
         

  3. Check variable is secured if needed

  4. Verify variable scope includes your branch

**Issue: Tests Run But No Results in Dashboard**

**Symptoms** : Pipeline completes but screenshots don't appear in SmartUI

**Possible Causes** :

  * Incorrect PROJECT_TOKEN
  * Project name mismatch
  * Network issues
  * Pipeline step failure

**Solutions** :

  1. Verify PROJECT_TOKEN is correct:

     * Check token in SmartUI Project Settings
     * Ensure token includes project ID prefix
  2. Check pipeline logs for errors:
         
         after-script:  
           - echo Checking logs..."  
         

  3. Verify network connectivity in pipeline

  4. Check if SmartUI CLI step completed successfully

**Issue: Pipeline Times Out**

**Symptoms** : Pipeline execution exceeds time limit

**Possible Causes** :

  * Too many tests running
  * Slow test execution
  * Network latency
  * Resource constraints

**Solutions** :

  1. Increase pipeline timeout in Bitbucket settings

  2. Run tests in parallel using parallel steps:
         
         parallel:  
           - step:  
               name: Test Group 1  
           - step:  
               name: Test Group 2  
         

  3. Optimize test execution

  4. Split tests across multiple pipeline steps

**Issue: Dependencies Installation Fails**

**Symptoms** : npm install or dependency installation fails

**Possible Causes** :

  * Network issues
  * Package registry problems
  * Version conflicts
  * Node version mismatch

**Solutions** :

  1. Use specific Node version:
         
         image: node:18  
         

  2. Clear npm cache:
         
         script:  
           - npm cache clean --force  
           - npm install  
         

  3. Use package-lock.json for consistent installs

  4. Check for version conflicts in package.json

**Issue: SmartUI CLI Not Found**

**Symptoms** : `npx smartui` command fails with command not found"

**Possible Causes** :

  * Node.js not available in image
  * npm not available
  * PATH issues

**Solutions** :

  1. Ensure Node.js is available:
         
         image: node:18  
         

  2. Verify npm is available:
         
         script:  
           - npm --version  
         

  3. Install SmartUI CLI explicitly:
         
         script:  
           - npm install -g @lambdatest/smartui-cli  
         

**Getting Help**

If you encounter issues not covered here:

  * Review [Bitbucket Pipelines Documentation](https://support.atlassian.com/bitbucket-cloud/docs/get-started-with-bitbucket-pipelines/)
  * Check [SmartUI CLI Documentation](https://www.testmuai.com/support/docs/smartui-cli) for CLI-specific issues
  * Visit [TestMu AI Support](https://www.lambdatest.com/support) for additional resources
  * Contact support at [[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection#60131510100f121420140513140d154e0109) or use [24/7 Chat Support](https://www.lambdatest.com/support)

## Additional Resources[â](https://www.testmuai.com/support/docs/smartui-with-bitbucket#additional-resources "Direct link to Additional Resources")

  * [SmartUI CLI Documentation](https://www.testmuai.com/support/docs/smartui-cli)
  * [Bitbucket Pipelines Documentation](https://support.atlassian.com/bitbucket-cloud/docs/get-started-with-bitbucket-pipelines/)
  * [Project Settings](https://www.testmuai.com/support/docs/smartui-project-settings)
  * [Running Your First Project](https://www.testmuai.com/support/docs/smartui-running-your-first-project)

---

*Auto-generated from TestMu AI documentation.*