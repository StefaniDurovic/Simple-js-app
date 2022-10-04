
// inserting an image - need to figure out the styling
let img = document.createElement("img"); 
 
img.src = "img/International_Pokémon_logo.svg.png"; 
let src = document.getElementById("image"); 
 
src.appendChild(img);


// IIFE
let  pokemonRepository = (function() {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector("#modal-container");

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
            console.log(pokemon);
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
            typeof pokemon === "object" &&
            "name" in pokemon
          ) {
            pokemonList.push(pokemon);
          } else {
            console.log("The Pokemon must be defined as an object.");
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

        let listItem = document.createElement('li');

        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add("button-style");

        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        button.addEventListener('click', function () {
        showDetails(pokemon);
        console.log(pokemon);
        });
    }

    function showDetails(pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function () {
        showModal(pokemon);
      });

      ////// CREATING MODAL /////////////////////////////////////
      function showModal(pokemon) {

        // Clear all existing modal content
        modalContainer.innerHTML = "";
        
        // creating the modal
        let modal = document.createElement("div");
        modal.classList.add("modal");

        // Add the new modal content
        let closeButtonElement = document.createElement("button");
        closeButtonElement.classList.add("modal-close");
        closeButtonElement.innerText = "Close";
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement("h1");
        titleElement.innerText = pokemon.name;

        let contentElement = document.createElement("p");
        contentElement.innerText = 'Height:' + pokemon.height;

        let imageElement = document.createElement("img");
        imageElement.setAttribute("src", pokemon.imageUrl);
        imageElement.setAttribute("width", "304");
        imageElement.setAttribute("height", "228");
        imageElement.setAttribute("alt", "pokemon picture");

        //append the dynnamic elements to modal
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add("is-visible");

      }    
      ////////////////////////////////////////////////////////////////

      ///////// HIDING MODAL ////////////////////////////////////////
      function hideModal() {
        let modalContainer = document.querySelector("#modal-container");
        modalContainer.classList.remove("is-visible");
      }

      modalContainer.addEventListener("click", (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });

      window.addEventListener("keydown", (e) => {
        let modalContainer = document.querySelector("#modal-container");
        if (
          e.key === "Escape" &&
          modalContainer.classList.contains("is-visible")
        ) {
          hideModal();
        }
      });
      //////////////////////////////////////////////////////////////////

    }

    return {
        add,
        getAll,
        addListItem,
        loadList,
        loadDetails,
        showDetails
    };

})();


/* FOR loop function
// iterates over every pokemon
for (let i=0; i<pokemonList.length; i++) {
    document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) `);
    
    // highlights the special pokemon (taller than 1)
    if (pokemonList[i].height>1) {
        document.write (' - Wow, that\'s big! ')
    }

    document.write('</br>') 
}*/


// forEach method that iterates through the pokemonList array
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });


  

    
