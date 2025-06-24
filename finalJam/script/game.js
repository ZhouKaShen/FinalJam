let player;
let plataformas = [];
let porta;
let Iniciador;
let minigame; // variável global para o minigame
let imgParado,imgParadoEsquerda,imgParadoDireita,imgAndandoEsquerdo,imgAndandoDireito,imgPulando,imgPulandoEsquerdo,imgPulandoDireito, Balde;
let backgroundgif;
let Door,DoorOpen,FireLeverOpen,FireLeverClosed;
let WinGif;
let LoseGif;
let Floor;
let Sprinkler;
let PortaAberta = false;
let AguaCaindo;
let FogoGif,AguaGif;
let FogoMiniGame2;
let jogoFinalizado = false;


function preload() {
  imgParado = loadImage('assets/PlayerDefault44x62.png');
  imgParadoEsquerda = loadImage('assets/PlayerLeft44x62.png');
  imgParadoDireita = loadImage('assets/PlayerRight44x62.png');
  imgAndandoEsquerdo = loadImage('assets/PlayerWalkingLeft44x62.png');
  imgAndandoDireito = loadImage('assets/PlayerWalkingRight44x62.png');
  imgPulando = loadImage('assets/PlayerJumping.png');
  imgPulandoDireito = loadImage('assets/PlayerJumpingRight.png');
  imgPulandoEsquerdo = loadImage('assets/PlayerJumpingLeft.png');
  Balde = loadImage('assets/PlayerBucket.png')

  Door = loadImage('assets/ExitDoor.png');
  DoorOpen = loadImage('assets/ExitDoorOpen.png');

  FireLeverClosed = loadImage('assets/FireAlarmeClose.png');
  FireLeverOpen = loadImage('assets/FireAlarmeOpen.png');

  backgroundgif =loadImage('assets/background.gif');

  WinGif = loadImage('assets/disaster-cat-fire-cat.gif')
  LoseGif = loadImage('assets/cat-cat-meme.gif')

  Floor = loadImage('assets/Floor.jpeg');
  Sprinkler = loadImage('assets/Sprinkler.png');
  AguaCaindo = loadImage('assets/WaterFalling.gif');

  FogoGif = loadImage('assets/Fire120x120.gif');
  AguaGif = loadImage('assets/Water120x120.gif');

  FogoMiniGame2 = loadImage('assets/Fogo120x140.gif');
}

function setup() {
  createCanvas(800, 600);

  player = new Player(100, 500);
  porta = new Porta(650,270);
  Iniciador = new IniciadorMinigames(300,300);

  configurarPlataformasParaNivel(1);
}

function draw() {
  background(220)
  image(backgroundgif,0,0,800,600);
  background(0,0,0,50)
  image(Sprinkler,360,0,50,50)


  if (jogoFinalizado && player.jogoGanhou) {
    background(0);
    fill(255, 255, 0);
    image(WinGif,0,0,800,600)
    textSize(40);
    textAlign(CENTER, CENTER);
    text("Parabéns! Você terminou o jogo!", width/2, height/2 - 50);
    textSize(20);
    text("Clique para jogar novamente", width/2, height/2 + 20);
    return;
  }
  if (player.vida <= 0) {
    jogoFinalizado = true;
    background(0);
    fill(255, 255, 0);
    image(LoseGif,0,0,800,600)
    textSize(40);
    textAlign(CENTER, CENTER);
    text("Game Over", width/2, height/2 - 50);
    textSize(20);
    text("Clique para jogar novamente", width/2, height/2 + 20);
    return
  }

  if (minigame && minigame.ativo) {
    minigame.atualizar();
    if (minigame.verificarColisoes) {
      minigame.verificarColisoes();
    }

    Iniciador.exibir();

    minigame.exibir();
  } else {
    for (let plataforma of plataformas) {
      plataforma.exibir();
    }

    player.mover();
    player.aplicarGravidade();
    player.verificarColisoes(plataformas);
    player.passarDeNivel(porta);

    if (player.nivel > 1) {
      fill(50);
      rect(100,470,50,80);
      image(DoorOpen, 100, 470, 50, 80);
      Iniciador.exibir();
    }

    porta.exibir();

    if (!player.terminouMinigame) {
      Iniciador.exibir();
    }

    player.exibir();
    Iniciador.verificarAtivacao(player);
    if(PortaAberta) {
      image(AguaCaindo,0,50,800,550)
    }
  }
}

