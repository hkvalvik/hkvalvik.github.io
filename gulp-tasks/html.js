var fs = require('fs');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');

module.exports = function(gulp){
    return function(){
        return gulp.src('site/index.hbs')
            .pipe(
                handlebars({
                    },
                    {
                        batch : ['./site']
                    })
            )
            .pipe(rename('index.html'))
            .pipe(gulp.dest('.'));
    };
};