# GitHub App Integration with SmartUI

> **Source**: [https://www.testmuai.com/support/docs/smartui-github-app-integration](https://www.testmuai.com/support/docs/smartui-github-app-integration)

**Product**: SmartUI

**Last Crawled**: 2026-01-27T21:04:16.596358

---

On this page

This is the guide to setup your GitHub Repos with SmartUI projects and run your CI along with visual regression testing.

## Prerequisites[â](https://www.testmuai.com/support/docs/smartui-github-app-integration#prerequisites "Direct link to Prerequisites")

  * An account with GitHub with valid permission to install new applications to your repositories.
  * Basic understanding of Continuous Integration tools (CI) is required.
  * Should have setup the SmartUI suite, else please read [this](https://www.testmuai.com/support/docs/selenium-visual-regression/)

The following steps will guide you in running your first Visual Regression test on TestMu AI SmartUI platform using GitHub App-

## Step 1: Integrate the your TestMu AI Account with GitHub App[â](https://www.testmuai.com/support/docs/smartui-github-app-integration#step-1-integrate-the-your--account-with-github-app "Direct link to step-1-integrate-the-your--account-with-github-app")

The following are the steps to integrate your account with GitHub App:

  1. Go to [Integrations page](https://integrations.lambdatest.com/)
  2. Search for GitHub App and select the integration.

![cmd](https://www.testmuai.com/support/assets/images/github-app-landing-978d20f6a5fd8e482fb11e4c31deafef.png)

  3. Click on the `OAuth` as your preferred authentication.
  4. Click on **Install**.

![cmd](https://www.testmuai.com/support/assets/images/smartui-github-integration-a96e9730e4ac4851bd7f4e05b06144a7.png)

  5. You will be redirected to the GitHub Authentication page to confirm the permissions required for the application to be installed.
  6. Click on **Confirm** button to all the authentication requirements from your GitHub Account.
  7. After successful authentication, you can refresh the [Integrations page](https://integrations.lambdatest.com/) to view the GitHub App installed.

![cmd](https://www.testmuai.com/support/assets/images/github-app-installed-919bf261141c44faf350dff73f31d6e1.png)

Now, after the successful installation of the GitHub Integration, please follow the below steps to configure to your project repo:

## Step 2: Select your GitHub repository[â](https://www.testmuai.com/support/docs/smartui-github-app-integration#step-2-select-your-github-repository "Direct link to Step 2: Select your GitHub repository")

Go to your GitHub repository where you want to configure your SmartUI project.

GitHub Sample

Please check out GitHub sample here: <https://github.com/LambdaTest/smartui-node-sample>

## Step 3: Configure your test suite[â](https://www.testmuai.com/support/docs/smartui-github-app-integration#step-3-configure-your-test-suite "Direct link to Step 3: Configure your test suite")

Add the `GitHub` capability to your current test configuration:
    
    
    const capabilities: {  
      platform: "Windows 10",  
      browserName: "chrome",  
      version: "latest",  
      "smartUI.project": "SmartUI sample test",  
       github: {  
      
        "url": process.env.GITHUB_URL  // Mandatory  
        //GitHub URL format-https://api.github.com/repos/OWNER/REPO/statuses/commitId  
      
       }  
    }  
    

## Step 4: Setting up your CI configuration[â](https://www.testmuai.com/support/docs/smartui-github-app-integration#step-4-setting-up-your-ci-configuration "Direct link to Step 4: Setting up your CI configuration")

Setting up your **CI** workflow to execute on **GitHub**. Here is an example setup with `GitHub Actions`:

Go to `.github/workflows/<your_ci_file>.yml`
    
    
        name: Execute SmartUI Test with GitHub App Integration  
        runs-on: ubuntu-latest  
        steps:  
        - uses: actions/checkout@v1  
          with:  
            fetch-depth: 10  
      
        - name: Step for push event  
          run: |  
            echo "This is a push event!"  
            echo "The latest commitId $(git log -1 --format='%H')"  
            echo "COMMIT_ID=$(git log -1 --format='%H')" >> $GITHUB_ENV  
          if: github.event_name == 'push'  
      
        - name: Step for pull_request event  
          run: |  
            echo "This is a pull_request event!"  
            git log -n 5 --format="%H %an %s" | while read line; do echo "$line"; done  
            echo "The latest commitId $(git log -n 2 --format='%H' | tail -n 1)"  
            echo "COMMIT_ID=$(git log -n 2 --format='%H' | tail -n 1)" >> $GITHUB_ENV  
          if: github.event_name == 'pull_request'  
      
        - name: Create GitHub URL  
          run: |  
            API_HOST=https://api.github.com  
            echo "The latest commitId is $COMMIT_ID"  
            GITHUB_URL=$API_HOST/repos/$GITHUB_REPOSITORY/statuses/$COMMIT_ID  
            echo "GITHUB_URL: $GITHUB_URL"  
            echo "GITHUB_URL=$GITHUB_URL" >> $GITHUB_ENV  
    

Note

We also support other Continuous Integrations (CI) tools to execute the similar process as well.

## Step 5: Execute your test suite with CI[â](https://www.testmuai.com/support/docs/smartui-github-app-integration#step-5-execute-your-test-suite-with-ci "Direct link to Step 5: Execute your test suite with CI")

After the setup is completed, you can now execute your test suite with the Continuous Integration (CI) pipeline with any tool of your choice.

GitHub Actions - Example

If your current pipeline is set to `GitHub Actions` then you can configure your `workflow` to trigger the test suite by committing the changes to the `GitHub Repo` or on raising a `Pull Request` to merge any changes to the branch as per your branch rules.

![cmd](https://www.testmuai.com/support/assets/images/github-app-sample-898ca090fb8fd99d2ddb56c3009c0c86.png)

## GitHub App Feedback State[â](https://www.testmuai.com/support/docs/smartui-github-app-integration#github-app-feedback-state "Direct link to GitHub App Feedback State")

Here is an example of **Successful** feedback app state:

![cmd](https://www.testmuai.com/support/assets/images/approved-state-1-3e5538c96ff2ec43f21dea8e483bebce.png)

Here is an example of **Failed** feedback app state:

![cmd](https://www.testmuai.com/support/assets/images/failed-state-1-f1328886627fdecdff1bf1ab922fd352.png)

Note

You can click on `Details` link which will redirect the user to the build of the SmartUI test to view the results

To understand more about the GitHub Actions, setup please read this article : <https://docs.github.com/en/actions/quickstart>

---

*Auto-generated from TestMu AI documentation.*