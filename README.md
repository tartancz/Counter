<h1 align=center>⚠️THIS IS ONLY FOR MY LEARNING PURPOSE⚠️

# Counter

Counter is web where u can login and use counter to count.

## Built using

### Frontend

- React

### Backend

- Django REST framework
- Django ORM
- PostqreSQL
- Unit tests with pytest

## Features

- Adding and deleting counters
- Count with counters
- Authentication for using counters later
- Viewing others Counters


# Development setup

## Install backend

### requriements:
- Python 3.10 installed and in PATH
- Docker and Docker-compose


```bash
python3 --version
# Python 3.10.9
```



```bash
cd backend
python -m venv .venv

# linux users
source .venv/bin/active
# Windows users
.venv/scripts/activate

pip install -r requitements.txt

# Need docker and docker compose installed
docker-compose -f services.yml up --d

python manage.py migrate
python manage.py runserver
```

## Install frontend
### requriements:
- node.js v18 or greater

```bash
node --version
# v18.12.0
```

```bash
cd frontend
npm install
npm run dev
```
Website is now accessible at http://localhost:5432
# Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)