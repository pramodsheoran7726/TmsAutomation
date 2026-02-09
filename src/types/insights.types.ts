/** Request DTO for TC Summary Insights */
export interface TCSummaryInsightsDataRequest {
  query: {
    size: number;
    aggs: {
      rows: {
        terms: { field: string; size: number };
        aggs: {
          columns: {
            filter: { match_all: Record<string, unknown> };
            aggs: {
              '#numberoftestcases': {
                value_count: { field: string };
              };
            };
          };
        };
      };
    };
  };
  filters: string;
  meta: { type: string; isEncoded: boolean };
  index: string;
}

/** Response DTO for TC Summary Insights */
export interface TCSummaryInsightsDataResponse {
  data: Array<{
    '#numberoftestcases': number;
    rowName: string;
  }>;
  meta: { afterKey: string };
}
