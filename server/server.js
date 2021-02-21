const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const authRouter = require('./routes/auth.js');
const categoryRouter = require('./routes/category.js');
const subRouter = require('./routes/sub.js');
const { notFound, errorHandler } = require('./middlewares/errorHandler.js');

dotenv.config();

const app = express();
//db
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log("DATABASE CONNECTED");
}).catch(error => console.log(error));
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(cors());
//router
app.get('/api', (req, res) => {
    res.json({
        data: "hey you hit node API"
    })
});
const PORT = process.env.PORT || 5000;
const api = process.env.API;

app.use(api, authRouter);
app.use(api, categoryRouter);
app.use(api, subRouter);

app.use(notFound)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})