function mousePressed() {
  if (minigame && minigame.ativo) {
    if (minigame instanceof MinigameClicker) {
      minigame.verificarClique(mouseX, mouseY);
    }
  }

  if (jogoFinalizado) {
    reiniciarJogo();
  }
}

function keyPressed() {
  if (minigame && minigame.ativo) {
    if (key === 'a' || keyCode === LEFT_ARROW) {
      minigame.moverEsquerda();
    } else if (key === 'd' || keyCode === RIGHT_ARROW) {
      minigame.moverDireita();
    }
  } else {
    if (key === ' ' || key === 'w' || keyCode === UP_ARROW) {
      player.pular();
    }
  }
}

function gerarMinigame() {
  // let sorteio = Math.floor(random(1, 3)); // 1 ou 2
  let sorteio = 3
  if (sorteio === 1) {
    return new MinigameDesviar();
  } else if (sorteio === 2) {
    return new MinigameClicker();
  } else {
    return new MinigameUndertale();
  }
}

function configurarPlataformasParaNivel(nivel) {
  plataformas = []; // Limpa as plataformas antigas

  if (nivel === 1) {
    plataformas.push(new Plataforma(50, 550, 200, 20));
    plataformas.push(new Plataforma(300, 450, 150, 20));
    plataformas.push(new Plataforma(550, 350, 200, 20));
    plataformas.push(new Plataforma(200, 250, 180, 20));
    plataformas.push(new Plataforma(500, 150, 180, 20));
  } else if (nivel === 2) {
    plataformas.push(new Plataforma(100, 550, 55, 20));
    plataformas.push(new Plataforma(650, 350, 55, 20));
    plataformas.push(new Plataforma(1000, 150, 180, 20));
    plataformas.push(new Plataforma(300, 100, 180, 10));
    plataformas.push(new Plataforma(150, 400, 20, 10));
    plataformas.push(new Plataforma(300, 400, 20, 10));
    plataformas.push(new Plataforma(370, 270, 10, 10));
    plataformas.push(new Plataforma(200, 200, 10, 10));
  } else if (nivel === 3) {
    plataformas.push(new Plataforma(100, 550, 55, 20));
    plataformas.push(new Plataforma(650, 350, 55, 20));
    plataformas.push(new Plataforma(200, 400, 10, 20));
    plataformas.push(new Plataforma(300, 420, 100, 20));
    plataformas.push(new Plataforma(390, 300, 10, 20));
    plataformas.push(new Plataforma(550, 220, 10, 20));
    plataformas.push(new Plataforma(350, 220, 140, 20));
  }
}

function reiniciarJogo() {
  player = new Player(100, 500);
  porta = new Porta(650, 270);
  Iniciador = new IniciadorMinigames(300, 300);
  PortaAberta = false;
  minigame = null;
  configurarPlataformasParaNivel(1);
}

class MinigameDesviar {
  constructor() {
    this.trilhas = [200, 400, 600];
    this.trilhaAtual = 1;
    this.itens = [];
    this.linhaColisao = 500;
    this.pontos = 0;
    this.ativo = true;
    this.gerarPadrao();
  }

  gerarPadrao() {
    this.itens = [];

    let incluirAgua = random() < 0.6;
    let trilhaAgua = incluirAgua ? floor(random(0, 3)) : -1;
    let trilhaSegura = trilhaAgua;

    if (!incluirAgua) {
      // Se não tiver água, escolha uma trilha aleatória para ser "vazio"
      trilhaSegura = floor(random(0, 3));
    }

    for (let i = 0; i < 3; i++) {
      let tipo;
      if (i === trilhaAgua) {
        tipo = 'agua';
      } else if (i === trilhaSegura) {
        tipo = 'vazio';
      } else {
        tipo = 'fogo';
      }
      this.itens.push(new ItemMinigame(this.trilhas[i], tipo));
    }
  }

