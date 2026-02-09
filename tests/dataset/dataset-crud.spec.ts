import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Dataset CRUD', {
  tag: ['@smoke', '@regression'],
  annotation: [
    { type: 'feature', description: 'Dataset Management' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should perform full dataset CRUD lifecycle', async ({ page, projectPage, datasetPage }) => {
    // Step 1-2: Open test manager and create a project with title, tag, description
    await projectPage.createProjectWithTagDescription();

    // Step 3: Open created project
    await projectPage.openProject();

    // Step 4: Open Datasets tab
    await datasetPage.openDatasetsTab();

    // Step 5: Verify datasets empty state is displayed
    await datasetPage.verifyEmptyState();

    // Step 6: Create a dataset with name and description
    await datasetPage.createDatasetWithDetails();

    // Step 7: Navigate back to datasets list
    await datasetPage.navigateBackToDatasetsList();

    // Step 8: Verify dataset is created successfully in list
    await datasetPage.verifyDatasetCreated();

    // Step 9: Search for created dataset by name
    await datasetPage.searchForCreatedDataset();

    // Step 10: Verify search results show created dataset
    await datasetPage.verifySearchResults();

    // Step 11: Clear dataset search
    await datasetPage.clearDatasetSearch();

    // Step 12: Open created dataset
    await datasetPage.openCreatedDataset();

    // Step 13: Edit dataset name and description
    await datasetPage.editDatasetDetails();

    // Step 14: Verify dataset name is updated
    await datasetPage.verifyDatasetUpdated();

    // Step 15: Navigate back to datasets list
    await datasetPage.navigateBackToDatasetsList();

    // Step 16: Open updated dataset
    await datasetPage.openUpdatedDataset();

    // Step 17: Add two rows to dataset
    await datasetPage.addDatasetRows();

    // Step 18: Navigate back to datasets list
    await datasetPage.navigateBackToDatasetsList();

    // Step 19: Verify dataset shows 2 parameters
    await datasetPage.verifyParameterCount(2);

    // Step 20: Delete the created dataset
    await datasetPage.deleteCreatedDataset();

    // Step 21: Verify dataset is deleted successfully
    await datasetPage.verifyDatasetDeleted();

    // Step 22: Back on project list page
    await projectPage.backToProjectList();

    // Step 23: Delete the created project
    await projectPage.deleteProject();
  });
});
