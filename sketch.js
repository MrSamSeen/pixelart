let startD = false;
let pixels = [];
let pixelSize = 12;
let drawX = 0;
let drawY = 0;
let drawRed = 100;
let drawGreen = 100;
let drawBlue = 100;
let drawStep = 2;
let pixelDensity = 40;
function setup() {
  pixels = [];
  startD = false;
  frameRate(60);
  pixelDensity = gup('p');

  createCanvas(windowWidth, windowHeight);
  background(30);
  pixelSize = floor(min(width, height) / pixelDensity);
  drawX = floor(width / 2 / pixelSize) * pixelSize;
  drawY = floor(height / 2 / pixelSize) * pixelSize;
  setTimeout(() => {
    startD = true;
  }, 500);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(30);
}

function gup(name) {
  name = RegExp('[?&]' + name.replace(/([[\]])/, '\\$1') + '=([^&#]*)');
  if (!window.location.href.match(name)) {
    return 40;
  }
  return (window.location.href.match(name) || ['', ''])[1];
}
function getNextX(curX) {
  curX += round(random(-drawStep, drawStep)) * pixelSize;
  if (curX < 0) {
    curX = 0;
  }
  if (curX > width) {
    curX = floor(width / pixelSize) * pixelSize;
  }
  return curX;
}

function getNextY(curY) {
  curY += round(random(-drawStep, drawStep)) * pixelSize;
  if (curY < 0) {
    curY = 0;
  }
  if (curY > height) {
    curY = floor(height / pixelSize) * pixelSize;
  }
  return curY;
}

function nextColor(curColor) {
  curColor += round(random(-5, 5)) * 2;
  if (curColor < 30) {
    curColor = 30;
  }
  if (curColor > 255) {
    curColor = 255;
  }
  return curColor;
}

function draw() {
  if (!startD) {
    return;
  }

  pixels.push(new pixel(drawX = getNextX(drawX), drawY = getNextY(drawY), drawRed = nextColor(drawRed), drawGreen = nextColor(drawGreen), drawBlue = nextColor(drawBlue)));

  background(30);
  for (let i = 0; i < pixels.length; i++) {
    pixels[i].show();
  }
  // if (frameCount % 10 == 0) {
  //   let p = new pixel(random(width), random(height), color(255, 255, 255));
  //   pixels.push(p);
  // }
}

class pixel {
  life = 5000;
  constructor(x = 0, y = 0, r = 0, g = 0, b = 0) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.g = g;
    this.b = b;
  }
  //show pixel
  show() {
    if (this.life > 0) {
      this.life--;
      fill(this.r, this.g, this.b, this.life);
      noStroke();
      rect(this.x, this.y, pixelSize, pixelSize);
    }
  }
}