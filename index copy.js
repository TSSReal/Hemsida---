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
    ringitem.setAttribute("id", planets[ringindex]);
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

// var neptune = document.getElementById("neptunelink");
// function animate(a, element) {
//   const r = (window.innerWidth * 180) / 100 / 2;
//   const sunrect = sun[0].getBoundingClientRect();
//   const xCenter = (sunrect.left + sunrect.right) / 2;
//   const yCenter = (sunrect.top + sunrect.bottom) / 2;
//   const elementrect = element.getBoundingClientRect();
//   const x = (elementrect.left + elementrect.right) / 2;
//   const y = (elementrect.top + elementrect.bottom) / 2;

//   var px = xCenter + r * Math.cos(a);
//   var py = yCenter + r * Math.sin(a);
//   // console.log(xCenter, yCenter);
//   document.querySelector("#neptunelink").style.left = px - x + "px";
//   document.querySelector("#neptunelink").style.top = py - y + "px";
// }
// var a = 0;
// setInterval(function () {
//   a = (a + Math.PI / 360) % (Math.PI * 2);
//   animate(a, neptune);
// }, 5);
