const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { execFileSync } = require('node:child_process');
const vm = require('node:vm');
const parse5 = require('parse5');
const ROOT = path.resolve(__dirname, '..');
const output = fs.mkdtempSync(path.join(os.tmpdir(), 'ilhabela-attraction-generator-'));
const approved = path.join(ROOT, 'lugares');
const ids = fs.readdirSync(approved).filter(id => fs.existsSync(path.join(approved, id, 'index.html'))).sort();
assert.equal(ids.length, 50);
// Ignore formatting whitespace only; compare every node, attribute, text and script.
function semantic(node) {
  if (node.nodeName === '#text') {
    const value = node.value.replace(/\r\n/g, '\n');
    return value.trim() ? { text: value } : null;
  }
  return {
    name: node.nodeName, attrs: node.attrs,
    children: (node.childNodes || []).map(semantic).filter(Boolean)
  };
}
const before = new Map(ids.map(id => [id, fs.readFileSync(path.join(approved, id, 'index.html'))]));
const generate = () => execFileSync(process.execPath, [path.join(ROOT, 'scripts/generate-attraction-pages.cjs')], {
  cwd: ROOT, env: { ...process.env, SITE_URL: 'https://ilhabelatrip.com', ATTRACTION_OUTPUT_DIR: output }
});
generate();
assert.deepEqual(fs.readdirSync(output).sort(), ids);
const first = new Map();
for (const id of ids) {
  const html = fs.readFileSync(path.join(output, id, 'index.html'));
  assert.deepEqual(semantic(parse5.parse(html.toString())), semantic(parse5.parse(before.get(id).toString())), id);
  first.set(id, html);
}
generate();
for (const id of ids) {
  assert(first.get(id).equals(fs.readFileSync(path.join(output, id, 'index.html'))), `${id}: deterministic second run`);
  assert(before.get(id).equals(fs.readFileSync(path.join(approved, id, 'index.html'))), `${id}: source untouched`);
}
// Missing editorial copy must fail before any output mutation, without a fallback.
const source = fs.readFileSync(path.join(ROOT, 'scripts/generate-attraction-pages.cjs'), 'utf8');
const realFs = fs;
const noCopyFs = {
  ...realFs,
  readFileSync(file, encoding) {
    return String(file).endsWith('attraction-access-copy.json') ? '{}' : realFs.readFileSync(file, encoding);
  },
  mkdirSync() { assert.fail('Output mutated before validation'); },
  writeFileSync() { assert.fail('Output mutated before validation'); },
  rmSync() { assert.fail('Output mutated before validation'); }
};
assert.throws(() => vm.runInNewContext(source, {
  require: name => name === 'node:fs' ? noCopyFs : require(name),
  __dirname: path.join(ROOT, 'scripts'), process: { env: {} }, console
}), /Missing reviewed access copy/);
console.log(`Generator OK: 50 complete DOM comparisons; two byte-identical runs; sources untouched; missing copy blocked. Output: ${output}`);
