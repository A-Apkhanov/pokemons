import { RootState } from '../../store';

const selectPlayerTwoIsLoading = (state: RootState) =>
	state.playerTwo.isLoading;
const selectPlayerTwoData = (state: RootState) => state.playerTwo.data;
const selectPlayerTwoError = (state: RootState) => state.playerTwo.error;

export { selectPlayerTwoIsLoading, selectPlayerTwoData, selectPlayerTwoError };
