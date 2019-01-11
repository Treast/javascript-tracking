export class Vector2 {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(vector: Vector2): Vector2 {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  substract(vector: Vector2): Vector2 {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }

  distance(vector: Vector2): number {
    const sum = Math.pow(vector.x - this.x, 2) + Math.pow(vector.y - this.y, 2);
    return Math.sqrt(sum);
  }

  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }
}
