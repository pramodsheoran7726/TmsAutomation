// ──────────────────────────────────────────────────────────────
// API Response Types — Typed interfaces for TMS API responses
// ──────────────────────────────────────────────────────────────

export interface ProjectResponse {
  id: string;
  project_id?: string;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TestCaseResponse {
  id: string;
  test_case_id?: string;
  title: string;
  project_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TestRunResponse {
  id: string;
  test_run_id?: string;
  name: string;
  project_id?: string;
  test_case_ids?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface ListResponse<T> {
  data: T[];
  total?: number;
  page?: number;
  per_page?: number;
}

export interface ApiErrorResponse {
  error?: string;
  message?: string;
  status?: number;
}
