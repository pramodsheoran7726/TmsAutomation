# Comparison Settings for SmartUI - Pixel to Pixel Comparison

> **Source**: [https://www.testmuai.com/support/docs/test-settings-options](https://www.testmuai.com/support/docs/test-settings-options)

**Product**: Settings and Security

**Last Crawled**: 2026-01-27T20:47:18.798773

---

On this page

* * *

## Our Pixel to Pixel (P2P) Comparison Options[â](https://www.testmuai.com/support/docs/test-settings-options#our-pixel-to-pixel-p2p-comparison-options "Direct link to Our Pixel to Pixel \(P2P\) Comparison Options")

We offer multiple options for comparing the **Baseline** and the **Test Output** screenshots captured during your automation testing suites.

Here are the following common test setting options -

  * `largeImageThreshold` \- Sets the pixel granularity at the rate to which the pixel blocks are created.
  * `errorType` \- Show the differences in the output screen by identifying the pixel changes type and capture the intended view.
  * `ignore` \- To remove the Pixel to Pixel false-positive rate in identifying the screenshot.
  * `transparency` \- To help adjust test transparency settings and strike a balance between highlighting in visual screening.
  * `boundingBoxes: [box1, box2]` \- By specifying a bounding box measured in pixels from the top left, you can narrow down the area of comparison.
  * `ignoredBoxes: [box1, box2]` \- By specifying a bounding box measured in pixels from the top left, you can exclude part of the image from comparison.
  * `ignoreAreasColoredWith` \- By specifying a RGBA color, you can exclude colored areas of the image from comparison.

## Examples with comparison settings[â](https://www.testmuai.com/support/docs/test-settings-options#examples-with-comparison-settings "Direct link to Examples with comparison settings")

* * *

### Image Threshold[â](https://www.testmuai.com/support/docs/test-settings-options#image-threshold "Direct link to Image Threshold")

The image threshold settings helps you in analyzing the granularity of the pixel resolution for each block which shall be created by the algorithm for the comparison.

You can specify the following `capability` in the following format:

  * Selenium
  * Cypress

Make changes in your your test configuration file
    
    
    let capabilities = {  
      
      /*  ....Your Selenium capabilities go here */  
      
      "smartUI.project": "<Your Project Name>" // Your SmartUI project name  
      "smartUI.options": {  
        "largeImageThreshold": 100 // The image threshold for comparison the min of 100 and max of 1200  
      }  
    };  
    

Add the following in your /project/lambdatest-config.json
    
    
    "smart_ui": {  
          "project": "<Your Project Name>" // Add your SmartUI Project Name here  
          "options": {  
            "largeImageThreshold": 100 // The image threshold for comparison the min of 100 and max of 1200  
          }  
        }  
    

![Image](https://www.testmuai.com/support/assets/images/image-threshold-sample-8ed71dfafcbaa0241a390ddc7fd20b3f.png)

* * *

### Error Identifier Types[â](https://www.testmuai.com/support/docs/test-settings-options#error-identifier-types "Direct link to Error Identifier Types")

The pixel to pixel comparison at which we offer for the error highlighting in the test output is determined by the changes in the `pixel` distribution for the **Baseline** screenshot to the **Comparison** screenshot. This feature will help in determining for the approver that the pixels can be easily identified.

The following are the supported options for the pixel comparison feature:

  * `movement` \- specifies the pixel movements
  * `flat` \- specifies the pixel value changes

You can specify the following `capability` in the following format:

  * Selenium
  * Cypress

Make changes in your your test configuration file
    
    
    let capabilities = {  
      
      /*  ....Your Selenium capabilities go here */  
      
      "smartUI.project": "<Your Project Name>" // Your SmartUI project name  
      "smartUI.options": {  
        "errorType": "movement" // To set the error identifier  
      }  
    };  
    

Make changes in your /project/lambdatest-config.json
    
    
    "smart_ui": {  
          "project": "<Your Project Name>" // Add your SmartUI Project Name here  
          "options": {  
            "errorType": "movement" // To set the error identifier  
          }  
        }  
      
    

![Image](https://www.testmuai.com/support/assets/images/Error-Type-Sample-d2a81a77f869dc30a89d02d70705b252.png)

* * *

### Ignore - P2P False Positives[â](https://www.testmuai.com/support/docs/test-settings-options#ignore---p2p-false-positives "Direct link to Ignore - P2P False Positives")

When the screenshot is captured and it is then compressed to a file format such as `.png,.jpg,.jpeg,etc..` then there is high chance of pixelation enhancement will be made to the screenshot to enhance the quality of the image. This could be mis-leading to a visual appearance on the browser for the comparison with the current **Baseline** version. We provide you with options to mitigate this risk of flakiness in your comparison output.

The following are the supported options for the pixel comparison feature:

  * `antialiasing` \- ignores the smoothing of edges in digital images.
  * `alpha` \- ignores the alpha of the pixel color and makes into solid color without any opacity, click [here](https://sites.uci.edu/iap2015/2015/01/14/the-alpha-attribute-of-a-picture/#:~:text=In%20digital%20images%2C%20each%20pixel,of%200%20means%20totally%20transparent.) to know more.
  * `colors` \- added corrected lightness to the screenshot by ignoring the default pixel color value.
  * `nothing` \- ignores none of the false positive options from the comparison.

You can specify the following `capability` in the following format:

  * Selenium
  * Cypress

Make changes in your your test configuration file
    
    
    let capabilities = {  
      
      /*  ....Your Selenium capabilities go here */  
      
      "smartUI.project": "<Your Project Name>" // Your SmartUI project name  
      "smartUI.options": {  
        "ignore": "antialiasing" // To set the ignore identifier  
      }  
    };  
    

Make changes in your /project/lambdatest-config.json
    
    
    "smart_ui": {  
          "project": "<Your Project Name>" // Add your SmartUI Project Name here  
          "options": {  
            "ignore": "antialiasing" // To set the ignore identifier  
          }  
        }  
      
    

![Image](https://www.testmuai.com/support/assets/images/Ignore-Differences-sample-5e7a176a19849d84875d0f492af621ff.png)

* * *

### Transparency[â](https://www.testmuai.com/support/docs/test-settings-options#transparency "Direct link to Transparency")

An advanced configuration to set the comparison view image to be displayed as a `opquae` or `transparent` for easy identification for the approver.

You can specify the following `capability` in the following format:

  * Selenium
  * Cypress

Make changes in your your test configuration file
    
    
    let capabilities = {  
      
      /*  ....Your Selenium capabilities go here */  
      
      "smartUI.project": "<Your Project Name>" // Your SmartUI project name  
      "smartUI.options": {  
        "transparency": 0.3 // minimum = 0 and maximum = 1 supports upto one decimal such as 0.1 to 0.9  
      }  
    };  
    

Make changes in your /project/lambdatest-config.json
    
    
    "smart_ui": {  
          "project": "<Your Project Name>" // Add your SmartUI Project Name here  
          "options": {  
            "transparency": 0.3 // minimum = 0 and maximum = 1 supports upto one decimal such as 0.1 to 0.9  
          }  
        }  
      
    

* * *

### Bounding Boxes - Compare only specific area[â](https://www.testmuai.com/support/docs/test-settings-options#bounding-boxes---compare-only-specific-area "Direct link to Bounding Boxes - Compare only specific area")

The bounding boxes are the areas created on the screenshot which needs to be compared with the baseline ignoring other areas from the screenshot.

This specific case is used to compare only a specific area of the screenshot from the **baseline**.

You can specify the following `capability` in the following format:

  * Selenium
  * Cypress

Make changes in your your test configuration file
    
    
    // Bounding box sample settings  
    const box1 = {  
    left: 100,  
    top: 500,  
    right: 800,  
    bottom: 300  
    };  
      
    const box2 = {  
    left: 800,  
    top: 50,  
    right: 20,  
    bottom: 700  
    };  
      
    let capabilities = {  
      
      /*  ....Your Selenium capabilities go here */  
      
      "smartUI.project": "<Your Project Name>" // Your SmartUI project name  
      "boundingBoxes" : [box1, box2] // Your bounding box configuration  
    };  
      
    

Make changes in your /project/lambdatest-config.json
    
    
    "smart_ui":{  
       "project":"<Your Project Name>",  
       "boundingBoxes":[  
          {  
             "left":100,  
             "top":500,  
             "right":800,  
             "bottom":300  
          },  
          {  
             "left":800,  
             "top":50,  
             "right":20,  
             "bottom":700  
          }  
       ]  
    }  
      
    

![Image](https://www.testmuai.com/support/assets/images/Bounding-Box-Sample-2f2653514352cfe1286039e6127b5975.png)

* * *

### Ignore Boxes - Ignore only specific area[â](https://www.testmuai.com/support/docs/test-settings-options#ignore-boxes---ignore-only-specific-area "Direct link to Ignore Boxes - Ignore only specific area")

The ignored boxes are the areas created on the screenshot which needs to be ignored with the baseline comparing the other areas from the screenshot.

This specific case is used to ignore only a specific area of the screenshot from the **baseline**.

You can specify the following `capability` in the following format:

  * Selenium
  * Cypress

Make changes in your your test configuration file
    
    
    // Bounding box sample settings  
    const box1 = {  
    left: 100,  
    top: 500,  
    right: 800,  
    bottom: 300  
    };  
      
    const box2 = {  
    left: 800,  
    top: 50,  
    right: 20,  
    bottom: 700  
    };  
      
    let capabilities = {  
      
      /*  ....Your Selenium capabilities go here */  
      
      "smartUI.project": "<Your Project Name>" // Your SmartUI project name  
      "ignoredBoxes" : [box1, box2] // Your bounding box configuration  
    };  
      
    

Make changes in your /project/lambdatest-config.json
    
    
    "smart_ui":{  
       "project":"<Your Project Name>",  
       "ignoredBoxes":[  
          {  
             "left":100,  
             "top":500,  
             "right":800,  
             "bottom":300  
          },  
          {  
             "left":800,  
             "top":50,  
             "right":20,  
             "bottom":700  
          }  
       ]  
    }  
      
    

![Image](https://www.testmuai.com/support/assets/images/Ignored-Box-Sample-e87bb6924ae0bedc9541a7f2101c6276.png)

* * *

### Ignore Areas Colored - Removes the colored content from the comparison[â](https://www.testmuai.com/support/docs/test-settings-options#ignore-areas-colored---removes-the-colored-content-from-the-comparison "Direct link to Ignore Areas Colored - Removes the colored content from the comparison")

You can exclude the pixels that match the specified color on a **baseline** image from the comparison view. This feature will ignore that specific regions with the color pixels and shows the comparison view.

You can specify the following `capability` in the following format:

  * Selenium
  * Cypress

Make changes in your your test configuration file
    
    
    // Bounding box sample settings  
    const color = {  
      r: 242,  
      g: 201,  
      b: 76,  
      a: 1  
    };  
      
    let capabilities = {  
      
      /*  ....Your Selenium capabilities go here */  
      
      "smartUI.project": "<Your Project Name>" // Your SmartUI project name  
      "ignoreAreasColoredWith" : color // Your bounding box configuration  
    };  
      
    

Make changes in your /project/lambdatest-config.json
    
    
    "smart_ui":{  
       "project":"<Your Project Name>",  
       "ignoreAreasColoredWith": {  
          "r": 242,  
          "g": 201,  
          "b": 76,  
          "a": 1  
      }  
    }  
      
    

![Image](https://www.testmuai.com/support/assets/images/Ignore-Colors-Sample-02e3ae13582ade51985bbd3b6c358b06.png)

---

*Auto-generated from TestMu AI documentation.*