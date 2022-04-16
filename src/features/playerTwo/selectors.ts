const selectPlayerTwoIsLoading = (state: any) => state.playerTwo.isLoading;
const selectPlayerTwoData = (state: any) => state.playerTwo.data;
const selectPlayerTwoError = (state: any) => state.playerTwo.error;

export { selectPlayerTwoIsLoading, selectPlayerTwoData, selectPlayerTwoError };
