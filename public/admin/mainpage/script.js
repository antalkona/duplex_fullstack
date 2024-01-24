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