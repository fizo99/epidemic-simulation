import P5 from "p5";
import "p5/lib/addons/p5.dom";
import "./styles.scss";

import PersonContainer from "./PersonContainer";
import { WIDTH, HEIGHT, BACKGROUND_COLOR, FRAME_RATE } from "./AnimationProperties";
import Healthy from "./states/Healthy";
import Infected from "./states/Infected";
import WithoutSymptoms from "./states/WithoutSymptoms";
import Resistant from "./states/Resistant";
import Vulnerable from "./states/Vulnerable";

const PERSONS_NUMBER = 200;
let time = 0.0;



const sketch = (p5: P5) => {
  const persons: PersonContainer = new PersonContainer(p5, PERSONS_NUMBER);

  // The sketch setup method
  p5.setup = () => {
    p5.frameRate(FRAME_RATE);
    const canvas = p5.createCanvas(WIDTH, HEIGHT);
  };

  // The sketch draw method
  p5.draw = () => {
    p5.background(BACKGROUND_COLOR);
    p5.text(time.toFixed(2), 10, 10)
    persons.getPersons().forEach((person) => {
      person.draw();
      person.move();
      if (person.isOutsideWindow()) {
        // if (p5.random() > 0.5) persons.removePerson(person);
        // else person.bounce();
        person.bounce();
      }
      person.updateState(persons)
    });
    time += 0.04
    showStatistics(persons)
  };

};

function showStatistics(personContainer: PersonContainer) {
  const statistics = {
    infected: 0,
    withSymptoms: 0,
    withoutSymptoms: 0,
    healthy: 0,
    resistant: 0,
    vulnerable: 0
  }
  const persons = personContainer.getPersons();
  persons.forEach(person => {
    if (person.state instanceof Vulnerable) {
      statistics.vulnerable++;
      if (person.state.state instanceof Healthy) statistics.healthy++;

    } else if (person.state instanceof Infected) {
      statistics.infected++;
      if (person.state.state instanceof WithoutSymptoms) statistics.withoutSymptoms++
      else statistics.withSymptoms++;
    } else {
      statistics.resistant++;
    }
  })
  document.getElementById("statistics").innerHTML = JSON.stringify(statistics, null, "\t")
    .split("{").join("")
    .split("}").join("")
    .split("\"").join("")
    .split(",").join("<br>")
}

new P5(sketch);
