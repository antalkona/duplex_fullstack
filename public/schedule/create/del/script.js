// Скрипт для вашей страницы

// Функция для скачивания файла
function downloadFile(fileName) {
    const downloadLink = `${window.location.protocol}//${window.location.host}/calendar/files/${fileName}`;
    window.open(downloadLink, '_blank');
}

// Функция для удаления файла
function deleteFile(id) {
    fetch('/schedule/create/del', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ del: id }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'File deleted successfully') {
                // Если удаление успешно, удаляем соответствующий div
                const divToRemove = document.getElementById(`div-${id}`);
                divToRemove.remove();
            } else {
                console.error('Error deleting file:', data.message);
            }
        })
        .catch(error => console.error('Error deleting file:', error));
}

// Запрос данных с сервера и отображение на странице
fetch('/schedule/create/data')
    .then(response => response.json())
    .then(data => {
        // Сортировка данных по id в порядке убывания
        data.sort((a, b) => b.id - a.id);

        // Создание div-элементов динамически
        const mainContainer = document.getElementById('main-container');

        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'r_cont';
            div.id = `div-${item.id}`;
            div.innerHTML = `
                    <h1 class="date">${item.data}</h1>
                    <div class="buttons">
                        <button class="download btn btn-success" type="button" onclick="downloadFile('${item.name}')">Скачать</button>
                    <button class="delete btn btn-danger" onclick="deleteFile(${item.id})">Удалить</button>
                    </div>
                    
                
            `;
            mainContainer.appendChild(div);
        });
    })
    .catch(error => console.error('Error fetching data:', error));


const currentDomain = window.location.protocol + "//" + window.location.host;

// Формируем ссылку с нужным путем
const uploadLink = document.getElementById('uploadLink');
const uploadLink2 = document.getElementById('uploadLink2');
uploadLink.href = currentDomain + "/schedule/pages";
uploadLink2.href = currentDomain + "/schedule/pages/del";