function Sendtitle(){
    const title = document.getElementById('floatingInput')
    fetch("/admin/mainpage", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        //make sure to serialize your JSON body
        body: JSON.stringify({
            "title": `${title.value}`,
        })
    })
        .then(response => response.json())  // Обработка ответа в формате JSON
        .then(data => {
            console.log(data);  // Вывод данных в консоль
        })
        .catch(error => {
            console.error('Error:', error);  // Обработка ошибок
        });

}

function carusel(num){
    const text = document.getElementById(`c${num}_title`)
    const img = document.getElementById(`c${num}_img`)
    const card = `card${num}`
    const data = {
        [card]: {
            title: text.value,
            image: img.value,
            link: "null"
        }
    }
    console.log(data);
    fetch("/admin/mainpage", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        //make sure to serialize your JSON body
        body: JSON.stringify(data)

    })
        .then(response => response.json())  // Обработка ответа в формате JSON
        .then(data => {
            console.log(data);  // Вывод данных в консоль
        })
        .catch(error => {
            console.error('Error:', error);  // Обработка ошибок
        });
}

function students() {
    let randomNumber = Math.floor(Math.random() * 900000) + 100000;
    let title = document.getElementById('s_title').value;
    let link = document.getElementById('s_link').value;
    let priority = document.getElementById('s_prior').value;

    let data = {
        id: randomNumber.toString(),
        text: title,
        link: link,
        priority: priority
    };

    fetch('/admin/mainpage/students', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())  // Обработка ответа в формате JSON
        .then(data => {
            console.log(data);  // Вывод данных в консоль
        })
        .catch(error => {
            console.error('Error:', error);  // Обработка ошибок
        });
}

function closeModal(){
    document.getElementById('modal').style.display = 'none'
}
function studentsEdit() {
    const modal = document.getElementById('modal');
    let datai = {};  // Use let instead of const
    modal.style.display = 'flex';

    fetch('/students', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            datai = data;  // Assigning the fetched data to datai
            datai.sort((a, b) => {
                const priorityA = parseInt(a.priority) || 0;
                const priorityB = parseInt(b.priority) || 0;

                return priorityA - priorityB;
            });
            const mainContainer = document.getElementById('container1');

            console.log(datai);
            console.log(datai.length)
            const cont = document.getElementById('container1')
            for (let i = 0; i < datai.length; i++) {
                // Ваш код, который нужно выполнить для каждого элемента массива
                let lesObj = datai[i].id
                let priObj = datai[i].priority
                let txtObj = datai[i].text
                let linObj = datai[i].link
                const div = document.createElement('div');
                div.className = 'objl';
                div.id = `div-${lesObj}`;
                div.innerHTML = `
                    <input type="text" value="${priObj}" class="form-control form-control-sm" id="priority-${lesObj}" placeholder="Приоритет">
                    <input type="text" value="${txtObj}" class="form-control form-control-sm" id="text-${lesObj}" placeholder="Текст">
                    <input type="text" value="${linObj}" class="form-control form-control-sm" id="link-${lesObj}" placeholder="Ссылка">
                    <button type="button" id="edit-${lesObj}" onclick="edit(${lesObj})" class="btn btn-success">Edit</button>
                    <button type="button" id="del-${lesObj}" onclick="del(${lesObj})" class="btn btn-danger">Del</button>                   
            `;
                mainContainer.appendChild(div);}
        })
        .catch(error => {
            console.error('Error:', error);});
}
function del(id){
    let data = {
        del: id.toString()

    }
    console.log(data)
    fetch('/admin/mainpage/students/del', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())  // Обработка ответа в формате JSON
        .then(data => {
            console.log(data);  // Вывод данных в консоль

            document.getElementById(`div-${id}`).style.background = 'red'
            setTimeout(st, 1500)
            function st(){
                document.getElementById(`div-${id}`).remove()


            }
        })
        .catch(error => {
            console.error('Error:', error);  // Обработка ошибок
        });
}
function edit(id){
    let priority = document.getElementById(`priority-${id}`)
    let text = document.getElementById(`text-${id}`)
    let link = document.getElementById(`link-${id}`)
    let data = {
        edit: {
            id: id.toString(),
            priority: priority.value,
            text: text.value,
            link: link.value
        }

    }
    console.log(data)
    fetch('/admin/mainpage/students/del', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())  // Обработка ответа в формате JSON
        .then(data => {
            console.log(data);  // Вывод данных в консоль
            document.getElementById(`div-${id}`).style.background = 'green'
            setTimeout(st, 1500)
            function st(){
                document.getElementById(`div-${id}`).style.background = 'none'

            }
        })
        .catch(error => {
            console.error('Error:', error);  // Обработка ошибок
        });
}