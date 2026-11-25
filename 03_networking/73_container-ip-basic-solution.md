# Container to Container: A Basic Solution

## 📌 Overview

अब MongoDB को host पर नहीं, अपने container में चलाते हैं, और app उससे उसके IP पर connect करता है।
Now we run MongoDB in its own container instead of on the host, and the app connects to it by IP.

## ⚙️ Commands
```bash
# 1. Start MongoDB in a container (official image)
docker run -d --name mongodb mongo

# 2. Find its IP address
docker container inspect mongodb
# look for: "NetworkSettings" -> "IPAddress": "172.17.0.2"

# or directly:
docker container inspect -f '{{.NetworkSettings.IPAddress}}' mongodb
```

```js
// 3. Hard-code that IP in the app
mongoose.connect('mongodb://172.17.0.2:27017/swfavorites');
```

```bash
# 4. Rebuild and run the app
docker build -t favorites-node .
docker run --name favorites -d --rm -p 3000:3000 favorites-node
```

## ⚠️ क्यों fragile? / Why it is fragile
- IP container restart या recreate होने पर बदल सकता है।
  The IP can change when the container is restarted or recreated.
- हर बार IP बदलने पर code बदलकर image rebuild करनी पड़ती है।
  Every IP change means editing code and rebuilding the image.

## 💡 Key takeaway
काम करता है, पर IP hard-code करना production के लायक नहीं; अगला step Docker networks है।
It works, but hard-coding IPs is not production-ready; the next step is Docker networks.
