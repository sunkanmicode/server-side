const express = require('express');
const app = express();
const cors = require('cors');
// const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors())

//routes
app.get('/',(req, res)=>{res.send('its working')})
app.use('/auth', require('./routes/jwtAuth'));
app.use('/dashboard', require('./routes/dashboard'));

app.listen(process.env.PORT || 4000,  ()=>{
    console.log(`server is running on port ${process.env.PORT}..`);
});