# Dockerizing the MongoDB Service

## 📌 Overview

MongoDB के लिए हमें Dockerfile नहीं चाहिए; Docker Hub की official `mongo` image काफ़ी है।
We don't need a Dockerfile for MongoDB; the official `mongo` image from Docker Hub is enough.

## ⚙️ Commands
```bash
docker run --name mongodb --rm -d -p 27017:27017 mongo
docker ps            # mongodb container चल रहा है? / is it running?
docker logs mongodb  # startup logs
```

| Flag | Hindi | English |
|------|-------|---------|
| `--name mongodb` | Container का fixed नाम | A fixed container name |
| `--rm` | Stop होने पर container auto-delete | Auto-remove on stop |
| `-d` | Background (detached) में चलाओ | Run detached |
| `-p 27017:27017` | Host का port 27017 container से जोड़ो | Publish Mongo's default port to the host |

## 🔌 अभी connection कैसे होता है / How the backend connects (for now)

Port publish है, इसलिए local (non-Docker) backend अब भी `localhost:27017` से connect कर सकता है।
Because the port is published, a locally running backend can still connect via `localhost:27017`.

```js
mongoose.connect('mongodb://localhost:27017/course-goals');
```

## ⚠️ Limitations (अभी के लिए / for now)
- `--rm` की वजह से container हटते ही सारा data चला जाता है (lesson 86 में fix)।
  Because of `--rm`, all data is lost when the container is removed (fixed in lesson 86).
- कोई authentication नहीं है।
  There is no authentication yet.

## 💡 Key takeaway
Database जैसी services के लिए अक्सर official image सीधे use होती है, custom Dockerfile की ज़रूरत नहीं।
For services like databases you usually run the official image directly, no custom Dockerfile needed.
