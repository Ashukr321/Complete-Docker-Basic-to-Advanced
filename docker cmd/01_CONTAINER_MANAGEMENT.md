# Docker Container Management Commands

## 📌 Overview
यह फाइल Docker containers को manage करने के लिए advanced commands को cover करती है।
This file covers advanced commands for managing Docker containers effectively.

---

## 1. docker create
**Description:**
Container create करता है लेकिन run नहीं करता।
Creates a container without starting it.

**Syntax:**
```bash
docker create [OPTIONS] IMAGE [COMMAND] [ARG...]
```

**Common Options:**
```bash
docker create \
  -a stdout          # Attach stdout
  -i                 # Interactive (keep stdin open)
  -t                 # Allocate pseudo-terminal
  --name my-app      # Name for the container
  -p 5000:5000       # Port mapping
  --expose 5432      # Expose port (internal communication)
  -P                 # Publish all exposed ports
  -v /host:/app      # Volume mount
  -e VAR=value       # Environment variable
  --link db:db       # Link another container
  --cpus 1           # CPU limit
  -m 256m            # Memory limit
  IMAGE
```

**Detailed Explanation:**
- Container को create करता है, लेकिन तुरंत run नहीं होता
- Later में `docker start` से run कर सकते हो
- Container को prepare करना है लेकिन immediate start नहीं करना - यह useful है
- Configuration को thoroughly review करने का मौका देता है

**Example:**
```bash
# MySQL container बनाना लेकिन तुरंत start न करना
$ docker create \
  --name mysql-db \
  -e MYSQL_ROOT_PASSWORD=secret \
  -p 3306:3306 \
  -v mysql-data:/var/lib/mysql \
  mysql:5.7

# अब जब तैयार हों तो start करो
$ docker start mysql-db
```

**Use Cases:**
- Containers को batch में prepare करना
- Testing environment को pre-configure करना
- CI/CD pipelines में controlled setup

---

## 2. docker rename
**Description:**
Container का name बदलता है।
Changes the name of an existing container.

**Syntax:**
```bash
docker rename OLD_NAME NEW_NAME
```

**Example:**
```bash
$ docker rename old-nginx new-nginx
$ docker ps  # नया name दिखेगा
```

**Detailed Explanation:**
- Container को rename करना organization के लिए helpful है
- Running या stopped दोनों containers को rename कर सकते हो
- Container का functionality affected नहीं होता

---

## 3. docker update
**Description:**
Running container की configuration को update करता है।
Modifies configuration of a running container.

**Syntax:**
```bash
docker update [OPTIONS] CONTAINER [CONTAINER...]
```

**Common Options:**
```bash
docker update \
  --cpus 2              # CPU cores limit (2 cores)
  --memory 512m         # Memory limit (512 MB)
  --memory-swap 1g      # Swap memory limit
  --cpu-shares 1024     # CPU shares (relative priority)
  --restart always      # Restart policy
  CONTAINER
```

**Example:**
```bash
# Container को 2 CPU cores limit देना
$ docker update --cpus 2 my-app

# Memory limit को 512MB में set करना
$ docker update --memory 512m my-app

# Restart policy को "always" में set करना
$ docker update --restart always my-app
```

**Detailed Explanation:**
- Live container को restart किए बिना resources adjust कर सकते हो
- Production में performance tuning के लिए useful है
- Memory leaks handle करने के लिए या resource optimization के लिए

**Restart Policies:**
- `no`: Automatically restart न करो (default)
- `always`: हमेशा restart करो, अगर stopped हो
- `unless-stopped`: `always` जैसे है, लेकिन explicitly stopped containers को restart नहीं करेगा
- `on-failure`: सिर्फ non-zero exit code पर restart करो
- `on-failure:max-retries`: Limited retries के साथ

---

## 4. docker pause / docker unpause
**Description:**
Container को pause (freeze) करता है / resume करता है।
Suspends/Resumes all processes in a container.

**Syntax:**
```bash
docker pause CONTAINER
docker unpause CONTAINER
```

**Detailed Explanation:**
- `docker pause`: सभी processes को freeze कर देता है (memory में alive रहते हैं)
- `docker unpause`: Processes को resume करता है
- `docker stop` से अलग है - `stop` graceful shutdown करता है
- Container का state और memory intact रहता है
- Testing scenarios में useful है

