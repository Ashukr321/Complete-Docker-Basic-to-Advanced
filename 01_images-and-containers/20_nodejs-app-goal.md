# Our Goal: A NodeJS App

## 📌 Overview
अब target है: एक छोटे NodeJS (Express) web server को अपनी image में pack करना और container में चलाना।
The goal now: package a small NodeJS (Express) web server into our own image and run it in a container.

## 📁 Project structure
```
nodejs-app/
├── package.json     ← dependencies (express)
├── server.js        ← the web server
└── Dockerfile       ← instructions to build the image (next lesson)
```

## server.js (simple example)
```js
const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("<h1>Hello from a Docker container!</h1>"));

app.listen(80); // the port inside the container
```

## package.json
```json
{
  "name": "nodejs-app",
  "dependencies": { "express": "^4.19.2" }
}
```

## ❓ Docker क्यों?
Locally चलाने के लिए Node install करना और `npm install` चलाना पड़ता है। Docker के साथ, बस image build करो और run करो: Node का version image में fixed रहता है।
Running it locally means installing Node and running `npm install`. With Docker you just build and run the image: the Node version is fixed inside the image.
