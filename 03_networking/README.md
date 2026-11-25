# Networking: (Cross-)Container Communication

## 📌 Module Introduction (Lesson 66)

इस module में हम सीखते हैं कि container बाहर की दुनिया से कैसे बात करता है।
This module is about how a container talks to the world outside itself.

तीन cases हैं: container → internet (WWW), container → आपकी host machine, और container → दूसरा container।
There are three cases: container → internet (WWW), container → your host machine, and container → another container.

हम एक demo Node app (Star Wars API + MongoDB) को step by step containerize करेंगे और हर case को solve करेंगे।
We containerize a demo Node app (Star Wars API + MongoDB) step by step and solve each case.

## 🗺️ Lessons

| # | Lesson | Key idea |
|---|--------|----------|
| 67 | [Case 1: Container to WWW Communication](67_container-to-www.md) | Works out of the box |
| 68 | [Case 2: Container to Host Machine Communication](68_container-to-host.md) | `localhost` inside ≠ your host |
| 69 | [Case 3: Container to Container Communication](69_container-to-container.md) | App + database in separate containers |
| 70 | [Analyzing the Demo App](70_analyzing-demo-app.md) | Express + axios + mongoose |
| 71 | [Creating a Container & Communicating to the Web](71_container-web-demo.md) | Build, run, see the Mongo error |
| 72 | [Making Container to Host Communication Work](72_host-docker-internal.md) | `host.docker.internal` |
| 73 | [Container to Container: A Basic Solution](73_container-ip-basic-solution.md) | Hard-coded container IP (fragile) |
| 74 | [Introducing Docker Networks](74_docker-networks.md) | `docker network create`, name as host |
| 75 | [How Docker Resolves IP Addresses](75_how-docker-resolves-ips.md) | DNS at request time, code untouched |
| 76 | [Docker Network Drivers](76_network-drivers.md) | bridge, host, none, overlay, macvlan |
| 77 | [Module Summary](77_module-summary.md) | Cheat-sheet, quiz, resources |

> See also: [Docker networking commands](../docker%20cmd/03_NETWORKING.md)
