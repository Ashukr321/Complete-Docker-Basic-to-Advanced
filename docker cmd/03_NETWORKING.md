# Docker Networking Commands

## 📌 Overview
यह फाइल Docker networking को manage करने के commands को cover करती है।
This file covers all commands for Docker networking.

---

## 1. docker network ls
**Description:**
Host पर available सभी Docker networks को list करता है।
Lists all networks on the Docker host.

**Syntax:**
```bash
docker network ls [OPTIONS]
```

**Example:**
```bash
$ docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
12345abcde          bridge              bridge              local
67890fghij          host                host                local
abcdef123456        none                null                local
xyz789abc123        my-network          bridge              local
```

**Default Networks:**
- `bridge`: Default network, सभी containers यहाँ connected होते हैं (isolated)
- `host`: Host की network namespace use करता है (exposed)
- `none`: Network connectivity बिल्कुल नहीं

**Columns:**
- `NETWORK ID`: Network का unique identifier
- `NAME`: Network का name
- `DRIVER`: Network type (bridge, host, overlay, macvlan)
- `SCOPE`: local या swarm

---

## 2. docker network create
**Description:**
नया custom Docker network create करता है।
Creates a new Docker network.

**Syntax:**
```bash
docker network create [OPTIONS] NETWORK
```

**Common Options:**
```bash
docker network create \
  -d bridge                      # Driver type (bridge, overlay, etc.)
  --subnet 172.20.0.0/16        # Subnet range
  --ip-range 172.20.240.0/20    # IP address range for containers
  --gateway 172.20.0.1          # Gateway IP
  --aux-address key=value       # Additional addresses
  -o com.docker.network.bridge.name=mybr0  # Options
  my-network
```

### 2.1 Bridge Network (Default)
```bash
$ docker network create my-bridge
$ docker run -d --network my-bridge --name app1 nginx
$ docker run -d --network my-bridge --name app2 alpine
```

**Detailed Explanation:**
- Bridge network एक isolated network है
- Same network में containers एक-दूसरे को container name से access कर सकते हैं
- DNS resolution automatically होता है
- Containers बाहर से एक्सेस हो सकते हैं proper port mapping के साथ

### 2.2 Overlay Network (Swarm/Compose)
```bash
# Swarm के लिए overlay network
$ docker network create -d overlay --subnet=10.0.9.0/24 my-overlay

# Docker Compose automatically overlay networks बनाता है
```

**Detailed Explanation:**
- Multiple Docker hosts पर containers को connect करता है
- Docker Swarm या multi-host environments के लिए
- Encrypted communication support करता है

### 2.3 Custom Subnet
```bash
$ docker network create \
  --subnet 192.168.100.0/24 \
  --gateway 192.168.100.1 \
  --ip-range 192.168.100.128/25 \
  my-custom-network

# Container को specific IP assign करना
$ docker run --network my-custom-network --ip 192.168.100.10 nginx
```

---

## 3. docker network connect
**Description:**
Running container को existing network से connect करता है।
Connects a container to a network.

**Syntax:**
```bash
docker network connect [OPTIONS] NETWORK CONTAINER
```

**Options:**
```bash
docker network connect \
  --ip 192.168.100.10          # Static IP assign करना
  --alias alias-name           # Container के लिए alias
  my-network \
  my-container
```

**Example:**
```bash
# Container को multiple networks से connect कर सकते हो
$ docker network connect my-network my-container

# Static IP के साथ
$ docker network connect --ip 192.168.100.20 my-network my-container

# Alias के साथ (DNS resolution)
$ docker network connect --alias web my-network my-container
# अब दूसरे containers "web" से भी access कर सकते हैं
```

**Detailed Explanation:**
- Container को runtime में दूसरे network से connect करना
- Single container multiple networks से connected हो सकता है
- Network traffic को segregate कर सकते हो

---

## 4. docker network disconnect
**Description:**
Container को network से disconnect करता है।
Disconnects a container from a network.

**Syntax:**
```bash
docker network disconnect [OPTIONS] NETWORK CONTAINER
```

**Options:**
```bash
docker network disconnect -f NETWORK CONTAINER  # Force disconnect
```

**Example:**
```bash
$ docker network disconnect my-network my-container
```

**Detailed Explanation:**
- Container को network से हटा देता है
- `-f` flag forcefully disconnect करता है (बीच में connection drop करता है)

---

## 5. docker network inspect
**Description:**
Network की detailed information display करता है।
Shows detailed information about a network.

**Syntax:**
```bash
docker network inspect [OPTIONS] NETWORK [NETWORK...]
```

**Example:**
```bash
$ docker network inspect my-network
[
    {
        "Name": "my-network",
        "Id": "12345abcde...",
        "Created": "2024-01-15T10:30:00.123456789Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Config": [
                {
                    "Subnet": "172.19.0.0/16",
                    "Gateway": "172.19.0.1"
                }
            ]
        },
        "Containers": {
            "abc123def...": {
                "Name": "my-container",
                "EndpointID": "xyz789...",
                "MacAddress": "02:42:ac:13:00:02",
                "IPv4Address": "172.19.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {},
        "Labels": {}
    }
]
```

**Detailed Explanation:**
- Network configuration को fully देख सकते हो
- Connected containers को देख सकते हो
- IPAM (IP Address Management) configuration
- Gateway और subnet information

---

## 6. docker network rm
**Description:**
Docker network को delete करता है।
Removes one or more networks.

**Syntax:**
```bash
docker network rm [OPTIONS] NETWORK [NETWORK...]
```

