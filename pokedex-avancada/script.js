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

    //console.log(evolution.chain);
    evolutionRender(evolution.chain);
}

async function evolutionRender(current) {
   
    let counter = 0;
    document.getElementById('evo').innerHTML = '';

    const stages = [];
    let level = [current];

    //PERCORRE ESTÁGIOS (1/2/3)
    while (level.length > 0){
        const next = [];
        
        //GUARDA NOMES DE CADA ESTAGIO
        stages.push(level.map(level => level.species.name));
        
        
        for (const node of level){
            //PROXIMO SERA A EVOLUCAO DO NIVEL ATUAL
            next.push(...node.evolves_to);
        }
        
        //RECEBE PRÓXIMO ESTÁGIO
        level = next;

    }
    
    
    for (const stage of stages){
        counter++;
        for(const i of stage) {
            const resp_stage = await fetch('https://pokeapi.co/api/v2/pokemon/' + i);
            const stageJSON = await resp_stage.json();
            
            const container = document.createElement('div');
            container.className = 'estagio';

            document.getElementById('evo').appendChild(container);
            
            container.innerHTML = 
            `
                <p>${i}</p>
                <img src="${stageJSON.sprites.front_default}" alt="${i}">
                <p><strong>Estágio ${counter}</strong></p>
            `;
    }}
}


