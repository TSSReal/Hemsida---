const container = document.getElementById("container");

const sun = [document.createElement("a"), document.createElement("img")];
sun[1].setAttribute("src", "./images/solen.webp");
sun[1].setAttribute("alt", "Solen");
sun[0].setAttribute("class", "sun");
sun[0].appendChild(sun[1]);
sun[0].setAttribute("href", "./html/solen.html");
var rings = [];
var planets = [
  "merkurius",
  "venus",
  "jorden",
  "mars",
  "jupiter",
  "saturnus",
  "uranus",
  "neptunus",
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

  function setAttributes(ringitem, ringindex) {
    ringitem.setAttribute("class", "ring");
    ringitem.setAttribute("id", planets[ringindex] + "ring");
  }

  function setPlanetAttr(el, attrs) {
    for (var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

  function createPlanets() {
    planets.forEach(createPlanetElements);

    function createPlanetElements(planetitem, planetindex) {
      var planetname = `${planetitem}`;
      const PlanetAttributes = {
        id: planetname,
        class: `planets`,
        src: `./images/${planetname}.webp`,
        alt: `${planetname}`,
      };
      planetitem = [document.createElement("a"), document.createElement("img")];
      setPlanetAttr(planetitem[1], PlanetAttributes);
      setPlanetAttr(planetitem[0], {
        href: `./html/${planetname}.html`,
        class: `planetlink`,
        id: planetname + "link",
      });
      rings[planetindex].appendChild(planetitem[0]);
      planetitem[0].appendChild(planetitem[1]);
      pairs[planetindex] = [
        planetitem[0].getBoundingClientRect(),
        rings[planetindex].getBoundingClientRect(),
        planetitem[0],
      ];
    }
  }

  createPlanets();
}

createRings();

let outsideAngle = [];
let outsideAngleX = [];

function animate(a, elementrect, index = 0, ringrect = pairs[index][1]) {
  var i = pairs.indexOf(elementrect);
  let r = window.innerWidth * 0.9 - (index - 7) * -(window.innerWidth * 0.075);
  var xCenter = 0; //Mitten x för ringen
  var yCenter = window.innerHeight / 2; //Mitten x för ringen
  var x = (elementrect[0].left + elementrect[0].right) / 2; //Mitten x för planeten
  let y = (elementrect[0].top + elementrect[0].bottom) / 2; //Mitten y för planeten
  y = (elementrect[0].top + elementrect[0].bottom) / 2; //Mitten y för planeten
  var px = -(x - (xCenter + r * Math.cos((a * Math.PI) / 180)));
  var py = -(y - (yCenter + r * Math.sin((a * Math.PI) / 180)));
  pairs[index][2].addEventListener("mouseover", function () {
    isPaused = true;
  });
  pairs[index][2].addEventListener("mouseleave", function () {
    isPaused = false;
  });
  var element = document.querySelector(`#${planets[i]}link`);
  if (`#${planets[i]}link` === "#saturnuslink") {
    element.style.left = px - elementrect[0].width * 0.112 + "px";
  } else {
    element.style.left = px + elementrect[0].width / 2 + "px";
  }
  element.style.top = py + "px";

  if (
    parseInt(element.style.top) >=
      window.innerHeight / 2 + elementrect[0].height / 2 ||
    -parseInt(element.style.left) >= r
  ) {
    // console.log(-a);
    return -a;
    // console.log(a); SKRIVER UT VINKEL
  } else {
    return a;
  }

  // if (ringrect.height < window.innerHeight) {
  //   outsideAngle[i] = 90;
  // } else {
  //   outsideAngle[i] =
  //     Math.asin(window.innerHeight / (ringrect.width / 2)) * (180 / Math.PI);
  // }
  // console.log(outsideAngle);
  // if (elementrect[0].y > window.innerHeight) {

  // } else {

  // }
}

function setDefaultPos() {
  for (let i = 0; i < planets.length; i++) {
    const element = document.querySelector(`#${planets[i]}link`);
    if (`#${planets[i]}link` === "#merkuriuslink") {
      element.style.left = 0;
      element.style.top = 7.5 * -1.5 + "vh";
    } else {
      element.style.left = 0;
      element.style.top = 7.5 * 0.5 + "vh";
    }
  }
}

var a = [];
var isPaused = false;

for (let i = 0; i < pairs.length; i++) {
  if (Math.floor(Math.random() * 2) === 0) {
    a[i] = Math.floor(Math.random() * 20 + 2.5 * (i + 1) * -1);
  } else {
    a[i] = Math.floor(Math.random() * 20 + 2.5 * (i + 1));
  }
}
setInterval(function () {
  if (!(window.innerWidth < 550)) {
    if (!isPaused) {
      for (let i = 0; i < pairs.length; i++) {
        a[i] = animate(a[i], pairs[i], i);
        a[i] += 0.2 - i * 0.023;
        // if (a[i] >= 90 - ((85 - 20) / pairs.length) * i) {
        //   a[i] = -90 + ((85 - 20) / pairs.length) * i;
        // }
      }
    }
  } else {
    setDefaultPos();
  }
}, 1000 / 30);
