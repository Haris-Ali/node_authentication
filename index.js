const PORT = process.env.PORT || 8000
const express = require('express')
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json())

const users = []

app.get('/', (req, res) => {
    res.send("Authentication with node and express using bcrypt")
})

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if (user == null) return res.status(400).send("Unable to find user. Please check credentials.")
    try {
        const doesUserExist = await bcrypt.compare(req.body.password, user.password)
        if (doesUserExist) {
            res.send("Successfully logged in!")
        } else {
            res.send("Wrong password. Please enter correct password.")
        }
    } catch {
        res.status(500).send("Login failed.")
    }
})

app.post('/signup', async (req, res) => {
    try {
        const name = req.body.name
        const password = req.body.password
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = { name: name, password: hashedPassword }
        users.push(newUser)
        res.status(200).send("New user created")
    } catch {
        console.error("Error")
        res.status(500).send("Signup failed. Please try again.")
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})