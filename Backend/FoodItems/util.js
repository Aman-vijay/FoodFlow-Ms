const dotenv = require("dotenv");
dotenv.config(); 


const  FRONTEND_URL = process.env.PROD? process.env.PROD_FRONTEND_URL: process.env.LOCAL_FRONTEND_URL

module.exports = {FRONTEND_URL}