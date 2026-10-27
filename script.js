/* ====================================================================
   ÍNDICE DESTE ARQUIVO
   1. CONFIG ........... nome, WhatsApp, Instagram e LOGO (mude aqui!)
   2. OBJETIVOS ........ lista de objetivos, dicas e ordem dos cartões
   3. DADOS DO CLIENTE . onde guardamos o que a pessoa digitou
   4. FUNÇÕES AUXILIARES
   5. LOGO E RODAPÉ
   6. NAVEGAÇÃO ENTRE TELAS
   7. TELA 1: OBJETIVO
   8. TELA 2: DADOS PESSOAIS
   9. TELA 3: MEDIDAS
   10. CÁLCULOS (gordura, IMC, calorias...)
   11. TELA 4: RESULTADO
   12. BOTÃO DO WHATSAPP
   13. INICIAR O SITE
   ==================================================================== */


/* ====================================================================
   1. CONFIG  <<< AQUI VOCÊ TROCA LOGO, NOME E CONTATOS >>>
   ==================================================================== */
const CONFIG = {
  nomeDaMarca: "Academia Músculos e Forma",

  // Número com código do país + DDD, só números. Ex.: 5583999999999
  numeroWhatsapp: "5583999999999",

  // Link do seu perfil no Instagram
  linkInstagram: "https://instagram.com/seuperfil",

  // Para usar a SUA logo: coloque a imagem na mesma pasta do site e
  // escreva o nome do arquivo aqui. Ex.: "minha-logo.png"
  // Deixe vazio ("") para usar a logo padrão (coração com batimento).
  caminhoDaLogo: "eu.png"
};

// Cores da classificação da gordura (verde = bom, vermelho = atenção)
const CORES_CLASSIFICACAO = {
  muitoBaixo: "#4a90d9",
  atletico: "#1a9e8f",
  saudavel: "#2e9e6b",
  acimaDoIdeal: "#e0902e",
  elevado: "#d0383c"
};

// Tamanho do círculo do medidor (precisa ser igual ao stroke-dasharray do CSS)
const TAMANHO_DO_CIRCULO = 326.7;


/* ====================================================================
   2. OBJETIVOS
   Para CRIAR um objetivo novo, copie um bloco abaixo e mude os valores.
   A tela 1 e o resultado já se adaptam sozinhos.

   - fatorCalorias: 0.8 = come 20% menos / 1 = igual / 1.1 = 10% a mais
   - proteinaPorKg: gramas de proteína por kg de peso
   - ordemDosCartoes: os 2 primeiros ficam em destaque (os mais importantes)
     Cartões disponíveis: imc, pesoIdeal, calorias, gastoDiario,
     proteina, agua, massaMagra, sono
   ==================================================================== */
