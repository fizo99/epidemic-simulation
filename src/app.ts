import P5 from "p5";
import "p5/lib/addons/p5.dom";
import "./styles.scss";

import Colors from "./Colors";
import PersonContainer from "./PersonContainer";
import WindowProperties from "./WindowProperties";

const FRAME_RATE = 100;
const PERSONS_NUMBER = 100;

const sketch = (p5: P5) => {
  const persons: PersonContainer = new PersonContainer(p5, PERSONS_NUMBER);
  new Colors(p5);

  // The sketch setup method
  p5.setup = () => {
    p5.frameRate(FRAME_RATE);
    const canvas = p5.createCanvas(
      WindowProperties.WIDTH,
      WindowProperties.HEIGHT
    );
  };

  // The sketch draw method
  p5.draw = () => {
    p5.background(Colors.BACKGROUND_COLOR);
    p5.fill(Colors.PERSON_COLOR);
    persons.getPersons().forEach((person) => {
      person.draw();
      person.move();
      if (person.isOutsideWindow()) {
        const x = p5.random()
        if (x > 0.5) {
          persons.removePerson(person);
        } else {
          person.bounce();
        }
      }
    });
  };
};

new P5(sketch);
