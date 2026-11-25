# Live Source Updates for the React Container

## 📌 Overview

React dev server already file changes पर reload करता है; बस हमें host का `src` folder container में bind mount करना है।
The React dev server already reloads on file changes; we only need to bind-mount the host's `src` folder into the container.

## ⚙️ Run command
```bash
docker run --name goals-frontend --rm -p 3000:3000 -it \
  -v "$(pwd)/src:/app/src" \
  goals-react
```

सिर्फ़ `src` mount करते हैं, पूरा project नहीं, इसलिए image का `node_modules` safe रहता है।
We mount only `src`, not the whole project, so the image's `node_modules` stays intact.

## 🚫 `.dockerignore`
```text
node_modules
.git
Dockerfile
```

## ⚠️ Windows / WSL caveat

Windows filesystem (`/mnt/c/...` या `C:\`) से bind mount करने पर file-change events container तक नहीं पहुँचते, इसलिए reload नहीं होता।
When bind-mounting from the Windows filesystem (`/mnt/c/...` or `C:\`), file-change events don't reach the container, so nothing reloads.

Fix 1: project को WSL filesystem में रखो (जैसे `~/projects/goals`) और वहीं से `docker run` करो।
Fix 1: keep the project in the WSL filesystem (e.g. `~/projects/goals`) and run `docker run` from there.

Fix 2: polling on करो (थोड़ा ज़्यादा CPU लेता है)।
Fix 2: turn on polling (uses a bit more CPU).
```bash
docker run ... -e WATCHPACK_POLLING=true -e CHOKIDAR_USEPOLLING=true goals-react
```
`WATCHPACK_POLLING` नए react-scripts (webpack 5) के लिए, `CHOKIDAR_USEPOLLING` पुराने versions के लिए।
`WATCHPACK_POLLING` is for newer react-scripts (webpack 5), `CHOKIDAR_USEPOLLING` for older ones.

## 💡 Key takeaway
Frontend के लिए `src` का bind mount + dev server = save करो और तुरंत browser में देखो।
For the frontend, a bind mount of `src` + the dev server = save and see it in the browser instantly.
