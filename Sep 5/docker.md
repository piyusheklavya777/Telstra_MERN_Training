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