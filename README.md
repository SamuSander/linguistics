# Winograd 

## Important
- Clone this to the the "C" drive 

## Prerequisites

- **Docker**: [Install Docker Desktop](https://www.docker.com/get-started)
- **Git**: [Install Git](https://git-scm.com/downloads)

## Installation

1. **Clone the Repository**

Gitlab:
   ```bash
   git clone https://gitlab.zi.local/klips/linguistics.git
   ```

GitHub:
   ```bash
    git git@github.com:SamuSander/linguistics.git
   ```

## Usage

### Building the Docker Image

```bash
docker compose build --no-cache
```

### Running the Container

```bash
docker compose up
```

### Accessing the Website

Open your browser and navigate to: [http://localhost:8080/src/index.html](http://localhost:8080/src/index.html)

## Local Development and Debugging

1. **Ensure Docker is Running**

   Make sure Docker Desktop is active on your machine.

2. **Build the Docker Image**

   ```bash
   docker compose build --no-cache
   ```

3. **Run the Container in Detached Mode**

   ```bash
   docker compose up -d
   ```

4. **Access the Website**

   Visit [http://localhost:8080/src/index.html](http://localhost:8080/src/index.html) in your browser.

5. **View Logs for Debugging**

   ```bash
   docker compose logs -f
   ```

6. **Stop the Container**

   ```bash
   docker compose down
   ```