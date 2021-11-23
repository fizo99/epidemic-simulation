import Person from "./Person";
import P5 from "p5";
import Infected from "./states/Infected";
import Vulnerable from "./states/Vulnerable";
import Healthy from "./states/Healthy";
import WithoutSymptoms from "./states/WithoutSymptoms";
import Vector2D from "./Vector2D";

export default class PersonContainer {
  _p5: P5;
  persons: Person[] = [];
  constructor(p5: P5, healthyPersons: number, infectedPersons: number) {
    this._p5 = p5;
    const totalPersonsNumber = healthyPersons + infectedPersons
    for (let i = 0; i < totalPersonsNumber; i++) {
      this.persons.push(new Person(p5));
    }
    for (let i = 0; i < infectedPersons; i++) {
      this.persons[i].changeState(new Infected(p5, this.persons[i]))
    }
  }
  getPersons() {
    return this.persons;
  }

  removePerson(person: Person) {
    this.persons.splice(this.persons.indexOf(person), 1);
  }

  getStatistics() {
    const statistics = {
      infected: 0,
      withSymptoms: 0,
      withoutSymptoms: 0,
      healthy: 0,
      resistant: 0,
      vulnerable: 0,
      total: this.persons.length
    }

    this.persons.forEach(person => {
      if (person.state instanceof Vulnerable && person.state.state instanceof Healthy) {
        statistics.healthy++;
      } else if (person.state instanceof Infected) {
        statistics.infected++;
        if (person.state.state instanceof WithoutSymptoms) statistics.withoutSymptoms++
        else statistics.withSymptoms++;
      } else {
        statistics.resistant++;
      }
    })

    return statistics;
  }

  setPersons(persons: Person[]) {
    this.persons = persons;
  }
  spawnNewPerson() {
    const person = new Person(this._p5);
    if (Math.random() <= 0.1)
      person.changeState(new Infected(this._p5, person))
    this.persons.push(person);
  }
}
