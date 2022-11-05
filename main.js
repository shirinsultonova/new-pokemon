let pokemonList = document.querySelector(".pokemon-list");

let seachPokemonForm = document.querySelector(".pokemon-search-form");
let searchInput = document.querySelector(".search-input");
let searchBtn = document.querySelector(".search-btn");

let weaknessPokemonSelect = document.querySelector(".pokemon-weakness-select");

let sortSelectPokemons = document.querySelector(".js-sort-select");
let searchWeaknessBtn = document.querySelector(".search-weakness-btn");

let pokemonTemplate = document.querySelector(".pokemon-template").content;

function pokemonRender(pokemons, titleRegex = "") {
  pokemonList.innerHTML = "";

  let pokemonfragment = new DocumentFragment();

  for (let pokemon of pokemons) {
    let clonePokemonTemplate = pokemonTemplate.cloneNode(true);

    clonePokemonTemplate.querySelector(".pokemon-item");

    // ! Marks searched input's value
    if (titleRegex.source !== "(?:)" && titleRegex) {
      clonePokemonTemplate.querySelector(".pokemon-title").innerHTML =
        pokemon.name.replace(
          titleRegex,
          `<mark class="p-0 bg-warning">${titleRegex.source}</mark>`
        );
    } else {
      clonePokemonTemplate.querySelector(".pokemon-title").textContent =
        pokemon.name;
    }

    clonePokemonTemplate.querySelector(".pokemon-img").src = pokemon.img;
    clonePokemonTemplate.querySelector(".pokemon-candy").textContent =
      pokemon.candy;
    clonePokemonTemplate.querySelector(".pokemon-span-time").textContent =
      pokemon.spawn_time;
    clonePokemonTemplate.querySelector(".pokemon-num").textContent =
      pokemon.num;
    clonePokemonTemplate.querySelector(".pokemon-weakness").textContent =
      pokemon.weaknesses.join(", ");
    clonePokemonTemplate.querySelector(".pokemon-candy-count").textContent =
      pokemon.candy_count;

    clonePokemonTemplate.querySelector(
      ".pokemon-weight"
    ).textContent = `${pokemon.weight} kg`;
    clonePokemonTemplate.querySelector(".pokemon-height").textContent =
      pokemon.height;
    pokemonfragment.appendChild(clonePokemonTemplate);
  }
  pokemonList.appendChild(pokemonfragment);
}
pokemonRender(pokemons);

// ! Search Pokemon
function searchPokemonSubmit(evt) {
  evt.preventDefault();
  const searchElement = new RegExp(searchInput.value.trim(), "gi");
  const searchPokemonFiltered = pokemons.filter((item) =>
    item.name.match(searchElement)
  );

  const candCount = pokemons.filter((item) => item.candy_count);

  sortPokemonWeakness(searchPokemonFiltered);
  pokemonRender(searchPokemonFiltered, searchElement);
  if (
    sortSelectPokemons.value == "candyCountOld" ||
    sortSelectPokemons.value == "candyCountNew"
  ) {
    sortPokemonList(candCount, sortSelectPokemons.value);
    pokemonRender(candCount, searchElement);
  } else {
    if (searchPokemonFiltered.length > 0) {
      sortPokemonList(searchPokemonFiltered, sortSelectPokemons.value);
      pokemonRender(searchPokemonFiltered, searchElement);
    } else {
      alert("Pokemon you wanted is not found");
    }
  }
}
seachPokemonForm.addEventListener("submit", searchPokemonSubmit);

const pokemonWeakness = [];
function sortPokemonWeakness() {
  pokemons.forEach((pokemon) => {
    const weaknessPokemon = pokemon.weaknesses;
    weaknessPokemon.forEach((weakness) => {
      if (!pokemonWeakness.includes(weakness)) {
        pokemonWeakness.push(weakness);
        weakness.toString();
      }
    });
  });
  pokemonWeakness.sort();
}
sortPokemonWeakness();

// ! Select soritng by Weakness
const newSelectFragment = document.createDocumentFragment();
pokemonWeakness.forEach((option) => {
  const newPokemonOption = document.createElement("option");
  newPokemonOption.textContent = option;
  newPokemonOption.value = option;
  newSelectFragment.appendChild(newPokemonOption);
});

weaknessPokemonSelect.appendChild(newSelectFragment);

searchWeaknessBtn.addEventListener("click", () => {
  const weaknessSelectValue = weaknessPokemonSelect.value;
  const weaknessResult = pokemons.filter((item) => {
    return item.weaknesses.includes(weaknessSelectValue);
  });
  pokemonRender(weaknessResult);
});

function sortPokemonList(sortedArr, sortType) {
  if (sortType == "a-z") {
    sortedArr.sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0));
  } else if (sortType === "z-a") {
    sortedArr.sort((a, b) => b.name.charCodeAt(0) - a.name.charCodeAt(0));
  } else if (sortType === "tohigh") {
    sortedArr.sort((a, b) => a.weight - b.weight);
  } else if (sortType === "tolow") {
    sortedArr.sort((a, b) => b.weight - a.weight);
  } else if (sortType === "candyCountOld") {
    sortedArr.sort((a, b) => a.candy_count - b.candy_count);
  } else if (sortType === "candyCountNew") {
    sortedArr.sort((a, b) => b.candy_count - a.candy_count);
  } else if (sortType === "heightHigh") {
    sortedArr.sort((a, b) => a.height - b.height);
  } else if (sortType === "heightLow") {
    sortedArr.sort((a, b) => b.height - a.height);
  }
}

