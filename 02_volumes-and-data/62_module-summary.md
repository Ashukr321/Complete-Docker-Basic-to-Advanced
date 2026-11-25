# Module Summary

![Docker volume types](../resources/docker_volume_types.svg)

## 🧾 Key concepts
- Code → **image** (read-only), temporary data → **container layer**, permanent data → **volume**।
  Code → **image** (read-only), temporary data → **container layer**, permanent data → **volume**.
- **Anonymous volume** container से बँधा है; **named volume** containers के पार बचा रहता है।
  An **anonymous volume** is tied to its container; a **named volume** survives across containers.
- **Bind mount** host folder को container में mount करता है: dev में live code के लिए।
  A **bind mount** mounts a host folder into the container: for live code during development.
- ज़्यादा specific container path वाला mount जीतता है; `:ro` से read-only।
  The mount with the more specific container path wins; `:ro` makes it read-only.
- `.dockerignore` से फालतू files बाहर, `ENV`/`ARG` से configurable images।
  `.dockerignore` keeps junk out; `ENV`/`ARG` make images configurable.

## 📋 Cheat-sheet

| Goal | Command |
|------|---------|
| Anonymous volume | `docker run -v /app/node_modules ...` |
| Named volume | `docker run -v feedback:/app/feedback ...` |
| Bind mount (read-only) | `docker run -v "$(pwd):/app:ro" ...` |
| Manage volumes | `docker volume ls` · `create` · `inspect` · `rm` · `prune` |
| Env vars | `docker run -e PORT=8000 ...` · `--env-file ./.env` |
| Build args | `docker build --build-arg DEFAULT_PORT=8000 -t app .` |

## 🧠 Practice (Quiz 3: Volumes & Bind Mounts)
1. Container stop/start करने पर data बचता है, `docker rm` पर क्यों नहीं? / Why does data survive stop/start but not `docker rm`?
2. Dockerfile का `VOLUME` किस तरह का volume बनाता है, और `--rm` पर उसका क्या होता है? / What kind of volume does `VOLUME` create, and what happens to it with `--rm`?
3. Named volume और bind mount में क्या फ़र्क है? / How do a named volume and a bind mount differ?
4. Bind mount के बाद `Cannot find module` error क्यों आता है, और fix क्या है? / Why does `Cannot find module` appear after a bind mount, and what's the fix?
5. Bind mount होने पर भी `COPY . .` क्यों रखें? / Why keep `COPY . .` even with a bind mount?
6. `ARG` और `ENV` में क्या फ़र्क है? / What's the difference between `ARG` and `ENV`?
7. **Assignment:** feedback app को named volume (`feedback`), read-only bind mount, `/app/temp` और `/app/node_modules` anonymous volumes और `-e PORT=8000` के साथ चलाएँ; container हटाकर दोबारा चलाएँ और check करें कि feedback बचा है।
   **Assignment:** run the feedback app with a named volume (`feedback`), a read-only bind mount, `/app/temp` and `/app/node_modules` anonymous volumes, and `-e PORT=8000`; remove and re-run the container and check that the feedback survived.

## 🔗 Module resources
- [Storage overview](https://docs.docker.com/engine/storage/)
- [Volumes](https://docs.docker.com/engine/storage/volumes/)
- [Bind mounts](https://docs.docker.com/engine/storage/bind-mounts/)
- [.dockerignore files](https://docs.docker.com/build/concepts/context/#dockerignore-files)
- [Environment variables (`docker run -e`)](https://docs.docker.com/reference/cli/docker/container/run/#env)
- [Build arguments (`ARG`)](https://docs.docker.com/build/building/variables/)
