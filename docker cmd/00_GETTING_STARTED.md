# Docker Basic Commands - Getting Started

## 📌 Overview
यह फाइल Docker के बेसिक कमांड्स को explain करती है जो Docker के साथ काम शुरू करने के लिए आवश्यक हैं।

This file explains the basic Docker commands required to get started with Docker.

---

## 1. docker --version
**Description:**
Docker का installed version check करता है।
Displays the installed version of Docker.

**Usage:**
```bash
docker --version
```

**Detailed Explanation:**
- यह command Docker daemon की version information display करता है
- This command displays the version information of the Docker daemon
- Output: `Docker version 20.10.12, build e91ed57`
- Docker को properly install होने का verify करने के लिए use होता है
- Used to verify that Docker is properly installed on your system

**Example:**
```bash
$ docker --version
Docker version 20.10.12, build e91ed57
```

---

## 2. docker run
**Description:**
नया container create करके run करता है।
Creates and runs a new container.

**Basic Syntax:**
```bash
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

### Variations:

### 2.1 docker run -d (Detached Mode)
```bash
docker run -d -p 80:80 --name my-nginx nginx
```

**Detailed Explanation:**
- `-d` flag container को background में run करता है
- The `-d` flag runs the container in detached mode (background)
- Container का output immediately display नहीं होता
- You can use the terminal immediately without waiting for the container
- Container अभी भी run हो रहा है, आप अपना terminal use कर सकते हो
- `-p 80:80` host के port 80 को container के port 80 से map करता है
- The `-p 80:80` maps port 80 of the host machine to port 80 of the container
- `--name my-nginx` container को identify करने के लिए name देता है
- Gives a recognizable name to the container for easy management

**Use Case:**
- Production servers के लिए जहाँ आप background में services run करना चाहते हैं
- When you want services to run in the background without blocking your terminal

---

### 2.2 docker run -it (Interactive Terminal)
```bash
docker run -it ubuntu:20.04 bash
```

**Detailed Explanation:**
- `-i` flag stdin को open रखता है, भले ही कोई attach न हो
- The `-i` flag keeps STDIN open even if not attached
- `-t` flag pseudo-terminal allocate करता है
- The `-t` flag allocates a pseudo-terminal
- दोनों together interactive shell environment provide करते हैं
- Together they provide an interactive shell where you can type commands
- आप container के अंदर commands type कर सकते हो real-time में
- You can interact with the container's shell in real-time

**Example:**
```bash
$ docker run -it ubuntu:20.04 bash
root@abc123def456:/# ls -la
root@abc123def456:/# exit
```

**Use Case:**
- Container को explore करने के लिए
- Development और debugging के लिए
- Testing purposes
- Learning and understanding container internals

---

### 2.3 docker run -e (Environment Variables)
```bash
docker run -e DATABASE_URL="postgres://user:pass@host" -e DEBUG=true nginx
```

**Detailed Explanation:**
- `-e` flag environment variables set करता है
- The `-e` flag passes environment variables to the container
- Application को configuration values provide करता है
- Containers को sensitive data या configuration without hardcoding pass करने के लिए
- Multiple environment variables के लिए multiple `-e` flags use करें

**Example:**
```bash
$ docker run -e DB_HOST=localhost -e DB_PORT=5432 -e DB_USER=admin my-app
```

---

### 2.4 docker run -v (Volume Mount)
```bash
docker run -v /host/path:/container/path -d nginx
docker run -v my-volume:/app/data mysql
```

**Detailed Explanation:**
- `-v` flag host path को container path से mount करता है
- Creates a connection between host's filesystem and container's filesystem
- Data persistence के लिए critical है
- Host पर data safe रहता है भले ही container delete हो
- Syntax: `-v [HOST_PATH]:[CONTAINER_PATH]:[OPTIONS]`
- Named volumes use करना best practice है (जैसे `my-volume:/app/data`)
- Named volumes Docker द्वारा automatically manage होती हैं

**Types of Mounts:**
```bash
# Bind mount (Host path को mount करना)
docker run -v /home/user/data:/app/data nginx

# Named volume (Docker managed volume)
docker run -v my-volume:/app/data mysql

# Read-only mount
docker run -v /home/user/data:/app/data:ro nginx
```

---

### 2.5 docker run -p (Port Mapping)
```bash
docker run -p 8080:80 nginx
docker run -p 3306:3306 mysql
docker run -p 5000:5000 -p 5001:5001 my-app
```

**Detailed Explanation:**
- `-p` flag port mapping करता है
- Syntax: `-p [HOST_PORT]:[CONTAINER_PORT]:[PROTOCOL]`
- Host machine के port को container के port से connect करता है
- Browser या client host port को access करता है, automatically container port को forward होता है
- Multiple ports के लिए multiple `-p` flags use करें

**Example:**
```bash
# Host के port 8080 को container के port 80 से map करना
docker run -p 8080:80 nginx

