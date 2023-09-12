export const getProductLocalStorage = state =>
  state.persistedReducerAdd.buyProduct.product;
export const getProductLocalStorageNotAuth = state =>
  state.persistedReducerAdd.buyProduct.userPr.product;
export const getFetchingCurr = state =>
  state.persistedReducerAdd.buyProduct.isFetching;
