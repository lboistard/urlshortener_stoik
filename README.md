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

### Remarques

Durant le process je me suis rendu compte d'une bêtise. Dans mes ambitions avec petit projet je veux pouvoir ajouter un module d'authentification via Github pour suivre mes liens.
Sauf que si je shorten un url et que quelqu'un d'autre shorten le même ? 
Je vais donc mettre en place une gestion d'erreur et un fallback vers une autre facon de shorten dans ce cas 

### Inspirations and sources

Since I'm a bit new to nest I've looked at some youtube videos and documentations. This one was quite nice with patterns I really like https://www.youtube.com/watch?v=NB7fJPxiVbA
