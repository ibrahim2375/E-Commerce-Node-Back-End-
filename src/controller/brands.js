const Brand = require('../../models/Brand');

const methods = {
    async getBrands(req, res, next) {
        try {
            await Brand.find().then(brand => {
                if (!brand) return res.status(201).send({ messaage: "no brands founded" });
                return res.status(201).send(brand);
            }).catch(error => {
                return res.status(404).send({ error });
            })
        } catch (error) {
            return res.status(404).send({ error });
        }
    },
    async addBrand(req, res, next) {
        try {
            const file = req.file;
            if (!file) {
                return res.status(403).send({ messaage: 'something wrong' });
            }
            else {
                // ///////////////success
                const newBrand = new Brand({
                    ...req.body, brand_img: file.filename
                });
                await newBrand.save().then((result) => {
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
}

module.exports = { ...methods }