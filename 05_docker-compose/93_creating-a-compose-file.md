# Creating a Compose File

## 📌 Overview

Project root में `compose.yaml` (या पुराना नाम `docker-compose.yaml`) file बनाएँ; Compose दोनों नाम अपने आप ढूँढ लेता है।
Create a `compose.yaml` file (or the older name `docker-compose.yaml`) in the project root; Compose finds either name automatically.

हर container एक **service** होता है, और सारे services top-level `services:` key के नीचे लिखे जाते हैं।
Every container is a **service**, and all services go under the top-level `services:` key.

## ⚙️ Skeleton
```yaml
# compose.yaml
services:
  mongodb:
    image: mongo
  backend:
    build: ./backend
  frontend:
    build: ./frontend
```

## ⚠️ YAML indentation
- YAML में indentation ही structure है; spaces use करें, tabs नहीं।
  In YAML, indentation is the structure; use spaces, never tabs.
- Child keys पिछले level से 2 spaces अंदर होती हैं (`mongodb:` → `image:`)।
  Child keys are indented 2 spaces deeper than their parent (`mongodb:` → `image:`).
- List items `- ` से शुरू होते हैं, key-value pairs `key: value` होते हैं।
  List items start with `- `, key-value pairs are written `key: value`.

## ⚠️ `version:` key
पुराने tutorials में सबसे ऊपर `version: "3.8"` दिखता है; Compose v2 में ये obsolete है और ignore होता है (warning देता है)।
Older tutorials start with `version: "3.8"`; in Compose v2 it is obsolete and ignored (it only prints a warning).

## 💡 Key takeaway
एक file, एक `services:` block, हर container के लिए एक service name।
One file, one `services:` block, one service name per container.
