# A NodeJS-specific Adjustment: Using Nodemon

## 📌 Overview
Bind mount से HTML/static files तुरंत update होती हैं, लेकिन `server.js` बदलने पर Node process restart करना पड़ता है।
With a bind mount, HTML/static files update instantly, but changing `server.js` needs the Node process restarted.

**nodemon** file बदलते ही server को अपने-आप restart कर देता है।
**nodemon** restarts the server automatically whenever a file changes.

## ⚙️ Setup
```json
// package.json
"scripts": { "start": "nodemon server.js" },
"devDependencies": { "nodemon": "^3.1.0" }
```
```dockerfile
# Dockerfile
CMD ["npm", "start"]
```
```bash
docker build -t feedback-node:volumes .
docker run -d -p 3000:80 --rm --name feedback-app \
  -v feedback:/app/feedback -v "$(pwd):/app" -v /app/node_modules \
  feedback-node:volumes
docker logs -f feedback-app    # see nodemon restart on save
```

## ⚠️ Windows / WSL2
- अगर project Windows filesystem (`C:\...`) पर है तो file-change events container तक नहीं पहुँचते।
  If the project is on the Windows filesystem (`C:\...`), file-change events may not reach the container.
- Fix: project को WSL2 filesystem में रखो, या polling चालू करो: `nodemon -L server.js`।
  Fix: keep the project in the WSL2 filesystem, or enable polling: `nodemon -L server.js`.

## 💡 Key takeaway
- Bind mount + nodemon = बिना rebuild के live development।
  Bind mount + nodemon = live development without rebuilding.
