import { SlsCli } from '../src/slsCli';
import { SlsOptions } from '../src/slsOptions';

jest.setTimeout(30000);

test('sls cli can be installed', async (done) => {
  const version = "latest";

  const output = await SlsCli.install(version);
  expect(output.stdout).toBeTruthy();
  expect(output.stderr).not.toBeTruthy();
  done();
});

test('sls cli can be invoked', async (done) => {
  // jest.setTimeout(15000);
  const slsOptions: SlsOptions = {
    command: 'version'
  }

  const output = await SlsCli.run(slsOptions);
  expect(output.stdout).toBeTruthy();
  expect(output.stderr).not.toBeTruthy();
  done();
});
