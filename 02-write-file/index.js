const fs = require('fs');
const readline = require('readline');


const writeStream = fs.createWriteStream("02-write-file/text.txt")


const rl = readline.createInterface({ input:process.stdin, output: process.stdout});


rl.question("Напиши что-то!!! \n", (data)=>{
  writeStream.write(data)
  rl.on("line", (data)=>{
  if (data == "exit") {
    rl.close()
  } else{
      writeStream.write(data)
    }
  })
})

rl.on('close', ()=>{
  console.log("пока(((")
})