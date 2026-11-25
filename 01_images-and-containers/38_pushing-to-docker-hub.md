# Pushing Images to Docker Hub

## 1. Repository बनाएँ / Create a repository
Docker Hub पर login करके एक repository बनाएँ, जैसे `<your-username>/node-hello-world`।
Log in to Docker Hub and create a repository, e.g. `<your-username>/node-hello-world`.

## 2. Image का नाम repository से मिलाएँ / Name the image after the repository
```bash
docker tag node-demo:latest <your-username>/node-hello-world
# or build it with that name directly:
docker build -t <your-username>/node-hello-world .
```
Push करने के लिए image का नाम `username/repository` होना ज़रूरी है।
To push, the image name must be `username/repository`.

## 3. Login और push / Log in and push
```bash
docker login
docker push <your-username>/node-hello-world
docker push <your-username>/node-hello-world:1.0   # a specific tag
```

## 💡 Notes
- Push में सिर्फ़ वो **layers** upload होती हैं जो Hub पर पहले से नहीं हैं (जैसे `node` base layers दोबारा नहीं जातीं)।
  Only **layers** that aren't already on the Hub are uploaded (e.g. the `node` base layers aren't sent again).
- `docker logout` से credentials हटाएँ।
  `docker logout` removes the stored credentials.

See also: [Registry & Hub Commands](../docker%20cmd/05_REGISTRY_AND_HUB.md)
