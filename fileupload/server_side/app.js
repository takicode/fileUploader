const http = require('http')
const fs = require('fs')
const path = require('path')
const busboy = require('busboy')

const uploadAddress = path.join(__dirname, 'upload')
if (!fs.existsSync(uploadAddress)) {
  fs.mkdirSync(uploadAddress)
}
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  if (req.method === 'POST' && req.url === '/upload') {
    const bb = busboy({ headers: req.headers })

    bb.on('file', (fieldName, file, info) => {
      const { filename, encoding, mimeType } = info
      const address = path.join(__dirname, 'upload', filename)

      const writeStream = fs.createWriteStream(address)

      file.pipe(writeStream)

      writeStream.on('error', (err) => {
        console.error('File write error', error)
        res.writeHead(500)
        res.end('File upload failed')
      })
    })

    bb.on('field', (fieldName, val) => {
      console.log(`field ${fieldName}:${val}`)
    })

    bb.on('finish', () => {
      res.writeHead(200, { Connection: 'close' })
      res.end('upload done')
    })

    bb.on('error', (err) => {
      console.error('Busboy error:', err)
      res.writeHead(500)
      res.end('upload failed')
    })

    req.pipe(bb)
  } else {
    res.writeHead(404)
    res.end('Not found')
  }
})

server.listen(3000, () => {
  console.log('server listening on port 3000...')
})
