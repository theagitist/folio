// Run with: node test.js
const assert = require('assert');
const vm = require('vm');
const ctx = { window: {} };
vm.runInNewContext(require('fs').readFileSync(__dirname + '/folio.js', 'utf8'), ctx);
const { views } = ctx.window.Folio;
const j = (v) => JSON.stringify(v);

assert.strictEqual(j(views(4, true)), '[[1],[2,3],[4]]');
assert.strictEqual(j(views(5, true)), '[[1],[2,3],[4,5]]');
assert.strictEqual(j(views(1, true)), '[[1]]');
assert.strictEqual(j(views(3, false)), '[[1],[2],[3]]');
console.log('ok');
