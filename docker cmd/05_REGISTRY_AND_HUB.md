# Docker Registry & Hub Commands

## 📌 Overview
यह फाइल Docker Registry, Docker Hub, और image distribution को manage करने के commands को cover करती है।
This file covers commands for working with Docker registries and image repositories.

---

## 1. docker login
**Description:**
Docker registry (या Docker Hub) में authenticate करता है।
Authenticates to a Docker registry.

**Syntax:**
```bash
docker login [OPTIONS] [SERVER]
```

**Common Registries:**
```bash
docker login                           # Docker Hub (default)
docker login -u username -p password   # Username/password के साथ
docker login myregistry.com            # Custom registry
docker login 127.0.0.1:5000           # Self-hosted registry
```

**Example:**
```bash
# Docker Hub में login करना
$ docker login
Login with your Docker ID to push and pull images from Docker Hub.
If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username: ashukr321
Password: ********
Login Succeeded

# Custom registry में login करना
$ docker login myregistry.azurecr.io
Username: ashukr321
Password: ********

# Credentials से login (scripts में)
$ docker login -u ashukr321 -p mypassword myregistry.com
```

**Detailed Explanation:**
- Registry में authenticate करने के लिए required है
- Credentials `~/.docker/config.json` में store होती हैं (Linux/Mac)
- Windows में `%USERPROFILE%\.docker\config.json` में
- Login के बाद push/pull operations कर सकते हो

**Supported Registries:**
- Docker Hub (`docker.io`)
- Amazon ECR (`amazonaws.com`)
- Azure ACR (`azurecr.io`)
- Google GCR (`gcr.io`)
- Self-hosted (Private registry)

---

## 2. docker pull
**Description:**
Registry से image को download करता है।
Downloads a Docker image from a registry.

**Syntax:**
```bash
docker pull [OPTIONS] NAME[:TAG|@DIGEST]
```

**Example:**
```bash
# Default tag (latest)
$ docker pull nginx

# Specific version
$ docker pull ubuntu:20.04

# Custom registry
$ docker pull myregistry.com/my-app:1.0

# Multiple tags एक साथ
$ docker pull -a ubuntu  # सभी tags

# Private registry (login के बाद)
$ docker pull myregistry.azurecr.io/my-app:latest
```

**Detailed Explanation:**
- Image को layer-by-layer download करता है
- Already downloaded layers को skip करता है (efficient)
- Large images को slow network में resume कर सकते हो
- Registry URL के साथ image path:
  - `nginx` = `docker.io/library/nginx:latest` (Docker Hub official)
  - `ashukr321/my-app` = `docker.io/ashukr321/my-app:latest` (Docker Hub user)
  - `myregistry.com/namespace/app` = Custom registry

**Output:**
```
latest: Pulling from library/nginx
e96e057b8ed0: Pull complete
1234567890ab: Pull complete
Digest: sha256:abc123...
Status: Downloaded newer image for nginx:latest
```

---

## 3. docker push
**Description:**
Local image को registry में upload करता है।
Uploads a Docker image to a registry.

**Syntax:**
```bash
docker push [OPTIONS] NAME[:TAG]
```

**Workflow:**
```bash
# 1. Local image बनाओ
$ docker build -t my-app:1.0 .

# 2. Registry के लिए tag करो
$ docker tag my-app:1.0 ashukr321/my-app:1.0

# 3. Login करो (पहली बार)
$ docker login

# 4. Push करो
$ docker push ashukr321/my-app:1.0

# Shortcut - single command
$ docker push ashukr321/my-app:1.0
```

**Example:**
```bash
# Docker Hub पर push करना
$ docker tag my-app:1.0 ashukr321/my-app:1.0
$ docker push ashukr321/my-app:1.0

# Custom registry पर push करना
$ docker tag my-app:1.0 myregistry.com/prod/my-app:1.0
$ docker push myregistry.com/prod/my-app:1.0

# Multiple tags एक साथ push करना
$ docker tag my-app:1.0 ashukr321/my-app:latest
$ docker push ashukr321/my-app:latest
```

**Detailed Explanation:**
- Push से पहले registry के लिए tag करना जरूरी है
- Tag में registry name, namespace, image name, और version होते हैं
- Layers को efficiently upload करता है (already existing skip करता है)
- Push failed हो तो restart automatically होता है

**Output:**
```
1.0: Pushing
e96e057b8ed0: Pushed
1234567890ab: Pushed
latest: digest: sha256:abc123... size: 5000
```

---

