async function chamarAPI(){
    const nome = document.getElementById('pokemon').value;
    const resp = await fetch('https://pokeapi.co/api/v2/pokemon/' + nome);
    

    if(!resp.ok){                       
        alert("Inválido");
        return;
    }
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
    `<p><strong>Tipo:</strong> ${pokemon.types[0].type.name}</p>
    <p><strong>Altura:</strong> ${pokemon.height/10}m</p>
    <p><strong>Peso:</strong> ${pokemon.weight/10}kg</p>`;

//três estágios
    if(evolution.chain.evolves_to[0] != null && evolution.chain.evolves_to[0].evolves_to[0] != null){

        const resp_stage1 = await fetch('https://pokeapi.co/api/v2/pokemon/' + evolution.chain.species.name);
        const stage1 = await resp_stage1.json();

        const resp_stage2 = await fetch('https://pokeapi.co/api/v2/pokemon/' + evolution.chain.evolves_to[0].species.name);
        const stage2 = await resp_stage2.json();

        const resp_stage3 = await fetch('https://pokeapi.co/api/v2/pokemon/' + evolution.chain.evolves_to[0].evolves_to[0].species.name);
        const stage3 = await resp_stage3.json();

        document.getElementById('estagio1').innerHTML = 
        `<p>${evolution.chain.species.name}</p>
        <img src="${stage1.sprites.front_default}" alt="">
        <p><strong>Estágio 1</strong>`;

        document.getElementById('estagio2').innerHTML = 
        `<p>${evolution.chain.evolves_to[0].species.name}</p>
        <img src="${stage2.sprites.front_default}" alt="">
        <p><strong>Estágio 2</strong>`;

        document.getElementById('estagio3').innerHTML = 
        `<p>${evolution.chain.evolves_to[0].evolves_to[0].species.name}</p>
        <img src="${stage3.sprites.front_default}" alt="">
        <p><strong>Estágio 3</strong>`; 
    }

//dois estágios
    else if(evolution.chain.evolves_to[0] != null && evolution.chain.evolves_to[0].evolves_to[0] == null){

        const resp_stage1 = await fetch('https://pokeapi.co/api/v2/pokemon/' + evolution.chain.species.name);
        const stage1 = await resp_stage1.json();

        const resp_stage2 = await fetch('https://pokeapi.co/api/v2/pokemon/' + evolution.chain.evolves_to[0].species.name);
        const stage2 = await resp_stage2.json();

        document.getElementById('estagio1').innerHTML = 
        `<p>${evolution.chain.species.name}</p>
        <img src="${stage1.sprites.front_default}" alt="">
        <p><strong>Estágio 1</strong>`;

        document.getElementById('estagio2').innerHTML = 
        `<p>${evolution.chain.evolves_to[0].species.name}</p>
        <img src="${stage2.sprites.front_default}" alt="">
        <p><strong>Estágio 2</strong>`;

        document.getElementById('estagio3').innerHTML = 
        `<p>Não possui</p>`; 
    }

//um estágio
    else if(evolution.chain.evolves_to[0] == null){
        const resp_stage1 = await fetch('https://pokeapi.co/api/v2/pokemon/' + evolution.chain.species.name);
        const stage1 = await resp_stage1.json();

        document.getElementById('estagio1').innerHTML = 
        `<p>${evolution.chain.species.name}</p>
        <img src="${stage1.sprites.front_default}" alt="">
        <p><strong>Estágio 1</strong>`;

        document.getElementById('estagio2').innerHTML = 
        `<p>Não possui</p>`;

        document.getElementById('estagio3').innerHTML = 
        `<p>Não possui</p>`; 
    }
}


