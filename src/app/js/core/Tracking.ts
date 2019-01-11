import { Color } from '../utils/Color';
import { Vector2 } from '../utils/Vector2';

class Tracking {
  public color: number[];
  public quality: number;
  public threshold: number;
  private canvas: HTMLCanvasElement;
  private imageElement: HTMLImageElement;
  private videoElement: HTMLVideoElement;
  private context: CanvasRenderingContext2D;
  private interval: number;

  constructor() {
    this.color = [0, 0, 0];
    this.quality = 1;
    this.threshold = 10;
    this.canvas = document.createElement('canvas');
    this.videoElement = document.querySelector('video');
    //this.imageElement = document.querySelector('img');
    //this.imageElement.addEventListener('load', () => this.onImageLoad());
    this.onImageLoad()
  }

  onImageLoad() {
    this.canvas.width = this.videoElement.getBoundingClientRect().width;
    this.canvas.height = this.videoElement.getBoundingClientRect().height;
    this.context = this.canvas.getContext('2d');

    this.videoElement.addEventListener('ended', () => { clearInterval(this.interval)})

    this.videoElement.addEventListener('play', () => {
      this.interval = setInterval(() => {
        this.processImage();
      }, 1000 / 60);
    })

    this.videoElement.addEventListener('canplay', () => {
      this.videoElement.play()
    })
  }

  processImage() {
    const selectedPixels = [];
    this.context.drawImage(this.videoElement, 0, 0, this.canvas.width, this.canvas.height);
    const pixels = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
    const color = new Color(this.color[0], this.color[1], this.color[2]);

    for (let i = 0; i < pixels.length; i += 4 * this.quality) {
      const pixelColor = new Color(pixels[i], pixels[i + 1], pixels[i + 2]);
      if (color.difference(pixelColor) < this.threshold) {
        const idx = i / 4;
        const y = Math.floor(idx / this.canvas.width) * this.quality;
        const x = (idx % this.canvas.width) * this.quality;
        selectedPixels.push(new Vector2(x, y));
      }
    }
    this.showRectangle(selectedPixels);
  }

  private showRectangle(selectedPixels: Vector2[]) {
    if (selectedPixels.length > 0) {
      // @ts-ignore
      const rectangle = selectedPixels.reduce(({ minX, maxX, minY, maxY }, item) => ({
        minX: (item.x < minX) ? item.x : minX,
        maxX: (item.x > maxX) ? item.x : maxX,
        minY: (item.y < minY) ? item.y : minY,
        maxY: (item.y > maxY) ? item.y : maxY,
      }), { minX: selectedPixels[0].x, maxX: selectedPixels[0].x, minY: selectedPixels[0].y, maxY: selectedPixels[0].y });
      let rectangleElement = document.querySelector('.rectangle') as HTMLElement;

      if(!rectangleElement) {
        rectangleElement = document.createElement('div') as HTMLElement;
        rectangleElement.classList.add('rectangle');
        document.body.appendChild(rectangleElement);
      }

      rectangleElement.style.top = `${rectangle.minY}px`;
      rectangleElement.style.left = `${rectangle.minX}px`;
      rectangleElement.style.width = `${rectangle.maxX - rectangle.minX}px`;
      rectangleElement.style.height = `${rectangle.maxY - rectangle.minY}px`;
    }
  }
}

export default new Tracking();
