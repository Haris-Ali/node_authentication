const PORT = process.env.PORT || 8000
const express = require('express')
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Authentication with node and express using bcrypt")
})

app.post('/login', (req, res) => {

})

app.post('/signup', async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log(username, password, salt, hashedPassword)
        res.statusCode(200)
    } catch {
        console.error("Error")
        res.statusCode(500)
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})