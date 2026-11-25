# Images are Read-Only!

## 📌 Overview
`COPY . /app` आपके code की **snapshot** image में डालता है, उसी समय जब image build होती है।
`COPY . /app` puts a **snapshot** of your code into the image at the moment the image is built.

## ❗ Problem
`server.js` बदला → container restart किया → बदलाव **नहीं** दिखा।
You edit `server.js` → restart the container → the change does **not** show up.

क्योंकि image read-only है और उसमें पुराना code locked है।
That's because the image is read-only and still contains the old code.

## ✅ Solution
Code बदलने के बाद **image दोबारा build** करें और नया container चलाएँ:
After changing code, **rebuild the image** and run a new container:

```bash
docker build .
docker run -p 3000:80 <new-image-id>
```

## 💡 Key takeaway
Image एक बार बनने के बाद **कभी नहीं बदलती**। नया code = नई image।
Once built, an image **never changes**. New code = new image.

(Development में हर बार rebuild से बचने के लिए आगे **bind mounts / volumes** सीखेंगे।)
(Later, **bind mounts / volumes** avoid rebuilding on every change during development.)
