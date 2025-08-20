const canvas = document.getElementById("MatrixCanvas");
const ctx = canvas.getContext("2d");
let speed = 10;
let message = "Feliz Cumpleaños Jenni :D";
let color = "#0000FF";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fontSize = 16;
let columns = canvas.width / fontSize;
let drops = Array.from({ length: columns }).fill(1);

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

function explosion(x, y) {
    const parts = 20;
    for (let i = 0; i < parts; i++) {
        const angle = (Math.PI * 2 * i) / parts;
        const dx = Math.cos(angle) * 5;
        const dy = Math.sin(angle) * 5;
        animateExplosion(x, y, dx, dy);
    }
}

function animateExplosion(x, y, dx, dy) {
    let life = 30;
    function frame() {
        if (life <= 0) return;
        ctx.fillStyle = color;
        ctx.font = "semibold 20px Arial"; // semibold
        ctx.fillText(message, x + dx * (30 - life), y + dy * (30 - life));
        life--;
        requestAnimationFrame(frame);
    }
    frame();
}

function draw(){
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.font = "${fontSize}px Arial";
    
    for(let i=0; i < drops.length; i++){
        const text = message;
        ctx.fillText(text, i * fontSize, drops[i]*fontSize);
        if(drops[i] * fontSize > canvas.height || Math.random() > 0.95){
            drops[i] = 0;
        }
        drops[i]++;
    }
}

function animate(){
    setTimeout(() => {
        requestAnimationFrame(animate);
        draw();

    }, 1000/speed);
}

animate();