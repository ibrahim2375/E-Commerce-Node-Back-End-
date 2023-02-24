const Admin = require('../../models/Admin');
const bcrypt = require('bcrypt'); //to hash password
const jwt = require('jsonwebtoken'); //to create access token 

const methods = {
    async register(req, res, next) {
        try {
            const { username, email, password } = req.body;
            //check if email exist or not 
            const existEmail = new Promise((resolve, reject) => {
                Admin.findOne({ email: email }, (error, admin) => {
                    if (error) reject(new Error(error));
                    if (admin) reject({ message: 'please enter unique email address.' });
                    resolve();
                })
            })
            //check if username exist or not 
            const existUsername = new Promise((resolve, reject) => {
                Admin.findOne({ username: username }, (error, username) => {
                    if (error) reject(new Error(error));
                    if (username) reject({ message: 'please enter unique username.' });
                    resolve();
                })
            })
            //resolve all pormises
            Promise.all([existEmail, existUsername]).then(() => {
                if (password) {
                    bcrypt.hash(password, 10).then((hashedPassword) => {
                        const admin = new Admin({
                            username,
                            email,
                            password: hashedPassword,
                        })
                        admin.save().then((result) => {
                            res.status(201).send({ message: 'admin created successfully..' });
                        }).catch((error) => {
                            return res.status(500).send({ error });
                        })

                    }).catch((error) => {
                        return res.status(500).send({ error })
                    })
                }

            }).catch((error) => {
                return res.status(500).send({ error })
            })

        } catch (error) {
            return res.status(500).send(error);
        }
    },
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            await Admin.findOne({ email }).then(admin => {
                bcrypt.compare(password, admin.password).then((checked) => {
                    if (!checked) { return res.status(400).send({ error: "incorrect password" }) }
                    //create jwt token
                    const token = jwt.sign({ adminId: admin._id, username: admin.username }, process.env.JWT_SECRET_KEY_ADMIN, { expiresIn: '24h' });
                    res.status(200).send({
                        message: "logged in successfully",
                        username: admin.username,
                        email: admin.email,
                        token
                    })
                }).catch(error => {
                    return res.status(404).send({ error: "somthing wrong try again" });
                })
            }).catch(error => {
                return res.status(500).send({ error: "admin not founded" });
            })

        } catch (error) {
            return res.status(500).send({ error });
        }
    }
}

module.exports = { ...methods }