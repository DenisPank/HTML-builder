const fs = require('fs');
const path = require('path')

const readStream = fs.createReadStream(path.join("D:",'Landing',"html-builder",'HTML-builder','01-read-file','text.txt'))

readStream.on('data', (chunk) =>{
  
  console.log(chunk.toString())
})