const OBJETIVOS = {
  emagrecer: {
    emoji: "🔥",
    titulo: "Emagrecer",
    descricao: "Secar com saúde, sem sofrimento",
    fatorCalorias: 0.8,
    proteinaPorKg: 1.6,
    ordemDosCartoes: ["calorias", "pesoIdeal", "imc", "gastoDiario", "proteina", "agua", "massaMagra", "sono"],
    dicas: [
      "Coma até as calorias indicadas, com bastante proteína e legumes.",
      "Treine força 3x por semana e caminhe todo dia. Seu corpo agradece!",
      "Durma bem e beba água: ajuda mais do que você imagina!"
    ]
  },
  ganharMassa: {
    emoji: "💪",
    titulo: "Ganhar massa muscular",
    descricao: "Mais força e mais shape!",
    fatorCalorias: 1.1,
    proteinaPorKg: 1.8,
    ordemDosCartoes: ["proteina", "calorias", "massaMagra", "agua", "gastoDiario", "pesoIdeal", "imc", "sono"],
    dicas: [
      "Coma um pouco acima das calorias e bata a meta de proteína.",
      "Treine força 4x por semana e aumente a carga aos poucos. Foco!",
      "Durma de 7 a 9 horas: é dormindo que o músculo cresce!"
    ]
  },
  manter: {
    emoji: "⚖️",
    titulo: "Manter o peso",
    descricao: "Manter tudo o que você conquistou",
    fatorCalorias: 1,
    proteinaPorKg: 1.2,
    ordemDosCartoes: ["pesoIdeal", "imc", "calorias", "gastoDiario", "agua", "proteina", "massaMagra", "sono"],
    dicas: [
      "Mantenha as calorias perto do seu gasto diário.",
      "Mexa o corpo 150 minutos por semana. Dá pra fazer!",
      "Pese-se 1x por semana pra acompanhar a evolução."
    ]
  },
  saude: {
    emoji: "❤️",
    titulo: "Melhorar a saúde",
    descricao: "Mais energia pro dia a dia",
    fatorCalorias: 1,
    proteinaPorKg: 1.2,
    ordemDosCartoes: ["imc", "pesoIdeal", "agua", "sono", "gastoDiario", "calorias", "proteina", "massaMagra"],
    dicas: [
      "Coma frutas e verduras todo dia e pegue leve no açúcar.",
      "Caminhe 30 minutos, 4x por semana. Comece devagar!",
      "Faça um check-up médico uma vez por ano. Saúde em dia!"
    ]
  },
  outro: {
    emoji: "✨",
    titulo: "Outro",
    descricao: "Conta pra mim o seu sonho",
    fatorCalorias: 1,
    proteinaPorKg: 1.2,
    ordemDosCartoes: ["imc", "pesoIdeal", "calorias", "gastoDiario", "agua", "proteina", "massaMagra", "sono"],
    dicas: [
      "Coma bem, beba água e durma de 7 a 9 horas.",
      "Mexa o corpo pelo menos 30 minutos por dia.",
      "Me chama no WhatsApp e eu monto um plano sob medida pro seu sonho!"
    ]
  }
};

// Nomes curtos que aparecem em cada cartão do resultado
const NOMES_DOS_CARTOES = {
  imc: "IMC", pesoIdeal: "Peso ideal", calorias: "Calorias", gastoDiario: "Gasto por dia",
  proteina: "Proteína", agua: "Água", massaMagra: "Massa magra", sono: "Sono"
};


/* ====================================================================
   3. DADOS DO CLIENTE
   Tudo que a pessoa digita é guardado aqui para usarmos depois.
   ==================================================================== */
const cliente = {
  objetivo: "",        // chave de OBJETIVOS (ex.: "emagrecer")
  comentarioOutro: "", // texto do campo "Outro"
  nome: "",
  sexo: "",            // "Feminino" ou "Masculino"
  idade: 0,
  altura: 0,           // em cm
  peso: 0,             // em kg
  fatorAtividade: 1.2
};

// Guarda os números calculados (usado também na mensagem do WhatsApp)
let resultado = {};


/* ====================================================================
   4. FUNÇÕES AUXILIARES (pequenas ajudas usadas no arquivo todo)
   ==================================================================== */

// Atalho para pegar um elemento da página pelo id
function pegar(id) {
  return document.getElementById(id);
}

// Número com vírgula, como no Brasil. Ex.: formatar(22.456, 1) -> "22,5"
function formatar(numero, casasDecimais) {
  return numero.toFixed(casasDecimais).replace(".", ",");
}

// Arredonda para a dezena mais próxima. Ex.: 1843 -> 1840
function arredondarDezena(numero) {
  return Math.round(numero / 10) * 10;
}

// Diz em que ponto (0 a 100) um valor está entre um mínimo e um máximo
function porcentagemEntre(valor, minimo, maximo) {
  const porcentagem = (valor - minimo) / (maximo - minimo) * 100;
  return Math.max(0, Math.min(100, porcentagem));
}


/* ====================================================================
   5. LOGO E RODAPÉ
   ==================================================================== */

