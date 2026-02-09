export interface ConfigurationRequest {
  name: string;
  configType?: string;
  platformType?: string;
  osType?: string;
  osVersion?: string;
  browser?: string;
  browserVersion?: string;
  resolution?: string;
  manufacturer?: string;
  appName?: string;
  device?: string;
  url?: string;
  deviceType?: string;
  mobileType?: string;
}
