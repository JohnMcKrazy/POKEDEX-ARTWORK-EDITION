//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!pruebas
const divImg = document.querySelector('.pokeImg');
const newImg = document.createElement('img');
const pokeId = document.querySelector('.pokeId');
const pokeName = document.querySelector('.pokeName');
const pokeType = document.querySelector('.pokeType');
const pokeHeight = document.querySelector('.pokeHeight');
const pokeWeight = document.querySelector('.pokeWeight');
const pokeFlavor = document.querySelector('.pokeFlavor');
const btnPrevious = document.querySelector('.btn_previous');
const btnNext = document.querySelector('.btn_next');
const pokeIdSerch = document.querySelector('.pokeId_serch');

const pokeNameSerch = document.querySelector('.pokeName_serch');
const btnSerch = document.querySelector('.btnSerch');

const alertDisplay = document.querySelector('.alert_container');

const alertDisplayTitle = document.querySelector('.alert_display_title');
const alertDisplayText = document.querySelector('.alert_display_text');
const alertBtn = document.querySelector('#alert_btn');
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const pokemonSerch = [];
let myCurrentPokemon = 1;
const backgroundChange = {
    ghost: 'linear-gradient(darkgray, darkslateblue, black)',
    fire: 'linear-gradient(yellow, crimson, black)',
    water: 'linear-gradient(skyblue,darkblue, black )',
    ground: 'linear-gradient(saddlebrown, black)',
    rock: 'linear-gradient(saddlebrown,  black)',
    grass: 'linear-gradient( lightgreen, darkgreen, black)',
    bug: 'linear-gradient(yellow,hsl(130, 70%, 15%), black)',
    normal: 'linear-gradient(lightgray, black)',
    psychic: 'linear-gradient( yellow, darkslateblue)',
    poison: 'linear-gradient(black, darkslateblue)',
    fighting: 'linear-gradient(black, crimson)',
    electric: 'linear-gradient( yellow, orange, black)',
    dark: 'linear-gradient( black, darkgray)',
    fairy: 'linear-gradient( pink, darkslateblue, black)',
    ice: 'linear-gradient( skyblue, deepskyblue, black)',
    flying: 'linear-gradient( skyblue, saddlebrown)',
    dragon: 'linear-gradient(black, crimson, yellow)',
    steel: 'linear-gradient(135deg, darkgray, black, lightgray, gray, black, gray, darkgray)',
};

const next = () => {
    if (myCurrentPokemon !== 898) {
        myCurrentPokemon++;
        catchEmAll(myCurrentPokemon);
    } else if (myCurrentPokemon === 898) {
        myCurrentPokemon = 1;
        catchEmAll(myCurrentPokemon);
    }
};

const previous = () => {
    if (myCurrentPokemon !== 1) {
        myCurrentPokemon--;
        catchEmAll(myCurrentPokemon);
    } else if (myCurrentPokemon === 1) {
        myCurrentPokemon = 898;
        catchEmAll(myCurrentPokemon);
    }
};

const serchFunction = (e) => {
    e.preventDefault();
    console.log(pokeIdSerch.value);
    console.log(pokeNameSerch.value);
    let myName = pokeNameSerch.value.toLowerCase();
    if (pokeNameSerch.value === '' && pokeIdSerch.value === '') {
        prompt('You need to introduce for a proper serch');
    } else if (pokeIdSerch.value === '') {
        let valueName = myName;
        myCurrentPokemon = valueName;
    } else if (pokeNameSerch.value === '') {
        let valueId = pokeIdSerch.value;
        myCurrentPokemon = valueId;
    }

    catchEmAll(myCurrentPokemon);

    pokeIdSerch.value = '';
    pokeNameSerch.value = '';
    console.log(myCurrentPokemon);
};
const showAlert = () => {
    alertDisplay.animate([{ opacity: '1' }, { opacity: '0' }], {
        duration: 500,
        fill: 'forwards',
    });
    setTimeout(closeDisplayAlert, 1000);
    function closeDisplayAlert() {
        alertDisplay.style.display = 'none';
    }
};
const catchEmAll = (id) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((raw) => raw.json())
        .then((data) => {
            myCurrentPokemon = data.id;
            pokemonSerch.push(myCurrentPokemon);
            console.log(pokemonSerch);
            console.log(data);
            console.log(data.name);
            console.log(data.id);
            console.log(data.height + 'ft');
            console.log(data.weight + 'lb');
            console.log(data.types[0].type.name);
            console.log(data.sprites);
            console.log(data.types);
            console.log(data.sprites.other['official-artwork']['front_default']);
            let artworkImg = data.sprites.other['official-artwork']['front_default'];
            let firstType = data.types[0].type.name;
            divImg.appendChild(newImg);
            newImg.setAttribute('src', artworkImg);
            divImg.style.background = backgroundChange[firstType];
            pokeId.innerText = data.id;
            pokeName.innerText = data.name;
            if (data.types.length > 1) {
                pokeType.innerText = data.types[0].type.name + '/' + data.types[1].type.name;
            } else {
                pokeType.innerText = data.types[0].type.name;
            }
            pokeHeight.innerText = data.height + 'ft';
            pokeWeight.innerText = data.weight + 'lb';

            console.log(data);
        })
        .catch((err) => {
            let pokeSerchLength = pokemonSerch.length;
            myCurrentPokemon = pokemonSerch[pokeSerchLength - 1];
            console.log(err);
        });

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then((rawSpecies) => rawSpecies.json())
        .then((dataSpecies) => {
            console.log(dataSpecies);
            console.log(dataSpecies['flavor_text_entries']);
            console.log(dataSpecies['flavor_text_entries'][1]);
            console.log(dataSpecies['flavor_text_entries'][1]['flavor_text']);

            let myFirstFlavor = dataSpecies['flavor_text_entries'][1]['flavor_text'].split('\n');
            let textFirstFlavor = myFirstFlavor.join(' ');
            let myFlavor = textFirstFlavor.split('');
            let textFlavor = myFlavor.join(' ');
            console.log(textFlavor);

            pokeFlavor.innerText = textFlavor;
        })
        .catch((err) => {
            alertDisplay.style.display = 'block';
            alertDisplay.style.opacity = 0;
            alertDisplay.animate([{ opacity: '0' }, { opacity: '1' }], {
                duration: 500,
                fill: 'forwards',
            });
            let pokeSerchLength = pokemonSerch.length;
            myCurrentPokemon = pokemonSerch[pokeSerchLength - 1];
            console.log(err);
        });
};
catchEmAll(myCurrentPokemon);

btnNext.addEventListener('click', next);
btnPrevious.addEventListener('click', previous);
btnSerch.addEventListener('click', serchFunction);
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

alertBtn.addEventListener('click', showAlert);
