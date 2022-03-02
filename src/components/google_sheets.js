const express = require("express");
const { google } = require("googleapis");
const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/", async(req, res) => {
    const { id, Descricao, ID_da_compra, Data_da_compra, Data_do_envio, Data_estimada_de_entrega } = req.body;

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    // Create client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "1Dz4Q_tJK8Ev4UhAeTlT8c9lVHv9uDQXBVbKet2xS0lw";

    // Get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });

    // Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1!A:H",
    });

    // Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:H",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                [ID_da_compra, id, , Data_da_compra, Data_do_envio, Data_estimada_de_entrega, , Descricao]
            ],
        },
    });

    res.send("Successfully submitted! Thank you!");
});

// app.listen(1337, (req, res) => console.log("running on 1337"));
app.listen(PORT, console.log(`Server started on http://localhost:${PORT}`));