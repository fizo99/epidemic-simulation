import P5 from "p5";

export default class Colors {
  static PERSON_COLOR;
  static TEXT_COLOR;
  static BACKGROUND_COLOR;
	constructor(p5: P5) {
    Colors.PERSON_COLOR = p5.color(255,0,0);
    Colors.TEXT_COLOR = p5.color(0);
    Colors.BACKGROUND_COLOR = p5.color(255,255,255);
	}
}