  atualizar() {
    for (let item of this.itens) {
      item.atualizar();
    }

    if (this.itens.every(item => item.y > this.linhaColisao + 50)) {
      this.gerarPadrao();
    }
  }

  verificarColisoes() {
    let posicaoJogador = this.trilhas[this.trilhaAtual];

    for (let item of this.itens) {
      if (
          item.y >= this.linhaColisao - 20 &&
          abs(item.x - posicaoJogador) < 50 &&
          !item.coletado
      ) {
        item.coletado = true;

        if (item.tipo === 'agua') {
          this.pontos += 1;
        } else if (item.tipo === 'fogo') {
          player.vida -= 1;
        }

        if (this.pontos >= 5) {
          this.ativo = false;
          this.pontos = 0;
          console.log('Venceu o minigame!');
        }

        if (player.vida <= 0) {
          this.ativo = false;
          console.log('Perdeu o minigame!');
        }
      }
    }
  }

  moverDireita() {
    if (this.trilhaAtual < 2) this.trilhaAtual++;
  }

  moverEsquerda() {
    if (this.trilhaAtual > 0) this.trilhaAtual--;
  }

  exibir() {
    background(0);
    stroke(150);
    line(100, this.linhaColisao, 700, this.linhaColisao);
    noStroke();

    for (let item of this.itens) {
      item.exibir();
    }

    fill(255, 200, 0,0);
    rect(this.trilhas[this.trilhaAtual] - 20, this.linhaColisao + 50, 40, 40);
    image(Balde, this.trilhas[this.trilhaAtual] - 20, this.linhaColisao + 15, 56, 80);

    fill(255);
    textSize(20);
    text(`Pontos: ${this.pontos}`, 50, 50);
    text(`Vida: ${player.vida}`, 50, 80);
  }
}

class ItemMinigame {
  constructor(x, tipo) {
    this.x = x;
    this.y = 0;
    this.velocidade = 12;
    this.tipo = tipo;
    this.coletado = false;
  }

  atualizar() {
    this.y += this.velocidade;
  }

  exibir() {
    if (this.tipo === 'agua') {
      fill(0, 150, 255,0);
      ellipse(this.x, this.y, 40);
      image(AguaGif,this.x-60,this.y,120,120)
    } else if (this.tipo === 'fogo') {
      fill(255, 50, 0,0);
      rect(this.x - 20, this.y - 20, 40, 40);
      image(FogoGif,this.x-60,this.y,120,120)
    } else if (this.tipo === 'vazio') {
      fill(0,0,0,0);
      ellipse(this.x, this.y, 20);
    }
  }
}

class IniciadorMinigames {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.largura = 50;
    this.altura = 50;
    this.ativo = true;
  }

  exibir() {
    if (this.ativo) {
      fill(0,0,0,0);
      rect(this.x, this.y, this.largura, this.altura);
      image(FireLeverClosed, this.x, this.y, this.largura, this.altura);
    } if (!this.ativo) {
      fill(0,0,0,0);
      rect(this.x, this.y, this.largura, this.altura);
      image(FireLeverOpen, this.x, this.y, this.largura, this.altura);
    }
  }

  verificarAtivacao(player) {
    let colisao =
        player.x + player.largura > this.x &&
        player.x < this.x + this.largura &&
        player.y + player.altura > this.y &&
        player.y < this.y + this.altura;

    if (colisao && this.ativo) {
      minigame = gerarMinigame();
      this.ativo = false;
      PortaAberta = true;
      player.terminouMinigame = true;
    }
  }
}

