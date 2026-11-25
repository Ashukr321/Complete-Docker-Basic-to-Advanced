# Attaching to an Already-Running Container

## 📌 Overview
Container detached mode में चल रहा है और अब आप उसका output देखना चाहते हैं? उसे दोबारा start करने की ज़रूरत नहीं।
A container is running detached and you want its output? No need to restart it.

## ⚙️ Commands
```bash
docker attach <name-or-id>    # attach your terminal to its output
docker logs -f <name-or-id>   # or just follow its logs
```

## ⚠️ ध्यान दें / Careful
- `docker attach` के बाद `Ctrl+C` दबाने से अक्सर **container भी रुक जाता है**।
  After `docker attach`, pressing `Ctrl+C` often **stops the container too**.
- सिर्फ़ logs देखने के लिए `docker logs -f` ज़्यादा safe है: `Ctrl+C` से बस following रुकती है।
  For just watching logs, `docker logs -f` is safer: `Ctrl+C` only stops following.
