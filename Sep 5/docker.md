in command line anywhere. i did in Sep 5 folder.

- docker pull hello-world
- docker                 //
- docker images          //
- docker run hello-world // creates an instance of the hello-world image.
- docker ps              // ps shows running containers
- docker ps -a             
- docker container ls    // l
- docker rm <CONTAINER ID>    
# this will remove a container (not running)
- docker rm -f <CONTAINER ID> 
# will stop a running process and delete the process.
- docker stop <CONTAINER ID>  
# will stop a running container
- docker rmi hello-word   
# removes the hello-world image. see by 'docker images'

- docker run -p 5000:80 -d nginx // nginx should run on port 80 of localhost 5000. HTTP req gets run on port 80. If it says port allocated, try another port, maybe 3000

- docker run --name some-nginx -v "C:/Users/d960791/Desktop/All my Code/PRACTICE/Sep 5/":/usr/share/nginx/html:ro -d -p 10000:80 nginx

# it runs the file from the address given. make sure of fwd slashes.

________________________DOCKERIZING OUR WEB APP_______________________
we create an image that will run our web app when the container runs
    - Copy onto an existing image(Node.js image e.g.) our web application source files and install dependencies and create a new image, and additionally make sure the web app starts when the container starts.


______________________________________________________________________
docker run -v /var/www node

docker inspect
# "mounts" nested object is about the Volume 

docker run node node
______________________________________________________________________
# Dockerfile

Dockerfile comands : 
- FROM - which image we are building this image from
- LABEL, MAINTAINER, AUTHOR NAME, EMAIL
- RUN - To run shell commands (the command runs when we create an image, not a container)
- ENTRYPOINT, CMD - To run some command (when the container starts, not when building image)
- COPY - to copy files from our computer to image.
- WORKDIR - sets the current working directory (where commands execute)
- EXPOSE - to make available a set of ports outside the container
- ENV - To set up environment variabes.
VOLUME - To add a volume to a container that spins up.
______________________________________________________________________
# Sep 11 : Dockerizing applications

in expressjs app : docker run --name mongodb mongo


To make sure mongo isn running :
- in another cmd, run commands to finally see 'server should be down'
> mongo
>use admin
>db.shut | hit tab to get full command.
>>'server should be down'
>ctrl+c in the terminal and again try 'mongo'. It should say 'Error: couldnt connect to...'

__________________________________________________________________________________
# 11sep
- 
- puranik3's git : 06-node>19-express-app and in that :
- docker build -t piyusheklavya777/node-app .
- docker run -d -p 10000:10000 --link mongodb:mongodb piyusheklavya777/node-app
- POSTMAN a post req. to 10000/products and see it show in browser.
- create a network:
    - add containers to the n/w
    - a container can be in multiple networks
    - docker network create --driver bridge web-app-network
    - docker rm -f ${docker ps -a -q} // all containers will stop
    - kill all containers running ps -a, then, rm -f shorthand(s)
    - docker run -d --net=web-app-network --name mongodb mongo
    - docker run -d -p 10000:10000 --net=web-app-network piyusheklavya777/node-app
    - docker network -ls to see all networks running
    - the to see net config: docker network inspect 'Networkname from network list'
    - docker network inspect web-app-network
# Docker Compose
- tool to manage a set of containers that works together. load balancers etc
- docker-compose build
- docker-compose up 
- docker-compose down
- If you just want to stop, nor remove all : 
    - docker-compose stop