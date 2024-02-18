const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const dotenv = require("dotenv").config()
const jwt = require("jsonwebtoken")

app.listen(3000)
app.use(bodyParser.json())

const users = [
    {
        username: "Hari",
        email: "harigovind@gmail.com"
    },
    {
        username: "Anirudh",
        email: "Anirudh@gmail.com"
    }
]

app.get("/users", authenticateToken, (req,res) => {
    res.json(users.filter( (user) => {
        return user.username === req.user.name
    } ))
})


// Middleware for token Authentication
function authenticateToken(req,res,next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if(token === null){
        res.sendStatus(401)
    }
    else{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
            if(err){
                return res.sendStatus(403)
            }
            else{
                req.user = user
                next()
            }
        })
    }
}