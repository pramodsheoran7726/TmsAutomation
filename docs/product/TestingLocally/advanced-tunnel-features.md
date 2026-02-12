# Advanced TestMu AI Tunnel Features

> **Source**: [https://www.testmuai.com/support/docs/advanced-tunnel-features](https://www.testmuai.com/support/docs/advanced-tunnel-features)

**Product**: Testing Locally

**Last Crawled**: 2026-01-27T20:47:31.076629

---

On this page

**TestMu AI Tunnel** feature allows you to test your **private server URLs** or **locally hosted web-apps** or **websites** on **3000+** real browsers through TestMu AI. However, sometimes corporate firewalls and proxy settings may have restricted you to leverage the TestMu AI Tunnel binary. Not anymore though, as weâve come up with a new binary for TestMu AI Tunnel. TestMu AI Tunnel follows various protocols such as **Web Socket, TCP** etc. to help you establish a secure and unique tunnel connection between your system and TestMu AI cloud servers.

You can download the **TestMu AI Tunnel binary** that will help you establish a secure connection through corporate firewalls between your computer and [LambdaTest](https://www.lambdatest.com/) cloud servers for a testing locally hosted website or web-applications. You can test plain **HTML, CSS, PHP, Python** or other similar web files saved on your local system, over combinations of operating systems, browsers, and screen resolutions that are available on TestMu AI.

Download Links  
---  
[Windows](https://downloads.lambdatest.com/tunnel/v3/windows/64bit/LT_Windows.zip)  
[macOS](https://downloads.lambdatest.com/tunnel/v3/mac/64bit/LT_Mac.zip)  
[Linux](https://downloads.lambdatest.com/tunnel/v3/linux/64bit/LT_Linux.zip)  
[FreeBSD](https://downloads.lambdatest.com/tunnel/v3/freebsd/64bit/LT_Freebsd.zip)  
  
## Executing TestMu AI Tunnel for Client Connection[â](https://www.testmuai.com/support/docs/advanced-tunnel-features#executing--tunnel-for-client-connection "Direct link to executing--tunnel-for-client-connection")

After you download the zip file for your operating system, extract it in a folder and open you command line there. Once you have your terminal routed to the correct directory where the TestMu AI Tunnel binary file is placed, you need to execute the below command.

Format
    
    
    LT --user {Your Registered Email ID} --key {Your LambdaTest Access Key} --tunnelName {any random string}  
    

So for example, if your details are as below:

Parameters| Values  
---|---  
**Email**| [[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection#a0c5d8c1cdd0ccc5e0ccc1cdc2c4c1d4c5d3d48ec3cfcd)  
**TestMu AI Access Key**| 123asd123  
**Tunnel Name**|  SampleTunnel  
  
Then your command would be:
    
    
    LT --user [[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection) --key 123asd123 --tunnelName SampleTunnel  
    

![Advanced <BrandName /> Tunnel](https://www.testmuai.com/support/assets/images/Executing-Lambda-Tunnel-79bdded44f22202a027b4006fb3aede9.webp)

Once you execute the command, you will successfully establish a client connection using the **TestMu AI Tunnel**. You will find the command logs to state, that you are now ready to test.

![Advanced <BrandName /> Tunnel](https://www.testmuai.com/support/assets/images/test-using-lambda-tunnel-a22a7b5234af1c98d7bd0ecb54dfe822.webp)

## What Makes The New TestMu AI Tunnel Binary Special?[â](https://www.testmuai.com/support/docs/advanced-tunnel-features#what-makes-the-new--tunnel-binary-special "Direct link to what-makes-the-new--tunnel-binary-special")

Well, other than the fact that you can now establish a connection through your corporate firewalls with the new TestMu AI Tunnel binary. Here are a couple things to top it off -

### Auto Update Functionality[â](https://www.testmuai.com/support/docs/advanced-tunnel-features#auto-update-functionality "Direct link to Auto Update Functionality")

Earlier, for every version update in out TestMu AI Tunnel, you were compelled to download the latest binary from our platform and over write it over the outdated version in your computer. Well, now this new binary will take care of that. Every time you execute this binary, it will check for the **latest** version available and will update itself **automatically** , in case it gets outdated.

### Default Port 443[â](https://www.testmuai.com/support/docs/advanced-tunnel-features#default-port-443 "Direct link to Default Port 443")

Now, by default, everything will run over the **port 443** to ensure a secure web browser communication through **http protocol** over **TLS/SSL**.

### Leverage `.lt.yaml` file[â](https://www.testmuai.com/support/docs/advanced-tunnel-features#leverage-ltyaml-file "Direct link to leverage-ltyaml-file")

With this new TestMu AI Tunnel binary, you can declare your TestMu AI authentication credentials in a **YAML** file configuration and keep it in the same directory as the **LT binary file**. That way, you wonât have to pass the environment variables in the cmd every time you wish to configure the TestMu AI Tunnel. Once you specify these variables in the `.lt.yaml file`, you will just have to execute the binary file through cmd **LT.exe** and the YAML file will automatically configure a secure TestMu AI Tunnel connection by auto detecting the variables specified in the YAML file.

![Advanced <BrandName /> Tunnel](https://www.testmuai.com/support/assets/images/lt-yaml-file-354d47148c616e8f32afb03c5ea588ab.webp)

Here is an example of the `.lt.yaml` file.
    
    
    User: salmank  
    Key: 123456789abcdefghijklmnopqrstuv  
    TunnelName: LambdaTest  
    

> **Note:** You will need to replace this file with your credentials and it has to be named exactly "`.lt.yaml`". Once you specify the proxy information as environment variable, it gets auto detected.

Similarly, you can go ahead and pass any other variables by just specifying them in the YAML file. For example, if you wish to have verbose variable passed on for detailed logs while the binary is being configured. You will add the verbose flag in your YAML file:
    
    
    User: salmank  
    Key: 123456789abcdefghijklmnopqrstuv  
    TunnelName: LambdaTest  
    Verbose: True  
    

Now, when you trigger the binary file through cmd. You will have your verbose logs populated automatically, without you having to specify the variable every time.

![Advanced <BrandName /> Tunnel](https://www.testmuai.com/support/assets/images/automatic-verbose-logs-93f6576d7cdee83b817dd96c263d4ec1.webp)

### Local Testing By MITM (Man-In-The-Middle)[â](https://www.testmuai.com/support/docs/advanced-tunnel-features#local-testing-by-mitm-man-in-the-middle "Direct link to Local Testing By MITM \(Man-In-The-Middle\)")

The **MITM(Man-in-the-middle)** mode enables you to test websites using self-signed certificates on your local system or internal network. It happens very often that you may try to test a website on the localhost which may not have valid SSL certificates before the website is made live. In such cases, you may receive the below error.

![Advanced <BrandName /> Tunnel](https://www.testmuai.com/support/assets/images/Local-Testing-By-MITM-26c56ba099813e67cc834dec2d6e6f57.webp)

You can test such websites by leveraging the **MITM** mode. The command will look like this:

`LT --user [[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection) --key 123456789abcdefghijklmnopqrstuv --tunnelName LambdaTest --mitm`

Here is a screenshot of the same website that was throwing an error earlier but can now be tested by running the **MITM** mode.

![Advanced <BrandName /> Tunnel](https://www.testmuai.com/support/assets/images/test-using-mitm-mode-376c1bd44350181c39201fcf1cca6920.webp)

### Using The Tunnel InfoAPIs[â](https://www.testmuai.com/support/docs/advanced-tunnel-features#using-the-tunnel-infoapis "Direct link to Using The Tunnel InfoAPIs")

By using the tunnel **Info APIs** , you can fetch the current status of the tunnel and can use it to stop the tunnel. You can fetch the current tunnel status using the Info API on the tunnel. Suppose the **InfoAPI** is available on the host over port **8000** , then use the below command to infuse the **InfoAPI** in the tunnel.
    
    
    LT --user [[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection) --key 123456789abcdefghijklmnopqrstuv --tunnelName LambdaTest --infoAPIPort 8000  
    

![Advanced <BrandName /> Tunnel](https://www.testmuai.com/support/assets/images/Using-Tunnel-InfoAPIs-8e53398d02524320fd79d84d17351258.webp)

In order to fetch the current tunnel status, execute the below command:
    
    
    curl http://127.0.0.1:8000/api/v1.0/info  
    

![Advanced <BrandName /> Tunnel](https://www.testmuai.com/support/assets/images/fetch-tunnel-status-4574a2218722c66ea7934224b3ee81cd.webp)

To stop the current tunnel, execute the below command:
    
    
    curl -X DELETE http://127.0.0.1:8000/api/v1.0/stop  
    

![Advanced <BrandName /> Tunnel](https://www.testmuai.com/support/assets/images/stop-current-tunnel-90a3799a2eacfcbde5c61cd471d3c523.webp)

### Tunnel Logs[â](https://www.testmuai.com/support/docs/advanced-tunnel-features#tunnel-logs "Direct link to Tunnel Logs")

The --log-level flag in the TestMu AI CLI is used to specify the desired log level for tunnel logs. This feature enables users to control the verbosity of logs generated during tunnel operations, making it easier to debug or monitor activities as needed.
    
    
    --log-level YOUR_LOG_LEVEL  
    

#### Supported Log Levels:[â](https://www.testmuai.com/support/docs/advanced-tunnel-features#supported-log-levels "Direct link to Supported Log Levels:")

  * **info :** Provides informational messages about the general operation of the tunnel.
  * **warn :** Highlights potential issues that might not immediately affect functionality but require attention.
  * **debug :** Outputs detailed logs, including diagnostic information, for troubleshooting purposes.
  * **error :** Displays error messages when something goes wrong in the tunnel operation.
  * **fatal :** Shows critical issues that cause the tunnel to terminate unexpectedly.

## AllowHost In Tunnel[â](https://www.testmuai.com/support/docs/advanced-tunnel-features#allowhost-in-tunnel "Direct link to AllowHost In Tunnel")

With the latest tunnel binary release we have introduced the capability to provide the domains which will be resolved from tunnel binary and the rest of the urls will be resolved from our servers. This can speed up the execution of test as the latency will be reduced by transferring data from the tunnel client. You may also use this to restrict the traffic flowing from userâs network.

**Usage:**
    
    
    âallowHosts <comma_separated_domains>  
    

Example
    
    
    LT  --user <username> --key <accessKey> âallowHosts google.com,apple.com,amazon.com  
    

**Explanation:** When this flag is used only requests for provided domains will be routed via tunnel and resolved from the user's network. Requests for domains other than mentioned will be resolved from Lambdatestâs network.

## Tunnel Arguments[â](https://www.testmuai.com/support/docs/advanced-tunnel-features#tunnel-arguments "Direct link to Tunnel Arguments")

You can find all the arguments for TestMu AI Tunnel by running the below command in your command line:
    
    
    LT --help  
    

![Advanced <BrandName /> Tunnel](https://www.testmuai.com/support/assets/images/tunnel-argument-f56bf30b674120444a867d43f4251107.webp)

> **Note:** For all modifiers/arguments, refer to the list of [TestMu AI Tunnel Modifiers](https://www.testmuai.com/support/docs/lambda-tunnel-modifiers/).

That was all you need to know for configuring a client connection through TestMu AI Tunnel. In case you have any questions, feel free to share them with us through our **24/7 chat support** or drop us an email to [[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection#097a7c7979667b7d497d6c7a7d647c276860). Happy testing! ð

---

*Auto-generated from TestMu AI documentation.*