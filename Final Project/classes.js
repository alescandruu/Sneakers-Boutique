class product {
    constructor(brand, description, imageUrl, name, price, quantity, id) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.brand = brand;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.id = id;
    }

    updateProduct() {
        let api = new productApi(this.id);
        api.updateProductRequest(this.brand, this.description, this.imageUrl, this.name, this.price, this.quantity);
    }

    addProduct() {
        productApi.addProductRequest(this.brand, this.description, this.imageUrl, this.name, this.price, this.quantity);
    }

    deleteProduct() {
        let api = new productApi(this.id);
        api.deleteProductRequest();
    }
}

class productApi {
    constructor(gameId) {
        this.id = gameId;
    }
    static getProducts() {
        return (fetch("https://sneaker-boutique-products-default-rtdb.europe-west1.firebasedatabase.app/.json", {method: 'GET'})
        .then(function(response) {
            if(response.ok) {
                return  response.json();
            }
        })
        .then(function(response) {
            return response;
        }));
    }

    updateProductRequest(brand, description, imageUrl, name, price, quantity) {
        fetch("https://sneaker-boutique-products-default-rtdb.europe-west1.firebasedatabase.app/" + this.id + ".json", {
            method: 'PUT',
            body: JSON.stringify({
                brand: brand,
                description: description,
                imageUrl: imageUrl,
                name: name,
                price: price,
                quantity: quantity
            })
        });
    }

    static addProductRequest(brand, description, imageUrl, name, price, quantity) {
        fetch("https://sneaker-boutique-products-default-rtdb.europe-west1.firebasedatabase.app/.json", {
            method: 'POST',
            body: JSON.stringify({
                brand: brand,
                description: description,
                imageUrl: imageUrl,
                name: name,
                price: price,
                quantity: quantity
            })
        });
    }

    deleteProductRequest() {
        fetch("https://sneaker-boutique-products-default-rtdb.europe-west1.firebasedatabase.app/" + this.id + ".json", {method: 'DELETE'});
    }
}
