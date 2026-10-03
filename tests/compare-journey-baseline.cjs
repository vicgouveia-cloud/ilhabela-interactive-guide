// Existing regression tests contain historical catalog/CTA expectations.
// Run the same tests against the audited main SHA and fail on new failures.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const baselineSha = '76f3b909426e91469737490ec29ff079d2e0589b';
const baselineDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ilhabela-journey-base-'));
const evidence = path.join(root, 'journey-regression-results');
fs.mkdirSync(evidence, { recursive: true });
function command(bin, args, cwd = root, env = process.env) {
  const result = spawnSync(bin, args, { cwd, env, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
  if (result.error) throw result.error;
  return result;
}
const checkout = command('git', ['worktree', 'add', '--detach', baselineDir, baselineSha]);
if (checkout.status !== 0) throw Error(checkout.stderr);
const install = command('npm', ['ci'], baselineDir);
if (install.status !== 0) throw Error(install.stderr);
function runTests(cwd, name) {
  const output = path.join(evidence, name + '.json');
  const result = command('npx', ['playwright', 'test', 'tests/home-planner.spec.cjs', 'tests/multimodal.spec.cjs', '--reporter=json', '--trace=off'], cwd, { ...process.env, PLAYWRIGHT_JSON_OUTPUT_NAME: output });
  if (!fs.existsSync(output)) throw Error(result.stderr || result.stdout);
  const report = JSON.parse(fs.readFileSync(output, 'utf8'));
  if (report.errors?.length) throw Error(JSON.stringify(report.errors));
  const statuses = new Map();
  function visit(suites, ancestors = []) {
    for (const suite of suites || []) {
      const titles = [...ancestors, suite.title];
      for (const spec of suite.specs || []) for (const test of spec.tests || []) {
        statuses.set([...titles, spec.title, test.projectName || ''].join(' > '), test.status);
      }
      visit(suite.suites, titles);
    }
  }
  visit(report.suites);
  return { statuses, stats: report.stats };
}
const baseline = runTests(baselineDir, 'main-baseline');
const candidate = runTests(root, 'branch');
const regressions = [...candidate.statuses].filter(([name, status]) => status !== 'expected' && status !== 'skipped' && baseline.statuses.get(name) !== status);
const summary = {
  baselineSha,
  baseline: baseline.stats,
  branch: candidate.stats,
  existingFailures: [...baseline.statuses].filter(([, status]) => status !== 'expected' && status !== 'skipped').map(([name]) => name),
  newFailures: regressions.map(([name]) => name)
};
fs.writeFileSync(path.join(evidence, 'comparison.json'), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
if (candidate.statuses.size !== baseline.statuses.size) throw Error('Regression test count changed');
if (regressions.length) process.exitCode = 1;
