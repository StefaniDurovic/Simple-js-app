// array of objects
let  pokemonList = [
        {name:'Pidgeotto', height:'1', types:['flying','normal']},
        {name:'Venomoth', height:'1.5', types:['bug','poison']},
        {name:'Sandshrew', height:'0.6', types:['ground']}
];

// iterates over every pokemon
for (let i=0; i<pokemonList.length; i++) {
    document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) `);
    
    // highlights the special pokemon (taller than 1)
    if (pokemonList[i].height>1) {
        document.write (' - Wow, that\'s big! ')
    }
}