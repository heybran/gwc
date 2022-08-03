# CLI Tool to Generate Web Components Boilerplate

## Installation

1. Clone the repository to your local machine
```bash
git clone https://github.com/iambran/gwc.git
```

2. Install Node dependencies
```bash
npm install
```

3. Run npm link
```bash
npm link
```

## How it works?

By running this, it will create a file `MyShinyComponent.js` inside `./components`.

```bash
gwc -n MyShinyComponent -d ./components
```

`-n` or `--name` flag is the component name you want to create, `-d` or `--destination` flag is which directory you want this component to live. If you don't have that directory, it will create one for you. If you leave out `-n` flag, it will default to `./components`.

`MyShinyComponent.js` file would look like this:

```javascript

export default class MyShinyComponent extends HTMLElement {
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

customElements.define('my-shiny-component', MyShinyComponent)
```

`-n` flas support there component name formats:

- myComponent
- MyComponent
- my-component
- my_component

## Source Template

If you need to change the source template, meaning you want to add `;` or add more codes in that file, you can edit `./templates/ExampleComponent.js` file.