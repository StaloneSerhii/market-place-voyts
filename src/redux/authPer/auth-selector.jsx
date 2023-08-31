export const getIsLoaggedIn = state => state.auth.isLoaggedIn;
export const getUsername = state => state.auth.user.email;
export const getFetching = state => state.auth.isFetching;
