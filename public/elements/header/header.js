document.addEventListener("DOMContentLoaded", function() {
    console.clear()
    if (document.documentElement.clientWidth < 720) {
        let header = document.querySelector('header')
        header.innerHTML = ''
        header.innerHTML = `
            <link rel="stylesheet" href="https://dev-z01.zentas.tech/elements/header/mobile.css">
            <div class="mainHeaderMobile"></div>
        `
    } else {
        console.log("Более 720 пикселей");
    }
});