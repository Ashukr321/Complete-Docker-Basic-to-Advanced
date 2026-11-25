# Building Images & Understanding Container Names

## 📌 Overview

`docker compose up` image तभी build करता है जब वो मौजूद न हो; Dockerfile या code बदलने पर भी पुरानी image use हो सकती है।
`docker compose up` builds an image only if it doesn't exist yet; after a Dockerfile or code change it may reuse the old image.

## ⚙️ Commands
```bash
docker compose build              # build (or rebuild) all images with a build: key
docker compose build backend      # only one service
docker compose up --build -d      # force a rebuild, then start
```

## 🏷️ Generated names
- Compose names project के नाम से बनाता है; default project name = folder name।
  Compose derives names from the project name; the default project name = folder name.
- Containers: `<project>-<service>-<n>`, जैसे `goals-backend-1`।
  Containers: `<project>-<service>-<n>`, e.g. `goals-backend-1`.
- Images: `<project>-<service>`, volumes: `<project>_data`, network: `<project>_default`।
  Images: `<project>-<service>`, volumes: `<project>_data`, network: `<project>_default`.
- Project name बदलना हो: `docker compose -p myproject up -d` या top-level `name: myproject`।
  To change the project name: `docker compose -p myproject up -d` or top-level `name: myproject`.

## ⚙️ Fixed container name
```yaml
services:
  mongodb:
    image: mongo
    container_name: mongodb   # exact name instead of goals-mongodb-1
```

## ⚠️ Watch out
- `container_name` unique होना चाहिए, इसलिए उस service को `--scale` से कई copies में नहीं चला सकते।
  `container_name` must be unique, so that service cannot be scaled to multiple copies.
- Services आपस में service name से बात करते हैं, container name ज़रूरी नहीं।
  Services reach each other by service name; the container name is not needed for that.

## 💡 Key takeaway
Code/Dockerfile बदला → `up --build`; साफ़ नाम चाहिए → `container_name`।
Changed code/Dockerfile → `up --build`; want a clean name → `container_name`.
