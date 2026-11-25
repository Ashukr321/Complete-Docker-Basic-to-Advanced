# Managing Docker Volumes

## 📌 Overview
`docker volume` commands से volumes देख, बना, inspect और हटा सकते हैं। Bind mounts यहाँ नहीं दिखते क्योंकि Docker उन्हें manage नहीं करता।
`docker volume` commands list, create, inspect and remove volumes. Bind mounts don't appear here because Docker doesn't manage them.

## ⚙️ Commands
```bash
docker volume ls                       # list volumes
docker volume create feedback-files    # create a named volume up front
docker volume inspect feedback         # details: Mountpoint, CreatedAt, Driver
docker volume rm feedback              # remove (not while a container uses it)
docker volume prune                    # remove unused anonymous volumes
```

## 🔍 `inspect` output
```json
[{ "Name": "feedback", "Driver": "local",
   "Mountpoint": "/var/lib/docker/volumes/feedback/_data",
   "Scope": "local" }]
```
- Docker Desktop पर `Mountpoint` Docker के VM के अंदर का path है, आपके Mac/Windows का नहीं।
  On Docker Desktop, `Mountpoint` is a path inside Docker's VM, not on your Mac/Windows host.
- Volume पहले से नहीं है तो `docker run -v name:/path` उसे अपने-आप बना देता है।
  If a volume doesn't exist, `docker run -v name:/path` creates it automatically.

## ⚠️ ध्यान दें / Watch out
- Named volume हटाने से उसका data हमेशा के लिए चला जाता है।
  Removing a named volume deletes its data permanently.

## 💡 Key takeaway
- `ls` → देखो, `inspect` → समझो, `rm`/`prune` → साफ़ करो।
  `ls` → see, `inspect` → understand, `rm`/`prune` → clean up.
