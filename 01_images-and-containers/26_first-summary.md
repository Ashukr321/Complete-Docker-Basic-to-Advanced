# A First Summary

## 🧾 अब तक क्या सीखा / What we learned so far

1. **Image** = read-only blueprint (code + environment). **Container** = image का running instance।
   **Image** = read-only blueprint (code + environment). **Container** = a running instance of an image.
2. Images दो तरह से मिलती हैं: Docker Hub से (`docker run node`) या **Dockerfile** से खुद build करके।
   You get images from Docker Hub (`docker run node`) or by building your own from a **Dockerfile**.
3. `docker build .` image बनाता है; `docker run -p 3000:80 <id>` container चलाता है।
   `docker build .` builds an image; `docker run -p 3000:80 <id>` runs a container.
4. `RUN` build time पर, `CMD` container start पर चलता है। `EXPOSE` सिर्फ़ documentation है।
   `RUN` runs at build time, `CMD` at container start. `EXPOSE` is documentation only.
5. Images read-only हैं: code बदला तो **rebuild** करना होगा।
   Images are read-only: change the code and you must **rebuild**.
6. हर instruction एक **layer** है; सही order से builds तेज़ होते हैं।
   Each instruction is a **layer**; the right order makes builds fast.

## 🔁 The basic workflow
```
Dockerfile ──docker build──► Image ──docker run──► Container(s)
```
