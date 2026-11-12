/*
  ============================================================
  ROTEIRO DE AULA | PARTE 3: JAVASCRIPT (arquivo só para o professor)
  FALE: "Agora a parte principal. O JS é o cérebro: pega o que a
  pessoa digitou, faz o pedido à API e mostra a resposta."
  ANALOGIA: restaurante. fetch = garçom | await = esperar o prato |
  .json() = abrir a marmita | innerHTML = servir na mesa
  ============================================================
*/


// ---------- 3.1 CONECTANDO ÀS PEÇAS ----------
// FALE: "document é a página inteira. getElementById é: procure aí o
// elemento com este id. São aqueles nomes que demos no HTML. O const é
// uma CAIXINHA COM NOME onde guardamos o que achamos. Agora campo é o
// input, botao é o botão e resultado é a mesa vazia."
// CUIDADO: erro 'Cannot read properties of null' = o JS não achou algum
// id (escrito diferente do HTML, ou <script> fora do final do body).
const campo = document.getElementById("campo");
const botao = document.getElementById("botao");
const resultado = document.getElementById("resultado");


// ---------- 3.2 LIGANDO O CLIQUE ----------
// FALE: "Dizemos: quando clicarem no botão, execute a função
// buscarPokemon. Reparem: NÃO TEM PARÊNTESES. Estamos ENTREGANDO a
// função para o botão guardar, não mandando executar agora. Com
// parênteses, ela rodaria na hora em que a página abre."
botao.onclick = buscarPokemon;


// ---------- 3.3 A FUNÇÃO E O ASYNC ----------
// FALE: "function cria um bloco de código com nome, para executar
// quando quisermos. E o async é um AVISO NA PORTA: aqui dentro vamos
// precisar ESPERAR coisas. Por quê? Porque a resposta da API não chega
// na hora. É como o restaurante: o prato demora um pouco."
// CUIDADO: o await SÓ funciona dentro de função async. Se esquecerem o
// async, dá erro.
async function buscarPokemon() {

    // ---------- 3.4 MONTANDO O PEDIDO ----------
    // FALE: "campo.value é O QUE A PESSOA DIGITOU. Na segunda linha, o
    // + JUNTA os textos: o endereço da API mais o nome digitado. Se
    // digitaram pikachu, a url vira exatamente aquele endereço que
    // abrimos no navegador no início. O nosso código está ESCREVENDO O
    // PEDIDO."
    const busca = campo.value;
    const url = "https://pokeapi.co/api/v2/pokemon/" + busca;


    // ---------- 3.5 FAZENDO O PEDIDO: FETCH E AWAIT (PARTE MAIS IMPORTANTE) ----------
    // FALE: "O fetch é o GARÇOM: leva o nosso pedido até o servidor. E o
    // await quer dizer: ESPERE AQUI ATÉ O PRATO CHEGAR. Sem o await, o
    // código não espera: segue em frente e tenta usar um prato que ainda
    // nem saiu da cozinha. É quem pede a comida e, em vez de esperar
    // sentado, já tenta comer. Com o await, o código fica sentado, o
    // prato chega, e só então segue para a próxima linha."
    //
    // SE PERGUNTAREM 'E sem o await?': "Ele não guarda a resposta, guarda
    // uma PROMESSA de resposta (uma Promise). É a SENHA DA LANCHONETE: não
    // é o lanche, só diz que o lanche vai chegar. O await troca a senha
    // pelo lanche de verdade."
    //
    // MOSTRAR AO VIVO: tirar o await e abrir o console (F12). Aparece
    // 'resposta.json is not a function'. Era uma senha, não o prato.
    // Colocar o await de volta.
    const resposta = await fetch(url);


    // ---------- 3.6 VERIFICANDO SE DEU CERTO ----------
    // FALE: "O garçom voltou, mas pode trazer duas notícias: 'aqui está
    // o prato' ou 'esse prato não existe'. A propriedade ok diz se DEU
    // CERTO (true) ou deu erro (false). O ! na frente INVERTE: lemos
    // 'se NÃO deu certo'. Se não deu certo, mostramos a mensagem na mesa
    // vazia (a caixa rosada que já deixamos pronta no CSS). E o return
    // ENCERRA A FUNÇÃO AQUI: o resto não roda, porque não adianta servir
    // um prato que não existe."
    //
    // FALE (detalhe curioso): "O fetch NÃO reclama quando o servidor diz
    // 404. Para ele, o garçom cumpriu o trabalho: voltou com uma
    // resposta. Quem decide o que fazer somos nós. Por isso a checagem."
    //
    // CUIDADO: esquecer o ! ou escrever resposta.false em vez de
    // resposta.ok. Nenhum dá aviso: a mensagem de erro aparece sempre.
    if (!resposta.ok) {
        resultado.innerHTML = '<p class="erro">Pokémon não encontrado.</p>';
        return;
    }


    // ---------- 3.7 ABRINDO A EMBALAGEM ----------
    // FALE: "O prato chegou, mas EMBALADO, como uma marmita fechada. O
    // .json() abre a marmita e transforma o conteúdo em algo que o
    // JavaScript entende: um objeto com nome, id, imagem. Também precisa
    // de await, porque abrir a marmita leva um instante."
    //
    // DICA: colocar console.log(dados) logo abaixo, abrir o console (F12),
    // buscar pikachu e expandir o objeto: mostrar name, id e sprites.
    // FALE: "São os mesmos dados que vimos no navegador, agora dentro do
    // nosso código. É por esse caminho que pegamos o que precisamos."
    const dados = await resposta.json();


    // ---------- 3.8 SERVINDO NA MESA: INNERHTML E TEMPLATE STRING ----------
    // FALE: "Vamos servir o prato. O innerHTML COLOCA HTML DENTRO DE UM
    // ELEMENTO: estamos colocando este bloco na mesa vazia, a div
    // resultado. Reparem nesses acentos diferentes, as CRASES. Com elas o
    // texto pode ocupar várias linhas e aceita FURINHOS no formato
    // ${...}, onde entram os dados."
    //
    // FALE (cada furinho):
    //  - dados.sprites.front_default = o CAMINHO até a imagem: entra em
    //    dados, depois em sprites, depois em front_default (o mesmo
    //    caminho que vimos no console).
    //  - dados.name = o nome | dados.id = o número do Pokémon.
    //  - class="pokemon" = a etiqueta que deixa a imagem com 120px (CSS).
    // FALE: "O innerHTML SUBSTITUI tudo o que estava na mesa. Por isso,
    // ao buscar outro Pokémon, o anterior some."
    //
    // CUIDADO:
    //  - errar o nome de um campo (dados.nome em vez de dados.name) NÃO
    //    dá erro: aparece 'undefined' na tela. Conferir com console.log.
    //  - innerHTMl ou scr em vez de src: também não dá erro, nada acontece.
    //  - aparece o texto ${dados.name} literal na tela = usaram aspas
    //    normais em vez de crases.
    resultado.innerHTML =
    `<div class="pokemon">
        <img src="${dados.sprites.front_default}" alt="${dados.name}">
        <p>#${dados.id}</p>
        <h2>${dados.name}</h2>
    </div>`;
}


