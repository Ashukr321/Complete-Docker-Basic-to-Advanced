# Case 3: Container to Container Communication

## 📌 Overview

Best practice: **एक container = एक काम**। App एक container में, database दूसरे में।
Best practice: **one container = one job**. The app in one container, the database in another.

अब app container को MongoDB container से बात करनी है।
Now the app container must talk to the MongoDB container.

```
┌──────────────┐   ?   ┌──────────────┐
│ app (Node)   │ ────▶ │ mongodb      │
└──────────────┘       └──────────────┘
```

## ⚠️ Problem

`localhost` काम नहीं करेगा (वह app container खुद है), और `host.docker.internal` host की तरफ जाता है, दूसरे container की तरफ नहीं।
`localhost` won't work (that is the app container itself), and `host.docker.internal` points to the host, not to another container.

## ✅ दो solutions / Two solutions
| Solution | Hindi | English |
|----------|-------|---------|
| Container IP | `docker container inspect` से IP निकालो, code में डालो (fragile) | Look up the IP with `docker container inspect`, put it in code (fragile) — [Lesson 73](73_container-ip-basic-solution.md) |
| Docker network | दोनों को एक network में रखो, container name को hostname बनाओ | Put both on one network, use the container name as hostname — [Lesson 74](74_docker-networks.md) |

## 💡 Key takeaway
Container → container के लिए **Docker network** सही तरीका है।
For container → container, a **Docker network** is the right way.
