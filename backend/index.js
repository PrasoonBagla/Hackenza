const express = require("express");
const cors = require("cors");
const passport = require("passport")
const mongoose = require("mongoose")
require("dotenv").config();
const PORT = process.env.PORT || 9000;

const facultyRouter = require("./routes/faculty");
const adminRouter = require("./routes/admin");
const studentRouter = require("./routes/student")
const apiRouter = require("./routes/api")
const hodRouter = require("./routes/hod");

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(
    cors({
        origin: process.env.ORIGIN,
        methods: "GET,HEAD,PUT,POST,PATCH,DELETE",
        credentials: true,
    })
);
const MONGO_URI = process.env.MONGO_URI;


const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log("Successfully connected to the MongoDB database");
  } catch (error) {
    console.error("Failed to connect to the MongoDB database", error);
    process.exit(1); 
  }
};

connectToDatabase();

app.use("/api", apiRouter);
app.use("/api/admin", adminRouter);
app.use("/api/faculty", facultyRouter);
app.use("/api/student", studentRouter)
app.use("/api/hod", hodRouter)

console.log("Current config : ", process.env.NODE_ENV);
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});