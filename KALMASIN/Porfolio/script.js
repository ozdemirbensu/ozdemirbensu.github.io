// Sayfa yüklendiğinde ve kaydırıldığında elemanların yumuşakça belirmesi için Intersection Observer
document.addEventListener("DOMContentLoaded", () => {
    const faders = document.querySelectorAll(".fade-in");

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("appear");
                // Eleman göründükten sonra izlemeyi bırak
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});

// Fare kartların üzerindeyken dinamik glass parlaması (Tilt/Glow efekti)
const cards = document.querySelectorAll(".glass-card");

cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Farenin konumuna göre karta hafif bir radial gradient uygulayarak cam parlaması efekti
        card.style.background = `
            radial-gradient(
                circle at ${x}px ${y}px, 
                rgba(255, 255, 255, 0.25) 0%, 
                rgba(255, 255, 255, 0.1) 50%
            )
        `;
    });

    card.addEventListener("mouseleave", () => {
        // Fare ayrıldığında orijinal glass arkaplanına geri dön
        card.style.background = "var(--glass-bg)";
    });
});