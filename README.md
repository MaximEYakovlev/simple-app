> [!NOTE]
> **Used software versions:**
> 
> * _operating system: Ubuntu 23.10_
> 
> * _docker version: 25.0.1_
> 
> * _docker-compose version: 1.25.0_
### Project launch steps
### I
Clone the project:
```
git clone git@github.com:MaximEYakovlev/simple-balance-management-app.git
```
Create _`.env`_ file in root of the _`server`_ directory.
Paste the following variables into it:
```
PORT=8080
POSTGRES_USER=user_dev
POSTGRES_PASSWORD=password_dev
POSTGRES_DB=database_dev
```
### II
Launch the terminal, move to the root directory of the project.
Execute the next docker command:
```
docker-compose up
```
### III
Find out the _`web-server`_ _`CONTAINER ID`_ by executing the next docker command in the terminal:
```
docker ps
```
Run migrations to create tables in the database by executing the next docker command in the terminal:
```
docker exec <INSERT HERE THE 'WEB-SERVER' CONTAINER ID> npx sequelize-cli db:migrate
````
EXAMPLE:
```
docker exec 74febf7175f1 npx sequelize-cli db:migrate
```
### IV
Enter [http://127.0.0.1:3000/](http://127.0.0.1:3000/) to the browser URL bar.
