const express = require("express");
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');
var cors = require('cors')
app.use(express.json());


app.use(cors())

env.config();


const candidateRoutes = require('./src/routes/CandidateRoutes');
const emploerRoutes = require('./src/routes/EmploerRoutes');

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



app.get('/', (req, res) => {
  res.send('Welcome to Lutec World')
})

app.listen(process.env.PORT, () => {
  console.log(`server is ready for port ${process.env.PORT}`)
})