async function chamarAPI(){
    const nome = document.getElementById('pokemon').value;
    const resp = await fetch('https://pokeapi.co/api/v2/pokemon/' + nome);
    if(!resp.ok){                       
        alert("Inválido");
        return;
    }
    const pokemon = await resp.json();

    document.getElementById('cartao').innerHTML =
    `<img src="${pokemon.sprites.front_default}" alt="">
    <h2>ID: ${pokemon.id} | Nome: ${pokemon.name} </h2>
    <p><strong>Altuta:</strong> ${pokemon.height} <strong>Tipo:</strong> ${pokemon.types[0].type.name}</p>`;
    }


