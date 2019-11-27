# Skeleton-ui  

Web application based on:
* React + redux
* Google api for auth
* [Gismart UI library](https://bitbucket.org/gismart/gismart-ui/) base on [Antd](https://ant.design/)

  
## AVAILABLE SCRIPTS  
  
    `start` - run development service with proxy to api  
    `build` - make production build  
    `clean` - clean dist directory  
    `lint`  - run linter  
    `lint:fix` - run linter with fix flag  
  
## REQUIRED ENV VARIABLES  
  
* **GOOGLE_CLIENT_ID**  
* **API_URL**  
  
## RUN UI APP INSIDE DOCKER
  
1) Add corrrect ENV variables to docker-compose file  
2) Build project image `docker image build -t skeleton . --file  ./local.Dockerfile`  
3) Run image `docker run -p 5000:80 skeleton`  
  
After steps above your app will be run in `localhost:5000`  
  
## HOW TO SETUP WEB APP

### PRE-REQUIREMENTS
* REST-API Server  
* Google auth (client id)  

### SETUP  
1) Fork this repository  
2) Remove **.git** folder in root directory  
3) Init your own git repository in root directory  
4) Replace **'skeleton'** to 'project-name' (using IDE)  
5) Change title of app in next files:  
  `./package.json`   - line 2  
  `./src/index.html` - line 9  
6) Add env variables:
  * GOOGLE_CLIENT_ID  
  * API_URL  
7) Install packages: `npm i`  
  **!!! Important !!!**  
  You shoud have ssh connection to gismart bitbucket (required for `gismart-ui` package)  
8) Start development server: `npm run start`  

