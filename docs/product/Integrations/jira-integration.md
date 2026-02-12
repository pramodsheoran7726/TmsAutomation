# Jira Integration

> **Source**: [https://www.testmuai.com/support/docs/jira-integration](https://www.testmuai.com/support/docs/jira-integration)

**Product**: Integrations

**Last Crawled**: 2026-01-27T20:47:52.852130

---

On this page

The TestMu AI Jira integration helps you create issues in Jira directly from the TestMu AI platform itself. With simple one-click integration, you can push annotated issues to the project of your choice, assign them to the required teammate, and attach screenshots. You can do all that while in the middle of a test session in the TestMu AI platform. The fields populated by you when marking as a bug through TestMu AI are displayed as information on the Jira ticket for a testing instance.

**Jira Integration with TestMu AI, like all of the integrations to 3rd party applications, is available for freemium as well as premium plan.**

![jira](https://www.testmuai.com/support/assets/images/0-d1e150a4b45bef78def4785f47bcbe56.png)

## How to Establish Integration with Jira from Your TestMu AI Account?[â](https://www.testmuai.com/support/docs/jira-integration#how-to-establish-integration-with-jira-from-your--account "Direct link to how-to-establish-integration-with-jira-from-your--account")

**Step 1:** Login to your TestMu AI account. You would need to have Admin or User level access to see and install integrations. Don't have an account, [register for free](https://accounts.lambdatest.com/register).

**Step 2:** Select 'Integration' from the left navigation menu bar. This will guide you to a screen where you will find a list of 3rd party applications, available to integrate with your TestMu AI account.

**Step 3:** Click on 'ADD' under the block that says 'Jira'.

![jira](https://www.testmuai.com/support/assets/images/1-311f267e8505fe0d278bd3d006cef352.png)

**Step 4:** Once you click on **Connect** , you will be redirected to the below screen. Where You have to select Instance type. If you have a **Self Hosted Jira** instance, you can prefer this document [Self-hosted](https://www.testmuai.com/support/docs/jira-self-hosted-integration/).

![jira](https://www.testmuai.com/support/assets/images/2-62d1ca5b07467c5e00f14f76f704e7c2.png)

**Step 5:** Click on the Install button to be redirected to the Jira dashboard.

**Step 6:** Click on Accept.

![jira](https://www.testmuai.com/support/assets/images/3-a13951220dd2ce63ea3c73b71d014fc7.png)

**Step 7:** Once you click on Accept, you will be redirected to the screen below, where you have to select your site and click on the Select Site and Proceed button.

![jira](https://www.testmuai.com/support/assets/images/4-5e28e98145483a3be34e7c6c1a71d398.png)

**Step 8:** When you click on the **Select and Proceed button** , you will be redirected to the below screen, where you have to select projects that you want to integrate and click on the **Integrate Projects and Install button.**

![jira](https://www.testmuai.com/support/assets/images/5-1e6afe72b738a06fbea52887dcb1b3d9.png)

That's it! Go to Integrations again, and you will be able to notice a **green tick** indicating that Jira is successfully **installed**. You are all set to experience **one-click bug logging** to share your issues directly from your TestMu AI account with our teammates on the Jira project.

![jira](https://www.testmuai.com/support/assets/images/6-7e49e244ff1a4349846385e84e9993f3.png)

## How To Log Your First Bug Through Jira Integration?[â](https://www.testmuai.com/support/docs/jira-integration#how-to-log-your-first-bug-through-jira-integration "Direct link to How To Log Your First Bug Through Jira Integration?")

**Step 1:** Go for any of the tests from the left navigation menu. For the demo, we will be taking the **"Real Time Testing"** option.

**Step 2:** Present the URL of the web app you need to test in the dialog box. After that, select any configuration for the browser and operating system of your choice & hit '**Start** '.

![jira](https://www.testmuai.com/support/assets/images/7-fdde13a6095966f3d760e53607564d72.png)

**Step 3:** After the VM is launched and operable. You can perform testing on your web-app for finding bugs. If a bug gets revealed, then you need to click on the Bug icon from the left panel for capturing a screenshot of the same. We have highlighted that option with yellow in the below image.

![jira](https://www.testmuai.com/support/assets/images/8-f9f605c97d7a8df92a3b8f3de4dfc39b.png)

**Step 4:** After a screenshot is captured, you can annotate any issue or a task with an in-built image editor. Once you are done highlighting the bug, click on the **bug icon** which is beside Jira.

![jira](https://www.testmuai.com/support/assets/images/9-063c1f29918f8487280c0903adbc0136.png)

**Step 5:** After clicking on "**Mark as Bug** " button a Jira specific form would open up. Fill the fields as per your requirement.

  * You can select which project should the ticket go under, along with the **Issue type**.
  * You can set the **priority** of the bug.
  * You can assign the bug to a colleague by populating the field '**Assignee** '.
  * You also get to post a **description** to help relate the cause of the issue or the task in Summary section.

> Note: Only projects with work type as BUG enabled will be seen in the project dropdown. If you don't see a project in the dropdown, please add **work type as BUG** for your Jira project and resync the integration from the integrations page.

![jira](https://www.testmuai.com/support/assets/images/10-aca5a32d823049c3e79b35f30f430596.png)

**Step 6:** Click on "**Mark As Bug** " & observe it being successfully marked through a single click effort. Once you hit the button, you will get **prompt messages** on top of your Virtual Machine indicating the progress of bug logging. You will get a prompt message in few seconds mentioning "**Your bug has been logged successfully** " indicating that the issue has been successfully pushed to the respective workspace.

![jira](data:image/png;base64,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)

**Step 7:** Log in to your Jira dashboard. You will be able to notice the logged issue right away! All the data you provided through TestMu AI would already be presented in it. TestMu AI automatically includes test environment details and related screenshots in the ticket as attachments.

## How To Remove Jira Integration?[â](https://www.testmuai.com/support/docs/jira-integration#how-to-remove-jira-integration "Direct link to How To Remove Jira Integration?")

**Step 1:** Login to your TestMu AI account.

**Step 2:** Select '**Integration** ' from the left navigation menu bar. This will guide you to a screen where you will find 3rd party applications, available to integrate with your TestMu AI account.

**Step 3:** Click on '**Remove** '. You can find the **Remove** button when you click on ellipsis in **âJiraâ** block.

![jira](https://www.testmuai.com/support/assets/images/12-dd8ff5eaca55be022e12ef15c0032009.png)

* * *

That was all you need to know for TestMu AI \+ Jira Integration. Increase your productivity with our integrations. If you still have any questions for us, please feel free to let us know. Our experts are always available on **chat** to help you out with any roadblock regarding our product. Happy testing!

---

*Auto-generated from TestMu AI documentation.*