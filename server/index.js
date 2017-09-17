const express = require('express')
const request = require('request')
const requestPromise = require('request-promise')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const upload = require('express-fileupload')

const PORT = process.env.PORT || 3000
const app  = express()
app.use(bodyParser.json())
app.use(cors())
app.use(upload())

app.post('/image', (req, res) => {
    console.log(req.body)
    console.log(Object.keys(req.body.image))
    // fs.writeFile('./images/emotion.jpg', image, err => {
    //     if (err) console.log(err)

    //     else {
    //         res.json('Successful!')
    //     }
    // })
})

app.post('/audio', (req, res) => {
    console.log(req.body)


})

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`))
