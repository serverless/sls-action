export interface SlsOptions {
  command: string;
  yamlFile?: string | undefined;
  azureSubId?: string | undefined;
  azureResourceGroup?: string | undefined;
  azurePrefix?: string | undefined;
  region?: string | undefined;
  stage?: string | undefined;
}
