class Model {

    constructor() {

        // Array to store all products on local storage.
        if (localStorage.length === 0) localStorage.setItem("products", JSON.stringify([]));

        // Debug.
        console.log(localStorage.getItem("products"));
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

    // -- Operations --

    // Add a product.
    createProduct(productCode, productName) {

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // Get access to localStorage items.
        let products = JSON.parse(localStorage.getItem("products"));

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- CREATING AND STORING DATA --

        // Create product object.
        let product = {

            id: products.length,
            code: productCode,
            name: productName
        };

        // Add product to array.
        products.push(product);

        // Save it again.
        localStorage.setItem("products", JSON.stringify(products));

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- DEBUG --

        console.log(product);
        console.log(products);

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 
    }

    // Removes a product based on its ID, using a filter function.
    deleteProduct(id) {

        // Get access to localStorage items.
        let products = JSON.parse(localStorage.getItem("products"));

        // Use a filter function to remove product.
        products = products.filter((product) => {

            return id !== product.id;
        });

        // Save changes.
        localStorage.setItem("products", JSON.stringify(products));
    }

    // Get all products.
    getProducts() {

        return JSON.parse(localStorage.getItem("products"));
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 
}