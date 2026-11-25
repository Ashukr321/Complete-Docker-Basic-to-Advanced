# Deleting Images & Containers

## 1. Containers हटाना / Removing containers
```bash
docker rm <name-or-id>            # remove a stopped container
docker rm c1 c2 c3                # several at once
docker rm -f <name>               # force: stop + remove a running one
docker container prune            # remove ALL stopped containers
```
Running container को सीधे `docker rm` से नहीं हटा सकते: पहले `docker stop` करें (या `-f` use करें)।
You can't `docker rm` a running container: `docker stop` it first (or use `-f`).

## 2. Images हटाना / Removing images
```bash
docker rmi <image-id-or-name>     # remove one image
docker image prune                # remove dangling (untagged) images
docker image prune -a             # remove ALL images not used by a container
```

## ⚠️ ध्यान दें / Careful
- जो image किसी container में use हो रही है (**stopped container में भी**), उसे delete नहीं कर सकते। पहले container हटाएँ।
  An image used by any container (**even a stopped one**) can't be removed. Remove the container first.
- Image हटाने से उसकी सभी layers हट जाती हैं (अगर कोई दूसरी image उन्हें share नहीं कर रही)।
  Removing an image deletes its layers (unless another image shares them).

See also: [Cleanup Commands](../docker%20cmd/04_CLEANUP.md)
