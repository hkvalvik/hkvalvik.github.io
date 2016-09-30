const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');

module.exports = function(gulp){
    return function(){
        gulp.task('css', function () {
            return gulp.src([
                    'src/index.scss',
                    'dist/fontello/css/fontello.css'
                ])
                .pipe(sass().on('error', sass.logError))
                .pipe(postcss([ autoprefixer({ browsers: ['last 10 versions'] }) ]))
                .pipe(concat('index.css'))
                .pipe(gulp.dest('dist'));
        });
    };
};