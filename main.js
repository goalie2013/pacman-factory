"use strict";

let interval;
// This array will hold all the pacmen
const pacMen = [];
const pacArray = [
  ["PacMan1.png", "PacMan2.png"],
  ["PacMan3.png", "PacMan4.png"],
];

let container = document.querySelector(".pacmen");

const factoryBtn = document.getElementById("makePacmanBtn");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

factoryBtn.addEventListener("click", () => {
  const pacmanObj = _pacmanFactory();
  console.log("pacmanObj", pacmanObj);
  pacMen.push(pacmanObj);
});

startBtn.addEventListener("click", () => {
  clearTimeout(interval);
  _run();
});

stopBtn.addEventListener("click", _clearScreen);

// randomly set x & y values for velocity & position
// Number -> Object
function _setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function _pacmanFactory() {
  // For Pacman Images
  let direction = 0;
  let currPic = 0;

  let velocity = _setToRandom(20); // Ex: {x: 3, y: 8}
  let position = _setToRandom(300);
  let img = document.createElement("img");

  img.src = "./images/PacMan1.png";
  img.width = 100;
  img.style.left = position.x + "px";
  img.style.top = position.y + "px";
  img.style.position = "absolute";
  img.style.zIndex = "1";
  img.style.width = "10vw";
  img.style.height = "10vh";
  container.appendChild(img);

  // return an Object that represents a pacman
  return {
    position,
    velocity,
    img,
    direction,
    currPic,
  };
}

function _run() {
  //loop over pacMen Array and move each one in DOM

  pacMen.forEach((elem) => {
    // Check for collisions w/ window boundary
    elem.direction = _checkCollisions(elem);

    // Update image
    _updateImg(elem);

    // Update position key of element Object
    const horizVelocity = elem.velocity.x;
    const verticalVelocity = elem.velocity.y;

    elem.position.x += horizVelocity;
    elem.position.y += verticalVelocity;

    // Update position of element in DOM
    elem.img.style.left = elem.position.x + "px";
    elem.img.style.top = elem.position.y + "px";
  });
  interval = setTimeout(_run, 100);
}

function _checkCollisions(elem) {
  console.log("_checkCollisions");
  let direction = elem.direction;
  // If element hits horizontal edge, flip velocity.x
  if (
    elem.position.x + elem.velocity.x + elem.img.width > window.innerWidth ||
    elem.position.x + elem.velocity.x < 0
  ) {
    elem.velocity.x = -elem.velocity.x;

    direction ? (direction = 0) : (direction = 1);
  }

  // If element hits vertical edge, flip velocity.y
  if (
    elem.position.y + elem.velocity.y + elem.img.height > window.innerHeight ||
    elem.position.y + elem.velocity.y < 0
  )
    elem.velocity.y = -elem.velocity.y;

  return direction;
}

const _updateImg = (elem) => {
  elem.currPic = (elem.currPic + 1) % 2;
  elem.img.src = `./images/${pacArray[elem.direction][elem.currPic]}`;
};

function _clearScreen() {
  // stop run()
  clearTimeout(interval);

  // empty pacMen Array
  for (let i = pacMen.length - 1; i >= 0; i--) {
    pacMen.pop();
  }

  // Clear Screen
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

// if (typeof module !== "undefined") {
//   module.exports = { checkCollisions, run, pacMen };
// }
