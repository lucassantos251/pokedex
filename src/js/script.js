const apiLink = 'https://pokeapi.co/api/v2/pokemon/'

const pokemonNumber = document.querySelector('.pokemon-number')
const pokemonName = document.querySelector('.pokemon-name')
const pokemonImage = document.querySelector('.pokemon-image')

const form = document.querySelector('.form')
const inputSearch = document.querySelector('.input-search')

const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

let searchNumber = 1;

const fetchPokemon = async (pokemon) => {
  const apiResponse = await fetch(`${apiLink}${pokemon}`)

  if(apiResponse.status === 200){
      const data = await apiResponse.json()
      return data
  }
}

const renderPokemon = async (pokemon) => {
  pokemonNumber.innerHTML = ''
  pokemonName.innerHTML = 'Loading'

  const data = await fetchPokemon(pokemon)
 
  if(data){
    const imgData = data['sprites']['versions']['generation-v']['black-white']['animated']
    
    pokemonNumber.innerHTML = data.id
    pokemonName.innerHTML = data.name

    if(imgData.front_default !== null) {
       pokemonImage.src = imgData.front_default;
    } else {
       pokemonImage.src = 'src/images/pokeball.png'
    }

    searchNumber = Number(data.id)
    inputSearch.value = ''
  } else {
    pokemonNumber.innerHTML = 'x'
    pokemonName.innerHTML = 'Not Found'
    pokemonImage.src = 'src/images/pokeball.png'
  }  
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  renderPokemon(inputSearch.value.toLowerCase())
})

btnPrev.addEventListener('click', () => {
  if(searchNumber > 1){
    searchNumber--
    renderPokemon(searchNumber)
  }
})

btnNext.addEventListener('click', () => {
  if(searchNumber < 905){
    searchNumber++
    renderPokemon(searchNumber)
  }
})


renderPokemon(searchNumber);

