# urlshortener_stoik
URL shortener app for Stoïk

>[!NOTE]
> This project was built whit `node v23.9.0`
> When installing it you must use the same version to avoid issues.
> To change node version you can use `nvm use 23` 
> 
> https://github.com/nvm-sh/nvm

## Setup Database

Since i'm using a postgre database you'll need to have docker installed on your computer to run the project.

```
docker run --name your_project_name \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_USER=user \
  -e POSTGRES_DB=your_database \
  -p 5432:5432 \
  -d postgres
```

Before running the app, please look at both `.env.example` file and create an `.env` file for both backend and frontend with the right env variables inside.

For the backend i've used a GitHub authentication that is not mandatory if you want to run the app. 
If you want this part, please create an application in your github `settings > Developper Settings > Oauth App` and copy the credentials into the env.

> [!Note]
> The github auth is actually a bonus. I just learned nest and I love starting building backend by adding an auth service.
> Here I used it to be able to track urls created by attaching them to a `User`


### Inspirations and sources

Since I'm a bit new to NestJS I've looked at some youtube videos and documentations. This one was quite nice with patterns I really like https://www.youtube.com/watch?v=NB7fJPxiVbA

For the frontend I can deeply thank dribbble and Behance for minimalist frontend and Stoïk for the nice color palette.
Also thank you to Claude for the SVGs he created (stole somewhere) for me.

### Note about AI usage

Even though I am increasingly frightened by AI day after day I need to be honest on the AI usage in this project.
For the frontend part, I tried daisy UI for the first time (also i'm a noob with tailwind) so claude helped me setting up all the theme and stuff like that and that's almost it.

For the backend, the small unit test was built by cursor (but reviewed by me).
Also I had some issues with the express sessions because I never used them like this so again, cursor helped me a bit setting up that part of the project. As for the rest, I tried as much as possible to build it all myself. 

--- 

Finally, sorry for the desastrous commit history with almost all the project in one commit. I mostly one shotted it and commit nothing.