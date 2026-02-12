# Baseline Management

> **Source**: [https://www.testmuai.com/support/docs/smartui-baseline-management](https://www.testmuai.com/support/docs/smartui-baseline-management)

**Product**: SmartUI

**Last Crawled**: 2026-01-27T21:03:15.698227

---

On this page

In SmartUI, a **Baseline** is the reference image used for comparison against future test runs. Effective baseline management is crucial for accurate visual regression testing. This guide explains how baselines are created, updated, and maintained.

## What is a Baseline?[â](https://www.testmuai.com/support/docs/smartui-baseline-management#what-is-a-baseline "Direct link to What is a Baseline?")

A baseline represents the "expected" state of your application's UI. When you run a SmartUI test, the new screenshots are compared against this baseline to detect unauthorized visual changes.

A baseline in SmartUI represents the reference point for visual regression testing. It's the set of screenshots against which all future builds are compared.

info

For detailed guidance on approval, reject, move, and merge functions, see our comprehensive [Approval & Baseline Management Guide](https://www.testmuai.com/support/docs/smartui-approval-workflow-guide/).

### Types of Baselines[â](https://www.testmuai.com/support/docs/smartui-baseline-management#types-of-baselines "Direct link to Types of Baselines")

  1. **Project Baseline** : Set in project settings, used as the default comparison point
  2. **Branch Baseline** : Specific to a branch, used when Smart Git is enabled
  3. **Dynamic Baseline** : Specified during test execution
  4. **Build Baseline** : A specific build marked as baseline

## Dynamic Baseline Specification[â](https://www.testmuai.com/support/docs/smartui-baseline-management#dynamic-baseline-specification "Direct link to Dynamic Baseline Specification")

SmartUI allows you to specify baselines dynamically during test execution, providing flexibility in your testing workflow.

### Branch-based Baseline[â](https://www.testmuai.com/support/docs/smartui-baseline-management#branch-based-baseline "Direct link to Branch-based Baseline")
    
    
    npx smartui --baselineBranch "branch-name" exec -- <execution command>  
    

**Use Cases** :

  * Testing against a specific branch's latest approved build
  * Comparing feature branch against development branch
  * Testing hotfix against production branch

### Build-based Baseline[â](https://www.testmuai.com/support/docs/smartui-baseline-management#build-based-baseline "Direct link to Build-based Baseline")
    
    
    npx smartui --baselineBuild "build-name" exec -- <execution command>  
    

**Use Cases** :

  * Testing against a specific build version
  * Comparing against a known good build
  * Testing against a production build

## Mark as Baseline[â](https://www.testmuai.com/support/docs/smartui-baseline-management#mark-as-baseline "Direct link to Mark as Baseline")

SmartUI provides the ability to mark builds as baseline directly through the CLI. This overwrites the global baseline branch present in the Project Settings.

### Basic Usage[â](https://www.testmuai.com/support/docs/smartui-baseline-management#basic-usage "Direct link to Basic Usage")
    
    
    npx smartui --markBaseline exec -- <execution command>  
    

## Baseline Management Strategies[â](https://www.testmuai.com/support/docs/smartui-baseline-management#baseline-management-strategies "Direct link to Baseline Management Strategies")

### 1\. Feature Development[â](https://www.testmuai.com/support/docs/smartui-baseline-management#1-feature-development "Direct link to 1. Feature Development")

**Scenario** : Managing baselines during feature development
    
    
    # 1. Set feature branch baseline  
    npx smartui --baselineBranch "feature/new-login" exec -- <execution command>  
    

### 2\. Hotfix Management[â](https://www.testmuai.com/support/docs/smartui-baseline-management#2-hotfix-management "Direct link to 2. Hotfix Management")

**Scenario** : Managing baselines for hotfixes
    
    
    # 1. Set production as baseline  
    npx smartui --baselineBranch "production" exec -- <execution command>  
    

### 3\. Release Management[â](https://www.testmuai.com/support/docs/smartui-baseline-management#3-release-management "Direct link to 3. Release Management")

**Scenario** : Managing baselines for releases
    
    
    # 1. Set staging as baseline  
    npx smartui --baselineBranch "staging" upload <dirName>  
      
    # 2. Mark release as new baseline  
    npx smartui --markBaseline capture urls.json  
    

## Best Practices[â](https://www.testmuai.com/support/docs/smartui-baseline-management#best-practices "Direct link to Best Practices")

  * Baseline Selection
  * Branch Management
  * Build Management
  * Approval Process

**Baseline Selection**

  * Choose stable builds as baselines
  * Document baseline selection criteria
  * Regular baseline updates

**Branch Management**

  * Clear branch naming conventions
  * Document branch purposes
  * Regular branch cleanup

**Build Management**

  * Meaningful build names
  * Document build purposes
  * Regular build cleanup

**Approval Process**

  * Clear approval criteria
  * Document approval decisions
  * Maintain audit trail

## Troubleshooting[â](https://www.testmuai.com/support/docs/smartui-baseline-management#troubleshooting "Direct link to Troubleshooting")

  * Common Issues
  * Baseline Not Found
  * Permission Denied
  * Baseline Mismatch

**Common Issues**

  1. **Baseline Issues** :

     * Verify baseline exists
     * Check baseline status
     * Review baseline history
  2. **Comparison Issues** :

     * Verify build compatibility
     * Check branch status
     * Review comparison settings
  3. **Permission Issues** :

     * Verify user permissions
     * Check branch protection
     * Review access settings

**Baseline Not Found**

**Error** : Baseline branch or build does not exist

**Solutions** :

  1. Verify the baseline branch/build name is correct
  2. Ensure the baseline has at least one approved build
  3. Check branch/build exists in your project

    
    
    # Verify baseline exists before using  
    npx smartui --baselineBranch "main" exec -- <command>  
    

**Permission Denied**

**Error** : Insufficient permissions to set baseline

**Solutions** :

  1. Verify you have admin or approver permissions
  2. Check project settings for baseline management permissions
  3. Contact project admin for access

**Baseline Mismatch**

**Error** : Screenshot names don't match between baseline and current build

**Solutions** :

  1. Ensure screenshot names are consistent
  2. Check if screenshot names changed between builds
  3. Review screenshot naming conventions

## Visual Examples[â](https://www.testmuai.com/support/docs/smartui-baseline-management#visual-examples "Direct link to Visual Examples")

### Setting Baseline via Dashboard[â](https://www.testmuai.com/support/docs/smartui-baseline-management#setting-baseline-via-dashboard "Direct link to Setting Baseline via Dashboard")

  1. Navigate to your project in SmartUI dashboard
  2. Open the build you want to set as baseline
  3. Click on the "Mark as Baseline" button
  4. Confirm the action

### Baseline Branch Configuration[â](https://www.testmuai.com/support/docs/smartui-baseline-management#baseline-branch-configuration "Direct link to Baseline Branch Configuration")

In Project Settings â Build Settings â Git Settings:

  * Set your baseline branch name (e.g., "main", "production")
  * Configure auto-approval branches
  * Link your Git repository

### Dynamic Baseline in CLI[â](https://www.testmuai.com/support/docs/smartui-baseline-management#dynamic-baseline-in-cli "Direct link to Dynamic Baseline in CLI")
    
    
    # Use specific branch as baseline  
    npx smartui --baselineBranch "staging" exec -- npm test  
      
    # Use specific build as baseline  
    npx smartui --baselineBuild "Release-1.0" exec -- npm test  
      
    # Mark current build as baseline  
    npx smartui --markBaseline exec -- npm test  
    

## Advanced Scenarios[â](https://www.testmuai.com/support/docs/smartui-baseline-management#advanced-scenarios "Direct link to Advanced Scenarios")

### Scenario 1: Multi-Branch Baseline Strategy[â](https://www.testmuai.com/support/docs/smartui-baseline-management#scenario-1-multi-branch-baseline-strategy "Direct link to Scenario 1: Multi-Branch Baseline Strategy")

**Use Case** : Different baselines for different branches
    
    
    # Feature branch compares against develop  
    npx smartui --baselineBranch "develop" exec -- npm test  
      
    # Release branch compares against staging  
    npx smartui --baselineBranch "staging" exec -- npm test  
    

### Scenario 2: Version-Based Baselines[â](https://www.testmuai.com/support/docs/smartui-baseline-management#scenario-2-version-based-baselines "Direct link to Scenario 2: Version-Based Baselines")

**Use Case** : Compare against specific version builds
    
    
    # Compare against v1.0.0 build  
    npx smartui --baselineBuild "v1.0.0" exec -- npm test  
      
    # Compare against v2.0.0 build  
    npx smartui --baselineBuild "v2.0.0" exec -- npm test  
    

### Scenario 3: Hotfix Baseline Management[â](https://www.testmuai.com/support/docs/smartui-baseline-management#scenario-3-hotfix-baseline-management "Direct link to Scenario 3: Hotfix Baseline Management")

**Use Case** : Hotfix needs to compare against production
    
    
    # Hotfix branch compares against production  
    npx smartui --baselineBranch "production" exec -- npm test  
      
    # After approval, mark hotfix as new baseline  
    npx smartui --markBaseline exec -- npm test  
    

## Integration with Git[â](https://www.testmuai.com/support/docs/smartui-baseline-management#integration-with-git "Direct link to Integration with Git")

### Git-Based Projects[â](https://www.testmuai.com/support/docs/smartui-baseline-management#git-based-projects "Direct link to Git-Based Projects")

For projects integrated with Git:

  1. Baseline is automatically managed via Git branches
  2. Baseline branch is set in Project Settings â Git Settings
  3. Non-baseline branches compare against baseline branch
  4. Smart Baseline feature is not available for Git projects

### Git Branching Strategy[â](https://www.testmuai.com/support/docs/smartui-baseline-management#git-branching-strategy "Direct link to Git Branching Strategy")
    
    
    # Main branch is baseline  
    Baseline: main  
      
    # Feature branches compare against main  
    Feature: feature/login â compares against main  
      
    # Release branches compare against main  
    Release: release/1.0 â compares against main  
    

## Monitoring and Maintenance[â](https://www.testmuai.com/support/docs/smartui-baseline-management#monitoring-and-maintenance "Direct link to Monitoring and Maintenance")

### Baseline Health Checks[â](https://www.testmuai.com/support/docs/smartui-baseline-management#baseline-health-checks "Direct link to Baseline Health Checks")

Regularly monitor:

  * Baseline build age (update stale baselines)
  * Baseline screenshot count (ensure completeness)
  * Baseline approval status (verify all screenshots approved)

### Baseline Updates[â](https://www.testmuai.com/support/docs/smartui-baseline-management#baseline-updates "Direct link to Baseline Updates")

Best practices for updating baselines:

  1. Update after major releases
  2. Update after UI framework changes
  3. Update after design system updates
  4. Document baseline update reason

info

For detailed guidance on approval, reject, move, and merge functions across different workflows, see our [Approval & Baseline Management Guide](https://www.testmuai.com/support/docs/smartui-approval-workflow-guide/).

### Getting Help[â](https://www.testmuai.com/support/docs/smartui-baseline-management#getting-help "Direct link to Getting Help")

If you encounter any issues with baseline management in SmartUI, please contact our support team at [[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection#5d2e282d2d322f291d29382e293028733c34) or use the [24/7 Chat Support](https://www.lambdatest.com/support).

---

*Auto-generated from TestMu AI documentation.*