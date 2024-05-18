const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');

// Create a sample table
db.serialize(() => {
  db.run("CREATE TABLE users (id INT, name TEXT)");

  const stmt = db.prepare("INSERT INTO users VALUES (?, ?)");
  for (let i = 0; i < 10; i++) {
    stmt.run(i, `User${i}`);
  }
  stmt.finalize();
});

// Endpoint to execute SQL query
app.post('/execute-query', (req, res) => {
  const query = req.body.query;

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
