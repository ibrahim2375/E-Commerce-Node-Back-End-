const User = require('../../models/User');
const bcrypt = require('bcrypt'); //to hash password
const jwt = require('jsonwebtoken'); //to create access token 
const otpGenerator = require('otp-generator'); // generate otp to reset user password
// to send mail 
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');


const methods = {
    async register(req, res, next) {
        try {
            const { username, email, password, country, number, address } = req.body;
            //check if email exist or not 
            const existEmail = new Promise((resolve, reject) => {
                User.findOne({ email: email }, (error, user) => {
                    if (error) reject(new Error(error));
                    if (user) reject({ error: 'please enter unique email address.' });
                    resolve();
                })
            })
            //check if username exist or not 
            const existUsername = new Promise((resolve, reject) => {
                User.findOne({ username: username }, (error, username) => {
                    if (error) reject(new Error(error));
                    if (username) reject({ error: 'please enter unique username.' });
                    resolve();
                })
            })
            //resolve all pormises
            Promise.all([existEmail, existUsername]).then(() => {
                if (password) {
                    bcrypt.hash(password, 10).then((hashedPassword) => {
                        const user = new User({
                            username,
                            email,
                            password: hashedPassword,
                            address,
                            country,
                            number,
                        })
                        user.save().then((result) => {
                            res.status(201).send({ message: 'user created successfully..' });
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
            await User.findOne({ email: email }).then(user => {
                bcrypt.compare(password, user.password).then((checked) => {
                    if (!checked) { return res.status(400).send({ error: "incorrect password" }) }
                    //create jwt token
                    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
                    res.status(200).send({
                        message: "logged in successfully",
                        username: user.username,
                        userId: user._id,
                        email: user.email,
                        token
                    })
                }).catch(error => {
                    return res.status(404).send({ error: "somthing wrong try again" });
                })
            }).catch(error => {
                return res.status(500).send({ error: "user not founded" });
            })

        } catch (error) {
            return res.status(500).send({ error });
        }
    },
    async getUser(req, res, next) {
        try {
            const { id } = req.params;
            await User.findById(id).then((user) => {
                if (!user) return res.status(404).send({ error: 'User not found' });
                const { password, ...others } = user?._doc;
                return res.status(201).send(others);

            }).catch(error => {
                return res.status(404).send({ error: 'User not found' });
            })

        } catch (error) {
            return res.status(404).send({ error });
        }
    },
    async getAllUsers(req, res, next) {
        try {
            await User.find().then((users) => {
                if (!users) return res.status(404).send({ error: 'no users founded' });
                return res.status(201).send(users);

            }).catch(error => {
                return res.status(404).send({ error: 'no users founded' });
            })

        } catch (error) {
            return res.status(404).send({ error });
        }
    },
    async updateUser(req, res, next) {
        try {
            const { userId } = req.user;
            const body = req.body;
            if (userId) {
                await User.findByIdAndUpdate(userId, {
                    $set: body
                }).then((result) => {
                    if (!result) {
                        res.status(404).send("somthing wrong");
                    } else {
                        res.status(200).send({ message: "updated successfully.." });
                    }
                }).catch((error) => {
                    return res.status(404).send({ error });
                })
            } else {
                return res.status(404).send({ error: "there is no user id" });
            }

        } catch (error) {
            return res.status(404).send({ error });
        }
    },
    async generateOTP(req, res, next) {
        try {
            const { email } = req.body || req.query;
            req.app.locals.OTP = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
            res.status(201).send({ code: req.app.locals.OTP });

        } catch (error) {
            return res.status(404).send({ error });
        }
    },
    async verifyOTP(req, res, next) {
        try {
            const { code } = req.query;
            if (parseInt(req.app.locals.OTP) === parseInt(code)) {
                req.app.locals.OTP = null;
                req.app.locals.resetSession = true;
                return res.status(201).send({ message: "Verfied Successfully." });
            }
            return res.status(400).send({ message: "Invaild OTP." });
        } catch (error) {
            return res.status(404).send({ error });
        }
    },
    async createResetSession(req, res, next) {
        try {
            if (req.app.locals.resetSession) {
                req.app.locals.resetSession = false; //allow access to this route only once
                return res.status(201).send({ message: "access granted." });
            }
            return res.status(404).send({ message: "session expired!." });
        } catch (error) {
            return res.status(404).send({ error });
        }
    },
    async resetPassword(req, res, next) {
        try {
            if (!req.app.locals.resetSession) return res.status(404).send({ message: "session expired!." });
            const { email, password } = req.body;
            await User.findOne({ email }).then((user) => {
                bcrypt.hash(password, 10).then(hashedPassword => {
                    User.updateOne({ email: email }, {
                        password: hashedPassword
                    }).then((result) => {
                        if (!result) {
                            res.status(404).send({ message: "somthing wrong" });
                        } else {
                            res.status(200).send({ message: "updated successfully.." });
                        }
                    }).catch((error) => {
                        return res.status(404).send({ error });
                    })
                }).catch(error => {
                    return res.status(404).send({ error });
                })
            }).catch((error) => {
                return res.status(404).send({ error: "User Not Founded" });
            })
        } catch (error) {
            return res.status(404).send({ error });
        }
    },
    async sendEmail(req, res, next) {
        try {
            const { email } = req.body;
            //config to send mail from your mail
            let config = {
                service: "gmail",
                auth: {
                    user: "lya325440@gmail.com",
                    pass: ""
                }
            }
            //generate this transport
            let transporter = nodemailer.createTransport(config);


            // send mail with defined transport object
            let message = {
                from: "lya325440@gmail.com",
                to: "lya325440@gmail.com",
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", //
            }

            transporter.sendMail(message, (err, info) => {
                if (err) return res.status(404).json({ err })
                return res.status(201).json({
                    message: "you should receive an email"
                })
            })

        } catch (error) {
            return res.status(404).send({ error });
        }
    },
}

module.exports = { ...methods }