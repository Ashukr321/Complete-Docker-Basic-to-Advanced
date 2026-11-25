# Don't COPY Everything: Using .dockerignore

## 📌 Overview
`.dockerignore` file बताती है कि build context की कौन सी files `COPY` (और Docker daemon) तक नहीं जानी चाहिए।
A `.dockerignore` file lists which build-context files should not reach `COPY` (or the Docker daemon).

## 📄 Example `.dockerignore`
```text
node_modules
Dockerfile
.git
.env
*.log
```

## ❓ क्यों / Why
- Local `node_modules` पुराना या दूसरे OS का हो सकता है और image के `npm install` वाले को overwrite कर देगा।
  A local `node_modules` may be outdated or built for another OS, and would overwrite the one from `npm install` in the image.
- Build context छोटा → build तेज़।
  A smaller build context → faster builds.
- `.env`, keys और `.git` जैसी secrets image में नहीं जातीं।
  Secrets like `.env`, keys and `.git` stay out of the image.

## ⚠️ ध्यान दें / Watch out
- File project root में (build context के root पर) होनी चाहिए, नाम बिल्कुल `.dockerignore`।
  The file must be at the build-context root, named exactly `.dockerignore`.
- Syntax `.gitignore` जैसा है; `!` से exception दे सकते हो।
  Syntax is like `.gitignore`; use `!` to add an exception.

## 💡 Key takeaway
- सिर्फ़ वही copy करो जिसकी image को सच में ज़रूरत है।
  Copy only what the image actually needs.
