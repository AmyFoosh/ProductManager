class Model {

    constructor() {

        // Array to store all products on local storage.
        if (localStorage.length === 0) localStorage.setItem("products", JSON.stringify([]));

        // Debug.
        // console.log(localStorage.getItem("products"));
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

    // -- Operations --

    // Add a product.
    createProduct(productCode, productName, productPrice, productCategory) {

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // Get access to localStorage items.
        let products = JSON.parse(localStorage.getItem("products"));

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- CREATING AND STORING DATA --

        // Create new ID.
        let id = products.length;
        let idDuplicate;

        do {

            idDuplicate = products.some(product => id === product.id);
            console.log("ID Duplicate: " + idDuplicate);
            if (idDuplicate) id++;

        } while (idDuplicate);



        // Create product object.
        let product = {

            id: id,
            code: productCode,
            name: productName,
            price: productPrice,
            category: productCategory
        };

        // Add product to array.
        products.push(product);

        // Save it again.
        localStorage.setItem("products", JSON.stringify(products));

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

        // -- DEBUG --

        console.log("Added:");
        console.log(product);
        console.log("Products:");
        console.log(products);

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 
    }

    // Removes a product based on its ID, using a filter function.
    deleteProduct(id) {

        // Get access to localStorage items.
        let products = JSON.parse(localStorage.getItem("products"));

        // Use a filter function to remove product.
        products = products.filter((product) => {

            return id !== product.id;
        });

        // Save changes.
        localStorage.setItem("products", JSON.stringify(products));
    }

    // Get all products.
    getProducts() {

        return JSON.parse(localStorage.getItem("products"));
    }

    updateProduct(id, productCode, productName, productPrice, productCategory) {

        // Get access to localStorage items.
        let products = JSON.parse(localStorage.getItem("products"));

        // Find product for id and replace data.
        let product = products.find(p => id === p.id);

        console.log("------------");
        console.log("Find Item:");
        console.log(product);
        console.log("Replace Data:");
        product.code = productCode;
        product.name = productName;
        product.price = productPrice;
        product.category = productCategory;
        console.log(product);
        console.log("------------");

        console.log(products);

        // Save changes.
        localStorage.setItem("products", JSON.stringify(products));
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 
}