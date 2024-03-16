document.addEventListener("DOMContentLoaded", function() {
    let BurgerOpen = false
    console.clear()
    if (document.documentElement.clientWidth < 720) {
        let header = document.querySelector('header')
        header.innerHTML = ''
        header.innerHTML = `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
            <link rel="stylesheet" href="./elements/header/mobile.css">
            <div class="mainHeaderMobile">
                <img src="https://dev-z01.zentas.tech/elements/header/img/Group%20233.png" alt="" class="mob_logo">
                <img src="https://dev-z01.zentas.tech/elements/header/img/menu-burger.png" id="burgerbtn" alt="" class="mob_menu animate__animated animate__fadeIn">
            </div>
            
        `

        let burger = document.getElementById('burger')
        burger.innerHTML = `
            <div class="mobileBurger animate__animated animate__fadeInRight">
                <div class="MB_line"></div>
                <div class="MB_butbox">
                    <div class="mbb_box">
                        <input type="text" placeholder="Поиск по сайту" class="mb_search">
                        
                    </div>
                    <div class="sico">
                        <img src="https://dev-z01.zentas.tech/elements/header/img/search.png" alt="" class="leftico sicoi">

                    </div>

                    
                </div>
                <div class="MB_butbox">
                    <div class="mbb_box">
                        <img src="https://dev-z01.zentas.tech/elements/header/img/home.png" alt="" class="mbb_img">
                        <h1 class="mbbtitle">Главная</h1>
                        
                    </div>
                    <img src="https://dev-z01.zentas.tech/elements/header/img/leftico.png" alt="" class="leftico">

                    
                </div>
                
                <div class="MB_butbox">
                    <div class="mbb_box">
                        <img src="https://dev-z01.zentas.tech/elements/header/img/school.png" alt="" class="mbb_img">
                        <h1 class="mbbtitle">Школа</h1>
                        
                    </div>
                    <img src="https://dev-z01.zentas.tech/elements/header/img/leftico.png" alt="" class="leftico">

                    
                </div>
                <div class="MB_butbox">
                    <div class="mbb_box">
                        <img src="https://dev-z01.zentas.tech/elements/header/img/news.png" alt="" class="mbb_img">
                        <h1 class="mbbtitle">Новости</h1>
                        
                    </div>
                    <img src="https://dev-z01.zentas.tech/elements/header/img/leftico.png" alt="" class="leftico">

                    
                </div>
                <div class="MB_butbox">
                    <div class="mbb_box">
                        <img src="https://dev-z01.zentas.tech/elements/header/img/shed.png" alt="" class="mbb_img">
                        <h1 class="mbbtitle">Расписание</h1>
                        
                    </div>
                    <img src="https://dev-z01.zentas.tech/elements/header/img/leftico.png" alt="" class="leftico">

                    
                </div>
                <div class="MB_butbox">
                    <div class="mbb_box">
                        <img src="https://dev-z01.zentas.tech/elements/header/img/navigator.png" alt="" class="mbb_img">
                        <h1 class="mbbtitle">Навигация</h1>
                        
                    </div>
                    <img src="https://dev-z01.zentas.tech/elements/header/img/leftico.png" alt="" class="leftico">

                    
                </div>
                <div class="MBLINE"></div>
                <div class="MB_butbox id002">
                    <div id="specialButton" style="cursor: pointer" class="mbb_box">
                        <img src="https://dev-z01.zentas.tech/elements/header/img/glasses.png" alt="" class="mbb_img">
                        <h1 class="mbbtitle id001">Режим для слабовидящих</h1>
                        
                    </div>

                    
                </div>
            </div>
            
        `
        document.getElementById('burgerbtn').addEventListener("click", toggleBurgerMenu);

        function toggleBurgerMenu() {
            if (BurgerOpen) {
                CloseBurgerMunu()
            } else {
                OpenBurgerMunu()
            }
        }
        function OpenBurgerMunu() {
            console.log("test")
            document.getElementById('burger').style.display = "block";
            document.getElementById('burgerbtn').src="https://dev-z01.zentas.tech/elements/header/img/bars-staggered.png"
            BurgerOpen = true
        }
        function CloseBurgerMunu() {
            console.log("test")
            document.getElementById('burger').style.display = "none";
            document.getElementById('burgerbtn').src="https://dev-z01.zentas.tech/elements/header/img/menu-burger.png"
            BurgerOpen = false
        }
    } else {
        console.log("Более 720 пикселей");
    }
});
