# Docker Image Management Commands

## 📌 Overview
यह फाइल Docker images को manage करने के सभी commands को cover करती है।
This file covers all commands for managing Docker images effectively.

---

## 1. docker images
**Description:**
Host पर available सभी Docker images को list करता है।
Lists all Docker images available on your system.

**Syntax:**
```bash
docker images [OPTIONS] [REPOSITORY[:TAG]]
```

**Options:**
```bash
docker images              # सभी images
docker images -a          # सभी images (dangling भी)
docker images -q          # सिर्फ Image IDs
docker images --digests   # Digests के साथ
docker images --no-trunc  # Untruncated output
```

**Output Example:**
```
REPOSITORY          TAG       IMAGE ID       CREATED         SIZE
nginx               latest    abc123def456   2 weeks ago     142MB
ubuntu              20.04     xyz789abc123   1 month ago     77.8MB
mysql               5.7       def456xyz789   3 weeks ago     355MB
<none>              <none>    ghi012jkl345   2 days ago      200MB
```

**Column Explanations:**
- `REPOSITORY`: Image का name (namespace/name format)
- `TAG`: Version label (default: latest)
- `IMAGE ID`: Unique identifier (SHA-256 का first 12 chars)
- `CREATED`: कब image create हुई
- `SIZE`: Image का total size disk पर

**Dangling Images:**
- `<none>:<none>` images जो किसी से reference नहीं हैं
- यह outdated layers हैं, cleanup के लिए candidates हैं

---

## 2. docker build
**Description:**
Dockerfile से नई image create करता है।
Creates a new Docker image from a Dockerfile.

**Syntax:**
```bash
docker build [OPTIONS] PATH | URL | -
```

**Common Options:**
```bash
docker build \
  -t my-image:1.0           # Tag image
  -f Dockerfile.custom      # Custom Dockerfile
  --no-cache                # Don't use build cache
  --build-arg VAR=value     # Build arguments
  .                         # Build context (current directory)
```

**Example - Basic Dockerfile:**
```dockerfile
FROM ubuntu:20.04

# Install packages
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip

# Set working directory
WORKDIR /app

# Copy files
COPY . /app/

# Install dependencies
RUN pip3 install -r requirements.txt

# Expose port
EXPOSE 5000

# Default command
CMD ["python3", "app.py"]
```

**Building Images:**
```bash
# Current directory से build करना
$ docker build -t my-python-app:1.0 .

# Custom Dockerfile के साथ
$ docker build -f production.dockerfile -t my-app:prod .

# Build arguments के साथ
$ docker build --build-arg ENV=production -t my-app:1.0 .

# No cache के साथ (fresh build)
$ docker build --no-cache -t my-app:1.0 .
```

**Detailed Explanation:**
- Dockerfile के instructions को follow करके image बनाता है
- हर layer अलग-अलग cache होती है (efficient rebuilds के लिए)
- Build context ध्यान रहे - जो .dockerignore में हो वो exclude होता है
- Multi-stage builds से final size को reduce कर सकते हो

**Best Practices:**
```dockerfile
# ❌ Single layer में सब कुछ
FROM ubuntu:20.04
RUN apt-get update && apt-get install -y python3 pip && \
    pip install django && \
    echo "Done"

# ✅ Multiple layers (caching efficient)
FROM ubuntu:20.04
RUN apt-get update && apt-get install -y python3 pip
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY app/ /app/
```

---

## 3. docker pull
**Description:**
Docker registry से image को download करता है।
Downloads a Docker image from a registry.

**Syntax:**
```bash
docker pull [OPTIONS] NAME[:TAG|@DIGEST]
```

**Example:**
```bash
# Latest tag pull करना
$ docker pull nginx

# Specific version pull करना
$ docker pull ubuntu:20.04

# Custom registry से pull करना
$ docker pull myregistry.azurecr.io/myimage:1.0

# Multiple tags एक साथ
$ docker pull -a ubuntu  # सभी tags pull करना
```

**Detailed Explanation:**
- Docker Hub या private registry से image download करता है
- Tag specify न करो तो "latest" default होता है
- Image layers को efficiently download करता है
- Already exist करने वाली layers को skip करता है

---

## 4. docker push
**Description:**
Local image को registry में upload करता है।
Uploads a Docker image to a registry.

**Syntax:**
```bash
docker push [OPTIONS] NAME[:TAG]
```

**Example:**
```bash
# Docker Hub पर push करना
$ docker tag my-app:1.0 ashukr321/my-app:1.0
$ docker push ashukr321/my-app:1.0

# Private registry पर push करना
$ docker tag my-app:1.0 myregistry.com/my-app:1.0
$ docker push myregistry.com/my-app:1.0

# Login करके push करना
$ docker login
$ docker push ashukr321/my-app:latest
```

