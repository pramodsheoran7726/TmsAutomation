# YouTrack Integration

> **Source**: [https://www.testmuai.com/support/docs/youtrack-integration](https://www.testmuai.com/support/docs/youtrack-integration)

**Product**: Integrations

**Last Crawled**: 2026-01-27T20:48:04.217069

---

On this page

* * *

YouTrack is a bug tracking and project management tool developed by JetBrains. It allows you to create agile boards, use reports and Gantt charts, dashboards, and time tracking. With YouTrack, you can find issues easily based on autocomplete queries and manipulate them in batches, customize all problem attributes, and create custom workflows.

With TestMu AI and YouTrack integration, you can push bugs directly from TestMu AI to your YouTrack's project. Also, capture screenshots, annotate bugs, and share them with your teammates and colleagues.

## How To Integrate YouTrack With Your TestMu AI Account?[â](https://www.testmuai.com/support/docs/youtrack-integration#how-to-integrate-youtrack-with-your--account "Direct link to how-to-integrate-youtrack-with-your--account")

* * *

**Step 1** : Login to your TestMu AI account. To install integrations, you need to have admin or user level access.

**Step 2** : Go to **'Integrations'** from the left menu bar. You will be routed to the integration page where you can find list of third-party applications.

**Step 3** : From the **'Bug Tracker'** category, click on the **'YouTrack'** block.

![Image](https://www.testmuai.com/support/assets/images/Screenshot-172-d5788d3c876b6a08dbb8faef1d64917d.webp)

> **Note:** If you already have an existing TestMu AI integration with any project management tool then you will be asked to uninstall the existing TestMu AI integration.

**Step 4** : You will come across two different options to choose from - **Cloud** and **Self Hosted**.

**Step 5:** When you select the **Cloud** option, you need to enter your YouTrack URL as shown below.

![Image](https://www.testmuai.com/support/assets/images/youtrack-cloud-153f581c1c47830a0c1c44623cc34c19.webp) ![Image](https://www.testmuai.com/support/assets/images/Screenshot-173-585b9b32d32112d1df0349cd14d3d881.webp)

**Step 6:** When you select the **Self Hosted** option, you need to enter YouTrack Host as shown below.

![Image](https://www.testmuai.com/support/assets/images/self-hosted-youtrack-d8524018f70c8e35ae828081b44f89c8.webp)

>   * **What is YouTrack URL?**  
YouTrack is the organization's domain name on your YouTrack Projects. It is included in the URL.  

![Image](https://www.testmuai.com/support/assets/images/youtrack-url-07adb4924b5fc5ee3e7e22e46394bac6.webp)

  * **What is an API Token?**  
An API token is required to authenticate a user's identity from one server to another by retrieving client resources from the server where the connection is initiated. To ensure its security and data integrity, API tokens are important when an end user connects into an application via a two-step verification process.

**Step 5** : To get the API token, log in to your YouTrack account and navigate to Profile on the top-right.

![Image](https://www.testmuai.com/support/assets/images/profile-a3a52096eb614210a106b5a6a3ea9263.webp)

**Step 6** : Click on the link that says _**'Update personal information and manage logins'**_.

![Image](https://www.testmuai.com/support/assets/images/hub-account-1ac0913a08464b08947ad1df39fb3220.webp)

**Step 7** : Select the **'Authentication'** tab.

![Image](https://www.testmuai.com/support/assets/images/auth-8d8d6159c0cab5c681fcf768efb53ea1.webp)

**Step 8** : Click on **'New Token'**.

![Image](https://www.testmuai.com/support/assets/images/new-token-051e12a44bca2a17b5d82561328cf43e.webp)

**Step 9** : Enter the token name and click on **'Create'**.

![Image](https://www.testmuai.com/support/assets/images/token-name-37b6d280d95bbd209d6059c1644a629b.webp)

**Step 10** : Your new token will be generated. Click on **'Copy Token'**. ![Image](https://www.testmuai.com/support/assets/images/copy-token-4d5d7d67862ce6e347920dea11aaaa5a.webp)

**Step 11** : Enter the Youtrack Domain and copied API token in the provided field and then press **'Install'**.

![Image](https://www.testmuai.com/support/assets/images/install-73eb29df82986f313dc0f7952a94076e.webp)

You have successfully integrated YouTrack with your TestMu AI account. Visit the **'Integrations'** again and you'll notice a green check on YouTrack block under the category _My Integrations_.

![Image](https://www.testmuai.com/support/assets/images/youtrack-added-8941d5bb51c6eccd5448f503b5f56f19.webp)

## Logging First Bug Through YouTrack Integration[â](https://www.testmuai.com/support/docs/youtrack-integration#logging-first-bug-through-youtrack-integration "Direct link to Logging First Bug Through YouTrack Integration")

* * *

For demonstration, we will log bugs while performing Real time testing.

**Step 1** : Select the Real Time Testing from the left menu.

**Step 2** : Enter the test URL, select browser, browser version, operating system and resolutions. Then press **'START'**. ![Image](https://www.testmuai.com/support/assets/images/configs-431f49e330869eec2270ba47a2a3401f.webp)

**Step 3** : A new virtual machine will fire up where you can perform live interactive testing of websites & web apps for filing bugs. To file a bug, click on the Bug icon to capture a screenshot.

![Image](https://www.testmuai.com/support/assets/images/mark-as-bug-863ddd80deae34eb2077104eab818fa5.webp)

**Step 4** : Once the screenshot is captured, you can annotate any bugs or tasks by using in-built image editor tools. Then click on **'Mark As Bug'**. ![Image](https://www.testmuai.com/support/assets/images/Screenshot-185-4523a8dbc2140a8ece19b615818e2242.webp)

**Step 5** : You will get a YouTrack ticket where you are required to fill up your bug details as per your requirement and then click on **'Create Issue'**.

>   * You can select the **Project**.
  * You can choose the **Board** to manage your tasks.
  * You can select the **Assignee** of the bug or task.
  * You can specify the **Title** to your test.
  * You can provide the **Description** of the issue.
  * You can also choose **Task type** , **Task Priority** , **Task State**.

Your bug will be marked successfully.

**Step 6** : Visit your YouTrack agile board, you'll notice your marked bugs and tasks.

![Image](https://www.testmuai.com/support/assets/images/Screenshot-197-7213fa4c2506d06226491ebf45c25a05.webp)

Click on your Project, you'll find all the test environment details along with captured screenshots.

![Image](https://www.testmuai.com/support/assets/images/Screenshot-198-168305b3458ff4effc37f2dc388c5923.webp)

## Uninstalling The YouTrack Integration[â](https://www.testmuai.com/support/docs/youtrack-integration#uninstalling-the-youtrack-integration "Direct link to Uninstalling The YouTrack Integration")

* * *

**Step 1** : Login to your TestMu AI account. Visit Integrations and navigate to **'My Integrations'**.

**Step 2** : Click on **'REMOVE'** adjacent to YouTrack block. ![Image](https://www.testmuai.com/support/assets/images/remove-62171d938228734e060d7676fb0ad2d1.webp) Your YouTrack integration will be removed successfully.

> That's all about YouTrack integration with TestMu AI. In case, you have any questions or want any further integration with your favorite integration tools, please feel free to reach us at our **24*7 Chat Support** or email us at [[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection#eb989e9b9b84999fab9f8e989f869ec58a82).   
**Happy testing!**

---

*Auto-generated from TestMu AI documentation.*