import Vector from "./Vector";

export default class Vector2D implements Vector {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getComponents(): number[] {
    return [this.x, this.y];
  }
}
