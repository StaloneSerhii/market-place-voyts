export const getContact = state => state.contacts.items;
export const getName = state => state.auth.user.name;
export const getIsLoading = state => state.auth.isLoggedIn;
export const getError = state => state.contacts.error;
export const getStatusFilter = state => state.filter;
