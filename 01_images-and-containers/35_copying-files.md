# Copying Files Into & From a Container

## 📌 Overview
`docker cp` से host और container (running या stopped) के बीच files copy कर सकते हैं।
`docker cp` copies files between the host and a container (running or stopped).

## ⚙️ Commands
```bash
# Host → container
docker cp ./dummy/test.txt <container>:/test

# Container → host
docker cp <container>:/test/test.txt ./dummy
```
Format: `docker cp <source> <destination>`। Container वाली side पर `name:` prefix लगता है।
Format: `docker cp <source> <destination>`. The container side gets a `name:` prefix.

## 💡 कब useful है / When it's useful
- Container के अंदर बनी **log files** बाहर निकालना।
  Pulling **log files** generated inside a container out to the host.
- किसी config file को जल्दी से अंदर डालना (testing के लिए)।
  Quickly dropping a config file in (for testing).

## ⚠️ Source code update के लिए नहीं
Code बदलने के लिए `docker cp` use करना error-prone है: सही तरीका है image rebuild या development में bind mount।
Using `docker cp` to update source code is error-prone: rebuild the image, or use a bind mount in development.
