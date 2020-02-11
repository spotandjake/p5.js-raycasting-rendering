class Boundary {
  constructor(x1, y1, x2, y2, r, g, b) {
    this.a = createVector(x1, y1);
    this.b = createVector(x2, y2);
		this.red = r;
		this.green = g;
		this.blue = b;
  }
  show() {
    //stroke(this.red, this.green, this.blue);
		stroke(255);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}