function submitForm() {
    const form = document.getElementById('uploadForm');

    // Создаем объект FormData для передачи данных формы
    const formData = new FormData(form);

    fetch('/schedule/create', {
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
uploadLink.href = currentDomain + "/schedule/pages";
uploadLink2.href = currentDomain + "/schedule/pages/del";