# अब http://localhost:8080 को access करने से container के port 80 पर जाएगा
```

---

### 2.6 docker run --name (Naming Container)
```bash
docker run --name my-webserver -d nginx
docker run --name db-server -d mysql:5.7
```

**Detailed Explanation:**
- `--name` container को specific name देता है
- Container को आसानी से identify और manage करना आसान हो जाता है
- Container ID (alphanumeric string) की जगह readable name use कर सकते हो
- Same name का दूसरा container नहीं हो सकता
- Naming container को organize करने में helpful है

---

### 2.7 docker run --rm (Auto Remove)
```bash
docker run --rm alpine echo "Hello World"
```

**Detailed Explanation:**
- `--rm` flag container को automatically remove करता है जब वह exit हो जाए
- Temporary containers के लिए useful है
- Disk space waste नहीं होता unused containers से
- Testing scripts के लिए बहुत helpful है

---

## 3. docker ps
**Description:**
Running containers को list करता है।
Lists all running containers.

**Usage:**
```bash
docker ps
```

**Output Example:**
```
CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS                NAMES
abc123def456   nginx     "nginx -g 'daemon..."   2 minutes ago   Up 2 minutes   0.0.0.0:80->80/tcp   my-nginx
```

**Column Explanations:**
- `CONTAINER ID`: Container का unique identifier (पहले 12 characters यूनिक होते हैं)
- `IMAGE`: Container किस image से बना है
- `COMMAND`: Container में कौन सा command run हो रहा है
- `CREATED`: Container कब create हुआ था
- `STATUS`: Container की current status (Up, Exited, etc.)
- `PORTS`: Port mapping information
- `NAMES`: Container का assigned name

---

## 4. docker ps -a
**Description:**
सभी containers को list करता है (running और stopped दोनों)।
Lists all containers including stopped ones.

**Usage:**
```bash
docker ps -a
```

**Detailed Explanation:**
- `-a` (all) flag सभी containers show करता है
- Running containers के साथ-साथ exited/stopped containers भी दिखाता है
- Container history देखने के लिए useful है
- Cleanup के लिए stopped containers identify करना आसान होता है

---

## 5. docker images
**Description:**
Host पर available सभी Docker images को list करता है।
Lists all Docker images available on the system.

**Usage:**
```bash
docker images
```

**Output Example:**
```
REPOSITORY          TAG           IMAGE ID       CREATED         SIZE
nginx               latest        abc123def456   2 weeks ago     142MB
ubuntu              20.04         xyz789abc123   1 month ago     77.8MB
mysql               5.7           def456xyz789   3 weeks ago     355MB
```

**Column Explanations:**
- `REPOSITORY`: Image का repository/name
- `TAG`: Image का specific version (default: latest)
- `IMAGE ID`: Unique identifier for the image
- `CREATED`: Image कब create हुई
- `SIZE`: Image का size disk पर

---

## 6. docker exec
**Description:**
Running container में command execute करता है।
Executes a command in a running container.

**Usage:**
```bash
docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
```

### 6.1 docker exec -it (Interactive Command)
```bash
docker exec -it my-nginx bash
docker exec -it db-server mysql -u root -p
```

**Detailed Explanation:**
- `-i` stdin को open रखता है, `-t` terminal allocate करता है
- Running container में अंदर जाकर commands type कर सकते हो
- Container restart नहीं होता
- Troubleshooting, debugging, और data verification के लिए बहुत useful है

**Example:**
```bash
# Nginx container में जाकर config files check करना
$ docker exec -it my-nginx bash
root@container:/# cat /etc/nginx/nginx.conf

# MySQL container में database check करना
$ docker exec -it db-server mysql -u root -p
mysql> show databases;
```

---

### 6.2 docker exec (Non-interactive Command)
```bash
docker exec my-app python backup.py
docker exec web-server touch /app/test.txt
```

**Detailed Explanation:**
- Interactive mode के बिना single command execute कर सकते हो
- Command automatically complete होकर exit हो जाता है
- Output immediately display होता है
- Scheduled tasks और automation के लिए useful है

---

## 7. docker logs
**Description:**
Container के logs (output) को display करता है।
Displays the logs/output of a container.

**Usage:**
```bash
docker logs CONTAINER
docker logs -f CONTAINER        # Follow logs (like tail -f)
docker logs --tail 100 CONTAINER  # Last 100 lines
docker logs --since 1h CONTAINER  # Logs from last 1 hour
```

**Detailed Explanation:**
- Container का console output (stdout और stderr) display करता है
- Application errors, debug messages, और activity tracking के लिए
- `-f` flag logs को real-time में follow करता है (live streaming)
- `--tail N` आखिरी N lines दिखाता है
- `--since DURATION` specific time के बाद के logs दिखाता है

**Example:**
```bash
# Container के सभी logs देखना
$ docker logs my-nginx

