let userName;
let userId;
let userPrem;


reqestData()
function reqestData(){
    fetch('/api/admin/req/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            userName = data.userName;
            userId = data.userId;
            userPrem = data.previs;
            console.log(userPrem)
            update()
        })

        .catch(error => {
            console.error('Ошибка при отправке данных:', error);
            location.replace('/api/admin/refresh')
            // Здесь можно выполнить дополнительные действия при ошибке отправки
        });
}
function update(){
    document.getElementById('userName').textContent = userName;
    document.getElementById('mName').textContent = userName;
    document.getElementById('mId').textContent = `ID: ${userId}`;
    const string = userPrem.join(', ');
    document.getElementById('mPrem').textContent = `${string}`;
}

function openC(num){
    const currentDomain = window.location.hostname
    if (num === 1){
        if (userPrem.includes("cms")){
            console.log(currentDomain)
            document.location.replace(`/admin/dashboard`)
        } else {
            document.getElementById('moadl').style.display = 'flex'
        }
    }
    if (num === 2){
        if (userPrem.includes("shed")){
            document.location.replace(`/admin/dashboard/create`)
        } else {
            document.getElementById('moadl').style.display = 'flex'
        }
    }
    if (num === 3){
        if (userPrem.includes("post")){
            document.location.replace(`/admin/dashboard/pages`)
        } else {
            document.getElementById('moadl').style.display = 'flex'
        }
    }
}
function closeModalback() {
    document.getElementById('moadl').style.display = 'none'

}

function submitForm() {
    const formData = new FormData();

    // Добавляем выбранный файл в FormData
    const fileInput = document.getElementById('file-input');
    const files = fileInput.files;
    if (files.length > 0) {
        formData.append('file', files[0]);
        console.log('Добавлен файл в FormData:', files[0].name);
    } else {
        showMessage('Файл не выбран');
        return;
    }

    // Получаем значение из поля формы fileDate
    const fileDateInput = document.getElementById('fileDate');
    const fileDateValue = fileDateInput.value;

    // Добавляем значение в FormData
    formData.append('fileDate', fileDateValue);
    console.log('Данные для отправки на сервер:', formData);

    // Выводим данные перед отправкой запроса
    console.log('Данные для отправки:', {
        file: files[0].name,
        fileDate: fileDateValue
    });

    // Отправляем запрос на сервер
    fetch('/api/admin/sendshed', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            console.log('Ответ от сервера:', data);
            if (data.message) {
                showMessage(data.message);
                setTimeout(hide, 6000);
                function hide(){
                    document.getElementById('message').style.display = 'none';
                }
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}
