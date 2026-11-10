const campo = document.getElementById("campo");
const botao = document.getElementById("botao");
const resultado = document.getElementById("resultado");

botao.addEventListener("click", buscarPokemon);

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
    </div>`;
    
}