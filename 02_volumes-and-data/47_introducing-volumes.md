# Introducing Volumes

## 📌 Overview
Volume host machine पर एक folder है जिसे container के अंदर के किसी path पर **mount** किया जाता है।
A volume is a folder on the host machine that is **mounted** to a path inside the container.

![Docker volume types](../resources/docker_volume_types.svg)

## 🔗 कैसे काम करता है / How it works
- Container उस path पर जो लिखता है वो असल में host के folder में जाता है।
  Whatever the container writes to that path actually lands in the host folder.
- Host पर बदलाव container में भी दिखते हैं (दोनों तरफ़ sync)।
  Changes on the host are visible in the container too (both directions).
- Container हटाने पर भी volume (और data) बचा रहता है।
  The volume (and its data) survives when the container is removed.

## 🆚 Volume vs `COPY`
| | `COPY` | Volume |
|--|--------|--------|
| कब / When | Build time पर एक बार snapshot / One-time snapshot at build | Runtime पर live connection / Live connection at runtime |
| Image में? / In the image? | ✅ | ❌ |

## 🧩 Types
- **Anonymous volume**, **named volume** (Docker manage करता है / managed by Docker), और **bind mount** (आप host path चुनते हैं / you pick the host path)।

## 💡 Key takeaway
- Volume = container के बाहर रखा data, जो container की lifecycle से independent है।
  A volume = data kept outside the container, independent of the container's lifecycle.
