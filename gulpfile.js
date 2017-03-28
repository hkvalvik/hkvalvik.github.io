const gulp = require('gulp');

gulp.task('data', require('./gulp-tasks/data')(gulp));

gulp.task('js', require('./gulp-tasks/js')(gulp, {
    entries: 'src/index.js',
    filename: 'index.min.js',
    dest: 'dist'
}));

gulp.task('fontello', require('./gulp-tasks/fontello')(gulp));

gulp.task('css', require('./gulp-tasks/css')(gulp));

gulp.task('html', require('./gulp-tasks/html')(gulp));

gulp.task('connect', require('./gulp-tasks/connect')(gulp));

gulp.task('watch', function(){
    gulp.watch(['src/**/*.js'], ['js']);
    gulp.watch(['src/**/*.scss'], ['css']);
    gulp.watch(['src/**/*.hbs'], ['html']);
});

gulp.task('default', ['data', 'js', 'fontello', 'css', 'html', 'connect', 'watch']);
