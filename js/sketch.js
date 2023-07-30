let particles = [];
let backgroundColor;
let interactiveParticle = null;
let interactiveMode = false;

function setup() {
  let canvas = createCanvas(410, 900);
  canvas.parent("sketch-holder");
  colorMode(HSB, 360, 100, 100);
  noStroke();
  frameRate(60);
  canvas.style("background-color", "transparent");

  // Set the background color
  backgroundColor = color(0, 0, 0, 30);

  // Create particles
  for (let i = 0; i < 25; i++) {
    let particle = new Particle();
    particles.push(particle);
  }

  // Randomly select a particle to be of a different color at setup
  let randomIndex = floor(random(particles.length));
  for (let i = 0; i < particles.length; i++) {
    if (i === randomIndex) {
      particles[i].color = color(200, 80, 100); // Original blue shade
    } else {
      particles[i].color = color(220, 50, 100); // Lighter blue shade
    }
  }
}

function draw() {
  clear();

  // Update and display particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }

  // Move interactive particle if in interactive mode
  if (interactiveMode && interactiveParticle) {
    interactiveParticle.position = createVector(mouseX, mouseY);
    interactiveParticle.display();
  }
}

function mouseClicked() {
  if (interactiveMode) {
    // Find the particle that was clicked on
    for (let i = 0; i < particles.length; i++) {
      if (particles[i].contains(mouseX, mouseY)) {
        interactiveParticle = particles[i];
        break;
      }
    }
  }
}

function mouseReleased() {
  interactiveParticle = null;
}

class Particle {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-3, 3), random(-3, 3));
    this.size = random(15, 30);
    this.color = color(220, 50, 100); // Lighter blue shade (default color)
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.mult(0.98);

    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x *= -1;
    }
    if (this.position.y < 0 || this.position.y > height) {
      this.velocity.y *= -1;
    }
  }

  display() {
    fill(this.color);
    rect(this.position.x, this.position.y, this.size, this.size);
  }

  contains(x, y) {
    return (
      x >= this.position.x &&
      x <= this.position.x + this.size &&
      y >= this.position.y &&
      y <= this.position.y + this.size
    );
  }
}
