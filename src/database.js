const fs = require('fs');
const path = require('path');

const DATABASE_PATH = path.join(__dirname, 'data/database.json');

export class Database {
  constructor() {
    this.library = [];
    this._sortedLibrary = [];
  }

  save() {
    fs.writeFileSync(
      DATABASE_PATH,
      JSON.stringify(this.library, null, 2)
    );
  }

  load() {
    this.library = JSON.parse(fs.readFileSync(DATABASE_PATH));
    this._sortedLibrary = this.library.slice();
    this.sort();
  }

  add(song) {
    this.library.push(song);
    this._sortedLibrary.push(song);
    this.save();
    this.sort();
  }

  findByTitle(title) {
    for (let i = 0; i < this.library.length; i++) {
      if (this.library[i].title === title) {
        return {
          song: this.library[i],
          index: i
        };
      }
    }

    return null;
  }

  findById(id) {
    for (let i = 0; i < this.library.length; i++) {
      if (this.library[i].id === id) {
        return {
          song: this.library[i],
          index: i
        };
      }
    }

    return null;
  }

  sort() {
    this._sortedLibrary.sort((a, b) => {
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
