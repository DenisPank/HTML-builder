const fs = require('fs');
const path = require('path');

// Прверка наличия файла "about.html"
let hasAbout = false;

fs.readdir(path.join(__dirname, 'components'), (err, data) => {
    if (err) console.error(error.message);
    if (data.includes('about.html')) {
        hasAbout = true;
    }
})

function getBundle() {
    // Cоздание папки "project-dist"
    fs.mkdir(path.join(__dirname, 'project-dist'), err => {
        if (err) console.error(err.message);
    }) 
    
    // Создание файла "index.html" внутри папки "project-dist"
 
    let template = '';
        fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
            if (err) console.error(err.message);
            template = data;
            if (hasAbout === true) {
                fs.readFile(path.join(__dirname, 'components', 'about.html'), 'utf-8', (err, data) => {
                    if (err) console.error(err.message);
                    const about = data;
                    template = template.replace('{{about}}', about);
                })
            }
            fs.readFile(path.join(__dirname, 'components', 'header.html'), 'utf-8', (err, data) => {
                if (err) console.error(err.message);
                const header = data;
                template = template.replace('{{header}}', header);
            });
            fs.readFile(path.join(__dirname, 'components', 'articles.html'), 'utf-8', (err, data) => {
                if (err) console.error(err.message);
                const articles = data;
                template = template.replace('{{articles}}', articles);
            });
            fs.readFile(path.join(__dirname, 'components', 'footer.html'), 'utf-8', (err, data) => {
                if (err) console.error(err.message);
                const footer = data;
                template = template.replace('{{footer}}', footer);
                fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), template, err => {
                    if (err) console.error(err.message);
                })
            });
        })
    
    // Создание файла "style.css" внутри папка "project-dist"
    
    fs.readdir(path.join(__dirname, 'styles'), (error, data) => {
        if (error) console.error(error.message);
        fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', (error) => {
            if (error) console.error(error.message);
        });
        data.forEach(file => {
            fs.readFile(path.join(__dirname, 'styles', file), 'utf-8', (error, data) => {
                if (error) console.error(error.message);
                fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data, (error) => {
                    if (error) console.error(error.message);
                })
            });
        })
    })
    
    // Копирование папки "assets" в папку "project-dist"
    
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), (error) => {
        if (error) console.error(error.message);
    });
    
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'fonts'), err => {
        if (err) console.error(err.message);
        fs.readdir(path.join(__dirname, 'assets', 'fonts'), (error, data) => {
            if (error) console.error(error.message);
            data.forEach(file => {
                fs.copyFile(path.join(__dirname, 'assets', 'fonts', file), path.join(__dirname, 'project-dist', 'assets','fonts', file), (error) => {
                    if (error) console.error(error.message);
                })
            })
        })
    });
    
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'img'), err => {
        if (err) console.error(err.message);
        fs.readdir(path.join(__dirname, 'assets', 'img'), (error, data) => {
            if (error) console.error(error.message);
            data.forEach(file => {
                fs.copyFile(path.join(__dirname, 'assets', 'img', file), path.join(__dirname, 'project-dist', 'assets','img', file), (error) => {
                    if (error) console.error(error.message);
                })
            })
        })
    });
    
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'svg'), err => {
        if (err) console.error(err.message);
        fs.readdir(path.join(__dirname, 'assets', 'svg'), (error, data) => {
            if (error) console.error(error.message);
            data.forEach(file => {
                fs.copyFile(path.join(__dirname, 'assets', 'svg', file), path.join(__dirname, 'project-dist', 'assets','svg', file), (error) => {
                    if (error) console.error(error.message);
                })
            })
        })
    });
}

// Проверка наличия папки "project-dist"

fs.readdir(path.join(__dirname), 'utf-8', (err, data) => {
    if (err) console.error(err.message);
    if (data.includes('project-dist')) {
        fs.rm(path.join(__dirname, 'project-dist'), {recursive: true, force: true}, err => {
            if (err) console.error(err.message);
            getBundle();
        });
    } else {
        getBundle();
    }
})