const dotenv = require('dotenv').config()
const { Client } = require('@notionhq/client')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_KEY)

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
        //console.log(page.properties.Name.title[0].text.content)
        return {
            nome: page.properties.Name.title[0].text.content,
            estoqueMin: page.properties.Min_Required.number,
            estoqueAtual: page.properties.Current_Inventory.formula.number,
            status: page.properties.Status.formula.string,
        }
    })
    return produtos
};

function senderEmail() {
    const msg = {
        to: 'g.casagrande@uni9.edu.br', // Change to your recipient
        from: 'guiihmag@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}

senderEmail()