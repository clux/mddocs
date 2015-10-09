#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var marked = require('marked');
var exec = require('child_process').execSync;
var argv = require('yargs')
    .usage('Usage: $0 file.md -u [user]')
    .demand(1)
    .alias('u', 'user')
    .argv;

var file = argv._[0];
var api = fs.readFileSync(file).toString();

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

var renderer = new marked.Renderer();
var content = marked(api, { renderer: renderer });

var pkg = require(path.join(process.cwd(), 'package.json'));
var version = pkg.version;
var name = pkg.name;
var namePretty = name.charAt(0).toUpperCase() + name.slice(1);
var gituser = argv.user || 'clux';

var template = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${name} Documentation v${version}</title>
  <link rel="canonical" href="https://${gituser}.github.io/${name}">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700,400italic">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.8.0/styles/default.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.8.0/highlight.min.js"></script>
  <script>hljs.initHighlightingOnLoad();</script>
</head>
<body>
${content}
</body>
</html>
`;

process.stdout.write(template);
