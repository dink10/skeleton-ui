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

## HOW TO SETUP WEB APP

### PRE-REQUIREMENTS
* REST-API Server  
* Google auth (client id)  

### SETUP  
1) Fork this repository  
2) Remove **.git** folder in root directory  
3) Init your own git repository in toor dir  
4) Change title of app in next files:  
  `./package.json`   - line 2  
  `./src/index.html` - line 9  
5) Add env variables:
  * GOOGLE_CLIENT_ID  
  * API_URL  
5) Install packages: `npm i`  
  **!!! Important !!!**  
  You shoud have ssh connection to gismart bitbucket (required for `gismart-ui` package)  
5) Start development server: `npm run start`  

