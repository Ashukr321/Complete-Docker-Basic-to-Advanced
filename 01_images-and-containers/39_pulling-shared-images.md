# Pulling & Using Shared Images

## ⚙️ Commands
```bash
docker pull <your-username>/node-hello-world        # download (latest tag)
docker run -p 3000:80 --rm <your-username>/node-hello-world
```
- Public image के लिए login ज़रूरी नहीं। Private repository के लिए पहले `docker login`।
  A public image needs no login. For a private repository run `docker login` first.
- `docker run` image local न हो तो उसे **अपने आप pull** करता है।
  `docker run` **pulls automatically** if the image isn't local.

## ⚠️ Update का ध्यान रखें / Watch out for updates
अगर image local पहले से है, तो `docker run` **नया version check नहीं करता**: पुरानी local copy ही चलाता है।
If the image is already local, `docker run` **doesn't check for a newer version**: it runs the old local copy.

Latest version के लिए पहले `docker pull` करें:
Run `docker pull` first to get the latest version:

```bash
docker pull <your-username>/node-hello-world
docker run ...
```

## 💡 Key takeaway
Build एक बार, run कहीं भी: pull करो और चलाओ, कोई Node install या build step नहीं।
Build once, run anywhere: pull and run, with no Node install or build step.
