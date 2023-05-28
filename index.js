const container = document.getElementById("container");

const sun = document.createElement("a");
sun.href = "sun.html";
sun.className = "sun";
const sunImage = document.createElement("img");
sunImage.src = "/images/sun.png";
sun.appendChild(sunImage);

const size = 360;
const offset = 120;

const planets = [
  "mercury",
  "venus",
  "earth",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
];

function createRings() {
  const rings = [];
  for (let i = 7; i >= 0; --i) {
    const ring = document.createElement("div");
    if (i !== 7) {
      rings[i + 1].appendChild(ring);
      if (i === 0) {
        ring.appendChild(sun);
      }
    } else {
      container.appendChild(ring);
    }
    ring.className = "ring";
    ring.id = planets[i];
    rings[i] = ring;
  }
  function createPlanetElements(planet, planetIndex) {
    const planetLink = document.createElement("a");
    planetLink.href = `${planet}.html`;
    planetLink.className = "planetlink";

    const planetImage = document.createElement("img");
    Object.assign(planetImage, {
      id: planet,
      className: "planets",
      src: `/images/${planet}.png`,
      alt: planet,
    });

    planetLink.appendChild(planetImage);
    rings[planetIndex].appendChild(planetLink);
  }

  function createPlanets() {
    planets.forEach(createPlanetElements);
  }
  createPlanets();
}

createRings();
