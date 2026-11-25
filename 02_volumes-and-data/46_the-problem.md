# Understanding the Problem

## 📌 Overview
Feedback save होता है, लेकिन सिर्फ़ container के अंदर; host machine के project folder में कोई file नहीं आती।
Feedback is saved, but only inside the container; no file appears in the project folder on the host.

## 🧪 Experiment
| Action | Data बचा? / Data kept? |
|--------|------------------------|
| `docker stop` → `docker start` (same container) | ✅ हाँ — writable layer वही है / Yes — same writable layer |
| `docker rm` या `--rm` के साथ stop / `docker rm` or stop with `--rm` | ❌ नहीं — layer delete / No — layer deleted |
| Same image से नया container / New container from the same image | ❌ नहीं — नई खाली layer / No — fresh empty layer |

```bash
docker run -p 3000:80 -d --name feedback-app --rm feedback-node
# submit feedback, then
docker stop feedback-app     # --rm → container removed → feedback gone
```

## ⚠️ क्यों ज़रूरी है / Why it matters
- Containers को बार-बार हटाना और नया बनाना normal है (नया image version, scaling)।
  Removing and recreating containers is normal (new image version, scaling).
- इसलिए permanent data container layer में नहीं रह सकता।
  So permanent data can't live in the container layer.

## 💡 Key takeaway
- Container layer = container जितनी ही ज़िंदगी; permanent data के लिए **volumes** चाहिए।
  The container layer lives only as long as the container; permanent data needs **volumes**.
