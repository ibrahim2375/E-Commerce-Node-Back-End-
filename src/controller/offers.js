const Offer = require('../../models/Offer');

const methods = {
    async getOffers(req, res, next) {
        try {
            await Offer.find().then(offer => {
                if (!offer) return res.status(201).send({ messaage: "no offers founded" });
                return res.status(201).send(offer);
            }).catch(error => {
                return res.status(404).send({ error });
            })
        } catch (error) {
            return res.status(404).send({ error });
        }
    },
    async addOffer(req, res, next) {
        try {
            const file = req.file;
            if (!file) {
                return res.status(403).send({ messaage: 'something wrong' });
            }
            else {
                // ///////////////success
                const newOffer = new Offer({
                    ...req.body, offer_img: file.filename
                });
                await newOffer.save().then((result) => {
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