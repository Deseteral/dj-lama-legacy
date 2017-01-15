export default function() {
  return {
    fetch() {
      return Promise.resolve({});
    },

    save() {
      return Promise.resolve();
    }
  };
}
