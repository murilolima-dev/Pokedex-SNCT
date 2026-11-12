const campo = document.getElementById("campo");
const botao = document.getElementById("botao");
const resultado = document.getElementById("resultado");

botao.onclick = buscarPokemon;

async function buscarPokemon() {
    const busca = campo.value;
    const url = "https://pokeapi.co/api/v2/pokemon/" + busca;

    const resposta = await fetch(url);
    
    if (!resposta.ok) {
        resultado.innerHTML = '<p class="erro">Pokémon  não encontrado.</p>';    
        return;
    } 

    const dados = await resposta.json();

    resultado.innerHTML  = 
    `<div class="pokemon">
        <img src ="${dados.sprites.front_default}" alt="${dados.name}">
        <p>#${dados.id}</p>
        <h2>${dados.name}</h2>
        <h2 class="pesoAltura">Peso: ${dados.weight / 10} kg</h2>
<h2 class="pesoAltura">Altura: ${dados.height / 10} m</h2>
    </div>`;

    
    
}