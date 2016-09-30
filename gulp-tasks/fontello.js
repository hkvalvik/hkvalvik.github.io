const fontello = require('gulp-fontello');

module.exports = function(gulp){
    return function(){
        return gulp.src('fontello.json')
            .pipe(fontello({
                font: 'dist/fontello/font',
                css: 'dist/fontello/css'
            }))
            .pipe(gulp.dest('.'))
    };
};