require('dotenv').config();
const express = require('express');
const app = express();
const cors=require('cors');
const corsOptionsDelegate=require('./config/cors.js')
const cookieParser=require('cookie-parser');
const verifyJWT=require('./middlewares/verifyJWT');
const credentials=require('./middlewares/credentials');
const mongoose= require('mongoose');
const ConnectDB=require('./config/dbConn');
const path =require('path');
const PORT = process.env.PORT || 3500;
ConnectDB();
app.use(cors(corsOptionsDelegate));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
// app.use(credentials);
app.use(express.json());
app.use(express.static(path.join(__dirname,'public','uploads')));
app.use("/products/",express.static(path.join(__dirname,'public','uploads','products')))
app.use("/delivery/",express.static(path.join(__dirname,'public','uploads','delivery')))
app.use("/register",require('./routes/api/register'));
app.use("/auth",require('./routes/api/auth'));
app.use('/refresh',require('./routes/api/refresh'));
app.use('/logout',require('./routes/api/logout'));
app.use(verifyJWT);
app.use('/home',require('./routes/api/home'))
app.use('/order',require('./routes/api/order'))
app.use('/users',require('./routes/api/landingPage'))
app.use('/admin',require('./routes/api/admin'))
app.use('/delivery',require('./routes/api/delivery'))
mongoose.connection.once('open',()=>{
    console.log('Mongodb is connected');
    app.listen(PORT,()=>{
        console.log('server runnning on port '+PORT);
    })
})