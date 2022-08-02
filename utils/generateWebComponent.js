const fs = require('fs');
const path = require('path');

function startsWithUppercase(str) {
  let regex = /[A-Z]/;
  return regex.test(str.charAt(0));
}

function includesUppercase(str) {
  return /[A-Z]/.test(str);
}

function includesDashOrUnderscore(str) {
  return /-|_/.test(str);
}
 
function convertToTagReadyString(str) {
  // e.g. mycomponent
  if (!includesUppercase(str) && !includesDashOrUnderscore(str)) {
    console.log('Filename is not correct');
    process.exit(1);
  }
  const array = [];

  if (includesDashOrUnderscore(str)) {
    return str.split(/-|_/).join('-').toLowerCase();
  }

  for (let i = 0; i < str.length; i++ ) {
    if (/[A-Z]/.test(str.charAt(i))) {
      array.push(str[i]);
    }
  }

  if (startsWithUppercase(str)) {
    const firstLetter = str.charAt(0);
    let copy = str.substring(1);
    console.log(copy, str);
    if (!includesUppercase(copy)) {
      console.log(`It seems like your filename only includes one uppercase? \nPlease try format like this "MyComponent".`);
      process.exit(1);
    }

    copy = copy.replace(/[A-Z]/g, (match, variable) => {
      return '-' + match;
    });

    return (firstLetter + copy).toLowerCase();
  }
}

module.exports = async function generateWebComponent(name, destination) {
  fs.readFile(
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

      let componentTag;
      // Replace component name inside data with name being passed in
      // Possible Name Patterns
      // 1: MyComponent.js
      if (name.includes('.')) { // 输入MyComponent.js
        filename = name.split('.')[0];
        if (startsWithUppercase(filename)) {
          console.log('yes');
        }

        const tagName = convertToTagReadyString(filename);
        console.log(tagName);
      }
      // 2: MyComponent
      // 3: myComponent.js
      // 4: myComponent
      // 5: my-component.js
      // 6: my-component
      // 7: my_component.js
      // 8: my_component
      // 9: mycomponent.js // should defend this one
      // 10: MyShinyComponent

      fs.writeFile(`${destination}/${name}`, data, err => {
        if (err) throw err;
        console.log('Your new shiny component is generated!')
      });
  });
}