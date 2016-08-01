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
                            <button class="hamburger header-toggle">
                                <span class="hamburger-icon header-toggle-icon"></span>
                                <span class="header-toggle-label">
                                    Menu
                                </span>
                            </button>
                            <div class="header-nav">
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
                        </div>
                    </header>
                `;
            }
        }
    }

    constructor(element = null, options = {}){
        this.options = extend(true, {}, this.constructor._defaults, options);
        this.element = element || this._createElement();
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
        this.element.classList.toggle(this.options.activeClass);
        document.querySelector('main').classList.toggle(this.options.inactiveMainClass);
    }

}
