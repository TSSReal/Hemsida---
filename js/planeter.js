function setPlanetAttr(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

const path = window.location.pathname;
var page = path.split("/").pop().split(".");
page.pop();
page = page.toString();
console.log(page);

const attributes = {
  src: `/images/${page}.png`,
  class: "planet",
  alt: `${page}`,
};

const container = document.getElementById("container");
const header = document.getElementById("header");
const planet = document.createElement("img");
setPlanetAttr(planet, attributes);

header.appendChild(planet);
