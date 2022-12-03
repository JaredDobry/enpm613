
## install requirement
```angular2html
python -m venv venv
```
```angular2html
venv\Scripts\activate
```
```angular2html
pip install -r requirements.txt
```

## Connect to DB
we can use sqlite db first when we are developing this project and migrate to local postgresql db or online postgresql db after complete it.

### Create a squlite db in root
```angular2html
python manage.py
```

### Connect to local postgresql db
1. install postgresql db in local
2. install psycopg2
3. app.config["SQLALCHEMY_DATABASE_URI"]='postgresql+psycopg2://postgres:yourpassword@127.0.0.1:5432/dbname'

## How to start
```angular2html
python manage.py
```

## How to deploy in docker to run in background
```angular2html
docker build -t name_of_container_you_want .
```
```angular2html
docker run -dp 5005:5000 -w /app -v "$(pwd):/app"  name_of_container_you_want
```
 
## Get api document
http://localhost:5005/swagger-ui



