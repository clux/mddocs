var test = require('bandage');
var fs = require('co-fs');

test('api.md', function *(t) {
  var html = yield fs.readFile('./test/api.html', 'utf8');
  t.ok(html.indexOf('href="https://woot.github.io/testmod">') >= 0, 'canonical');
  t.ok(html.indexOf('<span class="hljs-number">') >= 0, 'markdown');
  t.ok(html.indexOf('<title>Testmod Documentation v1.0.0</title>') >= 0, 'title');
  t.ok(html.indexOf('<script>hljs.initHighlightingOnLoad();</script>') >= 0, 'syntx');
});
