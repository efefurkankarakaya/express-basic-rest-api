# Basic REST API with Express.js 

## Installation

* Click <a href="https://nodejs.org/en/">here (npm)</a> and <a href="https://git-scm.com/">here (git)</a> to get NPM and Git, if you don't have.
* Open a terminal 
* Run this code below: <br />
```git clone https://github.com/efefurkankarakaya/express-basic-rest-api.git```
* Go inside the directory with ```cd express-basic-rest-api```
* Run ```npm install```

## Run

The server can be run with ```node server.js``` but especially if you want to develop or change something, I would recommend you run with nodemon. <br /> 
Follow these steps for installation:
* Run ```npm install -g nodemon``` to install nodemon globally on your system. 
* Then, run ```nodemon server.js``` this will start the server.

## Queries

<hr>

### Add 
```localhost:3000/add?name=Efe&password=12345&email=test@test.com```

### Search
```localhost:3000/users/1```

### Edit
```localhost:3000/edit?name=Efe&email=test@testmail.com```

### Delete
```localhost:3000/del?id=5```