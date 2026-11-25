# Named Volumes To The Rescue!

## 📌 Overview
**Named volume** को आप नाम देते हैं; यह container हटने के बाद भी बचा रहता है और नया container उसे फिर से use कर सकता है।
A **named volume** has a name you choose; it survives container removal and a new container can reuse it.

## ⚙️ Commands
```bash
# Dockerfile से VOLUME line हटा दो, फिर rebuild / remove the VOLUME line, then rebuild
docker build -t feedback-node:volumes .

docker run -d -p 3000:80 --rm --name feedback-app \
  -v feedback:/app/feedback feedback-node:volumes
```
- `-v <name>:<container path>` — `feedback` volume का नाम है, `/app/feedback` container के अंदर का path।
  `-v <name>:<container path>` — `feedback` is the volume name, `/app/feedback` the path inside the container.

## 🧪 Test
```bash
docker stop feedback-app          # container removed (--rm)
docker volume ls                  # "feedback" is still there
docker run -d -p 3000:80 --rm --name feedback-app \
  -v feedback:/app/feedback feedback-node:volumes
# old feedback files are back
```

## 📍 Where is the data?
- Named volume का host folder Docker manage करता है (Docker Desktop पर VM के अंदर); आप इसे directly edit नहीं करते।
  Docker manages a named volume's host folder (inside a VM on Docker Desktop); you don't edit it directly.

## 💡 Key takeaway
- Permanent data जिसे आपको खुद edit नहीं करना → **named volume**।
  Permanent data you don't need to edit yourself → **named volume**.
