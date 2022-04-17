import { RootState } from '../../store';

const selectPlayerOneData = (state: RootState) => state.playerOne.data;

export { selectPlayerOneData };
