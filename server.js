const express = require("express");
const app = express();
require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");

const ErrorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
//port
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use("/api/contacts/", contactRoutes);
app.use("/api/users/", userRoutes);

//Error handler Middleware
app.use(ErrorHandler);

//Mongo DB Conncetion
connectDb();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
