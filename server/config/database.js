const mongoose = require("mongoose");

const connectDatabase = async () => {
    const connect = await mongoose.connect(process.env.DB_URI);
	console.log("Database connected");
};

module.exports = connectDatabase;
