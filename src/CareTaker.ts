import Memento from "./Memento";
import PersonContainer from "./PersonContainer";
import Person from "./Person";
import p5 from "p5";

export default class CareTaker {
  mementos: Memento[] = [];
  create(persons: Person[], time: number) {
    this.mementos.push(new Memento(
      this.personArrayDeepCopy(persons),
      time
    ))
  }
  restore(mementoNumber: number) {
    const memento = this.mementos[mementoNumber];
    return {
      persons: this.personArrayDeepCopy(memento.persons),
      time: memento.time
    }
  }
  private personArrayDeepCopy(persons: Person[]) {
    const arrayCopy = [];
    persons.forEach(person => {
      arrayCopy.push(Person.deepCopy(person))
    })
    return arrayCopy;
  }
}
