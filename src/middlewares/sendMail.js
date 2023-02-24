const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const sendMail = async (req, res, next) => {
    try {

        const { email } = req.body;
        const { code } = req.query;
        //config to send mail from your mail
        let config = {
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        }
        //generate this transport
        let transporter = nodemailer.createTransport(config);
        //use mailgen to generate email theme and body in email
        let MailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Mailgen",
                link: 'https://mailgen.js/'
            }
        })
        //body
        let response = {
            body: {
                name: "ShopCart",
                intro: "Your Code Recived!",
                table: {
                    data: [
                        {
                            code: `Code is : ${code}`,
                        }
                    ]
                },
                outro: "End of mail."
            }
        }

        let mail = MailGenerator.generate(response)

        let emailMessage = {
            from: process.env.EMAIL,
            to: email,
            subject: "Reset Password",
            html: mail
        }

        await transporter.sendMail(emailMessage).then(info => {
            return res.status(201).send({ message: "you should recive an message", preview: nodemailer.getTestMessageUrl(info) });
        }).catch(error => {
            return res.status(500).send({ error })
        })
        next();

    } catch (error) {
        return res.status(404).send({ error })
    }
}
module.exports = sendMail