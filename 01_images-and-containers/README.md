# Images and Containers: The Core Building Blocks

## 📌 Module Introduction (Lesson 17)

इस module में हम Docker के दो सबसे ज़रूरी building blocks सीखते हैं: **images** और **containers**।
This module covers Docker's two core building blocks: **images** and **containers**.

हम pre-built images use करेंगे, अपनी खुद की image Dockerfile से बनाएँगे, containers को चलाएँगे, रोकेंगे, inspect करेंगे और images को Docker Hub पर share करेंगे।
We use pre-built images, build our own image from a Dockerfile, run, stop and inspect containers, and share images on Docker Hub.

## 🗺️ Lessons

| # | Lesson | Key idea |
|---|--------|----------|
| 18 | [Images & Containers: What and Why?](18_images-vs-containers.md) | Image = blueprint, container = running instance |
| 19 | [Using External (Pre-Built) Images](19_external-images.md) | `docker run node`, Docker Hub |
| 20 | [Our Goal: A NodeJS App](20_nodejs-app-goal.md) | The app we will containerize |
| 21 | [Building Our Own Image with a Dockerfile](21_dockerfile.md) | `FROM`, `COPY`, `RUN`, `CMD` |
| 22 | [Running a Container from Our Image](22_running-own-image.md) | `docker build`, `docker run -p` |
| 23 | [EXPOSE & Short IDs](23_expose-and-short-ids.md) | `EXPOSE` only documents a port |
| 24 | [Images are Read-Only](24_images-are-read-only.md) | Code change → rebuild |
| 25 | [Understanding Image Layers](25_image-layers.md) | Layer cache, instruction order |
| 26 | [A First Summary](26_first-summary.md) | Recap so far |
| 27 | [Managing Images & Containers](27_managing-images-containers.md) | `--help`, `ls`, `ps -a` |
| 28 | [Stopping & Restarting Containers](28_stopping-restarting.md) | `docker start` vs `docker run` |
| 29 | [Attached & Detached Containers](29_attached-detached.md) | `-d`, `docker logs` |
| 30 | [Attaching to a Running Container](30_attaching-running-container.md) | `docker attach` |
| 31 | [Entering Interactive Mode](31_interactive-mode.md) | `-it`, `start -ai` |
| 32 | [Deleting Images & Containers](32_deleting-images-containers.md) | `rm`, `rmi`, `prune` |
| 33 | [Removing Stopped Containers Automatically](33_auto-remove-containers.md) | `--rm` |
| 34 | [Inspecting Images](34_inspecting-images.md) | `docker image inspect` |
| 35 | [Copying Files Into & From a Container](35_copying-files.md) | `docker cp` |
| 36 | [Naming & Tagging](36_naming-and-tagging.md) | `--name`, `name:tag` |
| 37 | [Sharing Images: Overview](37_sharing-images-overview.md) | Dockerfile vs image |
| 38 | [Pushing Images to Docker Hub](38_pushing-to-docker-hub.md) | `login`, `tag`, `push` |
| 39 | [Pulling & Using Shared Images](39_pulling-shared-images.md) | `pull`, keeping up to date |
| 40 | [Module Summary](40_module-summary.md) | Cheat-sheet + practice |
