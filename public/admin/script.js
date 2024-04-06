function submitForm() {
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;
    const currentURL = window.location.href;


    fetch('/api/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: user, password: password })
    })
        .then(response => response.json())
        .then(data => {

            location.replace('/admin/menu')
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
        });
}