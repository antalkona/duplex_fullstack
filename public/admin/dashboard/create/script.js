function submitForm() {
    const form = document.getElementById('uploadForm');

    // Создаем объект FormData для передачи данных формы
    const formData = new FormData(form);

    fetch('/admin/dashboard/create', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                document.getElementById('message').style.display = 'block'
                showMessage(data.message);
                setTimeout(hide, 6000)
                function hide(){
                    document.getElementById('message').style.display = 'none'

                }
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function showMessage(message) {
    const messageElement = document.getElementById('message');
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.style.display = 'block';
    }
}


const currentDomain = window.location.protocol + "//" + window.location.host;

const uploadLink = document.getElementById('uploadLink');
const uploadLink2 = document.getElementById('uploadLink2');
uploadLink.href = currentDomain + "/admin/dashboard/pages";
uploadLink2.href = currentDomain + "/admin/dashboard/pages/del";

// Проверка значения куки "authorization"
const authorizationCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('authorization='));

if (authorizationCookie && authorizationCookie.split('=')[1] === 'true') {
    // Если кука "authorization" равна 'true', ничего не делаем
    console.log('Authorization is true');
} else {
    // Если кука "authorization" отсутствует или её значение не равно 'true', удаляем все куки и переадресуем на сайт Google
    document.cookie.split('; ').forEach(cookie => {
        const [name] = cookie.split('=');
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    });

    href = location.origin
    location.replace(href + '/admin')
}
