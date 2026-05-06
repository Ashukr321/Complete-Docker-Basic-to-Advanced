# Docker Cleanup Commands

## 📌 Overview
यह फाइल Docker में unused resources को clean करने के commands को cover करती है।
This file covers commands for cleaning up unused Docker resources.

---

## 1. docker system prune
**Description:**
Dangling images, containers, volumes, और networks को remove करता है।
Removes dangling images, stopped containers, and unused networks.

**Syntax:**
```bash
docker system prune [OPTIONS]
```

**Options:**
```bash
docker system prune                 # सिर्फ dangling resources
docker system prune -a              # सभी unused resources
docker system prune -f              # Force without confirmation
docker system prune --volumes       # Volumes भी remove करो
```

**Example:**
```bash
# Safe cleanup - सिर्फ unused resources
$ docker system prune
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all dangling images
Are you sure you want to continue? [y/N] y

Deleted Containers:
abc123def456...

Deleted Networks:
old-network1
old-network2

Deleted Images:
deleted: sha256:xyz789...
Total reclaimed space: 500MB

# Aggressive cleanup - सभी unused
$ docker system prune -a
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all dangling images
  - all images without at least one container associated to them
  - all build cache
Are you sure? [y/N] y
```

**Detailed Explanation:**
- Docker को efficiently maintain करने के लिए regular cleanup जरूरी है
- `-a` flag से सभी unused images remove होती हैं (सिर्फ running containers की images बचती हैं)
- `--volumes` flag से unused volumes भी remove होती हैं
- Production environment में carefully use करें

**Reclaimed Space:**
- Old containers: कुछ MB
- Old images: सैकड़ों MB
- Total cleanup से significant disk space free हो सकती है

---

## 2. docker container prune
**Description:**
सभी stopped containers को remove करता है।
Removes all stopped containers.

**Syntax:**
```bash
docker container prune [OPTIONS]
```

**Options:**
```bash
docker container prune -f                    # Force deletion
docker container prune --filter "until=24h"  # 24h से पहले stopped containers
docker container prune --filter "status=exited"  # केवल exited containers
```

**Example:**
```bash
$ docker ps -a
CONTAINER ID   STATUS
abc123         Exited (0)
def456         Exited (1)
ghi789         Up 2 hours

$ docker container prune -f
Deleted Containers:
abc123def456...
def456ghi789...
Total reclaimed space: 250MB

$ docker ps -a
# सिर्फ running container दिखेगा
```

**Detailed Explanation:**
- केवल stopped/exited containers को remove करता है
- Running containers safe रहती हैं
- Development में frequently use कर सकते हो
- Filters से selective cleanup कर सकते हो

---

## 3. docker image prune
**Description:**
Dangling images को remove करता है।
Removes unused images.

**Syntax:**
```bash
docker image prune [OPTIONS]
```

**Options:**
```bash
docker image prune                  # Dangling images
docker image prune -a               # सभी unused images
docker image prune -f               # Force
docker image prune --filter "dangling=true"  # Dangling images filter
```

**Example:**
```bash
# Dangling images - जिनका कोई tag नहीं है
$ docker image prune
WARNING! This will remove all dangling images.
Are you sure? [y/N] y

Deleted Images:
deleted: sha256:abc123...
Total reclaimed space: 300MB

# सभी unused images
$ docker image prune -a
WARNING! This will remove all images without at least one container associated to them.
This may result in not being able to run containers!
Are you sure? [y/N] y

Deleted Images:
deleted: sha256:xyz789...
Total reclaimed space: 1.2GB
```

**Detailed Explanation:**
- Dangling images: किसी container में use नहीं, किसी tag भी नहीं
- `-a` flag से सभी unused images remove होती हैं
- Production में careful रहें - important images accident से delete न हों
- Large cleanup disk space free करता है

---

## 4. docker volume prune
**Description:**
Unused volumes को remove करता है।
Removes all unused volumes.

**Syntax:**
```bash
docker volume prune [OPTIONS]
```

**Options:**
```bash
docker volume prune -f                      # Force deletion
docker volume prune --filter "label!=keep"  # Filter के साथ
```

**Example:**
```bash
$ docker volume ls
DRIVER    VOLUME NAME
local     db-data
local     app-logs
local     temp-storage

$ docker volume prune -f
Deleted Volumes:
temp-storage
Total reclaimed space: 50MB

$ docker volume ls
# सिर्फ in-use volumes दिखेंगे
```

**Detailed Explanation:**
- केवल unused volumes remove होती हैं (किसी container में mount नहीं)
- Data loss हो सकता है - पहले backup लें
- Production databases के लिए careful रहें
- Named volumes को labeled करके protect कर सकते हो

---

## 5. docker network prune
**Description:**
Unused networks को remove करता है।
Removes unused networks.

**Syntax:**
```bash
docker network prune [OPTIONS]
```

**Example:**
```bash
$ docker network ls
NETWORK ID     NAME
abc123         my-network (in use)
def456         old-network (unused)

$ docker network prune -f
Deleted Networks:
old-network
Total reclaimed space: 1MB
```

---

## 6. Batch Operations (Multiple Commands)

### Remove All Stopped Containers
```bash
$ docker stop $(docker ps -a -q)
$ docker rm $(docker ps -a -q)

# या single command में
$ docker container prune -f
```

### Remove All Images
```bash
# ⚠️ Be careful with this!
$ docker rmi $(docker images -q)

# Force remove
$ docker rmi -f $(docker images -q)
```

