# KaneAI - API Testing

> **Source**: [https://www.testmuai.com/support/docs/kane-ai-api-testing](https://www.testmuai.com/support/docs/kane-ai-api-testing)

**Product**: KaneAI

**Last Crawled**: 2026-01-27T20:47:20.775999

---

On this page

This document provides a detailed guide to performing API testing using KaneAI. The API testing feature allows for comprehensive backend testing, complementing existing UI testing capabilities. Follow the instructions below to execute API tests using the PetStore API as an example.

## 1\. Adding an API in a Web Test[â](https://www.testmuai.com/support/docs/kane-ai-api-testing#1-adding-an-api-in-a-web-test "Direct link to 1. Adding an API in a Web Test")

To start API testing on KaneAI, create a web test using the PetStore API, a commonly available sample. This will allow you to demonstrate API testing capabilities effectively.

  * **Step** : Add an API through the slash command and navigate to the API module.

![kenai-jira integration](https://www.testmuai.com/support/assets/images/image1-eaf3281b442d9f3e3c37df0aee7dab32.jpg)

## 2\. Adding a Curl Command[â](https://www.testmuai.com/support/docs/kane-ai-api-testing#2-adding-a-curl-command "Direct link to 2. Adding a Curl Command")

Within the API module, you can input the curl command to configure the API settings automatically.

  * **Step** : Paste your curl command into the designated area. KaneAI will populate all necessary details. You may choose to validate the API response or add it directly to the test steps.

![kenai-jira integration](https://www.testmuai.com/support/assets/images/image2-83c99409d7cad5497eb20636dbb9143f.jpg)

## 3\. Validating API Response on KaneAI[â](https://www.testmuai.com/support/docs/kane-ai-api-testing#3-validating-api-response-on-kaneai "Direct link to 3. Validating API Response on KaneAI")

To ensure the API works as expected, use the validation feature. This step confirms that the API responds correctly and can be added to test steps.

  * **Step** : Click the 'validate' option to check the API response. A 200 response status indicates successful validation, automatically adding the API to your test steps. You can now proceed to submit multiple APIs simultaneously if needed.

![kenai-jira integration](https://www.testmuai.com/support/assets/images/image3-63d59b82a7c65b2989371efea25429b1.jpg)

## 4\. Adding Non-Success APIs in Test Steps[â](https://www.testmuai.com/support/docs/kane-ai-api-testing#4-adding-non-success-apis-in-test-steps "Direct link to 4. Adding Non-Success APIs in Test Steps")

For APIs that do not return a 200 status, you can review the response body and manually add them to the test steps as required.

  * **Step** : If the API returns a 400 Bad Request or another error, it will not be added automatically. Review the response and add the API manually if needed.

![kenai-jira integration](https://www.testmuai.com/support/assets/images/image8-073d63f7cb9f7c81c8f15dedda788d10.jpg)

## 5\. Adding Multiple APIs in One Go[â](https://www.testmuai.com/support/docs/kane-ai-api-testing#5-adding-multiple-apis-in-one-go "Direct link to 5. Adding Multiple APIs in One Go")

KaneAI allows batch processing of multiple APIs to streamline testing. This feature is helpful for scenarios requiring the execution of several API calls in succession.

  * **Step** : Add multiple APIs by clicking the plus icon and selecting each API, or paste multiple curl commands to add them automatically to the test steps.

![kenai-jira integration](https://www.testmuai.com/support/assets/images/image10-a67fc715eafe3d7bc2ab41fbe06d3d59.jpg)

## 6\. Handling Different HTTP Methods[â](https://www.testmuai.com/support/docs/kane-ai-api-testing#6-handling-different-http-methods "Direct link to 6. Handling Different HTTP Methods")

KaneAI supports various HTTP methods like POST, PUT, GET, and DELETE, allowing you to test diverse API interactions.

  * **Step** : Add APIs using different HTTP methods, such as a PUT or DELETE command. Validate each API as before, and if successful, they will be automatically included in the test steps.

![kenai-jira integration](https://www.testmuai.com/support/assets/images/image6-588554dd469ee490a36fe5fd587d9be5.jpg) ![kenai-jira integration](https://www.testmuai.com/support/assets/images/image9-db1a5e63d769f0f088279d52ee006b30.jpg)

## 7\. Executing and Reviewing Test Steps[â](https://www.testmuai.com/support/docs/kane-ai-api-testing#7-executing-and-reviewing-test-steps "Direct link to 7. Executing and Reviewing Test Steps")

Once all APIs are added, KaneAI enables simultaneous execution, with details available on methods used, response statuses, and execution times.

  * **Step** : Click to execute all added APIs in one go and review the response details for insights into API performance and data returned.

![kenai-jira integration](https://www.testmuai.com/support/assets/images/image13-269e2887624d2beac8c128591088b6c2.jpg)

This structure provides logical groupings for different aspects of API testing with KaneAI, making it easier to follow each type of action required for comprehensive API testing.

---

*Auto-generated from TestMu AI documentation.*