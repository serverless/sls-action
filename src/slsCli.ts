import * as exec from '@actions/exec';
import { SlsOptions } from './slsOptions';

export class SlsCli {

  public static async install(version: string) {
    let output: string = '';
    let errOutput: string ='';

    const execOptions = {
      listeners: {
        stdout: (data: Buffer) => {
          output += data.toString();
        },
        stderr: (data: Buffer) => {
          errOutput += data.toString();
        }
      }
    };

    const slsPackage = `serverless@${version}`;
    await exec.exec("npm", ["install", slsPackage], execOptions);
    return {
      stdout: output,
      stderr: errOutput
    }
  }

  public static async run(slsOptions: SlsOptions) {
    // TODO: sniff test params; possibly put isValid method on SlsOptions

    let output: string = '';
    let errOutput: string ='';

    const execOptions = {
      listeners: {
        stdout: (data: Buffer) => {
          output += data.toString();
        },
        stderr: (data: Buffer) => {
          errOutput += data.toString();
        }
      }
    };

    const args = ["sls", slsOptions.command];
    if (slsOptions.yamlFile) {
      args.push("--config", slsOptions.yamlFile);
    }

    if (slsOptions.region) {
      args.push("--region", slsOptions.region);
    }

    if (slsOptions.stage) {
      args.push("--stage", slsOptions.stage);
    }

    if (slsOptions.azureSubId) {
      args.push("--subscriptionId", slsOptions.azureSubId);
    }

    if (slsOptions.azurePrefix) {
      args.push("--prefix", slsOptions.azurePrefix);
    }

    if (slsOptions.azureResourceGroup) {
      args.push("--resourceGroup", slsOptions.azureResourceGroup);
    }

    await exec.exec("npx", args, execOptions);
    return {
      stdout: output,
      stderr: errOutput
    }
  }
}
