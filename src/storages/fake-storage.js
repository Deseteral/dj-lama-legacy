export default function () {
  return {
    fetch() {
      return Promise.resolve({
        library: [],
        tags: []
      });
    },

    save() {
      return Promise.resolve();
    }
  };
}
