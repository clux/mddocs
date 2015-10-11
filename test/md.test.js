var test = require('bandage');
var fs = require('co-fs');
var mddoc = require('..');

var verifyTestMd = function (t, html) {
  t.ok(html.indexOf('href="https://woot.github.io/testmod">') >= 0, 'canonical');
  t.ok(html.indexOf('<span class="hljs-number">') >= 0, 'markdown');
  t.ok(html.indexOf('<title>Testmod Documentation v1.0.0</title>') >= 0, 'title');
  t.ok(html.indexOf('<script>hljs.initHighlightingOnLoad();</script>') >= 0, 'syntx');
};

test('cli output', function *(t) {
  var html = yield fs.readFile('./test/api.html', 'utf8');
  verifyTestMd(t, html);
});

test('lib output', function *(t) {
  var input = yield fs.readFile('./test/api.md', 'utf8');
  var html = yield *mddoc(input, { user: 'woot', name: "testmod", version: "1.0.0" });
  verifyTestMd(t, html);
});