class Porta {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.largura = 50;
    this.altura = 80;
  }

  exibir() {
    if (!PortaAberta) {
    fill(255, 255, 100);
    rect(this.x, this.y, this.largura, this.altura);
    image(Door, this.x, this.y, this.largura, this.altura);
    } else {
      fill(127, 127, 127);
      rect(this.x, this.y, this.largura, this.altura);
      image(DoorOpen, this.x, this.y, this.largura, this.altura);
    }
  }
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.largura = 44;
    this.altura = 62;
    this.velX = 0;
    this.velY = 0;
    this.velocidade = 5;
    this.forcaPulo = -15;
    this.noChao = false;
    this.vida = 3;
    this.nivel = 1;
    this.terminouMinigame = false;
    this.jogoGanhou = false;
    this.direcao = 'frente';
    this.andando = false;
    this.frameContador = 0;
  }

  mover() {
    this.andando = false;

    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.velX = -this.velocidade;
      this.direcao = 'esquerda';
      this.andando = true;
    } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.velX = this.velocidade;
      this.direcao = 'direita';
      this.andando = true;
    } else {
      this.velX = 0;
      this.frameContador = 0;
      this.direcao = 'frente';
    }

    this.x += this.velX;
    this.y += this.velY;
    this.x = constrain(this.x, 0, width - this.largura);

    if(this.andando) {
      this.frameContador++
    }
  }

  aplicarGravidade() {
    this.velY += 0.8;
    this.velY = constrain(this.velY, -20, 20);
  }

  pular() {
    if (this.noChao) {
      this.velY = this.forcaPulo;
      this.noChao = false;
    }
  }

  passarDeNivel(porta) {
    let colisao =
        this.x + this.largura > porta.x &&
        this.x < porta.x + porta.largura &&
        this.y + this.altura > porta.y &&
        this.y < porta.y + porta.altura;

    if (colisao && this.terminouMinigame) {
      this.x = 100;
      this.y = 490;
      this.velY = 0;
      this.nivel++;
      PortaAberta = false;

      if (this.nivel > 3) {
        this.jogoFinalizado = true;
        this.jogoGanhou = true;
      } else {
        this.terminouMinigame = false;
        Iniciador.ativo = true;
        configurarPlataformasParaNivel(this.nivel);
      }
    }
  }

  verificarColisoes(plataformas) {
    this.noChao = false;
    for (let plataforma of plataformas) {
      let colisao =
          this.x + this.largura > plataforma.x &&
          this.x < plataforma.x + plataforma.largura &&
          this.y + this.altura >= plataforma.y &&
          this.y + this.altura <= plataforma.y + plataforma.altura;

      if (colisao && this.velY >= 0) {
        this.y = plataforma.y - this.altura;
        this.velY = 0;
        this.noChao = true;
      }
    }

    if (this.y + this.altura >= height) {
      this.y = height - this.altura;
      this.velY = 0;
      this.noChao = true;
      if (this.noChao) {
        this.vida -= 1;
        this.velY = this.forcaPulo;
      }
    }
  }

  exibir() {
    let img;

    if (this.direcao === 'esquerda') {
      img = this.andando ?imgAndandoEsquerdo : imgParadoEsquerda;
    } else if (this.direcao === 'direita') {
      img = this.andando ?imgAndandoDireito : imgParadoDireita;
      } else {
      img = imgParado;
    }

    if (!this.noChao && this.direcao === 'esquerda') {
      img = imgPulandoEsquerdo
    } else if (!this.noChao && this.direcao === 'direita') {
      img = imgPulandoDireito
    } else if (!this.noChao && this.direcao === 'frente') {
      img = imgPulando;
    }

    image(img, this.x, this.y, this.largura, this.altura);

  }
}

class Plataforma {
  constructor(x, y, largura, altura) {
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
  }

  exibir() {
    fill(100, 255, 100);
    stroke(0,0,0,0)
    rect(this.x, this.y, this.largura, this.altura);
    image(Floor, this.x, this.y, this.largura, this.altura);
  }
}

class MinigameClicker {
  constructor() {
    this.vida = 50;
    this.ativo = true;
    this.ultimoIncremento = millis();
  }

  atualizar() {
    if (millis() - this.ultimoIncremento >= 1000) {
      this.vida += 2;
      this.ultimoIncremento = millis();
    }

    if (this.vida <= 0) {
      this.ativo = false;
      console.log("Venceu o minigame clicker!");
    }

    if (this.vida >= 70) {
      this.ativo = false;
      player.vida -= 1;
      console.log("Perdeu o minigame clicker!");
    }
  }