## 4. docker search
**Description:**
Docker Hub पर images को search करता है।
Searches for images on Docker Hub.

**Syntax:**
```bash
docker search [OPTIONS] TERM
```

**Options:**
```bash
docker search nginx                    # Basic search
docker search --limit 100 nginx        # Results limit
docker search --no-trunc nginx         # Full output
docker search --stars 50 nginx         # Minimum stars
docker search --is-official nginx      # Official images only
docker search --is-automated nginx     # Automated builds only
```

**Example:**
```bash
$ docker search nginx
NAME                           DESCRIPTION                   STARS
nginx                          Official build of Nginx       18000  [OK]
jwilder/nginx-proxy            Automated Nginx reverse pro.  2000
bitnami/nginx                  Bitnami Nginx Docker Image    500
ubuntu/nginx                   Nginx, a high-performance..   100

$ docker search --stars 1000 nginx
# केवल 1000+ stars वाली images

$ docker search --is-official nginx
# सिर्फ official images
```

**Detailed Explanation:**
- Docker Hub पर publicly available images का discovery
- `[OK]` mark official images indicate करते हैं
- Stars popularity को represent करते हैं
- Open source projects explore करने के लिए useful है

**Columns:**
- `NAME`: Full image name
- `DESCRIPTION`: Image का description
- `STARS`: Community stars (popularity)
- `[OK]`: Official image का indicator
- `[AUTOMATED]`: Automated build indicator

---

## 5. docker logout
**Description:**
Docker registry से logout करता है।
Logs out from a Docker registry.

**Syntax:**
```bash
docker logout [SERVER]
```

**Example:**
```bash
# Docker Hub से logout
$ docker logout

# Custom registry से logout
$ docker logout myregistry.com
```

**Detailed Explanation:**
- Registry credentials को remove करता है
- Shared machines पर security के लिए important है
- Logout के बाद pull/push के लिए फिर से login करना होगा

---

## 6. Registry Types

### Docker Hub (Cloud - Public/Private)
```bash
# Docker Hub official image pull करना
$ docker pull nginx

# Username के साथ personal image
$ docker pull ashukr321/my-app

# Private image (login के बाद)
$ docker login
$ docker pull ashukr321/private-app
```

**Features:**
- Free tier: 1 private repository
- Automated builds from GitHub
- Webhooks
- Team management

---

### Amazon ECR (Elastic Container Registry)
```bash
# AWS credentials setup करना जरूरी है
$ aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin \
  123456789.dkr.ecr.us-east-1.amazonaws.com

# Pull करना
$ docker pull 123456789.dkr.ecr.us-east-1.amazonaws.com/my-repo:1.0

# Push करना
$ docker tag my-app:1.0 123456789.dkr.ecr.us-east-1.amazonaws.com/my-repo:1.0
$ docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/my-repo:1.0
```

---

### Azure Container Registry (ACR)
```bash
# Login करना
$ az acr login --name myregistry

# Pull करना
$ docker pull myregistry.azurecr.io/my-app:1.0

# Push करना
$ docker tag my-app:1.0 myregistry.azurecr.io/my-app:1.0
$ docker push myregistry.azurecr.io/my-app:1.0
```

---

### Google Container Registry (GCR)
```bash
# Authentication setup
$ gcloud auth configure-docker

# Pull करना
$ docker pull gcr.io/my-project/my-app:1.0

# Push करना
$ docker tag my-app:1.0 gcr.io/my-project/my-app:1.0
$ docker push gcr.io/my-project/my-app:1.0
```

---

### Self-Hosted Registry
```bash
# Local registry start करना (development के लिए)
$ docker run -d -p 5000:5000 --name registry registry:2

# Tag करना
$ docker tag my-app:1.0 localhost:5000/my-app:1.0

# Push करना
$ docker push localhost:5000/my-app:1.0

# Pull करना
$ docker pull localhost:5000/my-app:1.0
```

---

## Image Naming Convention

```
┌─────────────────────────────────────────────────────┐
│       [REGISTRY[:PORT]/]REPOSITORY[:TAG]            │
├─────────────────────────────────────────────────────┤
│                                                     │
│  registry.com/namespace/image-name:version        │
│  ▲            ▲         ▲                 ▲        │
│  │            │         │                 │        │
│  │            │         │                 └─ TAG   │
│  │            │         └─────────── IMAGE NAME   │
│  │            └──────────── NAMESPACE/USER       │
│  └────────────── REGISTRY (optional, default: docker.io)
│                                                     │
│  Examples:                                         │
│  - nginx                  (Docker Hub official)    │
│  - ashukr321/my-app       (Docker Hub user)       │
│  - gcr.io/project/app     (Google GCR)           │
│  - myregistry.com/app     (Custom registry)      │
└─────────────────────────────────────────────────────┘
```

