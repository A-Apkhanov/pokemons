const selectUserAuth = (state: any) => state.user.isAuth;
const selectUserEmail = (state: any) => state.user.email;
const selectUserUid = (state: any) => state.user.uid;

export { selectUserAuth, selectUserEmail, selectUserUid };
