const fs = require('fs');
const path = require('path');

export var library = [];

const DATABASE_PATH = path.join(__dirname, 'data/database.json');

export function save() {
  fs.writeFileSync(
    DATABASE_PATH,
    JSON.stringify(library, null, 2)
  );
}

export function load() {
  library = JSON.parse(fs.readFileSync(DATABASE_PATH));
}

export function add(info) {
  library.push(info);
  sort();
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

function sort() {
  library.sort((a, b) => {
    if (a.artist < b.artist) {
      return -1;
    }

    if (a.artist > b.artist) {
      return 1;
    }

    return 0;
  });
}
