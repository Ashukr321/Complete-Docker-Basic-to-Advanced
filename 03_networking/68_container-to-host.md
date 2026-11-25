# Case 2: Container to Host Machine Communication

## 📌 Overview

कभी app को आपकी host machine पर चल रही service चाहिए, जैसे local MongoDB या कोई local API।
Sometimes the app needs a service running on your host machine, such as a local MongoDB or a local API.

```js
mongoose.connect('mongodb://localhost:27017/swfavorites');
```

## ⚠️ Problem: `localhost` अंदर से अलग है

Container के अंदर `localhost` का मतलब **container खुद** है, आपकी host machine नहीं।
Inside a container, `localhost` means **the container itself**, not your host machine.

इसलिए ऊपर वाला code container में connection error देगा।
So the code above fails with a connection error inside a container.

## ✅ Solution (preview)

`localhost` की जगह special hostname `host.docker.internal` use करें।
Replace `localhost` with the special hostname `host.docker.internal`.

```js
mongoose.connect('mongodb://host.docker.internal:27017/swfavorites');
```

Details और Linux वाला flag: [Lesson 72](72_host-docker-internal.md)।
Details and the Linux flag: [Lesson 72](72_host-docker-internal.md).

## 💡 Key takeaway
Container → host: `localhost` नहीं, `host.docker.internal`।
Container → host: not `localhost`, but `host.docker.internal`.
