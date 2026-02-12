# GitLab Integration

> **Source**: [https://www.testmuai.com/support/docs/gitlab-integration](https://www.testmuai.com/support/docs/gitlab-integration)

**Product**: Integrations

**Last Crawled**: 2026-01-27T20:48:32.454972

---

On this page

* * *

> GitLab is a web-based Git-repository manager with the purpose of facilitating entire DevOps lifecycle. It helps in the collaboration of different teams working on a project. Ensuring Development, QA, Security, Operations and Product team to sync simultaneously on the same project. GitLab helps in bringing your product a lot faster in the market by reducing the time taken to complete a release cycle in a very significant manner.

The TestMu AI GitLab Integration allows you to create a card directly in your repository from TestMu AI platform. Push an issue to your respective repository anytime, even in the middle of your test session. The fields populated by you when marking as a bug through TestMu AI are displayed as information on the bug in GitLab repository for that testing instance.

**GitLab Integration with TestMu AI, like all of our other integrations to 3rd party applications, is available for freemium as well as premium plan.**

## How To Integrate GitLab With Your TestMu AI Account?[â](https://www.testmuai.com/support/docs/gitlab-integration#how-to-integrate-gitlab-with-your--account "Direct link to how-to-integrate-gitlab-with-your--account")

* * *

**Step 1:** Login to your TestMu AI account. You would need to have Admin or User level access to see and install integrations.

**Step 2:** Select **âIntegrationsâ** from the left navigation menu bar. This will guide you to a screen where you will find a list of 3rd party applications, available to integrate with your TestMu AI account.

**Step 3:** Here under the âProject Managementâ Section, youâll find GitLab. Click on Gitlab block.

![project management](https://www.testmuai.com/support/assets/images/Gitlab-Integrations-Project-Management-26590b3e342d99cbb41d323487374df7.webp)

**Step 4:** Once you click on install, youâll be redirected to a screen. There would 2 options available for you to choose in order to **authenticate GitLab.**

### 1\. Via OAuth[â](https://www.testmuai.com/support/docs/gitlab-integration#1-via-oauth "Direct link to 1. Via OAuth")

* * *

  1. Select the radio button on **âVia OAuthâ** and hit **âNextâ.**

![authenticate](https://www.testmuai.com/support/assets/images/authenticate-oauth-8fe0822810a9939d4c8adcaf9759aa8c.webp)

  2. You will be redirected to GitLab login page where you will be asked to provide your login credentials.

![login](https://www.testmuai.com/support/assets/images/gitlab-login-31b1a4fd58620a8d2bbc985aafb38bf7.webp)

  3. If you are new to GitLab and want to sign up then you can do so with your GitHub account as well. Once you click on the **âGitHubâ** button you will be redirected to an authorization page. There you will authorize GitLab APIs to fetch your user owned resources from GitHub APIs.

![gitlab api](https://www.testmuai.com/support/assets/images/gitlab-integration-42facfd9c68db962940a27ef809ba171.webp)

  4. After you login, you will have to authorize TestMu AI to use your account. Click on the green button that says **âAuthorizeâ.**

![authorize](https://www.testmuai.com/support/assets/images/gitlab-authorize-c4330b7be82c4f23c3e30b88beafc07d.webp)

* * *

  * **Why do you need to login?**

The purpose of logging in is to bypass the authentication that is applied when two different applications interact using their respective APIs. GitLab APIs uses OAuth 2.0âs [authorization code grant flow](https://tools.ietf.org/html/rfc6749#section-4.1) for generating access tokens on userâs behalf.

  * **What is an Access token?**

Access tokens are strings with authorization key required to access an API. They are issued to the client server and are usually opaque. They are used for requesting access to protected, user-specific resources. Access tokens are vital from a security point of view & can be generated in different formats, depending upon security requirements specified on the resource server.

* * *

Thatâs it! Go to Integrations again and you will be able to notice a **green tick** indicating that GitLab is successfully **installed**. You can now experience bug logging in a fly from any of your running test session in TestMu AI to your repository directly by a single click.

**Note:** Make sure you already have a project in your Gitlab account before you integrate to avoid any issues

### 2\. Using Personal Access Token[â](https://www.testmuai.com/support/docs/gitlab-integration#2-using-personal-access-token "Direct link to 2. Using Personal Access Token")

* * *

  1. Select the radio button on **âCloudâ** and click **âInstallâ**. Here youâll need to enter your Gitlab API token to validate integration with TestMu AI.

![project management api](https://www.testmuai.com/support/assets/images/Gitlab-Integrations-Project-Management-APIs-adb51777c257cb21af457bcddbf18fb5.webp)

  2. Login to your Gitlab account. Go to the profile icon on the top-right corner and click on âSettingsâ.

![setting](https://www.testmuai.com/support/assets/images/gitlab-setting-65f530dd7f7e39a69210de8c218dd361.webp)

  3. Click the âAccess Tokensâ from the menu on the left.

![access token](https://www.testmuai.com/support/assets/images/gitlab-accesstoken-95f270910aa071de7585110f7d657e9f.webp)

  4. **"Add a personal access token"** by providing a name for the application. Keep the name that is easy for you to remember as you access token will be derived from it. You can also set an expiry date for that token. Also, select the checkboxes for **âapiâ, âread_userâ & read_repository** as scopes. These scopes will define the access to authenticate API over Basic OAuth for their respective personal token. After selecting the scopes hit the green button to **"Create personal access token".**

![personal access token](https://www.testmuai.com/support/assets/images/personal-accesstoken-310238bb9d74c59dda3ecee5f7643491.webp)

* * *

  * **What is a Personal Access Token?**

In scenarios where OAuth is excessively utilized, Personal Access Tokens comes to aid in accessing the API. While generating a token, make sure you provide a description that is easy to remember, as your Personal Access Token will be derived from it. Treat this token just as you would treat your own password! Access tokens are strings with authorization key required to access an API. They are issued to the client server and are usually opaque. They are used for requesting access to protected, user-specific resources. Access tokens are vital from a security point of view & can be generated in different formats, depending upon security requirements specified on the resource server.

* * *

After you click on **"Create personal access token",** you will get a prompt message saying **"Your new personal access token has been created".** You will find it under the highlighted field.

![create token](https://www.testmuai.com/support/assets/images/Gitlab-Integrations-Project-Management-enter-ad7aea22803409422467a2a57d2f66eb.webp)

Your **API token** is now ready. Copy the token & store it safely with you, as you will not be able to find it again. Paste the copied token into TestMu AI GitLab Authentication.

![api token](https://www.testmuai.com/support/assets/images/gitlab-apitoken-c86741603f5881cb6f1b690beb91f558.webp)

Thatâs it! Go to Integrations again and you will be able to notice a **green tick** indicating that GitLab is successfully installed. You can now experience bug logging in a fly from any of your running test session in Lambdatest to your repository directly by a single click.

![integration complete](https://www.testmuai.com/support/assets/images/gitlab-integrationcomplete-2b5e9465c362611c24ec446ed9fffe55.webp)

## Logging Your First Bug Through GitLab Integration?[â](https://www.testmuai.com/support/docs/gitlab-integration#logging-your-first-bug-through-gitlab-integration "Direct link to Logging Your First Bug Through GitLab Integration?")

* * *

* * *

**NOTE:** You need to have a project created on Gitlab before you perform one click bug logging through TestMu AI. If a project is not created then you will face the below error message when logging a bug.

![error message](data:image/webp;base64,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)

* * *

**Step 1:** Go for any of the test from the left navigation menu. For demo, we will be taking **"Real Time Test"** option.

**Step 2:** Present a URL of the web-app you need to test in the dialog box. After that, select any configuration for browser and operating system of your choice & click **âStartâ.**

![realtime test](https://www.testmuai.com/support/assets/images/realtime-test-5912c62da542d09fa705e49b5ce1c951.webp)

**Step 3:** After the VM is launched and operable. You can perform testing on your web-app for finding bugs. If a bug gets revealed, then you need to click on the **Mark as Bug** from the left panel for [capturing a screenshot](https://www.lambdatest.com/full-page-screen-capture) of the same. We have highlighted that option with yellow in the below image.

![mark as bug](https://www.testmuai.com/support/assets/images/mark-bug-6e1cb18cdcaf751df8ae92a81975b12e.webp)

**Step 4:** After a screenshot is captured, you can annotate any issue or a task with an in-built image editor. Once you are done highlighting the bug, click on the button that says **"Mark as Bug".**

![image editor](https://www.testmuai.com/support/assets/images/image-editor-f9ef9e6d7cf4200e4e0bfbd4be242cec.webp)

**Step 5:** After clicking on **"Mark as Bug"** button a GitLab specific form would open up. Fill the fields as per your requirement.

  * You can select which **Projects** should the observation be marked under.
  * You can select a relevant **Label** for the same UI observation.
  * You can give a title to the bug through the field **Title.**
  * You also get to post a **Description** to help relate the cause of the issue or the card.

![form](data:image/webp;base64,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)

**Step 6:** Click on **"Create Bug"** & observe it being successfully marked through a single click effort. Once you hit the button, you will get **prompt messages** on top of your Virtual Machine indicating the progress of bug logging. You will get a prompt message in few seconds mentioning **"Bug marked successfully"** indicating that the bug has been pushed to the desired GitLab repository.

![create a bug](data:image/webp;base64,UklGRj4WAABXRUJQVlA4IDIWAAAwngCdASo8BaIAPp1Gn00oKaUlIrA6gLATiWdu4W9iUrQ2ld3LmBj2W3fSrt7OdX9JG9jegB0z2RH+lf9N6svIj8r4l9iqXQ4Mal/a/nt7O/lrqBey/A/2mdsfQIs6Poj1S+xvsAeU//T8Qn7n/zfYJ/oP+V9ELP09eewb0qh80p89lPhGRyzgG0jYihmBggkIBCYy+9Fj32uDI4dEZXeSsgjNLhm3U+0+YNup9p8wbdT7T5g26n2ny//AXB3XjRMasw7ppuJWlO7a+3dQcStKg4laVBxK0qDhY0OhJxhF51dQplK/hQ2pD7RhOOu/WbmuThbTnkTerLdQ+c013MdvMOxf57tWv892rX+e7Vr/Pdq1/nu1a/z3atf57tWv88c1uLTh+31aowRKlNKZswpIL0CGR5AtPz3T1hMkoGhOla1Y4a3nPuKxjpwWnArk9sYqPA7FvMzihYQ3TZ6Yd/YHRk2Y+te5ji/ZTdJDEr8EJ6u9I1/xNS7MxSoVwkxRFhf/VuS5brD7L2L0WnzBt1PtPmDbqfafMG3U+0+WBlw0SwBDh6iqpoBFCuCUswcF1ex5+9tgN9BDv+CiGAlPB3mqU1IWzZAJacHjcOD3/JcO7yxmijQ+I7cjhTuj4a0psOYP6DABw1P84KtRUsQffrh0voF3dG8Gq0RgIGhviAA7koIEcjiFpzyjvkBOCRJfJLFRlcrKYk0Jpv+G3U+0+YNup9p8wbdTQPPHyJZGp+G8/rN+r5GpHvUlQF0ZllJAL1IXOgW5Fw0BQzjzCNBGAFJmO5BInIUr6fJPATqI+X1EA3l2BWQ7BO0OHPP7HJXGZiDpxLKEgpB7+FZqGVjgoE/vexqqEXDQF0ZllJMyIN9d7Gqk2TBOmD1dGF6S+Xnxnhagfrrec7o9Rzd9d7GqoRcM7FM3zhHfWgGcKnMQb6685UMsxUPC4vqfkxo/hfACgmazooBXwMbYpch+GzaQQsbGkPPTTdZ+QWpeBUGGeQIiOKXhsgclOMQB/fmXVoJaez1fDbqfafMG3U+0+YO33wH2Uw26n2ve/ht1PtW0d35Wyz1qRuJlhRSoDTX0IB3vqnR3ny8LdFj1NSlL8n6WUiJd6nxUfbVE9+YNup8kjYVmTGIWCq1Vs+CVG3QFS6Vs+CVGi+GLaYNhpRTn06y6W9GJe/qfdKgS/cYz2iL9p8wbdT7T5gTl6n2m7nSGv3Gkf1lgcwPNM3UXNYIF0D8FtMINQN446mG3U+0+YNuiopDjqYbdWt0ugSCVUw26n2nzBt0V+C2mCethkvArlQR1M1FWbI52ibqdOJ2F+W85oHCqAKDS+WBsFW6RS0OJA7Jr0WnzBpvBPtPmDbqfafMApcNA3yqNSHHUwgkjBruJpVzaqowORPYofL/esuy4P6jwaThOmjqjdkVWRuT9aFZeO0bld/Fgv8BIjgEMSidRqxrE6LT5cYb4t1nfWw8cljob4bdT2wdPY0lDEWfZRSRcdlomH0Ns/pW7y1widNHymCg7mrTU6HIOhrbOu/vulIcdTJnkQsi+ET6g4fkY46FiIHmtdQPdJGB1cN++02eUN/aujl0hs8QWtpciLOAIcVNq5O0+YNup9p8wbdT7T2XX7ohKw1mLuk/VWtix3PzN74oXIY1ZVq2fCWhiLs6Yp3l+sHwOjbTo8/APgHgRzLeV2S/HxZpMWPG1fDbngAD+/gRHq8osou7HKEpWpiQIV0N5Xua99jMSV7sVOOyItuQL6dzqSUHNbW1HSLXRxEK6MUxRygeEDyQgHT8zLAeF9HZOI5rqX67ybK8IMvq0o5dH7IJ2Bm9sSSWhKb6OEOlgfGLeaZPeQj/hfk6z8uC08gCw5mNL9G5+BkN5A5NH7E/FTiwuTpS+eO6zFcMI9rm95IdT7zR9JNK9Ueafc6NbRfvhtXw075zFlpVjA/Fs+bSqEAABUJGNLTWfEkinJvEn1GeG/D7xYctb5s/+Bs/9//P/P/NtPO+4MZl7qYpRe/N6N6/bSoB83Wt1fqafy/5teC38HeXrXEqUf11NmVTAASXCi0yW7zcKnvadY32p2lwLChsutLruazW7br9bVeRmZFCzHYlz19Dhu7PsmnSCwzwq66s59pOUxu/P8+tpdgN7urby5MUeHKDebWv9zev8ncY2neuSxGg7Hf6kR5+XYIFvQdgd2xdY+QXM1eXrCYKOt695gr713c6NpsPvTsV9wXUHqYlODU5tkoA0FaiSvx0mlMO3J/la/zoAijWrvYAJfM5LVAQqIqezGWAAAhsNT2nr3gtzfnZxvYYf1rJH+BIF0GNUixq/qdxFhkBvdruVu1GtJP/wbSVrSg//K5RxHOBZY+1yo87gLbJcVpEML8s6NV9XTcMUMTMqYlDhe5fbvn01WBQoo+34ZkkTrjAGkwhfTiSRduxtAs0OGeRDclICl5P6vLgJZaOSChIL8YbzTTvBJI7Ef4DisHteQU4ZkE7VS1WSZR4LKA6GQg0tIctQ+/d/fh1odZACuSnvoYxQvvocYGHHgdo3AzjMuWcW+Jzq+XEODmscQ8fNrqaN9jBddQP+z0qe7Oxivl0jmdeiAg2bPzFszyX2WCeBYQQ0NktBSR7LN8rr49RXvVFNOh9t6XBcMYEuZHiqn+BT5HVp1U6CzSFWGT7g06SOEwvEp8k3wrxrVOP0TJqHYt2qr69/WkgnlmkwQb4yxMrFARIkR9WQC64J89hwo5le/UZhLXOWhwgcd4S2ot1P45QsIouu6oe/zl2Bn8K87DTZM0rT593b/X8b6p/NbE2/uWyMtVnOdrPLvM62Kt8jd915LsatI2Q/Qh2V0dSVk4RWVogXWNLiStUxHwiDKuHpJrrRGltKW1IPb4ieczLElrFre16JNF/4TWjuJtsqciEVAngR5i8nGgiK0tbHyvTmYIyVun5EBSu0n4JdHuk5Od+h2ZeY5h4Wtcjiici0hTnniOJ7Vd7Vgr6uYLiJ5NU+arf1wcJnCXZlc/8Qgf960MDC6PM99CkUSW3VexqF7dGNpelIyXthEOxSnFvG3BApXwxMCcJwSlvhlwC2MZMrOVzbqrin1+uymYxxKS+fEQNaNqfgyyfNN3LnEAACHBB9Dz1Du8weOzkJOP83b1lzJpainVXmEcLofB9CchP/+b9Ho0w4Qzu/XD16BRDAVzA+cy71pCbxERz9KiNXqDcdlLtSdKEKatqMXM7nKbr3boqsaq40UwzuKHKCHeRcUOU8bnVvsbY+Dt4E8F5DLfK7Jx98S1+ySw9hTlZUyGfGgLjpiOX09bGlOuGU9FQH6kzH30UR181rKg9IsvtmU3ZcnSqlKlvyIcV4IFjFLg4fEAc7Wm5R2Ku+YoBWCU9uyz6Y9//3VXZZAp7d2zctglpELctMo7tPKUElq2FjQzV9OYp+avVPkXcSwMTXnC8oZkekDaQMx4wtgXmyNaQ24GdZPamcrLS2/6zJrsZ7OKpEsN3xm5dY5CtjiaGg2kJN39rPkhcDxpnUGZXXaAlz9qHyWhp0DoDcEkNovQCV5XxspxhjCrAWyNgk+1qw/qjyevA6mpTn5ssZkC/jBZ2IhOCYy96IBMGBldXssizHAZO91ig9ebrmtkrzQEpHK5HvSGADSEF/C0hLAK1SNbkF3iVBklGqIJjPhtz2e3WPszgDMeD6po2zcE0XSB94mYnEWwJPSjBiU0alVlCvbPyOyUYXznP6yasjJlvvvtVmgS7Za0A1oVZAf6XBKmoOLkcZMm5fDmHYvpTXa0OUJ1lNwWrWj2NUrnXNfZ4tSFzdnqJtwVy5kE+NZrlkUGvhn3XjgMrZSfMk23VuXWPeNpCefNhqGYc6bHlMY4fK2cZzcWyX40AomlKfKZwRt3odu1Cc2+SaKxH4PFi4ggCnLNHV9OeKf33p4AsAsF27FfHAk5Cj2q14Sz1Clmm/YUYx6A7VSSlQj9rtxWi7RT9oWsWkViSY/GGGxgw401xRXUaXIMuai5cu60kzzR8+hhhbS+Y21RpRFCq1IPQv8CPiRN2FjsuSybeFjKSzi38iY/LyZ9DClx44cV26sS9+d2ELZa2DfMyy7L033JdajZQV2Fq/t7Kq44ADjlk9Oeh4mXUnkIelPhyFMcwGhzhdMdERWYeuEe+0zdGVcJUeLrEMosj7nScMVhWzBPXRLba0Od/BQSCPA3y+G0OwxxPC2lEM1CkFjXvsD6uhCDi9JiGRzqqU6pMiv85QB5yGSBqghuJyK3rpKRCazEVNAeYAG9DLnwtd3O5LQ6sT3yl9kk3AVpSlW1+CaBX09BaPLBCdua/S07z819TakWdAHivVDSv57pqsCKgOYDTXlGPorsEkle4NjCRHH6wzGhtRMaZ3L+ueJD7BbtIgz4oZy2AsK2stoRi7tkcQLnIBegy8dlVjReHQd7tgFiFMT8+8wDdNVwqDEC+Y4hRVWtoYrnxIuF/U8kjWqcVDLO+4LJE5irferE6gQujToRw0VZJz6T9nU8keEHB15m1olSwRBV+RGgJ2JqVo7U3zSdVARZCu3d8yFBmoXtSL0t3Z7ZupEw0tVPvrRpD4XoEz7j58bvdru7eq7zaz8AvOu4A1fzX/f/M/fxQr7z5SXrDtfH6wm//EGOM/3gEveLD2JlFdOCcCBXASsCChGw7DuzsFdf15+NyUQNWlDia44qOnU5LY2ZlS3OkipJRG7xndzMloIDebEsCGQfCzZrj92padnITdCf/3rSrFfR77/Nu4uK5QbqSeps9po6YVb8LErwDR6BJpDH3Gc179QC1QowOsGKa1LrCh4p0KwfjdWUhGNViGckMJO+pJLL14G102RRUDLfZT5ADC+/o1Xdv+dferP0tk8LLsWElw4L0LXykMYdz62flU++JHKs5A9+Gq8H2jvmsbhurUnseFcc77nG4KD3XrKJD3x19fntO+u7q2NwgM5cgKcMyYaj/hsqGcpZORzz+h25d4sz4RvuIEAbEb6TwXMhSsbTiRRylKM58q1CLB79rQr8BlMpq/wGqpQk+iWOa3QpzXkLUUDyOVneM/kQskyySj2/zgtLPwt0MLamjE4Z50x4/H42W/UI5j6gBcTSkOCqrphu6kyVuVuJBm/A0aqkZeXX5d6Cy/Vza1dsnZyb3op35EaabA+QyatQcKDsg1LUHBwK19Gk5JKifnX30NJHWrHkGExJY3LPNOJWqJwObCNwNW4V/b6eebZPP2k43/2D44SMvFOS+UTrsd/VhvkAvjjVvlsDLcWf+NKs1By4NhjJG531JGfyo4oYcVrUKw1fYBE4ZAgurcnAfSJAwuv7+M3OGcRREOjl/a40wlIQehkrsyXf5K3aaoxXIJ6iPPUQAJZ+cX3s50OUwsBJhDNgdPZeUvADFy8cWLQqgxtvYt/HQrbmmgs156U57IAAYlMCzcJ4aaWs9hbCgWbcBJvJRhXqtOjUZmcOtYIYo7hkf5ovQwIC2uPWD5UkAvPTGZvQE8S70F+ZS0s1mnZTqsgy4/l4cXKchBdZeTyaETPg72GTHiZrEp4pXWxqR8m8QqNazlVOAABRsD4Bgb+1BcTP1e1RYPAc7bAxIUyDt1ihv4/nlRrwdKjECyxrrhNCfwymcZvFOh1/nIQgtoJzURFXPePKnrnT/dcVf92enE8s1zB6sv3x2sp3b99c/un9SVpAGVV5incb9LeQZqX9poCXowe5n6/yCM9kxveM2gOt4QJyYsbSB10F1WcMypmXP/Wm+lZCvKaeJEr617tijVoQD7FWl5HtB/17OteJ15etnan1tBvohPJ8hcMUsbgDsS1QD2C5yEAA9qG8Wppr/KbnSmMtcy9iVIFG1edU70x/mqNuKm0ccNy/a72AO26FsFVz8+5PSPJhvyT0XIVS3ImdbKKYn0Veya6c6s45MSCDasDvjy0rpuYhrSFaWOpmH78UJ5wONY54T6wQ2rcPV1YfFS1XTzBMTR0LrVxLMONbQRq5Ev73UUlYf/2ybeGSxggjA2hu/5fi4CfnpXKld9emMKh4Qy+OKMC0RGjMKZPSPIljP3/AHHJR9FwwRAu7ks2si5g3yKytQ/aj0wtuyLaItVLR1PEDFyr0Iq2+42osVqLNxIJ/cTdJf/pWHg1bYGXOco9AShoYj/ookEmqmnukQSoL0GZr2G6LfhnUmfjCGs3OZQsgwBKCLe4AAE0nzC6AOgEKmP4HekZriCxZ1m4dR+tGNVsM+OHdZPCH/isdTfvXQjt8q4sVoXFi0SyaLf73wgVPOA0fCG/GUqPC7299CV5oQBu8wU/dIiKDlT/w7K+j3jJzrOXh2rSl/U/lkocPaH1TwwphE6YR9i6drvrE6QUHbErkaXQ1W/sXmELX3nmvA3DZasKMcPbmHunW+yNHPMVtx+Yr+vlDgKSL3+WP/LUuk2S1Pbp6FcJRcpfWEtFqkSCK0+uSJLMX2+5MoSgvGW/0wRp6J/xyg+SkOssuAsI8uxDFGXuHYPWW06FBPYkGMZlAIJlRzY2XYNsd2yhgoMqqbFXcOkVwmIbH3GQyFeWyvUSdid7jGaLrNFtE+J+0HlAdh5/fY/NTPfr2e7pYAoqMqygj6gbzYuyZxfI2LS49OzAv3RevsIvfuCE7ih5Q/esT+flfXOGsVh/Y21eeKFRtFpZffnxzBaCMV8/w4JzKUlOumzQHDvip4RxJnAuWAQvDO/oayaGwcbD89r9v7Tze9a2a5yVeiHjhtGeV53A3hiK8V+3921wkbvllF3iAxhEtvOQTyM522ssek4+OxTyMhwkpo8EoMCRG74mYJeEY/RgxsEc+cpiM9VQ0zssO1j2o4h3ZVH78OCcT3O7l+NjotmouGwUrx3idbMnG+7jlHZnUbtRCzNLwYf9gyYTtRIqTP2Q2kWR+WE8T6a7z0f5kURDIZrBws4yFnRxMM7LHQp3N6O/TVIsgSG6g9kBYYieP0oV+saTgiaxnwLG401GjN7ig+loKM/3BYWgtYoZh4Gooc5rPLrZC2W5U7n1wim+ovc1sRn1B49MGlb8wvTVEtHWbrcOj5OHfGF/Vt/HHd0ch72fYiDEI008xKZTEXBNnKxWwL52bNWEs6KbKgU7kaOIXzgsVxjFCldaArWoe4HFXyuPhSqO6CpPy1+TByJkddVE+p+OYThxmVLSPFx5LNQHQt8mlf8m6H5W+Q2Mezvn2KGSIndPtJUd3MzsCrLwK7wGYrb0QeLsiQAEgWCawWW0DVETCSWj7vYPefScWF+R0+qDbwcGxDQ6/SrcOQxMNCmicPqRHgOKPAFaDEkfxTp3vmUjObX2OoFWJfVMLvppi0VMzPlaii3u6kWeBb19PcPVwh9vLjXiOrzaQNxy6xgnCp7CSkpWckIx3aX4Qxou99r2KjNPKnYc8OySKJIfcehGhnMRQzOrAAA9KOJMQuMTCHL68Y6Cbo5tIb5wh+z0Hq8EeCIl2x6NOU8VGTzwwGEmrx2RyZ+cqBRtrx8Z7qyIyYDgZ7ocVRRAkRc44Lm3BA34VrALtd2EBEfpIL0t6wfkH1HXKew0BBvUblQCp14RP/5D9ORX+R682wEQHFpJKCl8QLRHY0w/C25oqfDdvlQApytOrzUABwAAAA=)

**Step 7:** Visit the project you marked your bugs to. You will notice that the number of issues has increased!

![issues](https://www.testmuai.com/support/assets/images/gitlab-issues-3e0a391965728c045f93389a2aca3c05.webp)

**Step 8.** Click on **âIssuesâ,** in the next scene, youâll find your bug along with the list of all the issues logged in the project.

![issues list](https://www.testmuai.com/support/assets/images/gitlab-issue-list-4a165ed8f244dbfe416fe98ddae632c5.webp)

**Step 9.** Click on the description of bug and you will be redirected to the detail page of the bug. You will find all the data that you provided through TestMu AI already presented in the bug. TestMu AI automatically includes test environment details and related screenshots in the repository as attachments.

![screenshot in the repo](https://www.testmuai.com/support/assets/images/lambda-gitlab-56b76d7fe420ae676a6ff6fe27aafab9.webp)

## How To Uninstall GitLab Integration?[â](https://www.testmuai.com/support/docs/gitlab-integration#how-to-uninstall-gitlab-integration "Direct link to How To Uninstall GitLab Integration?")

* * *

You can work with one integration at a time. So if you would want to integrate to some 3rd party application of the similar type, other than the GitLab then you would have to uninstall your present integration. Here is how you can do it.

**Step 1:** Login to your TestMu AI account.

**Step 2:** Select **âSettingsâ** from the left navigation menu bar & click on **âIntegrationsâ.** This will guide you to the same screen from where you initiated **GitLab installation.** You will find Gitlab in the âMy Integrationsâ section.

**Step 3:** To remove the GitLab integration, click on **âRemoveâ.** You can find the **Remove** button right next to **GitLab** icon

![uninstall](https://www.testmuai.com/support/assets/images/gitlab-uninstall-dee309891fac7cdca9e32da98a273f82.webp)

That was all you need to know for TestMu AI \+ GitLab Integration. Increase your productivity with our integrations. If you still have any questions for us, please feel free to let us know. Our experts are always available on **chat** to help you out with any roadblock regarding our product. Happy testing!

---

*Auto-generated from TestMu AI documentation.*