**Example:**
```bash
$ docker network rm my-network

# Multiple networks delete करना
$ docker network rm network1 network2 network3

# सभी unused networks delete करना
$ docker network prune
```

**Detailed Explanation:**
- Network को delete कर देता है
- Network से कोई container connected हो तो delete नहीं होगा
- Disconnect करके फिर delete करना होगा

---

## 7. docker network prune
**Description:**
Unused networks को remove करता है।
Removes all unused networks.

**Syntax:**
```bash
docker network prune [OPTIONS]
```

**Options:**
```bash
docker network prune -f                    # Force without confirmation
docker network prune --filter "until=24h"  # Only networks older than 24h
```

**Example:**
```bash
$ docker network prune
WARNING! This will remove all custom networks not used by at least one container.
Are you sure? [y/N] y
Deleted Networks:
old-network1
old-network2
```

---

## Network Driver Types

### 1. Bridge Driver (Default)
```
┌─────────────────────────────────────────┐
│           Docker Host                    │
├─────────────────────────────────────────┤
│  ┌──────────────────────────────┐       │
│  │      Docker Bridge Network   │       │
│  │  (172.19.0.0/16)             │       │
│  │                              │       │
│  │  ┌──────────┐  ┌──────────┐  │       │
│  │  │Container1│  │Container2│  │       │
│  │  │172.19...2│  │172.19...3│  │       │
│  │  └──────────┘  └──────────┘  │       │
│  │        ▲            ▲         │       │
│  │        └────┬───────┘         │       │
│  │             │ (docker0)       │       │
│  └─────────────┼──────────────────┘       │
│                │                         │
│         ┌──────▼──────┐                  │
│         │  eth0 (Host)│                  │
│         └─────────────┘                  │
│                                         │
│         External: localhost:port       │
└─────────────────────────────────────────┘
```

**Characteristics:**
- Default network driver
- Isolated from host network
- Port mapping की जरूरत है external access के लिए
- Single host पर containers

**Connection:**
```bash
$ docker network create my-bridge
$ docker run --network my-bridge nginx
```

### 2. Host Driver
```bash
$ docker run --network host nginx

# Container directly host network use करता है
# Port mapping नहीं लगेगी - directly container ports accessible होंगे
# Performance best है, लेकिन isolation नहीं है
```

**Characteristics:**
- No network isolation
- Container host के ports को directly use करता है
- Performance के लिए best
- Security risk हो सकता है

### 3. None Driver
```bash
$ docker run --network none alpine

# कोई network connectivity नहीं
# सिर्फ loopback interface
```

**Use Case:**
- Network access की जरूरत नहीं
- Complete isolation चाहिए

### 4. Overlay Driver
```bash
$ docker network create -d overlay my-overlay

# Docker Swarm में multi-host communication
# या docker-compose में services के बीच
```

---

## Container Communication Patterns

### Same Network (DNS Resolution)
```bash
$ docker network create my-net
$ docker run -d --network my-net --name web nginx
$ docker run -it --network my-net alpine

/ # wget http://web   # Container name से directly access
# DNS automatically resolve होता है
```

### Different Networks (Not Connected)
```bash
$ docker network create net1
$ docker network create net2
$ docker run --network net1 --name app1 nginx
$ docker run --network net2 --name app2 alpine

# app1 और app2 एक-दूसरे को access नहीं कर सकते
```

### Multiple Networks (Connected)
```bash
$ docker network create net1
$ docker network create net2
$ docker run --network net1 --name app1 nginx
$ docker network connect net2 app1

# अब app1 दोनों networks में है
```

---

## Networking Best Practices

### 1. Custom Networks Use करें
```bash
# ❌ Default bridge network (isolation नहीं)
$ docker run -d nginx
$ docker run -d mysql

# ✅ Custom networks (proper isolation)
$ docker network create my-app
$ docker run --network my-app -d --name web nginx
$ docker run --network my-app -d --name db mysql
```

### 2. DNS Names
```bash
# ✅ Container names से communicate करना
$ docker exec web curl http://db:3306

# ❌ IP addresses hardcode करना
$ docker exec web curl http://172.19.0.3:3306
```

### 3. Port Mapping
```bash
# ✅ Necessary ports ही expose करना
$ docker run -p 8080:80 --network my-app nginx

# ❌ सभी ports expose करना
$ docker run -P nginx
```

---

## Troubleshooting Network Issues

### Check Network Connectivity
```bash
$ docker exec container1 ping container2
$ docker exec container1 nslookup container2
$ docker exec container1 curl http://container2:port
```

### Inspect Container Network
```bash
$ docker inspect container_name | grep -A 10 NetworkSettings
```

### View Network Traffic (Advanced)
```bash
$ docker exec container_name tcpdump -i eth0 -n host 172.19.0.3
```

### Check Open Ports
```bash
$ docker exec container_name netstat -tuln
```

---

## Quick Reference

| Command | Purpose | Use Case |
|---------|---------|----------|
| `docker network ls` | List networks | Discover networks |
| `docker network create` | Create network | Multi-container apps |
| `docker network connect` | Attach to network | Dynamic connectivity |
| `docker network disconnect` | Detach from network | Network cleanup |
| `docker network inspect` | Network details | Troubleshooting |
| `docker network rm` | Delete network | Cleanup |
| `docker network prune` | Remove unused | Maintenance |

---

## Network Configuration Priority

```
┌─────────────────────────────────────────────────┐
│   docker run Network Options Priority           │
├─────────────────────────────────────────────────┤
│ 1. --network         (explicitly specified)     │
│ 2. docker-compose    (if using compose)         │
│ 3. Default bridge    (if nothing specified)     │
└─────────────────────────────────────────────────┘
```

