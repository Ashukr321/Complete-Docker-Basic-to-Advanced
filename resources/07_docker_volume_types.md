# Docker Volume Types

Three ways to give a container storage, and what survives a restart.

![Docker volume types](docker_volume_types.svg)

## What it shows

| Type | Where data lives | Survives restart? | Best for |
|------|------------------|-------------------|----------|
| **Named volume** | Managed by Docker in `/var/lib/docker/volumes/` | ✅ Yes | Databases, persistent app data |
| **Bind mount** | A host folder you choose, e.g. `/home/user/myproject` | ✅ Yes | Source code, live reload in local dev |
| **tmpfs mount** | RAM only, never written to disk | ❌ Lost on stop (by design) | Secrets, sensitive temp data |

```bash
docker run -v db_data:/var/lib/postgresql/data postgres   # named volume
docker run -v "$(pwd)":/app node:20                       # bind mount
docker run --tmpfs /tmp/cache myapp                       # tmpfs
```

## Key takeaway

A container's own filesystem is disposable. Anything you need to keep goes in a **volume**.
