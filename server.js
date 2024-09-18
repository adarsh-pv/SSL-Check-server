const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/error.middlewares')
const app = express()
const port = process.env.PORT || 4000

app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:4200"],
    credentials: true,
}));
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

const apiRoutes = require("./routes/index");
const HttpException = require('./utils/httpException');

app.use("/api/v1", apiRoutes);

app.all("*", (req, res, next) => {
    const err = new HttpException(404, "Endpoint Not Found");
    res.status(err.status).send(err.message);
  });

app.use(errorHandler)
app.listen(port, () => {
    try {
        console.log(`server running at port ${port}`)
    } catch (error) {
        console.log(`error found ${error}`)
    }
})