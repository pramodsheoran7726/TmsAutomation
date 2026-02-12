# Bitbucket Integration

> **Source**: [https://www.testmuai.com/support/docs/bitbucket-integration](https://www.testmuai.com/support/docs/bitbucket-integration)

**Product**: Integrations

**Last Crawled**: 2026-01-27T20:48:23.090144

---

On this page

* * *

Bitbucket â A web-based repository hosting service owned by Atlassian for facilitating version control in development projects. It supports the project with a revision control system based on either Git or Mercurial. It is free to use, though they also offer a commercial plan. With Bitbucket, you can perform **access control** to your source-code, **workflow control** to impose a project workflow. Easy code revaluation through pull requests offering in-line annotation & Integration with Jira for end-to-end development tracing.

The TestMu AI Bitbucket Integration allows you to create an issue directly in your repository from TestMu AI platform. Push an issue to your respective repository anytime, even in the middle of your test session. The fields populated by you when marking as a bug through TestMu AI are displayed as information on the issue in the repository for a testing instance.

**Bitbucket Integration with TestMu AI, like all of our other integrations to 3rd party applications, is available for freemium as well as premium plan.**

## How To Integrate Bitbucket With Your TestMu AI Account?[â](https://www.testmuai.com/support/docs/bitbucket-integration#how-to-integrate-bitbucket-with-your--account "Direct link to how-to-integrate-bitbucket-with-your--account")

* * *

**Step 1:** Login to your TestMu AI account. You would need to have Admin or User level access to see and install integrations.

**Step 2:** Select **âIntegrationsâ** from the left navigation menu bar. This will guide you to a screen where you will find a list of 3rd party applications, available to integrate with your TestMu AI account.

**Step 3:** Click on **âAddâ** under the block that says âBitbucketâ.

![add bitbucket](https://www.testmuai.com/support/assets/images/add-bitbucket-99691813f3a28ab309deed01526fb908.webp)

**Note:** Make sure you have an account signed up with Bitbucket before you begin the integration. If you donât have then you will be redirected to a screen where you can create one. If you already have an account setup for any of the Atlassian tools then you may use the same credentials as that one.

![signup](https://www.testmuai.com/support/assets/images/bitbucket-signup-5b04b3f06020a82429a492cd0fb1b894.webp)

**Step 4.** Once you click on the sign up button, you will be asked to provide a unique username. After providing the username, you need to click **âContinueâ.**

![form](https://www.testmuai.com/support/assets/images/bitbucket-form-3d9adb9f0eca30eb37f3065c6fea53d6.webp)

**Step 5.** As you press "ADD" button, you will be directed to an authentication page. Here you will need to grant TestMu AI the access to your user-owned resources on Bitbucket. Hit on the blue button that says **"Grant access".**

![grant access](https://www.testmuai.com/support/assets/images/bitbucket-grantaccess-824e839019ff13745d4f4dffe42fd413.webp)

**Why we ask for your login credentials?**

Bitbucket APIs uses OAuth 2.0âs [authorization code grant flow](https://tools.ietf.org/html/rfc6749#section-4.1) for generating access tokens on userâs behalf.

**What is an Access token?**

Access tokens are strings with authorization key required to access an API. They are issued to the client-server and are usually opaque. They are used for requesting access to protected, user-specific resources. Access tokens are vital from a security point of view & can be generated in different formats, depending upon security requirements specified on the resource server.

That is it, you will be notified with a prompt message on top mentioning that Bitbucket is successfully installed. If you look at your Integrations again and you will be able to notice a **green tick** indicating the same. You can now experience bug logging in a fly from any of your running test session in TestMu AI to your respective repository directly by a single click.

![Integration](https://www.testmuai.com/support/assets/images/bitbucket-integration-c543e821bb82ded28b6a927e8ff107bb.webp)

## Logging Your First Bug Through Bitbucket Integration?[â](https://www.testmuai.com/support/docs/bitbucket-integration#logging-your-first-bug-through-bitbucket-integration "Direct link to Logging Your First Bug Through Bitbucket Integration?")

* * *

**Note:** Enable the **Issue tracker** in your respective Bitbucket repository. For enabling the Issue tracker:

  * Visit your repository.
  * Go to **Settings.**
  * After settings, click on **Issue tracker.** You will find it under **FEATURES.**
  * Select the button for **Public issue tracker** & click **Save.**

![bug](https://www.testmuai.com/support/assets/images/bitbucket-bug-3e822b329de65087b35dc75e4a284e74.webp)

**Step 1:** Go for any of the test from the left navigation menu. For demo, we will be taking **"Real Time Test"** option.

**Step 2:** Present a URL of the web-app you need to test in the dialog box. After that, select any configuration for browser and operating system of your choice & click **âStartâ.**

![real time test](https://www.testmuai.com/support/assets/images/bitbucket-realtimetest-5912c62da542d09fa705e49b5ce1c951.webp)

**Step 3:** After the VM is launched and operable. You can perform testing on your web-app for finding bugs. If a bug gets revealed, then you need to click on the **Bug icon** from the left panel for [capturing a screenshot](https://www.lambdatest.com/full-page-screen-capture) of the same. We have highlighted that option with yellow in the below image.

![testing](https://www.testmuai.com/support/assets/images/bitbucket-testing-627b2bdb5685c549c8efc27cc59e9684.webp)

**Step 4:** After a screenshot is captured, you can annotate any issue or a task with an **in-built image editor.** Once you are done highlighting the bug, click on the button that says **"Mark as Bug".**

![mark bug](https://www.testmuai.com/support/assets/images/bitbucket-markbug-fe68b6ba6df200b7f642b9a146ce0c44.webp)

When marking as bug, make sure that you have a repository already created into your Bitbucket account. If you donât have one then you will be encountered with an error message as displayed in the below image.

![error message](https://www.testmuai.com/support/assets/images/bitbucket-errormessage-b2a96dbb595fb6fa1fb48a4590c35fbd.webp)

**Step 5:** If you are up and ready with a repository, then once you click on **"Mark as Bug"** button a Bitbucket specific form would open up. Fill the fields as per your requirement.

  * You can choose out of your **âRepositoriesâ,** for logging your UI observation.
  * You can set the appropriate **âLabelâ** for the same.
  * You can assign it to a colleague by populating the field **âAssigneeâ.**
  * You also get to post a **âDescriptionâ** to help relate the cause of the issue or the task.

![demo](https://www.testmuai.com/support/assets/images/bitbucket-demo-e9e144663efa40b607d1ce268966546e.webp)

**Step 6:** Click on **"Create Bug"** & observe it being successfully marked through a single click effort. Once you hit the button, you will get **prompt messages** on top of your Virtual Machine indicating the progress of bug logging. You will get a prompt message in few seconds mentioning **"Bug successfully marked"** indicating that the UI observation has been pushed to your Bitbucket repository.

![marked bug](data:image/webp;base64,UklGRtIEAABXRUJQVlA4IMYEAAAwHwCdASpbAUsAPp1CnEkmIyKiLzLKwLATiWVu3VutaXt93E6aU8RvBuWzY371XUCkpsic0vx+6hPTBRSXLIV/Nc1neTeX2RtxkKOXMOMrL7if3JvJbYRH7l+TpBn9pP/czwO+KMx+/4Pn+5I/nZBkW38tRak/SRsPGcEiAmCUsUBlioLVIrgo0/iSfEotHedmMvOLLWShZxb20aN5xbKMbsUPKe/uw1zJ0BX1ORDap9b/9CeUuNENr1eUFDmv1HugKiFWXXwbZj2uBglI0DX7yxouI4lY+FGOsbzMMZbP5WUewitVYnKkjsiskKp63+ED7VxrOdeZMenrSnDjmy0oCoAA/vlkZ0ZiwaT78NAqpxRldC722bYhGKtJ08me/6/8asE0WvC6UHDItQNE71PG2A5nRq4Po2yXA3sXyISYEbrgwiLimXDEbBZMYWdiFgve9aVkwcXz2nnivJVOAD9aTGlRFGEnKYVrijSDlvtVsqr6qcxcPRC/zVW1V/2GJsVxyQikUNZyaGulVrOFkOOpy9JzoxmnKACCxKsRXXY17pD3LDrF6NgVnQ37b+JE1gzw+M0zYSL5blnSzfyX67+SSfCVqrwnch9sfe9ToXnkP9crERf0aHxTDmGqwjznzbn9sqXbC+KGtsST+2lxqbNd1DF2IcnB8NfzJh/LIuQkqDmY6HiA1ZNrOSWfPl0FF5l2539yZNgRZjB83V858MwGWnboJ5whas3BnYbqo3BcvBnMy0Yb5EGfLvVYDdwlNQnL0fR4J6RiGNKQ9O8tY6i3cjV65rPRjnKCPYFTI0kVj22drG5JBD5UQE62HDxdff4QTI0aHa7ab92Cepms87+GI4lTnGCkALZUAq1QiDPlfdBz0Bho/gzbAaPqzBetCvrTmtXQ1TFDUdSIWx4obQ163FKvkuVbVPz6Gmn0w/4D/UOHKCGYB7B1sxrV9JPpsqVh7lsvaHHfHI1L0OsQrXMMhMKsaJ5pDz31wN3l+XG0JO2quVmIVqafaIEePecOxwDoZI/0PGGd9oWzz4nXJEQPBvS5ITuUx9/CP852AS0RRUjoaS0vFdXTgKjDVAmfTHWeH1qv3shy/LdtuLX/+nciLOIvtC/ligklYFP2smnag5KCtvgX0Qa5+LayajI/xIptTRi0wHHdW9GO1GNIzgndxR0x/07+XIdMI2VHYKLwK5m6iDNehpoi7dTESdKUdrFTfu7sw39MbS8yyJMrDVO/XniXGxMUaC8tqianiaXLbV53NHsJs/48MwPtZwgTmwkiyzB++bLPZU6YadnbU/x8/hTXLsMRMXQ11P0TGarNtfzCCkm3QHAv4zHpzJ7XPuRFV+xJeiJ0trw8nTMuBYIQFW+HbaHhTxZZSa+FdbTK4vzGE2wiDCV4ZYxEeZg9WjBc+PhRM0Fj/SdJ4ymuDwnm0lm0K1S+nqaWimMHFkwgT2CYa8UtufaeY7F3LVzZdfYaear/NRxAAA7eoLMUFlexBqPckZac+3w1lPTgHShMsIcxNjEKMpx5Y7imO/80QgymvszCxrtQl75zfRftFASz0XJzgnRMzi+VA5k2uPY0pDujSq1sNAW4ayH7wNiHVfUfjz+r3/R0AQjqzSwfJ1mz2UxegAAA)

**Step 7:** Visit your repository. You will be able to notice the logged issue right away under the Issues tab on the left.

![issues](https://www.testmuai.com/support/assets/images/bitbucket-issues-043d36a79cfb22d658a91f1e6066f338.webp)

**Step 8:** Click on the **"Issue title."** All the data you provided through TestMu AI would already be presented in it. TestMu AI automatically includes test environment details and related screenshots under your work in Bitbucket. You will also find a clickable link that will open the screenshot attachment.

![Integration demo](https://www.testmuai.com/support/assets/images/bitbucket-integrationdemo-f4c10eec85d371fd9b57969c23562ed1.webp)

## How To Remove Bitbucket Integration?[â](https://www.testmuai.com/support/docs/bitbucket-integration#how-to-remove-bitbucket-integration "Direct link to How To Remove Bitbucket Integration?")

* * *

You can work with one integration at a time. So if you would want to integrate to a similar 3rd party application, then you would have to **remove** your current integration. Here is how you can do that.

**Step 1:** Login to your TestMu AI account.

**Step 2:** Select âIntegrationâ from the left navigation menu bar. This will guide you to a screen where you will find 3rd party applications, available to integrate with your TestMu AI account.

**Step 3:** Click on âREMOVEâ. You can find the remove button right under the **âBitbucketâ** block which would be highlighted with a green tick.

![remove](https://www.testmuai.com/support/assets/images/bitbucket-remove-eaa9ea6f2affdb968d2a5ef97f7001c1.webp)

That was all you need to know for TestMu AI \+ Bitbucket Integration. Increase your productivity with our integrations. If you still have any questions for us, please feel free to let us know. Our experts are always available on **chat** to help you out with any roadblock regarding our product. Happy testing!

---

*Auto-generated from TestMu AI documentation.*