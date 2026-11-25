# Adding Another Container

## 📌 Overview

तीसरी service `frontend` (React dev server) है, जो `./frontend` से build होती है और port 3000 पर चलती है।
The third service is `frontend` (React dev server), built from `./frontend` and served on port 3000.

## ⚙️ frontend service
```yaml
services:
  # mongodb, backend ...
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend/src:/app/src   # live code reload
    stdin_open: true              # = docker run -i
    tty: true                     # = docker run -t
    depends_on:
      - backend
```

## 🧩 `stdin_open` + `tty`
- React dev server को interactive terminal चाहिए, वरना container start होते ही exit हो सकता है।
  The React dev server wants an interactive terminal, otherwise the container may exit right after starting.
- `stdin_open: true` + `tty: true` मिलकर `docker run -it` जैसा काम करते हैं।
  `stdin_open: true` + `tty: true` together do what `docker run -it` does.

## ⚠️ Browser vs container
React code browser में चलता है, container में नहीं; इसलिए frontend backend को `localhost:80` से call करता है, `backend` hostname से नहीं।
React code runs in the browser, not in the container; so the frontend calls the backend at `localhost:80`, not via the `backend` hostname.

## ⚙️ Run
```bash
docker compose up -d
# open http://localhost:3000
```

## 💡 Key takeaway
Service जोड़ना = `services:` में एक और block; `stdin_open` + `tty` = `-it`।
Adding a service = one more block under `services:`; `stdin_open` + `tty` = `-it`.
