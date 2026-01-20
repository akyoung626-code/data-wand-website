<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DataWand — The Transmutation of Paper</title>
    
    <!-- Typography: Fraunces for the Analog soul, Space Mono for the Digital structure -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,800;1,9..144,300&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    
    <style>
        :root {
            /* The Analog Palette */
            --paper-bg: #F2F0E9;
            --paper-ink: #1A1A1A;
            --paper-accent: #FF3300; /* International Orange */

            /* The Digital Palette */
            --data-bg: #050505;
            --data-light: #E0E0E0;
            --data-grid: rgba(255, 255, 255, 0.05);
            --data-highlight: #6366f1;

            /* Dimensions */
            --grid-unit: 20px;
            --border-width: 2px;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            cursor: none; /* We build our own cursor */
        }

        body {
            background-color: var(--paper-bg);
            color: var(--paper-ink);
            font-family: 'Fraunces', serif;
            overflow-x: hidden;
            transition: background-color 0.8s cubic-bezier(0.22, 1, 0.36, 1), color 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* --- Custom Cursor --- */
        #cursor {
            position: fixed;
            top: 0;
            left: 0;
            width: 20px;
            height: 20px;
            border: 2px solid var(--paper-accent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            mix-blend-mode: difference;
            transition: width 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                        height 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                        background-color 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        #cursor::after {
            content: '';
            width: 4px;
            height: 4px;
            background: var(--paper-accent);
            border-radius: 50%;
        }

        #cursor.active {
            width: 80px;
            height: 80px;
            background-color: rgba(255, 51, 0, 0.1);
            border-color: transparent;
            backdrop-filter: invert(1);
        }
        
        #cursor.active::after {
            display: none;
        }

        /* --- Layout Structure --- */
        .frame {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: var(--border-width) solid var(--paper-ink);
            z-index: 100;
            pointer-events: none;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 1.5rem;
            transition: border-color 0.8s ease;
        }

        .frame-header, .frame-footer {
            display: flex;
            justify-content: space-between;
            font-family: 'Space Mono', monospace;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            font-weight: 700;
        }

        /* --- Sections --- */
        section {
            min-height: 100vh;
            position: relative;
            padding: 8rem 2rem;
            border-bottom: var(--border-width) solid var(--paper-ink);
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        /* --- HERO: The Analog Artifact --- */
        .hero {
            background-color: var(--paper-bg);
            align-items: center;
            text-align: center;
            /* Subtle grid background for paper texture feel */
            background-image: radial-gradient(var(--paper-ink) 0.5px, transparent 0.5px);
            background-size: 40px 40px;
            background-position: 0 0;
        }

        .hero-title {
            font-size: clamp(3.5rem, 13vw, 11rem);
            line-height: 0.8;
            font-weight: 800;
            letter-spacing: -0.05em;
            margin-bottom: 4rem;
            position: relative;
            z-index: 2;
            mix-blend-mode: multiply;
        }

        .hero-title span {
            display: block;
            transform-origin: center;
            will-change: transform;
        }
        
        .hero-title .word-2 {
            color: transparent;
            -webkit-text-stroke: 2px var(--paper-ink);
            font-style: italic;
            font-weight: 300;
            transform: translateX(10%);
        }

        .hero-subtitle {
            font-family: 'Space Mono', monospace;
            max-width: 400px;
            margin: 0 auto;
            font-size: 0.9rem;
            line-height: 1.6;
            position: relative;
            z-index: 2;
            text-align: left;
            border-left: 2px solid var(--paper-accent);
            padding-left: 1.5rem;
        }

        .hero-subtitle strong {
            display: block;
            margin-bottom: 0.5rem;
            color: var(--paper-accent);
            font-size: 0.7rem;
            letter-spacing: 0.2em;
            text-transform: uppercase;
        }

        /* --- The Canvas Layer --- */
        #dust-canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            /* Multiply blend mode makes dark particles look like ink on paper */
            mix-blend-mode: multiply; 
            transition: mix-blend-mode 0.8s;
        }

        /* --- SECTION 2: The Process (Architectural Grid) --- */
        .process {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 0;
            align-items: stretch;
            padding: 0;
            overflow: hidden;
        }

        .process-col {
            grid-column: span 4;
            border-right: var(--border-width) solid var(--paper-ink);
            padding: 6rem 3rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: background 0.3s, transform 0.3s;
            position: relative;
        }
        
        .process-col::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 0%;
            background: var(--paper-ink);
            z-index: -1;
            transition: height 0.4s cubic-bezier(0.77, 0, 0.175, 1);
        }

        .process-col:hover {
            color: var(--paper-bg);
        }
        
        .process-col:hover::before {
            height: 100%;
        }

        .process-col:hover .step-number {
             -webkit-text-stroke: 1px var(--paper-bg);
        }

        .process-col:last-child {
            border-right: none;
        }

        .step-number {
            font-family: 'Space Mono', monospace;
            font-size: 5rem;
            font-weight: 700;
            color: transparent;
            -webkit-text-stroke: 1px var(--paper-ink);
            margin-bottom: 3rem;
            opacity: 0.5;
        }

        .step-title {
            font-size: 2.5rem;
            line-height: 0.95;
            margin-bottom: 1.5rem;
            font-weight: 600;
        }

        .step-desc {
            font-family: 'Space Mono', monospace;
            font-size: 0.85rem;
            line-height: 1.7;
            max-width: 260px;
        }

        /* --- SECTION 3: The Data World (Dark Mode) --- */
        .data-world {
            background-color: var(--data-bg);
            color: var(--data-light);
            border-bottom: none;
            overflow: hidden;
            border-top: var(--border-width) solid var(--data-light);
            justify-content: flex-start;
            padding-top: 10rem;
        }

        .data-grid {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                linear-gradient(var(--data-grid) 1px, transparent 1px),
                linear-gradient(90deg, var(--data-grid) 1px, transparent 1px);
            background-size: 40px 40px;
            opacity: 0.3;
            z-index: 0;
            animation: panGrid 20s linear infinite;
        }
        
        @keyframes panGrid {
            0% { transform: translateY(0); }
            100% { transform: translateY(40px); }
        }

        .manifesto {
            max-width: 1400px;
            width: 100%;
            margin: 0 auto;
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }

        .manifesto-line {
            font-size: clamp(2rem, 6vw, 5rem);
            font-family: 'Space Mono', monospace;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding-bottom: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            position: relative;
        }
        
        .manifesto-line::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 0%;
            height: 1px;
            background: var(--data-highlight);
            transition: width 0.5s ease;
        }
        
        .manifesto-line:hover::after {
            width: 100%;
        }

        .manifesto-line span:last-child {
            font-size: 1rem;
            color: var(--data-highlight);
            font-weight: 400;
        }

        /* --- Footer --- */
        footer {
            background: var(--data-bg);
            color: var(--data-light);
            padding: 2rem 2rem 8rem;
            text-align: center;
            font-family: 'Space Mono', monospace;
            border-top: 1px solid var(--data-highlight);
            position: relative;
            z-index: 2;
        }

        .ticker {
            font-size: 12vw;
            white-space: nowrap;
            overflow: hidden;
            color: var(--data-highlight);
            opacity: 0.1;
            font-weight: bold;
            line-height: 1;
            user-select: none;
        }

        /* --- Responsive --- */
        @media (max-width: 900px) {
            .process-col {
                grid-column: span 12;
                border-right: none;
                border-bottom: var(--border-width) solid var(--paper-ink);
                padding: 4rem 1.5rem;
            }
            .hero-title {
                font-size: 15vw;
            }
            .frame {
                padding: 1rem;
            }
        }

        /* --- JS Utility Classes --- */
        .reveal-text {
            clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
            transition: clip-path 1.2s cubic-bezier(0.77, 0, 0.175, 1);
        }
        
        .reveal-text.visible {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }

        .fade-up {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .fade-up.visible {
            opacity: 1;
            transform: translateY(0);
        }

    </style>
</head>
<body>

    <!-- The Architectural Frame (Fixed) -->
    <div class="frame">
        <div class="frame-header">
            <span>DataWand ©2026</span>
            <span>Est. Brooklyn, NY</span>
        </div>
        <div class="frame-footer">
            <span>Status: Operational</span>
            <span id="coordinates">00.00°N, 00.00°W</span>
        </div>
    </div>

    <!-- The Custom Cursor -->
    <div id="cursor"></div>

    <!-- The Digital Dust Layer (Canvas) -->
    <canvas id="dust-canvas"></canvas>

    <main>
        <!-- HERO: The Analog Artifact -->
        <section class="hero" data-theme="light">
            <h1 class="hero-title">
                <span class="word-1">PAPER</span>
                <span class="word-2">DISSOLVES</span>
                <span class="word-3">INTO DATA</span>
            </h1>
            <div class="hero-subtitle fade-up">
                <strong>[ Figure 1.0 ]</strong>
                <p>The physical world is heavy. We extract the signal from the noise. No servers. No cloud. Just alchemy.</p>
            </div>
        </section>

        <!-- THE TRANSITION: The Process -->
        <section class="process" id="process" data-theme="light">
            <div class="process-col reveal-text">
                <div class="step-number">01</div>
                <h3 class="step-title">Capture<br>Artifact</h3>
                <p class="step-desc">Point the wand. The Vision Engine isolates ink from fiber. Chaos becomes structure in exactly 16ms.</p>
            </div>
            <div class="process-col reveal-text">
                <div class="step-number">02</div>
                <h3 class="step-title">Local<br>Synthesis</h3>
                <p class="step-desc">No data leaves the perimeter. The transmutation happens on-device. Privacy is not a feature; it is physics.</p>
            </div>
            <div class="process-col reveal-text">
                <div class="step-number">03</div>
                <h3 class="step-title">Digital<br>Resonance</h3>
                <p class="step-desc">The form fills itself. The paper is discarded. The data remains. Immortal. Searchable. Pure.</p>
            </div>
        </section>

        <!-- THE DATA WORLD: Inversion -->
        <section class="data-world" data-theme="dark">
            <div class="data-grid"></div>
            
            <div class="manifesto">
                <div class="manifesto-line reveal-text">
                    <span>ZERO LATENCY</span>
                    <span>[ 00ms ]</span>
                </div>
                <div class="manifesto-line reveal-text">
                    <span>ZERO SERVERS</span>
                    <span>[ LOCALHOST ]</span>
                </div>
                <div class="manifesto-line reveal-text">
                    <span>INFINITE MEMORY</span>
                    <span>[ ∞ ]</span>
                </div>
            </div>
        </section>
    </main>

    <footer>
        <div class="ticker">DATAWAND SYSTEM DATAWAND SYSTEM</div>
        <p style="margin-top: 2rem; font-size: 0.75rem; opacity: 0.5;">ARCHITECTED FOR PRIVACY. REUSE TEMPLATES FOREVER.</p>
    </footer>

    <script>
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
            const interactiveElements = document.querySelectorAll('a, .process-col, h1, .manifesto-line');
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

            // --- SCROLL REVEALS ---
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.reveal-text, .fade-up').forEach(el => revealObserver.observe(el));

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
    </script>
</body>
</html>