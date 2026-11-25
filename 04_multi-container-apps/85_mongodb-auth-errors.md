# Fixing MongoDB Authentication Errors

## 📌 Overview

जब हम MongoDB में username/password (root user) जोड़ते हैं, तो connection में `Authentication failed` error आ सकता है।
When we add a username/password (root user) to MongoDB, the connection may fail with `Authentication failed`.

## ⚠️ कारण / Cause

`MONGO_INITDB_ROOT_USERNAME` से बना root user **`admin`** database में store होता है।
The root user created via `MONGO_INITDB_ROOT_USERNAME` is stored in the **`admin`** database.

Connection string में `/course-goals` देने पर Mongo user को `course-goals` database में ढूँढता है, जहाँ वह है ही नहीं।
With `/course-goals` in the connection string, Mongo looks for the user in the `course-goals` database, where it doesn't exist.

## ✅ Fix

Connection string के अंत में `?authSource=admin` जोड़ो।
Append `?authSource=admin` to the connection string.

```js
mongoose.connect(
  'mongodb://max:secret@mongodb:27017/course-goals?authSource=admin'
);
```

## 🛠️ Checklist अगर अब भी fail हो / If it still fails
- Username/password वही हैं जो Mongo container को env vars में दिए थे?
  Do the username/password match the env vars given to the Mongo container?
- Root user सिर्फ़ **पहली बार** (खाली data folder पर) बनता है; पुराने volume पर env vars ignore होते हैं।
  The root user is created only on **first start** (empty data dir); with an existing volume the env vars are ignored.
- ज़रूरत हो तो पुराना volume हटाओ: `docker volume rm data` (data delete होगा!)।
  If needed, remove the old volume: `docker volume rm data` (this deletes the data!).

## 💡 Key takeaway
Root user के साथ connect करते समय हमेशा `?authSource=admin` लगाओ।
Always add `?authSource=admin` when connecting as the root user.
