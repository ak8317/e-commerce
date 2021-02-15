const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

//import routes
//const authRoutes = require('./routes/auth');
//app
const app = express();

//db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`DB connected`))
  .catch((err) => console.log(`DB connection error ${err}`));

//middleware
app.use(morgan('dev'));
app.use(express.json({ extended: false }));
app.use(cors());

//route
//app.use('/api', authRoutes);
fs.readdirSync('./routes').map((r) => {
  app.use('/api', require('./routes/' + r));
});

//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
