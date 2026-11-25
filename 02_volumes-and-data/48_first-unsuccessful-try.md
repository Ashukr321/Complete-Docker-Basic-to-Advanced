# A First, Unsuccessful Try

## 📌 Overview
पहली कोशिश में Dockerfile में `VOLUME` instruction डालते हैं।
The first attempt adds a `VOLUME` instruction to the Dockerfile.

```dockerfile
FROM node:14
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 80
VOLUME [ "/app/feedback" ]
CMD ["node", "server.js"]
```

## ⚠️ Problem 1: cross-device rename
- अब `temp/` container layer में है और `feedback/` volume में; `fs.rename` दो अलग filesystems के बीच fail होता है (`EXDEV: cross-device link not permitted`)।
  Now `temp/` is in the container layer and `feedback/` is in a volume; `fs.rename` fails across two filesystems (`EXDEV: cross-device link not permitted`).
- Fix: `rename` की जगह `copyFile` + `unlink` use करो, फिर image rebuild करो।
  Fix: use `copyFile` + `unlink` instead of `rename`, then rebuild the image.

## ⚠️ Problem 2: data फिर भी गायब / Data still gone
- `VOLUME` एक **anonymous volume** बनाता है: Docker इसे random नाम देता है।
  `VOLUME` creates an **anonymous volume**: Docker gives it a random name.
- `--rm` वाला container हटते ही उसका anonymous volume भी delete हो जाता है।
  When a `--rm` container is removed, its anonymous volume is deleted too.
- बिना `--rm` के भी, नया container एक **नया** anonymous volume पाता है, पुराना नहीं।
  Even without `--rm`, a new container gets a **new** anonymous volume, not the old one.

```bash
docker volume ls   # random hash names = anonymous volumes
```

## 💡 Key takeaway
- Anonymous volume एक container से बँधा होता है; data को containers के पार बचाने के लिए यह काफ़ी नहीं।
  An anonymous volume is tied to one container; it's not enough to keep data across containers.
