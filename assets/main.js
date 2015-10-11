var generateToc = function (children) {
  var toc = [];
  var activeLevel = 0;

  Array.prototype.forEach.call(children, function (node) {
    if (['H1', 'H2', 'H3', 'H4', 'H5'].indexOf(node.nodeName) >= 0) {
      var level = node.nodeName.slice(1) | 0;
      var goingUp = level > activeLevel;
      while (activeLevel !== level) {
        activeLevel += goingUp ? 1 : -1;
        toc.push(goingUp ? '<ul>' : '</ul>');
      }
      toc.push('<li>' + node.innerText + '</li>');
      activeLevel = level;
    }
  });

  while (activeLevel > 0) {
    activeLevel -= 1;
    toc.push('</ul>');
  }
  return toc.join('');
};

document.addEventListener("DOMContentLoaded", function () {
  var toc = document.querySelector('#toc');
  var body = document.querySelector('body');
  toc.innerHTML = generateToc(body.children);
});
