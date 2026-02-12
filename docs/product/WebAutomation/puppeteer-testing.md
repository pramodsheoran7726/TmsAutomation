# Getting Started With Puppeteer Testing

> **Source**: [https://www.testmuai.com/support/docs/puppeteer-testing](https://www.testmuai.com/support/docs/puppeteer-testing)

**Product**: Web Automation

**Last Crawled**: 2026-01-27T20:47:28.547097

---

On this page

* * *

Puppeteer is a Node package that automates the Chrome browser for web testing. Over the DevTools Protocol, it provides a high-level API for controlling headless Chrome or Chromium. It may also be set to run full (non-headless) Chrome or Chromium.

TestMu AI allows you to run Puppeteer tests on a browser farm of 40+ real browsers and operating system combinations. This guide will cover the basics of getting started with Puppeteer testing on the TestMu AI platform.

## Prerequisites[â](https://www.testmuai.com/support/docs/puppeteer-testing#prerequisites "Direct link to Prerequisites")

* * *

> Note: All the code samples in this documentation can be found in the TestMu AI's Repository on GitHub. You can either download or clone the repository to quickly run your tests. [![Image](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAECkAABApAfV44g8AAAAHdElNRQfmBBMLCwK6SluIAAAEDUlEQVRYw62YS2xUVRjHf3NmGGbolFbtQ1Gkj0BQGZsyWBaSphtJ2VRCkwkRUzEGWBHALtSFMSZNWLhw0xgXmCgucNGFbalhUbXhkVAzKJSGaptgSiahnco0UDozdh7XRafTe8+5d3rnjt9Zzf985/zueX3nO+PCnlVQz0vU8xx+IMkj5okyz7Kdxq4NPerZRzshGnkWPx5cgEaGJHH+5hZXiTBv81NNTNDKeSZIoRUpKSY4TyvCCWIP/cwV7V5f5uhnT2mAKnqZtQ1YK7P0UmUXEWSIbMkIDY0sQwTtIDqZcgRYK1N0boQI87AshIbGQ8LFEN3EykZoaMQ4YoVo58H/gtDQeEC7GaKBiM5pmUmiJSx/mlnuktApERpkhJcLhkaXqGUX7/MTSxsCnjDIOzRRx4BBv4BXXvCEweGDvO7nIEOskGORaW4wwgADjHCDaRbJscIwb7E5733K0EfCuAHqGDdUL/GmrjbAMY4TYhsBvLhx4yXANkIc5xiVhlV9auhnnLr1ytPkDJULpYaIwjH+x9BPjtMAAqilR4rGbjY5gmzCbfjtooeaVUgHLZJzJU2OII0EJKWFDhC46VK+2+MQ0oRHGdvbuKGZGWVT3mSHI8gObip9zdAMYZKS/JQuRwiALpal3pKEBfvxSY7XGXUMGeWapPjYL0zi/xUSjiEJrihaUNAoSUnuOEYATJCUlEZBjSQts1AWJKakSTWCLZKUJV0WJE1WUrYIZWe75dhZonmlUw8eoXB9bC0LslXZrRlBSh4c28uCbFcWICV4JElCiWSl2etKLhkXRBW3A2VMWCUHFC0qmFTEVtocQ9poVbRJQUTZshWcVBbPnm3mhBLs00QgSFSJnClOOoKcUoKtRpQg+Bk2Tc/eLfExIHiPBZOehvGv8s0TnS+UuGZtzXxpmjzl1uakoXBt3eEEn3G74PInn/MGVUXeYy6qaaOPaYucbHo9xevLS7N0Ai/yNZmCW5xxvuVjkyP6Mp/wHb+xWCTx61t331kYS5wPgQA/SM6XqVYgz3B5g9xyhp36BmcLee8SR4DXDBOQ5JDpZB2S8k5jyXLW6F7FiC6NqAUO6h5Df1BvCnmBv4pARtTHXYj7+coMPflJ/Ihv+Ipe9losfQXXLBH3CZk1OcrjvMN1nre1cX38bIF4zFHzJoJzhRM7wKu2IKOmiCTn9EdZfy/m6MfPp/iAbvYxyl3m+JcAKX4kY2tsAEn66Cdn7eDhjGHfZ0mj8ctqaLA1kjhnlCtdMReHlUe2fcgUh238XwPAbr43xNNflSvVDJLgIrttTyrgo5sxVvLNr1pC1nbXCmN0O7mFqgkzSAyNSxaPIjcX0YgxSNgk7OhWoLj52UsLY9yzqH+FDib4XUlNDfYf4zU3unVPZ4cAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDQtMTlUMTE6MTA6MjUrMDA6MDAAc6jkAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA0LTE5VDExOjEwOjI1KzAwOjAwcS4QWAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=) View on GitHub](https://github.com/LambdaTest/puppeteer-sample)

  1. Clone the TestMu AI-Puppeteer repository on your system.

  2. Install the npm dependencies.

    
    
    npm install  
    

  3. Add browserWSEndpoint (browser end point URL) in your test script.

    
    
    `wss://cdp.lambdatest.com/puppeteer?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`  
    

  4. In order to run your Puppeteer tests, you will need to set your TestMu AI username and access key in the environment variables. Click the **Access Key** button at the top-right of the Automation Dashboard to access it.

![Image](https://www.testmuai.com/support/assets/images/key-e349e7aa2ae3877897095458e8470e91.webp)

**Windows**
    
    
    set LT_USERNAME="YOUR_LAMBDATEST_USERNAME"  
    set LT_ACCESS_KEY="YOUR_LAMBDATEST_ACCESS_KEY"  
    

**macOS/Linux**
    
    
    export LT_USERNAME="YOUR_LAMBDATEST_USERNAME"  
    export LT_ACCESS_KEY="YOUR_LAMBDATEST_ACCESS_KEY"  
    

## Run Your First Puppeteer Test[â](https://www.testmuai.com/support/docs/puppeteer-testing#run-your-first-puppeteer-test "Direct link to Run Your First Puppeteer Test")

* * *

Shown below are the steps on running Puppeteer tests on the TestMu AI platform.

  1. Clone the [TestMu AI-Puppeteer GitHub repository](https://github.com/LambdaTest/puppeteer-sample) and switch to the cloned directory.

    
    
    git clone https://github.com/LambdaTest/puppeteer-sample.git  
    cd puppeteer-sample  
    

  2. Ensure you have npm dependencies installed.

  3. Configure your TestMu AI authentication credentials.

Once you are done with the above-mentioned steps, you can initiate your first Puppeteer test on TestMu AI.

> **Test Scenario** : The below test script runs on Chrome browser running Windows 10. It visits the TestMu AI platform, clicks on the Pricing page, and navigates to the Automation Testing page.
    
    
    'use strict';  
    const { strict } = require('once');  
    const puppeteer = require('puppeteer');  
    const expect = require('chai').expect;  
      
    (async () => {      
        const capabilities = {  
            'browserName': 'Chrome',  
            'browserVersion': 'latest',  
            'LT:Options': {  
                'platform': 'Windows 10',  
                'build': 'puppeteer-build-1',  
                'name': 'My first Puppeteer test',  
                'resolution':'1366x768',  
                'user': process.env.LT_USERNAME || "Your Username",  
                'accessKey': process.env.LT_ACCESS_KEY || "Your Access Key",,  
                'network': true  
            }  
       };  
          
        try {  
            const browser = await puppeteer.connect({  
                browserWSEndpoint:  
                    `wss://cdp.lambdatest.com/puppeteer?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`,  
            });  
      
            const page = await browser.newPage();  
            await page.setViewport({  
                width: 1024,  
                height: 768,  
                deviceScaleFactor: 1,  
              });  
            console.log("Navigating to LambdaTest");  
            await page.goto('https://www.lambdatest.com/');  
            console.log("Navigating to Pricing");  
            await page.goto('https://www.lambdatest.com/pricing');  
            console.log("Navigating to Automation");  
            await page.goto('https://www.lambdatest.com/automation-testing');  
            console.log("Closing browser");  
            await browser.close();  
      
        } catch (e) {  
            console.log("Error - ", e);  
        }  
    })();  
    

  4. Pass the below command to run the test.

    
    
    node navigation.js  
    

## View your Puppeteer test results[â](https://www.testmuai.com/support/docs/puppeteer-testing#view-your-puppeteer-test-results "Direct link to View your Puppeteer test results")

* * *

The TestMu AI Automation Dashboard is where you can see the results of your Puppeteer tests after running them on the TestMu AI platform.

The below screenshot of TestMu AI Automation Dashboard shows the Puppeteer build on the left and the build sessions associated with the selected build on the right.

![Image](https://www.testmuai.com/support/assets/images/dashboard-cf88dfa2cea91b6efe3752c003e0e0c7.png)

On clicking the session name of the respective test, you can view the details of Puppeteer test session that you just executed. For example, the below screenshot shows a test execution details of Puppeteer test like Test Name, Test ID, selected configurations, test logs, basic info, input config, and test session video.

![Image](https://www.testmuai.com/support/assets/images/logs-6f3ab02a4e3554626e00c06d4001808b.png)

---

*Auto-generated from TestMu AI documentation.*