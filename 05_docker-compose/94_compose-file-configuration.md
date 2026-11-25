# Diving into the Compose File Configuration

## 📌 Overview

अब `mongodb` service को पूरा configure करते हैं: image, environment variables और volume।
Now we fully configure the `mongodb` service: image, environment variables and a volume.

## ⚙️ mongodb service
```yaml
services:
  mongodb:
    image: mongo
    volumes:
      - data:/data/db          # named volume
    env_file:
      - ./env/mongo.env
    # environment:             # alternative: inline values
    #   MONGO_INITDB_ROOT_USERNAME: max
    #   MONGO_INITDB_ROOT_PASSWORD: secret

volumes:
  data:                        # named volumes must be declared here
```

```bash
# ./env/mongo.env
MONGO_INITDB_ROOT_USERNAME=max
MONGO_INITDB_ROOT_PASSWORD=secret
```

## 🧩 Keys
| Key | Hindi | English |
|-----|-------|---------|
| `image` | कौन सी image use करनी है (local या Docker Hub) | Which image to use (local or Docker Hub) |
| `environment` | Variables सीधे file में (map या `- KEY=value` list) | Variables written inline (map or `- KEY=value` list) |
| `env_file` | Variables एक अलग file से; secrets compose file से बाहर रहते हैं | Variables from a separate file; keeps secrets out of the compose file |
| `volumes` (service) | Named, anonymous और bind mounts, `docker run -v` जैसे | Named, anonymous and bind mounts, same as `docker run -v` |
| `volumes` (top-level) | Named volumes को declare करना ज़रूरी है | Named volumes must be declared |

## 🌐 Networks
- Compose हर project के लिए अपने आप एक default network (`<project>_default`) बनाता है और सारे services उसमें जोड़ता है।
  Compose automatically creates a default network (`<project>_default`) per project and attaches every service to it.
- इसलिए `--network` या `networks:` लिखना ज़रूरी नहीं; custom networks चाहिए तभी `networks:` use करें।
  So you don't need `--network` or `networks:`; use `networks:` only when you want custom networks.

## ⚠️ `--rm` और `-d` / `--rm` and `-d`
- `docker compose down` containers को हटा देता है, इसलिए `--rm` जैसी कोई setting नहीं चाहिए।
  `docker compose down` removes the containers, so no `--rm` equivalent is needed.
- Detached mode file में नहीं, command पर तय होता है: `docker compose up -d`।
  Detached mode is not set in the file but on the command: `docker compose up -d`.

## 💡 Key takeaway
जो `docker run` flags थे, वही अब YAML keys हैं; network free में मिलता है।
The old `docker run` flags are now YAML keys; the network comes for free.
