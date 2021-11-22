import State from "./State";
import Person from "../Person"
import p5 from "p5";
import Vector from "../Vector";
import Vector2D from "../Vector2D";
import { PERSON_SIZE, HEALTHY_PERSON_COLOR, FRAME_RATE } from "../AnimationProperties";
import PersonContainer from "../PersonContainer";
import Healthy from "./Healthy";
import WithSymptoms from "./WithSymptoms";
import WithoutSymptoms from "./WithoutSymptoms";
import Infected from "./Infected";

export default class Vulnerable implements State {
    _p5: p5;
    state: State;
    timeAroundInfected: number;
    minTimeToGetInfected: number = 3 * FRAME_RATE;
    constructor(p5: p5, public person: Person) {
        this.person = person;
        this.state = new Healthy(p5, person);
        this._p5 = p5;
        this.timeAroundInfected = 0;
    }
    draw(position: Vector) {
        this.state.draw(position);
    }
    updateState(persons: PersonContainer) {
        // check contact with people infected
        const isInfectedAround: boolean = persons
            .getPersons()
            .filter(person => person.state instanceof Infected)
            .some(person => Vector2D.distance(this.person.currentPosition, person.currentPosition) < PERSON_SIZE + 2);

        if (isInfectedAround) {
            if (++this.timeAroundInfected == this.minTimeToGetInfected) {
                console.log("CHANGED")
                this.person.changeState(new Infected(this._p5, this.person));
            }
        } else {
            this.timeAroundInfected = 0;
        }
    }
};