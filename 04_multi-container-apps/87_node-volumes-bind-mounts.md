# Volumes, Bind Mounts & Polishing for Node

## 📌 Overview

Backend के लिए तीन चीज़ें चाहिए: logs persist हों, source live update हो, और credentials hard-coded न हों।
The backend needs three things: persistent logs, live source updates, and no hard-coded credentials.

## 🐳 Updated Dockerfile
```dockerfile
FROM node
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 80
ENV MONGODB_USERNAME=root
ENV MONGODB_PASSWORD=secret
CMD ["npm", "start"]
```

`package.json` में nodemon, ताकि file बदलते ही server restart हो:
nodemon in `package.json`, so the server restarts when a file changes:
```json
"scripts": { "start": "nodemon app.js" },
"devDependencies": { "nodemon": "^3.1.0" }
```

```js
mongoose.connect(
  `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/course-goals?authSource=admin`
);
```

## ⚙️ Run command
```bash
docker run --name goals-backend --rm -d -p 80:80 \
  --network goals-net \
  -v logs:/app/logs \
  -v "$(pwd):/app" \
  -v /app/node_modules \
  -e MONGODB_USERNAME=max \
  -e MONGODB_PASSWORD=secret \
  goals-node
```

| Volume | Type | Hindi | English |
|--------|------|-------|---------|
| `logs:/app/logs` | Named | Logs persist होते हैं | Logs persist |
| `$(pwd):/app` | Bind mount | Host का source container में live | Host source is live in the container |
| `/app/node_modules` | Anonymous | Bind mount image के `node_modules` को overwrite न करे | Stops the bind mount from hiding the image's `node_modules` |

Docker सबसे specific (लंबा) container path जीतता है, इसलिए `/app/logs` और `/app/node_modules` bind mount पर भारी पड़ते हैं।
The more specific (longer) container path wins, so `/app/logs` and `/app/node_modules` take precedence over the bind mount.

> Windows PowerShell में `$(pwd)` की जगह `${PWD}` लिखो; WSL में project Linux filesystem में रखो ताकि nodemon changes detect करे।
> In Windows PowerShell use `${PWD}` instead of `$(pwd)`; on WSL keep the project in the Linux filesystem so nodemon detects changes.

## 🚫 `.dockerignore`
```text
node_modules
Dockerfile
.git
```
Local `node_modules` image में copy न हो, build तेज़ और साफ़ रहे।
Keeps local `node_modules` out of the image, so builds are faster and cleaner.

## 💡 Key takeaway
Named volume = data, bind mount = live code, anonymous volume = container के अपने dependencies की रक्षा।
Named volume = data, bind mount = live code, anonymous volume = protects the container's own dependencies.
