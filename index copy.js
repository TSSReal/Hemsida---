const container = document.getElementById("container");

const sun = [document.createElement("a"), document.createElement("img")];
sun[1].setAttribute("src", "/images/sun.png");
sun[0].setAttribute("class", "sun");
sun[0].appendChild(sun[1]);
sun[0].setAttribute("href", "sun.html");

function createRings() {
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
    }
  }

  createPlanets();
}

createRings();

var neptune = document.getElementById("neptunelink");
var neptunerect = neptune.getBoundingClientRect();
const neptunering = document.getElementById("mercuryring");
function animate(a, elementrect) {
  const r = (window.innerWidth * 180) / 100 / 2;
  const ringrect = neptunering.getBoundingClientRect();
  const xCenter = (ringrect.left + ringrect.right) / 2; //Mitten x för ringen
  const yCenter = (ringrect.top + ringrect.bottom) / 2; //Mitten x för ringen
  const x = (elementrect.left + elementrect.right) / 2; //Mitten x för planeten
  const y = (elementrect.top + elementrect.bottom) / 2; //Mitten y för planeten
  var px = -(x - (xCenter + r * Math.cos((a * Math.PI) / 180)));
  var py = -(y - (yCenter + r * Math.sin((a * Math.PI) / 180)));
  document.querySelector("#neptunelink").style.left =
    px + elementrect.width / 2 + "px";
  document.querySelector("#neptunelink").style.top = py + "px";
}
var a = -20;

let style = getComputedStyle(neptune);

console.log(style.top);

// animate(a, neptunerect);
setInterval(function () {
  animate(a, neptunerect);
  a += 0.1;
  if (a >= 21) {
    a = -20;
  }
  console.log(a);
}, 20);
