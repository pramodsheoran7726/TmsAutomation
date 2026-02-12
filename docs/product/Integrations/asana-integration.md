# Asana Integration

> **Source**: [https://www.testmuai.com/support/docs/asana-integration](https://www.testmuai.com/support/docs/asana-integration)

**Product**: Integrations

**Last Crawled**: 2026-01-27T20:47:57.715723

---

On this page

* * *

> Asana is a popular tool for teams following Agile methodology as a part of their Software Development Life Cycle. With Asana, you can coordinate all your teamâs work by eliminating roadblocks and pinpointing risks. It offers a free flowing dashboard for sprint planning. Allowing everyone to acknowledge who is doing what and when! You can manipulate tasks freely from one state to another. You can also set out ambitious goals and create a path towards achieving it by different tasks displayed on the dashboard.

The TestMu AI Asana Integration allows you to create a task directly to your specified Asana dashboard from TestMu AI platform. Share your UI observations and input with your teammates anytime, by capturing a screenshot, even in the middle of your test session. You can annotate the screenshot & highlight your issue or input. The fields populated by you when marking as bug through TestMu AI are displayed as information on Asana for that testing instance.

**Asana Integration with TestMu AI, like all of the integrations to 3rd party applications, is available for freemium as well as premium plan.**

## How To Integrate Asana With Your TestMu AI Account?[â](https://www.testmuai.com/support/docs/asana-integration#how-to-integrate-asana-with-your--account "Direct link to how-to-integrate-asana-with-your--account")

* * *

**Step 1:** Login to your TestMu AI account. You would need to have Admin or User level access to see and install integrations.

**Step 2:** Select **'Integration'** from the left navigation menu bar. This will guide you to a screen where you will find a list of 3rd party applications, available to integrate with your TestMu AI account.

**Step 3:** Click on **'ADD'** under the block that says 'Asana'.

![asana-integration](https://www.testmuai.com/support/assets/images/asana-1-86b451d14fba7ab3288667db110d8e42.webp)

**Step 4:** If you are already logged into **Asana** , you'll be asked to grant permission to TestMu AI for accessing your user-owned resources.

![asana-integration](https://www.testmuai.com/support/assets/images/asana-2-bf8575a09e0ab65f05c76353e6cc2777.webp)

**Step 5:** If you are not already logged in, then you will be redirected to a page where you can do so. Provide your login credentials. You can even login using your **Google account**.

![asana-integration](https://www.testmuai.com/support/assets/images/asana-2-bf8575a09e0ab65f05c76353e6cc2777.webp)

* * *

  * **Why we ask for your login credentials?**

Asana APIs uses OAuth 2.0's [authorization code grant flow](https://tools.ietf.org/html/rfc6749#section-4.1) for generating access tokens on user's behalf. It can also communicate with API from the command line with the help of Personal Access Token.

  * **What is a Personal Access Token?**

In scenarios where OAuth is excessively utilized, Personal Access Tokens comes to aid in accessing the API. While generating a token, make sure you provide a description that is easy to remember, as your Personal Access Token will be derived from it. Treat this token just as you would treat your own password! Access tokens are strings with authorization key required to access an API. They are issued to the client server and are usually opaque. They are used for requesting access to protected, user-specific resources. Access tokens are vital from a security point of view & can be generated in different formats, depending upon security requirements specified on the resource server.

* * *

**Step 7:** If you are logging into **'Asana'** for the first time, then you will be asked to choose teams concerned to your organizations. This is optional, you can skip and add teams later as well.

![asana-integration](https://www.testmuai.com/support/assets/images/asana-integration-4-a070622a97187193ed21b2beb40147ad.webp)

**Step 8:** That's it! Go to Integrations again and you will be able to notice a green tick indicating that Asana is successfully added.

![asana-integration](https://www.testmuai.com/support/assets/images/asana-3-7fc138612809cb92c0b95b758e84aa72.webp)

## How To Log Your First Bug Through Asana Integration?[â](https://www.testmuai.com/support/docs/asana-integration#how-to-log-your-first-bug-through-asana-integration "Direct link to How To Log Your First Bug Through Asana Integration?")

* * *

> **Note:** If you are using Asana for the first time, then make sure to create a project for yourself. It is a pre-requisite in order to push screenshots from your TestMu AI account.

**Step 1:** Go for any of the test from the left navigation menu. For demo, we will be taking "**Real Time Testing** " option.

**Step 2:** Present a URL of the web-app you need to test in the dialog box. After that, select any configuration for browser and operating system of your choice & hit '**Start** '.

![asana-integration](https://www.testmuai.com/support/assets/images/asana-4-2b227b29fba48186ae601644c6d4a728.webp)

**Step 3:** After the VM is launched and operable. You can perform testing on your web-app for finding bugs. If a bug gets revealed, then you need to click on the **Bug icon** from the left panel for capturing a screenshot of the same. We have highlighted that option with yellow in the below image.

![asana-integration](https://www.testmuai.com/support/assets/images/asana-5-853b7b82732e4a4e709b8607f94dc508.webp)

**Step 4:** After a screenshot is captured, you can annotate any issue or a task with an **in-built image editor**. Once you are done highlighting the bug, click on the button that says **"Mark as Bug"**.

![asana-integration](https://www.testmuai.com/support/assets/images/asana-6-a4a87157e2488dccf5d773c4a6aba3a4.webp)

**Step 5:** After clicking on **"Mark as Bug"** button a form would open up. Fill the fields as per your requirement.

  * You can choose from your **Workspaces** to which you would like to share.
  * You can choose from your **Projects** as well.
  * You can assign the bug to a colleague by populating the field **'Assignee'**.
  * You also get to post a **description** to help relate the cause of the issue or the task.

At the bottom of the form you will find a button **"Create Issue"**.

![asana-integration](https://www.testmuai.com/support/assets/images/asana-integration-9-b2eda2b5e8b1862e1fd3a07a9e264fee.webp)

**Step 6:** After you click on **"Create Issue"** , you will be able to observe it being successfully marked through a single click effort. You will get **prompt messages** on top of your Virtual Machine indicating the progress of bug logging. After few seconds you will be notified with a prompt message "**Bug successfully marked** " indicating that the screenshot has been pushed to your workspace.

![asana-integration](data:image/webp;base64,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)

Login to your Asana workspace and you will be able to notice the logged issue right away! All the data you provided through TestMu AI would already be presented in it. TestMu AI automatically includes test environment details and related screenshots in the screenshot as attachments.

![asana-integration](https://www.testmuai.com/support/assets/images/asana-integration-11-7290c022fa2fae30f20f6e4c3128a141.webp)

You can set a due date to the task in Asana to help you organize your tasks easily.

## How To Remove Asana Integration?[â](https://www.testmuai.com/support/docs/asana-integration#how-to-remove-asana-integration "Direct link to How To Remove Asana Integration?")

* * *

> You can work with one integration at a time. So if you would want to integrate to a similar 3rd party application, then you would have to **Remove** your current integration. Here is how you can do that.

**Step 1:** Login to your TestMu AI account.

**Step 2:** Select 'Settings' from the left navigation menu bar & click on 'Integrations'. This will guide you to a screen where you will find 3rd party applications, available to integrate with your TestMu AI account.

**Step 3:** Click on **'Remove'**. You can find the Revoke button right under the **'Asana'** block which would be highlighted with a green tick.

![asana-integration](https://www.testmuai.com/support/assets/images/asana-7-12e51c30fc4a97cbfc4ecb292c1dfe81.webp)

* * *

That was all you need to know for TestMu AI \+ Asana Integration. Increase your productivity with our integrations. If you still have any questions for us, please feel free to let us know. Our experts are always **available on chat** to help you out with any roadblock regarding our product. Happy testing!

* * *

---

*Auto-generated from TestMu AI documentation.*