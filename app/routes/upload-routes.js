const express = require('express')
const app = express()
const router = express.Router()
const upload = require('../middlewares/upload-middleware')
const ImageResizer = require('../image-resizer')

const imagePath = process.env.NODE === 'production' ? './public/images' : './test/images'

router.get('/', async function (req, res) {
  await res.render('index')
})

router.post('/single-image', upload.single('image'), async function (req, res) {
//  console.log(req.file)
  const fileUpload = new ImageResizer(imagePath)
  if(!req.file)
    res.status(401).json({error: 'Please provide an image'})
  const filename = await fileUpload.save(req.file.buffer)
  res.status(200).json({status: 200, message: 'oi'})
})

router.post('/multiples-images', upload.array('images'), async function (req, res) {
//  console.log(req.files)
  const fileUpload = new ImageResizer(imagePath)
  if(!req.files)
    res.status(401).json({error: 'Please provide an image'})
  for(let i = 0; i < req.files.length; i++) {
    const file = req.files[i]
    const filename = await fileUpload.save(file.buffer)
  }
  res.status(200).json({status: 200, message: 'oi'})
})

module.exports = router
