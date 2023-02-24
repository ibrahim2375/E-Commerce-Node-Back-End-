const Category = require('../../models/Category');

const methods = {
    async getCategories(req, res, next) {
        try {
            await Category.find().then(category => {
                if (!category) return res.status(201).send({ messaage: "no categories founded" });
                return res.status(201).send(category);
            }).catch(error => {
                return res.status(404).send({ error });
            })
        } catch (error) {
            return res.status(404).send({ error });
        }
    },
    async addCategory(req, res, next) {
        try {
            const file = req.file;
            if (!file) {
                return res.status(403).send({ messaage: 'something wrong' });
            }
            else {
                // ///////////////success
                const newCategory = new Category({
                    ...req.body, img: file.filename
                });
                await newCategory.save().then((result) => {
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