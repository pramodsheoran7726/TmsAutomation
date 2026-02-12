# GitHub Actions Pipeline Integration with SmartUI

> **Source**: [https://www.testmuai.com/support/docs/smartui-with-github-actions](https://www.testmuai.com/support/docs/smartui-with-github-actions)

**Product**: SmartUI

**Last Crawled**: 2026-01-27T21:03:58.740472

---

On this page  
  
GitHub Actions is a powerful automation and continuous integration/continuous delivery (CI/CD) platform built into GitHub. It allows you to create custom automated YAML workflows directly within your GitHub repositories. This helps you to build and test every pull request to your repository, or deploy merged pull requests to production.

This document will show you how to integrate GitHub Actions Pipeline with SmartUI to greatly shorten your test cycles.

## Steps to Integrate GitHub Actions Pipeline with SmartUI[â](https://www.testmuai.com/support/docs/smartui-with-github-actions#steps-to-integrate-github-actions-pipeline-with-smartui "Direct link to Steps to Integrate GitHub Actions Pipeline with SmartUI")

To integrate GitHub Actions Pipeline with SmartUI, follow the below steps. You can use your own project to configure and test it. For demo purposes, we are using the sample repository.

Sample repo

Download or Clone the code sample from the TestMu AI GitHub repository to run the tests on the SmartUI.

[![Image](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAECkAABApAfV44g8AAAAHdElNRQfmBBMLCwK6SluIAAAEDUlEQVRYw62YS2xUVRjHf3NmGGbolFbtQ1Gkj0BQGZsyWBaSphtJ2VRCkwkRUzEGWBHALtSFMSZNWLhw0xgXmCgucNGFbalhUbXhkVAzKJSGaptgSiahnco0UDozdh7XRafTe8+5d3rnjt9Zzf985/zueX3nO+PCnlVQz0vU8xx+IMkj5okyz7Kdxq4NPerZRzshGnkWPx5cgEaGJHH+5hZXiTBv81NNTNDKeSZIoRUpKSY4TyvCCWIP/cwV7V5f5uhnT2mAKnqZtQ1YK7P0UmUXEWSIbMkIDY0sQwTtIDqZcgRYK1N0boQI87AshIbGQ8LFEN3EykZoaMQ4YoVo58H/gtDQeEC7GaKBiM5pmUmiJSx/mlnuktApERpkhJcLhkaXqGUX7/MTSxsCnjDIOzRRx4BBv4BXXvCEweGDvO7nIEOskGORaW4wwgADjHCDaRbJscIwb7E5733K0EfCuAHqGDdUL/GmrjbAMY4TYhsBvLhx4yXANkIc5xiVhlV9auhnnLr1ytPkDJULpYaIwjH+x9BPjtMAAqilR4rGbjY5gmzCbfjtooeaVUgHLZJzJU2OII0EJKWFDhC46VK+2+MQ0oRHGdvbuKGZGWVT3mSHI8gObip9zdAMYZKS/JQuRwiALpal3pKEBfvxSY7XGXUMGeWapPjYL0zi/xUSjiEJrihaUNAoSUnuOEYATJCUlEZBjSQts1AWJKakSTWCLZKUJV0WJE1WUrYIZWe75dhZonmlUw8eoXB9bC0LslXZrRlBSh4c28uCbFcWICV4JElCiWSl2etKLhkXRBW3A2VMWCUHFC0qmFTEVtocQ9poVbRJQUTZshWcVBbPnm3mhBLs00QgSFSJnClOOoKcUoKtRpQg+Bk2Tc/eLfExIHiPBZOehvGv8s0TnS+UuGZtzXxpmjzl1uakoXBt3eEEn3G74PInn/MGVUXeYy6qaaOPaYucbHo9xevLS7N0Ai/yNZmCW5xxvuVjkyP6Mp/wHb+xWCTx61t331kYS5wPgQA/SM6XqVYgz3B5g9xyhp36BmcLee8SR4DXDBOQ5JDpZB2S8k5jyXLW6F7FiC6NqAUO6h5Df1BvCnmBv4pARtTHXYj7+coMPflJ/Ihv+Ipe9losfQXXLBH3CZk1OcrjvMN1nre1cX38bIF4zFHzJoJzhRM7wKu2IKOmiCTn9EdZfy/m6MfPp/iAbvYxyl3m+JcAKX4kY2tsAEn66Cdn7eDhjGHfZ0mj8ctqaLA1kjhnlCtdMReHlUe2fcgUh238XwPAbr43xNNflSvVDJLgIrttTyrgo5sxVvLNr1pC1nbXCmN0O7mFqgkzSAyNSxaPIjcX0YgxSNgk7OhWoLj52UsLY9yzqH+FDib4XUlNDfYf4zU3unVPZ4cAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDQtMTlUMTE6MTA6MjUrMDA6MDAAc6jkAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA0LTE5VDExOjEwOjI1KzAwOjAwcS4QWAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=) View on GitHub](https://github.com/amanchopra1905/smartui-ci-cd-integrations)

### Step 1: Create your Secrets[â](https://www.testmuai.com/support/docs/smartui-with-github-actions#step-1-create-your-secrets "Direct link to Step 1: Create your Secrets")

  * Click on the **Settings** of your repository.
  * Go to the **Security** option > **Secrets and Variables** > **Actions**.
  * Create your secrets with variable name **LT_USERNAME** and **LT_ACCESS_KEY**. You can fetch your credentials from the [Accounts and Settings dashboard](https://accounts.lambdatest.com/security).

### Step 2: Create a New Workflow[â](https://www.testmuai.com/support/docs/smartui-with-github-actions#step-2-create-a-new-workflow "Direct link to Step 2: Create a New Workflow")

  * Navigate to the main page of the repository.
  * Under your repository name, click **Actions**.
  * In the left sidebar, click the **New workflow** button.

### Step 3: Create the GitHub Actions workflow YAML file[â](https://www.testmuai.com/support/docs/smartui-with-github-actions#step-3-create-the-github-actions-workflow-yaml-file "Direct link to Step 3: Create the GitHub Actions workflow YAML file")

To create the GitHub Actions pipeline YAML file, follow the sample command below:

github-actions.yml
    
    
    loading...  
    

[View on GitHub](https://github.com/amanchopra1905/smartui-ci-cd-integrations/blob/main/.github/workflows/main.yml)

### Step 4: Run the Workflow[â](https://www.testmuai.com/support/docs/smartui-with-github-actions#step-4-run-the-workflow "Direct link to Step 4: Run the Workflow")

To run the new pipeline that you just created, click the **Run workflow** button on the workflow page. A prompt will ask you to enter your **PROJECT_TOKEN**. You can get your project token from the dashboard after creating your SmartUI project.

![Create New Project](https://www.testmuai.com/support/assets/images/github-actions-3d7924f876d99822fc3f0918790c7aa3.png)

> Check your output in the [SmartUI Dashboard](https://smartui.lambdatest.com/projects)

## Best Practices[â](https://www.testmuai.com/support/docs/smartui-with-github-actions#best-practices "Direct link to Best Practices")

  * Secret Management
  * Workflow Optimization
  * Build Naming
  * Error Handling
  * Resource Management
  * Resource Management

**Secret Management**

  * Never commit credentials to repository
  * Use GitHub Secrets for all sensitive data
  * Rotate secrets regularly
  * Use different secrets for different environments

**Workflow Optimization**

  * Use matrix strategies for parallel execution
  * Cache dependencies to speed up workflows
  * Only run visual tests on relevant branches
  * Set up workflow conditions to avoid unnecessary runs

**Example:**
    
    
     on:  
      push:  
        branches: [ main, develop ]  
      pull_request:  
        branches: [ main ]  
    

**Build Naming**

  * Use meaningful build names that include branch/PR info
  * Include commit SHA for traceability
  * Use consistent naming conventions

**Example:**
    
    
     - name: Set build name  
      run: |  
        BUILD_NAME="PR-${{ github.event.pull_request.number }}-${{ github.sha }}"  
        echo "BUILD_NAME=$BUILD_NAME" >> $GITHUB_ENV  
    

**Error Handling**

  * Set up proper error handling in workflows
  * Use workflow status checks
  * Configure notifications for failures
  * Add retry logic for flaky tests

**Resource Management**

  * Limit concurrent workflow runs
  * Clean up old builds regularly
  * Monitor workflow execution time
  * Optimize test execution order

**Resource Management**

  * Limit concurrent workflow runs
  * Clean up old builds regularly
  * Monitor workflow execution time
  * Optimize test execution order

## Troubleshooting[â](https://www.testmuai.com/support/docs/smartui-with-github-actions#troubleshooting "Direct link to Troubleshooting")

  * Workflow Fails with Secret Not Found
  * PROJECT_TOKEN Prompt Appears
  * Tests Run But No Results in Dashboard
  * Workflow Times Out
  * Dependencies Installation Fails
  * SmartUI CLI Not Found

**Issue: Workflow Fails with "Secret Not Found"**

**Symptoms** : Workflow fails with error about missing secrets

**Possible Causes** :

  * Secrets not created in repository
  * Secret names don't match
  * Secrets not accessible to workflow

**Solutions** :

  1. Verify secrets exist in repository settings:

     * Go to Settings â Secrets and variables â Actions
     * Check `LT_USERNAME`, `LT_ACCESS_KEY`, and `PROJECT_TOKEN` exist
  2. Ensure secret names match exactly (case-sensitive)

  3. Check workflow has permission to access secrets

  4. Verify secrets are set for the correct repository/environment

**Issue: PROJECT_TOKEN Prompt Appears**

**Symptoms** : Workflow prompts for PROJECT_TOKEN during execution

**Possible Causes** :

  * PROJECT_TOKEN not set as secret
  * Secret not passed to workflow step
  * Workflow input not configured

**Solutions** :

  1. Add PROJECT_TOKEN as GitHub Secret

  2. Pass secret to workflow step:
         
         env:  
           PROJECT_TOKEN: ${{ secrets.PROJECT_TOKEN }}  
         

  3. For manual workflows, add workflow input:
         
         on:  
           workflow_dispatch:  
             inputs:  
               project_token:  
                 required: true  
                 type: string  
         

**Issue: Tests Run But No Results in Dashboard**

**Symptoms** : Workflow completes but screenshots don't appear in SmartUI

**Possible Causes** :

  * Incorrect PROJECT_TOKEN
  * Project name mismatch
  * Network issues
  * Workflow step failure

**Solutions** :

  1. Verify PROJECT_TOKEN is correct:

     * Check token in SmartUI Project Settings
     * Ensure token includes project ID prefix
  2. Check workflow logs for errors:
         
         - name: View logs  
           if: failure()  
           run: |  
             # Check previous step logs  
         

  3. Verify network connectivity in workflow

  4. Check if SmartUI CLI step completed successfully

**Issue: Workflow Times Out**

**Symptoms** : Workflow execution exceeds time limit

**Possible Causes** :

  * Too many tests running
  * Slow test execution
  * Network latency
  * Resource constraints

**Solutions** :

  1. Increase workflow timeout:
         
         timeout-minutes: 60  
         

  2. Run tests in parallel using matrix:
         
         strategy:  
           matrix:  
             test-group: [1, 2, 3]  
         

  3. Optimize test execution

  4. Split tests across multiple workflows

**Issue: Dependencies Installation Fails**

**Symptoms** : npm install or dependency installation fails

**Possible Causes** :

  * Network issues
  * Package registry problems
  * Version conflicts
  * Node version mismatch

**Solutions** :

  1. Use specific Node version:
         
         - uses: actions/setup-node@v3  
           with:  
             node-version: '18'  
         

  2. Clear npm cache:
         
         - run: npm cache clean --force  
         

  3. Use package-lock.json for consistent installs

  4. Check for version conflicts in package.json

**Issue: SmartUI CLI Not Found**

**Symptoms** : `npx smartui` command fails with command not found"

**Possible Causes** :

  * Node.js not installed
  * npm not available
  * PATH issues

**Solutions** :

  1. Ensure Node.js setup step is included:
         
         - uses: actions/setup-node@v3  
           with:  
             node-version: '18'  
         

  2. Verify npm is available:
         
         - run: npm --version  
         

  3. Install SmartUI CLI explicitly:
         
         - run: npm install -g @lambdatest/smartui-cli  
         

**Getting Help**

If you encounter issues not covered here:

  * Review [GitHub Actions Documentation](https://docs.github.com/en/actions)
  * Check [SmartUI CLI Documentation](https://www.testmuai.com/support/docs/smartui-cli) for CLI-specific issues
  * Visit [TestMu AI Support](https://www.lambdatest.com/support) for additional resources
  * Contact support at [[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection#1e6d6b6e6e716c6a5e6a7b6d6a736b307f77) or use [24/7 Chat Support](https://www.lambdatest.com/support)

## Additional Resources[â](https://www.testmuai.com/support/docs/smartui-with-github-actions#additional-resources "Direct link to Additional Resources")

  * [SmartUI CLI Documentation](https://www.testmuai.com/support/docs/smartui-cli)
  * [GitHub Actions Documentation](https://docs.github.com/en/actions)
  * [Project Settings](https://www.testmuai.com/support/docs/smartui-project-settings)
  * [Running Your First Project](https://www.testmuai.com/support/docs/smartui-running-your-first-project)

---

*Auto-generated from TestMu AI documentation.*