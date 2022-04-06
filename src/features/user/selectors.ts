const selectUserEmail = (state: any) => state.user.email;
const selectUserAuth = (state: any) => state.user.isAuth;

export { selectUserEmail, selectUserAuth };
