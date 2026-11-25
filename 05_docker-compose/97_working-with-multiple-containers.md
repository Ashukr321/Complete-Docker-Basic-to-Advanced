# Working with Multiple Containers

## 📌 Overview

अब `backend` service जोड़ते हैं, जिसकी image `./backend` के Dockerfile से build होती है।
Now we add the `backend` service, whose image is built from the Dockerfile in `./backend`.

## ⚙️ backend service
```yaml
services:
  mongodb:
    # ... (previous lesson)
  backend:
    build:
      context: ./backend       # folder sent to the build
      dockerfile: Dockerfile   # optional, this is the default name
    # build: ./backend         # short form, same result
    ports:
      - "80:80"                # host:container
    volumes:
      - logs:/app/logs         # named volume
      - ./backend:/app         # bind mount, relative paths allowed
      - /app/node_modules      # anonymous volume
    env_file:
      - ./env/backend.env
    depends_on:
      - mongodb

volumes:
  data:
  logs:
```

## 🧩 Keys
- `build`: image बनाने के लिए context (और ज़रूरत हो तो दूसरा Dockerfile name)।
  `build`: the context for building the image (and another Dockerfile name if needed).
- `ports`: `docker run -p` जैसा; quotes में लिखना safe है।
  `ports`: same as `docker run -p`; quoting the value is safest.
- `depends_on`: `mongodb` पहले start होगा, फिर `backend`। ये सिर्फ start order है, "DB ready" की guarantee नहीं।
  `depends_on`: `mongodb` starts before `backend`. It only controls start order, not "DB is ready".
- Bind mount में relative path (`./backend`) चलता है; compose file की location से resolve होता है।
  Bind mounts accept relative paths (`./backend`), resolved from the compose file's location.

## 🌐 Service names = hostnames
Default network पर हर service का नाम DNS hostname होता है, इसलिए backend code में `mongodb` लिखें।
On the default network every service name is a DNS hostname, so the backend code uses `mongodb`.
```js
mongoose.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/course-goals?authSource=admin`);
```

![Docker Compose network internals](../resources/docker_compose_network_internals.svg)

## 💡 Key takeaway
`build` + `ports` + `depends_on`, और containers आपस में service name से बात करते हैं।
`build` + `ports` + `depends_on`, and containers talk to each other by service name.

See also: [Compose network internals](../resources/10_docker_compose_network_internals.md)
