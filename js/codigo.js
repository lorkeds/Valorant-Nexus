/*Função que comunica com a API pra buscar os dados*/

async function getAgente() {
  const agenteNome = document.getElementById('agenteNome').value.trim();
  if (!agenteNome) {
    alert('Por favor, insira o nome do agente.');
    return;
  }

  const response = await fetch('https://valorant-api.com/v1/agents?language=pt-BR');
  if (!response.ok) {
    alert('Erro na requisição da API');
    return;
  }
  const dados = await response.json();

  /*Filtra os dados buscados para apenas o do agente digitado*/

  const agente = dados.data.find(agente =>
    agente.displayName.toLowerCase() == agenteNome.toLowerCase()
  );

  console.log(agente);

  /*Criação do HTML de acordo com a informações que foram requisitadas*/

  let agenteInfo = document.getElementById("agenteInfo");
  let agenteImagem = document.getElementById("agenteImagem");

  // Reseta as informações caso outra pesquisa de personagem seja feita

  agenteInfo.innerHTML = "";
  agenteImagem.innerHTML = "";
  let h2 = document.createElement("h2");
  h2.textContent = agente.displayName;
  agenteInfo.appendChild(h2);

  let p1 = document.createElement("p");
  p1.textContent = agente.description;
  agenteInfo.appendChild(p1);

  let h5 = document.createElement("h5");
  h5.innerHTML = agente.role.displayName;
  h5.innerHTML = "<hr>" + h5.innerHTML;

  agenteInfo.appendChild(h5);

  let p2 = document.createElement("p");
  p2.textContent = agente.role.description;
  agenteInfo.appendChild(p2);

  let img = document.createElement("img");
  img.src = agente.fullPortrait;
  img.alt = agente.displayName;
  img.style.maxWidth = "500px";
  img.style.height = "auto";
  agenteImagem.appendChild(img);

  // Adiciona as habilidades do agente ao HTML

  let habilidades = document.getElementById("habilidades");
  let imgHabilidade = document.getElementById("imgHabilidade");
  let tituloHabilidades = document.getElementById("tituloHabilidades");
  // Reseta as informações caso outra pesquisa de personagem seja feita
  habilidades.innerHTML = "";
  imgHabilidade.innerHTML = "";
  tituloHabilidades.innerHTML = "<h3>Habilidades</h3><hr>";


  agente.abilities.forEach((ability) => {
    // Mostra o texto da habilidade
    let divhab = document.createElement("div");
    divhab.className = "ability-text mb-3";

    let nomeHab = document.createElement("h4");
    nomeHab.textContent = ability.displayName;
    divhab.appendChild(nomeHab);

    let infohab = document.createElement("p");
    infohab.textContent = ability.description;
    divhab.appendChild(infohab);

    habilidades.appendChild(divhab);


    // Mostra a imagem da habilidade
    let habImgDiv = document.createElement("div");
    habImgDiv.className = "ability-img mb-3";


    let habImg = document.createElement("img");
    habImg.src = ability.displayIcon;
    habImg.alt = ability.displayName;
    habImg.style.maxWidth = "150px";
    habImg.style.height = "auto";
    habImgDiv.appendChild(habImg);

    imgHabilidade.appendChild(habImgDiv);


  });


}

//Função que comunica com a API pra buscar os dados da arma//

