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

  static distance(v1: Vector, v2: Vector) {
    const v1Components = v1.getComponents();
    const v2Components = v2.getComponents();
    if (v1Components.length != 2 || v2Components.length != 2) {
      //throw Exception()
      return 0.0;
    }
    return Math.sqrt(
      Math.pow(v2Components[0] - v1Components[0], 2)
      +
      Math.pow(v2Components[1] - v1Components[1], 2)
    )
  }ł
}
