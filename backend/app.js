const exprss = require('express')
const cors = require('cors')
const app = exprss()
app.use(cors())
const dotenv = require('dotenv')
dotenv.config({path:'./.env'})
const web = require('./routes/web')
const cookieparser = require('cookie-parser')
app.use(cookieparser());
const connectdb = require('./db/connectdb')
const session = require('express-session')
const flash = require('connect-flash')
const fileuploder = require('express-fileupload')
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(session({
    secret:'secret',
    cookie:{maxage:6000},
    resave:false,
    saveUninitialized:false,
}))

//flash message
app.use(flash());

// file uploder
app.use(fileuploder({ useTempFiles: true }))

//cors 


app.use(exprss.json())

// use for route https://localhost/job portal 
app.use('/jobportalApi',web)

connectdb()






app.listen(process.env.PORT,()=>{console.log(`Server log On localhost : ${process.env.PORT}`)})