### Stop All Running Containers
```bash
$ docker stop $(docker ps -a -q)

# Force stop
$ docker kill $(docker ps -a -q)
```

### Remove All Containers (Running and Stopped)
```bash
# ⚠️ Dangerous! यह सभी containers delete करेगा
$ docker rm -f $(docker ps -a -q)
```

**Detailed Explanation:**
- `$(...)` command substitution है
- `-q` flag सिर्फ IDs return करता है
- Multiple containers को एक साथ process कर सकते हो
- Automation scripts में use करते हो

---

## 7. docker build cache cleanup
**Description:**
Build cache को clear करता है।
Removes build cache.

**Syntax:**
```bash
docker builder prune [OPTIONS]
```

**Options:**
```bash
docker builder prune -f         # Force without confirmation
docker builder prune -a         # सभी build cache
```

**Example:**
```bash
$ docker builder prune
WARNING! This will remove all dangling build cache.
Are you sure? [y/N] y

Deleted build cache objects:
sha256:abc123...
Total reclaimed space: 100MB
```

---

## Disk Space Management

### Check Docker's Disk Usage
```bash
$ docker system df
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          15        3         2.5GB     1.8GB (72%)
Containers      8         2         500MB     450MB (90%)
Local Volumes   5         2         250MB     200MB (80%)
Build Cache     -         -         300MB     300MB (100%)
```

**Interpretation:**
- `TOTAL`: कुल resources
- `ACTIVE`: Currently in use
- `SIZE`: Total size
- `RECLAIMABLE`: Safe to delete space

### Monitor Cleanup Results
```bash
# Before cleanup
$ docker system df

# Cleanup करो
$ docker system prune -a --volumes

# After cleanup
$ docker system df
```

---

## Cleanup Strategy

### Development Environment
```bash
# Daily cleanup - safe
docker container prune -f
docker image prune -f

# Weekly aggressive cleanup
docker system prune -a -f --volumes
```

### Production Environment
```bash
# Conservative approach
docker container prune -f        # Only stopped containers

# Never use -a flag in production
# Explicitly manage images with tags
# Backup volumes before cleanup
```

### Scheduled Cleanup Script
```bash
#!/bin/bash
# cleanup.sh - Safe cleanup script

echo "Docker Cleanup Starting..."

# Backup critical volumes
docker volume inspect critical-db | grep Mountpoint

# Safe cleanup
docker container prune -f --filter "until=168h"  # 7 days
docker image prune -f --filter "until=168h"

# Report
echo "Docker Cleanup Completed"
docker system df
```

---

## Cleanup Checklist

```
Before Cleanup:
☐ Production data का backup लिया?
☐ Running services की list बनाई?
☐ Important images की list बनाई?
☐ Volumes की list बनाई?

Cleanup Steps:
☐ docker container prune -f
☐ docker image prune -f
☐ docker volume prune -f (carefully!)
☐ docker network prune -f
☐ docker system prune -a (optional)

After Cleanup:
☐ Critical services still running?
☐ Disk space freed?
☐ Backup से verify किया?
```

---

## Common Cleanup Scenarios

### Scenario 1: Development Machine Cleanup
```bash
# Development में unused stuff remove करना
$ docker system prune -a -f --volumes
# Result: Entire development environment reset
```

### Scenario 2: Build Machine Cleanup
```bash
# CI/CD server पर build cache cleanup
$ docker builder prune -a -f
$ docker image prune -a -f
# Result: Fresh build environment
```

### Scenario 3: Production Selective Cleanup
```bash
# केवल old data remove करना
$ docker container prune --filter "until=720h"  # 30 days
$ docker volume prune --filter "label!=production"
# Result: Selective cleanup with protection
```

### Scenario 4: Emergency Disk Space
```bash
# Disk almost full - maximum cleanup needed
$ docker system prune -a -f --volumes
$ docker image prune -a -f
$ docker builder prune -a -f
# Result: Maximum reclaimed space
```

---

## Quick Reference

| Command | Purpose | Data Loss Risk |
|---------|---------|----------------|
| `docker container prune` | Remove stopped containers | Low |
| `docker image prune` | Remove dangling images | Low |
| `docker image prune -a` | Remove unused images | Medium |
| `docker volume prune` | Remove unused volumes | High ⚠️ |
| `docker system prune` | General cleanup | Medium |
| `docker system prune -a` | Aggressive cleanup | High ⚠️ |
| `docker system prune -a --volumes` | Maximum cleanup | Critical ⚠️ |

---

## Reclaimed Space Example

```
Initial State:
  Images:     2.5GB
  Containers: 500MB
  Volumes:    250MB
  Total:      3.25GB

After: docker container prune -f
  Reclaimed:  300MB (containers)
  Total Now:  2.95GB

After: docker image prune -f
  Reclaimed:  150MB (dangling images)
  Total Now:  2.8GB

After: docker system prune -a -f
  Reclaimed:  1.2GB (unused images)
  Total Now:  1.6GB

After: docker volume prune -f
  Reclaimed:  200MB (unused volumes)
  Total Now:  1.4GB
```

---

## Safety Tips

✅ **Do:**
- Regular backups लें
- Development में aggressively cleanup करो
- Production में conservative रहो
- `-f` flag से पहले output देख लो
- Important images को tag करके protect करो

❌ **Don't:**
- Production में `-a` flag use करना without verification
- Volumes cleanup बिना backup के
- Build का cache महत्वपूर्ण हो तो delete न करो
- Running containers को accidentally delete करना

