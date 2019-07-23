# docker-website-skeleton
Forkable website created with Docker, Flask, React (create-react-app), and Nginx.
## Creating 


## Developing
1. On a Linux or Mac with [Docker](https://docs.docker.com/v17.12/install/) and [docker-compose](https://docs.docker.com/compose/install/) installed, clone down this repo. 
1. `cd devcon-docker-website`
1. `docker-compose up --build`
1. Visit your website at `localhost:3001` in your browser.
1. Make any changes you wish to the frontend or API and see the changes reflected live. The only time you should need to rebuild is when you add new dependencies or change Docker or docker-compose configuration.
## Deploying to Docker Swarm
1. On a Linux or Mac with Docker and docker-compose installed as well as a [docker swarm initialized with a registry](https://docs.docker.com/engine/swarm/stack-deploy/), clone down this repo.
1. `cd devcon-docker-website`
1. `docker-compose -f docker-compose.prod.yml build`
1. `docker-compose -f docker-compose.prod.yml push`
1. `docker stack deploy -c docker-compose.prod.yml my-website`
