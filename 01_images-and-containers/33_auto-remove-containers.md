# Removing Stopped Containers Automatically

## 📌 Overview
हर `docker run` एक नया container बनाता है। Stopped containers जमा होते रहते हैं और `docker ps -a` भर जाता है।
Every `docker run` creates a new container. Stopped containers pile up and fill `docker ps -a`.

## ✅ --rm flag
```bash
docker run -p 3000:80 -d --rm myapp
```
- `--rm` = container **stop होते ही अपने आप delete** हो जाता है।
  `--rm` means the container is **deleted automatically as soon as it stops**.

## 💡 कब use करें / When to use it
- Code बदलने पर वैसे भी नई image और नया container बनेगा, तो पुराना रखने का कोई फ़ायदा नहीं।
  When code changes you build a new image and a new container anyway, so keeping the old one is pointless.
- Data जो रखना है वो container में नहीं, **volume** में रखें, ताकि `--rm` से data न जाए।
  Keep data you need in a **volume**, not in the container, so `--rm` doesn't lose it.