  verificarClique(mx, my) {
    let distancia = dist(mx, my, width/2, height/2);
    let tamanho = this.calcularTamanho();

    if (distancia <= tamanho/2) {
      this.vida -= 1;
    }
  }

  calcularTamanho() {
    return map(this.vida, 0, 70, 50, 300);
  }

  exibir() {
    background(0,0,0,200);
    let tamanho = this.calcularTamanho();
    fill(255, 0, 0,0);
    ellipse(width/2, height/2, tamanho);
    push()
      translate(width/2,height/2)
      image(FogoMiniGame2,-tamanho/2,-tamanho/2,tamanho,tamanho);
    pop()
    fill(255);
    textSize(24);
    textAlign(CENTER);
    text(`Vida da Bola: ${this.vida}`, width/2, 50);
    text(`Sua Vida: ${player.vida}`, width/2, 80);
  }
}

class MinigameUndertale {
  constructor() {
    this.ativo = true;

    // Plataformas com ~230px de distância
    const baseX = width / 2;
    this.plataformas = [
      { x: baseX - 115, y: 500, estado: 'normal', tempoNoVermelho: 0 },
      { x: baseX + 115, y: 500, estado: 'normal', tempoNoVermelho: 0 }
    ];

    // Jogador
    this.x = this.plataformas[0].x - 15; // Nasce certinho na plataforma
    this.y = this.plataformas[0].y - 60;
    this.largura = 44;
    this.altura = 62;
    this.velX = 0;
    this.velY = 0;
    this.velocidade = 5;
    this.forcaPulo = -15;
    this.noChao = false;
    this.direcao = 'frente';
    this.andando = false;
    this.frameContador = 0;

    // Fogo
    this.fogos = [];

    // Timers
    this.tempoUltimaTroca = millis();
    this.tempoUltimoFogo = millis();
    this.tempoInicio = millis();

    this.plataformaAlvo = null;

    // Controle de tempo no vermelho
    this.tempoNaPlataformaVermelha = new Map();
  }

  atualizar() {
    this.mover();
    this.aplicarGravidade();
    this.atualizarPlataformas();
    this.atualizarFogos();
    this.verificarColisoes();
    this.verificarVitoria();
  }

