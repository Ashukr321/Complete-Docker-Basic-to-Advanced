# Managing Images & Containers

## 📌 Overview
Docker CLI के commands दो main groups में हैं: `docker image ...` और `docker container ...`।
Docker CLI commands fall into two main groups: `docker image ...` and `docker container ...`.

## 🆘 --help सबसे useful है
```bash
docker --help
docker image --help
docker container --help
docker run --help
```

## 📋 Common commands

| Task | Command |
|------|---------|
| Images list करें / List images | `docker images` (or `docker image ls`) |
| Running containers / Running containers | `docker ps` |
| सभी containers / All containers | `docker ps -a` |
| Image build / Build an image | `docker build -t name:tag .` |
| Container start / Start a container | `docker start <name>` |
| Container stop / Stop a container | `docker stop <name>` |
| Container delete / Remove a container | `docker rm <name>` |
| Image delete / Remove an image | `docker rmi <image>` |
| Image details / Inspect an image | `docker image inspect <image>` |

आगे के lessons में इनमें से हर एक को detail में देखेंगे।
The next lessons cover each of these in detail.

See also: [Container Management Commands](../docker%20cmd/01_CONTAINER_MANAGEMENT.md) · [Image Management Commands](../docker%20cmd/02_IMAGE_MANAGEMENT.md)
