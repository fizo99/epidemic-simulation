import Vector from "./Vector";
import Vector2D from "./Vector2D";
import WindowProperties from "./WindowProperties";
import P5 from "p5";

export default class Person {
  _p5: P5;
  x: number;
  y: number;
  vector: Vector;

  personSize = 10;

  constructor(p5: P5) {
    this._p5 = p5;
    this.x = p5.random(WindowProperties.WIDTH);
    this.y = p5.random(WindowProperties.HEIGHT);
    this.vector = new Vector2D(p5.random(-5, 5), p5.random(-5, 5));
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  draw() {
    this._p5.circle(this.x, this.y, this.personSize);
  }
  move() {
    const components = this.vector.getComponents();
    this.x += components[0];
    this.y += components[1];
    this.vector = new Vector2D(this._p5.random(-5, 5), this._p5.random(-5, 5));
  }
  isOutsideWindow() {
    return (
      this.getX() < 0 ||
      this.getX() > WindowProperties.WIDTH ||
      this.getY() < 0 ||
      this.getY() > WindowProperties.HEIGHT
    );
  }
}
