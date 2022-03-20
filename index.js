const PORT = process.env.PORT || 5000;
const getCompras = require("./src/services/compras_notion");
const getProdutos = require("./src/services/produtos_notion");
const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");
const app = express();

app.use(express.static("public"), express.json());

// Compras 

app.get("/compras", async(request, response) => {
    const compras = await getCompras();
    return response.json(compras);
});

let purchases = [];

fs.readFile("purchases.json", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        purchases = JSON.parse(data);
    }
});

app.route('/purchases')
    .get((request, response) => {
        return response.json(purchases);
    })
    .post((request, response) => {
        const {
            ID_da_compra,
            Descricao,
            Data_da_compra,
            Data_do_envio,
            Data_estimada_de_entrega
        } = request.body;
        const purchase = {
            ID_da_compra,
            Descricao,
            Data_da_compra,
            Data_do_envio,
            Data_estimada_de_entrega,
            id: randomUUID(),
        };
        purchases.push(purchase);
        createPurchaseFile();
        return response.json(purchase);
    });

app.route('/purchases/:id')
    .get((request, response) => {
        const { id } = request.params;
        const purchase = purchases.find((purchase) => purchase.id === id);
        return response.json(purchase);
    })
    .put((request, response) => {
        const { id } = request.params;
        const { ID_da_compra, Descricao } = request.body;
        const purchaseIndex = purchases.findIndex((purchase) => purchase.id === id);
        purchases[purchaseIndex] = {
            ...purchases[purchaseIndex],
            ID_da_compra,
            Descricao,
        };
        createPurchaseFile();
        return response.json({
            message: "Compra alterada com sucesso",
        });
    })
    .delete((request, response) => {
        const { id } = request.params;
        const purchaseIndex = purchases.findIndex((purchase) => purchase.id === id);
        purchases.splice(purchaseIndex, 1);
        createPurchaseFile();
        return response.json({
            message: "Compra removida com sucesso",
        });
    });

function createPurchaseFile() {
    fs.writeFile("purchases.json", JSON.stringify(purchases), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Compra inserida");
        }
    });
}

app.get("/compras/:id", async(request, response) => {
    const { id } = request.params;
    const purchase = purchases.find((purchase) => purchase.ID_da_compra === id);
    return response.json(purchase);
});

// Produtos

app.get("/produtos", async(request, response) => {
    const produtos = await getProdutos();
    return response.json(produtos);
});

let products = [];

fs.readFile("products.json", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        products = JSON.parse(data);
    }
});

app.route('/products')
    .get((request, response) => {
        return response.json(products);
    })
    .post((request, response) => {
        const { nome, status } = request.body;
        const product = {
            nome,
            status,
            id: randomUUID(),
        };
        products.push(product);
        createProductFile();
        return response.json(product);
    });

app.route("/products/:id")
    .get((request, response) => {
        const { id } = request.params;
        const product = products.find((product) => product.id === id);
        return response.json(product);
    })
    .put((request, response) => {
        const { id } = request.params;
        const { nome, status } = request.body;
        const productIndex = products.findIndex((product) => product.id === id);
        products[productIndex] = {
            ...products[productIndex],
            nome,
            status,
        };
        createProductFile();
        return response.json({
            message: "Produto alterado com sucesso",
        });
    })
    .delete((request, response) => {
        const { id } = request.params;
        const productIndex = products.findIndex((product) => product.id === id);
        products.splice(productIndex, 1);
        createProductFile();
        return response.json({
            message: "Produto removido com sucesso",
        });
    });

function createProductFile() {
    fs.writeFile("products.json", JSON.stringify(products), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Produto inserido");
        }
    });
}

app.listen(PORT, console.log(`Server started on http://localhost:${PORT}`));