async function getArma() {
  const armaNome = document.getElementById('armaNome').value.trim();
  if (!armaNome) {
    alert('Por favor, insira o nome da arma.');
    return;
  }

  const response = await fetch('https://valorant-api.com/v1/weapons?language=pt-BR');
  if (!response.ok) {
    alert('Erro na requisição da API');
    return;
  }
  const dados = await response.json();

  //Filtra os dados buscados para apenas o da arma digitada//

  const arma = dados.data.find(arma =>
    arma.displayName.toLowerCase() == armaNome.toLowerCase());

  console.log(arma);

  //Criação do HTML de acordo com a informações que foram requisitadas/

  let armaInfo = document.getElementById("armaInfo");
  let armaImagem = document.getElementById("armaImagem");
  // Reseta as informações caso outra pesquisa de personagem seja feita
  armaInfo.innerHTML = "";
  armaImagem.innerHTML = "";
  let h2 = document.createElement("h2");
  h2.textContent = "Especificações da " + arma.displayName;
  armaInfo.appendChild(h2);

  let h5 = document.createElement("h5");
  h5.innerHTML = "<hr>" + h5.innerHTML;
  armaInfo.appendChild(h5);


// Adiciona as especificações da arma ao HTML
  let p1 = document.createElement("p");
  p1.textContent = "Categoria: " + arma.shopData.categoryText + ".";
  armaInfo.appendChild(p1);
  let p2 = document.createElement("p");
  p2.textContent = arma.weaponStats.fireRate + " tiros por segundo.";
  armaInfo.appendChild(p2);
  let p3 = document.createElement("p");
  p3.textContent = "Capacidade do pente: " + arma.weaponStats.magazineSize + " balas.";
  armaInfo.appendChild(p3);
  let p4 = document.createElement("p");
  p4.textContent = "Dano por tiro: " + arma.weaponStats.damageRanges[0].headDamage + " na cabeça, " + arma.weaponStats.damageRanges[0].bodyDamage + " no corpo e " + arma.weaponStats.damageRanges[0].legDamage + " nas pernas.";
  armaInfo.appendChild(p4);
  let p5 = document.createElement("p");
  p5.textContent = "Preço: " + arma.shopData.cost + " créditos.";
  armaInfo.appendChild(p5);
  let p6 = document.createElement("p");
  p6.textContent = "Tipo de arma: " + arma.shopData.categoryText + ".";
  armaInfo.appendChild(p6);
  let p7 = document.createElement("p");
  p7.textContent = "Tempo de recarga: " + arma.weaponStats.reloadTimeSeconds + " segundos.";
  armaInfo.appendChild(p7);





  let img = document.createElement("img");
  img.src = arma.displayIcon;
  img.alt = arma.displayName;
  img.style.maxWidth = "500px";
  img.style.height = "auto";
  armaImagem.appendChild(img);

}

// Carrega os comentários ao abrir a página
window.onload = function () {
  carregarComentarios();
};

function publicarComentario() {
  const nome = document.getElementById("nomeComentario").value.trim();
  const comentario = document.getElementById("comentario").value.trim();

  if (!nome || !comentario) {
    alert("Preencha seu nome e seu comentário!");
    return;
  }

  // Recupera comentários já salvos
  const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

  // Adiciona o novo comentário no topo da lista
  comentarios.unshift({
    nome: nome,
    texto: comentario,
    data: new Date().toISOString()
  });

  // Salva de volta no localStorage
  localStorage.setItem("comentarios", JSON.stringify(comentarios));

  // Atualiza lista na tela
  renderizarComentarios(comentarios);

  // Limpa campo
  document.getElementById("comentario").value = "";
}

function carregarComentarios() {
  const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
  renderizarComentarios(comentarios);
}

function renderizarComentarios(lista) {
  const container = document.getElementById("listaComentarios");
  if (!container) return; // impede de rodar em outras páginas

  container.innerHTML = ""; // limpa somente esse container

  lista.forEach(c => {
    const div = document.createElement("div");
    div.classList.add("comentario-item", "p-3", "mb-3", "shadow-sm");
    div.style.background = "rgba(50, 50, 50, 0.7)";
    div.style.borderRadius = "10px";

    div.innerHTML = `
            <strong>${c.nome}</strong><br>
            <span>${c.texto}</span>
        `;

    container.appendChild(div);
  });
}

/*Navegação entre páginas*/

function irHome() {
  console.log("ME AJUDA")
  location.href = "index.html";
}

function irAgentes() {
  console.log("ME AJUDA")
  location.href = "agentes.html";
}

function irArmas() {
  console.log("ME AJUDA")
  location.href = "armas.html";
}
function irComentarios() {
  location.href = "comentarios.html";
}
