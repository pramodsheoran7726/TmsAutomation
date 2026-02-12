# Git Branching Strategy in SmartUI Storybook Integration

> **Source**: [https://www.testmuai.com/support/docs/smartui-git-branching-strategy](https://www.testmuai.com/support/docs/smartui-git-branching-strategy)

**Product**: SmartUI

**Last Crawled**: 2026-01-27T21:03:33.605111

---

On this page

* * *

![Smart Visual Testing](https://www.testmuai.com/support/assets/images/git-doc-header-1002737dc729d188ad51654b0ffd98c4.webp)

info

This is the guide to understand our Git Branching with SmartUI projects which can detect the commit history and execute the appropriate actions for your visual regression testing.

### Prerequisites for running Git with SmartUI[â](https://www.testmuai.com/support/docs/smartui-git-branching-strategy#prerequisites-for-running-git-with-smartui "Direct link to Prerequisites for running Git with SmartUI")

  * You have an account with [LambdaTest](https://accounts.lambdatest.com).
  * You must have an active [subscription](https://www.lambdatest.com/pricing) plan with valid screenshots limit.
  * You must have created an Project on the SmartUI web app.

The following steps will guide you in running your Git branching Visual Regression test on TestMu AI SmartUI platform:

info

**Baseline Branch** : A baseline branch build is a set of screenshots which are captured using SmartUI where all the screenshots are compared against for the non-baseline branch builds.

**Non-Baseline Branches** : A non-baseline branch(s) build is a set of screenshots which are captured using SmartUI where all the screenshots are compared against with the **Baseline** build which are matched with the screenshot names.

![Smart Visual Testing](https://www.testmuai.com/support/assets/images/git-baseline-non-baseline-diff-1972ba6e4b455daac188cf5bf6fe82f8.webp)

### **Step 1** : Setup your Git Baseline branch in the Project Settings[â](https://www.testmuai.com/support/docs/smartui-git-branching-strategy#step-1-setup-your-git-baseline-branch-in-the-project-settings "Direct link to step-1-setup-your-git-baseline-branch-in-the-project-settings")

The following are the steps to add **Baseline** branch to your `StoryBook projects` with Git commits:

  1. Go to **Project Settings** page for the created project.
  2. Search for **Git Settings** and add your required **Baseline** branch in the input box.
  3. Click on **Update Settings** button to update the project settings and set your **Baseline** Git branch.

![Smart Visual Testing](https://www.testmuai.com/support/assets/images/git-settings-015c1828f20858727787ba36fa3dfe7c.webp)

Now, after the successful setup of your **Baseline** branch of your project.

### **Step 2** : Execute your SmartUI CLI with Git commits[â](https://www.testmuai.com/support/docs/smartui-git-branching-strategy#step-2-execute-your-smartui-cli-with-git-commits "Direct link to step-2-execute-your-smartui-cli-with-git-commits")

The following are the steps to execute your SmartUI CLI with Git commits on StoryBook projects:

  1. Go to your current **StoryBook** repository and run the following command:

    
    
    git init --y  
    

tip

You can ignore the above step if you already have a repository with `Git` initialized

  2. Now, make your changes in your `.stories` files and then commit the changes to your `Git`:

    
    
    git commit -m "Your commit message"  
    

  3. Execute your **SmartUI StoryBook CLI** command to execute the Visual Regression tests for your `.stories` files:

  * For Locally Hosted Server
  * For Static Build

    
    
    npm run storybook                                                 // Starts your local StoryBook server  
    smartui storybook http://localhost:6006 --config .smartui.json    // Captures all the stories running on local server  
    
    
    
    npm run build-storybook                                           // Creates a Static Build Folder of StoryBook Stories  
    smartui storybook ./storybook-static --config .smartui.json       // Captures all the stories added in the static build folder  
    

![Smart Visual Testing](data:image/webp;base64,UklGRlodAABXRUJQVlA4IE4dAABwkACdASo0A9AAPpFGnkulo6MhofH52LASCWdu4XHb/oJb/C+bHVf7ztvhPuzTO36CPMF/VTpX+YD9uPWF9FX+F9Qf+zf8DrFvQA8tr9zvhN/tn++/cD2j//prVfjX+j9n/+A/Ib0F8Nfmr3C/vfs4f4/hd61/0nol/J/tD98/v35EfOr92/tn23+jPxM/yftV+Qj8q/nf+j8QH/H7a/S/9d/kPUC9hvpH/N/xviOf3Hod9d/837gH8s/r/+v/OX4h/z3g7fh/9j7Af85/vX/S/wP5mfTJ/Qf+L/Vfm17a/p3/z/6r4CP6B/a/+32G/3s9nv91hiXpLtlnZJjD27l6S7ZZ2SYw9u5eku2Wdkl6u1K4tk0hpuzgzOghhGGJqzPceErbwU8g8s8e0pk2Tshs1LSB9g2cUhaQyZIakIiZkV/Pwa5ncvSXbLOyTGHt3L0l2yzskxh4/zJGiw7fKHlR5GIKt1Zf5M7FKpa7G2C6/2hv2bQCQhM5mccIfm9ekAud3srWD8xhRfFLS9/FjD27l6S7ZZ2SYw9u5eku2WXEox5L8RafzRwFVX+7PP/Dx5Z5/4ePLPP/Dx5Z5/4eOtx4w3cvSXbLOyTGHt3L0l2yzskxh7dy9Jdss7JMYe3Py+qdhtsm7w5ia3gPbuVvq/54LXctoidkmK6ESHBebSAI+sG7JMYe3PzQX1S+lBt7dpQWdkl7PbicvJkRHpNY2LcAMYazEKfG6n9slB3BT9GO5UaYe0KKrCWZyNkUGnd0WjqYq/LzPGmHtAT3GEt35LWDJGHHQBuXwuMmUEH5ekkb8cdrvdH1CYsm/Iv+NWkxh4ZZDwMB7jswlNjQmXtHG9jO2mgbXOkpTVpm9JccOfSv7LVWS7ZWx5/SmjMaTy7ZZ1XzeZtWb4dhPbLOq+TyOzvqkGuVUQmdWnJt6p/PhI8RLGQkWUt3qArA6un8ZDGkFtNMfDM8neIs/rTD1p5pw8rr91qw77KFmNWw0bVJdZitNpiU7DNVsZrmcmWXcibBss0IyiUh/osXHpFbqxtX6hlOPPPkvSS9o/RuaophHApxhxbFRupUbhzFBRXywFgl7DrlazRjjYFy9ZXU2hT87k2B9d/m0UG7JqjKxTGw69e/Zz5mjBFH3ZlWryM2ZhBOpjW9VyFkUtvHW7lrDkef4NeatgV/S8wKbIzyXtASMnxJkjKO9s6Ii78UFiyjD+GZEIFr0m0EkhlBvqJR6NZ542mNOsfOh3lXPHwFLRE/UEAdXkjgPtud4G4nTMQsnlx2NQWzljXvr4dPFp8ua6hn3WA4vDQ9HVjY+zSdYNcxxR+QLvbqeKYbzRRurZjVdwCIAjIhsE+86zyy/TtG1eTqGLAQ39401RgyO3US+Cux2zHiMvgRtt0WLAffSuyUepcF+Kg4k2yMyl9xB9UUB2U8BiSY/8U7jxZX0wEy4ZWhZfu86IaaNMaCW6l7O+vlUsjA4MNTWXUXI2k8xVZpyku2WdkmAeb0l2kbBTEH5ekoPgxAjTD27l6S7ZZ2SYw9u5eku2WdkmMPbuXpLtlnY4AA/v8RYAAD7n7JKDzx2HCXuLiN8gcqdvIIiF0GtAye64Y2d89xkOJ1AKU6ihtGjk2EwyaA2w9OssKAyroxIDgcq5rfxtffsAFRSEcs999F4MWoTDk8+Gc+H7eeTNjJFZzhHUB4/vznCKDmfaAdVb1s6pZCtGbTptIGSVKP5i1BYk8yp3SBl0gYprFLNcxBRbxfrU/zk7LBYlnvtHv69Bu1b9uIBd+tRv6nS8L2pwxLf8z1tc0x2PHMeRB7ADVcHbkSBv+rzmeWv/lXW+Z3QydHKC2PDzYxaeqA2VIlI/uTuG6SrDVv/KVHhhfLr+m9GMW3ZEvDvNsXpHxRBmyqp2Jd34R+oaxtfgn7vUo7wnDdYodjRDtnRMBTJ3n3gc9EFCR5lyGBThyjQKGI8EkQqFfERQa8XElcvtdZfS9OZ8ifjb+siafNcSc510SsYA3soAczp5gVKJ4no7nke9ic2/Pwjxrweov0uQ4tj/GXc/uey+ly4mLZ4oA7wPTqg1/INvRKuquUQuh77EOIW0EL4ArxXCS0NuwPAO7X/iUxFz67gf+/pa5hbPwpeUNRkq9H6voy/DgxJPj9Ea4gEqSlwSwvxIyCVPNEfiwE2k8+jwPWmmaZ6i9k8lOIr2lA87Sv9xEHKGkbLEmsxr2/jN67XtVDyKd1BJwubFqdiAtEHRKNXCfxihSZPuGFZ7E5X9pnPmkB8rlGqEdshoO875vPMx5JBjuOr+4fmk5WuN7UdpTjD7kQAEngU114plkTRRv9Mwt4rigdItHWFg2BLFjCPed/poaxbWnE7wX9KsoLkaq82e9zAYUOFT9Wb+o7qdSNtFEf6fX6lRWoAcGpYq+ebzPDvkaZfqaC98zxB8N2DJ+fwqEsIcI/RC6qQd/9lDFwdIryoh+deYFoQ6h6C+tK+z4FRDllhytoTV3obi30u17vE11BL7uyYYvQydACf6p3ZIAe47SW+ws8ye7KGTG6oZoa94XGp+r4Ekd5RZxBoz4z5RehqslhDEI06csZvOeBDrg7mrCOz22v8o2EQfbv45JqwtDglpsA8F6IsHQMGWVBJqkyCj7MNGLta2TzkDjMxZkJaiz77/rgACrTeINrjQAAAAAAHuqI2gkzpiRvKjet8zr6vves3QMn8IkC2Ez7Hk+SDPqZ1kikAvCAyuQZnNLVTDP6wfTHfg8S9ejgKmxDlP1TOdwOGA18+bvgC9nmW0Y/seTWB8WTAxTw5NoX+DSJy7+X3xAb/Xq3zdqLdXB6+SM4IsQNVhaL/Y7JbNA3A10U7YRZQA1fQvo/ptJhMCGiREfnqkttCGTrH552w8EsZVeJJrQ7PCo2OYpuRFD3H+NdJ2/k4u1+Zz2gl9Alz9oGWN9pNtqJX5EQCtdcX/w6O6U8sKS/HUgys47ET6uDp1oacBrZ4DWnIrpqxZ5h4DvbUVQV3ikWvgxCpEhKQdfQoG8x4jpnM7xLS2vgaN75T/dvgoc2wNUNMOl3wTWSl7NKYBP01G6ur3uGsAtqTBQBkP9e77eRhsNk54CHLmyDcBi7La2AVGMOmjeuVn13gtruXuHh4naWKsaoY53PdqNxEyIRqMA3ZEmXulBOnYNHAgWP0SYMsfm5rh/dL0hPeJzl9svUEjIsriLOEEl14eN6bpz5Qpclira/HdxHctYg5RsBv5kwJbzSrv2vknzUjWv7/boC6ostAnyLyb+XZI7XF+zp3plZWAFyj85s+qFozUyfsJ3Qhg05NwZx0TUKWL56nJuswGc3uGwkps9V1CAgg0E549b9kj8UUPSwWFBJJM5XJz+C5KuGZ6xO8mXr5JPAAwJJBc0FbW9/P/U1ahOg6MDEwXKvl9Ald62X1DjBfLxkNKBDF8V2Nz7opTJZeqAgxjmvLrYH80mEt6QIPQEENcFmfiZCrwkUYDiGM8DNSatpZ9crenUc9eQyYoiga/YV7irPw28itPcMmNc8rkE0Vj8m6YloxeQV/aHURoEMiuYagczqKFKT5rsXmuBLA5T99d6rkOMheeLeuGOnV3ADmh2u2jS+QeqkwZbdMIBg25p4EPmxXxbdgrrt38iTlS8Qf99sSBnCAT48+I3+uCON/TT5DIrSE+gl11of972Kim/W1r3hZu2D/GQgDhWsAr+yNxHBUbKHLxrVOWXwy8QyRYzGcUqEGbqpBlL8B78RLjWln7bvbv+wnWy3TsLipMGV6WTqHpQBBYa+cr09nWUqpExutwqxH62lW10y/oA+JRMIPot70yRPsVj9AO68xDKzaVjp8FBsx8xxZA0zHWUN/fWl2HnJvXoTgDiUTqCPxdPm+HFLjnnUIaciy+/EobjyYaIPf1LI5uTWPvhSzKo83uWCoHajtumOcmcqRK5ZEXN/Tjr8wraHtHS00Viu9lqo18VGdL+ojfXCPN7IbXbPh7pnahs8kpA0r6Gu/anMV+K60RMTzapGTTrruUT6RIa/hcIehrv3SeZfDRVsv3RWHznOreOZP2Upx7kJjJ1wwsWuOlqjDa8xNEcSulJW121mVIreq0wj6cR+xekHdjH2UAocHafvl85kQjb1DRmXdATOZiDiwWv0SC6F/nPPEW1cs/gx+FzKkEqdX0Y9EUHT1sLBVp8HT10W4j7BFk9DIDbePjpVGZHf5eyAub47KcEnQWCDHrEMQnTB9o5lOIYUkALE3eyUUHbqPdkZgIeUFYtqXsBjMHVyLuqj8iN+BbEmM+AOHGeYJRCdGkxTLz1T3zRkQff5mHj5BGn+IYvO4DERUcHfR2ERM7Q03M3wEmcv1LBsZtfIlSQAZXmBs6VMMEOu7sAxXm4aQ2T+KxEgxk6JRF9TPQ9m7eAT1MjxzVBn8iWoaJBWhJo6S0VRzLNxOGoQXo0bAAMxaPl7wwrQiekvAbGTIrCgNorRPPr7ssSO7i2WWzqrf6y0ifWf9NpDbYKu2NePQ+iAnWio3L5ikOnnk2LWxv9uQUxYzkHbQc7L2QZtDGALyoB/8EzR7wW/JkTq78R0mxnoAcdtWYH7CMUjjcsJtFB5+ETHKdyWbU/fBjBsH4r8xEdfboxbvIP0E9e2touR9MDVhSLKkhnGzyW0IOVVaqxQGCeaGQ6Dx0NEEQ/Z0RNJF4QFvGrctIowXQ9FyZ1bqs6ZbFz7DLOsQsl17cYAIIHh0gGufwZwGSDZueSglLLeoBys6q8JEBM6mBAwOqCe5tvOu6+C6r6PcBGBNimRSLmwoTzKzH5Btte81VWopvvFFdeQf+2zO+47j5VElFNuPa/I8lU+BfgOqq9gLe8rCQT2p5vEVXbOgxARWvFaK5psJ0u6hBzPMCetXwxeiegNLpVl/k+RivHvecTjZ+XmRt5+A5ewnHUhjcAGLGTW0G/M+5+GYmuioQ7bi/LXEsG9JCf3ghjqazLQhIVXBbH0DDpOJrB7kr/vbVUg4AYaqGuGD1nwIizLW0e4s1HdxUczHFd+KD/qdd/JHvCHuYAmrYeI3gHSRd4TJFBw4AKbGrFIexe8Z+QSU1z9tvrroPPK3q8kS83DH+0LnGzUJq6qwUkXS/IzTuNPx9lWqGHP7z8US1z/b9l4lbcwXFlI/FquvoZHdODEt+GJnStSVm3NtdBmSE9xn0rDGm9CQEDO+SmgvEw9i1/MP7Yax2859Tu4AE9ApV51CYzjV8jMuFjmXYIfZg+dJJuwbklD8R7+lf2MEd40YdvJKKF3tZAKrcxrhgDu4p/bLT3dHcy7ptehpElIVZ3NUHooMM2BYO1bGWxrLxYiofycwXHzrQgEiuGSeR1Tth2oFf2vt3V5zK6gqvuWgZdzVBeNIBRpDpGT1LVuoPrDa2TP3fBO0kNPOCHS54lNPeX8PZRYVx4mk+BVwZBpe5ExQIybWy/BaNpIAKZItVbQzs7HFpJbm69vFJol/9l728gmnSOz/Lft7CFtd1YHIY4WktSh41vExIN2pmLbRGBtyagOwyrHH+VJj/b7MY+O/3sq6vP+vSat6rH7VKx4QlUn2nDVH1Bheilt1vKjS3mMbeHoXuxTT28E+Dr4rPCle2TVoOtG+dmac+Ah5B83nlAbWLqwj3J3HzhLOyrTiMgXjQwbZzmEimHoY6VQxTZTIYbHimF29g9JXA1K5AzQuRiSty2CVAsRUNLsUF2QQwAENb7JhXJGblOQg6R/nnXiMn2O02C2T0zxBlZeRUbS73fNMxuZI2l/3vrwwWeiZ/6XatsQjiN+F/UE1K0bv3IkUKYiDuCuy5hKfk2gQvUff0u5q7RrCBTy6z3yxPaJFTTCDNjPIa/aZLkgJxddC/waQcYVkyjXa/npOaDGNmLyufXc7XAskQp/MB+666y2icmDfd8essykl6qm3mUxuvapNgEsl+zH9GYt0nm5fqgk82hUr79oRK9HG7S4s6nZQFRgQQX0krDBf3phK16MPq/NPG3R/qexqPOnh3BVgzJmzS34Wyn3bGy7lbtn4afMiIDQ1lb7cF44H0/uK5OSx6pEIhjJ2Z2tUWc4XqAcOmqs0O5b9NjEpuVZ+7G1WWCYvBW09KqU1bkz5/UT1Kbx8sG3Af/guGrVLvQCh+4aoy8tSREB1CQMjbEDkiXMcv/DqBZMEyEv9fUb7ZUVnyr3odXs6EZ7xidFRVp5s2PZw7KDHRNhQVjoEzYyni27tDDqyo+slm5hHAkz0yE7xUoPRwuMeBRfGqobBDvt55gwjndcYHxaET5Tl70KZtra9KG45aHsjMqo4Kis/PLyAMR2xVbr+rSUy/KJQHGAnG6RijMvTFDLgxLKNJ/vj0SOBHxmFv6HaUboP6AbIuESqNeFHW8I/LA55o+PTlJZc63n7yYlBtDysA4zxBcI36H/wTtaptRphUlqEHteNZ6cT05tu8rUM8L5QjVOEiSzEo3MIxDoARByy/H9M5Oa4R8lbAOen83sW2xH08aP6CgPO+pgr0if97IsdDiJO78d262jpHlw6qpKqcOarxepYAycptTm4gmJLuEkGkGGRU8cnLfka89W4HUkZ24igJCIhQ6hMv/PW9hAByxMDhZNa+HRGTXTjEAfFHAxhPIxyXsEQyYR5ThvcmFowg8rzJOFjJ1xCxfgY0rMDQHxxJaVXK9s6qUOS56BxHYeyHHTY2g4aquSgPC/FVyWtvcpK5UzAKtsKC9Ot8+YGpuOCYW0h+yaocVNOEHTdlHslJPCk22lu71xRCfgUkQ1dxkdmnbY9KnDTYdT3pkbO063GSekduM+hZfX7ALoyng9sPRc1jvSoJssEOeyX8nECHoPNdkMQJizLoydwjyMldy/Y0Ivp8yru8bt1dHnuANBIefaF3hgZPDk1kXzWU/ydNPvjaE8FSDLHVxzLw2+MIgvKLJLoO+/3H/1BOkEr5B1JSxPHEnE3FVfCv6vURyq3cAyEaRewj6A0BTtqWLTYlB73j6q6jYK7c2yrXpxsubaYhPu0r9KENgDXk/bqZMcMNpnac7fYiJA4/vcedjUk7jAoW/Yc3OLHWJbe2Gkjn8m5KVnzYa1N47X4+TiZBi3xs9DOhGVqeqXJBlNYef3dKzAUXjV/oUyIBpCjj6BCaInO6yriWPA2UYXo3rXGMligDhy2W6I9rZsyGiWi6Yn8BOss7uytAAAYEZF0532CWdo+5qRBLFEV5AGO0+uyiJxf4y3SoFVwbE7TBDYdsrxGG5P96d9thrlMzSQ+qI5s6mACEEY7V4HkNj0hykIeT4YCHOB6nGXzzvAnz1pdIvjOtkI8fcxS3FmZimAV92bPl18Qnm3lxBE1LJYKinzYcYhUFeTSfB1aAKqr3RmrjsTCnyk7dr63Usk59Q9GTFRPdMfzEmaGW3ZnERGGrrnh/+lP/mwtyx+QMXHvFOzELRhLhIMcwyGqMSK9v76gmR3DLCxfSPuYGmaND0xI+FZJSe7lPEn6LwJfUBLp7XPOG/PiPIF5LsveSCCYOrhRduEAQbbAhfR06t+dym4AtYYR6S42IBh/eOPTXS/+JcoMkWI3ZVzst5nA4IobZfJYvJiyq7ucN0MVXTetWzSxV0PW66x9wkKTivj02nNPvleGA6ZG5CHDJbSBTBecfrjguyzqmaNVqBn47QqyuT1hu87PfZhQrxSe3bjOrLxAl8bQaV08Dov/kW5br/0iVJ/NOfTqfPXXQl85nFKxpM0aurQZ4MczoA1WEUKoRVcLtVlyltY+HCYUXXuSDBX/a5IX0IReEq/hcp3TBGlln5BhkI79YGnlIrdIu2r/YP0DcWh5rCADliYHCygoP+OjgRygEf8HuMg2WPJi8GwWWthxYXbh3nTM6wXuiTF8XPvDvQIU3weRQ70DOBG2oCOtyBh1fF2Z8O1sbmgxlKhs8kesjo0MMhU/JOSp0h6cGTDatbP2xCOj1wjQjRnlZ/l05OySdj2LOzhF2AQpwMAy8DLIRv0Z0LZAbKEEFpGDX4RKRvmRLfGPdbm47zAw99XifnWm5LlXZz6w8Gp5UmN+3zRBfm4sCPzboMEUHXAQGedeEs+qD7ae3qOtQgnB/ELo50NVN0V2RppmFEPmQXrtt49hJvSSiytTRXbeI+R/RkqDe5YDSFn6yYtresb3Q/mEnY3a93oeNAZrvF2CzkEXh0OvYhKSqRM8rl1+ygPhll6FpST7KZ/pfOxYinpCpil3ceabutd35iJEYF1NWuD9cQdJ3ipnj3W1VYdXNjQ9ax9Zzk/aCdqgwfJXc27KR8x26L4dF45pW+dL+aZePV3QIPq8u7alco8ryYmRq4zAd/hcj32eT/SrMD/eOyYkQYr1Ocqyl7praPAVA7R4cg/9S8P3ZgnPdiI7YwNKOVRUzGIZLolqx3lKO9haeelawNcfQ7i3SGMVDVnUtt5o5qcdT0adZyMgT+R+kobTqNYesT2a4C8/iY7g2pLOQJWBryKsAEfFx0SDf7uHfSudo8JNt6irgcRe6AdSy2LAc6Ipu4A/iZy7fAgPKB/lLWltNBrIX1WxqAdEJAgWZhgnvm5d7w+98ndyL8VtJRRe71pv0/rVUbbZ1A98qu2QOArCxb8WcxP5vPvr5t/wGrZQx2klnAaRXvQYzxhUn4P4cp47y3DhnIhOf+GXN2o9RiVXVixvkXvS/WQ3ncDjSlETzkX37MrEav9GMKbr7kDNX8CMpPa+1nlhwGs9yaqCSi0McM8/CtZCj79MCaMpHgnR9IOiqkD2PScpyEeU3/UysPCaXG6vpaTTjytbiqL5ZRMc4Tm8M9lH7mvgAUDK7GiJkXBT/TfYTkCo+hvSS+aFdnd1QcE/M+9UH2dvEsmujWX9cT9b8C09UCbnMOMhDCX/zGpsKyzHXry4zSVh7bG6rqvvkn/hEMJD6eblUEUe49hBJSmqz3qyunLW9AYnGWXwSkkU5HdPOM4bkdQeUEbB1ZYwhyxiva4yZXU3ntJzFfX+8IaBcqIr/SjLWHqmueWSNvvVcA50y5gefhTPoYqt+0/nMNNJnZ25A9p0YM+eDpQhKch1Ng/u/mnvz4a581z9e2aA9AaQ7FS+r43rmFgXwQkHes+Wha70jZp617dU7LoInIX6+Jkn9smTXRWifWKW76WTNya5HsBVWBCyniilHISe9Pav1pGDNwJQ0cwOe2/T53ANKrthPlMzm/LE+UoC43q4/PYUZYydDjI3ayIUYBV3kjyYRhc3Po/bXj2Z49DYgXW0blTPQM9b04sESmEkKkD7DiXw1dYRvU6/mLUIl0O1a5GE6nlJObMYpN59rPIUHhck6X9lIV2tcIyy2Vwpn5RS2hk8WEISQUvvagLsy33dDaSQNT80rVSfKERLVBqFT4y2AbS8Ar6Ycxc0IXwvLikHeSsWz6X+XuClfBQN29wFgsS1ZgmbXiO7mHqzJjny26vCrWHYBny7SDgX63rKyLyJLw6sfSYqnHELqvCUfAbx9AKp9cp5XzUKa7wgMSLO+l4kRA6I75ND4sGB+wg3shOs3Ea9omGrvdjdXD5IhTLcFaAnuX1cWei+XZgOxc/DJStK+VNmCzyqU4+RW0Ib9kcnkrghg1TYMb4+cOwqKhId+/bqb9u/M2s5+QMaOSaz4E7lm3hPFwGTOArppiOK+2GsWHPeWCJPfCRHH+0nMG2N9gzacbkt9bOF0BzQiIXIHsgK5+ATkn17gxs2iRCEMDOgr094E/SLZI13VwFp8Gy3ZtgF+e63N8LN/4R+WUZZeLTFjzGjalxjWVkK5CwQ1Tz1h3x2/rUHVyiXx4Oz0ag2vp/k7guAM5WJSdTZscM6vLfCUO8Vouq2Z05/SHrzDMdqEbR5CjaS/C3SBg40StEjdboh3gNTH3DNS+EIPXI7Mf8esCcY69KG+/pQmdbDGxAWJWaq68cMEF0cGFXUamyRIIMuI4dauGcHLGlAw7QBu6OA15F7PAC5aG6XypWrFTZ7H2uv0y6+vClpWRDDAJyuVPTCOlUoeKl3vjpzfvKtyJ6Bkksq2SoEKk1hv7HS+kj9uRwcbuNpE4AAAAAAAAAAA==)

## Git Branching Workflows and Strategies[â](https://www.testmuai.com/support/docs/smartui-git-branching-strategy#git-branching-workflows-and-strategies "Direct link to Git Branching Workflows and Strategies")

### Ability to set the **Baseline Branch**[â](https://www.testmuai.com/support/docs/smartui-git-branching-strategy#ability-to-set-the-baseline-branch "Direct link to ability-to-set-the-baseline-branch")

You can set any `branch` name as your **Baseline** branch in the SmartUI project settings page. You can follow the steps below to set your baseline branch:

  1. Go to the SmartUI Web App.
  2. Select the project in which you want to configure the `Git` baseline branch for.
  3. Go to the project settings section by clicking on the top right icon on the `Builds` list page.
  4. In the project settings section you can provide the input of the `branch` name.
  5. Click on the `Update Settings` button to update the settings.

### Displaying the Git Commit Meta data[â](https://www.testmuai.com/support/docs/smartui-git-branching-strategy#displaying-the-git-commit-meta-data "Direct link to Displaying the Git Commit Meta data")

If you are using the `Git` based workflow with `SmartUI StoryBook CLI` then the following information is displayed on the UI of the SmartUI Web App - Builds list page:

  * **Branch Name** is set as the `Build Name` in the SmartUI project.
  * The latest **commit ID** of the Git commit added to the current repository.
  * The **commit message** of the Git commit of the `commit ID` to the current repository.
  * The commit author **username** of the Git commit to the current repository.

![Smart Visual Testing](https://www.testmuai.com/support/assets/images/smartui-git-build-meta-data-0ceaca495ada509242a092ca49a934ad.webp)

note

The above metadata is displayed only for StoryBook **Git** repositories.

### Git Baseline Branch Selection and Comparison Strategy:[â](https://www.testmuai.com/support/docs/smartui-git-branching-strategy#git-baseline-branch-selection-and-comparison-strategy "Direct link to Git Baseline Branch Selection and Comparison Strategy:")

### Working on the same branch name[â](https://www.testmuai.com/support/docs/smartui-git-branching-strategy#working-on-the-same-branch-name "Direct link to Working on the same branch name")

In this workflow, if you are working on the same branch name and want to execute the `SmartUI StoryBook CLI` command to run the Visual Regression tests for your `.stories`.

And, if you have created a project and set your **Baseline** branch name to `master` then executed the following commands:
    
    
    // Your current branch name  
    $ git branch  
    * <Your Current Active branch>  
      <--Other branches-->  
      
    // Adds a new commit to your current active branch  
    $ git commit -m "Your commit message"  
      
    // Executing the SmartUI StoryBook tests  
    $ smartui storybook <Your localhost URL or Static Build folder path> --config .smartui.json  
    

Then, a new build will be created with your `Current Active Branch` on the SmartUI Web App - Build Lists page for the project in which the `SmartUI CLI` command is executed.

If the current Baseline build branch is set to `Current Active Branch` in the SmartUI project settings, then SmartUI will compare the screenshots captured to the latest `APPROVED` status build of the `Current Active Branch` branch available in the same project.

Here is an example of the above workflow:
    
    
    $ git branch  
    * master  
      
    $ git commit -m "Second Build Changes"  
      
    $ smartui storybook http://localhost:6006 --config .smartui.json  
    

![Smart Visual Testing](https://www.testmuai.com/support/assets/images/git-working-on-same-branch-97ab0f0958b9012db9425348861b234c.webp)

### Updating the Baseline Branch Name[â](https://www.testmuai.com/support/docs/smartui-git-branching-strategy#updating-the-baseline-branch-name "Direct link to Updating the Baseline Branch Name")

In this workflow, if you have created a SmartUI project on the Web App and have executed few builds with a `Branch Name: Master` and want to switch your **Baseline** branch to `development` branch in your `Git`, then following will be the workflow that will help you in switching the **Baseline Branch** for your project:

  1. You have to go to the `SmartUI Project Settings` page to update your **Baseline Branch** in the project settings from `master` to `development`.
  2. Make changes in your `.stories` folder files in your repository.
  3. Now, execute the `SmartUI StoryBook` CLI command to run the Visual Regression tests.
  4. Then, SmartUI algorithm will check for existing latest `build` with `development` run on the SmartUI project in Builds history.

The following are the cases that SmartUI will update the **Baseline** build for the branch set in your SmartUI project settings:

##### **Case 1** : If a build with development branch exists in build history[â](https://www.testmuai.com/support/docs/smartui-git-branching-strategy#case-1-if-a-build-with-development-branch-exists-in-build-history "Direct link to case-1-if-a-build-with-development-branch-exists-in-build-history")

In this case, the latest build run on the SmartUI project build history will be updated as a **New Baseline Build** in which the new **Non-Baseline** builds will be compared against.

##### **Case 2** : If a build with development branch does not exist in build history[â](https://www.testmuai.com/support/docs/smartui-git-branching-strategy#case-2-if-a-build-with-development-branch-does-not-exist-in-build-history "Direct link to case-2-if-a-build-with-development-branch-does-not-exist-in-build-history")

In this case, the new build run with the `development` git branch name will be set to the current **Baseline** build for the SmartUI project.

![Smart Visual Testing](https://www.testmuai.com/support/assets/images/git-updating-baseline-branch-8b81e22fce0d0c1ea28419a1077e45cf.webp)

### Detect changes for Git commit added to **Baseline Branch**[â](https://www.testmuai.com/support/docs/smartui-git-branching-strategy#detect-changes-for-git-commit-added-to-baseline-branch "Direct link to detect-changes-for-git-commit-added-to-baseline-branch")

In this workflow, if I make changes in the set Baseline branch in the SmartUI project that is master and make an commit to the Git then,

Execute `SmartUI Storybook CLI` commands to execute the `.stories` tests will compare the results with the latest **APPROVED** build run for **Baseline Branch** build in the SmartUI project.

![Smart Visual Testing](https://www.testmuai.com/support/assets/images/git-compare-with-latest-build-205fcb170855454080771f2fdeb9a5ed.webp)

note

On approval of the all the screenshots then the new build will be updated as Baseline build for the baseline branch.

Here is an example of the above workflow:
    
    
    // Step 1 - Commit changes to Git  
    $ git commit -am "Changes in login stories"  
    (git) Changes added to your branch  
      
    // Step 2 - Execute SmartUI CLI to trigger Build in the SmartUI project  
    $ smartui storybook http://localhost:6006 --config .smatui.json  
    

### Comparing Non-Baseline Branch builds with **Baseline** branch builds[â](https://www.testmuai.com/support/docs/smartui-git-branching-strategy#comparing-non-baseline-branch-builds-with-baseline-branch-builds "Direct link to comparing-non-baseline-branch-builds-with-baseline-branch-builds")

In this workflow, if you want to compare a **non-baseline branch build** to a **baseline build** the following are steps to be followed:

Step 1: Checkout to a non-baseline branch in your `Git` repository.

Step 2: Then run the SmartUI CLI command to execute the tests should compare the screenshots captured of **Non-Baseline** branch build with the **Baseline branch** latest **APPROVED** build in the SmartUI project.

Here is an example of the above workflow:
    
    
    // Baseline Branch  
    $ git branch  
    * master  
      
    // Non-Baseline branch  
    $ git checkout -b develop  
    * develop  
      master  
      
    // Executing SmartUI Build with Non-Baseline Git branch  
    $ smartui storybook http://localhost:6006 --config .smartui.json  
    

![Smart Visual Testing](https://www.testmuai.com/support/assets/images/git-baseline-non-baseline-25e58f8c96db963c9fc09d45df1db020.webp)

### Auto Updating **Baseline** build for the **Baseline** branch[â](https://www.testmuai.com/support/docs/smartui-git-branching-strategy#auto-updating-baseline-build-for-the-baseline-branch "Direct link to auto-updating-baseline-build-for-the-baseline-branch")

In this workflow, once all the `Changes Found` are approved by the `approver` for the screenshots in the **Baseline** branch's **Non-Baseline** build then the `latest` approved **Baseline Branch** build will be updated to the `Baseline`.

![Smart Visual Testing](https://www.testmuai.com/support/assets/images/git-auto-update-baseline-build-13359e272bf5d02dbef34920b67c9718.webp)

note

In case if the **Baseline** branch does not have an existing build then by default the new build run will be set as Baseline build.

### Running Force Builds[â](https://www.testmuai.com/support/docs/smartui-git-branching-strategy#running-force-builds "Direct link to Running Force Builds")

In this workflow, If you have not added any commit to your current `Git` in the repository after making the changes then SmartUI will consider that no changes are made to your `.stories` files, then you will need to use the following command to execute the build:
    
    
    $ smartui storybook <Your localhost URL or Static Build folder path> --config .smartui.json --force-rebuild

---

*Auto-generated from TestMu AI documentation.*