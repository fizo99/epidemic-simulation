import P5 from "p5";
import "p5/lib/addons/p5.dom";
import "./styles.scss";

import PersonContainer from "./PersonContainer";
import Person from "./Person";
import {
  WIDTH,
  HEIGHT,
  BACKGROUND_COLOR,
  FRAME_RATE,
  ONE_FRAME_DURATION,
  INIT_HEALTHY_PERSONS_NUMBER,
  INIT_INFECTED_PERSONS_NUMBER
} from "./AnimationProperties";
import Healthy from "./states/Healthy";
import Infected from "./states/Infected";
import WithoutSymptoms from "./states/WithoutSymptoms";
import Resistant from "./states/Resistant";
import Vulnerable from "./states/Vulnerable";
import Memento from "./Memento";
import CareTaker from "./CareTaker";

const sketch = (p5: P5) => {
  const careTaker = new CareTaker();
  const persons = new PersonContainer(p5, INIT_HEALTHY_PERSONS_NUMBER, INIT_INFECTED_PERSONS_NUMBER);
  let time = 0.0;

  // The sketch setup method
  p5.setup = () => {
    p5.frameRate(FRAME_RATE);
    const canvas = p5.createCanvas(WIDTH, HEIGHT);
    setupButtonsListeners();
  };

  // The sketch draw method
  p5.draw = () => {
    p5.background(BACKGROUND_COLOR);
    persons.getPersons().forEach((person) => {
      person.draw();
      person.move();
      handlePersonOutsideWindow(person);
      person.updateState(persons)
    });
    updateTime();
    displayTime();
    displayStatistics(persons.getStatistics())
  };

  function handlePersonOutsideWindow(person: Person) {
    if (person.isOutsideWindow()) {
      if (p5.random() > 0.5) {
        persons.removePerson(person);
        persons.spawnNewPerson();
      } else {
        person.bounce();
      }
    }
  }
  function updateTime() {
    time += ONE_FRAME_DURATION;
  }
  function displayTime() {
    document.getElementById("time").innerHTML = time.toFixed(2) + "s"
  }
  function displayStatistics({
    infected,
    withSymptoms,
    withoutSymptoms,
    healthy,
    resistant,
    total
  }) {
    document.getElementById("infected").innerHTML = "infected: " + infected
    document.getElementById("withSymptoms").innerHTML = "with symptoms: " + withSymptoms
    document.getElementById("withoutSymptoms").innerHTML = "without symptoms: " + withoutSymptoms
    document.getElementById("healthy").innerHTML = "healthy: " + healthy
    document.getElementById("resistant").innerHTML = "resistant: " + resistant
    document.getElementById("total").innerHTML = "Total: " + total;
  }
  function setupButtonsListeners() {
    document.getElementById("save").addEventListener('click', () => {
      careTaker.create(persons.getPersons(), time);
      document.getElementById("mementos-count").innerHTML = careTaker.mementos.length.toString();
    })
    document.getElementById("restore").addEventListener('click', () => {
      const mementoNumber = parseInt((<HTMLInputElement>document.getElementById("memento-number")).value) - 1;
      if (careTaker.mementos.length <= mementoNumber) {
        alert("Wrong memento number");
        return;
      }
      const mementoState = careTaker.restore(mementoNumber);
      persons.setPersons(mementoState.persons);
      time = mementoState.time;
    })
  }
};

new P5(sketch);
