import { APIRequestContext } from '@playwright/test';

export class ApiHelper {
  constructor(private readonly request: APIRequestContext) {}

  async post<T>(url: string, data: unknown, headers?: Record<string, string>): Promise<T> {
    const response = await this.request.post(url, {
      data,
      headers: { 'Content-Type': 'application/json', ...headers },
    });
    return response.json() as Promise<T>;
  }

  async get<T>(url: string, headers?: Record<string, string>): Promise<T> {
    const response = await this.request.get(url, { headers });
    return response.json() as Promise<T>;
  }

  async postWithBasicAuth<T>(
    url: string,
    data: unknown,
    email: string,
    token: string,
  ): Promise<{ status: number; body: T }> {
    const auth = Buffer.from(`${email}:${token}`).toString('base64');
    const response = await this.request.post(url, {
      data,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
        'X-Atlassian-Token': 'no-check',
      },
    });
    const status = response.status();
    const text = await response.text();
    let body: T;
    try {
      body = JSON.parse(text) as T;
    } catch {
      throw new Error(`API POST ${url} returned ${status}: ${text}`);
    }
    return { status, body };
  }

  async getWithBasicAuth<T>(
    url: string,
    email: string,
    token: string,
  ): Promise<{ status: number; body: T }> {
    const auth = Buffer.from(`${email}:${token}`).toString('base64');
    const response = await this.request.get(url, {
      headers: {
        Authorization: `Basic ${auth}`,
        'X-Atlassian-Token': 'no-check',
      },
    });
    const body = (await response.json()) as T;
    return { status: response.status(), body };
  }

  /** Generic auth request — all *WithAuth methods delegate to this */
  private async requestWithAuth<T>(
    method: 'post' | 'get' | 'delete' | 'patch',
    url: string,
    authToken: string,
    data?: unknown,
  ): Promise<{ status: number; body: T }> {
    const headers: Record<string, string> = { Authorization: authToken };
    if (data !== undefined) headers['Content-Type'] = 'application/json';

    const response = await this.request[method](url, {
      ...(data !== undefined ? { data } : {}),
      headers,
    });
    const body = (await response.json().catch(() => ({}) as T));
    return { status: response.status(), body };
  }

  async postWithAuth<T>(url: string, data: unknown, authToken: string): Promise<{ status: number; body: T }> {
    return this.requestWithAuth<T>('post', url, authToken, data);
  }

  async deleteWithAuth<T>(url: string, authToken: string): Promise<{ status: number; body: T }> {
    return this.requestWithAuth<T>('delete', url, authToken);
  }

  async getWithAuth<T>(url: string, authToken: string): Promise<{ status: number; body: T }> {
    return this.requestWithAuth<T>('get', url, authToken);
  }

  async patchWithAuth<T>(url: string, data: unknown, authToken: string): Promise<{ status: number; body: T }> {
    return this.requestWithAuth<T>('patch', url, authToken, data);
  }
}
