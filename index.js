const PORT = process.env.PORT || 8000
const express = require('express')
const bcrypt = require('bcrypt')

const app = express()

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})