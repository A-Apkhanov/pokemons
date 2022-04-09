const selectPokemonsIsLoading = (state: any) => state.pokemons.isLoading;
const selectPokemonsData = (state: any) => state.pokemons.data;
const selectPokemonsError = (state: any) => state.pokemons.error;

export { selectPokemonsIsLoading, selectPokemonsData, selectPokemonsError };
