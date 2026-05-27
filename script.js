<<<<<<< HEAD
(function() {
    // ========== PARTICLES SYSTEM ==========
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;
        let mouseX = -9999;
        let mouseY = -9999;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function createParticles(count) {
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    r: Math.random() * 1.5 + 0.5,
                    alpha: Math.random() * 0.5 + 0.1,
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const particleCount = Math.min(80, Math.floor(canvas.width * canvas.height / 12000));

            if (particles.length !== particleCount) {
                createParticles(particleCount);
            }

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x += canvas.width;
                if (p.x > canvas.width) p.x -= canvas.width;
                if (p.y < 0) p.y += canvas.height;
                if (p.y > canvas.height) p.y -= canvas.height;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const maxDist = 130;

                    if (dist < maxDist) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - dist / maxDist) * 0.15})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }

                const dxm = p.x - mouseX;
                const dym = p.y - mouseY;
                const distMouse = Math.sqrt(dxm * dxm + dym * dym);
                if (distMouse < 200) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouseX, mouseY);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - distMouse / 200) * 0.08})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }

            animationId = requestAnimationFrame(drawParticles);
        }

        canvas.addEventListener('mousemove', function(e) {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });

        canvas.addEventListener('mouseleave', function() {
            mouseX = -9999;
            mouseY = -9999;
        });

        window.addEventListener('resize', resizeCanvas);

        resizeCanvas();
        drawParticles();
    }

    // ========== MENU / NAVIGATION ==========
    window.toggleMenu = function() {
        const menu = document.getElementById('mobileMenu');
        const hamburger = document.querySelector('.hamburger-menu');
        if (menu) {
            menu.classList.toggle('open');
            hamburger.classList.toggle('active');
        }
    };

    window.navigateTo = function(page) {
        window.location.href = page + '.html';
    };

    // ========== PLAYER DESCRIPTION TOGGLE ==========
    window.showDescription = function(playerId) {
        const desc = document.getElementById(playerId);
        if (!desc) return;

        const card = desc.closest('.roster-player-card');
        const isOpen = desc.classList.contains('open');

        const allDescs = document.querySelectorAll('.roster-player-detail');
        allDescs.forEach(d => d.classList.remove('open'));
        document.querySelectorAll('.roster-player-card').forEach(c => c.classList.remove('expanded'));

        if (!isOpen) {
            desc.classList.add('open');
            if (card) card.classList.add('expanded');
        }
    };

    // Legacy player list support (old pages)
    window.showDescriptionLegacy = function(playerId) {
        const desc = document.getElementById(playerId);
        if (!desc) return;

        const allDescs = document.querySelectorAll('.player-description');
        const allBtns = document.querySelectorAll('.player-name-btn');
        const isOpen = desc.classList.contains('open');

        allDescs.forEach(d => d.classList.remove('open'));
        allBtns.forEach(b => b.classList.remove('open'));

        if (!isOpen) {
            desc.classList.add('open');
            const btn = desc.previousElementSibling;
            if (btn) btn.classList.add('open');
        }
    };

    // ========== RANDOM HERO ==========
    async function loadHeroList() {
        try {
            const response = await fetch('heroes/heroes.txt');
            if (!response.ok) throw new Error('Load error: ' + response.status);
            const text = await response.text();
            return text.trim().split('\n').map(n => n.trim()).filter(Boolean);
        } catch (e) {
            console.error('Hero list error:', e);
            return [];
        }
    }

    window.getHero = async function() {
        if (!sessionStorage.herolist) {
            const heroes = await loadHeroList();
            sessionStorage.herolist = JSON.stringify(heroes);
        }

        const heroes = JSON.parse(sessionStorage.herolist);
        if (heroes.length === 0) {
            console.error('Hero list empty!');
            return;
        }

        const idx = Math.floor(Math.random() * heroes.length);
        const hero = heroes[idx];

        document.getElementById('heroName').textContent = hero;
        const img = document.getElementById('heroImage');
        img.src = 'heroes-img/' + hero + '.jpg';
        img.alt = hero;
        document.getElementById('heroWrapper').style.display = 'block';
    };

    // ========== SCROLL ANIMATIONS ==========
    function observeSections() {
        const sections = document.querySelectorAll('.section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(s => {
            s.style.opacity = '0';
            s.style.transform = 'translateY(30px)';
            s.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(s);
        });
    }

    document.addEventListener('DOMContentLoaded', observeSections);
})();
=======
function showDescription(playerId) {
    var allDescriptions = document.querySelectorAll('.player-description');
    
    allDescriptions.forEach(function(desc) {
        if (desc.id !== playerId) {
            desc.style.display = 'none';
        }
    });

    var description = document.getElementById(playerId);
    
    if (description.style.display === 'block') {
        description.style.display = 'none';
    } else {
        description.style.display = 'block';
    }
}

function navigateTo(page) {
    console.log('Навигация на страницу: ' + page);
    window.location.href = page + '.html';
}

async function loadHeroList() {
    try {
        const response = await fetch('heroes/heroes.txt');
        if (!response.ok) {
            throw new Error(`Ошибка загрузки героев: ${response.status}`);
        }
        const text = await response.text();
        const heroNames = text.trim().split('\n');

        return heroNames.map(name => name.trim());
    } catch (error) {
        console.error('Ошибка получения списка героев:', error);
        return [];
    }
}

async function getHero() {
    if (!sessionStorage.herolist) {
        const heroes = await loadHeroList();
        sessionStorage.herolist = JSON.stringify(heroes);
    }

    const heroes = JSON.parse(sessionStorage.herolist);
    if (heroes.length === 0) {
        console.error('Список героев пуст!');
        return;
    }

    const randomIndex = Math.floor(Math.random() * heroes.length);
    const selectedHero = heroes[randomIndex];

    document.getElementById("heroName").textContent = selectedHero;

    const heroImage = document.getElementById("heroImage");
    heroImage.src = `heroes-img/${selectedHero}.jpg`;
    heroImage.alt = `${selectedHero} Image`;

    heroImage.onerror = function() {
        console.error('Ошибка загрузки изображения для героя:', selectedHero);
    };

    document.getElementById("heroWrapper").style.display = "block";
}

function showDetails(page) {
    window.location.href = page;
}

function toggleMenu() {
    const menu = document.getElementById('menu');
    const hamburger = document.querySelector('.hamburger-menu');

    if (menu.style.display === "block") {
        menu.style.display = "none";
        hamburger.classList.remove('active');
        hamburger.classList.remove('moved');
    } else {
        menu.style.display = "block";
        hamburger.classList.add('active');
        hamburger.classList.add('moved');
    }
}
function navigateTo(page) {
    console.log('Навигация на страницу: ' + page);
    window.location.href = page + '.html';
}

function toggleMenu() {
    const menu = document.getElementById('menu');
    const hamburger = document.querySelector('.hamburger-menu');

    if (menu.style.display === "block") {
        menu.style.display = "none";
        hamburger.classList.remove('active');
        hamburger.classList.remove('moved');
    } else {
        menu.style.display = "block";
        hamburger.classList.add('active');
        hamburger.classList.add('moved');
    }
}
>>>>>>> 4cd796a1e1cff1d7410ed31eba7ace8361d810a8
