const express = require('express')
const request = require('request')
const requestPromise = require('request-promise')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const upload = require('express-fileupload')
var watson = require('watson-developer-cloud');
var ConversationV1 = require('watson-developer-cloud/conversation/v1');

const PORT = process.env.PORT || 3000
const app  = express()
app.use(bodyParser.json())
app.use(cors())
app.use(upload())
app.use(express.static(path.resolve('userPictures')))

var conversation = new ConversationV1({
  username: 'ad4cbed8-e7b3-469c-a515-f41d51702104',
  password: '2pXcfsjcbMlI',
  version_date: ConversationV1.VERSION_DATE_2017_05_26
});


app.get('/', (req, res)=>{
  res.send('welcome')
})
app.post('/image', (req, res) => {
    console.log(req.files)
    uploadFile = req.files.photo
    uploadFile.mv('./userPictures/'+uploadFile.name, function(err) {
        if (err) {
		        console.log(err)
            res.status(500).send(err);
        }
        else {
            res.status(200).json('File uploaded!');
        }
    });
    // fs.writeFile('./images/emotion.jpg', image, err => {
    //     if (err) console.log(err)

    //     else {
    //         res.json('Successful!')
    //     }
    // })
})
app.post('/message', (req, res)=>{
  conversation.message({
    input: { text: req.body.text },
    workspace_id: '967e6e74-5848-42c0-8318-29bb3988ccd7'
   }, function(err, response) {
       if (err) {
         console.error(err);
       } else {
         res.json(response.output.text)
       }
  });
})
app.post('/audio', (req, res) => {
    console.log(req.body)
    // let file = wav.Writer(req.body.audio)
    // fs.writeFile('./assets/test.wav', file, err =>{
    //     if (err) console.log(err)
    //
    //     else {
    //         console.log('success')
    //     }
    // })

})

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`))
