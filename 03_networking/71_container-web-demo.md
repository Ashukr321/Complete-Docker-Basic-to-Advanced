# Creating a Container & Communicating to the Web

## 📌 Overview

पहले app को वैसे ही containerize करते हैं और देखते हैं क्या होता है।
First we containerize the app as-is and see what happens.

## ⚙️ Dockerfile
```dockerfile
FROM node
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "app.js"]
```

## ⚙️ Build & run
```bash
docker build -t favorites-node .
docker run --name favorites -d --rm -p 3000:3000 favorites-node
docker logs favorites
```

## ⚠️ Result: MongoDB error
Container तुरंत बंद हो जाता है; logs में `ECONNREFUSED` / `MongooseServerSelectionError` जैसी error दिखती है।
The container stops right away; the logs show an error like `ECONNREFUSED` / `MongooseServerSelectionError`.

कारण: code `mongodb://localhost:27017` use करता है, और container के अंदर कोई MongoDB नहीं है।
Reason: the code uses `mongodb://localhost:27017`, and there is no MongoDB inside the container.

## 🧪 WWW part check करें / Check the WWW part
Mongo connect वाला code temporarily comment करके सिर्फ `app.listen(3000)` रखो, तो `/movies` और `/people` काम करते हैं।
Temporarily comment out the Mongo connect and just call `app.listen(3000)`: `/movies` and `/people` work.

## 💡 Key takeaway
Container → WWW बिना किसी बदलाव के चलता है; problem सिर्फ host वाली DB में है।
Container → WWW works unchanged; the only problem is the DB on the host.
