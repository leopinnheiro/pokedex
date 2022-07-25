const pokemonNumber = document.getElementById('pokemon__number');
const pokemonName = document.getElementById('pokemon__name');
const pokemonImage = document.getElementById('pokemon__image');
const pokemonForm = document.getElementById('pokemon__form');
const pokemonInputSearch = document.querySelector('#pokemon__form .input__search');
const pokemonPrevButton = document.getElementById('btn-prev');
const pokemonNextButton = document.getElementById('btn-next');

let currentId = 1;

const fetchPokemon = async (pokemon) => {
  const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (apiResponse.status === 200) {
    const data = await apiResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonNumber.innerHTML = '';
  pokemonName.innerHTML = 'Loading...';
  pokemonImage.style.display = 'none';

  if (pokemon.toString().toLowerCase() === 'missingno') {
    await renderMissingNo();
    return
  }

  const data = await fetchPokemon(pokemon);

  if (data) {
    const { name, id, sprites } = data;
    currentId = id;
    await loadPokemonImage(sprites['versions']['generation-v']['black-white']['animated']['front_default']);

    pokemonNumber.innerHTML = `${id} - `;
    pokemonName.innerHTML = name;
  } else {
    pokemonName.innerHTML = 'Not found :C';
    pokemonNumber.innerHTML = `${0} - `;
  }

  pokemonInputSearch.value = '';
};

const renderMissingNo = async () => {
  pokemonNumber.innerHTML = `??? - `;
  pokemonName.innerHTML = 'MissingNo.';
  await loadPokemonImage('./images/missingno.gif');
};

const loadPokemonImage = path => {
  return new Promise((resolve, reject) => {
    pokemonImage.src = path
    pokemonImage.onload = () => {
      pokemonImage.style.display = 'block';
      resolve(pokemonImage)
    }
    pokemonImage.onerror = e => {
      reject(e)
    }
  })
}

pokemonForm.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(pokemonInputSearch.value.toLowerCase());
});

pokemonNextButton.addEventListener('click', () => {
  currentId++;
  renderPokemon(currentId);
});

pokemonPrevButton.addEventListener('click', () => {
  if (currentId > 1) {
    currentId--;
    renderPokemon(currentId);
  }
});

renderPokemon(currentId);