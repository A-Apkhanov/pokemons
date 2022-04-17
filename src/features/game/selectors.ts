import { RootState } from '../../store';

const selectGameStatus = (state: RootState) => state.game.status;
const selectGameWinner = (state: RootState) => state.game.winner;

export { selectGameStatus, selectGameWinner };
