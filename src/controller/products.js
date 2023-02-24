const Product = require('../../models/Product');

const methods = {
    async getProducts(req, res, next) {
        try {
            await Product.find().then(products => {
                if (!products) return res.status(201).send({ messaage: "no products founded" });
                return res.status(201).send(products);
            }).catch(error => {
                return res.status(404).send({ error });
            })
        } catch (error) {
            return res.status(404).send({ error });
        }
    },
    async getProduct(req, res, next) {
        try {
            const { id } = req.params;
            await Product.findById(id).then(product => {
                if (!product) return res.status(201).send({ messaage: "no products founded" });
                return res.status(201).send(product);
            }).catch(error => {
                return res.status(404).send({ error });
            })
        } catch (error) {
            return res.status(404).send({ error });
        }
    },
    async createProduct(req, res, next) {
        try {
            const { avilableColors } = req.body;
            const file = req.file;
            if (!file) {
                return res.status(403).send({ messaage: 'something wrong' });
            }
            else {
                // ///////////////success
                const newProduct = new Product({
                    ...req.body, img: file.filename,
                    $push: { avilableColors: { $each: avilableColors } },
                }
                );
                await newProduct.save().then((result) => {
                    if (!result) return res.status(403).send({ messaage: 'something wrong' });

                    return res.status(200).send(result);
                }).catch((error) => {
                    return res.status(403).send({ error });
                });
                ////////////success
            }

        } catch (error) {
            return res.status(404).send({ error });
        }
    },
    async deleteProduct(req, res, next) {
        try {
            if (req.params.id) {
                await Product.findByIdAndDelete(req.params.id).then((result) => {
                    if (!result) {
                        return res.status(403).send({ message: 'cant delete this product' });
                    } else {
                        return res.status(200).send({ message: 'successfully deleted.' });
                    }
                }).catch((error) => {
                    returnres.status(403).send({ error });
                })
            } else {
                return res.status(404).send({ message: "you cant delete this product" });
            }
        } catch (error) {
            return res.status(404).send({ error });
        }
    },
    async updateProduct(req, res, next) {
        try {
            // const { avilableColors } = req.body;
            const file = req.file;
            // const filter = { _id: req.params.id };
            // await Product.update(filter, { $push: { avilableColors: { $each: ["green", "yellow"] } } }, { upsert: false },).then((result) => {
            //     if (!result) {
            //         return res.status(403).send({ messaage: "somthing wrong" });
            //     } else {
            //         return res.status(200).send({ messaage: 'updated' });
            //     }
            // }).catch((error) => {
            //     return res.status(200).send({ error });
            // })

            await Product.findByIdAndUpdate(req.params.id, {
                $set: {
                    ...req.body,
                    img: file ? file.filename : req.body.img,
                    // $push: { avilableColors: { $each: avilableColors } }
                }
            }).then((result) => {
                if (!result) {
                    return res.status(403).send({ message: "somthing wrong" });
                } else {
                    return res.status(200).send({ message: 'updated' });
                }
            }).catch((error) => {
                return res.status(200).send({ error });
            })

        } catch (error) {
            return res.status(404).send({ error });
        }
    },
    //limited
    async getLatestProduct(req, res, next) {
        try {
            await Product.find().sort({ createdAt: -1 }).limit(20).then((result) => {
                if (!result) {
                    return res.status(403).send({ message: 'somthing wrong' });
                } else {
                    return res.status(200).send(result);
                }
            }).catch((error) => {
                return res.status(403).send({ error });
            })
        } catch (error) {
            return res.status(404).send({ error });
        }
    },
    async getSample(req, res, next) {
        try {
            await Product.aggregate([{ $sample: { size: 20 } }]).then((result) => {
                if (!result) {
                    return res.status(403).send({ message: 'somthing wrong' });
                } else {
                    return res.status(200).send(result);
                }
            }).catch((error) => {
                return res.status(403).send({ error });
            })
        } catch (error) {
            return res.status(404).send({ error });
        }
    },
    async getProductByCategory(req, res, next) {
        try {
            const { category } = req.query;
            await Product.find({ category }).sort({ createdAt: -1 }).then((result) => {
                if (!result) {
                    return res.status(403).send({ message: 'somthing wrong' });
                } else {
                    return res.status(200).send(result);
                }
            }).catch((error) => {
                return res.status(403).send({ error });
            })
        } catch (error) {
            return res.status(404).send({ error });
        }
    },
    async getMostViewedProducts(req, res, next) {
        try {
            //get my  Product
            await Product.find().sort({ views: -1 }).limit(20).then((result) => {
                if (!result) {
                    return res.status(403).send({ message: 'somthing wrong' });
                }
                return res.status(200).send(result);
            }).catch((error) => {
                return res.status(403).send({ error });
            });
        } catch (error) {
            return res.status(404).send({ error });
        }
    },
    async search(req, res, next) {
        try {
            const { search } = req.query;
            //get my  Product
            await Product.find({
                $or: [
                    { name: { $regex: '.*' + search + '.*', $options: '-i' } },
                    { category: { $regex: '.*' + search + '.*', $options: '-i' } },
                ]
            }).then((result) => {
                if (!result) {
                    return res.status(403).send({ message: 'somthing wrong' });
                }
                return res.status(200).send(result);
            }).catch((error) => {
                return res.status(403).send({ error });
            });
        } catch (error) {
            return res.status(404).send({ error });
        }
    },
    async viewProduct(req, res, next) {
        try {
            const { id } = req.params;
            await Product.findByIdAndUpdate(id, {
                $inc: { views: 1 }
            }).then((result) => {
                if (!result) {
                    return res.status(403).send({ message: "somthing wrong" });
                } else {
                    return res.status(200).send({ message: 'viewed' });
                }
            }).catch((error) => {
                return res.status(404).send({ error });
            })

        } catch (error) {
            return res.status(404).send({ error });
        }
    }
}

module.exports = { ...methods }