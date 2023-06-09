import express  from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import initWebRoutes from "./routes/api"
import ConnectDB from './config/connectDB'

require('dotenv').config();
let app = express();

// app.use(function (req, res, next){
//     res.setHeader('Access-Control-Allow-Origin',process.env.URL_REACT );

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// } )

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// viewEngine(app);
initWebRoutes(app);

ConnectDB();
let port = process.env.PORT || 6969;
//Port === undefined => port = 6969

app.listen(port, ()=> {
    //callback
    console.log("Backend Nodejs is running on the port: " + port);
});
