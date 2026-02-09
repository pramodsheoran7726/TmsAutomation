/**
 * Priority test data for parameterized testing.
 * Each entry: [display name, expected behavior/tag]
 */
export const TEST_CASE_PRIORITIES = [
  { name: 'Critical', description: 'Highest priority - blocks release' },
  { name: 'High', description: 'Important - should be fixed before release' },
  { name: 'Medium', description: 'Normal priority - fix in current sprint' },
  { name: 'Low', description: 'Low priority - can be deferred' },
] as const;

export type TestCasePriority = (typeof TEST_CASE_PRIORITIES)[number];
