# Working with Environment Variables & .env Files

## 📌 Overview
Environment variables से एक ही image को बिना rebuild किए अलग-अलग settings के साथ चला सकते हैं।
Environment variables let you run the same image with different settings, without rebuilding.

## 📄 Dockerfile
```dockerfile
ENV PORT=80
EXPOSE $PORT
CMD ["npm", "start"]
```
```js
// server.js
app.listen(process.env.PORT);
```
- `ENV` default value देता है जो runtime पर override हो सकती है।
  `ENV` sets a default that can be overridden at runtime.

## ⚙️ Runtime पर set करना / Setting at runtime
```bash
docker run -d -p 3000:8000 -e PORT=8000 feedback-node:env
docker run -d -p 3000:8000 --env PORT=8000 --env NODE_ENV=dev feedback-node:env
docker run -d -p 3000:8000 --env-file ./.env feedback-node:env
```
```text
# .env
PORT=8000
```

## ⚠️ Security
- Secrets को Dockerfile के `ENV` में मत लिखो: वे image में रहते हैं और `docker history` / `docker image inspect` में दिखते हैं।
  Don't put secrets in a Dockerfile `ENV`: they stay in the image and show in `docker history` / `docker image inspect`.
- `--env-file` बेहतर है, लेकिन `.env` को `.gitignore` और `.dockerignore` में रखो।
  `--env-file` is better, but keep `.env` in `.gitignore` and `.dockerignore`.

## 💡 Key takeaway
- `ENV` = default, `-e`/`--env-file` = runtime पर override।
  `ENV` = default, `-e`/`--env-file` = override at runtime.
