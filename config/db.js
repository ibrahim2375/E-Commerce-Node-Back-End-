const mongoose = require('mongoose');
// Connection URI
const uri = process.env.MONGOOSE_DB;
async function connect_to_db() {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri).then(() => {
        console.log('connected to database successfully...');
    }).catch((error) => {
        console.log(error);
    })
}

module.exports = connect_to_db;

