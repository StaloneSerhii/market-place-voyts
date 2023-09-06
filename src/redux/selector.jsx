export const getProductAll = state => state.productFetch.items;
export const getProductNum = state => state =>
  state.persistedReducerAdd.product.length;
export const getProductId = state => state.productFetch.productID;
export const getError = state => state.contacts.error;
