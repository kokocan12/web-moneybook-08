export class Header {
  render() {
    const container = document.createElement('div');
    const title = document.createElement('h1'); //document.querySelector('h1')
    title.innerText = 'Header';

    container.appendChild(title);

    return container;
  }
}
