function showDescription(playerId) {
    // ����� ��� �������� �������
    var allDescriptions = document.querySelectorAll('.player-description');
    
    // ������� ��� ��������
    allDescriptions.forEach(function(desc) {
        if (desc.id !== playerId) {
            desc.style.display = 'none';
        }
    });

    // ����� �������� ��� ���������� ������
    var description = document.getElementById(playerId);
    
    // ����������� ����������� �������� ���������� ������
    if (description.style.display === 'block') {
        description.style.display = 'none';
    } else {
        description.style.display = 'block';
    }
}

function navigateTo(page) {
    window.location.href = page + '.html';
}
