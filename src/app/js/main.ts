import App from './utils/App';
import * as dat from 'dat.gui';
import Tracking from './core/Tracking';

const app = new App();

app.isReady().then(() => {
  const gui = new dat.GUI();
  const colorFolder = gui.addFolder('Color');
  const detectionFolder = gui.addFolder('Detection');
  colorFolder.addColor(Tracking, 'color');
  colorFolder.add(Tracking, 'processImage');
  colorFolder.open();
  detectionFolder.add(Tracking, 'threshold', 0, 100);
  detectionFolder.add(Tracking, 'quality', 1, 50);
});
