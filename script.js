


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('theme').addEventListener('click', changeTheme);
})

var changedTheme = false;

function changeTheme(){

    if (changedTheme){
        
        let link = document.getElementById("newTheme");
        link.remove();
        document.getElementById('mateDrinker').src = "/images/messimate.jpg";
    }
    else{
        let link = document.createElement('link');
        link.setAttribute("href", "/css/theme.css");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("id", "newTheme");
        document.getElementsByTagName('head')[0].appendChild(link);
        document.getElementById('mateDrinker').src = "/images/obama.jpg";
    }
    changedTheme = !changedTheme;
    changePage('home', 'homeButton')
    
    
}

function changePage(toDisplay, listItem){

    let standardColor = '#4f7942'
    let pickedColor = '#a9ba9d'
    let pages = document.getElementsByClassName('page')
    let buttons = document.getElementsByClassName('menu')
    if (changedTheme) {
        standardColor = '#65755e'
        pickedColor = '#a19065'
    }
    

    for (var i = 0; i<pages.length; i++){
        document.getElementById(pages[i].id).style.display='none';
        document.getElementById(buttons[i].id).style.backgroundColor=standardColor;
    }
    document.getElementById(toDisplay).style.display='inline';
    document.getElementById(listItem).style.backgroundColor=pickedColor;
    
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
