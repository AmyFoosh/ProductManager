class View {

    constructor() {

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- TEMPORARY LIST --

        this.productsListTemporary = [];
        this.sortModeAlphabetical = true;

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

        // Load options on select.
        this.addCategoryItems(this.productCategorySelect);
        this.addCategoryItems(this.searchCategorySelect);

        // Access to display list.
        this.productsList = document.getElementById("products-container");

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

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- ADD LISTENERS (for search product) --

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

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

        // -- ADD NEW PRODUCT --

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

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

        this.loadFilteredList();

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
    }

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

            // If search field is empty, add all items.
            if (this.searchCategoryInput.value === "") return product;

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

    renderProductsList(productsList, updateList = true) {

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

        // -- UPDATE LIST IN CASE updateList IS TRUE --

        if (updateList) this.productsListTemporary = productsList.slice(0);

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

        // -- CLEAR VALUES --

        console.log("Rendering product list.");

        // Clear products list HTML.
        this.productsList.innerHTML = "";

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

        // -- ADD LISTENERS (for CODE, NAME, PRICE AND CATEGORY) --

        // Code.
        tdCodeButton.addEventListener("click", (e) => {

            console.log("tdCodeButton Clicked.");

            // If array is empty, don't sort.
            if (productsList.length === 0) {

                console.log("LIST IS EMPTY");
                return;
            }

            // Sort array.
            if (this.sortModeAlphabetical) {

                productsList.sort((a, b) => {

                    return a.code - b.code;
                });

            } else {

                productsList.reverse();
            }

            this.renderProductsList(productsList, false);
            this.sortModeAlphabetical = (this.sortModeAlphabetical) ? false : true;
        });

        // Name.
        tdNameButton.addEventListener("click", (e) => {

            console.log("tdNameButton Clicked.");

            // If array is empty, don't sort.
            if (productsList.length === 0) return;

            // Sort array.
            if (this.sortModeAlphabetical) {

                productsList.sort((a, b) => {

                    if (a.name < b.name) return - 1;
                    if (a.name > b.name) return 1;
                    return 0;
                });

            } else {

                productsList.reverse();
            }

            // Update array.
            this.renderProductsList(productsList, false);
            this.sortModeAlphabetical = (this.sortModeAlphabetical) ? false : true;
        });

        // Price.
        tdPriceButton.addEventListener("click", (e) => {

            console.log("tdPriceButton Clicked.");

            // If array is empty, don't sort.
            if (productsList.length === 0) return;

            // Sort array.
            if (this.sortModeAlphabetical) {

                productsList.sort((a, b) => {

                    return a.price - b.price;
                });

            } else {

                productsList.reverse();
            }

            // Update array.
            this.renderProductsList(productsList, false);
            this.sortModeAlphabetical = (this.sortModeAlphabetical) ? false : true;
        });

        // Category.
        tdCategoryButton.addEventListener("click", (e) => {

            console.log("tdCategoryButton Clicked.");

            // If array is empty, don't sort.
            if (productsList.length === 0) return;

            // Sort array.
            if (this.sortModeAlphabetical) {

                productsList.sort((a, b) => {

                    if (a.category < b.category) return - 1;
                    if (a.category > b.category) return 1;
                    return 0;
                });

            } else {

                productsList.reverse();
            }

            // Update array.
            this.renderProductsList(productsList, false);
            this.sortModeAlphabetical = (this.sortModeAlphabetical) ? false : true;
        });

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

        // -- ADD ITEMS TO LIST --

        // Add every item to HTML list.
        productsList.forEach((product) => {

            // Create row container.
            let tr = document.createElement("tr");

            // Create cols items.
            let tdCode = document.createElement("td");
            let tdName = document.createElement("td");
            let tdPrice = document.createElement("td");
            let tdCategory = document.createElement("td");
            let tdActions = document.createElement("td");

            // Create button for actions td.
            let deleteButton = document.createElement("button");

            // Set cols values.
            tdCode.innerText = `${product.code}`;
            tdName.innerText = `${product.name}`;
            tdPrice.innerText = `${product.price}`;
            tdCategory.innerText = `${product.category}`;
            deleteButton.innerHTML = "Delete";

            // Add button to las td.
            tdActions.appendChild(deleteButton);

            // Add items to row container.
            tr.appendChild(tdCode);
            tr.appendChild(tdName);
            tr.appendChild(tdPrice);
            tr.appendChild(tdCategory);
            tr.appendChild(tdActions);

            // Add containe to default list.
            this.productsList.appendChild(tr);

            deleteButton.addEventListener("click", (e) => {

                app.deleteProduct(product.id);
                this.loadFilteredList();
            });
        });
    }
}