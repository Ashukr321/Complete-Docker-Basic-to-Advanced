# Understanding Attached & Detached Containers

## 📌 Overview

| Mode | Hindi | English |
|------|-------|---------|
| **Attached** | Terminal container के output से जुड़ा रहता है; logs सीधे दिखते हैं | Your terminal is tied to the container's output; logs stream live |
| **Detached** | Container background में चलता है; terminal free | The container runs in the background; your terminal is free |

## ⚙️ Commands
```bash
docker run -p 3000:80 myapp        # attached (default for run)
docker run -p 3000:80 -d myapp     # detached
docker start myapp_container       # detached (default for start)
docker start -a myapp_container    # attached
```

## 📜 Detached container के logs
```bash
docker logs <name>        # print the logs so far
docker logs -f <name>     # follow new logs live (Ctrl+C stops following, not the container)
```

## 💡 कब कौन सा? / When to use which
- Output देखना है (debugging) → **attached**।
  You want to watch the output (debugging) → **attached**.
- Server लंबे समय तक चलाना है → **detached** (`-d`) और ज़रूरत पड़ने पर `docker logs`।
  A long-running server → **detached** (`-d`), and `docker logs` when needed.
