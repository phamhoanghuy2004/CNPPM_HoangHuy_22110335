require("dotenv").config();
const express = require("express");
const configViewEngine = require("./config/viewEngine");
const apiRoutes = require("./routes/api");
const connection = require("./config/database");
const { getHomepage } = require("./controllers/homeController");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 8888;
app.use(cors()); // config cors
app.use(express.json()); //config req.body cho json
app.use(express.urlencoded({ extended: true})) // for form data

configViewEngine(app); // config template Engine

// config route cho view ejs 
const webAPI = express.Router();
webAPI.get("/", getHomepage);
app.use('/', webAPI);

//Khai bao route cho API
app.use("/v1/api/", apiRoutes);

(async () =>{
    try{
        await connection();
        app.listen(port, ()=>{
            console.log(`Backend Nodejs App listening on port ${port}`);
        })
    }
    catch(err){
        console.log(">>>>>>>>>>> Error: ", err)
    }
})();