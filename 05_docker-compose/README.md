# Docker Compose: Multi-Container Orchestration

## 📌 Module Introduction (Lesson 91)

पिछले section में हमने goals app (MongoDB + Node backend + React frontend) को लंबी `docker run`, `docker network` और `docker volume` commands से चलाया था।
In the previous section we ran the goals app (MongoDB + Node backend + React frontend) with long `docker run`, `docker network` and `docker volume` commands.

इस module में **Docker Compose** से वही पूरा setup एक YAML file में लिखेंगे और एक command से start/stop करेंगे।
In this module we describe that whole setup in one YAML file with **Docker Compose** and start/stop it with a single command.

Compose एक **single host** पर कई containers को manage करने का tool है; ये Dockerfiles की जगह नहीं लेता।
Compose is a tool for managing several containers on a **single host**; it does not replace Dockerfiles.

## 🗺️ Lessons

| # | Lesson | Key idea |
|---|--------|----------|
| 92 | [Docker Compose: What & Why?](92_compose-what-and-why.md) | One file instead of many commands |
| 93 | [Creating a Compose File](93_creating-a-compose-file.md) | `compose.yaml`, `services:`, indentation |
| 94 | [Diving into the Compose File Configuration](94_compose-file-configuration.md) | `image`, `environment`, `env_file`, `volumes`, networks |
| 95 | [Installing Docker Compose on Linux](95_installing-compose-on-linux.md) | `docker-compose-plugin`, `docker compose version` |
| 96 | [Docker Compose Up & Down](96_compose-up-and-down.md) | `up -d`, `down`, `down -v` |
| 97 | [Working with Multiple Containers](97_working-with-multiple-containers.md) | `build`, `ports`, `depends_on`, service names |
| 98 | [Adding Another Container](98_adding-another-container.md) | Frontend with `stdin_open` + `tty` |
| 99 | [Building Images & Understanding Container Names](99_building-images-and-container-names.md) | `compose build`, `up --build`, `container_name` |
| 100 | [Module Summary](100_module-summary.md) | Cheat-sheet, practice, resources |
