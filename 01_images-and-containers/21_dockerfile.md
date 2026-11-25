# Building Our Own Image with a Dockerfile

## 📌 Overview
**Dockerfile** एक text file है जिसमें step-by-step instructions होते हैं कि image कैसे बनेगी।
A **Dockerfile** is a text file with step-by-step instructions for building an image.

## Dockerfile
```dockerfile
FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 80

CMD ["node", "server.js"]
```

## 🔍 हर instruction का मतलब

| Instruction | Hindi | English |
|-------------|-------|---------|
| `FROM node` | Base image: Node पहले से installed | Base image with Node already installed |
| `WORKDIR /app` | आगे के सभी commands `/app` folder में चलेंगे | All following commands run inside `/app` |
| `COPY package.json /app` | Host से file image में copy | Copies a file from the host into the image |
| `RUN npm install` | **Build time** पर command चलती है | Runs a command at **build time** |
| `COPY . /app` | बाकी पूरा code copy | Copies the rest of the code |
| `EXPOSE 80` | Document करता है कि app port 80 पर सुनता है | Documents that the app listens on port 80 |
| `CMD [...]` | **Container start** होने पर चलने वाली command | The command run when a **container starts** |

## ⚠️ RUN vs CMD
- `RUN` image बनाते समय चलता है (जैसे dependencies install करना)।
  `RUN` executes while building the image (e.g. installing dependencies).
- `CMD` हर बार container start होने पर चलता है। एक Dockerfile में सिर्फ़ एक `CMD` होता है।
  `CMD` runs every time a container starts. A Dockerfile has only one `CMD`.
