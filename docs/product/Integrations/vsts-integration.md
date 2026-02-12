# Azure DevOps Integration

> **Source**: [https://www.testmuai.com/support/docs/vsts-integration](https://www.testmuai.com/support/docs/vsts-integration)

**Product**: Integrations

**Last Crawled**: 2026-01-27T20:48:46.326200

---

On this page

* * *

Azure DevOps, previously known as **VSTS: Visual Studio Team Services** â A software developed by Microsoft Corporations to provide an IDE(Integrated Development Environment) for facilitating management & development regarding a software project. Azure DevOps provides a set of specific, cloud-based collaboration tools for developers, testers & software architects. So you can plan smarter and ship even faster with the help of effective collaboration. With their **Azure Pipelines** you can deploy your development to any Git provider cloud.

The TestMu AI Azure DevOps Integration allows you to create a work item directly in your project from TestMu AI platform. Push a bug, epic, task, story to your respective project anytime, even in the middle of your test session. The fields populated by you when marking as a bug through TestMu AI are displayed as information on the work item in Azure DevOps project for that testing instance.

info

We recently added support for custom fields to our integration. From now on, all required custom fields in your Azure Devops account will be visible in your bug marking form on lambdatest.

**Azure DevOps Integration with TestMu AI, like all of our other integrations to 3rd party applications, is available for freemium as well as premium plan.**

## How To Integrate Azure DevOps With Your TestMu AI Account?[â](https://www.testmuai.com/support/docs/vsts-integration#how-to-integrate-azure-devops-with-your--account "Direct link to how-to-integrate-azure-devops-with-your--account")

* * *

**Step 1:** Login to your TestMu AI account. You would need to have Admin or User level access to see and install integrations.

**Step 2:** Select **'Integration'** from the left navigation menu bar. This will guide you to a screen where you will find a list of 3rd party applications, available to integrate with your TestMu AI account.

**Step 3:** Click on **'Add'** under the block that says 'Azure DevOps'.

![azure-devops-integration](https://www.testmuai.com/support/assets/images/azure-devops-integration-1-ad92c3a71be4298cbf2a25b9b5a62602.webp)

**Step 4:** As you hit **"INSTALL"** , you will be directed to a page where you have to provide your **Azure DevOps URL** , your **Azure DevOps Email** & your **Azure DevOps Access Token**. By doing so you will grant TestMu AI the access to your user-owned resources on Microsoft's Visual Studio Team Services account. This is necessary for authorization purpose between APIs of two different applications.

![azure-devops-integration](https://www.testmuai.com/support/assets/images/Screenshot-282-e5b69102451f5883d0bd6ff23126aae6.webp)

> **Note:** For **Self-Hosted** Azure DevOps instance, you need to whitelisted IP address of your privately hosted projects. To get your IP whitelisted, please contact our customer support.

![azure-devops-integration](https://www.testmuai.com/support/assets/images/azure-devops-integration-3-109fa865cc7b81a352222a73adac4e2b.webp)

* * *

  * **What is my Azure DevOps URL?**

## **Azure DevOps URL** would be the domain name. Log into your Azure DevOps account and you will find it under your organization.[â](https://www.testmuai.com/support/docs/vsts-integration#azure-devops-url-would-be-the-domain-name-log-into-your-azure-devops-account-and-you-will-find-it-under-your-organization "Direct link to azure-devops-url-would-be-the-domain-name-log-into-your-azure-devops-account-and-you-will-find-it-under-your-organization")

![azure-devops-integration](https://www.testmuai.com/support/assets/images/Screenshot-286-9a3f546e81690b7e14a98af0f74af292.webp)

**Step 5:** If you are already inside a project in your Azure DevOps account, then you will find it in the URL. For example: <https://dev.azure.com/> **salmank0856**

![azure-devops-integration](https://www.testmuai.com/support/assets/images/Screenshot-284-05c0ab9c94daeaf51bb969d50c14d5f5.webp)

* * *

  * **What is my Azure DevOps Email?**

In this field you need to specify the **email id** through which you sign into your **Azure DevOps account**.

  * **What is my Azure DevOps Access Token?**

* * *

You can generate your Azure DevOps access token under **'Personal access tokens'** by clicking on setiings icon next to top right corner where your user avatar is displayed and click on **'+ New Token'**.

![azure-devops-integration](https://www.testmuai.com/support/assets/images/Screenshot-277-a2e5057d732bf565fbb91f10c6174d56.webp)

* * *

  * **What are access tokens?**

Access tokens are strings with authorization key required to access an API. They are issued to the client server and are usually opaque. They are used for requesting access to protected, user-specific resources. Access tokens are vital from a security point of view & can be generated in different formats, depending upon security requirements specified on the resource server.

* * *

![azure-devops-integration](https://www.testmuai.com/support/assets/images/Screenshot-278-d3a808c08fa0daad64574ed88e878679.webp)

**Step 6:** After you click on **'+ New Token'** , mention a **name** for the access token. Define the **scopes** for authorizing access. By doing so, you will be providing the level of access you want to provide to any 3rd party API. For TestMu AI integration with Azure DevOps, select the radio button for **'Full access'** & click on **'Create'**.

![azure-devops-integration](https://www.testmuai.com/support/assets/images/Screenshot-279-85d6a1631003b2b0730ec7c9c2879d37.webp)

  * A token is generated, copy the token to your clipboard and make sure to store it safely with you.

![azure-devops-integration](https://www.testmuai.com/support/assets/images/Screenshot-280-6d4252cd234900c4216a60412ad5484b.webp)

Access tokens are just as important as your passwords and shall not be misplaced into wrong hands. If by any chance you lose it in future or it gets shared to someone whom you don't trust, then you can always revoke the token and create a new one.

For revoking a token, click on any personal access token and hit the **'Revoke'**.

![azure-devops-integration](https://www.testmuai.com/support/assets/images/Screenshot-281-5da9350aefdc0f82877b79a45ee875db.webp)

**Step 7:** Enter your Azure DevOps URL, E-mail and Access token in the provided field and & press **Install**.

![azure-devops-integration](https://www.testmuai.com/support/assets/images/Screenshot-282-e5b69102451f5883d0bd6ff23126aae6.webp)

**Step 8:** Now, you will notice a success message as below.

![azure-devops-integration](https://www.testmuai.com/support/assets/images/Screenshot-275-dbbbd67f58ddff7ff5ae9f6ff563bc85.webp)

That's it! Go to Integrations again and you will be able to see Azure DevOps under 'My Integrations' section. You can now experience bug logging in a fly from any of your running test session in TestMu AI to your project directly by a single click.

![azure-devops-integration](https://www.testmuai.com/support/assets/images/azure-devops-integration-13-aeaeb0005d266a040dd966dd5e35f422.webp)

## How To Log Your First Bug Through Azure DevOps Integration?[â](https://www.testmuai.com/support/docs/vsts-integration#how-to-log-your-first-bug-through-azure-devops-integration "Direct link to How To Log Your First Bug Through Azure DevOps Integration?")

* * *

**Step 1:** Go for any of the test from the left navigation menu. For demo, we will be taking "**Real Time Testing** " option.

**Step 2:** Present a URL of the web-app you need to test in the dialog box. After that, select any configuration for browser and operating system of your choice & hit '**Start** '.

![azure-devops-integration](https://www.testmuai.com/support/assets/images/azure-devops-integration-14-8d4e9809b805394e78f7e0bbc0f6e622.webp)

**Step 3:** After the VM is launched and operable. You can perform testing on your web-app for finding bugs. If a bug gets revealed, then you need to click on the **Bug icon** from the left panel for capturing a screenshot of the same. We have highlighted that option with red in the below image.

![azure-devops-integration](https://www.testmuai.com/support/assets/images/azure-devops-integration-15-78dd5029d54b57a51e3803ff6fcfe8cd.webp)

**Step 4:** After a screenshot is captured, you can annotate any issue or a task with an **in-built image editor**. Once you are done highlighting the bug, click on the button that says **"Mark as Bug"**.

![azure-devops-integration](https://www.testmuai.com/support/assets/images/azure-devops-integration-16-0b8e47d062ec8fd8b76500fbb63ab81f.webp)

**Step 5:** Once you click on **"Mark as Bug"** button a form would open up. Fill the fields as per your requirement.

  * You can choose out of your **'Projects'** , for logging your UI observation.
  * You can select the appropriate **'Team'** to which you would like to share the UI observation.
  * You can assign it to a colleague by populating the **'Member'** field.
  * You can specify the number of **Iteration**.
  * You can choose a the type of observation by selecting a **'Work Type'**.
  * You can provide a **'Title'** when pushing the screenshot.
  * You can also provide the steps to reproduce in the **'Repro Steps'** field.
  * Specify the additional information in the **'System info'**.
  * Select a **Priority** & **'Severity'** of the UI observation.
  * Choose the concerned area from the list of **'Activity'**
  * You also get to post a **'Description'** to help relate the cause of the issue or the task.

![azure-devops-integration](https://www.testmuai.com/support/assets/images/azure-devops-integration-17-72a6e03856cad003adfa8cc71b808b08.webp)

**Step 6:** Click on **"Create Bug"** & observe it being successfully marked through a single click effort. Once you hit the button, you will get **prompt messages** on top of your Virtual Machine indicating the progress of bug logging. You will get a prompt message in few seconds mentioning "**Bug successfully marked** " indicating that the UI observation has been pushed to your project.

![azure-devops-integration](data:image/webp;base64,UklGRtAEAABXRUJQVlA4IMQEAACQIgCdASpbAUsAPpE8mUkloyKhLtKK2LASCWVu3V/cR9pdetJr9uVz1um3buVkyggrGsy6HjyZnek6gUllkT+JdCvno+sfYL6YKJAP9B/D3Cyg1D9jPcuj80yIbcK4z9RXFv/3xKZ6OtpLc1iVZ2itSEIi/0lUjHYlzZXGtymmmjGyHSeyBT/Gdl/qBArTZfwxCXxLid6dhc5E5jxh+mg6SrdelO4TsEPZbsZVj5iBi3LzO1Y8s4rynC8knptXiomDNLp2huQeyCGBFwj8sbADGDAJ+YAuxLTwkoCKlG1tOeXl1k2I9ma61hKIF/bdipCCZXT9jEIQnj66D2pQau1o62amgUWfXIPKup0BWmfykTBgec75f5aHXjZaB2AA/voya8jp76yGyCQRw3aA8zMpLCLme1AHWxW/9/ym2/Qy7xSlW18Fx4Wk8DIM6CKZcdYtn6uL1B3QJZFtadSGmmFMwH4eNft/0Hggdgg6mqH4n4CWvDD1+jHH7q7ff1beq3On4jHh7FjTvfyL63WnKuBNbkcwVFvcEM8k936pfAX89QKGYmYKeKyT6NnknAw3L5F8h40Vkbsq0VMxXWjumr9g9yrmhOr8IFrk5mlobxBFv7g+HX1jMcjWpxesgK+CEUSz3z0oeP3X+qvD6UIpsp2QL3z7yEdu6nDsuYVqGqlhqbcPohUsm6fUzs8+zwveBhiBZnJ1CKxRcKx/9iqSD3PH0kKo199kF2tzosCU8A4uy3hKopi/bHUZLb8KVSJq0O+cUt61Jn5jReb+EHyJf/E7Sp9/rqLEg/D2aXxEv1tzNzE/iwRmIMpJkDobamQFNRS4Uww/+tFdpG/Aj+/wxoxCZ6tpKC93OqNG66rjlNnO3BQFPsCqlPy6jfAbHjFDebt6lvQWwRMtp/yWt+KpV1Az9QXVbVVhyFyOxeqKapqk3tj1N4KpfEWVkQ0ZHd9QSlul/XsosvO4aIX6mVkXBTIId4jlUjDQD/UD/AF6GvPhe9mDR6rP6scC6IcAwehUAkc2DQ5UHKyh57HU26/iztGtk5FGmvClyAPN688rGfsU6W0hcUm1T8YRtvf9g61x/tfk12SKgmvv8RhDRz8L0CGq+bVdOedVl5Oh8Rp9nig7fA38fST9NWfOdzxFUFFfIngjBe9GNrpSL2z4evO0C4YuaZiXPq91mR0iazUYDekb60HLoIQypKeO3VjI6Yf2+H827gRFcCjrZ79HCWfIflubTY7949IrJIQWRaNhq1X1KY27xOpqAwN4Trch2u6u5Gh7/0mo7OoeVRQBZZsNtPspbyt/8B/Qvg/DW8lw7pUrsoGA984I30mXTQY9OUp1oUU4dhlbEGIAcXKvukWp7Qv9gDbB2muv/PDRe3SpC2qAJI2q2UbjDBiutlc1lvuD4H5PF/hcBZZTnpJyGbTALLYbp3E0OrurQxrj3r1mrso6Wowsnkm4gAcxWJeKErnBJbNgZCvNSvxD1tCY7DE+gKyZqJjOziZsVwAxdPPQbjiUIaJqw7WzKZE+b+UzAeVqQNpMbBTS/3M9Mu5Fb/ktejX2dPgAAB9bLCA/zazCGK94GO+tK/nNDJB6M58M43ecvnUAAGEz/xNtLdtYdEZX5T/lAAAAAA==)

**Step 7:** Visit your Azure DevOps project. You will be able to notice the logged issue right away by navigating to **Boards** from the left navigation menu and heading to the **Work Items**.

![azure-devops-integration](https://www.testmuai.com/support/assets/images/azure-devops-integration-19-71a0c8f4c430812587dcef79402c7b42.webp)

**Step 8:** Click on the **Title** to open the details. All the data you provided through TestMu AI would already be presented in it. TestMu AI automatically includes test environment details and related screenshots in your work item on the respective project.

![azure-devops-integration](https://www.testmuai.com/support/assets/images/azure-devops-integration-20-13193da6a5cac39ff14d31057ad4ec8a.webp)

## How To Remove Azure DevOps Integration?[â](https://www.testmuai.com/support/docs/vsts-integration#how-to-remove-azure-devops-integration "Direct link to How To Remove Azure DevOps Integration?")

* * *

> You can work with one integration at a time. So if you would want to integrate to a similar 3rd party application, then you would have to **remove** your current integration. Here is how you can do that.

**Step 1:** Login to your TestMu AI account.

**Step 2:** Select '**Settings** ' from the left navigation menu bar & click on '**Integrations** '. This will guide you to a screen where you will find 3rd party applications, available to integrate with your TestMu AI account.

**Step 3:** Under '**My Integrations** ',you'll now see '**Azure Devops** '. Click on '**REMOVE** '. You can find the remove button right next to **'Azure DevOps'.**

![azure-devops-integration](https://www.testmuai.com/support/assets/images/azure-devops-integration-21-aeaeb0005d266a040dd966dd5e35f422.webp)

* * *

That was all you need to know for TestMu AI \+ Azure DevOps Integration. Increase your productivity with our integrations. If you still have any questions for us, please feel free to let us know. Our experts are always **available on chat** to help you out with any roadblock regarding our product. Happy testing!

* * *

---

*Auto-generated from TestMu AI documentation.*