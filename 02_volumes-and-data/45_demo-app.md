# Building & Understanding the Demo App

## 📌 Overview
Demo app एक छोटा Node/Express "feedback" app है: user title और text submit करता है और app उसे एक file में save करता है।
The demo is a small Node/Express "feedback" app: the user submits a title and text, and the app saves it as a file.

## 🔄 Flow
1. Feedback पहले `temp/<title>.txt` में लिखा जाता है।
   The feedback is first written to `temp/<title>.txt`.
2. अगर `feedback/<title>.txt` पहले से मौजूद है तो error; वरना file `feedback/` में move हो जाती है।
   If `feedback/<title>.txt` already exists, it errors; otherwise the file is moved into `feedback/`.
3. `http://localhost:3000/feedback/<title>.txt` पर file देख सकते हैं।
   You can view the file at `http://localhost:3000/feedback/<title>.txt`.

## 📄 Dockerfile
```dockerfile
FROM node:14
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 80
CMD ["node", "server.js"]
```

## ⚙️ Commands
```bash
docker build -t feedback-node .
docker run -p 3000:80 -d --name feedback-app --rm feedback-node
```

## 💡 Key takeaway
- `temp/` = temporary data, `feedback/` = permanent data जो बचना चाहिए।
  `temp/` = temporary data, `feedback/` = permanent data that should survive.
