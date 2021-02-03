<!-- COmando docker para rodar o postgres -->
docker run --name postgres -e POSTGRES_USER=josepaes -e POSTGRES_PASSWORD=1234 -e POSTGRES_DB=heroes -p 5432:5432 -d postgres

<!-- Comando docker para listas ainstancias -->
docker ps

<!-- COmando Docker para acesar o terminal do host no docker -->
docker exe -it postgres /bin/bash

<!-- Comando Docker para rodar o adminer -->
docker run --name adminer -p 8080:8080 --link postgres:postgress -d adminer

docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=1234 -d mongo:4

docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient

docker exec -it mongodb mongo --host localhost -u admin -p 1234 -authenticationDatabase admin --eval "db.getSiblingDB('herois').createUser({user: 'josepaes', pwd: '123', roles:[{role: 'readWrite', db: 'herois'}]})"