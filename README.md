> [!NOTE]
> **Used software versions:**
> - operating system: Ubuntu 23.10
> - docker version: 25.0.1
> - docker-compose version: 1.25.0

### Project launch steps

### I

Clone the project:

```
git clone git@github.com:MaximEYakovlev/simple-balance-management-app.git
```

Create `.env` file in the root of the `server` directory.
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

Find out the `web-server CONTAINER ID` by executing the next docker command in the terminal:

```
docker ps
```

Run migrations to create tables in the database by executing the next docker command in the terminal:

```
docker exec <INSERT HERE THE 'WEB-SERVER' CONTAINER ID> npx sequelize-cli db:migrate
```

EXAMPLE:

```
docker exec 74febf7175f1 npx sequelize-cli db:migrate
```

### IV

Enter [http://127.0.0.1:3000](http://127.0.0.1:3000) to the browser URL bar.

> [!NOTE]
> **To run the API documentation:**
> 1. Launch the terminal, move to the `server / docs` directory of the project.
> 2. Execute the next command:
>   ```
>   npx serve
>   ```
> 3. Click on the link provided in the terminal.
> 
> ![Screenshot from 2024-02-06 13-23-34](https://github.com/MaximEYakovlev/simple-balance-management-app/assets/61206936/ac1a2bc8-57bd-486e-a303-37288ad1c4a4)

![Screenshot from 2024-02-02 17-24-49](https://github.com/MaximEYakovlev/simple-balance-management-app/assets/61206936/37fc7877-dc32-4cbe-8ea6-670c3258620e)

![Screenshot from 2024-02-05 05-16-53](https://github.com/MaximEYakovlev/simple-balance-management-app/assets/61206936/dca71ae7-d3e4-4725-ab9a-52df3682c271)

![Screenshot from 2024-02-06 13-31-25](https://github.com/MaximEYakovlev/simple-balance-management-app/assets/61206936/5241575c-9f59-40d0-b686-89f31122a336)



