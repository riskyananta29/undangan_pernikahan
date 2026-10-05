document.addEventListener('DOMContentLoaded', () => {
    checkGuestName();
    initScrollAnimations();
    startCountdown();
    initStorySlider();
    initVisualEffects();
    renderWishes();
});

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    const targets = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-zoom, .box-container');
    targets.forEach((el) => observer.observe(el));
}

function initVisualEffects() {
    const flowerContainer = document.getElementById('flowerContainer');
    const butterflyContainer = document.getElementById('butterflyContainer');
    
    for (let i = 0; i < 15; i++) {
        const flower = document.createElement('div');
        flower.classList.add('flower');
        const size = Math.random() * 8 + 8;
        flower.style.width = `${size}px`;
        flower.style.height = `${size}px`;
        flower.style.left = `${Math.random() * 100}vw`;
        flower.style.animationDuration = `${Math.random() * 6 + 6}s`;
        flower.style.animationDelay = `${Math.random() * 5}s`;
        flowerContainer.appendChild(flower);
    }

    for (let j = 0; j < 4; j++) {
        const butterfly = document.createElement('div');
        butterfly.classList.add('butterfly');
        butterfly.style.left = `${Math.random() * 80}vw`;
        butterfly.style.animationDuration = `${Math.random() * 6 + 7}s`;
        butterfly.style.animationDelay = `${Math.random() * 4}s`;
        butterflyContainer.appendChild(butterfly);
    }
}

// Target Countdown menuju Resepsi: 9 November 2026 Jam 09:00 WIB
const weddingTargetDate = '2026-11-09T09:00:00';

function startCountdown() {
    setInterval(() => {
        const target = new Date(weddingTargetDate).getTime();
        const now = new Date().getTime();
        const diff = target - now;

        if (diff < 0) return;

        document.getElementById('cd-hari').innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById('cd-jam').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById('cd-menit').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        document.getElementById('cd-detik').innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
    }, 1000);
}

function initStorySlider() {
    const slides = document.querySelectorAll('.story-slide');
    if(slides.length === 0) return;
    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 3500);
}

function checkGuestName() {
    const guest = new URLSearchParams(window.location.search).get('to');
    document.getElementById('guest-name').innerText = guest || "Tamu Undangan";
}

function openInvitation() {
    document.getElementById('cover-view').classList.add('opened');
    document.getElementById('invite-view').classList.remove('hidden-view');
    document.getElementById('bg-music').play().catch(()=>console.log("Autoplay dicegah browser"));
}

let isPlaying = true;
function toggleAudio() {
    const audio = document.getElementById('bg-music');
    if (isPlaying) {
        audio.pause();
        document.getElementById('audio-control').innerText = '🔇';
    } else {
        audio.play();
        document.getElementById('audio-control').innerText = '🎵';
    }
    isPlaying = !isPlaying;
}

function copyText(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text);
    alert('Nomor berhasil disalin: ' + text);
}

let rsvpData = JSON.parse(localStorage.getItem('weddingRSVP_irvan_siti')) || [];

function submitRSVP(e) {
    e.preventDefault();
    rsvpData.push({
        name: document.getElementById('rsvp-name').value,
        status: document.getElementById('rsvp-status').value, 
        message: document.getElementById('rsvp-message').value
    });
    localStorage.setItem('weddingRSVP_irvan_siti', JSON.stringify(rsvpData));
    alert('Terima kasih atas ucapan dan doa restunya!'); 
    document.getElementById('rsvp-form').reset(); 
    renderWishes();
}

function renderWishes() {
    const container = document.getElementById('wishes-container');
    container.innerHTML = '';
    [...rsvpData].reverse().forEach(w => {
        container.innerHTML += `
            <div class="wish-item">
                <strong>${w.name} (${w.status})</strong>
                <p>"${w.message}"</p>
            </div>
        `;
    });
}