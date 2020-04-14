The official MongoDB container
MongoDB conveniently provides us with an official container. To try it out:

mkdir ~/data
sudo docker run -d -p 27017:27017 -v ~/data:/data/db mongo



Connecting to your MongoDB container
# Install the MongoDB client
sudo apt-get install mongodb-clients

# Change mydb to the name of your DB
mongo localhost/mydb



Stopping your MongoDB containers
To stop our runnings MongoDB queries, you run sudo docker ps to see the list of the running containers and sudo docker stop HASH to stop each container:docker ps and docker rm commands

Alternatively, you can also execute sudo docker stop $(sudo docker ps -q) as a shortcut to stop all running containers.




DOCKER RUN command syntax
The docker run -d -p 27017:27107 -v ~/data:/data/db mongo does 3 main things:

-d tells docker to run the container as a daemon, which is the mode that'll you want to use for server containers.
-p 27017:27107 maps the port 27017 of the container to the port 27017 of the host. The syntax is -p HOST_PORT:CONTAINER_PORT.
-v ~/data:/data/db maps the /data/db directory of the container to the ~/data directory on the host. This is called a data volume, the principal mechanism to import and export data with your docker container.





https://www.thachmai.info/2015/04/30/running-mongodb-container/





docker run -d -p 27017:27017 -v /Users/user/Projects/marketpay/data:/data/db mongo
docker stop $(docker ps -a -q)
