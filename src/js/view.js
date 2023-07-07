class View {

    constructor() {

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- LOAD HTML ELEMENTS --

        // Access to user interaction.
        this.productCodeInput = document.getElementById("product-code-input");
        this.productNameInput = document.getElementById("product-name-input");
        this.productPriceInput = document.getElementById("product-price-input");
        this.productBtn = document.getElementById("product-btn");

        // Display list.
        this.productsList = document.getElementById("products-container");

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- ADD LISTENERS --

        // Add product when clicking button.
        this.productBtn.addEventListener("click", (e) => {

            this.addProduct();
        });

        // Add product when pressing enter.
        addEventListener("keydown", (e) => {

            // Check when user hits enter.
            if (e.key === "Enter") this.addProduct();

            // Prevent CTRL + S.
            if (e.ctrlKey && e.key === "s") e.preventDefault();
        });

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // This is a temporary list used to filter products.
        this.products = [];
        this.sortModeAlphabetical = true;

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 
    }

    addProduct() {

        app.createProduct(this.productCodeInput.value, this.productNameInput.value,
            this.productPriceInput.value);

        this.productCodeInput.value = "";
        this.productNameInput.value = "";
        this.productPriceInput.value = "";
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

    // -- OPERATIONS --

    // Load all products stored.
    renderProductsList(products) {

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- CREATING TABLE HEAD ELEMENTS --

        // Add changes to temporary list.
        this.products = products;
        console.log("Temporary: " + this.products);

        // Clear entire list.
        this.productsList.innerHTML = "";

        // Create table elements.
        let tHead = document.createElement("thead");
        let trHead = document.createElement("tr");

        // Create cols.
        let thCode = document.createElement("th");
        let thName = document.createElement("th");
        let thPrice = document.createElement("th");
        let thActions = document.createElement("th");

        // Create buttons for each col.
        let thCodeBtn = document.createElement("button");
        let thNameBtn = document.createElement("button");
        let thPriceBtn = document.createElement("button");

        thCodeBtn.classList.add("table-head-item");
        thNameBtn.classList.add("table-head-item");
        thPriceBtn.classList.add("table-head-item");
        thActions.classList.add("table-head-item");

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- ADD LISTENERS --

        // Sort using code.
        thCodeBtn.addEventListener("click", (e) => {

            // If array is empty, don't sort.
            if (this.products.length === 0) return;

            // Sort array.
            if (this.sortModeAlphabetical) {

                this.products.sort((a, b) => {

                    return a.code - b.code;
                });

            } else {

                this.products.reverse();
            }

            // Update array.
            this.renderProductsList(this.products);
            this.sortModeAlphabetical = (this.sortModeAlphabetical) ? false : true;
        });

        // Sort using name.
        thNameBtn.addEventListener("click", (e) => {

            // If array is empty, don't sort.
            if (this.products.length === 0) return;

            // Sort array.
            if (this.sortModeAlphabetical) {

                this.products.sort((a, b) => {

                    if (a.name < b.name) return - 1;
                    if (a.name > b.name) return 1;
                    return 0;
                });

            } else {

                this.products.reverse();
            }

            // Update array.
            this.renderProductsList(this.products);
            this.sortModeAlphabetical = (this.sortModeAlphabetical) ? false : true;
        });

        // Sort using price.
        thPriceBtn.addEventListener("click", (e) => {

            // If array is empty, don't sort.
            if (this.products.length === 0) return;

            // Sort array.
            if (this.sortModeAlphabetical) {

                this.products.sort((a, b) => {

                    return a.price - b.price;
                });

            } else {

                this.products.reverse();
            }

            // Update array.
            this.renderProductsList(this.products);
            this.sortModeAlphabetical = (this.sortModeAlphabetical) ? false : true;
        });

        // Set values for buttons.
        thCodeBtn.innerText = "Code";
        thNameBtn.innerText = "Product";
        thPriceBtn.innerText = "Price";

        thActions.innerText = "Actions";

        // Add buttons to cols.
        thCode.appendChild(thCodeBtn);
        thName.appendChild(thNameBtn);
        thPrice.appendChild(thPriceBtn);

        // Create items.
        trHead.appendChild(thCode);
        trHead.appendChild(thName);
        trHead.appendChild(thPrice);
        trHead.appendChild(thActions);

        tHead.appendChild(trHead);
        this.productsList.appendChild(tHead);

        // Loop products to add all elements.
        products.forEach((product) => {

            // Create HTML elements.
            let tr = document.createElement("tr");
            let tdCode = document.createElement("td");
            let tdName = document.createElement("td");
            let tdPrice = document.createElement("td");
            let tdButton = document.createElement("td");
            let button = document.createElement("button");

            // Add CSS class for styling.
            tr.classList.add("products-list-item");

            // Set data and values.
            tdCode.innerText = `${product.code}`;
            tdName.innerText = `${product.name}`;
            tdPrice.innerText = `${product.price}`;
            button.innerText = "Delete";

            // Create items.
            tdButton.appendChild(button);
            tr.appendChild(tdCode);
            tr.appendChild(tdName);
            tr.appendChild(tdPrice);
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