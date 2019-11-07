import process from "process";
import * as core from '@actions/core';
import { SlsCli } from './slsCli';
import { SlsOptions } from './slsOptions';

async function run() {
  try {
    const version = require('../package.json').version;
    console.info(`Running serverless action v${version}...`);

    const slsVersion = getInputParam("slsVersion", true);
    const slsCommand = getInputParam("slsCommand", true);
    const yamlFile = getInputParam('yamlFile');
    const azureSubId = getInputParam("azureSubId");
    const azureResourceGroup = getInputParam("azureResourceGroup");
    const azurePrefix = getInputParam("azurePrefix");
    const region = getInputParam("region");
    const stage = getInputParam("stage");

    // make sure sls CLI is available
    const installOutput = await SlsCli.install(slsVersion);
    core.debug(`npm stdout:\n\n${installOutput.stdout}`);
    if (installOutput.stderr) {
      fail(installOutput.stderr);
    }

    const slsOptions: SlsOptions = {
      command: slsCommand,
      yamlFile: yamlFile,
      azureSubId: azureSubId,
      azureResourceGroup: azureResourceGroup,
      azurePrefix: azurePrefix,
      region: region,
      stage: stage
    }

    const slsOutput = await SlsCli.run(slsOptions);
    core.debug(`sls stdout:\n\n${slsOutput.stdout}`);

    if (slsOutput.stderr) {
      fail(slsOutput.stderr);
    }
  } catch (error) {
    fail(error.message);
  }
}

function getInputParam(name: string, isRequired = false): string {
  const inputVar = core.getInput(name);
  core.debug(`${name}=${inputVar}`);
  if (isRequired && !inputVar) {
    core.setFailed(`Required input parameter '${name}' was not provided; exiting.`);
    process.exit(10);
  }
  return inputVar;
}

function fail(message: string) {
  core.setFailed(message);
  process.exit(11);
}

run();
