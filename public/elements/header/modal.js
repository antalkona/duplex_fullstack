function m_close() {
    const menub = document.getElementById('menub');
    menub.src = "https://dev-z01.zentas.tech/img/menu%201.png";
    menub.setAttribute('onclick', 'navigatorModal()');
    menub.style.scale = '1'

    const modalBg = document.getElementById('mnav');
    modalBg.style.display = 'none';
    const bg = document.getElementById('n_main')
    if (modalBg) {
        bg.innerHTML = ''; // Очищаем содержимое div
    }
}

function navigatorModal() {
    const modalBg2 = document.getElementById('mnav');
    modalBg2.style.display = 'flex';

    const menub = document.getElementById('menub');
    menub.src = '../img/blue.png';
    menub.setAttribute('onclick', 'm_close()');
    menub.style.transform = 'scale(1.2)';
    fetch('/navigator', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            datai = data;  // Присваиваем полученные данные переменной datai
            datai.sort((a, b) => {
                const priorityA = parseInt(a.priority) || 0;
                const priorityB = parseInt(b.priority) || 0;

                return priorityA - priorityB;
            });

            const mainContainer = document.getElementById('n_main');
            const cont = document.getElementById('m_');

            for (let i = 0; i < datai.length; i++) {
                let lesObj = datai[i].id;
                let priObj = datai[i].priority;
                let txtObj = datai[i].text;
                let linObj = datai[i].link;

                const div = document.createElement('div');
                div.className = 'n_pageCard';
                div.id = `div-${lesObj}`;
                div.innerHTML = `<div class="n_pageCard">
                <h1 class="n_pageTitle" onclick="window.location.href='${linObj}'">${txtObj}</h1>
                <img class="arrow" src="">
            </div>`;

                mainContainer.appendChild(div);
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}
