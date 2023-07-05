class View {

    constructor() {

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- LOAD HTML ELEMENTS --

        // Access to user interaction.
        this.productInput = document.getElementById("product-input");
        this.productBtn = document.getElementById("product-btn");

        // Display list.
        this.productsList = document.getElementById("products-container");

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- ADD LISTENERS --

        // Add product when clicking button.
        this.productBtn.addEventListener("click", (e) => {

            app.createProduct(this.productInput.value);
            this.productInput.value = "";
        });

        // Add product when pressing enter.
        addEventListener("keydown", (e) => {

            if (e.key === "Enter") {

                app.createProduct(this.productInput.value);
                this.productInput.value = "";
            }
        });

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

    // -- OPERATIONS --

    // Load all products stored.
    renderProductsList(products) {

        // Clear entire list.
        this.productsList.innerHTML = "";

        // Loop products to add all elements.
        products.forEach((product) => {

            // Create HTML elements.
            let div = document.createElement("div");
            let p = document.createElement("p");
            let button = document.createElement("button");

            // Set data and values.
            p.innerText = `${product.id} ${product.name}`;
            button.innerText = "Delete";

            // Create item.
            div.appendChild(p);
            div.appendChild(button);

            // Add item to list.
            this.productsList.appendChild(div);

            // Add listener to delete products.
            button.addEventListener("click", (e) => {

                app.deleteProduct(product.id);
            });
        });
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

}