import Vector from "./Vector";
import Vector2D from "./Vector2D";
import { WIDTH, HEIGHT, PERSON_SIZE, PERSON_MAX_SPEED, PERSON_MIN_SPEED } from "./AnimationProperties";
import P5 from "p5";
import State from "./states/State";
import Healthy from "./states/Healthy";
import Vulnerable from "./states/Vulnerable";
import Resistant from "./states/Resistant";
import PersonContainer from "./PersonContainer";
import Infected from "./states/Infected";
import WithoutSymptoms from "./states/WithoutSymptoms";
import WithSymptoms from "./states/WithSymptoms";

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
  static deepCopy(person: Person) {
    const newPerson = new Person(person._p5);
    newPerson.currentPosition = new Vector2D(
      person.currentPosition.getComponents()[0],
      person.currentPosition.getComponents()[1]
    );
    newPerson.nextPosition = new Vector2D(
      person.nextPosition.getComponents()[0],
      person.nextPosition.getComponents()[1]
    );
    if (person.state instanceof Healthy) {
      newPerson.state = new Healthy(person._p5, newPerson)
    } else if (person.state instanceof Infected) {
      newPerson.state = new Infected(person._p5, newPerson)
    } else if (person.state instanceof Resistant) {
      newPerson.state = new Resistant(person._p5, newPerson)
    } else if (person.state instanceof Vulnerable) {
      newPerson.state = new Vulnerable(person._p5, newPerson)
    } else if (person.state instanceof WithoutSymptoms) {
      newPerson.state = new WithoutSymptoms(person._p5, newPerson)
    } else if (person.state instanceof WithSymptoms) {
      newPerson.state = new WithSymptoms(person._p5, newPerson)
    }
    return newPerson;
  }

  private randomStartingPosition() {
    return new Vector2D(
      Math.ceil(this._p5.random(WIDTH)),
      Math.ceil(this._p5.random(HEIGHT))
    );
  }
  draw() {
    this.state.draw(this.currentPosition);
  }
  changeState(state: State) {
    this.state = state;
  }
  updateState(persons: PersonContainer) {
    this.state.updateState(persons);
  }
  move() {
    if (Vector2D.distance(this.currentPosition, this.nextPosition) < PERSON_SIZE
      || this._p5.random() < 0.05) {
      this.nextPosition = this.randomNextPosition();
    }
    this.updateCurrentPosition();
  }
  updateCurrentPosition() {
    const moveVector = this.createMoveVector();
    const speed = this._p5.random(PERSON_MIN_SPEED, PERSON_MAX_SPEED);
    this.currentPosition = new Vector2D(
      this.currentPosition.getComponents()[0] + moveVector.getComponents()[0] / speed,
      this.currentPosition.getComponents()[1] + moveVector.getComponents()[1] / speed
    );
  }
  bounce() {
    this.nextPosition = this.randomNextPosition();
  }
  randomNextPosition() {
    return new Vector2D(
      Math.ceil(this._p5.random(-WIDTH, WIDTH * 2)),
      Math.ceil(this._p5.random(-HEIGHT, HEIGHT * 2))
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
