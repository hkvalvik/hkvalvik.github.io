const extend = require('extend');
const data = require('../../dist/data');
require('hamburger.js');

module.exports = class {

    static get _defaults(){
        return {
            activeClass: 'header--active',
            inactiveMainClass: 'main--inactive',
            repositoryTemplate: function(repository){
                return `
                    <li>
                        <a href="${repository.homepage}">
                            <h4>
                                ${repository.name}
                            </h4>
                        </a>
                        <p>
                            ${repository.description}
                        </p>
                    </li>
                `;
            },
            gistTemplate: function(gist){
                return `
                    <li>
                        <a href="${gist.url}">
                            <h4>
                                ${gist.name}
                            </h4>
                        </a>
                    </li>
                `;
            },
            template: function() {
                return `
                    <header class="header">
                        <div class="header-content">
                            <div class="header-home">
                                <a href="/" class="face">
                                    <div class="face-content">
                                        <div class="face-eye"></div>
                                        <div class="face-eye"></div>
                                        <div class="face-mouth"></div>
                                    </div>
                                </a>
                            </div>
                            <div class="header-menu">
                                <button class="hamburger header-toggle">
                                    <span class="header-toggle-label">
                                        Menu
                                    </span>
                                    <span class="hamburger-icon header-toggle-icon"></span>
                                </button>
                            </div>
                        </div>
                        <div class="header-nav" data-header-nav>
                            <nav>
                                <h3>Repositories</h3>
                                <ul>
                                    ${data.repositories.map(this.options.repositoryTemplate).join('')}
                                </ul>
                                <h3>Gists</h3>
                                <ul>
                                    ${data.gists.map(this.options.gistTemplate).join('')}
                                </ul>
                            </nav>
                        </div>
                    </header>
                `;
            }
        }
    }

    constructor(element = null, options = {}){
        this.options = extend(true, {}, this.constructor._defaults, options);
        this.element = element || this._createElement();
        this._active = false;
        var toggle = this.element.querySelector('.hamburger');
        new Hamburger(toggle);
        toggle.addEventListener('click', this._toggle.bind(this));
    }

    _createElement(){
        var element = document.createElement('div');
        document.body.insertBefore(element, document.body.firstChild);
        element.innerHTML = this.options.template.call(this);
        return element.firstElementChild;
    }

    _toggle(){
        if(!this._active){
            this._showNav();
        }
        else {
            this._hideNav();
        }
    }

    _showNav(){
        this.element.classList.add(this.options.activeClass);
        var main = document.querySelector('main');
        var nav = this.element.querySelector('[data-header-nav]');
        nav.style.position = 'static';
        nav.style.height = 'auto';
        main.style.transform = 'translateY('+nav.offsetHeight+'px)';
        nav.style.position = 'absolute';
        nav.style.height = '';
        main.classList.add(this.options.inactiveMainClass);
        this._active = true;
    }

    _hideNav(){
        this.element.classList.remove(this.options.activeClass);
        var main = document.querySelector('main');
        main.style.transform = 'translateY(0)';
        main.classList.remove(this.options.inactiveMainClass);
        this._active = false;
    }

}
