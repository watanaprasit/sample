require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')


app.use(cors())
app.use(express.json())

require('./lib/mongodb.config')
require('./lib/passportConfig')

app.use("/user", require('./routes/user.route'))
app.use("/auth", require('./routes/auth.route'))
app.use("/owner", require('./routes/owner.route'))


app.get("*", (req, res)=> {
    res.status(404).json({message: "forbidden access"})
})

app.listen(process.env.PORT, () => {
    console.log(`running on ${process.env.PORT}`)})
