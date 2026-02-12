# Getting Started With k6 Browser Testing

> **Source**: [https://www.testmuai.com/support/docs/k6-browser-testing](https://www.testmuai.com/support/docs/k6-browser-testing)

**Product**: Web Automation

**Last Crawled**: 2026-01-27T20:47:18.642047

---

On this page

* * *

The [k6 Browser module](https://github.com/grafana/xk6-browser) brings browser automation and end-to-end web testing to k6 while supporting core k6 features. The Browser module introduces browser-level APIs that enable seamless interaction with browsers and facilitate the collection of frontend performance metrics as an integral part of your k6 tests.

k6 browser module aims to provide rough compatibility with the Playwright API, so you donât need to learn a completely new API.

TestMu AI allows you to run k6 Browser tests on a browser farm of 40+ real browsers and operating system combinations. This guide will cover the basics of getting started with K6 testing on the TestMu AI platform.

**Note** : k6 Browser is an experimental module that supports browser testing through the Chrome DevTools Protocol (CDP).

## Prerequisites[â](https://www.testmuai.com/support/docs/k6-browser-testing#prerequisites "Direct link to Prerequisites")

* * *

> Note: All the code samples in this documentation can be found in the TestMu AI's Repository on GitHub. You can either download or clone the repository to quickly run your tests. [![Image](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAECkAABApAfV44g8AAAAHdElNRQfmBBMLCwK6SluIAAAEDUlEQVRYw62YS2xUVRjHf3NmGGbolFbtQ1Gkj0BQGZsyWBaSphtJ2VRCkwkRUzEGWBHALtSFMSZNWLhw0xgXmCgucNGFbalhUbXhkVAzKJSGaptgSiahnco0UDozdh7XRafTe8+5d3rnjt9Zzf985/zueX3nO+PCnlVQz0vU8xx+IMkj5okyz7Kdxq4NPerZRzshGnkWPx5cgEaGJHH+5hZXiTBv81NNTNDKeSZIoRUpKSY4TyvCCWIP/cwV7V5f5uhnT2mAKnqZtQ1YK7P0UmUXEWSIbMkIDY0sQwTtIDqZcgRYK1N0boQI87AshIbGQ8LFEN3EykZoaMQ4YoVo58H/gtDQeEC7GaKBiM5pmUmiJSx/mlnuktApERpkhJcLhkaXqGUX7/MTSxsCnjDIOzRRx4BBv4BXXvCEweGDvO7nIEOskGORaW4wwgADjHCDaRbJscIwb7E5733K0EfCuAHqGDdUL/GmrjbAMY4TYhsBvLhx4yXANkIc5xiVhlV9auhnnLr1ytPkDJULpYaIwjH+x9BPjtMAAqilR4rGbjY5gmzCbfjtooeaVUgHLZJzJU2OII0EJKWFDhC46VK+2+MQ0oRHGdvbuKGZGWVT3mSHI8gObip9zdAMYZKS/JQuRwiALpal3pKEBfvxSY7XGXUMGeWapPjYL0zi/xUSjiEJrihaUNAoSUnuOEYATJCUlEZBjSQts1AWJKakSTWCLZKUJV0WJE1WUrYIZWe75dhZonmlUw8eoXB9bC0LslXZrRlBSh4c28uCbFcWICV4JElCiWSl2etKLhkXRBW3A2VMWCUHFC0qmFTEVtocQ9poVbRJQUTZshWcVBbPnm3mhBLs00QgSFSJnClOOoKcUoKtRpQg+Bk2Tc/eLfExIHiPBZOehvGv8s0TnS+UuGZtzXxpmjzl1uakoXBt3eEEn3G74PInn/MGVUXeYy6qaaOPaYucbHo9xevLS7N0Ai/yNZmCW5xxvuVjkyP6Mp/wHb+xWCTx61t331kYS5wPgQA/SM6XqVYgz3B5g9xyhp36BmcLee8SR4DXDBOQ5JDpZB2S8k5jyXLW6F7FiC6NqAUO6h5Df1BvCnmBv4pARtTHXYj7+coMPflJ/Ihv+Ipe9losfQXXLBH3CZk1OcrjvMN1nre1cX38bIF4zFHzJoJzhRM7wKu2IKOmiCTn9EdZfy/m6MfPp/iAbvYxyl3m+JcAKX4kY2tsAEn66Cdn7eDhjGHfZ0mj8ctqaLA1kjhnlCtdMReHlUe2fcgUh238XwPAbr43xNNflSvVDJLgIrttTyrgo5sxVvLNr1pC1nbXCmN0O7mFqgkzSAyNSxaPIjcX0YgxSNgk7OhWoLj52UsLY9yzqH+FDib4XUlNDfYf4zU3unVPZ4cAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDQtMTlUMTE6MTA6MjUrMDA6MDAAc6jkAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA0LTE5VDExOjEwOjI1KzAwOjAwcS4QWAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=) View on GitHub](https://github.com/LambdaTest/k6-browser-tests-sample)

  1. Install k6. Refer the installation guide here: <https://k6.io/docs/get-started/installation/>

  2. In order to run your k6 tests, you will need to set your TestMu AI username and access key in the environment variables. Click the **Access Key** button at the top-right of the Automation Dashboard to access it.

![Image](https://www.testmuai.com/support/assets/images/key-e349e7aa2ae3877897095458e8470e91.webp)

**Windows**
    
    
    set LT_USERNAME = "YOUR_LAMBDATEST_USERNAME"  
    set LT_ACCESS_KEY = "YOUR_LAMBDATEST_ACCESS_KEY"  
    

**macOS/Linux**
    
    
    export LT_USERNAME = "YOUR_LAMBDATEST_USERNAME"  
    export LT_ACCESS_KEY = "YOUR_LAMBDATEST_ACCESS_KEY"  
    

## Run Your First k6 Test[â](https://www.testmuai.com/support/docs/k6-browser-testing#run-your-first-k6-test "Direct link to Run Your First k6 Test")

* * *

Shown below are the steps on running k6 tests on the TestMu AI platform.

  1. Clone the [k6-browser-tests-sample GitHub repository](https://github.com/LambdaTest/k6-browser-tests-sample) and switch to the cloned directory.

    
    
    git clone https://github.com/LambdaTest/k6-browser-tests-sample.git  
    cd k6-browser-tests-sample  
    

  2. Ensure you have K6 installed.

  3. Configure your TestMu AI authentication credentials.

Once you are done with the above-mentioned steps, you can initiate your first k6 test on TestMu AI.

> **Test Scenario** : The below test script runs on Chrome browser on macOS Ventura. It visits the DuckDuckGo search engine and searches for Playwright.
    
    
    import {chromium} from 'k6/experimental/browser';  
    import {expect} from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';  
      
    export default async function() {  
      const capabilities = {  
        "browserName": "Chrome",  
        "browserVersion": "latest",  
        "LT:Options": {  
          "platform": "MacOS Ventura",  
          "build": "K6 Build",  
          "name": "K6 Test",  
          "user": `${__ENV.LT_USERNAME}`,  
          "accessKey": `${__ENV.LT_ACCESS_KEY}`,  
          "network": true,  
          "video": true,  
          "console": true,  
          'tunnel': false, // Add tunnel configuration if testing locally hosted webpage  
          'tunnelName': '', // Optional  
          'geoLocation': '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/  
        },  
      };  
      
      const wsURL = `wss://cdp.lambdatest.com/k6?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`  
      const browser = chromium.connect(wsURL);  
      
      const page = browser.newPage();  
      
      try {  
        await page.goto("https://duckduckgo.com");  
        await page.screenshot({path: 'screenshots/k6Screenshot.png'});  
      
        let element = await page.$("[name=\"q\"]");  
        await element.click();  
        await element.type("K6");  
        await element.press("Enter");  
        let title = await page.title();  
      
        try {  
          expect(title).to.equal("K6 at DuckDuckGo");  
          // Mark the test as passed or failed  
          await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify(  
              {action: "setTestStatus", arguments: {status: "passed", remark: "Assertions passed"},})}`);  
        } catch (e) {  
          await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify(  
              {action: "setTestStatus", arguments: {status: "failed", remark: e.stack}})}`);  
          console.log("Error:: ", e.stack);  
        }  
      } finally {  
        page.close();  
        browser.close();  
      }  
    };  
    

  4. Pass the below command to run the test.

    
    
    K6_BROWSER_ENABLED=true k6 run k6_sample.js  
    

## View your k6 test results[â](https://www.testmuai.com/support/docs/k6-browser-testing#view-your-k6-test-results "Direct link to View your k6 test results")

* * *

The TestMu AI Automation Dashboard is where you can see the results of your k6 tests after running them on the TestMu AI platform.

The below screenshot of TestMu AI Automation Dashboard shows the k6 build on the left and the build sessions associated with the selected build on the right.

![Image](https://www.testmuai.com/support/assets/images/k6-dashboard-ac8457a186296e000c11b426947273c2.png)

On clicking the session name of the respective test, you can view the details of k6 test session that you just executed. For example, the below screenshot shows a test execution details of k6 test like Test Name, Test ID, selected configurations, test logs, basic info, input config, and test session video.

* * *

---

*Auto-generated from TestMu AI documentation.*