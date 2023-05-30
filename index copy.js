const container = document.getElementById("container");

const sun = [document.createElement("a"), document.createElement("img")];
sun[1].setAttribute("src", "/images/sun.png");
sun[0].setAttribute("class", "sun");
sun[0].appendChild(sun[1]);
sun[0].setAttribute("href", "sun.html");
var rings = [];
var planets = [
  "mercury",
  "venus",
  "earth",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
];
var pairs = [];

function createRings() {
  for (var i = 7; i >= 0; --i) {
    if (i != 7) {
      rings[i] = document.createElement("div");
      rings[i + 1].appendChild(rings[i]);
      if (i === 0) {
        rings[i].appendChild(sun[0]);
      }
    } else {
      rings[i] = document.createElement("div");
      container.appendChild(rings[i]);
    }
  }
  rings.forEach(setAttributes);

  function setPlanetAttr(el, attrs) {
    for (var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

  function setAttributes(ringitem, ringindex) {
    ringitem.setAttribute("class", "ring");
    ringitem.setAttribute("id", planets[ringindex] + "ring");
  }

  function createPlanets() {
    planets.forEach(createPlanetElements);

    function createPlanetElements(planetitem, planetindex) {
      var planetname = `${planetitem}`;
      const PlanetAttributes = {
        id: planetname,
        class: `planets`,
        src: `/images/${planetname}.png`,
        alt: `${planetname}`,
      };
      planetitem = [document.createElement("a"), document.createElement("img")];
      setPlanetAttr(planetitem[1], PlanetAttributes);
      setPlanetAttr(planetitem[0], {
        href: `${planetname}.html`,
        class: `planetlink`,
        id: planetname + "link",
      });
      rings[planetindex].appendChild(planetitem[0]);
      planetitem[0].appendChild(planetitem[1]);
      pairs[planetindex] = [
        planetitem[0].getBoundingClientRect(),
        rings[planetindex].getBoundingClientRect(),
      ];
    }
  }

  createPlanets();
}

createRings();

function animate(a, elementrect, index = 0, ringrect = pairs[0][1]) {
  const i = pairs.indexOf(elementrect);
  const r = (window.innerWidth * (180 - 15 * (i - 7) * -1)) / 100 / 2;
  // const ringrect = neptunering.getBoundingClientRect();
  const xCenter = (ringrect.left + ringrect.right) / 2; //Mitten x för ringen
  const yCenter = (ringrect.top + ringrect.bottom) / 2; //Mitten x för ringen
  const x = (elementrect[0].left + elementrect[0].right) / 2; //Mitten x för planeten
  const y = (elementrect[0].top + elementrect[0].bottom) / 2; //Mitten y för planeten
  var px = -(x - (xCenter + r * Math.cos((a * Math.PI) / 180)));
  var py = -(y - (yCenter + r * Math.sin((a * Math.PI) / 180)));
  if (`#${planets[i]}link` === "#saturnlink") {
    // document.querySelector(`#${planets[i]}link`).style.left = px + "px";
    console.log(r);
    document.querySelector(`#${planets[i]}link`).style.left =
      px - elementrect[0].width * 0.112 + "px";
    document.querySelector(`#${planets[i]}link`).style.top = py + "px";
  } else {
    document.querySelector(`#${planets[i]}link`).style.left =
      px + elementrect[0].width / 2 + "px";
    document.querySelector(`#${planets[i]}link`).style.top = py + "px";
  }
}
var a = -20;

let style = getComputedStyle(neptune);

console.log(style.top);

console.log(planets);
console.log(rings);
console.log(pairs);

setInterval(function () {
  for (let i = 0; i < pairs.length; i++) {
    animate(a, pairs[i], 0);
    a += 0.01;
    if (a >= 41) {
      a = -40;
    }
  }
}, 50);
