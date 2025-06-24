
document.getElementById("botao-iniciar").addEventListener("click", function () {
  document.getElementById("modal-inicio").style.display = "block";
});



document.getElementById("btn-ir-jogo").addEventListener("click", function () {
  window.location.href = "game.html"; // substitua pelo nome real do seu arquivo do jogo
});

// Quando clicar no botão "Ver História" do modal-inicio:
document.getElementById("btn-ver-historia").addEventListener("click", function () {
  // Fecha modal inicial
  document.getElementById("modal-inicio").style.display = "none";
  // Abre modal história
  document.getElementById("modal-historia").style.display = "block";

  // Inicializa índice do painel do carrossel
  currentPanel = 0;
  mostrarPainel(currentPanel);
});

let currentPanel = 0;
const paineis = document.querySelectorAll("#carrossel-historia .painel-historia");

function mostrarPainel(index) {
  paineis.forEach((painel, i) => {
    painel.style.display = (i === index) ? "block" : "none";
  });
}

// Botões do carrossel:
document.getElementById("btn-anterior").addEventListener("click", () => {
  currentPanel = (currentPanel === 0) ? paineis.length - 1 : currentPanel - 1;
  mostrarPainel(currentPanel);
});

document.getElementById("btn-proximo").addEventListener("click", () => {
  currentPanel = (currentPanel === paineis.length - 1) ? 0 : currentPanel + 1;
  mostrarPainel(currentPanel);
});

// Botão "Ir para o jogo" no modal da história:
document.getElementById("btn-jogo-da-historia").addEventListener("click", () => {
  window.location.href = "game.html"; // seu arquivo do jogo
});



document.getElementById("botao-controles").addEventListener("click", () => {
  document.getElementById("modal-controles").style.display = "block";
});

document.getElementById("botao-sobre").addEventListener("click", () => {
  document.getElementById("modal-sobre").style.display = "block";
});

document.querySelectorAll(".close").forEach(el => {
  el.addEventListener("click", (e) => {
    const modalId = e.target.getAttribute("data-modal");
    document.getElementById(modalId).style.display = "none";
  });
});

// Fechar modal clicando fora do conteúdo
window.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
});

const music = new Audio('assets/thundersnail.mp4');
music.loop = true;
music.volume = 0.5;
let isPlaying = false;

const btnMusic = document.getElementById('btn-music-toggle');
const icon = document.getElementById('icon-music');

// Toca música no primeiro clique na página
window.addEventListener('click', () => {
  if (!isPlaying) {
    music.play().then(() => {
      isPlaying = true;
      icon.src = 'assets/soundon.png';
    }).catch((e) => {
      console.warn("Autoplay bloqueado pelo navegador:", e);
    });
  }
}, { once: true }); // só uma vez

// Controle do botão
btnMusic.addEventListener('click', (e) => {
  e.stopPropagation(); // evita conflito com o evento acima
  if (isPlaying) {
    music.pause();
    icon.src = 'assets/soundoff.png';
  } else {
    music.play();
    icon.src = 'assets/soundon.png';
  }
  isPlaying = !isPlaying;
});


