# UECS3563 Assignment
**Title:** *Web-Based Scrum Management Tool*

## Features
* **PostgreSQL** Database
* Java **Spring Boot** Backend
* Typescript **Angular** Frontend
* Containerised Setup via **Docker Compose**
* **Make** utility with `Makefile`

![Dockerized](https://img.shields.io/badge/Containerized-Docker-blue)
![Spring Boot](https://img.shields.io/badge/Backend-SpringBoot-green)
![Angular](https://img.shields.io/badge/Frontend-Angular-red)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)

## Requirements
* **Docker** & **Docker Compose**, may be installed via [**Docker Desktop**](https://www.docker.com/products/docker-desktop/)
* **Make**, may be installed via package managers (apt, pacman, etc.) or [**Make for Windows**](https://gnuwin32.sourceforge.net/packages/make.htm)

## QuickStart
### For Unix / WSL Users
```sh
# Initialise Database
make migrate

# Start the Development Server
make dev

# Kill the Server
make kill
```
`make migrate` only needs to be ran once.

### For Development Purpose
`make npm` to install npm dependencies for local development.
You do not this to run this to start the server.

`make dev` supports hot-reloading:
* **backend** via **Spring DevTools**
* **frontend** via **Angular**

### Rebuild Docker Images
`make image` to rebuild docker images without cache.

## For Windows Users
Windows Users has many options.
1. Install [**Windows Subsystem for Linux**](https://learn.microsoft.com/en-us/windows/wsl/install)

**OR**

2. Use [**Make for Windows**](https://gnuwin32.sourceforge.net/packages/make.htm)

## Documentation
### This project uses springdoc-openapi to generate OpenAPI 3 documentation for REST endpoints.
* **Swagger-UI**: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)
* **OpenAPI Spec (JSON)**: [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)

## Troubleshooting
### Docker Error
> unable to get image 'assignment-backend': error during connect: Get "http://%2F%2F.%2Fpipe%2FdockerDesktopLinuxEngine/v1.51/images/assignment-backend/json": open //./pipe/dockerDesktopLinuxEngine: The system cannot find the file specified.
1. Ensure that **Docker Engine** is up and running by starting **Docker Desktop**.
2. Ensure a stable internet connection is available for fetching **Docker images**.

### Unresponsive Backend
**Java Spring Boot** takes a bit of time to compile and get running. To view the progress, run
```sh
docker compose logs -f backend
```

### Slow startup
The **Angular image** might take a lot of time in the `npm install` stage.  
However, that will only be in the first boot, as the `node_modules` will be stored within a **Docker Volume**.

## Evaluation and Analysis
As per section 5 of the assignment requirements  
The Questions and Answers are in [`report.md`](report.md)
