const fs = require('fs');
const path = require('path');

const DATABASE_PATH = path.join(__dirname, 'data/database.json');

export class Database {
  constructor() {
    this.library = [];
  }

  save() {
    fs.writeFileSync(
      DATABASE_PATH,
      JSON.stringify(this.library, null, 2)
    );
  }

  load() {
    this.library = JSON.parse(fs.readFileSync(DATABASE_PATH));
  }

  add(song) {
    this.library.push(song);
    this.sort();
    this.save();
  }

  getByTitle(title) {
    for (let i = 0; i < this.library.length; i++) {
      if (this.library[i].title === title) {
        return this.library[i];
      }
    }

    return null;
  }

  sort() {
    this.library.sort((a, b) => {
      if (a.artist < b.artist) {
        return -1;
      }

      if (a.artist > b.artist) {
        return 1;
      }

      return 0;
    });
  }
}
