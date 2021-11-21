import Vector from "./Vector";
import Vector2D from "./Vector2D";
import WindowProperties from "./WindowProperties";
import P5 from "p5";

export default class Person {
  _p5: P5;
  currentPosition: Vector;
  nextPosition: Vector;

  personSize = 10;

  constructor(p5: P5) {
    this._p5 = p5;
    this.currentPosition = new Vector2D(
      Math.ceil(p5.random(WindowProperties.WIDTH)),
      Math.ceil(p5.random(WindowProperties.HEIGHT))
    );
    this.nextPosition = this.newNextPosition();
  }

  draw() {
    const position = this.currentPosition.getComponents();
    this._p5.circle(position[0], position[1], this.personSize);
  }
  move() {
    if (Vector2D.distance(this.currentPosition, this.nextPosition) < this.personSize) {
      this.nextPosition = this.newNextPosition();
    }
    this.updateCurrentPosition();
  }
  updateCurrentPosition() {
    const moveVector = this.newMoveVector();
    this.currentPosition = new Vector2D(
      Math.ceil(this.currentPosition.getComponents()[0] + moveVector.getComponents()[0]),
      Math.ceil(this.currentPosition.getComponents()[1] + moveVector.getComponents()[1])
    );
  }
  bounce() {
    this.nextPosition = this.newNextPosition();
  }
  newNextPosition() {
    return new Vector2D(
      Math.ceil(this._p5.random(-WindowProperties.WIDTH * 2, WindowProperties.WIDTH * 2)),
      Math.ceil(this._p5.random(-WindowProperties.HEIGHT * 2, WindowProperties.HEIGHT * 2))
    );
  }
  newMoveVector() {
    const currentPosition = this.currentPosition.getComponents();
    const nextPosition = this.nextPosition.getComponents();
    return new Vector2D(
      nextPosition[0] - currentPosition[0] == 0 ? 0 : nextPosition[0] - currentPosition[0] < 0 ? -1 : 1,
      nextPosition[1] - currentPosition[1] == 0 ? 0 : nextPosition[1] - currentPosition[1] < 0 ? -1 : 1
    )
  }
  isOutsideWindow() {
    const currentPosition = this.currentPosition.getComponents();
    return (
      currentPosition[0] < 0 + this.personSize / 2 ||
      currentPosition[0] > WindowProperties.WIDTH - this.personSize / 2 ||
      currentPosition[1] < 0 + this.personSize / 2 ||
      currentPosition[1] > WindowProperties.HEIGHT - this.personSize / 2
    );
  }
}
