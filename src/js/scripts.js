/* eslint-disable no-undef */
// IIFE
let  pokemonRepository = (function() {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
      }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
    }

    // validating pokemon input
    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon
          ) {
            pokemonList.push(pokemon);
          } else {
            console.log('The Pokemon must be defined as an object.');
          }

            //  const validKeyNames = ['name', 'height', 'types'];

            //  if (typeof pokemon === 'object'
            //  && Object.keys(pokemon).every(keyName => validKeyNames.includes(keyName))) {
            //    pokemonList.push(pokemon);
            //  } else {
            //      alert('The Pokemon must be defined as an object.');
            //  }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');

        let listItem = document.createElement('div');
        listItem.classList.add('col-md-3');
        listItem.classList.add('p-2');

        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn-outline-success');
        button.classList.add('btn');
        button.classList.add('w-100');
        button.classList.add('text-capitalize');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');

        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        button.addEventListener('click', function () {
        showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function () {
        showModal(pokemon);
      });

      ////// CREATING MODAL /////////////////////////////////////
      function showModal(pokemon) {

          let modalBody = $('.modal-body');
          let modalTitle = $('.modal-title');

          // empty previous content
          modalBody.empty();
          modalTitle.empty();


          let pokemonName = $('<h1>' + pokemon.name + '</h1>');
          let imageElement = $('<img class="modal-img" style=width:"50%">');
          imageElement.attr('src', pokemon.imageUrl);
          let pokemonHeight = $('<p>' + 'height: ' + pokemon.height + '</p>');

          modalTitle.append(pokemonName);
          modalBody.append(pokemonHeight);
          modalBody.append(imageElement);

      }
      ////////////////////////////////////////////////////////////////

      ///////// HIDING MODAL ////////////////////////////////////////
      function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
      }

      // modalContainer.addEventListener('click', (e) => {
      //   e.preventDefault();
      //   // Since this is also triggered when clicking INSIDE the modal
      //   // We only want to close if the user clicks directly on the overlay
      //   let target = e.target;
      //   if (target === modalContainer) {
      //     hideModal();
      //   }
      // });

      window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (
          e.key === 'Escape' &&
          modalContainer.classList.contains('is-visible')
        ) {
          hideModal();
        }
      });
      //////////////////////////////////////////////////////////////////

    }

    function filterPokemon(e) {
      e.preventDefault();
      const searchInput = document.getElementById('search-input');
      const inputValue = searchInput.value;
      console.log(inputValue);
      const filteredPokemon = pokemonList.filter((pokemon) =>
        pokemon.name.includes(inputValue)
      );
      pokemonList = filteredPokemon;
      // get the pokemonlist element
      const pokemonListElement = document.querySelector('.pokemon-list');
      // clear of any children
      pokemonListElement.innerHTML = '';
      // render the filtered list
      pokemonList.forEach((pokemon) => {
        addListItem(pokemon);
      });
    }



  //here I tried something to make the search bar work
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', filterPokemon );
  // search on value change

    return {
        add,
        getAll,
        addListItem,
        loadList,
        loadDetails,
        showDetails
    };

})();


// forEach method that iterates through the pokemonList array
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });
