# Data Persistence for MongoDB with Volumes

## 📌 Overview

`--rm` की वजह से Mongo container हटते ही data खो जाता है; इसे named volume से बचाते हैं।
Because of `--rm`, data is lost when the Mongo container is removed; a named volume keeps it.

Mongo अपना data container के अंदर `/data/db` में रखता है (image docs में लिखा है)।
Mongo stores its data inside the container at `/data/db` (documented on the image page).

![Docker volume types](../resources/docker_volume_types.svg)

## ⚙️ Persistence + access control
```bash
docker run --name mongodb --rm -d \
  --network goals-net \
  -v data:/data/db \
  -e MONGO_INITDB_ROOT_USERNAME=max \
  -e MONGO_INITDB_ROOT_PASSWORD=secret \
  mongo
```

| Option | Hindi | English |
|--------|-------|---------|
| `-v data:/data/db` | Named volume `data`, container हटने पर भी बचता है | Named volume `data`, survives container removal |
| `MONGO_INITDB_ROOT_USERNAME` | Root user का नाम | Root user name |
| `MONGO_INITDB_ROOT_PASSWORD` | Root user का password | Root user password |

Env vars से root user सिर्फ़ तब बनता है जब `/data/db` खाली हो (पहला start)।
The env vars create the root user only when `/data/db` is empty (first start).

## 🔌 Backend connection string
```js
mongoose.connect(
  'mongodb://max:secret@mongodb:27017/course-goals?authSource=admin'
);
```

`?authSource=admin` क्यों चाहिए, यह [lesson 85](85_mongodb-auth-errors.md) में है।
Why `?authSource=admin` is needed is covered in [lesson 85](85_mongodb-auth-errors.md).

## ✅ Test
```bash
docker stop mongodb        # --rm: container delete
# फिर वही run command / run the same command again
```
Goals अब भी मौजूद हैं, क्योंकि data volume में है।
The goals are still there, because the data lives in the volume.

## 💡 Key takeaway
Database container = official image + named volume (data) + env vars (credentials)।
Database container = official image + named volume (data) + env vars (credentials).