**Detailed Explanation:**
- Local में बनाई गई images को registry में share करना
- Team members और production servers को accessible बनाना
- Public (Docker Hub) या private registries (ECR, ACR) में push कर सकते हो
- Image fully qualified name (registry/name:tag) होना चाहिए

---

## 5. docker tag
**Description:**
Existing image को नया tag (name) देता है।
Creates a new tag for an existing image.

**Syntax:**
```bash
docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
```

**Example:**
```bash
# Local से Docker Hub के लिए tag करना
$ docker tag my-app:1.0 ashukr321/my-app:1.0

# Multiple tags देना (same image, different names)
$ docker tag my-app:1.0 ashukr321/my-app:latest
$ docker tag my-app:1.0 myregistry.com/my-app:1.0

# Version control के लिए tags
$ docker tag my-app:1.0 my-app:production
$ docker tag my-app:1.0 my-app:staging
```

**Detailed Explanation:**
- Same image को multiple names से reference कर सकते हो
- Tags को version control करने के लिए use करते हो
- Push करने से पहले registry name के साथ tag करना होता है
- Image ID same रहती है (sirf reference बदलता है)

---

## 6. docker rmi
**Description:**
Docker image को delete करता है।
Removes one or more images.

**Syntax:**
```bash
docker rmi [OPTIONS] IMAGE [IMAGE...]
```

**Options:**
```bash
docker rmi -f IMAGE              # Force remove
docker rmi IMAGE1 IMAGE2         # Multiple images
docker rmi $(docker images -q)   # सभी images delete करना
```

**Example:**
```bash
# Single image delete करना
$ docker rmi ubuntu:20.04

# Image ID से delete करना
$ docker rmi abc123def456

# Force delete (containers से भी बेहतर)
$ docker rmi -f my-app:old

# सभी images delete करना
$ docker rmi $(docker images -q)
```

**Detailed Explanation:**
- Image को completely delete कर देता है
- Image से container running हो तो delete नहीं होगा
- `-f` flag force delete करता है (running containers को भी)
- Disk space free करने के लिए
- Cleanup के लिए important है

---

## 7. docker history
**Description:**
Image के layers और construction को display करता है।
Shows the layers and history of an image.

**Syntax:**
```bash
docker history [OPTIONS] IMAGE
```

**Options:**
```bash
docker history --no-trunc IMAGE    # Full output
docker history --quiet IMAGE       # सिर्फ IMAGE IDs
```

**Example:**
```bash
$ docker history nginx:latest
IMAGE          CREATED        CREATED BY                                      SIZE
abc123def456   2 weeks ago    CMD ["nginx" "-g" "daemon off;"]                0B
xyz789abc123   2 weeks ago    EXPOSE 80 443                                   0B
def456xyz789   2 weeks ago    RUN /bin/sh -c apt-get install -y nginx        50MB
ghi012jkl345   1 month ago    FROM ubuntu:20.04                               77.8MB
```

**Detailed Explanation:**
- Image कैसे बनी है वो trace कर सकते हो
- हर layer को देख सकते हो (Dockerfile का हर instruction)
- Layer sizes से optimize करने का opportunity मिलता है
- Image का provenance verify करने के लिए

---

## 8. docker inspect (for images)
**Description:**
Image की detailed metadata को display करता है।
Shows detailed information about an image.

**Syntax:**
```bash
docker inspect IMAGE
docker inspect --format='{{json .Config}}' IMAGE
```

**Example:**
```bash
$ docker inspect nginx | grep -i exposure
$ docker inspect ubuntu:20.04 --format='{{json .Config.ExposedPorts}}'
```

**Useful Formats:**
```bash
# Architecture
docker inspect IMAGE --format='{{.Architecture}}'

# OS
docker inspect IMAGE --format='{{.Os}}'

# Exposed ports
docker inspect IMAGE --format='{{.Config.ExposedPorts}}'

# Environment variables
docker inspect IMAGE --format='{{json .Config.Env}}'

# Default command
docker inspect IMAGE --format='{{.Config.Cmd}}'
```

---

## 9. docker save
**Description:**
Image को tar archive में save करता है।
Exports one or more images to a tar archive.

**Syntax:**
```bash
docker save [OPTIONS] IMAGE [IMAGE...] > file.tar
```

**Example:**
```bash
# Single image save करना
$ docker save nginx:latest > nginx.tar

# Multiple images एक साथ
$ docker save nginx:latest ubuntu:20.04 > images.tar

# Compressed format
$ docker save nginx:latest | gzip > nginx.tar.gz

# Different server पर transfer करना
$ docker save my-app:1.0 | ssh user@server docker load
```

**Detailed Explanation:**
- Image को portable format में export करता है
- Offline transfer या backup के लिए
- Large images को compress करके transfer कर सकते हो
- AIR-GAPPED environments में transfer के लिए

---

