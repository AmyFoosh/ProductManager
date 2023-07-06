class Controller {

    constructor(model, view) {

        this.model = model;
        this.view = view;

        this.view.renderProductsList(this.model.getProducts());
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

    // -- OPERATIONS --

    // Add a product.
    createProduct(productCode, productName) {

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- VALIDATIONS --

        // Check if inputs are empty.
        if (productCode.trim() === "") return;
        if (productName.trim() === "") return;

        // Remove spaces from code.
        productCode = productCode.replaceAll(" ", "");
        // Make all products lower-case.
        productName = productName.toLowerCase();

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- SAVE DATA AND UPDATE DISPLAY --

        this.model.createProduct(productCode, productName);
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