# Project Settings

> **Source**: [https://www.testmuai.com/support/docs/smartui-project-settings](https://www.testmuai.com/support/docs/smartui-project-settings)

**Product**: SmartUI

**Last Crawled**: 2026-01-27T21:03:49.015890

---

On this page

This guide provides detailed information on how to navigate and configure the various options available in SmartUI's Project Settings. SmartUI offers a wide array of settings to customize your project, manage approvals, configure comparison parameters, and more. Before delving into the Project Settings, ensure you meet the following prerequisites:

## Prerequisites for Accessing Project Settings in SmartUI[â](https://www.testmuai.com/support/docs/smartui-project-settings#prerequisites-for-accessing-project-settings-in-smartui "Direct link to Prerequisites for Accessing Project Settings in SmartUI")

To access the Project Settings in SmartUI, you must meet the following requirements:

  1. You need an active account with [LambdaTest](https://accounts.lambdatest.com).
  2. Ensure you have an active [subscription plan](https://www.lambdatest.com/pricing) with a valid screenshots limit.
  3. You must have created a project within the SmartUI web app.

## Navigating to Project Settings[â](https://www.testmuai.com/support/docs/smartui-project-settings#navigating-to-project-settings "Direct link to Navigating to Project Settings")

To access the Project Settings, follow these simple steps:

  1. Log in to your SmartUI account and navigate to your desired SmartUI project and click on it.

  2. Click on the "Project Settings" section within the SmartUI dashboard to access the settings related to your project.

## Project Settings[â](https://www.testmuai.com/support/docs/smartui-project-settings#project-settings "Direct link to Project Settings")

  * Project Token
  * Basic Settings
  * Comparison Settings
  * Build Settings
  * Notifications
  * Other Settings

**Project Token**

The Project Token is a unique identifier that authenticates your SmartUI project for executing tests locally with CLI and APIs. You'll find your Project Token in the Project Settings after creating a project.

**Setting Up Project Token**

Use this key to authenticate your SmartUI project for executing locally with CLI and APIs.

  * MacOS/Linux
  * Windows - CMD
  * PowerShell

    
    
    export PROJECT_TOKEN='project#token'  
    
    
    
    set PROJECT_TOKEN='project#token'  
    
    
    
    $env:PROJECT_TOKEN='project#token'  
    

### Using Project Token[â](https://www.testmuai.com/support/docs/smartui-project-settings#using-project-token "Direct link to Using Project Token")

The Project Token is required for:

  * CLI executions (`npx smartui exec`, `npx smartui capture`)
  * API uploads
  * Local test execution
  * CI/CD pipeline integrations

info

Keep your Project Token secure and never commit it to version control. Use environment variables or secret management tools in CI/CD pipelines.

**Basic Settings**

![cmd](https://www.testmuai.com/support/assets/images/Basic_ss-9714220bc4088c511f61cdbbdc388989.png)

  * **Project Name:** Customize the name of your project to enhance its identification.

info

Changing the Project Name will automatically update the `smartUI.project` capability's options for Web/App projects.

  * **Approvers:** Manage the list of authorized individuals responsible for approving changes within the project.

info

Altering Approvers will impact email notifications, which will be sent to the latest approver list for recent builds.

  * **Tags:** Add tags to your project for better organization and categorization.

**Comparison Settings**

![Comparison Settings](https://www.testmuai.com/support/assets/images/comparison-f277d6d3ecd160fbf7186f9838b43d45.png)

Comparison settings allow you to fine-tune how SmartUI compares screenshots, balancing between highlighting important changes and ignoring noise.

**Pixel Threshold**

Strike a balance between highlighting important changes and ignoring noise. The pixel threshold determines the sensitivity of the comparison algorithm.

**Options:**

  * **Relaxed** : Higher threshold, fewer differences detected (good for pages with minor rendering variations)
  * **Recommended** : Balanced threshold (default, suitable for most use cases)
  * **Strict** : Lower threshold, more differences detected (good for precise comparisons)
  * **Custom** : Set a custom threshold value (0-10000)

**Example:**

  * Custom value: `5000` \- Higher value means more tolerance for pixel differences

info

Adjusting the Pixel Threshold in Comparison Settings will only affect new builds/screenshots captured after the update.

**Error Highlight Color**

Set the color to show/highlight the changes in the pixel differences on your test output.

**Available Colors:**

  * Red (default)
  * Blue
  * Orange
  * Green
  * Pink
  * Gray
  * Custom: Enter a hex color code (e.g., `#f687b3`)

**Use Case** : Choose a color that provides good contrast against your page background for easier visual identification of differences.

**Custom Mismatch Acceptance**

Configure pixel-to-pixel acceptance percentage for auto-approval.

**Settings:**

  * **Accept** : Percentage threshold for auto-approval (0-100)
  * **Reject** : Percentage threshold for auto-rejection (0-100)

**Example:**

  * Accept: `0%` \- No auto-approval
  * Reject: `100%` \- Auto-reject all differences

**Use Case** : Automatically approve screenshots with differences below the acceptance threshold, reducing manual review time.

**Smart Ignore**

Highlight content changes while smartly ignoring layout shifts and displacement differences.

**Toggle** : Enable/disable Smart Ignore for the project

**Benefits:**

  * Reduces false positives from layout shifts
  * Focuses on actual content changes
  * Improves test reliability

For detailed information, refer to [Smart Ignore Documentation](https://www.testmuai.com/support/docs/smartui-smartignore).

**Bounding Boxes**

Configure your areas to which needs to be ignored or select a specific area for comparison.

**Use Cases:**

  * Ignore specific regions (ads, dynamic content)
  * Focus comparison on specific areas (main content, critical UI)
  * Define regions of interest for comparison

**Advanced Comparison Settings**

Manage your Pixel to Pixel false positives and comparison view types.

**Ignore Pixel Scaling Options**

Choose options to remove the Pixel to Pixel false-positive rate in identifying the screenshot.

**Options:**

  * **Ignore Antialiasing** : Ignore differences caused by antialiasing rendering
  * **Ignore Less** : Minimal pixel difference tolerance
  * **Ignore Nothing** : No pixel difference tolerance (strictest)
  * **Ignore Alpha** : Ignore alpha channel differences
  * **Ignore Colors** : Ignore color differences, focus on structure

**Use Case** : Reduce false positives from rendering differences, browser-specific rendering, or minor pixel variations.

**Error Type Identifier**

Show the differences in the output screen by identifying the pixel changes type and capture the intended view.

**Options:**

  * **Flat** : Simple difference highlighting
  * **Movement** : Highlight elements that moved
  * **Movement with Diff Intensity** : Show movement with intensity levels
  * **Diff portion from the Input** : Show only the different portions
  * **Flat with Diff Intensity** : Flat view with intensity levels

**Use Case** : Choose the view that best helps you identify and understand the differences in your screenshots.

**Transparency**

Strike a balance between highlighting differences and maintaining visibility of the underlying content.

**Options:**

  * **Opaque** : Full opacity, clear difference highlighting
  * **Transparent** : Lower opacity, see underlying content

**Use Case** : Adjust transparency to see both the differences and the original content for better context.

**Resize Image**

Ability to scale the test screenshot according to baseline.

**Options:**

  * **Use Original Image** : Compare at original size
  * **Scale to same size** : Scale screenshots to match baseline size

**Use Case** : Handle cases where screenshots are captured at different resolutions or viewport sizes.

info

Changes to Project Settings will impact builds/comparisons executed after the changes and the previous builds/comparisons remain unaffected.

**Additional Information:** For detailed information on these options, refer to our [Comparison Settings Documentation](https://www.testmuai.com/support/docs/test-settings-options/).

**Build Settings**

**Smart Baseline**

![cmd](data:image/png;base64,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)

Smart Baseline is a feature that simplifies and automates the process of updating the baseline for approved screenshots in your baseline build. This feature provides convenience and efficiency by ensuring your baseline remains in sync with approved changes without manual intervention.

![cmd](https://www.testmuai.com/support/assets/images/smart_baseline-331ef5b843b444f4fcf74285a850c19e.png)

  * **Baseline Branch:** A baseline branch build consists of screenshots captured using SmartUI. All screenshots in this build are compared against non-baseline branch builds.

  * **Non-Baseline Branches:** Non-baseline branch(s) builds are sets of screenshots captured using SmartUI. All screenshots in these builds are compared against the baseline build, matching them by screenshot names.

info

When **`Smart Baseline`** is turned on, the system automatically updates the baseline for approved screenshots in the baseline build, streamlining the testing process and saving time.

**Git Settings**

Configure Git-related settings for your project, including the baseline branch name, auto-approval branches, GitHub repository linkage, and run status checks.

**Additional Information:** For detailed information on these options, refer to our [Git Baseline Branching Documentation](https://www.testmuai.com/support/docs/smartui-github-app-integration/).

**Overwrite Screenshot**

![cmd](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnwAAABDCAYAAAAGXtgHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABfaVRYdFNuaXBNZXRhZGF0YQAAAAAAeyJjbGlwUG9pbnRzIjpbeyJ4IjowLCJ5IjowfSx7IngiOjYzNiwieSI6MH0seyJ4Ijo2MzYsInkiOjY3fSx7IngiOjAsInkiOjY3fV19xh3YrwAAEsNJREFUeF7tnU1sHdUVx08rFhG7ygI9O+UjUrcJjuU0JIEFIFEa/IgqpC74WEBjE6VRS6t2USAmiks2rVqKSDAxtIuELKp+yHkhbZGaLCBJE1vGJLsWKV/EfkLKFiGB5J5zP2bunXfvvHnj58QZ/3/KxPNx595zzj1z37kf8943vvp6YYEAAAAAAEBl+ab5CwAAAAAAKgoCPgAAAACAioOADwAAAACg4iDgAwAAAACoOAj4AAAAAAAqDgI+AAAAAICKg4APAAAAAKDiIOADAAAAAKg4CPgAAAAAACoOAj4AAAAAgIqDgA8AAAAAoOIg4AMAAAAAqDgI+AAAAAAAKg4CPgAAAACAioOADwAAAACg4iDgAwAAAACoOAj4AAAAAAAqzsoJ+D6fpJ9vHKT7k+2n1PjcXFtuJLK+ThfMqcVy4U1Xd95enKTr5tqy5ZPXtaxvnjcnAAAAAFCGb3z19cKC2S/Nl19+Sac++pAuXDhP1659Rl988YW5Up7bb7+dVq/+Nq1du462PPAgrVq1ylwpgQQOI4fNgc9TB6fpJ/eZg+WCBHz1MTpNz9DE2RdpLZ+SgG340BZ6ufEHqt+pkxXjOjVe/B69dsYcWjbtpvdf30Y95nBZYuvt2T/Sf3atMyc74Ty9sfF5OnIr6AoAAAAsIYse4Tt96iPa/cqv6G9/+wv973//7UqwJ0g+kp/kK/lLOeXgD30b7EngcHZabRPP6lNHRro3itY17txGv1Ny6mBPgrZLn6qdzvn8Izqpgj0JFrXu/zn7L3r5O+pqtfn8Il0yuwAAAMBKZlEB37FjR+m99w6p4OzRRx+ll156ifbv36822Zdz3UDyl3KkvI755AQdUTvP0IQzSrR21x/pKbV3mE5+IiNBMtXpTPNmpxMzU8I/b5gJUSednjblANKmtdOm2Slaeyx5t71fZLMjdKfotbq5T4jJ5HLnGrpX7Zyik2ft9R6q73JGvDL5ROVSia2tnLQJkWuuPjZf3t74RF8W/Cnn1un2642fBq+l5/Xm1YsaJWXOjNHjfM0tDwAAAFhJlA74ZMTtH8ffpzvuuEMFd08++STdc889dNttt6lN9uWcXJM03UDK63Sk7/qVi3rn2YfNaJllNa3ZpPcuXVlND6kRvzQouvChHhV86kEOEiVgscGD4fSvv+cHEJ++S386ZPZtkHXmIs3xn+tnT5h7L9IlCVbmL6pjlbfFvb8IRWRSrDO66eteUCQE8vHw5JKA7nkTQBsOPW/yy7tmOUGvOVPrdnRVgrbhPN1Zhtd+fcoccNC7TwfSct/jyXmN6BgMfAEAAIAVTKmAT9bs/f3vf1X7w8PDKriLIdckTbeQcqX8bnLv3T209sFn1P7py9f4//N0UgUgz9BD93Hw92cdEG1+5V96SvSgTnvkQ2d068waei6ZhrVBlg7w5i5zULJpC23mYOXivA1Ct9CaXklj8O53WUc/kSlYFZyaadld64rJZFi7K70uqMDPjL7ZfNzpbm+9nCNXX+NdHdDZtI3drBPn9++P6NOca0n4dYboITWtbEdXTQBskbV2qqzMOkUrg8lTB9Ln6T0V7DlT1UZHVeZ9L6bpTb7Lbq0mAAAAcIMoFfDJCxp2Gjcv2LNImm5O70r5Rem5e43eOXQis1bvGl10X2S472EdhEg6u/YrMypoR8iCL4Bk0vbds4X/lwBPB4+bH3lYjfpJQKYDwIdpsxvUtIxAFiNXJhcJgJygiA69602NeqONLiG5Dj2vywyNDOZdS3ROR1eFnvqPtO3N1GvL28lWhmR62oXPWTvaOjQjqwAAAADQlAr45G1cYXBwUP0tQidp22HLL4QNAugwDTvrzS68aaYfN+2mp9XIjx2VO0x/2qenYLNBUDKaZrecN0d7NnJww38vfXiCg8ct9NDGB3SQ8+kJOikvYHxnTVfeGm0v03l6w11nl9jDJzQyGMUdDZTt9W30LXMpdK29njKKKentSCbXQeFpWWeU0K7X3LSG+tQJAAAAAAilAj756hVh9erV6m8ROknbDlt+MTiYSEa1zOgTb3bN2FPPpQFJMq17RqYK9XSukJy3o2lqa/M9fmY06vShwxw8yihUD21+ZAvRmcN05EzOiFou6UsbHcnk6H2/XWdnRtvW/tBMe7pp3ADRwQaxfn76ZYi8a+1IX7xIvz5GptnzWUdPv6JHUZVN5H4zyunWqQIvbQAAAFjhlAr4ZFr1ZtJx+e56rgT5jrvMui539MudypT7nTVwxUhflrB5JdPLTjBZjB6qP5cpv7BM/vSpwv1eOvkKmBbbRMhL20k+bZBRyyLr7Xrqf0i+Xsfifa8iy/Rc5joAAACwEin1xcu//MXPVNAlb+AWWcMnXL58mfbt22eOFod8KfNvfvt7cwQAAAAAAPIoNcInv4AhTE9Pq79F6CRtO2z5AAAAAACgPaUCPvm5M+GDDz5QI3ftkDSStlvY8gEAAAAAQHtKBXzy27YyrSpMTEzkBn1yTdJ0CylXygcAAAAAAMUotYZPkF+8kJ87s8j37MlXr9i3ca9du6amcbs5sic8/fSztHnLA+YIAAAAAAC0o3TAJ8hv28rPnd0ovr/1cRoaesIcAQAAAACAIiwq4BNkpE9+7mwpv6pFpnF/8IMnMbIHAAAAAFCCRQd8gvy2rfzcmfwChnwpcjeCPwny5G1ceUFD1uytWrXKXAEAAAAAAJ3QlYAPAAAAAAAsX0q9pQsAAAAAAG4dKh7wzdM/975AP97pb2PH5831xdM8vocmZs2Bx8c0sfc4Nc1RdxB9xilY3CKJ62HpXB8vz+ZxGnvnY3Nwi1NKl6Xwh3za12l5wnnr522pylx+LN3zKD42Ydqp2Xe60GaV8dnZcfqx8dnm8XH6Z8h5OU1x2fgZUG3wEtnsZuDY6Ibjlu3VwxL6ZZUo+Ux0M3640VQ84Oulx0bfpv0H3qbdQ73UP2L2t/aa6wCA7qGft+F+cwi6Qv/2m9Rm9e+g/aNbqWYOF0vz+CSRaoN3UGVcpMs26oibWTa4JVkxa/hkRKLRtyf5MJLjsWMmUq9to92BB0d61hMzer82tCdpdNPzHEQO8J9Bk6/0GPZO6h7XwHrqn7ub6tl83TS0noZV4yc9Mm4MB5vUUDL18n176DF1o/SKTW+txnnynw2jmQZTRgNmOC8jX6qrzrf2BNHEQd2TKaJHq97NVIZENsmby1GKWD1SPPsOcMM0NM/HLPvcpL7Hs7mrY6guwmW5ZSg5+yZpjG1eOzZJs1Lm9lpExkB5Ui8R+dxypNMwXIun9fJmVPp+95y2X/9MJk+vQhnpvZs6U/bbvj7sj9LjnNtIG6bHPT1rAfvn+Yj2PdJ120zLLuT3DrPvjBNtZzvn2FMj5b7NAYD1c/fYrW9Hhpifu/VBmXJy5QjVleiwh5p9NbaHtkGwfhTadsHnS8ptec61zC317tR1SFcZXRN/fowK6tJia0bZgX2PxpM6tG1MUmcqIeezd56v8f0hGTi9pwO3c80+Lk9kDulhcf3ZyEeuj1qZ3frK1qUQeC68c46tvXpU+fdSw9gosX2OXVw9k7Ky8o0QNaxPBvUv62PGt0xbL8+e+Lq189gclz3AeUvZ3O75tuW2InmmRf5UJ48WeUPtPO+q8ky7as7Xjpm2wNpF0cYHg+24e86Uye3PsmzH2Ud8O7v66foK2TzoR9n0cl4+I1Wb4dZXyGaLQAK+lbBdPfrqwoFpczz91sLI6PsLV821qfGRhdGjc156f5tbaIy+tTAl+969cn7E5OvuZ9NFNk6jy9X3JjLIveMzat+T7bP3F0ZHjBzuxucPOPKnuup8bV5ffT2zcGDk1YXGZ7wf1cPd5Lwtj+/1bGbykWORKykj3TybK9nTe0SvVEZHp8Qm5pg3yaelfkL2lXOOfcIyRsqLySfns+Xk6uLYUaUL2C+Up7t594U2RwelcyqL2MrWd9b+eT7i+ZhTl4kNPXtn9HS2qXEjl9IhZCNns7a36U25ns+7PhvTIVOWt0XliNeVpEmeGTkfrSudR/D5ctO5PhbypZC9+bzV9erRt5JzcV0cf3Htajd1r6OvU59JnanN99OwDGn6tK5Edzef1s3zR8+fnHwyOnpbpuzQOdf/3XpU5206ucfRMWYXdWw2t148+fhY2yik/+J8LK1fyTtNH/IRv851ucmx6OT4mN7a1JfIZO+R+13bJfaScqwt2vug1EH2XOo/6TmvPJXGt/dNbccDeumtiM1dXfz0yh+sfM69Yd3NcYltRb60MTv9MfU/kUbn/UPbiOZUCO0jvQW15kQi7Cbxv8y9vdQ/aHqxzY9pint8dRt+92+MRuLSW1PrCbm30EzKXU912yNO7uU8uQeXnK+tpw1pl6Ig3CtIemB8/8A8Xc3TQwjo7SNyzVPDro+UXsncvBnNyGFgW9LL7B80MondeNNre7I20dQGvkt0zF8zlq1DS43rMrVdQMa88kLyic1psnWtR0wX1wdqW6k+ELBfLE9Dc+YcUaKHQ6ReakMvJLKIrWpF6sIj9TEpuznDPVljnwm2YVt/iRGykQv7eY3zFVml3JpKI/Xm+LzINkRKhlycslrouK64hz3k1H+f3g0Tfr6Eluc8UO8xe0eJ6RLzaZeBHekokrQxzSsd+omW1/XNtF5Fd5ah4Hq23DY4Upeh5yJ7rraV9xP/T+ux1ldL24ZsnUbtktrUq5egfAH9F+ljYltps6jJ29AOqs+dpVli3eZYl4B9fEKfJy7h+pLRKOVDmTY9tV0vl211knbACFLAB1vb8eyznnJLtOMtxGwe8SMnfa2PbWmfh+TeiO7qWjnwlm4UeRiuUP2AXvc3LFNYXUAeKBmalzz3j25rCVhuPkX1luFlnUbr0hp8FUaGx928kg9QAz9wcn3DtDh+OszenoiM7crzMOtAB8/qB7Z44TmUyXNp/DGETO8ktpGy0pary8gH3Tma5Q+02ekabViycrqETIGZhrvdwu3wcx6u967YuyOfXhpkreH+EVIfbrfywnaNnnK7y1kD3o6u688f/NIhmp25QnfJEqFB9qtZDgL6QgFc57TIa6aKtQ+VmDpcce14ETr3I58ufs4yKzLgk0h+9mjas5k9NknEPUAP/hBq1u42xpVIW+2oSFx6pxr5oDIPtvR8mvLhpQ9pVnpjrUiELnmofendq70YNbqrxmXbjFSvxuxnaJqREpFVryGwuPcfV+tN5IM1qkdEbx8tV6MbjZqy2yQ1CjyA0kANm55Wtg5bicjYQXkeskB6xPS4Y5heZJK3sndObzySp+4Jy3oZh5x6Seve+DLbJlRk3EdSZCSkmS2bifrLIpERgikuL/0Q0yMPab2JrMR1qY+K6FCITutKkPoyDW+6Pi38fOU+5069x+zdEUV9eiZtk+QFitkBZyTBXFDn9W4QJa/rb4lPGORDnQPc4IyJQ6E2OEPoucieU/Kz3fNzyhC0S5OuNq0/dODvrv5lfMyD2zA6R41p3uN7an1EU0ftSHiXcOSVETKpX0Xk8ytKqXY8+6yHuAXa8VxK+pEi9jkrI4adBMwpt5m/Kwuu9GHuZYzt5EZGkAWT2WFlfhDqfTYN967MiEpt6wtU3yvD3nLUy+ftfRyJj3DvYe8L1JBD6ZGp8z4ydaGGaHm/xmnyfYh7JSPbaMykF0fsD92QkbXOvYir+grDjYP0qA7Kvl4MquSK6RHRW/Y39HEPcOc5vaB0dAdd3cn384ex0LJIm5HGuCmyqwWp5mQLbDducBIdmewC5pZFr2KDml+HqnxvWkR6dCEZI+XFKoIfdn/xPevIgXeYTH259nbtt/O7NHUgk6cL18EwyyrTtwrReXusXjh53xXVS1f5Ob7s2T9zv+8jDvxs7HbLVvJxbz/q94tERjEOSg84/RDr376Dppx6k/rR0y4FdShEvK46a0gjz1foOQ/5EkXsbY6Kwfe0eYYU7DNTMroh+zI6YmzutUnJVFqETNspL21o3A8hbYdcYm1w9NliIs+Fd87RqzARu9SHJk2+Rfw9rP/ifIzLHSRqzJnA3D4robZKXeNnZrqo/q3yqqDSPneRz6847X0w2I57z7qW4zHZTVhm7bhn5yKjbdJOdeJHLjHd9X4Z8EsblUYPJ9s3vUAFsW/sZTsstwrSEHOwNLzIqQoASiH+d6yXdt+EKXAAbjRYwwcAuAlIZ4R70HvP0YYRBHsAALDUYIQPAAAAAKDiYIQPAAAAAKDiIOADAAAAAKg4CPgAAAAAACoOAj4AAAAAgIqDgA8AAAAAoOIg4AMAAAAAqDgI+AAAAAAAKg4CPgAAAACAioOADwAAAACg4iDgAwAAAACoOAj4AAAAAAAqDgI+AAAAAICKg4APAAAAAKDiIOADAAAAAKg4CPgAAAAAACoOAj4AAAAAgIqDgA8AAAAAoOIg4AMAAAAAqDRE/wfUbrRa3dKW8gAAAABJRU5ErkJggg==)

  * This feature allows to update and overwrite screenshots with the same name, ensuring that the latest version is updated for that screenshot.

  * This capability provides users with more control over the management of screenshots with identical names, enabling them to maintain accurate visual records and efficiently track changes in their application's user interface over time.

**Notifications**

![Notifications Settings](data:image/png;base64,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)

Configure how you receive alerts and updates about your SmartUI project.

**Email Notifications**

Receive email notifications whenever there are changes found in your build or the project baseline changes.

**Settings:**

  * **Build Changes** : Get notified when visual differences are found in builds
  * **Baseline Changes** : Get notified when project baseline is updated
  * **Approver Changes** : Get notified when project approvers list is modified

**Use Case** : Stay informed about visual changes without constantly checking the dashboard.

**Slack Alerts**

Receive Slack alerts whenever there are changes found in your build.

**Setup:**

  1. Connect your Slack workspace in Project Settings
  2. Configure which events trigger Slack notifications
  3. Choose the Slack channel for notifications

**Use Case** : Integrate visual testing alerts into your team's communication workflow.

note

We are continually adding more notification channels for SmartUI.

**TestMu AI Badge**

Show the world that you are using TestMu AI for your visual regression testing.

**Badge Code:**
    
    
    [![This project is using Lambda test for visual regression testing.](https://smartui.lambdatest.com/static/media/LTBadge.64a05e73.svg)](https://lambdatest.com)  
    

**Use Case** : Add to your README or documentation to showcase your testing setup.

**Delete Project**

![cmd](https://www.testmuai.com/support/assets/images/delete-f4f9235dfb133336e4e74c0d3ed4fa1a.png)

The "Delete Project" option allows administrators or project creators to permanently delete a project. Once a project is deleted, it cannot be retrieved.

info

Only the **Admin** or **Creator** of the project can delete a project. Once deleted, a project cannot be retrieved.

## Additional Resources[â](https://www.testmuai.com/support/docs/smartui-project-settings#additional-resources "Direct link to Additional Resources")

  * [Comprehensive Troubleshooting Guide](https://www.testmuai.com/support/docs/smartui-troubleshooting-guide) \- Solutions for project configuration issues
  * [Baseline Management](https://www.testmuai.com/support/docs/smartui-baseline-management) \- Learn how to manage baselines effectively
  * [Handling Dynamic Data](https://www.testmuai.com/support/docs/smartui-handle-dynamic-data) \- Configure ignoreDOM/selectDOM for dynamic content
  * [Smart Ignore Feature](https://www.testmuai.com/support/docs/smartui-smartignore) \- Automatically ignore layout shifts
  * [Configuration Options](https://www.testmuai.com/support/docs/smartui-sdk-config-options) \- SDK configuration file options
  * [Running Your First Project](https://www.testmuai.com/support/docs/smartui-running-your-first-project) \- Get started with SmartUI
  * [Test Settings Options](https://www.testmuai.com/support/docs/test-settings-options/) \- Advanced comparison settings

---

*Auto-generated from TestMu AI documentation.*