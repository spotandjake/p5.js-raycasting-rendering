class Particle {
  constructor() {
    this.fov = 135;
    //this.pos = createVector(mapW / 2, mapH / 2);
		this.pos = createVector(5, 5, 0)
    this.rays = [];
    this.heading = 180
		this.jump = 0;
    for (let a = -this.fov / 2; a < this.fov / 2; a += 1) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }

  updateFOV(fov) {
    this.fov = fov;
    this.rays = [];
    for (let a = -this.fov / 2; a < this.fov / 2; a += 1) {
      this.rays.push(new Ray(this.pos, radians(a) + this.heading));
    }
  }

  rotate(angle) {
    this.heading += angle;
    let index = 0;
    for (let a = -this.fov / 2; a < this.fov / 2; a += 1) {
      this.rays[index].setAngle(radians(a) + this.heading);
      index++;
    }
  }
	rotatation(angle) {
    this.heading = radians(angle);
    let index = 0;
    for (let a = -this.fov / 2; a < this.fov / 2; a += 1) {
      this.rays[index].setAngle(radians(a) + this.heading);
      index++;
    }
  }

	move(amt) {
    const vel = p5.Vector.fromAngle(this.heading);
    vel.setMag(amt);
    this.pos.add(vel);
		collision(amt, 0)
  }

	right(amt) {
    const vel = p5.Vector.fromAngle(this.heading+radians(90));
    vel.setMag(amt);
    this.pos.add(vel);
		collision(amt, 90)
  }

  update(x, y) {
    this.pos.set(x, y);
  }

  look(walls) {
    const scene = [];
		let redarr = [];
		let bluearr = [];
		let greenarr = [];
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];
      let closest = null;
      let record = Infinity;
			let red = null;
			let green = null;
			let blue = null;
      for (let wall of walls) {
        const pt = ray.cast(wall);
        if (pt) {
          let d = p5.Vector.dist(this.pos, pt);
          const a = ray.dir.heading() - this.heading;
          if (!mouseIsPressed) {
            d *= cos(a);
          }
          if (d < record) {
            record = d;
            closest = pt;
						red = pt.r;
						green = pt.g;
						blue = pt.b;
          }
        }
      }
      if (closest) {
        //colorMode(HSB);
        //stroke((i + frameCount * 2) % 360, 255, 255, 50);
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
			redarr[i] = red;
			greenarr[i] = green;
			bluearr[i] = blue;
			scene[i] = record;
    }
		let rgb = {
			"scene":scene,
			"red":redarr,
			"green":greenarr,
			"blue":bluearr
		}
    return rgb;
  }

  show(r, g, b) {
    fill(r, g, b);
    ellipse(this.pos.x, this.pos.y, 2);
    for (let ray of this.rays) {
      ray.show();
    }
  }
}