const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());
const ALL_USERS = [
    {
        username: "harkirat@gmail.com",
        password: "123",
        name: "harkirat singh",
    },
    {
        username: "shubhamawasthi@gmail.com",
        password: "1234",
        name: "Shubham Awasthi",
    },
    {
        username: "shubham@gmail.com",
        password: "12345",
        name: "Shubham",
    }
];

function userExists(username, passwords) {
    let userExists = false;
    for (let i = 0; i < ALL_USERS.length; i++){
        if (ALL_USERS[i].username == username && ALL_USERS[i].password == password) {
            userExists = true;
        }
    }
    return userExists;
}

app.post("/signin", function (res, req) {
    const username = req.body.username;
    const password = req.body.password;

    if (!userExists(username, password)) {
        return res.statusCode(403).json({
            msg: "user dosenot exists in our in memory db",
        });
    }

    var token = jwt.sign({ username: username }, jwtPassword);
    return res.json({
        token,
    });
});

app.get("/users", function (req, res) {
    const token = req.header.authorization;
    try {
        const decode = jwt.verify(token, jwtPassword);
        const username = decode.username;

    } catch (err) {
        return res.status(403).json({
            msg: "invalid token",
        });
    }

});

app.listen(3000);