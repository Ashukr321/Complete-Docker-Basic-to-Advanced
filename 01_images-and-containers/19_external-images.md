# Using & Running External (Pre-Built) Images

## 📌 Overview
हर image खुद बनाने की ज़रूरत नहीं है: **Docker Hub** पर `node`, `python`, `nginx`, `postgres` जैसी official images पहले से मौजूद हैं।
You don't have to build every image yourself: **Docker Hub** already has official images like `node`, `python`, `nginx` and `postgres`.

## 1. docker run node
```bash
docker run node
```
- Image local नहीं है तो Docker उसे Docker Hub से **pull** करता है, फिर container बनाकर start करता है।
  If the image isn't local, Docker **pulls** it from Docker Hub, then creates and starts a container.
- Container तुरंत **exit** हो जाता है, क्योंकि Node REPL को input चाहिए और कोई terminal attached नहीं है।
  The container **exits** right away: the Node REPL needs input and no terminal is attached.

## 2. Interactive तरीके से चलाना
```bash
docker run -it node
```
- `-i` = STDIN खुला रखता है (interactive), `-t` = terminal (TTY) देता है।
  `-i` keeps STDIN open (interactive), `-t` allocates a terminal (TTY).
- अब आप container के अंदर Node REPL में code लिख सकते हैं। बाहर आने के लिए `Ctrl+C` दो बार दबाएँ।
  Now you can type into the Node REPL inside the container. Press `Ctrl+C` twice to leave.

## 3. देखें क्या बना
```bash
docker images     # downloaded images
docker ps -a      # all containers, including exited ones
```

## 💡 Key takeaway
Pre-built images अक्सर आपकी **base image** बनती हैं: आप उनके ऊपर अपना code जोड़ते हैं।
Pre-built images usually become your **base image**: you add your own code on top of them.
