const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Index route' });
});

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({ msg: 'This returns all the tours' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port: ${port}...`);
});