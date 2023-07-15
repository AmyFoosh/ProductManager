class View {

    constructor() {

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // Temporary array list to avoid calling model every time.
        this.productsListTemporary = [];

        // Sorting mode for list on code, name, price and category.
        this.sortModeAlphabetical = true;

        // Current element being updated.
        this.currentProductID;

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- ACCESS TO HTML ELEMENTS --

        // Access to Add Product elements.
        this.addProductContainer = document.getElementById("add-product-container");
        this.addProductTitle = document.getElementById("add-product-title");
        this.productCodeInput = document.getElementById("product-code-input");
        this.productNameInput = document.getElementById("product-name-input");
        this.productPriceInput = document.getElementById("product-price-input");
        this.productCategorySelect = document.getElementById("product-category-select");
        this.productBtn = document.getElementById("product-btn");
        this.updateBtn = document.getElementById("update-product-btn");
        this.cancelUpdateBtn = document.getElementById("cancel-update-product-btn");

        // Add options to select.
        this.addCategorySelectItems(this.productCategorySelect);

        // Acces to Search Product Elements.
        this.searchCategoryInput = document.getElementById("search-category-input");
        this.searchCategorySelect = document.getElementById("search-category-select");
        this.clearBtn = document.getElementById("clear-btn");

        // Add options to select.
        this.addCategorySelectItems(this.searchCategorySelect);

        // Access to display products list.
        this.productsList = document.getElementById("products-container");

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- ADD LISTENERS --

        // Listeners for Add Product menu.

        // Add product.
        this.productBtn.addEventListener("click", (e) => {

            // Call controller to add product.
            app.createProduct(
                this.productCodeInput.value,
                this.productNameInput.value,
                this.productPriceInput.value,
                this.productCategorySelect.value
            );

            // Clear values for Add Product menu.
            this.productCodeInput.value = "";
            this.productNameInput.value = "";
            this.productPriceInput.value = "";
            this.productCategorySelect.selectedIndex = 0;

            // Update list.
            this.loadFilteredList();
        });

        // Update product.
        this.updateBtn.addEventListener("click", (e) => {

            console.log("Update Clicked.");

            let productCode = this.productCodeInput.value.trim().toLowerCase();
            let productName = this.productNameInput.value.trim().toLowerCase();
            let productPrice = this.productPriceInput.value.trim().toLowerCase();
            let productCategory = this.productCategorySelect.value;

            app.updateProduct(
                this.currentProductID,
                productCode,
                productName,
                productPrice,
                productCategory
            );

            // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

            // Load data into HTML elements.
            this.addProductTitle.innerText = "Add Product";

            this.productBtn.style.display = "inline";
            this.updateBtn.style.display = "none";
            this.cancelUpdateBtn.style.display = "none";

            this.loadFilteredList();

            // Clear values for Add Product menu.
            this.productCodeInput.value = "";
            this.productNameInput.value = "";
            this.productPriceInput.value = "";
            this.productCategorySelect.selectedIndex = 0;
        });

        // Cancel update and go back to Add Product Menu.
        this.cancelUpdateBtn.addEventListener("click", (e) => {

            // Load data into HTMl elements.
            this.addProductTitle.innerText = "Add Product";

            this.productBtn.style.display = "inline";
            this.updateBtn.style.display = "none";
            this.cancelUpdateBtn.style.display = "none";

            this.loadFilteredList();

            // Clear values for Add Product menu.
            this.productCodeInput.value = "";
            this.productNameInput.value = "";
            this.productPriceInput.value = "";
            this.productCategorySelect.selectedIndex = 0;
        });

        // Listeners for Search Product menu.

        // Input search filter.
        this.searchCategoryInput.addEventListener("input", (e) => {

            this.loadFilteredList();
        });

        // Selected item on select.
        this.searchCategorySelect.addEventListener("change", (e) => {

            this.loadFilteredList();
        });

        // Clear fields on search product menu.
        this.clearBtn.addEventListener("click", (e) => {

            // Reset values.
            this.searchCategoryInput.value = "";
            this.searchCategorySelect.selectedIndex = 0;

            // Reload list.
            this.renderProductsList(this.productsListTemporary, false);
        });
    }

    // Load options for HTML select's.
    addCategorySelectItems(selectHTML) {

        // Create all categories avaiables.
        let categories = [
            "all",
            "beauty",
            "kitchen",
            "bedroom",
            "bathroom",
            "garden",
            "lights",
            "tools",
            "food",
            "shoes",
            "clothes",
            "pets",
            "toys",
            "plushies",
            "furniture",
            "homeAppliances",
            "camping",
            "sports"
        ];

        // Add categories to HTML select.
        categories.forEach((category) => {

            let item = document.createElement("option");
            item.innerText = category;
            selectHTML.appendChild(item);
        });
    }

    // Refresh products table using data from "Search Product" menu.
    loadFilteredList() {

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- FILTER BY SELECT OPTION CHOOSED --

        // List that will have all filters.
        let filteredList;

        // Get selected item category.
        let selectedItemCategory =
            this.searchCategorySelect.options
            [this.searchCategorySelect.selectedIndex].value;

        // Load all products.
        if (selectedItemCategory === "all") {

            console.log("Load all items");

            filteredList = this.productsListTemporary.slice(0);

        } else {

            // In case "all" no match, filter specific category.
            filteredList = this.productsListTemporary.filter((product) => {

                if (selectedItemCategory === product.category) {

                    console.log("Match: " + product.category);
                    return product;

                } else {

                    console.log("No match: " + product.category);
                }
            });
        }

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- FILTER BY INPUT --

        filteredList = filteredList.filter((product) => {

            // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

            // -- FILTER ALL ITEMS --

            // Get Search input value.
            let inputValue = this.searchCategoryInput.value.toLowerCase();

            // -- FILTER BY CODE --

            if (product.code.includes(inputValue)) return product;

            // -- FILTER BY NAME --

            if (product.name.includes(inputValue)) return product;

            // -- FILTER BY PRICE --

            if (product.price.includes(inputValue)) return product;
        });

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // Update list.
        this.renderProductsList(filteredList, false);

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 
    }

    // Refresh products table, using data from model.js
    renderProductsList(products, updateList = true) {

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

        // Clear list.
        this.productsList.innerHTML = "";

        if (updateList) this.productsListTemporary = products.slice(0);

        console.log("Loading Products List");
        console.log(products);

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

        // -- ADDING LIST HEADER ITEMS --

        // Create filter elements.
        let tr = document.createElement("tr");

        // Create cols items.
        let tdCode = document.createElement("td");
        let tdName = document.createElement("td");
        let tdPrice = document.createElement("td");
        let tdCategory = document.createElement("td");
        let tdActions = document.createElement("td");

        // Add buttons
        let tdCodeButton = document.createElement("button");
        let tdNameButton = document.createElement("button");
        let tdPriceButton = document.createElement("button");
        let tdCategoryButton = document.createElement("button");

        // Set cols values.
        tdCodeButton.innerText = "Code";
        tdNameButton.innerText = "Name";
        tdPriceButton.innerText = "Price";
        tdCategoryButton.innerText = "Category";
        tdActions.innerHTML = "Actions";

        // Add buttons to cols container.
        tdCode.appendChild(tdCodeButton);
        tdName.appendChild(tdNameButton);
        tdPrice.appendChild(tdPriceButton);
        tdCategory.appendChild(tdCategoryButton);

        // Add items to row container.
        tr.appendChild(tdCode);
        tr.appendChild(tdName);
        tr.appendChild(tdPrice);
        tr.appendChild(tdCategory);
        tr.appendChild(tdActions);

        // Add containe to default list.
        this.productsList.appendChild(tr);

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

        // -- SORTING LIST LISTENERS --

        tdCodeButton.addEventListener("click", (e) => {

            // If array is empty, don't sort.
            if (products.length === 0) return;

            // Sort array.
            if (this.sortModeAlphabetical) {

                products.sort((a, b) => {

                    return a.code - b.code;
                });

            } else {

                products.reverse();
            }

            this.renderProductsList(products);
            this.sortModeAlphabetical = (this.sortModeAlphabetical) ? false : true;
        });

        // Name.
        tdNameButton.addEventListener("click", (e) => {

            // If array is empty, don't sort.
            if (products.length === 0) return;

            // Sort array.
            if (this.sortModeAlphabetical) {

                products.sort((a, b) => {

                    if (a.name < b.name) return - 1;
                    if (a.name > b.name) return 1;
                    return 0;
                });

            } else {

                products.reverse();
            }

            // Update array.
            this.renderProductsList(products);
            this.sortModeAlphabetical = (this.sortModeAlphabetical) ? false : true;
        });

        // Price.
        tdPriceButton.addEventListener("click", (e) => {

            // If array is empty, don't sort.
            if (products.length === 0) return;

            // Sort array.
            if (this.sortModeAlphabetical) {

                products.sort((a, b) => {

                    return a.price - b.price;
                });

            } else {

                products.reverse();
            }

            // Update array.
            this.renderProductsList(products);
            this.sortModeAlphabetical = (this.sortModeAlphabetical) ? false : true;
        });

        // Category.
        tdCategoryButton.addEventListener("click", (e) => {

            console.log("tdCategoryButton Clicked.");

            // If array is empty, don't sort.
            if (products.length === 0) return;

            // Sort array.
            if (this.sortModeAlphabetical) {

                products.sort((a, b) => {

                    if (a.category < b.category) return - 1;
                    if (a.category > b.category) return 1;
                    return 0;
                });

            } else {

                products.reverse();
            }

            // Update array.
            this.renderProductsList(products);
            this.sortModeAlphabetical = (this.sortModeAlphabetical) ? false : true;
        });

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

        // Load list items.
        products.forEach((product) => {

            // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

            // -- CREATE ITEMS DISPLAY --

            // Create row container.
            let tr = document.createElement("tr");

            // Create cols items.
            let tdCode = document.createElement("td");
            let tdName = document.createElement("td");
            let tdPrice = document.createElement("td");
            let tdCategory = document.createElement("td");
            let tdActions = document.createElement("td");

            // Create buttons for actions td.
            let updateButton = document.createElement("button");
            let deleteButton = document.createElement("button");

            // Add styles to buttons.
            updateButton.classList.add("update-list-buttons");
            deleteButton.classList.add("delete-list-buttons");

            // Set cols values.
            tdCode.innerText = `${product.code}`;
            tdName.innerText = `${product.name}`;
            tdPrice.innerText = `${product.price}`;
            tdCategory.innerText = `${product.category}`;
            updateButton.innerHTML = "Update";
            deleteButton.innerHTML = "Delete";

            // Add button to las td.
            tdActions.appendChild(updateButton);
            tdActions.appendChild(deleteButton);

            // Add items to row container.
            tr.appendChild(tdCode);
            tr.appendChild(tdName);
            tr.appendChild(tdPrice);
            tr.appendChild(tdCategory);
            tr.appendChild(tdActions);

            // Add container to default list.
            this.productsList.appendChild(tr);

            // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

            // -- ADD ITEMS LISTENERS --

            // Update item.
            updateButton.addEventListener("click", (e) => {

                // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

                // -- GET ITEM DATA --

                console.log("Update. Product ID: " + product.id);

                this.currentProductID = product.id;

                console.log("CURRENT PRODUCT ID");
                console.log(this.currentProductID);

                // Load data into HTMl elements.
                this.addProductTitle.innerText = "Update Product";
                this.productCodeInput.value = `${product.code}`;
                this.productNameInput.value = `${product.name}`;
                this.productPriceInput.value = `${product.price}`;

                // Add category selected to HTML select.
                for (let i = 0; i < this.productCategorySelect.options.length; i++) {

                    if (product.category === this.productCategorySelect.options[i].value) {

                        console.log("Category Match Found.");
                        this.productCategorySelect.selectedIndex = i;
                        break;
                    }
                }

                // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

                // -- CHANGE TO UPATE DISPLAY --

                this.productBtn.style.display = "none";
                this.updateBtn.style.display = "inline";
                this.cancelUpdateBtn.style.display = "inline";

                // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
            });

            // Delete Item.
            deleteButton.addEventListener("click", (e) => {

                console.log("Delete. Product ID: " + product.id);
                app.deleteProduct(product.id);
                this.loadFilteredList();
            });

            // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
        });

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
    }

}