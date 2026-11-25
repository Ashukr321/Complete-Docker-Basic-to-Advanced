# Removing Anonymous Volumes

## 📌 Overview
Anonymous volumes जल्दी जमा हो जाते हैं; उन्हें साफ़ करना ज़रूरी है।
Anonymous volumes pile up quickly; you need to clean them up.

## 🔄 कब delete होते हैं / When they get deleted
| Case | Anonymous volume |
|------|------------------|
| Container `--rm` के साथ चला / Container started with `--rm` | ✅ Container के साथ auto-delete / Auto-deleted with the container |
| Container बिना `--rm`, फिर `docker rm` / Without `--rm`, then `docker rm` | ❌ बचा रहता है / Left behind |
| `docker rm -v <container>` | ✅ उसके anonymous volumes भी हटते हैं / Its anonymous volumes are removed too |
| Named volume | ❌ कभी auto-delete नहीं / Never auto-deleted |

## ⚙️ Commands
```bash
docker volume ls                 # list volumes
docker volume rm <name-or-id>    # remove one (must not be used by a container)
docker volume prune              # remove unused anonymous volumes
docker volume prune -a           # also unused named volumes (Docker 23+)
```

## ⚠️ ध्यान दें / Watch out
- जो volume किसी container (stopped भी) से जुड़ा है उसे `rm` नहीं कर सकते; पहले container हटाओ।
  You can't `rm` a volume attached to any container (even a stopped one); remove the container first.
- `prune` से हटाया गया data वापस नहीं आता।
  Data removed with `prune` can't be recovered.

## 💡 Key takeaway
- `--rm` anonymous volumes को साफ़ रखता है; बाकी के लिए `docker volume prune`।
  `--rm` keeps anonymous volumes tidy; use `docker volume prune` for the rest.
