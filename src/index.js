const express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    routes = require('./routes/index.routes'),
    session = require('express-session'),
    MongoStore = require('connect-mongo');
    

const app = express();

//config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// middlewares
app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({extended: false}));
app.set('port', process.env.PORT || 3000)
app.use(session({
    secret: 'jhb%&/%&$/(VBBTVUI',
    resave: true,
    saveUninitialized:true,
    cookie:{maxAge:7 * 24 * 60 * 60 *1000},
    store: MongoStore.create({
    mongoUrl: `mongodb+srv://${process.env.USRDB}:${process.env.PASSDB}@cluster0.2jj0w.mongodb.net/infotechprueba?retryWrites=true&w=majority`,
    ttl: 7 * 24 * 60 * 60} // = 14 days. Defaul
)
}))

// db connection
try {
    mongoose.connect(`mongodb+srv://${process.env.USRDB}:${process.env.PASSDB}@cluster0.2jj0w.mongodb.net/infotechprueba?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
} 
    catch (error) {
}

//routes
app.use(routes);

//conexion
//servidor
app.listen(app.get('port'), () =>{
    console.log('Esperando conexiones');
});