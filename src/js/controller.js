class Controller {

    constructor(model, view) {

        this.model = model;
        this.view = view;
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

    // -- OPERATIONS --

    // Add a product.
    createProduct(productName) {

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- VALIDATIONS --

        // Check if input isn't empty.
        if (productName.trim() === "") return;

        // Make all products lower-case.
        productName = productName.toLowerCase();

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- SAVE DATA AND UPDATE DISPLAY --

        this.model.createProduct(productName);
        this.view.renderProductsList(this.model.getProducts());

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 
    }

    // Removes a product based on its ID.
    deleteProduct(id) {

        this.model.deleteProduct(id);
        this.view.renderProductsList(this.model.getProducts());
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 
}