let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 10000;

const mapW = 100;
const mapH = 400;
const sceneW = 800;
const sceneH = 400;
const mazeW = 100;
const mazeH = 400;

let xx1 = [10, 10, 40, 50, 60, 90, 30, 40, 10, 80, 40, 70, 70, 60, 60, 50, 50, 40, 40, 40, 60, 70, 70, 50, 50, 30, 20, 30, 40, 70, 100, 20, 90, 80, 80, 30]
let xx2 = [10, 40, 40, 50, 80, 90, 0, 10, 10, 80, 70, 70, 50, 60, 100, 50, 20, 20, 40, 60, 60, 70, 50, 50, 30, 30, 20, 40, 40, 90, 70, 90, 90, 90, 80, 30]
let yy1 = [0, 10, 10, 0, 10, 0, 20, 30, 30, 10, 20, 30, 30, 40, 60, 30, 40, 50, 50, 70, 70, 70, 100, 100, 80, 80, 50, 90, 90, 70, 80, 110, 110, 90, 90, 110]
let yy2 = [10, 10, 30, 10, 10, 50, 20, 30, 200, 50, 20, 50, 30, 60, 60, 60, 40, 50, 70, 70, 90, 100, 100, 80, 80, 60, 100, 90, 110, 70, 80, 110, 90, 90, 100, 100]

function setup() {
  createCanvas(800, 400);
	collideDebug(true);
	for (let i = 0; i < xx1.length+1; i++) {
		 let x1 = map(xx1[i], 0, mazeW, 0, mapW);
		 let y1 = map(yy1[i], 0, mazeH, 0, mapH);
		 let x2 = map(xx2[i], 0, mazeW, 0, mapW);
		 let y2 = map(yy2[i], 0, mazeH, 0, mapH);
     walls[i] = new Boundary(x1, y1, x2, y2, Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256));
  }
  walls.push(new Boundary(0, 0, mapW, 0, Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)));
  walls.push(new Boundary(mapW, 0, mapW, mapH, Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)));
  walls.push(new Boundary(mapW, mapH, 0, mapH, Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)));
  walls.push(new Boundary(0, mapH, 0, 0, Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)));
  particle = new Particle();
	particle.updateFOV(89);
}
function collision(amt, ang) {
	for (let wall of walls) {
		var hit = collidePointLine(particle.pos.x,particle.pos.y, wall.a.x, wall.a.y,wall.b.x,wall.b.y, 0.1);
		if (hit) {
			particle.show(0, 255, 0);
			const vel = p5.Vector.fromAngle(particle.heading+ radians(ang));
    	vel.setMag(-amt);
    	particle.pos.add(vel);
		}
	}
}
function draw() {
	const renderw = map(mouseX, 0, width, 0, 360);
	particle.rotatation(renderw)
  if (keyIsDown(65)) {
    //particle.rotate(-0.1);
		particle.right(-2);
  } else if (keyIsDown(68)) {
    //particle.rotate(0.1);
		particle.right(2);
  } else if (keyIsDown(87)) {
    particle.move(2);
  } else if (keyIsDown(83)) {
    particle.move(-2);
  } else if (keyIsDown(32)) {
		if (particle.jump == 0) {
			particle.jump += 50;
		}
  }
	
  background(0);
  for (let wall of walls) {
		fill(255);
    wall.show();
  }
  particle.show(255, 255, 255);
	let vals = particle.look(walls);
  const scene = vals.scene;
	let redarr = vals.red;
	let greenarr = vals.green;
	let bluearr = vals.blue;
  const w = sceneW / scene.length;
  push();
  translate(mapW+5, 0);
  for (let i = 0; i < scene.length; i++) {
    const sq = scene[i] * scene[i];
    const wSq = sceneW * sceneW;
    const b = map(sq, 0, sceneW + sceneW, 255, 0);
    const h = map(scene[i], 0, sceneW, sceneH, 0);
		//const renderh = map(mouseY, 0, sceneH, 0, sceneH);
		//walls
		noStroke();
    fill(redarr[i]*0.75, greenarr[i], bluearr[i]);
    rectMode(CENTER);
    rect(i * w + w / 2, sceneH / 2 + particle.jump, w + 1, h )
		//rect(i * w + w / 2, renderh, w + 1, h);
  }
	if (particle.jump > 0) {
		particle.jump -= 5;
	}
  pop();
}