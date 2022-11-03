function changePage(toDisplay, listItem){
    let pages = document.getElementsByClassName('page')
    let buttons = document.getElementsByClassName('menu')
    for (var i = 0; i<pages.length; i++){
        document.getElementById(pages[i].id).style.display='none';
        document.getElementById(buttons[i].id).style.backgroundColor='#a9ba9d'
    }
    document.getElementById(toDisplay).style.display='inline';
    document.getElementById(listItem).style.backgroundColor='#4f7942'
}

function openShop(toOpen){
    let shop = document.getElementById(toOpen);

    if (shop.style.display == "inline"){
        shop.style.display = "none";
    }
    else{
        shop.style.display = 'inline';
    }
}
