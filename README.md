# urlshortener_stoik
URL shortener app for Stoik

## Setup Database

run this 

```
docker run --name your_project_name \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_USER=user \
  -e POSTGRES_DB=your_database \
  -p 5432:5432 \
  -d postgres
```
