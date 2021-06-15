var firsSneaker = document.getElementById("firstSneaker");
var secondSneaker = document.getElementById("secondSneaker");
var mainTitle = document.getElementById("mainTitle");
var movingBck1 = document.getElementById("movingBck1");
var nikeLogo = document.getElementById("nikeLogo");
var movingBck2 = document.getElementById("movingBck2");
var adidasLogo = document.getElementById("adidasLogo")

window.addEventListener("scroll", moveItems);
window.addEventListener("resize", moveItems);

function moveItems() {
    let value = window.scrollY;
    firstSneaker.style.left = window.innerWidth * 0.58 + value * 2.2 + "px";
    secondSneaker.style.left = window.innerWidth *0.26 - value * 2.2 + "px";
    mainTitle.style.bottom  = 0 - value * 2 + "px";
    if(value > window.innerHeight/2) {
        movingBck1.style.right = window.innerWidth * -0.32 + window.innerWidth / window.innerHeight * value * 0.4201 + "px";
        nikeLogo.style.left = window.innerWidth * -0.32 + window.innerWidth / window.innerHeight * value * 0.4201 + "px";
    }
    if(value > 1 * window.innerHeight) {
        movingBck2.style.right = window.innerWidth * -0.68 + window.innerWidth / window.innerHeight * value * 0.302 + "px";
        adidasLogo.style.left = window.innerWidth * -0.68 + window.innerWidth / window.innerHeight * value * 0.302 + "px";
    }
    if(value >  window.innerHeight) {
        movingBck3.style.right = window.innerWidth * -0.48 + window.innerWidth / window.innerHeight * value * 0.1625 + "px";
        vansLogo.style.left = window.innerWidth * -0.48 + window.innerWidth / window.innerHeight * value * 0.1625 + "px";
    }
}

window.addEventListener("load", getData);

function getData() {
    fetch("https://sneaker-boutique-products-default-rtdb.europe-west1.firebasedatabase.app/.json", {method: 'GET'})
    .then(function(response) {
        if(response.ok) {
            return response.json();
        }
    })
    .then(function(response) {
        displayData(response);
    });
}

function displayData(response) {
    let keys = Object.keys(response);
    for(let i=0;i<keys.length;i++) {
        let div = document.createElement("div");
        let name = document.createElement("p");
        div.setAttribute("onclick","detailsOf('" +  keys[i] +"')");
        div.style.backgroundImage = "url(" + response[keys[i]].imageUrl + ")";
        div.style.backgroundSize = "contain";
        div.setAttribute("class", " col-8 col-md-6 col-lg-5 col-xl-3");
        name.innerHTML = response[keys[i]].name;
        div.appendChild(name);
        if(response[keys[i]].brand === "Nike" || response[keys[i]].brand === "nike" || response[keys[i]].brand === "NIKE") {
            document.getElementById("nikeContent").appendChild(div);
        }
        else if(response[keys[i]].brand === "Adidas"|| response[keys[i]].brand === "adidas" || response[keys[i]].brand === "ADIDAS") {
            document.getElementById("adidasContent").appendChild(div);
        }
        else if(response[keys[i]].brand === "Vans" || response[keys[i]].brand === "adidas" || response[keys[i]].brand === "VANS") {
            document.getElementById("vansContent").appendChild(div);
        }
    }
}

var slider1 = document.getElementById("nikeContent");
var isDown1 = false;
var startX1;
var scrollLeft1;
slider1.addEventListener('mousedown', (e) => {
    isDown1 = true;
    slider1.classList.add('active');
    startX1 = e.pageX - slider1.offsetLeft;
    scrollLeft1 = slider1.scrollLeft;
});
slider1.addEventListener('mouseleave', () => {
    isDown1 = false;
    slider1.classList.remove('active');
});
slider1.addEventListener('mouseup', () => {
    isDown1 = false;
    slider1.classList.remove('active');
});
slider1.addEventListener('mousemove', (e) => {
    if(!isDown1) return;
    e.preventDefault();
    const x = e.pageX - slider1.offsetLeft;
    const walk = (x - startX1) * 2; 
    slider1.scrollLeft = scrollLeft1 - walk;
});

var slider2 = document.getElementById("adidasContent");
var isDown2 = false;
var startX2;
var scrollLeft2;
slider2.addEventListener('mousedown', (e) => {
    isDown2 = true;
    slider2.classList.add('active');
    startX2 = e.pageX - slider2.offsetLeft;
    scrollLeft2 = slider2.scrollLeft;
});
slider2.addEventListener('mouseleave', () => {
    isDown2 = false;
    slider2.classList.remove('active');
});
slider2.addEventListener('mouseup', () => {
    isDown2 = false;
    slider2.classList.remove('active');
});
slider2.addEventListener('mousemove', (e) => {
    if(!isDown2) return;
    e.preventDefault();
    const x = e.pageX - slider2.offsetLeft;
    const walk = (x - startX2) * 2; 
    slider2.scrollLeft = scrollLeft2 - walk;
});

var slider3 = document.getElementById("vansContent");
var isDown3 = false;
var startX3;
var scrollLeft3;
slider3.addEventListener('mousedown', (e) => {
    isDown3 = true;
    slider3.classList.add('active');
    startX3 = e.pageX - slider3.offsetLeft;
    scrollLeft3 = slider3.scrollLeft;
});
slider3.addEventListener('mouseleave', () => {
    isDown3 = false;
    slider3.classList.remove('active');
});
slider3.addEventListener('mouseup', () => {
    isDown3 = false;
    slider3.classList.remove('active');
});
slider3.addEventListener('mousemove', (e) => {
    if(!isDown3) return;
    e.preventDefault();
    const x = e.pageX - slider3.offsetLeft;
    const walk = (x - startX3) * 2; 
    slider3.scrollLeft = scrollLeft3 - walk;
});

function detailsOf(id) {
    location.replace("details.html?id=" + id);
}