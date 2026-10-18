const fs = require('node:fs');
const path = require('node:path');
const {spawnSync} = require('node:child_process');
const files = fs.readdirSync(__dirname).filter(file => /^audit-.*\.cjs$/.test(file)).sort();
if (!files.length) throw new Error('No audits discovered');
let failures = 0;
for (const file of files) {
  console.log('\nAudit: ' + file);
  const result = spawnSync(process.execPath, [path.join(__dirname, file)], {cwd:path.resolve(__dirname,'..'), stdio:'inherit'});
  if (result.error || result.status !== 0) failures++;
}
console.log('\nAudits: ' + files.length + ' executed, ' + (files.length-failures) + ' passed, ' + failures + ' failed');
process.exitCode = failures ? 1 : 0;
