import Person from "./Person";

export default class Memento {
    persons: Person[];
    time: number;
    constructor(persons: Person[], time: number) {
        this.persons = persons
        this.time = time;
    }
}
