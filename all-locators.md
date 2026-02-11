# TMS Playwright Automation — Complete Locator Reference

> Auto-generated locator inventory for every page object in the project.

---

## Common Locators (`src/pages/common/common.locators.ts`)

| Locator Name | Selector | Type |
|---|---|---|
| deleteSpan | `//span[text()='Delete']` | static |
| editSpan | `//span[text()='Edit']` | static |
| createSpan | `//span[text()='Create']` | static |
| nextSpan | `//span[text()='Next']` | static |
| cancelSpan | `//span[text()='Cancel']` | static |
| duplicateSpan | `//span[text()='Duplicate']` | static |
| passedSpan | `//span[text()='Passed']` | static |
| activeSpan | `//span[text()='Active']` | static |
| unlinkSpan | `//span[text()='Unlink']` | static |
| typeDeleteInput | `//input[@placeholder='Type DELETE to confirm']` | static |
| deleteConfirmButton | `//button[text()='Delete']` | static |
| duplicateConfirmButton | `//button[text()='Duplicate']` | static |
| saveNormalizedButton | `//button[normalize-space()='Save']` | static |
| tagsInput | `input[placeholder='Add Tags separated by enter']` | static |
| fileInput | `input[type='file']` | static |
| openMenuButton | `//button[@aria-label='Open menu']` | static |
| initialPromptChevron | `//span[text()='Initial prompt']//following-sibling::div//*[contains(@class, 'octicon-chevron-right')]` | static |

---

## Project Locators (`src/pages/project/project.locators.ts`)

