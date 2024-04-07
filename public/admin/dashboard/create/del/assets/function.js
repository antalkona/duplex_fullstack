function openMenu(num){
    if (num === 1){
        document.getElementById('usermenu').style.display = 'flex'
        document.getElementById('iconframe').setAttribute('onclick', 'openMenu(2)');
    }
    if (num === 2){
        document.getElementById('usermenu').style.display = 'none'
        document.getElementById('iconframe').setAttribute('onclick', 'openMenu(1)');
    }
}

