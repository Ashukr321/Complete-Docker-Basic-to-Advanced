# Building Multi-Container Applications

## 📌 Module Introduction (Lesson 79)

अब तक हमने ज़्यादातर एक-एक container के साथ काम किया; real apps में अक्सर कई services साथ चलती हैं।
So far we mostly worked with single containers; real apps usually run several services together.

इस module में हम एक "goals" app को तीन containers में बाँटते हैं: **MongoDB**, **Node/Express backend** और **React frontend**।
In this module we split a "goals" app into three containers: **MongoDB**, a **Node/Express backend** and a **React frontend**.

हम networks, volumes, bind mounts और environment variables को एक साथ use करके इन्हें जोड़ेंगे।
We connect them by combining networks, volumes, bind mounts and environment variables.

## 🗺️ Lessons

| # | Lesson | Key idea |
|---|--------|----------|
| 80 | [Our Target App & Setup](80_target-app-setup.md) | 3 services and their requirements |
| 81 | [Dockerizing the MongoDB Service](81_dockerizing-mongodb.md) | `docker run ... mongo` |
| 82 | [Dockerizing the Node App](82_dockerizing-node-app.md) | Dockerfile, `host.docker.internal` |
| 83 | [Moving the React SPA into a Container](83_react-spa-container.md) | `-it`, code runs in the browser |
| 84 | [Docker Networks for Cross-Container Communication](84_docker-networks.md) | `goals-net`, container name as host |
| 85 | [Fixing MongoDB Authentication Errors](85_mongodb-auth-errors.md) | `?authSource=admin` |
| 86 | [Data Persistence for MongoDB with Volumes](86_mongodb-volumes-persistence.md) | `-v data:/data/db`, root user env vars |
| 87 | [Volumes, Bind Mounts & Polishing for Node](87_node-volumes-bind-mounts.md) | logs volume, nodemon, `.dockerignore` |
| 88 | [Live Source Updates for the React Container](88_react-live-source-updates.md) | Bind mount `src`, WSL polling |
| 89 | [Module Summary](89_module-summary.md) | Cheat-sheet, resources + practice |
