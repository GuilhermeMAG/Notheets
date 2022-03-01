const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// const msg = {
//     to: 'g.casagrande@uni9.edu.br', // Change to your recipient
//     from: 'guiihmag@gmail.com', // Change to your verified sender
//     subject: 'Sending with SendGrid is Fun',
//     text: 'and easy to do anywhere, even with Node.js',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//     .send(msg)
//     .then(() => {
//         console.log('Email sent')
//     })
//     .catch((error) => {
//         console.error(error)
//     })
module.exports = function senderEmail(subject, text, html) {
    const msg = {
        to: process.env.EMAIL_TO_FIELD, // Change to your recipient
        from: process.env.EMAIL_FROM_FIELD, // Change to your verified sender
        subject: subject,
        text: text,
        html: html,
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
};

// senderEmail('Status do Estoque', `Estoque do Produto ${produtos.nome}`, `<strong> Estoque do produto ${produtos.nome} em estado Crítico </strong>`)