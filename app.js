// admin password:mhHDfaZogMoxUhvF
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
// import blogRouter from "./routes/blog-routes.js";
import campaignRouter from "./routes/campaign-routes.js";

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

app.use("/api/user", router);
app.use("/api/campaign", campaignRouter);
// app.use("/api/blog", blogRouter);

//connecting to the database cloud

mongoose.connect(
    "mongodb+srv://admin:mhHDfaZogMoxUhvF@cluster0.trvhxcr.mongodb.net/Campaigns?retryWrites=true&w=majority"
    )
    .then(() => app.listen(port))
    .then(() => 
        console.log(`Connected To Database and Listening to port ${port}`)
    )
    .catch((err) => console.log("err"));


    console.log("Working")
    // // "start": "nodemon --experimental-modules --es-module-specifier-resolution=node app.js", //