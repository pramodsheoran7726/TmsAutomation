import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import type {
  FullConfig,
  Reporter,
  Suite,
  TestCase,
  TestResult,
  TestStep,
} from '@playwright/test/reporter';
import type { ReportLabStage, ReportLabStep, ReportLabTestPayload } from '../types/report-lab.types';

const RESULTS_DIR = 'report-lab-results';

// ──────────────────────────────────────────────────────────────
// Report-Lab Reporter — writes one JSON file per test for
// post-run upload to the report-lab dashboard
//
// Payload structure mirrors KaneAI testkit exactly.
// ──────────────────────────────────────────────────────────────
class ReportLabReporter implements Reporter {
  private suite = process.env.TEST_SUITE ?? '@smoke';

  onBegin(_config: FullConfig, _suite: Suite): void {
    if (fs.existsSync(RESULTS_DIR)) {
      for (const file of fs.readdirSync(RESULTS_DIR)) {
        fs.unlinkSync(path.join(RESULTS_DIR, file));
      }
    } else {
      fs.mkdirSync(RESULTS_DIR, { recursive: true });
    }
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    const projectName = test.parent.project()?.name;
    if (projectName === 'setup') return;

    const titlePath = test.titlePath().join(' > ');
    const testId = crypto.createHash('md5').update(titlePath).digest('hex');

    const startMs = result.startTime.getTime();
    const endMs = startMs + result.duration;

    const status = this.mapStatus(result.status);
    const errorMessage = this.extractError(result);

    const stages = this.buildStages(result, startMs);
    const priority = this.extractPriority(test);
    const suiteName = this.suite.replace('@', '');

    const payload: ReportLabTestPayload = {
      name: test.title,
      description: titlePath,
      id: testId,
      test_case_url: '',
      priority,
      start_time: startMs,
      end_time: endMs,
      suite: [suiteName],
      links: [],
      coverage: {},
      result: {
        status,
        message: errorMessage ?? `Test Status: ${status}`,
        stacktrace: errorMessage ? errorMessage : [],
      },
      stages,
    };

    // Keep error field for our summary/slack use
    if (status === 'failed' && errorMessage) {
      payload.error = errorMessage;
    }

    const filename = `${testId}.json`;
    fs.writeFileSync(
      path.join(RESULTS_DIR, filename),
      JSON.stringify(payload, null, 2),
    );
  }

  // ── Helpers ──────────────────────────────────────────────────

  private buildStages(result: TestResult, testStartMs: number): ReportLabStage[] {
    const stages: ReportLabStage[] = [];
    let runningMs = testStartMs;

    for (const step of result.steps) {
      if (step.category !== 'test.step') continue;
      const stage = this.stepToStage(step, runningMs);
      stages.push(stage);
      runningMs += step.duration;
    }

    // Fallback: single "Test Execution" stage
    if (stages.length === 0) {
      stages.push({
        name: 'execution',
        description: 'Test Execution',
        stage_start_time: testStartMs,
        stage_end_time: testStartMs + result.duration,
        steps: [{
          name: 'Test Execution',
          module: 'test.step',
          args: {},
          assertions: [],
          result: {
            status: this.mapStatus(result.status),
            message: `Test Status: ${this.mapStatus(result.status)}`,
            stacktrace: [],
          },
          step_start_time: testStartMs,
          step_end_time: testStartMs + result.duration,
          rca: '',
        }],
      });
    }

    return stages;
  }

  private stepToStage(step: TestStep, stageStartMs: number): ReportLabStage {
    const stageEndMs = stageStartMs + step.duration;
    const childSteps: ReportLabStep[] = [];

    let runningMs = stageStartMs;
    for (const child of step.steps) {
      if (child.category !== 'test.step') continue;
      const stepStartMs = runningMs;
      const stepEndMs = stepStartMs + child.duration;
      const stepStatus = child.error ? 'failed' : 'passed';

      childSteps.push({
        name: child.title,
        module: 'test.step',
        args: {},
        assertions: [],
        result: {
          status: stepStatus,
          message: child.error?.message?.split('\n')[0] ?? '',
          stacktrace: child.error?.message ?? '',
        },
        step_start_time: stepStartMs,
        step_end_time: stepEndMs,
        rca: '',
      });
      runningMs += child.duration;
    }

    return {
      name: step.title,
      description: step.title,
      stage_start_time: stageStartMs,
      stage_end_time: stageEndMs,
      steps: childSteps,
    };
  }

  private extractError(result: TestResult): string | null {
    if (result.errors.length === 0) return null;
    return result.errors
      .map((e) => e.message?.split('\n').slice(0, 5).join('\n') ?? 'Unknown error')
      .join('\n---\n');
  }

  private extractPriority(test: TestCase): string {
    for (const annotation of test.annotations) {
      if (annotation.type === 'severity' && annotation.description) {
        return annotation.description;
      }
    }
    return 'p2';
  }

  private mapStatus(status: string): 'passed' | 'failed' | 'skipped' {
    switch (status) {
      case 'passed':
        return 'passed';
      case 'skipped':
      case 'interrupted':
        return 'skipped';
      default:
        return 'failed';
    }
  }
}

export default ReportLabReporter;
