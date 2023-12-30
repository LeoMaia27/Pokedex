function convertPokemonToLi(pokemon) {
    // const pokemonImagePath = pokemon.sprites.other.dream_world.front_default;
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="details">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </li>
        `
}

let pokemonListUl = document.getElementById("pokemonList");

//requisição
pokeApi.getPokemons().then((pokemonList = []) => {
        // pokemonList.forEach((pokemon) => {
        //     pokemonListUl.innerHTML += convertPokemonToLi(pokemon);
        // })

        const newList = pokemonList.map(pokemon => convertPokemonToLi(pokemon));

        return pokemonListUl.innerHTML += newList.join('');
        //O retorno é da lista inteira de uma vez.
    })
    .catch((error) => console.error(error))
