export default class ExampleComponent extends HTMLElement {
  static get observedAttributes() {
    return []
  }

  constructor() {
    super()
    this.attachShadow({mode: 'open'})
  }

  connectedCallback() {

  }

  disconnectedCallback() {

  }

  attributeChangedCallback() {

  }
}

customElements.define('example-component', ExampleComponent)