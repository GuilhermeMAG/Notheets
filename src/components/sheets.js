const dotenv = require('dotenv').config()
const getCompras = require('../services/compras_notion');
var axios = require("axios");

function salvar(ID, DateBuy, DateShipping, DateFinish, Description) {
    axios.post('https://sheetdb.io/api/v1/ten2d58oeocj8', {
        "data": {
            "ID da compra": `${ID}`,
            "Data da compra": `${DateBuy}`,
            "Data do envio": `${DateShipping}`,
            "Data estimada de entrega": `${DateFinish}`,
            "Descrição": `${Description}`,
        }
    }, {
        "auth": {
            "username": process.env.USER_NAME1,
            "password": process.env.PASSWORD1
        }
    }).then(response => {
        console.log(response.data)
    })
}

// salvar('66', '43989', '43991', 'June 12, 2020', 'Cadeira')
// salvar()
// console.log(compras)


function coletar() {
    axios.get('https://sheetdb.io/api/v1/b0mh027fqr3xx/keys', {
            "auth": {
                "username": process.env.USER_NAME2,
                "password": process.env.PASSWORD2
            }
        })
        .then(response => {
            console.log(response.data);
        });
}

// coletar()

function ProdutoDe(Descricao) {
    axios.get(`
        https: //sheetdb.io/api/v1/b0mh027fqr3xx/search?'Descrição'=${Descricao}`, {
            "auth": {
                "username": process.env.USER_NAME2,
                "password": process.env.PASSWORD2
            }
        })
        .then(response => {
            const data = response.data;
            const Descricao = data[0]
            const Produto = ID_da_compra.Produto
            console.log(response.data);
        });
}

// ProdutoDe("Cadeira")

function atualizarProduto(Descricao, Produto) {
    axios.patch(`https://sheetdb.io/api/v1/b0mh027fqr3xx/Descrição/${Descricao}`, {
            "data": {
                "Produto": Produto
            }
        }, {
            "auth": {
                "username": process.env.USER_NAME2,
                "password": process.env.PASSWORD2
            }
        })
        .then(response => {
            console.log(response.data);
        });
}

// atualizarProduto("Cadeira", "Produto 1")

async function sendPurshasesToSheets() {
    const compras = await getCompras()
    compras.forEach(compras => {
        axios.post('http://localhost:5001',
            compras
        ).then(response => {
            console.log(response.data)
        })
    })
}
sendPurshasesToSheets()

// const sendPurshasesToSheets = async() => {
//     const compras = await getCompras()
//     compras.forEach(compras => {
//         axios.post('http://localhost:5001',
//             compras
//         ).then(response => {
//             console.log(response.data)
//         })
//     })
// }
// sendPurshasesToSheets()

// function axiosSender(data) {
//     axios.post('http://localhost:5001', data).then(response => {
//         console.log(response.data)
//     })
// }
// axiosSender(compra)