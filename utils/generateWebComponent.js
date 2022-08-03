const fs = require('fs');
const path = require('path');

function startsWithUppercase(str) {
  return /[A-Z]/.test(str.charAt(0));
}

function includesUppercase(str) {
  return /[A-Z]/.test(str);
}

function includesDashOrUnderscore(str) {
  return /-|_/.test(str);
}
 
function convertToTagReadyString(str) {
  /**
   * If name being passed in is all lower-cased,
   * and doesn't include "-" or "_", 
   * like "mycomponent" or "mycomponent.js",
   * terminate the program as there is no way to
   * generator custom element HTML tag. 
   */
  if (!includesUppercase(str) && !includesDashOrUnderscore(str)) {
    console.log('Filename is not correct, please try format like "myComponent.js", "MyComponent.js", "my-component.js", or "my_component.js".');
    process.exit(1);
  }

  /**
   * Convert "my-component" to "my_component",
   * as "my-component" is not a valid class name.
   */
  if (includesDashOrUnderscore(str)) {
    return str.split(/-|_/).join('-').toLowerCase();
  }

  /**
   * If name starts with uppercase like "Mycomponent",
   * need to make sure it has another uppercase letter,
   * so we can generator custom element HTML tag.
   */
  str = str.replace(/[A-Z]/g, (match) => {
    return '-' + match;
  });

  if (str.startsWith('-')) {
    str = str.substring(1);
  }

  return str.toLowerCase();
}

module.exports = async function generateWebComponent(name, destination) {
  fs.readFile(
    // Read web component source template
    path.join(__dirname, '../templates', 'ExampleComponent.js'),
    'utf-8',
    (err, data) => {
      if (err) throw err;

      if (!fs.existsSync(destination)) {
        fs.mkdir(destination, err => {
          if (err) throw err;
          console.log(`${destination} directory created.`);
        });
      }

      let filename;

      if (name.includes('.')) { 
        filename = name.split('.')[0]; // MyComponent.js => MyComponent
      } else {
        filename = name;
      }

      console.log(filename)
      const tagName = convertToTagReadyString(filename);

      console.log(tagName)

      const componentName = filename.includes('-') ? filename.replace('-', '_') : filename;

      // Replace class name and custom element name
      data = data.replace(/ExampleComponent/g, componentName).replace(/example-component/g, tagName);

      // If destination folder entered is "./components/", get rid of the last "/".
      destination = destination.endsWith('/') ? destination.slice(0, -1) : destination;

      // If name entered didn't contain ".js", add that part
      name = name.includes('.') ? name : (name + '.js');

      fs.writeFile(`${destination}/${name}`, data, err => {
        if (err) throw err;
        console.log(`Your new shiny component ${name} is created inside ${destination}!`);
      });
  });
}