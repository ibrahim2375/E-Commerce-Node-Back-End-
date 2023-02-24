const Order = require('../../models/Order');

const methods = {
    async getOrders(req, res, next) {
        try {
            const { id } = req.params
            await Order.find({ userId: id }).then(order => {
                if (!order) return res.status(201).send({ messaage: "no orders founded" });
                return res.status(201).send(order);
            }).catch(error => {
                return res.status(404).send({ error });
            })
        } catch (error) {
            return res.status(404).send({ error });
        }
    },
    async addOrder(req, res, next) {
        try {
            // const { userId, productId, size, name, quantity, color, price, img } = req.body
            // ///////////////success
            const neOrder = new Order({
                ...req.body
            });
            await neOrder.save().then((result) => {
                if (!result) return res.status(403).send({ messaage: 'something wrong' });

                return res.status(200).send(result);
            }).catch((error) => {
                return res.status(403).send({ error });
            });
            ////////////success


        } catch (error) {
            return res.status(404).send({ error });
        }
    }, async deleteOrder(req, res, next) {
        try {
            const { id } = req.params
            await Order.findByIdAndDelete(id).then((result) => {
                if (!result) {
                    return res.status(403).send({ message: 'cant delete this product' });
                } else {
                    return res.status(200).send({ message: 'successfully deleted.' });
                }
            }).catch((error) => {
                returnres.status(403).send({ error });
            })

        } catch (error) {
            return res.status(404).send({ error });
        }
    },
}

module.exports = { ...methods }