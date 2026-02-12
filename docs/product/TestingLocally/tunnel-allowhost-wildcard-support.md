# Support for Wildcard in --allowHosts Flag

> **Source**: [https://www.testmuai.com/support/docs/tunnel-allowHost-wildcard-support](https://www.testmuai.com/support/docs/tunnel-allowHost-wildcard-support)

**Product**: Testing Locally

**Last Crawled**: 2026-01-27T20:47:33.285452

---

On this page

TestMu AI Tunnel now supports wildcard entries in the [`--allowHosts`](https://www.testmuai.com/support/docs/lambda-tunnel-modifiers/#:~:text=TYPE-,%2D%2DallowHosts,-Comma%20separated%20list) flag. This enhancement allows users to specify patterns for hostnames instead of listing each subdomain separately, making it more flexible and efficient.

## Usage of `--allowHosts` with Wildcards[â](https://www.testmuai.com/support/docs/tunnel-allowHost-wildcard-support#usage-of---allowhosts-with-wildcards "Direct link to usage-of---allowhosts-with-wildcards")

The `--allowHosts` flag enables users to define which domains should be routed through the TestMu AI Tunnel while allowing other traffic to bypass it. With the new wildcard support, you can match multiple subdomains easily.

### Formatting Domains with Wildcards[â](https://www.testmuai.com/support/docs/tunnel-allowHost-wildcard-support#formatting-domains-with-wildcards "Direct link to Formatting Domains with Wildcards")

Follow these guidelines when using wildcards in domain names:

#### Use only the domain name[â](https://www.testmuai.com/support/docs/tunnel-allowHost-wildcard-support#use-only-the-domain-name "Direct link to Use only the domain name")

  * Do not include `http://` or `https://`.
  * â Example: `example.com`.Â Â Â Â 

#### Comma-separated list without spaces[â](https://www.testmuai.com/support/docs/tunnel-allowHost-wildcard-support#comma-separated-list-without-spaces "Direct link to Comma-separated list without spaces")

  * Ensure that the list of domains is comma-separated with no spaces.
  * â Example: `example.com`, `testsite.com`, `anotherdomain.com`

#### Using Wildcards to Match Subdomains[â](https://www.testmuai.com/support/docs/tunnel-allowHost-wildcard-support#using-wildcards-to-match-subdomains "Direct link to Using Wildcards to Match Subdomains")

  * Prefix the domain with a dot `(.)` to match all its subdomains.
  * Alternatively, you can use an asterisk `(*)` for the same effect.
  * â Example:
    * `".example.com"` or `"*.example.com"` will match `sub.example.com`, `api.example.com`, `blog.example.com`, etc.

Note

Enclose the argument in **quotes** to prevent shell expansion of the **asterisk (*)**.

## Benefits of Wildcard Support in `--allowHosts`[â](https://www.testmuai.com/support/docs/tunnel-allowHost-wildcard-support#benefits-of-wildcard-support-in---allowhosts "Direct link to benefits-of-wildcard-support-in---allowhosts")

  * **Simplifies Configuration :** No need to manually list each subdomain.
  * **Increased Flexibility :** Easily manage multiple subdomains with a single entry.
  * **Better Performance :** Reduces manual domain management, improving efficiency.

---

*Auto-generated from TestMu AI documentation.*