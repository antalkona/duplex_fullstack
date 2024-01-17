const mainElements = document.querySelectorAll('.main');

function hideAllMainElements() {
    mainElements.forEach(function(element) {
        element.style.display = 'none';
    });
}

function showElement(elementToShow) {
    hideAllMainElements();
    elementToShow.style.display = 'flex';
    elementToShow.style.zIndex = '10';
}

// Пример использования:

const main1 = document.getElementById('main1');
const main2 = document.getElementById('main2');
const main3 = document.getElementById('main3');
const main4 = document.getElementById('main4');
const main5 = document.getElementById('main5');
const main6 = document.getElementById('main6');
const main7 = document.getElementById('main7');

for (let i = 2; i <= 8; i++) {
    const currentMain = document.getElementById('main' + i);
    if (currentMain) {
        currentMain.style.display = 'none';
    }
}

// Показать main1

const jsonKeyInput = document.getElementById('json_key');
const jsonBooleanInput = document.getElementById('json_boolean');
const json1Output = document.getElementById('json1');
const json2Output = document.getElementById('json2');

// Слушатель события ввода для поля json_key
jsonKeyInput.addEventListener('input', function() {
    json1Output.textContent = jsonKeyInput.value;


});

// Слушатель события ввода для поля json_boolean
jsonBooleanInput.addEventListener('input', function() {
    json2Output.textContent = jsonBooleanInput.value;
    if (jsonBooleanInput.value === "True"){
        json2Output.style.color = 'green'
    }
    else if (jsonBooleanInput.value === "False"){
        json2Output.style.color = 'red'
    }
    else{
        json2Output.style.color = 'black'

    }
});
function openModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'block';
}

function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
}


// Получение значения из cookie
function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}
function getCookie2(id) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + id + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}
function getCookie3(authorization) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + authorization + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}
// Присвоение значения переменной userName
const userName = getCookie('name');
const userId = getCookie2('id'); // Замените на реальное имя функции
const auth = getCookie3('authorization'); // Замените на реальное имя функции
const idu = document.getElementById('name');
const lname = document.getElementById('h_name')
const l1 = document.getElementById('loader')
const l2 = document.getElementById('hello')

if (auth === "true") {
    idu.textContent = userName; // Присваиваем значение userName свойству textContent
    lname.textContent = userName
    setTimeout(off, 3000)
    function off(){
        l1.remove()
        setTimeout(off2, 3000)


        function off2() {
            const startHeight = l2.offsetHeight;
            let currentHeight = startHeight;

            function animate() {
                currentHeight -= 50; // Измените этот шаг по вашему усмотрению
                l2.style.height = currentHeight + 'px';

                if (currentHeight > 0) {
                    requestAnimationFrame(animate);
                } else {
                    l2.style.display = 'none'; // Полностью скрываем элемент после завершения анимации
                }
            }

            requestAnimationFrame(animate);
        }
    }

} else {
    location.replace('google.com')
}

// Теперь переменная userName содержит значение из cookie с именем "name"
console.log(userName);
console.log(userId);
console.log(auth);
