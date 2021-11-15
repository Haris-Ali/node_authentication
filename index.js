const PORT = process.env.PORT || 8000
const express = require('express')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

var databaseURL = "mongodb+srv://harrisAli:haris123@cluster0.0iacu.mongodb.net/users?retryWrites=true&w=majority"
var connection = mongoose.connect(databaseURL, { useNewUrlParser: true, useUnifiedTopology: true })
var user = require('../node_authentication/models/users')
const app = express()
app.use(express.json())

connection.then((db) => {
    console.log("Connected to MongoDB database")
}, (err) => {
    console.log(err)
})

app.get('/', (req, res) => {
    res.send("Authentication with node and express using bcrypt")
})

app.get('/users', (req, res) => {
    user.find({}, (err, users) => {
        if (err) res.status(500).send("Unknown error occured. Please try again.")
        else res.status(200).send(users)
    })
})

app.post('/login', (req, res) => {
    user.findOne({ username: req.body.username }, (err, obj) => {
        if (err) res.status(401).send("User not found. Please try again and check credentials.")
        if (obj) {
            var result = obj.comparePassword(req.body.password, obj.password)
            if (!result) res.status(401).send("Password does not match. Please enter correct password.")
            else res.status(200).send("Successfully logged in.")
        } else {
            if (req.body.username === "" || req.body.password === "") res.status(401).send("Fields cannot be blank. Please fill in all fields.")
            else res.status(401).send("Username not found. Please try again.")
        }
    })
})

app.post('/signup', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    user.findOne({ username: username }, (error, duplicateUser) => {
        if (error) {
            res.status(500).send("An unknown error occured. Please try again later.")
        } else {
            if (duplicateUser) {
                res.status(500).send("User already exists. Please choose a different username")
            } else {
                var newUser = new user()
                newUser.username = username
                newUser.password = newUser.hashPassword(password)
                newUser.save((err, success) => {
                    if (err) {
                        if (newUser.username === "" || newUser.password === "") res.status(500).send("Fields cannot be blank. Please fill in all fields.")
                        else res.status(500).send("Error occured on DB side. Please try again later.")
                    }
                    else res.status(200).send(success)
                })
            }
        }
    } )
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})