const express = require('express')
const http = require('http')
const request = require('request')
const requestPromise = require('request-promise')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const upload = require('express-fileupload')
var watson = require('watson-developer-cloud');
var ConversationV1 = require('watson-developer-cloud/conversation/v1');
var speechToText = require('watson-developer-cloud/speech-to-text/v1')

const PORT = process.env.PORT || 3000
const app  = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cors())
app.use(upload())

var conversation = new ConversationV1({
  username: 'ad4cbed8-e7b3-469c-a515-f41d51702104',
  password: '2pXcfsjcbMlI',
  version_date: ConversationV1.VERSION_DATE_2017_05_26
});


app.get('/', (req, res)=>{
  res.send('welcome')
})
app.post('/image', (req, res) => {
    console.log(req.body)
    console.log(Object.keys(req.body.image))

})
app.post('/message', (req, res)=>{
  conversation.message({
    input: { text: req.body.text },
    workspace_id: '967e6e74-5848-42c0-8318-29bb3988ccd7'
   }, function(err, response) {
       if (err) {
         console.error(err);
       } else {
         console.log(JSON.stringify(response, null, 2));
         res.json(response.output.text)
       }
  });
})
app.post('/audio', (req, res) => {
    console.log(req.body)

    var speech_to_text = new speechToText ({
      username: 'ad4cbed8-e7b3-469c-a515-f41d51702104',
      password: '2pXcfsjcbMlI'
    })

    
    let url = req.body.blobURL
    let file = fs.createWriteStream('./assets/video.webm')
    http.get(url, response => {
      response.pipe(file, src => {
        let params = {
          audio: fs.createReadStream('./assets/emotion.jpg'),
          content_type: 'audio/flac',
          timestamps: true,
          word_alternatives_threshold: 0.9,
          keywords: ['colorado', 'tornado', 'tornadoes'],
          keywords_threshold: 0.5
        }
        
        speech_to_text.recognize(params, (err, transcript) => {
          if (err)
            console.log('Error:', err);
          else
            console.log(JSON.stringify(transcript, null, 2));
        })
    
        res.json({message: 'hello'})    
      });
    })

})

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`))
