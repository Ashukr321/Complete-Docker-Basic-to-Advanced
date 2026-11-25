# Docker Containers

A **container** is a running instance of an image: an isolated process on the host with its own filesystem, network and process list. You can run many containers from the same image, just like many objects from one class.

## How a container is isolated

- **Namespaces** give it its own view of processes, network, hostname and filesystem.
- **cgroups** limit how much CPU and memory it can use.
- It shares the host's **kernel**, which is why it starts in milliseconds and is so much lighter than a VM.

## Lifecycle

```
created ──start──► running ──stop──► exited ──rm──► (gone)
                     │  ▲
                 pause  unpause
```

```bash
docker run -d --name web -p 8080:80 nginx   # create + start in the background
docker ps                                    # running containers
docker logs -f web                           # follow its output
docker exec -it web sh                       # open a shell inside it
docker stop web && docker start web          # stop / start again
docker rm -f web                             # remove it
```

Useful `docker run` flags: `-d` (detached), `-p host:container` (publish a port), `--name`, `-e KEY=value` (env var), `-v volume:/path` (persist data), `--network`, `--rm` (delete when it exits).

## Containers are disposable

Anything written inside a container's writable layer is **lost when the container is removed**. Keep data that matters in a **volume**:

![Docker volume types](../resources/docker_volume_types.svg)

And containers talk to each other through Docker **networks**: see [Docker Network Types](../resources/06_docker_network_types.md).

See also: [Container Management Commands](../docker%20cmd/01_CONTAINER_MANAGEMENT.md)
