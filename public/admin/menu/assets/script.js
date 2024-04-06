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
    if (num === 1){
        if (userPrem.includes("cms")){
            location.replace('admin/dashboard')
        } else {
            document.getElementById('moadl').style.display = 'flex'
        }
    }
    if (num === 2){
        if (userPrem.includes("shed")){
            location.replace('admin/dashboard/create')
        } else {
            document.getElementById('moadl').style.display = 'flex'
        }
    }
    if (num === 3){
        if (userPrem.includes("post")){
            location.replace('admin/dashboard/pages')
        } else {
            document.getElementById('moadl').style.display = 'flex'
        }
    }
}
function closeModalback() {
    document.getElementById('moadl').style.display = 'none'

}