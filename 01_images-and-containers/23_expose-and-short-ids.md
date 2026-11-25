# EXPOSE & A Little Utility Functionality

## 1. EXPOSE सिर्फ़ documentation है
```dockerfile
EXPOSE 80
```
- `EXPOSE` port को **publish नहीं करता**। यह सिर्फ़ बताता है कि app किस port पर सुनता है।
  `EXPOSE` does **not publish** the port. It only documents which port the app listens on.
- Port को सच में खोलने के लिए `docker run -p 3000:80` ही चाहिए।
  You still need `docker run -p 3000:80` to actually open it.
- फिर भी लिखना अच्छी practice है: दूसरे developers को पता चलता है कि कौन सा port map करना है।
  It's still good practice: other developers can see which port to map.

## 2. Short IDs
Image या container ID पूरी लिखने की ज़रूरत नहीं है: बस शुरू के इतने characters दें कि ID unique रहे।
You don't need the full image or container ID: the first few characters are enough as long as they're unique.

```bash
docker run -p 3000:80 3f2      # instead of the full sha256 ID
docker stop a1b                # same for containers
```

Names इससे भी आसान हैं: देखें [Naming & Tagging](36_naming-and-tagging.md)।
Names are even easier: see [Naming & Tagging](36_naming-and-tagging.md).
