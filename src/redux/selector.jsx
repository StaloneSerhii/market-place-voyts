export const getProductLocalStorage = state =>
  state.persistedReducerAdd.buyProduct.product;
export const getProductLocalStorageNotAuth = state =>
  state.persistedReducerAdd.buyProduct.userPr.product;
export const getFetchingCurr = state =>
  state.persistedReducerAdd.buyProduct.isFetching;
export const getMyStore = state =>
  state.persistedReducerAdd.buyProduct.userPr.myStore;
export const getFavoriteProductLocalStorage = state =>
  state.persistedReducerAdd.buyProduct.myFavorite;
export const getFavoriteProductLocalStorageAuth = state =>
  state.persistedReducerAdd.buyProduct.userPr.myFavorite;
