var findHeadings = function (children) {
  return Array.prototype.filter.call(children, function (node) {
    return ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].indexOf(node.nodeName) >= 0;
  });
};

var anchorize = function (text, linktext) {
  var safelink = text.replace(/\W/g, '_').replace(/_{2,}/g, '_');
  var idstr = !linktext ? ' ' : ' id="' + safelink + '" ';
  return '<a class="mark"' + idstr + 'href="#' + safelink + '">' + (linktext || text) + '</a>';
};

var insertAnchors = function (headings) {
  headings.forEach(function (hx) {
    hx.innerHTML = hx.innerText + '<span>' + anchorize(hx.innerText, '#') + '</span>';
  });
};


var generateToc = function (headings) {
  var toc = ['<h2>Table of Contents</h2>'];
  var activeLevel = 0;

  headings.forEach(function (hx) {
    var level = hx.nodeName.slice(1) | 0;
    var goingUp = level > activeLevel;
    while (activeLevel !== level) {
      activeLevel += goingUp ? 1 : -1;
      toc.push(goingUp ? '<ul>' : '</ul>');
    }
    toc.push('<li>' + anchorize(hx.innerText) + '</li>');
  });

  while (activeLevel > 0) {
    activeLevel -= 1;
    toc.push('</ul>');
  }
  return toc.join('');
};

document.addEventListener('DOMContentLoaded', function () {
  var toc = document.querySelector('#toc');
  var contents = document.querySelector('#apicontent');
  var headings = findHeadings(contents.children);
  toc.innerHTML = generateToc(headings);
  insertAnchors(headings);
});
