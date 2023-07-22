let angle = 0;
let angleIncrement = 0.01;
let lineSpacing = 5;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-holder");
  colorMode(HSB, 360, 100, 100);
  noFill();
  noLoop(); // Disable continuous animation by default
}

function draw() {
  background(0);

  translate(width / 2, height / 2);

  // Draw rotating lines
  for (let radius = 0; radius < max(width, height); radius += lineSpacing) {
    let x1 = cos(angle) * radius;
    let y1 = sin(angle) * radius;
    let x2 = cos(-angle) * radius;
    let y2 = sin(-angle) * radius;

    let hue = map(radius, 0, max(width, height), 0, 360);
    stroke(hue, 80, 100);
    line(x1, y1, x2, y2);
  }

  angle += angleIncrement;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Start animation when the page finishes loading
window.addEventListener("load", function () {
  loop();
});

// Pause animation when the window loses focus
window.addEventListener("blur", function () {
  noLoop();
});

// Resume animation when the window gains focus
window.addEventListener("focus", function () {
  loop();
});
