const fs = require('fs');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');

var repositories = [
    'fontset',
    'sass-scale',
    'sass-media-mixins',
    'hamburger.js'
].map(repository => {
    var json = './node_modules/' + repository + '/package.json';
    var string = fs.readFileSync(json, 'utf-8');
    return JSON.parse(string);
});

var data = {
    repositories: repositories,
    gists: [
        {
            name: 'Browser console snippets',
            url: 'https://gist.github.com/hkvalvik/83e25127ebf1e0c9803c4e07f9c0d7c0'
        }
    ]
};

module.exports = function(gulp){
    return function(){

        var stringified = JSON.stringify(data);
        fs.writeFileSync('dist/data.json', stringified);

        var js = 'module.exports = ' + stringified + ';';
        fs.writeFileSync('dist/data.js', js);
    };
};