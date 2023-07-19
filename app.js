// admin password:mhHDfaZogMoxUhvF
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
// import blogRouter from "./routes/blog-routes.js";
import campaignRouter from "./routes/campaign-routes.js";


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
    .then(() => app.listen(5000))
    .then(() => 
        console.log("Connected To Database and Listening to port 5000")
    )
    .catch((err) => console.log("err"));


    console.log("Working")