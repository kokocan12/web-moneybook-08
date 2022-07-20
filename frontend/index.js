import { App } from './App.js';
import './style/style.scss';

window.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const app = new App();
  root.append(app.render());
});
