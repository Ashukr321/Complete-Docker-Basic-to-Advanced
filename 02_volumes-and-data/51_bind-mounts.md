# Getting Started With Bind Mounts (Code Sharing)

## 📌 Overview
Code बदलने पर हर बार image rebuild करना धीमा है; **bind mount** host के project folder को सीधे container में mount कर देता है।
Rebuilding the image on every code change is slow; a **bind mount** mounts the host project folder straight into the container.

## 🆚 Named volume vs bind mount
| | Named volume | Bind mount |
|--|--------------|------------|
| Host path कौन चुनता है? / Who picks the host path? | Docker | **आप / You** |
| Host से edit? / Edit from host? | ❌ | ✅ |
| Use case | Permanent app data | Live source code (dev) |

## ⚙️ Command
```bash
docker run -d -p 3000:80 --rm --name feedback-app \
  -v feedback:/app/feedback \
  -v "/Users/me/projects/feedback-app:/app" \
  feedback-node:volumes
```
- Host path हमेशा **absolute** होना चाहिए; relative path (`./`) को Docker named volume समझेगा।
  The host path must be **absolute**; a relative path (`./`) is treated as a volume name.
- Path में spaces या special characters हों तो पूरे `-v` value को quotes में रखो।
  Wrap the whole `-v` value in quotes if the path has spaces or special characters.

## ⚠️ Docker Desktop file sharing
- Docker Desktop पर वह folder **File sharing** settings में allowed होना चाहिए (macOS पर ज़्यादातर user home already shared है)।
  On Docker Desktop the folder must be allowed under **File sharing** settings (on macOS the user home is usually shared already).
- Windows + WSL2 पर code को WSL filesystem में रखना तेज़ है।
  On Windows + WSL2, keeping the code in the WSL filesystem is faster.

## ⚠️ अभी app crash होगा / The app will crash for now
- Bind mount पूरे `/app` को host folder से ढक देता है, जिसमें `node_modules` नहीं है → `Cannot find module 'express'`। Fix: [lesson 53](53_combining-volumes.md)।
  The bind mount covers all of `/app` with the host folder, which has no `node_modules` → `Cannot find module 'express'`. Fix: [lesson 53](53_combining-volumes.md).

## 💡 Key takeaway
- Bind mount = dev में live code; यह image को नहीं बदलता।
  A bind mount = live code during development; it doesn't change the image.
