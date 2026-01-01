/* =====================
   INTRO + COUNTDOWN
===================== */
const startBtn = document.getElementById("startBtn");
const intro = document.getElementById("intro");
const main = document.getElementById("main");
const countdown = document.getElementById("countdown");

startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    countdown.classList.remove("hidden");

    let count = 3;
    countdown.textContent = count;

    const timer = setInterval(() => {
        count--;
        countdown.textContent = count;

        if (count === 0) {
            clearInterval(timer);
            intro.classList.add("intro-hide");

            setTimeout(() => {
                intro.style.display = "none";
                main.classList.remove("hidden");
                startFireworks();
                startFloatingText();
            }, 1000);
        }
    }, 1000);
});

/* =====================
   FLOATING TEXT
===================== */
const messages = [
    "Chúc mừng năm mới 2026 🎉",
    "An khang thịnh vượng 💰",
    "Vạn sự như ý 🌸",
    "Tiền vô như nước 💸",
    "Gia đình hạnh phúc ❤️",
    "Sức khỏe dồi dào 💪",
    "Thành công rực rỡ 🚀"
];

const floatingContainer = document.getElementById("floating-texts");

function startFloatingText() {
    setInterval(() => {
        const text = document.createElement("div");
        text.className = "floating-text";
        text.innerText = messages[Math.floor(Math.random() * messages.length)];
        text.style.left = Math.random() * 80 + "vw";

        const duration = Math.random() * 6 + 6;
        text.style.animationDuration = duration + "s";

        floatingContainer.appendChild(text);

        setTimeout(() => text.remove(), duration * 1000);
    }, 800);
}

/* =====================
   FIREWORKS
===================== */
function startFireworks() {
    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    window.addEventListener("resize", () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    });

    let particles = [];

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.vx = (Math.random() - 0.5) * 6;
            this.vy = (Math.random() - 0.5) * 6;
            this.life = 100;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life--;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function createFirework() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height / 2;
        const colors = ["#ff4fd8", "gold", "#00ffff", "#9d00ff"];
        const color = colors[Math.floor(Math.random() * colors.length)];

        for (let i = 0; i < 120; i++) {
            particles.push(new Particle(x, y, color));
        }
    }

    function animate() {
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
            p.update();
            p.draw();
            if (p.life <= 0) particles.splice(i, 1);
        });

        requestAnimationFrame(animate);
    }

    setInterval(createFirework, 800);
    animate();
}