// Coloca a logo no topo (a sua imagem, ou a logo padrão)
function montarLogo() {
  let desenhoDaLogo;

  if (CONFIG.caminhoDaLogo !== "") {
    desenhoDaLogo = `<img src="${CONFIG.caminhoDaLogo}" alt="Logo ${CONFIG.nomeDaMarca}">`;
  } else {
    // Logo padrão: círculo com linha de batimento. Usa a cor principal do CSS.
    desenhoDaLogo = `
      <svg viewBox="0 0 80 80" role="img" aria-label="Logo">
        <circle cx="40" cy="40" r="38" fill="var(--cor-principal)"/>
        <path d="M12 44h16l7-16 10 30 8-22 4 8h11" fill="none" stroke="#fff"
              stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
  }

  pegar("logo").innerHTML = desenhoDaLogo + `<b>${CONFIG.nomeDaMarca}</b>`;
}

// Coloca os links do Instagram e do WhatsApp no rodapé
function montarRodape() {
  pegar("link-instagram").href="https://www.instagram.com/academiamusculoseforma/";
  pegar("link-whatsapp").href = "https://wa.me/55556184606892";
}


/* ====================================================================
   6. NAVEGAÇÃO ENTRE TELAS
   Para ADICIONAR uma tela nova: crie a <section> no index.html e
   coloque o id dela na lista abaixo, na ordem em que deve aparecer.
   (Se adicionar, lembre de colocar mais um <i class="passo"> no HTML.)
   ==================================================================== */
const ORDEM_DAS_TELAS = ["tela-objetivo", "tela-dados", "tela-medidas", "tela-resultado"];

function irParaTela(idDaTela) {
  // Esconde todas as telas e mostra só a escolhida
  ORDEM_DAS_TELAS.forEach(function (id) {
    pegar(id).classList.toggle("escondido", id !== idDaTela);
  });

  // Pinta as bolinhas de progresso até a tela atual
  const numeroDaTela = ORDEM_DAS_TELAS.indexOf(idDaTela);
  document.querySelectorAll(".passo").forEach(function (passo, posicao) {
    passo.classList.toggle("feito", posicao <= numeroDaTela);
  });

  window.scrollTo(0, 0);
}

// Todo botão "Voltar" tem data-ir-para="id-da-tela" no HTML
function ativarBotoesVoltar() {
  document.querySelectorAll("[data-ir-para]").forEach(function (botao) {
    botao.onclick = function () {
      irParaTela(botao.dataset.irPara);
    };
  });
}


/* ====================================================================
   7. TELA 1: OBJETIVO
   ==================================================================== */

// Cria os cartões de objetivo a partir da lista OBJETIVOS
function montarListaDeObjetivos() {
  let html = "";

  Object.keys(OBJETIVOS).forEach(function (chave) {
    const objetivo = OBJETIVOS[chave];
    html += `
      <label class="cartao-opcao">
        <input type="radio" name="objetivo" value="${chave}">
        <span>
          <em>${objetivo.emoji}</em>
          <div>${objetivo.titulo}<small>${objetivo.descricao}</small></div>
        </span>
      </label>`;
  });

  pegar("lista-objetivos").innerHTML = html;

  // Mostra o campo de texto só quando "Outro" estiver marcado
  document.querySelectorAll('input[name="objetivo"]').forEach(function (opcao) {
    opcao.onchange = function () {
      pegar("caixa-outro").classList.toggle("escondido", opcao.value !== "outro");
    };
  });
}

function continuarDoObjetivo() {
  const marcado = document.querySelector('input[name="objetivo"]:checked');
  const comentario = pegar("campo-outro").value.trim();

  if (!marcado) {
    pegar("erro-objetivo").textContent = "Escolha um objetivo pra gente começar! 😉";
    return;
  }
  if (marcado.value === "outro" && comentario.length < 3) {
    pegar("erro-objetivo").textContent = "Conta pra mim qual é o seu objetivo!";
    return;
  }

  pegar("erro-objetivo").textContent = "";
  cliente.objetivo = marcado.value;
  cliente.comentarioOutro = (marcado.value === "outro") ? comentario : "";
  irParaTela("tela-dados");
}


/* ====================================================================
   8. TELA 2: DADOS PESSOAIS
   ==================================================================== */
function continuarDosDados() {
  const nome = pegar("campo-nome").value.trim();
  const idade = parseInt(pegar("campo-idade").value, 10);
  const sexoMarcado = document.querySelector('input[name="sexo"]:checked');

  if (nome.length < 2) {
    pegar("erro-dados").textContent = "Me diz o seu nome, por favor!";
    return;
  }
  if (!(idade >= 1 && idade <= 120)) {
    pegar("erro-dados").textContent = "Me diz a sua idade (entre 1 e 120 anos).";
    return;
  }
  if (!sexoMarcado) {
    pegar("erro-dados").textContent = "Marque o sexo pra eu calcular certinho!";
    return;
  }

  pegar("erro-dados").textContent = "";
  cliente.nome = nome;
  cliente.idade = idade;
  cliente.sexo = sexoMarcado.value;

  pegar("campo-idade-medidas").value = idade;   // já deixa a idade preenchida na próxima tela
  irParaTela("tela-medidas");
}


/* ====================================================================
   9. TELA 3: MEDIDAS
   ==================================================================== */
function continuarDasMedidas() {
  const altura = parseFloat(pegar("campo-altura").value);
  const idade = parseInt(pegar("campo-idade-medidas").value, 10);
  const peso = parseFloat(pegar("campo-peso").value);

  if (!(altura >= 50 && altura <= 250)) {
    pegar("erro-medidas").textContent = "Me conta sua altura em centímetros (ex.: 170).";
    return;
  }
  if (!(idade >= 1 && idade <= 120)) {
    pegar("erro-medidas").textContent = "Confere a idade pra mim, por favor!";
    return;
  }
  if (!(peso >= 10 && peso <= 400)) {
    pegar("erro-medidas").textContent = "Me conta seu peso em quilos (ex.: 70).";
    return;
  }

  pegar("erro-medidas").textContent = "";
  cliente.altura = altura;
  cliente.idade = idade;
  cliente.peso = peso;
  cliente.fatorAtividade = parseFloat(pegar("campo-atividade").value);

  mostrarResultado();
}


/* ====================================================================
   10. CÁLCULOS
   ==================================================================== */

// Descobre se a gordura está boa ou ruim (os limites mudam para homem e mulher)
function classificarGordura(gordura, ehHomem) {
  const limites = ehHomem ? [6, 14, 25, 31] : [14, 21, 32, 39];

  const niveis = [
    { nome: "Muito baixo",    cor: CORES_CLASSIFICACAO.muitoBaixo,
      mensagem: "Seu percentual está bem baixinho. Vamos cuidar da sua energia e da sua saúde juntos!" },
    { nome: "Atlético",       cor: CORES_CLASSIFICACAO.atletico,
      mensagem: "Que shape! Você está na faixa de Saúdavel. Vamos manter esse ritmo! 🏅" },
    { nome: "Saudável",       cor: CORES_CLASSIFICACAO.saudavel,
      mensagem: "Isso aí! Você está na faixa saudável. Agora é manter e evoluir comigo! 💚" },
    { nome: "Acima do ideal", cor: CORES_CLASSIFICACAO.acimaDoIdeal,
      mensagem: "Você está um pouquinho acima da faixa, mas isso tem solução! Bora virar esse jogo juntos? 💪" },
    { nome: "Elevado",        cor: CORES_CLASSIFICACAO.elevado,
      mensagem: "O primeiro passo você já deu ao vir aqui! Vamos montar um plano com carinho e cuidado, juntos. ❤️" }
  ];

  // Conta em quantos limites a gordura já passou: isso é a posição na lista
  const posicao = limites.filter(function (limite) { return gordura >= limite; }).length;

  return {
    nome: niveis[posicao].nome,
    cor: niveis[posicao].cor,
    mensagem: niveis[posicao].mensagem,
    faixaSaudavel: ehHomem ? "14% a 24%" : "21% a 31%"
  };
}

// Faz todas as contas e devolve um objeto com os resultados
function calcularResultado() {
  const ehHomem = (cliente.sexo === "Masculino");
  const alturaEmMetros = cliente.altura / 100;
  const objetivo = OBJETIVOS[cliente.objetivo];

  // IMC = peso dividido pela altura ao quadrado
  const imc = cliente.peso / (alturaEmMetros * alturaEmMetros);

  // Gordura corporal ESTIMADA (fórmula de Deurenberg: usa IMC, idade e sexo)
  let gordura = 1.2 * imc + 0.23 * cliente.idade - 10.8 * (ehHomem ? 1 : 0) - 5.4;
  gordura = Math.max(3, Math.min(60, gordura));

  const massaGorda = cliente.peso * gordura / 100;

  // Metabolismo basal (fórmula de Mifflin-St Jeor)
  const metabolismoBasal = 10 * cliente.peso + 6.25 * cliente.altura - 5 * cliente.idade + (ehHomem ? 5 : -161);
  const gastoDiario = metabolismoBasal * cliente.fatorAtividade;

  return {
    imc: imc,
    gordura: gordura,
    massaGorda: massaGorda,
    massaMagra: cliente.peso - massaGorda,
    pesoMinimo: 18.5 * alturaEmMetros * alturaEmMetros,   // IMC 18,5
    pesoMaximo: 24.9 * alturaEmMetros * alturaEmMetros,   // IMC 24,9
    gastoDiario: gastoDiario,
    caloriasMeta: Math.max(gastoDiario * objetivo.fatorCalorias, metabolismoBasal),
    proteina: Math.round(cliente.peso * objetivo.proteinaPorKg),
    agua: cliente.peso * 0.035,                           // 35 ml por kg
    classificacao: classificarGordura(gordura, ehHomem)
  };
}

// Monta a lista de cartões. Cada cartão tem: valor, unidade e o tipo de barra.
//   tipo "faixas"        -> barra com cores + marcador
//   tipo "preenchimento" -> barra que enche até uma porcentagem
function montarDadosDosCartoes(r) {
  // Barra do peso ideal: azul (abaixo), verde (ideal), laranja (acima)
  const inicioDaEscala = r.pesoMinimo * 0.7;
  const fimDaEscala = r.pesoMaximo * 1.4;
  const inicioVerde = porcentagemEntre(r.pesoMinimo, inicioDaEscala, fimDaEscala);
  const fimVerde = porcentagemEntre(r.pesoMaximo, inicioDaEscala, fimDaEscala);

  return {
    imc: {
      valor: formatar(r.imc, 1), unidade: "kg/m²", tipo: "faixas",
      gradiente: "linear-gradient(90deg,#4a90d9 0 18%,#2e9e6b 18% 40%,#e0a82e 40% 60%,#e07a2e 60% 80%,#d0383c 80%)",
      posicao: porcentagemEntre(r.imc, 15, 40)
    },
    pesoIdeal: {
      valor: formatar(r.pesoMinimo, 0) + "–" + formatar(r.pesoMaximo, 0), unidade: "kg", tipo: "faixas",
      gradiente: `linear-gradient(90deg,#4a90d9 0 ${inicioVerde}%,#2e9e6b ${inicioVerde}% ${fimVerde}%,#e0902e ${fimVerde}% 100%)`,
      posicao: porcentagemEntre(cliente.peso, inicioDaEscala, fimDaEscala)
    },
    calorias:    { valor: arredondarDezena(r.caloriasMeta), unidade: "kcal",   tipo: "preenchimento", cor: "#e0902e", porcentagem: porcentagemEntre(r.caloriasMeta, 1200, 3500) },
    gastoDiario: { valor: arredondarDezena(r.gastoDiario),  unidade: "kcal",   tipo: "preenchimento", cor: "#8e6cd8", porcentagem: porcentagemEntre(r.gastoDiario, 1200, 3500) },
    proteina:    { valor: r.proteina,                       unidade: "g",      tipo: "preenchimento", cor: "#2e9e6b", porcentagem: porcentagemEntre(r.proteina, 40, 200) },
    agua:        { valor: formatar(r.agua, 1),              unidade: "litros", tipo: "preenchimento", cor: "#4a90d9", porcentagem: porcentagemEntre(r.agua, 1, 4.5) },
    massaMagra:  { valor: formatar(r.massaMagra, 1),        unidade: "kg",     tipo: "preenchimento", cor: "#e0457b", porcentagem: 100 - r.gordura },
    sono:        { valor: cliente.idade < 18 ? "8–10" : "7–9", unidade: "horas", tipo: "preenchimento", cor: "#5b6bd6", porcentagem: 75 }
  };
}


