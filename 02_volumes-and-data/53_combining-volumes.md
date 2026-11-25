# Combining & Merging Different Volumes

## 📌 Overview
Bind mount `/app` को host folder से overwrite कर देता है, इसलिए image में `npm install` से बना `node_modules` छिप जाता है।
The bind mount overwrites `/app` with the host folder, so the `node_modules` created by `npm install` in the image gets hidden.

## 🛠️ Fix: anonymous volume for `node_modules`
```bash
docker run -d -p 3000:80 --rm --name feedback-app \
  -v feedback:/app/feedback \
  -v "$(pwd):/app" \
  -v /app/node_modules \
  feedback-node:volumes
```
- `-v /app/node_modules` (सिर्फ़ container path, कोई नाम नहीं) एक **anonymous volume** बनाता है।
  `-v /app/node_modules` (container path only, no name) creates an **anonymous volume**.
- नया anonymous volume image के `node_modules` से भर जाता है, इसलिए dependencies बची रहती हैं।
  A new anonymous volume is pre-filled from the image's `node_modules`, so the dependencies are kept.

## 📏 Rule: ज़्यादा specific path जीतता है / The more specific path wins
| Mount | Container path | Result |
|-------|----------------|--------|
| Bind mount | `/app` | Host code |
| Named volume | `/app/feedback` | Persistent feedback |
| Anonymous volume | `/app/node_modules` | Image's dependencies |

- Docker लंबे (deeper) path वाले mount को उस sub-folder के लिए प्राथमिकता देता है।
  Docker gives the longer (deeper) path's mount priority for that sub-folder.

## 💡 Key takeaway
- Mounts को combine करके तय करो कि कौन सा sub-folder किस source से आएगा।
  Combine mounts to decide which sub-folder comes from which source.
- Dockerfile में `VOLUME ["/app/node_modules"]` भी यही करता है।
  `VOLUME ["/app/node_modules"]` in the Dockerfile does the same.
