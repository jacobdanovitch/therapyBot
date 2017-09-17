const express = require('express')
const request = require('request')
const requestPromise = require('request-promise')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')

const PORT = process.env.PORT || 3000
const app  = express()
app.use(cors())

app.post('/image', (req, res) => {
    let {image} = req.body

    console.log(image)
    fs.writeFile('./images/emotion.jpg', image, err => {
        if (err) console.log(err)

        else {
            res.json('Successful!')
        }
    })
})

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`))