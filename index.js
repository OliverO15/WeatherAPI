// index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const weatherRoutes = require('./routes/weatherRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: 'GET,POST',
}))

app.use('/api/v1', weatherRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
