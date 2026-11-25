# Analyzing the Demo App

## 📌 Overview

Demo app एक Node/Express API है जो Star Wars films/people दिखाता है और favorites MongoDB में save करता है।
The demo app is a Node/Express API that serves Star Wars films/people and saves favorites in MongoDB.

| Part | Hindi | English | Communication case |
|------|-------|---------|--------------------|
| `axios` → `swapi.dev` | Internet API से data | Data from an internet API | Container → WWW |
| `mongoose` → MongoDB | Favorites store करना | Stores favorites | Container → host (later container) |

## ⚙️ Code (simplified)
```js
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

app.get('/movies', async (req, res) => {
  const r = await axios.get('https://swapi.dev/api/films');
  res.json({ movies: r.data });
});

// favorites routes use a Mongoose model (GET/POST /favorites)

mongoose.connect('mongodb://localhost:27017/swfavorites')
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));
```

## ⚠️ ध्यान दें / Note
App तभी start (`listen`) होता है जब MongoDB connect हो जाए; DB न मिले तो container crash हो जाता है।
The app only starts listening once MongoDB connects; if the DB is unreachable the container exits.

## 💡 Key takeaway
एक ही app में दो तरह की communication है: WWW और database।
One app, two kinds of communication: WWW and a database.
