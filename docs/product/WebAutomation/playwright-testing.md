# Getting Started With Playwright Testing

> **Source**: [https://www.testmuai.com/support/docs/playwright-testing](https://www.testmuai.com/support/docs/playwright-testing)

**Product**: Web Automation

**Last Crawled**: 2026-01-27T20:47:21.186579

---

On this page

* * *

Playwright is a Node.js library that uses a single API to automate Chromium, Firefox, and WebKit. It is designed to enable powerful, reliable, and efficient [automated browser testing](https://www.lambdatest.com/automated-browser-testing). Playwright can also automate Microsoft Edge since it is built on the open-source Chromium web framework.

TestMu AI allows you to run Playwright tests across 40+ real browsers and operating system combinations. This guide will cover the basics of getting started with Playwright testing on the TestMu AI platform.

_You can run tests using Playwright versions**v1.15.0** to the latest._

## Prerequisites[â](https://www.testmuai.com/support/docs/playwright-testing#prerequisites "Direct link to Prerequisites")

* * *

> Note: All the code samples in this documentation can be found in the TestMu AI's Repository on GitHub. You can either download or clone the repository to quickly run your tests. [![Image](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAECkAABApAfV44g8AAAAHdElNRQfmBBMLCwK6SluIAAAEDUlEQVRYw62YS2xUVRjHf3NmGGbolFbtQ1Gkj0BQGZsyWBaSphtJ2VRCkwkRUzEGWBHALtSFMSZNWLhw0xgXmCgucNGFbalhUbXhkVAzKJSGaptgSiahnco0UDozdh7XRafTe8+5d3rnjt9Zzf985/zueX3nO+PCnlVQz0vU8xx+IMkj5okyz7Kdxq4NPerZRzshGnkWPx5cgEaGJHH+5hZXiTBv81NNTNDKeSZIoRUpKSY4TyvCCWIP/cwV7V5f5uhnT2mAKnqZtQ1YK7P0UmUXEWSIbMkIDY0sQwTtIDqZcgRYK1N0boQI87AshIbGQ8LFEN3EykZoaMQ4YoVo58H/gtDQeEC7GaKBiM5pmUmiJSx/mlnuktApERpkhJcLhkaXqGUX7/MTSxsCnjDIOzRRx4BBv4BXXvCEweGDvO7nIEOskGORaW4wwgADjHCDaRbJscIwb7E5733K0EfCuAHqGDdUL/GmrjbAMY4TYhsBvLhx4yXANkIc5xiVhlV9auhnnLr1ytPkDJULpYaIwjH+x9BPjtMAAqilR4rGbjY5gmzCbfjtooeaVUgHLZJzJU2OII0EJKWFDhC46VK+2+MQ0oRHGdvbuKGZGWVT3mSHI8gObip9zdAMYZKS/JQuRwiALpal3pKEBfvxSY7XGXUMGeWapPjYL0zi/xUSjiEJrihaUNAoSUnuOEYATJCUlEZBjSQts1AWJKakSTWCLZKUJV0WJE1WUrYIZWe75dhZonmlUw8eoXB9bC0LslXZrRlBSh4c28uCbFcWICV4JElCiWSl2etKLhkXRBW3A2VMWCUHFC0qmFTEVtocQ9poVbRJQUTZshWcVBbPnm3mhBLs00QgSFSJnClOOoKcUoKtRpQg+Bk2Tc/eLfExIHiPBZOehvGv8s0TnS+UuGZtzXxpmjzl1uakoXBt3eEEn3G74PInn/MGVUXeYy6qaaOPaYucbHo9xevLS7N0Ai/yNZmCW5xxvuVjkyP6Mp/wHb+xWCTx61t331kYS5wPgQA/SM6XqVYgz3B5g9xyhp36BmcLee8SR4DXDBOQ5JDpZB2S8k5jyXLW6F7FiC6NqAUO6h5Df1BvCnmBv4pARtTHXYj7+coMPflJ/Ihv+Ipe9losfQXXLBH3CZk1OcrjvMN1nre1cX38bIF4zFHzJoJzhRM7wKu2IKOmiCTn9EdZfy/m6MfPp/iAbvYxyl3m+JcAKX4kY2tsAEn66Cdn7eDhjGHfZ0mj8ctqaLA1kjhnlCtdMReHlUe2fcgUh238XwPAbr43xNNflSvVDJLgIrttTyrgo5sxVvLNr1pC1nbXCmN0O7mFqgkzSAyNSxaPIjcX0YgxSNgk7OhWoLj52UsLY9yzqH+FDib4XUlNDfYf4zU3unVPZ4cAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDQtMTlUMTE6MTA6MjUrMDA6MDAAc6jkAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA0LTE5VDExOjEwOjI1KzAwOjAwcS4QWAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=) View on GitHub](https://github.com/LambdaTest/playwright-sample/)

  1. Clone the TestMu AI-Playwright repository on your system.

  2. Install the npm dependencies.

    
    
    npm install  
    

  3. Add browserWSEndpoint (browser end point URL) in your test script.

    
    
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`  
    

  4. In order to run your Playwright tests, you will need to set your TestMu AI username and access key in the environment variables. Click the **Access Key** button at the top-right of the Automation Dashboard to access it.

![Image](https://www.testmuai.com/support/assets/images/key-e349e7aa2ae3877897095458e8470e91.webp)

**Windows**
    
    
    set LT_USERNAME="YOUR_LAMBDATEST_USERNAME"  
    set LT_ACCESS_KEY="YOUR_LAMBDATEST_ACCESS_KEY"  
    

**macOS/Linux**
    
    
    export LT_USERNAME="YOUR_LAMBDATEST_USERNAME"  
    export LT_ACCESS_KEY="YOUR_LAMBDATEST_ACCESS_KEY"  
    

## Run Your First Test[â](https://www.testmuai.com/support/docs/playwright-testing#run-your-first-test "Direct link to Run Your First Test")

* * *

  1. Add the below code snippet in your test scripts.

    
    
    (async () => {  
      const capabilities = {  
        'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`  
        'browserVersion': 'latest',  
        'LT:Options': {  
          'platform': 'Windows 10',  
          'build': 'Playwright Sample Build',  
          'name': 'Playwright Sample Test',  
          'user': process.env.LT_USERNAME,  
          'accessKey': process.env.LT_ACCESS_KEY,  
          'network': true,  
          'video': true,  
          'console': true  
        }  
      }  
      
      const browser = await chromium.connect({  
        wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`  
      })  
    

Once you are done with the above-mentioned steps, you can initiate your first Playwright test on TestMu AI.

The below test script searches the term 'TestMu AI' on Bing.
    
    
    const { chromium } = require('playwright')  
    const { expect } = require('@playwright/test');  
      
    (async () => {  
      const capabilities = {  
        'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`  
        'browserVersion': 'latest',  
        'LT:Options': {  
          'platform': 'Windows 10',  
          'build': 'Playwright Sample Build',  
          'name': 'Playwright Sample Test',  
          'user': process.env.LT_USERNAME,  
          'accessKey': process.env.LT_ACCESS_KEY,  
          'network': true,  
          'video': true,  
          'console': true  
        }  
      }  
      
      const browser = await chromium.connect({  
        wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`  
      })  
      
      const page = await browser.newPage()  
      
      await page.goto('https://www.bing.com')  
      
      const element = await page.$('[aria-label="Enter your search term"]')  
      await element.click()  
      await element.type('LambdaTest')  
      await element.press('Enter')  
      const title = await page.title()  
      
      try {  
        expect(title).toEqual('LambdaTest - Search')  
        // Mark the test as completed or failed  
        await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`)  
      } catch {  
        await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Title not matched' } })}`)  
      }  
      
      await browser.close()  
    })()  
      
    

  2. Pass the below command to run the test.

    
    
    node playwright-single.js  
    

## View your Playwright test results[â](https://www.testmuai.com/support/docs/playwright-testing#view-your-playwright-test-results "Direct link to View your Playwright test results")

* * *

The TestMu AI Automation Dashboard is where you can see the results of your Playwright tests after running them on the TestMu AI platform.

The below screenshot of TestMu AI Automation Dashboard shows the Playwright build on the left and the build sessions associated with the selected build on the right.

![Image](https://www.testmuai.com/support/assets/images/dashboard-cb91c5615ae49e0be9cb4666df58f1e4.webp)

On clicking the session name of the respective test, you can view the details of Playwright test session that you just executed. For example, the below screenshot shows a test execution details of Playwright test like Test Name, Test ID, selected configurations, test logs, basic info, input config, and test session video.

![Image](https://www.testmuai.com/support/assets/images/pw-build-659500d8aab6262d81b21edcd4744ac3.webp)

---

*Auto-generated from TestMu AI documentation.*