const fs = require('fs')
const path = require('path')

fs.readdir(path.join("03-files-in-folder", 'secret-folder'),{withFileTypes: true},function name(err, data){
  data.forEach(element => {
  
  
    if (element.isDirectory()) {
      fs.readdir(path.join("03-files-in-folder", 'secret-folder', element.name.toString()), (err, data)=> data.forEach(element => {
        
        fs.stat(path.join("03-files-in-folder", 'secret-folder', element.toString()), (err, stats)=>{
         
          console.log(element + " - " + path.extname(element.toString() + " - " + stats))
        
        })

      })
      )
    } else {
      fs.stat(path.join("03-files-in-folder", 'secret-folder', element.name.toString()), (err, stats)=>{
        console.log(path.parse(element.name.toString()).name + ' - ' + path.extname(element.name.toString()) + ' - ' + stats['size'])
      
      
      })
      
    }
  });
})