const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

module.exports = function(gulp){
    return function(){
        gulp.task('css', function () {
            return gulp.src('src/index.scss')
                .pipe(sass().on('error', sass.logError))
                .pipe(postcss([ autoprefixer({ browsers: ['last 10 versions'] }) ]))
                .pipe(gulp.dest('dist'));
        });
    };
};