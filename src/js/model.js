class Model {

    constructor() {

        // Array to store all products.
        this.products = [];
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

    // -- Operations --

    // Add a product.
    createProduct(productName) {

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- CREATING AND STORING DATA --

        // Create product object.
        let product = {

            id: this.products.length,
            name: productName
        };

        // Add product to array.
        this.products.push(product);

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- DEBUG --

        console.log(product);
        console.log(this.products);

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 
    }

    // Removes a product based on its ID, using a filter function.
    deleteProduct(id) {

        this.products = this.products.filter((product) => {

            return id !== product.id;
        });
    }

    // Get all products.
    getProducts() {

        return this.products;
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 
}