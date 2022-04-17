import { RootState } from '../../store';

const selectGameStateStatus = (state: RootState) => state.game.status;
const selectGameStateWinner = (state: RootState) => state.game.winner;

export { selectGameStateStatus, selectGameStateWinner };
