# Module Summary

## 🧾 Key concepts
- **Image** = read-only blueprint, layers से बनी; **container** = image + writable layer, एक running process।
  **Image** = read-only blueprint made of layers; **container** = image + writable layer, a running process.
- Images Dockerfile से build होती हैं और layers **cache** होती हैं: instruction order मायने रखता है।
  Images are built from a Dockerfile and their layers are **cached**: instruction order matters.
- Image बदल नहीं सकती: code बदलो → **rebuild**।
  Images can't change: change code → **rebuild**.
- Images registries (Docker Hub) से **push/pull** करके share होती हैं।
  Images are shared by **pushing/pulling** them through a registry (Docker Hub).

## 📋 Cheat-sheet

| Goal | Command |
|------|---------|
| Build | `docker build -t name:tag .` |
| Run (detached, auto-remove, named, port) | `docker run -d --rm --name app -p 3000:80 name:tag` |
| Interactive | `docker run -it name` · `docker start -ai app` |
| List | `docker images` · `docker ps -a` |
| Stop / start | `docker stop app` · `docker start app` |
| Logs / attach | `docker logs -f app` · `docker attach app` |
| Remove | `docker rm app` · `docker rmi name:tag` · `docker container prune` · `docker image prune -a` |
| Inspect | `docker image inspect name` |
| Copy files | `docker cp app:/path ./local` |
| Share | `docker tag name user/repo` · `docker login` · `docker push user/repo` · `docker pull user/repo` |

## 🧠 Practice (quiz + assignment)
1. Image और container में क्या फ़र्क है? / What's the difference between an image and a container?
2. `server.js` बदलने के बाद restart करने पर बदलाव क्यों नहीं दिखता? / Why doesn't a code change show after a restart?
3. `EXPOSE 80` लिखने के बाद भी `-p` क्यों चाहिए? / Why is `-p` still needed after `EXPOSE 80`?
4. `docker run` और `docker start` में क्या फ़र्क है? / How do `docker run` and `docker start` differ?
5. Stopped container वाली image delete क्यों नहीं होती? / Why can't you delete an image a stopped container uses?
6. **Assignment:** एक छोटे Node या Python app के लिए Dockerfile लिखें, `name:tag` के साथ build करें, `--rm -d --name` के साथ चलाएँ, logs देखें, फिर Docker Hub पर push करें।
   **Assignment:** write a Dockerfile for a small Node or Python app, build it with `name:tag`, run it with `--rm -d --name`, check its logs, then push it to Docker Hub.

## 🔗 Module resources
- [Docker CLI reference](https://docs.docker.com/reference/cli/docker/)
- [Dockerfile reference](https://docs.docker.com/reference/dockerfile/)
- [Docker Hub](https://hub.docker.com/)
