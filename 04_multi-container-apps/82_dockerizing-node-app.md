# Dockerizing the Node App

## 📌 Overview

Backend के लिए हम अपनी image बनाते हैं, फिर उसे MongoDB container से connect करते हैं।
For the backend we build our own image, then connect it to the MongoDB container.

## 🐳 Dockerfile (`backend/Dockerfile`)
```dockerfile
FROM node
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 80
CMD ["node", "app.js"]
```

## ⚠️ पहली गलती / The first error

Container के अंदर `localhost` का मतलब container खुद है, host machine नहीं, इसलिए `localhost:27017` fail होता है।
Inside a container `localhost` means the container itself, not your host, so `localhost:27017` fails.

Mongo का port host पर publish है, इसलिए हम `host.docker.internal` से host के through पहुँच सकते हैं।
Mongo's port is published on the host, so we can reach it through the host via `host.docker.internal`.

```js
mongoose.connect('mongodb://host.docker.internal:27017/course-goals');
```

> Linux पर `host.docker.internal` के लिए `--add-host=host.docker.internal:host-gateway` जोड़ना पड़ सकता है।
> On Linux you may need `--add-host=host.docker.internal:host-gateway` for `host.docker.internal` to resolve.

## ⚙️ Commands
```bash
cd backend
docker build -t goals-node .
docker run --name goals-backend --rm -d -p 80:80 goals-node
```

Backend का port 80 publish करना ज़रूरी है, क्योंकि React app (browser) उसे call करेगा।
Publishing port 80 is required because the React app (in the browser) calls it.

## 💡 Key takeaway
Container से host की किसी service तक पहुँचने के लिए `host.docker.internal` use करो; यह एक temporary तरीका है, lesson 84 में network से बेहतर करेंगे।
Use `host.docker.internal` to reach a service on the host; this is a stopgap, lesson 84 replaces it with a network.
