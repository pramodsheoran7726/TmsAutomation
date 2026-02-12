# Mantis Integration

> **Source**: [https://www.testmuai.com/support/docs/mantis-integration](https://www.testmuai.com/support/docs/mantis-integration)

**Product**: Integrations

**Last Crawled**: 2026-01-27T20:48:55.991181

---

On this page

Mantis is a free and an open source bug tracker. Mantis supports multiple OS such as Windows, Linux, and macOS, from the server side. Along with platform compatibility, It also offers cross browser compatibility on Google Chrome, Mozilla Firefox, Opera, Safari and IE10+. Mantis is highly customizable, you can customize your issue fields, workflows and notifications. You can also declare access as per role based in your organization. All these features along with email notifications to keep you updated on everything regarding the project makes Mantis a great choice as a project management tool.

TestMu AI integration with Mantis helps you in filing issues to your project in Mantis directly from TestMu AI platform. With one-click integration you can push annotated issues to the project of your choice, assign it to the required team mate, and attach necessary screenshots. You can do all that while in the middle of a test session in TestMu AI platform. The fields populated by you when marking as bug through TestMu AI are displayed as information on the Mantis for a testing instance.

> Mantis Integration with TestMu AI, like all of the integrations to 3rd party applications, is available for freemium as well as premium plan.

## How To Establish Integration With Mantis From Your TestMu AI Account?[â](https://www.testmuai.com/support/docs/mantis-integration#how-to-establish-integration-with-mantis-from-your--account "Direct link to how-to-establish-integration-with-mantis-from-your--account")

* * *

**Step 1:** Login to your TestMu AI account. You would need to have Admin or User level access to see and install integrations.

**Step 2:** Select âIntegrationsâ from the left navigation menu bar. This will guide you to a screen where you will find a list of 3rd party applications, available to integrate with your TestMu AI account.

**Step 3:** Click on âADDâ under the block that says âMantisâ.

![mantis Integration](https://www.testmuai.com/support/assets/images/mantis-integration-1-3ef43b3f5d2719dc916b3671edb347d1.webp)

**Step 4:** Once you click on install, you will be redirected to the below screen. You will be asked to provide your Mantis API Token & Mantis Site Address in the highlighted fields to establish TestMu AI Integration with Mantis.

![Mantis integration API](https://www.testmuai.com/support/assets/images/mantis-integration-7-1949c1c61e1ba7bc3b62a7936ca8d378.webp)

> **What is an API token?** When two different applications interact with each other, a server-to-server communication is established. API token is needed for authenticating user identity from one server to another, by fetching user-owned resources available on the server from where the communication is initiated. API token has been a necessity for maintaining security and data integrity of any application. They are just as vital to an end user as they are to an application. API tokens are relevant if an end user logs in an application through a 2-step verification process.

> **What is Mantis Site Address?** Your "Mantis Site Address" would be the URL for the instance of your project on Mantishub. The part highlighted with blue in the below image will be your Mantis Site Address.

![mantis integration](https://www.testmuai.com/support/assets/images/mantis-integration-3-3e5ca9c0d888031d2c575cc4c90a7024.webp)

**Step 5:** To find the API token, login to your MantisHub account. Go to the âadministratorâ drop-down on the top-right corner and click on "My Account".

![create api mantis](https://www.testmuai.com/support/assets/images/mantis-integration-5-094fc85b5f95ce72fe75f792de05fc56.webp)

**Step 6:** As you click on "My Account", you will find a tab for "API Tokens". Enter a value in the provided field. It could be any value you like and then click on the button that says "Create API Token".

![Mantis integration Token](https://www.testmuai.com/support/assets/images/mantis-integration-6-094fc85b5f95ce72fe75f792de05fc56.webp)

**Step 7:** As you click on "Create API Token", an API token would be generated. Keep the API token stored with you safely as you wonât be able to see it again.

![mantis integration api](https://www.testmuai.com/support/assets/images/mantis-integration-8-e6d0319b758cd44033ac000f3db08ec3.webp)

> Note: These API tokens should be treated as safely as you treat your own passwords, as they are responsible for successful authentication between one application to another. However, in case your API token gets misplaced or is shared with someone whom you donât trust, then you can always revoke access through that API token through your MantisHub instance. You can also generate multiple API tokens.

![mantis integration account](https://www.testmuai.com/support/assets/images/mantis-integration-4-2-d4a0ba593b22bb385a9549ffa2489414.webp)

Paste this API token into the field provided at TestMu AI & hit the âNextâ button. You are all set to experience one-click bug logging to share your issues directly from your TestMu AI account to your project on Mantis.

![Mantis integration install](https://www.testmuai.com/support/assets/images/mantis-integration-9-1949c1c61e1ba7bc3b62a7936ca8d378.webp)

Thatâs it! Go to Integrations again and you will be able to notice a green tick indicating that Mantis is successfully installed.

![mantis intgertaion](https://www.testmuai.com/support/assets/images/mantis-integration-10-1aaac71fbbdb402c060ed7aef2023552.webp)

## How To Log Your First Bug Through Mantis Integration?[â](https://www.testmuai.com/support/docs/mantis-integration#how-to-log-your-first-bug-through-mantis-integration "Direct link to How To Log Your First Bug Through Mantis Integration?")

* * *

**Step 1:** Go for any of the test from the left navigation menu. For demo, we will be taking "Real Time Test" option.

**Step 2:** Present a URL of the web-app you need to test in the dialog box. After that, select any configuration for browser and operating system of your choice & hit âStartâ.

![real time testing](https://www.testmuai.com/support/assets/images/mantis-integration-11-696e5b9aeb2ea77fa94830cf744366d8.webp)

**Step 3:** After the VM is launched and operable. You can find bugs on you website by performing live, interactive testing. If a bug gets revealed, then you need to click on the bug icon from the left panel for capturing a screenshot of the same. We have highlighted that controller button in the below image.

![bug icon](https://www.testmuai.com/support/assets/images/mantis-integration-12-4e3ac77e43f99412626c61e2bfca1d25.webp)

**Step 4:** After a screenshot is captured, you can annotate any issue or a task with an in-built image editor. Once you are done highlighting the bug, click on the button that says "Mark as Bug".

![mark as bug](https://www.testmuai.com/support/assets/images/mark-as-bug-d28ee5ccb13fd23fedb9a422d9b8abfe.webp)

**Step 5:** As you click on "Mark as Bug" button, a Mantis specific form would open up. Fill the fields as per your requirement.

* * *

  * You can select which project should the ticket go under.
  * You can set the category for your UI observation.
  * You can also select a value to signify the reproducibility.
  * You can set the severity as well as the priority of the bug.
  * You can mention the summary as well for better visibility on dashboard.
  * You also get to post a description to help relate the cause of the issue or the task.
  * If you have got a lot to convey then you can do so by populating the "Additional Information".

* * *

![mantis integration](https://www.testmuai.com/support/assets/images/mantis-integration-13-fd362420832f26305e36f04072693ff3.webp)

**Step 6:** Click on "Create Bug" & observe it being successfully marked through a single click effort. Once you hit the button, you will get prompt messages on top of your Virtual Machine indicating the progress of bug logging. You will get a prompt message in few seconds mentioning "Bug successfully marked" indicating that the issue has been successfully pushed to the respective workspace.

![mantis integration](data:image/webp;base64,UklGRtIEAABXRUJQVlA4IMYEAAAwHwCdASpbAUsAPp1CnEkmIyKiLzLKwLATiWVu3VutaXt93E6aU8RvBuWzY371XUCkpsic0vx+6hPTBRSXLIV/Nc1neTeX2RtxkKOXMOMrL7if3JvJbYRH7l+TpBn9pP/czwO+KMx+/4Pn+5I/nZBkW38tRak/SRsPGcEiAmCUsUBlioLVIrgo0/iSfEotHedmMvOLLWShZxb20aN5xbKMbsUPKe/uw1zJ0BX1ORDap9b/9CeUuNENr1eUFDmv1HugKiFWXXwbZj2uBglI0DX7yxouI4lY+FGOsbzMMZbP5WUewitVYnKkjsiskKp63+ED7VxrOdeZMenrSnDjmy0oCoAA/vlkZ0ZiwaT78NAqpxRldC722bYhGKtJ08me/6/8asE0WvC6UHDItQNE71PG2A5nRq4Po2yXA3sXyISYEbrgwiLimXDEbBZMYWdiFgve9aVkwcXz2nnivJVOAD9aTGlRFGEnKYVrijSDlvtVsqr6qcxcPRC/zVW1V/2GJsVxyQikUNZyaGulVrOFkOOpy9JzoxmnKACCxKsRXXY17pD3LDrF6NgVnQ37b+JE1gzw+M0zYSL5blnSzfyX67+SSfCVqrwnch9sfe9ToXnkP9crERf0aHxTDmGqwjznzbn9sqXbC+KGtsST+2lxqbNd1DF2IcnB8NfzJh/LIuQkqDmY6HiA1ZNrOSWfPl0FF5l2539yZNgRZjB83V858MwGWnboJ5whas3BnYbqo3BcvBnMy0Yb5EGfLvVYDdwlNQnL0fR4J6RiGNKQ9O8tY6i3cjV65rPRjnKCPYFTI0kVj22drG5JBD5UQE62HDxdff4QTI0aHa7ab92Cepms87+GI4lTnGCkALZUAq1QiDPlfdBz0Bho/gzbAaPqzBetCvrTmtXQ1TFDUdSIWx4obQ163FKvkuVbVPz6Gmn0w/4D/UOHKCGYB7B1sxrV9JPpsqVh7lsvaHHfHI1L0OsQrXMMhMKsaJ5pDz31wN3l+XG0JO2quVmIVqafaIEePecOxwDoZI/0PGGd9oWzz4nXJEQPBvS5ITuUx9/CP852AS0RRUjoaS0vFdXTgKjDVAmfTHWeH1qv3shy/LdtuLX/+nciLOIvtC/ligklYFP2smnag5KCtvgX0Qa5+LayajI/xIptTRi0wHHdW9GO1GNIzgndxR0x/07+XIdMI2VHYKLwK5m6iDNehpoi7dTESdKUdrFTfu7sw39MbS8yyJMrDVO/XniXGxMUaC8tqianiaXLbV53NHsJs/48MwPtZwgTmwkiyzB++bLPZU6YadnbU/x8/hTXLsMRMXQ11P0TGarNtfzCCkm3QHAv4zHpzJ7XPuRFV+xJeiJ0trw8nTMuBYIQFW+HbaHhTxZZSa+FdbTK4vzGE2wiDCV4ZYxEeZg9WjBc+PhRM0Fj/SdJ4ymuDwnm0lm0K1S+nqaWimMHFkwgT2CYa8UtufaeY7F3LVzZdfYaear/NRxAAA7eoLMUFlexBqPckZac+3w1lPTgHShMsIcxNjEKMpx5Y7imO/80QgymvszCxrtQl75zfRftFASz0XJzgnRMzi+VA5k2uPY0pDujSq1sNAW4ayH7wNiHVfUfjz+r3/R0AQjqzSwfJ1mz2UxegAAA)

**Step 7:** Visit your Mantis dashboard view. You will be able to notice the logged issue right away!

![mantis integration issue](https://www.testmuai.com/support/assets/images/mantis-integration-14-094fc85b5f95ce72fe75f792de05fc56.webp)

**Step 8:** As you click on the task you will notice all the data you provided in TestMu AI already presented in the task under task details. TestMu AI automatically includes test environment details and related screenshots in the ticket as attachments.

![mantis integration issue](https://www.testmuai.com/support/assets/images/mantis-integration-15-f0a02f05db09f4336be67675e23a263d.webp)

## How To Uninstall Mantis Integration?[â](https://www.testmuai.com/support/docs/mantis-integration#how-to-uninstall-mantis-integration "Direct link to How To Uninstall Mantis Integration?")

* * *

> You can work with one integration at a time. So if you would want to integrate to a similar 3rd party application, then you would have to `uninstall` your current integration. Here is how you can do that.

**Step 1:** Login to your TestMu AI account.

**Step 2:** Select âIntegrationsâ from the left navigation menu bar. This will guide you to a screen where you will find 3rd party applications, available to integrate with your TestMu AI account.

**Step 3:** Click on âREMOVEâ. You can find the remove button right under the âMantisâ block which would be highlighted with a green tick.

![mantis integration remove](https://www.testmuai.com/support/assets/images/mantis-integration-16-f5afecfec9882e39771a08eefe57a696.webp)

> That was all you need to know for TestMu AI \+ Mantis Integration. Increase your productivity with our integrations. If you still have any questions for us, please feel free to let us know. Our experts are always available on **chat** to help you out with any roadblock regarding our product. Happy testing!

---

*Auto-generated from TestMu AI documentation.*