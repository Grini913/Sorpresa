const canvas = document.getElementById("MatrixCanvas");
const ctx = canvas.getContext("2d");
let speed = 10;
let message = "Feliz Cumpleaños";
let message2 = "Feliz Cumpleaños Jenni";
let color = "#0000FF";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array.from({ length: columns }).fill(1);

// --- util: color aleatorio ---
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let c = "#";
  for (let i = 0; i < 6; i++) c += letters[Math.floor(Math.random() * 16)];
  return c;
}

document.getElementById("SpeedC").addEventListener("input", (e) => {
  speed = parseInt(e.target.value);
});

document.getElementById("TextInput").addEventListener("input", (e) => {
  message = e.target.value;
});

document.getElementById("Cpicker").addEventListener("input", (e) => {
  color = e.target.value;
});

canvas.addEventListener("click", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  explosion(x, y);
});

// Colores aleatorios bonitos
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let c = "#";
  for (let i = 0; i < 6; i++) c += letters[Math.floor(Math.random() * 16)];
  return c;
}

function explosion(x, y) {
  const parts = 20;
  for (let i = 0; i < parts; i++) {
    const angle = (Math.PI * 2 * i) / parts;
    const dx = Math.cos(angle) * 5;
    const dy = Math.sin(angle) * 5;

    // dos colores random por partícula (multicolor 🎆)
    const c1 = getRandomColor();
    const c2 = getRandomColor();

    animateExplosion(x, y, dx, dy, c1, c2);
  }
}
function animateExplosion(x, y, dx, dy, c1, c2) {
  let life = 30;
  const textSize = 32; // tamaño del texto de la explosión

  function frame() {
    if (life <= 0) return;

    const tx = x + dx * (30 - life);
    const ty = y + dy * (30 - life);

    // --- TEXTO CENTRAL LEGIBLE (azul marino fijo) ---
    ctx.save();
    ctx.font = `700 ${textSize}px Arial`;
    ctx.fillStyle = "#001f4d"; // azul marino oscuro
    ctx.shadowColor = "transparent"; // sin halo
    //ctx.textAlign = "center";   // 🔹 centrado
    ctx.textBaseline = "middle";
    ctx.fillText(message2, x, y); // fijo en el centro
    ctx.restore();

    // --- DEGRADADO DINÁMICO + BRILLO ---
    const r = textSize * 1.5;
    const gradient = ctx.createRadialGradient(tx, ty, 0, tx, ty, r);
    gradient.addColorStop(0, c1);
    gradient.addColorStop(1, c2);

    ctx.save();
    ctx.globalCompositeOperation = "lighter";   // mezcla aditiva
    ctx.shadowColor = c1;
    ctx.shadowBlur = 8 + (life / 30) * 24;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.font = `600 ${textSize}px Arial`;
    ctx.fillStyle = gradient;
    ctx.fillText(message2, tx, ty);

    ctx.restore();

    life--;
    requestAnimationFrame(frame);
  }
  frame();
}




// --- MATRIX RAIN ---
function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.font = `${fontSize}px Arial`; // usar backticks

  for (let i = 0; i < drops.length; i++) {
    const text = message;
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height || Math.random() > 0.95) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

function animate() {
  setTimeout(() => {
    requestAnimationFrame(animate);
    draw();
  }, 1000 / speed);
}

animate();
