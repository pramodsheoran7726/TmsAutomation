import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
  TestStep,
} from '@playwright/test/reporter';

// ──────────────────────────────────────────────────────────────
// ANSI color helpers
// ──────────────────────────────────────────────────────────────
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  gray: '\x1b[90m',
  white: '\x1b[37m',
  bgGreen: '\x1b[42m',
  bgRed: '\x1b[41m',
};

function duration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function timestamp(): string {
  return new Date().toLocaleTimeString('en-US', { hour12: false });
}

// ──────────────────────────────────────────────────────────────
// Step Reporter — prints each test.step() live as it executes
// ──────────────────────────────────────────────────────────────
class StepReporter implements Reporter {
  private testCount = 0;
  private passedCount = 0;
  private failedCount = 0;
  private skippedCount = 0;
  private startTime = 0;

  onBegin(config: FullConfig, suite: Suite): void {
    const total = suite.allTests().length;
    const workers = config.workers;
    this.startTime = Date.now();
    console.log('');
    console.log(`${c.bold}${c.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`);
    console.log(`${c.bold}  Running ${total} test(s) using ${workers} worker(s)${c.reset}`);
    console.log(`${c.bold}${c.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`);
    console.log('');
  }

  onTestBegin(test: TestCase, result: TestResult): void {
    this.testCount++;
    const project = test.parent.project()?.name ?? '';
    const file = test.location.file.split('/tests/').pop() ?? test.location.file;
    const title = test.title;
    const tags = test.tags.length ? ` ${c.dim}${test.tags.join(' ')}${c.reset}` : '';

    console.log(`${c.bold}${c.cyan}┌─ TEST ${this.testCount}${c.reset} ${c.gray}[${project}]${c.reset} ${c.bold}${title}${c.reset}${tags}`);
    console.log(`${c.cyan}│${c.reset}  ${c.dim}${file}:${test.location.line}${c.reset}  ${c.dim}started ${timestamp()}${c.reset}`);
  }

  onStepBegin(test: TestCase, _result: TestResult, step: TestStep): void {
    // Only show user-defined test.step() — skip internal Playwright steps
    if (step.category !== 'test.step') return;

    console.log(`${c.cyan}│${c.reset}  ${c.yellow}▶${c.reset}  ${step.title}`);
  }

  onStepEnd(test: TestCase, _result: TestResult, step: TestStep): void {
    if (step.category !== 'test.step') return;

    const ms = step.duration;
    if (step.error) {
      console.log(`${c.cyan}│${c.reset}  ${c.red}✗${c.reset}  ${step.title} ${c.red}FAILED${c.reset} ${c.dim}(${duration(ms)})${c.reset}`);
      // Print first line of error for quick visibility
      const errMsg = step.error.message?.split('\n')[0] ?? 'Unknown error';
      console.log(`${c.cyan}│${c.reset}     ${c.red}${errMsg}${c.reset}`);
    } else {
      console.log(`${c.cyan}│${c.reset}  ${c.green}✓${c.reset}  ${step.title} ${c.dim}(${duration(ms)})${c.reset}`);
    }
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    const totalMs = result.duration;
    const status = result.status;

    if (status === 'passed') {
      this.passedCount++;
      console.log(`${c.cyan}└─${c.reset} ${c.green}${c.bold}PASSED${c.reset} ${c.dim}(${duration(totalMs)})${c.reset}`);
    } else if (status === 'failed' || status === 'timedOut') {
      this.failedCount++;
      console.log(`${c.cyan}└─${c.reset} ${c.red}${c.bold}FAILED${c.reset} ${c.dim}(${duration(totalMs)})${c.reset}`);
      // Print error summary
      for (const error of result.errors) {
        const msg = error.message?.split('\n').slice(0, 3).join('\n   ') ?? 'Unknown error';
        console.log(`   ${c.red}${msg}${c.reset}`);
      }
    } else if (status === 'skipped') {
      this.skippedCount++;
      console.log(`${c.cyan}└─${c.reset} ${c.yellow}${c.bold}SKIPPED${c.reset}`);
    } else {
      console.log(`${c.cyan}└─${c.reset} ${c.dim}${status}${c.reset} ${c.dim}(${duration(totalMs)})${c.reset}`);
    }
    console.log('');
  }

  onEnd(result: FullResult): void {
    const totalMs = Date.now() - this.startTime;
    console.log(`${c.bold}${c.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`);
    console.log(`${c.bold}  Results:${c.reset}`);

    if (this.passedCount > 0) {
      console.log(`    ${c.green}${c.bold}${this.passedCount} passed${c.reset}`);
    }
    if (this.failedCount > 0) {
      console.log(`    ${c.red}${c.bold}${this.failedCount} failed${c.reset}`);
    }
    if (this.skippedCount > 0) {
      console.log(`    ${c.yellow}${c.bold}${this.skippedCount} skipped${c.reset}`);
    }

    console.log(`    ${c.dim}Total time: ${duration(totalMs)}${c.reset}`);
    console.log(`${c.bold}${c.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`);
    console.log('');
  }
}

export default StepReporter;
