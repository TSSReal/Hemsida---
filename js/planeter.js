function setPlanetAttr(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

var planets = [
  "solen",
  "merkurius",
  "venus",
  "jorden",
  "mars",
  "jupiter",
  "saturnus",
  "uranus",
  "neptunus",
];

const path = window.location.pathname;
var page = path.split("/").pop().split(".");
page.pop();
page = page.toString();

const planetindex = planets.indexOf(page);

planets.splice(planetindex, 1);

const attributes = {
  src: `images/${page}.png`,
  class: `planet ${page}`,
  alt: `${page}`,
};

const container = document.getElementById("container");
const header = document.getElementById("header");
const sidebar = document.getElementById("sidebar");
const planet = document.createElement("img");
const title = document.createElement("h1");
const planetname = page.charAt(0).toUpperCase() + page.slice(1);

planet.setAttribute("src", `images/${planetname}.png`);
planet.setAttribute("alt", `${planetname}`);
planet.setAttribute("class", `planet`);

container.appendChild(planet);

title.textContent = planetname;
header.appendChild(title);
setPlanetAttr(planet, attributes);

for (let i = 0; i < planets.length; i++) {
  const planetlink = document.createElement("a");
  const planetimage = document.createElement("img");
  planetlink.setAttribute("href", `${planets[i]}.html`);
  planetlink.setAttribute("class", `planetlink`);
  planetimage.setAttribute("src", `images/${planets[i]}.png`);
  planetimage.setAttribute("alt", `${planets[i]}`);

  planetlink.appendChild(planetimage);
  sidebar.appendChild(planetlink);
}
var styleElem = document.head.appendChild(document.createElement("style"));

if (page === "saturnus") {
  styleElem.innerHTML = `li::before {background-image: url("images/${page}.png"); height: 11px;}`;
  textbox = document.getElementById("saturnustext");
  textbox.style.width = "calc(100% - 21vmax)";
} else {
  styleElem.innerHTML = `li::before {background-image: url("images/${page}.png");}
  `;
}
