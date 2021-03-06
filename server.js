require("dotenv").config()
const express = require("express")
const path = require("path")
const app = express()
const methodOverride = require("method-override")
const bodyParser = require("body-parser")
const session = require("express-session")
const fetch = require("node-fetch")
const adminController = require("./controller/admin")
const championController = require("./controller/champion")
const tradesController = require("./controller/trades")
const draftController = require("./controller/draft")
const homeController = require("./controller/home")
const PORT = process.env.PORT || 8000

require("./config/db")

app.use(express.static(path.join(__dirname, "build")))
app.use(session({
    secret: "hockey is the greatest",
    resave: false,
    saveUninitialized: false
}))
app.use(methodOverride("_method"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use("/admin", adminController)
app.use("/champions", championController)
app.use("/trades", tradesController)
app.use("/drafts", draftController)
app.use("/home", homeController)

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"))
})

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}.`)
})