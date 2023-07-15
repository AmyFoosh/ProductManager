class Controller {

    constructor(model, view) {

        this.model = model;
        this.view = view;

        this.view.renderProductsList(this.model.getProducts());
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

    // -- OPERATIONS --

    // Add a product.
    createProduct(productCode, productName, productPrice, productCategory) {

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- VALIDATIONS --

        // Remove all items spaces, lower case and with no empty spaces.
        productCode = productCode.trim().toLowerCase().replaceAll(" ", "");
        productName = productName.trim().toLowerCase();
        productPrice = productPrice.trim().toLowerCase().replaceAll(" ", "");

        // Check if inputs are empty.
        if (productCode.trim() === "") return;
        if (productName.trim() === "") return;
        if (productPrice.trim() === "") return;

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- SAVE DATA AND UPDATE DISPLAY --

        this.model.createProduct(productCode, productName, productPrice, productCategory);
        this.view.renderProductsList(this.model.getProducts());

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 
    }

    // Removes a product based on its ID.
    deleteProduct(id) {

        this.model.deleteProduct(id);
        this.view.renderProductsList(this.model.getProducts());
    }

    updateProduct(id, productCode, productName, productPrice, productCategory) {

        console.log("Data received.");
        this.model.updateProduct(id, productCode, productName, productPrice, productCategory);
        this.view.renderProductsList(this.model.getProducts());
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 
}