| Locator Name | Selector | Type |
|---|---|---|
| loadingProjects | `//div[text()='Loading Projects']` | static |
| newProjectCta | `(//button[@aria-haspopup='true'])[1]` | static |
| createProjectCta | `//div[text()='Create new']` | static |
| newProjectCtaOverlay | `//span[text()='Create Project']` | static |
| projectTitle | `input[placeholder='Enter project name']` | static |
| projectDescription | `textarea[placeholder='Add description to the project']` | static |
| projectTag | `input[placeholder='Add Tags separated by enter']` | static |
| projectCreate | `//span[text()='Create']` | static |
| projectCreateFL | `//span[text()='New Project']` | static |
| saveChangesButton | `//span[text()='Save Changes']` | static |
| projectUpdatedToast | `.go3958317564` | static |
| projectEditButton | `//span[text()='Edit']` | static |
| projectDeleteButton | `//span[text()='Delete']` | static |
| projectDeleteConfirmInput | `//input[@aria-label="Search"]` | static |
| projectDeleteConfirmation | `//span[text()='Delete Project']` | static |
| projectDeleted | `//*[contains(text(),'Sample Project')]` | static |
| backToProjectList | `(//span[span[text()='Test Manager']])[1]` | static |
| projectListPage | `//h5[text()='Projects']` | static |
| backOnProjectPageCustom | `//span[a[span[text()='Projects']]]` | static |
| backOnProjectPageFromFieldPage | `(//span[normalize-space(text())='Projects'])[2]` | static |
| searchProject | `//input[@aria-label='Search Projects']` | static |
| createdProject | `` //a[text()='${name}'] `` | dynamic |
| createdProjectTC | `` //span[text()='${name}'] `` | dynamic |
| createdProjectAutomation | `` //span[text()='${name}'] `` | dynamic |
| createdProjectNameInTC | `` (//span[text()='${name}'])[1] `` | dynamic |
| createdProjectNameBulkEdit | `` (//span[text()='${name}'])[2] `` | dynamic |
| projectTripleDotButton | `` //div[div[div[a[text()='${name}']]]]//div[2]//button `` | dynamic |

---

## Test Case Locators (`src/pages/test-case/test-case.locators.ts`)

| Locator Name | Selector | Type |
|---|---|---|
| createTestcaseCta | `//span[text()='Add Test Case']` | static |
| createTestcaseByField | `//span[text()='Add Test Case']` | static |
| createTestcaseByInputField | `input[placeholder='Type your test case title and press enter']` | static |
| createTestcaseByGrid | `input[placeholder="Type your test case title and press enter"]` | static |
| searchTcInput | `//input[@placeholder='Search by Test Case ID or Title']` | static |
| selectFunctionalTestType | `//span[text()='Functional']` | static |
| selectTestType | `//span[text()='{{type}}']` | static |
| selectAutomatedAutomationStatus | `//span[text()='To Be Automated']` | static |
| selectHighTestPriority | `//span[text()='{{priority}}']` | static |
| selectOpenTestStatus | `//span[text()='Live']` | static |
| attachmentInTestcase | `#fileInput` | static |
| verifyAttachmentInTestcase | `//span[text()='sampleexample.txt']` | static |
| stepNav | `//span[text()='Test steps']` | static |
| createStep | `//p[@data-placeholder='Enter Step Description']` | static |
| addStepOutout | `//p[@data-placeholder='Enter Step Outcome']` | static |
| aiButton | `//span[text()='Generate with AI']` | static |
| createStepCta | `//button[@id="new-step-manual"]` | static |
| openMenu | `//button[@aria-label='Open menu']` | static |
| verifyAiTeststep | `(//div[@class='reactjs-tiptap-editor'])[3]` | static |
| attachmentInTeststep | `(//button//*[local-name()='svg' and contains(@class,'lucide-image-up')])[1]` | static |
| attachmentInTeststepUpload | `(//button[text()='Upload'])[2]` | static |
| verifyAttachmentInTeststep | `//span[text()='Screenshot0.png']` | static |
| saveTestCase | `//span[contains(text(), 'Save Changes')]` | static |
| saveTestCaseCommitMessage | `(//span[contains(text(), 'Save Changes')])[2]` | static |
| testcaseDeleteButton | `//span[text()='Delete']` | static |
| testcaseDeleteOpenMenu | `(//button[@data-component='IconButton' and @aria-haspopup='true'])[1]` | static |
| testcaseDeleteConfirmation | `//span[text()='Delete']` | static |
| saveTestStep | `//span[contains(text(), 'Save Changes')]` | static |
| backFromEditTC | `//span[text()='Test details']` | static |
| testcaseBreadcrumb | `(//span[text()='Test Manager']//ancestor::button//following-sibling::div//button)[1]` | static |
| tcDiscard | `//span[text()='Discard Changes']` | static |
| tcId | `//span[contains(text(),'#TC-')]` | static |
| tcInput | `(//span[contains(.,'TC-')])[1]` | static |
| addTagTc | `//input[@placeholder='Add Tags separated by enter']` | static |
| addTagTcInputField | `//input[@placeholder='Add Tags separated by enter']` | static |
| addTagFieldTc | `//input[@placeholder='Type to add a tag']` | static |
| selectAllCheckbox | `(//input[@aria-checked="true"])[3]` | static |
| selectTestcaseTestcasePage | `#all` | static |
| selectSingleTestcase | `(//input[@type='checkbox'])[2]` | static |
| threeDots | `(//span[@class='ant-tree-title']//div[@role='button']//div[@class='cursor-pointer'])[2]` | static |
| typeDropdownTestcaseStage | `//span[text() = 'Type']//following-sibling::div//button` | static |
| automationDropdownTestcaseStage | `//span[text() = 'Automation Status']//following-sibling::div//button` | static |
| priorityDropdownTestcaseStage | `//span[text() = 'Priority']//following-sibling::div//button` | static |
| statusDropdownTestcaseStage | `//span[text() = 'Status']//following-sibling::div//button` | static |
| linkAllCheckStage | `(//*[@class='Checkbox__StyledCheckbox-sc-1ga3qj3-0 cZZRyo'])[1]` | static |
| linkSingleProjectStage | `(//*[@class='Checkbox__StyledCheckbox-sc-1ga3qj3-0 cZZRyo'])[2]` | static |
| automationStatusManual | `//span[text()='Not Automated']` | static |
| automationStatusAutomated | `//span[text()='Automated']` | static |
| testcasesCountInsideTestcasesPage | `//h5[normalize-space()='All Test Cases']/following-sibling::span` | static |
| allTestCasesCount | `//h5[text()='All Test Cases']/following-sibling::*[1]` | static |
| manualTestingTag | `//span[text()='manual']` | static |
| automationTestingTag | `//span[text()='automation']` | static |
| selectionBanner | `//p[text()=' Test Cases are selected.']` | static |
| clearSelection | `//span[text()='Clear Selection']` | static |
| runTestCase | `//button[@aria-labelledby="Run Test Case"]` | static |
| createdTC | `` //a[text()='${title}'] `` | dynamic |
| selectTC | `` //span[text()='${title}'] `` | dynamic |
| createdTCEditor | `` //h5[text()='${title}'] `` | dynamic |
| createdTeststep | `` //p[text()='${title}'] `` | dynamic |
| createdTcTag | `` //div[text()='${tag}'] `` | dynamic |
| manualStepDropdown | `(//span[text()='Manual Test Steps'])[1]` | static |
| scenarioTypeDropdown | `//span[text()='BDD Scenarios']` | static |
| scenarioTypeSelected | `//span[text()='Behaviour Driven Development']` | static |
| scenarioField | `(//div[@class='view-lines monaco-mouse-cursor-text'])[last()]` | static |
| addScenarioCta | `(//span[text()='Add scenario'])[2]` | static |
| addScenarioButton | `(//span[text()='Add scenario'])[1]` | static |
| scenarioCount | `//span[@data-component='trailingVisual']//span[@aria-hidden='true']` | static |
| scenarioItems | `//span[@aria-label='Delete Scenario']` | static |
| scenarioDuplicate | `//*[name()='svg' and contains(@class, 'octicon-duplicate')]` | static |
| scenarioDelete | `//span[@aria-label='Delete Scenario']` | static |
| scenarioDeleteConfirmation | `//span[text()='Delete']` | static |
| scenarioAccept | `//span[text()='Accept']` | static |
| scenarioReject | `//span[text()='Reject']` | static |

---

## Test Run Locators (`src/pages/test-run/test-run.locators.ts`)

| Locator Name | Selector | Type |
|---|---|---|
| createTestRunCta | `//button[contains(.,'Create Test Run')]` | static |
| createTestRunButton | `//button[contains(.,'Create Test Run')]` | static |
| createTestPlanNextCta | `//span[text()='Next']` | static |
| addTcTestRunCta | `//span[text()='Add Test Cases']` | static |
| saveTestRunCta | `//button[contains(.,'Create Test Run')]` | static |
| testRunTitle | `input[placeholder='Enter Test Run name']` | static |
| testRunDescription | `textarea[placeholder='Add description to the Test Run']` | static |
| testRunTag | `input[placeholder='Add Tags separated by enter']` | static |
| nextCtaForTP | `//span[text()='Next']` | static |
| missingMsgTR | `//span[text()='Missing Assignee, Configurations']` | static |
| addConfigCtaTP | `//div[text()='Add a Configuration']` | static |
| selectConfigCheck | `//label[.//input[starts-with(@id, 'select-checkbox')]]` | static |
| selectConfigButton | `//span[text()='Set Configuration']` | static |
| applyConfiguration | `//span[text()='Apply']` | static |
| selectConfigCtaConfPopup | `(//span[text()='Select Configuration'])[2]` | static |
| selectAssigneeTRPageButton | `(//span[text()='Select Assignee'])[2]` | static |
| selectAssigneeTRPageButton1 | `//span[text()='Select Assignee']` | static |
| selectAssignee | `(//span[@class='Item__TextContainer-sc-y6iv6t-3 bvbgsO'])[1]` | static |
| testRunNav | `//*[@role='tab' and contains(.,'Test Runs')]` | static |
| selectAllCheckboxInTpTestcase | `//input[@id='all' and @type='checkbox']` | static |
| selectAllCheckboxInTrInstances | `(//input[@class='Checkbox__StyledCheckbox-sc-1ga3qj3-0 cZZRyo'])[1]` | static |
| updateTestcaseInTestRun | `(//span[text()='Update'])[1]` | static |
| selectConfigInTRPage | `//label[.//input[starts-with(@id, 'select-checkbox')]]` | static |
| selectInstancesInBulk | `//input[@type='checkbox']` | static |
| backtoTestRunList | `//span[text()='Test Run']` | static |
| backtoTestRunListPage | `//span[text()="Test Run"]` | static |
| historyExecutionNav | `//span[text()='Runs']` | static |
| editCtaInsideTR | `//span[text()='Edit']` | static |
| deleteInsideTR | `//span[text()='Delete']` | static |
| deleteTestRunCta | `//span[text()='Delete Test Run']` | static |
| testrunDeleteButton | `//span[text()='Delete']` | static |
| setTPClose | `//div[text()='Set as ']` | static |
| setTPActive | `//span[text()='Set as ']` | static |
| duplicateTestRun | `//span[text()='Duplicate Test Run']` | static |
| viewDropdown | `//span[contains(text(),'View:')]` | static |
| viewClosedTP | `//span[text()='Closed']` | static |
| viewActiveTR | `//span[text()='Active']` | static |
| editTR | `//span[text()='Edit Test Run']` | static |
| addTcInTR | `//span[text()='Add Test Cases']` | static |
| archiveTestRun | `//span[contains(text(),'Set as Archive')]` | static |
| archivedTestRun | `//span[text()='Archived']` | static |
| activeTestRunFromList | `//span[text()='Set as Active']` | static |
| activeTestRun | `//span[text()='Active']` | static |
| tcStatusPassed | `//div[span[text()='Passed']]` | static |
| tcStatusPassedButton | `//span[text()='Passed']` | static |
| tcStatusPassedInstancesPageBulk | `//div[text()='Passed']` | static |
| tcStatusFailed | `//div[span[text()='Failed']]` | static |
| tcStatusFailedSdk | `//span[span[text()='Failed']]` | static |
| tcStatusSkip | `//div[span[text()='Skipped']]` | static |
| tcStatusSkipButton | `//span[text()='Skipped']` | static |
| tcStatusNotStarted | `(//span[text()='Not Started'])` | static |
| testRunStatusDropdown | `(//span[text()='In Progress'])[1]` | static |
| testRunStatusPassed | `(//span[text()='Passed'])[2]` | static |
| manualRunRemark | `//span[@aria-label='Not verified on LambdaTest']` | static |
| runTestInstances | `//span[text()='Run Test Instances']` | static |
| bulkAssigneeDropdown | `//span[text()='Set Assignee']` | static |
| bulkSelectAssignee | `(//span[@class='Box-sc-g0xbh4-0 avjpQ'])[1]` | static |
| bulkStatus | `(//span[text()='Not Started'])[2]` | static |
| bulkStatusDropdown | `//span[text()='Set Status']` | static |
| searchFieldInLinkProject | `//input[@aria-label='Find a test run']` | static |
| testplanBackButton | `//span[text()='Test Plans']` | static |
| createdTestrunAppear | `` //a[text()="${name}"] `` | dynamic |
| createdTestrunAppearDashboard | `` //span[text()="${name}"] `` | dynamic |
| testrunStepInstances | `` (//span[text()="${name}"]) `` | dynamic |
| createdTestrunAppearInstancesPage | `` //span[text()="${name}"] `` | dynamic |
| duplicateTestRunByName | `` //span[text()="Copy of ${name} 1"] `` | dynamic |
| testrunNavigation | `` (//span[text()='${name}'])[1] `` | dynamic |
| duplicateTestRunNavigation | `` (//span[text()="Copy of ${name} 1"])[1] `` | dynamic |
| createdTestrunOpenMenu | `` //a[normalize-space(text())='${name}']//ancestor::div[contains(@class,'flex justify-between')]//button `` | dynamic |
| instanceStatusDropdown | `//span[text()='Not Started']` | dynamic |
| instanceStatusDropdownAfter | `(//span[text()='Not Started'])[1]` | dynamic |
| testcaseButtonsOnInstancesPage | `` //a[text()='${title}']/following::span[text()='Not Started'] `` | dynamic |
| testcaseStatusInstancesPage | `` //a[text()='${title}']/following::span[text()='Not Started'] `` | dynamic |
| markStatusButtonForTestcase | `` //div[contains(@class,'tm-flex-row')][.//span[contains(normalize-space(.),'${name}')]]//button[.//span[normalize-space(text())='Mark Status']] `` | dynamic |
| testStepsStatus | `` //p[text()='${status}']/following::span[text()='Mark Status'] `` | dynamic |
| testStepsStatusSdk | `` //div[div[div[span[text()='${status}']]]]//button `` | dynamic |
| testStepsStatusCollapse | `` (//div[div[div[div[span[text()='${status}']]]]]//button)[4] `` | dynamic |
| tcStatusSdk | `` (//div[div[div[div[span[text()='${status}']]]]//button)[2] `` | dynamic |
| addConfigFromInstancesCta | `//span[text()='Add Configuration']` | static |
| addConfigFromInstancesSelect | `//label[.//input[starts-with(@id, 'select-checkbox')]]` | static |
| addConfigFromInstancesApply | `//span[text()='Apply']` | static |
| addVariableOs | `//input[@placeholder='Enter OS']` | static |
| addVariableBrowser | `//input[@placeholder='Enter Browser']` | static |
| addVariableResolution | `//input[@placeholder='Enter Resolution']` | static |
| addVariableUrl | `//input[@placeholder='Enter URL']` | static |
| addVariableSave | `//button[normalize-space()='Save']` | static |
| addVariableCta | `//span[text()='Add Variable']` | static |
| executionHistoryTab | `//span[text()='Execution History']` | static |
| executionHistoryStatus | `` //span[text()='${status}'] `` | dynamic |

---

## Folder Locators (`src/pages/folder/folder.locators.ts`)

| Locator Name | Selector | Type |
|---|---|---|
| createFolderMainCta | `//button[contains(.,'Create New Folder')]` | static |
| createFolderButton | `//button[contains(.,'Create New Folder')]` | static |
| folderTitleField | `//input[@placeholder='Enter root folder name']` | static |
| folderNameInput | `//input[@placeholder='Enter folder name']` | static |
| createFolderSubmit | `//button[text()='Create']` | static |
| createSubFolderButton | `//button[@aria-label='Create subfolder']` | static |
| createSubFolderForFolder | `` //span[text()='${name}']/../following-sibling::button/button[1] `` | dynamic |
| createAnotherFolder | `//*[contains(@class,'octicon octicon-plus')]//parent::button` | static |
| subFolderTitleField | `//input[@placeholder='Enter folder name']` | static |
| defaultFolderName | `(//span[text()='Untitled'])[1]` | static |
| deleteFolderConfirmation | `//span[text()='Delete']` | static |
| deleteFolderButton | `//span[text()='Delete Folder']` | static |
| deleteFolderConfirmInput | `//input[@placeholder='Type DELETE to confirm']` | static |
| deleteFolderConfirm | `//button[text()='Delete']` | static |
| renameFolder | `//span[text()='Rename']` | static |
| renameFolderButton | `//span[text()='Rename']` | static |
| saveFolderButton | `//button[text()='Save']` | static |
| deleteFolder | `//div[contains(@class,'Overlay__StyledOverlay')]//span[text()='Delete']` | static |
| expandFolder | `//span[@aria-label='caret-down']` | static |
| addFolderCta | `(//button//*[name()='svg' and contains(@class, 'octicon-plus')])[2]` | static |
| banner | `//*[contains(@class,'octicon')]/following-sibling::p` | static |
| selectionViaHyperLink | `//*[contains(@class,'octicon')]/following-sibling::p/button` | static |
| bulkActionCta | `(//span[text()='More'])[2]` | static |
| bulkActionsButton | `//button[text()='Bulk Actions']` | static |
| bulkActionCopy | `//span[text()='Copy']` | static |
| bulkActionMove | `//span[text()='Move']` | static |
| copyTestCasesButton | `//span[text()='Copy Test Cases']` | static |
| moveTestCasesButton | `//span[text()='Move Test Cases']` | static |
| selectFolderDropdown | `//button[text()='Select Folder']` | static |
| copyTestCasesConfirm | `//button[text()='Copy']` | static |
| moveTestCasesConfirm | `//button[text()='Move']` | static |
| testCasesCopiedSuccess | `//div[text()='Test cases copied successfully']` | static |
| testCasesMovedSuccess | `//div[text()='Test cases moved successfully']` | static |
| testCaseCheckbox | `//input[@type='checkbox']` | static |
| targetOldFolder | `(//span[text()='Untitled'])[10]` | static |
| copyButton | `//span[text()='Copy']` | static |
| moveButton | `//span[text()='Move']` | static |
| moveTestcasesToast | `//div[text()='Test cases already present in the target folder']` | static |
| closeMoveTc | `//div[@role='button']//*[name()='svg' and contains(@class, 'octicon-x')]` | static |
| verifyCopiedTc | `(//a[text()='Verify phone number update'])[2]` | static |
| verifyMovedTc | `//a[text()='Verify phone number update']` | static |
| folderButtons | `` //span[text()='${name}']/following::div[@role='button'] `` | dynamic |
| folderButtonsEdit | `` //span[text()='${name}']//ancestor::div[contains(@class,'lt-tooltip-trigger')]//div `` | dynamic |
| renameFolderInput | `` (//input[@value='${name}'])[1] `` | dynamic |
| folderNameInNav | `` //span[text()='${name}'] `` | dynamic |
| folderNameInSidebar | `` (//span[text()='${name}'])[1] `` | dynamic |
| folderNameBulkEdit | `` (//span[text()='${name}'])[1] `` | dynamic |
| folderTreeItem | `` //div[contains(@class,'ant-tree-treenode')]//span[text()='${name}']/ancestor::div[contains(@class,'ant-tree-treenode-draggable')] `` | dynamic |
| folderDragHandle | `` //span[text()='${name}']/ancestor::div[contains(@class,'ant-tree-treenode')]//span[contains(@class,'ant-tree-draggable-icon')] `` | dynamic |
| folderTestCaseCount | `` //span[@title='${name}']//following-sibling::span `` | dynamic |
| folderExpandIcon | `` //span[text()='${name}']/ancestor::div[contains(@class,'ant-tree-treenode')]//span[contains(@class,'ant-tree-switcher')] `` | dynamic |
| folderCollapseIcon | `` //span[text()='${name}']/ancestor::div[contains(@class,'ant-tree-treenode')]//span[contains(@class,'ant-tree-switcher')] `` | dynamic |
| subfolderUnderParent | `` //span[text()='${parent}']/ancestor::div[...]//following-sibling::div[...]//span[text()='${child}'] `` | dynamic |
| createdFolder | `` //span[text()='${name}'] `` | dynamic |
| folderOptionsMenu | `` //span[text()='${name}']/../following-sibling::button/button[2] `` | dynamic |
| selectFolder | `` //span[text()='${name}'] `` | dynamic |
| folderBreadcrumb | `` //nav//span[text()='${name}'] `` | dynamic |

---

## Build Locators (`src/pages/build/build.locators.ts`)

| Locator Name | Selector | Type |
|---|---|---|
| buildNav | `//a[text()='Builds']` | static |
| createBuildCta | `//span[text()='Create Build']` | static |
| createBuildButton | `//span[text()='Create Build']` | static |
| searchTPForBuildCreation | `//input[@aria-label='Search Test Plans']` | static |
| buildTitle | `(//input[@placeholder='Enter build name'])[1]` | static |
| buildNameInput | `(//input[@placeholder='Enter build name'])[1]` | static |
| buildDescriptionInput | `//textarea[@placeholder='Enter build description']` | static |
| buildVersionInput | `//input[@placeholder='Enter build version']` | static |
| editBuildTitle | `(//input[@placeholder='Enter build name'])[2]` | static |
| buildTag | `(//input[@placeholder="Add Tags separated by enter."])[1]` | static |
| createCtaInBuildForm | `(//span[text()='Create'])[1]` | static |
| createBuildSubmit | `(//span[text()='Create'])[1]` | static |
| updateBuildCta | `(//span[text()='Update'])[1]` | static |
| saveBuildButton | `(//span[text()='Update'])[1]` | static |
| duplicateBuild | `//span[text()='Duplicate Build']` | static |
| duplicateBuildButton | `//span[text()='Duplicate Build']` | static |
| duplicateBuildConfirm | `//button[text()='Duplicate']` | static |
| editBuild | `//span[text()='Edit Build']` | static |
| editBuildButton | `//span[text()='Edit Build']` | static |
| buildHistoryNav | `//a[text()='Build History']` | static |
| buildHistoryTab | `//a[text()='Build History']` | static |
| buildHistoryTable | `//table` | static |
| buildHistoryEntries | `//table//tbody//tr` | static |
| testrunHistoryToday | `//span[text()='Today']` | static |
| buildHistoryStatus | `//span[text()='Passed']` | static |
| executionHistoryPassed | `//span[@aria-label='Passed']` | static |
| executionHistoryFailed | `//span[@aria-label="Failed"]` | static |
| buildPageBack | `//span[text()="Builds"]` | static |
| launchVariableCtaBuild | `//a[text()='Launch variables missing']` | static |
| searchBuildInput | `//input[@placeholder='Search Builds']` | static |
| deleteBuildButton | `//span[text()='Delete Build']` | static |
| deleteBuildConfirmInput | `//input[@placeholder='Type DELETE to confirm']` | static |
| deleteBuildConfirm | `//button[text()='Delete']` | static |
| createdBuild | `` //a[.//div[text()='${name}']] `` | dynamic |
| createdBuildAppear | `` //span[text()="${name}"] `` | dynamic |
| createdBuildEdit | `` //div[div[div[span[div[button[a[text()='${name}']]]]]]]//button `` | dynamic |
| buildOptionsMenu | `` //a[.//div[text()='${name}']]//ancestor::tr//button[@aria-label='more'] `` | dynamic |
| buildStatusActive | `` //a[.//div[text()='${name}']]//ancestor::tr//span[text()='Active'] `` | dynamic |
| associatedTPWithBuild | `` //span[text()="${name}"] `` | dynamic |

---

## Configuration Locators (`src/pages/configuration/configuration.locators.ts`)

| Locator Name | Selector | Type |
|---|---|---|
| configurationNav | `//a[text()='Configurations']` | static |
| configurationSettings | `//span[text()='Configurations']` | static |
| createConfigCta | `//button[contains(.,'Create') and contains(.,'Configuration')]` | static |
| createConfigButton | `//span[text()='Create']` | static |
| createConfigurationButton | `//button[contains(.,'Create') and contains(.,'Configuration')]` | static |
| configName | `input[placeholder='Enter Configuration name']` | static |
| configurationNameInput | `input[placeholder='Enter Configuration name']` | static |
| configDescription | `textarea[placeholder='Add description to the Configuration']` | static |
| createConfigurationSubmit | `//button[normalize-space()='Create Configuration']` | static |
| saveConfigurationButton | `//button[text()='Save']` | static |
| searchConfigurationInput | `//input[@placeholder='Search Configurations']` | static |
| osDropdown | `//*[text()='Operating system']/following-sibling::button` | static |
| browserDropdown | `//*[text()='Browser']/following-sibling::button` | static |
| selectWindows | `//span[text()='Windows']` | static |
| selectMacOS | `//span[text()='macOS']` | static |
| selectLinux | `//span[text()='Linux']` | static |
| selectChrome | `//span[text()='Chrome']` | static |
| selectFirefox | `//span[text()='Firefox']` | static |
| selectSafari | `//span[text()='Safari']` | static |
| selectEdge | `//span[text()='Edge']` | static |
| osVersionDropdown | `//*[text()='OS version']/following-sibling::button` | static |
| browserVersionDropdown | `//*[text()='Browser version']/following-sibling::button` | static |
| latestVersion | `//span[text()='Latest']` | static |
| resolutionDropdown | `//*[text()='Resolution']/following-sibling::button` | static |
| resolution1920x1080 | `//span[text()='1920x1080']` | static |
| resolution1366x768 | `//span[text()='1366x768']` | static |
| resolution1280x1024 | `//span[text()='1280x1024']` | static |
| mobileConfigTab | `//span[text()='Mobile']` | static |
| deviceDropdown | `//span[text()='Select Device']` | static |
| selectIPhone | `//span[text()='iPhone']` | static |
| selectAndroid | `//span[text()='Android']` | static |
| selectTablet | `//span[text()='Tablet']` | static |
| editConfig | `//span[text()='Edit']` | static |
| editConfigurationButton | `//span[text()='Edit']` | static |
| deleteConfig | `//span[text()='Delete']` | static |
| deleteConfigurationButton | `//span[text()='Delete']` | static |
| deleteConfigConfirmation | `//span[text()='Delete Configuration']` | static |
| deleteConfigurationConfirmInput | `//input[@placeholder='Type DELETE to confirm']` | static |
| deleteConfigurationConfirm | `//button[text()='Delete']` | static |
| configDeleteButton | `//span[text()='Delete']` | static |
| duplicateConfig | `//span[text()='Duplicate']` | static |
| duplicateConfigurationButton | `//span[text()='Duplicate']` | static |
| duplicateConfigurationConfirm | `//button[text()='Duplicate']` | static |
| searchConfig | `//input[@placeholder='Search Configurations']` | static |
| configListItem | `//div[contains(@class,'config-list-item')]` | static |
| configDetailView | `//div[contains(@class,'config-detail')]` | static |
| backToConfigList | `//span[text()='Configurations']` | static |
| addCustomField | `//span[text()='Add Custom Field']` | static |
| customFieldName | `input[placeholder='Enter field name']` | static |
| customFieldValue | `input[placeholder='Enter field value']` | static |
| saveCustomField | `//span[text()='Save']` | static |
| selectConfigInExecution | `//span[text()='Select Configuration']` | static |
| applyConfig | `//span[text()='Apply']` | static |
| configApplied | `//div[contains(@class,'config-applied')]` | static |
| falconPlatformTab | `//span[text()='Falcon']` | static |
| falconOsDropdown | `//*[text()='Operating system']/following-sibling::button` | static |
| falconOsVersionDropdown | `//*[text()='OS version']/following-sibling::button` | static |
| falconBrowserDropdown | `//*[text()='Browser']/following-sibling::button` | static |
| falconBrowserVersionDropdown | `//*[text()='Browser version']/following-sibling::button` | static |
| falconResolutionDropdown | `//*[text()='Resolution']/following-sibling::button` | static |
| realDevicePlatformTab | `//span[text()='Real Device']` | static |
| manufacturerDropdown | `//*[text()='Manufacturer']/following-sibling::button` | static |
| deviceNameDropdown | `//*[text()='Device name']/following-sibling::button` | static |
| realDeviceOsVersionDropdown | `//*[text()='OS version']/following-sibling::button` | static |
| selectManufacturer | `` //span[text()='${manufacturer}'] `` | dynamic |
| selectDeviceName | `` //span[text()='${device}'] `` | dynamic |
| createdConfig | `` //a[text()='${name}'] `` | dynamic |
| createdConfiguration | `` //a[text()='${name}'] `` | dynamic |
| configByName | `` //span[text()='${name}'] `` | dynamic |
| configThreeDots | `` //div[div[a[text()='${name}']]]//button[@aria-label='More options'] `` | dynamic |
| configurationOptionsMenu | `` //a[text()='${name}']//ancestor::tr//button[@aria-label='more'] `` | dynamic |
| selectOS | `` //span[text()='${os}'] `` | dynamic |
| selectOsVersion | `` //span[text()='${version}'] `` | dynamic |
| selectBrowserVersion | `` //span[text()='${version}'] `` | dynamic |
| selectBrowser | `` //span[text()='${browser}'] `` | dynamic |
| selectDevice | `` //span[text()='${device}'] `` | dynamic |
| selectResolution | `` //span[text()='${resolution}'] `` | dynamic |
| configurationSearchResults | `//div[contains(@class, 'search-results')]` | static |
| configurationDropdownInTestRun | `//button[text()='Select Configuration']` | static |
| configurationSearchInTestRun | `//input[@placeholder='Search configurations']` | static |
| selectConfigurationInTestRun | `` //span[text()='${name}'] `` | dynamic |
| saveConfigurationInTestRun | `//button[text()='Apply']` | static |
| verifyConfigSelectedInTestRun | `` //div[contains(text(),'${name}')] `` | dynamic |
| osFilterDropdown | `//button[text()='Filter by OS']` | static |
| browserFilterDropdown | `//button[text()='Filter by Browser']` | static |
| selectOsFilter | `` //span[text()='${os}'] `` | dynamic |
| selectBrowserFilter | `` //span[text()='${browser}'] `` | dynamic |
| filteredConfigurations | `//div[contains(@class, 'filtered-configs')]` | static |

---

## Settings Locators (`src/pages/settings/settings.locators.ts`)

| Locator Name | Selector | Type |
|---|---|---|
| settingsNav | `//a[text()='Settings']` | static |
| settingsMenu | `//span[text()='Settings']` | static |
| systemFieldsNav | `//span[text()='System Fields']` | static |
| systemFieldsTab | `//a[text()='System Fields']` | static |
| customFieldsNav | `//span[text()='Custom Fields']` | static |
| customFieldsTab | `//a[text()='Custom Fields']` | static |
| createCustomFieldCta | `//span[text()='Create Custom Field']` | static |
| customFieldName | `input[placeholder='Enter field name']` | static |
| customFieldDescription | `textarea[placeholder='Add description']` | static |
| customFieldType | `//span[text()='Select Field Type']` | static |
| textFieldType | `//span[text()='Text']` | static |
| numberFieldType | `//span[text()='Number']` | static |
| dateFieldType | `//span[text()='Date']` | static |
| dropdownFieldType | `//span[text()='Dropdown']` | static |
| checkboxFieldType | `//span[text()='Checkbox']` | static |
| textareaFieldType | `//span[text()='Textarea']` | static |
| urlFieldType | `//span[text()='URL']` | static |
| userFieldType | `//span[text()='User']` | static |
| requiredField | `//input[@type='checkbox' and @aria-label='Required field']` | static |
| multiSelectDropdown | `//input[@type='checkbox' and @aria-label='Multi-select']` | static |
| addDropdownOption | `//span[text()='Add Option']` | static |
| dropdownOptionInput | `input[placeholder='Enter option']` | static |
| removeDropdownOption | `//button[@aria-label='Remove option']` | static |
| createFieldButton | `//span[text()='Create Field']` | static |
| updateFieldButton | `//span[text()='Update Field']` | static |
| editCustomField | `//span[text()='Edit']` | static |
| deleteCustomField | `//span[text()='Delete']` | static |
| deleteFieldConfirmation | `//span[text()='Delete Field']` | static |
| searchCustomFields | `//input[@placeholder='Search custom fields']` | static |
| customFieldRow | `//div[contains(@class,'custom-field-row')]` | static |
| enableSystemField | `//input[@type='checkbox' and @aria-label='Enable field']` | static |
| makeSystemFieldRequired | `//input[@type='checkbox' and @aria-label='Make required']` | static |
| fieldVisibilityDropdown | `//span[text()='Visibility']` | static |
| visibleToAll | `//span[text()='All Users']` | static |
| visibleToAdmin | `//span[text()='Admin Only']` | static |
| applyToTestCase | `//input[@type='checkbox' and @aria-label='Test Case']` | static |
| applyToTestRun | `//input[@type='checkbox' and @aria-label='Test Run']` | static |
| applyToTestPlan | `//input[@type='checkbox' and @aria-label='Test Plan']` | static |
| applyToProject | `//input[@type='checkbox' and @aria-label='Project']` | static |
| generalSettingsTab | `//a[text()='General']` | static |
| organizationName | `input[placeholder='Enter organization name']` | static |
| organizationLogo | `input[type='file']` | static |
| saveGeneralSettings | `//span[text()='Save Settings']` | static |
| userManagementTab | `//a[text()='Users']` | static |
| inviteUserCta | `//span[text()='Invite User']` | static |
| userEmail | `input[placeholder='Enter email address']` | static |
| userRole | `//span[text()='Select Role']` | static |
| adminRole | `//span[text()='Admin']` | static |
| memberRole | `//span[text()='Member']` | static |
| viewerRole | `//span[text()='Viewer']` | static |
| sendInvite | `//span[text()='Send Invite']` | static |
| notificationsTab | `//a[text()='Notifications']` | static |
| emailNotifications | `//input[@type='checkbox' and @aria-label='Email notifications']` | static |
| slackNotifications | `//input[@type='checkbox' and @aria-label='Slack notifications']` | static |
| integrationsTab | `//a[text()='Integrations']` | static |
| addIntegration | `//span[text()='Add Integration']` | static |
| jiraIntegration | `//span[text()='Jira']` | static |
| slackIntegration | `//span[text()='Slack']` | static |
| customFieldByName | `` //span[text()='${name}'] `` | dynamic |
| customFieldThreeDots | `` //div[span[text()='${name}']]//button[@aria-label='More options'] `` | dynamic |
| systemFieldByName | `` //span[text()='${name}'] `` | dynamic |
| dropdownOption | `` //span[text()='${option}'] `` | dynamic |
| userByEmail | `` //span[text()='${email}'] `` | dynamic |
| roleByName | `` //span[text()='${role}'] `` | dynamic |

---

## Report Locators (`src/pages/report/report.locators.ts`)

### ReportLocators (object)

| Locator Name | Selector | Type |
|---|---|---|
| reportsTab | `//span[text()='Reports']` | static |
| reportsTabActive | `//div[@role='tab' and @aria-selected='true']//div[text()='Reports']` | static |
| testCasesTab | `//div[contains(@role,'tab') and .//div[text()='Test Cases']]` | static |
| testRunsTab | `//div[contains(@role,'tab') and .//div[text()='Test Runs']]` | static |
| reportsGeneratedHeader | `//span[text()='Reports Generated']` | static |
| generateNewReportBtn | `//button[normalize-space()='Generate New Report']` | static |
| searchReportInput | `//input[@placeholder='Search report here']` | static |
| reportTypeFilter | `//button[contains(text(),'Report Type:')]` | static |
| reportTypeAll | `//button[contains(text(),'Report Type: All')]` | static |
| reportTemplatesHeader | `//span[text()='Report Templates']` | static |
| detailedExecutionHistoryTemplate | `//span[contains(.,'Detailed Execution History')]` | static |
| traceabilityReportTemplate | `//span[contains(.,'Traceability Report')]` | static |
| generateReportDialog | `//div[@role='dialog']//h1[text()='Generate Report']` | static |
| detailedExecutionHistoryOption | `//button[contains(text(),'Detailed Execution History')]` | static |
| traceabilityReportOption | `//button[contains(text(),'Traceability Report')]` | static |
| dialogCancelBtn | `//div[@role='dialog']//button[normalize-space()='Cancel']` | static |
| dialogContinueBtn | `//div[@role='dialog']//button[normalize-space()='Continue']` | static |
| dialogCloseBtn | `//div[@role='dialog']//button[@aria-label='Close' or contains(@class,'close')]` | static |
| reportDrawerHeader | `//div[contains(text(),'Generate Report: Detailed Execution History')]` | static |
| reportNameInput | `//input[@name='title']` | static |
| reportDescriptionInput | `//textarea[@placeholder='Add Description (Optional)']` | static |
| goBackBtn | `//button[@aria-label='Go back' or contains(.,'Go back')]` | static |
| closeDrawerBtn | `//button[@aria-label='Close drawer' or contains(.,'Close drawer')]` | static |
| stepIndicator | `//div[contains(text(),'Step')]` | static |
| step1Of2 | `//div[contains(text(),'Step 1 of 2')]` | static |
| step2Of2 | `//div[contains(text(),'Step 2 of 2')]` | static |
| continueBtn | `//button[normalize-space()='Continue']` | static |
| continueBtnDisabled | `//button[@disabled and normalize-space()='Continue']` | static |
| generateBtn | `//button[normalize-space()='Generate Report']` | static |
| saveBtn | `//button[normalize-space()='Save']` | static |
| primaryFiltersLabel | `//text()[contains(.,'Primary Filters')]/..` | static |
| dateRangeRadio | `//div[@class='ant-picker-input']//input` | static |
| dateRangeFilterBtn | `//*[@id="__primerPortalRoot__"]/div/div/div/div[2]/div/div/div[1]/div/div[3]/div[1]` | static |
| testRunsRadio | `//button[contains(text(),'Test Runs')]//input[@type='radio']` | static |
| testRunsFilterBtn | `//div[contains(@class, 'LTDrawer')]// span[contains(text(),'Test Runs')]` | static |
| startDateInput | `//input[@placeholder='Start date' or contains(@aria-label,'Start date')]` | static |
| endDateInput | `//input[@placeholder='End date' or contains(@aria-label,'End date')]` | static |
| lastDays | `//li[text()='{{days}}']` | static |
| searchTestRunsInput | `//input[@placeholder='Search test runs']` | static |
| testRunsCount | `//div[contains(text(),'Test Runs')]` | static |
| testRunStatusFilter | `//button[normalize-space()='Status']` | static |
| testRunCreatorFilter | `//button[normalize-space()='Creator']` | static |
| selectAllTestRuns | `//div[contains(.,'Test Runs')]//input[@type='checkbox']` | static |
| testCasesFilterCheckbox | `//button[contains(text(),'Test Cases')]//input[@type='checkbox']` | static |
| testCasesFilterBtn | `//div[@class='flex flex-col h-screen']//span[contains(text(),'Test Cases')]` | static |
| addFilterBtn | `//span[contains(text(),'Add a filter')]` | static |
| noFiltersAdded | `//div[contains(text(),'No Filters Added')]` | static |
| filtersAddedCount | `//div[contains(text(),'Filters Added')]` | static |
| filterPriority | `//li[contains(.,'Priority')]` | static |
| filterStatus | `//li[contains(.,'Status') and not(contains(.,'Automation'))]` | static |
| filterAutomationStatus | `//li[contains(.,'Automation Status')]` | static |
| filterType | `//li[contains(.,'Type')]` | static |
| filterTags | `//li[contains(.,'Tags')]` | static |
| filterLinkedIssues | `//li[contains(.,'Linked Issues')]` | static |
| filterFolder | `//li[contains(.,'Folder')]` | static |
| filterCreatedBy | `//li[contains(.,'Created By')]` | static |
| selectPriorityBtn | `//button[contains(.,'Select priority')]` | static |
| selectStatusBtn | `//button[contains(.,'Select status')]` | static |
| selectAutomationStatusBtn | `//button[contains(.,'Select automation status')]` | static |
| selectTypeBtn | `//button[contains(.,'Select type')]` | static |
| selectTagsBtn | `//button[contains(.,'Select tags')]` | static |
| tagsSearchInput | `//input[@placeholder='Search...']` | static |
| selectLinkedIssuesBtn | `//button[contains(.,'Select linked issues')]` | static |
| linkedIssuesSearchInput | `//input[@placeholder='Search...']` | static |
| selectCreatedByBtn | `//button[contains(.,'Select created by')]` | static |
| createdBySearchInput | `//input[@placeholder='Search...']` | static |
| selectFolderBtn | `//button[contains(.,'Select folders')]` | static |
| selectFolderButton | `//button[contains(.,'Select Folders')]` | static |
| folderLoader | `//*[contains(@class,'Spinner__StyledSpinner')]` | static |
| recurringReportToggle | `//button[contains(@class,'toggle') or @role='switch']` | static |
| recurringReportLabel | `//div[text()='Recurring Report']` | static |
| frequencyDailyRadio | `//input[@type='radio' and following-sibling::*[contains(.,'Daily')]]` | static |
| frequencyWeeklyRadio | `//input[@type='radio' and following-sibling::*[contains(.,'Weekly')]]` | static |
| frequencyMonthlyRadio | `//input[@type='radio' and following-sibling::*[contains(.,'Monthly')]]` | static |
| frequencyDailyLabel | `//div[text()='Daily']` | static |
| frequencyWeeklyLabel | `//div[text()='Weekly']` | static |
| frequencyMonthlyLabel | `//div[text()='Monthly']` | static |
| emailsInput | `//div[contains(text(),'Emails')]/following-sibling::*//input \| //input[@placeholder='Enter email']` | static |
| goBackStep2Btn | `//button[normalize-space()='Go Back']` | static |
| generateReportBtn | `//button[normalize-space()='Generate Report']` | static |
| reportLoadingIndicator | `//div[contains(text(),'Loading Report')]` | static |
| reportLoadingMessage | `//div[contains(text(),'Please hold on')]` | static |
| reportDetailTable | `//table` | static |
| reportDetailTableRows | `//table//tbody//tr` | static |
| reportDetailHeader | `//div[contains(text(),'Execution Report')]` | static |
| reportExportCsvBtn | `//button[contains(.,'Export Report as CSV')]` | static |
| reportDataRefreshInfo | `//div[contains(text(),'New data may take around')]` | static |
| reportNoDataAvailable | `//*[contains(text(),'No Data available') or contains(text(),'No data available') or contains(text(),'No Data Available')]` | static |
| reportItemMenu | `//button[@aria-label='Open Menu, Press Enter to view']` | static |
| reportDeleteOption | `//span[text()='Delete']` | static |
| reportCreatedToast | `//*[contains(text(),'Report created') or contains(text(),'successfully')]` | static |

### Standalone exported functions

| Locator Name | Selector | Type |
|---|---|---|
| selectTestRun | `` //div[@class='w-full']//span[contains(text(),'${testRunName}')]//ancestor::div[@class='flex flex-col']//input `` | dynamic |
| testRunRow | `` //div[contains(@class,'cursor-pointer') and contains(.,'${testRunName}')] `` | dynamic |
| selectPriority | `` //li[contains(.,'${priority}')] `` | dynamic |
| reportByName | `` //span[normalize-space()='${reportName}'] `` | dynamic |
| reportTypeBadge | `` //div[@role='tooltip' and text()='${reportType}'] `` | dynamic |
| selectStatus | `` //li[contains(.,'${status}')] `` | dynamic |
| selectAutomationStatus | `` //li[contains(.,'${automationStatus}')] `` | dynamic |
| selectType | `` //li[contains(.,'${type}')] `` | dynamic |
| selectTag | `` //li[contains(.,'${tagName}')] `` | dynamic |
| selectLinkedIssue | `` //li[contains(.,'${issueName}')] `` | dynamic |
| selectCreatedBy | `` //li[contains(.,'${userName}')] `` | dynamic |
| selectFolder | `` //span[contains(text(),'${folderName}')]//ancestor::span[@class='ant-tree-title']//div[@role='button'] `` | dynamic |
| reportDetailByName | `` //div[text()='${reportName}'] `` | dynamic |

---

## Insights Locators (`src/pages/insights/insights.locators.ts`)

| Locator Name | Selector | Type |
|---|---|---|
| insightsTab | `//a[@role='tab'][contains(.,'Insights')]` | static |
| insightPageNav | `//a[span[text()='Insights']]` | static |
| totalTestCasesValue | `//span[text()='Total Test Cases']/ancestor::div[contains(@class,'flex')]/div[2]/span` | static |
| manualTestCasesValue | `//span[text()='Manual Test Cases']/ancestor::div[contains(@class,'flex')]/div[2]/span` | static |
| automatedTestCasesValue | `//span[text()='Automated Test Cases']/ancestor::div[contains(@class,'flex')]/div[2]/span` | static |
| automationCoverageValue | `//span[text()='Automation Coverage']/ancestor::div[contains(@class,'flex')]/div[2]/span` | static |
| totalTestCasesLabel | `//span[text()='Total Test Cases']` | static |
| manualTestCasesLabel | `//span[text()='Manual Test Cases']` | static |
| automatedTestCasesLabel | `//span[text()='Automated Test Cases']` | static |
| automationCoverageLabel | `//span[text()='Automation Coverage']` | static |
| testRunSummaryChart | `//span[text()='Test Run Summary']` | static |
| testCaseSummaryChart | `//span[text()='Test Case Summary']` | static |
| testCaseTrendChart | `//span[text()='Test Case Trend']` | static |
| issuesTrendChart | `//span[text()='Issues Trend']` | static |
| startDateInput | `input[placeholder='Start date']` | static |
| endDateInput | `input[placeholder='End date']` | static |
| viewingLabel | `//div[text()='Viewing:']` | static |
| refreshButton | `//button[@aria-label='Refresh']` | static |
| syncWidget | `//button[@aria-label='Refresh']` | static |
| dataRefreshInfo | `//div[contains(text(),'New data may take around')]` | static |
| testRunSummaryCanvas | `//span[text()='Test Run Summary']/ancestor::div[contains(@class,'w-1/2')]//canvas` | static |
| testCaseSummaryCanvas | `//span[text()='Test Case Summary']/ancestor::div[contains(@class,'w-1/2')]//canvas` | static |
| g2Tooltip | `.g2-tooltip` | static |
| g2TooltipLabel | `.g2-tooltip-list-item-name-label` | static |
| g2TooltipValue | `.g2-tooltip-list-item-value` | static |
| testRunPassedTooltip | `//div[contains(@class,'g2-tooltip')]//span[contains(@class,'g2-tooltip-list-item-name-label') and text()='Passed']` | static |
| testRunFailedTooltip | `//div[contains(@class,'g2-tooltip')]//span[contains(@class,'g2-tooltip-list-item-name-label') and text()='Failed']` | static |
| testRunNotStartedTooltip | `//div[contains(@class,'g2-tooltip')]//span[contains(@class,'g2-tooltip-list-item-name-label') and text()='Not Started']` | static |
| testRunSkippedTooltip | `//div[contains(@class,'g2-tooltip')]//span[contains(@class,'g2-tooltip-list-item-name-label') and text()='Skipped']` | static |
| testCaseTypeNATooltip | `//div[contains(@class,'g2-tooltip')]//span[contains(@class,'g2-tooltip-list-item-name-label') and text()='NA']` | static |
| testCaseTypeFunctionalTooltip | `//div[contains(@class,'g2-tooltip')]//span[contains(@class,'g2-tooltip-list-item-name-label') and text()='Functional']` | static |
| testCaseTypeIntegrationTooltip | `//div[contains(@class,'g2-tooltip')]//span[contains(@class,'g2-tooltip-list-item-name-label') and text()='Integration']` | static |
| insightPageAutomationCoverage | `//span[text()='50%']` | static |
| insightTotalTC | `//div[div[div[span[text()='Total Test Cases']]] and div[span[text()='2']]]` | static |
| insightManualTC | `//div[div[div[span[text()='Manual Test Cases']]] and div[span[text()='1']]]` | static |
| insightAutomationTC | `//div[div[div[span[text()='Automated Test Cases']]] and div[span[text()='1']]]` | static |
| insightAutomation50 | `//div[div[div[span[text()='Automation Coverage']]] and div[span[text()='50%']]]` | static |
| insightStatValue | `` //div[div[div[span[text()='${label}']]] and div[span[text()='${value}']]] `` | dynamic |

---

## Milestone Locators (`src/pages/milestone/milestone.locators.ts`)

### MilestoneLocators (object)

| Locator Name | Selector | Type |
|---|---|---|
| milestoneTab | `//*[@role='tab' and contains(.,'Milestones')]` | static |
| createMilestoneCta | `//button[.//span[contains(text(),'Create Milestone')] or contains(.,'Create Milestone')]` | static |
| milestoneBackBtn | `//button[.//h5[text()='Milestones']]` | static |
| milestoneNameInput | `//input[@placeholder='Enter desired name']` | static |
| milestoneDescriptionInput | `//textarea[@placeholder='Enter description here']` | static |
| milestoneStartDateInput | `//input[@placeholder='Start Date']` | static |
| milestoneEndDateInput | `//input[@placeholder='End Date']` | static |
| milestoneStartDateClearBtn | `//input[@placeholder='Start Date']/following-sibling::button[contains(@class,'close')]` | static |
| milestoneOwnerDropdown | `//button[contains(.,'Select Owner')]` | static |
| milestoneOwnerSearch | `//input[@placeholder='Search members']` | static |
| milestoneTagsInput | `//input[@placeholder='Add Tags separated by enter']` | static |
| milestoneTagsCombobox | `//input[@role='combobox'][@placeholder='Add Tags separated by enter']` | static |
| milestoneTestRunsSearch | `//input[@placeholder='Search Test Runs and select to add']` | static |
| milestoneTestRunsDropdownHeader | `//h5[text()='Test Runs']` | static |
| milestoneSelectedTestRunRemove | `//button[contains(@class,'close') or @aria-label='Remove']` | static |
| milestoneAddAttachmentsBtn | `//button[contains(.,'Add attachments')]` | static |
| datePickerToday | `//li[text()='Today']` | static |
| datePickerNextMonth | `//button[contains(@aria-label,'Next month')]` | static |
| datePickerPrevMonth | `//button[contains(@aria-label,'Previous month')]` | static |
| milestoneSaveChangesBtn | `//button[.//span[text()='Save Changes']]` | static |
| milestoneCancelBtn | `//button[.//span[text()='Cancel']]` | static |
| milestoneCreateSubmitBtn | `//button[.//span[text()='Create Milestone']][not(@disabled)]` | static |
| milestoneCreatedToast | `//*[contains(text(),'Milestone created successfully') or contains(.,'Milestone created successfully')]` | static |
| milestoneUpdatedToast | `//*[contains(text(),'Milestone updated successfully') or contains(.,'Milestone updated successfully')]` | static |
| milestoneDeletedToast | `//*[contains(text(),'Milestone deleted successfully') or contains(.,'Milestone deleted successfully')]` | static |
| milestoneSearchInput | `//input[@placeholder='Find a milestone...']` | static |
| milestoneViewDropdown | `//button[contains(.,'View:')]` | static |
| milestoneViewOpen | `//ul[@role='listbox']//span[text()='Open']` | static |
| milestoneViewComplete | `//ul[@role='listbox']//span[contains(.,'Complete')]` | static |
| milestoneEmptyState | `//span[text()='Oops! No Milestone found matching your search. Recheck your search query and try again.']` | static |
| milestoneDueDateDisplay | `//span[contains(text(),'due')]` | static |
| milestoneNoMilestonesMsg | `//span[contains(., 'No Open Milestone Found')]` | static |
| milestoneOpenMenu | `//button[@aria-label='Open menu']` | static |
| milestoneEditMenu | `//ul[@role='menu']//div[text()='Edit']` | static |
| milestoneDeleteMenu | `//ul[@role='menu']//div[text()='Delete']` | static |
| milestoneMarkCompleteMenu | `//div[@role='menuitem'][contains(.,'Mark as Complete')]` | static |
| breadcrumbTestManager | `//button[.//span[text()='Test Manager']]` | static |
| breadcrumbProjectName | `//button[.//span[text()='Test Manager']]/following::button[1]` | static |
| milestoneProgressBar | `//span[@role='progressbar'][@aria-label='Milestone progress']` | static |
| milestoneProgressPercentage | `//span[contains(.,'% Complete')]` | static |
| milestoneProgressDetailsBtn | `//span[@aria-label='Milestone progress']` | static |
| milestoneMarkCompletedBtn | `//ul[@role='menu']//div[contains(., 'Mark as Complete')]` | static |
| milestoneTestRunsAssociated | `//span[contains(text(),'Test Runs Associated')]` | static |
| milestonePassedRatio | `//span[contains(text(),'Passed') and contains(text(),'/')]` | static |
| milestoneDetailDescription | `//div[contains(@class,'description') or contains(@class,'text')]//div[string-length(text()) > 10]` | static |
| progressPopupTestCasesCount | `//h2[text()='Test Cases']/following-sibling::*` | static |
| progressPopupFailedCount | `//span[text()='Failed']/preceding-sibling::span` | static |
| progressPopupPassedCount | `//span[text()='Passed']/preceding-sibling::span` | static |
| progressPopupFailedPercentage | `//span[text()='Failed']/parent::div/following-sibling::div` | static |
| progressPopupPassedPercentage | `//span[text()='Passed']/parent::div/following-sibling::div` | static |
| testRunMilestoneDropdown | `//button[.//span[contains(text(),'Set milestone')] or .//span[contains(text(),'Select Milestone')] or .//span[contains(text(),'Set Milestone')] or contains(.,'Set milestone') or contains(.,'Select milestone')]` | static |
| testRunMilestoneSearch | `//input[@placeholder='Search']` | static |
| milestoneTestRunTab | `//div[@role='tab'][contains(.,'Test Runs')]` | static |
| milestoneNoTestRuns | `//div[contains(text(),'0 Test Runs Associated')]` | static |

### Standalone exported functions

| Locator Name | Selector | Type |
|---|---|---|
| milestoneDetailName | `` //span[contains(.,'Milestones/') and contains(.,'${milestoneName}')] `` | dynamic |
| milestoneDetailDescriptionText | `` //span[contains(text(),'${description}')] `` | dynamic |
| milestoneDetailTag | `` //span[contains(text(),'${tagName}')] `` | dynamic |
| milestoneInList | `` //span[contains(text(),'${milestoneName}')] `` | dynamic |
| milestoneLink | `` //div[contains(@class,'cursor-pointer') and contains(text(),'${milestoneName}')] `` | dynamic |
| milestoneOption | `` //li[@title='${milestoneName}'] \| //span[contains(text(),'${milestoneName}')] `` | dynamic |
| milestoneTag | `` //span[contains(text(),'${tagName}')] `` | dynamic |
| milestoneProgressWithPercentage | `` //span[contains(.,'${percentage}% Complete')] `` | dynamic |
| breadcrumbMilestoneName | `` //span[text()='${milestoneName}'] `` | dynamic |
| milestoneTestRunsCount | `` //span[contains(.,'${count} Test Runs Associated')] `` | dynamic |
| milestonePassedRatioValue | `` //span[contains(.,'${passed} / ${total} Passed')] `` | dynamic |
| milestoneTestRunCheckbox | `` //h5[text()='${testRunName}']/ancestor::div[contains(@class,'flex')]//input[@type='checkbox'] `` | dynamic |
| milestoneTestRunItem | `` //h5[text()='${testRunName}'] `` | dynamic |
| milestoneOwnerOption | `` //li[contains(.,'${ownerName}')] `` | dynamic |
| datePickerDay | `` //td[contains(@class,'cell')]//div[text()='${day}'] `` | dynamic |
| milestoneWithDueDate | `` //div[contains(text(),'${dueText}')] `` | dynamic |

---

## Dataset Locators (`src/pages/dataset/dataset.locators.ts`)

| Locator Name | Selector | Type |
|---|---|---|
| datasetTab | `//*[@role='tab' and contains(.,'Datasets')]` | static |
| datasetSearchInput | `//input[@placeholder='Search Datasets']` | static |
| createDatasetBtn | `//button[contains(.,'Create') and contains(.,'Dataset')]` | static |
| datasetEmptyStateText | `//*[contains(text(),'Create your first dataset')]` | static |
| datasetEmptyStateDescription | `//*[contains(text(),'Start by creating or importing datasets')]` | static |
| datasetModalDialog | `//div[@role='dialog']` | static |
| datasetModalTitle | `//h2[normalize-space()='Create Dataset']` | static |
| datasetNameInput | `//input[@placeholder='Enter dataset name']` | static |
| datasetDescriptionInput | `//textarea[contains(@placeholder,'Add a description')]` | static |
| datasetCreateBtnModal | `//button[normalize-space()='Create']` | static |
| datasetCancelBtnModal | `//button[normalize-space()='Cancel']` | static |
| datasetCloseModalBtn | `//button[@aria-label='Close']` | static |
| datasetNameError | `//*[contains(text(),'required') or contains(text(),'Required') or contains(text(),'name')]` | static |
| datasetNoResults | `//*[contains(text(),'No results') or contains(text(),'not found') or contains(text(),'No datasets')]` | static |
| datasetAddRowBtn | `//div[contains(@class,'border-t')]//button[contains(@class,'edit-icon')]` | static |
| datasetFirstCell | `(//div[@class='dsg-cell'])[1]` | static |
| datasetLastCell | `(//div[@class='dsg-cell'])[last()]` | static |
| datasetCellInput | `//input[@class='dsg-input']` | static |
| datasetMenuBtn | `//button[@aria-label='Open column options']` | static |
| datasetEditOption | `//div[normalize-space()='Edit Details']` | static |
| datasetDeleteOption | `//div[normalize-space()='Delete Dataset']` | static |
| datasetDeleteConfirmBtn | `//button[normalize-space()='Delete' or normalize-space()='Confirm' or contains(@class,'danger')]` | static |
| datasetSaveBtn | `//button[normalize-space()='Save']` | static |
| datasetTitleTextarea | `//textarea[@name='title']` | static |
| datasetBackBtn | `//span[text()='Datasets']` | static |
| datasetByName | `` //*[normalize-space(text())='${datasetName}'] \| //a[normalize-space(text())='${datasetName}'] `` | dynamic |
| datasetMenuByName | `` //a[normalize-space(text())='${datasetName}']//ancestor::tr//button[@aria-label='more'] `` | dynamic |

---

## CSV Import Locators (`src/pages/csv-import/csv-import.locators.ts`)

| Locator Name | Selector | Type |
|---|---|---|
| importNav | `//span[text()='Import']` | static |
| importCta | `//span[text()='Import Test Cases']` | static |
| importFromCsv | `//span[text()='Import from CSV']` | static |
| fileUploadInput | `input[type='file']` | static |
| browseCsv | `input[type='file']` | static |
| uploadFileButton | `//span[text()='Upload File']` | static |
| selectFileButton | `//span[text()='Select File']` | static |
| dragDropArea | `//div[contains(@class,'drag-drop-area')]` | static |
| verifyCsvUploaded | `//div[contains(@class,'csv-uploaded')]` | static |
| verifyBddCsvUploaded | `//div[contains(@class,'bdd-csv-uploaded')]` | static |
| filePreview | `//div[contains(@class,'file-preview')]` | static |
| fileName | `//span[contains(@class,'file-name')]` | static |
| fileSize | `//span[contains(@class,'file-size')]` | static |
| removeFile | `//button[@aria-label='Remove file']` | static |
| csvMappingStep | `//div[contains(@class,'csv-mapping')]` | static |
| nextButton | `//span[text()='Next']` | static |
| nextButtonCsv | `//span[text()='Next']` | static |
| previousButton | `//span[text()='Previous']` | static |
| verifyTitleColumn | `//th[text()='Title']` | static |
| verifyTypeColumn | `//th[text()='Type']` | static |
| verifyStatusColumn | `//th[text()='Status']` | static |
| verifyPriorityColumn | `//th[text()='Priority']` | static |
| verifyDescriptionColumn | `//th[text()='Description']` | static |
| mapColumnsHeading | `//h5[text()='Map Columns']` | static |
| mapFieldsCsvPage | `//h5[text()='Map Columns']` | static |
| sourceColumn | `//span[text()='Source Column']` | static |
| targetField | `//span[text()='Target Field']` | static |
| verifyMapToColumn | `//th[text()='Map To']` | static |
| verifyFieldInCsvColumn | `//th[text()='Field in CSV']` | static |
| mappedValueCsvPage | `//div[contains(@class,'mapped-values')]` | static |
| titleFieldMapping | `//span[text()='Title']` | static |
| descriptionFieldMapping | `//span[text()='Description']` | static |
| typeFieldMapping | `//span[text()='Type']` | static |
| priorityFieldMapping | `//span[text()='Priority']` | static |
| statusFieldMapping | `//span[text()='Status']` | static |
| automationStatusFieldMapping | `//span[text()='Automation Status']` | static |
| tagsFieldMapping | `//span[text()='Tags']` | static |
| importSettingsStep | `//div[contains(@class,'import-settings')]` | static |
| skipDuplicates | `//input[@type='checkbox' and @aria-label='Skip duplicates']` | static |
| updateExisting | `//input[@type='checkbox' and @aria-label='Update existing']` | static |
| createNewFolder | `//input[@type='checkbox' and @aria-label='Create in new folder']` | static |
| selectFolderDropdown | `//span[text()='Select Folder']` | static |
| createFolderOption | `//span[text()='Create New Folder']` | static |
| folderNameInput | `input[placeholder='Enter folder name']` | static |
| validationStep | `//div[contains(@class,'validation-step')]` | static |
| validationErrors | `//div[contains(@class,'validation-errors')]` | static |
| validationWarnings | `//div[contains(@class,'validation-warnings')]` | static |
| validRowsCount | `//span[contains(@class,'valid-rows')]` | static |
| invalidRowsCount | `//span[contains(@class,'invalid-rows')]` | static |
| importButton | `//span[text()='Import']` | static |
| previewCsv | `//span[text()='Preview Import']` | static |
| importTestCaseCta | `//span[text()='Import Test Cases']` | static |
| startImportButton | `//span[text()='Start Import']` | static |
| cancelImport | `//span[text()='Cancel']` | static |
| testcaseTitleImportingViaCsv | `//span[text()='Test Case Imported']` | static |
| importProgressBar | `//div[contains(@class,'progress-bar')]` | static |
| progressPercentage | `//span[contains(@class,'progress-percentage')]` | static |
| importingMessage | `//span[text()='Importing test cases...']` | static |
| importComplete | `//span[text()='Import Complete']` | static |
| importSuccess | `//div[contains(@class,'import-success')]` | static |
| successCount | `//span[contains(@class,'success-count')]` | static |
| failureCount | `//span[contains(@class,'failure-count')]` | static |
| viewImportedTestCases | `//span[text()='View Imported Test Cases']` | static |
| downloadErrorReport | `//span[text()='Download Error Report']` | static |
| importHistoryNav | `//span[text()='Import History']` | static |
| importHistoryTable | `//table[contains(@class,'import-history')]` | static |
| importDate | `//th[text()='Date']` | static |
| importedBy | `//th[text()='Imported By']` | static |
| importStatus | `//th[text()='Status']` | static |
| importActions | `//th[text()='Actions']` | static |
| errorMessage | `//div[contains(@class,'error-message')]` | static |
| errorDetails | `//div[contains(@class,'error-details')]` | static |
| closeError | `//button[@aria-label='Close error']` | static |
| downloadSampleTemplate | `//span[text()='Download Sample Template']` | static |
| downloadSampleCsv | `//span[text()='Download Sample Template']` | static |
| viewSampleTemplate | `//span[text()='View Sample']` | static |
| csvRowByNumber | `` //tr[@data-row='${row}'] `` | dynamic |
| columnMappingDropdown | `` //div[span[text()='${column}']]//button `` | dynamic |
| selectTargetField | `` //span[text()='${field}'] `` | dynamic |
| importHistoryRow | `` //td[text()='${date}'] `` | dynamic |
| validationError | `` //div[text()='${message}'] `` | dynamic |
| folderOption | `` //span[text()='${name}'] `` | dynamic |

---

## Jira Integration Locators (`src/pages/jira-integration/jira.locators.ts`)

### JiraLocators (object)

| Locator Name | Selector | Type |
|---|---|---|
| connectJiraCta | `//span[text()='Connect Jira']` | static |
| issueNav | `//span[text()='Issues']` | static |
| closedJiraSidebar | `//button[@aria-label="Close Sidebar"]` | static |
| linkIssueButton | `//span[text()='Link Issue']` | static |
| linkFieldTms | `//input[@placeholder='Add Jira issue key or Issue URL']` | static |
| initialPromptChevron | `//span[text()='Initial prompt']//following-sibling::div//*[contains(@class, 'octicon-chevron-right')]` | static |
| todoJiraTitle | `//span[text()="This is To Do bug type"]` | static |
| todoJiraPriority | `//span[text()="Medium"]` | static |
| todoJiraProject | `//span[text()='LTQA Automation Tests']` | static |
| todoJiraId | `//span[text()="LAT-1"]` | static |
| todoJiraType | `//span[text()="Bug"]` | static |
| todoJiraStatus | `//span[text()="To Do"]` | static |
| todoJiraCreatedBy | `//span[contains(text(), 'Created')]` | static |
| singleUnlinkButton | `//span[@aria-label="Unlink Issue"]` | static |
| confirmationPopup | `//span[text()='Confirm']` | static |
| jiraAppNotStarted | `//span[text()='Not started']` | static |
| jiraAppUnlink | `//span[text()='Unlink']` | static |
| jiraAppLink | `//span[text()='Link Test Case']` | static |
| jiraAppSearch | `//input[@placeholder="Search test cases"]` | static |
| jiraAppLinkButton | `//button[@aria-label="Link Issue"]` | static |
| jiraAppIframeSearch | `(//iframe[@data-testid='hosted-resources-iframe'])[3]` | static |
| jiraIssueScrollPane | `//div[@data-testid='issue.views.issue-details.issue-layout.container-left']` | static |
| jiraAppIframe | `(//iframe[contains(@id, 'iFrameResizer')])[1]` | static |
| openSearchCloseJiraApp | `.octicon-x` | static |
| ltJiraUsernameField | `[placeholder="Enter username"]` | static |
| ltJiraAccessKeyField | `[placeholder="Enter Access Key"]` | static |
| ltJiraAuthenticateBtn | `//button[.='Authenticate']` | static |
| ltJiraAuthenticateMsg | `//div[contains(@class,'MuiAlert-message') and text()='Authenticated']` | static |
| ltJiraIframe | `[data-testid="hosted-resources-iframe"]` | static |
| automationLogs | `//div[@id="activeTimestamp-0"]` | static |
| automationMarkAsBug | `(//button[@aria-label="Mark as Bug"])[1]` | static |
| automationSelectProject | `//span[text()='Select Project']` | static |
| automationJiraProject | `//span[text()='LTQA Automation Tests']` | static |
| automationJiraSelectAssignee | `//span[text()='Select Assignee']` | static |
| automationJiraAssignee | `//span[text()='LTQA Integration']` | static |
| automationJiraSelectType | `//span[text()='Select Issue Type']` | static |
| automationJiraBugType | `//span[text()='Bug']` | static |
| automationCreateBug | `//span[text()='Create Issue']` | static |
| automationBugSummary | `//input[@id="summary"]` | static |
| jiraDetails | `//span[text()='This ticket is created from automation logs page']` | static |
| jiraDetailsApp | `//h1[text()='This ticket is created from automation logs page']` | static |
| executionNavJira | `//a[text()='Execution History']` | static |

### Standalone exported functions

| Locator Name | Selector | Type |
|---|---|---|
| jiraAppTestcase | `` //div[div[div[div[div[div[button[span[text()='${tc}']]]]]]]]//button `` | dynamic |
| todoCount | `` //span[text()='To-Do' and text()='${count}'] `` | dynamic |
| jiraAppStatus | `` //div[button[span[text()='${tc}']] and span[span[@aria-label='Passed']]] `` | dynamic |

---

## SDK Locators (`src/pages/sdk/sdk.locators.ts`)

### SdkLocators (object)

| Locator Name | Selector | Type |
|---|---|---|
| sdkExpand | `//button[span[text()=' Expand details']]` | static |
| sdkCollapse | `//span[text()='Collapse details']` | static |
| sdkEndSession | `(//span[text()='End Session'])[3]` | static |
| sdkNextStepButton | `//button[@aria-label="Next"]` | static |
| sdkStep1 | `//span[text()='1']` | static |
| sdkStep2 | `//span[text()='2']` | static |
| sdkStep3 | `//span[text()='3']` | static |
| sdkStep4 | `//span[text()='4']` | static |
| sdkStep5 | `//span[text()='5']` | static |
| recordMedia | `//span[text()='Recorded Media']` | static |
| tcStatusPassedSdk | `//span[text()='Passed']` | static |
| statusPassedSdk | `(//span[text()='Passed'])[2]` | static |
| tcStatusPassedBuildSummSdk | `//span[text()='Passed']` | static |
| markSdkStatus | `//span[text()='Mark Status']` | static |
| finishSdk | `//span[text()='Finish']` | static |
| tcNextCtaSdk | `//span[text()='Next']` | static |
| remarkSdk | `//textarea[@placeholder='Add any observation/remark for the test case execution.']` | static |
| projectTagSdk | `input[placeholder='Add Tags separated by enter']` | static |
| openMenuSdk | `//button[@aria-label="open-menu"]` | static |
| openExpandMenu | `(//button[@data-component='IconButton' and @aria-label='open-menu'])[last()]` | static |
| collapseToExpand | `//span[text()='Test Step Execution Summary']` | static |
| manualStep | `//div[@id='step-description']//div[contains(@class, 'reactjs-tiptap-editor')]` | static |
| tcStatusFailedSdk | `//span[span[text()='Failed']]` | static |
| testStepsStatusCollapse | `` (//div[div[div[div[span[text()='${stepName}']]]]]//button)[4] `` | dynamic |

### Standalone exported functions

| Locator Name | Selector | Type |
|---|---|---|
| stepDisplayInSdk | `` //span[text()='${step}'] `` | dynamic |
| stepDisplayInEditor | `` (//div[text()='${step}'])[3] `` | dynamic |

---

## Automation Locators (`src/pages/automation/automation.locators.ts`)

| Locator Name | Selector | Type |
|---|---|---|
| automationSidebar | `//span[text()='Automation']` | static |
| runtimeTc | `//h4[contains(text(),'RunTimeAutomationTestcase')]` | static |
| runtimeTcTms | `//span[text()='RunTimeAutomationTestcase']` | static |
| runtimeTcEditorTms | `//h5[text()='RunTimeAutomationTestcase']` | static |
| automationTestTitle | `//h4[contains(text(),"RunTimeAutomationTestcase")]` | static |
| automationTestTitleTms | `(//span[text()='RunTimeAutomationTestcase'])[1]` | static |
| automationTcTitleTms | `//a[text()='RunTimeAutomationTestcase']` | static |
| automationProjectName | `(//span[text()='LambdaTest Automation'])[1]` | static |
| linkTcInAutomationDash | `//span[text()='Link Test Case']` | static |
| createNewTcAutomationDash | `//span[text()='Create new Test Case']` | static |
| tmsTcIdAutomationDash | `//a[contains(text(),'#TC-')]` | static |
| unlinkTcAutomationDash | `//span[text()='Unlink Test']` | static |
| automationTcTitleNewLink | `//span[text()='RunTimeAutomationTestcase']` | static |
| automationUnlinkConfirmation | `//span[text()='Unlink']` | static |
| searchTcAutomationDash | `//input[@placeholder="Search test cases here"]` | static |
| linkOpenSearch | `//button[@aria-label="Link Test Case"]` | static |
| noExecution | `//span[text()='No executions so far']` | static |
| buildAutomation | `//span[text()="RunTimeAutomationTestcase"]` | static |
| openMenuAutomationPage | `//button[@aria-label="Open  Menu, Press Enter to view "]` | static |
| deleteAutomationPage | `//span[text()='Delete']` | static |
| deleteAutomationPageProd | `//span[text()='Delete...']` | static |
| openMenuProd | `(//button[@aria-label="Open  Menu, Press Enter to view "])[1]` | static |
| variableLink | `//span[text()='Launch variables missing']` | static |
| openDefaultProject | `//a[text()='LambdaTest Automation']` | static |
| automationProject | `//div[div[div[a[text()='LambdaTest Automation']]]]//button` | static |
| searchTestsMl | `//input[@placeholder='Search Tests by Test Name']` | static |
| tcidTestsMl | `//span[text()='RunTimeAutomationTestcase']` | static |
| metaDataMl | `//span[text()='Meta Data']` | static |
| inputConfigMl | `//span[text()='Input Config']` | static |
| mlExpandBuild | `//button[@aria-label="expand button"]` | static |
| mlLinkId | `//a[contains(text(),'#TC-')]` | static |

---

## KaneAI Locators (`src/pages/kaneai/kaneai.locators.ts`)

### KaneaiLocators (object)

| Locator Name | Selector | Type |
|---|---|---|
| auteurSidebar | `(//a[@aria-label="KaneAI"])` | static |
| automateWithKaneai | `//div[@id='test-steps-container']//span[text()="Automate with KaneAI"]` | static |
| desktopBrowser | `//span[contains(text(),'Desktop Browser')]` | static |
| mobileAppButton | `//div[@id='test-steps-container']//a[contains(@class,'UnderlineNav__UnderlineNavLink')]//span[contains(text(),'Mobile App')]` | static |
| mobileAppLink | `//div[@id='test-steps-container']//nav[@id='uploaded-apps-list']//div[contains(@id, 'appcard-bundle') and text()='QATestApp.apk']` | static |
| startTestingMobileButton | `//div[@id='test-steps-container']//span[text()='Automate with KaneAI']//ancestor::nav[contains(@class,'EZDrawer__container h-full')]//span[text()='Start Testing']` | static |
| uploadAppButton | `#upload-app-file` | static |
| startTesting | `(//span[span[contains(text(),'Start Testing')]])[2]` | static |
| approve | `//span[contains(text(),'Approve')]` | static |
| websiteLaunched | `//span[contains(text(),'Open objective URL https://lambdatest.com')]` | static |
| appLaunched | `//div[text()="Tap the 'CLICK BUTTON' button on mobile app"]` | static |
| saveTestcaseAuthoring | `//span[contains(text(), 'Save Test Case')]` | static |
| code | `//span[contains(text(), 'Code')]` | static |
| viewDetailsCode | `//h5[contains(text(), 'View details')]` | static |
| initialPromptChevron | `//span[text()='Initial prompt']//following-sibling::div//*[contains(@class, 'octicon-chevron-right')]` | static |
| initialPromptExpanded | `//span[text()='Initial prompt']//following-sibling::div//*[contains(@class, 'octicon-chevron-down')]` | static |
| testCasesButton | `//button[contains(.,'test cases')]` | static |
| testCasesTabCount | `//span[contains(., 'Test Cases')]//following-sibling::span[contains(@class, 'CounterLabel')]` | static |
| systemIdle | `//span[contains(text(),'System Idle')]` | static |
| saveButton | `//button[@aria-label='Save Test Case']` | static |

### Standalone exported functions

| Locator Name | Selector | Type |
|---|---|---|
| kaneaiJiraIssueKey | `` //span[text()='Initial prompt']//parent::div//following-sibling::div[contains(@class, 'overflow-hidden')]//span[text()='${key}'] `` | dynamic |

---

## Module Locators (`src/pages/module/module.locators.ts`)

### ModuleLocators (object)

| Locator Name | Selector | Type |
|---|---|---|
| createModule | `//span[text()="Create a Module"]` | static |
| moduleNameInputField | `//input[@placeholder="Enter module name"]` | static |
| moduleText | `//h5[span[text()="Modules"]]` | static |
| moduleDescription | `//textarea[@placeholder="Describe the purpose of this module (optional)."]` | static |
| moduleTag | `//input[@placeholder="Add Tags separated by enter"]` | static |
| moduleStepSteps | `//span[text() = 'Enter the test step details']/following-sibling::div[1]` | static |
| moduleStepStepsCancel | `//span[text()='Cancel']` | static |
| moduleAddStep | `//span[text()="Add"]` | static |
| createNewModule | `//span[text()="Create new module"]` | static |
| addStep | `//span[text()="Add Step"]` | static |
| moduleVersion | `//button[contains(@class, "lt-select-anchor")]//span[normalize-space(text())="Version:"]/following-sibling::span` | static |
| moreActions | `//button[@aria-label="More actions"]` | static |
| addModule | `//span[text()="Add Module"]` | static |
| createAModule | `//span[text()="Create Module"]` | static |
| insertModule | `//span[text()="Insert a module"]` | static |
| generateWithAi | `//button[span[text()="Generate with AI"]]` | static |
| testCaseLimitButton | `#test-case-limit-button` | static |
| testCaseLimitInputBox | `(//div[@id='slider-test-case-limit']//input[@role='spinbutton'])[2]` | static |
| generateWithAiInputBox | `//textarea[@name='message']` | static |
| createAndAutomate | `//span[text()="Create and automate"]` | static |
| verifyScenarios | `//button[.//span[contains(normalize-space(.),'Create') and contains(normalize-space(.),'test cases')]]` | static |
| submitGenerateWithAi | `//div[@id='omnibox-input-toolbar']//button[@type = 'submit']` | static |

### Standalone exported functions

| Locator Name | Selector | Type |
|---|---|---|
| moduleName | `` //div[@role='button' and @aria-label='Edit Module Name']//h5[normalize-space(text())='${name}'] `` | dynamic |