**Example:**
```bash
# Process को freeze करो
$ docker pause my-app

# Status check करो - "Paused" दिखेगा
$ docker ps

# Resume करो
$ docker unpause my-app
```

---

## 5. docker restart
**Description:**
Running container को restart करता है।
Stops and then starts a container.

**Syntax:**
```bash
docker restart [OPTIONS] CONTAINER [CONTAINER...]
```

**Options:**
```bash
docker restart -t 10 CONTAINER  # 10 seconds timeout before SIGKILL
```

**Example:**
```bash
$ docker restart my-nginx
$ docker restart -t 5 app1 app2  # 5 second timeout for 2 containers
```

**Detailed Explanation:**
- `docker stop` फिर `docker start` करने के बराबर है
- Container को gracefully restart करता है
- `-t` option SIGKILL से पहले wait करने का time specify करता है
- Configuration changes apply करने के लिए useful है

---

## 6. docker wait
**Description:**
Container के exit होने का wait करता है और exit code return करता है।
Blocks until a container stops and returns the exit code.

**Syntax:**
```bash
docker wait CONTAINER [CONTAINER...]
```

**Example:**
```bash
# Container exit होने का wait करो
$ docker wait my-backup-job
0  # Exit code 0 = successful

# Scripting में useful
$ docker wait process-job && echo "Job completed successfully"
```

**Use Cases:**
- Batch processing scripts
- Job scheduling
- Dependent container operations

---

## 7. docker attach
**Description:**
Running container के stdin, stdout, stderr को attach करता है।
Attaches your terminal to the container's output.

**Syntax:**
```bash
docker attach CONTAINER
```

**Example:**
```bash
$ docker attach my-app
# अब आप container के output को real-time में देख सकते हो
# Ctrl+C से exit कर सकते हो
```

**vs docker exec:**
- `docker attach`: Container के main process से directly connect करता है
- `docker exec`: Container के अंदर नया process spawn करता है

---

## 8. docker kill
**Description:**
Container को immediately kill करता है (SIGKILL)।
Sends SIGKILL signal to immediately terminate a container.

**Syntax:**
```bash
docker kill [OPTIONS] CONTAINER [CONTAINER...]
```

**Options:**
```bash
docker kill -s SIGNAL CONTAINER  # Custom signal भेजना
```

**Example:**
```bash
# Container को immediately kill करो
$ docker kill my-app

# Specific signal भेजना
$ docker kill -s SIGTERM my-app
```

**Detailed Explanation:**
- `docker stop` graceful है, `docker kill` forceful है
- SIGKILL भेजता है जिसे ignore नहीं किया जा सकता
- Stuck containers को force close करने के लिए
- Data loss हो सकता है, इसलिए last resort है

---

## 9. docker diff
**Description:**
Container के filesystem में changes को display करता है।
Shows changes made to the container's filesystem.

**Syntax:**
```bash
docker diff CONTAINER
```

**Output:**
- `A` = File added
- `D` = File deleted
- `C` = File modified

**Example:**
```bash
$ docker diff my-app
C /etc/nginx/nginx.conf
A /app/new_file.txt
D /app/old_file.txt
```

**Detailed Explanation:**
- Debugging के लिए useful है - क्या-क्या changes हुई check करना
- Image से compare करके changes देख सकते हो
- Container commit करने से पहले changes verify करने के लिए

---

## 10. docker top
**Description:**
Container में running processes को display करता है।
Shows running processes inside a container.

**Syntax:**
```bash
docker top CONTAINER [ps OPTIONS]
```

**Example:**
```bash
$ docker top my-app
UID    PID    PPID   C   STIME   TTY   TIME     CMD
root   1      0      0   10:30   ?     00:00:01 /bin/sh
root   15     1      0   10:31   ?     00:00:05 python app.py
```

**Detailed Explanation:**
- Container के अंदर कौन-कौन से processes run हो रही हैं
- PID (Process ID), CPU usage, memory आदि देख सकते हो
- Performance analysis के लिए
- Zombies processes identify करने के लिए

---

## 11. docker port
**Description:**
Container की port mappings को display करता है।
Shows port mappings for a container.

**Syntax:**
```bash
docker port CONTAINER [PRIVATE_PORT[/PROTO]]
```

