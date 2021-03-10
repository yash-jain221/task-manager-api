const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail = (email, name)=>{
    sgMail.send({
        to:email,
        from:'bkyash321@gmail.com',
        subject:'Thanks for joining',
        text:`Welcome to the app, ${name}.`
    })
}

const sendCancellationEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from:'bkyash321@gmail.com',
        subject:'Why are you leaving?',
        text:`Could we do something better, ${name}.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}