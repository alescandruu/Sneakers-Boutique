var tableBody = document.getElementById("tableBody");
var urlInput = document.getElementById("imageUrlInput");
var nameInput = document.getElementById("nameInput");
var brandInput = document.getElementById("brandInput");
var descInput = document.getElementById("descInput");
var priceInput = document.getElementById("priceInput");
var quantityInput = document.getElementById("quantityInput");
var products = [];
var keys = [];

window.addEventListener("load", getData);

function getData() {
    productApi.getProducts()
    .then(function(response){
        keys = Object.keys(response);
        for(let i=0;i<keys.length;i++) {
            var resp1 = response[keys[i]];
            var prod = new product(resp1.brand, resp1.description, resp1.imageUrl, resp1.name, resp1.price, resp1.quantity, keys[i]);
            products.push(prod);
        }
        displayData();
    })
}

function displayData() {
    for(let i=0;i<products.length;i++) {
        var row = document.createElement("tr");
        // var imageCell = document.createElement("td");
        var nameCell = document.createElement("td");
        var priceCell = document.createElement("td");
        var quantityCell = document.createElement("td");
        var removeCell = document.createElement("td");
        // imageCell.innerHTML = "<img src='" + products[i].imageUrl + "'>";
        nameCell.innerHTML = products[i].name;
        priceCell.innerHTML = products[i].price;
        quantityCell.innerHTML = products[i].quantity;
        removeCell.innerHTML = "<button onclick='removeProduct(" + i + ")'>Remove</button>";
        // imageCell.setAttribute("onclick", "showDetails(" + i + ")");
        nameCell.setAttribute("onclick", "showDetails(" + i + ")");
        priceCell.setAttribute("onclick", "showDetails(" + i + ")");
        quantityCell.setAttribute("onclick", "showDetails(" + i + ")");
        // imageCell.style.cursor = "pointer";
        nameCell.style.cursor = "pointer";
        priceCell.style.cursor = "pointer";
        quantityCell.style.cursor = "pointer";
        // row.appendChild(imageCell);
        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(quantityCell);
        row.appendChild(removeCell);
        // row.setAttribute("onclick", "showDetails(" + i + ")");
        tableBody.appendChild(row);
    }
}

function showDetails(i) {
    urlInput.value = products[i].imageUrl;
    nameInput.value = products[i].name;
    brandInput.value = products[i].brand;
    descInput.value = products[i].description;
    priceInput.value = products[i].price;
    quantityInput.value = products[i].quantity;
    document.getElementById("confirmButton").setAttribute("onclick", "updateInfos(" + i + ")");
    document.getElementById("detailsImage").setAttribute("src", products[i].imageUrl);
    document.getElementById("modifyOrAdd").style.display = "flex";
    document.getElementById("inventory").style.margin = "0";
    document.getElementById("inventory").style.marginTop = "3%";
    document.getElementById("inventory").style.marginLeft = "5%";
}

function updateInfos(i) {
    console.log(products);
    products[i].imageUrl = urlInput.value;
    products[i].name = nameInput.value;
    products[i].brand = brandInput.value;
    products[i].description = descInput.value;
    products[i].price = priceInput.value;
    products[i].quantity = quantityInput.value;
    tableBody.innerHTML = "";
    products[i].updateProduct();
    clearInputs();
    displayData();
}

function clearInputs() {
    urlInput.value = "";
    nameInput.value = "";
    brandInput.value = "";
    descInput.value = "";
    priceInput.value = "";
    quantityInput.value = "";
}

function addProduct() {
    clearInputs();
    document.getElementById("detailsImage").setAttribute("src", "images/addprod2.png");
    document.getElementById("confirmButton").setAttribute("onclick", "addProduct1()");
    document.getElementById("modifyOrAdd").style.display = "flex";
    document.getElementById("inventory").style.margin = "0";
    document.getElementById("inventory").style.marginTop = "3%";
    document.getElementById("inventory").style.marginLeft = "5%";
}

function addProduct1() {
    let prod = new product(brandInput.value, descInput.value, urlInput.value, nameInput.value, priceInput.value, quantityInput.value);
    prod.addProduct();
    products.push(prod);
    tableBody.innerHTML = "";
    displayData();
    clearInputs();
}

function removeProduct(i) {
    products[i].deleteProduct();
    products.splice(i,1);
    tableBody.innerHTML = "";
    displayData();
}

document.getElementById("closeButton").addEventListener("click", function (){
    document.getElementById("modifyOrAdd").style.display = "none";
    document.getElementById("inventory").style.margin = "0 auto";
})