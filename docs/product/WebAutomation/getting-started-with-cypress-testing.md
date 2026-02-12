# Getting Started With Cypress Testing

> **Source**: [https://www.testmuai.com/support/docs/getting-started-with-cypress-testing](https://www.testmuai.com/support/docs/getting-started-with-cypress-testing)

**Product**: Web Automation

**Last Crawled**: 2026-01-27T20:47:26.269149

---

On this page

* * *

Cypress is a modern web front-end testing tool built with JavaScript Mocha. It operates directly on the browsers without the need for Selenium. Its unique DOM manipulation technique makes it a very developer and QA-friendly tool.

Integrating TestMu AI with Cypress allows you to perform Cypress testing across 40+ browser versions on cloud.

In this guide, learn how to get started with Cypress testing on the TestMu AI platform. We will use Cypressâ kitchen sink sample app to execute our tests.

## Prerequisites[â](https://www.testmuai.com/support/docs/getting-started-with-cypress-testing#prerequisites "Direct link to Prerequisites")

* * *

Sample repo

Before we get started, make sure to clone the TestMu AI's sample Cypress Cloud repo, used in this document. [![Image](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAECkAABApAfV44g8AAAAHdElNRQfmBBMLCwK6SluIAAAEDUlEQVRYw62YS2xUVRjHf3NmGGbolFbtQ1Gkj0BQGZsyWBaSphtJ2VRCkwkRUzEGWBHALtSFMSZNWLhw0xgXmCgucNGFbalhUbXhkVAzKJSGaptgSiahnco0UDozdh7XRafTe8+5d3rnjt9Zzf985/zueX3nO+PCnlVQz0vU8xx+IMkj5okyz7Kdxq4NPerZRzshGnkWPx5cgEaGJHH+5hZXiTBv81NNTNDKeSZIoRUpKSY4TyvCCWIP/cwV7V5f5uhnT2mAKnqZtQ1YK7P0UmUXEWSIbMkIDY0sQwTtIDqZcgRYK1N0boQI87AshIbGQ8LFEN3EykZoaMQ4YoVo58H/gtDQeEC7GaKBiM5pmUmiJSx/mlnuktApERpkhJcLhkaXqGUX7/MTSxsCnjDIOzRRx4BBv4BXXvCEweGDvO7nIEOskGORaW4wwgADjHCDaRbJscIwb7E5733K0EfCuAHqGDdUL/GmrjbAMY4TYhsBvLhx4yXANkIc5xiVhlV9auhnnLr1ytPkDJULpYaIwjH+x9BPjtMAAqilR4rGbjY5gmzCbfjtooeaVUgHLZJzJU2OII0EJKWFDhC46VK+2+MQ0oRHGdvbuKGZGWVT3mSHI8gObip9zdAMYZKS/JQuRwiALpal3pKEBfvxSY7XGXUMGeWapPjYL0zi/xUSjiEJrihaUNAoSUnuOEYATJCUlEZBjSQts1AWJKakSTWCLZKUJV0WJE1WUrYIZWe75dhZonmlUw8eoXB9bC0LslXZrRlBSh4c28uCbFcWICV4JElCiWSl2etKLhkXRBW3A2VMWCUHFC0qmFTEVtocQ9poVbRJQUTZshWcVBbPnm3mhBLs00QgSFSJnClOOoKcUoKtRpQg+Bk2Tc/eLfExIHiPBZOehvGv8s0TnS+UuGZtzXxpmjzl1uakoXBt3eEEn3G74PInn/MGVUXeYy6qaaOPaYucbHo9xevLS7N0Ai/yNZmCW5xxvuVjkyP6Mp/wHb+xWCTx61t331kYS5wPgQA/SM6XqVYgz3B5g9xyhp36BmcLee8SR4DXDBOQ5JDpZB2S8k5jyXLW6F7FiC6NqAUO6h5Df1BvCnmBv4pARtTHXYj7+coMPflJ/Ihv+Ipe9losfQXXLBH3CZk1OcrjvMN1nre1cX38bIF4zFHzJoJzhRM7wKu2IKOmiCTn9EdZfy/m6MfPp/iAbvYxyl3m+JcAKX4kY2tsAEn66Cdn7eDhjGHfZ0mj8ctqaLA1kjhnlCtdMReHlUe2fcgUh238XwPAbr43xNNflSvVDJLgIrttTyrgo5sxVvLNr1pC1nbXCmN0O7mFqgkzSAyNSxaPIjcX0YgxSNgk7OhWoLj52UsLY9yzqH+FDib4XUlNDfYf4zU3unVPZ4cAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDQtMTlUMTE6MTA6MjUrMDA6MDAAc6jkAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA0LTE5VDExOjEwOjI1KzAwOjAwcS4QWAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=) View on GitHub](https://github.com/LambdaTest/Cypress-Cloud)

You can run your first Cypress test on the TestMu AI platform in a few simple steps:

  1. Clone the TestMu AI-Cypress-Cloud GitHub repo and navigate to the cloned directory.

    
    
    git clone https://github.com/LambdaTest/Cypress-Cloud.git  
    cd Cypress-Cloud  
    

  2. To run Cypress tests, you will need to set your TestMu AI username and access key in the environment variables. You can get them from the TestMu AI Automation Dashboard.

![Image](https://www.testmuai.com/support/assets/images/key-e349e7aa2ae3877897095458e8470e91.webp)

**Windows**
    
    
    set LT_USERNAME="YOUR_LAMBDATEST_USERNAME"  
    set LT_ACCESS_KEY="YOUR_LAMBDATEST_ACCESS_KEY"  
    

**macOS/Linux**
    
    
    export LT_USERNAME="YOUR_LAMBDATEST_USERNAME"  
    export LT_ACCESS_KEY="YOUR_LAMBDATEST_ACCESS_KEY"  
    

  3. Install Node.js version 12 or higher. You can download it from the [official Node.js website](https://nodejs.org/en/download/).

## Running Your First Test[â](https://www.testmuai.com/support/docs/getting-started-with-cypress-testing#running-your-first-test "Direct link to Running Your First Test")

* * *

Following are the steps to run your first Cypress test on the TestMu AI platform.

  1. Install the TestMu AI-Cypress CLI using the below command.

    
    
    npm install -g lambdatest-cypress-cli  
    

  2. Clone the Cypress kitchen sink repo using the following command.

  * Cypress v10
  * Cypress v9

    
    
    # Clone the kitchen sink repo  
    git clone https://github.com/cypress-io/cypress-example-kitchensink.git  
      
    # Go to the cloned directory  
    cd cypress-example-kitchensink  
    
    
    
    # Clone the kitchen sink repo  
    git clone https://github.com/cypress-io/cypress-example-kitchensink.git  
      
    # Go to the cloned directory  
    cd cypress-example-kitchensink  
      
    # Checkout to this commit  
    git checkout ab10094ef7b199ae7febafec413a0626414bcd3c    
    

Once you clone the kitchen sink repo, below will be the structure of your Cypress project.

  * Cypress v10
  * Cypress v9

    
    
    ...  
    cypress  
    |-- fixtures  
    |-- e2e  
    |-- support  
    cypress.config.js  
    ...  
    
    
    
    ...  
    cypress  
    |-- fixtures  
    |-- integration  
    |-- plugins  
    |-- support  
    cypress.json  
    ...  
    

  3. Install the npm dependencies by passing the below command.

    
    
    npm install  
    

  4. Create `lambdatest-config.json` file that contains configurations like auth, capabilities, test settings, etc. which need to be successfully executed at LambaTest.

Use `init` command to generate the sample configuration files.

  * Cypress v10
  * Cypress v9

    
    
    lambdatest-cypress init --cv=10  
    
    
    
    lambdatest-cypress init   
    

Once you run the above command, below is the project structure for the `lambdatest-config.json` file.

  * Cypress v10
  * Cypress v9

    
    
    {  
      "lambdatest_auth": {  
         "username": "<Your LambdaTest username>",  
         "access_key": "<Your LambdaTest access key>"  
      },  
      "browsers": [  
         {  
            "browser": "Chrome",  
            "platform": "Windows 10",  
            "versions": [  
               "latest-1"  
            ]  
         },  
         {  
            "browser": "Firefox",  
            "platform": "Windows 10",  
            "versions": [  
               "latest-1"  
            ]  
         }  
      ],  
      "run_settings": {  
         "cypress_config_file": "cypress.config.js",  
         "reporter_config_file": "base_reporter_config.json",  
         "build_name": "build-name",  
         "parallels": 1,  
         "specs": "./*.cy.js",  
         "ignore_files": "",  
         "network": false,  
         "headless": false,  
         "npm_dependencies": {  
            "cypress": "10.0.0"  
         }  
      },  
      "tunnel_settings": {  
         "tunnel": false,  
         "tunnel_name": null  
      }  
    }  
    
    
    
    app  
    {  
      "lambdatest_auth": {  
         "username": "<Your LambdaTest username>",  
         "access_key": "<Your LambdaTest access key>"  
      },  
      "browsers": [  
         {  
            "browser": "Chrome",  
            "platform": "Windows 10",  
            "versions": [  
               "latest-1"  
            ]  
         },  
         {  
            "browser": "Firefox",  
            "platform": "Windows 10",  
            "versions": [  
               "latest-1"  
            ]  
         }  
      ],  
      "run_settings": {  
         "cypress_config_file": "cypress.json",  
         "reporter_config_file": "base_reporter_config.json",  
         "build_name": "build-name",  
         "parallels": 1,  
         "specs": "./*.spec.js",  
         "ignore_files": "",  
         "network": false,  
         "headless": false,  
         "npm_dependencies": {  
            "cypress": "9.0.0"  
         }  
      },  
      "tunnel_settings": {  
         "tunnel": false,  
         "tunnel_name": null  
      }  
    }  
    

  5. Pass the below command to run the test.

    
    
    lambdatest-cypress run  
    

  6. Visit TestMu AI Automation dashboard to view your test results. The CLI also has a link to view the Cypress test build.

![Image](https://www.testmuai.com/support/assets/images/cypress_results-3d56e11a24865ebbbc3031eb5e8e66d2.png)

## Testing Locally Hosted or Privately Hosted Projects[â](https://www.testmuai.com/support/docs/getting-started-with-cypress-testing#testing-locally-hosted-or-privately-hosted-projects "Direct link to Testing Locally Hosted or Privately Hosted Projects")

* * *

To tests locally hosted websites on the TestMu AI platform, you need to setup [TestMu AI tunnel](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/), and execute commands using the CLI, or [Download UnderPass](https://www.testmuai.com/support/docs/underpass-tunnel-application/), our GUI based desktop app. Once you have the TestMu AI tunnel or Underpass set up and started, you can use Cypress to test locally hosted websites.

Now you need to activate the tunnel capability in the `lambdatest-config.json` file under the section "tunnel_settings" as shown below:
    
    
      "tunnel_settings": {  
    		"tunnel": true,  
    		"tunnel_name": "LT_Tunnel"  
    	}  
    

You can provide the name of the **TestMu AI tunnel** as per your requirements.

---

*Auto-generated from TestMu AI documentation.*