import { RootState } from '../../store';

const selectUserAuth = (state: RootState) => state.user.isAuth;
const selectUserEmail = (state: RootState) => state.user.email;
const selectUserUid = (state: RootState) => state.user.uid;

export { selectUserAuth, selectUserEmail, selectUserUid };
