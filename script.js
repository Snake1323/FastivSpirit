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
