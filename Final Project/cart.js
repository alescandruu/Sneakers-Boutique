var storageKeys = [];
var keys = [];
var l=0;

window.addEventListener("load", setStorage());

function setStorage() {
    let url = location.href;
    let position = url.search("id") + 3;
    let id = url.slice(position);
    if(id) {
        let ok = 1;
        storageKeys = Object.keys(localStorage);
        for(let i=0;i<localStorage.length;i++) {
            if(id === storageKeys[i]) {
                ok=0;
            }
        }
        if(ok === 1) {
            localStorage.setItem(id, 1);
        }
    }
    storageKeys = Object.keys(localStorage);
    getData();
}

function getData() {
    fetch("https://sneaker-boutique-products-default-rtdb.europe-west1.firebasedatabase.app/.json", {method: 'GET'})
    .then(function(response) {
        if(response.ok) {
            return response.json();
        }
    })
    .then(function(response) {
        displayData(response);
        showTotal();
    });
}

function displayData(response) {
    keys = Object.keys(response);
    for(i=0;i<keys.length;i++) {
        let ok = 0;
        for(var j=0;j<storageKeys.length;j++) {
            if(keys[i] === storageKeys[j]) {
                ok=1;
            }
        }
        if(ok === 1) {
            var row = document.createElement("tr");
            var nameCell = document.createElement("td");
            var priceCell = document.createElement("td");
            var quantityCell = document.createElement("td");
            var removeCell = document.createElement("td");
            nameCell.innerHTML = response[keys[i]].name;
            priceCell.innerHTML = response[keys[i]].price + "€";
            priceCell.setAttribute("id", "price" + l);
            quantityCell.innerHTML = "<button onclick='less(" + l + "," + i + ")'>-</button>" + "<span id='" + l + "'>" + window.localStorage.getItem(keys[i]) + "</span>" + "<button onclick='more(" + l + "," + i + ")'>+</button>";
            l++;
            removeCell.innerHTML = "<button onclick='removeProduct(" + i +")'>Remove</button>";
            nameCell.setAttribute("onclick", "showDetails(" + i + ")");
            priceCell.setAttribute("onclick", "showDetails(" + i + ")");
            // quantityCell.setAttribute("onclick", "showDetails(" + i + ")");
            nameCell.style.cursor = "pointer";
            priceCell.style.cursor = "pointer";
            quantityCell.style.cursor = "pointer";
            row.appendChild(nameCell);
            row.appendChild(priceCell);
            row.appendChild(quantityCell);
            row.appendChild(removeCell);
            tableBody.appendChild(row);
        }
    }
}

function removeProduct(i) {
    window.localStorage.removeItem(keys[i]);
    location.reload();
}

function showDetails(i) {
    location.replace("details.html?id=" + keys[i]);
}

function more(l,i) {
    let value = parseInt(document.getElementById(l).innerHTML) + 1;
    console.log(value);
    if(value >= 1) { 
        document.getElementById(l).innerHTML = value;
    }
    window.localStorage.setItem(keys[i], value);
    showTotal();
}

function less(l,i) {
    let value = parseInt(document.getElementById(l).innerHTML) - 1;
    if(value >= 1) { 
        document.getElementById(l).innerHTML = value;
        window.localStorage.setItem(keys[i], value);
    }
    showTotal();
}

function showTotal() {
    let i = Object.keys(localStorage).length;
    console.log(i);
    let total = 0;
    for(let j=0;j<i-1;j++) {
        let quantity = parseInt(document.getElementById(j).innerHTML);
        let price = parseInt(document.getElementById("price" + j).innerHTML);
        total += price * quantity;
    }
    document.getElementById("total").innerHTML = "TOTAL: " + total + "€";
}
