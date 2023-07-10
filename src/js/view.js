class View {

    constructor() {

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- LOAD HTML ELEMENTS --

        // Access to elements on Add Product.
        this.productCodeInput = document.getElementById("product-code-input");
        this.productNameInput = document.getElementById("product-name-input");
        this.productPriceInput = document.getElementById("product-price-input");
        this.productCategorySelect = document.getElementById("product-category-select");
        this.productBtn = document.getElementById("product-btn");

        // Acces to elements on Search Product.
        this.searchCategoryInput = document.getElementById("search-category-input");
        this.searchCategorySelect = document.getElementById("search-category-select");
        this.clearBtn = document.getElementById("clear-btn");

        this.addCategoryItems(this.productCategorySelect);
        this.addCategoryItems(this.searchCategorySelect);

        // Display list.
        this.productsList = document.getElementById("products-container");

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // These are temporary lists used to filter products.
        this.productsTemporary = [];
        this.productsFiltered = [];
        this.sortModeAlphabetical = true;

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- ADD LISTENERS (for add product) --

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

        // -- ADD LISTENERS (for search product) --

        // Filter product by its category.
        this.searchCategorySelect.addEventListener("change", (e) => {

            // Get category value.
            let categorySelected =
                this.searchCategorySelect.options
                [this.searchCategorySelect.selectedIndex].value;

            console.log("Category: " + categorySelected);

            // Load entire list again if value is "all".
            if (categorySelected === "all") {

                // Refresh products filtered array.
                this.productsFiltered = this.productsTemporary.slice(0);

                // Render products filtered array.
                this.renderProductsList(this.productsFiltered, false);
                console.log("Products filtered.");
                console.log(this.productsFiltered);
                return;
            }

            // Filter items based on category selected if value isn't "all".
            this.productsFiltered = this.productsTemporary.filter((product) => {

                console.log(product.category);

                // Return value in case of match.
                if (product.category === categorySelected) return product;
            });

            // Render list with all mathces.
            this.renderProductsList(this.productsFiltered, false);
            console.log("Products filtered.");
            console.log(this.productsFiltered);
            console.log("Products temporary.");
            console.log(this.productsTemporary);
        });

        // Clear fields on search product menu.
        this.clearBtn.addEventListener("click", (e) => {

            // Reset values.
            this.searchCategoryInput.value = "";
            this.searchCategorySelect.selectedIndex = 0;

            // Reload list.
            this.productsFiltered = this.productsTemporary.slice(0);
            this.renderProductsList(this.productsFiltered, false);
        });

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 
    }

    addCategoryItems(selectHTML) {

        // Create all categories for category options.
        let categoryItems = {

            all: "all",
            beauty: "beauty",
            kitchen: "kitchen",
            bedroom: "bedroom",
            bathroom: "bathroom",
            garden: "garden",
            lights: "lights",
            tools: "tools",
            food: "food",
            shoes: "shoes",
            clothes: "clothes",
            pets: "pets",
            toys: "toys",
            plushies: "plushies",
            furniture: "furniture",
            homeAppliances: "home appliances",
            camping: "camping",
            sports: "sports"
        };

        // Create options elements.
        let allCategory = document.createElement("option");
        let beautyCategory = document.createElement("option");
        let kitchenCategory = document.createElement("option");
        let bedroomCategory = document.createElement("option");
        let bathroomCategory = document.createElement("option");
        let gardenCategory = document.createElement("option");
        let lightsCategory = document.createElement("option");
        let toolsCategory = document.createElement("option");
        let foodCategory = document.createElement("option");
        let shoesCategory = document.createElement("option");
        let clothesCategory = document.createElement("option");
        let petsCategory = document.createElement("option");
        let toysCategory = document.createElement("option");
        let plushiesCategory = document.createElement("option");
        let furnitureCategory = document.createElement("option");
        let homeAppliancesCategory = document.createElement("option");
        let campingCategory = document.createElement("option");
        let sportsCategory = document.createElement("option");

        // Add text.
        allCategory.innerText = categoryItems.all;
        beautyCategory.innerText = categoryItems.beauty;
        kitchenCategory.innerText = categoryItems.kitchen;
        bedroomCategory.innerText = categoryItems.bedroom;
        bathroomCategory.innerText = categoryItems.bathroom;
        gardenCategory.innerText = categoryItems.garden;
        lightsCategory.innerText = categoryItems.lights;
        toolsCategory.innerText = categoryItems.tools;
        foodCategory.innerText = categoryItems.food;
        shoesCategory.innerText = categoryItems.shoes;
        clothesCategory.innerText = categoryItems.clothes;
        petsCategory.innerText = categoryItems.pets;
        toysCategory.innerText = categoryItems.toys;
        plushiesCategory.innerText = categoryItems.plushies;
        furnitureCategory.innerText = categoryItems.furniture;
        homeAppliancesCategory.innerText = categoryItems.homeAppliances;
        campingCategory.innerText = categoryItems.camping;
        sportsCategory.innerText = categoryItems.sports;

        // Add options elements to category.
        selectHTML.appendChild(allCategory);
        selectHTML.appendChild(beautyCategory);
        selectHTML.appendChild(kitchenCategory);
        selectHTML.appendChild(bedroomCategory);
        selectHTML.appendChild(bathroomCategory);
        selectHTML.appendChild(gardenCategory);
        selectHTML.appendChild(lightsCategory);
        selectHTML.appendChild(toolsCategory);
        selectHTML.appendChild(foodCategory);
        selectHTML.appendChild(shoesCategory);
        selectHTML.appendChild(clothesCategory);
        selectHTML.appendChild(petsCategory);
        selectHTML.appendChild(toysCategory);
        selectHTML.appendChild(plushiesCategory);
        selectHTML.appendChild(furnitureCategory);
        selectHTML.appendChild(homeAppliancesCategory);
        selectHTML.appendChild(campingCategory);
        selectHTML.appendChild(sportsCategory);
    }

    addProduct() {

        // Call function to create product.
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

        // Clear values for Search Product menu.
        this.searchCategoryInput.value = "";
        this.searchCategorySelect.selectedIndex = 0;
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

    // -- OPERATIONS --

    // Load all products stored.
    renderProductsList(products, updateList = true) {

        console.log("updateList: " + updateList);

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- CREATING TABLE HEAD ELEMENTS --

        // Add changes to temporary list.
        if (updateList) {
            this.productsTemporary = products.slice(0);
            this.productsFiltered = products.slice(0);
        }
        console.log(this.productsTemporary);

        // Clear entire list.
        this.productsList.innerHTML = "";

        // Create table elements.
        let tHead = document.createElement("thead");
        let trHead = document.createElement("tr");

        // Create cols.
        let thCode = document.createElement("th");
        let thName = document.createElement("th");
        let thPrice = document.createElement("th");
        let thCategory = document.createElement("th");
        let thActions = document.createElement("th");

        // Create buttons for each col.
        let thCodeBtn = document.createElement("button");
        let thNameBtn = document.createElement("button");
        let thPriceBtn = document.createElement("button");
        let thCategoryBtn = document.createElement("button");

        thCodeBtn.classList.add("table-head-item");
        thNameBtn.classList.add("table-head-item");
        thPriceBtn.classList.add("table-head-item");
        thCategoryBtn.classList.add("table-head-item");
        thActions.classList.add("table-head-item");

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- ADD LISTENERS --

        // Sort using code. NUMBER
        thCodeBtn.addEventListener("click", (e) => {

            // If array is empty, don't sort.
            if (this.productsFiltered.length === 0) {

                console.log("LIST IS EMPTY");
                return;
            }

            // Sort array.
            if (this.sortModeAlphabetical) {

                this.productsFiltered.sort((a, b) => {

                    return a.code - b.code;
                });

            } else {

                this.productsFiltered.reverse();
            }

            // Update array.
            this.renderProductsList(this.productsFiltered, false);
            this.sortModeAlphabetical = (this.sortModeAlphabetical) ? false : true;
        });

        // Sort using name. STRING
        thNameBtn.addEventListener("click", (e) => {

            // If array is empty, don't sort.
            if (this.productsFiltered.length === 0) return;

            // Sort array.
            if (this.sortModeAlphabetical) {

                this.productsFiltered.sort((a, b) => {

                    if (a.name < b.name) return - 1;
                    if (a.name > b.name) return 1;
                    return 0;
                });

            } else {

                this.productsFiltered.reverse();
            }

            // Update array.
            this.renderProductsList(this.productsFiltered, false);
            this.sortModeAlphabetical = (this.sortModeAlphabetical) ? false : true;
        });

        // Sort using price. NUMBER
        thPriceBtn.addEventListener("click", (e) => {

            // If array is empty, don't sort.
            if (this.productsFiltered.length === 0) return;

            // Sort array.
            if (this.sortModeAlphabetical) {

                this.productsFiltered.sort((a, b) => {

                    return a.price - b.price;
                });

            } else {

                this.productsFiltered.reverse();
            }

            // Update array.
            this.renderProductsList(this.productsFiltered, false);
            this.sortModeAlphabetical = (this.sortModeAlphabetical) ? false : true;
        });

        // Sort using category. STRING
        thCategoryBtn.addEventListener("click", (e) => {

            // If array is empty, don't sort.
            if (this.productsFiltered.length === 0) return;

            // Sort array.
            if (this.sortModeAlphabetical) {

                this.productsFiltered.sort((a, b) => {

                    if (a.category < b.category) return - 1;
                    if (a.category > b.category) return 1;
                    return 0;
                });

            } else {

                this.productsFiltered.reverse();
            }

            // Update array.
            this.renderProductsList(this.productsFiltered, false);
            this.sortModeAlphabetical = (this.sortModeAlphabetical) ? false : true;
        });

        // Set values for buttons.
        thCodeBtn.innerText = "Code";
        thNameBtn.innerText = "Product";
        thPriceBtn.innerText = "Price";
        thCategoryBtn.innerText = "Category";
        thActions.innerText = "Actions";

        // Add buttons to cols.
        thCode.appendChild(thCodeBtn);
        thName.appendChild(thNameBtn);
        thPrice.appendChild(thPriceBtn);
        thCategory.appendChild(thCategoryBtn);

        // Create items.
        trHead.appendChild(thCode);
        trHead.appendChild(thName);
        trHead.appendChild(thPrice);
        trHead.appendChild(thCategory);
        trHead.appendChild(thActions);

        tHead.appendChild(trHead);
        this.productsList.appendChild(tHead);

        // Loop products to add all elements.
        products.forEach((product) => {

            // Create HTML elements.
            let tr = document.createElement("tr");

            let tdCode = document.createElement("td");
            let tdProduct = document.createElement("td");
            let tdPrice = document.createElement("td");
            let tdCategory = document.createElement("td");
            let tdActions = document.createElement("td");

            let actionsBtn = document.createElement("button");

            // Add CSS class for styling.
            tr.classList.add("products-list-item");

            // Set data and values.
            tdCode.innerText = `${product.code}`;
            tdProduct.innerText = `${product.name}`;
            tdPrice.innerText = `${product.price}`;
            tdCategory.innerText = `${product.category}`;
            actionsBtn.innerText = "Delete";

            // Create items.
            tdActions.appendChild(actionsBtn);
            tr.appendChild(tdCode);
            tr.appendChild(tdProduct);
            tr.appendChild(tdPrice);
            tr.appendChild(tdCategory);
            tr.appendChild(tdActions);

            // Add item to list.
            this.productsList.appendChild(tr);

            // Add listener to delete products.
            actionsBtn.addEventListener("click", (e) => {

                app.deleteProduct(product.id);
            });
        });
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

}