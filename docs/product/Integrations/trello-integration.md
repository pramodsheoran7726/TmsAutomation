# Trello Integration

> **Source**: [https://www.testmuai.com/support/docs/trello-integration](https://www.testmuai.com/support/docs/trello-integration)

**Product**: Integrations

**Last Crawled**: 2026-01-27T20:48:08.992276

---

On this page

* * *

> Trello â A project management tool that was acquired by Atlassian in 2017. It helps in project management under agile development. Providing a highly usable dashboard, where you can easily comprehend on who is working on what? Allowing a team to pinpoint the areas where they feel they are missing something out. Team can plan every sprint in an organized manner by creating and updating cards, lists & boards. Along with project management, Trello also aids in effective bug tracking by providing a space where all your bugs can be logged and prioritized according to your release bandwidth.

The TestMu AI Trello Integration allows you to create a card directly in Trello dashboard from TestMu AI platform. Push an issue to your respective project anytime, even in the middle of your test session. The fields populated by you when marking as bug through TestMu AI are displayed as information on the card in Trello dashboard for a testing instance.

**Trello Integration with TestMu AI, like all of our other integrations to 3rd party applications, is available for freemium as well as premium plan.**

## How To Integrate Trello With Your TestMu AI Account?[â](https://www.testmuai.com/support/docs/trello-integration#how-to-integrate-trello-with-your--account "Direct link to how-to-integrate-trello-with-your--account")

* * *

**Step 1:** Login to your TestMu AI account. You would need to have Admin or User level access to see and install integrations.

**Step 2:** Select **'Integration'** from the left navigation menu bar. This will guide you to a screen where you will find a list of 3rd party applications, available to integrate with your TestMu AI account.

**Step 3:** Click on **'Add'** under the block that says 'Trello'.

![trello-integration](https://www.testmuai.com/support/assets/images/trello-1-77b82b9456749a6afc2e724b7dde29a5.webp)

**Step 4:** Once you click on add, you'll redirected to the below screen if you are already logged into Trello. Click on the green button that says **'Allow'**.

![trello-integration](https://www.testmuai.com/support/assets/images/trello-2-e59131fcf4dac182d1c4ff9f0790f1d5.webp)

* * *

  * **Why do you require a login with Trello?**

The purpose of logging in is to bypass the authentication that is applied when two different applications interact using their respective APIs.

Trello API make use of token-based authentication for integrating with third-party applications. Once a user clicks on **'Allow'** to grant the third-party application to access user-owned resources from API, then that third-party application is provided a token for communicate with the same on behalf of the user.

Another way through which a client access can authorize is by using basic [OAuth 1.0](https://tools.ietf.org/html/rfc5849).

  * **What is Token-based authentication?**

Once the user allows a third-party application to fetch user owned resources from the server to which the third-party application was making requests, then a token gets generated. This token allows third-party application to exchange information with the server API on behalf of the user.

If you are logging into Trello for the first time, then you can generate a token for yourself with the help of API key & the URL:
    
    
    https://trello.com/1/authorize?expiration=1day&name=MyPersonalToken&scope=read&response_type=token&key={YourAPIKey}  
    

* * *

If you are not logged into Trello then you will be redirected to the below screen. Kindly login to your account via gmail or create your account by given option.

![trello-integration](https://www.testmuai.com/support/assets/images/trello-3-251fda3a552137ce6e293033a029883c.webp)

**Step 5:** That's it! Go to Integrations again and you will be able to notice a **green tick** indicating that Trello is successfully **installed**. You can now create cards in a fly from any of your running test session in Lambdatest to your Trello dashboard directly by a single click.

![trello-integration](https://www.testmuai.com/support/assets/images/trello-4-c2c107bdff826864f5940bf71ff67bf0.webp)

## How To Log Your First Bug Through Trello Integration?[â](https://www.testmuai.com/support/docs/trello-integration#how-to-log-your-first-bug-through-trello-integration "Direct link to How To Log Your First Bug Through Trello Integration?")

* * *

**Step 1:** Go for any of the test from the left navigation menu. For demo, we will be taking "**Real Time Testing** " option.

**Step 2:** Present a URL of the web-app you need to test in the dialog box. After that, select any configuration for browser and operating system of your choice & hit '**Start** '.

![trello-integration](https://www.testmuai.com/support/assets/images/trello-5-2b227b29fba48186ae601644c6d4a728.webp)

**Step 3:** After the VM is launched and operable. You can perform testing on your web-app for finding bugs. If a bug gets revealed, then you need to click on the **Bug icon** from the left panel for capturing a screenshot of the same. We have highlighted that option with yellow in the below image.

![trello-integration](https://www.testmuai.com/support/assets/images/trello-6-853b7b82732e4a4e709b8607f94dc508.webp)

**Step 4:** After a screenshot is captured, you can annotate any issue or a task with an **in-built image editor**. Once you are done highlighting the bug, click on the button that says **"Mark as Bug"**.

![trello-integration](https://www.testmuai.com/support/assets/images/trello-7-a4a87157e2488dccf5d773c4a6aba3a4.webp)

**Step 5:** After clicking on **"Mark as Bug"** button a form would open up. Fill the fields as per your requirement.

* * *

  * You can select which **board** should the card go under.
  * You can select the **list** for that particular card.
  * You can assign the bug to a colleague by populating the field **'Assignee'**.
  * You also get to post a **description** to help relate the cause of the issue or the card.

* * *

![trello-integration](https://www.testmuai.com/support/assets/images/trello-integration-8-c509e09eaac154a8c2ee5a9b7c456d95.webp)

**Step 6:** Click on **"Create Issue"** & observe it being successfully marked through a single click effort. Once you hit the button, you will get **prompt messages** on top of your Virtual Machine indicating the progress of bug logging. You will get a prompt message in few seconds mentioning "**Bug successfully marked** " indicating that the card has been generated in your dashboard.

![trello-integration](data:image/webp;base64,UklGRtIEAABXRUJQVlA4IMYEAAAwHwCdASpbAUsAPp1CnEkmIyKiLzLKwLATiWVu3VutaXt93E6aU8RvBuWzY371XUCkpsic0vx+6hPTBRSXLIV/Nc1neTeX2RtxkKOXMOMrL7if3JvJbYRH7l+TpBn9pP/czwO+KMx+/4Pn+5I/nZBkW38tRak/SRsPGcEiAmCUsUBlioLVIrgo0/iSfEotHedmMvOLLWShZxb20aN5xbKMbsUPKe/uw1zJ0BX1ORDap9b/9CeUuNENr1eUFDmv1HugKiFWXXwbZj2uBglI0DX7yxouI4lY+FGOsbzMMZbP5WUewitVYnKkjsiskKp63+ED7VxrOdeZMenrSnDjmy0oCoAA/vlkZ0ZiwaT78NAqpxRldC722bYhGKtJ08me/6/8asE0WvC6UHDItQNE71PG2A5nRq4Po2yXA3sXyISYEbrgwiLimXDEbBZMYWdiFgve9aVkwcXz2nnivJVOAD9aTGlRFGEnKYVrijSDlvtVsqr6qcxcPRC/zVW1V/2GJsVxyQikUNZyaGulVrOFkOOpy9JzoxmnKACCxKsRXXY17pD3LDrF6NgVnQ37b+JE1gzw+M0zYSL5blnSzfyX67+SSfCVqrwnch9sfe9ToXnkP9crERf0aHxTDmGqwjznzbn9sqXbC+KGtsST+2lxqbNd1DF2IcnB8NfzJh/LIuQkqDmY6HiA1ZNrOSWfPl0FF5l2539yZNgRZjB83V858MwGWnboJ5whas3BnYbqo3BcvBnMy0Yb5EGfLvVYDdwlNQnL0fR4J6RiGNKQ9O8tY6i3cjV65rPRjnKCPYFTI0kVj22drG5JBD5UQE62HDxdff4QTI0aHa7ab92Cepms87+GI4lTnGCkALZUAq1QiDPlfdBz0Bho/gzbAaPqzBetCvrTmtXQ1TFDUdSIWx4obQ163FKvkuVbVPz6Gmn0w/4D/UOHKCGYB7B1sxrV9JPpsqVh7lsvaHHfHI1L0OsQrXMMhMKsaJ5pDz31wN3l+XG0JO2quVmIVqafaIEePecOxwDoZI/0PGGd9oWzz4nXJEQPBvS5ITuUx9/CP852AS0RRUjoaS0vFdXTgKjDVAmfTHWeH1qv3shy/LdtuLX/+nciLOIvtC/ligklYFP2smnag5KCtvgX0Qa5+LayajI/xIptTRi0wHHdW9GO1GNIzgndxR0x/07+XIdMI2VHYKLwK5m6iDNehpoi7dTESdKUdrFTfu7sw39MbS8yyJMrDVO/XniXGxMUaC8tqianiaXLbV53NHsJs/48MwPtZwgTmwkiyzB++bLPZU6YadnbU/x8/hTXLsMRMXQ11P0TGarNtfzCCkm3QHAv4zHpzJ7XPuRFV+xJeiJ0trw8nTMuBYIQFW+HbaHhTxZZSa+FdbTK4vzGE2wiDCV4ZYxEeZg9WjBc+PhRM0Fj/SdJ4ymuDwnm0lm0K1S+nqaWimMHFkwgT2CYa8UtufaeY7F3LVzZdfYaear/NRxAAA7eoLMUFlexBqPckZac+3w1lPTgHShMsIcxNjEKMpx5Y7imO/80QgymvszCxrtQl75zfRftFASz0XJzgnRMzi+VA5k2uPY0pDujSq1sNAW4ayH7wNiHVfUfjz+r3/R0AQjqzSwfJ1mz2UxegAAA)

**Step 7:** Visit your dashboard. You will be able to notice the logged issue right away!

![trello-integration](https://www.testmuai.com/support/assets/images/trello-integration-10-4104f622a8466c51c4b6476fa52b676b.webp)

Click on the recent card and you will find all the data that you provided through Lambdatest already presented in it. TestMu AI automatically includes test environment details and related screenshots in the card as attachments.

![trello-integration](https://www.testmuai.com/support/assets/images/trello-integration-11-7cc137280c572df4cc4534a0277a2f03.webp)

## How To Remove Trello Integration?[â](https://www.testmuai.com/support/docs/trello-integration#how-to-remove-trello-integration "Direct link to How To Remove Trello Integration?")

* * *

> You can work with one integration at a time. So if you would want to integrate to a similar 3rd party application, then you would have to **remove** your current integration. Here is how you can do that.

**Step 1:** Login to your TestMu AI account.

**Step 2:** Select 'Settings' from the left navigation menu bar & click on 'Integrations'. This will guide you to a screen where you will find 3rd party applications, available to integrate with your TestMu AI account.

**Step 3:** Click on **'REMOVE'**. You can find the remove button right under the **'Trello'** block which would be highlighted with a green tick.

![trello-integration](https://www.testmuai.com/support/assets/images/trello-8-85ecf49c922081468a260957d4c17710.webp)

That was all you need to know for TestMu AI \+ Trello Integration. Increase your productivity with our integrations. If you still have any questions for us, please feel free to let us know. Our experts are always **available on chat** to help you out with any roadblock regarding our product. Happy testing!

---

*Auto-generated from TestMu AI documentation.*