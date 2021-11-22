import State from "./State";
import WithSymptoms from "./WithSymptoms";
import WithoutSymptoms from "./WithoutSymptoms";
import Person from "../Person"
import p5 from "p5";
import Vector from "../Vector";
import PersonContainer from "../PersonContainer";
import { FRAME_RATE } from "../AnimationProperties";
import Resistant from "./Resistant";

export default class Infected implements State {
    _p5: p5;
    state: State;
    counter: number;

    constructor(p5: p5, public person: Person) {
        this.person = person;
        this._p5 = p5;
        this.state = this.initState();
        this.counter = Math.floor(Math.random() * (30 - 20 + 1) + 20) * FRAME_RATE;
    }
    initState() {
        if (Math.random() < 0.5)
            return new WithSymptoms(this._p5, this.person);
        else
            return new WithoutSymptoms(this._p5, this.person);
    }
    draw(position: Vector) {
        this.state.draw(position);
        this.counter--;
    }
    updateState(persons: PersonContainer) {
        if (this.counter == 0) {
            this.person.changeState(new Resistant(this._p5, this.person))
        }
    }
};