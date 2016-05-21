var sass = require('gulp-sass');

module.exports = function(gulp){
    return function(){
        gulp.task('css', function () {
            return gulp.src('site/index.scss')
                .pipe(sass().on('error', sass.logError))
                .pipe(gulp.dest('dist'));
        });
    };
};