require('dotenv').config()
const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
const url = 'mongodb://localhost:27017/articles';
const mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});
app.use(express.json())
const routes = require('./routes/articles')
app.use('/api/articles', routes)
const register = require('./routes/register')
app.use('/api/register', register)
const login = require('./routes/login')
app.use('/api/login', login)
const user = require('./routes/user')
app.use('/api/User', user)
app.listen(port, () => {
    console.log(`On Port ${port}`);
})