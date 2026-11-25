# Naming & Tagging Containers and Images

## 1. Container का नाम / Naming a container
```bash
docker run -p 3000:80 -d --rm --name goalsapp myapp
docker stop goalsapp
```
Random नाम (जैसे `eager_turing`) या ID की जगह अपना नाम: commands लिखना आसान।
Your own name instead of a random one (like `eager_turing`) or an ID makes commands easier.

## 2. Image का नाम और tag / Naming and tagging an image
```bash
docker build -t goals:latest .
docker build -t goals:1.0 .
```
Image name के दो हिस्से होते हैं: **`repository:tag`**।
An image name has two parts: **`repository:tag`**.

| Part | Hindi | English |
|------|-------|---------|
| `repository` (name) | Image का group / app का नाम | The image group / app name |
| `tag` | Version या variant | A version or variant |

Examples: `node:20`, `node:20-alpine`, `python:3.12-slim`।
Tag न दें तो Docker `latest` मानता है।
If you omit the tag, Docker assumes `latest`.

## 3. पहले से बनी image को नया नाम / Re-tagging an image
```bash
docker tag goals:latest academind/goals:1.0
```
यह copy नहीं बनाता: बस उसी image को दूसरा नाम मिलता है।
This doesn't copy anything: the same image just gets another name.
