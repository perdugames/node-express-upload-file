import chai from "chai"
import chaiHttp from "chai-http"
import app from "../app/index"
import fs from 'fs'
import path from 'path'

const should = chai.should()
const expect = chai.expect
chai.use(chaiHttp)

describe("Image Test", () => {
  after(() => {
    const directory = './test/images'
    fs.readdir(directory, (err, files) => {
      if(err) throw err
      for(const file of files)
        fs.unlink(path.join(directory, file), err => { if(err) throw err })
    })
  })
  
  it("Upload single image", (done) => {
    chai.request(app)
    .post("/upload/single-image")
    .attach('image', fs.readFileSync('./image-examples/image-example1.jpg'), 'file')
    .end(function(err, res) {
      expect(res).to.have.status(200)
      expect(res.body).to.have.all.keys(["status", "message"])
      done()
    })
  })
  
  it("Upload multiples images", (done) => {
    chai.request(app)
    .post("/upload/multiples-images")
    .attach('images', fs.readFileSync('./image-examples/image-example1.jpg'), 'file1')
    .attach('images', fs.readFileSync('./image-examples/image-example1.jpg'), 'file2')
    .end(function(err, res) {
      expect(res).to.have.status(200)
      expect(res.body).to.have.all.keys(["status", "message"])
      done()
    })
  })
})
