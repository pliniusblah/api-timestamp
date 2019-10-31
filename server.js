const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 3000;

app.use(cors({optionSuccessStatus: 200}));

app.get('/api/timestamp/:time?', (req, res) => {
  try {
    const { time } = req.params;

    let check_time;

    if(time)
     check_time = time.search(/((\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))|^\d{5,}$)/);

    if(check_time === -1)
      throw("Invalid Date");

    let time_unix = (time) ? new Date((time.search(/-/g) > -1) ? time : parseInt(time)).getTime() : new Date().getTime();
    let time_utc = (time) ? new Date((time.search(/-/g) > -1) ? time : parseInt(time)).toUTCString() : new Date().toUTCString();

    res.json({unix: time_unix, utc: time_utc});
  } 
  catch (error) {
    res.status(500).json({ error : error });
  }
});

const listener = app.listen(port, function () {
  console.log('Aplicação está disponível na porta ' + listener.address().port);
});
