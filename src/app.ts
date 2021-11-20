import P5 from "p5";
import "p5/lib/addons/p5.dom";
import "./styles.scss";

import Colors from "./Colors";
import PersonContainer from "./PersonContainer";
import WindowProperties from "./WindowProperties";

const FRAME_RATE = 25;

const sketch = (p5: P5) => {
  const persons: PersonContainer = new PersonContainer(p5, 100);
  new Colors(p5);

  // The sketch setup method
  p5.setup = () => {
    let exampleObj = [
      {
        name: "Samuel",
        age: 23
      },
      {
        name: "Axel",
        age: 15
      }
    ];
    p5.save(exampleObj, "output_text.json");
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
        persons.removePerson(person);
      }
    });
  };
};

new P5(sketch);
