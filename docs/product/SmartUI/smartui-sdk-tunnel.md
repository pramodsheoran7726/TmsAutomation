# UsingTestMu AITunnel with SmartUI SDK

> **Source**: [https://www.testmuai.com/support/docs/smartui-sdk-tunnel](https://www.testmuai.com/support/docs/smartui-sdk-tunnel)

**Product**: SmartUI

**Last Crawled**: 2026-01-27T21:03:43.747005

---

On this page

TestMu AI Tunnel enables secure testing of your local, development, or privately hosted environments using SmartUI SDK. This guide explains how to configure and use TestMu AI Tunnel with SmartUI SDK.

Important

Tunnel configuration is only supported with the `exec` mode of SmartUI SDK. It is not compatible with `capture`, `upload`, or `figma` commands. For more information about exec mode, refer to our [SmartUI CLI Exec documentation](https://www.testmuai.com/support/docs/smartui-cli-exec/).

## Prerequisites[â](https://www.testmuai.com/support/docs/smartui-sdk-tunnel#prerequisites "Direct link to Prerequisites")

  * Working knowledge of npm CLI commands
  * Understanding of tunneling concepts for local testing
  * Valid TestMu AI credentials (username and access key)
  * Familiarity with SmartUI CLI configuration files
  * SmartUI CLI installed and configured

## Configuration Options[â](https://www.testmuai.com/support/docs/smartui-sdk-tunnel#configuration-options "Direct link to Configuration Options")

TestMu AI Tunnel supports two configuration modes:

### 1\. Automatic Tunnel Configuration[â](https://www.testmuai.com/support/docs/smartui-sdk-tunnel#1-automatic-tunnel-configuration "Direct link to 1. Automatic Tunnel Configuration")

For automatic tunnel setup, add the following configuration to your `.smartui.json` file:
    
    
    {  
      "tunnel": {  
        "type": "auto",  
        "user": "<lambdatest-user>",  // Optional: Overrides LT_USERNAME if present in env  
        "key": "<lambdatest-accesskey>",  // Optional: Overrides LT_ACCESS_KEY if present in env  
        "port": "<port>",  // Optional: Default port if not specified  
        "proxyHost": "127.0.0.1",  // Optional  
        "proxyPort": "8000",  // Optional  
        "proxyUser": "user",  // Optional: Proxy authentication  
        "proxyPass": "password",  // Optional: Proxy authentication  
        "dir": "<path-to-local-folder>",  // Optional: Directory to test  
        "v": true,  // Optional: Enable verbose logging  
        "logFile": "/path/to/logs.txt"  // Optional: Custom log file location  
      }  
    }  
    

### 2\. Manual Tunnel Configuration[â](https://www.testmuai.com/support/docs/smartui-sdk-tunnel#2-manual-tunnel-configuration "Direct link to 2. Manual Tunnel Configuration")

For manual tunnel setup, add the following configuration:
    
    
    {  
      "tunnel": {  
        "type": "manual",  
        "tunnelName": "my-tunnel-name"  // Required for manual mode  
        //Add user and key in case LT_USERNAME and LT_ACCESSKEY not provided in env variables  
      }  
    }  
    

note

Configuration values take precedence over environment variables when both are present.

## Environment Variables Support[â](https://www.testmuai.com/support/docs/smartui-sdk-tunnel#environment-variables-support "Direct link to Environment Variables Support")

The tunnel configuration automatically uses the following environment variables if not specified in the config:

  * `LT_USERNAME`: TestMu AI username
  * `LT_ACCESS_KEY`: TestMu AI access key

## Example Configurations[â](https://www.testmuai.com/support/docs/smartui-sdk-tunnel#example-configurations "Direct link to Example Configurations")

### Basic Automatic Setup[â](https://www.testmuai.com/support/docs/smartui-sdk-tunnel#basic-automatic-setup "Direct link to Basic Automatic Setup")
    
    
    {  
      "web": {  
        "browsers": ["chrome", "firefox"],  
        "viewports": [[1920, 1080], [1366, 768]]  
      },  
      "tunnel": {  
        "type": "auto"  
          //Add user and key in case LT_USERNAME and LT_ACCESSKEY not provided in env variables  
      
      }  
    }  
    

### Advanced Automatic Setup with Proxy[â](https://www.testmuai.com/support/docs/smartui-sdk-tunnel#advanced-automatic-setup-with-proxy "Direct link to Advanced Automatic Setup with Proxy")
    
    
    {  
      "web": {  
        "browsers": ["chrome", "firefox"],  
        "viewports": [[1920, 1080], [1366, 768]]  
      },  
      "tunnel": {  
        "type": "auto",  
        "user": "<lambdatest-user>",  // Optional: Overrides LT_USERNAME if present in env  
        "key": "<lambdatest-accesskey>",  // Optional: Overrides LT_ACCESS_KEY if present in env  
        "proxyHost": "127.0.0.1",  
        "proxyPort": "8000",  
        "dir": "./src",  
        "v": true  
      }  
    }  
    

### Manual Tunnel Setup[â](https://www.testmuai.com/support/docs/smartui-sdk-tunnel#manual-tunnel-setup "Direct link to Manual Tunnel Setup")
    
    
    {  
      "web": {  
        "browsers": ["chrome", "firefox"],  
        "viewports": [[1920, 1080], [1366, 768]]  
      },  
      "tunnel": {  
        "type": "manual",  
        "tunnelName": "my-tunnel",  
        "user": "<lambdatest-user>",  // Optional: Overrides LT_USERNAME if present in env  
        "key": "<lambdatest-accesskey>",  // Optional: Overrides LT_ACCESS_KEY if present in env  
      }  
    }  
    

## Best Practices[â](https://www.testmuai.com/support/docs/smartui-sdk-tunnel#best-practices "Direct link to Best Practices")

  * Automatic vs Manual Mode
  * Credentials Management
  * Proxy Configuration
  * Logging
  * Directory Testing

**Automatic vs Manual Mode**

  * Use automatic mode for simple setups and quick testing
    * Use manual mode when you need more control over tunnel lifecycle

**Credentials Management**

  * Prefer environment variables for sensitive information
    * Use config file for non-sensitive settings

**Proxy Configuration**

  * Specify proxy settings in config when using corporate networks
    * Test proxy settings before running full test suite

**Logging**

  * Enable verbose logging (`"v": true`) for troubleshooting
    * Specify custom log file location for persistent logs

**Directory Testing**

  * Always specify the directory to test when working with local files
    * Ensure the directory path is accessible and contains the necessary files

tip

For more detailed information about TestMu AI Tunnel features and configurations, refer to our [Advanced Tunnel Features documentation](https://www.testmuai.com/support/docs/advanced-tunnel-features).

  1. **Automatic vs Manual Mode**

     * Use automatic mode for simple setups and quick testing
     * Use manual mode when you need more control over tunnel lifecycle
  2. **Credentials Management**

     * Prefer environment variables for sensitive information
     * Use config file for non-sensitive settings
  3. **Proxy Configuration**

     * Specify proxy settings in config when using corporate networks
     * Test proxy settings before running full test suite
  4. **Logging**

     * Enable verbose logging (`"v": true`) for troubleshooting
     * Specify custom log file location for persistent logs
  5. **Directory Testing**

     * Always specify the directory to test when working with local files
     * Ensure the directory path is accessible and contains the necessary files

tip

For more detailed information about TestMu AI Tunnel features and configurations, refer to our [Advanced Tunnel Features documentation](https://www.testmuai.com/support/docs/advanced-tunnel-features).

---

*Auto-generated from TestMu AI documentation.*