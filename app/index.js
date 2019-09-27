const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000
const uploadRoutes = require('./routes/upload-routes')

app.use('/upload', uploadRoutes)
app.use(express.static('../public'))
app.set('view engine', 'ejs')
app.use(bodyParser.json())

app.post('/', function(req, res) {
  res.status(200).json({status: 200, message: "Server OK!"})
})

app.listen(port, () => console.log('Server is running on PORT', port))

export default app
