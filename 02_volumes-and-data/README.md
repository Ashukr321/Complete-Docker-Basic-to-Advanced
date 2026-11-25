# Managing Data & Working with Volumes

## 📌 Module Introduction (Lesson 42)

इस module में हम सीखते हैं कि containers में data कैसे manage होता है और container हटाने पर data क्यों खो जाता है।
This module covers how data is managed in containers and why data is lost when a container is removed.

हम **volumes** (anonymous और named), **bind mounts**, read-only volumes, `.dockerignore`, environment variables और build arguments देखेंगे।
We look at **volumes** (anonymous and named), **bind mounts**, read-only volumes, `.dockerignore`, environment variables and build arguments.

![Docker volume types](../resources/docker_volume_types.svg)

## 🗺️ Lessons

| # | Lesson | Key idea |
|---|--------|----------|
| 43 | [Understanding Data Categories](43_data-categories.md) | Code (image) vs temp data (container) vs permanent data (volume) |
| 44 | [Analyzing a Real App](44_analyzing-real-app.md) | Which data lives where |
| 45 | [Building & Understanding the Demo App](45_demo-app.md) | Feedback app: `temp/` → `feedback/` |
| 46 | [Understanding the Problem](46_the-problem.md) | Data survives stop/start, not `rm` |
| 47 | [Introducing Volumes](47_introducing-volumes.md) | Host folders mounted into containers |
| 48 | [A First, Unsuccessful Try](48_first-unsuccessful-try.md) | `VOLUME` = anonymous volume |
| 49 | [Named Volumes To The Rescue!](49_named-volumes.md) | `-v feedback:/app/feedback` |
| 50 | [Removing Anonymous Volumes](50_removing-anonymous-volumes.md) | `--rm`, `docker volume rm/prune` |
| 51 | [Getting Started With Bind Mounts](51_bind-mounts.md) | `-v "/abs/path:/app"` |
| 52 | [Bind Mounts - Shortcuts](52_bind-mount-shortcuts.md) | `$(pwd)`, `%cd%`, `${PWD}` |
| 53 | [Combining & Merging Different Volumes](53_combining-volumes.md) | `-v /app/node_modules` wins |
| 54 | [Using Nodemon in a Container](54_nodemon-in-container.md) | Live reload with bind mounts |
| 55 | [Volumes & Bind Mounts: Summary](55_volumes-bind-mounts-summary.md) | Comparison table |
| 56 | [A Look at Read-Only Volumes](56_read-only-volumes.md) | `:ro` + writable sub-volumes |
| 57 | [Managing Docker Volumes](57_managing-volumes.md) | `docker volume ls/create/inspect/rm/prune` |
| 58 | [Using "COPY" vs Bind Mounts](58_copy-vs-bind-mounts.md) | COPY for production, bind mount for dev |
| 59 | [Don't COPY Everything: .dockerignore](59_dockerignore.md) | Exclude `node_modules`, `.git` |
| 60 | [Environment Variables & .env Files](60_environment-variables.md) | `ENV`, `-e`, `--env-file` |
| 61 | [Using Build Arguments (ARG)](61_build-arguments.md) | `ARG`, `--build-arg` |
| 62 | [Module Summary](62_module-summary.md) | Cheat-sheet + practice + resources |

> ℹ️ Lesson 58 के बाद के titles screenshot में नहीं दिखे, इसलिए 59–62 के numbers course से थोड़े अलग हो सकते हैं। / Lesson titles after 58 weren't visible in the screenshot, so numbers 59–62 may not match the course exactly.
