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

fetch('/api/admin/sendshed/dat', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
        // если требуется отправить заголовки авторизации или другие заголовки, их также нужно указать здесь
    },
    // если требуется отправить данные (например, JSON объект), укажите их здесь
    // body: JSON.stringify({ key: 'value' })
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // разбираем JSON ответ
    })
    .then(data => {
        // Упорядочиваем объекты по полю id от большего к меньшему
        data.sort((a, b) => b.id - a.id);
        console.log('Полученная дата:', data);
        const mainContainer = document.getElementById('editBox');
        for (let i = 0; i !== data.length; i++) {
            const div = document.createElement('div');
            div.className = 'shedLine';
            div.id = `div-${data[i].id}`;
            div.innerHTML = `
            <h1 class="date">${data[i].data}</h1>
            <div class="btnBox">
                <button class="downloadBtn" onclick="downloadF(data[i].name)">Скачать</button>
                <button class="delBtn" onclick="delF('${data[i].name}', '${data[i].id}')">Удалить</button>
            </div>`;
            mainContainer.appendChild(div);
        }
    })
    .catch(error => {
        console.error('Ошибка при выполнении запроса:', error);
    });

function delF(dat, id) {
    fetch('/api/admin/sendshed/dat/del', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // если требуется отправить заголовки авторизации или другие заголовки, их также нужно указать здесь
        },
        // если требуется отправить данные (например, JSON объект), укажите их здесь
        body: JSON.stringify({del: dat})
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // разбираем JSON ответ
        })
        .then(data => {
            console.log(data);
            document.getElementById(`div-${id}`).innerHTML = ``
        })
        .catch(error => {
            console.error('Ошибка при выполнении запроса:', error);
        });
}
