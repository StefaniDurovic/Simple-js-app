// array of objects
let  pokemonList = [
        {name:'Pidgeotto', height:'1', types:['flying','normal']},
        {name:'Venomoth', height:'1.5', types:['bug','poison']},
        {name:'Sandshrew', height:'0.6', types:['ground']}
];

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
pokemonList.forEach(function(pokemon) {
    document.write(`${pokemon.name} (height: ${pokemon.height}) `);
    
    // highlights the special pokemon (taller than 1)
    if (pokemon.height>1) {
        document.write(' - Wow, that\'s big! ');
    }

    document.write('</br>');
});



    
