import Vector from "./Vector";
import Vector2D from "./Vector2D";
import { WIDTH, HEIGHT, PERSON_SIZE } from "./AnimationProperties";
import P5 from "p5";
import State from "./states/State";
import Healthy from "./states/Healthy";
import Vulnerable from "./states/Vulnerable";
import PersonContainer from "./PersonContainer";

export default class Person {
  _p5: P5;
  currentPosition: Vector;
  nextPosition: Vector;
  state: State;

  constructor(p5: P5) {
    this._p5 = p5;
    this.currentPosition = this.randomStartingPosition();
    this.nextPosition = this.randomNextPosition();
    this.state = new Vulnerable(p5, this);
  }

  private randomStartingPosition() {
    return new Vector2D(
      Math.ceil(this._p5.random(WIDTH)),
      Math.ceil(this._p5.random(HEIGHT))
    );
  }
  draw() {
    this.state.draw(this.currentPosition);
    // const position = this.currentPosition.getComponents();
    // this._p5.circle(position[0], position[1], this.personSize);
  }
  changeState(state: State) {
    this.state = state;
  }
  updateState(persons: PersonContainer) {
    this.state.updateState(persons);
  }
  move() {
    if (Vector2D.distance(this.currentPosition, this.nextPosition) < PERSON_SIZE) {
      this.nextPosition = this.randomNextPosition();
    }
    this.updateCurrentPosition();
  }
  updateCurrentPosition() {
    const moveVector = this.createMoveVector();
    this.currentPosition = new Vector2D(
      this.currentPosition.getComponents()[0] + moveVector.getComponents()[0],
      this.currentPosition.getComponents()[1] + moveVector.getComponents()[1]
    );
  }
  bounce() {
    this.nextPosition = this.randomNextPosition();
  }
  randomNextPosition() {
    return new Vector2D(
      Math.ceil(this._p5.random(-WIDTH * 2, WIDTH * 2)),
      Math.ceil(this._p5.random(-HEIGHT * 2, HEIGHT * 2))
    );
  }
  createMoveVector() {
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
      currentPosition[0] < 0 + PERSON_SIZE / 2 ||
      currentPosition[0] > WIDTH - PERSON_SIZE / 2 ||
      currentPosition[1] < 0 + PERSON_SIZE / 2 ||
      currentPosition[1] > HEIGHT - PERSON_SIZE / 2
    );
  }
}
