# Making Container to Host Communication Work

## 📌 Overview

`localhost` की जगह `host.docker.internal` लिखो; Docker इसे host machine के IP में बदल देता है।
Write `host.docker.internal` instead of `localhost`; Docker resolves it to the host machine's IP.

```js
mongoose.connect('mongodb://host.docker.internal:27017/swfavorites');
```

## ⚙️ Commands
```bash
docker build -t favorites-node .

# Docker Desktop (Windows / macOS): works directly
docker run --name favorites -d --rm -p 3000:3000 favorites-node

# Linux (Docker Engine): map the name to the host gateway yourself
docker run --name favorites -d --rm -p 3000:3000 \
  --add-host=host.docker.internal:host-gateway favorites-node
```

## ⚠️ Gotchas
- Linux पर `--add-host=host.docker.internal:host-gateway` के बिना यह name resolve नहीं होता।
  On Linux the name does not resolve without `--add-host=host.docker.internal:host-gateway`.
- Host की service सिर्फ `127.0.0.1` पर bind हो तो Linux पर container उसे reach नहीं कर पाएगा; MongoDB का `bindIp` check करें।
  If the host service binds only to `127.0.0.1`, a container on Linux can't reach it; check MongoDB's `bindIp`.
- यह name HTTP URL, DB URL, कहीं भी use हो सकता है: `http://host.docker.internal:8080`।
  The name works in any URL: `http://host.docker.internal:8080`.

## 💡 Key takeaway
Container → host = `host.docker.internal` (Linux पर `--add-host` के साथ)।
Container → host = `host.docker.internal` (with `--add-host` on Linux).
