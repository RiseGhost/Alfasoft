const express = require('express')
const path = require('path')
const cors = require("cors")
const app = express()
const routers = require("./backend/routers/index")
const upload = require("./backend/uploads/upload")
const port = 10093

app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("backend/uploads/images"))
app.use(express.static(path.join(__dirname, 'frontend/dist')))
app.use(cors())

app.get("/contacts", routers.routeGet.getAll)
app.post("/creatContact", upload.single("image"), routers.routerPos.create)

app.get((req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'))
})

app.listen(port, () => {
    console.log("🚀 Backend running on port " + port)
})