# Understanding Data Categories

## 📌 Overview
App में हर data एक जैसा नहीं होता; Docker में अलग-अलग data अलग जगह रहता है।
Not all data in an app is the same; in Docker, different kinds of data live in different places.

| Category | Example | Where it lives | Hindi |
|----------|---------|----------------|-------|
| **Application code + environment** | Source code, `node_modules`, runtime | **Image** (read-only) | Build time पर image में copy; बाद में बदलता नहीं |
| **Temporary app data** | User input in memory, temp files | **Container writable layer** | Container के साथ ही ख़त्म हो जाए तो ठीक है |
| **Permanent app data** | Uploaded files, DB data, saved feedback | **Volumes** | Container हटने के बाद भी बचना चाहिए |

## 🧱 Read-only vs read-write
- Image read-only है; container image के ऊपर एक पतली **writable layer** जोड़ता है।
  The image is read-only; a container adds a thin **writable layer** on top of it.
- Container जो भी लिखता है वो इसी layer में जाता है, image में नहीं।
  Everything a container writes goes into this layer, never into the image.
- `docker rm` करते ही यह layer (और उसका data) delete हो जाती है।
  As soon as you `docker rm` the container, this layer (and its data) is deleted.

## 💡 Key takeaway
- Code → image में, temporary data → container में, permanent data → **volume** में।
  Code → in the image, temporary data → in the container, permanent data → in a **volume**.
