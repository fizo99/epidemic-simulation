import WindowProperties from "./WindowProperties";
import Person from "./Person";
import P5 from "p5";

export default class PersonContainer {
  _p5: P5;
  persons: Person[] = [];
  constructor(p5: P5, initPersonCount: number) {
    this._p5 = p5;
    for (let i = 0; i < initPersonCount; i++) {
      this.persons.push(new Person(p5));
    }
    console.log(this.persons.length);
  }
  getPersons() {
    return this.persons;
  }

  removePerson(person: Person) {
    this.persons.splice(this.persons.indexOf(person), 1);
  }
}
