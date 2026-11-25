# Moving the React SPA into a Container

## 📌 Overview

Frontend के लिए भी हम Node-based image बनाते हैं जो React dev server (port 3000) चलाती है।
For the frontend we also build a Node-based image that runs the React dev server (port 3000).

## 🐳 Dockerfile (`frontend/Dockerfile`)
```dockerfile
FROM node
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## ⚙️ Commands
```bash
cd frontend
docker build -t goals-react .
docker run --name goals-frontend --rm -p 3000:3000 -it goals-react
```

## ⚠️ `-it` क्यों? / Why `-it`?

Create React App का dev server interactive terminal न मिलने पर तुरंत exit हो जाता है।
The Create React App dev server exits immediately if it gets no interactive terminal.

`-it` (interactive + TTY) देने से server चलता रहता है।
Passing `-it` (interactive + TTY) keeps the server running.

## 🌐 React code कहाँ चलता है? / Where does the React code run?

Container सिर्फ़ JS files serve करता है; React code असल में **browser** में चलता है, container में नहीं।
The container only serves the JS files; the React code actually runs in the **browser**, not in the container.

इसलिए frontend की requests host machine से जाती हैं, और उसे अब भी `localhost:80` call करना है।
So the frontend's requests leave from the host machine, and it must still call `localhost:80`.

```js
fetch('http://localhost/goals');   // browser → host port 80 → backend container
```

यही वजह है कि backend का `-p 80:80` publish रहना चाहिए।
That is why the backend's `-p 80:80` must stay published.

## 💡 Key takeaway
SPA की requests browser से आती हैं, इसलिए backend host पर reachable होना चाहिए, Docker network का नाम browser नहीं जानता।
SPA requests come from the browser, so the backend must be reachable on the host; the browser doesn't know Docker container names.
