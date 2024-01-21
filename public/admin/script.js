function submitForm() {
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;
    const currentURL = window.location.href;


    fetch(currentURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login: user, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Успешная авторизация') {
                const { id, lgoin, name } = data.user;

                const expiration = 60 * 60 * 24 * 3; // Время жизни куки - 3 дня

                document.cookie = `id=${id}; max-age=${expiration}`;
                document.cookie = `login=${lgoin}; max-age=${expiration}`;
                document.cookie = `name=${name}; max-age=${expiration}`;
                document.cookie = `authorization=true; max-age=${expiration}`;

                // Показываем сообщение о успешной авторизации
                document.getElementById('authResponse').style.left = '2%';
                document.getElementById('authResponse').style.display = 'block';

                document.getElementById('authResponse').style.left = '2%';
                document.getElementById('authResponse').style.display = 'block';

                async function updateText() {
                    for (let i = 5; i >= 0; i--) {
                        document.getElementById('authtime').textContent = i;
                        console.log(i);

                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
                }

                updateText();

                //document.getElementById('authResponse').innerText = JSON.stringify(data);

                // Отложенная переадресация на другую страницу через 5 секунд
                setTimeout(() => {
                    window.location.href = `${currentURL}dashboard`;
                }, 5000);
            } else {
                console.log('Ошибка авторизации:', data.error);
            }
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
        });
}
document.addEventListener("DOMContentLoaded", function() {
    // Проверяем, есть ли в адресной строке хэш-тег #authrestnt
    if (window.location.hash === '#authrestnt') {
        // Ваш код или вызов функции, который должен выполниться при срабатывании условия
        yourFunction();
    }
});

function yourFunction() {
    // Здесь ваш код или функция, которая должна выполниться
    document.getElementById('authResponse2').style.display = 'block'    // Дополнительные действия
}