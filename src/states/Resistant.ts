import State from "./State";
import Person from "../Person"
import p5 from "p5";
import Vector from "../Vector";
import { PERSON_SIZE, RESISTANT_PERSON_COLOR} from "../AnimationProperties";

export default class Resistant implements State {
    _p5: p5;

    constructor(p5: p5, public person: Person) {
        this.person = person;
        this._p5 = p5;
    }
    draw(position: Vector) {
        const positionCoords = position.getComponents();
        this._p5.fill(RESISTANT_PERSON_COLOR)
        this._p5.circle(positionCoords[0], positionCoords[1], PERSON_SIZE);
    }
    updateState() {}
};