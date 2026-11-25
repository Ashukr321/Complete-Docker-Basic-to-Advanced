# Installing Docker Compose on Linux

## 📌 Overview

Docker Desktop (Windows / macOS / Linux) में Compose पहले से included है; कुछ install नहीं करना।
Docker Desktop (Windows / macOS / Linux) already includes Compose; nothing to install.

Linux पर सिर्फ Docker Engine हो तो Compose को `docker-compose-plugin` package से install करें।
On Linux with only Docker Engine, install Compose via the `docker-compose-plugin` package.

## ⚙️ Commands
```bash
# Ubuntu / Debian (Docker's official apt repo must be set up)
sudo apt-get update
sudo apt-get install docker-compose-plugin

# RHEL / Fedora / CentOS (Docker's official rpm repo)
sudo dnf install docker-compose-plugin

# verify
docker compose version
```

## ⚠️ `docker compose` vs `docker-compose`
- `docker compose` (space) Compose v2 है, Docker CLI का plugin; यही use करें।
  `docker compose` (space) is Compose v2, a Docker CLI plugin; use this one.
- `docker-compose` (hyphen) पुराना v1 Python tool है जो अब supported नहीं है।
  `docker-compose` (hyphen) is the old v1 Python tool, no longer supported.

## 💡 Key takeaway
`docker compose version` चल जाए तो setup ready है।
If `docker compose version` works, you are ready.
