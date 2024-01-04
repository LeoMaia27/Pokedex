function convertPokeApiDetailToPokemon(pokeDetail) { //from class
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [firstType] = types; //destructuring from first index

    pokemon.types = types;
    pokemon.type = firstType;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

const pokeApi = {
    getPokemonDetail(pokemon) {
        return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
    },
    getPokemons(offset = 0, limit = 5) {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

        return fetch(url)
            .then((response) => response.json())
            .then((jsonBody) => jsonBody.results)
            .then((pokemons) => pokemons.map(this.getPokemonDetail))
            .then((pokemonDetailsRequest) => Promise.all(pokemonDetailsRequest))
            .then((details) => details)
            .catch((error) => console.log(error))
    }
}