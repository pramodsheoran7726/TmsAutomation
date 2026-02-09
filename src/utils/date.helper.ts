// ──────────────────────────────────────────────────────────────
// Date helpers for test data (date ranges, formatting)
// ──────────────────────────────────────────────────────────────

/** Format a Date as YYYY-MM-DD */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Get today's date formatted as YYYY-MM-DD */
export function today(): string {
  return formatDate(new Date());
}

/** Get a date N days ago formatted as YYYY-MM-DD */
export function daysAgo(n: number): string {
  return formatDate(new Date(Date.now() - n * 24 * 60 * 60 * 1000));
}

/** Get yesterday's date formatted as YYYY-MM-DD */
export function yesterday(): string {
  return daysAgo(1);
}
