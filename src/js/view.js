class View {

    constructor() {

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- LOAD HTML ELEMENTS --

        // Access to user interaction.
        this.productCodeInput = document.getElementById("product-code-input");
        this.productNameInput = document.getElementById("product-name-input");
        this.productBtn = document.getElementById("product-btn");

        // Display list.
        this.productsList = document.getElementById("products-container");

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- ADD LISTENERS --

        // Add product when clicking button.
        this.productBtn.addEventListener("click", (e) => {

            app.createProduct(this.productCodeInput.value, this.productNameInput.value);
            this.productCodeInput.value = "";
            this.productNameInput.value = "";
        });

        // Add product when pressing enter.
        addEventListener("keydown", (e) => {

            if (e.key === "Enter") {

                app.createProduct(this.productCodeInput.value, this.productNameInput.value);
                this.productCodeInput.value = "";
                this.productNameInput.value = "";
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
            let tr = document.createElement("tr");
            let tdCode = document.createElement("td");
            let tdName = document.createElement("td");
            let tdButton = document.createElement("td");
            let button = document.createElement("button");

            // Add CSS class for styling.
            tr.classList.add("products-list-item");

            // Set data and values.
            tdCode.innerText = `${product.code}`;
            tdName.innerText = `${product.name}`;
            button.innerText = "Delete";

            // Create item.
            tdButton.appendChild(button);
            tr.appendChild(tdCode);
            tr.appendChild(tdName);
            tr.appendChild(tdButton);

            // Add item to list.
            this.productsList.appendChild(tr);

            // Add listener to delete products.
            button.addEventListener("click", (e) => {

                app.deleteProduct(product.id);
            });
        });
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

}