# SmartUI CLI Exec Command

> **Source**: [https://www.testmuai.com/support/docs/smartui-cli-exec](https://www.testmuai.com/support/docs/smartui-cli-exec)

**Product**: SmartUI

**Last Crawled**: 2026-01-27T21:03:13.193857

---

On this page

SmartUI CLI exec command offers you various options to manage snapshot server and execute your visual testing scripts. This guide will walk you through the available commands and their usage.

## Prerequisites[â](https://www.testmuai.com/support/docs/smartui-cli-exec#prerequisites "Direct link to Prerequisites")

  * Basic understanding of Command Line Interface
  * SmartUI CLI version 4.1.43 or higher installed for the start, stop and ping commands
  * A properly configured SmartUI CLI project

## Available Commands[â](https://www.testmuai.com/support/docs/smartui-cli-exec#available-commands "Direct link to Available Commands")

SmartUI CLI offers the following exec commands:

  * `npx smartui exec` \- Execute a command with SmartUI server running
  * `npx smartui exec:start` \- Start the SmartUI snapshot server
  * `npx smartui exec:stop` \- Stop the SmartUI snapshot server
  * `npx smartui exec:ping` \- Check if the SmartUI server is running (uses custom HTTP client)
  * `npx smartui exec:pingTest` \- Check if the SmartUI server is running (uses default HTTP client)

## Using the Exec Command[â](https://www.testmuai.com/support/docs/smartui-cli-exec#using-the-exec-command "Direct link to Using the Exec Command")

The `npx smartui exec` command allows you to run your tests with various configuration options. Here's the basic syntax:
    
    
    npx smartui exec [options] -- <command>  
    

### Available Options[â](https://www.testmuai.com/support/docs/smartui-cli-exec#available-options "Direct link to Available Options")

Option| Description  
---|---  
`-P, --port <number>`| Specify a custom port number for the server (default: 49152)  
`--fetch-results [filename]`| Fetch test results and save to a JSON file (default: results.json)  
`--buildName <string>`| Specify a custom build name for the test run  
`--scheduled <string>`| Specify the schedule ID for scheduled test runs  
`--show-render-errors`| Show render errors from SmartUI build  
`--userName <string>`| Override TestMu AI username (overrides environment variable)  
`--accessKey <string>`| Override TestMu AI access key (overrides environment variable)  
`--config <file>`| Specify a configuration file to use  
`-h, --help`| Display help information  
  
### Examples[â](https://www.testmuai.com/support/docs/smartui-cli-exec#examples "Direct link to Examples")

  1. Running with a custom port:

    
    
    npx smartui exec -P 5000 -- npm test  
    

  2. Fetching results with custom filename:

    
    
    npx smartui exec --fetch-results custom-results.json -- npm test  
    

  3. Specifying a build name:

    
    
    npx smartui exec --buildName "Release-1.0" -- npm test  
    

  4. Using a configuration file:

    
    
    npx smartui exec --config smartui-config.json -- npm test  
    

  5. Combining multiple options:

    
    
    npx smartui exec -P 5000 --buildName "Release-1.0" --config smartui-config.json --fetch-results -- npm test  
    

  6. Running scheduled tests:

    
    
    npx smartui exec --scheduled "schedule-123" -- npm test  
    

  7. Showing render errors:

    
    
    npx smartui exec --show-render-errors -- npm test  
    

  8. Overriding credentials:

    
    
    npx smartui exec --userName "user" --accessKey "key" -- npm test  
    

## Starting the Server[â](https://www.testmuai.com/support/docs/smartui-cli-exec#starting-the-server "Direct link to Starting the Server")

To start the SmartUI snapshot server:
    
    
    npx smartui exec:start  
    

This will start a local server that handles snapshot requests. By default, the server runs on port 49152.

## Stopping the Server[â](https://www.testmuai.com/support/docs/smartui-cli-exec#stopping-the-server "Direct link to Stopping the Server")

To properly stop the SmartUI snapshot server:
    
    
    npx smartui exec:stop  
    

> **Important:** It's recommended to use the `exec:stop` command rather than using Ctrl+C to terminate the server. Using Ctrl+C will cause the build to stop after 12 minutes of running.

## Checking Server Status[â](https://www.testmuai.com/support/docs/smartui-cli-exec#checking-server-status "Direct link to Checking Server Status")

To verify if the SmartUI server is running, you can use either of these commands:

**Using exec :ping (custom HTTP client):**
    
    
    npx smartui exec:ping  
    

**Using exec :pingTest (default HTTP client):**
    
    
    npx smartui exec:pingTest  
    

Both commands check if the server is running at the address specified in `SMARTUI_SERVER_ADDRESS` environment variable (default: `http://localhost:49152`).

## Running Tests with the Server[â](https://www.testmuai.com/support/docs/smartui-cli-exec#running-tests-with-the-server "Direct link to Running Tests with the Server")

### Step 1: Configure Server Address[â](https://www.testmuai.com/support/docs/smartui-cli-exec#step-1-configure-server-address "Direct link to Step 1: Configure Server Address")

For most test frameworks (except Selenium Java and JavaScript), you'll need to set the server address:

  * MacOS/Linux
  * Windows - CMD
  * PowerShell

    
    
    export SMARTUI_SERVER_ADDRESS='http://localhost:49152'  
    
    
    
    set SMARTUI_SERVER_ADDRESS='http://localhost:49152'  
    
    
    
    $env:SMARTUI_SERVER_ADDRESS="http://localhost:49152"  
    

### Step 2: Execute Your Tests[â](https://www.testmuai.com/support/docs/smartui-cli-exec#step-2-execute-your-tests "Direct link to Step 2: Execute Your Tests")

You can run your tests using your preferred test runner:
    
    
    # Using npm  
    npm test  
      
    # Using Maven  
    mvn test  
      
    # Using other test runners  
    your-test-command  
    

### IDE Configuration[â](https://www.testmuai.com/support/docs/smartui-cli-exec#ide-configuration "Direct link to IDE Configuration")

When running tests from IDEs like IntelliJ:

  1. Ensure the `SMARTUI_SERVER_ADDRESS` environment variable is set in your IDE's run configuration
  2. Configure the run configuration to use the appropriate test command

## Best Practices[â](https://www.testmuai.com/support/docs/smartui-cli-exec#best-practices "Direct link to Best Practices")

  * Server Termination
  * Timeouts
  * Snapshot Naming
  * Environment Variables
  * Configuration Files

**Server Termination**

Always use `exec:stop` to properly terminate the server.

**Timeouts**

Set appropriate timeouts for your tests.

**Snapshot Naming**

Use meaningful names for your snapshots.

**Environment Variables**

Configure environment variables before starting your IDE.

**Configuration Files**

Consider using configuration files for complex setups.

## Troubleshooting[â](https://www.testmuai.com/support/docs/smartui-cli-exec#troubleshooting "Direct link to Troubleshooting")

  * Server Status
  * Server Address
  * Port Conflicts
  * Server Logs

**Server Status**

Verify the server is running using `exec:ping`.

**Server Address**

Check if the server address is correctly configured.

**Port Conflicts**

Ensure no other process is using the default port.

**Server Logs**

Review the server logs for error messages.

### Getting Help[â](https://www.testmuai.com/support/docs/smartui-cli-exec#getting-help "Direct link to Getting Help")

If you encounter issues not covered here:

  * Review the [Comprehensive Troubleshooting Guide](https://www.testmuai.com/support/docs/smartui-troubleshooting-guide) for detailed solutions
  * Check [CLI Documentation](https://www.testmuai.com/support/docs/smartui-cli) for general CLI usage
  * Visit [TestMu AI Support](https://www.lambdatest.com/support) for additional resources
  * Contact support at [[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection#fa898f8a8a95888eba8e9f898e978fd49b93) or use [24/7 Chat Support](https://www.lambdatest.com/support)

## Additional Resources[â](https://www.testmuai.com/support/docs/smartui-cli-exec#additional-resources "Direct link to Additional Resources")

  * [Comprehensive Troubleshooting Guide](https://www.testmuai.com/support/docs/smartui-troubleshooting-guide)
  * [CLI Documentation](https://www.testmuai.com/support/docs/smartui-cli)
  * [CLI Upload](https://www.testmuai.com/support/docs/smartui-cli-upload)
  * [Environment Variables](https://www.testmuai.com/support/docs/smartui-cli-env-variables)
  * [Baseline Management](https://www.testmuai.com/support/docs/smartui-baseline-management)
  * [Running Your First Project](https://www.testmuai.com/support/docs/smartui-running-your-first-project)

---

*Auto-generated from TestMu AI documentation.*