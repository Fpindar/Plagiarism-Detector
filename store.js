// Group collection of objects by property
function groupStoreBy(store, prop) {
  return store.reduce((accumulator, current) => {
    const key = current[prop];
    if(!accumulator[key]) accumulator[key] = [];
    accumulator[key].push(current);
    
    return accumulator;
  });
}

module.exports = {
  // Initializes the store
  createStore() {
    return [];
  },
  
  // Extends existing store
  addToStore(store, results) {
    return [...store, ...results];
  },

  // Group store by input property
  groupStoreByInput(store) {
    return groupStoreBy(store, "inputId");
  }
};