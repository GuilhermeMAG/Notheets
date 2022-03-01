const PORT = process.env.PORT || 5000;
const getCompras = require("./src/services/compras_notion");
const getProdutos = require("./src/services/produtos_notion");
const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");
const app = express();

app.use(express.static("public"), express.json());

// Compras 

app.get("/compras", async(req, res) => {
    const compras = await getCompras();
    return res.json(compras);
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
        const { ID_da_compra, Descricao } = request.body;
        const purchase = {
            ID_da_compra,
            Descricao,
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

// Produtos

app.get("/produtos", async(req, res) => {
    const produtos = await getProdutos();
    return res.json(produtos);
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

app.listen(PORT, console.log(`Server started on port ${PORT}`));