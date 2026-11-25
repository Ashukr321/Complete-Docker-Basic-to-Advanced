# A Look at Read-Only Volumes

## 📌 Overview
Container को आपका source code नहीं बदलना चाहिए; bind mount को `:ro` से **read-only** बना दो।
The container shouldn't change your source code; make the bind mount **read-only** with `:ro`.

## ⚙️ Command
```bash
docker run -d -p 3000:80 --rm --name feedback-app \
  -v feedback:/app/feedback \
  -v "$(pwd):/app:ro" \
  -v /app/temp \
  -v /app/node_modules \
  feedback-node:volumes
```
- `:ro` → container `/app` में नहीं लिख सकता; host पर आप फिर भी edit कर सकते हो।
  `:ro` → the container can't write to `/app`; you can still edit on the host.
- App को `temp/` और `feedback/` में लिखना है, इसलिए वहाँ ज़्यादा specific writable volumes चाहिए।
  The app must write to `temp/` and `feedback/`, so those need more specific writable volumes.
- `-v /app/temp` (anonymous) और `-v feedback:/app/feedback` (named) `:ro` को उन paths के लिए override करते हैं।
  `-v /app/temp` (anonymous) and `-v feedback:/app/feedback` (named) override `:ro` for those paths.

## ⚠️ ध्यान दें / Watch out
- Read-only bind mount के अंदर का sub-folder host पर मौजूद होना चाहिए, वरना Docker mount point नहीं बना पाता।
  A sub-folder inside a read-only bind mount should exist on the host, or Docker can't create the mount point.

## 💡 Key takeaway
- पूरे folder को `:ro` करो, फिर सिर्फ़ ज़रूरी sub-folders को writable volumes से खोलो।
  Make the whole folder `:ro`, then open only the needed sub-folders with writable volumes.
