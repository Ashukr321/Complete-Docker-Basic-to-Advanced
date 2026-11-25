# Analyzing a Real App

## 📌 Overview
एक असली web app को देखकर समझते हैं कि कौन सा data किस category में आता है।
We look at a real web app to see which data belongs in which category.

## 🔍 Example: एक feedback / blog app
| Data | Category | Storage |
|------|----------|---------|
| `server.js`, HTML pages, `package.json` | Code / environment | Image (`COPY` in Dockerfile) |
| Installed dependencies (`node_modules`) | Environment | Image (`RUN npm install`) |
| Form submit होने पर बनी temp file / A temp file written while handling a request | Temporary | Container writable layer |
| Saved feedback, user accounts, uploads | Permanent | Volume |

## ❓ सवाल जो पूछने चाहिए / Questions to ask
- क्या यह data build time पर पता है? → image में डालो।
  Is this data known at build time? → put it in the image.
- क्या यह runtime पर बनता है लेकिन बाद में ज़रूरत नहीं? → container में रहने दो।
  Is it created at runtime but not needed later? → let it live in the container.
- क्या container बदलने/हटाने के बाद भी चाहिए? → **volume** चाहिए।
  Must it survive replacing or removing the container? → you need a **volume**.

## 💡 Key takeaway
- Image को कभी runtime data से "update" नहीं किया जाता; image सिर्फ़ build पर बनती है।
  An image is never "updated" with runtime data; it is only created at build time.
