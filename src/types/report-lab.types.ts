// ──────────────────────────────────────────────────────────────
// Report-Lab Types — Matches KaneAI payload structure exactly
// ──────────────────────────────────────────────────────────────

export interface ReportLabBuildPayload {
  team: string;
  env: string;
  suite: string;
  id: string;
  name: string;
}

export interface ReportLabResult {
  status: 'passed' | 'failed' | 'skipped';
  message: string;
  stacktrace: unknown;
}

export interface ReportLabStep {
  name: string;
  module: string;
  args: Record<string, unknown>;
  assertions: ReportLabStep[];
  result: ReportLabResult;
  step_start_time: number;
  step_end_time: number;
  rca: string;
  job_id?: string[];
  test_run_id?: string;
}

export interface ReportLabStage {
  name: string;
  description: string;
  stage_start_time: number;
  stage_end_time: number;
  steps: ReportLabStep[];
}

export interface ReportLabTestPayload {
  name: string;
  description: string;
  id: string;
  test_case_url: string;
  priority: string;
  start_time: number;
  end_time: number;
  duration?: number;
  suite: string[];
  links: Array<{ subject: string; url: string }>;
  coverage: Record<string, unknown>;
  attached_jiras?: string | null;
  result: ReportLabResult;
  stages: ReportLabStage[];
  error?: string;
}

export interface ReportLabSummary {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  build_id: string;
  env: string;
  suite: string;
  failed_tests: Array<{ name: string; error: string }>;
}
