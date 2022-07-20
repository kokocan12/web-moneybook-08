export class Component {
  constructor() {
    this.template = document.createElement('template');
  }
  setTemplate(template) {
    if (typeof template === 'string') {
      this.template.innerHTML = template;
    } else {
      this.template.append(template);
    }
  }

  get templateContent() {
    return this.template.content;
  }

  addEventListener(target, event, eventListener) {
    this.template.content.querySelector(target).addEventListener(event, evt => eventListener(evt));
  }
}
