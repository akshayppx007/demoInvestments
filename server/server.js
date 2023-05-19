const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// config.env file
// dotenv.config();

// Connect to database
connectDatabase();

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server running on port ${port} in ${process.env.NODE_ENV} mode`);
});
