var fs = require('co-fs');
var join = require('path').join;
var asset = (file) => join(__dirname, '..', 'assets', file);
var marked = require('marked');
marked.setOptions({
  highlight: (code) => require('highlight.js').highlightAuto(code).value,
});
var renderer = new marked.Renderer();

var highlighting = () => {
  var hllib = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.8.0';
  return `<link rel="stylesheet" href="${hllib}/styles/default.min.css">
          <script src="${hllib}/highlight.min.js"></script>
          <script>hljs.initHighlightingOnLoad();</script>`;
};

module.exports = function *(md, opts) {
  var content = marked(md.toString(), {renderer});
  var namePretty = opts.name.charAt(0).toUpperCase() + opts.name.slice(1);
  var styles = yield fs.readFile(asset('styles.css'));
  var behaviour = yield fs.readFile(asset('main.js'));

  return `<!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${namePretty} Documentation v${opts.version}</title>
    <link rel="canonical" href="https://${opts.user}.github.io/${opts.name}">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700,400italic">
    ${highlighting()}
    <style>${styles}</style>
    <script>${behaviour}</script>
  </head>
  <body>
  <h1>${namePretty} v${opts.version} Documentation</h1>
  <div id="toc"></div>
  <div id="apicontent">${content}</div>
  </body>
  </html>
  `;
};
