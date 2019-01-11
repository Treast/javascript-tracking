export class Color {
  public red: number;
  public green: number;
  public blue: number;

  constructor(red: number = 0, green: number = 0, blue: number = 0) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  hex(): string {
    return `${this.colorToHex(this.red)}${this.colorToHex(this.green)}${this.colorToHex(this.blue)}`;
  }

  isLight(): boolean {
    const sum = this.red + this.green + this.blue;
    return sum > 127;
  }

  isDark(): boolean {
    return !this.isLight();
  }

  private colorToHex(color: number): string {
    let hex = Number(color).toString(16);
    if (hex.length < 2) {
      hex = `0${hex}`;
    }
    return hex;
  }

  difference(color: Color): number {
    const diffR = Math.abs(this.red - color.red) / 255;
    const diffG = Math.abs(this.green - color.green) / 255;
    const diffB = Math.abs(this.blue - color.blue) / 255;

    return (diffR + diffG + diffB) / 3 * 100;
  }

  clone(): Color {
    return new Color(this.red, this.green, this.blue);
  }
}
