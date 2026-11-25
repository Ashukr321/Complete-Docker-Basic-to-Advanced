# A Look Behind the Scenes: Inspecting Images

## 📌 Overview
`docker image inspect` किसी image की पूरी जानकारी JSON में दिखाता है।
`docker image inspect` shows everything about an image as JSON.

```bash
docker image inspect <image-id-or-name>
```

## 🔍 क्या-क्या दिखता है / What you can see
- **Id** और **Created** date।
  The full **Id** and **Created** date.
- **Config**: exposed ports (`ExposedPorts`), environment variables (`Env`), default command (`Cmd`), `WorkingDir`।
  **Config**: exposed ports, environment variables, the default command and the working directory.
- **Os / Architecture**: जैसे `linux/amd64`।
  **Os / Architecture**: e.g. `linux/amd64`.
- **RootFS.Layers**: image की सभी layers के IDs।
  **RootFS.Layers**: the IDs of every layer in the image.

## 💡 Tip
किसी एक field के लिए `--format`:
Use `--format` to pull out one field:

```bash
docker image inspect --format '{{.Config.Cmd}}' myapp
docker container inspect <name>     # the same for a container (IP, mounts, state…)
```
