# TroubleshootingTestMu AITunnel

> **Source**: [https://www.testmuai.com/support/docs/troubleshooting-lambda-tunnel](https://www.testmuai.com/support/docs/troubleshooting-lambda-tunnel)

**Product**: Testing Locally

**Last Crawled**: 2026-01-27T20:47:20.228338

---

On this page

* * *

TestMu AI Tunnel helps in establishing an SSH connection between your local machine and our cloud servers to help you perform tests on locally hosted websites and web-apps. With TestMu AI Tunnel, you can ensure how robust your website rendering is across 3000+ real browsers, even before you make it live on the internet.

If due to some unfortunate reason, you are unable to perform [cross browser testing](https://stage.testmuinternal.ai) using TestMu AI Tunnel then this document will help you troubleshoot the most common challenges.

* * *

Oops !! Facing issue while testing your locally hosted application through TestMu AI Tunnel? Here are a few guidelines for you.

Before proceeding, here are some of the common issues:

  * [Localhost refused to connect](https://www.testmuai.com/support/docs/troubleshooting-lambda-tunnel/#1-localhost-refused-to-connect)
  * [Invalid Host Header](https://www.testmuai.com/support/docs/troubleshooting-lambda-tunnel/#2-invalid-host-header)
  * [WordPress - CSS not loading](https://www.testmuai.com/support/docs/troubleshooting-lambda-tunnel/#3-wordpress---css-not-loading)
  * [IP whitelisting](https://www.testmuai.com/support/docs/troubleshooting-lambda-tunnel/#4-ip-whitelisting)
  * [No available PORT found](https://www.testmuai.com/support/docs/troubleshooting-lambda-tunnel/#5-no-available-port-found)
  * [Custom Host name](https://www.testmuai.com/support/docs/troubleshooting-lambda-tunnel/#6-custom-host-name)
  * [CUI â Console UI](https://www.testmuai.com/support/docs/troubleshooting-lambda-tunnel/#7-still-got-issues-let-us-help-through-cuiconsole-ui)
  * [Unable to establish a secure shell tunnel connection through Port 443](https://www.testmuai.com/support/docs/troubleshooting-lambda-tunnel/#8-unable-to-establish-a-secure-shell-tunnel-connection-through-port-443)
  * [LT canât be opened because Apple cannot check it for malicious software](https://www.testmuai.com/support/docs/troubleshooting-lambda-tunnel/#9-lt-cant-be-opened-because-apple-cannot-check-it-for-malicious-software)

## 1\. Localhost Refused To Connect[â](https://www.testmuai.com/support/docs/troubleshooting-lambda-tunnel#1-localhost-refused-to-connect "Direct link to 1. Localhost Refused To Connect")

* * *

After configuring the tunnel, you might get into the error similar to the below screenshot:

![troubleshoot lambdatest tunnel](https://www.testmuai.com/support/assets/images/localhost-refused-to-connect-69a22e6a619362f5122b811cbdfa0618.webp)

The error "localhost refused to connect" occurs because of using the URL as localhost which is unfortunately not compatible with various browsers and browser versions. We are deliberately eliminating the URL localhost and recovering it with localhost.lambdatest.com or your local system IP.

For example you might find above error with URL: `https://localhost/demo.html`

however, URL: `https://localhost.lambdatest.com/demo.html` or `10.0.0.15/demo.html` would definitely work fine for you.

## 2\. Invalid Host Header[â](https://www.testmuai.com/support/docs/troubleshooting-lambda-tunnel#2-invalid-host-header "Direct link to 2. Invalid Host Header")

* * *

While testing an application hosted on your local machine, you may receive an "Invalid Host Header" error message when testing on TestMu AI using a local connection. This error is most commonly caused by a misconfiguration of the application server that causes it to reject non-local connections or reject requests directed at hostnames other than localhost(or any custom one set)

Since, web applications are now built with various different kinds of frameworks like angular, react etc; In order to test it using tunnel the command used to run your web app needs to modified in your project manifest file i.e. "package.json"

![troubleshoot lambdatest tunnel](data:image/webp;base64,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)

  * **Angular Framework Project** : For Angular framework based web app, ideally you might be using "ng serve" or "npm start" to run your web application or your package.json file configuration would be set as "ng serve" in order to start your web app and as usual, it would be working fine on local browser. However, this might throw an "Invalid Host Header"error or error something related to the invalid host in a Real Time Test.

To resolve this, here is the quick small solution for you. While running your application, you can either use command `ng serve --host 0.0.0.0 --disable-host-check` or set your start configuration in package.json file as `"ng serve --host 0.0.0.0 --disable-host-check"` instead of changing your running command.

  * **React Framework Project** : For React framework based web app, you need to create an env file in which you have to add the hostname,syntax: `HOST=< hostname >`, once you are done with it, now you can add your localhost IP along with your hostname in your system hosts file.

Example: `127.0.0.1 < hostname >`

This would help you avoiding "Invalid Host Header" error.

## 3\. WordPress - CSS Not Loading[â](https://www.testmuai.com/support/docs/troubleshooting-lambda-tunnel#3-wordpress---css-not-loading "Direct link to 3. WordPress - CSS Not Loading")

* * *

While testing your local web app built through WordPress, you may find issue with the rendering of CSS, similar to the below screenshot:

![troubleshoot lambdatest tunnel](https://www.testmuai.com/support/assets/images/WordPress-CSS-Not-Loading-c22705fbd31454c029a003d02566da81.webp)

The general solution for this is to update the WordPress Address and Site Address on the General Settings tab in the WordPress dashboard with your system IP address rather than the default of localhost, then everything will be emitted relative to that. Here is a screenshot for your further reference:

![troubleshoot lambdatest tunnel](https://www.testmuai.com/support/assets/images/general-settings-for-troubleshooting-lambda-tunnel-8a1eadcc61ac2d19c311cad922b82ed8.webp)

By applying the above changes, you would find the CSS loading issue as resolved. Below is a screenshot after the mentioned changed:

![troubleshoot lambdatest tunnel](https://www.testmuai.com/support/assets/images/hello-world-f3abde1838426e1ddbe4926f7333df74.webp)

## 4\. IP Whitelisting[â](https://www.testmuai.com/support/docs/troubleshooting-lambda-tunnel#4-ip-whitelisting "Direct link to 4. IP Whitelisting")

* * *

If you are testing a server that requires IP whitelisting, then you just have to set up a Local Testing connection and whitelist the below few IPâs for the respective domain:

`https://ts.lambdatest.com/`  

  * 199.58.84.59
  * 23.82.88.184
  * 23.106.34.219
  * 23.106.54.77
  * 3.214.241.254
  * 52.36.84.247
  * 13.126.37.58
  * 3.66.78.89

## 5\. Custom Host Name[â](https://www.testmuai.com/support/docs/troubleshooting-lambda-tunnel#5-custom-host-name "Direct link to 5. Custom Host Name")

* * *

Because of some firewall restrictions, your web application might not be accessible on some other servers even after whitelisting the IPâs and configuring the tunnel, in such case you need to make an entry in the hosts file which is used to map hostnames to IP addresses. With the hosts file, you can change the IP address that you resolve a given domain name. This change only affects your own computer without affecting how the domain is resolved worldwide.

This is particularly useful when you wish to see how a website will look like when hosted on a different server without making any DNS changes to your domain.

The location of the hosts file, depending on the operating system that you are using, is:

  * **Windows** â SystemRoot > system32 > drivers > etc > **hosts** By default the system root is C:\Windows, so if you are using Windows, your **hosts** file is most probably:  
C:\Windows\System32\drivers\etc\ **hosts**)
  * **Linux** â /etc/**hosts**
  * **Mac OS X** â /private/etc/**hosts**

Letâs say that you wish to resolve **mydomain.com** to the IP address **10.20.30.40**. In this case, you would need to open up the hosts file with a text editor and append the following line: 10.20.30.40 mydomain.com [www.mydomain.com](http://www.mydomain.com)

## 6\. Enable Verbose Logging[â](https://www.testmuai.com/support/docs/troubleshooting-lambda-tunnel#6-enable-verbose-logging "Direct link to 6. Enable Verbose Logging")

* * *

The `- v` flag enables Verbose logging on the console. You can use this to log the HTTP headers & requests or to debug the TestMu AI Tunnel connection.

The requests are also logged into a log file `lt.log` which is created in the same working directory as the TestMu AI Tunnel binary. You can also specify the tunnel log file name using the `--logFile` flag.

![troubleshoot lambdatest tunnel](https://www.testmuai.com/support/assets/images/verbose-d2c0c9ab9980bd84c7da7dc17d44a26d.webp)

## 7\. LT Canât Be Opened Because Apple Cannot Check It For Malicious Software[â](https://www.testmuai.com/support/docs/troubleshooting-lambda-tunnel#7-lt-cant-be-opened-because-apple-cannot-check-it-for-malicious-software "Direct link to 7. LT Canât Be Opened Because Apple Cannot Check It For Malicious Software")

* * *

Catalina OS users may get the below error from the command line while trying to configure the TestMu AI Tunnel to test their locally hosted web pages: "LT can't be opened because Apple cannot check it for malicious software"

This error occurs due to the increased restrictions on third-party software, downloaded from the internet. Since Catalina OS is recently launched by Apple, we are working to make our TestMu AI Tunnel compatible with the new OS.

While we are at it, here is a one-time setup workaround. All you need to do is run the below command before you start configuring your TestMu AI Tunnel:

`xattr -d com.apple.quarantine ./LT`

---

*Auto-generated from TestMu AI documentation.*