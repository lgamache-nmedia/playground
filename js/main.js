// Ajout des anchors au menu!
var anchors = document.getElementsByClassName("anchor");
for (var i = 0; i < anchors.length; i++) {
  var anchor = anchors[i];
  var ul = document.querySelector(".menuContainer .menu");
  var li = document.createElement("li");
  var a = document.createElement("a");
  a.appendChild(document.createTextNode(anchor.textContent));
  a.href = "#" + anchor.id;
  li.appendChild(a);
  ul.appendChild(li);
}

// Watch le scroll pour highlight le bon lien
window.addEventListener("scroll", throttle(checkPosition, 500));

function throttle(fn, wait) {
  var time = Date.now();
  return function() {
    if (time + wait - Date.now() < 0) {
      fn();
      time = Date.now();
    }
  };
}

function checkPosition() {
  var vh = window.innerHeight;
  var sh = window.pageYOffset;
  var elems = document.querySelectorAll(".menuContainer .menu a");

  var higlightedElem = null;
  for (var j = 0; j < anchors.length; j++) {
    if (anchors[j].offsetTop < sh + vh / 1.75) {
      higlightedElem = anchors[j];
    } else {
      break;
    }
  }

  for (var l = 0; l < elems.length; l++) {
    elems[l].classList.remove("selected");
  }

  if (higlightedElem !== null) {
    var elemText = higlightedElem.textContent;

    for (var k = 0; k < elems.length; k++) {
      if (elems[k].textContent === elemText) {
        elems[k].classList.add("selected");
      }
    }
  }
}

function offset(el) {
  var rect = el.getBoundingClientRect(),
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return rect.top + scrollTop;
}
