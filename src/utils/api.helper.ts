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
      },
    });
    const body = (await response.json()) as T;
    return { status: response.status(), body };
  }

  async getWithBasicAuth<T>(
    url: string,
    email: string,
    token: string,
  ): Promise<{ status: number; body: T }> {
    const auth = Buffer.from(`${email}:${token}`).toString('base64');
    const response = await this.request.get(url, {
      headers: { Authorization: `Basic ${auth}` },
    });
    const body = (await response.json()) as T;
    return { status: response.status(), body };
  }

  async postWithAuth<T>(
    url: string,
    data: unknown,
    authToken: string,
  ): Promise<{ status: number; body: T }> {
    const response = await this.request.post(url, {
      data,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
    });
    const body = (await response.json()) as T;
    return { status: response.status(), body };
  }

  async deleteWithAuth<T>(
    url: string,
    authToken: string,
  ): Promise<{ status: number; body: T }> {
    const response = await this.request.delete(url, {
      headers: { Authorization: authToken },
    });
    const body = (await response.json().catch(() => ({}) as T));
    return { status: response.status(), body };
  }

  async getWithAuth<T>(
    url: string,
    authToken: string,
  ): Promise<{ status: number; body: T }> {
    const response = await this.request.get(url, {
      headers: { Authorization: authToken },
    });
    const body = (await response.json()) as T;
    return { status: response.status(), body };
  }

  async patchWithAuth<T>(
    url: string,
    data: unknown,
    authToken: string,
  ): Promise<{ status: number; body: T }> {
    const response = await this.request.patch(url, {
      data,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
    });
    const body = (await response.json()) as T;
    return { status: response.status(), body };
  }
}
