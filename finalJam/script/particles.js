const canvas = document.getElementById('fire-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = Math.random() * 8 + 4;
    this.speedY = Math.random() * 1.5 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.alpha = Math.random() * 0.5 + 0.5;
    const red = 255;
    const green = Math.floor(Math.random() * 100 + 100); // mais vibrante
    const blue = 0;
    this.color = `rgba(${red}, ${green}, ${blue}, ${this.alpha})`;
  }

  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    this.size *= 0.97;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

function handleParticles() {
  // aumenta o número de partículas criadas
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle());
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.size < 0.5 || p.y < 0) {
      particles.splice(i, 1);
    }
  });
}

function animate() {
  handleParticles();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
