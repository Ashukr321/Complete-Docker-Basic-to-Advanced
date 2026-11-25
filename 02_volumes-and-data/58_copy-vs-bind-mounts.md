# Using "COPY" vs Bind Mounts

## 📌 Overview
Bind mount होने के बाद भी Dockerfile में `COPY . .` रखना चाहिए।
Even with a bind mount, keep `COPY . .` in the Dockerfile.

## 🆚 कब क्या / When to use which
| | `COPY` | Bind mount |
|--|--------|------------|
| Stage | Production / sharing | Development |
| Code कहाँ / Where the code is | Image के अंदर snapshot / Snapshot inside the image | Host folder, live |
| Server पर चलेगा? / Works on a server? | ✅ Image अपने-आप में पूरी / Self-contained | ❌ Server पर आपका folder नहीं / Your folder isn't there |

## 🧾 Key points
- Production में कोई bind mount नहीं होता; container को image से ही code मिलना चाहिए।
  In production there's no bind mount; the container must get its code from the image.
- Bind mount सिर्फ़ `docker run` का dev-time option है; Dockerfile वैसी ही रहती है।
  A bind mount is only a dev-time `docker run` option; the Dockerfile stays the same.

## 💡 Key takeaway
- `COPY` = deployable image, bind mount = तेज़ local development।
  `COPY` = a deployable image, bind mount = fast local development.
