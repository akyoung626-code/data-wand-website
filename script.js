document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('cursor');
    const coordinates = document.getElementById('coordinates');
    const canvas = document.getElementById('dust-canvas');
    const ctx = canvas.getContext('2d');
    const body = document.body;
    const frame = document.querySelector('.frame');


    // --- CURSOR PHYSICS & INTERACTION ---
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Update Coordinates in Frame UI
        const xPct = Math.round((e.clientX / window.innerWidth) * 100);
        const yPct = Math.round((e.clientY / window.innerHeight) * 100);
        coordinates.innerText = `X:${xPct} Y:${yPct} // SYSTEM.ACTIVE`;
    });

    // Hover States
    const interactiveElements = document.querySelectorAll('a, .process-col, h1, .manifesto-line, .ticker-char');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });

    // Smooth Cursor Follow
    function animateCursor() {
        const smoothFactor = 0.15;
        cursorX += (mouseX - cursorX) * smoothFactor;
        cursorY += (mouseY - cursorY) * smoothFactor;

        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // --- CANVAS "DIGITAL DUST" SYSTEM ---
    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            // Random velocity
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = (Math.random() - 0.5) * 1.5;
            this.life = 1.0;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= 0.015; // Fade out speed
        }

        draw() {
            // Check current theme to decide particle color
            const isDarkMode = body.style.backgroundColor === 'var(--data-bg)' ||
                             getComputedStyle(body).backgroundColor === 'rgb(5, 5, 5)';

            if (isDarkMode) {
                 ctx.fillStyle = `rgba(99, 102, 241, ${this.life})`; // Neon Blue
            } else {
                 ctx.fillStyle = `rgba(26, 26, 26, ${this.life})`; // Ink Black
            }

            ctx.beginPath();
            ctx.rect(this.x, this.y, this.size, this.size); // Square particles = digital
            ctx.fill();
        }
    }

    // Emit particles on mouse move
    let lastX = 0;
    let lastY = 0;
    document.addEventListener('mousemove', (e) => {
        const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
        // Only emit if moved enough
        if (dist > 3) {
            for(let i=0; i<1; i++) {
                particles.push(new Particle(e.clientX, e.clientY));
            }
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // --- THEME SWITCHING (THE TRANSMUTATION) ---
    const darkSection = document.querySelector('.data-world');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Enter Data Mode
                body.style.backgroundColor = 'var(--data-bg)';
                body.style.color = 'var(--data-light)';
                frame.style.borderColor = 'var(--data-light)';
                canvas.style.mixBlendMode = 'screen'; // Light particles on dark
            } else {
                // Exit Data Mode (Return to Paper)
                body.style.backgroundColor = 'var(--paper-bg)';
                body.style.color = 'var(--paper-ink)';
                frame.style.borderColor = 'var(--paper-ink)';
                canvas.style.mixBlendMode = 'multiply'; // Dark particles on light
            }
        });
    }, { threshold: 0.15 });

    observer.observe(darkSection);


    // --- KINETIC TYPOGRAPHY (HERO PARALLAX) ---
    const heroTitle = document.querySelector('.hero-title');
    document.addEventListener('mousemove', (e) => {
        // Calculate position relative to center
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        // Skew title slightly
        if(heroTitle) {
            heroTitle.style.transform = `
                perspective(1000px)
                rotateX(${y * -2}deg)
                rotateY(${x * 2}deg)
            `;
        }
    });
});
