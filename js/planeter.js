function setPlanetAttr(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

const path = window.location.pathname;
var page = path.split("/").pop().split(".");
page.pop();
page = page.toString();

const attributes = {
  src: `/images/${page}.png`,
  class: "planet",
  alt: `${page}`,
};

const container = document.getElementById("container");
const header = document.getElementById("header");
const planet = document.createElement("img");
const title = document.createElement("h1");
const planetname = page.charAt(0).toUpperCase() + page.slice(1);

planet.setAttribute("src", `../images/${planetname}.png`);
planet.setAttribute("alt", `${planetname}`);
planet.setAttribute("class", `planet`);

container.appendChild(planet);

title.textContent = planetname;
header.appendChild(title);
setPlanetAttr(planet, attributes);
