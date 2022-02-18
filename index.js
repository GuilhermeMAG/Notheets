const express = require('express')
const getCompras = require('./src/services/compras_notion')
const getProdutos = require('./src/services/produtos_notion')
const PORT = process.env.PORT || 5000

const app = express();

app.use(express.static('public'))

app.get('/compras', async(req, res) => {
    const compras = await getCompras()
    res.json(compras)
})

app.get('/produtos', async(req, res) => {
    const produtos = await getProdutos()
    res.json(produtos)
})

app.listen(PORT, console.log(`Server started on port ${PORT}`))