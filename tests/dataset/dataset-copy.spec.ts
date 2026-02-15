import { test, expect } from "../../src/fixtures/tms.fixture.js";


test.describe.serial('Dataset Copy', {
  tag: ['@regression' ],
  annotation: [
    { type: 'feature', description: 'Dataset Management' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should copy a dataset', async ({ projectOnly, page, datasetPage }) => {
    await datasetPage.openDatasetsTab();
    await datasetPage.verifyEmptyState();
    await datasetPage.createDatasetWithDetails();
    await datasetPage.copyDataset();
  });
});