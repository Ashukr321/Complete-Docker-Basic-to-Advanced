# Using Build Arguments (ARG)

## 📌 Overview
**Build arguments** (`ARG`) से build के समय values pass करते हो, ताकि Dockerfile बदले बिना अलग images बन सकें।
**Build arguments** (`ARG`) pass values at build time, so you can build different images without editing the Dockerfile.

## 📄 Dockerfile
```dockerfile
FROM node:14
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ARG DEFAULT_PORT=80
ENV PORT=$DEFAULT_PORT
EXPOSE $PORT
CMD ["npm", "start"]
```

## ⚙️ Commands
```bash
docker build -t feedback-node:web-app .                              # PORT=80
docker build -t feedback-node:dev --build-arg DEFAULT_PORT=8000 .    # PORT=8000
```

## 🆚 ARG vs ENV
| | `ARG` | `ENV` |
|--|-------|-------|
| कब available / Available when | सिर्फ़ build time / Build time only | Build + runtime |
| Set with | `--build-arg` | `-e`, `--env-file` |
| `CMD`/app code में? / In `CMD` or app code? | ❌ | ✅ |

## ⚠️ ध्यान दें / Watch out
- `ARG` को layers में बाद में रखो: उसकी value बदलने पर उसके बाद की सारी layers का cache टूटता है।
  Place `ARG` late: changing its value invalidates the cache for every layer after it.
- Secrets के लिए `ARG` भी safe नहीं; values `docker history` में दिख सकती हैं।
  `ARG` isn't safe for secrets either; values can show in `docker history`.

## 💡 Key takeaway
- `ARG` = build-time knob, `ENV` = runtime knob; `ENV PORT=$ARG` से दोनों को जोड़ सकते हो।
  `ARG` = build-time knob, `ENV` = runtime knob; `ENV PORT=$ARG` connects them.
