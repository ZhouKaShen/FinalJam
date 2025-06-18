//const audio = document.getElementById("musica-fundo");
document.getElementById("botao-iniciar").addEventListener("click", function () {
  
  //audio.play();
  document.getElementById("tela-inicial").style.display = "none";

  document.getElementById("tela-jogo").style.display = "flex";

  const canvas = document.getElementById("jogo");
  iniciarJogo(canvas);
});

document.getElementById("botao-voltar").addEventListener("click", function () {
  // Esconde o canvas
  document.getElementById("tela-jogo").style.display = "none";

  // Mostra a tela inicial
  document.getElementById("tela-inicial").style.display = "flex";
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

//music
const music = new Audio('assets/thundersnail.mp4');
music.loop = true;
music.volume = 0.5;
let isPlaying = false;

const btnMusic = document.getElementById('btn-music-toggle');
const icon = document.getElementById('icon-music');

btnMusic.addEventListener('click', () => {
  if (isPlaying) {
    music.pause();
    icon.src = 'assets/soundoff.png';
  } else {
    music.play();
    icon.src = 'assets/soundon.png';
  }
  isPlaying = !isPlaying;
});