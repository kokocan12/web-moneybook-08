import { App } from './App.js';
import './style/style.scss';

window.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  root.append(App());
});
