const fs = require('fs');
const express = require('express');
const { error } = require('console');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Index route' });
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({ success: 'success', results: tours.length, data: { tours } });
});

app.get('/api/v1/tours/:id', (req, res) => {

  const id = req.params.id * 1;
  const tour = tours.find(t => t.id === id);
  res.status(200).json({ status: 'success', data: { tour: tour } });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;

  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data:  {
        tour: newTour
      }
    });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port: ${port}...`);
});
