const connect = require('gulp-connect');

module.exports = function(gulp){
    return function(){
        connect.server({
            root: './',
            port: 7777,
            livereload: true
        });
    };
};