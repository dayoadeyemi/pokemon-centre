"use strict";
const React = require('react');
const ReactDOM = require('react-dom');
const Long = require("long");
const Griddle = require('griddle-react');
const R = require('ramda');
const pokemonNameById = require('./pokemon.json');
const moves = R.reduce((memo, move) => R.assoc(move.id, move, memo), {}, require('./moves.json'));

function getPokemonProperty(pokemon, property){
    if (pokemonNameById[pokemon.pokemon_id]) return pokemonNameById[pokemon.pokemon_id][property]
}

console.log(moves)
function getMoveNameById(move_id){
    if (moves[move_id]) return moves[move_id].name
}

fetch('/inventory')
.then(response => response.json())
.then(inventory => {
    inventory.pokemon.filter(R.prop('cp'))
    inventory.pokemon.forEach(pokemon => {
        pokemon.id = new Long(pokemon.id.low, pokemon.id.high, pokemon.id.unsigned)
        pokemon.name = getPokemonProperty(pokemon, 'name')
        pokemon.type = getPokemonProperty(pokemon, 'type')
        pokemon.move_1 = getMoveNameById(pokemon.move_1);
        pokemon.move_2 = getMoveNameById(pokemon.move_2);
    })
    return inventory.pokemon;
})
.then(R.filter(_ => !!_.cp))
.then(R.project([
    'name',
    'type',
    'pokemon_id',
    'name',
    'cp',
    'stamina',
    'stamina_max',
    'move_1',
    'move_2',
    'nickname',
    // 'height_m',
    // 'weight_kg',
    'individual_attack',
    'individual_defense',
    'individual_stamina',
    'cp_multiplier',
    'battles_attacked',
    'num_upgrades',
    'favorite',
    // 'additional_cp_multiplier'
]))
.then(renderGrid)

function renderGrid(data){ 
    ReactDOM.render(
    <Griddle results={data} showFilter={true} resultsPerPage='350' initialSort='cp' initialSortAscending='false'/>,
    document.getElementById('app')
    );
}
