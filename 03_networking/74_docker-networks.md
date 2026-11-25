# Introducing Docker Networks

## 📌 Overview

एक user-defined network में रखे containers एक-दूसरे को **container name** से पहचान लेते हैं।
Containers on the same user-defined network can reach each other by **container name**.

## ⚙️ Commands
```bash
# 1. Network create करो (manually — docker run इसे auto-create नहीं करता)
docker network create favorites-net
docker network ls

# 2. MongoDB को network में चलाओ (no -p needed)
docker run -d --name mongodb --network favorites-net mongo

# 3. App को उसी network में चलाओ
docker build -t favorites-node .
docker run --name favorites -d --rm -p 3000:3000 --network favorites-net favorites-node
```

```js
// Container name = hostname
mongoose.connect('mongodb://mongodb:27017/swfavorites');
```

## ⚠️ ध्यान दें / Note
- Network पहले से होना चाहिए; न हो तो `docker run --network` error देता है।
  The network must already exist; otherwise `docker run --network` fails.
- Container ↔ container traffic के लिए `-p` नहीं चाहिए; `-p` सिर्फ host/बाहर से आने वाले traffic के लिए है (app के लिए `-p 3000:3000` रखा क्योंकि browser से call करना है)।
  No `-p` is needed for container ↔ container traffic; `-p` is only for traffic from the host/outside (the app keeps `-p 3000:3000` because the browser calls it).
- Name से DNS सिर्फ **user-defined** networks पर चलता है, default `bridge` पर नहीं।
  Name-based DNS only works on **user-defined** networks, not on the default `bridge`.

## 💡 Key takeaway
`docker network create` + `--network` + container name as hostname = साफ और stable solution।
`docker network create` + `--network` + container name as hostname = a clean, stable solution.
