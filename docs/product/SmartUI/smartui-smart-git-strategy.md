# Smart Git Strategy in SmartUI

> **Source**: [https://www.testmuai.com/support/docs/smartui-smart-git-strategy](https://www.testmuai.com/support/docs/smartui-smart-git-strategy)

**Product**: SmartUI

**Last Crawled**: 2026-01-27T21:04:28.570142

---

On this page

* * *

info

Smart Git is an advanced feature in SmartUI that provides intelligent branch comparison and management capabilities. This guide explains how to use Smart Git effectively in your visual regression testing workflow.

## What is Smart Git?[â](https://www.testmuai.com/support/docs/smartui-smart-git-strategy#what-is-smart-git "Direct link to What is Smart Git?")

Smart Git is a feature that enhances the default Git branching strategy in SmartUI by providing more flexible and intelligent branch comparison capabilities. When enabled, it automatically compares the latest build of a branch against the latest approved version of the same branch, regardless of the project's baseline settings.

### Key Benefits[â](https://www.testmuai.com/support/docs/smartui-smart-git-strategy#key-benefits "Direct link to Key Benefits")

  1. **Intelligent Comparison** : Automatically compares against the latest approved version of the same branch
  2. **Flexible Workflow** : Works independently of project baseline settings
  3. **Easy Configuration** : Simple environment variable toggle
  4. **Fallback Support** : Gracefully falls back to default behavior when disabled

## Enabling Smart Git[â](https://www.testmuai.com/support/docs/smartui-smart-git-strategy#enabling-smart-git "Direct link to Enabling Smart Git")

Smart Git can be enabled using an environment variable:

  * MacOS/Linux
  * Windows
  * PowerShell

    
    
    export SMART_GIT=true  
    
    
    
    set SMART_GIT=true  
    
    
    
    $env:SMART_GIT="true"  
    

## How Smart Git Works[â](https://www.testmuai.com/support/docs/smartui-smart-git-strategy#how-smart-git-works "Direct link to How Smart Git Works")

### Default vs Smart Git Behavior[â](https://www.testmuai.com/support/docs/smartui-smart-git-strategy#default-vs-smart-git-behavior "Direct link to Default vs Smart Git Behavior")

#### Default Behavior (SMART_GIT=false)[â](https://www.testmuai.com/support/docs/smartui-smart-git-strategy#default-behavior-smart_gitfalse "Direct link to Default Behavior \(SMART_GIT=false\)")

  * Compares builds against the project's configured baseline branch
  * All branches are compared against the same baseline
  * Changes must be approved in the baseline branch

#### Smart Git Behavior (SMART_GIT=true)[â](https://www.testmuai.com/support/docs/smartui-smart-git-strategy#smart-git-behavior-smart_gittrue "Direct link to Smart Git Behavior \(SMART_GIT=true\)")

  * Compares builds against the latest approved version of the same branch
  * Each branch maintains its own comparison history
  * Changes can be approved independently in each branch
  * **Automatic Approval** : New branches are automatically approved when first created, serving as their own baseline

### Comparison Flow[â](https://www.testmuai.com/support/docs/smartui-smart-git-strategy#comparison-flow "Direct link to Comparison Flow")

  1. **Build Execution** :
         
         # Enable Smart Git  
         export SMART_GIT=true  
           
         # Run your tests  
         npx smartui --config .smartui.json exec -- <Your execution command>  
         

  2. **Comparison Process** :

     * SmartUI identifies the current branch
     * Finds the latest approved build in the same branch
     * Compares the new build against the latest approved version
     * Generates a comparison report

## Use Cases and Simulations[â](https://www.testmuai.com/support/docs/smartui-smart-git-strategy#use-cases-and-simulations "Direct link to Use Cases and Simulations")

### Use Case 1: Feature Branch Development[â](https://www.testmuai.com/support/docs/smartui-smart-git-strategy#use-case-1-feature-branch-development "Direct link to Use Case 1: Feature Branch Development")

**Scenario** : You're developing a new feature in a feature branch and want to track visual changes independently.
    
    
    # Create and switch to feature branch  
    git checkout -b feature/new-login  
      
    # Enable Smart Git  
    export SMART_GIT=true  
      
    # Make changes and run tests with different CLI commands  
    npx smartui --config .smartui.json exec -- <Your execution command> --buildName "feature-login-tests"  
    npx smartui upload-figma-web designs.json --buildName "feature-login-designs"  
    npx smartui capture urls.json --buildName "feature-login-capture"  
    

**Result** :

  * Builds are compared against the latest approved version in `feature/new-login`
  * Changes can be approved without affecting the main branch
  * Independent visual regression tracking for the feature
  * First build in the new branch is automatically approved as its baseline

### Use Case 2: Parallel Development[â](https://www.testmuai.com/support/docs/smartui-smart-git-strategy#use-case-2-parallel-development "Direct link to Use Case 2: Parallel Development")

**Scenario** : Multiple teams working on different features in separate branches.
    
    
    # Team A: Feature branch  
    git checkout -b feature/team-a  
    export SMART_GIT=true  
    npx smartui --config .smartui.json exec -- <Team A tests>  
      
    # Team B: Different feature branch  
    git checkout -b feature/team-b  
    export SMART_GIT=true  
    npx smartui --config .smartui.json exec -- <Team B tests>  
    

**Result** :

  * Each team's changes are tracked independently
  * No interference between different feature branches
  * Teams can approve their changes without waiting for others

### Use Case 3: Hotfix Development[â](https://www.testmuai.com/support/docs/smartui-smart-git-strategy#use-case-3-hotfix-development "Direct link to Use Case 3: Hotfix Development")

**Scenario** : Need to make urgent fixes in a hotfix branch.
    
    
    # Create hotfix branch  
    git checkout -b hotfix/security-patch  
      
    # Enable Smart Git  
    export SMART_GIT=true  
      
    # Run tests  
    npx smartui --config .smartui.json exec -- <Your execution command>  
    

note

The Smart Git management works consistently across all SmartUI CLI commands (`exec`, `capture`, `upload`, `upload-figma-web`, `upload-figma-app`), ensuring a unified experience whether you're executing tests, capturing screenshots, uploading images, or comparing Figma designs with web pages or mobile apps. Each command supports the `--buildName` flag to provide custom names for your builds.

**Result** :

  * Quick visual regression testing for hotfix
  * Independent approval process
  * No impact on other branches' baselines

## Best Practices[â](https://www.testmuai.com/support/docs/smartui-smart-git-strategy#best-practices "Direct link to Best Practices")

  * Branch Naming
  * Regular Updates
  * Approval Process
  * Documentation
  * Cleanup

**Branch Naming**

Use clear, consistent branch naming conventions.

**Regular Updates**

Keep branches up to date with their parent branches.

**Approval Process**

Establish clear approval criteria for each branch.

**Documentation**

Document branch-specific visual changes.

**Cleanup**

Regularly clean up old branches and their builds.

## Troubleshooting[â](https://www.testmuai.com/support/docs/smartui-smart-git-strategy#troubleshooting "Direct link to Troubleshooting")

  * Comparison Issues
  * Approval Issues

**Comparison Issues**

  1. **Comparison Issues** :
     * Verify Smart Git is enabled: `echo $SMART_GIT`
     * Check branch name: `git branch --show-current`
     * Ensure previous builds exist in the branch

**Approval Issues**

  1. **Approval Issues** :
     * Verify you have necessary permissions
     * Check if the build is in an approvable state
     * Ensure the branch has previous approved builds

### Getting Help[â](https://www.testmuai.com/support/docs/smartui-smart-git-strategy#getting-help "Direct link to Getting Help")

If you encounter any issues with Smart Git, please contact our support team at [[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection#463533363629343206322335322b3368272f).

---

*Auto-generated from TestMu AI documentation.*