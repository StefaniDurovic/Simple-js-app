// IIFE
let  pokemonRepository = (function() {

   let pokemonList = [   
        {name:'Pidgeotto', height:'1', types:['flying','normal']},
        {name:'Venomoth', height:'1.5', types:['bug','poison']},
        {name:'Sandshrew', height:'0.6', types:['ground']}
    ];

    function add(pokemon) {
        if (typeof pokemon === {}) {
            pokemonList.push(pokemon);
        } else {
            alert('The Pokemon must be defined as and object.');
        }
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

    button.addEventListener('click', showDetails(pokemon));
}

function showDetails(pokemon) {
    console.log(pokemon);
} 

    return {
        add,
        getAll,
        addListItem
    };

})();

/* for loop function
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



    
