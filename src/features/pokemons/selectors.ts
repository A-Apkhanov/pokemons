import { RootState } from '../../store';

const selectPokemonsIsLoading = (state: RootState) => state.pokemons.isLoading;
const selectPokemonsData = (state: RootState) => state.pokemons.data;
const selectPokemonsError = (state: RootState) => state.pokemons.error;

export { selectPokemonsIsLoading, selectPokemonsData, selectPokemonsError };