/* ====================================================================
   11. TELA 4: RESULTADO
   ==================================================================== */
function mostrarResultado() {
  resultado = calcularResultado();
  const objetivo = OBJETIVOS[cliente.objetivo];
  const classificacao = resultado.classificacao;

  // --- 11.1 Destaque: gordura corporal ---
  pegar("texto-saudacao").textContent = "Pronto, " + cliente.nome.split(" ")[0] + "! Olha o seu resultado 👇";
  pegar("etiqueta-classificacao").textContent = classificacao.nome;
  pegar("etiqueta-classificacao").style.background = classificacao.cor;
  pegar("anel-gordura").style.stroke = classificacao.cor;
  pegar("valor-gordura").style.color = classificacao.cor;
  pegar("texto-faixa").textContent = "Faixa saudável pra você: " + classificacao.faixaSaudavel;
  pegar("texto-mensagem-gordura").textContent = classificacao.mensagem;
  pegar("anel-gordura").style.strokeDashoffset = TAMANHO_DO_CIRCULO;   // começa vazio

  // --- 11.2 Objetivo escolhido ---
  let textoDoObjetivo = objetivo.titulo;
  if (cliente.comentarioOutro !== "") {
    textoDoObjetivo = "Outro: " + cliente.comentarioOutro;
  }
  pegar("objetivo-escolhido").textContent = textoDoObjetivo;

  // --- 11.3 Cartões de números (na ordem do objetivo) ---
  const dadosDosCartoes = montarDadosDosCartoes(resultado);
  let htmlDosCartoes = "";

  objetivo.ordemDosCartoes.forEach(function (chave, posicao) {
    const cartao = dadosDosCartoes[chave];
    const ehFoco = (posicao < 2);   // os 2 primeiros ficam destacados
    let barra;

    if (cartao.tipo === "faixas") {
      barra = `<div class="barra-faixas" style="background:${cartao.gradiente}">
                 <b class="marcador" data-posicao="${cartao.posicao}"></b></div>`;
    } else {
      barra = `<div class="barra-fundo">
                 <i class="barra-preenchimento" style="background:${cartao.cor}" data-largura="${cartao.porcentagem}"></i></div>`;
    }

    htmlDosCartoes += `
      <div class="cartao-numero ${ehFoco ? "cartao-foco" : ""}" style="--ordem:${posicao}">
        <small>${NOMES_DOS_CARTOES[chave]}</small>
        <strong>${cartao.valor}</strong>
        <span class="unidade">${cartao.unidade}</span>
        ${barra}
      </div>`;
  });

  pegar("grade-cartoes").innerHTML = htmlDosCartoes;
  pegar("texto-dica-cartoes").textContent = "Pro seu objetivo, olhe primeiro os cartões rosa: eles são os mais importantes! 👀";

  // --- 11.4 Dicas ---
  let htmlDasDicas = "";
  objetivo.dicas.forEach(function (dica) {
    htmlDasDicas += "<li>" + dica + "</li>";
  });
  pegar("lista-dicas").innerHTML = htmlDasDicas;

  // --- 11.5 Aviso final ---
  if (cliente.idade < 18) {
    pegar("texto-aviso").textContent = "Como você tem menos de 18 anos, essas estimativas não são tão precisas. Vamos conversar antes de começar qualquer dieta, combinado?";
  } else {
    pegar("texto-aviso").textContent = "Esse percentual é uma estimativa (idade, sexo e IMC). Na avaliação presencial eu meço certinho, com adipômetro ou bioimpedância!";
  }

  irParaTela("tela-resultado");
  animarResultado();
}

