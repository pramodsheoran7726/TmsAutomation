# SmartUI SDK Environment Variables

> **Source**: [https://www.testmuai.com/support/docs/smartui-cli-env-variables](https://www.testmuai.com/support/docs/smartui-cli-env-variables)

**Product**: SmartUI

**Last Crawled**: 2026-01-27T21:03:03.337976

---

On this page

* * *

Welcome to the world of simplified visual testing with the SmartUI SDK.

This guide is designed to provide you with comprehensive information about the various environment variables options available within the SmartUI SDK. SmartUI retrieves additional details from the environment it is running in, like the branch name, baseline branch,proxies etc. You can modify certain aspects of SmartUI behavior by configuring these environment variables within your CI environment:

## 1\. Setting the Project Name[â](https://www.testmuai.com/support/docs/smartui-cli-env-variables#1-setting-the-project-name "Direct link to 1. Setting the Project Name")

Set the Project Name you want to add the current build run to by exporting these enviroment variables:

  * MacOS/Linux
  * Windows - CMD
  * PowerShell

    
    
    export LT_USERNAME="YOUR USERNAME"  
    export LT_ACCESS_KEY="YOUR ACCESS KEY"  
    export PROJECT_NAME="Required Project Name"  
    
    
    
    set LT_USERNAME="YOUR USERNAME"  
    set LT_ACCESS_KEY="YOUR ACCESS KEY"  
    set PROJECT_NAME="Required Project Name"  
    
    
    
    $env:LT_USERNAME="YOUR USERNAME"  
    $env:LT_ACCESS_KEY="YOUR ACCESS KEY"  
    $env:PROJECT_NAME="Required Project Name"  
    

> If you specify a project name that doesn't already exist, a new project will be created by the user whose authentication is added in the environment.

## 2: Set your Project Token[â](https://www.testmuai.com/support/docs/smartui-cli-env-variables#2-set-your-project-token "Direct link to 2: Set your Project Token")

Setup your project token shown in the **SmartUI** app after creating your project.

  * MacOS/Linux
  * Windows - CMD
  * PowerShell

    
    
    export PROJECT_TOKEN="123456#1234abcd-****-****-****-************"  
    
    
    
    set PROJECT_TOKEN="123456#1234abcd-****-****-****-************"  
    
    
    
    $env:PROJECT_TOKEN="123456#1234abcd-****-****-****-************"  
    

> Setting the project token environment variable does not require any user level authentication.

![cmd](https://www.testmuai.com/support/assets/images/project-token-primer-4998c6ef92e962af15f568191e5a59bd.webp)

## 3\. Setting the Baseline Branch[â](https://www.testmuai.com/support/docs/smartui-cli-env-variables#3-setting-the-baseline-branch "Direct link to 3. Setting the Baseline Branch")

Set the baseline branch for `CLI` projects:

  * MacOS/Linux
  * Windows - CMD
  * PowerShell

    
    
    export BASELINE_BRANCH="Required branch"  
    
    
    
    set BASELINE_BRANCH="Required branch"  
    
    
    
    $env:BASELINE_BRANCH="Required branch"  
    

## 4\. Setting the current branch[â](https://www.testmuai.com/support/docs/smartui-cli-env-variables#4-setting-the-current-branch "Direct link to 4. Setting the current branch")

Set the current branch for `CLI` projects:

  * MacOS/Linux
  * Windows - CMD
  * PowerShell

    
    
    export CURRENT_BRANCH="Required branch"  
    
    
    
    set CURRENT_BRANCH="Required branch"  
    
    
    
    $env:CURRENT_BRANCH="Required branch"  
    

## 5\. Setting proxies[â](https://www.testmuai.com/support/docs/smartui-cli-env-variables#5-setting-proxies "Direct link to 5. Setting proxies")

In case you are accessing your network using corporate proxies, set the proxies in the environment variables as follows

#### HTTP_PROXY:[â](https://www.testmuai.com/support/docs/smartui-cli-env-variables#http_proxy "Direct link to HTTP_PROXY:")

  * MacOS/Linux
  * PowerShell

    
    
    export HTTP_PROXY="http://<username>:<password>@<domain.com>:<port>/"  
    <TabItem value="Windows-4" label='Windows - CMD'>  
      
    ```bash  
    set HTTP_PROXY="http://<username>:<password>@<domain.com>:<port>"  
    
    
    
    $env:HTTP_PROXY="http://<username>:<password>@<domain.com>:<port>/"  
    

#### HTTPS_PROXY:[â](https://www.testmuai.com/support/docs/smartui-cli-env-variables#https_proxy "Direct link to HTTPS_PROXY:")

  * MacOS/Linux
  * Windows - CMD
  * PowerShell

    
    
    export HTTPS_PROXY="https://<username>:<password>@<domain.com>:<port>"  
    
    
    
    set HTTPS_PROXY="https://<username>:<password>@<domain.com>:<port>"  
    
    
    
    $env:HTTPS_PROXY="https://<username>:<password>@<domain.com>:<port>/"  
    

> **NOTE :** In most cases setting only HTTP_PROXY should be enough, but if you have different proxies for HTTP and HTTPS, you can set both.The format for proxyâs is `http[s]://<username>:<password>@<domain.com>:<port>/` [username and password is optional].

## 6\. Enabling Debug mode[â](https://www.testmuai.com/support/docs/smartui-cli-env-variables#6-enabling-debug-mode "Direct link to 6. Enabling Debug mode")

To enable SmartUI CLI Debug mode, use the following environment variable.

  * MacOS/Linux
  * Windows - CMD
  * PowerShell

    
    
    export LT_SDK_DEBUG=true  
    
    
    
    set LT_SDK_DEBUG=true  
    
    
    
    $env:LT_SDK_DEBUG="true"  
    

## 7\. Ignoring captured cookies[â](https://www.testmuai.com/support/docs/smartui-cli-env-variables#7-ignoring-captured-cookies "Direct link to 7. Ignoring captured cookies")

Set the following variable to true, to stop the use of cookies captured automatically. The default is set to `false`.

  * MacOS/Linux
  * Windows - CMD
  * PowerShell

    
    
    export SMARTUI_DO_NOT_USE_CAPTURED_COOKIES=true  
    
    
    
    set SMARTUI_DO_NOT_USE_CAPTURED_COOKIES=true  
    
    
    
    $env:SMARTUI_DO_NOT_USE_CAPTURED_COOKIES="true"  
    

## 8\. Setting Server Address[â](https://www.testmuai.com/support/docs/smartui-cli-env-variables#8-setting-server-address "Direct link to 8. Setting Server Address")

For SDK integrations (non-Selenium), set the SmartUI server address:

  * MacOS/Linux
  * Windows - CMD
  * PowerShell

    
    
    export SMARTUI_SERVER_ADDRESS="http://localhost:8080"  
    
    
    
    set SMARTUI_SERVER_ADDRESS="http://localhost:8080"  
    
    
    
    $env:SMARTUI_SERVER_ADDRESS="http://localhost:49152"  
    

## 9\. Additional Environment Variables[â](https://www.testmuai.com/support/docs/smartui-cli-env-variables#9-additional-environment-variables "Direct link to 9. Additional Environment Variables")

The following environment variables are also available for advanced configuration:

Variable| Description| Default  
---|---|---  
`FIGMA_TOKEN`| Figma API token for Figma integration| -  
`NO_PROXY`| Comma-separated hosts to bypass proxy| -  
`SMARTUI_HTTP_PROXY`| SmartUI-specific HTTP proxy| -  
`SMARTUI_HTTPS_PROXY`| SmartUI-specific HTTPS proxy| -  
`SMARTUI_API_PROXY`| API proxy configuration| -  
`SMARTUI_CLIENT_API_URL`| Override API URL| `https://api.lambdatest.com/visualui/1.0`  
`SMARTUI_UPLOAD_URL`| Override upload URL| `https://api.lambdatest.com`  
`SMARTUI_GIT_INFO_FILEPATH`| Custom git info file path| -  
`GITHUB_ACTIONS`| GitHub Actions environment flag| -  
`SMARTUI_API_SKIP_CERTIFICATES`| Skip SSL certificate validation| `false`  
`USE_REMOTE_DISCOVERY`| Use remote discovery mode| `false`  
`SMART_GIT`| Enable Smart Git feature| `false`  
`SHOW_RENDER_ERRORS`| Show render errors| `false`  
`SMARTUI_SSE_URL`| Server-sent events URL| `https://server-events.lambdatest.com`  
`LT_SDK_SKIP_EXECUTION_LOGS`| Skip execution logs| `false`  
`MAX_CONCURRENT_PROCESSING`| Max concurrent processing threads| `0` (auto)  
`DO_NOT_USE_USER_AGENT`| Disable user agent| `false`  
  
## Additional Resources[â](https://www.testmuai.com/support/docs/smartui-cli-env-variables#additional-resources "Direct link to Additional Resources")

  * [Comprehensive Troubleshooting Guide](https://www.testmuai.com/support/docs/smartui-troubleshooting-guide)
  * [CLI Documentation](https://www.testmuai.com/support/docs/smartui-cli)
  * [CLI Exec Commands](https://www.testmuai.com/support/docs/smartui-cli-exec)
  * [CLI Upload](https://www.testmuai.com/support/docs/smartui-cli-upload)
  * [Baseline Management](https://www.testmuai.com/support/docs/smartui-baseline-management)
  * [Running Your First Project](https://www.testmuai.com/support/docs/smartui-running-your-first-project)
  * [SmartUI API Documentation](https://www.lambdatest.com/support/api-doc/)

---

*Auto-generated from TestMu AI documentation.*