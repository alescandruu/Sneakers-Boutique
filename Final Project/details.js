var image = document.getElementById("sneakerImage");
var name1 = document.getElementById("sneakerName");
var brand = document.getElementById("sneakerBrand");
var desc = document.getElementById("sneakerDesc");
var price = document.getElementById("sneakerPrice");

window.addEventListener("load", getData);

function getData() {
    let url = location.href;
    let position = url.search("id") + 3;
    let id = url.slice(position);
    fetch("https://sneaker-boutique-products-default-rtdb.europe-west1.firebasedatabase.app/" + id +".json", {method: 'GET'})
        .then(function(response) {
            if(response.ok) {
                return  response.json();
            }
        })
        .then(function(response) {
            displayData(response);
        })
}

function displayData(response) {
    image.setAttribute("src", response.imageUrl);
    name1.innerHTML = response.name;
    brand.innerHTML = "Brand: " + response.brand;
    desc.innerHTML = "Description: " + response.description;
    price.innerHTML = "Price: " + response.price + "€";
}

document.getElementById("addToCart").addEventListener("click", addToCart);

function addToCart() {
    let url = location.href;
    let position = url.search("id") + 3;
    let id = url.slice(position);
    location.replace("cart.html?id=" + id);
}