const fs = require('fs');
const path = require('path')


// fs.rm('D:/Landing/html-builder/HTML-builder/04-copy-directory/files-copy',{ recursive: true }, err => {
//   if(err) throw err; // не удалось удалить файл
//   console.log('Файл успешно удалён');
  
        
// });


fs.mkdir('04-copy-directory/files-copy',{ recursive: true }, err => {
  if(err) throw err; // не удалось создать папку
  console.log('dir успешно создан');
})










fs.readdir('04-copy-directory/files', (err, data)=>{
  data.forEach(element => {

fs.copyFile(path.join('04-copy-directory', 'files', element.toString()), path.join('04-copy-directory', 'files-copy', element.toString()), err => {
  if(err) throw err; // не удалось скопировать файл
  console.log('Файл успешно скопирован');
});

  });
})
