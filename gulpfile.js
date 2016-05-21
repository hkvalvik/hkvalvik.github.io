var gulp = require('gulp');

gulp.task('css', require('./gulp-tasks/css')(gulp));
gulp.task('html', require('./gulp-tasks/html')(gulp));

gulp.task('watch', function(){
    gulp.watch(['**/**/*.scss', '!node_modules'], ['css']);
    gulp.watch(['site/**/*.scss'], ['css']);
    gulp.watch(['site/**/*.hbs'], ['html']);
});

gulp.task('default', ['css', 'css', 'html', 'watch']);
