const fs = require('fs');
const path = require('path');

export var library = [];

export function save() {
  fs.writeFileSync(
    path.join(__dirname, 'database.json'),
    JSON.stringify(library)
  );
}

export function load() {
  library = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'database.json'))
  );
}

export function add(info) {
  library.push(info);
  save();
}

export function getByTitle(title) {
  for (let i = 0; i < library.length; i++) {
    if (library[i].title === title) {
      return library[i];
    }
  }

  return null;
}
