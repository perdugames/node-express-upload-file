const sharp = require('sharp')
const uuidv4 = require('uuid/v4')
const path = require('path')

class ImageResizer {
  constructor(folder) {
    this.folder = folder
  }
  async save(buffer, imageSize) {
    const filename = ImageResizer.filename()
    const filepath = this.filepath(filename)
    await sharp(buffer).resize(imageSize.width, imageSize.height, {}).toFile(filepath)
    return filename
  }
  static filename() {
    return `${uuidv4()}.png`
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}

module.exports = ImageResizer
