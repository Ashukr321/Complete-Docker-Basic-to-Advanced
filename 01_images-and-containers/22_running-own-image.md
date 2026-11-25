# Running a Container Based on Our Own Image

## 1. Image build करें
```bash
docker build .
```
- `.` = build context (current folder, जहाँ Dockerfile है)।
  `.` is the build context: the current folder containing the Dockerfile.
- अंत में एक **image ID** मिलती है, जैसे `sha256:3f2a9c...`।
  At the end you get an **image ID**, like `sha256:3f2a9c...`.

## 2. Container चलाएँ
```bash
docker run -p 3000:80 3f2a9c
```
- `-p 3000:80` = host का port **3000** → container का port **80**।
  `-p 3000:80` maps host port **3000** → container port **80**.
- अब browser में `http://localhost:3000` खोलें।
  Now open `http://localhost:3000` in the browser.

## ⚠️ Port publish करना ज़रूरी है
Container अपने isolated network में चलता है। `-p` के बिना बाहर से (आपके browser से) app तक नहीं पहुँच सकते।
A container runs in its own isolated network. Without `-p`, nothing outside (like your browser) can reach the app.

## 3. रोकें
```bash
docker ps                 # get the container name
docker stop <name>        # stop it
```
