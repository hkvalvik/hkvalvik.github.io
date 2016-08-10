# <small>Gulp task for</small><br> [browserify](http://browserify.org/) and [babeljs](https://babeljs.io/)

**With sourcemaps from [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)**
<br />
**and es6 / es2015 support from [babel-preset-es2015](https://www.npmjs.com/package/babel-preset-es2015)**

**1.** If the project doesn't have a `package.json`, create one

    npm init

**2.** Install dependencies

    npm install --save-dev gulp browserify vinyl-source-stream vinyl-buffer babelify gulp-sourcemaps gulp-util babel-preset-es2015

**3.** Create the task as a separate file

`gulp-tasks/js.js`

    const browserify = require('browserify');
    const source = require('vinyl-source-stream');
    const buffer = require('vinyl-buffer');
    const babelify = require('babelify');
    const sourcemaps = require('gulp-sourcemaps');
    const gutil = require('gulp-util');

    module.exports = function(gulp, options) {
        return function(){
            return browserify({
                entries: options.entries,
                debug: true,
                transform: [babelify]
            })
            .bundle()
            .on('error', function(error) {
                console.error(error);
                this.emit('end');
            })
            .pipe(source(options.filename))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .on('error', gutil.log)
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(options.dest));
        };
    };

**4.** Include the task

`gulpfile.js`

    const gulp = require('gulp');

    gulp.task('js', require('./gulp-tasks/js')(gulp, {
        entries: 'src/index.js',
        filename: 'index.js',
        dest: 'dist'
    }));

**5.** Add a [`.babelrc`](https://babeljs.io/docs/usage/babelrc/)
in the same directory as `gulpfile.js`

    {
      "presets": ["es2015"]
    }

**6.** Write ES6 / ES2015, include modules

`src/index.js`

    const MyModule = require('./my-module');
    class MyClass {}

**7.** Convert into compatible, debuggable code

    gulp js

    ↓

    dist/index.js
    dist/index.js.map