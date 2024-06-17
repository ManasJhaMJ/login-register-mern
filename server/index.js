const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));

mongoose.connect("mongodb://127.0.0.1:27017/users");

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("Password is incorrect");
                }
            }
            else {
                res.json("Email not found / not registered");
            }
        });

});

app.post("/register", (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err));
})

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});