const mongoose = require('mongoose');


const dbConfig = async () => {

    try {

        const connectionMongo = await mongoose.connect(process.env.MONGO_URI);

        if (connectionMongo) {

            console.log('connection to mongoDB successful...');

        } else {

            console.log('error connecting mongoDB');

        }

    } catch (error) {

        console.log(error);

    }

};


module.exports = {
    dbConfig
}