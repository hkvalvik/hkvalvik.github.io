const fs = require('fs');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');

module.exports = function(gulp){
    return function(){
        return gulp.src('src/index.hbs')
            .pipe(
                handlebars(
                    JSON.parse(fs.readFileSync('./dist/data.json', 'utf-8')),
                    {
                        batch : ['./src']
                    }
                )
            )
            .pipe(rename('index.html'))
            .pipe(gulp.dest('.'));
    };
};