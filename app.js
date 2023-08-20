const express               =require('express');
const app                   =express();
const mongoose              =require('mongoose');
const flash                 =require('connect-flash');
const bodyParser            =require('body-parser');


const passport              =require("passport");
const LocalStrategy         =require("passport-local");
const passportLocalMongoose =require("passport-local-mongoose");

const User                  = require("./models/user");
const Patient               = require('./models/patient');
const Doctor                = require('./models/doctor');


const doctorRoutes         = require("./routes/doctor");
const patientsRoutes       = require("./routes/patients");
const indexRoutes          = require("./routes/index");
const trackRoutes          = require("./routes/track");


mongoose.connect('mongodb+srv://yadavanujaditya:anujyadav@earlyappointment.ixv7a.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    }).then(() =>{
        console.log("connected to databse")
    }).catch(err =>{
          console.log('ERROR:', err.message);
    })
   


app.use(bodyParser.urlencoded({extended:true}));
app.use('/public',express.static("./public"));
app.set('view engine','ejs');

app.use(flash());
app.use(require("express-session")({
  secret:"Aditya is the pure love",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==========================================================================================


app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.errors=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});


app.use(indexRoutes);
app.use( patientsRoutes);
app.use(doctorRoutes);
app.use(trackRoutes);


const port = process.env.PORT || 3000;
app.listen(port);