/*
  ============================================================
  TESTE FINAL: pikachu, 25 e abcxyz (deve aparecer a caixa de erro).
  FALE: "Vocês criaram um programa que CONVERSA COM A INTERNET. O código
  pediu, esperou, conferiu e mostrou."
  CUIDADO: PIKACHU em maiúsculas dá 'não encontrado' (a API só aceita
  minúsculas). Dizer que tratar isso é um próximo passo.
  ============================================================

  ============================================================
  DESAFIO: PESO E ALTURA (a turma faz; o professor guia)
  Enunciado: "Mostrem também o peso e a altura do Pokémon no card."
  Dicas, aos poucos:
    1. Achar no JSON (console) os campos de peso e altura.
    2. Estão em inglês: weight e height. Qual é qual?
    3. Seguir o modelo do ${dados.name} e usar a classe pesoAltura
       (já está pronta no CSS).

  SOLUÇÃO (acrescentar dentro do template, depois do <h2> do nome):

        <h2 class="pesoAltura">Peso: ${dados.weight / 10} kg</h2>
        <h2 class="pesoAltura">Altura: ${dados.height / 10} m</h2>

  FALE (momento de aprendizado): "O Pikachu pesa 6 kg e mede 0,4 metro.
  Se não dividirmos, aparece 60 e 4. A API manda o peso em HECTOGRAMAS e
  a altura em DECÍMETROS, unidades pequenas. Por isso dividimos por 10.
  Lição: a API pode entregar os dados num formato que precisa ser
  convertido antes de mostrar. A documentação diz a unidade de cada campo."
  CUIDADO: weight e height trocados é o erro mais provável, e não dá
  aviso. Teste com o Pikachu: se aparecer 4 de peso, estão trocados.
  ============================================================

  FECHAMENTO:
  "O usuário digita, o código monta o endereço, o fetch faz o pedido, o
  await espera, conferimos se deu certo, abrimos a marmita com .json() e
  servimos o prato com o innerHTML. Esse caminho funciona para QUALQUER
  API do mundo: muda o endereço e os campos, mas a lógica é a mesma."
*/