---

## Image Distribution Workflow

```
┌──────────────┐
│ Build Image  │
│  docker build│
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│ Tag Image        │
│ docker tag       │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Test Image       │
│ docker run       │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Login Registry   │
│ docker login     │
└──────┬───────────┘
       │
       ▼
┌──────────────────────┐
│ Push to Registry     │
│ docker push          │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────────────┐
│ Available in Registry        │
│ (Share with team/production) │
└──────────────────────────────┘
```

---

## Best Practices

### 1. Semantic Versioning
```bash
# ❌ Non-descriptive tags
$ docker tag my-app:1.0 ashukr321/my-app:latest
$ docker push ashukr321/my-app:latest

# ✅ Semantic versioning
$ docker tag my-app:1.2.3 ashukr321/my-app:1.2.3
$ docker tag my-app:1.2.3 ashukr321/my-app:1.2
$ docker tag my-app:1.2.3 ashukr321/my-app:latest
$ docker push ashukr321/my-app:1.2.3
$ docker push ashukr321/my-app:latest
```

### 2. Environment-based Tags
```bash
$ docker tag my-app:v1 ashukr321/my-app:development
$ docker tag my-app:v1 ashukr321/my-app:staging
$ docker tag my-app:v1 ashukr321/my-app:production

$ docker push ashukr321/my-app:development
$ docker push ashukr321/my-app:staging
$ docker push ashukr321/my-app:production
```

### 3. Minimize Image Size
```bash
# Keep images small for faster push/pull
# Use multi-stage builds
# Clean up build artifacts
```

### 4. Use Private Registries for Sensitive Apps
```bash
# Production apps को private registry में रखो
# Credentials safely manage करो
# Access control setup करो
```

---

## Troubleshooting

### Push Failed - Authentication
```bash
$ docker push ashukr321/my-app
Error response from daemon: unauthorized: authentication required

# Solution: Login करो पहले
$ docker login
```

### Push Failed - Tag Not Found
```bash
$ docker push myregistry.com/my-app:1.0
Error: image not found

# Solution: Tag करो पहले
$ docker tag my-app:1.0 myregistry.com/my-app:1.0
$ docker push myregistry.com/my-app:1.0
```

### Pull Failed - Connection Issues
```bash
$ docker pull gcr.io/project/app
Error: connection timeout

# Solution: Network check करो
$ ping gcr.io
$ docker version  # Docker daemon check करो
```

### Push Slow
```bash
# Solution: Image size reduce करो
$ docker images
$ docker history my-app:1.0

# .dockerignore में unnecessary files exclude करो
```

---

## Quick Reference

| Command | Purpose | Use Case |
|---------|---------|----------|
| `docker login` | Authenticate to registry | Before push/pull |
| `docker logout` | Disconnect from registry | Security/cleanup |
| `docker pull` | Download image | Getting images |
| `docker push` | Upload image | Sharing images |
| `docker search` | Find on Docker Hub | Discovery |
| `docker tag` | Create image reference | Registry naming |

---

## Common Workflows

### Development → Production

```bash
# 1. Local development
$ docker build -t my-app:dev .
$ docker run my-app:dev

# 2. Tag for registry
$ docker tag my-app:dev ashukr321/my-app:latest
$ docker tag my-app:dev ashukr321/my-app:v1.0

# 3. Push to registry
$ docker login
$ docker push ashukr321/my-app:latest
$ docker push ashukr321/my-app:v1.0

# 4. Production pull
$ docker pull ashukr321/my-app:v1.0
$ docker run -d ashukr321/my-app:v1.0
```

### Team Collaboration

```bash
# Team member 1: Develop और push
$ docker build -t team/api:feature .
$ docker push myregistry.com/team/api:feature

# Team member 2: Pull करके test
$ docker pull myregistry.com/team/api:feature
$ docker run myregistry.com/team/api:feature
```

### CI/CD Pipeline

```bash
# Build
docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .

# Push
docker tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA $CI_REGISTRY_IMAGE:latest
docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
docker push $CI_REGISTRY_IMAGE:latest

# Deploy
docker pull $CI_REGISTRY_IMAGE:latest
docker run $CI_REGISTRY_IMAGE:latest
```

