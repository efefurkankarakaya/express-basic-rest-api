const express = require("express");
const app = express();
const fs = require("fs");
const tools = require("./tools");

app.get("/users/:id", (req, res) => { // localhost:3000/users/4
    fs.readFile("users.json", "utf8", (err, data) => {
        res.set({
            "content-type" : "application/json"
        });
        JSON.parse(data)[req.params.id] ? 
        res.end(JSON.stringify(JSON.parse(data)[req.params.id])) :
        res.end("{}");
    });
});

app.get(`/users`, (req, res) => {
    fs.readFile("users.json", "utf8", (err, data) => {
        res.set({
            "content-type" : "application/json"
        });
        res.end(data);
    });
});

app.get("/add", (req, res) => {
    fs.readFile("users.json", "utf8", (err, data) => {
        data = JSON.parse(data);
        console.log(data.length)
        json_struct = { // localhost:3000/add?name=Efe&password=12345&email=test@test.com
            "name" : req.query.name,
            "password" : req.query.password,
            "email" : req.query.email
        };
        const length = data ? Object.keys(data).length : 0;
        data[length] = json_struct;
        res.set({
            "content-type" : "application/json"
        });
        res.end(JSON.stringify(data[length])); // end needs buffer or string as param
        fs.writeFile("users.json", JSON.stringify(data), "utf8", (err) => console.log(err));
    });
});

app.get("/del", (req, res) => {
    fs.readFile("users.json", "utf8", (err, data) => {
        data = JSON.parse(data);
        const id = req.query.id; // localhost:3000/del?id=4
        delete data[id];
        console.log(data);
        res.end(JSON.stringify(data));
        fs.writeFile("users.json", JSON.stringify(data), "utf8", (err) => console.log(err));
    });
});

app.get("/edit", (req, res) => {
    fs.readFile("users.json", "utf8", (err, data) => {
        data = JSON.parse(data);
        const id = req.query.id;
        json_struct = { // localhost:3000/edit?name=efe&email=test@test.com
            "name" : req.query.name ? req.query.name : data[id].name,
            "password" : req.query.password ? req.query.password : data[id].password,
            "email" : req.query.email ? req.query.email : data[id].email
        };
        data[id] = json_struct;
        res.set({
            "content-type" : "application/json"
        });
        res.end(JSON.stringify(data[id]));
        fs.writeFile("users.json", JSON.stringify(data), "utf8", (err) => console.log(err));
    })
})

const generate_user_data = (path) => {
    console.log("\x1b[34m%s\x1b[0m","[GENERATOR] Generating random user data...");
    const data = fs.readFileSync(path, "utf8");
    const array = data.split("\n");
    const length = array.length;
    const users = {}
    for (let i = 0; i < length; i++){
        users[i] = {
            name: array[Math.floor(Math.random() * length - 1)],
            password: array[Math.floor(Math.random() * length - 1)],
            email: array[Math.floor(Math.random() * length - 1)] + "@" + array[Math.floor(Math.random() * length - 1)] + ".com"
        }
    }
    fs.writeFileSync("users.json", JSON.stringify(users));
}

const server = app.listen(3000, () => {
    console.log("\x1b[31m%s\x1b[0m","[SERVER] Server has been started at localhost:3000.");
    if (fs.existsSync("users.json") == false) {
        console.log("\x1b[33m%s\x1b[0m", "[SERVER] users.json not found.");
        const path = "data.txt";
        if (fs.existsSync(path) == true){
            console.log("\x1b[36m%s\x1b[0m", "[SERVER] data.txt found.");
            generate_user_data(path);
        }
        else fs.writeFileSync("users.json", "{}");
        console.log("\x1b[33m%s\x1b[0m","[SERVER] users.json has been created.");
    }
})