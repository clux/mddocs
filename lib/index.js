var marked = require('marked');
marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});
var renderer = new marked.Renderer();

var highlighting = () => {
  var hllib = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.8.0";
  return `<link rel="stylesheet" href="${hllib}/styles/default.min.css">
          <script src="${hllib}/highlight.min.js"></script>
          <script>hljs.initHighlightingOnLoad();</script>`;
};


module.exports = (md, opts) => {
  var content = marked(md, { renderer: renderer });
  var namePretty = opts.name.charAt(0).toUpperCase() + opts.name.slice(1);
  return `<!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${namePretty} Documentation v${opts.version}</title>
    <link rel="canonical" href="https://${opts.user}.github.io/${opts.name}">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700,400italic">
    ${highlighting()}
  </head>
  <body>
  ${content}
  </body>
  </html>
  `;
};
