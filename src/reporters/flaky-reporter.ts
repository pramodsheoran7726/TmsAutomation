import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

// ──────────────────────────────────────────────────────────────
// ANSI color helpers (same palette as step-reporter.ts)
// ──────────────────────────────────────────────────────────────
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

// ──────────────────────────────────────────────────────────────
// Flaky Reporter — detects tests that fail then pass on retry
// ──────────────────────────────────────────────────────────────
class FlakyReporter implements Reporter {
  private rootSuite!: Suite;
  /** Map of test ID → error message from the first attempt */
  private firstAttemptErrors = new Map<string, string>();
  /** Map of test ID → retry number on which the test finally passed */
  private passedOnRetry = new Map<string, number>();

  onBegin(config: FullConfig, suite: Suite): void {
    this.rootSuite = suite;
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    // Capture error from the first attempt (retry === 0)
    if (result.retry === 0 && result.status === 'failed') {
      const errMsg =
        result.errors[0]?.message?.split('\n')[0] ?? 'Unknown error';
      this.firstAttemptErrors.set(test.id, errMsg);
    }

    // Track the retry number on which the test passed
    if (result.retry > 0 && result.status === 'passed') {
      this.passedOnRetry.set(test.id, result.retry);
    }
  }

  onEnd(result: FullResult): void {
    const allTests = this.rootSuite.allTests();
    const totalTests = allTests.length;

    const flakyTests = allTests
      .filter((t) => t.outcome() === 'flaky')
      .map((t) => {
        const file =
          t.location.file.split('/tests/').pop() ?? t.location.file;
        const retriesUsed = this.passedOnRetry.get(t.id) ?? 0;
        return {
          title: t.title,
          file,
          line: t.location.line,
          tags: t.tags,
          retriesUsed,
          firstError: this.firstAttemptErrors.get(t.id) ?? 'Unknown error',
        };
      });

    const flakyCount = flakyTests.length;

    // ── Console output ──
    if (flakyCount > 0) {
      console.log('');
      console.log(
        `${c.bold}${c.yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`,
      );
      console.log(
        `${c.bold}${c.yellow}  ⚠ ${flakyCount} flaky test(s) detected${c.reset}`,
      );
      console.log(
        `${c.bold}${c.yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`,
      );

      for (const t of flakyTests) {
        console.log(
          `${c.yellow}  ●${c.reset} ${c.bold}${t.title}${c.reset} ${c.dim}(passed on retry ${t.retriesUsed})${c.reset}`,
        );
        console.log(
          `    ${c.dim}${t.file}:${t.line}${c.reset}`,
        );
        console.log(
          `    ${c.gray}Error: ${t.firstError}${c.reset}`,
        );
      }

      console.log(
        `${c.bold}${c.yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`,
      );
      console.log('');
    }

    // ── JSON output ──
    const report = {
      timestamp: new Date().toISOString(),
      totalTests,
      flakyCount,
      flakyTests,
    };

    const outputPath = path.resolve(process.cwd(), 'flaky-tests.json');
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  }
}

export default FlakyReporter;
