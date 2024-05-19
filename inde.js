const jwt = require("jsonwebtoken");

//decpde , verify, genrate


const value = {
    name: "shubham",
    accountnumber: 12122133445
};


//jwt 

const token = jwt.sign(value, "secret");
console.log(token);