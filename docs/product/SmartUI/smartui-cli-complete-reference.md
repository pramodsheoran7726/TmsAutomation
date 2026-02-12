# SmartUI CLI Complete Reference Guide

> **Source**: [https://www.testmuai.com/support/docs/smartui-cli-complete-reference](https://www.testmuai.com/support/docs/smartui-cli-complete-reference)

**Product**: SmartUI

**Last Crawled**: 2026-01-27T21:04:03.969371

---

On this page

This comprehensive reference guide covers all SmartUI CLI and Storybook CLI commands, options, advanced features, and end-to-end workflows for visual regression testing.

## Prerequisites[â](https://www.testmuai.com/support/docs/smartui-cli-complete-reference#prerequisites "Direct link to Prerequisites")

  * Node.js v20.3+ installed (required for SmartUI CLI v4.x.x)
  * npm or yarn package manager
  * TestMu AI account credentials
  * SmartUI project created

note

If you face any problems executing tests with SmartUI-CLI `versions >= v4.x.x`, upgrade your Node.js version to `v20.3` or above.

## Installation[â](https://www.testmuai.com/support/docs/smartui-cli-complete-reference#installation "Direct link to Installation")

  * SmartUI CLI
  * Storybook CLI

    
    
    npm install -g @lambdatest/smartui-cli@latest  
    

**Current Version** : v4.1.43+
    
    
    npm install -g @lambdatest/smartui-storybook@latest  
    

**Current Version** : v1.1.29+

* * *

## SmartUI CLI Commands[â](https://www.testmuai.com/support/docs/smartui-cli-complete-reference#smartui-cli-commands "Direct link to SmartUI CLI Commands")

### Main Commands Overview[â](https://www.testmuai.com/support/docs/smartui-cli-complete-reference#main-commands-overview "Direct link to Main Commands Overview")

  * Core Commands
  * Server Management
  * Configuration
  * Figma Integration
  * Branch & Build Management

Command| Description| Usage  
---|---|---  
`exec`| Execute test commands with SmartUI server| `smartui exec [options] -- <command>`  
`capture`| Capture screenshots of static URLs| `smartui capture [options] <file>`  
`upload`| Upload screenshots from directory| `smartui upload [options] <directory>`  
`upload-pdf`| Upload PDFs for visual comparison| `smartui upload-pdf [options] <directory>`  
  
Command| Description| Usage  
---|---|---  
`exec:start`| Start SmartUI snapshot server| `smartui exec:start [options]`  
`exec:stop`| Stop SmartUI snapshot server| `smartui exec:stop`  
`exec:ping`| Check if server is running| `smartui exec:ping`  
`exec:pingTest`| Ping server using default HTTP client| `smartui exec:pingTest`  
  
Command| Description| Usage  
---|---|---  
`config:create`| Create SmartUI config file| `smartui config:create [filepath]`  
`config:create-web-static`| Create Web Static config file| `smartui config:create-web-static [filepath]`  
`config:create-figma`| Create Figma designs config file| `smartui config:create-figma [filepath]`  
`config:create-figma-web`| Create Figma config with browsers| `smartui config:create-figma-web [filepath]`  
`config:create-figma-app`| Create Figma config for mobile apps| `smartui config:create-figma-app [filepath]`  
  
Command| Description| Usage  
---|---|---  
`upload-figma`| Capture Figma screenshots| `smartui upload-figma [options] <file>`  
`upload-figma-web`| Capture Figma into CLI build| `smartui upload-figma-web [options] <file>`  
`upload-figma-app`| Capture Figma into App build| `smartui upload-figma-app [options] <file>`  
  
Command| Description| Usage  
---|---|---  
`merge branch`| Merge source branch into target| `smartui merge branch [options]`  
`merge build`| Merge source build into target| `smartui merge build [options]`  
  
* * *

## Command Details[â](https://www.testmuai.com/support/docs/smartui-cli-complete-reference#command-details "Direct link to Command Details")

  * exec
  * capture
  * upload
  * upload-pdf
  * exec:start
  * exec:stop
  * exec:ping / exec:pingTest
  * merge
  * Figma Commands

**Execute Tests**

Execute test commands with SmartUI server running.

**Syntax:**
    
    
     smartui exec [options] -- <command>  
    

**Arguments:**

Argument| Description| Example  
---|---|---  
`<command>`| Test command to execute| `npm test`, `mvn test`, `python test.py`  
  
**Options:**

Option| Short| Description| Default  
---|---|---|---  
`--port <number>`| `-P`| Port number for the server| `49152`  
`--fetch-results [filename]`| | Fetch results and save to JSON file| `results.json`  
`--buildName <string>`| | Custom build name for test run| Random  
`--scheduled <string>`| | Specify schedule ID| -  
`--userName <string>`| | TestMu AI username (overrides env)| -  
`--accessKey <string>`| | TestMu AI access key (overrides env)| -  
`--config <file>`| `-c`| Configuration file path| `.smartui.json`  
  
**Examples:**
    
    
     # Basic execution  
    smartui exec -- npm test  
      
    # Custom port  
    smartui exec -P 5000 -- npm test  
      
    # With build name and results  
    smartui exec --buildName "Release-1.0" --fetch-results results.json -- npm test  
      
    # With custom config  
    smartui exec --config custom-config.json -- npm test  
      
    # Override credentials  
    smartui exec --userName "user" --accessKey "key" -- npm test  
    

**Capture Static URLs**

Capture screenshots of static URLs from a configuration file.

**Syntax:**
    
    
     smartui capture [options] <file>  
    

**Arguments:**

Argument| Description| Example  
---|---|---  
`<file>`| Web static config file| `urls.json`  
  
**Options:**

Option| Short| Description| Default  
---|---|---|---  
`--parallel [number]`| `-C`| Number of parallel instances per browser| Auto-calculated  
`--force`| `-F`| Forcefully apply parallel instances| `false`  
`--fetch-results [filename]`| | Fetch results and save to JSON| `results.json`  
`--buildName <string>`| | Custom build name| Random  
`--scheduled <string>`| | Schedule ID| -  
`--userName <string>`| | TestMu AI username| -  
`--accessKey <string>`| | TestMu AI access key| -  
`--config <file>`| `-c`| Configuration file path| `.smartui.json`  
  
**Examples:**
    
    
     # Basic capture  
    smartui capture urls.json --config .smartui.json  
      
    # With parallel execution  
    smartui capture urls.json --parallel 3 --config .smartui.json  
      
    # Force parallel execution  
    smartui capture urls.json --parallel 5 --force --config .smartui.json  
      
    # With build name and results  
    smartui capture urls.json --buildName "Daily-Run" --fetch-results daily-results.json  
    

**Parallel Execution:**

  * Maximum parallel threads: `logâ(N)` where N = total URLs
  * Example: 100 URLs = max 6 threads, 50 URLs = max 5 threads

**Upload Screenshots**

Upload screenshots from a directory for comparison.

**Syntax:**
    
    
     smartui upload [options] <directory>  
    

**Arguments:**

Argument| Description| Example  
---|---|---  
`<directory>`| Path to directory containing screenshots| `./screenshots`  
  
**Options:**

Option| Short| Description| Default  
---|---|---|---  
`--ignoreResolutions`| `-R`| Ignore resolutions, compare by name only| `false`  
`--files <extensions>`| `-F`| Comma-separated allowed extensions| All image types  
`--removeExtensions`| `-E`| Strip extensions from snapshot names| `false`  
`--ignoreDir <patterns>`| `-i`| Comma-separated directories to ignore| -  
`--fetch-results [filename]`| | Fetch results and save to JSON| `results.json`  
`--buildName <string>`| | Custom build name| Random  
`--userName <string>`| | TestMu AI username| -  
`--accessKey <string>`| | TestMu AI access key| -  
  
**Examples:**
    
    
     # Basic upload  
    smartui upload ./screenshots  
      
    # Ignore resolutions  
    smartui upload ./screenshots --ignoreResolutions  
      
    # Filter file types  
    smartui upload ./screenshots --files jpg,png  
      
    # Remove extensions from names  
    smartui upload ./screenshots --removeExtensions  
      
    # Ignore specific directories  
    smartui upload ./screenshots --ignoreDir temp,old  
      
    # Combined options  
    smartui upload ./screenshots -R -E --buildName "Test-Run"  
    

**Upload PDFs**

Upload PDF files for visual comparison.

**Syntax:**
    
    
     smartui upload-pdf [options] <directory>  
    

**Arguments:**

Argument| Description| Example  
---|---|---  
`<directory>`| Path to directory or single PDF file| `./pdfs` or `./document.pdf`  
  
**Options:**

Option| Description| Default  
---|---|---  
`--fetch-results [filename]`| Fetch results and save to JSON| `results.json`  
`--buildName <string>`| Custom build name| Random  
`--markBaseline`| Mark this build as baseline| `false`  
`--projectToken <token>`| Project token (if not in env)| -  
  
**Examples:**
    
    
     # Upload directory of PDFs  
    smartui upload-pdf ./pdfs --buildName "Release-v2.1"  
      
    # Upload single PDF  
    smartui upload-pdf ./document.pdf --buildName "Single-PDF"  
      
    # Mark as baseline  
    smartui upload-pdf ./pdfs --markBaseline --buildName "Baseline-v1.0"  
      
    # With results  
    smartui upload-pdf ./pdfs --fetch-results pdf-results.json  
    

**Start Server**

Start the SmartUI snapshot server.

**Syntax:**
    
    
     smartui exec:start [options]  
    

**Options:**

Option| Short| Description| Default  
---|---|---|---  
`--port <number>`| `-P`| Port number for server| `49152`  
`--fetch-results [filename]`| | Fetch results and save to JSON| `results.json`  
`--buildName <string>`| | Custom build name| Random  
  
**Examples:**
    
    
     # Start on default port  
    smartui exec:start  
      
    # Start on custom port  
    smartui exec:start -P 5000  
      
    # With build name  
    smartui exec:start --buildName "Server-Build"  
    

**Usage Workflow:**

  1. Start server:
         
         smartui exec:start  
         

  2. Set server address (for non-Selenium SDKs):
         
         export SMARTUI_SERVER_ADDRESS='http://localhost:49152'  
         

  3. Run tests:
         
         npm test  
         

  4. Stop server:
         
         smartui exec:stop  
         

**Stop Server**

Stop the SmartUI snapshot server.

**Syntax:**
    
    
     smartui exec:stop  
    

**Important:** Always use `exec:stop` instead of Ctrl+C. Using Ctrl+C will cause the build to stop after 12 minutes.

**Check Server Status**

Check if the SmartUI server is running.

**Syntax:**
    
    
     smartui exec:ping  
    # or  
    smartui exec:pingTest  
    

**Command Comparison:**

Command| Description| HTTP Client  
---|---|---  
`exec:ping`| Check server status| Custom HTTP client  
`exec:pingTest`| Check server status| Default HTTP client  
  
**Merge Branches/Builds**

Merge source branch or build into target.

**Merge Branch Syntax:**
    
    
     smartui merge branch [options]  
    

**Merge Branch Options:**

Option| Description| Required  
---|---|---  
`--source <string>`| Source branch to merge| Yes  
`--target <string>`| Target branch to merge into| Yes  
  
**Merge Build Syntax:**
    
    
     smartui merge build [options]  
    

**Merge Build Options:**

Option| Description| Required  
---|---|---  
`--source <string>`| Source build to merge| Yes  
`--target <string>`| Target build to merge into| Yes  
  
**Examples:**
    
    
     # Merge feature branch into main  
    smartui merge branch --source feature/new-ui --target main  
      
    # Merge build  
    smartui merge build --source "Build-123" --target "Baseline-Build"  
    

**Figma Integration Commands**

  * upload-figma
  * upload-figma-web
  * upload-figma-app

Upload Figma designs for visual comparison.

**Syntax:**
    
    
     smartui upload-figma [options] <file>  
    

**Arguments:**

Argument| Description| Example  
---|---|---  
`<file>`| Figma design config file| `figma-config.json`  
  
**Options:**

Option| Description| Default  
---|---|---  
`--markBaseline`| Mark uploaded images as baseline| `false`  
`--buildName <buildName>`| Name of the build| Random  
  
Capture Figma screenshots into CLI build.

**Syntax:**
    
    
     smartui upload-figma-web [options] <file>  
    

**Arguments:**

Argument| Description| Example  
---|---|---  
`<file>`| Figma config file| `figma-config.json`  
  
**Options:**

Option| Description| Default  
---|---|---  
`--markBaseline`| Mark as baseline| `false`  
`--buildName <buildName>`| Build name| Random  
`--fetch-results [filename]`| Fetch results and save to JSON| `results.json`  
  
Capture Figma screenshots into App build.

**Syntax:**
    
    
     smartui upload-figma-app [options] <file>  
    

**Arguments:**

Argument| Description| Example  
---|---|---  
`<file>`| Figma config file| `figma-config.json`  
  
**Options:**

Option| Description| Default  
---|---|---  
`--markBaseline`| Mark as baseline| `false`  
`--buildName <buildName>`| Build name| Random  
`--fetch-results [filename]`| Fetch results and save to JSON| `results.json`  
  
* * *

## Global Options[â](https://www.testmuai.com/support/docs/smartui-cli-complete-reference#global-options "Direct link to Global Options")

These options can be used with most commands:

Option| Short| Description  
---|---|---  
`--version`| `-V`| Output version number  
`--config <filepath>`| `-c`| Config file path  
`--markBaseline`| | Mark this build as baseline  
`--baselineBranch <string>`| | Mark build baseline for branch  
`--baselineBuild <string>`| | Mark build baseline  
`--githubURL <string>`| | GitHub URL including commit ID  
`--help`| `-h`| Display help  
  
* * *

## Storybook CLI Commands[â](https://www.testmuai.com/support/docs/smartui-cli-complete-reference#storybook-cli-commands "Direct link to Storybook CLI Commands")

  * storybook Command
  * config Command

**Main Command**

**Syntax:**
    
    
     smartui storybook [options] <url|directory>  
    

**Arguments:**

Argument| Description| Example  
---|---|---  
`<url|directory>`| Storybook URL or static build directory| `http://localhost:6006` or `./storybook-static`  
  
**Options:**

Option| Short| Description| Default  
---|---|---|---  
`--config <file>`| `-c`| Config file path| `.smartui.json`  
`--force-rebuild`| | Force rebuild of existing build| `false`  
`--buildName <string>`| | Build name for pipeline| Random  
`--env <prod|stage>`| | Runtime environment| `prod`  
  
**Examples:**
    
    
     # Local Storybook server  
    smartui storybook http://localhost:6006 --config .smartui.json  
      
    # Static build  
    smartui storybook ./storybook-static --config .smartui.json  
      
    # Public hosted URL  
    smartui storybook https://your-storybook-url.com --config .smartui.json  
      
    # Force rebuild  
    smartui storybook ./storybook-static --force-rebuild  
      
    # Stage environment  
    smartui storybook http://localhost:6006 --env stage  
    

**Config Command**

**Syntax:**
    
    
     smartui config create [filepath]  
    

**Arguments:**

Argument| Description| Default  
---|---|---  
`[filepath]`| Optional config file path| `.smartui.json`  
  
**Options:**

Option| Description  
---|---  
`--help`, `-h`| Display help information  
  
**Description:** Create a SmartUI Storybook configuration file with default settings.

* * *

## Advanced Options[â](https://www.testmuai.com/support/docs/smartui-cli-complete-reference#advanced-options "Direct link to Advanced Options")

### Hidden/Advanced Options[â](https://www.testmuai.com/support/docs/smartui-cli-complete-reference#hiddenadvanced-options "Direct link to Hidden/Advanced Options")

These options are available but may not be prominently documented:

Option| Commands| Description| Example  
---|---|---|---  
`--scheduled <string>`| `capture`, `exec`| Specify schedule ID for scheduled test runs| `smartui capture urls.json --scheduled "schedule-123"`  
`--userName <string>`| `capture`, `exec`, `upload`| Override TestMu AI username (overrides env)| `smartui capture urls.json --userName "user"`  
`--accessKey <string>`| `capture`, `exec`, `upload`| Override TestMu AI access key (overrides env)| `smartui exec --accessKey "key" -- npm test`  
`--env <prod|stage>`| `storybook`| Switch between production and staging environments| `smartui storybook http://localhost:6006 --env stage`  
`--force`| `capture`| Forcefully apply parallel instances even if not optimal| `smartui capture urls.json --parallel 10 --force`  
`--force-rebuild`| `storybook`| Force rebuild of an already existing Storybook build| `smartui storybook ./storybook-static --force-rebuild`  
  
**Usage Examples:**
    
    
    # Scheduled test runs  
    smartui capture urls.json --scheduled "schedule-123"  
    smartui exec --scheduled "schedule-123" -- npm test  
      
    # Override credentials  
    smartui capture urls.json --userName "user" --accessKey "key"  
    smartui exec --userName "user" --accessKey "key" -- npm test  
      
    # Environment switching (Storybook)  
    smartui storybook http://localhost:6006 --env stage  
    smartui storybook http://localhost:6006 --env prod  
      
    # Force parallel execution  
    smartui capture urls.json --parallel 10 --force  
      
    # Force rebuild (Storybook)  
    smartui storybook ./storybook-static --force-rebuild  
    

* * *

## Environment Variables[â](https://www.testmuai.com/support/docs/smartui-cli-complete-reference#environment-variables "Direct link to Environment Variables")

  * Authentication
  * Project Configuration
  * Proxy Configuration
  * Server Configuration
  * Debug & Advanced

Variable| Description| Required  
---|---|---  
`PROJECT_TOKEN`| SmartUI project token| Yes (for CLI projects)  
`LT_USERNAME`| TestMu AI username| Yes (for Hooks)  
`LT_ACCESS_KEY`| TestMu AI access key| Yes (for Hooks)  
  
Variable| Description| Default  
---|---|---  
`PROJECT_NAME`| Project name (creates if doesn't exist)| -  
`BASELINE_BRANCH`| Baseline branch for CLI projects| -  
`CURRENT_BRANCH`| Current branch for CLI projects| -  
  
Variable| Description| Format  
---|---|---  
`HTTP_PROXY`| HTTP proxy URL| `http://[user:pass@]host:port/`  
`HTTPS_PROXY`| HTTPS proxy URL| `https://[user:pass@]host:port/`  
`NO_PROXY`| Comma-separated hosts to bypass| `localhost,127.0.0.1`  
  
Variable| Description| Default  
---|---|---  
`SMARTUI_SERVER_ADDRESS`| Server address for SDKs| `http://localhost:49152`  
  
Variable| Description| Default  
---|---|---  
`LT_SDK_DEBUG`| Enable debug mode| `false`  
`SMARTUI_DO_NOT_USE_CAPTURED_COOKIES`| Disable captured cookies| `false`  
  
**Setting Environment Variables:**

  * MacOS/Linux
  * Windows CMD
  * PowerShell

    
    
    export PROJECT_TOKEN="123456#token"  
    export LT_USERNAME="username"  
    export LT_ACCESS_KEY="access_key"  
    export HTTP_PROXY="http://proxy:8080"  
    export LT_SDK_DEBUG=true  
    
    
    
    set PROJECT_TOKEN="123456#token"  
    set LT_USERNAME="username"  
    set LT_ACCESS_KEY="access_key"  
    set HTTP_PROXY="http://proxy:8080"  
    set LT_SDK_DEBUG=true  
    
    
    
    $env:PROJECT_TOKEN="123456#token"  
    $env:LT_USERNAME="username"  
    $env:LT_ACCESS_KEY="access_key"  
    $env:HTTP_PROXY="http://proxy:8080"  
    $env:LT_SDK_DEBUG="true"  
    

* * *

## End-to-End Workflows[â](https://www.testmuai.com/support/docs/smartui-cli-complete-reference#end-to-end-workflows "Direct link to End-to-End Workflows")

  * Static URL Capture
  * SDK Test Execution
  * Upload Screenshots
  * Storybook Testing
  * PDF Testing
  * CI/CD Integration

**Basic Static URL Capture**
    
    
     # 1. Install CLI  
    npm install -g @lambdatest/smartui-cli  
      
    # 2. Set project token  
    export PROJECT_TOKEN="123456#token"  
      
    # 3. Create config  
    npx smartui config:create .smartui.json  
      
    # 4. Create URLs file (urls.json)  
    # 5. Capture screenshots  
    npx smartui capture urls.json --config .smartui.json  
      
    # 6. Fetch results  
    npx smartui capture urls.json --fetch-results results.json  
    

**SDK Test Execution**
    
    
     # 1. Set project token  
    export PROJECT_TOKEN="123456#token"  
      
    # 2. Start server  
    npx smartui exec:start  
      
    # 3. Set server address (for non-Selenium)  
    export SMARTUI_SERVER_ADDRESS='http://localhost:49152'  
      
    # 4. Run tests  
    npm test  
      
    # 5. Stop server  
    npx smartui exec:stop  
    

**Upload Existing Screenshots**
    
    
     # 1. Set project token  
    export PROJECT_TOKEN="123456#token"  
      
    # 2. Upload directory  
    npx smartui upload ./screenshots --buildName "Manual-Test"  
      
    # 3. With options  
    npx smartui upload ./screenshots \  
      --ignoreResolutions \  
      --removeExtensions \  
      --buildName "Test-Run" \  
      --fetch-results results.json  
    

**Storybook Testing**
    
    
     # 1. Install Storybook CLI  
    npm install -g @lambdatest/smartui-storybook  
      
    # 2. Set project token  
    export PROJECT_TOKEN="123456#token"  
      
    # 3. Start Storybook  
    npm run storybook  
      
    # 4. Capture stories  
    smartui storybook http://localhost:6006 --config .smartui.json  
      
    # 5. Or use static build  
    npm run build-storybook  
    smartui storybook ./storybook-static --config .smartui.json  
    

**PDF Testing**
    
    
     # 1. Set project token  
    export PROJECT_TOKEN="123456#token"  
      
    # 2. Upload PDFs  
    npx smartui upload-pdf ./pdfs --buildName "PDF-Release-v1.0"  
      
    # 3. Mark as baseline  
    npx smartui upload-pdf ./pdfs --markBaseline --buildName "PDF-Baseline"  
    

**CI/CD Integration**

**GitHub Actions Example:**
    
    
     - name: Run SmartUI Tests  
      env:  
        PROJECT_TOKEN: ${{ secrets.PROJECT_TOKEN }}  
      run: |  
        npm install -g @lambdatest/smartui-cli  
        npx smartui exec --buildName "${{ github.sha }}" -- npm test  
    

**GitLab CI Example:**
    
    
     test:  
      variables:  
        PROJECT_TOKEN: $PROJECT_TOKEN  
      script:  
        - npm install -g @lambdatest/smartui-cli  
        - npx smartui exec --buildName "$CI_COMMIT_SHA" -- npm test  
    

* * *

## Best Practices[â](https://www.testmuai.com/support/docs/smartui-cli-complete-reference#best-practices "Direct link to Best Practices")

  * Build Naming
  * Configuration Management
  * Parallel Execution
  * Server Management
  * Error Handling
  * Results Reporting
  * URL Grouping for Large Test Suites

**Build Naming**

  * Use meaningful, consistent names
  * Include version or commit info
  * Avoid special characters
  * Use environment variables for dynamic names

    
    
    # Good  
    --buildName "Release-v1.0.0"  
    --buildName "$(git rev-parse --short HEAD)"  
    --buildName "${{ github.sha }}"  
      
    # Bad  
    --buildName "test"  
    --buildName "build-$(date)"  
    

**Configuration Management**

  * Keep config files in version control
  * Use environment variables for sensitive data
  * Document custom configurations
  * Use separate configs for different environments

**Parallel Execution**

  * Start with lower thread counts
  * Monitor system resources
  * Use `--force` only when necessary
  * Calculate optimal threads: `logâ(N)`

**Server Management**

  * Always use `exec:stop` to terminate server
  * Check server status with `exec:ping`
  * Use custom ports to avoid conflicts
  * Set `SMARTUI_SERVER_ADDRESS` before running tests

**Error Handling**

  * Always use `--fetch-results` for CI/CD
  * Check exit codes in scripts
  * Implement retry logic for transient failures
  * Log errors for debugging

**Results Reporting**

Use the [SmartUI Reporter](https://smartui-reporter.netlify.app/) to visualize and analyze test results:

  1. **Export Results** : Use `--fetch-results` flag to generate JSON
         
         npx smartui capture urls.json --config config.json --fetch-results results.json  
         

  2. **Upload to Reporter** : Visit [SmartUI Reporter](https://smartui-reporter.netlify.app/) and upload `results.json`

  3. **View & Export**: Access tabular view with statistics, screenshot links, and export to PDF/CSV

**Alternative** : Fetch results via [SmartUI API](https://swagger-api-support.lambdatest.com/smartui/index.html#/Fetch%20Build%20Screenshots)

For detailed steps, see [Fetch Results Documentation](https://www.testmuai.com/support/docs/smartui-sdk-fetch-results/#using-smartui-reporter-tool).

**URL Grouping for Large Test Suites**

When working with large numbers of URLs (1000+) that can be divided into sections/groups, you have two strategies:

**Strategy 1: Single Project with Branching**

  * Use one SmartUI project with Smart Git branching
  * All sections in a single project dashboard
  * Each section can have its own branch
  * Unified tracking and reporting

    
    
    # Enable Smart Git  
    export SMART_GIT=true  
      
    # Run different sections in different branches  
    git checkout -b section1-bathroom  
    npx smartui capture sections/section1.json --config config.json --buildName "Section1-Bathroom"  
    

**Strategy 2: Separate Projects**

  * Create individual projects for each section
  * Complete isolation between sections
  * Independent baselines and approvals
  * Minimal projects with single branch

    
    
    # Section 1 - Bathroom Project  
    export PROJECT_TOKEN="${PROJECT_TOKEN_BATHROOM}"  
    npx smartui capture bathroom/urls.json --config config.json  
      
    # Section 2 - Kitchens Project  
    export PROJECT_TOKEN="${PROJECT_TOKEN_KITCHENS}"  
    npx smartui capture kitchens/urls.json --config config.json  
    

**When to Use Each:**

  * **Single Project** : Unified dashboard, cross-section analysis, shared configs
  * **Separate Projects** : Complete isolation, independent workflows, different configs

For detailed guidance, see [SmartUI Capture Onboarding with HyperExecute](https://www.testmuai.com/support/docs/hyperexecute-smart-ui-capture-onboarding/#11-url-grouping-strategies-for-large-test-suites).

* * *

## Troubleshooting[â](https://www.testmuai.com/support/docs/smartui-cli-complete-reference#troubleshooting "Direct link to Troubleshooting")

  * Server Not Running
  * Port Conflicts
  * Authentication Issues
  * Configuration Errors

**Server Not Running**
    
    
     # Check status  
    npx smartui exec:ping  
      
    # Start server  
    npx smartui exec:start  
      
    # Verify address  
    echo $SMARTUI_SERVER_ADDRESS  
    

**Port Conflicts**
    
    
     # Use custom port  
    npx smartui exec:start -P 5000  
    npx smartui exec -P 5000 -- npm test  
    

**Authentication Issues**
    
    
     # Verify credentials  
    echo $PROJECT_TOKEN  
    echo $LT_USERNAME  
    echo $LT_ACCESS_KEY  
      
    # Override with command options  
    npx smartui capture urls.json --userName "user" --accessKey "key"  
    

**Configuration Errors**
    
    
     # Validate JSON  
    cat .smartui.json | python -m json.tool  
      
    # Check config path  
    npx smartui capture urls.json --config .smartui.json  
    

* * *

## Additional Resources[â](https://www.testmuai.com/support/docs/smartui-cli-complete-reference#additional-resources "Direct link to Additional Resources")

  * [SmartUI CLI Documentation](https://www.testmuai.com/support/docs/smartui-cli)
  * [CLI Exec Commands](https://www.testmuai.com/support/docs/smartui-cli-exec)
  * [CLI Upload](https://www.testmuai.com/support/docs/smartui-cli-upload)
  * [Environment Variables](https://www.testmuai.com/support/docs/smartui-cli-env-variables)
  * [Storybook Integration](https://www.testmuai.com/support/docs/smart-ui-storybook)
  * [Configuration Options](https://www.testmuai.com/support/docs/smartui-sdk-config-options)
  * [Troubleshooting Guide](https://www.testmuai.com/support/docs/smartui-troubleshooting-guide)

---

*Auto-generated from TestMu AI documentation.*