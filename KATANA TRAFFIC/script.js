document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;
        
        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });

        timelineItems.forEach(item => {
            const elementTop = item.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                item.classList.add('visible');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // 3. Page Transition Fade In
    document.body.classList.add('fade-in');

    // Page Transition Fade Out
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('href');
            // Only transition for local HTML pages, not anchors or external
            if (target.endsWith('.html') && target !== window.location.pathname.split('/').pop()) {
                e.preventDefault();
                document.body.classList.remove('fade-in');
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = target;
                }, 500);
            }
        });
    });

    // 4. Embers Canvas Effect (Only if canvas exists)
    const canvas = document.getElementById('embers-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particlesArray = [];
        const numberOfParticles = 80;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height + canvas.height; // Start below
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * -3 - 1; // Move up
                this.color = `rgba(214, 43, 63, ${Math.random()})`; // Reddish glow
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.size > 0.2) this.size -= 0.01;
                
                // Reset when off screen
                if (this.y < 0) {
                    this.y = canvas.height;
                    this.x = Math.random() * canvas.width;
                    this.size = Math.random() * 3 + 1;
                }
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                
                // Add glow
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#d62b3f';
            }
        }

        function initParticles() {
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // 5. Cherry Blossom Petals Effect
    function createPetals() {
        const container = document.querySelector('.petals-container');
        if (!container) return;

        const petalCount = 15; // Small number for performance

        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            
            // Randomize properties
            const size = Math.random() * 10 + 10; // 10px to 20px
            const left = Math.random() * 100; // 0% to 100%
            const animationDuration = Math.random() * 10 + 10; // 10s to 20s
            const animationDelay = Math.random() * 10; // 0s to 10s

            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
            petal.style.left = `${left}vw`;
            petal.style.animation = `fall ${animationDuration}s linear ${animationDelay}s infinite`;

            container.appendChild(petal);
        }
    }
    
    createPetals();

    // 6. Hero Parallax Effect
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        });
    }
});
