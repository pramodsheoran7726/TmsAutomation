import { EnvConfig } from '../config/env.config.js';

export function createUrl(path: string, base?: string): string {
  const baseUrl = base ?? EnvConfig.tmsBaseUrl;
  return `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export function jiraApiUrl(endpoint: string): string {
  return `${EnvConfig.jiraBaseUrl}${EnvConfig.jiraApiVersion}${endpoint}`;
}
