const dotenv = require('dotenv').config()
const { Client } = require('@notionhq/client')
const senderEmail = require('./send_email')

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
})

const database_id_produtos = process.env.NOTION_DATABASE_ID_PRODUTOS

module.exports = async function getProdutos() {
    const payload = {
        path: `databases/${database_id_produtos}/query`,
        method: 'POST',
    }

    const { results } = await notion.request(payload)

    const produtos = results.map((page) => {
        //Console.Log para ajudar a inserir campos
        //console.log(page.properties.Status.formula.string)
        return {
            nome: page.properties.Name.title[0].text.content,
            estoqueMin: page.properties.Min_Required.number,
            estoqueAtual: page.properties.Current_Inventory.formula.number,
            status: page.properties.Status.formula.string,
        }
    })
    return produtos
};

// senderEmail('Status do Estoque', `Estoque do Produto`, `<strong> Estoque do produto em estado Crítico </strong>`)