// Faz o círculo encher, o número subir e as barrinhas crescerem
function animarResultado() {
  setTimeout(function () {
    // círculo
    const porcentagemDoCirculo = Math.min(resultado.gordura, 50) / 50;
    pegar("anel-gordura").style.strokeDashoffset = TAMANHO_DO_CIRCULO * (1 - porcentagemDoCirculo);

    // barras de preenchimento
    document.querySelectorAll(".barra-preenchimento").forEach(function (barra) {
      barra.style.width = barra.dataset.largura + "%";
    });

    // marcadores das barras coloridas
    document.querySelectorAll(".marcador").forEach(function (marcador) {
      marcador.style.left = marcador.dataset.posicao + "%";
    });

    // número da gordura subindo de 0 até o valor (1,4 segundo)
    const inicio = performance.now();
    function contar(agora) {
      const andamento = Math.min(1, (agora - inicio) / 1400);
      const suavizado = 1 - Math.pow(1 - andamento, 3);
      pegar("valor-gordura").textContent = formatar(resultado.gordura * suavizado, 1) + "%";
      if (andamento < 1) requestAnimationFrame(contar);
    }
    requestAnimationFrame(contar);
  }, 150);
}


/* ====================================================================
   12. BOTÃO DO WHATSAPP
   Abre o WhatsApp com uma mensagem pronta, com os dados do cliente.
   ==================================================================== */
