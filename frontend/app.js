import { Header } from './components/Header.js';
import { MainPage } from './pages/MainPage.js';
import { HistoryStore } from './store/historyStore.js';

export class App {
  render() {
    const container = document.createElement('div');
    const historyStore = new HistoryStore();

    const header = new Header();
    const mainPage = new MainPage({ store: historyStore });

    container.append(header.render(), mainPage.render());

    return container;
  }
}