  mover() {
    this.andando = false;
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.velX = -this.velocidade;
      this.direcao = 'esquerda';
      this.andando = true;
    } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.velX = this.velocidade;
      this.direcao = 'direita';
      this.andando = true;
    } else {
      this.velX = 0;
      this.direcao = 'frente';
      this.andando = false;
      this.frameContador = 0;
    }

    this.x += this.velX;
    this.x = constrain(this.x, 0, width - this.largura);
    if(this.andando) {
      this.frameContador++
    }
  }

  aplicarGravidade() {
    this.velY += 0.8;
    this.velY = constrain(this.velY, -20, 20);

    this.y += this.velY;
    this.noChao = false;

    for (let p of this.plataformas) {
      let colisao =
          this.x + this.largura > p.x - 50 &&
          this.x < p.x + 50 &&
          this.y + this.altura >= p.y &&
          this.y + this.altura <= p.y + 10;

      if (colisao && this.velY >= 0) {
        this.y = p.y - this.altura;
        this.velY = 0;
        this.noChao = true;
      }
    }

    // Colisão com chão
    if (this.y + this.altura >= height) {
      this.y = height - this.altura;
      this.velY = this.forcaPulo;
      player.vida -= 1;
      console.log('Caiu no chão, perdeu vida!');
    }
  }

  pular() {
    if (this.noChao) {
      this.velY = this.forcaPulo;
      this.noChao = false;
    }
  }

  atualizarPlataformas() {
    let tempoDecorrido = millis() - this.tempoUltimaTroca;

    if (tempoDecorrido >= 0 && tempoDecorrido < 1000) {
      if (!this.plataformaAlvo) {
        let indice = floor(random(0, 2));
        this.plataformaAlvo = this.plataformas[indice];
        this.plataformaAlvo.estado = 'amarelo';
      }
    } else if (tempoDecorrido >= 1000 && tempoDecorrido < 2000) {
      if (this.plataformaAlvo) {
        this.plataformaAlvo.estado = 'vermelho';
      }
    } else if (tempoDecorrido >= 2000) {
      for (let p of this.plataformas) {
        p.estado = 'normal';
      }
      this.plataformaAlvo = null;
      this.tempoUltimaTroca = millis();
    }
  }

  atualizarFogos() {
    if (millis() - this.tempoUltimoFogo >= 1000) {
      this.fogos.push({ x: width / 2, y: 0 });
      this.tempoUltimoFogo = millis();
    }

    for (let fogo of this.fogos) {
      fogo.y += 10;
    }

    this.fogos = this.fogos.filter(f => f.y < height + 50);
  }

  verificarColisoes() {
    // Fogo
    for (let fogo of this.fogos) {
      let colisao =
          this.x + this.largura > fogo.x - 10 &&
          this.x < fogo.x + 10 &&
          this.y + this.altura > fogo.y - 10 &&
          this.y < fogo.y + 10;

      if (colisao) {
        player.vida -= 1;
        fogo.y = height + 100;
        console.log("Levou dano do fogo!");
      }
    }

    // Plataforma vermelha com temporizador de dano
    for (let p of this.plataformas) {
      let colisao =
          this.x + this.largura > p.x - 50 &&
          this.x < p.x + 50 &&
          abs(this.y + this.altura - p.y) <= 5;

      if (p.estado === 'vermelho' && colisao) {
        if (!this.tempoNaPlataformaVermelha.has(p)) {
          this.tempoNaPlataformaVermelha.set(p, millis());
        } else {
          let tempoNaColisao = millis() - this.tempoNaPlataformaVermelha.get(p);
          if (tempoNaColisao >= 300) {
            player.vida -= 1;
            this.velY = this.forcaPulo;
            console.log("Levou dano da plataforma vermelha após 0.3s e pulou!");
            this.tempoNaPlataformaVermelha.delete(p); // Reseta contador após dano
          }
        }
      } else {
        this.tempoNaPlataformaVermelha.delete(p); // Saiu da plataforma vermelha
      }
    }
  }

  verificarVitoria() {
    let tempoDecorrido = (millis() - this.tempoInicio) / 1000;
    if (tempoDecorrido >= 10) {
      this.ativo = false;
      console.log('Venceu o minigame undertale!');
    }

    if (player.vida <= 0) {
      this.ativo = false;
      console.log('Perdeu o minigame undertale!');
    }
  }

  exibir() {
    background(0,0,0,200);

    // Plataformas
    for (let p of this.plataformas) {
      if (p.estado === 'normal') fill(0, 255, 0);
      else if (p.estado === 'amarelo') fill(255, 255, 0);
      else if (p.estado === 'vermelho') fill(255, 0, 0);

      rect(p.x - 50, p.y, 100, 20);
    }

    // Fogos
    fill(255, 100, 0);
    for (let fogo of this.fogos) {
      ellipse(fogo.x, fogo.y, 20);
    }

    // Jogador (quadrado amarelo)
    fill(255, 200, 0,0);
    rect(this.x, this.y, this.largura, this.altura);
    let img;

    if (this.direcao === 'esquerda') {
      img = this.andando ?imgAndandoEsquerdo : imgParadoEsquerda;
    } else if (this.direcao === 'direita') {
      img = this.andando ?imgAndandoDireito : imgParadoDireita;
    } else {
      img = imgParado;
    }

    if (!this.noChao && this.direcao === 'esquerda') {
      img = imgPulandoEsquerdo
    } else if (!this.noChao && this.direcao === 'direita') {
      img = imgPulandoDireito
    } else if (!this.noChao && this.direcao === 'frente') {
      img = imgPulando;
    }

    image(img, this.x, this.y, this.largura, this.altura);

    // Informações
    fill(255);
    textSize(20);
    textAlign(LEFT);
    let tempo = max(0, 10 - floor((millis() - this.tempoInicio) / 1000));
    text(`Vida: ${player.vida}`, 20, 30);
    text(`Sobreviva: ${tempo}s`, 20, 60);
  }
}