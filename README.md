# About

Pet Project. A web responsive application project for an animal shelter. With authorization and authentication. The project uses personally belowed [Vue.js](https://vuejs.org/) with touch of TS as a base along with a [Vuetify](https://vuetifyjs.com/en/) component framework.

BackEnd part of the project could be found in [this repository](https://github.com/DainVerd/animal-shelter-be)

- [About](#about)
- [How to launch project locally](#how-to-launch-project-locally)
- [How to launch with Docker Desktop](#how-to-launch-with-docker-desktop)
- [Figma moq](#visual-identica-and-appierence)
- [Naming convention of the project](#naming-convention)
- [Tech stack](#tech-stack)

## How to launch project locally

This section is dedicated to launch project locally on your machine.

To launch project:

1. clone the repository  
2. if you do not have Node.js, download and install it [from official site ,click](https://nodejs.org/en/download)  
3. open project and launch command line  
4. execute command in terminal  

  ```bash
      npm install
  ```

5. run project with command  

  ```bash
    npm run dev
  ```

6. open in browser `localhost:3000`

## How to launch with Docker Desktop

The Docker setup runs the Vite development server directly and does not use Nginx.

1. Install and start [Docker Desktop](https://www.docker.com/products/docker-desktop/).
2. Clone this repository and open a terminal in the project directory.
3. Build and start the container:

   ```bash
   docker compose up --build
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

The frontend uses `VITE_API_URL` from `.env`. By default it sends API requests to `http://localhost:5117/api`, so start the backend on that address when API functionality is needed.

To stop the project, press `Ctrl+C` in the terminal and run:

```bash
docker compose down
```

After dependency or source changes, run `docker compose up --build` again to rebuild the image.

## Visual identica and appierence

This section is dedicated to store information about visual identica of the app. It is stored in free Figma Moq(Animal Shelter Web-site (Community)) what could [be found here](https://www.figma.com/design/loUPXFNFZ28JvDRt8djx4B/Animal-Shelter-Web-site--Community-?node-id=23-61390&t=5lkT9laGQdpebV1o-0)

## Naming convention

- Components in Vue.js must contain at least two words in its name. For example `AppFooter.vue`
- If Component is a a page then need to add postfix `Page`, for example `LandingPage.vue`

### ts only files

Must be named in kebab case only

### html and css

names of custom css classes should be kebab case because it is industrial standart

```css
.my-fancy-class {
    color: red;
}
```

## tech-stack

This section is dedicated to store information about tech stack what is used in this project.

Technologies are:

- [Vue.js with TS](https://vuejs.org/)
- [Vuetify 3](https://vuetifyjs.com/en/)
- [Pinia](https://pinia.vuejs.org/)
- [Vite as build tool](https://vite.dev/)
- [SASS](https://sass-lang.com/documentation/syntax/)
