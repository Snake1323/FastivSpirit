function showDescription(playerId) {
    // Найти все описания игроков
    var allDescriptions = document.querySelectorAll('.player-description');
    
    // Закрыть все описания
    allDescriptions.forEach(function(desc) {
        if (desc.id !== playerId) {
            desc.style.display = 'none';
        }
    });

    // Найти описание для выбранного игрока
    var description = document.getElementById(playerId);
    
    // Переключить отображение описания выбранного игрока
    if (description.style.display === 'block') {
        description.style.display = 'none';
    } else {
        description.style.display = 'block';
    }
}

function navigateTo(page) {
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

        // Возвращаем массив имен героев
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
    const randomIndex = Math.floor(Math.random() * heroes.length);
    const selectedHero = heroes[randomIndex];

    document.getElementById("heroName").textContent = selectedHero;
    document.getElementById("heroWrapper").style.display = "block";
}
