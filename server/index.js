const express = require("express");
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');
// var cors = require('cors')
const helmet = require('helmet')

app.use(express.json());


// app.use(cors())
app.use(helmet())
env.config();


const candidateRoutes = require('./src/routes/CandidateRoutes');
const emploerRoutes = require('./src/routes/EmploerRoutes');
const adminRoutes = require('./src/routes/Admin');


const Connection = () => {
  try {
    mongoose.connect(process.env.CONN_STRING, { dbName: "Rocket" })
      .then(() => {
        console.log("MongoDB Connected");
      });
  } catch (error) {
    console.log(error.message);
  }
}
Connection();

app.use('/api', candidateRoutes);
app.use('/api', emploerRoutes);
app.use('/api', adminRoutes)


app.get('/', (req, res) => {
  res.send('Welcome to Lutec World')
})

app.listen(process.env.PORT, () => {
  console.log(`server is ready for port ${process.env.PORT}`)
})