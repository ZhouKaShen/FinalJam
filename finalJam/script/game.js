

function iniciarJogo(canvas) {
  const ctx = canvas.getContext("2d");
  // Preencher o fundo de preto
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Configura o estilo do texto
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Desenha o texto centralizado
  ctx.fillText("produzir o game aqui ou importar o game para esta funcao 😀", canvas.width / 2, canvas.height / 2);
}