# Real-time में logs follow करना
$ docker logs -f my-app

# Troubleshooting - आखिरी 50 lines
$ docker logs --tail 50 db-server

# Last 2 hours के logs
$ docker logs --since 2h my-app
```

---

## 8. docker stop
**Description:**
Running container को gracefully stop करता है।
Gracefully stops a running container.

**Usage:**
```bash
docker stop CONTAINER
docker stop container1 container2 container3  # Multiple containers
```

**Detailed Explanation:**
- Container को SIGTERM signal भेजता है
- Application को gracefully shutdown होने का मौका मिलता है
- Database connections properly close हो सकते हैं
- Files safely write हो सकती हैं
- Default timeout: 10 seconds, उसके बाद SIGKILL भेजा जाता है
- Container का data persist रहता है (deleted नहीं होता)

**Example:**
```bash
$ docker stop my-nginx
$ docker ps        # Check container status
$ docker ps -a     # Container अभी भी exist करता है, बस stopped है
```

---

## 9. docker start
**Description:**
Stopped container को दोबारा start करता है।
Restarts a stopped container.

**Usage:**
```bash
docker start CONTAINER
docker start container1 container2  # Multiple containers
```

**Detailed Explanation:**
- पहले से exist करने वाले stopped container को restart करता है
- `docker run` से अलग है - यह नया container नहीं बनाता
- Container का पिछला configuration retain रहता है
- Data persistent रहता है

**Example:**
```bash
$ docker stop my-nginx      # Stop करो
$ docker start my-nginx     # दोबारा start करो
```

---

## 10. docker rm
**Description:**
Container को permanently delete करता है।
Permanently removes a container.

**Usage:**
```bash
docker rm CONTAINER
docker rm container1 container2
docker rm -f container_name    # Force remove (even if running)
```

**Detailed Explanation:**
- Container को completely delete कर देता है
- Stopped containers को ही remove कर सकते हैं (running को नहीं)
- `-f` flag running container को force delete करता है
- Container का data lost हो जाता है (unless volume में save हो)
- Image नहीं delete होती, sirf container delete होता है

**Example:**
```bash
$ docker ps -a
$ docker rm old-container    # Stopped container को delete करना

# Running container को force delete करना
$ docker rm -f my-app
```

---

## 11. docker inspect
**Description:**
Container या image की detailed information display करता है।
Shows detailed configuration and status information.

**Usage:**
```bash
docker inspect CONTAINER
docker inspect CONTAINER --format='{{json .State}}'  # Specific info
```

**Output Includes:**
- Container की ID, name, image
- Network settings और port mappings
- Volume mounts
- Environment variables
- Running processes
- Resource limits

**Example:**
```bash
$ docker inspect my-nginx | grep -i ipaddress
# Container का IP address देख सकते हो
```

---

## 12. docker stats
**Description:**
Running container की real-time resource usage दिखाता है।
Displays real-time resource usage statistics.

**Usage:**
```bash
docker stats
docker stats CONTAINER
docker stats --no-stream     # Single snapshot
```

**Output Shows:**
- CPU usage percentage
- Memory usage और limit
- Network I/O
- Block I/O
- PIDs

**Example:**
```bash
$ docker stats my-app
CONTAINER ID   NAME      CPU %     MEM USAGE / LIMIT
abc123def456   my-app    0.45%     256MiB / 512MiB
```

---

## Summary Table

| Command | Purpose | Key Use Case |
|---------|---------|--------------|
| `docker run` | Create and run container | Starting new services |
| `docker ps` | List running containers | Monitoring active containers |
| `docker ps -a` | List all containers | Checking all containers |
| `docker images` | List available images | Checking installed images |
| `docker exec -it` | Access running container | Debugging and troubleshooting |
| `docker logs` | View container output | Troubleshooting errors |
| `docker stop` | Gracefully stop container | Safe shutdown |
| `docker start` | Restart stopped container | Resuming services |
| `docker rm` | Delete container | Cleanup |
| `docker inspect` | Detailed information | Configuration review |
| `docker stats` | Resource monitoring | Performance tracking |

