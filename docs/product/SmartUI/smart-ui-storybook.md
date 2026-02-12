# Getting started with SmartUI using Storybook On TestMu AI

> **Source**: [https://www.testmuai.com/support/docs/smart-ui-storybook](https://www.testmuai.com/support/docs/smart-ui-storybook)

**Product**: SmartUI

**Last Crawled**: 2026-01-27T21:03:36.342827

---

On this page

* * *

Using the TestMu AI platform, perform regression testing in just one click and find Visual UI Regression bugs easily with the help of Smart Testing. This documentation will act as your step-by-step guide in performing successful Visual Regression tests.

## Prerequisites for running SmartUI with StoryBook[â](https://www.testmuai.com/support/docs/smart-ui-storybook#prerequisites-for-running-smartui-with-storybook "Direct link to Prerequisites for running SmartUI with StoryBook")

  * Basic understanding of [StoryBook](https://storybook.js.org/docs/react/get-started/introduction) is required.
  * Node.js v20.3+ installed (required for SmartUI CLI v4.x.x)
  * StoryBook version installed should be higher than `6.4.0.` Click [here](https://github.com/storybookjs/storybook/releases) to know more

note

If you face any problems executing tests with SmartUI-CLI `versions >= v4.x.x`, upgrade your Node.js version to `v20.3` or above.

  * Login to [TestMu AI SmartUI](https://smartui.lambdatest.com/) with your credentials.

The following steps will guide you in running your first Visual Regression test on TestMu AI platform -

## Steps to create a SmartUI Project[â](https://www.testmuai.com/support/docs/smart-ui-storybook#steps-to-create-a-smartui-project "Direct link to Steps to create a SmartUI Project")

The first step is to create a project with the application in which we will combine all your builds run on the project. To create a SmartUI Project, follow these steps:

  1. Go to [Projects page](https://smartui.lambdatest.com/)
  2. Click on the `new project` button
  3. Select the platform as **CLI** for executing your `StoryBook` tests.
  4. Add name of the project, approvers for the changes found, tags for any filter or easy navigation.
  5. Click on the **Submit**.

## Steps to run your first test[â](https://www.testmuai.com/support/docs/smart-ui-storybook#steps-to-run-your-first-test "Direct link to Steps to run your first test")

* * *

GitHub Sample

Please try our **StoryBook SmartUI** GitHub sample repository for trying an example.
    
    
    git clone https://github.com/LambdaTest/smartui-storybook-sample.git  
    

### **Step 1** : Install the Dependencies[â](https://www.testmuai.com/support/docs/smart-ui-storybook#step-1-install-the-dependencies "Direct link to step-1-install-the-dependencies")

Install required NPM modules for `LambdaTest SmartUI StoryBook CLI` in your **Frontend** project.
    
    
    npm install @lambdatest/smartui-storybook -g  
    

### **Step 2:** Setup with StoryBook[â](https://www.testmuai.com/support/docs/smart-ui-storybook#step-2-setup-with-storybook "Direct link to step-2-setup-with-storybook")

Add the following to your .storybook/main.js. You can read more about this here Storybook [Feature flags](https://storybook.js.org/docs/react/configure/overview#feature-flags)
    
    
    module.exports = {  
      features: {  
        // Required for Storybook < v9  
        buildStoriesJson: true,  
      },  
    };  
    

> **Note** : `buildStoriesJson` is available for Storybook versions below v9.

#### Storybook v9+ Play Function Support[â](https://www.testmuai.com/support/docs/smart-ui-storybook#storybook-v9-play-function-support "Direct link to Storybook v9+ Play Function Support")

SmartUI supports Storybook's `play` function (available in Storybook v9+) for interactive component testing. The `play` function allows you to interact with components before capturing screenshots.

**Example with Play Function:**

Button.stories.js
    
    
      
    export default {  
      title: 'Components/Button',  
      component: Button,  
    };  
      
    export const InteractiveButton = {  
      play: async ({ canvasElement }) => {  
        const canvas = within(canvasElement);  
        const button = canvas.getByRole('button', { name: /click me/i });  
      
        // Interact with the button before screenshot  
        await userEvent.click(button);  
        await expect(button).toHaveTextContent('Clicked!');  
      },  
    };  
    

**Best Practices for Play Functions:**

  * Use `play` functions to set up component states before screenshots
  * Wait for async operations to complete using `waitFor` or `findBy` queries
  * Avoid animations or transitions that might cause timing issues
  * Use `waitForTimeout` in SmartUI config if components need additional render time after play functions

#### Storybook Globals (Themes) Configuration[â](https://www.testmuai.com/support/docs/smart-ui-storybook#storybook-globals-themes-configuration "Direct link to Storybook Globals \(Themes\) Configuration")

SmartUI supports Storybook's global decorators and parameters, including theme switching. You can configure themes in your `.smartui.json` file.

**Configuration Example:**

.smartui.json
    
    
    {  
      "storybook": {  
        "browsers": ["chrome", "firefox", "safari", "edge"],  
        "viewports": [[1920, 1080]],  
        "backgroundTheme": "light",  // Options: "light", "dark", or "both"  
        "useGlobals": true,  // Enable global decorators and parameters  
        "waitForTimeout": 0  
      }  
    }  
    

**Theme Options:**

  * `"light"`: Capture stories in light theme only
  * `"dark"`: Capture stories in dark theme only
  * `"both"`: Capture stories in both light and dark themes (creates separate screenshots)

**Example Story with Theme Globals:**

Card.stories.js
    
    
    export default {  
      title: 'Components/Card',  
      component: Card,  
      parameters: {  
        backgrounds: {  
          default: 'light',  
          values: [  
            { name: 'light', value: '#ffffff' },  
            { name: 'dark', value: '#1a1a1a' },  
          ],  
        },  
      },  
      globalTypes: {  
        theme: {  
          description: 'Global theme for components',  
          defaultValue: 'light',  
          toolbar: {  
            title: 'Theme',  
            icon: 'circlehollow',  
            items: ['light', 'dark'],  
            dynamicTitle: true,  
          },  
        },  
      },  
    };  
      
    export const Default = {  
      decorators: [  
        (Story, context) => {  
          const theme = context.globals.theme || 'light';  
          return (  
            <div className={`theme-${theme}`}>  
              <Story />  
            </div>  
          );  
        },  
      ],  
    };  
    

**Using Multiple Themes:**

If you set `"backgroundTheme": "both"` in your SmartUI config, each story will be captured twice - once in light theme and once in dark theme. The screenshot names will be automatically suffixed (e.g., `Card-Default-light.png` and `Card-Default-dark.png`).

**Note** : When using `"backgroundTheme": "both"`, ensure your Storybook stories properly handle theme switching via globals or decorators.

### **Step 3:** Configure your Project Token[â](https://www.testmuai.com/support/docs/smart-ui-storybook#step-3-configure-your-project-token "Direct link to step-3-configure-your-project-token")

Setup your project token shown in the **SmartUI** app after creating your project.

  * MacOS/Linux
  * Windows - CMD
  * PowerShell

    
    
    export PROJECT_TOKEN="123456#1234abcd-****-****-****-************"  
    
    
    
    set PROJECT_TOKEN="123456#1234abcd-****-****-****-************"  
    
    
    
    $env:PROJECT_TOKEN="123456#1234abcd-****-****-****-************"  
    

![cmd](https://www.testmuai.com/support/assets/images/smartui-project-token-185c342eb238f71b86d1e1f7ec55523c.png)

### **Step 3.1:** Configure Proxy (Optional)[â](https://www.testmuai.com/support/docs/smart-ui-storybook#step-31-configure-proxy-optional "Direct link to step-31-configure-proxy-optional")

If you are behind a proxy, you can configure the `SMARTUI_API_PROXY` environment variable.

  * MacOS/Linux
  * Windows - CMD

    
    
    export SMARTUI_API_PROXY=http://172.17.0.1:3128  
    
    
    
    set SMARTUI_API_PROXY=http://172.17.0.1:3128  
    

> **Note** : Replace the IP address and port with the appropriate values for your environment.

### **Step 4:** Create and Configure SmartUI Config[â](https://www.testmuai.com/support/docs/smart-ui-storybook#step-4-create-and-configure-smartui-config "Direct link to step-4-create-and-configure-smartui-config")

You can now configure your project settings on using various available options to run your tests with the SmartUI integration. To generate the configuration file, please execute the following command:
    
    
    smartui config create .smartui.json  
    

Once, the configuration file will be created, you will be seeing the default configuration pre-filled in the configuration file:

/smartUi-storybook-project/smartui.json
    
    
    {  
      "storybook": {  
        "browsers": [  
          "chrome",  
          "firefox",  
          "safari",  
          "edge",  
          // Add more browser configuration here  
        ],  
        "viewports": [  
          [1920, 1080]        // Add more view ports to capture here  
        ],  
        "waitForTimeout": 0, // (Optional) Add wait time for the page to load  
        "include": [],       // (Optional) Only compare limited stories  
        "exclude": []        // (Optional) Don't compare the stories // Apply exclusions/inclusions at directory, sub-directory, or individual story level  
      }  
    }  
    

#### SmartUI StoryBook Config Options[â](https://www.testmuai.com/support/docs/smart-ui-storybook#smartui-storybook-config-options "Direct link to SmartUI StoryBook Config Options")

Please read the following table for more information about the configuration file:

Config Key| Description| Usage  
---|---|---  
browsers| You can add all the supported browsers brands here to run your tests for SmartUI.   
Ex: `"chrome", "firefox", "safari", "edge", etc..`| Mandatory  
viewports| You can add all the supported browser viewpoints here to run your tests for SmartUI   
Ex: `[1920, 1080],[width, height] etc..`   
| Mandatory  
waitForTimeout| You can add wait time for the page to load DOM of your StoryBook components. This can be added globally to your configuration and to individual stories as well.   
Ex: `3000`| Optional  
include| Add the stories which should only be included in SmartUI tests   
Ex: `"/dashboard/","/features/"`| Optional  
exclude| Don't compare the stories which should be excluded in SmartUI tests   
Ex: `"/login/","/marketing/"`| Optional  
backgroundTheme| Theme for capturing stories. Options: `"light"`, `"dark"`, or `"both"` (captures both themes)   
Ex: `"light"`| Optional (default: `"light"`)  
useGlobals| Enable Storybook global decorators and parameters (required for theme switching)   
Ex: `true`| Optional (default: `false`)  
  
note

SmartUI Storybook testing now supports `Edge` browser.

info

For capturing the stories in **full page** without limiting the height to the viewport then in the `viewports` array, you can change the following configuration:
    
    
    "viewports": [  
      [1920],  // Only mention the width of the viewport  
      [1440]  
    ]  
    

#### Custom Viewport Configuration New[â](https://www.testmuai.com/support/docs/smart-ui-storybook#custom-viewport-configuration- "Direct link to custom-viewport-configuration-")

To facilitate the visualization of your UI components on various device screens, you can now setup custom viewport configurations. This feature is an extension of Storybook's existing Viewport toolbar item, enabling you to capture and view stories in different dimensions, such as `mobile` or `tablet`, with specific orientations like portrait or landscape.

To configure custom viewports for your stories, you can update the `.smartui.json` file within your project repository.
    
    
    {  
    ...  
    ...  
    "customViewports": [  
          {  
            "stories": [  
              "<name of the stories/components>"  
            ],  
          {  
            "styles": {  
                "width": 322,  
                "height": 321  
              },  
            "exclude": [ // Example: Excluding stories for a specific viewport  
              "/directory1",  
              "/directory2/subdirectory1",  
              "/directory2/subdirectory2",  
              "/directory3/subdirectory3/item1",  
            ]  
          },  
          },  
          {  
            "stories": [  
              "<name of the stories/components>"  
            ],  
            "styles": {  
              "width": 834, //Tablet view  
              "height": 1112  
            },  
            "waitForTimeout": 4000 //Story-level waitForTimeout (Applied to all the combinations of the mentioned stories)  
          }  
          {  
            "stories": [  
              "<name of the stories/components>"  
            ],  
            "waitForTimeout": 3000 //Story-level waitForTimeout (Applied to all the combinations of the mentioned stories)  
            }  
          }  
          // Additional custom viewport configurations can be added here  
    ]  
    ...  
    ...  
    }  
    

info

The `waitForTimeout` setting at the story level takes precedence over the global `waitForTimeout` configuration and only applies to the specific stories to which it is assigned.

For instance, if `Story-1` has a story-level `waitForTimeout` value (T1) set within custom viewport settings, and there exists a global `waitForTimeout` value (T2) defined in the configuration, all browser and viewport combinations of `Story-1` will render with T1. Conversely, all other stories will be rendered with T2 across all combinations.

### **Step 5:** Execute the Tests on SmartUI Cloud using CLI[â](https://www.testmuai.com/support/docs/smart-ui-storybook#step-5-execute-the-tests-on-smartui-cloud-using-cli "Direct link to step-5-execute-the-tests-on-smartui-cloud-using-cli")

You can now execute your `StoryBook` components for `Visual Regression Testing` using the following options:.

  * For Locally Hosted Server
  * For Static Build
  * For Public Hosted URL

    
    
    npm run storybook                                                 // Starts your local StoryBook server  
    smartui storybook http://localhost:6006 --config .smartui.json    // Captures all the stories running on local server  
    
    
    
    npm run build-storybook                                           // Creates a Static Build Folder of StoryBook Stories  
    smartui storybook ./storybook-static --config .smartui.json       // Captures all the stories added in the static build folder  
    
    
    
    smartui storybook https://<your_public_hosted_url> --config .smartui.json    // Captures all the stories running on local server  
    

For Continuous Integration (CI)

If you are using the Continuous Integration (CI) pipeline for your application and want to integrate `SmartUI StoryBook` execution then the following are the steps needs to be added to your `.yaml` file:

  * For Static Builds
  * For Public Hosted URL

    
    
    steps:  
      - name: Running SmartUI StoryBook Tests  
        - run: npm i  
        - run: npm install @lambdatest/smartui-storybook -g  
        - run: npm run build-storybook  
        - run: smartui storybook ./storybook-static --config .smartui.json  
    
    
    
    steps:  
      - name: Running SmartUI StoryBook Tests  
        - run: npm i  
        - run: npm install @lambdatest/smartui-storybook -g  
        - run: smartui storybook https://<replace_with_your_url> --config .smartui.json  
    

#### CLI Options and Keys[â](https://www.testmuai.com/support/docs/smart-ui-storybook#cli-options-and-keys "Direct link to CLI Options and Keys")

The following are supported `CLI (Command Line Interface)` options for Visual Regression Testing with SmartUI:

CLI Flag Key| Description| Usage  
---|---|---  
\--config| This is the reference configuration file containing the SmartUI Cloud Configuration| Optional  
\--help| This will print all help information for the SmartUI CLI options| Optional  
  
### **Step 6:** View SmartUI Results[â](https://www.testmuai.com/support/docs/smart-ui-storybook#step-6-view-smartui-results "Direct link to step-6-view-smartui-results")

You can now see the SmartUI dashboard to view the results. Can also identify the mis-matches from the existing `Baseline` build.

![cmd](https://www.testmuai.com/support/assets/images/smartui-storybook-results-7c8358014cf2b00b877f59453bed2ef5.webp)

## Troubleshooting[â](https://www.testmuai.com/support/docs/smart-ui-storybook#troubleshooting "Direct link to Troubleshooting")

  * Verify Storybook Server
  * Check Story Inclusion/Exclusion
  * Validate Configuration
  * Increase Wait Timeout
  * Check Play Function Syntax
  * Verify useGlobals Setting
  * Check Storybook Version
  * Validate Theme Configuration

Verify Storybook Server

  * Ensure Storybook is running on the specified URL/port
    * Check that `buildStoriesJson: true` is set in `.storybook/main.js`

> **Note** : `buildStoriesJson` is available for Storybook versions below v9.

Check Story Inclusion/Exclusion

  * Verify `include` and `exclude` patterns in `.smartui.json`
    * Ensure story paths match your Storybook structure

Validate Configuration
    
    
       cat .smartui.json | python -m json.tool  
    

Ensure JSON is valid and configuration is correct **Symptoms** :

  * Play functions not executing
  * Components not in expected state **Solutions** :

Increase Wait Timeout
    
    
       {  
         "storybook": {  
           "waitForTimeout": 3000  // Increase if play functions need more time  
         }  
       }  
    

Check Play Function Syntax

  * Ensure play functions are properly exported
    * Verify async/await usage is correct
    * Check for errors in browser console **Symptoms** :
  * Themes not switching
  * Globals not applied **Solutions** :

Verify useGlobals Setting
    
    
       {  
         "storybook": {  
           "useGlobals": true  // Must be true to use globals  
         }  
       }  
    

Check Storybook Version

  * Ensure Storybook v6.4+ for globals support
    * Verify decorators are properly configured

Validate Theme Configuration

  * Check `backgroundTheme` value is correct (`light`, `dark`, or `both`)
    * Ensure theme decorators are properly set up in stories If you encounter issues not covered here:
  * Review the [Comprehensive Troubleshooting Guide](https://www.testmuai.com/support/docs/smartui-troubleshooting-guide) for detailed solutions
  * Check [Storybook Documentation](https://storybook.js.org/docs) for Storybook-specific issues
  * Visit [TestMu AI Support](https://www.lambdatest.com/support) for additional resources
  * Contact support at [[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection#f4878184849b8680b4809187809981da959d) or use [24/7 Chat Support](https://www.lambdatest.com/support)

## Additional Resources[â](https://www.testmuai.com/support/docs/smart-ui-storybook#additional-resources "Direct link to Additional Resources")

  * [Comprehensive Troubleshooting Guide](https://www.testmuai.com/support/docs/smartui-troubleshooting-guide)
  * [CLI Complete Reference](https://www.testmuai.com/support/docs/smartui-cli-complete-reference)
  * [Baseline Management](https://www.testmuai.com/support/docs/smartui-baseline-management)
  * [Running Your First Project](https://www.testmuai.com/support/docs/smartui-running-your-first-project)
  * [Storybook Documentation](https://storybook.js.org/docs)
  * [SmartUI API Documentation](https://www.lambdatest.com/support/api-doc/)

---

*Auto-generated from TestMu AI documentation.*