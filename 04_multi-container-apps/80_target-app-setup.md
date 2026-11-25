# Our Target App & Setup

## 📌 Overview

Demo app एक "goals" app है: user goals add करता है, list देखता है और delete करता है।
The demo app is a "goals" app: the user adds goals, sees the list and deletes them.

| Part | Tech | Port |
|------|------|------|
| **Database** | MongoDB | 27017 |
| **Backend** | Node/Express REST API (mongoose से DB से connect) | 80 |
| **Frontend** | React SPA (dev server) | 3000 |

Browser में React app backend को HTTP requests भेजता है, और backend MongoDB में data save/read करता है।
In the browser the React app sends HTTP requests to the backend, and the backend saves/reads data in MongoDB.

```text
Browser (React) --HTTP--> Backend :80 --mongoose--> MongoDB :27017
```

## 🎯 Requirements per container

**MongoDB**
- Data persist होना चाहिए (container हटने पर भी)।
  Data must persist (even when the container is removed).
- Access limited होना चाहिए (username/password)।
  Access must be restricted (username/password).

**Node backend**
- Data (logs) persist होने चाहिए।
  Data (logs) must persist.
- Source code बदलें तो बिना rebuild के update हो (live source updates)।
  Source changes should apply without a rebuild (live source updates).

**React frontend**
- Live source updates: code save करते ही browser में दिखे।
  Live source updates: saving the code shows the change in the browser.

## ⚙️ Setup (बिना Docker / without Docker)
```bash
# backend/
npm install && node app.js
# frontend/
npm install && npm start
```

## 💡 Key takeaway
हर service का अपना container होगा; हर container की ज़रूरतें (persistence, live updates, security) अलग हैं।
Each service gets its own container, and each has different needs (persistence, live updates, security).
