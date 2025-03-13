const express = require('express');
const app = express();
require("dotenv").config();
const port = process.env.PORT
const connectDB = require("./src/db");
const orderRouter = require("./src/routes/orderRoute")

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(express.json());

app.get('/health', (req, res) => {
    res.send('Shopping is running!');
});

app.use('/',orderRouter);

(async ()=>{
    try{
        await connectDB();
        console.log("Database is connected for Orders");

        app.listen(port,()=>{
            console.log(`OrderServices is listening at ${port}`)
        })

    }
    catch(error){
        console.log("Failed to connect ", error.message)
        process.exit(1);
    }
})();

