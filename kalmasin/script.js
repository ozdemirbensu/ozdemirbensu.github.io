// Etki Hesaplayıcı Fonksiyonu
const calcBtn = document.getElementById('calc-btn');
const wasteInput = document.getElementById('waste-input');
const resultText = document.getElementById('calc-result');

calcBtn.addEventListener('click', () => {
    const meals = parseInt(wasteInput.value);
    
    if (isNaN(meals) || meals < 0) {
        resultText.innerHTML = "<span style='color: #ff4d4d;'>Lütfen geçerli bir sayı gir.</span>";
        return;
    }
    
    if (meals === 0) {
        resultText.innerHTML = "Harika! Zaten sıfır israf yapıyorsun! 🌱";
        return;
    }

    // Basit bir varsayım: 1 öğün = Ortalama 150 TL değerinde ve 0.5 kg CO2 salınımına eşdeğer.
    const moneySaved = meals * 150 * 4; // Aylık tasarruf
    const co2Saved = meals * 0.5 * 4; // Aylık CO2 (kg)
    
    resultText.innerHTML = `Eğer bu israfı önlersen, ayda 
    <span style="color: #00ffcc;">${moneySaved} ₺</span> cebinde kalır ve 
    <span style="color: #0088ff;">${co2Saved} kg</span> CO2 salınımını engellersin! 🌍`;
});

// Arka Plan Parçacık (Canvas) Animasyonu
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particlesArray;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 3) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.5) - 0.25;
        let directionY = (Math.random() * 0.5) - 0.25;
        let color = 'rgba(0, 255, 204, 0.15)'; // Neon yeşil
        
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

init();
animate();