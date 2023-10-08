const dotenv = require('dotenv');

dotenv.config();

exports.MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://user:password@shyni.x3spvzs.mongodb.net/database?retryWrites=true&w=majority";
