# Stopping & Restarting Containers

## 📌 docker run vs docker start
- `docker run` हर बार **नया container** बनाता है (image से)।
  `docker run` always creates a **new container** from an image.
- `docker start` एक **पुराने (stopped) container** को फिर से चलाता है।
  `docker start` restarts an **existing (stopped) container**.

अगर code या image नहीं बदली, तो नया container बनाने की ज़रूरत नहीं: पुराना ही start करें।
If neither the code nor the image changed, there's no need for a new container: just restart the old one.

## 🔁 Commands
```bash
docker ps -a                  # find stopped containers (STATUS: Exited)
docker start <name-or-id>     # restart it (runs in the background)
docker stop <name-or-id>      # stop it gracefully
docker restart <name-or-id>   # stop + start in one step
```

## 💡 Note
`docker start` default रूप से **detached** mode में चलता है: terminal free रहता है।
`docker start` runs in **detached** mode by default, so your terminal stays free.

`docker run` default रूप से **attached** होता है। अगले lesson में इसका फ़र्क देखेंगे।
`docker run` is **attached** by default. The next lesson explains the difference.
