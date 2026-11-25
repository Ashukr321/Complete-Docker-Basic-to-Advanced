# Bind Mounts - Shortcuts

## 📌 Overview
पूरा absolute path टाइप करने की जगह shell का current-directory shortcut use करो।
Instead of typing the full absolute path, use your shell's current-directory shortcut.

## ⚙️ Shell के हिसाब से / By shell
| Shell | Shortcut |
|-------|----------|
| macOS / Linux (bash, zsh) | `-v "$(pwd):/app"` |
| Windows cmd | `-v "%cd%":/app` |
| Windows PowerShell | `-v "${PWD}:/app"` |
| Git Bash (Windows) | `-v "/$(pwd):/app"` (path conversion से बचने के लिए / to avoid path mangling) |

```bash
# macOS / Linux
docker run -d -p 3000:80 --rm --name feedback-app \
  -v feedback:/app/feedback -v "$(pwd):/app" -v /app/node_modules \
  feedback-node:volumes
```

## ⚠️ ध्यान दें / Watch out
- Command project folder के अंदर से ही चलाओ, क्योंकि shortcut current folder लेता है।
  Run the command from inside the project folder, since the shortcut uses the current folder.
- Path में spaces हों तो quotes ज़रूरी हैं।
  Quotes are required if the path has spaces.

## 💡 Key takeaway
- `$(pwd)` / `%cd%` / `${PWD}` सिर्फ़ typing बचाते हैं; Docker को फिर भी absolute path ही मिलता है।
  `$(pwd)` / `%cd%` / `${PWD}` only save typing; Docker still receives an absolute path.
