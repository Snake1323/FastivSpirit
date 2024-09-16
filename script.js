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
