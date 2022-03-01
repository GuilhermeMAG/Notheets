const dotenv = require("dotenv").config();
const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const database_id = process.env.NOTION_DATABASE_ID_COMPRAS;

async function addItem(text) {
    try {
        const response = await notion.pages.create({
            parent: { database_id: database_id },
            properties: {
                title: {
                    title: [{
                        "text": {
                            "content": text
                        }
                    }]
                }
            },
        })
        console.log(response)
        console.log("Success! Entry added.")
    } catch (error) {
        console.error(error.body)
    }
}

addItem("Test API add item, California")