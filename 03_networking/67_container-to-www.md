# Case 1: Container to WWW Communication

## 📌 Overview

बहुत से apps internet पर किसी web API को call करते हैं, जैसे `https://swapi.dev/api/films`।
Many apps call a web API on the internet, for example `https://swapi.dev/api/films`.

Docker में यह **out of the box** काम करता है; कोई extra setting नहीं चाहिए।
In Docker this works **out of the box**; no extra setting is needed.

## ⚙️ Example
```js
// inside the containerized app
const axios = require('axios');
const res = await axios.get('https://swapi.dev/api/films');
```

```bash
docker run --rm curlimages/curl https://swapi.dev/api/people/1/
```

## 🔍 क्यों काम करता है? / Why it works
- Default **bridge** network container को NAT के ज़रिए host की internet connection देता है।
  The default **bridge** network gives the container the host's internet connection through NAT.
- Outgoing (container से बाहर) requests के लिए `-p` की ज़रूरत नहीं; `-p` सिर्फ incoming traffic के लिए है।
  Outgoing requests need no `-p`; `-p` is only for incoming traffic.

## 💡 Key takeaway
Container → WWW: कुछ करने की ज़रूरत नहीं, बस request भेजो।
Container → WWW: nothing to configure, just send the request.
