const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE, FETCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

mongoose.connect('mongodb://localhost:27017/todoClass', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false,
}).then(() => console.log('Connection Successful...')).catch((e) => console.log(e));


app.use("/api/todo/", require("./routes/todo"));





const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`The server has started on port: ${PORT}`);
});