## 10. docker load
**Description:**
Tar archive से image को load करता है।
Imports images from a tar archive.

**Syntax:**
```bash
docker load [OPTIONS] < file.tar
docker load --input file.tar
```

**Example:**
```bash
# Tar file से load करना
$ docker load < nginx.tar

# Compressed file से
$ docker load < nginx.tar.gz

# Remote से directly
$ ssh user@remote "docker save my-app:1.0" | docker load
```

**Detailed Explanation:**
- `docker save` का reverse operation
- Transferred images को local में import करना
- CI/CD pipelines में image distribution के लिए

---

## 11. docker search
**Description:**
Docker Hub पर images को search करता है।
Searches for images on Docker Hub.

**Syntax:**
```bash
docker search [OPTIONS] TERM
```

**Options:**
```bash
docker search --limit 50 nginx      # Limit results
docker search --stars 100 nginx     # Minimum stars
docker search --no-trunc nginx      # Full output
```

**Example:**
```bash
$ docker search nginx
NAME                        DESCRIPTION                  STARS   OFFICIAL
nginx                       Official build of Nginx      18000   [OK]
jwilder/nginx-proxy         Nginx proxy                  2000
bitnami/nginx               Bitnami Nginx Docker Image   500
```

**Detailed Explanation:**
- Docker Hub पर publicly available images का discovery
- Official vs community images को differentiate कर सकते हो
- Stars popular images identify करने में help करते हैं
- Open source projects के लिए

---

## 12. docker import vs docker load

| Aspect | docker load | docker import |
|--------|------------|---------------|
| Source | `docker save` से exported tar | Any tar (container export) |
| Layers | Layer info retain रहती है | Flattened (single layer) |
| Use | Image backup/transfer | Container to image conversion |
| Size | Smaller (layers retained) | Larger (flattened) |

---

## 13. Dockerfile Best Practices

### Multi-Stage Build:
```dockerfile
# Build stage
FROM golang:1.16 AS builder
WORKDIR /app
COPY . .
RUN go build -o app .

# Production stage (छोटी size)
FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/app .
CMD ["./app"]
```

### Layer Caching:
```dockerfile
# ❌ Change हर बार सब कुछ rebuild करेगा
FROM ubuntu:20.04
COPY . /app/
RUN apt-get update && apt-get install -y python3

# ✅ Dependencies पहले, फिर code
FROM ubuntu:20.04
RUN apt-get update && apt-get install -y python3
COPY requirements.txt .
RUN pip3 install -r requirements.txt
COPY . /app/
```

### Minimize Size:
```dockerfile
# Single RUN instruction में सब कुछ
RUN apt-get update && \
    apt-get install -y python3 pip && \
    pip3 install -r requirements.txt && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

---

## Image Registry Types

```
┌─────────────────────────────────────────┐
│         Docker Registry Types            │
├─────────────────────────────────────────┤
│ 1. Docker Hub (Public)                   │
│    - Free tier: 1 private repo           │
│    - docker.io (default registry)        │
│                                          │
│ 2. Cloud Registries                      │
│    - Amazon ECR (Elastic Container...)   │
│    - Azure ACR (Container Registry)      │
│    - Google GCR (Container Registry)     │
│                                          │
│ 3. Self-Hosted                           │
│    - Docker Registry (OSS)               │
│    - Nexus, Artifactory                  │
│    - Harbor, Quay                        │
│                                          │
│ 4. Private Registries                    │
│    - Enterprise Docker registries        │
└─────────────────────────────────────────┘
```

---

## Quick Reference

| Command | Purpose | Output |
|---------|---------|--------|
| `docker images` | List images | All images with size |
| `docker build` | Create image from Dockerfile | Image ID |
| `docker pull` | Download image | Image layers |
| `docker push` | Upload image | Registry confirmation |
| `docker tag` | Label image | New tag created |
| `docker rmi` | Delete image | Deletion confirmation |
| `docker history` | Show layers | Layer-by-layer breakdown |
| `docker inspect` | Image metadata | JSON metadata |
| `docker save` | Export to tar | Tar file |
| `docker load` | Import from tar | Image imported |
| `docker search` | Find on Hub | Search results |

---

## Image Workflow

```
┌─────────────────┐
│  Write Code     │
└────────┬────────┘
         │
         ▼
┌─────────────────────┐
│ Create Dockerfile   │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐     ┌──────────────┐
│   docker build  ────┼────→│  Local Image │
└────────┬────────────┘     └────────┬─────┘
         │                           │
         │                    ┌──────▼──────┐
         │                    │docker run...|
         │                    └─────────────┘
         │
    ┌────▼──────┐
    │docker tag │
    └────┬──────┘
         │
         ▼
    ┌─────────────┐
    │docker push  │
    └────┬────────┘
         │
         ▼
    ┌──────────────────┐
    │ Registry/Hub     │
    └──────────────────┘
```

