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

let offset = 0;
const limit = 10;
const maxRecords = 151;

let pokemonListUl = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadButton");

function loadPokemonItens(offset, limit) {
    //requisição
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        const newList = pokemonList.map(pokemon => convertPokemonToLi(pokemon)).join('');

        return pokemonListUl.innerHTML += newList;
        //O retorno é da lista inteira de uma vez.
    })
    .catch((error) => console.error(error))
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);

        return;
    }

    loadPokemonItens(offset, limit);
});
