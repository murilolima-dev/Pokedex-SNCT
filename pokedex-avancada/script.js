const campoInput = document.getElementById('pokemon');

campoInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        chamarAPI();
    }});

async function chamarAPI(){
    const nome = campoInput.value;
    const resp = await fetch('https://pokeapi.co/api/v2/pokemon/' + nome);

    
    if(!resp.ok){                       
        document.getElementById('erro').innerHTML = "Pokemon não encontrado!";
        document.getElementById('erro').style.visibility = "visible";
        return;
    }
    
    document.getElementById('erro').style.visibility = "";

    const pokemon = await resp.json();

    const resp_specie = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + nome);
    const specie = await resp_specie.json();

    const resp_evo = await fetch(specie.evolution_chain.url);
    const evolution = await resp_evo.json();

    document.getElementById('imagem').innerHTML =
    `<img src="${pokemon.sprites.front_default}" alt="">`;

    document.getElementById('nome').innerHTML =
    `<h2>ID: ${pokemon.id} | Nome: ${pokemon.name}</h2>`;

    document.getElementById('infos').innerHTML =
    `<p><strong>Tipo:</strong> ${pokemon.types.map(el => {
        return el.type.name
    }).join(', ')}</p>
    <p><strong>Altura:</strong> ${pokemon.height/10}m</p>
    <p><strong>Peso:</strong> ${pokemon.weight/10}kg</p>`;

    console.log(evolution.chain);
    evolutionRender(evolution.chain);
}

async function evolutionRender(current) {
   
    //let counter = 1;
    document.getElementById('evo').innerHTML = '';

    let level = [current];
    const stages = [];

    while (level.length > 0){
        
        const next = [];
        for (const node of level){
            stages.push(node.species.name);
            next.push(node.evolves_to)
        }
        level = [next];
    } 
    
    console.log(stages);

    /*
    while (current){
        const resp_stage = await fetch('https://pokeapi.co/api/v2/pokemon/' + current.species.name)
        const stage = await resp_stage.json();

        const container = document.createElement('div');
        container.className = 'estagio';
        
        document.getElementById('evo').appendChild(container);


        container.innerHTML = 
        `
            <p>${current.species.name}</p>
            <img src="${stage.sprites.front_default}" alt="${current.species.name}">
            <p><strong>Estágio ${counter}</strong></p>
        `;

        current = current.evolves_to[0];
        counter ++;
    }*/
}