**Example:**
```bash
$ docker port my-nginx
80/tcp -> 0.0.0.0:8080
443/tcp -> 0.0.0.0:8443

$ docker port my-nginx 80
0.0.0.0:8080
```

**Detailed Explanation:**
- Container के exposed ports को check करना
- Host पर किस port पर accessible है
- Multiple ports की mapping देख सकते हो

---

## 12. docker commit
**Description:**
Running container को image में convert करता है।
Creates a new image from a container's changes.

**Syntax:**
```bash
docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
```

**Options:**
```bash
docker commit -m "message" -a "author" CONTAINER new-image:tag
```

**Example:**
```bash
# Container को modify करके new image बनाना
$ docker run -it ubuntu bash
root@container:/# apt-get update && apt-get install -y curl
root@container:/# exit

# Modified container से image बनाना
$ docker commit -m "Added curl" -a "Ashutosh" container-id my-custom-ubuntu:1.0

# New image से container run करना
$ docker run my-custom-ubuntu:1.0 curl --version
```

**Detailed Explanation:**
- Container में जो भी changes किए हैं वो new image में save होते हैं
- Layered filesystem में changes record होते हैं
- Dockerfile alternative - लेकिन reproducible नहीं है
- One-off customizations के लिए use कर सकते हो

---

## 13. docker export / docker import
**Description:**
Container को tar archive में export करता है / Import करता है।
Exports a container's filesystem as a tar archive.

**Syntax:**
```bash
docker export CONTAINER > container.tar
docker import container.tar new-image:tag
```

**Example:**
```bash
# Container को export करना
$ docker export my-app > my-app.tar

# Tar file को image में import करना
$ docker import my-app.tar my-app-image:1.0

# Remote server से import करना
$ docker import http://example.com/container.tar my-image:tag
```

**Detailed Explanation:**
- Complete container को portable format में save करता है
- Container को दूसरे server पर transfer करना आसान हो जाता है
- Layer information remove हो जाती है (flattened image बनती है)
- Container migration या backup के लिए

---

## 14. docker cp
**Description:**
Host और container के बीच files copy करता है।
Copies files between host and container.

**Syntax:**
```bash
docker cp CONTAINER:SRC_PATH HOST_DEST_PATH
docker cp HOST_SRC_PATH CONTAINER:DEST_PATH
```

**Example:**
```bash
# Container से host में copy करना
$ docker cp my-app:/app/config.json ./config.json

# Host से container में copy करना
$ docker cp ./data.txt my-app:/app/data.txt

# Entire directory copy करना
$ docker cp my-app:/app/logs ./logs
```

**Detailed Explanation:**
- Container के अंदर/बाहर files transfer करना
- Container run हो रहा हो या stopped हो सकता है
- Backup, logs retrieval, या configuration files share करने के लिए
- Volume mount की तरह persistent नहीं है

---

## 15. docker prune (Container specific)
**Description:**
Stopped containers को remove करता है।
Removes all stopped containers.

**Syntax:**
```bash
docker container prune [OPTIONS]
```

**Options:**
```bash
docker container prune -f              # Force without confirmation
docker container prune --filter "until=24h"  # Only containers stopped 24h ago
```

**Example:**
```bash
$ docker container prune
WARNING! This will remove all stopped containers.
Are you sure? [y/N] y

Deleted Containers:
abc123...
def456...
```

---

## Docker Container States

```
        ┌─────────┐
        │ created │
        └────┬────┘
             │
             ▼
        ┌─────────┐      pause      ┌─────────┐
        │ running ├──────────────────► paused  │
        └────┬────┘      unpause     └─────────┘
             │
        stop │
             ▼
        ┌─────────┐
        │ stopped │
        └────┬────┘
             │
             ▼ remove
        ┌─────────┐
        │ removed │
        └─────────┘
```

---

## Quick Reference Table

| Command | Purpose | Container State |
|---------|---------|-----------------|
| `docker create` | Create container | Created |
| `docker run` | Create & run | Running |
| `docker start` | Start stopped | Running |
| `docker pause` | Freeze processes | Paused |
| `docker unpause` | Resume processes | Running |
| `docker restart` | Restart container | Running |
| `docker stop` | Graceful shutdown | Stopped |
| `docker kill` | Force shutdown | Stopped |
| `docker wait` | Wait for exit | - |
| `docker attach` | Connect to output | - |
| `docker rm` | Delete container | Removed |

