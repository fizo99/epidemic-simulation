import Person from "./Person";
import P5 from "p5";
import Infected from "./states/Infected";

export default class PersonContainer {
  _p5: P5;
  persons: Person[] = [];
  constructor(p5: P5, initPersonCount: number) {
    this._p5 = p5;
    for (let i = 0; i < initPersonCount; i++) {
      this.persons.push(new Person(p5));
    }
    for (let i = 0; i < 50; i++) {
      this.persons[i].changeState(new Infected(p5, this.persons[i]))
    }
  }
  getPersons() {
    return this.persons;
  }

  removePerson(person: Person) {
    this.persons.splice(this.persons.indexOf(person), 1);
    this.newPersonSteppingInto();
  }
  private newPersonSteppingInto() {
    const person = new Person(this._p5);
    if (Math.random() <= 0.1)
      person.changeState(new Infected(this._p5, person))
    this.persons.push(person);
  }
}