function abrirWhatsapp() {
  const objetivo = OBJETIVOS[cliente.objetivo];
  let nomeDoObjetivo = objetivo.titulo;
  if (cliente.comentarioOutro !== "") {
    nomeDoObjetivo += " - " + cliente.comentarioOutro;
  }

  const mensagem =
    "Oi! Eu sou " + cliente.nome + " e acabei de fazer minha avaliação. Quero começar a treinar com você! 💪\n\n" +
    "Objetivo: " + nomeDoObjetivo + "\n" +
    "Gordura corporal (estimada): " + formatar(resultado.gordura, 1) + "% (" + resultado.classificacao.nome + ")\n" +
    "Sexo: " + cliente.sexo + "\n" +
    "Idade: " + cliente.idade + " anos\n" +
    "Altura: " + Math.round(cliente.altura) + " cm\n" +
    "Peso: " + formatar(cliente.peso, 1) + " kg";

  const link = "https://wa.me/55556184606892" + "?text=" + encodeURIComponent(mensagem);
  window.open(link, "_blank", "noopener");
}


/* ====================================================================
   13. INICIAR O SITE
   Este bloco roda uma vez, quando a página abre: monta o que precisa
   e liga cada botão à sua função.
   ==================================================================== */
montarLogo();
montarRodape();
montarListaDeObjetivos();
ativarBotoesVoltar();

pegar("botao-continuar-objetivo").onclick = continuarDoObjetivo;
pegar("botao-continuar-dados").onclick = continuarDosDados;
pegar("botao-ver-resultado").onclick = continuarDasMedidas;
pegar("botao-whatsapp").onclick = abrirWhatsapp;

irParaTela("tela-objetivo");
