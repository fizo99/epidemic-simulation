import Person from "../Person";
import PersonContainer from "../PersonContainer";
import Vector from "../Vector"

export default interface State {
    person: Person;
    draw(position: Vector);
    updateState(persons: PersonContainer);
}