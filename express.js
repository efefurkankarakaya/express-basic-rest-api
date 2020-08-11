const express = require("express");
const app = express();
const fs = require("fs");

app.get("/users/:id", (req, res) => { // localhost:3000/users/4
    fs.readFile("users.json", "utf8", (err, data) => {
        res.set({
            "content-type" : "application/json"
        })
        JSON.parse(data)[req.params.id] ? 
        res.end(JSON.stringify(JSON.parse(data)[req.params.id])) :
        res.end("{}");
    });
});

app.get(`/users`, (req, res) => {
    fs.readFile("users.json", "utf8", (err, data) => {
        res.set({
            "content-type" : "application/json"
        })
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
        } 
        const length = data ? Object.keys(data).length : 0;
        data[length] = json_struct;
        res.set({
            "content-type" : "application/json"
        })
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
        } 
        data[id] = json_struct;
        res.set({
            "content-type" : "application/json"
        })
        res.end(JSON.stringify(data[id]));
        fs.writeFile("users.json", JSON.stringify(data), "utf8", (err) => console.log(err));
    })
})

const server = app.listen(3000, () => {
    console.log("Server has been started.");

    if (fs.existsSync("users.json") == false) {
        console.log("users.json not found.");
        fs.writeFileSync("users.json", "{}");
        console.log("users.json has been created.");
    }
})

