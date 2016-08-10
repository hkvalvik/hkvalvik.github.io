const Header = require('./components/header');
const Analytics = require('./components/analytics');

var header = new Header();

var analytics = new Analytics();

/*
function appendCss(url){
    var head = document.head;
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    head.appendChild(link)
}

appendCss('/dist/index.css');
*/